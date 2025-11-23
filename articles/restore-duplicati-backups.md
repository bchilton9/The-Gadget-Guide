---
title: "Restoring Files with Duplicati"
summary: "Learn how to safely and efficiently restore files from Duplicati backups."
image: "/images/No-Image.png"
categories: "Backup,Duplicati,Restore,Security"
author: "Unfinished"
---

<h2>Introduction</h2>
  <p>Creating backups is only half the battle—being able to restore data when disaster strikes is the true test of any backup system. This guide walks you through the process of restoring files using Duplicati, whether it's a single file or an entire backup set.</p>

  <h2>When to Restore</h2>
  <ul>
    <li>Accidentally deleted or modified a file</li>
    <li>Ransomware or malware infection</li>
    <li>Hardware failure or OS corruption</li>
    <li>Need to retrieve earlier versions of a document</li>
  </ul>

  <h2>Access the Restore Panel</h2>
  <ol>
    <li>Open Duplicati (<code>http://localhost:8200</code> by default).</li>
    <li>From the left menu, select <strong>Restore</strong>.</li>
    <li>You'll be given two options: restore from a configuration or from an imported backup set.</li>
  </ol>

  <h3>Option 1: Restore from a Configured Backup</h3>
  <p>If you're restoring from a backup already set up in Duplicati:</p>
  <ol>
    <li>Select the backup job from the list.</li>
    <li>Choose <strong>Restore files</strong>.</li>
    <li>Select the desired backup version using the date picker.</li>
    <li>Browse the file tree or use search to find the file(s) or folder(s) to restore.</li>
    <li>Click <strong>Continue</strong>.</li>
    <li>Choose the restore destination—either the original location or a new folder.</li>
    <li>Click <strong>Restore</strong> and monitor progress.</li>
  </ol>

  <h3>Option 2: Restore from Another Machine or Location</h3>
  <p>If the original configuration is gone (e.g., fresh install or new system):</p>
  <ol>
    <li>Click <strong>Restore from configuration</strong>.</li>
    <li>Manually enter the path or cloud credentials where the backup is stored.</li>
    <li>Enter the encryption passphrase used during backup.</li>
    <li>Once connected, select files and proceed like normal.</li>
  </ol>

  <h2>Advanced Options</h2>
  <ul>
    <li><strong>Restore with filters:</strong> Include/exclude certain file types.</li>
    <li><strong>Restore from command line:</strong> Use the <code>Duplicati.CommandLine.exe</code> tool for scripted restores.</li>
    <li><strong>Restore specific versions:</strong> Each backup snapshot can be browsed and restored independently.</li>
  </ul>

  <h2>Troubleshooting</h2>
  <ul>
    <li><strong>Can't decrypt backup:</strong> Double-check your encryption password and character case.</li>
    <li><strong>Missing files:</strong> Make sure you selected the correct backup version date.</li>
    <li><strong>Cloud restore failed:</strong> Re-check API credentials or token expiration.</li>
    <li><strong>Restore speed is slow:</strong> This may depend on storage provider bandwidth and encryption/decryption time.</li>
  </ul>

  <h2>Tips & Best Practices</h2>
  <ul>
    <li>Regularly test restores to ensure your backup is usable.</li>
    <li>Restore to a separate folder when testing to avoid overwriting current files.</li>
    <li>Enable versioning during backup to keep access to old file states.</li>
    <li>Use the Duplicati tray icon to easily check on restore status in the background.</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Duplicati makes restoring data straightforward, whether you're recovering a single file or restoring a full system. With encryption, remote access, and flexible destination options, it's a reliable solution for data recovery across a variety of use cases. Make sure to test your restores periodically to ensure you're truly protected.</p>