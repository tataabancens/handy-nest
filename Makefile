.PHONY: up down logs restart

# Nombre del script
INIT_SCRIPT = ./prisma/scripts/init_db.sh
SQL_SCRIPT = ./prisma/init.sql
ENV_FILE = $(CURDIR)/.env  # Ruta al archivo .env en el directorio superior
COMPOSE_FILE=./prisma/docker-compose.yml

up:
	echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/home_services_db"' > $(ENV_FILE)
	chmod +x $(INIT_SCRIPT)
	chmod +x $(SQL_SCRIPT)
	docker-compose -f $(COMPOSE_FILE) up --build

down:
	docker-compose -f $(COMPOSE_FILE) down

down_wipe_db:
	docker-compose -f $(COMPOSE_FILE) down -v
	rm -rf prisma/migrations  # Borra las migraciones de Prisma
	rm ./prisma/prisma_migrated.lock	# Borra el archivo de bloqueo de migraciones
	rm -rf node_modules/.prisma node_modules/@prisma/client  # Borra el cliente de Prisma

logs:
	docker-compose -f $(COMPOSE_FILE) logs -f

restart: down up
