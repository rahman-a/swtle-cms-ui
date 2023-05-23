import * as React from 'react'
import { useBreakpointValue } from '@chakra-ui/react'

export interface IGoogleMapProps {}

export default function GoogleMap(props: IGoogleMapProps) {
  const width = useBreakpointValue({ base: '100%', md: '600px' })
  return (
    <iframe
      src={process.env.NEXT_PUBLIC_GOOGLE_MAP_URL}
      width={width}
      height='450'
      style={{ border: 0 }}
      allowFullScreen={true}
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'
    ></iframe>
  )
}
