import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

export interface IPartnerProps {
  partners: {
    id: number
    name: string
    logo: string
  }[]
}

export default function Partner({ partners }: IPartnerProps) {
  const { t } = useTranslation('common')
  return (
    <Box
      display='flex'
      justifyContent='center'
      position='relative'
      top={{ base: '-5rem' }}
    >
      <Flex
        direction='column'
        alignItems='center'
        gap={6}
        w={{ base: '85%', md: '60%', lg: '40%', xl: '30%' }}
        backgroundColor='white'
        borderRadius='xl'
        p={{ base: 4, md: 8 }}
      >
        <Text color='primary'>{t('partner_success')}</Text>
        <HStack justifyContent='space-evenly' w='100%'>
          {partners.length > 0 &&
            partners.map((partner) => (
              <Image
                key={partner.id}
                src={partner.logo}
                alt={partner.name}
                width={100}
                height={100}
              />
            ))}
        </HStack>
      </Flex>
    </Box>
  )
}
