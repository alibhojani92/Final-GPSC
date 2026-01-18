import { startFlow } from "./flows/start.flow.js";
import { dailyTestFlow } from "./flows/dailyTest.flow.js";

export class Router {
  constructor(env) {
    this.env = env;
  }

  async handle(update) {
    // /start
    if (update.message?.text?.startsWith("/start")) {
      return startFlow(update, this.env);
    }

    // Daily Test button
    if (update.callback_query?.data === "DAILY") {
      return dailyTestFlow(update, this.env);
    }

    return null;
  }
}
