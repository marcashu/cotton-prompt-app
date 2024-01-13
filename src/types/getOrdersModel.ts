type GetOrdersModel = {
  id: number
  orderNumber: string
  priority: boolean
  createdOn: string
  artistStatus?: string
  checkerStatus?: string
  artistId?: string
}

export default GetOrdersModel