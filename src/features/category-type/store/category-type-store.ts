// store/postStore.ts
import { create } from "zustand"

interface CategoryTypeState {
  isDialogCreateOpen: boolean
  isDialogEditOpen: boolean
  isDialogDeleteOpen: boolean
  editingId: string | null
  deletingId: string | null

  openDialogEdit: (id: string) => void
  closeDialogEdit: () => void
  openDialogCreate: () => void
  closeDialogCreate: () => void
  openDialogDelete: (id: string) => void
  closeDialogDelete: () => void
}

export const useCategoryTypeStore = create<CategoryTypeState>((set) => ({
  isDialogCreateOpen: false,
  isDialogEditOpen: false,
  isDialogDeleteOpen: false,
  editingId: null,
  deletingId: null,

  openDialogCreate: () => set({ isDialogCreateOpen: true }),
  closeDialogCreate: () => set({ isDialogCreateOpen: false }),
  openDialogEdit: (id) => set({ editingId: id, isDialogEditOpen: true }),
  closeDialogEdit: () => set({ editingId: null, isDialogEditOpen: false }),
  openDialogDelete: (id) => set({ deletingId: id, isDialogDeleteOpen: true }),
  closeDialogDelete: () => set({ editingId: null, isDialogDeleteOpen: false }),
}))
