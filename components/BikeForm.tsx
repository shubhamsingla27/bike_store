"use client"
import React, {useState, useActionState, FC} from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip'
import { Button } from './ui/button'
import { Send, SquarePlus } from 'lucide-react'
import { formSchema } from '@/lib/validations'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { createBikeEntry, updateBikeEntry } from '@/lib/actions'

interface BikeFormProps {
    mode: "add" | "edit";
    bike?: {
      id: number;
      name: string;
      image: string;
      description: string;
      type: string;
      price: number;
      quantity: number;
      rating: string;
    };
  }

const BikeForm: FC<BikeFormProps>=({mode, bike}) => {
    const [errors, setErrors] = useState<Record<string,string>>({})

    const {toast} = useToast()

    const router = useRouter()

    const addRandomBikeURL = async () => {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=bike&client_id=RJ9nVaPKpuQq_F19sFOSCVF6ovy5vk5ecuuxYSmDQeo`);
            const data = await response.json();
            const imageUrl = data.urls.regular;
            const imageInput = document.querySelector('input[name="image"]');
            if (imageInput) {
                imageInput.value = imageUrl;
            }
        } catch (error) {
            console.error('Error fetching random bike image:', error);
            toast({
                title: 'Error',
                description: 'Could not fetch a random bike image. Please try again later.',
                variant: 'destructive',
            });
        }
    };

    const handleSubmit = async (prevState:any, formData:FormData) => {
        try{
            const priceValue = formData.get('price');
            const price = priceValue !== null && typeof priceValue === 'string' ? parseFloat(priceValue) : 0;

            const formValues={
                name: formData.get('name') as string,
                image: formData.get('image') as string,
                description: formData.get('description') as string,
                type: formData.get('type') as string,
                price: price as number,
                quantity: parseInt(formData.get('quantity') as string),
                rating: formData.get('rating') as string,
            }

            // validate form values
            await formSchema.parseAsync(formValues)
            // console.log('formValues', formValues)
            const result =
            mode === "edit" && bike
            ? await updateBikeEntry(bike.id, formValues) // Update bike if in edit mode
            : await createBikeEntry(prevState,formValues); // Otherwise, add new bike
            // console.log(result)
            if (result.status === 'SUCCESS') {
                toast({
                    title: `${mode === "edit" ? "Bike updated" : "Bike added"} successfully`,
                    description: `The bike was successfully ${mode === "edit" ? "updated" : "added"}.`,
                })
                router.push('/')
            }
            return result
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors= error.flatten().fieldErrors
                setErrors(fieldErrors as unknown as Record<string, string>)

                toast({
                    title: 'Validation Failed',
                    description: 'Please check your inputs and try again',
                    variant: 'destructive',
                })
                return {...prevState, errors: "Validation Failed", status: "ERROR"}
            }
            toast({
                title: 'Error',
                description: 'An unexpected error occurred',
                variant: 'destructive',
            })
            return {...prevState, errors: "An unexpected error occurred", status: "ERROR"}
        }
    }

    const [state, formAction, isPending] = useActionState( handleSubmit, {
        errors: {},
        status:"INITIAL",
    });



  return (
    <form action={formAction} className='bike-form'>
        <div>
            <label htmlFor='name' className='bike-form_label'>Name</label>
            <Input
                id='name'
                name='name'
                placeholder='Bike Name'
                defaultValue={bike?.name || ""}
                className='bike-form_input'
                required
            />
            {errors.name && <p className='bike-form_error'>{errors.name}</p>}
        </div>
        <div>
            <label htmlFor='image' className='bike-form_label'>ImageURL</label>
            <div className='flex items-center relative'>
            <Input
                id='image'
                name='image'
                placeholder='Image URL'
                defaultValue={bike?.image || ""}
                className='bike-form_input w-[calc(100%-3rem)]'
                required
            />
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger><SquarePlus onClick={addRandomBikeURL} className=' size-8' /></TooltipTrigger>
                    <TooltipContent>
                    <p>Add random bike image url</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            
            </div>
            {errors.image && <p className='bike-form_error'>{errors.image}</p>}
        </div>
        <div>
            <label htmlFor='description' className='bike-form_label'>Description</label>
            <Textarea
                id='description'
                name='description'
                placeholder='Bike Description'
                defaultValue={bike?.description || ""}
                className='bike-form_textarea'
                required
            />
            {errors.description && <p className='bike-form_error'>{errors.description}</p>}
        </div>
        <div>
            <label htmlFor='type' className='bike-form_label'>Type</label>
            <Input
                id='type'
                name='type'
                placeholder='Bike type (Mountain, City, Electric ...)'
                defaultValue={bike?.type || ""}
                className='bike-form_input'
                required
            />
            {errors.type && <p className='bike-form_error'>{errors.type}</p>}
        </div>
        <div>
            <label htmlFor='price' className='bike-form_label'>Price</label>
            <Input
                type='number'
                id='price'
                name='price'
                placeholder='Bike Price'
                defaultValue={bike?.price || ""}
                className='bike-form_input'
                required
            />
            {errors.price && <p className='bike-form_error'>{errors.price}</p>}
        </div>
        <div>
            <label htmlFor='quantity' className='bike-form_label'>Quantity</label>
            <Input
                type='number'
                id='quantity'
                name='quantity'
                placeholder='Bike Stock'
                defaultValue={bike?.quantity || ""}
                className='bike-form_input'
                required
            />
            {errors.quantity && <p className='bike-form_error'>{errors.quantity}</p>}
        </div>
        <div>
            <label htmlFor='rating' className='bike-form_label'>Rating</label>
            <Input
                type='number'
                id='rating'
                name='rating'
                placeholder='Bike Rating'
                defaultValue={bike?.rating || ""}
                className='bike-form_input'
                required
            />
            {errors.rating && <p className='bike-form_error'>{errors.rating}</p>}
        </div>

        <Button type='submit' className='bike-form_btn text-white' disabled={isPending}>
        {isPending ? (mode === "edit" ? "Updating Bike..." : "Adding Bike...") : (mode === "edit" ? "Update Bike" : "Add Bike")}
            <Send className='size-4 ml-1' />
        </Button>
    </form>
  )
}

export default BikeForm