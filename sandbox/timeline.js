export default async function timeline() {
  const response = await fetch("https://fosstodon.org/api/v1/timelines/home", {
    headers: {
      Authorization: "Bearer QYDjQOfn25wNWCNbdEIYl5s6vqFQ4--IIq42KRua8-s",
    },
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    return undefined;
  }
}
