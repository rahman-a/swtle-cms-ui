import { useState, forwardRef } from 'react'
import { LockIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { EyeIcon, EyeSlashIcon } from '@/src/icons'

interface IPasswordFieldProps {
  id: string
  label: string
  error?: string
  helperText?: string
  placeholder: string
}

const PasswordField = forwardRef<HTMLInputElement, IPasswordFieldProps>(
  (
    { id, label, error, helperText, placeholder, ...rest }: IPasswordFieldProps,
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const { locale } = useRouter()
    return (
      <FormControl id={id} isRequired isInvalid={!!error}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <InputGroup>
          <InputLeftElement color='gray.500'>
            <LockIcon />
          </InputLeftElement>
          <Input
            ref={ref}
            paddingInlineStart={locale === 'ar' ? 8 : 0}
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={placeholder}
            {...rest}
          />
          <InputRightElement>
            <Button onClick={() => setIsPasswordVisible((prev) => !prev)}>
              {isPasswordVisible ? (
                <EyeIcon color='gray.600' />
              ) : (
                <EyeSlashIcon color='gray.600' />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <FormErrorMessage>{error && error}</FormErrorMessage>
      </FormControl>
    )
  }
)

PasswordField.displayName = 'PasswordField'
export default PasswordField
