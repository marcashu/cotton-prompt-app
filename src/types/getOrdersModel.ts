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
}

export default GetOrdersModel