#!/bin/bash

echo "===== STARTING APPLICATION ====="

export DB_URL=jdbc:mysql://buildright-prod-mysql.cfugowg0e22z.ap-south-1.rds.amazonaws.com:3306/buildrightdb
export DB_USER=admin
export DB_PASS=hrushant1909

cd /home/ec2-user || exit

echo "Files:"
ls -l

echo "Stopping old app..."
pkill -f jar || true

echo "Running app in foreground (DEBUG)..."

nohup java -jar /home/ec2-user/app.jar > /home/ec2-user/app.log 2>&1 &

echo "===== END ====="