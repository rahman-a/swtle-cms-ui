import {
  Container,
  Flex,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import SectionImage from './Section-Image'
import { useTranslation } from 'next-i18next'

interface ISpecialAboutSwtleProps {}

export default function SpecialAboutSwtle(props: ISpecialAboutSwtleProps) {
  const { t } = useTranslation('home')
  const features = [
    {
      id: 1,
      title: t('special.1.title'),
      description: t('special.1.content'),
    },
    {
      id: 2,
      title: t('special.2.title'),
      description: t('special.2.content'),
    },
    {
      id: 3,
      title: t('special.3.title'),
      description: t('special.3.content'),
    },
    {
      id: 4,
      title: t('special.4.title'),
      description: t('special.4.content'),
    },
  ]

  return (
    <Container minW='95%' py={20}>
      <Flex direction='column' gap={16} alignItems='center'>
        <Text
          as='h2'
          fontSize={{ base: '2xl', xl: '3xl' }}
          fontWeight='bold'
          color='secondary'
        >
          {t('special.title')}
        </Text>
        <Flex
          gap={{ base: 14, xl: 20 }}
          alignItems='flex-start'
          flexDirection={{ base: 'column', xl: 'row' }}
        >
          <SectionImage
            image='/images/special-swtle.png'
            radius='top right'
            outline='bottom right'
          />
          <List width={{ base: '100%', xl: '45%' }} spacing={8}>
            {features.map((feature) => (
              <ListItem key={feature.id}>
                <HStack>
                  <ListIcon
                    width='1.5rem'
                    height='1.5rem'
                    as={CheckIcon}
                    color='green.500'
                  />
                  <Text
                    as='h3'
                    fontSize={{ base: 'md', sm: 'lg', xl: 'xl' }}
                    mb={2}
                    display='inline-block'
                  >
                    {feature.title}
                  </Text>
                </HStack>
                <Text
                  as='p'
                  fontSize={{ base: 'sm', sm: 'md' }}
                  color='gray.600'
                  ml={{ base: '2.5rem', xl: 12 }}
                >
                  {feature.description}
                </Text>
              </ListItem>
            ))}
          </List>
        </Flex>
      </Flex>
    </Container>
  )
}
