import { useRouter } from 'next/router'
import { Lato, Almarai } from 'next/font/google'
const LatoFont = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
})
const AlmaraiFont = Almarai({
  subsets: ['arabic'],
  weight: ['300', '400', '700'],
})
export const useFont = () => {
  const { locale } = useRouter()
  return locale === 'en' ? LatoFont : AlmaraiFont
}
