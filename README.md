docker compose -f docker-compose.yml -f docker-compose.dev.yml down --remove-orphans
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
docker compose -f docker-compose.yml -f docker-compose.build.yml up --build -d


MIGRATION:
docker compose -f docker-compose.dev.yml run --rm server npx prisma migrate dev --name <migration_name>