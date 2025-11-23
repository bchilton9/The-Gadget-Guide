---
title: "Set Up Radarr in Docker with OpenMediaVault"
summary: "Learn how to deploy Radarr in a Docker container on OMV to automate downloading and organizing movies."
image: "/images/No-Image.png"
categories: "OpenMediaVault,Docker,Radarr,Media Server,Containers"
author: "Unfinished"
---

<h2>Introduction</h2><p>Radarr is a powerful movie collection manager that automatically searches for, downloads, and organizes movies. By deploying it in Docker on OpenMediaVault (OMV), you can simplify system maintenance and maximize flexibility using containerization.</p><h2>Step 1: Prerequisites</h2><ul><li>OpenMediaVault installed and updated</li><li>Docker and Portainer already set up</li><li>Shared folders for <code>radarr-config</code>, <code>downloads</code>, and <code>movies</code> created</li></ul><h2>Step 2: Create Shared Folders</h2><ol><li>In the OMV Web UI, create <code>radarr-config</code> and <code>movies</code> under your storage volume.</li><li>Ensure proper access permissions for your Docker user.</li></ol><h2>Step 3: Deploy Radarr with Docker Compose</h2><ol><li>Open Portainer &gt; Stacks and click <strong>Add Stack</strong>.</li><li>Name the stack <code>radarr</code> and paste this Docker Compose:</li></ol><pre><code>version: "2.1"
services:
  radarr:
    image: linuxserver/radarr
    container_name: radarr
    environment:
      - PUID=1000
      - PGID=100
      - TZ=America/Chicago
    volumes:
      - /srv/dev-disk-by-label-data/appdata/radarr:/config
      - /srv/dev-disk-by-label-data/downloads:/downloads
      - /srv/dev-disk-by-label-data/media/Movies:/movies
    ports:
      - 7878:7878
    restart: unless-stopped</code></pre><p>Click <strong>Deploy the Stack</strong>.</p><h2>Step 4: Initial Configuration</h2><ol><li>Navigate to <code>http://your-server-ip:7878</code>.</li><li>Go to <strong>Settings &gt; Media Management</strong> and customize your naming scheme and folders.</li><li>Add your download client (e.g., qBittorrent) under <strong>Download Clients</strong>.</li><li>Set up indexers using Jackett or torrent/NZB sources under <strong>Indexers</strong>.</li><li>Add some movies and choose your quality profiles and paths (e.g., <code>/movies</code>).</li></ol><h2>Tips & Tricks</h2><ul><li>Use Jackett to greatly expand your indexer sources.</li><li>Set up Radarr notifications to alert you when downloads complete.</li><li>Use Radarr's custom scripts to trigger external tools (e.g., Plex scan).</li></ul><h2>Troubleshooting</h2><ul><li><strong>Web UI not loading?</strong> Check that Docker is running and port 7878 is available.</li><li><strong>Permissions errors?</strong> Make sure volumes and PUID/PGID are correct and match your OMV user.</li><li><strong>No downloads?</strong> Confirm your indexers are working and linked to a functional download client.</li></ul><h2>Conclusion</h2><p>Radarr combined with Docker and OMV delivers a clean, automated movie management experience. It integrates perfectly with your existing media server stack and takes the hassle out of downloading and organizing your movie collection. When paired with tools like Sonarr and Plex, Radarr completes a truly automated home theater ecosystem.</p>