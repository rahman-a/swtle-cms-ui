import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface ICTAProps {
  label: string
  isOpen?: boolean
  isHeroSection?: boolean
  href: string
  onClose?: () => void
}

export default function CTA({
  label,
  isOpen,
  onClose,
  href,
  isHeroSection,
}: ICTAProps) {
  const router = useRouter()
  const CtaHandler = () => {
    router.push(`${href}`)
    onClose && onClose()
  }
  return (
    <Button
      display={{
        base: isOpen || isHeroSection ? 'block' : 'none',
        xl: 'block',
      }}
      onClick={CtaHandler}
      variant='primary'
      minW='8rem'
      width={isOpen ? '90%' : 'auto'}
      margin={isOpen ? '2rem auto' : '0'}
      borderRadius={isOpen ? '1rem' : '5rem'}
      fontSize={{ base: '12px', md: '14px' }}
      boxShadow='0px 1px 3px 1px rgba(0, 0, 0, 0.15)'
    >
      {label}
    </Button>
  )
}
