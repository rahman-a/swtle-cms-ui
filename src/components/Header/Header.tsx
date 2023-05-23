import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useScroll } from 'framer-motion'
import Navigation from './Navigation'
import Language from './Language'
import classnames from 'classnames'
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Link,
  useDisclosure,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import logoImage from '@assets/images/logo.svg'
import Drawer from './Drawer'
import CTA from './CTA'

interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation('common')
  const btnRef = useRef<HTMLButtonElement>(null)
  const [isFixed, setIsFixed] = useState(false)
  const { scrollY } = useScroll()
  const router = useRouter()
  const allowedPathsForHeaderBg = [
    '/login',
    '/register',
    '/reset',
    '/activate',
    '/404',
    '/privacy-policy',
    '/terms-conditions',
    '/ar/login',
    '/ar/register',
    '/ar/reset',
    '/ar/activate',
    '/ar/404',
    '/ar/privacy-policy',
    '/ar/terms-conditions',
  ]
  const headerClassNames = classnames('header', {
    'header--bg': allowedPathsForHeaderBg.includes(router.route),
    'header--fixed': isFixed,
  })
  useEffect(() => {
    scrollY.on('change', (v) => {
      if (v > 80) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    })
  }, [scrollY])
  return (
    <header className={headerClassNames}>
      <Drawer isOpen={isOpen} onClose={onClose} ref={btnRef!} />
      <Container maxW='95%' mx='auto'>
        <Flex justifyContent='space-between'>
          <Box>
            <Link as={NextLink} href='/'>
              <Image src={logoImage} alt='logo' width={100} height={100} />
            </Link>
          </Box>
          <Navigation />
          <HStack spacing='20'>
            <Box
              position='relative'
              display={{ base: 'none', sm: 'none', lg: 'none', xl: 'block' }}
            >
              <Language />
            </Box>
            {router.asPath !== '/login' && router.asPath !== '/register' && (
              <CTA label={t('get_started')} />
            )}
            <Button
              display={{ base: 'block', sm: 'block', lg: 'block', xl: 'none' }}
              bg={'transparent'}
              cursor={'pointer'}
              onClick={onOpen}
              ref={btnRef!}
            >
              <HamburgerIcon w={10} h={10} />
            </Button>
          </HStack>
        </Flex>
      </Container>
    </header>
  )
}
