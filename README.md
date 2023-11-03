# newswaters-web

## Local development
### `whistler` API server
See https://github.com/metalwhale/newswaters#local-development

### Web (this repository)
Create a `.env` file by copying from [`./local.env`](./local.env) and then fill in the variables with appropriate values:
```bash
cp local.env .env
```
Start and get inside the container:
```bash
docker-compose up -d
docker-compose exec web bash
```
Run:
```bash
bun install -y
bun run dev --host
```
