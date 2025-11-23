---
title: "Setting Up EmuDeck"
summary: "Setup and configure EmuDeck on your Steam Deck with ROMs, BIOS files, cloud services, and Steam library integration."
image: "/images/IMG_1301.png"
categories: "Gaming, Gaming Setup, Linux, Steam Deck, EmuDeck"
author: "Byron"
---

<h2>Setting up EmuDeck</h2>

<p>Don’t have EmuDeck installed? <a href="index.php#InstallingEmuDeck">Head over to the Installing EmuDeck guide.</a></p>

<p>First, you'll need some essential files to get emulators working:</p>
<ul>
  <li><strong>ROMs</strong> – the games</li>
  <li><strong>BIOS</strong> – system code required by some emulators</li>
  <li><strong>Prod Keys, Title Keys, Firmware</strong> – required for Switch emulation</li>
</ul>

<p><strong>Note:</strong> Yuzu has been taken down by Nintendo and is no longer maintained. EmuDeck still supports it if you already have the AppImage, but there will be no further updates.</p>

<p>We won’t cover how to obtain copyrighted files, only how to use them. If you're legally backing up your own content, there are ways to extract these files safely from your devices.</p>

<hr>

<h3>ROMs Location</h3>

<p>EmuDeck has a transfer tool, but manually copying is just as easy. ROMs will be stored in one of two locations depending on your installation:</p>

<h4>SD Card</h4>
<img src="/images/IMG_1294.png" alt="SD Card in Dolphin">
<p>In Dolphin file browser, your SD card appears at the bottom of the left panel. It will be labeled based on your card (e.g., <code>LX1TB</code>). Open the <strong>Emulation</strong> folder.</p>

<h4>Internal Storage</h4>
<img src="/images/IMG_1295.png" alt="Internal Storage in Dolphin">
<p>Go to the <strong>Home</strong> folder in Dolphin. You'll find an <strong>Emulation</strong> folder there.</p>

<h4>ROMs Folder</h4>
<img src="/images/IMG_1296.png" alt="ROM Folders">
<p>Inside the Emulation folder, open the <strong>roms</strong> folder. Each system has its own subfolder (e.g., <code>gba</code> for Game Boy Advance, <code>nes</code> for Nintendo Entertainment System).</p>
<ul>
  <li>Some systems have multiple folders (e.g., <code>genesis</code> and <code>genesiswide</code>)—pick the one that matches your preference.</li>
  <li>Folders with a small link icon (like <code>gc</code>) are symbolic links to other folders (e.g., <code>gamecube</code>).</li>
  <li>Each folder contains a <code>readme.txt</code> listing supported file types. Some support ZIP files, others do not.</li>
</ul>

<hr>

<h3>BIOS Files</h3>
<img src="/images/IMG_1297.png" alt="BIOS Folder">
<p>BIOS files are required for some systems and improve performance for others. You can use a RetroArch BIOS pack and place its contents in the <strong>bios</strong> folder.</p>

<img src="/images/IMG_1298.png" alt="Switch BIOS Notes">
<p><strong>Note:</strong> RetroArch BIOS packs don’t include Switch files. You’ll need:</p>
<ul>
  <li><code>prod.keys</code></li>
  <li><code>title.keys</code></li>
  <li>Firmware files</li>
</ul>

<img src="/images/IMG_1299.png" alt="Switch Emulator Folders">
<p>Place <code>prod.keys</code> and <code>title.keys</code> in the <code>keys</code> folder, and unzip firmware contents into the <code>firmware</code> folder for Yuzu or Ryujinx.</p>

<p><strong>Recommended:</strong> Use 17.0.0 keys/titles but 16.1.0 firmware due to performance issues with 17.0.0 firmware.</p>

<img src="/images/IMG_1300.png" alt="BIOS Checker">
<p>Once BIOS files are in place, open EmuDeck and run the BIOS checker. All required files should turn green if successful.</p>

<hr>

<h3>Adding Games to Game Mode</h3>
<img src="/images/IMG_1301.png" alt="Open EmuDeck">
<p>Launch EmuDeck from the desktop icon. There are many settings here, but we’ll start with <strong>Cloud Services</strong> because they require a Steam ROM Manager run afterwards.</p>

<h4>Cloud Services</h4>
<img src="/images/IMG_1302.png" alt="Cloud Services">
<p>This adds streaming services like Netflix to your Steam library. Click <strong>Manage Cloud Services</strong> → <strong>OK</strong>.</p>

<img src="/images/IMG_1303.png" alt="Streaming Services">
<p>Select your preferred services. These are web shortcuts launched in fullscreen for a native feel. Click <strong>OK</strong>.</p>

<h4>Remote Play Clients</h4>
<img src="/images/IMG_1304.png" alt="Remote Play Clients">
<p>Add remote play apps like <strong>Chiaki</strong> (for PS5). After selecting, click <strong>Start</strong> to install and return to the main menu.</p>

<h4>Browser Selection</h4>
<img src="/images/IMG_1305.png" alt="Browser Picker">
<p>Choose the browser used to launch streaming services. Click <strong>Change Settings</strong>, pick a browser, then <strong>OK</strong>.</p>

<p>Now click <strong>Quit</strong> and confirm. You’ll be prompted to run Steam ROM Manager.</p>

<hr>

<h3>Steam ROM Manager</h3>
<img src="/images/IMG_1306.png" alt="Steam ROM Manager">
<p>Steam ROM Manager will close Steam in the background. Click <strong>Yes</strong> to proceed. You may need to use L2/R2 or touchpads for interaction.</p>

<img src="/images/IMG_1307.png" alt="Parsers and Toggles">
<p>Parsers determine what’s added to your library. ES-DE and Pegasus are frontends; ES-DE is easier to use. Toggle on only what you need.</p>

<p><strong>Recommended:</strong></p>
<ul>
  <li>Large library → Turn on only ES-DE, Cloud Services, and Remote Play Clients</li>
  <li>Small library → Enable everything for full integration</li>
</ul>

<p>Enable <strong>Emulators</strong> only if you want direct access from Steam. Otherwise, manage them in Desktop Mode to keep your library clean.</p>

<p>Click <strong>Preview</strong> once done.</p>

<img src="/images/IMG_1308.png" alt="Artwork Preview">
<p>Artwork will now be downloaded. Use the arrows to browse and change artwork. The dropdown lets you pick different artwork types like logos or heroes.</p>

<p>Click <strong>Save to Steam</strong> when you're ready. A popup will confirm success. To remove games later, click <strong>Remove from Steam</strong> first.</p>

<img src="/images/IMG_1309.jpeg" alt="Game Mode Library">
<p>Return to Game Mode. Your games will appear under <strong>NON-STEAM</strong>, with categories based on parser. Categories are optional—removing them won’t delete the games.</p>

<hr>

<h3>Other Options in EmuDeck</h3>

<h4>Quick Settings</h4>
<img src="/images/No-Image.png" alt="Quick Settings">
<p>Change options like autosave and bezels easily.</p>
<hr>
<h4>Manage Emulators</h4>
<img src="/images/IMG_1311.png" alt="Manage Emulators">
<p>Install, uninstall, update, or reset emulators. Resetting config often fixes issues.</p>
<img src="/images/IMG_1312.png" alt="Reset Emulator">
<hr>
<h4>EmuDeck Store</h4>
<p>Install free homebrew games here.</p>
<hr>
<h4>Import Games and BIOS</h4>
<img src="/images/IMG_1313.png" alt="Import Tool">
<p>Transfer ROMs and BIOS from your PC using this tool.</p>
<hr>
<h4>Quick and Custom Reset</h4>
<img src="/images/IMG_1314.png" alt="Reset Options">
<p>Resets everything. Use this only if EmuDeck is broken or misconfigured.</p>
<hr>
<h4>Screen Resolution</h4>
<img src="/images/IMG_1315.png" alt="Resolution Settings">
<p>Change the resolution for each emulator. I recommend 1080p as a starting point.</p>
<hr>
<h4>Retro Achievements</h4>
<img src="/images/IMG_1316.png" alt="Retro Achievements">
<p>Add achievements to classic games! Requires a free account and login.</p>
<hr>
<h4>EmuDeck Compressor</h4>
<img src="/images/IMG_1317.png" alt="Compressor Tool">
<p>Reduces ROM sizes to save space.</p>
<hr>
<h4>Cloud Saves</h4>
<img src="/images/IMG_1318.png" alt="Cloud Saves">
<p>Backs up save files to cloud storage (Early Access feature, not free).</p>
<hr>
<h4>Migrate Installation</h4>
<img src="/images/IMG_1319.png" alt="Migration Tool">
<p>Move ROMs between SD card and internal storage. Re-run Steam ROM Manager after migration.</p>
<hr>
<h4>EmuDecky (Decky Loader Plugin)</h4>
<img src="/images/IMG_1320.png" alt="EmuDecky Plugin">
<p>Adds quick EmuDeck shortcuts via Decky Loader. Requires a SUDO password.</p>
<hr>
<h4>Gyroscope</h4>
<img src="/images/IMG_1321.png" alt="Gyro Plugin">
<p>Enables gyro controls in supported emulators. Requires a SUDO password.</p>
<hr>
<h4>Powertools</h4>
<img src="/images/IMG_1322.png" alt="Powertools Plugin">
<p>Fine-tune Steam Deck performance. Another Decky plugin. Requires a SUDO password.</p>