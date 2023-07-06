import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import * as React from 'react'

interface IIndicatorLineProps {
  step: number
}

export default function IndicatorLine({ step }: IIndicatorLineProps) {
  const { locale } = useRouter()
  const indicatorPositionStyle =
    locale === 'en'
      ? {
          left: {
            base: '1rem',
            sm: '2.5rem',
            md: '5rem',
            lg: '3rem',
            xl: '5rem',
          },
          transform: 'translateX(0)',
        }
      : {
          right: { base: '2.5rem', sm: '3rem', md: '5rem' },
          transform: { base: 'translateX(-1.2rem)' },
        }
  return (
    <Box
      position='absolute'
      top={{ base: '1rem' }}
      {...indicatorPositionStyle}
      transform={{ base: 'translateX(0)' }}
      w={{ base: '86%', sm: '84%', md: '80%', lg: '80%' }}
      h={{ base: '0.5rem' }}
      bg='gray.300'
      zIndex='-1'
      display='block'
    >
      <Box
        position='absolute'
        top='0'
        left='0'
        width={{ base: `${step * 25}%` }}
        height={{ base: '0.5rem' }}
        bgGradient='linear(to-b, primary, secondary)'
        transition='all 0.5s ease'
      ></Box>
    </Box>
  )
}
