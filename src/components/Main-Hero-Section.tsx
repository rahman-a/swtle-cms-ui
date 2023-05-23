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
import heroSectionBGImage from '@assets/images/main-hero-section.png'
import heroSectionBGImageMedium from '@assets/images/main-hero-section-md.png'
import heroSectionBGImageSmall from '@assets/images/main-hero-section-sm.png'
import CTA from './Header/CTA'
import Video from './Videos'
import { PlayIcon } from '../icons'
import Partners from './Partners'
import CountUp from 'react-countup'
// const CountUp = dynamic(() => import('react-countup'), { ssr: false })

interface IMainHeroSectionProps {
  isStatistics?: boolean
}

export default function MainHeroSection({
  isStatistics,
}: IMainHeroSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t: tHome } = useTranslation('home')
  const stats = [
    {
      id: 1,
      label: tHome('hero.stats.transactions'),
      value: '60000',
      suffix: '+',
    },
    { id: 2, label: tHome('hero.stats.member'), value: '75', suffix: 'K+' },
    {
      id: 3,
      label: tHome('hero.stats.current_payments'),
      value: '1.7',
      suffix: 'M+',
      currency: 'aed',
    },
    {
      id: 4,
      label: tHome('hero.stats.settled_payments'),
      value: '2.4',
      suffix: 'M+',
      currency: 'aed',
    },
  ]
  return (
    <>
      <Video isOpen={isOpen} onClose={onClose} />
      <Box
        className='hero-section'
        height='100vh'
        width='100%'
        backgroundImage={{
          base: `url(${heroSectionBGImageSmall.src})`,
          md: `url(${heroSectionBGImageMedium.src})`,
          xl: `url(${heroSectionBGImage.src})`,
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
                {tHome('hero.title')} &nbsp;
                <Text as='span' color='secondary' textDecoration='underline'>
                  {tHome('hero.swtle')}
                </Text>
              </Text>
              <Text
                as='p'
                color='white'
                textAlign={{ base: 'center', md: 'left' }}
                width={{ base: '80%', md: '100%' }}
                fontSize={{ base: '16px', md: '18px', lg: '20px' }}
              >
                {tHome('hero.subtitle')}
              </Text>
              <HStack spacing={3}>
                <Button
                  variant='outline'
                  color='white'
                  _hover={{ background: '#000', borderColor: '#000' }}
                  borderRadius='5rem'
                  onClick={onOpen}
                >
                  {tHome('hero.video_btn')}
                  <PlayIcon width='1.5rem' height='1.5rem' />
                </Button>
                <CTA label={tHome('hero.cta')} />
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
                      {stat.label}
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
        <Partners />
      </Box>
    </>
  )
}
