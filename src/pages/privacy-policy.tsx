import NextLink from 'next/link'
import {
  Box,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react'
import { PrivacyLockIcon } from '../icons'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
interface IPrivacyPolicyProps {}

export default function PrivacyPolicy(props: IPrivacyPolicyProps) {
  return (
    <Container minW='95%' mt={{ base: 6, md: 10, lg: 12, xl: 14 }}>
      <Flex flexDirection='column'>
        <Box>
          <PrivacyLockIcon boxSize={20} color='primary' />
        </Box>
        <Heading
          fontSize={{ base: '2xl', sm: '3xl', lg: '4xl', xl: '5xl' }}
          color='primary'
        >
          Privacy Policy
        </Heading>
        <Text as='p' fontSize='xl' py={4} fontWeight='bold'>
          Your privacy is important to us.
        </Text>
        {/* privacy policy article will be rendered here */}
        <Text as='article' py={6}>
          This privacy policy explains how we collect, use, and share your
          personal data when you visit our website. By using our website, you
          agree to the collection and use of your personal data as described in
          this policy..
          <List mt={8} px={{ base: 4, md: 0 }} listStyleType='inherit'>
            <ListItem>
              We collect personal data such as your name, email address, and
              phone number when you fill out a form on our website. We use this
              information to respond to your inquiries and provide you with the
              information you requested.
            </ListItem>
            <ListItem>
              We may share your personal data with third-party service providers
              who help us provide our services. We require these service
              providers to keep your personal data confidential and not use it
              for any other purpose.
            </ListItem>
            <ListItem>
              We take the security of your personal data seriously and have
              implemented appropriate technical and organizational measures to
              protect it.
            </ListItem>
            <ListItem>
              You have the right to access, update, or delete your personal data
              at any time. You can also opt-out of marketing communications by
              clicking the unsubscribe link in our emails.
            </ListItem>
          </List>
        </Text>
        <VStack
          mb={{ base: 4, lg: 0 }}
          spacing={4}
          alignItems='flex-start'
          w='fit-content'
        >
          <Text as='p' fontSize='lg' mt={16}>
            If you have any questions about our privacy policy, please contact
            us...
          </Text>
          <Stack w='100%' alignItems={{ base: 'flex-start', lg: 'flex-end' }}>
            <Link
              as={NextLink}
              href='/contact-us'
              border='1px solid'
              px={4}
              py={2}
              _hover={{ textDecoration: 'none', bg: 'primary', color: 'white' }}
              color='secondary'
              borderRadius='5rem'
            >
              Contact us
            </Link>
          </Stack>
        </VStack>
      </Flex>
    </Container>
  )
}
export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'home',
        'navigation',
        'footer',
      ])),
    },
  }
}
