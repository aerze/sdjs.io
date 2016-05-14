# Install Git for source code management
sudo apt-get install -y git || sudo apt-get install -y git-core

# Install Curl for http requests
sudo apt-get install -y curl

# Install user that runs the web app
sudo useradd -mrU web
# sudo passwd web
echo "Make sure to set up a password for user web"
sudo mkdir /var/www
sudo chown web /var/www
sudo chgrp web /var/www

echo "Make sure to su web and do a git checkout/pull of the sdjs.io repo"

# Install NGINX for reverse proxy
sudo apt-get install -y nginx
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/sdjs.io
echo "Make sure to set up the contents of /etc/nginx/sites-available/sdjs.io"
echo "Once the file is set up manually enable the site using sudo ln -s /etc/nginx/sites-available/changeme.com /etc/nginx/sites-enabled/"

# Install PM2 and start the app
npm install pm2 -g
pm2 startup ubuntu
sudo su -c "env PATH=$PATH:/home/sdjs/.nvm/versions/node/v4.4.1/bin pm2 startup ubuntu -u sdjs --hp /home/sdjs"
