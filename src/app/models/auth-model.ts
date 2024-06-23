import { z } from 'zod'

export const SigInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Required' })
    .refine(
      (value) => {
        if (value) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        }
        return true // Pass validation for empty string
      },
      {
        message: 'Invalid email format'
      }
    ),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.'
  }),
})

export type SigInType = z.infer<typeof SigInSchema>
export interface SingInInResponse {
  _id: string
  firstName: string
  lastName: string
  email: string
}
