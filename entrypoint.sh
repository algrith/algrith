#!/bin/sh

# Start pm2 in background
npx pm2-runtime ecosystem.config.js &

# Wait for Next.js to be ready on port 3000
echo "Waiting for Next.js..."
while ! nc -z localhost 3000; do
  sleep 1
done
echo "Next.js ready"

# Start Nginx in foreground
nginx -g "daemon off;"