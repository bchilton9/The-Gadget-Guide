---
title: "Automated Backups with Duplicati"
summary: "Learn how to set up automated encrypted backups using Duplicati on any system."
image: "/images/No-Image.png"
categories: "Backup,Duplicati,Automation,Security"
author: "Unfinished"
---

<h2>Introduction</h2>
  <p>Duplicati is a powerful, open-source backup tool that supports automatic encrypted backups to local drives, NAS, or cloud storage. It's ideal for home users, IT professionals, and self-hosters looking to protect important data with scheduled backups and versioning.</p>

  <h2>Why Duplicati?</h2>
  <ul>
    <li>Free and open-source</li>
    <li>Cross-platform (Windows, Linux, macOS)</li>
    <li>Supports encryption, compression, and deduplication</li>
    <li>Back up to local drives, network shares, or cloud providers</li>
    <li>Web-based UI and CLI support</li>
  </ul>

  <h2>Installation</h2>
  <p>Go to the official site: <a href="https://duplicati.com" target="_blank">https://duplicati.com</a> and download the installer for your OS.</p>
  <ul>
    <li><strong>Windows:</strong> Standard EXE installer</li>
    <li><strong>Linux:</strong> DEB or RPM package, or install via Docker</li>
    <li><strong>macOS:</strong> DMG installer</li>
  </ul>

  <h2>Initial Setup</h2>
  <ol>
    <li>Once installed, open Duplicati (usually runs at <code>http://localhost:8200</code>).</li>
    <li>Click <strong>Add Backup</strong>.</li>
    <li>Select <strong>Configure a new backup</strong>.</li>
    <li>Give it a name and optionally set a strong backup encryption password.</li>
  </ol>

  <h2>Choose Storage</h2>
  <p>Duplicati supports:</p>
  <ul>
    <li>Local folders or external drives</li>
    <li>Remote servers via FTP, SFTP, or WebDAV</li>
    <li>Cloud services like OneDrive, Google Drive, Dropbox, Amazon S3, Backblaze B2</li>
  </ul>

  <p>Choose your destination and authenticate as needed.</p>

  <h2>Select Backup Source</h2>
  <p>Pick which folders or files to back up. You can also exclude hidden folders, system files, or use filters.</p>

  <h2>Schedule & Retention</h2>
  <ul>
    <li>Set up a recurring schedule (e.g., daily at 2AM).</li>
    <li>Configure retention policy (keep backups for 3 months, then delete old versions).</li>
  </ul>

  <h2>Tips & Tricks</h2>
  <ul>
    <li><strong>Use strong encryption:</strong> Always set an encryption password for remote backups.</li>
    <li><strong>Use test restores:</strong> Periodically test restore files to verify your backups work.</li>
    <li><strong>Use remote logging:</strong> Send backup reports via email or syslog.</li>
    <li><strong>Docker option:</strong> Use Duplicati in Docker to isolate backups on a NAS or Pi.</li>
  </ul>

  <h2>Troubleshooting</h2>
  <ul>
    <li><strong>Access denied?</strong> Make sure Duplicati has permissions for all files/folders selected.</li>
    <li><strong>Backups failing?</strong> Check the log tab and error messages for missing destinations or bad credentials.</li>
    <li><strong>Web UI won’t load?</strong> Try restarting the Duplicati service or reboot your machine.</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Duplicati is an excellent solution for automatic, encrypted backups with a user-friendly interface and wide cloud storage compatibility. With proper setup and monitoring, it can protect your most important files against data loss, hardware failure, or ransomware.</p>