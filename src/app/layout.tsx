import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { validateEnv } from '@/lib/env'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'
import './globals.css'

// Validate environment variables
validateEnv()

export const metadata = {
  title: 'FlashRank - Discovery, not search',
  description: 'Transform your learning with interactive cards and intelligent rankings.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <ColorSchemeScript />
      </head>
      <body>
        <ErrorBoundary>
          <MantineProvider defaultColorScheme="light">
            <Notifications position="top-right" zIndex={2077} />
            {children}
          </MantineProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
