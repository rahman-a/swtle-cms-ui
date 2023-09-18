import { Container, Box, Flex, HStack, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { NextSeo } from 'next-seo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import { useScroll } from 'framer-motion'
import howItWorksBG from '@assets/images/how-it-works.webp'
import howItWorksBGMedium from '@assets/images/how-it-works-md.webp'
import howItWorksBGSmall from '@assets/images/how-it-works-sm.webp'
import ProcessThumbnail from '@assets/images/process_thumbnail.webp'
import { HeroSection, WorkStep } from '../components'
import fetcher from '../services/fetcher'
import Video from '../components/Videos'

export default function HowItWorks({
  data,
  metadata,
}: {
  data: any
  metadata: any
}) {
  const [timeLineHeight, setTimeLineHeight] = useState(0)
  const [indicatorOffset, setIndicatorOffset] = useState(0)
  const [timeLineIndicatorHeight, setTimeLineIndicatorHeight] = useState(0)
  const [
    distanceBetweenTimelineTipAndPageTop,
    setDistanceBetweenTimelineTipAndPageTop,
  ] = useState(0)
  const [timeLineContainerBottom, setTimeLineContainerBottom] = useState(0)
  const timeLineRef = useRef<HTMLDivElement>(null)
  const timeLineContainerRef = useRef<HTMLDivElement>(null)
  const timeLineSectionRef = useRef<HTMLDivElement>(null)
  const scroll = useScroll()

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
      <NextSeo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
      />
      <HeroSection
        image={{
          base: howItWorksBGSmall,
          md: howItWorksBGMedium,
          xl: howItWorksBG,
        }}
        title={data.header}
      />
      <Container minW='95%'>
        <Flex
          alignItems='center'
          w='full'
          gap={14}
          flexDirection={{ base: 'column-reverse', lg: 'row' }}
        >
          <Text
            fontSize={{ base: '2xl', md: '3xl', xl: '4xl' }}
            width={{ base: '95%', md: '60%' }}
          >
            {data.description}
          </Text>
          <Video
            url='https://www.youtube.com/watch?v=vn59J41x4GI&ab_channel=Swtle'
            thumbnail={ProcessThumbnail.src}
            containerStyles={{
              width: { base: '21.5rem', sm: '24rem' },
              height: { base: '14rem', sm: '15rem' },
            }}
          />
        </Flex>

        <Flex
          py={32}
          width='100%'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          position='relative'
        >
          <Text width='fit-content' fontWeight='bold' fontSize='3xl'>
            {data.flowTitle}
          </Text>
          <HStack
            ref={timeLineContainerRef}
            width={{ base: '100%', sm: 'auto' }}
            alignItems={{ base: 'flex-start', sm: 'center' }}
            flexDirection='column'
            position='relative'
          >
            {data.steps.map((step: any, index: number) => (
              <WorkStep
                key={step.id}
                step={step.step}
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
  const response = await fetcher({
    url: `how-it-work?populate=deep&locale=${locale}`,
  })
  if (!response || response.data?.length === 0) {
    return {
      notFound: true,
    }
  }
  const fetchedData = response.data.attributes

  const data = {
    header: fetchedData.header,
    description: fetchedData.description,
    flowTitle: fetchedData.stepsFlowTitle,
    steps: fetchedData.steps.sort((a: any, b: any) => a.step - b.step),
  }
  return {
    props: {
      data,
      metadata: fetchedData.metadata,
      ...(await serverSideTranslations(locale!, [
        'common',
        'navigation',
        'footer',
      ])),
    },
  }
}
