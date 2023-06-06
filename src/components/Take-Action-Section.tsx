import { Box, Container, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import TakeAction from './Take-Action'

interface ITakeActionSectionProps {
  title: string
  content: string
  cta: {
    label: string
    href: string
  }
}

export default function TakeActionSection({
  title,
  content,
  cta,
}: ITakeActionSectionProps) {
  return (
    <Box
      position='relative'
      py={20}
      backgroundImage='/images/take-action-bg.png'
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
        backgroundColor='#fff'
        opacity={0.9}
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
          <TakeAction
            title={title}
            content={content}
            cta={cta}
            width={{
              base: '100%',
              md: '75%',
              xl: '50%',
            }}
          />
        </Flex>
      </Container>
    </Box>
  )
}
