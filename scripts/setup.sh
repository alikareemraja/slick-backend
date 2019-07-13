
echo "Setting up MERN environment"

script_path=$PWD

mkdir -p ~/repos
cd ~/repos

echo "Installing Node..."

NODE_VERSION="v10.16.0" 
wget https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.xz

tar -xf node-$NODE_VERSION-linux-x64.tar.xz

mkdir -p /usr/local/nodejs

mv node-$NODE_VERSION-linux-x64/* /usr/local/nodejs

echo 'PATH=/usr/local/nodejs/bin:$PATH' >> ~/.profile

source ~/.profile

#sudo apt install npm

#echo "Installing MongoDb..."

#sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
#echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
#sudo apt-get update
#sudo apt-get install -y mongodb-org

#echo "mongodb-org hold" | sudo dpkg --set-selections
#echo "mongodb-org-server hold" | sudo dpkg --set-selections
#echo "mongodb-org-shell hold" | sudo dpkg --set-selections
#echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
#echo "mongodb-org-tools hold" | sudo dpkg --set-selections

#sudo mkdir /data/db

# systemctl daemon-reload

# sudo systemctl start mongodb

# netstat -plntu

# sudo systemctl status mongodb

# sudo systemctl enable mongodb

# sudo systemctl stop mongodb

# sudo systemctl restart mongodb
