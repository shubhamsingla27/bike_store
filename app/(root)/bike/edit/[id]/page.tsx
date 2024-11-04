import BikeForm from '@/components/BikeForm'
import { getBikeById } from '@/db/queries'
import { notFound } from 'next/navigation'
import React from 'react'

const page = async ({params}:{params:Promise<{id:string}>}) => {
    const id = parseInt((await params).id)

    const bike = await getBikeById(id)
    if(!bike) return notFound()
  return (
<>
    <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{bike.name}</p>
        <h1 className='heading'>
            Edit Bike Details 
        </h1>
    </section>
    <BikeForm mode="edit" bike={bike}/>
    </>
  )
}

export default page