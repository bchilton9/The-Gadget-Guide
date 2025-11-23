---
title: "Set Up Nginx Proxy Manager in Docker on OpenMediaVault"
summary: "Learn how to deploy Nginx Proxy Manager in a Docker container on OMV to manage reverse proxies and secure access with HTTPS."
image: "/images/No-Image.png"
categories: "OpenMediaVault,Docker,Nginx Proxy Manager,Networking,Containers"
author: "Unfinished"
---

<h2>Introduction</h2><p>Nginx Proxy Manager (NPM) provides an easy-to-use interface for managing reverse proxies and SSL certificates. Deploying NPM in Docker on OpenMediaVault makes it easier to securely expose your internal services to the internet without needing deep knowledge of Nginx configuration.</p><h2>Step 1: Prerequisites</h2><ul><li>OpenMediaVault with Docker and Portainer installed</li><li>A domain name (e.g., from Cloudflare, Namecheap)</li><li>Ports 80 and 443 forwarded to your OMV device if accessing externally</li></ul><h2>Step 2: Create Shared Folders</h2><ol><li>Create two folders in OMV: <code>npm-data</code> and <code>npm-letsencrypt</code></li><li>Ensure your Docker user has read/write permissions</li></ol><h2>Step 3: Docker Compose via Portainer</h2><ol><li>Go to Portainer &gt; Stacks and click <strong>Add Stack</strong></li><li>Name it <code>nginx-proxy-manager</code> and paste the following:</li></ol><pre><code>version: "3"
services:
  npm:
    image: jc21/nginx-proxy-manager:latest
    container_name: npm
    restart: unless-stopped
    ports:
      - 80:80
      - 81:81
      - 443:443
    volumes:
      - /srv/dev-disk-by-label-data/appdata/npm-data:/data
      - /srv/dev-disk-by-label-data/appdata/npm-letsencrypt:/etc/letsencrypt</code></pre><p>Click <strong>Deploy the Stack</strong>.</p><h2>Step 4: Access NPM</h2><ol><li>Visit <code>http://your-ip:81</code></li><li>Default credentials:<br>Email: admin@example.com<br>Password: changeme</li><li>Change login details immediately</li></ol><h2>Step 5: Add Your First Proxy Host</h2><ol><li>Click <strong>Proxy Hosts</strong> &gt; <strong>Add Proxy Host</strong></li><li>Enter your domain (e.g., <code>plex.yourdomain.com</code>)</li><li>Set the internal IP and port of the service (e.g., Plex at 192.168.1.100:32400)</li><li>Enable <strong>Block Common Exploits</strong></li><li>Under SSL, click <strong>Request a new SSL Certificate</strong></li><li>Enable Force SSL and HTTP/2</li><li>Save</li></ol><h2>Tips & Tricks</h2><ul><li>Use Cloudflare DNS for easy domain control and free proxy/CDN features</li><li>Use NPM to simplify exposing Home Assistant, Jellyfin, Radarr, etc.</li><li>Enable Access Lists in NPM for added security</li></ul><h2>Troubleshooting</h2><ul><li><strong>Can’t access the UI?</strong> Ensure port 81 is not in use and not blocked by firewall</li><li><strong>SSL certificate fails?</strong> Make sure your domain DNS is correctly pointed at your public IP</li><li><strong>Port conflicts?</strong> Confirm that nothing else is using ports 80/443</li></ul><h2>Conclusion</h2><p>Using Nginx Proxy Manager with Docker on OMV allows you to securely expose local services with minimal hassle. With a friendly web interface and built-in Let's Encrypt support, it's one of the easiest ways to manage a self-hosted infrastructure from anywhere in the world.</p>