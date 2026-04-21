#!/bin/bash

echo "Starting app..."

export DB_URL=jdbc:mysql://database-2.cfugowg0e22z.ap-south-1.rds.amazonaws.com:3306/<YOUR_DB_NAME>
export DB_USER=admin
export DB_PASS=hrushant1909

cd /home/ec2-user

pkill -f jar || true

nohup java -jar app.jar > app.log 2>&1 &

echo "Done"