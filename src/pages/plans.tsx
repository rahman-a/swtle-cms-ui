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
import { CheckCircleIcon, SuitCaseIcon, UserIcon } from '@icons'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'

interface Props {
  children: React.ReactNode
}

function PriceWrapper(props: Props) {
  const { children } = props

  return (
    <Box
      style={{ marginTop: '2rem' }}
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

export default function ThreeTierPlans() {
  const { t } = useTranslation('plans')
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
          <PriceWrapper>
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
                <Icon
                  as={UserIcon}
                  color={useColorModeValue('gray.500', 'gray.300')}
                  boxSize={6}
                />
              </Box>
              <Box py={4} px={12} mt={2}>
                <Text fontWeight='500' fontSize='2xl'>
                  {t('plans.personal')}
                </Text>
                <HStack justifyContent='center'>
                  <Text fontSize='2xl' fontWeight='600'>
                    {t('plans.free')}/{' '}
                    <Text as='span' fontSize='sm' color='gray.600'>
                      {t('plans.forever')}
                    </Text>
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}
              >
                <List spacing={3} textAlign='start' px={12}>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color='green.500' />
                    unlimited build minutes
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color='green.500' />
                    Lorem, ipsum dolor.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color='green.500' />
                    5TB Lorem, ipsum dolor.
                  </ListItem>
                </List>
                <Box w='80%' pt={4}>
                  <Button
                    as={NextLink}
                    href='/register/personal'
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

          <PriceWrapper>
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
                <Icon
                  as={SuitCaseIcon}
                  color={useColorModeValue('gray.500', 'gray.300')}
                  boxSize={6}
                />
              </Box>
              <Box py={4} px={12} mt={2}>
                <Text fontWeight='500' fontSize='2xl'>
                  {t('plans.business')}
                </Text>
                <HStack justifyContent='center'>
                  <Text fontSize='2xl' fontWeight='600'>
                    {t('plans.free')}/{' '}
                    <Text as='span' fontSize='sm' color='gray.600'>
                      {t('plans.forever')}
                    </Text>
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}
              >
                <List spacing={3} textAlign='start' px={12}>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color='green.500' />
                    unlimited build minutes
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color='green.500' />
                    Lorem, ipsum dolor.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color='green.500' />
                    5TB Lorem, ipsum dolor.
                  </ListItem>
                </List>
                <Box w='80%' pt={4}>
                  <Button
                    as={NextLink}
                    href='/register/business'
                    w='full'
                    color='primary'
                  >
                    {t('plans.register')}
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>
        </Stack>
      </Box>
    </>
  )
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'navigation',
        'plans',
        'footer',
      ])),
    },
  }
}
