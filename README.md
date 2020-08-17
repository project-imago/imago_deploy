# Imago deploy

```bash
git clone https://gitlab.com/imago-project/imago_deploy
cd imago_deploy
git submodule update --init --recursive
docker-compose run synapse generate
docker-compose run imago ecto.setup
docker-compose up

# Use docker-hoster to make container domains accessible:
docker start \
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

## Use git-over-SSH when working with submodules

Submodules use HTTPS so they can be easily pulled from automated systems.
To use SSH when contributing, follow [these instructions](https://stackoverflow.com/questions/11200237/how-do-i-get-git-to-default-to-ssh-and-not-https-for-new-repositories/36500841#36500841).
