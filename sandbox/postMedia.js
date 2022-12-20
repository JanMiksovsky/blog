// import fs from "fs";
import { login } from "masto";
// import { Readable } from "stream";

const masto = await login({
  url: "https://fosstodon.org",
  accessToken: "QYDjQOfn25wNWCNbdEIYl5s6vqFQ4--IIq42KRua8-s",
});

// Desired ability to post media via REST API seems blocked by
// https://github.com/mastodon/mastodon/issues/17622
//
// HACK: Use Masto.js to post media as a workaround, which only seems to work
// with actual files on disk.
export default async function postMedia(media, description) {
  fs.writeFileSync("temp.png", media);
  const stream = fs.createReadStream("temp.png");
  const attachment = await masto.mediaAttachments.create({
    file: stream,
    description,
  });
  fs.unlinkSync("temp.png");
  return attachment;

  const base64 = media.toString("base64");
  // const stream = Readable.from(base64);

  // const blob = new Blob([media], { type: "image/png" });
  // const file = new File([blob], "test.png", { type: "image/png" });
  // const formData = new FormData();
  // formData.append("description", description);
  // // formData.append("file", blob, "test.png");
  // formData.append("file", media, {
  //   contentType: "image/png",
  //   filename: "test.png",
  // });
  // formData.append("file", file);
  // const stream = fs.createReadStream("test.png");
  // formData.append("file", stream, "temp.png");

  // const image = fs.createReadStream("test.png");
  // formData.append("file", image);

  // const istream = Buffer.from(media, "base64");
  // formData.append("file", istream);

  const body = `
--boundary
Content-Disposition: form-data; name="file"; filename="test.png"

${base64}
--boundary--
`;

  const response = await fetch("https://fosstodon.org/api/v2/media", {
    method: "POST",
    headers: {
      Authorization: "Bearer QYDjQOfn25wNWCNbdEIYl5s6vqFQ4--IIq42KRua8-s",
      "Content-Type": `multipart/form-data;boundary="boundary"`,
    },
    // body: formData,
    body,
  });

  if (response.ok) {
    const attachment = await response.json();
    return attachment;
  } else {
    console.error(`${response.status}: ${response.statusText}`);
    return undefined;
  }
}
