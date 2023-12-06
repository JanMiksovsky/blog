---
title: Serve a web site from a YAML file
---

The Graph Origami serve() command can serve up any graph, including one defined in a YAML file:

```yaml
index.html: |
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <link rel="stylesheet" href="styles/styles.css" />
    </head>
    <body>
      …
    </body>
  </html>

about.html: |
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <link rel="stylesheet" href="styles/styles.css" />
    </head>
    <body>
      …
    </body>
  </html>

styles:
  styles.css: |
    body {
      …
    }
```

If you have Graph Origami installed globally, you can serve this with:

```console
$ ori serve site.yaml
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

The YAML/JSON file can be local, or come from the network. This lets you serve a site directly out of a gist like https://gist.github.com/JanMiksovsky/0d41ea862f2d08cbd2f6fcd805683511 using its “raw” URL form. You can also do this on an ad hoc basis via npx.

```console
$ ori serve https://gist.githubusercontent.com/JanMiksovsky/0d41ea862f2d08cbd2f6fcd805683511/raw/46502f5e3cb5b129627f057ca493462bde9f7c23/site.yaml
```

```console
$ npx @weborigami/origami serve https://gist.githubusercontent.com/JanMiksovsky/0d41ea862f2d08cbd2f6fcd805683511/raw/46502f5e3cb5b129627f057ca493462bde9f7c23/site.yaml
```

This might be interesting, for example, to share multi-file repro cases via any means that lets you share a file. You can serve the site out of the repro case file directly, or unpack it to local files:

```console
$ ori copy https://gist.githubusercontent.com/JanMiksovsky/0d41ea862f2d08cbd2f6fcd805683511/raw/46502f5e3cb5b129627f057ca493462bde9f7c23/site.yaml, files/snapshot
$ ls snapshot
about.html index.html styles
```
