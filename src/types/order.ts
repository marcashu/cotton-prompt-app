import DesignBracket from "./designBracket"

type Order = {
  id: number
  orderNumber: string
  priority: boolean
  concept: string
  printColor: string
  designBracket: DesignBracket
  imageReferences: string[]
  createdOn: string
}

export default Order