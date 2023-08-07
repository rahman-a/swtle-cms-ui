import { Box, Flex, HStack, VStack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { fadeUp, fadeDown } from '@animation-variants'
import CTA from './Header/CTA'
import VideoPlayer from './Videos'
import { useRouter } from 'next/router'
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
  const { locale } = useRouter()
  return (
    <>
      <Box
        className='hero-section'
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
        top='-91px'
        left={0}
        z-index={-1}
      >
        <Flex
          position={'relative'}
          top={0}
          left={0}
          width={'100%'}
          height={'100%'}
        >
          <VStack
            mt={{ base: 32, '2xl': 40 }}
            width='100%'
            spacing={{ base: 24, md: 28 }}
          >
            <Flex
              flexDirection={{ base: 'column', lg: 'row' }}
              width='100%'
              gap={{ base: 14, lg: 48, xl: 56, '2xl': 80 }}
            >
              <VStack
                width={{ base: '100%', lg: '50%' }}
                alignItems={{ base: 'center', lg: 'flex-start' }}
                spacing={6}
                as={motion.div}
                initial='hide'
                whileInView='show'
                exit='show'
                variants={fadeUp}
                ml={{ base: 0, lg: locale === 'ar' ? 0 : 16 }}
                mr={{ base: 0, lg: locale === 'ar' ? 16 : 0 }}
              >
                <Text
                  as='h1'
                  color='#000'
                  fontWeight='bold'
                  textAlign={{ base: 'center', lg: 'start' }}
                  fontSize={{
                    base: '25px',
                    md: '40px',
                    lg: '50px',
                    xl: '55px',
                  }}
                >
                  {data.title} &nbsp;
                  <Text as='span' color='secondary' textDecoration='underline'>
                    {data.companyName}
                  </Text>
                </Text>
                <Text
                  as='p'
                  color='#000'
                  textAlign={{
                    base: 'center',
                    lg: 'start',
                  }}
                  width={{ base: '80%', md: '100%' }}
                  fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                >
                  {data.subtitle}
                </Text>
                {data.cta?.label && (
                  <CTA label={data.cta.label} href={data.cta.href} />
                )}
              </VStack>
              <Box
                as={motion.div}
                width={{ base: '100%', lg: '50%' }}
                display='flex'
                justifyContent='center'
                initial='hide'
                whileInView='show'
                exit='show'
                variants={fadeUp}
                mr={{ base: 0, lg: locale === 'ar' ? 0 : 16 }}
                ml={{ base: 0, lg: locale === 'ar' ? 16 : 0 }}
                minH={80}
              >
                <VideoPlayer
                  url={data.video.url}
                  thumbnail={data.video.thumbnail}
                  containerStyles={{
                    height: { base: 60, md: 'auto' },
                    width: { base: '95%', sm: '65%', lg: '100%' },
                  }}
                />
              </Box>
            </Flex>

            {isStatistics && (
              <HStack
                w='100%'
                as={motion.div}
                justifyContent='space-between'
                alignItems='center'
                flexWrap={{ base: 'wrap', lg: 'nowrap' }}
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
                      color='#000'
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
                      color='primary'
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
                        <Text
                          as='span'
                          color='primary'
                          fontSize={{ base: '20' }}
                        >
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
      </Box>
      <Partners partners={data.partners} />
    </>
  )
}
