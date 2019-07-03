#!/bin/bash

current_dir=$PWD
echo "Setup script started will resume to ${current_dir} after completion"

cd node_modules/puppeteer/.local-chromium/linux-*/chrome-linux
sudo chown root:root chrome_sandbox
sudo chmod 4755 chrome_sandbox
sudo cp -p chrome_sandbox /usr/local/sbin/chrome-devel-sandbox
export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox

echo "Setup is completed"
cd $current_dir
