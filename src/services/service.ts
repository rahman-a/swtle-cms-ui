import axios from 'axios'
import { i18n } from 'next-i18next'

const service = () => {
  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
    headers: {
      'Accept-Language': i18n?.language || 'en',
      apikey: process.env.NEXT_PUBLIC_API_KEY,
    },
  })
}

export default service
