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
      values = ['emails', 'password', 'isAgreed']
      break
    case 'personal_info':
      values = [
        'fullNameInEnglish',
        'fullNameInArabic',
        'insidePhones',
        'insideAddress',
        'country.abbr',
      ]
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
    case 'credentials':
      return phase === 0
    case 'company':
      return phase === 1 && type === 'business'
    case 'personal_info':
      return (
        (phase === 1 && type === 'personal') ||
        (phase === 2 && type === 'business')
      )
    case 'documents':
      return (
        (phase === 2 && type === 'personal') ||
        (phase === 3 && type === 'business')
      )
    default:
      return false
  }
}
