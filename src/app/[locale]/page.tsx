'use client'

import { useEffect, useState } from "react";
import { getRooms } from "../services/room-setvice";
import { RoomResponse } from "../models/room-model";
import { useRouter } from "next/navigation";
import React from "react";
import { registerUser } from "../services/user-service";
import { UserRegisterBody, UserRegisterSchema } from "../models/user-model";
import { toast } from "react-toastify";
import { Form, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { onKeyDownOnlyNumber } from "../utils/shared-fn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { setIsLoading } from "../lib/redux/features/loadingSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const [rooms, setRooms] = useState<RoomResponse[]>([])
  const [selectRooms, setSelectRooms] = useState<RoomResponse>()
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const dispatch = useDispatch()

  const method = useForm<UserRegisterBody>({
    resolver: zodResolver(UserRegisterSchema),
  })

  const { register, handleSubmit, formState: { errors }, reset } = method

  const getRoomApi = async () => {
    try {
      dispatch(setIsLoading(false))
      const response = await getRooms()
      setRooms(response)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      dispatch(setIsLoading(true))
    }
  }


  useEffect(() => {
    getRoomApi()
  }, [])

  const handleBookRoom = (room: RoomResponse) => {
    setSelectRooms(room)
  }

  const onSubmit = async (values: UserRegisterBody) => {
    try {
      const body: UserRegisterBody = { firstName: values.firstName, lastName: values.lastName, phone: values.phone, roomId: selectRooms?._id ?? "" }
      await registerUser(body)
      router.push(`/room/${selectRooms?._id}`)
    } catch (error: any) {
      toast.error(error.message)
    } finally {

    }
  }
  console.log({ errors })
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {rooms.map((room) => {
          return <div onClick={() => {
            handleBookRoom(room)
            setOpen(true)
          }} className="bg-blue-200 rounded-lg cursor-pointer transform transition duration-500 
                                hover:scale-110 hover:bg-blue-300 shadow-md size-40 flex flex-col items-center justify-center gap-2">
            <h2 className="font-bold">Room: {room.name}</h2>
            <h2 className="">Limit: {room.limit}</h2>
            <h2 className="">จองแล้ว: {room.reservedSeats}</h2>
            <h2 className="">คงเหลือ: {room.remainingSeats}</h2>
          </div>
        })}
      </section>
      {selectRooms && <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Register to the room</DialogTitle>
                <DialogDescription>
                  ลงเชื่อเข้าทำงาน ห้อง: {selectRooms.name}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstName" className="text-right">
                    First Name
                  </Label>
                  <Input
                    {...register('firstName')}
                    id="firstName"
                    placeholder="Please enter first name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Last Name
                  </Label>
                  <Input
                    {...register('lastName')}
                    id="lastName"
                    placeholder="Please enter last name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    {...register('phone')}
                    id="phone"
                    placeholder="Please enter phone"
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Accept</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </>}
    </section>
  );
}
