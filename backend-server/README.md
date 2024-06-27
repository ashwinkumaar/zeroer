## Prerequisites

- Python 3.11
- [Poetry] for dependency management and virtual environment (https://python-poetry.org/docs/#installation)
- [Docker] for containerization (https://docs.docker.com/get-docker/)

## Local Usage

1.Start Poetry Shell

```bash
poetry shell
```

2.Install Dependencies in Poetry

```bash
poetry install
```
3.Run Flask application with Gunicorn

```bash
gunicorn --config gunicorn_config.py app:app
```