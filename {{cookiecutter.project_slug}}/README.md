# {{cookiecutter.project_slug}}

{{ cookiecutter.project_short_description }}

## Local development

    # pyenv install 3.11
    # pyenv virtualenv 3.11 {{cookiecutter.project_slug}}
    # pyenv activate {{cookiecutter.project_slug}}
    # pip install -r requirements.txt
    # tmuxinator

## Make commands

Run Django migrations on the `web` container

    # make migrate

Start a Django shell on the `web` container

    # make shell

Collect Django static files on the `web` container

    # make collectstatic

Install a pip packages on `web` container

    # make pip package=ipython

Build production containers

    # make build

Run local containers

    # make up

Run production containers

    # make prod-up
