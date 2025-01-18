'use client'

import { Alert, Button, Stack, Text } from '@mantine/core'
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Stack align="center" gap="md" p="xl">
          <Alert
            variant="filled"
            color="red"
            title="Something went wrong"
            w="100%"
            maw={500}
          >
            <Text size="sm" mb="md">
              An error occurred while rendering this component.
            </Text>
            <Button
              variant="white"
              color="red"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </Button>
          </Alert>
        </Stack>
      )
    }

    return this.props.children
  }
}
