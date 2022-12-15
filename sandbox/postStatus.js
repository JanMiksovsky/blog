export default async function postStatus(status) {
  const data = {
    status,
    visibility: "direct",
  };
  const body = JSON.stringify(data);

  const response = await fetch("https://fosstodon.org/api/v1/statuses", {
    method: "POST",
    headers: {
      Authorization: "Bearer QYDjQOfn25wNWCNbdEIYl5s6vqFQ4--IIq42KRua8-s",
      "Content-Type": "application/json",
    },
    body,
  });

  const json = await response.json();
  if (response.ok) {
    return json;
  } else {
    console.log(JSON.stringify(json, null, 2));
    return undefined;
  }
}
