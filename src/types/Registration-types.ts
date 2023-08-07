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
} | null
export type VerificationDocument = {
  image: File
} | null

export type IFDataExisted = {
  username?: string
  emails?: Email[]
  phones?: Phone[]
  name?: string
  phone?: string
  email?: string
  accountType?: 'personal' | 'business'
}

export type CompanyData = {
  name: string
  address: string
  phone: string
  email: string
  type: CompanyType
  traderLicense: VerificationDocument
  expiryDate: string
  establishmentContract?: VerificationDocument
  accountType: 'personal' | 'business'
}

export type CompanyType = 'sole' | 'llc'

export interface IRegistrationProps {
  name: string
  address: string
  phone: string
  email: string
  type: CompanyType
  traderLicense: VerificationDocument
  expiryDate: string
  establishmentContract?: VerificationDocument
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
  accountType: 'personal' | 'business'
  isEmployee: boolean
}

export interface IUser {
  _id: string
  expiryAt: number
}
