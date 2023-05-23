import { Box, Text } from '@chakra-ui/react'
import { StaticImageData } from 'next/image'
import { fadeUp } from '@animation-variants'
import { motion } from 'framer-motion'

interface IHeroSectionProps {
  image: {
    base: StaticImageData
    md: StaticImageData
    xl: StaticImageData
  }
  title: string
  position?: {
    base?: string
    md?: string
    xl?: string
  }
}

export default function HeroSection({
  image,
  title,
  position,
}: IHeroSectionProps) {
  return (
    <Box
      display='flex'
      alignItems='flex-end'
      height='45vh'
      width='100%'
      backgroundImage={{
        base: `url(${image.base.src})`,
        md: `url(${image.md.src})`,
        xl: `url(${image.xl.src})`,
      }}
      backgroundSize='cover'
      backgroundPosition={position ? position : 'center'}
      backgroundRepeat='no-repeat'
      position={'relative'}
      top='-70px'
      left={0}
      z-index={-1}
    >
      <Box p='2rem'>
        <Text
          as={motion.h1}
          initial='hide'
          whileInView='show'
          exit='show'
          variants={fadeUp}
          fontWeight='bold'
          letterSpacing='2px'
          color='white'
          fontSize={{ base: '2.5rem', md: '3rem', lg: '3.5rem' }}
        >
          {title.toLocaleUpperCase()}
        </Text>
      </Box>
    </Box>
  )
}
