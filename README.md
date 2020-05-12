# Imago deploy

```bash
git clone https://gitlab.com/imago-project/imago_deploy
cd imago_deploy
git submodule update --init --recursive
docker-compose run synapse generate
docker-compose run imago mix do ecto.setup, event_store.create, event_store.init
docker-compose up

# Use docker-hoster to make container domains accessible:
docker run \
    -v /var/run/docker.sock:/tmp/docker.sock \
    -v /etc/hosts:/tmp/hosts \
    --name docker-hoster \
    dvdarias/docker-hoster

```

Should give these routes:
- Front-End: http://app.imago.local:9000
- Back-End: http://api.imago.local:4000
- Matrix Server: http://matrix.imago.local:8008
- Blazegraph WDQS: http://wdqs.imago.local:9999

