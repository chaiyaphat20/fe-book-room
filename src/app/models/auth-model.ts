import { z } from 'zod'

export const FormSchema = z.object({
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

export type FormType = z.infer<typeof FormSchema>

export interface SingInInBody {
  email: string
  password: string
}

export interface SingInInResponse {
  _id: string
  firstName: string
  lastName: string
  email: string
}
