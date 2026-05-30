# Docker Setup for Laravel

## Prerequisites

- Docker and Docker Compose installed
- PostgreSQL running on the host machine

## Setup

### 1. Configure PostgreSQL

Allow Docker containers to connect to PostgreSQL:

```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/12/main/postgresql.conf

# Add this line at the end:
listen_addresses = '*'

# Edit pg_hba.conf
sudo nano /etc/postgresql/12/main/pg_hba.conf

# Add this line:
host    all             all             172.16.0.0/12           md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### 2. Configure Environment

Copy the Docker environment file:

```bash
cp .env.docker .env
```

Edit `.env` and set your database credentials:

```env
DB_DATABASE=my_blog
DB_USERNAME=your_postgres_user
DB_PASSWORD=your_postgres_password
OPENAI_API_KEY=your_openai_key
```

### 3. Generate Application Key

```bash
docker-compose run --rm app php artisan key:generate
```

### 4. Build and Start Containers

```bash
docker-compose up -d --build
```

### 5. Run Migrations

```bash
docker-compose exec app php artisan migrate --force
```

### 6. Create Storage Link

```bash
docker-compose exec app php artisan storage:link
```

### 7. Cache Configuration (Production)

```bash
docker-compose exec app php artisan config:cache
docker-compose exec app php artisan route:cache
docker-compose exec app php artisan view:cache
```

## Access the Application

The Laravel API will be available at: `http://localhost:8080`

## Useful Commands

### View Logs

```bash
docker-compose logs -f
```

### Stop Containers

```bash
docker-compose down
```

### Restart Containers

```bash
docker-compose restart
```

### Run Artisan Commands

```bash
docker-compose exec app php artisan <command>
```

### Access Container Shell

```bash
docker-compose exec app bash
```

## Memory Usage

- PHP-FPM container: ~50-80MB
- Nginx container: ~10-20MB
- Total: ~80-130MB

## Troubleshooting

### Database Connection Issues

If the app can't connect to PostgreSQL:

1. Check PostgreSQL is running: `systemctl status postgresql`
2. Verify `listen_addresses = '*'` in postgresql.conf
3. Check firewall allows connections from Docker network (172.16.0.0/12)
4. Test connection: `docker-compose exec app php artisan db:show`

### Permission Issues

If you get permission errors on storage:

```bash
docker-compose exec app chown -R www-data:www-data /var/www/storage
docker-compose exec app chmod -R 775 /var/www/storage
```

### Rebuild Containers

If you need to rebuild:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```
