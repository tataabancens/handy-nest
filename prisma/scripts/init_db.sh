#!/bin/sh

STATE_FILE="/app/prisma/prisma_migrated.lock"

# Verificar si las migraciones ya se ejecutaron
if [ -f "$STATE_FILE" ]; then
  echo "Las migraciones ya fueron ejecutadas anteriormente. Saliendo..."
  exit 0
fi

echo "Esperando a que PostgreSQL esté listo..."

apt-get update && apt-get install -y gdal-bin postgresql-client

# Usar `home_services_db` en lugar de `postgres`
until PGPASSWORD=postgres psql -h home_services_db -U postgres -d home_services_db -c "SELECT 1;" >/dev/null 2>&1; do
  echo "PostgreSQL no está listo. Reintentando en 2s..."
  sleep 2
done

echo "PostgreSQL está listo. Generando Prisma Client..."

# Generar Prisma Client
npx prisma generate --schema=prisma/schema.prisma

echo "Prisma client listo. Ejecutando migraciones..."

# Ejecutar migraciones de Prisma
npx prisma migrate dev --name init --schema=prisma/schema.prisma

echo "Migraciones completadas."

echo "Agregando datos geograficos."

# Agregando datos geográficos a la base de datos
ogr2ogr -f "PostgreSQL" PG:"host=home_services_db dbname=home_services_db user=postgres password=postgres" \
    -nln areas -lco OVERWRITE=YES /app/prisma/geo_buenos_aires.geojson \
    -geomfield geom -skipfailures \
    -sql "SELECT id, nombre, comuna, perimetro_ AS perimetro, area_metro AS area, 'BARRIO' AS type FROM barrios"

echo "Datos geográficos agregados."

# Ejecutar el archivo init.sql en la base de datos
PGPASSWORD=postgres psql -h home_services_db -U postgres -d home_services_db -f /app/prisma/init.sql

# Crear el archivo de estado para que no se ejecute nuevamente
touch "$STATE_FILE"

echo "Registros iniciales insertados."
