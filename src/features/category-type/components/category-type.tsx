import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useEffect, useState } from "react"
import { DialogFormCreate } from "./dialog-form-create"
import { useGetCategoryType } from "../hooks/use-get-category-type"

export function CategoryTypes() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const { categoryTypes, isLoading, error, fetchCategoryTypes } =
    useGetCategoryType()
  useEffect(() => {
    fetchCategoryTypes()
  }, [fetchCategoryTypes])

  if (isLoading) {
    return <div className="p-4 text-center">Memuat data secara modular...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      <DialogFormCreate open={isDialogOpen} setOpen={setIsDialogOpen} />
      <Card>
        <CardHeader className="w-full">
          <CardTitle>Tipe Kategori</CardTitle>
          <CardAction>
            <Button onClick={() => setIsDialogOpen(true)}>Add</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">#</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryTypes.map((invoice, index) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{invoice.name}</TableCell>
                  <TableCell>{invoice.action.toLocaleUpperCase()}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell className="text-right">{invoice.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
