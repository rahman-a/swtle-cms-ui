import NextLink from 'next/link'
import {
  Box,
  Divider,
  HStack,
  Text,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import {
  HomeIcon,
  BriefcaseIcon,
  GearIcon,
  EnvelopeIcon,
  TeamIcon,
  InfoIcon,
} from '@/src/icons'
import { useRouter } from 'next/router'
import { links } from './navigationItems'

interface INavigationProps extends React.HTMLAttributes<HTMLElement> {
  isOpen?: boolean
  onClose?: () => void
  isMainPage?: boolean
}

export default function Navigation({
  isOpen,
  onClose,
  isMainPage,
  ...props
}: INavigationProps) {
  const { locale } = useRouter()
  const { t } = useTranslation('navigation')
  const { t: tc } = useTranslation('common')
  const navClassNames = classNames('navigation', {
    show: isOpen,
  })

  return (
    <nav className={navClassNames} {...props}>
      <Stack
        spacing={{ base: 6, xl: 12 }}
        direction={{ base: 'column', sm: 'column', lg: 'column', xl: 'row' }}
        alignItems={isOpen ? 'flex-start' : 'center'}
      >
        {links.map((link) => {
          if (link.children) {
            return (
              <Box key={link.id} width={isOpen ? '100%' : 'auto'}>
                <Popover
                  trigger={'hover'}
                  placement={locale === 'ar' ? 'bottom-end' : 'bottom-start'}
                >
                  <PopoverTrigger>
                    <HStack
                      spacing={2}
                      width={isOpen ? '100%' : 'auto'}
                      borderBottom={isOpen ? '2px solid #f4f4f4' : 'none'}
                      padding={isOpen ? '0 1rem' : '0'}
                    >
                      {isOpen && <Box>{<link.icon color='teal' />}</Box>}
                      <Link
                        as={NextLink}
                        href={''}
                        p={2}
                        fontSize='md'
                        fontWeight={500}
                        color={isMainPage || isOpen ? 'primary' : 'white'}
                        borderBottom='2px solid transparent'
                        _hover={{
                          textDecoration: 'none'!,
                          borderColor: isMainPage ? 'primary' : 'white',
                        }}
                      >
                        {t(link.label)} <ChevronDownIcon />
                      </Link>
                    </HStack>
                  </PopoverTrigger>

                  <PopoverContent
                    border={0}
                    boxShadow='xl'
                    position={'relative'}
                    bg='white'
                    rounded='xl'
                    // minW={{ base: 'xs', sm: 'sm', md: 'md' }}
                  >
                    <PopoverArrow />
                    <PopoverCloseButton color='primary' />
                    <HStack
                      display={
                        link.children.business.length > 0 ? 'flex' : 'block'
                      }
                      p={5}
                      alignItems={'flex-start'}
                    >
                      <SubNavItems
                        items={link.children.individual}
                        title={t('services.individual')}
                        onClose={onClose && onClose}
                      />
                      {link.children.business.length > 0 && (
                        <>
                          <Divider
                            orientation='vertical'
                            height={{ base: '350px', sm: '300px' }}
                            px={2}
                          />
                          <SubNavItems
                            items={link.children.business}
                            title={t('services.business')}
                            onClose={onClose && onClose}
                          />
                        </>
                      )}
                    </HStack>
                    <Link
                      as={NextLink}
                      href='/services'
                      color='secondary'
                      position={'absolute'}
                      right={locale === 'en' ? '2rem' : 'unset'}
                      left={locale === 'ar' ? '2rem' : 'unset'}
                      bottom='0.5rem'
                      fontSize='sm'
                    >
                      {tc('see_more')}
                    </Link>
                  </PopoverContent>
                </Popover>
              </Box>
            )
          }
          return (
            <HStack
              key={link.id}
              width={isOpen ? '100%' : 'auto'}
              borderBottom={isOpen ? '2px solid #f4f4f4' : 'none'}
              padding={isOpen ? '0 1rem' : '0'}
            >
              {isOpen && <Box>{<link.icon color='teal' />}</Box>}
              <Link
                as={NextLink}
                onClick={onClose}
                p={2}
                href={link.url ?? '#'}
                fontSize={'md'}
                fontWeight={500}
                color={isMainPage || isOpen ? 'primary' : 'white'}
                borderBottom='2px solid transparent'
                _hover={{
                  textDecoration: 'none',
                  borderColor: isMainPage ? 'primary' : 'white',
                }}
              >
                {t(link.label)}
              </Link>
            </HStack>
          )
        })}
      </Stack>
    </nav>
  )
}

type Item = {
  id: number
  label: string
  url: string
}

const SubNavItems = ({
  items,
  title,
  onClose,
}: {
  items: Item[]
  title: string
  onClose?: () => void
}) => {
  const { t } = useTranslation('navigation')
  return (
    <Box>
      <Text p={2} fontSize={'md'} color='primary' fontWeight={900}>
        {title}
      </Text>
      <Stack spacing={0.5} direction={'column'} alignItems={'flex-start'}>
        {items.map((item) => (
          <Link
            as={NextLink}
            key={item.id}
            onClick={onClose ? onClose : undefined}
            p={2}
            width='100%'
            color='primary'
            fontSize={{ base: 'sm', md: 'md' }}
            href={item.url ?? ''}
            _hover={{
              color: 'white',
              bg: 'primary',
              borderRadius: 'md',
            }}
          >
            {t(item.label)}
          </Link>
        ))}
      </Stack>
    </Box>
  )
}
