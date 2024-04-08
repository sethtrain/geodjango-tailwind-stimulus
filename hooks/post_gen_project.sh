#! /usr/bin/env bash

eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"

pyenv virtualenv {{ cookiecutter.python_version }} {{ cookiecutter.project_slug }}
pyenv activate {{ cookiecutter.project_slug }}

pip install -r requirements.txt
npm install

git init .
git add .
git commit -m "initial commit; cookiecutter generated project"
