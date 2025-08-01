# Fullstack Developer Intern Technical Assessment (July ‘25)

# Introduction

This is a comprehensive technical assessment for a fictional company called **SecureSight**. SecureSight is a CCTV monitoring software where you can connect upto 3 CCTV feeds — computer vision models help detect certain activity on the feeds (e.g. unauthorised access, gun threats, etc).

For this technical assessment, you will be creating the frontend and basic backend for the dashboard only:

1. Mandatory scope:
    1. Navbar
    2. Incident Player (left-side)
    3. Incident List (right-side)
2. Optional scope:
    1. Incident timeline (bottom)
    2. Additional 3D-front-end assessment (see Optional/Extra Credit section below for more details)
    

![image.png](image.png)

Here is the Figma file: https://www.figma.com/design/v3gdcLjbIWn4kXybewFZgw/Full-Stack-Developer-Internship-TA?node-id=0-1&t=fB7ghxLnjk1LUJ93-1

# Deliverables

## Mandatory Deliverable

| **Layer** | **Requirement** |
| --- | --- |
| **Data model** | `Camera` — id, name, location 
`Incident` — id, cameraId ⇢ Camera, type, tsStart, tsEnd, thumbnailUrl, **resolved** (boolean) |
| **Seed script** | Provide prisma/seed.ts (or SQL) that inserts:
• 3+ cameras (e.g., Shop Floor A, Vault, Entrance)
• 12+ incidents across at least 3 threat types (Unauthorised Access, Gun Threat, Face Recognised, etc.). 

Include believable timestamps covering a 24‑hour span and placeholder thumbnails (local /public images will do). |
| **Database** | Use any Postgres, MySQL, or SQLite target:
– Local file (mode=memory fine)
– Docker Compose service
– or a free cloud DB (Neon, Supabase, PlanetScale). |
| **API routes** | 1. GET /api/incidents?resolved=false — return newest‑first JSON
2. PATCH /api/incidents/:id/resolve — flip resolved and echo updated row |
| **Frontend (Next.js 15 App Router)** | 1. Incident Player (left)
• Large video frame (static MP4/GIF stub is fine). It’s completely fine to have a static image here.
• Mini strip of two additional camera thumbnails

2. Incident List (right)
• Thumbnail, coloured type icon, camera location, start–end time
• Resolve button with optimistic UI (row fades out on click, then API) |

## Optional/Extra Credit Deliverable

| **Optional/Extra Credit Tasks** | Details |
| --- | --- |
| **Interactive Timeline** | Under the player, draw an SVG/Canvas ruler for 24 h. Place incident markers, draggable scrubber, and snap video on drag. |
| 3D website in React Three Fibre. | On a separate route or project, recreate this design using React Three Fibre: https://www.figma.com/design/v3gdcLjbIWn4kXybewFZgw/Full-Stack-Developer-Internship-TA?node-id=1-3828

There are two 3D sections with simple animations (animation instructions are on the Figma file).

Product model: ‣ |

# Submissions

1. Submit your technical assessment at this link: [https://instinctive-studio.notion.site/2369efe857498197a1a4f447f6635ea1?pvs=105](https://www.notion.so/2369efe857498197a1a4f447f6635ea1?pvs=21)
2. Make sure the following is done:
    1. Public Github repo
    2. Live URL (Vercel, Netlify or Render) — include .env vars if needed
    3. README covering:
        1. Deployment instrucments
        2. Tech decisions
        3. If I had more time… (quick bullets for future improvements)