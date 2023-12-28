import DesignBracket from "./designBracket"
import DesignModel from "./designModel"

type GetOrderModel = {
  id: number
  orderNumber: string
  priority: boolean
  concept: string
  printColor: string
  designBracket: DesignBracket
  imageReferences: string[]
  design?: DesignModel
  previousDesigns: DesignModel[]
}

export default GetOrderModel