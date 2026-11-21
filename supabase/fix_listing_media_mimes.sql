-- Optional: relax listing-media MIME allow-list if zip-extracted
-- photos still fail with "application/octet-stream is not supported".
-- Safe to run; does not delete files.

update storage.buckets
set allowed_mime_types = array[
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif',
  'application/octet-stream'
]
where id = 'listing-media';
