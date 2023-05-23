import { Box, List, ListItem, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import IndicatorCircle from './Indicator-Circle'
import IndicatorLine from './Indicator-Line'

export interface IRegistrationProgressIndicatorProps {
  step: number
}

export default function RegistrationProgressIndicator({
  step,
}: IRegistrationProgressIndicatorProps) {
  const { t } = useTranslation('registration')
  const { locale } = useRouter()
  const steps = [
    { id: 1, name: t('registration.credential'), phase: 0 },
    { id: 2, name: t('registration.personal_info'), phase: 1 },
    { id: 3, name: t('registration.address_info'), phase: 2 },
    { id: 4, name: t('registration.phones_info'), phase: 3 },
    { id: 5, name: t('registration.documents_info'), phase: 4 },
  ]

  return (
    <Box
      position='relative'
      right={{ base: locale === 'ar' ? '-1rem' : '0', sm: '0' }}
    >
      <IndicatorLine step={step} />
      <List
        spacing={{ base: 0, md: 12 }}
        display={{ base: 'flex', md: 'block' }}
        w={{ base: '98vw', md: 'auto' }}
        alignItems='center'
        justifyContent={{ base: 'space-between', md: 'center' }}
        transform={{ base: 'translateX(-10px)', md: 'translateX(0)' }}
      >
        {steps.map((s) => (
          <ListItem key={s.id}>
            <Stack
              gap={2}
              alignItems='center'
              justifyContent='center'
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <IndicatorCircle
                state={
                  s.phase === step
                    ? 'current'
                    : s.phase > step
                    ? 'undone'
                    : 'done'
                }
                step={s.phase + 1}
              />
              <Text
                opacity={s.phase <= step ? 1 : 0.4}
                w={{ base: 16, sm: 20, md: 40 }}
                h={{ base: 20, md: 'auto' }}
                fontWeight={{ base: 'normal', md: 'bold' }}
                as='p'
                margin='0'
                fontSize={{ base: 'xs', sm: 'sm', md: 'lg', lg: 'xl' }}
                textAlign={{
                  base: 'center',
                  md: locale === 'ar' ? 'right' : 'left',
                }}
              >
                {s.name}
              </Text>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
