import service from './service'
import type {
  IRegistrationProps,
  IFDataExisted,
} from '../types/Registration-types'

const userAPI = {
  registerUser(data: IRegistrationProps) {
    return service().post('users/register', data)
  },
  checkIfDataExists(data: IFDataExisted) {
    return service().post(`users/check-if-exist`, data)
  },
  sendVerifyCodeToPhone(id?: string, email?: string) {
    const url =
      !id && email ? `users/phone?email=${email}` : `users/phone/${id}`
    return service().get(url)
  },
  verifyPhoneCode(code: string, id?: string, email?: string) {
    const url =
      !id && email
        ? `users/phone/verify?code=${code}&email=${email}`
        : `users/phone/verify/${id}?code=${code}`
    return service().patch(url)
  },
  updatePhoneNumber(id: string, phone: string) {
    return service().patch(`users/${id}/phone/update?phone=${phone}`)
  },
  sendVerifyEmailLink(id: string) {
    return service().get(`users/email/${id}`)
  },
  sendLoginCredential(data: { email: string; password: string }) {
    return service().post('users/login', data)
  },
  sendLoginCode(id: string) {
    return service().get(`users/login/code/new/${id}`)
  },
  verifyLoginCode(id: string, data: { code: string; isRemembered: boolean }) {
    return service().patch(`users/login/code/verify/${id}`, data)
  },
  sendPasswordResetLink(email: string) {
    return service().get(`users/password/reset?email=${email}`)
  },
  verifyAuthLink(data: any) {
    return service().patch(`users/verify`, data)
  },
}

export default userAPI
