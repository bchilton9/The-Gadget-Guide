---
title: "Radarr"
summary: "Radarr is an automated movie management tool that tracks movies you want, searches for releases,
downloads them via your download client, renames them, and moves them into your movie library.
It integrates with Plex, Jellyfin, and Emby."
image: "/images/IMG_1328.png"
categories: "Beginner Guides, Hardware, Linux, Operating Systems, Setup, radarr, Upgrades"
author: "Byron"
---

<article class="guide">

<h1>Complete Guide to Using Radarr</h1>

<p>Radarr is an automated movie management tool that tracks movies you want, searches for releases,
downloads them via your download client, renames them, and moves them into your movie library.
It integrates with Plex, Jellyfin, and Emby.</p>

<hr>

<h2>What Radarr Does</h2>

<ul>
<li>Tracks movies you want</li>
<li>Monitors for new releases</li>
<li>Talks to torrent or Usenet download clients</li>
<li>Renames and organizes files</li>
<li>Upgrades quality automatically</li>
</ul>

<hr>

<h2>Main Interface Overview</h2>

<h3>Movies</h3>
<p>Displays your entire movie library including poster, quality, monitored state, and status.</p>

<h3>Calendar</h3>
<p>Shows upcoming theatrical, digital, and physical releases.</p>

<h3>Activity</h3>
<p>Shows active downloads, queue status, and history.</p>

<h3>Wanted</h3>
<p>Displays missing movies and movies that do not meet quality cutoff.</p>

<h3>Settings</h3>
<p>Where all configuration happens (media management, indexers, download clients, profiles).</p>

<hr>

<h2>How to Add a Movie</h2>

<ol>
<li>Click <strong>Add Movie</strong></li>
<li>Search by title, TMDB ID, or IMDB ID</li>
<li>Select the correct movie</li>
<li>Choose settings before adding</li>
</ol>

<h3>Options Explained</h3>

<table>
<tr><th>Option</th><th>What It Does</th></tr>
<tr><td>Root Folder</td><td>Where the movie folder will be created.</td></tr>
<tr><td>Quality Profile</td><td>Defines allowed qualities and upgrade rules.</td></tr>
<tr><td>Availability</td><td>When Radarr is allowed to grab the movie.</td></tr>
<tr><td>Monitor</td><td>Whether Radarr actively watches for releases.</td></tr>
<tr><td>Search Movie</td><td>Immediately searches indexers.</td></tr>
</table>

<h3>Example Folder Structure</h3>

<pre>
D:\Movies\The Matrix (1999)\The Matrix (1999) - Bluray-1080p.mkv
</pre>

<hr>

<h2>Quality Profiles Explained</h2>

<p>Quality profiles determine:</p>
<ul>
<li>Which qualities are allowed</li>
<li>Upgrade rules</li>
<li>When to stop upgrading (Cutoff)</li>
</ul>

<h3>Cutoff</h3>
<p>Cutoff tells Radarr to stop upgrading once a specific quality is reached.</p>

<p>Example:</p>

<pre>
WEB-1080p
Bluray-1080p (Cutoff)
Bluray-2160p
</pre>

<p>Radarr will upgrade to Bluray-1080p and stop there.</p>

<hr>

<h2>Availability Settings</h2>

<table>
<tr><th>Option</th><th>Meaning</th></tr>
<tr><td>Announced</td><td>Monitor before release.</td></tr>
<tr><td>In Cinemas</td><td>Monitor from theatrical release.</td></tr>
<tr><td>Released</td><td>Only monitor once digital/BluRay is available.</td></tr>
</table>

<p>For upcoming movies, set <strong>Availability to Announced</strong> and keep <strong>Monitor ON</strong>.</p>

<hr>

<h2>Monitoring Upcoming Movies</h2>

<ol>
<li>Add movie</li>
<li>Set Availability to <strong>Announced</strong></li>
<li>Set Monitor to <strong>ON</strong></li>
<li>Do not manually search</li>
</ol>

<p>Radarr will automatically download once a release appears.</p>

<hr>

<h2>Calendar</h2>

<p>The Calendar shows:</p>
<ul>
<li>Theatrical release dates</li>
<li>Digital release dates</li>
<li>BluRay release dates</li>
</ul>

<p>You can click a future movie directly from the Calendar to add and monitor it.</p>

<hr>

<h2>Download Clients Setup</h2>

<p>Go to <strong>Settings → Download Clients</strong> and add:</p>

<ul>
<li>qBittorrent</li>
<li>SABnzbd</li>
<li>NZBGet</li>
</ul>

<p>Required fields:</p>

<table>
<tr><th>Field</th><th>Description</th></tr>
<tr><td>Host</td><td>IP address or hostname</td></tr>
<tr><td>Port</td><td>Client port</td></tr>
<tr><td>Category</td><td>Must match Radarr category (e.g., "radarr")</td></tr>
</table>

<hr>

<h2>Indexers</h2>

<p>Go to <strong>Settings → Indexers</strong> and add torrent or Usenet indexers.</p>

<p>If using Prowlarr, connect it and sync indexers automatically.</p>

<hr>

<h2>File Management Settings</h2>

<p>Located in <strong>Settings → Media Management</strong>.</p>

<table>
<tr><th>Setting</th><th>Purpose</th></tr>
<tr><td>Rename Movies</td><td>Automatically rename files</td></tr>
<tr><td>Replace Illegal Characters</td><td>Fix Windows/Linux naming issues</td></tr>
<tr><td>Create Empty Folders</td><td>Create movie folder before download</td></tr>
</table>

<h3>Example Naming Format</h3>

<pre>
{Movie Title} ({Release Year}) - {Quality Full}
</pre>

<hr>

<h2>Deleting a Movie</h2>

<ol>
<li>Go to Movies</li>
<li>Select the movie</li>
<li>Click Delete</li>
</ol>

<table>
<tr><th>Option</th><th>Effect</th></tr>
<tr><td>Delete Movie</td><td>Removes from Radarr only</td></tr>
<tr><td>Delete Files</td><td>Deletes files from disk</td></tr>
<tr><td>Add Exclusion</td><td>Prevents re-adding</td></tr>
</table>

<p>To remove permanently, check <strong>Delete Files</strong> and <strong>Add Exclusion</strong>.</p>

<hr>

<h2>Manual Search vs RSS</h2>

<h3>RSS Monitoring</h3>
<p>Automatic. Checks feeds every 15 minutes for new releases.</p>

<h3>Manual Search</h3>
<p>Searches entire indexer history. Useful for older movies.</p>

<hr>

<h2>Common Issues</h2>

<h3>Movie Not Downloading</h3>
<ul>
<li>Wrong quality profile</li>
<li>No indexers configured</li>
<li>Monitor set to OFF</li>
<li>Availability too strict</li>
</ul>

<h3>Downloads But Not Importing</h3>
<ul>
<li>Category mismatch</li>
<li>Completed Download Handling disabled</li>
<li>Permissions issues</li>
</ul>

<hr>

<h2>Typical Workflow</h2>

<ol>
<li>Add movie (Availability = Announced)</li>
<li>Monitor ON</li>
<li>Wait for release</li>
<li>Radarr downloads automatically</li>
<li>File renamed and moved</li>
<li>Plex updates</li>
<li>Quality upgrades automatically</li>
</ol>

</article>