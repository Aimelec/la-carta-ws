# Project Title

A brief description of what this project does and who it's for.

## Table of Contents

- [Tips](#installation)

## Tips

Instructions on how to install and set up the project.

```bash
For uploading database:
  npx wrangler d1 execute la-carta-database --remote --file=./schema.sql

For uploading database (local version):
  npx wrangler d1 execute la-carta-database --local --file=./schema.sql

For querying database in console:
  npx wrangler d1 execute la-carta-database --local --command="Select * from restaurants"

If you want to log some variable to debug:
  use console.log(...)
```