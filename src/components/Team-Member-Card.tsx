import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import { FacebookIcon, LinkedinIcon, TwitterIcon } from '../icons'

export interface ITeamMemberCardProps {}

export default function TeamMemberCard(props: ITeamMemberCardProps) {
  const { t } = useTranslation('team')
  const { t: tc } = useTranslation('common')
  const par = t('team.member.1.content')
  const { locale } = useRouter()
  return (
    <Card boxShadow='lg' width={96}>
      <CardBody alignItems='center' display='flex' flexDirection='column'>
        <Image
          src='/images/team-member.png'
          alt='Team Member'
          width={300}
          height={300}
        />
        <VStack mt={3} spacing={4}>
          <Text
            fontSize='2xl'
            color='secondary'
            fontWeight='bold'
            textAlign='center'
          >
            {t('team.member.1.name')}
          </Text>
          <Text fontSize='md' height={20}>
            {par.length > 200 ? par.slice(0, 200) + '...' : par}
          </Text>
        </VStack>
      </CardBody>
      <CardFooter>
        <Flex w='100%' justifyContent='space-between'>
          <HStack spacing={4}>
            <Link
              as={NextLink}
              color='gray.500'
              href='https://www.facebook.com'
              target='_blank'
            >
              <FacebookIcon />
            </Link>
            <Link
              as={NextLink}
              color='gray.500'
              href='https://www.facebook.com'
              target='_blank'
            >
              <LinkedinIcon />
            </Link>
            <Link
              as={NextLink}
              color='gray.500'
              href='https://www.facebook.com'
              target='_blank'
            >
              <TwitterIcon />
            </Link>
          </HStack>
          <Link
            as={NextLink}
            href='/team/ahmed-al-agbari'
            color='secondary'
            size='sm'
          >
            {tc('read_more')}
          </Link>
        </Flex>
      </CardFooter>
    </Card>
  )
}
