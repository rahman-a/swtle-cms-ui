import { Container, Box, Flex, HStack, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useScroll } from 'framer-motion'
import howItWorksBG from '@assets/images/how-it-works.png'
import howItWorksBGMedium from '@assets/images/how-it-works-md.png'
import howItWorksBGSmall from '@assets/images/how-it-works-sm.png'
import { HeroSection, WorkStep } from '../components'
export interface IHowItWorksProps {}

export default function HowItWorks(props: IHowItWorksProps) {
  const [timeLineHeight, setTimeLineHeight] = useState(0)
  const [indicatorOffset, setIndicatorOffset] = useState(0)
  const [timeLineIndicatorHeight, setTimeLineIndicatorHeight] = useState(0)
  const [
    distanceBetweenTimelineTipAndPageTop,
    setDistanceBetweenTimelineTipAndPageTop,
  ] = useState(0)
  const [timeLineContainerBottom, setTimeLineContainerBottom] = useState(0)
  const timeLineRef = useRef<HTMLDivElement>(null)
  const { locale } = useRouter()
  const { t } = useTranslation('how-it-works')
  const { t: tn } = useTranslation('navigation')
  const timeLineContainerRef = useRef<HTMLDivElement>(null)
  const timeLineSectionRef = useRef<HTMLDivElement>(null)
  const scroll = useScroll()

  const steps = [
    {
      id: 1,
      title: t('works.step.1.title'),
      description: t('works.step.1.content'),
      image: '/images/steps/work-step-1.png',
    },
    {
      id: 2,
      title: t('works.step.2.title'),
      description: t('works.step.2.content'),
      image: '/images/steps/work-step-2.png',
    },
    {
      id: 3,
      title: t('works.step.3.title'),
      description: t('works.step.3.content'),
      image: '/images/steps/work-step-3.png',
    },
    {
      id: 4,
      title: t('works.step.4.title'),
      description: t('works.step.4.content'),
      image: '/images/steps/work-step-4.png',
    },
    {
      id: 5,
      title: t('works.step.5.title'),
      description: t('works.step.5.content'),
      image: '/images/steps/work-step-5.png',
    },
    {
      id: 6,
      title: t('works.step.6.title'),
      description: t('works.step.6.content'),
      image: '/images/steps/work-step-6.png',
    },
    {
      id: 7,
      title: t('works.step.7.title'),
      description: t('works.step.7.content'),
      image: '/images/steps/work-step-7.png',
    },
  ]
  scroll.scrollY.on('change', (v) => {
    if (distanceBetweenTimelineTipAndPageTop === 0) return
    if (distanceBetweenTimelineTipAndPageTop >= v) {
      setIndicatorOffset(0)
      return
    }
    if (timeLineContainerBottom <= v) {
      return
    }
    const offset = v - distanceBetweenTimelineTipAndPageTop! + 95
    setIndicatorOffset(offset)
  })

  useEffect(() => {
    if (timeLineContainerRef.current?.offsetHeight) {
      setTimeLineHeight(timeLineContainerRef.current?.offsetHeight)
      setTimeLineContainerBottom(
        timeLineContainerRef.current.getBoundingClientRect().bottom
      )
    }
  }, [timeLineContainerRef.current?.offsetHeight])

  useEffect(() => {
    if (timeLineSectionRef.current?.offsetHeight) {
      setTimeLineIndicatorHeight(timeLineSectionRef.current?.offsetHeight)
    }
  }, [timeLineSectionRef.current?.offsetHeight])

  useEffect(() => {
    if (timeLineRef.current) {
      setDistanceBetweenTimelineTipAndPageTop(
        timeLineRef.current?.getBoundingClientRect().top
      )
    }
  }, [])

  return (
    <>
      <NextSeo title='Swtle | How it Works' />
      <HeroSection
        image={{
          base: howItWorksBGSmall,
          md: howItWorksBGMedium,
          xl: howItWorksBG,
        }}
        title={tn('how_it_works')}
      />
      <Container minW='95%'>
        <Text
          fontSize={{ base: '2xl', md: '3xl', xl: '4xl' }}
          width={{ base: '95%', md: '60%' }}
        >
          {t('works.header')}
        </Text>
        <Flex
          py={32}
          width='100%'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          position='relative'
        >
          <Text width='fit-content' fontWeight='bold' fontSize='3xl'>
            {t('works.strategy')}
          </Text>
          <HStack
            ref={timeLineContainerRef}
            width={{ base: '100%', sm: 'auto' }}
            alignItems={{ base: 'flex-start', sm: 'center' }}
            flexDirection='column'
            position='relative'
          >
            {steps.map((step, index) => (
              <WorkStep
                key={step.id}
                step={step.id}
                isReverse={index % 2 === 1}
                title={step.title}
                description={step.description}
                image={step.image}
                ref={timeLineSectionRef}
                isEven={index % 2 === 0}
              />
            ))}
            <Box
              ref={timeLineRef}
              width='0.3rem'
              height={`${timeLineHeight}px`}
              position='absolute'
              bg='gray.300'
              borderRadius='md'
              top={{ base: '5rem', sm: 'unset' }}
              left={{ base: '-12px', sm: 'unset' }}
            >
              <Box
                position='absolute'
                width='0.3rem'
                transition='top 0.5s ease-in-out'
                top={`${indicatorOffset}px`}
                height={`${timeLineIndicatorHeight}px`}
                bg='secondary'
                borderRadius='md'
              ></Box>
            </Box>
          </HStack>
        </Flex>
      </Container>
    </>
  )
}
export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'home',
        'navigation',
        'how-it-works',
        'footer',
      ])),
    },
  }
}
