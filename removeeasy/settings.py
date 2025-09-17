import os
import stat
from datetime import timedelta
from pathlib import Path

from environ import Env

from apps import accounts

# Path Settings
BASE_DIR = Path(__file__).resolve().parent.parent
env = Env()
env.read_env(os.path.join(BASE_DIR, ".env"))

# Core Django Settings
SECRET_KEY = env.str("SECRET_KEY")
DEBUG = env.bool("DEBUG")
ROOT_URLCONF = "removeeasy.urls"
WSGI_APPLICATION = "removeeasy.wsgi.application"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Security Settings
CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_HTTPONLY = True

# Host Settings
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")
CSRF_TRUSTED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS")

# CORS Settings
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS")
CORS_ALLOW_METHODS = env.list("CORS_ALLOW_METHODS")
CORS_ALLOW_ALL_ORIGINS = env.bool("CORS_ALLOW_ALL_ORIGINS")
CORS_ALLOW_CREDENTIALS = env.bool("CORS_ALLOW_CREDENTIALS")
CORS_EXPOSE_HEADERS = env.list("CORS_EXPOSE_HEADERS")
CORS_ALLOW_HEADERS = env.list("CORS_ALLOW_HEADERS")

# Application Definition
DJANGO_APPS = (
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
)

PROJECT_APPS = (
    "apps.accounts.apps.AccountsConfig",
    "apps.settings.apps.SettingsConfig",
    "apps.services.apps.ServicesConfig",
    "apps.inventory.apps.InventoryConfig",
    "apps.orders.apps.OrdersConfig",
)

THIRD_PARTY_APPS = (
    "corsheaders",
    "ninja",
    "ninja_extra",
    "modeltranslation",
    "markdownx",
)

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + PROJECT_APPS

# Middleware Configuration
MIDDLEWARE = (
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
)

# Template Configuration
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Database
DATABASES = {
    "default": {
        "ENGINE": env.str("DB_ENGINE", default="django.db.backends.sqlite3"),
        "NAME": env.str("DB_NAME", default=BASE_DIR / "db.sqlite3"),
        "USER": env.str("DB_USER", default=""),
        "PASSWORD": env.str("DB_PASSWORD", default=""),
        "HOST": env.str("DB_HOST", default=""),
        "PORT": env.str("DB_PORT", default=""),
        "OPTIONS": {
            "charset": "utf8mb4",
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
        } if env.str("DB_ENGINE", default="").endswith("mysql") else {},
    }
}

# Authentication Settings
AUTH_USER_MODEL = "accounts.Account"
AUTH_PASSWORD_VALIDATORS = (
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator", },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator", },
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator", },
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator", },
)

# Internationalization Settings
LANGUAGE_CODE = "bg"
LANGUAGES = [
    ('bg', 'Bulgarian'),
    ('en', 'English'),
]
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static Files Settings
STATIC_URL = "/static/"
STATIC_ROOT = env.str("STATIC_PATH", default="/staticfiles")
STATICFILES_DIRS = []
STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
)

# Media files
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "mediafiles"
if not MEDIA_ROOT.exists():
    MEDIA_ROOT.mkdir(parents=True, exist_ok=True)

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# MarkdownX Settings
MARKDOWNX_EDITOR_RESIZABLE = True
MARKDOWNX_MARKDOWN_EXTENSIONS = [
    "markdown.extensions.extra",
    "markdown.extensions.codehilite",
]

# Logging Configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': env.str("LOGS_PATH", default=BASE_DIR / "logs") + '/django.log',
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
