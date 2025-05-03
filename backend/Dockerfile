FROM python:3.11-slim

WORKDIR /backend

# Install system dependencies for OpenCV and other tools
RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY backend/ .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run setup script first, then start the FastAPI app
CMD ["bash", "-c", "python setup_models.py && uvicorn app.main:app --host 0.0.0.0 --port 8000"]