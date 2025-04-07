'use client';

import { useSearchParams } from 'next/navigation'
import React from 'react'

const PaymentPage = () => {
  const searchParams = useSearchParams()
  const deliveryInfoId = searchParams.get('deliveryInfo')
  return (
    <div>
        Payment
    </div>
  )
}

export default PaymentPage