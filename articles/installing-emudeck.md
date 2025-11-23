---
title: "Installing EmuDeck on Steam Deck"
summary: "Complete setup guide for EmuDeck on the Steam Deck, including configuration tips and troubleshooting."
image: "/images/No-Image.png"
categories: "Steam Deck,Emulation,EmuDeck,Setup"
author: "Unfinished"
---

<h2>Introduction</h2>
  <p>EmuDeck is a powerful script that configures emulators and tools on your Steam Deck, making it simple to play retro and modern console games. This guide walks you through a clean installation from Desktop Mode with tips and troubleshooting along the way.</p>

  <h2>Requirements</h2>
  <ul>
    <li>A Steam Deck with internet access</li>
    <li>A keyboard or access to the on-screen keyboard (press X to bring it up)</li>
    <li>At least 10GB of free space</li>
  </ul>

  <h2>Step 1: Switch to Desktop Mode</h2>
  <ol>
    <li>Hold the <strong>Power</strong> button and select <em>Switch to Desktop</em>.</li>
    <li>Wait for the KDE Plasma desktop environment to load.</li>
  </ol>

  <h2>Step 2: Download the EmuDeck Installer</h2>
  <ol>
    <li>Open a web browser (like Firefox).</li>
    <li>Go to <a href="https://www.emudeck.com" target="_blank">https://www.emudeck.com</a>.</li>
    <li>Click the <strong>Download</strong> button and save the installer script.</li>
    <li>Once downloaded, open the <strong>Dolphin File Manager</strong> and go to your Downloads folder.</li>
    <li>Double-click the EmuDeck desktop file and choose <strong>Execute</strong>.</li>
  </ol>

  <h2>Step 3: Run the Setup Wizard</h2>
  <ol>
    <li>The wizard will launch and ask where to install: <strong>Internal</strong> or <strong>SD Card</strong>.</li>
    <li>Choose based on your available space and performance preference (internal is faster).</li>
    <li>Follow the prompts to install emulators like RetroArch, Yuzu, DuckStation, and more.</li>
    <li>Once finished, you will see an <strong>Emulation</strong> folder created in your home or SD directory.</li>
  </ol>

  <h2>Optional Setup: BIOS and ROMs</h2>
  <ul>
    <li>Place your ROMs in the appropriate subfolders under <code>Emulation/roms/</code>.</li>
    <li>BIOS files should go in the <code>Emulation/bios</code> folder.</li>
    <li>Each system folder includes a <code>readme.txt</code> listing required formats and files.</li>
  </ul>

  <h2>Step 4: Steam ROM Manager</h2>
  <p>After installation, you'll be prompted to run <strong>Steam ROM Manager</strong> (SRM). This tool lets you add your games and emulators to Steam for access in Game Mode.</p>
  <ol>
    <li>Close Steam when prompted.</li>
    <li>Enable the parsers you want (e.g., ES-DE, RetroArch, Yuzu).</li>
    <li>Click <strong>Preview</strong> then <strong>Save to Steam</strong>.</li>
    <li>Wait for the process to complete. Your games will now appear in Game Mode under <em>Non-Steam Games</em>.</li>
  </ol>

  <h2>Tips & Tricks</h2>
  <ul>
    <li>Update EmuDeck regularly from Desktop Mode to get new emulator versions.</li>
    <li>Use the <strong>EmuDeck compressor</strong> to save storage on large ROM sets.</li>
    <li>Place older or smaller games on the SD card to save internal drive space.</li>
    <li>Use <strong>RetroAchievements</strong> for supported classic games by signing in to your account inside RetroArch.</li>
  </ul>

  <h2>Troubleshooting</h2>
  <ul>
    <li><strong>Games not appearing in Steam:</strong> Run Steam ROM Manager again and make sure you click Save to Steam.</li>
    <li><strong>Controller not working:</strong> Check controller mappings inside each emulator.</li>
    <li><strong>Missing BIOS warning:</strong> Make sure BIOS files are in the correct folder and are named exactly as required.</li>
    <li><strong>Yuzu won't launch:</strong> Make sure you've added prod.keys and firmware correctly to the <code>keys</code> and <code>firmware</code> folders.</li>
  </ul>

  <h2>Conclusion</h2>
  <p>EmuDeck turns your Steam Deck into a retro powerhouse with support for a wide range of consoles and tools. It automates the tedious parts of emulator configuration and offers a solid frontend for launching games from Game Mode. Spend time organizing your library and enjoy a seamless emulation experience from one handheld device.</p>