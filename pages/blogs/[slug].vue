<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blogs').path(`/blogs/${slug}`).first()
})

useHead({
  title: post.value?.title,
  meta: [
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.description },
    { property: 'og:image', content: post.value?.image },
  ]
});

useSeoMeta({
  title: post.value?.title + " - GrechkaWS",
  description: post.value?.description
})
</script>

<template>
  <TableOfContents/>
  <!-- Render the blog post as Prose & Vue components -->
  <ContentRenderer :value="post" />
</template>
