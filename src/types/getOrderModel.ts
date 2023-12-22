import DesignBracket from "./designBracket"

type GetOrderModel = {
  id: number
  orderNumber: string
  priority: boolean
  concept: string
  printColor: string
  designBracket: DesignBracket
  imageReferences: string[]
}

export default GetOrderModel