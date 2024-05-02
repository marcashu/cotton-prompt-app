import { revalidateTag } from "next/cache"

export const mutate = async (url: string, init: RequestInit, tags?: string[]) => {
  const res = await fetch(url, init)

  if (!res.ok) throw new Error()

  if (!tags?.length) return

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i]
    revalidateTag(tag)
  }
}

export const queryMutate = async <T>(url: string, init: RequestInit, tags?: string[]): Promise<T> => {
  const res = await fetch(url, init)

  if (!res.ok) throw new Error()

  if (tags?.length) {
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i]
      revalidateTag(tag)
    }
  }

  const result = await res.json() as T
  return result
}

export const query = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init)

  const result = await res.json() as T
  return result
}