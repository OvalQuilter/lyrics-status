#!/bin/bash

cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing packages..."
    npm install

    echo "loading..."
    sleep 7

    echo "attempting to fund..."
    npm fund
else
    echo "Dependencies already installed. Skipping install and fund."
fi

echo "attempting to run launcher..."
npm run start