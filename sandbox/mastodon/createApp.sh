curl -X POST \
	-F 'client_name=Jan Miksovsky Blog' \
	-F 'redirect_uris=urn:ietf:wg:oauth:2.0:oob' \
	-F 'scopes=read write' \
	-F 'website=https://jan.miksovsky.com' \
	https://fosstodon.org/api/v1/apps
