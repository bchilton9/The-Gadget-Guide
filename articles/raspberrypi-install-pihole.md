---
title: "How to Install Pi-hole on Raspberry Pi"
summary: "Block ads and trackers across your entire home network by turning your Raspberry Pi into a network-wide ad blocker."
image: "/images/No-Image.png"
categories: "Networking, Privacy, Raspberry Pi, Utilities"
author: "Unfinished"
---

<h2>How to Install Pi-hole on Raspberry Pi</h2>

  <p>Pi-hole is a free and open-source tool that turns your Raspberry Pi into a DNS-level ad blocker for your entire network. It blocks ads, trackers, and malicious domains on all your devices automatically — no browser extensions needed.</p>

  <h3>Requirements</h3>
  <ul>
    <li>Raspberry Pi (any model, Pi 3 or newer recommended)</li>
    <li>Raspberry Pi OS (Lite or Desktop)</li>
    <li>Static IP address (or reservation via your router)</li>
    <li>Internet access</li>
  </ul>

  <h3>Step 1: Update Your System</h3>
  <pre><code>sudo apt update && sudo apt upgrade -y</code></pre>

  <h3>Step 2: Set a Static IP Address</h3>
  <p>This ensures the Pi-hole server doesn&apos;t change IPs after reboot. Set it manually or reserve it via your router.</p>

  <h3>Step 3: Install Pi-hole</h3>
  <pre><code>curl -sSL https://install.pi-hole.net | bash</code></pre>

  <p>The installer will launch a guided setup:</p>
  <ul>
    <li>Select network interface (usually eth0 or wlan0)</li>
    <li>Choose a static IP address</li>
    <li>Choose upstream DNS provider (e.g. Cloudflare, Google)</li>
    <li>Enable default blocklists</li>
    <li>Set web admin password</li>
  </ul>

  <h3>Step 4: Access the Pi-hole Web Interface</h3>
  <p>Once installed, go to <code>http://your.pi.ip.address/admin</code> in a browser. Log in with your password to manage settings and see stats.</p>

  <h3>Step 5: Point Devices to Pi-hole</h3>
  <ul>
    <li>Option 1: Manually set the DNS on each device to your Pi&apos;s IP address</li>
    <li>Option 2: Change your router&apos;s DNS setting to point to the Pi</li>
  </ul>

  <p>Once DNS is routed through Pi-hole, ads and tracking domains will be blocked automatically.</p>

  <h3>Bonus: Use Pi-hole with Unbound (DNS Privacy)</h3>
  <p>For maximum privacy, you can install Unbound, a local DNS resolver that doesn&apos;t rely on third parties. See the Pi-hole docs for a full guide.</p>

  <h3>Conclusion</h3>
  <p>With Pi-hole, your Raspberry Pi becomes a powerful tool for network-wide privacy and cleaner web browsing. It’s easy to install, powerful, and once set up — totally automatic.</p>