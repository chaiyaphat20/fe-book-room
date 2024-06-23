'use client'

import { RoomResponse } from '@/app/models/room-model'
import { getRoomById } from '@/app/services/room-setvice'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'


type SortByType = "firstName" | "lastName" | "createdDate" | ""

export default function Page({
  params
}: {
  params: { "room-id": string }
}) {
  const roomId = params["room-id"]
  const [room, setRoom] = useState<RoomResponse>()
  const [sortBy, setSortBy] = useState<SortByType>('')
  const [search, setSearch] = useState('')

  const getRoomApi = async (roomId: string, search?: string, sortBy?: string) => {
    try {
      const response = await getRoomById(roomId, search ?? "", sortBy ?? "")
      setRoom(response)
    } catch (error: any) {
      console.error(error.message)
    } finally {

    }
  }

  const handleSetSort = (sort: SortByType) => {
    setSortBy(sort)
    getRoomApi(roomId, search, sort)
  }

  useEffect(() => {
    if (!roomId) return
    getRoomApi(roomId)
  }, [roomId])

  return (
    <div>
      <div className='max-w-[1280px] mx-auto '>
        <div className=' shadow-lg bg-white mt-20 p-8'>
          <div className='flex flex-row gap-8'>
            <div className='relative'>
              <svg className="lucide lucide-search absolute top-2 left-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <Input value={search} onChange={(e) => {
                const searchString = e.target.value
                setSearch(searchString)
                getRoomApi(roomId, searchString, sortBy)
              }} type="text" placeholder="search" className='w-[200px] pl-10' />
            </div>
            <div className='flex gap-4 items-center'>
              <div onClick={() => handleSetSort('')} className={`px-6 py-2 rounded-lg  text-white cursor-pointer  ${sortBy === "" ? "bg-sky-500" : "bg-gray-300"}`}>
                All
              </div>
              <div onClick={() => handleSetSort('firstName')} className={`px-6 py-2 rounded-lg ${sortBy === "firstName" ? "bg-sky-500" : "bg-gray-300"} text-white cursor-pointer`}>
                FirstName
              </div>
              <div onClick={() => handleSetSort('lastName')} className={`px-6 py-2 rounded-lg ${sortBy === "lastName" ? "bg-sky-500" : "bg-gray-300"} text-white cursor-pointer`}>
                LastName
              </div>
              <div onClick={() => handleSetSort('createdDate')} className={`px-6 py-2 rounded-lg ${sortBy === "createdDate" ? "bg-sky-500" : "bg-gray-300"} text-white cursor-pointer`}>
                Create Date
              </div>
            </div>
          </div>

          <Table aria-label="Example static collection table " className='mt-4'>
            <TableHeader className='bg-gray-200'>
              <TableRow>
                <TableHead className='text-center'>First Name</TableHead>
                <TableHead className='text-center'>Last Name</TableHead>
                <TableHead className='text-center'>Phone</TableHead>
                <TableHead className='text-center'>CreatedAt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody >
              {room ? (
                room.users.map((item, index) => (
                  <TableRow key={index} className='text-center'>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{dayjs(item.createdAt).format("HH:mm:ss น. DD/MM/YYYY")}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className='text-center'>
                  <TableCell >Loading...</TableCell>
                  <TableCell >Loading...</TableCell>
                  <TableCell>Loading...</TableCell>
                  <TableCell>Loading...</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  )
}
