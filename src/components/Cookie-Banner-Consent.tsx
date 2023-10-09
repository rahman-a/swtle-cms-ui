import * as React from 'react'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useLocalStorage } from '@/src/hooks/useLocalStorage'

export interface ICookieBannerConsentProps {}

export default function CookieBannerConsent(props: ICookieBannerConsentProps) {
  const [cookieBannerConsent, setCookieBannerConsent] = useLocalStorage(
    'cookieBannerConsent',
    false
  )
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCookieConsent = (type: 'granted' | 'denied') => {
    setCookieBannerConsent(type)
    onClose()
  }
  React.useEffect(() => {
    if (!cookieBannerConsent) {
      onOpen()
    }
  }, [])

  React.useEffect(() => {
    if (cookieBannerConsent === 'granted' && window) {
      window.gtag('consent', 'update', {
        analytics_storage: cookieBannerConsent,
      })
    }
  }, [cookieBannerConsent])
  return (
    <Drawer
      closeOnEsc={false}
      closeOnOverlayClick={false}
      placement='bottom'
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent display='flex' alignItems='center' justifyContent='center'>
        <DrawerHeader
          borderBottomWidth='1px'
          w='full'
          display='flex'
          justifyContent='center'
          textAlign='center'
        >
          We value your privacy (Cookies Consent)
        </DrawerHeader>
        <DrawerBody pb={4}>
          <Text
            w={{ base: 'xs', sm: 'sm', md: 'lg' }}
            textAlign='center'
            pb={4}
          >
            We use cookies to enhance your browsing experience, serve a
            personalized content, and analyze our traffic. By clicking
            <Text as='span' color='secondary' mx={1}>
              Accept All
            </Text>
            , you consent to our use of cookies.
          </Text>
          <Box display='flex' justifyContent='center' gap={5}>
            <Button
              onClick={() => handleCookieConsent('denied')}
              color='GrayText'
              variant='ghost'
            >
              Reject All
            </Button>
            <Button
              onClick={() => handleCookieConsent('granted')}
              color='white'
              bg='secondary'
              _hover={{ color: 'secondary', background: 'white' }}
            >
              Accept All
            </Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
