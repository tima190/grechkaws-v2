import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**'
    }),
    blogs: defineCollection({
      type: 'page',
      source: 'blogs/*.md',
    }),
    merch: defineCollection({
      type: 'data',
      source: 'merch/*.yml',
      schema: z.object({
        title: z.string(),
        price: z.number(),
        description: z.string(),
        variants: z.array(
          z.object({
            color: z.string(),
            image: z.string()
          })
        )
      })
    })
  }
})