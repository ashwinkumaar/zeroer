#!/bin/bash 

FROM python:3.11-buster AS builder

WORKDIR /app

RUN pip install poetry==1.8.2

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

COPY pyproject.toml poetry.lock ./

COPY . .

RUN python -m venv /app/.venv

RUN apt-get update && apt-get install -y \
  default-libmysqlclient-dev \
  pkg-config \
  gcc

RUN poetry install --no-root --no-ansi && rm -rf $POETRY_CACHE_DIR

FROM python:3.11-slim AS runtime

WORKDIR /app

COPY --from=builder /app/.venv /app/.venv

# RUN apt-get update && apt-get install -y default-libmysqlclient-dev

COPY . .

ENV VIRTUAL_ENV=/app/.venv
ENV PATH="/app/.venv/bin:$PATH"

RUN poetry install --no-root --no-ansi && rm -rf $POETRY_CACHE_DIR

EXPOSE 5000

CMD ["gunicorn", "--config", "gunicorn_config.py", "app:app"]