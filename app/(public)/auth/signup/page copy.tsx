import { koulen } from '@/app/ui/fonts'
import Link from 'next/link'
import React from 'react'

const SignUpPage = () => {


    return (
        <section className="wrapper py-10">
            <div className="mx-auto lg:w-[50%] w-full p-4">
                <div className="text-center">
                    <h4 className=' text-2xl text-center' style={koulen.style}>Sign up to Leo’s Grill</h4>
                    <p className='mt-2'>Create your account</p>
                </div>
                <div className="mt-2">
                    <form>
                        <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-3">
                            <div>
                                <label className='block' htmlFor="firstname">Firstname</label>
                                <input className='border-gray-100/30 border p-3 bg-dark_2 mt-2 w-full rounded' type="text" id='firstname' placeholder='Firstname' />
                            </div>
                            <div>
                                <label className='block' htmlFor="lastname">Lastname</label>
                                <input className='border-gray-100/30 border p-3 bg-dark_2 mt-2 w-full rounded' type="text" id='lastname' placeholder='Lastname' />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className='block' htmlFor="email">Email Address</label>
                            <input className='border-gray-100/30 border p-3 bg-dark_2 mt-2 w-full rounded' type="email" id='email' placeholder='Email address' />
                        </div>
                        <div className="mb-4">
                            <label className='block' htmlFor="phone">Phone Number</label>
                            <input className='border-gray-100/30 border p-3 bg-dark_2 mt-2 w-full rounded' type="email" id='phone' placeholder='Phone number' />
                            <p className='text-gray-400 mt-2 text-sm'>Enter your phone number in this format +639*********.</p>
                        </div>
                        <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-3">
                            <div className="">
                                <label className='block' htmlFor="password">Password</label>
                                <input className='border-gray-100/30 border p-3 bg-dark_2 mt-2 w-full rounded' type="password" id='password' placeholder='Password' />
                            </div>
                            <div className="">
                                <label className='block' htmlFor="confirm_password">Confirm Password</label>
                                <input className='border-gray-100/30 border p-3 bg-dark_2 mt-2 w-full rounded' type="password" id='confirm_password' placeholder='Confirm Password' />
                            </div>
                        </div>
                        <div className='mt-10'>
                            <button type='submit' className='p-3 text-dark font-semibold bg-yellow rounded text-center w-full'>Sign Up</button>
                        </div>
                        <p className='text-gray-400 mt-3 text-end'>Already have an account? <Link href="/signin" className='text-orange'>Sign in here</Link></p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignUpPage