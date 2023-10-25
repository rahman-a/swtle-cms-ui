import { Box, Container, Flex, Text } from '@chakra-ui/react'
import FeatureCard from './Feature-Card'

interface IWhySwtleProps {
  header: string
  subheader: string
  articles: {
    id: number
    title: string
    body: string
    slug: string
    image: string
  }[]
}

export default function WhySwtle({
  header,
  subheader,
  articles,
}: IWhySwtleProps) {
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
            as='h2'
            fontSize={{ base: '3xl', xl: '4xl' }}
            fontWeight='bold'
            color='secondary'
          >
            {header}
          </Text>
          <Text
            as='p'
            textAlign='center'
            fontSize={{ base: 'xl', xl: '2xl' }}
            width={{ base: '100%', lg: '55%' }}
          >
            {subheader}
          </Text>
        </Box>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyContent='center'
          width='100%'
          flexWrap='wrap'
        >
          {articles.map((article, idx) => (
            <FeatureCard key={article.id} {...article} />
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}
