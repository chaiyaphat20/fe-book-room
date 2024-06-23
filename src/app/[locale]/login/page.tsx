'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SigInSchema, SigInType } from '@/app/models/auth-model'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/app/lib/redux/hook'
import { setIsLoading } from '@/app/lib/redux/features/loadingSlice'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const method = useForm<SigInType>({
    resolver: zodResolver(SigInSchema),
  })

  const { register, handleSubmit, formState: { errors }, reset } = method

  const onSubmit = async (value: SigInType) => {
    dispatch(setIsLoading(true))
    try {
      router.replace('/')
      const res = await signIn('credentials', {
        email: value.email, password: value.password, redirect: false
      })
      console.log({ res })
      if (res?.error) {
        console.log("1")
        toast.error('User password invalid!')
      } else {
        console.log("2")
        router.replace('/')
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return (
    <div className='max-w-[1280px] mx-auto flex items-center justify-center w-full h-screen'>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register('email')} id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input {...register('password')} id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
