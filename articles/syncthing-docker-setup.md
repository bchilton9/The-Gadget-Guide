---
title: "Run Syncthing in Docker"
summary: "Deploy Syncthing in a Docker container for easy, lightweight, and secure file syncing."
image: "/images/No-Image.png"
categories: "Syncthing,Docker,Containers,File Sync"
author: "Unfinished"
---

<h2>Introduction</h2><p>Running Syncthing in Docker is a great way to manage file synchronization with a clean and portable setup. Whether you're running it on a server, NAS, or even a Raspberry Pi, Docker keeps things contained and easy to upgrade or back up.</p><h2>Prerequisites</h2><ul><li>Docker installed on your system (Linux, Windows, OMV, etc.)</li><li>Basic knowledge of command line or Docker Compose</li></ul><h2>Step 1: Create the Syncthing Container</h2><p>You can use a one-liner to get started quickly:</p><pre><code>docker run -d \
  --name=syncthing \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=America/Chicago \
  -p 8384:8384 \
  -p 22000:22000 \
  -p 21027:21027/udp \
  -v /path/to/config:/config \
  -v /path/to/folders:/sync \
  --restart unless-stopped \
  lscr.io/linuxserver/syncthing</code></pre><p><strong>Change</strong> <code>/path/to/config</code> and <code>/path/to/folders</code> to your actual paths.</p><h2>Step 2: Access the Web Interface</h2><p>Once the container is running, open a browser and visit:</p><p><code>http://localhost:8384</code></p><p>This is the Syncthing Web UI. From here, you can pair devices, set folder paths, adjust network settings, and much more.</p><h2>Optional: Docker Compose Setup</h2><pre><code>version: "2.1"
services:
  syncthing:
    image: lscr.io/linuxserver/syncthing
    container_name: syncthing
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Chicago
    volumes:
      - /path/to/config:/config
      - /path/to/folders:/sync
    ports:
      - 8384:8384
      - 22000:22000
      - 21027:21027/udp
    restart: unless-stopped</code></pre><p>Save this as <code>docker-compose.yml</code> and run:</p><pre><code>docker compose up -d</code></pre><h2>Tips & Tricks</h2><ul><li>Use host networking if you need full local LAN discovery without port mapping.</li><li>Regularly back up your Syncthing config directory (<code>/config</code> volume).</li><li>Enable "GUI Authentication" under Settings for extra security.</li><li>Check logs with <code>docker logs syncthing</code> if something isn't working.</li></ul><h2>Troubleshooting</h2><ul><li><strong>Port Conflicts?</strong> Make sure ports 8384, 22000, and 21027 are not used by another container.</li><li><strong>Web UI won’t load?</strong> Try accessing by local IP or hostname instead of <code>localhost</code>.</li><li><strong>Data not syncing?</strong> Confirm folder permissions and correct mount paths in the container.</li></ul><h2>Conclusion</h2><p>Using Docker to run Syncthing adds portability, easy deployment, and system separation. Whether you're syncing folders between two systems or managing backups between multiple devices, Docker makes it easier than ever to keep things automated and clean.</p>