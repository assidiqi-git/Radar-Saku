import { create } from "zustand"

interface CategoryState {
  isDialogCreateOpen: boolean
  isDialogEditOpen: boolean
  isDialogDeleteOpen: boolean
  selectedId: string | null

  openDialogEdit: (id: string) => void
  closeDialogEdit: () => void
  openDialogCreate: () => void
  closeDialogCreate: () => void
  openDialogDelete: (id: string) => void
  closeDialogDelete: () => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
  isDialogCreateOpen: false,
  isDialogEditOpen: false,
  isDialogDeleteOpen: false,
  selectedId: null,

  openDialogCreate: () => set({ isDialogCreateOpen: true }),
  closeDialogCreate: () => set({ isDialogCreateOpen: false }),
  openDialogEdit: (id) => set({ selectedId: id, isDialogEditOpen: true }),
  closeDialogEdit: () => set({ selectedId: null, isDialogEditOpen: false }),
  openDialogDelete: (id) => set({ selectedId: id, isDialogDeleteOpen: true }),
  closeDialogDelete: () => set({ selectedId: null, isDialogDeleteOpen: false }),
}))
