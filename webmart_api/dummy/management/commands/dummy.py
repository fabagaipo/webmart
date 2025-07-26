# https://docs.djangoproject.com/en/5.2/howto/custom-management-commands/
# https://stackoverflow.com/questions/1685157/how-can-i-specify-working-directory-for-a-subprocess
# https://www.reddit.com/r/django/comments/3r1z4c/how_do_i_nuke_my_database_and_start_over/
# https://django-extensions.readthedocs.io/en/latest/reset_db.html

import subprocess
import os
import sys
import logging
import random

from django.core.management import BaseCommand
from django.contrib.auth.models import User
from django.db import transaction

from user_profile.models.user_profile import UserProfile, Address
from category.models.category import Category
from store.models.store import Store, StoreApplication, Inventory
# from order.models.order import Order
from product.models.product import Product

logging.basicConfig(level="DEBUG")
logger = logging.getLogger(__file__)

# Insert this files's directory to the sys.path for the remove_migration_files.sh
# execution
file_dir = os.path.dirname(__file__)
sys.path.insert(0, file_dir)


class Command(BaseCommand):
    help = "This setups dummy records for many of the project's tables"

    def handle(self, *args, **options):
        try:
            self.migration()
            with transaction.atomic():
                self.generate_fake_users()
                self.generate_fake_profiles()
                self.generate_fake_stores()
                self.generate_fake_categories()
                self.generate_fake_products()
        except Exception as e:
            logger.debug(str(e))

    def migration(self):
        subprocess.run(["sh", "remove_migration_files.sh"], cwd=file_dir)

        # Reset (drop then create) DB using reset_db of django_extensions
        subprocess.run(
            ["python", "manage.py", "reset_db", "-D", "webmart", "--noinput"]
        )

        # Initial django migrations (User, etc.)
        subprocess.run(["python", "manage.py", "migrate"])

        subprocess.run(["python", "manage.py", "makemigrations"])
        subprocess.run(["python", "manage.py", "migrate"])

    def generate_fake_users(self):
        users_objs = []
        for i in range(50):
            user = User(
                email=f"test{i + 1}@test.com",
                first_name=f"User{i + 1}",
                last_name=f"Userlastname{i + 1}",
                username=f"user_name{i + 1}",
                password=f"user_password{i + 1}",
            )
            users_objs.append(user)
        User.objects.bulk_create(users_objs)

        logger.info("Fake users were generated.")

    def generate_fake_profiles(self):
        address = Address.objects.create(
            region_code="01",
            province_code="0101",
            city_code="010101",
            barangay_code="10011",
            phone_number="0911111111",
            street="My street. My way",
        )
        users_objs = User.objects.all()
        profiles = []
        for i in range(50):
            user_profile = UserProfile(
                user=users_objs[i],
            )
            profiles.append(user_profile)

        UserProfile.objects.bulk_create(profiles)

        profiles = UserProfile.objects.all()

        for profile in profiles:
            profile.addresses.add(address)

        logger.info("Fake profiles were generated.")

    def generate_fake_stores(self):
        applicants = UserProfile.objects.all()[:20]
        identification = {"url": {}}
        status = StoreApplication.APPROVED

        for i in range(20):
            StoreApplication.objects.create(
                name=f"Store {i}",
                applicant=applicants[i],
                identification=identification,
                status=status,
            )

        logger.info("Fake store applications and stores were generated.")

    def generate_fake_categories(self):
        for i in range(10):
            Category.objects.create(
                title=f"Category {i + 1}",
                description=f"Description for category {i + 1}",
                image_data={"url": "https://picsum.photos/292/237/2000/3000"},
            )

        logger.info("Fake categories were generated")

    def generate_fake_products(self):
        stores = Store.objects.all()
        categories = Category.objects.all()
        for i in range(100):
            product = Product.objects.create(
                name=f"Product {i + 1}",
                description=f"Description for product {i + 1}",
                price=200,
                image_data={"url": "https://picsum.photos/26/237/2000/3000"},
            )
            product.category.add(categories[random.randint(0, 9)])

        products = Product.objects.all()

        for store in stores:
            for product in products:
                Inventory.objects.create(store=store, product=product, quantity=100)

        logger.info("Fake products were generated.")
