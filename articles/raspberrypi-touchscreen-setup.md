---
title: "Add a Touchscreen Display to Your Raspberry Pi"
summary: "Learn how to connect and configure a touchscreen display for your Raspberry Pi."
image: "/images/No-Image.png"
categories: "Raspberry Pi,Display,Hardware,DIY"
author: "Unfinished"
---

<h2>Introduction</h2>
  <p>Want to create a smart mirror, portable computer, or kiosk display? Adding a touchscreen to your Raspberry Pi opens up a range of interactive projects. This guide walks through connecting a touchscreen, installing drivers, calibrating it, and customizing the display experience.</p>

  <h2>Recommended Touchscreens</h2>
  <ul>
    <li>Official Raspberry Pi 7" Touch Display (DSI)</li>
    <li>Waveshare 5" or 7" HDMI Touchscreens</li>
    <li>Elecrow and Kuman budget touch displays</li>
  </ul>
  <p>Most displays connect via HDMI for video and USB for touch input. The official display uses the DSI interface and GPIO pins for power.</p>

  <h2>Step 1: Connect the Display</h2>
  <p>Depending on the model:</p>
  <ul>
    <li><strong>HDMI Models:</strong> Connect HDMI to Pi, USB to Pi for touch.</li>
    <li><strong>DSI Models:</strong> Connect ribbon cable to DSI port, and power via GPIO or USB.</li>
  </ul>
  <p>Power on your Pi and check if the display turns on. If not, verify connections and try a different HDMI port or power source.</p>

  <h2>Step 2: Configure the Resolution</h2>
  <p>If your display doesn’t show the correct resolution or cuts off:</p>
  <pre><code>sudo nano /boot/config.txt</code></pre>
  <p>Uncomment or add the following lines for 800x480 (adjust to match your display):</p>
  <pre><code>hdmi_force_hotplug=1
hdmi_group=2
hdmi_mode=87
hdmi_cvt=800 480 60 6 0 0 0</code></pre>

  <h2>Step 3: Enable Touch Input</h2>
  <p>Most USB touchscreens work out of the box. If it doesn’t respond, run:</p>
  <pre><code>lsusb</code></pre>
  <p>And check if the device is listed. Some models (e.g., Waveshare) may require driver installation from their GitHub or support page.</p>

  <h2>Step 4: Calibrate Touchscreen</h2>
  <p>If your touch is misaligned or inverted:</p>
  <pre><code>sudo apt install xinput-calibrator -y
xinput_calibrator</code></pre>
  <p>Follow the on-screen instructions, then save the calibration data to:</p>
  <pre><code>/etc/X11/xorg.conf.d/99-calibration.conf</code></pre>

  <h2>Step 5: Rotate the Display (Optional)</h2>
  <p>To rotate the screen (e.g., for portrait mode):</p>
  <pre><code>sudo nano /boot/config.txt</code></pre>
  <p>Add one of the following:</p>
  <ul>
    <li><code>display_lcd_rotate=1</code> — 90°</li>
    <li><code>display_lcd_rotate=2</code> — 180°</li>
    <li><code>display_lcd_rotate=3</code> — 270°</li>
  </ul>
  <p>Or use <code>lcd_rotate</code> for the official screen if using DSI.</p>

  <h2>Step 6: Auto Launch Fullscreen App (Optional)</h2>
  <p>To create a dashboard, kiosk, or info panel, you can autostart a browser or app on boot:</p>
  <pre><code>nano ~/.config/lxsession/LXDE-pi/autostart</code></pre>
  <p>Add:</p>
  <pre><code>@chromium-browser --kiosk https://yourdashboard.com</code></pre>

  <h2>Tips</h2>
  <ul>
    <li>Use a virtual keyboard like <code>matchbox-keyboard</code> for touch-only control.</li>
    <li>Adjust brightness via <code>gpio</code> if supported by your screen.</li>
    <li>Use a case with a built-in touchscreen frame for portable projects.</li>
  </ul>

  <h2>Conclusion</h2>
  <p>You now have a functional touchscreen Raspberry Pi setup! Whether you're building a custom control panel or a portable tablet-style project, this guide sets you up with a responsive, interactive display.</p>