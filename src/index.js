import { initBot } from "./bot/init.js";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("OK");
    }
    return initBot(request, env);
  }
};
