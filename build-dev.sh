#!/bin/bash
current_dir=$PWD
echo "Building project"
npm run build-dev
echo "move theme from src to dist"
cp -a $current_dir/src/theme /$current_dir/dist