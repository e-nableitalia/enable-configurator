#!/bin/bash

echo "building project"
npm run build
echo "making project backup backup"
tar -czf /home/centos/configurator_ui_backup_$(date +'%Y%m%d').tgz /var/www/html/configurator
echo "deploying new solution"
rm -rf /var/www/html/configurator
mkdir /var/www/html/configurator/
cp -r /home/centos/enable-configurator/frontend/build/* /var/www/html/configurator/
