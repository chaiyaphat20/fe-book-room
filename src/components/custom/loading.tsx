import { useAppSelector } from '@/app/lib/redux/hook'
import { MoonLoader } from 'react-spinners'
export default function Loading() {
  const { isLoading } = useAppSelector((state) => state.loadingStore)
  return (
    <div
      className={`fixed h-screen ${isLoading ? 'block' : 'hidden'} right-0 top-0 z-[1000] flex w-screen items-center justify-center bg-black bg-opacity-50`}
    >
      <MoonLoader color="#36d7b7" size={60} />
    </div>
  )
}
