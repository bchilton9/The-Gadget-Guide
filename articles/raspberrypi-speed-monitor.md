---
title: "Use Raspberry Pi as a Network-Wide Speed Monitor"
summary: "Set up your Raspberry Pi to monitor internet speed and log results over time using Speedtest and Grafana."
image: "/images/No-Image.png"
categories: "Home Lab, Monitoring, Networking, Raspberry Pi"
author: "Unfinished"
---

<h2>Overview</h2>
<p>This guide will show you how to use a Raspberry Pi to automatically monitor and log your internet speed using Speedtest CLI, InfluxDB, and Grafana. You&rsquo;ll get a full visual dashboard of your ISP&rsquo;s performance over time.</p>

<h2>Requirements</h2>
<ul>
  <li>Raspberry Pi 3 or newer (Pi 4 recommended)</li>
  <li>Raspberry Pi OS (Lite or Desktop)</li>
  <li>microSD card (16GB+)</li>
  <li>Internet connection</li>
</ul>

<h2>Step 1: Update the System</h2>
<pre><code>sudo apt update && sudo apt upgrade -y</code></pre>

<h2>Step 2: Install Speedtest CLI</h2>
<pre><code>sudo apt install speedtest-cli</code></pre>

<h2>Step 3: Set Up InfluxDB</h2>
<pre><code>
sudo apt install influxdb
sudo systemctl enable influxdb
sudo systemctl start influxdb
</code></pre>
<p>Create a database:</p>
<pre><code>
influx
CREATE DATABASE speedtest
</code></pre>

<h2>Step 4: Write a Python Script</h2>
<pre><code>
pip3 install influxdb
nano speedtest_logger.py
</code></pre>
<p>Sample Python snippet:</p>
<pre><code>
import speedtest
from influxdb import InfluxDBClient
from datetime import datetime

s = speedtest.Speedtest()
s.get_best_server()
download = s.download() / 1_000_000
upload = s.upload() / 1_000_000
ping = s.results.ping

client = InfluxDBClient(host=&apos;localhost&apos;, port=8086)
client.switch_database(&apos;speedtest&apos;)

data = [{
    &quot;measurement&quot;: &quot;internet_speed&quot;,
    &quot;fields&quot;: {
        &quot;download&quot;: download,
        &quot;upload&quot;: upload,
        &quot;ping&quot;: ping
    }
}]
client.write_points(data)
</code></pre>

<h2>Step 5: Schedule with Cron</h2>
<pre><code>crontab -e</code></pre>
<p>Add the line:</p>
<pre><code>*/30 * * * * /usr/bin/python3 /home/pi/speedtest_logger.py</code></pre>

<h2>Step 6: Install Grafana</h2>
<pre><code>
sudo apt install -y apt-transport-https software-properties-common
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
echo &quot;deb https://packages.grafana.com/oss/deb stable main&quot; | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
</code></pre>

<p>Access Grafana at <a href=&quot;http://raspberrypi.local:3000&quot; target=&quot;_blank&quot;>http://raspberrypi.local:3000</a>. Default login is <code>admin / admin</code>.</p>

<h2>Step 7: Create a Dashboard</h2>
<ol>
  <li>Add a new InfluxDB data source pointing to your local database.</li>
  <li>Create a dashboard to show download, upload, and ping over time.</li>
  <li>Use line graphs and set time ranges to “Last 24 hours”, “7 days”, etc.</li>
</ol>

<h2>Conclusion</h2>
<p>This setup gives you a reliable, always-on internet speed monitoring system that logs everything visually. It&rsquo;s ideal for diagnosing ISP issues, logging downtime, or just seeing how consistent your connection really is.</p>