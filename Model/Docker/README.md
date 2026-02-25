To install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

To start dev server

```bash
uvicorn app:app --reload
```

To build the docker image:

```bash
sudo docker build -t pklot-model .
```

To deploy the dockerized server:

```bash
sudo docker compose up
```
