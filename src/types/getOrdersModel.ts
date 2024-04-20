type GetOrdersModel = {
  id: number
  orderNumber: string
  priority: boolean
  createdOn: string
  artistStatus?: string
  checkerStatus?: string
  artistId?: string
  artistName?: string
  checkerName?: string
  customerStatus: string
  customerName: string
}

export default GetOrdersModel