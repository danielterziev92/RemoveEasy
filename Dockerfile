LABEL authors="Daniel Terziev"

FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV APP_HOME=/app

# Set work directory
WORKDIR $APP_HOME

# Install system dependencies including MySQL client libraries
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        default-libmysqlclient-dev \
        build-essential \
        pkg-config \
        netcat-openbsd \
        curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install uv package manager
RUN pip install --no-cache-dir uv

# Copy project files
COPY pyproject.toml ./
COPY uv.lock ./

# Install Python dependencies
RUN uv sync --frozen

# Create application user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Create necessary directories
RUN mkdir -p $APP_HOME/logs $APP_HOME/staticfiles $APP_HOME/mediafiles \
    && chown -R appuser:appuser $APP_HOME

# Copy application code
COPY --chown=appuser:appuser . .

# Copy and set up scripts
COPY --chown=appuser:appuser scripts/ $APP_HOME/scripts/
RUN chmod +x $APP_HOME/scripts/*.sh

# Set environment variables for scripts
ENV SCRIPTS_PATH=$APP_HOME/scripts
ENV LOGS_PATH=$APP_HOME/logs
ENV STATIC_PATH=$APP_HOME/staticfiles

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8000

# Set entrypoint
ENTRYPOINT ["./scripts/entrypoint.sh"]