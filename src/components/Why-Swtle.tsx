import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import FeatureCard from './Feature-Card'

interface IWhySwtleProps {}

export default function WhySwtle(props: IWhySwtleProps) {
  const { t } = useTranslation('home')
  const cards = [
    {
      id: 1,
      title: t('features.1.title'),
      description: t('features.1.content'),
      image: '/images/feature-1.png',
    },

    {
      id: 2,
      title: t('features.2.title'),
      description: t('features.2.content'),
      image: '/images/feature-2.png',
    },
    {
      id: 3,
      title: t('features.3.title'),
      description: t('features.3.content'),
      image: '/images/feature-3.png',
    },
    {
      id: 4,
      title: t('features.4.title'),
      description: t('features.4.content'),
      image: '/images/feature-4.png',
    },
  ]
  return (
    <Container minW='95%' py={20}>
      <Flex
        direction='column'
        justifyContent='space-between'
        alignItems='center'
        gap={20}
      >
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Text
            as='h3'
            fontSize={{ base: '3xl', xl: '4xl' }}
            fontWeight='bold'
            color='secondary'
          >
            {t('features.title')}
          </Text>
          <Text
            as='p'
            textAlign='center'
            fontSize={{ base: 'xl', xl: '2xl' }}
            width={{ base: '100%', lg: '55%' }}
          >
            {t('features.subtitle')}
          </Text>
        </Box>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyContent='center'
          alignItems='center'
          width='100%'
          flexWrap='wrap'
          gap={4}
        >
          {cards.map((card, idx) => (
            <FeatureCard key={card.id} {...card} />
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}
