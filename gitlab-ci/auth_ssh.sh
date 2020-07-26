#!/bin/sh -x
eval `ssh-agent -s` > /dev/null
# echo "$SSH_PRIVATE_KEY" > /tmp/privkey
# chmod 600 /tmp/privkey
# ssh-add /tmp/privkey; rm /tmp/privkey
chmod 600 $SSH_PRIVATE_KEY
ssh-add $SSH_PRIVATE_KEY
mkdir -p /root/.ssh
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > /root/.ssh/config
