import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

axiosInstance.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export {
  axiosInstance,
}
