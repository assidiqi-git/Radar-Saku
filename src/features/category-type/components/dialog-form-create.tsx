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
import { useSubmitCategoryType } from "../hooks/use-submit-category-type"
import { useCategoryTypeStore } from "../store/category-type-store"
import { toast } from "sonner"

export function DialogFormCreate() {
  const { isDialogCreateOpen, closeDialogCreate } = useCategoryTypeStore()

  const form = useForm<CategoryTypeValues>({
    resolver: zodResolver(categoryTypeSchema),
    defaultValues: { name: "", action: "neutral", description: "" },
  })

  const { mutate } = useSubmitCategoryType()
  const onSubmit = (values: CategoryTypeValues) => {
    mutate(values)

    form.reset()
    closeDialogCreate()
    toast.success("data berhasil ditambahkan")
  }

  return (
    <Dialog open={isDialogCreateOpen} onOpenChange={closeDialogCreate}>
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
                  name="action"
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
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="addition">Addition</SelectItem>
                            <SelectItem value="deduction">Deduction</SelectItem>
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
    </Dialog>
  )
}
