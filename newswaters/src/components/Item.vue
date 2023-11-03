<script setup lang="ts">
// An item has the following fields: (id, score, title, url, time)
// See: https://github.com/metalwhale/newswaters/blob/whistler-v0.2.2/whistler/src/main.rs#L101
defineProps(["item", "index"])
</script>

<template>
  <div class="flex justify-center m-2">
    <div class="card w-full max-w-4xl">
      <div class="card-body px-5 py-2">
        <h2 class="card-title">{{ `${index + 1}. ${item[2]}` }}</h2>
        <ul class="list-disc list-outside ml-5 text-gray-500">
          <li>HN discussion: <a class="link" :href="`https://news.ycombinator.com/item?id=${item[0]}`">{{ item[0] }}</a>
          </li>
          <li>Origin link: <a class="link" :href="item[3]">{{ item[3] }}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
