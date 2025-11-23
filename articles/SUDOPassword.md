---
title: "SUDO Password"
summary: "The SUDO password is the super user password. Similar to the Administrator account on Windows. It is needed to install anything that uses or changes the secure part of the system."
image: "/images/IMG_1290.png"
categories: "Gaming, Steam Deck"
author: "Byron"
---

<h2>SUDO Password</h2>
<p>The <strong>SUDO password</strong> is the superuser password, similar to the Administrator account on Windows. It is required to install or modify system-level files and settings.</p>
<p>You can choose any password you'll remember. If you're not worried about security, a simple password like <code>1234</code> is fine. However, for better security, it's recommended to use a strong, complex password.</p>

<hr>

<h3>How to Set the SUDO Password</h3>
<ol>
  <li><strong>Enter Desktop Mode</strong> on your Steam Deck.</li>
  <li>Open <strong>Konsole</strong> — the command-line utility.</li>
</ol>
<p>Konsole allows you to manage your system using text-based commands.</p>
<p>To launch Konsole:</p>
<ul>
  <li>Press the <strong>Menu</strong> button (start menu).</li>
  <li>Go to <strong>System</strong> and select <strong>Konsole</strong>.</li>
</ul>
<p>If needed, press the <strong>X button</strong> on your Steam Deck to open the keyboard.</p>

<h4>Step 1: Set the SUDO Password</h4>
<p>In Konsole, type the following command:</p>
<pre><code>passwd</code></pre>
<p>You’ll be prompted to enter your new password and confirm it. (Note: nothing will appear as you type — this is normal.) After confirming, your SUDO password is set.</p>

<p><img src="/images/IMG_1289.png" alt="Konsole terminal interface" style="max-width:100%; height:auto;"></p>

<h4>Step 2: Changing the Password Later</h4>
<p>To change your SUDO password, repeat the same steps. This time, you'll be asked to enter your <strong>current password</strong> before setting a new one.</p>

<p><img src="/images/IMG_1290.png" alt="SUDO password terminal confirmation" style="max-width:100%; height:auto;"></p>

<h4>Important Reminder</h4>
<p><strong>Don’t forget your SUDO password!</strong> If you lose it, you’ll have to either reset your Steam Deck to factory settings or follow a complex recovery process using a bootable USB drive and recovery mode.</p>