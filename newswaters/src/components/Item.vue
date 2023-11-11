<script setup lang="ts">
defineProps(["index", "id", "title", "url"])
</script>

<template>
  <div class="flex justify-center m-2">
    <div class="card w-full max-w-4xl">
      <div class="card-body px-5 py-2">
        <h2 class="card-title">{{ `${index + 1}. ${title}` }}</h2>
        <ul class="list-disc list-outside ml-5 text-gray-500">
          <li>HN discussion: <a class="link" :href="`https://news.ycombinator.com/item?id=${id}`">{{ id }}</a>
          </li>
          <li>Origin link: <a class="link" :href="url">{{ url }}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
