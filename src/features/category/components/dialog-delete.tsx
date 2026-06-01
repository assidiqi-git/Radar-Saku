import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { useCategoryStore } from "../store/categoryStore"
import { useDeleteCategory } from "../hooks/useDeleteCategory"
import { toast } from "sonner"

export function DialogDelete() {
  const { isDialogDeleteOpen, closeDialogDelete, selectedId } =
    useCategoryStore()
  const { mutate: deleteCategory, isPending, isSuccess } = useDeleteCategory()

  if (!isDialogDeleteOpen) return null

  const handleDelete = () => {
    if (selectedId) {
      deleteCategory(selectedId)
      if (isSuccess) {
        toast("berhasil menghapus dataaa")
      }
    }
  }

  return (
    <AlertDialog open={isDialogDeleteOpen} onOpenChange={closeDialogDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleDelete()}
          >
            {isPending ? "Loading" : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
