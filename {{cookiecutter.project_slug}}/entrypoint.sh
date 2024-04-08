#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

if [ "$OTEL_HOST" != "" ]
then
    echo "Waiting for otel..."

    while ! nc -z $OTEL_HOST $OTEL_PORT; do
      sleep 0.1
    done

    echo "OTEL started"
fi

python manage.py migrate

exec "$@"
