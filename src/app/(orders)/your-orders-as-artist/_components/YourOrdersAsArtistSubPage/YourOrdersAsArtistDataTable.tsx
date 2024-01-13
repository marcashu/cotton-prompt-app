"use client"

import { DataTable } from "@/components/ui/data-table"
import { columnDef } from "../../_lib/constants"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import useSession from "@/hooks/useSession"
import { ArtistStatus } from "../../../_lib/constants"

export default function YourOrdersAsArtistDataTable({ url }: { url: string }) {
  const { data, isLoading } = useSWR<GetOrdersModel[]>(url)

  return (
    <DataTable columns={columnDef} data={data ?? []} isLoading={isLoading} />
  )
}
