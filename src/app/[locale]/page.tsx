'use client'

import { useEffect, useState } from "react";
import { getRooms, setLimitRoom } from "../services/room-setvice";
import { RoomResponse } from "../models/room-model";
import { useRouter } from "next/navigation";
import React from "react";
import { registerUser } from "../services/user-service";
import { UserRegisterBody, UserRegisterSchema } from "../models/user-model";
import { toast } from "react-toastify";
import { Form, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { onKeyDownOnlyNumber } from "../utils/shared-fn";
import roomImg from '/public/room.jpeg'
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
import { setIsLoading, setIsRefresh } from "../lib/redux/features/loadingSlice";
import { useDispatch } from "react-redux";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "lucide-react";
import { useAppSelector } from "../lib/redux/hook";

export default function Home() {
  const [rooms, setRooms] = useState<RoomResponse[]>([])
  const [selectRooms, setSelectRooms] = useState<RoomResponse>()
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const dispatch = useDispatch()
  const { isRefresh } = useAppSelector(state => state.loadingStore)

  const { data: session } = useSession();
  const isLogin = !!session
  console.log(isLogin)

  const method = useForm<UserRegisterBody>({
    resolver: zodResolver(UserRegisterSchema),
  })

  const { register, handleSubmit, formState: { errors }, reset } = method

  const getRoomApi = async () => {
    try {
      dispatch(setIsLoading(true))
      const response = await getRooms()
      setRooms(response)
      dispatch(setIsRefresh(false))
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const setRoomApi = async (roomId: string, newLimit: number) => {
    try {
      dispatch(setIsLoading(true))
      await setLimitRoom(roomId, newLimit)
      toast.success("Set Limit room success")
      console.log("Set Limit room success")
      dispatch(setIsRefresh(true))
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    getRoomApi()
  }, [isRefresh])

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

  const handleSelectRoom = (room: RoomResponse) => {
    if (isLogin) {
      router.push(`/room/${room._id}`)
    } else {
      handleBookRoom(room)
      setOpen(true)
    }
  }

  console.log({ errors })
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
      <div className="max-w-[1280px] mx-auto p-4">
        {isLogin ?
          <section className="flex items-center justify-between">
            <div className="flex gap-2">
              <Avatar >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1>{session?.user.name}</h1>
                <p className="text-gray-400 text-sm">{session?.user.email}</p>
              </div>
            </div>
            <Button className="cursor-pointer" onClick={async () => {
              await signOut()
            }}>
              <p>Logout</p>
            </Button>
          </section> :
          <Button className="cursor-pointer" onClick={() => router.push('/login')}>
            <p>Login</p>
          </Button>
        }
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {rooms.map((room) => {
            return <div className=" rounded-lg cursor-pointer transform transition duration-500  hover:scale-105  shadow-md  flex flex-col items-center justify-center gap-2"  >
              <Image alt="room" src={roomImg} className="rounded-t-lg" width={300} height={300} onClick={() => {
                handleSelectRoom(room)
              }} />
              <div className="p-4 w-full">
                <div onClick={() => {
                  handleSelectRoom(room)
                }}>
                  <div className="flex  items-center justify-between">
                    <h2 className="font-bold">Room: </h2>
                    <h2>{room.name}</h2>
                  </div>
                  <div className="flex  items-center justify-between">
                    <h2 className="font-bold">Limit: </h2>
                    <h2>{room.limit}</h2>
                  </div>
                  <div className="flex  items-center justify-between">
                    <h2 className="font-bold">จองแล้ว: </h2>
                    <h2>{room.reservedSeats}</h2>
                  </div>
                  <div className="flex  items-center justify-between">
                    <h2 className="font-bold">คงเหลือ: </h2>
                    <h2>{room.remainingSeats}</h2>
                  </div>
                </div>
                <Button className="mt-4" onClick={() => {
                  setRoomApi(room._id, 11)
                }}>Set ที่นั่ง</Button>
              </div>
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
        </>
        }
      </div>
    </section>
  );
}
