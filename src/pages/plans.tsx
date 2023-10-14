import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Icon,
} from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { CheckCircleIcon, SuitCaseIcon, UserIcon } from '@icons'
import fetcher from '../services/fetcher'

interface Props {
  children: React.ReactNode
}

function PriceWrapper(props: Props) {
  const { children } = props

  return (
    <Box
      style={{ marginTop: '2rem' }}
      maxW={'380px'}
      mb={4}
      shadow='base'
      borderWidth='1px'
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}
      {...props}
    >
      {children}
    </Box>
  )
}

type Plan = {
  id: number
  title: string
  price: string
  period: string
  path: string
  features: { id: number; description: string }[]
}

type ThreeTierPlansProps = {
  plans: Plan[]
}

export default function ThreeTierPlans({ plans }: ThreeTierPlansProps) {
  const { t } = useTranslation('plans')
  const colorValue = useColorModeValue('gray.500', 'gray.300')
  const bgColorValue = useColorModeValue('gray.50', 'gray.700')
  return (
    <>
      <NextSeo title='Swtle | Plans' />
      <Box py={12}>
        <VStack spacing={2} px={3} textAlign='center'>
          <Heading as='h1' fontSize='4xl'>
            {t('plans.header')}
          </Heading>
          <Text fontSize='lg' color={'gray.500'}>
            {t('plans.subheader')}
          </Text>
        </VStack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign='center'
          justify='center'
          spacing={{ base: 4, lg: 10 }}
          py={10}
        >
          {plans.map((plan: Plan) => (
            <PriceWrapper key={plan.id}>
              <Box position='relative'>
                <Box
                  position='absolute'
                  top='-28px'
                  left='50%'
                  style={{ transform: 'translate(-50%)' }}
                  bg='white'
                  borderRadius='full'
                  border='1px solid #A0AEC0'
                  p={1}
                  w='5.5rem'
                  h='2.4rem'
                >
                  <Icon as={UserIcon} color={colorValue} boxSize={6} />
                </Box>
                <Box py={4} px={12} mt={2}>
                  <Text fontWeight='500' fontSize='2xl'>
                    {plan.title}
                  </Text>
                  <HStack justifyContent='center'>
                    <Text fontSize='2xl' fontWeight='600'>
                      {plan.price}
                      {plan.period && (
                        <Text as='span' fontSize='sm' color='gray.600'>
                          &nbsp;/{plan.period}
                        </Text>
                      )}
                    </Text>
                  </HStack>
                </Box>
                <VStack bg={bgColorValue} py={4} borderBottomRadius={'xl'}>
                  <List spacing={3} textAlign='start' px={12}>
                    {plan.features.map((feature) => (
                      <ListItem key={feature.id}>
                        <ListIcon as={CheckCircleIcon} color='green.500' />
                        {feature.description}
                      </ListItem>
                    ))}
                  </List>
                  <Box w='80%' pt={4}>
                    <Button
                      as={NextLink}
                      href={plan.path}
                      w='full'
                      color='primary'
                      variant='outline'
                    >
                      {t('plans.register')}
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </PriceWrapper>
          ))}
        </Stack>
      </Box>
    </>
  )
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const response = await fetcher({
    url: `plan?populate=deep&locale=${locale}`,
  })
  if (!response || response.data?.length === 0) {
    return {
      notFound: true,
    }
  }
  const fetchedData = response.data.attributes
  return {
    props: {
      plans: fetchedData.plan,
      ...(await serverSideTranslations(locale!, [
        'common',
        'navigation',
        'plans',
        'footer',
      ])),
    },
  }
}
