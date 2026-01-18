import { startFlow } from "./flows/start.flow.js";
import { dailyTestFlow } from "./flows/dailyTest.flow.js";
import { weeklyTestFlow } from "./flows/weeklyTest.flow.js";
import { practiceTestFlow } from "./flows/practiceTest.flow.js";
import { studyFlow } from "./flows/study.flow.js";
import { reportFlow } from "./flows/report.flow.js";

export class Router {
  constructor(env) {
    this.env = env;
  }

  async handle(update) {
    // /start command
    if (update.message?.text?.startsWith("/start")) {
      return startFlow(update, this.env);
    }

    const data = update.callback_query?.data;

    if (data === "DAILY") return dailyTestFlow(update, this.env);
    if (data === "WEEKLY") return weeklyTestFlow(update, this.env);
    if (data === "PRACTICE") return practiceTestFlow(update, this.env);
    if (data === "STUDY") return studyFlow(update, this.env);
    if (data === "REPORT") return reportFlow(update, this.env);

    return null;
  }
}
