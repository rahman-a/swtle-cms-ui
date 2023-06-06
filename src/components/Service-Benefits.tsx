import {
  Card,
  CardBody,
  CardHeader,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { fadeLeft, fadeRight, fadeUp } from '@animation-variants'
import { CheckIcon } from '@chakra-ui/icons'
import { useTranslation } from 'next-i18next'

interface IServiceBenefitsProps {
  benefits: {
    id: string
    text: string
  }[]
}

export default function ServiceBenefits({ benefits }: IServiceBenefitsProps) {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  return (
    <Card boxShadow='lg' borderRadius='lg' p={4} bg='white'>
      <CardHeader>
        <Text
          fontSize='2xl'
          as={motion.h2}
          initial='hide'
          whileInView='show'
          variants={fadeUp}
        >
          {t('service.benefits')}
        </Text>
      </CardHeader>
      <CardBody>
        <List spacing={4}>
          {benefits.map((benefit) => (
            <ListItem
              key={benefit.id}
              as={motion.li}
              initial='hide'
              whileInView='show'
              variants={locale === 'en' ? fadeRight : fadeLeft}
            >
              <ListIcon as={CheckIcon} color='green.500' />
              {benefit.text}
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  )
}
