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
import logoImage from '@assets/images/main-icon.svg'
import logoWhiteImage from '@assets/images/logo.svg'
import Drawer from './Drawer'
import CTA from './CTA'

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

interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation('common')
  const btnRef = useRef<HTMLButtonElement>(null)
  const [isFixed, setIsFixed] = useState(false)
  const router = useRouter()
  const isHeaderBackground = allowedPathsForHeaderBg.includes(router.asPath)
  const [isMainPage, setIsMainPage] = useState(router.asPath === '/')
  const { scrollY } = useScroll()

  const headerClassNames = classnames('header', {
    'header--bg': isHeaderBackground,
    'header--fixed': isFixed,
  })

  useEffect(() => {
    setIsMainPage(router.asPath === '/')
  }, [router.asPath])

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
              <Image
                src={isMainPage && !isFixed ? logoImage : logoWhiteImage}
                alt='logo'
                width={100}
                height={100}
              />
            </Link>
          </Box>
          <Navigation isMainPage={isMainPage && !isFixed} />
          <HStack spacing='20'>
            <Box
              position='relative'
              display={{ base: 'none', sm: 'none', lg: 'none', xl: 'block' }}
            >
              <Language isPrimary={isMainPage} />
            </Box>
            {router.asPath !== '/login' && router.asPath !== '/register' && (
              <CTA label={t('get_started')} href='https://app.swtle.com' />
            )}
            <Button
              display={{ base: 'block', xl: 'none' }}
              bg={'transparent'}
              cursor={'pointer'}
              onClick={onOpen}
              ref={btnRef!}
              _hover={{
                background: isMainPage && !isFixed ? 'white' : 'primary',
              }}
            >
              <HamburgerIcon
                w={10}
                h={10}
                color={isMainPage && !isFixed ? 'primary' : 'white'}
              />
            </Button>
          </HStack>
        </Flex>
      </Container>
    </header>
  )
}
