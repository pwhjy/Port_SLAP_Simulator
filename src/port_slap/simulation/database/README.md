# Database-backed yard state

This package stores the live yard, arriving-container queue, capacity model,
candidate masks, and cached features in MySQL. Paths in the INI configuration
are resolved relative to that configuration file, while connection values can
be overridden with the `PORT_SLAP_DB_*` environment variables documented in
`.env.example`.

The bundled configuration uses only generated CSV input under
`examples/synthetic_data`. SQL snapshots and pickle caches are runtime
artifacts written below `.runtime/` and must not be committed.
