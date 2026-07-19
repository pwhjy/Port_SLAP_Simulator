FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY pyproject.toml constraints.txt README.md LICENSE CITATION.cff ./
COPY src ./src
RUN python -m pip install --no-cache-dir -c constraints.txt '.[viewer]'

COPY configs ./configs
COPY examples ./examples
COPY scripts ./scripts
COPY viewer ./viewer

CMD ["port-slap-viewer-server", "--host", "0.0.0.0", "--data-dir", "viewer/data/sample"]
