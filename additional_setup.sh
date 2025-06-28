#!bin/bash
# https://github.com/RehanSaeed/Bash-Cheat-Sheet
# https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/

set -e
echo "Setting up virtual environment"
python3 -m venv .venv
echo "Activating virtual environment"
source .venv/bin/activate
echo "Installing pre-commit package manager"
pip install pre-commit
echo "Installing pre-commit hooks from pre-commit-config.yaml"
pre-commit install
echo "Deactivating virtual environment"
source deactivate
echo "Done"