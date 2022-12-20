import { login } from "masto";
import fs from "node:fs";

const masto = await login({
  url: "https://fosstodon.org",
  accessToken: "QYDjQOfn25wNWCNbdEIYl5s6vqFQ4--IIq42KRua8-s",
});

// Upload the image
const attachment = await masto.mediaAttachments.create({
  file: fs.createReadStream("test.png"),
  description: "Some image",
});

// Publish!
const status = await masto.statuses.create({
  status: "Post from Masto.js",
  visibility: "direct",
  mediaIds: [attachment.id],
});

console.log(status);
