import { ExplorableGraph } from "@graphorigami/origami";
import postStatus from "./postStatus.js";

export default async function postThread(thread) {
  const plain = await ExplorableGraph.plain(thread);

  let replyId = null;
  const responses = [];

  for (const value of Object.values(plain)) {
    const options = Object.assign({}, value);
    if (replyId) {
      options.in_reply_to_id = replyId;
    }
    const response = await postStatus(options);
    if (!response) {
      break;
    }
    responses.push(response);
    replyId = response.id;
  }

  return responses;
}
