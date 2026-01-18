import { Router } from "./bot/router.js";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("OK");
    }

    const update = await request.json();
    const router = new Router(env);
    const payload = await router.handle(update);

    if (!payload) {
      return new Response("OK");
    }

    return new Response(JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
