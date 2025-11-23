---
title: "Turn Your Steam Deck Into a Portable Xbox with xCloud + Edge"
summary: "Stream Xbox Game Pass titles from the cloud using Microsoft Edge on Steam Deck — no Windows install required."
image: "/images/No-Image.png"
categories: "Cloud Gaming, Game Pass, Steam Deck, Streaming, Xbox"
author: "Unfinished"
---

<h2>Introduction</h2>
  <p>Want to play Halo Infinite, Forza Horizon 5, or Starfield on your Steam Deck without downloading them? Xbox Cloud Gaming (xCloud) lets you stream your Game Pass library straight to your Deck — no Windows install required.</p>
  <p>This guide walks you through setting up xCloud in the Microsoft Edge browser directly on Steam Deck’s native SteamOS environment.</p>

  <h3>Requirements</h3>
  <ul>
    <li>Steam Deck with SteamOS 3.0 or newer</li>
    <li>Xbox Game Pass Ultimate subscription</li>
    <li>Stable 5GHz Wi-Fi or Ethernet (via dock or USB-C adapter)</li>
    <li>Microsoft Edge (Beta) browser installed</li>
  </ul>

  <h3>Step 1: Switch to Desktop Mode</h3>
  <ol>
    <li>Press the <strong>Steam</strong> button.</li>
    <li>Select <strong>Power</strong> → <strong>Switch to Desktop</strong>.</li>
    <li>Wait for the KDE desktop environment to load.</li>
  </ol>

  <h3>Step 2: Install Microsoft Edge</h3>
  <ol>
    <li>Open the Discover Software Center.</li>
    <li>Search for <strong>Microsoft Edge (Beta)</strong> and install it.</li>
    <li>Or run: <code>flatpak install flathub com.microsoft.Edge</code></li>
    <li>Verify Edge launches properly from the desktop.</li>
  </ol>

  <h3>Step 3: Add Edge to Steam with Launch Flags</h3>
  <ol>
    <li>Launch the Steam client in Desktop Mode.</li>
    <li>Click <strong>Games > Add a Non-Steam Game</strong>.</li>
    <li>Select <strong>Microsoft Edge</strong> from the list.</li>
    <li>Right-click Edge in your Steam Library → <strong>Properties</strong>.</li>
    <li>In the Launch Options field, add:<br>
      <code>--window-size=1280,800 --kiosk https://www.xbox.com/play</code>
    </li>
    <li>This will launch xCloud directly in full-screen mode.</li>
  </ol>

  <h3>Step 4: Enable Steam Input for Controller Support</h3>
  <ol>
    <li>While still in Steam’s desktop client, right-click Edge > <strong>Properties</strong>.</li>
    <li>Under <strong>Controller</strong>, choose <strong>Enable Steam Input</strong>.</li>
    <li>This ensures the Deck’s built-in controls work as an Xbox controller in Edge.</li>
  </ol>

  <h3>Step 5: Launch xCloud from Gaming Mode</h3>
  <ol>
    <li>Return to Gaming Mode from the desktop.</li>
    <li>Launch Edge from your Steam Library.</li>
    <li>Log into your Microsoft account at <a href="https://www.xbox.com/play" target="_blank">xbox.com/play</a>.</li>
    <li>Start streaming any supported Game Pass title.</li>
  </ol>

  <h3>Optional: Customize Artwork</h3>
  <ul>
    <li>Use tools like <a href="https://www.steamgriddb.com" target="_blank">SteamGridDB</a> to apply Xbox-themed artwork to the Edge launcher.</li>
    <li>Or install <a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank">Decky Loader</a> to manage assets more easily.</li>
  </ul>

  <h3>Troubleshooting</h3>
  <ul>
    <li><strong>No controller input:</strong> Double-check that Steam Input is enabled for Edge.</li>
    <li><strong>Edge opens to home page:</strong> Recheck your launch options in Steam.</li>
    <li><strong>Streaming quality issues:</strong> Ensure both devices use 5GHz Wi-Fi or Ethernet. Reduce other network traffic.</li>
  </ul>

  <h3>Conclusion</h3>
  <p>With this setup, your Steam Deck becomes a cloud-based Xbox — letting you play console-quality games without using any internal storage. It's a great option for Game Pass users or anyone wanting quick access to Xbox titles from anywhere.</p>