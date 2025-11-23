---
title: "Set Up Sonarr in Docker with OpenMediaVault"
summary: "Learn how to deploy Sonarr in a Docker container on OMV to automatically manage and download your TV shows."
image: "/images/No-Image.png"
categories: "OpenMediaVault,Docker,Sonarr,Media Server,Containers"
author: "Unfinished"
---

<h2>Introduction</h2><p>Sonarr is a powerful TV series manager that automatically grabs, sorts, and renames new episodes of your favorite shows. When combined with Docker and OpenMediaVault (OMV), you can run it efficiently in a containerized environment without impacting your base OS.</p><h2>Step 1: Prerequisites</h2><ul><li>OpenMediaVault installed and updated</li><li>Docker and Portainer already installed</li><li>Created shared folders for config and downloads</li></ul><h2>Step 2: Create Folders for Sonarr</h2><ol><li>Via OMV web UI, create two shared folders: <code>sonarr-config</code> and <code>downloads</code>.</li><li>Ensure your Docker user has read/write access.</li></ol><h2>Step 3: Deploy Sonarr Container in Portainer</h2><ol><li>Open Portainer and go to <strong>Stacks</strong>.</li><li>Create a new stack and name it <code>sonarr</code>.</li><li>Use the following <strong>docker-compose</strong> YAML:</li></ol><pre><code>version: "2.1"
services:
  sonarr:
    image: linuxserver/sonarr
    container_name: sonarr
    environment:
      - PUID=1000
      - PGID=100
      - TZ=America/Chicago
    volumes:
      - /srv/dev-disk-by-label-data/appdata/sonarr:/config
      - /srv/dev-disk-by-label-data/downloads:/downloads
      - /srv/dev-disk-by-label-data/media/TV:/tv
    ports:
      - 8989:8989
    restart: unless-stopped</code></pre><p>Click <strong>Deploy the Stack</strong>.</p><h2>Step 4: Configure Sonarr</h2><ol><li>Access Sonarr at <code>http://your-server-ip:8989</code>.</li><li>Go to <strong>Settings &gt; Media Management</strong> to define naming formats.</li><li>Under <strong>Download Clients</strong>, connect your torrent or NZB client (e.g., qBittorrent or NZBGet).</li><li>Set up indexers under <strong>Indexers</strong> to enable automatic searching.</li><li>Add shows and define where to store downloaded episodes (e.g., <code>/tv</code>).</li></ol><h2>Tips & Tricks</h2><ul><li>Set up Sonarr notifications to Discord or email for download alerts.</li><li>Enable Failed Download Handling to retry failed grabs automatically.</li><li>Combine with Jackett for additional indexers support.</li></ul><h2>Troubleshooting</h2><ul><li><strong>Cannot access web UI?</strong> Ensure port 8989 is open and the container is running.</li><li><strong>Permission errors?</strong> Check that PUID/PGID match your OMV user and that volume mounts are correct.</li><li><strong>Nothing downloads?</strong> Ensure your indexers and download client are properly configured and active.</li></ul><h2>Conclusion</h2><p>Sonarr makes managing your TV shows effortless and when containerized with Docker on OMV, it becomes a low-maintenance, scalable solution. Once configured, you can just add shows and let Sonarr handle the rest—from searching to organizing and renaming. Combine it with Radarr and Lidarr for a complete media setup.</p>