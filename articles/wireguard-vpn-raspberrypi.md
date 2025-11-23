---
title: "Create a Personal VPN with WireGuard on Raspberry Pi"
summary: "Learn how to turn your Raspberry Pi into a secure personal VPN server using WireGuard."
image: "/images/No-Image.png"
categories: "Raspberry Pi,Networking,Privacy,Security"
author: "Unfinished"
---

<h2>Introduction</h2>
  <p>Want to access your home network securely while away, or encrypt your internet traffic? WireGuard is a fast, modern VPN that’s easy to configure and perfect for a lightweight Raspberry Pi setup. This guide shows you how to install and configure WireGuard VPN on your Pi so you can browse safely from anywhere.</p>

  <h2>Requirements</h2>
  <ul>
    <li>Raspberry Pi 3 or 4 with Raspbian/Raspberry Pi OS</li>
    <li>MicroSD card with OS installed</li>
    <li>Static IP address or dynamic DNS (e.g., DuckDNS)</li>
    <li>Port forwarding configured on your home router</li>
    <li>Basic familiarity with command line</li>
  </ul>

  <h2>Step 1: Update and Install WireGuard</h2>
  <pre><code>sudo apt update && sudo apt upgrade -y
sudo apt install wireguard -y</code></pre>

  <h2>Step 2: Generate Server Keys</h2>
  <pre><code>umask 077
wg genkey | tee privatekey | wg pubkey > publickey</code></pre>
  <p>This creates <code>privatekey</code> and <code>publickey</code> in your current directory. Keep the private key secret!</p>

  <h2>Step 3: Configure WireGuard Server</h2>
  <pre><code>sudo nano /etc/wireguard/wg0.conf</code></pre>
  <p>Paste and edit the following:</p>
  <pre><code>[Interface]
PrivateKey = YOUR_PRIVATE_KEY
Address = 10.0.0.1/24
ListenPort = 51820

[Peer]
# Example client - remove this block for now if not configured
PublicKey = CLIENT_PUBLIC_KEY
AllowedIPs = 10.0.0.2/32</code></pre>

  <p>Replace <code>YOUR_PRIVATE_KEY</code> with the contents of your <code>privatekey</code> file.</p>

  <h2>Step 4: Enable IP Forwarding</h2>
  <pre><code>sudo nano /etc/sysctl.conf</code></pre>
  <p>Uncomment or add this line:</p>
  <pre><code>net.ipv4.ip_forward=1</code></pre>
  <p>Then apply it:</p>
  <pre><code>sudo sysctl -p</code></pre>

  <h2>Step 5: Set Up Firewall Rules</h2>
  <pre><code>sudo iptables -A FORWARD -i wg0 -j ACCEPT
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</code></pre>

  <h2>Step 6: Enable WireGuard</h2>
  <pre><code>sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0</code></pre>

  <h2>Step 7: Port Forwarding</h2>
  <p>Log into your router and forward UDP port <strong>51820</strong> to your Raspberry Pi’s local IP address.</p>

  <h2>Step 8: Set Up Client Config</h2>
  <p>Use an app like the official WireGuard client on your phone or laptop and create a config like:</p>
  <pre><code>[Interface]
PrivateKey = CLIENT_PRIVATE_KEY
Address = 10.0.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = SERVER_PUBLIC_KEY
Endpoint = yourdomain.duckdns.org:51820
AllowedIPs = 0.0.0.0/0</code></pre>

  <h2>Tips</h2>
  <ul>
    <li>Use <a href="https://www.duckdns.org/" target="_blank">DuckDNS</a> to get a free dynamic domain name.</li>
    <li>Back up your keys and config files!</li>
    <li>You can add multiple clients by repeating the key generation and [Peer] section for each.</li>
    <li>Use QR codes for mobile clients with <code>qrencode</code>.</li>
  </ul>

  <h2>Conclusion</h2>
  <p>You now have a private VPN running from your Raspberry Pi using WireGuard. This setup encrypts your traffic, secures your network access from public connections, and gives you full control over your data privacy.</p>