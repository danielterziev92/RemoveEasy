# RemoveEasy - Moving Services Platform

> **Educational Django project** showcasing modern API development and multilingual content management

A comprehensive moving services platform built with Django and Django Ninja, demonstrating professional backend development practices for a real-world application.

## 🚀 Features

- **Custom User System** with email-based authentication
- **Multilingual Support** (Bulgarian/English) with django-modeltranslation
- **Modern API** with Django Ninja and Pydantic validation
- **Order Management** with email notifications
- **Admin Interface** with MarkdownX editor
- **Inventory System** with hierarchical categories

## 🛠️ Tech Stack

- **Django 5.2.5** - Backend framework
- **Django Ninja** - Modern API development
- **SQLite** - Database (easily configurable for PostgreSQL)
- **Pydantic** - Data validation
- **MarkdownX** - Rich text editor

## 📋 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/yourusername/removeeasy.git
   cd removeeasy
   uv sync  # or pip install -e .
   ```

2. **Setup Database**
   ```bash
   python manage.py migrate
   python manage.py createsuperaccount
   ```

3. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

4. **Access**
   - Admin: `http://localhost:8000/admin/`
   - API Docs: `http://localhost:8000/api/docs/`

## 📁 Project Structure

```
apps/
├── accounts/     # Custom user model & authentication
├── inventory/    # Items & categories management
├── orders/       # Order processing & emails
├── services/     # Moving services with pricing
└── settings/     # Email configuration
```

## 🎯 Learning Highlights

This project demonstrates:
- ✅ Custom Django User Model
- ✅ API development with Django Ninja
- ✅ Multilingual content with ModelTranslation
- ✅ Custom Managers & QuerySets
- ✅ Email templates & SMTP configuration
- ✅ Professional Django app structure

## 🔧 Configuration

Create `.env` file:
```bash
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 📝 API Endpoints

- `GET /api/services/` - List moving services
- `GET /api/inventory/items` - Get inventory with categories
- `POST /api/orders/create` - Create new order with email notification

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Educational Purpose**: This project demonstrates Django best practices for building scalable web applications with modern API architecture.