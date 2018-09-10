#!/usr/bin/env bash

veripress theme install richardchien/veripress-theme-light --name light

theme=`python -c "import config; print(config.THEME)"`
rm -rf ./themes/$theme/templates/custom
cp -R ./custom/$theme ./themes/$theme/templates/custom

veripress generate --app-root=/blog
mkdir -p ../www/blog
cp -r _deploy/* ../www/blog