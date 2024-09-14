import Bg from '@/public/bg.jpg'
import Image from 'next/image'

const Home = () => {
  return (
    <div className='w-screen flex flex-col bg-image'>
      <Image src={Bg} alt="background" className='opacity-60'/>
            <p className='text-center text-gray-200 text-3xl font-bold text-shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>One click away from booking events!</p>
    </div>
  )
}

export default Home