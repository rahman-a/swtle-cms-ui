import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface IIndicatorLineProps {
  step: number
  type: 'personal' | 'business'
}

export default function IndicatorLine({ step, type }: IIndicatorLineProps) {
  const { locale } = useRouter()
  const stepProgressValue = type === 'personal' ? step * 25 : step * 20
  const indicatorPositionStyle =
    locale === 'en'
      ? {
          left: {
            base: type === 'business' ? '1.1rem' : '2rem',
            sm: type === 'business' ? '3rem' : '2.5rem',
            md: '5rem',
            lg: '3.5rem',
          },
          transform: 'translateX(0)',
        }
      : {
          right: { base: '1.5rem', sm: '3rem', md: '4rem' },
          transform: { base: 'translateX(-1.2rem)' },
        }
  const barWidth = {
    base: type === 'personal' ? '86%' : '90%',
    sm: '84%',
    md: type === 'personal' ? '80%' : '82%',
  }
  return (
    <Box
      position='absolute'
      top={{ base: '1rem' }}
      {...indicatorPositionStyle}
      transform={{ base: 'translateX(0)' }}
      w={barWidth}
      h={{ base: '0.5rem' }}
      bg='gray.300'
      zIndex='-1'
      display='block'
    >
      <Box
        position='absolute'
        top='0'
        left='0'
        width={{ base: `${stepProgressValue}%` }}
        height={{ base: '0.5rem' }}
        bgGradient='linear(to-b, primary, secondary)'
        transition='all 0.5s ease'
      ></Box>
    </Box>
  )
}
