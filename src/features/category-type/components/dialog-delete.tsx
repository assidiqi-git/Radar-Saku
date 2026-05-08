import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { useDeleteCategoryType } from "../hooks/use-delete-category-type"
import { toast } from "sonner"

interface DialogFormEditProps {
  open: boolean
  setOpen: (open: boolean) => void
  id: string | null
}

export function DialogDelete({ id, open, setOpen }: DialogFormEditProps) {
  const { isSuccess, isLoading, error, deleteData } = useDeleteCategoryType()

  const onDelete = async () => {
    if (!id) return

    try {
      await deleteData(id)

      setOpen(false)
      toast.success("berhasil hapus data")
    } catch (err) {
      console.error("Gagal menghapus data", err)
      toast.error("Gagal menghapus data")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
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
            onClick={() => onDelete()}
          >
            {isLoading ? "Loading" : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
