#!bin/bash

set -e
cd ../../..
echo "Project's root directory"
pwd
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete
echo "Deleted migration files"