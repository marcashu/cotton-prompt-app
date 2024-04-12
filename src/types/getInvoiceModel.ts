import GetInvoiceSectionModel from "./getInvoiceSectionModel"

type GetInvoiceModel = {
  id: string
  endDate: string
  amount: number
  sections: GetInvoiceSectionModel[]
}

export default GetInvoiceModel