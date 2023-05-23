import { Box, Text } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

export interface IIndicatorProps {
  state: 'undone' | 'done' | 'current'
  step: number
}

export default function Indicator({ state, step }: IIndicatorProps) {
  return (
    <Box
      position='relative'
      w='2rem'
      h='2rem'
      borderRadius='50%'
      bg={state === 'undone' ? 'white' : 'secondary'}
      border='2px solid'
      borderColor='secondary'
      fontSize={{ base: 'md', md: 'lg' }}
      display='flex'
      alignItems='center'
      justifyContent='center'
      color={state === 'undone' ? 'black' : 'white'}
      zIndex='99'
      className='indicator'
    >
      {state === 'done' ? (
        <CheckIcon color='white' />
      ) : (
        <Text opacity={state === 'undone' ? '0.4' : '1'}>{step}</Text>
      )}
    </Box>
  )
}
