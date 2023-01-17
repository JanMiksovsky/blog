//
// Desired ability to post media to Mastodon via REST API seems to be impaired
// by a Node issue:
// https://github.com/mastodon/mastodon/issues/17622#issuecomment-1364535599.
//
// Per that comment, we take care to: a) convert the Buffer to a Blob b) *not*
// set a file name c) *not* set the Content-Type header
//
export default async function postMedia(media, description) {
  const blob = new Blob([media]);
  const formData = new FormData();
  formData.append("description", description);
  formData.append("file", blob);

  const response = await fetch("https://fosstodon.org/api/v2/media", {
    method: "POST",
    headers: {
      Authorization: "Bearer QYDjQOfn25wNWCNbdEIYl5s6vqFQ4--IIq42KRua8-s",
    },
    body: formData,
  });

  if (response.ok) {
    const attachment = await response.json();
    return attachment;
  } else {
    console.error(`${response.status}: ${response.statusText}`);
    return undefined;
  }
}
