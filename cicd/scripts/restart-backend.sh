#!/bin/bash
set -euo pipefail

sudo systemctl daemon-reload
sudo systemctl restart buildright-backend.service
sudo systemctl status buildright-backend.service --no-pager
