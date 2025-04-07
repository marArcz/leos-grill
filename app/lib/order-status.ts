export const OrderStatus = {
    Pending: 'PENDING',
    Confirmed: 'CONFIRMED',
    Preparing: 'PREPARING',
    ReadyForPickup: 'READY_FOR_PICKUP',
    OutForDelivery: 'OUT_FOR_DELIVERY',
    Delivered: 'DELIVERED',
    Completed: 'COMPLETED',
    Cancelled: 'CANCELLED',
    Failed: 'FAILED',
    Refunded: 'REFUNDED',
  } as const;
  
  export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];
  