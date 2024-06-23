import axios from "axios"
import { SigInType, SingInInResponse } from "../models/auth-model"
import { axiosInstance } from "../utils/axios-instance"

export async function signInApi(body: SigInType): Promise<SingInInResponse> {
  try {
    const response = await axiosInstance.post(`/admin/login`, body)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      throw new Error(error.message || 'An unknown error occurred')
    }
  }
}