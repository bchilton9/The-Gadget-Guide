---
title: "Host a Personal Website Using Raspberry Pi and NGINX"
summary: "Turn your Raspberry Pi into a fully functional personal web server using NGINX."
image: "/images/No-Image.png"
categories: "Raspberry Pi,Web Server,NGINX,Networking"
author: "Unfinished"
---

<h2>Introduction</h2>
<p>Want to host your own website from home? A Raspberry Pi is a great way to run a lightweight, always-on web server. In this guide, you’ll install NGINX, set up a simple site, and make it accessible on your network or even from the internet.</p>

<h2>Requirements</h2>
<ul>
  <li>Raspberry Pi 3 or newer (Pi 4 recommended)</li>
  <li>Raspberry Pi OS installed and updated</li>
  <li>Internet access</li>
  <li>Router with port forwarding capabilities (optional for external access)</li>
</ul>

<h2>Step 1: Update Your Raspberry Pi</h2>
<pre><code>sudo apt update && sudo apt upgrade -y</code></pre>

<h2>Step 2: Install NGINX</h2>
<pre><code>sudo apt install nginx -y</code></pre>
<p>Once installed, NGINX will start automatically. You can check its status:</p>
<pre><code>systemctl status nginx</code></pre>
<p>Visit <code>http://raspberrypi.local</code> or your Pi's IP address in a browser to see the default NGINX welcome page.</p>

<h2>Step 3: Set Up Your Website</h2>
<p>The default web root is:</p>
<pre><code>/var/www/html</code></pre>
<p>You can replace the default file with your own:</p>
<pre><code>
sudo nano /var/www/html/index.html
</code></pre>
<p>Add some basic HTML:</p>
<pre><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;My Raspberry Pi Site&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;Welcome to my personal website!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>

<h2>Step 4: Customize the Configuration (Optional)</h2>
<p>The NGINX config file is located at:</p>
<pre><code>/etc/nginx/sites-available/default</code></pre>
<p>You can modify it to serve multiple sites, enable HTTPS, or use a custom domain.</p>

<h2>Step 5: Port Forwarding (For Remote Access)</h2>
<p>If you want your site accessible from outside your home network:</p>
<ol>
  <li>Log into your router</li>
  <li>Forward external port 80 to your Pi’s internal IP on port 80</li>
</ol>
<p>Then visit your public IP address (found at <a href="https://whatismyipaddress.com" target="_blank">whatismyipaddress.com</a>).</p>

<h2>Step 6: Add a Domain Name (Optional)</h2>
<p>Register a domain name and point it to your public IP using an A record. You can use dynamic DNS (like No-IP or DuckDNS) if your IP changes often.</p>

<h2>Step 7: Secure With HTTPS (Optional)</h2>
<p>To use HTTPS:</p>
<pre><code>
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx
</code></pre>
<p>Follow the prompts to configure SSL certificates from Let's Encrypt.</p>

<h2>Conclusion</h2>
<p>That’s it! You now have a functioning personal web server running from your Raspberry Pi. This setup is perfect for hosting simple sites, documentation, or learning web development basics from scratch.</p>