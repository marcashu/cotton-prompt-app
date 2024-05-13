type GetOrdersModel = {
  id: number
  orderNumber: string
  priority: boolean
  date: string
  artistStatus?: string
  checkerStatus?: string
  artistId?: string
  artistName?: string
  checkerName?: string
  customerStatus: string
  customerName: string
  originalOrderId?: number
  changeRequestOrderId?: number
  reason?: string
  reporterName?: string
}

export default GetOrdersModel