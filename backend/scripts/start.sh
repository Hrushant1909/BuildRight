#!/bin/bash

echo "===== START SCRIPT STARTED ====="

# Move to correct directory
cd /home/ec2-user || exit

echo "Current directory:"
pwd

echo "Files present:"
ls -l

echo "Stopping old app..."
pkill -f app.jar || true

echo "Checking Java..."
java -version

echo "Starting new app..."

nohup java -jar app.jar > app.log 2>&1 &

sleep 5

echo "Checking if app started..."
ps aux | grep java

echo "===== START SCRIPT COMPLETED ====="