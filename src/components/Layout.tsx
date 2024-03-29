import Header from './Header/Header'
import Footer from './Footer'
import Head from 'next/head'

interface ILayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta httpEquiv='content-type' content='text/html; charset=UTF-8' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link href='/favicon.ico' rel='shortcut icon' type='image/svg' />
        <link href='/favicon.ico' rel='apple-touch-icon' />
        <link href='/favicon.ico' rel='apple-touch-icon' sizes='72x72' />
        <link href='/favicon.ico' rel='apple-touch-icon' sizes='114x114' />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
