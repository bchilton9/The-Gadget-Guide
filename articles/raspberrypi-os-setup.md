---
title: "How to Set Up Raspberry Pi OS on a New Pi"
summary: "Beginner-friendly guide to installing Raspberry Pi OS and getting your Pi up and running in under 30 minutes."
image: "/images/No-Image.png"
categories: "Beginner Guides, Operating Systems, Raspberry Pi, Setup"
author: "Unfinished"
---

<h2>How to Set Up Raspberry Pi OS on a New Pi</h2>

  <p>Whether you&apos;re using a Raspberry Pi 4, 400, or the new Pi 5, this guide will walk you through downloading, flashing, and configuring Raspberry Pi OS — the official operating system — in under 30 minutes.</p>

  <h3>&#128736; What You’ll Need</h3>
  <ul>
    <li>Raspberry Pi board (Pi 4, 400, or 5 recommended)</li>
    <li>microSD card (16GB or larger, Class 10 or U1 recommended)</li>
    <li>microSD card reader</li>
    <li>Computer with internet access</li>
    <li>HDMI cable and monitor</li>
    <li>Keyboard and mouse</li>
    <li>Power supply (USB-C, 5V 3A for Pi 4/5)</li>
  </ul>

  <h3>Step 1: Download Raspberry Pi Imager</h3>
  <p>Head to the official Raspberry Pi website and download the <a href="https://www.raspberrypi.com/software/" target="_blank">Raspberry Pi Imager</a> for your system (Windows, macOS, or Linux).</p>

  <p>Once installed, launch the Imager tool.</p>

  <h3>Step 2: Prepare the microSD Card</h3>
  <ol>
    <li>Insert your microSD card into your computer using the card reader.</li>
    <li>In Raspberry Pi Imager, click <strong>Choose OS</strong> and select <em>Raspberry Pi OS (64-bit)</em>.</li>
    <li>Click <strong>Choose Storage</strong> and select your SD card.</li>
    <li>(Optional) Click the gear icon in the bottom right to pre-configure Wi-Fi, enable SSH, and set username/password.</li>
    <li>Click <strong>Write</strong> to flash the OS to the card.</li>
  </ol>

  <h3>Step 3: Boot the Pi for the First Time</h3>
  <ol>
    <li>Remove the card from your computer and insert it into the Raspberry Pi.</li>
    <li>Connect HDMI, keyboard, mouse, and finally power it on.</li>
    <li>The Pi will boot into the Raspberry Pi OS welcome screen.</li>
  </ol>

  <h3>Step 4: Complete the Initial Setup</h3>
  <ul>
    <li>Select your language, timezone, and keyboard layout</li>
    <li>Connect to Wi-Fi (if not pre-configured)</li>
    <li>Set a password for the default user</li>
    <li>Install system updates when prompted</li>
  </ul>

  <p>Once this is complete, you&apos;ll land on the Raspberry Pi desktop — you&apos;re ready to start using your Pi!</p>

  <h3>Tips</h3>
  <ul>
    <li>Keep the system updated regularly: <code>sudo apt update && sudo apt upgrade</code></li>
    <li>Use the <strong>Raspberry Pi Configuration</strong> tool under Preferences for advanced settings like SSH, interfaces, and overclocking.</li>
    <li>Want a headless setup? You can pre-enable SSH and Wi-Fi from the Imager&apos;s advanced settings.</li>
  </ul>

  <h3>Conclusion</h3>
  <p>Setting up a Raspberry Pi is easier than ever thanks to the Raspberry Pi Imager. In just a few minutes, you&apos;ll be running a full Linux desktop and ready to explore hundreds of projects, from coding to smart home automation.</p>