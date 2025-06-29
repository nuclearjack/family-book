## Development

```bash
#git
git pull

#npm
npm i

# build
docker compose up

# init migration
docker compose exec app npm run migrate
```


## Production

```bash
#git
git pull

# build
docker compose up --build

# init migration
docker compose exec app npm run migrate
```