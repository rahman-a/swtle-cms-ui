import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Flex, VStack, Text, Link, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import parseHTML from 'html-react-parser'

interface IFeatureCardProps {
  title: string
  body: string
  image: string
  slug: string
}

export default function FeatureCard({
  title,
  body,
  image,
  slug,
}: IFeatureCardProps) {
  const articleBody = parseHTML(body) as string
  return (
    <Flex
      gap={8}
      flexDirection={{ base: 'column', md: 'row' }}
      width={{ base: '100%', xl: '45%' }}
    >
      <Image src={image} alt={title} width={217} height={165} />
      <VStack alignItems='flex-start'>
        <Text as='h3' fontSize='xl' fontWeight='bold'>
          {title}
        </Text>
        <Text
          as='div'
          fontSize='md'
          color='gray.500'
          height='auto'
          overflow='hidden'
        >
          {articleBody.length > 250
            ? articleBody.substring(0, 250) + ' . . . .'
            : articleBody}
        </Text>
        {/* <Box textAlign={locale === 'ar' ? 'left' : 'right'} w='100%'>
          <Link
            as={NextLink}
            href={slug ? `/blog/${slug}` : ''}
            color='secondary'
          >
            {t('read_more')}
          </Link>
        </Box> */}
      </VStack>
    </Flex>
  )
}
