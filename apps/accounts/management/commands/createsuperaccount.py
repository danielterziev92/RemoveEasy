import getpass
import sys

from django.contrib.auth import get_user_model
from django.core.management import BaseCommand

AccountModel = get_user_model()


class Command(BaseCommand):
    help = 'Creates a superuser account with the specified email and password'

    def add_arguments(self, parser):
        parser.add_argument(
            '--email',
            dest='email',
            help='Specify the email for the superuser account',
        )
        parser.add_argument(
            '--password',
            dest='password',
            help='Specify the password for the superuser account',
        )
        parser.add_argument(
            '--noinput',
            action='store_true',
            dest='noinput',
            help='Create user without asking for user input',
        )

    def handle(self, *args, **options):
        email = options.get('email')
        password = options.get('password')
        noinput = options.get('noinput')

        if not noinput:
            if not email:
                email = input('Email: ')

            if not password:
                password = getpass.getpass()
                password_confirmation = getpass.getpass('Password (again): ')
                if password != password_confirmation:
                    self.stderr.write('Error: Your passwords didn\'t match.')
                    sys.exit(1)

        if not email:
            self.stderr.write('Error: Email is required')
            sys.exit(1)

        if not password:
            self.stderr.write('Error: Password is required')
            sys.exit(1)

        try:
            if AccountModel.objects.filter(email=email).exists():
                self.stderr.write(f'Error: Account with email {email} already exists.')
                sys.exit(1)

            AccountModel.objects.create_super_account(email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f'Superuser account created successfully with email: {email}'))
        except ValidationError as e:
            self.stderr.write(f'Error: {str(e)}')
            sys.exit(1)
        except Exception as e:
            self.stderr.write(f'Error creating superuser: {str(e)}')
            sys.exit(1)
