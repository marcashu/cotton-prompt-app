"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Spinner from "./spinner"
import { Button } from "./button"
import { useState } from "react"
import ArtistStatus from "@/enums/artistStatus"
import CheckerStatus from "@/enums/checkerStatus"
import CustomerStatus from "@/enums/customerStatus"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  isSortByStartDate?: boolean
  setInvoicesFiltered?: (data: TData[]) => void
  originalData?: TData[]
  isColorCoding?: boolean
  hasPagination?: boolean
}

export const getColorCodeForStatus = (status: string) => {
  switch (status) {
    case CustomerStatus.ForReview:
      return "bg-orange-200"
    case ArtistStatus.DesignSubmitted:
      return "bg-orange-200"
    case ArtistStatus.ForReupload:
      return "bg-red-200"
    case CheckerStatus.Claimed:
      return "bg-orange-200"
    case CheckerStatus.ReuploadRequested:
      return "bg-red-200"
    case CustomerStatus.Accepted:
      return "bg-green-200" // Only green when customer accepts
    case CheckerStatus.Approved:
      return "bg-orange-200" // Approved by checker, awaiting customer - NOT green
    case CustomerStatus.ChangeRequested:
      return "bg-red-200"
    case ArtistStatus.Completed:
      return "bg-orange-200"

    default:
      return "bg-blue-200"
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  isSortByStartDate = false,
  setInvoicesFiltered,
  originalData,
  isColorCoding = false,
  hasPagination = false,
}: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isSortByStartDateState, setIsSortByStartDateState] = useState(false)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                if (isSortByStartDate && index == 1) {
                  return (
                    <TableHead key={header.id}>
                      <div className="flex items-center gap-3">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        <img
                          src={
                            "https://static-00.iconduck.com/assets.00/sort-icon-1024x822-vbivf60x.png"
                          }
                          onClick={() => {
                            if (setInvoicesFiltered && originalData) {
                              if (!isSortByStartDateState) {
                                setInvoicesFiltered(
                                  originalData.sort((a: any, b: any) =>
                                    new Date(a.startDate) <=
                                    new Date(b.startDate)
                                      ? 1
                                      : -1
                                  )
                                )
                              } else {
                                setInvoicesFiltered(
                                  originalData.sort((a: any, b: any) =>
                                    new Date(a.startDate) >
                                    new Date(b.startDate)
                                      ? 1
                                      : -1
                                  )
                                )
                              }
                            }

                            setIsSortByStartDateState(!isSortByStartDateState)
                          }}
                          className="w-3 h-3 cursor-pointer"
                        ></img>
                      </div>
                    </TableHead>
                  )
                } else {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                }
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows && table.getRowModel().rows?.length ? (
            hasPagination ? (
              table
                .getRowModel()
                .rows.slice((currentPage - 1) * 20, currentPage * 20)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={
                      isColorCoding
                        ? `${getColorCodeForStatus(
                            (row.original as any).customerStatus
                              ? (row.original as any).customerStatus
                              : (row.original as any).checkerStatus
                              ? (row.original as any).checkerStatus
                              : (row.original as any).artistStatus
                              ? (row.original as any).artistStatus
                              : ""
                          )} hover:${getColorCodeForStatus(
                            (row.original as any).customerStatus
                              ? (row.original as any).customerStatus
                              : (row.original as any).checkerStatus
                              ? (row.original as any).checkerStatus
                              : (row.original as any).artistStatus
                              ? (row.original as any).artistStatus
                              : ""
                          )}
                          `
                        : ""
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    isColorCoding
                      ? `${getColorCodeForStatus(
                          (row.original as any).customerStatus
                            ? (row.original as any).customerStatus
                            : (row.original as any).checkerStatus
                            ? (row.original as any).checkerStatus
                            : (row.original as any).artistStatus
                            ? (row.original as any).artistStatus
                            : ""
                        )} hover:${getColorCodeForStatus(
                          (row.original as any).customerStatus
                            ? (row.original as any).customerStatus
                            : (row.original as any).checkerStatus
                            ? (row.original as any).checkerStatus
                            : (row.original as any).artistStatus
                            ? (row.original as any).artistStatus
                            : ""
                        )}
                          `
                      : ""
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )
          ) : !isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Spinner />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {hasPagination && (
        <div className="flex justify-between p-4">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentPage(currentPage - 1)
            }}
            disabled={currentPage === 1 || data.length === 0 || isLoading}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setCurrentPage(currentPage + 1)
            }}
            disabled={
              currentPage === Math.ceil(data.length / 20) ||
              data.length === 0 ||
              isLoading
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
