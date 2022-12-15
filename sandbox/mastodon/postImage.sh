curl -X POST \
	-H "Authorization: Bearer QYDjQOfn25wNWCNbdEIYl5s6vqFQ4--IIq42KRua8-s" \
  -H "Content-Type: multipart/form-data" \
  -F "description=Graph of a virtual folder tree" \
  --form file="@graph.png" \
	https://fosstodon.org/api/v1/media
