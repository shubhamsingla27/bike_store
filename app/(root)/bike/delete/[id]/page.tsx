import React from 'react'
import { getBikeById } from '@/db/queries'
import { notFound } from 'next/navigation'
import BikeDeleteForm from '@/components/BikeDeleteForm'

const page = async ({params}:{params:Promise<{id:string}>}) => {
    const id = parseInt((await params).id)

    const bike = await getBikeById(id)
    if(!bike) return notFound()
  return (
<>
    <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{bike.name}</p>
        <h1 className='heading'>
            Delete Bike 
        </h1>
    </section>
    <BikeDeleteForm id={bike.id}/>
    </>
  )
}

export default page