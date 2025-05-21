import { orderStatusList, OrderWithOrderItems } from '@/app/lib/definitions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import clsx from 'clsx'
import React from 'react'

type IProps = {
    order: OrderWithOrderItems,
    isOpen:boolean,
    handleUpdateOrderStatus: (order:OrderWithOrderItems, orderStatus:string) => void,
    handleClose:() => void
}

const UpdateOrderStatusDialog = ({ order, isOpen, handleUpdateOrderStatus, handleClose }: IProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={() => handleClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className=''>Update Status</DialogTitle>
                </DialogHeader>
                <div className="mt-3 space-y-5">
                    {orderStatusList.map((orderStatus, index) => (
                        <Button onClick={() => {
                            handleUpdateOrderStatus(order, orderStatus)
                        }} key={index} type='button' className={clsx('block w-full', {
                            'bg-orange': orderStatus.toLowerCase() == order.status?.toLowerCase()
                        })} variant="ghost">{orderStatus}</Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateOrderStatusDialog