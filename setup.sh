#!bin/bash

# https://github.com/RehanSaeed/Bash-Cheat-Sheet
# https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/

set -e

echo "Installing backend requirements"
cd webmart_api/
pip install -r requirements.txt
cd ..
echo "Installing pre-commit hooks from pre-commit-config.yaml"
pre-commit install
cd frontend
echo "Installing frontend packages"
npm i
