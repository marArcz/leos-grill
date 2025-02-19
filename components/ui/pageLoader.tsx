import React from 'react'
import Lottie from 'react-lottie-player'
import lottieJson from '@/public/animations/fire.json';
import { jotiOne } from '@/app/ui/fonts';


const PageLoader = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className="text-center">
                <Lottie
                    loop
                    animationData={lottieJson}
                    play
                    className='mx-auto'
                    style={{ width: 300, height: 300 }}
                />
                <h2 className="text-2xl text-yellow" style={jotiOne.style}>Leo's Grill</h2>
                <p className="mt-2 text-xl text-gray-400">Loading Please wait...</p>
            </div>
        </div>
    )
}

export default PageLoader