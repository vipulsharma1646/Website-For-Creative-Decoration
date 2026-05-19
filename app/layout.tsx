import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Creative Decoration - Premium Party Decorations',
  description:
    'Discover premium party decorations and supplies for every celebration. Balloons, kits, and more for unforgettable parties.',
  keywords: 'party, balloons, decorations, birthday, anniversary',
  openGraph: {
    title: 'Creative Decoration - Premium Party Decorations',
    description: 'Discover premium party decorations and supplies',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-party-bg text-party-text">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-party-dark text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Creative Decoration</h3>
                <p className="text-gray-400 text-sm">
                  Making celebrations unforgettable with premium party supplies
                  and decorations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="/" className="hover:text-amber-900 transition">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/products" className="hover:text-amber-900 transition">
                      Products
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Contact: info@creativedecoration.in</li>
                  <li>Phone: +91 81683 35256</li>
                  <li>Location: DD Colony, Kurukshetra</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
              <p>
                &copy; 2024 Creative Decoration. All rights reserved. Made with
                <span className="text-amber-900"> ❤️</span>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
