---
title: "Set Up Lidarr in Docker with OpenMediaVault"
summary: "Learn how to deploy Lidarr in a Docker container on OMV to automatically manage your music library with rich metadata and automation."
image: "/images/No-Image.png"
categories: "OpenMediaVault,Docker,Lidarr,Containers,Music"
author: "Unfinished"
---

<h2>Introduction</h2><p>Lidarr is a music collection manager for Usenet and BitTorrent users. Like Radarr and Sonarr, it automates the process of searching, downloading, and organizing your music library. In this guide, we'll walk through deploying Lidarr on OpenMediaVault (OMV) using Docker and Portainer.</p><h2>Step 1: Prerequisites</h2><ul><li>OpenMediaVault 5 or later</li><li>Docker and Portainer installed on OMV</li><li>Mounted storage for media and app data</li></ul><h2>Step 2: Prepare Folders</h2><ol><li>Create shared folders in OMV for the following:</li><ul><li><code>lidarr-config</code> – For Lidarr app data</li><li><code>music</code> – For storing downloaded music</li><li><code>downloads</code> – For completed downloads (shared with your downloader)</li></ul><li>Ensure permissions are set properly for Docker user</li></ol><h2>Step 3: Deploy with Docker Compose</h2><ol><li>Log into Portainer &gt; Stacks &gt; Add Stack</li><li>Name your stack <code>lidarr</code> and paste the following YAML:</li></ol><pre><code>version: "2.1"
services:
  lidarr:
    image: lscr.io/linuxserver/lidarr:latest
    container_name: lidarr
    environment:
      - PUID=1000
      - PGID=100
      - TZ=America/Chicago
    volumes:
      - /srv/dev-disk-by-label-data/appdata/lidarr-config:/config
      - /srv/dev-disk-by-label-media/music:/music
      - /srv/dev-disk-by-label-media/downloads:/downloads
    ports:
      - 8686:8686
    restart: unless-stopped</code></pre><p>Click <strong>Deploy the Stack</strong>.</p><h2>Step 4: Initial Configuration</h2><ol><li>Visit <code>http://your-server-ip:8686</code></li><li>Set your root folders: Music library and Downloads folder</li><li>Go to <strong>Settings &gt; Indexers</strong> and add your preferred indexers (e.g., NZBHydra, Jackett)</li><li>Go to <strong>Settings &gt; Download Clients</strong> and add your downloader (e.g., qBittorrent, SABnzbd)</li></ol><h2>Tips & Tricks</h2><ul><li>Lidarr supports advanced quality profiles to filter by bitrate or codec</li><li>Use MusicBrainz ID tagging for precise artist matching</li><li>Schedule library refresh during off-hours to reduce load</li></ul><h2>Troubleshooting</h2><ul><li><strong>Can’t access UI?</strong> Ensure port 8686 is open and container is running</li><li><strong>Permissions issue?</strong> Double-check PUID/PGID match your user account</li><li><strong>Indexers not working?</strong> Validate the API keys and test connections</li></ul><h2>Conclusion</h2><p>Lidarr is a powerful automation tool that brings your music collection into the modern age. With Docker on OMV, it runs isolated and easily upgradable. Set it and forget it, and enjoy an always-updated, well-organized library of your favorite artists and albums.</p>