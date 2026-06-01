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
  categorySchema,
  type UpdateCategoryPayload,
} from "../schemas/categorySchema"
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
import { useGetCategory } from "../hooks/useGetCategory"
import { useCategoryStore } from "../store/categoryStore"
import { useUpdateCategory } from "../hooks/useUpdateCategory"
import { useGetCategoryType } from "@/features/category-type/hooks/use-get-category-type"

export function DialogFormEdit() {
  const { isDialogEditOpen, closeDialogEdit, selectedId } = useCategoryStore()
  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isError,
    error,
  } = useGetCategory()
  const { data: dataCategoryTypes, isLoading: isLoadingCategoryTypes } =
    useGetCategoryType()
  const { mutate: updateCategoryType } = useUpdateCategory()

  const isDataLoading = isLoadingCategory || isLoadingCategoryTypes

  const form = useForm<UpdateCategoryPayload>({
    resolver: zodResolver(categorySchema),
    values: {
      name: dataCategory?.name || "",
      transaction_type_id: dataCategory?.transaction_type.id || "",
      description: dataCategory?.description || "",
    },
  })

  const handleUpdate = (values: UpdateCategoryPayload) => {
    if (selectedId) {
      updateCategoryType({ id: String(selectedId), data: values })
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
        {isDataLoading && (
          <div className="p-4 text-center">Memuat detail post...</div>
        )}

        {!isDataLoading && isError && (
          <div className="p-4 text-red-500">Error: {error.message}</div>
        )}

        {!isDataLoading && !isError && (
          <>
            <form
              id="form-edit-category"
              onSubmit={form.handleSubmit(handleUpdate)}
            >
              <FieldGroup>
                <div className="space-y-4">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-edit-name">
                          Nama Tipe Kategori
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-edit-name"
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
                    name="transaction_type_id"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-create-action">
                          Aksi Tipe Kategori
                        </FieldLabel>
                        <Select
                          {...field}
                          key={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className="w-full"
                            id="form-create-action"
                          >
                            <SelectValue placeholder="Select a transaction type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {dataCategoryTypes?.map((type) => (
                                <SelectItem value={type.id} key={type.id}>
                                  {type.name}
                                </SelectItem>
                              ))}
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
                        <FieldLabel htmlFor="form-edit-description">
                          Deskripsi
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-edit-description"
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
                <Button type="submit" form="form-edit-category">
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
