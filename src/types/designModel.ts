import CommentModel from "./commentModel"

type DesignModel = {
  id: number
  name: string
  url: string
  createdOn: string
  comments: CommentModel[]
}

export default DesignModel