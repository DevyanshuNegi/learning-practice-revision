# Cohort Notes: AWS Frontend, Docker, PostgreSQL, and Monorepo Basics

Source: `t.me/course69bot`

## 1) Frontend Deployment on AWS (High Level)

- Use **S3** (Simple Storage Service) to host static frontend files.
- Use **CloudFront** as CDN and public entry point.
- Use SSL/TLS certificates (typically via ACM) for HTTPS.

Typical flow:
1. Build frontend (`dist` or `build` output).
2. Upload build files to S3 bucket.
3. Configure CloudFront distribution with S3 as origin.
4. Attach certificate and custom domain.

## 2) Docker Essentials

### Common Commands

```bash
docker run <image>
# Example:
docker run mongo
```

```bash
docker run -p <hostPort>:<containerPort> <image>
# Example:
docker run -p 27017:27017 mongo
```

- `-p 27017:27017` means traffic on host port `27017` is forwarded to container port `27017`.

```bash
docker run -d <image>
```

- `-d` runs container in detached/background mode.

```bash
docker ps
```

- Lists running containers.

```bash
docker kill <container_id>
```

- Stops a running container.

### Running Postgres in Docker

```bash
docker run --name my-postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_USER=devyanshu \
  -d -p 5432:5432 postgres
```

PostgreSQL connection string format:

```text
<username>:<password>@<host>:<port>
```

Example:

```text
postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable
```

### Enter a Running Container

```bash
docker ps
docker exec -it <container_id_or_name> /bin/bash
```

### More Useful Docker Commands

```bash
docker images                     # list images
docker rmi <image_name_or_id>     # remove image
docker exec <id> <command>        # run one command in container
docker exec -it <id> /bin/bash    # interactive shell
docker volume ls                  # list volumes
docker network ls                 # list networks
```

Restart stopped containers:

```bash
docker ps -a
docker start <container_id>
```

## 3) PostgreSQL (`psql`) Quick Commands

```bash
psql -U postgres
```

Inside `psql`:

```sql
\?      -- help
\dt     -- list tables
```

## 4) Port Debugging on Linux

Find process running on a port:

```bash
lsof -i :<port>
```

Kill process:

```bash
kill <pid>
```

## 5) Prisma + Connection Pooling

After setting DB URL and models, run migration:

```bash
npx prisma migrate dev --name init
```

Connection pooling idea:

```text
Worker -> Connection Pool -> Database
```

You can use Prisma Accelerate for pooled connections in relevant deployments.

## 6) Monorepo Notes

Common Node.js monorepo tools:

- Lerna
- Nx
- Turborepo
- Yarn Workspaces / npm Workspaces

### Turborepo (What It Is)

- A high-performance **build system** and task orchestrator.
- Optimizes build pipelines, caching, and parallel task execution.
- Useful when multiple apps/packages depend on shared code.

Typical structure:

```text
apps/
  web/
  docs/
packages/
  ui/
  ts-config/
  eslint-config/
```

Create a new Turbo repo:

```bash
npx create-turbo@latest
```

## 7) Quick Practical Checklist

- Start DB quickly with Docker.
- Verify exposed ports with `docker ps` and `lsof`.
- Use `docker exec -it` for debugging inside containers.
- Run Prisma migrations after model updates.
- Prefer monorepo task caching/orchestration for multi-app projects.
