---
title: "Sonarr"
summary: "Sonarr is an automated TV show management tool. It monitors TV series you want,
searches for new episodes, downloads them automatically through your download client,
renames them, and organizes them into your TV library. It integrates with Plex, Jellyfin, and Emby."
image: "/images/IMG_1328.png"
categories: "Beginner Guides, Hardware, Linux, Operating Systems, Setup, sonarr, Upgrades"
author: "Byron"
---

<article class="guide">

<h1>Complete Guide to Using Sonarr</h1>

<p>Sonarr is an automated TV show management tool. It monitors TV series you want,
searches for new episodes, downloads them automatically through your download client,
renames them, and organizes them into your TV library. It integrates with Plex, Jellyfin, and Emby.</p>

<hr>

<h2>What Sonarr Does</h2>

<ul>
<li>Tracks TV series</li>
<li>Monitors for new episodes</li>
<li>Automatically downloads new releases</li>
<li>Upgrades quality when better versions appear</li>
<li>Renames and organizes episodes</li>
</ul>

<hr>

<h2>Main Interface Overview</h2>

<h3>Series</h3>
<p>Displays all tracked TV shows including poster, status, and monitoring state.</p>

<h3>Calendar</h3>
<p>Shows upcoming episode air dates and recently aired episodes.</p>

<h3>Activity</h3>
<p>Displays active downloads and import history.</p>

<h3>Wanted</h3>
<p>Lists missing episodes or episodes below quality cutoff.</p>

<h3>Settings</h3>
<p>Where configuration is done (media management, indexers, profiles, download clients).</p>

<hr>

<h2>How to Add a Series</h2>

<ol>
<li>Click <strong>Add Series</strong></li>
<li>Search for the show name</li>
<li>Select the correct result</li>
<li>Choose settings before adding</li>
</ol>

<h3>Options Explained</h3>

<table>
<tr><th>Option</th><th>What It Does</th></tr>
<tr><td>Root Folder</td><td>Location where the series folder will be created.</td></tr>
<tr><td>Quality Profile</td><td>Defines allowed qualities and upgrade rules.</td></tr>
<tr><td>Language Profile</td><td>Defines allowed audio languages.</td></tr>
<tr><td>Monitor</td><td>Controls what episodes are monitored.</td></tr>
<tr><td>Season Folder</td><td>Creates separate folders per season.</td></tr>
<tr><td>Search for Missing Episodes</td><td>Immediately searches indexers.</td></tr>
</table>

<hr>

<h2>Monitoring Options Explained</h2>

<table>
<tr><th>Monitor Option</th><th>Meaning</th></tr>
<tr><td>All Episodes</td><td>Monitors every episode (past and future).</td></tr>
<tr><td>Future Episodes</td><td>Only monitors upcoming episodes.</td></tr>
<tr><td>Missing Episodes</td><td>Monitors episodes you do not already have.</td></tr>
<tr><td>None</td><td>Adds series without monitoring.</td></tr>
</table>

<p>For ongoing shows, choose <strong>Future Episodes</strong>.</p>
<p>For full downloads, choose <strong>All Episodes</strong>.</p>

<hr>

<h2>Folder Structure Example</h2>

<pre>
D:\TV\Breaking Bad\Season 01\Breaking Bad - S01E01 - Pilot.mkv
</pre>

<hr>

<h2>Quality Profiles Explained</h2>

<p>Quality profiles control:</p>
<ul>
<li>Allowed qualities</li>
<li>Upgrade behavior</li>
<li>Cutoff point</li>
</ul>

<h3>Cutoff</h3>
<p>Sonarr will continue upgrading until the cutoff quality is reached.</p>

<p>Example:</p>

<pre>
HDTV-720p
WEB-1080p
Bluray-1080p (Cutoff)
</pre>

<p>Once Bluray-1080p is downloaded, upgrades stop.</p>

<hr>

<h2>Language Profiles</h2>

<p>Language profiles allow you to control audio language preference.
You can require English only or allow multiple languages.</p>

<hr>

<h2>Monitoring Upcoming Episodes</h2>

<ol>
<li>Add series</li>
<li>Select <strong>Future Episodes</strong></li>
<li>Keep Monitor ON</li>
<li>Do not manually search</li>
</ol>

<p>Sonarr automatically checks RSS feeds and downloads new episodes shortly after release.</p>

<hr>

<h2>Calendar</h2>

<p>The Calendar shows:</p>
<ul>
<li>Episode air dates</li>
<li>Past episodes</li>
<li>Future episodes</li>
</ul>

<p>You can click episodes to manually search or adjust monitoring.</p>

<hr>

<h2>Download Clients Setup</h2>

<p>Go to <strong>Settings → Download Clients</strong> and configure:</p>

<ul>
<li>qBittorrent</li>
<li>SABnzbd</li>
<li>NZBGet</li>
</ul>

<table>
<tr><th>Field</th><th>Description</th></tr>
<tr><td>Host</td><td>IP or hostname</td></tr>
<tr><td>Port</td><td>Download client port</td></tr>
<tr><td>Category</td><td>Must match Sonarr category (e.g., "sonarr")</td></tr>
</table>

<p>Category mismatches are a common cause of import failures.</p>

<hr>

<h2>Indexers</h2>

<p>Go to <strong>Settings → Indexers</strong> and add torrent or Usenet indexers.</p>

<p>If using Prowlarr, connect Sonarr to it for automatic indexer syncing.</p>

<hr>

<h2>File Management Settings</h2>

<p>Located under <strong>Settings → Media Management</strong>.</p>

<table>
<tr><th>Setting</th><th>Purpose</th></tr>
<tr><td>Rename Episodes</td><td>Automatically rename episode files</td></tr>
<tr><td>Replace Illegal Characters</td><td>Prevents OS naming issues</td></tr>
<tr><td>Create Empty Season Folders</td><td>Pre-creates season folders</td></tr>
<tr><td>Use Hardlinks Instead of Copy</td><td>Saves space when seeding torrents</td></tr>
</table>

<h3>Example Naming Format</h3>

<pre>
{Series Title} - S{season:00}E{episode:00} - {Episode Title} [{Quality Full}]
</pre>

<hr>

<h2>Deleting a Series</h2>

<ol>
<li>Go to Series</li>
<li>Select the show</li>
<li>Click Delete</li>
</ol>

<table>
<tr><th>Option</th><th>Effect</th></tr>
<tr><td>Delete Series</td><td>Removes from Sonarr only</td></tr>
<tr><td>Delete Files</td><td>Deletes all episode files</td></tr>
<tr><td>Add Exclusion</td><td>Prevents re-adding</td></tr>
</table>

<p>To permanently remove a show, check <strong>Delete Files</strong> and <strong>Add Exclusion</strong>.</p>

<hr>

<h2>Manual Search vs RSS</h2>

<h3>RSS Monitoring</h3>
<p>Automatic. Checks feeds every 15 minutes for newly released episodes.</p>

<h3>Manual Search</h3>
<p>Searches full indexer history for older episodes.</p>

<hr>

<h2>Season Monitoring</h2>

<p>You can control monitoring per season:</p>

<ul>
<li>Click series → Seasons</li>
<li>Toggle individual seasons ON/OFF</li>
<li>Toggle individual episodes ON/OFF</li>
</ul>

<p>This is useful for skipping specials or older seasons.</p>

<hr>

<h2>Common Issues</h2>

<h3>Episode Not Downloading</h3>
<ul>
<li>Monitor set to OFF</li>
<li>Quality profile too restrictive</li>
<li>No indexers configured</li>
<li>Release not yet available</li>
</ul>

<h3>Downloaded But Not Importing</h3>
<ul>
<li>Category mismatch</li>
<li>Completed Download Handling disabled</li>
<li>Permissions issues</li>
</ul>

<hr>

<h2>Typical Workflow</h2>

<ol>
<li>Add series</li>
<li>Select monitoring type</li>
<li>Wait for episodes to air</li>
<li>Sonarr downloads automatically</li>
<li>File renamed and moved</li>
<li>Plex updates</li>
<li>Quality upgrades if better releases appear</li>
</ol>

</article>