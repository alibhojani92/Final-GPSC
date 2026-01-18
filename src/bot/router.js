import { startFlow } from "./flows/start.flow.js";
import { subjectFlow } from "./flows/subject.flow.js";
import { dailyTestFlow } from "./flows/dailyTest.flow.js";
import { weeklyTestFlow } from "./flows/weeklyTest.flow.js";
import { practiceTestFlow } from "./flows/practiceTest.flow.js";
import { answerFlow } from "./flows/answer.flow.js";
import { reportFlow } from "./flows/report.flow.js";
import { studyFlow } from "./flows/study.flow.js";

export class Router {
  constructor(env) {
    this.env = env;
  }

  async handle(update) {
    if (update.message?.text === "/start") {
      return startFlow(update, this.env);
    }

    if (update.callback_query) {
      const data = update.callback_query.data || "";

      if (data.startsWith("SUBJECT")) return subjectFlow(update, this.env);
      if (data.startsWith("DAILY")) return dailyTestFlow(update, this.env);
      if (data.startsWith("WEEKLY")) return weeklyTestFlow(update, this.env);
      if (data.startsWith("PRACTICE")) return practiceTestFlow(update, this.env);
      if (data.startsWith("ANS_")) return answerFlow(update, this.env);
      if (data.startsWith("REPORT")) return reportFlow(update, this.env);
      if (data.startsWith("STUDY")) return studyFlow(update, this.env);
    }

    return null;
  }
        }
