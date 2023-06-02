import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { fadeUp, fadeDown } from '@animation-variants'

import CTA from './Header/CTA'
import Video from './Videos'
import { PlayIcon } from '../icons'
import Partners from './Partners'
import CountUp from 'react-countup'

type Stat = {
  id: number
  value: number
  name: string
  currency?: string
  suffix?: string
  prefix?: string
}

type Partner = {
  id: number
  name: string
  logo: string
}

interface IMainHeroSectionProps {
  images: {
    base: string
    md: string
    lg: string
  }
  stats: Stat[]
  data: {
    title: string
    subtitle: string
    cta: {
      label: string
      href: string
    }
    companyName: string
    video: {
      url: string
      thumbnail?: string
    }
    partners: Partner[]
  }
  isStatistics?: boolean
}

export default function MainHeroSection({
  isStatistics,
  images,
  stats,
  data,
}: IMainHeroSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation('common')

  return (
    <>
      <Video
        isOpen={isOpen}
        onClose={onClose}
        link={data.video.url}
        thumbnail={data.video.thumbnail}
      />
      <Box
        className='hero-section'
        height='100vh'
        width='100%'
        backgroundImage={{
          base: `url(${images.base})`,
          md: `url(${images.md})`,
          xl: `url(${images.lg})`,
        }}
        backgroundSize='cover'
        backgroundPosition={{ base: 'inherit', md: 'center' }}
        backgroundRepeat={'no-repeat'}
        position={'relative'}
        top='-70px'
        left={0}
        z-index={-1}
      >
        <Flex
          position={'relative'}
          top={0}
          left={0}
          width={'100%'}
          height={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <VStack spacing={{ base: 24, md: 28 }}>
            <VStack
              spacing={6}
              as={motion.div}
              initial='hide'
              whileInView='show'
              exit='show'
              variants={fadeUp}
            >
              <Text
                as='h1'
                color='white'
                fontWeight='bold'
                textAlign='center'
                fontSize={{ base: '25px', md: '40px', lg: '60px' }}
              >
                {data.title} &nbsp;
                <Text as='span' color='secondary' textDecoration='underline'>
                  {data.companyName}
                </Text>
              </Text>
              <Text
                as='p'
                color='white'
                textAlign={{ base: 'center', md: 'left' }}
                width={{ base: '80%', md: '100%' }}
                fontSize={{ base: '16px', md: '18px', lg: '20px' }}
              >
                {data.subtitle}
              </Text>
              <HStack spacing={3}>
                {data.video?.url && (
                  <Button
                    variant='outline'
                    color='white'
                    _hover={{ background: '#000', borderColor: '#000' }}
                    borderRadius='5rem'
                    onClick={onOpen}
                  >
                    {t('video_btn')}
                    <PlayIcon width='1.5rem' height='1.5rem' />
                  </Button>
                )}
                {data.cta?.label && (
                  <CTA label={data.cta.label} href={data.cta.href} />
                )}
              </HStack>
            </VStack>
            {isStatistics && (
              <HStack
                w='100%'
                as={motion.div}
                justifyContent='space-between'
                alignItems='center'
                flexWrap='wrap'
                initial='hide'
                whileInView='show'
                exit='show'
                variants={fadeDown}
              >
                {stats.map((stat) => (
                  <VStack
                    key={stat.id}
                    spacing={3}
                    color='white'
                    w={{ base: '10rem', sm: '14rem', md: '18rem' }}
                    mb={{ base: '2rem !important', xl: '0' }}
                  >
                    <Text
                      as='p'
                      fontSize={{
                        base: '12px',
                        sm: '14px',
                        md: '16px',
                        lg: '20px',
                        xl: '24px',
                      }}
                    >
                      {stat.name}
                    </Text>
                    <Text
                      as='p'
                      fontSize={{
                        base: '16px',
                        sm: '18px',
                        md: '20px',
                        lg: '24px',
                        xl: '28px',
                      }}
                      fontWeight='bold'
                    >
                      {stat.currency ? (
                        <Text as='span' fontSize={{ base: '20' }}>
                          {stat.currency.toUpperCase()} &nbsp;
                        </Text>
                      ) : (
                        ''
                      )}
                      <CountUp
                        end={Number(stat.value)}
                        duration={5}
                        delay={1}
                        decimals={1}
                        suffix={stat.suffix}
                      />
                    </Text>
                  </VStack>
                ))}
              </HStack>
            )}
          </VStack>
        </Flex>
        <Partners partners={data.partners} />
      </Box>
    </>
  )
}
