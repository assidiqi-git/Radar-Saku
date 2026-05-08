export interface CategoryType {
  id: string
  name: string
  action: "addition" | "deduction" | "neutral"
  description: string | null | any
}
