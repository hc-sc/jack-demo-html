#!/bin/bash

echo "installing npm and all its dependencies"
npm install
echo "calling other scripts"
. setup-sandbox.sh
