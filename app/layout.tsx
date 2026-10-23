import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import LangUpdater from '@/components/LangUpdater'
import TechBackground from '@/components/TechBackground'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ivantechcoach.com'),
  alternates: {
    canonical: 'https://www.ivantechcoach.com/es',
    languages: {
      'es': 'https://www.ivantechcoach.com/es',
      'ca': 'https://www.ivantechcoach.com/ca',
      'en': 'https://www.ivantechcoach.com/en',
      'x-default': 'https://www.ivantechcoach.com/es',
    },
  },
  title: 'Ivan Tech Coach | Infraestructura TI, Ciberseguridad e IA Aplicada',
  description: 'Más de 20 años de experiencia en sistemas, redes y ciberseguridad integrados con asesoría práctica en modelos de IA. Cero humo tecnológico, resultados medibles.',
  keywords: [
    'asesoría inteligencia artificial',
    'modelos de IA para empresas',
    'infraestructura TI',
    'ciberseguridad',
    'automatización de procesos',
    'Ivan Tech Coach',
  ],
  authors: [{ name: 'Jaime Iván Rodríguez Morales (Ivan Tech Coach)' }],
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
    title: 'Ivan Tech Coach | Infraestructura TI, Ciberseguridad e IA Aplicada',
    description: 'Más de 20 años en sistemas, redes y ciberseguridad unidos a la adopción práctica y segura de modelos de IA.',
    siteName: 'Ivan Tech Coach',
    images: [
      {
        url: '/images/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Ivan Tech Coach - Infraestructura TI, Ciberseguridad e IA Aplicada',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ivan Tech Coach | Infraestructura TI, Ciberseguridad e IA Aplicada',
    description: 'Más de 20 años en sistemas, redes y ciberseguridad unidos a la adopción práctica y segura de modelos de IA.',
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
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable} theme-dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('itc-theme');
                  var theme = (stored === 'light' || stored === 'dark') ? stored : 'dark';
                  var root = document.documentElement;
                  root.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast', 'theme-sepia');
                  root.classList.add('theme-' + theme);
                } catch (e) {
                  document.documentElement.classList.add('theme-dark');
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[3000] focus:px-4 focus:py-2 focus:bg-[var(--card)] focus:text-[var(--text)] focus:border focus:border-[var(--border-strong)] focus:rounded-md"
        >
          Saltar al contenido principal
        </a>
        <LangUpdater />
        {children}
      </body>
    </html>
  )
}
