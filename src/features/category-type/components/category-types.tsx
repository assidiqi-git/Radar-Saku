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

import { DialogFormCreate } from "./dialog-form-create"
import { useGetCategoryType } from "../hooks/use-get-category-type"
import { PencilIcon, Trash2 } from "lucide-react"
import { DialogFormEdit } from "./dialog-form-edit"
import { DialogDelete } from "./dialog-delete"
import { useCategoryTypeStore } from "../store/category-type-store"

export function CategoryTypes() {
  const { data, isError, isLoading, error } = useGetCategoryType()

  const { openDialogEdit, openDialogDelete, openDialogCreate } =
    useCategoryTypeStore()

  return (
    <div className="grid grid-cols-1 gap-4">
      <DialogFormCreate />
      <DialogFormEdit />
      <DialogDelete />
      <Card>
        <CardHeader className="w-full">
          <CardTitle>Tipe Kategori</CardTitle>
          <CardAction>
            <Button onClick={() => openDialogCreate()}>Add</Button>
          </CardAction>
        </CardHeader>

        {isLoading && (
          <div className="p-4 text-center">Memuat data secara modular...</div>
        )}

        {!isLoading && isError && (
          <div className="p-4 text-red-500">Error: {error.message}</div>
        )}

        {!isLoading && !isError && data && (
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
                {!isLoading &&
                  !isError &&
                  data &&
                  data.map((categoryType, index) => (
                    <TableRow key={categoryType.id}>
                      <TableCell className="font-medium">
                        {index + 1} {categoryType.id}
                      </TableCell>
                      <TableCell>{categoryType.name}</TableCell>
                      <TableCell>{categoryType.action}</TableCell>
                      <TableCell>{categoryType.description}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Edit"
                          onClick={() => openDialogEdit(categoryType.id)}
                        >
                          <PencilIcon />
                        </Button>
                        <Button
                          onClick={() => openDialogDelete(categoryType.id)}
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
        )}
      </Card>
    </div>
  )
}
