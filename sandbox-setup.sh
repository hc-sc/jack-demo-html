#!/bin/bash
# this script is used to setup the sandbox for the UI testing. This script will go back to the original dir after the setup is done
# needs to be executed every time Jenkins runs a new build via > . sandbox-setup.sh
# please note using ./ sandbox-setup.sh will not setup the sandbox since it will not run on the same terminal instance

current_dir=$PWD
echo "Setup script started will resume to ${current_dir} after completion"
cd node_modules/puppeteer/.local-chromium/linux-*/chrome-linux/
sudo chown root:root chrome_sandbox
sudo chmod 4755 chrome_sandbox
sudo cp -p chrome_sandbox /usr/local/sbin/chrome-devel-sandbox
export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox
cd $current_dir
echo "Setup is completed"
