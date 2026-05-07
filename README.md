docker compose -f docker-compose.yml -f docker-compose.dev.yml down --remove-orphans
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
docker compose -f docker-compose.yml -f docker-compose.build.yml up --build -d


MIGRATION:
npm run dev:migrate -- <migration_name>
# Or manually:
docker compose -f docker-compose.yml -f docker-compose.dev.yml run --rm --user root server npx prisma migrate dev --name <migration_name>

SEED:
npm run dev:seed
# Or manually:
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec server npx prisma db seed

STUDIO:
Available at: http://localhost:5556