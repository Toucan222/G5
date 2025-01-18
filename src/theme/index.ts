import { createTheme, rem } from '@mantine/core'

export const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: 'Greycliff CF, sans-serif',
  },
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  colors: {
    // You can add custom colors here
  },
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 1px 3px rgba(0, 0, 0, 0.15)',
    lg: '0 1px 3px rgba(0, 0, 0, 0.2)',
    xl: '0 1px 3px rgba(0, 0, 0, 0.25)',
  },
  other: {
    // You can add other theme properties here
  },
  components: {
    Button: {
      defaultProps: {
        size: 'md',
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        padding: 'lg',
      },
    },
    Paper: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        p: 'md',
      },
    },
    Title: {
      defaultProps: {
        order: 2,
      },
    },
  },
})
