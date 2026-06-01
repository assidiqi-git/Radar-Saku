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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Controller, useForm } from "react-hook-form"
import {
  categorySchema,
  type CreateCategoryPayload,
} from "../schemas/categorySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateCategory } from "../hooks/useCreateCategory"
import { useCategoryStore } from "../store/categoryStore"
import { useGetCategoryType } from "@/features/category-type/hooks/use-get-category-type"

export function DialogFormCreate() {
  const { isDialogCreateOpen, closeDialogCreate } = useCategoryStore()

  const { data: categoryTypesList, isLoading, isError } = useGetCategoryType()

  const form = useForm<CreateCategoryPayload>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", transaction_type_id: "", description: "" },
  })

  const { mutate } = useCreateCategory()
  const onSubmit = (values: CreateCategoryPayload) => {
    mutate(values)

    form.reset()
    closeDialogCreate()
    toast.success("data berhasil ditambahkan")
  }

  return (
    <Dialog open={isDialogCreateOpen} onOpenChange={closeDialogCreate}>
      {/* 1. Handle Loading State */}
      {isLoading && <p>Memuat pilihan tipe kategori...</p>}

      {/* 2. Handle Error State */}
      {isError && <p>Gagal memuat data tipe kategori. Silakan coba lagi.</p>}

      {/* 3. Render Form jika data sudah siap */}
      {!isLoading && !isError && (
        <form>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Category Type</DialogTitle>
              <DialogDescription>
                Lorem ipsum dolor sit amet consectetur.
              </DialogDescription>
            </DialogHeader>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="space-y-4">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-create-name">
                          Nama Tipe Kategori
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-create-name"
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
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger
                            className="w-full"
                            id="form-create-action"
                          >
                            <SelectValue placeholder="Select a transaction type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {categoryTypesList?.map((type) => (
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
                        <FieldLabel htmlFor="form-create-description">
                          Deskripsi
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-create-description"
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
                </div>
              </FieldGroup>
            </form>
            <DialogFooter>
              <Field orientation="horizontal" className="justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit" form="form-rhf-demo">
                  Submit
                </Button>
              </Field>
            </DialogFooter>
          </DialogContent>
        </form>
      )}
    </Dialog>
  )
}
