import { DeliveryInformationSchema } from '@/app/lib/definitions'
import { useCreateDeliveryInfo } from '@/app/lib/react-query/queriesAndMutations'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PrimaryBtn from '@/components/ui/primary-button'
import { useGetSession } from '@/hooks/use-get-session'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
    onFinish: (refetch?:boolean) => void
}

const DeliveryInformationForm = ({onFinish}:Props) => {
    const {mutateAsync:createDeliveryInfo, isPending:isCreatingDeliveryInfo} = useCreateDeliveryInfo()
    const session = useGetSession();
    const formSchema = useForm<z.infer<typeof DeliveryInformationSchema>>({
        resolver: zodResolver(DeliveryInformationSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            middlename: '',
            email: '',
            street: '',
            city: '',
            barangay: '',
            phone: '',
            user_id: ''
        }
    })

    useEffect(() => {
        if(session){
            formSchema.setValue('user_id',session.user.id);
        }else{
            formSchema.setValue('user_id','');
        }
    },[session])

    const onSubmit = async (data: z.infer<typeof DeliveryInformationSchema>) => {
        const res = await createDeliveryInfo(data);
        console.log('creating DeliveryInfo: ', res)
        onFinish(true);
    }

    return (
        <>
            <div className="">
                <Form {...formSchema}>
                    <form onSubmit={formSchema.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 space-x-4">
                                <FormField
                                    control={formSchema.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Firstname</FormLabel>
                                            <FormControl>
                                                <Input required placeholder="Firstname" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formSchema.control}
                                    name='lastname'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Lastname</FormLabel>
                                            <FormControl>
                                                <Input required placeholder="Lastname" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 space-x-4">
                                <FormField
                                    control={formSchema.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input required placeholder="Email" type='email' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formSchema.control}
                                    name='phone'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input required placeholder="Phone" type='text' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-4">
                                <FormField
                                    control={formSchema.control}
                                    name="street"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Street</FormLabel>
                                            <FormControl>
                                                <Input required placeholder="Street" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 space-x-4">
                                <FormField
                                    control={formSchema.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input required placeholder="City" type='text' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formSchema.control}
                                    name='barangay'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Barangay</FormLabel>
                                            <FormControl>
                                                <Input required placeholder="Barangay" type='text' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mt-4 flex space-x-3">
                                {/* <Button className='bg-yellow text-white'>Save</Button> */}
                                <PrimaryBtn disabled={!session} type='submit'>
                                    Save
                                </PrimaryBtn>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Cancel
                                    </Button>
                                </DialogClose>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default DeliveryInformationForm