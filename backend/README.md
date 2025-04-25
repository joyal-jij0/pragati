# Pragati Backend

This is the backend service for the Pragati project, built with FastAPI, Pydantic, and Uvicorn.

## Requirements
- Python 3.8+
- pip (Python package manager)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <repo-url>
cd backend
```

### 2. Create a Virtual Environment (Recommended)
#### macOS/Linux
```sh
python3 -m venv .venv
source .venv/bin/activate
```
#### Windows
```bat
python -m venv .venv
.venv\Scripts\activate
```

### 3. Install Dependencies
```sh
pip install -r requirements.txt
```

### 4. Download the ML Models
```sh
python setup_models.py
```

### 5. Run the Development Server
#### macOS/Linux
```sh
uvicorn app.main:app --reload
```
#### Windows
```bat
uvicorn app.main:app --reload
```

The server will start at [http://127.0.0.1:8000](http://127.0.0.1:8000).

### 5. Healthcheck Endpoint
Visit [http://127.0.0.1:8000/api/v1/healthcheck](http://127.0.0.1:8000/api/v1/healthcheck) to verify the backend is running.

## Project Structure
```
app/
    main.py               # FastAPI app entrypoint
    api/v1/endpoints/     # API route definitions
    schemas/              # Pydantic models
    services/             # Business logic
    core/                 # Core settings and security
    db/                   # Database setup
    utils/                # Utility functions
requirements.txt          # Python dependencies
```

## Notes
- Update the database configuration in `app/core/config.py` as needed.
- Add new endpoints in `app/api/v1/endpoints/` and corresponding business logic in `app/services/`.

---

For any issues, please contact the maintainer.
