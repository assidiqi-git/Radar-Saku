import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
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

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { DialogFormCreate } from "./dialog-form-create"
import { PencilIcon, Trash2 } from "lucide-react"
import { DialogFormEdit } from "./dialog-form-edit"
import { DialogDelete } from "./dialog-delete"

import { useGetCategories } from "../hooks/useGetCategories"
import { useCategoryStore } from "../store/categoryStore"

export function Category() {
  const { data, isError, isLoading, error, setCurrentUrl } = useGetCategories()
  const { openDialogEdit, openDialogDelete, openDialogCreate } =
    useCategoryStore()

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
          <>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-25">No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">#</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!isLoading &&
                    !isError &&
                    data &&
                    data?.data?.map((category, index) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.transaction_type.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label="Edit"
                            onClick={() => openDialogEdit(category.id)}
                          >
                            <PencilIcon />
                          </Button>
                          <Button
                            onClick={() => openDialogDelete(category.id)}
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
            <CardFooter>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentUrl(data?.links?.prev)}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentUrl(data?.links?.next)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}
