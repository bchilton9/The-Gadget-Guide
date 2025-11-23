---
title: "Enable Docker and Portainer in OpenMediaVault"
summary: "Learn how to run Docker containers and manage them easily through the Portainer interface in OMV."
image: "/images/No-Image.png"
categories: "OpenMediaVault,Docker,Portainer,Raspberry Pi,Self-Hosting"
author: "Unfinished"
---

<h2>Introduction</h2>
  <p>Docker is a powerful containerization platform, and OpenMediaVault (OMV) makes it easy to integrate Docker to run apps like Nextcloud, Plex, and more. With Portainer, you can manage these containers from a web interface — no command-line required.</p>

  <h2>Why Use Docker on OMV?</h2>
  <ul>
    <li>Run isolated apps in containers</li>
    <li>Lightweight resource usage</li>
    <li>Easy updates and rollbacks</li>
    <li>Broad ecosystem of apps</li>
  </ul>

  <h2>Step 1: Update and Upgrade OMV</h2>
  <p>Before installing anything, ensure OMV is fully updated. From the web UI:</p>
  <ul>
    <li>Go to <strong>System &gt; Update Management</strong></li>
    <li>Check for updates and apply them</li>
  </ul>

  <h2>Step 2: Install OMV-Extras Plugin</h2>
  <p>OMV-Extras unlocks many additional features, including Docker and Portainer.</p>
  <ol>
    <li>Go to <strong>Plugins</strong></li>
    <li>Search for <code>openmediavault-omvextrasorg</code></li>
    <li>Install the plugin and refresh the page after it completes</li>
  </ol>

  <h2>Step 3: Enable Docker and Portainer</h2>
  <p>After OMV-Extras is installed:</p>
  <ol>
    <li>Go to <strong>OMV-Extras</strong> in the sidebar</li>
    <li>Scroll down to the Docker section</li>
    <li>Click <strong>Install Docker</strong></li>
    <li>After it finishes, click <strong>Install Portainer</strong></li>
  </ol>

  <p>Docker and Portainer services will now be installed and running in the background.</p>

  <h2>Step 4: Access Portainer</h2>
  <p>Open your browser and go to:</p>
  <pre>http://[OMV-IP]:9000</pre>
  <p>You'll be prompted to set an admin password the first time you log in.</p>

  <h2>Step 5: Using Portainer</h2>
  <ul>
    <li><strong>Containers:</strong> View and manage running apps</li>
    <li><strong>Images:</strong> Pull Docker images like <code>nginx</code>, <code>nextcloud</code>, <code>homeassistant</code></li>
    <li><strong>Volumes:</strong> Mount persistent data directories</li>
  </ul>

  <p>To deploy a new container, click <strong>Stacks</strong> &gt; <strong>Add Stack</strong> and paste in a Docker Compose file. You can find ready-to-use stacks online for apps like Jellyfin, Bitwarden, and Pi-hole.</p>

  <h2>Step 6: Manage Docker from the CLI (Optional)</h2>
  <p>If you SSH into OMV, you can use regular Docker commands:</p>
  <pre>docker ps<br>docker run hello-world<br>docker-compose up -d</pre>

  <h2>Tips</h2>
  <ul>
    <li>Always map container volumes to an external data drive</li>
    <li>Use docker-compose for advanced setups</li>
    <li>Regularly back up your stacks and volumes</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Running Docker and Portainer on OpenMediaVault opens the door to self-hosting powerful apps with minimal setup. It's a great way to get the most out of your home server or Raspberry Pi.</p>