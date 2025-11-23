---
title: "How to Enable Performance Overlays on Steam Deck"
summary: "Monitor real-time FPS, temperatures, and system performance using SteamOS overlays and MangoHUD on your Steam Deck."
image: "/images/No-Image.png"
categories: "Monitoring, Performance, Steam Deck"
author: "Unfinished"
---

<h2>How to Enable Performance Overlays on Steam Deck</h2>

  <p>Want to see your framerate, GPU usage, and system temperatures while playing games? Steam Deck has built-in tools that allow you to monitor real-time performance without installing anything extra. You can also use advanced options like MangoHUD if you prefer more detail.</p>

  <h3>Option 1: SteamOS Built-in Performance Overlay</h3>

  <h4>Step-by-Step:</h4>
  <ol>
    <li>While in a game, press the <strong>Quick Access Menu</strong> button (the “...” button on the right).</li>
    <li>Scroll down to the <strong>Battery icon</strong> tab (Performance).</li>
    <li>Find the option labeled <strong>Performance Overlay Level</strong>.</li>
    <li>Use the slider (0–4) to choose how much detail to show:</li>
  </ol>

  <ul>
    <li><strong>Level 0</strong>: Overlay Off</li>
    <li><strong>Level 1</strong>: FPS counter only</li>
    <li><strong>Level 2</strong>: FPS + GPU/CPU info</li>
    <li><strong>Level 3</strong>: More detailed stats (temps, RAM, etc.)</li>
    <li><strong>Level 4</strong>: Full diagnostic overlay (large, detailed)</li>
  </ul>

  <p>You can change this level on the fly for any game. The setting persists between games until changed.</p>

  <h3>Option 2: MangoHUD (Advanced Overlay for Linux)</h3>

  <p>For more control over how your performance data is displayed, MangoHUD is a powerful Linux-based overlay used by enthusiasts.</p>

  <h4>Installing MangoHUD:</h4>
  <ol>
    <li>Switch to <strong>Desktop Mode</strong> on your Steam Deck.</li>
    <li>Open the <strong>Discover Store</strong>.</li>
    <li>Search for and install <strong>MangoHUD</strong>.</li>
  </ol>

  <p>Once installed, you can enable MangoHUD by launching a game with special launch options.</p>

  <h4>To Use MangoHUD in Steam Games:</h4>
  <ol>
    <li>Right-click the game in your Steam Library (in Desktop Mode).</li>
    <li>Choose <strong>Properties</strong>.</li>
    <li>Under <strong>Launch Options</strong>, type: <code>mangohud %command%</code></li>
  </ol>

  <p>When you launch the game, MangoHUD will appear with a detailed overlay including:</p>
  <ul>
    <li>FPS</li>
    <li>CPU and GPU usage</li>
    <li>Temperatures</li>
    <li>RAM and VRAM usage</li>
    <li>Frame timing graphs</li>
  </ul>

  <h4>Customizing MangoHUD:</h4>
  <p>You can configure MangoHUD with a <code>~/.config/MangoHud/MangoHud.conf</code> file. Advanced users can customize fonts, colors, graph behavior, and more. Visit the <a href="https://github.com/flightlessmango/MangoHud" target="_blank">official GitHub</a> for documentation.</p>

  <h3>Which Should You Use?</h3>
  <ul>
    <li><strong>Built-in overlay</strong> is easy and perfect for casual users</li>
    <li><strong>MangoHUD</strong> is ideal for tinkerers and power users</li>
  </ul>

  <h3>Conclusion</h3>
  <p>Monitoring performance can help you diagnose stutters, check thermal throttling, or fine-tune your game settings. Whether you want a simple FPS counter or full diagnostics, Steam Deck has you covered.</p>