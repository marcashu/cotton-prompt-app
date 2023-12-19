import DesignBracket from "./designBracket"

type Order = {
  id: number
  number: string
  isPriority: boolean
  concept: string
  printColor: string
  designBracket: DesignBracket
  imageReferences: string[]
  createdOn: string
}

export default Order