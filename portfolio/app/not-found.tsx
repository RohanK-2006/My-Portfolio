import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8faff' }}>
      <div className="text-center max-w-md mx-auto px-6">
        <div
          className="text-8xl font-bold mb-6"
          style={{
            fontFamily: 'Playfair Display, serif',
            background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </div>
        <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
          Page not found
        </h1>
        <p className="text-sm mb-8" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button
            className="px-8 py-3 rounded-2xl text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #2563b8, #00b8b0)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}
