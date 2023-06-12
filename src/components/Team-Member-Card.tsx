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
import NextLink from 'next/link'
import parser from 'html-react-parser'
import { useTranslation } from 'next-i18next'
import { FacebookIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from '../icons'
import malePlaceholder from '@assets/images/male_placeholder.png'
import femalePlaceholder from '@assets/images/female_placeholder.png'

export interface ITeamMemberCardProps {
  member: {
    id: string
    name: string
    biography: string
    image?: string
    CV?: string
    Gender: 'Male' | 'Female'
    locale: 'en' | 'ar'
    socials: {
      id: string
      link: string
      icon: string
      platform: 'Facebook' | 'Twitter' | 'Linkedin' | 'Youtube'
    }[]
  }
}

export default function TeamMemberCard({ member }: ITeamMemberCardProps) {
  const { t } = useTranslation('common')
  const par = parser(member.biography) as string
  const socialIcons = {
    Facebook: <FacebookIcon />,
    Twitter: <TwitterIcon />,
    Linkedin: <LinkedinIcon />,
    Youtube: <YoutubeIcon />,
  }
  const memberImage = member.image
    ? member.image
    : member.Gender === 'Male'
    ? malePlaceholder
    : femalePlaceholder
  return (
    <Card boxShadow='lg' width={96}>
      <CardBody
        alignItems='center'
        display='flex'
        flexDirection='column'
        position='relative'
      >
        <Image
          src={memberImage}
          alt={member.name}
          width={300}
          height={250}
          style={{
            height: 250,
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
        <VStack mt={3} spacing={4}>
          <Text
            fontSize='2xl'
            color='secondary'
            fontWeight='bold'
            textAlign='center'
          >
            {member.name}
          </Text>
          <Text fontSize='md' height={20}>
            {par.length > 200 ? par.slice(0, 200) + '...' : par}
          </Text>
        </VStack>
      </CardBody>
      <CardFooter>
        <Flex w='100%' justifyContent='space-between'>
          <HStack spacing={4}>
            {member.socials.map((social) => (
              <Link
                key={social.id}
                as={NextLink}
                color='gray.500'
                href={social.link ?? ''}
                target='_blank'
              >
                {socialIcons[social.platform as keyof typeof socialIcons]}
              </Link>
            ))}
          </HStack>
          {/* {member.CV && (
            <Link as={NextLink} href={member.CV} color='secondary' size='sm'>
              {t('read_more')}
            </Link>
          )} */}
        </Flex>
      </CardFooter>
    </Card>
  )
}
