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
            <span class="label-text">What do you want to search 🤔?</span>
          </label>
          <div class="join">
            <input class="input input-bordered w-full join-item" placeholder="Something hyping 😎" v-model="sentence"
              @keyup.enter="search" />
            <button class="btn btn-neutral join-item" @click="search">Search 🧐</button>
          </div>
        </div>
      </div>
      <!-- Items list -->
      <div class="mx-2">
        <h2 class="flex justify-center text-2xl font-bold m-5" v-if="is_search_finished && items.length == 0">
          No stories found 😱!
        </h2>
        <Item v-else v-for="([id, _s, title, url], index) in items" :index="index" :id="id" :title="title" :url="url" />
      </div>
      <!-- Related items list -->
      <div class="my-10 mx-2" v-if="related_items.length != 0">
        <h2 class="flex justify-center text-2xl font-bold m-5">Related stories you may be interested in 😉:</h2>
        <div class="flex justify-center">
          <div class="w-full max-w-4xl">
            <ul class="list-disc list-outside ml-5 px-5 text-gray-500">
              <li v-for="[id, _s, title, url] in related_items">
                <a class="link" :href="url">{{ title }}</a>
                (story <a class="link" :href="`https://news.ycombinator.com/item?id=${id}`">{{ id }}</a>)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import axios from "axios";
const apiRootEndpoint = import.meta.env.VITE_API_ROOT_ENDPOINT;

export default {
  data() {
    return {
      is_search_finished: false,
      sentence: "",
      items: [] as any[],
      related_items: [] as any[],
    }
  },
  methods: {
    async search() {
      const response = await axios.post(
        `${apiRootEndpoint}/search-similar-items`,
        { "sentence": this.sentence, "limit": 200 }
      );
      const items: any[] = [];
      const related_items: any[] = [];
      const decay_rate = 0.98;
      const now = Date.now() / 1000;
      for (const item of response.data.items) {
        // See: https://github.com/metalwhale/newswaters/blob/api-v0.1.0/newswaters-api/src/main.rs#L101
        const [id, score, title, url, time] = item;
        const elapsed_day = (now - time) / 86400;
        const decayed_score = score * Math.pow(decay_rate, elapsed_day);
        if (score >= 0.75) {
          items.push([id, decayed_score, title, url]);
        } else if (score >= 0.7) { // Pick related items by using a less strict condition (lower score)
          related_items.push([id, decayed_score, title, url]);
        }
      }
      items.sort(([_i1, score1, _t1, _u1], [_i2, score2, _t2, _u2]) => score2 - score1);
      related_items.sort(([_i1, score1, _t1, _u1], [_i2, score2, _t2, _u2]) => score2 - score1);
      this.items = items;
      this.related_items = related_items;
      this.is_search_finished = true;
    }
  }
}
</script>
