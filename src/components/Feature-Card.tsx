import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Flex, VStack, Text } from '@chakra-ui/react'
const RenderHtml = dynamic(() => import('./Render-Html'))
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
        <RenderHtml
          html={body}
          maxChar={250}
          as='div'
          fontSize='md'
          color='gray.500'
          height='auto'
          overflow='hidden'
        />
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
