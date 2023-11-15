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
      <Item v-for="([id, _score, title, url, similarity], index) in items" :index="index" :id="id" :title="title"
        :url="url" :similarity="similarity" />
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
      const decay_rate = 0.98;
      const now = Date.now() / 1000;
      for (const item of response.data.items) {
        // See: https://github.com/metalwhale/newswaters/blob/whistler-v0.2.2/whistler/src/main.rs#L101
        const [id, score, title, url, time] = item;
        if (score >= 0.7) {
          const elapsed_day = (now - time) / 86400;
          const decayed_score = score * Math.pow(decay_rate, elapsed_day);
          const similarity = score >= 0.75 ? "high" : "low";
          items.push([id, decayed_score, title, url, similarity]);
        }
      }
      items.sort(([_i1, s1, _t1, _u1, _s1], [_i2, s2, _t2, _u2, _s2]) => s2 - s1);
      this.items = items;
    }
  }
}
</script>
