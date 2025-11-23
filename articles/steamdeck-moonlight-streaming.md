---
title: "Set Up Moonlight Game Streaming on Steam Deck"
summary: "Stream PC games to your Steam Deck using Moonlight and Sunshine for low-latency remote play."
image: "/images/No-Image.png"
categories: "PC, Remote Play, Steam Deck, Streaming"
author: "Unfinished"
---

<h2>Introduction</h2>
  <p>Want to play your high-performance PC games on the Steam Deck without installing them locally? Moonlight and Sunshine offer a seamless way to stream from your Windows PC to the Steam Deck over a local network.</p>

  <h3>Requirements</h3>
  <ul>
    <li>Steam Deck with SteamOS</li>
    <li>Gaming PC with Windows (NVIDIA, AMD, or Intel GPU)</li>
    <li><a href="https://github.com/LizardByte/Sunshine" target="_blank">Sunshine</a> installed on your PC</li>
    <li>Moonlight installed on Steam Deck via Discover or Flatpak</li>
    <li>5GHz Wi-Fi or Ethernet connection</li>
  </ul>

  <h3>Step 1: Install Sunshine on Your PC</h3>
  <ol>
    <li>Download the latest Sunshine release from GitHub and install it.</li>
    <li>Launch Sunshine and go to <code>http://localhost:47990</code> in your browser.</li>
    <li>Add games or apps in the Applications tab.</li>
    <li>Note your local IP address for pairing.</li>
  </ol>

  <h3>Step 2: Install Moonlight on Steam Deck</h3>
  <ol>
    <li>Switch to Desktop Mode on Steam Deck.</li>
    <li>Open the Discover Software Center.</li>
    <li>Search for and install <strong>Moonlight</strong>.</li>
    <li>Alternatively, use: <code>flatpak install flathub com.moonlight_stream.Moonlight</code></li>
  </ol>

  <h3>Step 3: Pair with Your PC</h3>
  <ol>
    <li>Launch Moonlight and locate your PC on the network.</li>
    <li>Click to pair and enter the code on the PC when prompted.</li>
    <li>Once paired, your apps and games will appear.</li>
  </ol>

  <h3>Step 4: Optimize Streaming</h3>
  <ul>
    <li>Use 1280x800 resolution for best fit on Deck.</li>
    <li>Set bitrate between 10,000–20,000 kbps.</li>
    <li>Enable the performance overlay to monitor latency and FPS.</li>
  </ul>

  <h3>Troubleshooting</h3>
  <ul>
    <li><strong>PC not detected:</strong> Enter the local IP address manually.</li>
    <li><strong>Controller input doesn’t work:</strong> Ensure Sunshine is passing through gamepad input or use Steam Input override.</li>
    <li><strong>Stuttering video:</strong> Lower bitrate and ensure both devices are on the same 5GHz network or wired.</li>
  </ul>

  <h3>Conclusion</h3>
  <p>Moonlight and Sunshine transform your Steam Deck into a powerful remote gaming device. With proper setup, you can enjoy PC-level gaming from anywhere in your home — all without installing heavy games on your Deck.</p>