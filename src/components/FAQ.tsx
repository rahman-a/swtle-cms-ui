import {
  Box,
  Container,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

interface IFAQProps {}

export default function FAQ(props: IFAQProps) {
  const router = useRouter()
  const locale = router.locale
  const { t } = useTranslation('home')
  const { t: tc } = useTranslation('common')
  const questions = [
    {
      id: 1,
      title: t('faq.1.question'),
      answer: t('faq.1.answer'),
    },
    {
      id: 2,
      title: t('faq.2.question'),
      answer: t('faq.2.answer'),
    },
    {
      id: 3,
      title: t('faq.3.question'),
      answer: t('faq.3.answer'),
    },
  ]
  return (
    <Box
      position='relative'
      py={20}
      backgroundImage='/images/faq-bg.png'
      backgroundSize='cover'
      backgroundRepeat='no-repeat'
      backgroundPosition='center'
    >
      <Box
        position='absolute'
        top={0}
        left={0}
        width='100%'
        height='100%'
        backgroundImage='linear-gradient(to right, rgba(33,89, 127, 1), rgba(33,89, 127, 0.8))'
        zIndex='1'
      ></Box>
      <Container minW='95%' p={{ base: 2, sm: 4, md: 8, xl: 14 }}>
        <Flex
          direction={{ base: 'column' }}
          alignItems='center'
          justifyContent='center'
          position='relative'
          zIndex='22'
          gap={{ base: 8 }}
        >
          <VStack>
            {router.locale === 'en' && (
              <Text
                as='p'
                color='white'
                fontSize={{ base: '2xl' }}
                fontWeight='300'
              >
                {t('faq.header')}
              </Text>
            )}
            <Text as='h3' color='white' fontSize={{ base: '3xl' }}>
              {t('faq.title')}
            </Text>
          </VStack>
          <Accordion
            allowToggle
            backgroundColor='white'
            borderRadius={8}
            width={{ base: '95%', md: '65%', xl: '50%' }}
          >
            {questions.map((question) => (
              <AccordionItem key={question.id} p='1rem 1rem 0 1rem'>
                <h2>
                  <AccordionButton>
                    <Box
                      as='span'
                      flex='1'
                      textAlign={locale === 'ar' ? 'right' : 'left'}
                    >
                      {question.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel py={4} color='gray.500'>
                  {question.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <Button
            onClick={() => router.push('/contact-us')}
            variant='primary'
            borderRadius={20}
            my={8}
          >
            {tc('see_more')}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
