"""
WSGI config for webmart_api project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import sys
from django.core.wsgi import get_wsgi_application

proj_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
sys.path.insert(0, os.path.join(proj_root, "src"))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "_webmart_api.settings")

application = get_wsgi_application()
