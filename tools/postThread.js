import { ExplorableGraph } from "@graphorigami/origami";
import postStatus from "./postStatus.js";

export default async function postThread(thread, threadOptions = {}) {
  const plain = await ExplorableGraph.plain(thread);

  let replyId = null;
  const responses = [];

  for (const value of Object.values(plain)) {
    const statusOptions = Object.assign({}, threadOptions, value);
    if (replyId) {
      statusOptions.in_reply_to_id = replyId;
    }
    const response = await postStatus(statusOptions);
    if (!response) {
      break;
    }
    responses.push(response);
    replyId = response.id;
  }

  return responses;
}
