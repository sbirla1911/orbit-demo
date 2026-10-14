# Plan: Orbit (sizzle demo)

**One line:** Tell Orbit who you are → it finds your people, finds a time everyone's free, and books the plan.

## The one path (≈90 s)
1. **About you** (live input): name, age, interest chips, budget slider, scope (My campus / Nearby campuses / Whole city), "Sync calendar" button. → *Find my people*
2. **AI at work**: an animated network of students pulls toward you while a log ticks: scanning 2,418 students → matching interests → checking calendars → filtering by budget → booking slots.
3. **Your matches**: 3 group cards (activity, up to 3 suggested people, shared interests, time everyone's free, price, match %). Tap people to choose who's in, then tap **I'm in** → friends accept live → **Booked & paid** with confetti.
4. **Your semester**: big before→after number (friends made: on your own vs. with Orbit). A slider for meetups per month changes the number live. Shows a friend list with friendship-strength bars and auto-scheduled repeat meetups.

## Look
White canvas, near-black text, one accent (electric violet #6D4AFF). Big type (min 20px body, 64px+ hero numbers), emoji as graphics, rounded cards, generous spacing.

## Files
`app/index.html`, `app/styles.css`, `app/data.js` (fake students and activities), `app/app.js` (flow, matching, animation). No server needed.
