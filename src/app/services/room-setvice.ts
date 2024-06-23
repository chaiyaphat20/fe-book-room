import axios from "axios"
import { RoomResponse } from "../models/room-model"
import { axiosInstance } from "../utils/axios-instance"

export async function getRooms(): Promise<RoomResponse[]> {
  try {
    const response = await axiosInstance.get(`/room`)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      throw new Error(error.message || 'An unknown error occurred')
    }
  }
}

export async function getRoomById(roomId: string): Promise<RoomResponse> {
  try {
    const response = await axiosInstance.get(`/room/${roomId}`)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      throw new Error(error.message || 'An unknown error occurred')
    }
  }
}