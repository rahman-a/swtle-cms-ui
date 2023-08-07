import { IRegistrationProps } from '@/src/types/Registration-types'
import { UseFormReturn } from 'react-hook-form'

type Step =
  | 'company'
  | 'credentials'
  | 'personal_info'
  | 'address'
  | 'phones'
  | 'documents'

type Type = 'personal' | 'business'

export const watchValues = (
  step: Step,
  method: UseFormReturn<IRegistrationProps, any>
) => {
  let values: any = []

  switch (step) {
    case 'company':
      values = [
        'name',
        'email',
        'phone',
        'address',
        'type',
        'traderLicense',
        'expiryDate',
        'establishmentContract',
      ]
      break
    case 'credentials':
      values = ['username', 'emails', 'password', 'confirmPassword', 'isAgreed']
      break
    case 'personal_info':
      values = ['fullNameInEnglish', 'fullNameInArabic', 'company']
      break
    case 'address':
      values = ['insideAddress', 'outsideAddress', 'country.abbr']
      break
    case 'phones':
      values = ['insidePhones']
      break
    case 'documents':
      values = [
        'avatar',
        'identity-front',
        'identity-back',
        'passport',
        'expireAt.identity',
        'expireAt.passport',
      ]
      break
    default:
      values = []
      break
  }

  return method.watch(values)
}

export const isStep = (step: Step, phase: number, type: Type) => {
  switch (step) {
    case 'company':
      return phase === 0 && type === 'business'
    case 'credentials':
      return (
        (phase === 0 && type === 'personal') ||
        (phase === 1 && type === 'business')
      )
    case 'personal_info':
      return (
        (phase === 1 && type === 'personal') ||
        (phase === 2 && type === 'business')
      )
    case 'address':
      return (
        (phase === 2 && type === 'personal') ||
        (phase === 3 && type === 'business')
      )
    case 'phones':
      return (
        (phase === 3 && type === 'personal') ||
        (phase === 4 && type === 'business')
      )
    case 'documents':
      return (
        (phase === 4 && type === 'personal') ||
        (phase === 5 && type === 'business')
      )
    default:
      return false
  }
}
