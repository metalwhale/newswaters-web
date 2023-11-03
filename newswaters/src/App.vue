<script setup lang="ts">
import Item from "./components/Item.vue"
import Footer from "./components/Footer.vue"
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <div>
      <!-- Search box -->
      <div class="flex justify-center m-5">
        <div class="form-control w-full max-w-4xl">
          <label class="label">
            <span class="label-text">What do you want to search?</span>
          </label>
          <div class="join">
            <input class="input input-bordered w-full join-item" placeholder="Something hyping" v-model="sentence"
              @keyup.enter="search" />
            <button class="btn btn-neutral join-item" @click="search">Search</button>
          </div>
        </div>
      </div>
      <!-- Items list -->
      <Item v-for="(item, index) in items" :item="item" :index="index" />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import axios from "axios";
const whistlerRootEndpoint = import.meta.env.VITE_WHISTLER_ROOT_ENDPOINT;

export default {
  data() {
    return {
      sentence: "",
      items: [] as any[],
    }
  },
  methods: {
    async search() {
      const response = await axios.post(
        `${whistlerRootEndpoint}/search-similar-items`,
        { "sentence": this.sentence, "limit": 100 }
      );
      const items: any[] = [];
      for (const item of response.data.items) {
        const score = item[1]; // See: https://github.com/metalwhale/newswaters/blob/whistler-v0.2.2/whistler/src/main.rs#L101
        if (score > 0.7) {
          items.push(item);
        }
      }
      this.items = items;
    }
  }
}
</script>
