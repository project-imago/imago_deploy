# Imago deploy

```bash
git clone https://gitlab.com/imago-project/imago_deploy
cd imago_deploy
git submodule update --init --recursive
docker-compose up

# Use DNS Proxy Server to make container domains accessible:
docker run --hostname dns.mageddo -e "MG_DOMAIN=imago.local" \
    -e "MG_REGISTER_CONTAINER_NAMES=1" -e "MG_DPS_NETWORK_AUTO_CONNECT=1"\
    --restart=unless-stopped -p 5380:5380 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /etc/resolv.conf:/etc/resolv.conf \
    defreitas/dns-proxy-server:latest
```

Should give these routes:
- Front-End: http://app.imago.local:9000
- Back-End: http://api.imago.local:4000
- Matrix Server: https://matrix.imago.local:8448
- Neo4J Dashboard: http://neo4j.imago.local:7474

