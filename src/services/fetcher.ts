import axios, { AxiosRequestConfig } from 'axios'

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_LOCAL

interface FetcherOptions {
  api?: string
  url: string
  options?: AxiosRequestConfig | undefined
}
export default async function fetcher({ api, url, options }: FetcherOptions) {
  const apiURL = api ?? strapiUrl
  try {
    const response = await axios.get(`${apiURL}/api/${url}`, options)
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
