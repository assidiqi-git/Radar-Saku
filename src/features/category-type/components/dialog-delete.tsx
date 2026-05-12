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

import { useCategoryTypeStore } from "../store/category-type-store"
import { useDeleteCategoryType } from "../hooks/use-delete-category-type"
import { toast } from "sonner"

export function DialogDelete() {
  const { isDialogDeleteOpen, closeDialogDelete, deletingId } =
    useCategoryTypeStore()
  const { mutate: deleteCategory, isPending } = useDeleteCategoryType()

  if (!isDialogDeleteOpen) return null

  const handleDelete = () => {
    if (deletingId) {
      deleteCategory(deletingId)
      toast("berhasil menghapus data")
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
