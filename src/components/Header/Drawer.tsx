import { RefObject, forwardRef } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  HStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Language from './Language'
import Navigation from './Navigation'
import CTA from './CTA'

interface IDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const DrawerComponent = forwardRef<HTMLButtonElement, IDrawerProps>(
  ({ isOpen, onClose }, ref) => {
    const router = useRouter()
    const locale = router.locale
    const { t } = useTranslation('common')
    return (
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={ref as RefObject<HTMLButtonElement>}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack spacing={2} w='100%' justifyContent='flex-start'>
              <Language />
            </HStack>
          </DrawerHeader>
          <DrawerBody p='0'>
            <Navigation isOpen={isOpen} onClose={onClose} />
            {router.asPath !== '/login' && router.asPath !== '/register' && (
              <CTA
                label={t('try_swtle_today')}
                isOpen={isOpen}
                onClose={onClose}
              />
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button size='md' variant='outline' mr={3} onClick={onClose}>
              {t('close')}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
)

DrawerComponent.displayName = 'DrawerComponent'
export default DrawerComponent
