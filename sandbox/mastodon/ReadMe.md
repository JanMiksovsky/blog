Auth flow: https://docs.joinmastodon.org/client/authorized/

- Authorize user → get authorization code. Should only have to do this once.
- Authorization code → access token. May need to do this again at some point, maybe not.
- Make calls to Mastodon API using access token in `Authorization: Bearer` header.
