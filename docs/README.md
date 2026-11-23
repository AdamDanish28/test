# Revise: spaced repetition app

A spaced repetition planner that works on phone and laptop. It installs as an app (PWA) and keeps working offline.

Each topic you add gets reviews **1, 3, 7, 14 and 30 days** after the date you learned it.

## Features
- **Topics** with subject, title, description/notes and the date you learned them
- **Today screen**: overdue reviews, reviews due today and the next 7 days, plus your streak
- **Calendar**: month view with coloured dots per subject. Tap a day to see its reviews
- **Active recall review**: try to remember first, then reveal your notes and rate it 😣 Hard / 🙂 Okay / 😄 Easy.
  A *Hard* rating adds an extra review tomorrow.
- **Notifications**: a daily reminder at a time you choose, and a badge count on the app icon
- **Calendar export (.ics)**: adds every review to Google Calendar, Apple Calendar or Outlook with an alarm, so reminders still arrive when the app is closed
- **Focus timer (Pomodoro)**:
  - choose your own focus and break lengths, with presets or custom minutes
  - a long break after N sessions, optional auto-start and an alarm sound
  - tag each session with a subject, topic and note; the timer keeps counting through a page reload
  - **Study records** are saved automatically and grouped by day with daily totals. You can search them,
    filter by subject or date range and sort by newest, oldest, longest or subject
  - edit, delete (with undo), select several and delete them together, add sessions you forgot to time, and export to CSV
  - a daily goal, a streak, a 7-day chart and a per-subject time breakdown
  - "Study this" on a topic opens the timer with that topic already chosen
- Search, a filter by subject and by status (in progress, completed, archived), plus archiving
- **Stats**: reviews over the last 14 days, on-time %, how reviews felt, and progress by subject
- Custom schedule (1-3-7-14-30 is the default), with an option to push later reviews back when you review late
- Backup export/import (JSON) to move data between devices
- Dark mode and keyboard shortcuts (`n` new topic, `Ctrl/Cmd+Enter` save, `Esc` close)

## Hosting it (GitHub Pages, free)
1. On GitHub, open the repo, then **Settings → Pages**
2. Under *Build and deployment*, choose **Deploy from a branch**, then pick the branch and the **/docs** folder, then **Save**
3. After about a minute the app is live at `https://<your-username>.github.io/<repo>/`
4. Open that link on your phone and laptop and install it:
   - iPhone: Safari → Share → **Add to Home Screen** (iOS only allows notifications for home-screen apps)
   - Android: Chrome ⋮ → **Install app**
   - Laptop: Chrome/Edge → install icon in the address bar

## About notifications
Web apps can't schedule a notification for an exact future time when they're fully closed.
- Revise sends a notification at your reminder time if the app is open, or as soon as you open it.
- On installed Android/Chrome it also tries a background check once or twice a day.
- For reminders that **always** arrive, use **Settings → Export all reviews to calendar**, or **📅 Add to calendar** on a single topic.
  Your phone's calendar then alerts you on each review day. Re-exporting updates the same events instead of duplicating them.

## Sync between phone and laptop
Revise keeps the same data on all your devices by storing it in a **private Gist on your own GitHub account**. There's no other server.

1. On your laptop, open the app → **Settings → ☁️ Sync phone & laptop**
2. Click **Create a GitHub token** (the `gist` permission is already ticked), set Expiration to *No expiration*, click **Generate token** and copy it
3. Paste the token and press **Connect**
4. Press **📱 Link another device** and scan the QR code with your phone (or open the link on it)
   - If you installed the app on an iPhone home screen, open the installed app → Settings → paste the **sync code** instead

Changes sync a couple of seconds after you make them, whenever the app is opened, and every minute while it's open.
If two devices edit offline, the changes are merged: the newest version of each item wins, and deletions sync too.
The device's timer state, notification settings and theme stay per device.

## Data
Data is stored on each device (localStorage). If sync is on, a copy is also kept in your private Gist.
**Settings → Export backup / Import backup** still works for a manual backup file.
