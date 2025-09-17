#!/bin/sh
# Master initialization script that runs all setup scripts in sequence

# Set -e to exit on error
set -e

echo "🚀 Initializing application..."

# Wait for database to be ready
echo "⏳ Waiting for MySQL database to be ready..."
while ! nc -z "${DB_HOST:-db}" "${DB_PORT:-3306}"; do
  echo "Waiting for MySQL at ${DB_HOST:-db}:${DB_PORT:-3306}..."
  sleep 2
done
echo "✅ MySQL is ready!"

# Setup static files directory
echo "📦 Setting up static files directory..."
. "${SCRIPTS_PATH}/setup_static.sh" "${STATIC_PATH:-"$APP_HOME/staticfiles"}"

# Collect static files
echo "🔍 Collecting static files..."
. "${SCRIPTS_PATH}/collect_static.sh" "${STATIC_PATH:-"$APP_HOME/staticfiles"}"

# Setup logs directory
echo "📋 Setting up logs directory..."
. "${SCRIPTS_PATH}/setup_logs.sh" "${LOGS_PATH:-"$APP_HOME/logs"}"

# Run any additional initialization commands
echo "✅ Application initialization complete!"

# Execute initialize.sh directly
exec "${SCRIPTS_PATH}/initialize.sh"