import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'
import { useChakraTheme } from '../hooks/useChakraTheme'
import { Layout, ChatwootLiveChat } from '@components'

export default appWithTranslation(function App({
  Component,
  pageProps,
}: AppProps) {
  const theme = useChakraTheme()
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ChatwootLiveChat />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
})
