import { z } from 'zod'

export type UserRegisterBody = z.infer<typeof UserRegisterSchema>

export const UserRegisterSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'firstName required' }),
  lastName: z
    .string()
    .min(1, { message: 'firstName required' }),
  phone: z
    .string()
    .min(1, { message: 'firstName required' }),
  roomId: z
    .string().optional()
})

export interface UserRegisterResponse {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  room: string;
  createdAt: Date;
  updatedAt: Date;
}