#!/usr/bin/env sh

# Run user scripts, if they exist
for f in /var/www/html/.fly/scripts/*.sh; do
    # Bail out this loop if any script exits with non-zero status code
    bash "$f" -e
done

# Ensure storage directories and database file exist
FOLDER=/var/www/html/storage/database
if [ ! -d "$FOLDER" ]; then
    echo "$FOLDER is not a directory, initializing database" 
    mkdir -p /var/www/html/storage/database
    touch /var/www/html/storage/database/database.sqlite
fi

# Set correct permissions
chown -R www-data:www-data /var/www/html/storage

# Clear cache to apply changes
php artisan cache:clear

# Run migrations to ensure database schema is up to date
php artisan migrate --force

if [ $# -gt 0 ]; then
    # If we passed a command, run it as root
    exec "$@"
else
    exec supervisord -c /etc/supervisor/supervisord.conf
fi
