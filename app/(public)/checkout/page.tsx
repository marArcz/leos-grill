import { DeliveryInformationSchema } from '@/app/lib/definitions'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CheckoutPage = () => {

    const form = useForm<z.infer<typeof DeliveryInformationSchema>>({
        resolver:zodResolver(DeliveryInformationSchema),
        defaultValues:{
            firstname:'',
            lastname:'',
            middlename:'',
            email:'',
            street:'',
            city:'',
            barangay:'',
            phone:'',
            user_id:null
        }
    })

    return (
        <div className='wrapper pt-5'>
            <div className="flex">
                <div className="w-2/3">
                    <h2 className='font-bold text-xl'>Delivery Information</h2>
                    <div className="mt-10">
                        <form action="">
                            <div className="grid columns-2">
                                <Input name='firstname' required placeholder='Firstname' />
                                <Input name='lastname' required placeholder='Lastname' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage