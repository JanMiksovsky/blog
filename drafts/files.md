What's the easiest way/service to host a file tree of large images to the cloud and end up with predictable URLs?

I have a static site repo with ~1GB of photos that's making GitHub unhappy. I'm shopping for an alternative way to host the photos.

I've looked at Git LFS, storage providers like Google Drive and OneDrive, and a variety of popular CMSes. These solutions seem to want to assign files opaque IDs; obtaining a URL from an ID requires an API call. CMSes also seem to require that files be manually uploaded through the browser or by writing a custom upload script, both of which would be a hassle.

I just want a static file server that lets me easily mirror the folder structure I've got locally. If I have a local path myProject/foo/bar/image1.jpg, I want to end up with a predictable public URL like someservice.com/…/foo/bar/image1.jpg, where the base URL is constant for the project.

I'm happy to pay for this service, but can't find anything simple enough.
