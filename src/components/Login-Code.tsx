import { useEffect, useRef, useState } from 'react'
import {
  Box,
  HStack,
  PinInput,
  PinInputField,
  Spinner,
  Text,
} from '@chakra-ui/react'
import Countdown, { zeroPad } from 'react-countdown'

interface ILoginCodeProps {
  verifyLoginCodeHandler: (code: string) => void
  sendLoginCodeHandler: () => Promise<void>
  verifyLoginCodeLoading: boolean
}
let CounterDate: number = 119000

export default function LoginCode({
  verifyLoginCodeHandler,
  sendLoginCodeHandler,
  verifyLoginCodeLoading,
}: ILoginCodeProps) {
  const pinInputRef = useRef<HTMLInputElement>(null)
  const [stopCounter, setStopCounter] = useState<boolean>(false)
  const counterRef = useRef<Countdown>(null)

  useEffect(() => {
    pinInputRef.current?.focus()
  }, [])

  useEffect(() => {
    let stopCounterInterval: NodeJS.Timeout | undefined
    if (stopCounter && counterRef.current) {
      counterRef.current.pause()
      stopCounterInterval = setTimeout(() => {
        setStopCounter(false)
        clearTimeout(stopCounterInterval)
      }, 5000)
    } else {
      counterRef.current?.start()
    }
    return () => clearTimeout(stopCounterInterval)
  }, [stopCounter])

  return (
    <Box>
      <Text as='h2' mb='5' fontSize={{ base: '2xl', md: '3xl' }}>
        Type your login code
      </Text>
      <HStack w='100%' m='0' position='relative'>
        <PinInput
          type='alphanumeric'
          variant='filled'
          focusBorderColor='teal.500'
          size={{ base: 'md', sm: 'lg' }}
          onComplete={(code) => {
            CounterDate = 119000
            verifyLoginCodeHandler(code)
          }}
          onChange={() => setStopCounter(true)}
          isDisabled={verifyLoginCodeLoading}
        >
          <PinInputField ref={pinInputRef} />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
        <Spinner
          color='gray.500'
          position='absolute'
          left='50%'
          transform='translateX(-50%)'
          display={verifyLoginCodeLoading ? 'block' : 'none'}
        />
      </HStack>
      {!verifyLoginCodeLoading && (
        <HStack
          my={4}
          spacing={2}
          flexWrap='wrap'
          w='100%'
          justifyContent='center'
        >
          <Text as='p' fontSize={{ base: 'sm' }}>
            Login code will be sent again in
          </Text>
          <Countdown
            date={Date.now() + CounterDate}
            ref={counterRef}
            onPause={(date) => {
              CounterDate = date.total
            }}
            renderer={({ seconds, minutes }) => {
              return (
                <Text as='span' fontWeight='bold' color='red.700'>
                  {zeroPad(minutes) + ':' + zeroPad(seconds)}
                </Text>
              )
            }}
            onComplete={async () => {
              CounterDate = 119000
              await sendLoginCodeHandler()
            }}
          />
          <Text as='p' fontSize={{ base: 'sm' }}>
            seconds in case you didn&apos;t receive one
          </Text>
        </HStack>
      )}
    </Box>
  )
}
