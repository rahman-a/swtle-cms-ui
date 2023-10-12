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
import { useTranslation } from 'next-i18next'
import { useLocalStorage } from '@/src/hooks/useLocalStorage'

export interface ICookieBannerConsentProps {}

export default function CookieBannerConsent(props: ICookieBannerConsentProps) {
  const { t } = useTranslation('common')
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
    if (cookieBannerConsent === 'granted' && window?.gtag) {
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
          {t('value_your_privacy')}
        </DrawerHeader>
        <DrawerBody pb={4}>
          <Text
            w={{ base: 'xs', sm: 'sm', md: 'lg' }}
            textAlign='center'
            pb={4}
          >
            {t('cookie_consent_msg')}
            <Text as='span' color='secondary' mx={1}>
              {t('accept_all')}
            </Text>
            , {t('cookie_consent_msg2')}
          </Text>
          <Box
            display='flex'
            justifyContent='center'
            flexDirection='row-reverse'
            gap={5}
          >
            <Button
              onClick={() => handleCookieConsent('granted')}
              color='white'
              bg='secondary'
              _hover={{ color: 'secondary', background: 'white' }}
            >
              {t('accept_all')}
            </Button>
            <Button
              onClick={() => handleCookieConsent('denied')}
              color='GrayText'
              variant='ghost'
            >
              {t('reject_all')}
            </Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
