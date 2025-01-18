import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'

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
        <ColorSchemeScript />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </head>
      <body>
        <MantineProvider
          withNormalizeCSS
          theme={{
            primaryColor: 'blue',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          <Notifications position="top-right" zIndex={2077} />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
