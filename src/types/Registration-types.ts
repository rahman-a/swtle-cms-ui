export type Email = {
  isPrimary: boolean
  email: string
}

export type Country = {
  name: string
  abbr: string
  image: string
}

export type Phone = {
  isPrimary?: boolean
  phone: string
}

export type ExpireAt = {
  identity: string
  passport: string
}
export type VerificationDocument = {
  image: File
}

export type IFDataExisted = {
  username?: string
  emails?: Email[]
  phones?: Phone[]
}

export interface IRegistrationProps {
  username: string
  emails: Email[]
  password: string
  confirmPassword?: string
  isAgreed: boolean
  fullNameInEnglish: string
  fullNameInArabic: string
  company: string
  insideAddress: string
  outsideAddress?: string
  country: Country
  insidePhones: Phone[]
  outsidePhones?: Phone[]
  avatar: File
  'identity-front': VerificationDocument
  'identity-back': VerificationDocument
  passport: VerificationDocument
  expireAt: ExpireAt
}

export interface IUser {
  _id: string
  expiryAt: number
}
