#!/usr/bin/env bash

# Fail on first error.
set -e

cd "$(dirname "${BASH_SOURCE[0]}")"

sed -i "s/^#*Port .*/Port 6080/g" /etc/ssh/sshd_config
sed -i "s/^#*X11Forwarding .*/X11Forwarding yes/g" /etc/ssh/sshd_config
sed -i "s/^#*X11UseLocalhost .*/X11UseLocalhost no/g" /etc/ssh/sshd_config