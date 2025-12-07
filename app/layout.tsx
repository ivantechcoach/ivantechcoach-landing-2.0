import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LangUpdater from '@/components/LangUpdater'
import TechBackground from '@/components/TechBackground'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Ivan Tech Coach | Tecnología sin fricción',
  description: 'Transformo la complejidad tecnológica en soluciones claras y accionables. Sin jerga, sin complicaciones, solo resultados que impulsan tu negocio.',
  keywords: ['consultoría tecnológica', 'arquitectura de software', 'transformación digital', 'tecnología sin fricción', 'Ivan Tech Coach'],
  authors: [{ name: 'Ivan Tech Coach' }],
  creator: 'Ivan Tech Coach',
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/images/apple-icon-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/images/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    title: 'Ivan Tech Coach | Tecnología sin fricción',
    description: 'Transformo la complejidad tecnológica en soluciones claras y accionables. Sin jerga, sin complicaciones, solo resultados que impulsan tu negocio.',
    siteName: 'Ivan Tech Coach',
    images: [
      {
        url: '/images/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Ivan Tech Coach - Tecnología sin fricción',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ivan Tech Coach | Tecnología sin fricción',
    description: 'Transformo la complejidad tecnológica en soluciones claras y accionables. Sin jerga, sin complicaciones, solo resultados que impulsan tu negocio.',
    images: ['/images/og-cover.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* 
          FIX DEL THEME:
          Este script elimina todas las clases viejas y aplica solo la correcta
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('itc-theme') || 'light';
                  const root = document.documentElement;

                  root.classList.remove(
                    'theme-light',
                    'theme-dark',
                    'theme-high-contrast',
                    'theme-sepia'
                  );

                  root.classList.add('theme-' + stored);
                } catch (e) {
                  document.documentElement.classList.add('theme-light');
                }
              })();
            `,
          }}
        />
      </head>

      <body className={inter.className}>
        <TechBackground />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[3000] focus:px-4 focus:py-2 focus:bg-[var(--bg-2)] focus:text-[var(--text)] focus:rounded-md focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        <LangUpdater />
        {children}
      </body>
    </html>
  )
}