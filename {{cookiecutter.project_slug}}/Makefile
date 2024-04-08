package=ipython

.PHONY: help migrate shell pip build up prod-up

help:
	@echo "Makefile arguments:"
	@echo ""
	@echo "package - Python package"
	@echo ""
	@echo "Makefile commands:"
	@echo "migrate"
	@echo "shell"
	@echo "pip package=<package_name>"
	@echo "build"
	@echo "up"
	@echo "prod-up"
	@echo "watch"

migrate:
	@docker compose exec web python manage.py migrate --no-input

shell:
	@docker compose exec web python manage.py shell

collectstatic:
	@docker compose up -d --build
	@docker compose exec web python manage.py collectstatic --no-input
	@docker compose down -v

pip:
	@docker compose exec web pip install ${package}

build:
	@docker compose -f docker-compose.prod.yml build

up:
	@docker compose up --build

prod-up:
	@docker system prune -a
	@docker compose -f docker-compose.prod.yml up --build

watch-js:
	@npm run watch
