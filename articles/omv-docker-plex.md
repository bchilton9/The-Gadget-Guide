---
title: "Set Up Plex in Docker with OpenMediaVault"
summary: "Deploy Plex Media Server using Docker and Portainer on OMV to stream your movies, TV shows, and music with ease."
image: "/images/No-Image.png"
categories: "OpenMediaVault,Docker,Plex,Media Server,Containers"
author: "Unfinished"
---

<h2>Introduction</h2><p>Plex is a powerful media server that lets you stream your personal media collection to nearly any device. Running Plex in a Docker container on OpenMediaVault (OMV) is a great way to keep it isolated, portable, and easy to manage.</p><h2>Requirements</h2><ul><li>OMV installed (v5 or newer)</li><li>Docker and Portainer installed on OMV</li><li>External drive or shared folder with your media</li></ul><h2>Step 1: Create Folders</h2><p>In OMV, create shared folders for:</p><ul><li><strong>plex-config</strong> – for Plex metadata and configuration</li><li><strong>media</strong> – for your Movies, TV Shows, and Music</li></ul><h2>Step 2: Deploy via Portainer</h2><ol><li>Log in to Portainer</li><li>Go to <strong>Stacks</strong> &gt; <strong>Add Stack</strong></li><li>Name the stack <code>plex</code> and use the following Docker Compose:</li></ol><pre><code>version: "2.1"
services:
  plex:
    image: lscr.io/linuxserver/plex:latest
    container_name: plex
    environment:
      - PUID=1000
      - PGID=100
      - VERSION=docker
      - TZ=America/Chicago
    volumes:
      - /srv/dev-disk-by-label-data/appdata/plex-config:/config
      - /srv/dev-disk-by-label-media:/media
    ports:
      - 32400:32400
    restart: unless-stopped</code></pre><p>Click <strong>Deploy the Stack</strong>.</p><h2>Step 3: Initial Setup</h2><ol><li>Open Plex by visiting <code>http://your-server-ip:32400/web</code></li><li>Create or log in to your Plex account</li><li>Name your server and add media libraries (Movies, TV Shows, etc.)</li><li>Point each library to <code>/media/movies</code>, <code>/media/tvshows</code>, etc.</li></ol><h2>Tips & Tricks</h2><ul><li><strong>Enable remote access</strong> to stream media away from home (requires port forwarding)</li><li><strong>Use hardware acceleration</strong> with a Plex Pass and supported CPU/GPU</li><li><strong>Enable DLNA</strong> for devices that don’t support the Plex app</li></ul><h2>Troubleshooting</h2><ul><li><strong>Plex not loading?</strong> Check port 32400 and container logs</li><li><strong>Media not scanning?</strong> Verify correct mount paths and permissions</li><li><strong>No audio/video?</strong> Check codecs and file formats; Plex transcodes unsupported ones</li></ul><h2>Conclusion</h2><p>Setting up Plex in Docker on OMV is straightforward and incredibly effective. With containerized deployment, updates and maintenance become much simpler. Enjoy your personal Netflix-style experience with zero subscriptions!</p>