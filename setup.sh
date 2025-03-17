#!/bin/bash
# You can enable the openresty repository on your Amazon Linux system like this:

sudo yum install epel-release
sudo yum update
sudo yum install nginx
sudo nginx -v


# add the repo:
wget https://openresty.org/package/amazon/openresty.repo
sudo mv openresty.repo /etc/yum.repos.d/

# update the index:
sudo yum check-update

sudo yum install -y openresty

sudo yum install -y openresty-resty

sudo yum --disablerepo="*" --enablerepo="openresty" list available


# Reload systemd and restart OpenResty
echo "Reloading systemd daemon..."
sudo systemctl daemon-reload

echo "Enabling OpenResty service..."
sudo systemctl enable openresty

echo "Starting OpenResty service..."
sudo systemctl start openresty

# Verify the service status
echo "Checking OpenResty service status..."
sudo systemctl status openresty

# ...existing verification code continues...

# Verify installation
echo "Verifying OpenResty installation..."
ps aux | grep nginx

echo "Testing default OpenResty page with curl..."
curl 127.0.0.1/

# Check resty package
echo "Testing 'resty' command..."
if ! which resty >/dev/null 2>&1; then
    echo "'resty' command not found. Installing openresty-resty..."
    sudo yum -y install openresty-resty
fi

# Configure Nginx
echo "Configuring Nginx..."

echo "Ensuring conf.d directory exists..."
sudo mkdir -p /usr/local/openresty/nginx/conf/conf.d

echo "Adding include directive to nginx.conf..."
if [ -f "/usr/local/openresty/nginx/conf/nginx.conf" ]; then
    sudo sed -i '/http {/a \    include /usr/local/openresty/nginx/conf/conf.d/*.conf;' /usr/local/openresty/nginx/conf/nginx.conf
else
    echo "Error: /usr/local/openresty/nginx/conf/nginx.conf not found. OpenResty installation might have failed."
fi


echo "Creating cheveningbrew-app-prod.conf..."
cat <<EOF | sudo tee /usr/local/openresty/nginx/conf/conf.d/cheveningbrew-app-prod.conf
server {
    listen 80;
    server_name cheveningbrew.lk; # Replace with your instance IP or domain name if needed

    root /usr/local/openresty/nginx/html;
    index index.html;
}
EOF

echo "Restarting OpenResty to apply initial configuration..."
sudo systemctl restart openresty

echo "Please check if the default OpenResty page is accessible via cheveningbrew.com (or your server's IP)."
echo "If you have DNS set up, you should see the OpenResty welcome page at http://cheveningbrew.com"
echo "If not, access it via http://<your_server_ip>"
read -p "Press Enter to continue after verifying default page..."


# stop nginx and openresty to enable SSL configuration
echo "Stopping OpenResty to prepare for SSL configuration..."
sudo systemctl stop openresty

echo "Stopping Nginx to prepare for SSL configuration..."
sudo systemctl stop nginx


echo "Restarting OpenResty to serve frontend application..."
sudo systemctl restart openresty

echo "Please check if your Paralegal UI is accessible via cheveningbrew.com (or your server's IP)."
echo "You should now see your application at http://cheveningbrew.com (or http://<your_server_ip>)"
read -p "Press Enter to continue to SSL setup..."


# Enable SSL with Certbot
echo "Setting up SSL with Certbot..."



echo "Restarting OpenResty for Certbot challenge configuration..."
sudo systemctl restart openresty

sudo dnf -y install certbot
sudo dnf -y install python3-certbot-nginx
sudo certbot certonly --nginx




echo "Running Certbot to obtain SSL certificates..."
sudo certbot certonly --webroot -w /usr/local/openresty/nginx/html -d cheveningbrew.com -d www.cheveningbrew.com

echo "Creating SSL options file..."
sudo mkdir -p /etc/letsencrypt
cat <<EOF | sudo tee /etc/letsencrypt/options-ssl-nginx.conf
# This file contains important security parameters. If you modify this file
# manually, Certbot will be unable to automatically provide future security
# updates. Instead, Certbot will print and log an error message with a path to
# the up-to-date file that you will need to refer to when manually updating
# this file. Contents are based on https://ssl-config.mozilla.org

ssl_session_cache shared:le_nginx_SSL:10m;
ssl_session_timeout 1440m;
ssl_session_tickets off;

ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;

ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
EOF

echo "Generating DH parameters..."
sudo openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048

echo "Updating cheveningbrew-app-dev.conf for HTTPS..."
cat <<EOF | sudo tee /usr/local/openresty/nginx/conf/conf.d/cheveningbrew-app-dev.conf
server {
    listen 80;
    server_name cheveningbrew.com www.cheveningbrew.com;
    return 301 https://www.cheveningbrew.com$request_uri;
}

server {
    listen 443 ssl;
    server_name cheveningbrew.com;
    ssl_certificate /etc/letsencrypt/live/cheveningbrew.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/cheveningbrew.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # Self-generated
    return 301 https://www.cheveningbrew.com$request_uri;
}

server {
    listen 443 ssl;
    server_name www.cheveningbrew.com;

    ssl_certificate /etc/letsencrypt/live/cheveningbrew.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/cheveningbrew.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # Self-generated

    root /usr/local/openresty/nginx/html;
    index index.html;

    # location / {
        #     try_files \$uri \$uri/ /index.html;
        # }
}
EOF

echo "Restarting OpenResty to enable HTTPS..."
sudo systemctl restart openresty

echo "Checking SSL certificate expiry date..."
sudo openssl x509 -in /etc/letsencrypt/live/cheveningbrew.com/fullchain.pem -noout -enddate

echo "Checking for Certbot cron job..."
if sudo ls /etc/cron.d/ | grep certbot > /dev/null 2>&1; then
    echo "Certbot cron job found. SSL certificates should renew automatically."
    sudo cat /etc/cron.d/certbot
else
    echo "Certbot cron job not found. Please check Certbot documentation for automatic renewal setup."
fi

echo "--------------------------------------------------------------------"
echo "Frontend deployment and SSL setup completed!"
echo "Your Paralegal UI should now be accessible via HTTPS at https://cheveningbrew.com"
echo "--------------------------------------------------------------------"
echo ""
echo "Note: Remember to configure your API keys and other environment variables."
echo "You can add exports to ~/.bashrc and then run 'source ~/.bashrc' to apply them."
echo ""
echo "Example (add to ~/.bashrc):"
echo "export API_KEY='your_api_key_here'"
echo "export API_URL='https://your-api-endpoint.com'"
echo ""
echo "Run 'source ~/.bashrc' after editing ~/.bashrc"

exit 0
