import { extendTheme } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useFont } from './useFont'
import { ButtonStyles as Button } from '../styles/components/Buttons'

export const useChakraTheme = () => {
  const { locale } = useRouter()
  const font = useFont()
  const colors = {
    primary: '#21597F',
    secondary: '#3FA5BA',
    variation: '#FFCA24',
    alert: '#E70000',
    surface: '#F9F9F9',
  }

  const fonts = {
    body: font.style.fontFamily,
    Heading: font.style.fontFamily,
  }

  return extendTheme({
    direction: locale === 'ar' ? 'rtl' : 'ltr',
    styles: {
      global: {
        body: {
          direction: locale === 'ar' ? 'rtl' : 'ltr',
        },
      },
    },
    colors,
    fonts,
    components: {
      Button,
    },
  })
}
