import { auth } from '@/auth'
import { Trash2, Edit, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export type BikeCardType = {
    id: number
    name: string
    image: string
    description: string
    type: string
    quantity: number
    price: number
    rating: string
}

const BikeCard = async ({bike}:{bike:BikeCardType}) => {
    const session = await auth();
    const {id, name, image, description, type, quantity, price, rating} = bike
  return (
    <li className='bike-card group'>
        <div className='flex-between gap-5'>
            <h3 className='text-26-semibold line-clamp-1'>{name}</h3>
            <p className='text-26-semibold'>{`$${price}`}</p>
        </div>
        <img src={image} alt={name} className='rounded-lg bike-card_img' />
        <p className='bike-card_desc'>{description}</p>
        <div className='flex-between gap-5'>
            <p className='text-18-semibold'>{`Available: ${quantity}`}</p>
            <p className='text-18-semibold flex items-center'>
                <Star className="size-5 mr-1" />
                {rating}
            </p>
        </div>
        <div className='flex-between mt-4'>
            <Link href={`/?query=${type.toLowerCase()}`}>
                <p className='text-16-medium'>{type}</p>
            </Link>
            {session && <div className='flex gap-2'>
                <Link href={`/bike/edit/${id}`}>
                    <Button className='btn btn-primary'>
                        <Edit className='text-white'/>
                    </Button>
                </Link>
                <Link href={`/bike/delete/${id}`}>
                    <Button className='btn btn-secondary'>
                        <Trash2 className='text-white'/>
                    </Button>
                </Link>
            </div>}
        </div>
    </li>
  )
}

export default BikeCard