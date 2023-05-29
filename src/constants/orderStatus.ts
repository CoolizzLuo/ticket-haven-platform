export enum OrderStatus {
  UNPAID,
  PAID,
  CANCELLED,
}

export const OrderStatusLabel = {
  [OrderStatus.UNPAID]: '未付款',
  [OrderStatus.PAID]: '已付款',
  [OrderStatus.CANCELLED]: '取消',
};
