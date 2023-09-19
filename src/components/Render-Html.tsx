import parser from 'html-react-parser'
import { TextProps, Text } from '@chakra-ui/react'

export interface IRenderHtmlProps extends TextProps {
  html: string
  maxChar?: number
}

export default function RenderHtml({
  html,
  maxChar,
  ...rest
}: IRenderHtmlProps) {
  let parsedHtml = parser(html) as string
  if (maxChar) {
    parsedHtml =
      parsedHtml.length > maxChar
        ? parsedHtml.slice(0, maxChar) + ' . . . .'
        : parsedHtml
  }
  return <Text {...rest}>{parsedHtml}</Text>
}
