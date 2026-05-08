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
import { PencilIcon, Trash2 } from "lucide-react"
import { DialogFormEdit } from "./dialog-form-edit"

export function CategoryTypes() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isDialogEditOpen, setIsDialogEditOpen] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

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

  function handleDialogEdit(id: string) {
    setSelectedId(id)
    setIsDialogEditOpen(true)
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <DialogFormCreate open={isDialogOpen} setOpen={setIsDialogOpen} />
      <DialogFormEdit
        open={isDialogEditOpen}
        setOpen={setIsDialogEditOpen}
        id={selectedId}
      ></DialogFormEdit>
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
              {categoryTypes.map((categoryType, index) => (
                <TableRow key={categoryType.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{categoryType.name}</TableCell>
                  <TableCell>
                    {categoryType.action.toLocaleUpperCase()}
                  </TableCell>
                  <TableCell>{categoryType.description}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Edit"
                      onClick={() => handleDialogEdit(categoryType.id)}
                    >
                      <PencilIcon />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      aria-label="Hapus"
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
