## Setup local postgresql database

```sql
-- Create role for prisma
CREATE ROLE prisma WITH LOGIN PASSWORD 'root';

-- Create emailbase database
CREATE DATABASE emailbase;

-- Give prisma role access to emailbase
GRANT ALL ON DATABASE emailbase to prisma;
```

Then use emailbase database

```shell
\c emailbase;
```

Then give access on schema public to prisma role

```sql
GRANT ALL ON SCHEMA public to prisma;
```

Log out, then login again with prisma role and inject base sql data

```shell
psql postgres -U prisma -d emailbase -f ./sql/public.sql
```
