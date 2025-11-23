---
title: "Running Tdarr in Docker for Automated Media Transcoding"
summary: "Set up Tdarr in Docker to automatically scan and transcode your media library for efficient storage and playback."
image: "/images/No-Image.png"
categories: "Docker,Media,Transcoding,Containers"
author: "Unfinished"
---

<h2>Introduction</h2><p>Tdarr is a powerful self-hosted tool that automatically scans, analyzes, and transcodes your video files to reduce size and improve compatibility across devices. Running Tdarr in Docker is the easiest way to set it up and maintain it.</p><h2>Requirements</h2><ul><li>A system that supports Docker (Linux, Unraid, OMV, etc.)</li><li>Docker and Docker Compose installed</li><li>Media library to scan</li></ul><h2>Step-by-Step Setup</h2><h3>1. Create Folder Structure</h3><pre>mkdir -p ~/tdarr/config
mkdir -p ~/tdarr/server
mkdir -p ~/tdarr/transcode
mkdir -p ~/tdarr/media</pre><h3>2. Create Docker Compose File</h3><pre>version: "2.1"
services:
  tdarr:
    image: ghcr.io/haveagitgat/tdarr:latest
    container_name: tdarr
    ports:
      - 8265:8265
      - 8266:8266
    volumes:
      - ~/tdarr/server:/app/server
      - ~/tdarr/config:/app/configs
      - ~/tdarr/transcode:/temp
      - ~/tdarr/media:/media
    restart: unless-stopped</pre><h3>3. Start the Container</h3><pre>docker-compose up -d</pre><p>Access Tdarr via <a href="http://localhost:8265" target="_blank">http://localhost:8265</a>.</p><h2>Basic Configuration</h2><ul><li>Set the media directories under <strong>Library</strong>.</li><li>Configure <strong>Transcode Plugins</strong> like HandBrake or FFmpeg-based ones.</li><li>Enable health checks and space-saving settings.</li></ul><h2>Tips & Tricks</h2><ul><li>Use GPU acceleration (Nvidia or AMD) for faster transcoding.</li><li>Use Tdarr Nodes to scale across multiple machines or containers.</li><li>Test your plugins on a few files before doing the full library.</li></ul><h2>Troubleshooting</h2><ul><li><strong>Files not showing:</strong> Check your mounted volume paths.</li><li><strong>Transcoding fails:</strong> Confirm FFmpeg or plugin settings.</li><li><strong>Web UI not loading:</strong> Ensure ports 8265/8266 are accessible.</li></ul><h2>Conclusion</h2><p>Tdarr in Docker is a powerful solution for optimizing and maintaining a high-quality media collection. It saves space, increases compatibility, and automates what would otherwise be a time-consuming process. Perfect for Plex, Jellyfin, or Emby users.</p>