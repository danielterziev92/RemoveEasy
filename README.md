# RemoveEasy - Docker Setup Guide

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- At least 2GB free disk space
- Ports 8000, 3306, and 8080 available

### 1. Clone and Setup Environment
```bash
# Clone the repository
git clone https://github.com/danielterziev92/RemoveEasy
cd removeeasy

# Create necessary directories
mkdir -p docker/mysql/conf.d scripts

# The .env file is already included with sensible defaults
# Modify it if needed for your specific setup
```

### 2. Start the Application
```bash
# Build and start all services
make setup

# Or manually:
docker-compose build
docker-compose up -d
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py createsuperaccount
```

### 3. Access the Application
- **Web Application**: http://localhost:8000
- **Django Admin**: http://localhost:8000/admin/
- **API Documentation**: http://localhost:8000/api/docs/
- **phpMyAdmin**: http://localhost:8080

### Default Credentials
- **Admin Email**: admin@removeeasy.com
- **Admin Password**: admin123

## 🐳 Available Make Commands

### Development
- `make setup` - Initial setup (build, start, migrate, create superuser)
- `make dev` - Start services with logs visible
- `make up` - Start all services in background
- `make down` - Stop all services
- `make restart` - Restart all services

### Database Operations
- `make migrate` - Run Django migrations
- `make makemigrations` - Create new migrations
- `make superuser` - Create Django superuser
- `make db-shell` - Access MySQL shell

### Monitoring
- `make logs` - View logs from all services
- `make web-logs` - View web service logs only
- `make status` - Show service status
- `make health` - Check service health

### Utilities
- `make shell` - Access Django shell
- `make bash` - Access container bash
- `make collectstatic` - Collect static files
- `make test` - Run Django tests

### Cleanup
- `make clean` - Remove unused Docker resources
- `make reset` - Complete reset (rebuild everything)

## 📁 Project Structure
```
removeeasy/
├── docker/
│   └── mysql/
│       └── conf.d/
│           └── mysql.cnf       # MySQL configuration
├── scripts/                    # Shell scripts for container setup
│   ├── entrypoint.sh          # Main container entrypoint
│   ├── initialize.sh          # Django initialization
│   ├── setup_static.sh        # Static files setup
│   └── collect_static.sh      # Static files collection
├── apps/                      # Django applications
├── templates/                 # Django templates
├── docker-compose.yml         # Docker services definition
├── Dockerfile                 # Django container build
├── .env                       # Environment variables
└── Makefile                   # Development commands
```

## 🔧 Configuration

### Environment Variables (.env)
Key variables you might want to modify:

```bash
# Security
SECRET_KEY=your-super-secret-key-change-this-in-production
DEBUG=True

# Database
DB_NAME=removeeasy_db
DB_USER=removeeasy_user
DB_PASSWORD=removeeasy_password

# Superuser
SUPERUSER_EMAIL=admin@removeeasy.com
SUPERUSER_PASSWORD=admin123
```

### Docker Services

#### Web Service (Django)
- **Container**: removeeasy_web
- **Port**: 8000
- **Volume Mounts**: staticfiles, mediafiles, logs

#### Database Service (MySQL 8.0)
- **Container**: removeeasy_mysql
- **Port**: 3306
- **Volume**: Persistent database storage

#### phpMyAdmin (Optional)
- **Container**: removeeasy_phpmyadmin
- **Port**: 8080
- **Access**: Web-based MySQL administration

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check if MySQL is running
make status

# View database logs
make db-logs

# Wait for database to be ready
docker-compose logs web | grep "MySQL is ready"
```

#### Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

#### Port Conflicts
If ports are already in use, modify docker-compose.yml:
```yaml
services:
  web:
    ports:
      - "8001:8000"  # Changed from 8000:8000
  db:
    ports:
      - "3307:3306"  # Changed from 3306:3306
```

#### Static Files Issues
```bash
# Manually collect static files
make collectstatic

# Check static files directory
docker-compose exec web ls -la /app/staticfiles/
```

### Logs and Debugging
```bash
# View all logs
make logs

# View specific service logs
make web-logs
make db-logs

# Check service status
make status
make health
```

## 🔐 Security Notes

### Production Deployment
- Change default passwords in `.env`
- Set `DEBUG=False` in production
- Use strong `SECRET_KEY`
- Consider using Docker secrets for sensitive data
- Enable HTTPS/TLS encryption
- Configure proper firewall rules

### Database Security
- Change default MySQL root password
- Use strong database passwords
- Limit database access to application only
- Regular database backups

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL 8.0 Documentation](https://dev.mysql.com/doc/refman/8.0/en/)
- [Django Ninja API Documentation](https://django-ninja.rest-framework.com/)

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review container logs with `make logs`
3. Verify environment configuration in `.env`
4. Check Docker and Docker Compose versions