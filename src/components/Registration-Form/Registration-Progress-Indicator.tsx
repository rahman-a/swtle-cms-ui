import { Box, List, ListItem, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import IndicatorCircle from './Indicator-Circle'
import IndicatorLine from './Indicator-Line'

type Step = {
  id: number
  name: string
  phase: number
}

export interface IRegistrationProgressIndicatorProps {
  steps: Step[]
  step: number
  type: 'personal' | 'business'
}

export default function RegistrationProgressIndicator({
  step,
  type,
  steps: stepsValues,
}: IRegistrationProgressIndicatorProps) {
  const { t } = useTranslation('registration')
  const { locale } = useRouter()
  const steps = stepsValues.map((step) => ({
    id: step.id,
    name: t(`registration.${step.name}`),
    phase: step.phase,
  }))

  return (
    <Box
      w={{ base: '100%', lg: 'auto' }}
      position='relative'
      right={{ base: 0, sm: '0' }}
    >
      <IndicatorLine step={step} type={type} />
      <List
        spacing={0}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        gap={{ base: 1.5, sm: 0 }}
      >
        {steps.map((s) => (
          <ListItem
            className='indicator-item'
            key={s.id}
            h={24}
            w={{ base: '100%', lg: '7rem', xl: '100%' }}
          >
            <Stack
              gap={2}
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
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
                position='relative'
                h={{ md: 'auto' }}
                fontWeight={{ base: 'normal', md: 'bold' }}
                as='p'
                margin='0'
                fontSize={{
                  base: 'xs',
                  sm: 'sm',
                  lg: 'md',
                }}
                textAlign={{
                  base: 'center',
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
