---
title: "Stream Audio to Multiple Devices with Raspberry Pi and Snapcast"
summary: "Create a synchronized multi-room audio system using Raspberry Pi and Snapcast."
image: "/images/No-Image.png"
categories: "Raspberry Pi,Audio,Streaming,Networking"
author: "Unfinished"
---

<h2>Introduction</h2>
<p>If you want synchronized music playing across multiple speakers in your home, Snapcast with Raspberry Pi is a fantastic open-source solution. This guide explains how to set up Snapcast server and clients to stream audio over your home network.</p>

<h2>What You Need</h2>
<ul>
  <li>1 Raspberry Pi as the Snapserver (Pi 3 or newer recommended)</li>
  <li>1 or more Raspberry Pi devices (or any Linux device) as Snapclients</li>
  <li>Speakers or 3.5mm/USB audio output for each client</li>
  <li>Local network access</li>
</ul>

<h2>Step 1: Install Mopidy (Audio Source)</h2>
<pre><code>
sudo apt update
sudo apt install mopidy
</code></pre>
<p>Mopidy acts as a music source and can stream from Spotify, local files, radio stations, and more. Configure it as needed at <code>/etc/mopidy/mopidy.conf</code>.</p>

<h2>Step 2: Install Snapserver on Main Pi</h2>
<pre><code>
sudo apt install snapcast
</code></pre>
<p>Start the Snapserver:</p>
<pre><code>
sudo systemctl enable snapserver
sudo systemctl start snapserver
</code></pre>
<p>Edit the config file at <code>/etc/snapserver.conf</code> to use Mopidy's stream output:</p>
<pre><code>
[stream]
source = pipe:///tmp/snapfifo?name=Mopidy
</code></pre>

<h2>Step 3: Configure Mopidy to Output to Snapcast</h2>
<p>Modify Mopidy's config to send audio to Snapcast using a named pipe:</p>
<pre><code>
[audio]
output = audioresample ! audioconvert ! audio/x-raw,channels=2,rate=44100 ! wavenc ! filesink location=/tmp/snapfifo
</code></pre>

<h2>Step 4: Install Snapclient on Each Device</h2>
<p>On each client device (another Raspberry Pi, Linux laptop, etc.):</p>
<pre><code>
sudo apt install snapclient
</code></pre>
<p>Start the client:</p>
<pre><code>
sudo systemctl enable snapclient
sudo systemctl start snapclient
</code></pre>
<p>The client will automatically connect to the Snapserver and begin playing synchronized audio.</p>

<h2>Optional: Web UI for Control</h2>
<p>You can add a Snapcast-compatible front-end like <a href="https://github.com/badaix/snapcast" target="_blank">Snapcast Web UI</a> or use mobile apps such as Snapclient Remote to control volume and sync.</p>

<h2>Conclusion</h2>
<p>With Snapcast and Raspberry Pi, you can build a cost-effective whole-home audio system. It supports synchronized playback, individual client volume control, and can be integrated with smart home systems or voice assistants for a seamless experience.</p>