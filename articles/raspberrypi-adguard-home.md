---
title: "Use Your Raspberry Pi as a Network-Wide Ad Blocker with AdGuard Home"
summary: "Set up AdGuard Home on your Raspberry Pi to block ads, trackers, and malicious domains across all your devices."
image: "/images/No-Image.png"
categories: "Raspberry Pi,Networking,Privacy,Ad Blocker"
author: "Unfinished"
---

<h2>Overview</h2>
  <p>AdGuard Home is a powerful and user-friendly network-wide ad blocker. By running it on your Raspberry Pi, you can block ads, trackers, and malware across all devices on your network — TVs, phones, PCs, consoles, and more — without any client configuration.</p>

  <h2>Requirements</h2>
  <ul>
    <li>Raspberry Pi 3 or 4 (or newer)</li>
    <li>Raspberry Pi OS (Lite or Full)</li>
    <li>Static IP address on your network</li>
    <li>Basic terminal/SSH access</li>
  </ul>

  <h2>Step 1: Set a Static IP Address</h2>
  <p>For AdGuard Home to work reliably, your Pi should always have the same IP address.</p>
  <p>Edit your DHCP settings on your router to reserve a static IP address for your Pi's MAC address, or set a static IP directly in <code>/etc/dhcpcd.conf</code>.</p>

  <h2>Step 2: Download and Install AdGuard Home</h2>
  <pre><code>curl -s -S -L https://static.adguard.com/adguardhome/release/AdGuardHome_linux_arm.tar.gz | tar -xz
cd AdGuardHome
sudo ./AdGuardHome -s install</code></pre>
  <p>This will extract and install AdGuard Home as a background service.</p>

  <h2>Step 3: Access the Web Interface</h2>
  <p>Open a browser and navigate to:</p>
  <pre><code>http://<your-pi-ip>:3000</code></pre>
  <p>This will launch the AdGuard Home setup wizard. Follow the on-screen instructions to choose an admin username and password, and configure the DNS server settings.</p>

  <h2>Step 4: Configure Your Network DNS</h2>
  <p>To enable ad blocking network-wide, update your router's DNS settings to use the Raspberry Pi's IP address as the primary DNS server.</p>
  <p>Example: Set <code>192.168.1.100</code> (your Pi's static IP) as the DNS server on your router.</p>

  <h2>Step 5: Customize Blocking Settings</h2>
  <p>Log in to the dashboard at:</p>
  <pre><code>http://<your-pi-ip>:3000</code></pre>
  <p>Under <strong>Filters</strong>, you can enable popular blocklists like:</p>
  <ul>
    <li>AdGuard DNS Filter</li>
    <li>OISD</li>
    <li>EasyList</li>
    <li>Steven Black Hosts</li>
  </ul>

  <h2>Step 6: Monitor and Optimize</h2>
  <p>Use the <strong>Dashboard</strong> to view statistics, block percentages, and see which clients are generating the most queries. You can even create client-specific rules or enable parental controls.</p>

  <h2>Optional Features</h2>
  <ul>
    <li><strong>HTTPS DNS:</strong> Secure DNS over TLS or HTTPS</li>
    <li><strong>Whitelist:</strong> Allow domains you want to always load</li>
    <li><strong>Blacklist:</strong> Add custom domains to block</li>
    <li><strong>DHCP Server:</strong> Let AdGuard handle DHCP for full control</li>
  </ul>

  <h2>Conclusion</h2>
  <p>By setting up AdGuard Home on your Raspberry Pi, you gain a powerful tool to reduce unwanted content, improve loading speeds, and protect your entire home network — with minimal ongoing maintenance.</p>