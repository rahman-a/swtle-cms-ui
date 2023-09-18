import { ChevronDownIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

interface ILanguageProps {
  isPrimary?: boolean
}

export default function Language({ isPrimary }: ILanguageProps) {
  const router = useRouter()
  const changeLanguageHandler = (lang: string) => {
    router.push(router.asPath, undefined, { locale: lang })
  }

  return (
    <Menu>
      <MenuButton
        fontSize={{ base: 'sm', lg: 'md' }}
        color={{ base: 'primary', xl: isPrimary ? 'primary' : 'white' }}
      >
        <ChevronDownIcon /> {router.locale === 'en' ? 'العربية' : 'English'}
      </MenuButton>
      <MenuList color='#000'>
        <MenuItem
          minH='48px'
          onClick={() => changeLanguageHandler('en')}
          fontSize={{ base: 'sm', lg: 'md' }}
          display='flex'
          gap={2}
        >
          <Image
            boxSize='2rem'
            borderRadius='full'
            src='./images/usa.png'
            alt='english language'
          />
          <span>English</span>
        </MenuItem>
        <MenuItem
          minH='40px'
          onClick={() => changeLanguageHandler('ar')}
          fontSize={{ base: 'sm', lg: 'md' }}
          display='flex'
          gap={2}
        >
          <Image
            boxSize='2rem'
            borderRadius='full'
            src='./images/uae.png'
            alt='arabic language'
          />
          <span>العربية</span>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
