/* eslint-disable react/no-unescaped-entities */
import NextLink from 'next/link'
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react'
import { LoveLetterIcon } from '../icons'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
interface ITermsAndConditionProps {}

export default function TermsAndCondition(props: ITermsAndConditionProps) {
  return (
    <Container minW='95%' mt={{ base: 6, md: 10, lg: 12, xl: 14 }}>
      <Flex flexDirection='column'>
        <Box>
          <LoveLetterIcon boxSize={20} />
        </Box>
        <Heading
          fontSize={{ base: '2xl', sm: '3xl', lg: '4xl', xl: '5xl' }}
          color='primary'
        >
          Terms & Conditions
        </Heading>
        <Text as='p' fontSize='xl' py={4} fontWeight='bold'>
          Welcome to Swtle!
        </Text>
        {/* privacy policy article will be rendered here */}
        <Text as='article' py={6}>
          These terms and conditions outline the rules and regulations for the
          use of Swtle&apos;s Website, located at Swtle.com.
          <Text as='p' mt={8} px={{ base: 4, md: 0 }}>
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use Swtle if you do not agree to take
            all of the terms and conditions stated on this page.The following
            terminology applies to these Terms and Conditions, Privacy Statement
            and Disclaimer Notice and all Agreements: "Client", "You" and "Your"
            refers to you, the person log on this website and compliant to the
            Company’s terms and conditions. "The Company", "Ourselves", "We",
            "Our" and "Us", refers to our Company. "Party", "Parties", or "Us",
            refers to both the Client and ourselves. All terms refer to the
            offer, acceptance and consideration of payment necessary to
            undertake the process of our assistance to the Client in the most
            appropriate manner for the express purpose of meeting the Client’s
            needs in respect of provision of the Company’s stated services, in
            accordance with and subject to, prevailing law of Netherlands. Any
            use of the above terminology or other words in the singular, plural,
            capitalization and/or he/she or they, are taken as interchangeable
            and therefore as referring to same.CookiesWe employ the use of
            cookies. By accessing Swtle, you agreed to use cookies in agreement
            with the Swtle.com's Privacy Policy.Most interactive websites use
            cookies to let us retrieve the user’s details for each visit.
            Cookies are used by our website to enable the functionality of
            certain areas to make it easier for people visiting our website.
            Some of our affiliate/advertising partners may also use
            cookies.LicenseUnless otherwise stated, Swtle and/or its licensors
            own the intellectual property rights in the website and material on
            the website. Subject to the license below, all these intellectual
            property rights are reserved.You may view, download for caching
            purposes only, and print pages from the website for your own
            personal use, subject to the restrictions set out below and
            elsewhere in these terms and conditions. You must not:republish
            material from this website (including republication on another
            website);sell, rent or sub-license material from the website;show
            any material from the website in public;reproduce, duplicate, copy
            or otherwise exploit material on our website for a commercial
            purpose; edit or otherwise modify any material on the website;
            orredistribute material from this website except for content
            specifically and expressly made available for redistribution.Where
            content is specifically made available for redistribution, it may
            only be redistributed within your organization.Acceptable use You
            must not use this website in any way that causes, or may cause,
            damage to the website or impairment of the availability or
            accessibility of the website; or in any way which is unlawful,
            illegal, fraudulent or harmful, or in connection with any unlawful,
            illegal, fraudulent or harmful purpose or activity. You must not use
            this website to copy, store, host, transmit, send, use, publish or
            distribute any material which consists of (or is linked to) any
            spyware, computer virus, Trojan horse, worm, keystroke logger,
            rootkit or other malicious computer software.You must not conduct
            any systematic or automated data collection activities (including
            without limitation scraping, data mining, data extraction and data
            harvesting) on or in relation to this website without Swtle's
            express written consent.You must not use this website to transmit or
            send unsolicited commercial communications.You must not use this
            website for any purposes related to marketing without Swtle's
            express written consent. Restricted access We reserve the right to
            restrict access to certain areas of this website, or indeed this
            entire website, at our discretion; you must not circumvent or
            bypass, or attempt to circumvent or bypass, any access restriction
            measures on this website.If we provide you with a user ID and
            password to enable you to access restricted areas of this website or
            other content or services, you must ensure that the user ID
          </Text>
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
