import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Flex, VStack, Text, Link, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

interface IFeatureCardProps {
  title: string
  description: string
  image: string
}

export default function FeatureCard({
  title,
  description,
  image,
}: IFeatureCardProps) {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  return (
    <Flex
      gap={8}
      flexDirection={{ base: 'column', md: 'row' }}
      width={{ base: '100%', xl: '45%' }}
    >
      <Image src={image} alt='feature' width={217} height={165} />
      <VStack alignItems='flex-start'>
        <Text as='h3' fontSize='xl' fontWeight='bold'>
          {title}
        </Text>
        <Text
          as='p'
          fontSize='md'
          color='gray.500'
          height={32}
          overflow='hidden'
        >
          {description.length > 250
            ? description.substring(0, 250) + ' . . . .'
            : description}
        </Text>
        <Box textAlign={locale === 'ar' ? 'left' : 'right'} w='100%'>
          <Link as={NextLink} href='#' color='secondary'>
            {t('read_more')}
          </Link>
        </Box>
      </VStack>
    </Flex>
  )
}
