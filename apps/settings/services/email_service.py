import logging
from typing import Any

from django.core.mail.backends.smtp import EmailBackend

logger = logging.getLogger(__name__)


class EmailService:
    """
    Service for testing SMTP email server connections using Django"s EmailBackend.
    """

    @staticmethod
    def test_connection(
            host: str,
            port: int,
            use_tls: bool,
            username: str,
            password: str,
            timeout: int | None = 10
    ) -> dict[str, Any]:
        """
        Test SMTP server connection with the provided parameters.
        
        Args:
            host: SMTP server hostname
            port: SMTP server port
            use_tls: Whether to use TLS encryption
            username: SMTP username
            password: SMTP password
            timeout: Connection timeout in seconds (default: 10)
        
        Returns:
            Dict containing:
                - success: bool indicating if connection was successful
                - message: str describing the result
                - error: str containing error details if failed (optional)
        """
        try:
            backend = EmailBackend(
                host=host,
                port=port,
                username=username,
                password=password,
                use_tls=use_tls,
                timeout=timeout,
                fail_silently=False
            )

            connection = backend.open()

            if connection:
                backend.close()
                return {
                    "success": True,
                    "message": f"Successfully connected to SMTP server {host}:{port}"
                }
            else:
                return {
                    "success": False,
                    "message": f"Failed to connect to SMTP server {host}:{port}",
                    "error": "Connection returned False"
                }

        except Exception as e:
            return {
                "success": False,
                "message": f"Failed to connect to SMTP server {host}:{port}",
                "error": str(e)
            }

    @classmethod
    def test_email_settings(cls, email_settings) -> dict[str, Any]:
        """
        Test SMTP connection using the EmailSettings model instance.
        
        Args:
            email_settings: EmailSettings model instance
        
        Returns:
            Dict containing connection test results
        """
        return cls.test_connection(
            host=email_settings.server,
            port=email_settings.port,
            use_tls=email_settings.tls,
            username=email_settings.username,
            password=email_settings.password
        )
