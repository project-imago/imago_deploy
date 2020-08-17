FROM gitpod/workspace-full

RUN . /etc/os-release \
    && echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/ /" | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list \
    && curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/Release.key | sudo apt-key add - \
    && sudo apt-get update -qq \
    && sudo apt-get -qq -y install podman \
    && sudo rm -rf /var/lib/apt/lists/*

RUN sudo curl -o /usr/local/bin/podman-compose https://raw.githubusercontent.com/containers/podman-compose/devel/podman_compose.py \
    && sudo chmod +x /usr/local/bin/podman-compose

RUN sudo sed -i '/^mountopt =.*/d' /etc/containers/storage.conf

COPY .gitpod.containers.conf /etc/containers/containers.conf