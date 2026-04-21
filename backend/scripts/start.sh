#!/bin/bash

echo "===== STARTING APPLICATION ====="

export DB_URL=jdbc:mysql://database-2.cfugowg0e22z.ap-south-1.rds.amazonaws.com:3306/<YOUR_DB_NAME>
export DB_USER=admin
export DB_PASS=hrushant1909

cd /home/ec2-user || exit

echo "Files:"
ls -l

echo "Stopping old app..."
pkill -f jar || true

echo "Running app in foreground (DEBUG)..."

java -jar app.jar

echo "===== END ====="