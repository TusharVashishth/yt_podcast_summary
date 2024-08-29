import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter";

vine.errorReporter = () => new CustomErrorReporter();

export const summarySchema = vine.object({
  url: vine.string().url(),
  user_id: vine.string(),
});
