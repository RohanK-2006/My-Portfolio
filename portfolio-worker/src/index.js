var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var CONFIG = {
  ALLOWED_ORIGIN: "*",
  // or "*" for dev
  FROM_EMAIL: "SoulCord <onboarding@resend.dev>",
  TO_EMAIL: "soulcord.dynamics@gmail.com",
  RATE_LIMIT_MAX: 5,
  RATE_LIMIT_WINDOW_SEC: 3600,
  MAX_LENGTHS: { name: 80, email: 120, subject: 120, message: 2e3 }
};
var index_default = {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = getCorsHeaders(origin);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, cors);
    }
    let rawBody;
    try {
      rawBody = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400, cors);
    }
    const validation = validatePayload(rawBody);
    if (!validation.valid) {
      return jsonResponse({ error: validation.error }, 400, cors);
    }
    if (env.RATE_LIMIT_KV) {
      const ip = getClientIP(request);
      const { allowed, remaining } = await checkRateLimit(ip, env.RATE_LIMIT_KV);
      if (!allowed) {
        return jsonResponse(
          { error: "Too many submissions. Please try again in an hour." },
          429,
          { ...cors, "Retry-After": String(CONFIG.RATE_LIMIT_WINDOW_SEC) }
        );
      }
    }
    const emailResult = await sendEmail(validation.data, env.RESEND_API_KEY);
    if (!emailResult.ok) {
      console.error("Email failed:", emailResult.error);
      return jsonResponse(
        { error: "Failed to send your message. Please try again." },
        500,
        cors
      );
    }
    return jsonResponse(
      { success: true, message: "Message received! We'll be in touch within 24 hours." },
      200,
      cors
    );
  }
};
function getCorsHeaders(origin) {
  const allowed = CONFIG.ALLOWED_ORIGIN === "*" || origin === CONFIG.ALLOWED_ORIGIN || origin.endsWith(".workers.dev");
  return {
    "Access-Control-Allow-Origin": allowed ? origin : CONFIG.ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}
__name(getCorsHeaders, "getCorsHeaders");
function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders }
  });
}
__name(jsonResponse, "jsonResponse");
function getClientIP(request) {
  return request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For")?.split(",")[0].trim() || "unknown";
}
__name(getClientIP, "getClientIP");
function sanitize(str) {
  return str.replace(/[<>]/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim();
}
__name(sanitize, "sanitize");
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
__name(isValidEmail, "isValidEmail");
function validatePayload(body) {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }
  const { name, email, subject, message } = body;
  const L = CONFIG.MAX_LENGTHS;
  if (typeof name !== "string" || !name.trim())
    return { valid: false, error: "Name is required" };
  if (name.trim().length < 2 || name.trim().length > L.name)
    return { valid: false, error: `Name must be 2\u2013${L.name} characters` };
  if (typeof email !== "string" || !email.trim())
    return { valid: false, error: "Email is required" };
  if (!isValidEmail(email.trim()) || email.trim().length > L.email)
    return { valid: false, error: "Invalid email address" };
  if (typeof subject !== "string" || !subject.trim())
    return { valid: false, error: "Subject is required" };
  if (subject.trim().length < 4 || subject.trim().length > L.subject)
    return { valid: false, error: `Subject must be 4\u2013${L.subject} characters` };
  if (typeof message !== "string" || !message.trim())
    return { valid: false, error: "Message is required" };
  if (message.trim().length < 20 || message.trim().length > L.message)
    return { valid: false, error: `Message must be 20\u2013${L.message} characters` };
  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    }
  };
}
__name(validatePayload, "validatePayload");
async function checkRateLimit(ip, kv) {
  const key = `rl:${ip}`;
  try {
    const raw = await kv.get(key);
    const count = raw ? parseInt(raw, 10) : 0;
    if (count >= CONFIG.RATE_LIMIT_MAX) {
      return { allowed: false, remaining: 0 };
    }
    const newCount = count + 1;
    if (count === 0) {
      await kv.put(key, String(newCount), { expirationTtl: CONFIG.RATE_LIMIT_WINDOW_SEC });
    } else {
      await kv.put(key, String(newCount));
    }
    return { allowed: true, remaining: CONFIG.RATE_LIMIT_MAX - newCount };
  } catch (err) {
    console.error("KV rate limit error:", err);
    return { allowed: true, remaining: 1 };
  }
}
__name(checkRateLimit, "checkRateLimit");
async function sendEmail(payload, resendApiKey) {
  if (!resendApiKey) {
    console.error("RESEND_API_KEY secret is not set");
    return { ok: false, error: "Email service not configured" };
  }
  const emailBody = {
    from: CONFIG.FROM_EMAIL,
    to: [CONFIG.TO_EMAIL],
    reply_to: payload.email,
    subject: `[SoulCord Contact] ${payload.subject}`,
    html: buildEmailHtml(payload),
    text: buildEmailText(payload)
  };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailBody)
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", res.status, errText);
      return { ok: false, error: `Resend API error: ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("Fetch to Resend failed:", err);
    return { ok: false, error: "Network error sending email" };
  }
}
__name(sendEmail, "sendEmail");
function buildEmailHtml(payload) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#fafbff;padding:40px 0;margin:0;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(26,36,86,0.08);">
    
    <div style="background:linear-gradient(135deg,#1a2456 0%,#2563b8 50%,#00b8b0 100%);padding:32px 40px;">
      <h1 style="color:white;margin:0;font-size:22px;font-weight:700;">New Contact Form Submission</h1>
      <p style="color:rgba(255,255,255,0.6);margin:8px 0 0;font-size:14px;">Received via Rohan's(My) PortFolio</p>
    </div>

    <div style="padding:40px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f0f4ff;">
            <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#8b9cb8;">Name</span>
            <p style="margin:4px 0 0;color:#1a2456;font-weight:500;">${sanitize(payload.name)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f0f4ff;">
            <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#8b9cb8;">Email</span>
            <p style="margin:4px 0 0;">
              <a href="mailto:${sanitize(payload.email)}" style="color:#2563b8;text-decoration:none;font-weight:500;">${sanitize(payload.email)}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f0f4ff;">
            <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#8b9cb8;">Subject</span>
            <p style="margin:4px 0 0;color:#1a2456;font-weight:500;">${sanitize(payload.subject)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 0 0;">
            <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#8b9cb8;">Message</span>
            <div style="margin:8px 0 0;color:#1a2456;line-height:1.7;white-space:pre-wrap;background:#fafbff;padding:16px;border-radius:10px;font-size:14px;">${sanitize(payload.message)}</div>
          </td>
        </tr>
      </table>
    </div>

    <div style="padding:24px 40px;background:#fafbff;border-top:1px solid #f0f4ff;">
      <p style="margin:0;font-size:12px;color:#8b9cb8;text-align:center;">
        Sent from the contact form at <strong>soulcord.dev</strong>
      </p>
    </div>

  </div>
</body>
</html>`;
}
__name(buildEmailHtml, "buildEmailHtml");
function buildEmailText(payload) {
  return [
    "New Contact Form Submission",
    "===========================",
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message
  ].join("\n");
}
__name(buildEmailText, "buildEmailText");
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
