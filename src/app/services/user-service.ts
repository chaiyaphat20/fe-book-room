import axios from "axios"
import { UserRegisterBody, UserRegisterResponse } from "../models/user-model"
import { axiosInstance } from "../utils/axios-instance"

export async function registerUser(data: UserRegisterBody): Promise<UserRegisterResponse> {
  try {
    const response = await axiosInstance.post(`/user/register`, data)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      throw new Error(error.message || 'An unknown error occurred')
    }
  }
}
