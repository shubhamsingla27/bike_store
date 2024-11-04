"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { deleteBikeEntry } from '@/lib/actions'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface BikeDeleteFormProps {
    id: number;
}

const BikeDeleteForm: React.FC<BikeDeleteFormProps> = ({id}) => {
    const {toast} = useToast()
    const router = useRouter()
    
    const handleDelete = async () => {
        const result = await deleteBikeEntry(id);
        if (result.status === 'SUCCESS') {
            toast({
                title: 'Bike deleted successfully',
                description: 'The bike was successfully deleted.',
            })
            router.push('/')
        } else {
            alert('Failed to delete bike');
        }
    }
  return (
    <div className='bike-form'>
        <p>Are you sure you want to delete this bike?</p>
        <div className='flex justify-between gap-2'>
            <Link className='w-full' href={`/`}>
                <Button className='bike-form_btn_cancel'>
                Cancel
                </Button>
            </Link>
            <Button onClick={handleDelete} className='w-full bike-form_btn text-white'>
                Delete
            </Button>

        </div>
    </div>
  )
}

export default BikeDeleteForm