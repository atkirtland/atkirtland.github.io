---
category: 
tags: en
title: Offline software suggestions
last_modified_at: 2025-06-26
published: true
---

# Offline software suggestions

I spent a lot of time in 2024 switching to offline-first apps, and I'd like to share my top choices to save others some time. By offline-first, I mean apps workflows that minimize online requirements. There are two high-level software choices I made. First, I handle syncthing between devices through Syncthing. Second, I use Obsidian to handle working with Markdown files for many notes, and I record data like fitness data and book notes in Markdown files. If you have additional questions about my choices below or things to try, send me a note! I have additional notes not included here that I might add later on things like active GitHub issues that, if resolved, would shift my rankings.

## Syncthing enables working across desktop & mobile

A tool like Syncthing in indispensable to sync data like

- backup data
- Markdown notes (like from Obsidian)
- Calibre library
- Zotero library

Rsync also works, but Syncthing has the advantage of being able to scan on your local network dynamically (as well as globally if you enable that). This is useful on network configurations when accessing other devices directly via IP doesn't work, and because it can be cumbersome to have to manually update IPs when you switch networks. Also, keep in mind that you can sync over your phone's hotspot with tethering

## Obsidian enables simple data storage

I find it unfortunate that there isn't really a good open source solution to notes, but I have found Obsidian significantly better than the alternatives like Logseq, Dendron, Foam, and Zettlr. I don't like the forced outlining in Logseq, Dendron's development is discontinued, Foam didn't have as many features, and Zettlr doesn't support as much LaTeX code since it uses KaTeX instead of MathJax. Obsidian + Emacs for certain kinds of edits works great. I also use Obsidian to handle tasks rather than CalDAV/Thunderbird. I like putting tasks on notes they're semantically related to, such as project notes, and them gathering them onto organizational notes with the Tasks plugin. 

### Photos and Obsidian

I like to have my photo library accessible to Obsidian, as then I can:
- import photos into daily journal entries
- link plant photos into botany-related notes

On Linux, one can achieve this with a symlink in a directory in the Obsidian vault. On Android, one must actually place the entire photo directory (synced with Syncthing) under the directory. This is because Android doesn't allow symlinks between two directories in the main storage space.

### Plant taxonomy in Obsidian instead of only using iNaturalist

I create Obsidian notes for species I've observed and verified with iNat and include data about them in the YAML properties. I have a script to build a CSV from this data that I import into Anki for learning genera and family names from photos. I might write another post about this later.

### Books

I used Goodreads before. Instead, now I just create a Markdown note for each book, tag it as "to-read", and use an Obsidian Dataview script to show all the books I'd like to read.

### Fitness data

I make a line in my daily markdown note recording info about the workout, and I have a separate script to parse these and compile data displays like Strava has.

## Many other types of software

There are a bunch of other assorted suggestions I have that I listed below along with reasoning. The majority of apps I use are open source, but there are a couple of cases where the closed source options are much better than the competition; I marked those with a "(CS)". I annotated each suggestion with "(L)" for Linux or "(A)" for Android. 

- Browser
	- Firefox (L, A): Qute browser is unfortunately a bit outdated and can't load some sites.
	- Obsidian Web Clipper (L): Useful tool for downloading webpages in Markdown and importing them into your vault for reading.
- Email, calendar, contacts:
	- Evolution (L): I like some features of it a bit more than Thunderbird, like that the calendar has "Delete this and future events" and free/busy availabilities that should work in theory (but have open bug reports in my experience). I read CalDAV info provided by Radicale with it.
	- Fossify calendar (A), Fossify contacts (A)
	- Radicale (L, A): I install it on both Linux and Android with Termux. I sync files automatically with Syncthing, have the server always running on Linux with Systemd, and launch the server on Termux whenever I need to sync with DAVx5. I do this because I don't often check my calendar on my phone, but you can also have the server run constantly and automatically. There's an open GitHub issue regarding the ability to change the IP address of the sync server, and once that is resolved, the Termux Radicale server won't be necessary.
	- DAVx5, ICSx5 (A): for syncing to Android locally
- eReader: desirata are offline, text to speech (TTS), and portable annotations. Unfortunately, there are no perfect solutions. Others I've tried include @Voice Aloud, FBReader (tried free only), Edge TTS (Linux version requires searching online to find the right version), and a couple of others.
	- Calibre (L): I use it for organizing books and reading, but not TTS.
	- ReadEra (A; CS): either this or MoonReader+ is the best. I read you can request the developer to send you the source code.
	- KOReader (L, A): I love how it stores annotations as sidecar files, making them portable across Linux, Android, and Kindle! However, its lack of TTS and the fact irs UI is built for eReaders discourages me from using it. I would love for ReadEra or Calibre to adopt KOReader's annotation format.
- Other written content
	- Kiwix (L): run with Systemd to have an offline-searchable Wikipedia you can set up a shortcut for with Vimium.
	- QRpedia (L): if online, use this instead to automatically redirect links to your preferred reading language.
	- Sioyek (L): PDF reader. You have to mess around a bit to get multiple windows working, but it's fast and has nice keybindings.
	- Goldendict (L): I found it much more stable than GoldenDict-ng, but I have hope for that project in the future.
	- Zotero (L)
- Flashcards
	- Anki (L, A): to sync offline, run an Anki server locally with Systemd (included in the Desktop app). 
- (Chinese) Input methods
	- Rime (L)
	- Gboard (A; CS): there are open source alternatives, but as far as I know, none support all 3 desirata of: Chinese, glide typing, and voice dictation.
- Maps
	- Organic Maps (L, A): faster and therefore more practical for daily use than OSMAnd.
	- OSMAnd (A): more features and better for editing than Organic Maps.
	- Transit (A; CS): offline public transit maps in Boston.
	- Caltopo + Avenza (A; CS): for trail planning.
	- Google Maps (L, A; CS): for recommendations and street view. Open source alternatives include Mapillary (but it was purchased by Facebook) and Kartaview (which I can't comment on).
- Music player: desirata are ability to sync local m3u playlists, display lyrics, and play streams/internet radio.
	- Poweramp (A; CS): satisfies desirata.
	- Musicolet (A; CS): can easily copy synced lyrics, unlike Poweramp. This is sometimes very useful.
	- Symphony (A): a rising open source app that has open issues regarding the desirata. Retro music player was the best alternative, but it requires manually saving new m3us after updates, and its development seems a little rocky.
- Other music and videos
	- yt-dlp (L, A) and spotdl (L, A): for downloading media.
	- Downloadable media discovery (L, A): Spotify (or Spotube or Spowlo) and YouTube (or NewPipe or SongTube): for searching for things to download.
	- MX Player (A; CS): video player. Can easily zoom into the video and change subtitle size.
	- Puddletag (L): for editing music file tags.
- Notes
	- StylusLabs Write (L, A): for handwritten notes, available on many platforms. SVGs can be imported into Obsidian and are much more portable.
- Nutrition tracker
	- Energize (A): Seems to be in a better state than OpenNutriTrack, and the developer is active and friendly! I also looked briefly at Stayfit, wger, and kcal.
- Operating system
	- Ubuntu + i3 + (rofi, redshift, localsend...) (L): Sway on Wayland just wasn't stable enough when I tried it in early 2024.
- Photo manager
	- Digikam (L)
	- Aves (A): for compatibility, make sure to use numbered ratings and not favorites.
- Podcasts
	- Antennapod (A)
- RSS
	- Liferea (L): good basic RSS reader with OPML import/export compatible with Feeder on Android. RSS Guard should work too, though it's a bit heftier. Thunderbird also provides RSS. 
	- Feeder (A): I haven't tried many other open source options.
- SMS
	- Google Messages (A; CS): I lost MMS messages with other apps I tried, like Fossify SMS. Google SMS has a convenient feature that shows MMS messages awaiting download, which can be downloaded (manually) upon activating mobile networks.
- Video editing
	- Kdenlive (L)

## Moving to the suggestions above

### How to convert OneDrive notes to Obsidian

It's challenging to export OneDrive notes to a portable framework, and the best way is unfortunately install Windows, download the full version of OneDrive, and then export your notes as a PDF. Also, save it as a `onepkg` file for the sake of preservation. It doesn't seem easy to get nice SVGs for your notebooks that can be imported elsewhere.

### Moving favorites from Google Maps to GPX

I used Google Maps before. The portable way to handle locations, though, is to save them as a GPX file that you can import/export with apps like OSMAnd. I mentioned I use Organic Maps more now for daily searching, but I haven't yet ported my saved locations from OSMAnd to Organic Maps— I'm not sure if Organic Maps can import and export GPX (or KML, etc.), but doing that would be ideal.

Google Maps is quite difficult to export from. Google My Maps lets you export GPX or KML directly, if I remember correctly, but standard Google Maps does not. The best solution if you have a large number of files is to have an LLM write a script with the Google Maps API to save them as a GPX file.
