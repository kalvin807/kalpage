import { gradients } from "~/contents/gradients"

interface Gradient {
  name: string
  colors: string[]
}

export const dateToString = (date: string | Date) =>
  new Date(date).toLocaleString("en-HK", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })

export const idToGradient = (id: string) => {
  const hashCode = parseInt(id, 32)
  const index = hashCode % gradients.length
  const gradient: Gradient = gradients[index]

  return gradient.colors.length === 2
    ? `linear-gradient(to bottom right, ${gradient.colors[0]}, ${gradient.colors[1]})`
    : `linear-gradient(to bottom right, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]})`
}
