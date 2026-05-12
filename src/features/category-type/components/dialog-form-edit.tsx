import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import {
  categoryTypeSchema,
  type CategoryTypeValues,
} from "../schemas/category-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useCategoryTypeEdit } from "../hooks/use-category-type-edit"
import { useCategoryTypeStore } from "../store/category-type-store"
import { useUpdateCategoryType } from "../hooks/use-update-category-type"

export function DialogFormEdit() {
  const { isDialogEditOpen, closeDialogEdit, editingId } =
    useCategoryTypeStore()
  const { data, isLoading, isError, error } = useCategoryTypeEdit()
  const { mutate: updateCategoryType } = useUpdateCategoryType()

  const form = useForm<CategoryTypeValues>({
    resolver: zodResolver(categoryTypeSchema),
    values: {
      name: data?.name || "",
      action: data?.action || "neutral", // pastikan fallback value sesuai dengan tipe data
      description: data?.description || "",
    },
  })

  const handleUpdate = (values: CategoryTypeValues) => {
    if (editingId) {
      updateCategoryType({ id: String(editingId), data: values })
    }
  }

  return (
    <Dialog open={isDialogEditOpen} onOpenChange={closeDialogEdit}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Category Type</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur.
          </DialogDescription>
        </DialogHeader>
        {isLoading && (
          <div className="p-4 text-center">Memuat detail post...</div>
        )}

        {isError && (
          <div className="p-4 text-red-500">Error: {error.message}</div>
        )}

        {data && (
          <>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleUpdate)}>
              <FieldGroup>
                <div className="space-y-4">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Nama Tipe Kategori
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Login button not working on mobile"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="action"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Aksi Tipe Kategori
                        </FieldLabel>
                        <Select
                          key={field.value}
                          {...field}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="addition">Addition</SelectItem>
                              <SelectItem value="deduction">
                                Deduction
                              </SelectItem>
                              <SelectItem value="neutral">Neutral</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Deskripsi
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Lorem ipsum dolor sit amet."
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </form>
            <DialogFooter>
              <Field orientation="horizontal" className="justify-end">
                <Button type="submit" form="form-rhf-demo">
                  Simpan
                </Button>
              </Field>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
