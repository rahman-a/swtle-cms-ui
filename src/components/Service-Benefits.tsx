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

interface IServiceBenefitsProps {}

export default function ServiceBenefits(props: IServiceBenefitsProps) {
  const { t } = useTranslation('services')
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
          <ListItem
            as={motion.li}
            initial='hide'
            whileInView='show'
            variants={locale === 'en' ? fadeRight : fadeLeft}
          >
            <ListIcon as={CheckIcon} color='green.500' />
            {t('service.1.benefits.1')}
          </ListItem>
          <ListItem
            as={motion.li}
            initial='hide'
            whileInView='show'
            variants={locale === 'en' ? fadeRight : fadeLeft}
          >
            <ListIcon as={CheckIcon} color='green.500' />
            {t('service.1.benefits.2')}
          </ListItem>
          <ListItem
            as={motion.li}
            initial='hide'
            whileInView='show'
            variants={locale === 'en' ? fadeRight : fadeLeft}
          >
            <ListIcon as={CheckIcon} color='green.500' />
            {t('service.1.benefits.3')}
          </ListItem>
          {/* You can also use custom icons from react-icons */}
          <ListItem
            as={motion.li}
            initial='hide'
            whileInView='show'
            variants={locale === 'en' ? fadeRight : fadeLeft}
          >
            <ListIcon as={CheckIcon} color='green.500' />
            {t('service.1.benefits.4')}
          </ListItem>
          <ListItem
            as={motion.li}
            initial='hide'
            whileInView='show'
            variants={locale === 'en' ? fadeRight : fadeLeft}
          >
            <ListIcon as={CheckIcon} color='green.500' />
            {t('service.1.benefits.5')}
          </ListItem>
        </List>
      </CardBody>
    </Card>
  )
}
