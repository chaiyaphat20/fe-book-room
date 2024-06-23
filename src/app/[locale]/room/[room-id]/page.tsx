'use client'

import { RoomResponse } from '@/app/models/room-model'
import { getRoomById } from '@/app/services/room-setvice'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useEffect, useState } from 'react'

export default function Page({
  params
}: {
  params: { "room-id": string }
}) {
  const roomId = params["room-id"]
  const [room, setRoom] = useState<RoomResponse>()

  const getRoomApi = async (roomId: string) => {
    try {
      const response = await getRoomById(roomId)
      setRoom(response)
    } catch (error: any) {
      console.error(error.message)
    } finally {

    }
  }

  useEffect(() => {
    if (!roomId) return
    getRoomApi(roomId)
  }, [roomId])

  return (
    <div className='max-w-[1280px] mx-auto p-8 shadow-lg bg-white mt-20'>
      <Table aria-label="Example static collection table" >
        <TableHeader className='bg-gray-200'>
          <TableRow>
            <TableHead className='text-center'>First Name</TableHead>
            <TableHead className='text-center'>Last Name</TableHead>
            <TableHead className='text-center'>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {room ? (
            room.users.map((item, index) => (
              <TableRow key={index} className='text-center'>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.phone}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className='text-center'>
              <TableCell >Loading...</TableCell>
              <TableCell >Loading...</TableCell>
              <TableCell>Loading...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
