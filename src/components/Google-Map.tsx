import * as React from 'react'
import { useBreakpointValue } from '@chakra-ui/react'

export interface IGoogleMapProps {}

export default function GoogleMap({ url }: { url: string }) {
  const width = useBreakpointValue({ base: '100%', md: '600px' })
  return (
    <iframe
      src={url ?? process.env.NEXT_PUBLIC_GOOGLE_MAP_URL}
      width={width}
      height='450'
      style={{ border: 0 }}
      allowFullScreen={true}
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'
    ></iframe>
  )
}
