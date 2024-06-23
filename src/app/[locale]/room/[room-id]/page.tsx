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
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


type SortByType = "firstNameAsc" | "lastNameAsc" | "createdDateAsc" | "" | "firstNameDesc" | "lastNameDesc" | "createdDateDesc"

export default function Page({
  params
}: {
  params: { "room-id": string }
}) {
  const roomId = params["room-id"]
  const [room, setRoom] = useState<RoomResponse>()
  const [sortBy, setSortBy] = useState<SortByType>('')
  const [search, setSearch] = useState('')
  const router = useRouter()

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
          <Button onClick={() => router.replace('/')}>Back</Button>
          <div className='flex flex-row gap-8 mt-4'>
            <div className='relative'>
              <svg className="lucide lucide-search absolute top-2 left-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <Input value={search} onChange={(e) => {
                const searchString = e.target.value
                setSearch(searchString)
                getRoomApi(roomId, searchString, sortBy)
              }} type="text" placeholder="search" className='w-[200px] pl-10' />
            </div>
            <div onClick={() => handleSetSort('')} className={`px-6 py-2 items-center justify-center flex rounded-lg  text-white cursor-pointer  ${sortBy === "" ? "bg-sky-500" : "bg-gray-300"}`}>
              All
            </div>
            <div className=' gap-4 items-center grid grid-cols-3'>
              <div onClick={() => handleSetSort('firstNameAsc')} className={`px-6 py-2 rounded-lg ${sortBy === "firstNameAsc" ? "bg-sky-500" : "bg-gray-300"} text-white cursor-pointer`}>
                FirstNameAsc
              </div>
              <div onClick={() => handleSetSort('lastNameAsc')} className={`px-6 py-2 rounded-lg ${sortBy === "lastNameAsc" ? "bg-sky-500" : "bg-gray-300"} text-white cursor-pointer`}>
                LastNameAsc
              </div>
              <div onClick={() => handleSetSort('createdDateAsc')} className={`px-6 py-2 rounded-lg ${sortBy === "createdDateAsc" ? "bg-sky-500" : "bg-gray-300"} text-white cursor-pointer`}>
                CreatedDateAsc
              </div>
              <div onClick={() => handleSetSort('firstNameDesc')} className={`px-6 py-2 rounded-lg ${sortBy === "firstNameDesc" ? "bg-sky-500" : "bg-gray-300"} text-white cursor-pointer`}>
                FirstNameDesc
              </div>
              <div onClick={() => handleSetSort('lastNameDesc')} className={`px-6 py-2 rounded-lg ${sortBy === "lastNameDesc" ? "bg-sky-500" : "bg-gray-300"} text-white cursor-pointer`}>
                LastNameDesc
              </div>
              <div onClick={() => handleSetSort('createdDateDesc')} className={`px-6 py-2 rounded-lg ${sortBy === "createdDateDesc" ? "bg-sky-500" : "bg-gray-300"} text-white cursor-pointer`}>
                CreatedDateDesc
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
