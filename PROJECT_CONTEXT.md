# Go Donkey — Project Context

> **Purpose:** Central reference for Go Donkey's product vision, technical architecture, database design, and development roadmap.
>
> **Important:** This document describes both approved requirements and planned features. Always verify the actual source code and database before assuming that a feature exists.

## 1. Project Overview

**Project:** Go Donkey  
**Website:** https://godonkey.org  
**Repository:** `PsychologistVietnam/go-donkey`

Go Donkey is a charity walking journey across Vietnam, supporting mental health awareness and HOPE.

### Main objectives

- Complete a 3,450 km walking journey across Vietnam.
- Track and display journey progress.
- Share public journey locations while protecting precise GPS data.
- Publish blog posts, videos, photos, and visited locations.
- Support donations and fundraising progress.
- Provide an administrative system for managing the journey.

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router |
| Map | React Leaflet, MapTiler |
| Styling | Responsive CSS, BEM conventions |
| Icons | Font Awesome |
| Backend | Node.js, Express REST API |
| Database | MySQL / MariaDB, mysql2 |
| Media | Cloudinary |
| Android | Native Android app, separate Mobile Team |
| Hosting | Hostinger Cloud Enterprise |
| Version control | GitHub |

**Runtime:** Node.js 24.x is the intended Hostinger runtime; verify the actual runtime configuration.

### Architecture principles

- React handles the user interface.
- Express handles APIs, authentication, permissions, and business logic.
- MySQL stores structured application data.
- Cloudinary stores media files; MySQL stores their metadata.
- Android communicates with Express over HTTPS.
- Map providers remain independent of stored GPS coordinates.

## 3. Development Workflow

Development follows this process:

**Local development → Testing → Review → GitHub → Hostinger**

Rules:

- Develop and test locally on Windows.
- Use CodeGraph to understand existing dependencies.
- Verify actual source code before modifications.
- Never automatically commit, push, or deploy.
- Never change production data or environment settings without approval.
- Keep local and production configurations separate.
- Do not expose or commit `.env` files, credentials, or API secrets.

## 4. Backend Architecture

Go Donkey follows a **Controller → Service → Model** architecture.

### Directory structure

```text
server/
├── server.js
├── config.js
├── routes/
├── controllers/
├── services/
├── models/
├── middleware/
├── utils/
└── scripts/
```

### Responsibilities

| Layer | Responsibility |
|---|---|
| Routes | Define endpoints and attach middleware |
| Controllers | Handle HTTP requests and responses |
| Services | Implement business logic |
| Models | Execute parameterized MySQL queries |
| Middleware | Authentication, authorization, validation, errors |
| Utils | Shared helper functions |
| Scripts | Local administrative and maintenance tasks |

### Feature organization

Each major feature has its own controller and route module.

Examples:

- `auth.controller.js`
- `tracking.controller.js`
- `journey.controller.js`
- `posts.controller.js`
- `videos.controller.js`
- `donations.controller.js`

Controllers may contain multiple related actions. Do not create one controller per endpoint.

Only create modules when the feature is implemented. Avoid empty placeholder files and unnecessary restructuring.

Keep `server.js` focused on application initialization, global middleware, route registration, and startup.

## 5. Authentication and Authorization

The application has exactly two roles:

| Role | Responsibilities |
|---|---|
| `admin` | Manage accounts, GPS operations, content, donations, and settings |
| `tracker` | Send journey GPS data and publish authorized journey content |

### Authentication design

- REST API using `Authorization: Bearer <token>`.
- JWT access tokens.
- Password hashing with Argon2id.
- User and role data stored in MySQL.
- Backend-enforced authorization.
- No public user registration.
- Initial Admin account created using a secure local CLI script.
- Server-side request validation and login rate limiting.

### Initial API scope

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/auth/admin-check` — temporary authorization test endpoint

Initial JWT lifetime: 12 hours.

Refresh tokens and server-side session revocation are not part of the initial implementation.

**Status:** Planned / under development. Verify source code before changing this status.

## 6. GPS Tracking

One primary Android device provides journey GPS updates.

### Android requirements

- Update approximately every 15–30 seconds while walking, subject to Android restrictions.
- Reduce update frequency while resting.
- Support background tracking using appropriate Android permissions and foreground services.
- Queue GPS updates when offline.
- Upload queued data when connectivity returns.
- Allow manual Walking / Resting status.
- Allow public location sharing to be enabled or disabled.

### Backend requirements

- Validate coordinates, timestamps, and accuracy.
- Store precise GPS history in MySQL.
- Maintain the latest accepted location separately.
- Calculate distance using validated GPS points.
- Reject duplicate, invalid, or implausible points.
- Restrict GPS upload endpoints to authorized devices or accounts.

### Privacy requirements

- Never expose precise GPS history through public APIs.
- Public location precision target: approximately 1 km.
- Apply location approximation on the backend.
- When sharing is disabled, do not return the current location publicly.
- Do not allow map-provider changes to weaken location privacy.

## 7. Journey Progress and Statistics

### Configuration

- **Target distance:** 3,450 km
- **Estimated steps per kilometer:** 1,723
- **Time zone for public reporting:** `Asia/Ho_Chi_Minh`

### Formula

```js
estimatedSteps = Math.round(distanceKm * stepsPerKm);
```

Example:

842 km × 1,723 = 1,450,766 estimated steps.

Estimated steps are not actual pedometer measurements.

### Statistics to expose

- Total distance walked
- Distance remaining
- Journey completion percentage
- Estimated steps
- Current activity status
- Last GPS update time
- Daily journey distance
- Daily estimated steps

Daily statistics may initially be calculated from validated GPS data. A separate daily summary table can be added later if needed.

### Date and time conventions

- Store timestamps consistently in UTC.
- Convert timestamps to Vietnam time when displaying them.
- Preserve GPS device recording time and server reception time separately.
- Use local Vietnam calendar dates for daily journey reporting.

## 8. Database

**Database:** `u502250247_go_donkey`  
**Database platform:** MySQL / MariaDB on Hostinger  
**Baseline schema:** V4 — 16 tables

### Accounts

- `users`
- `roles`
- `user_roles`

### Tracking

- `tracking_devices`
- `tracking_points`
- `journey_status`
- `public_route_points`

### Journey and places

- `journey_settings`
- `places`
- `place_visits`

### Content

- `posts`
- `videos`
- `media_assets`

### Donations

- `donors`
- `donations`

### System

- `audit_logs`

### Database rules

- Reuse existing tables and relationships.
- Verify actual column names and constraints before writing SQL.
- Use parameterized queries.
- Use transactions for related database operations.
- Use migrations for approved schema changes.
- Never silently drop or overwrite existing tables.
- Never delete production data without authorization.
- Do not store secrets in source code.

**Note:** The V4 schema has been created in phpMyAdmin. Confirm current columns, indexes, constraints, and seed records against the live schema before implementing dependent APIs.

## 9. Map Architecture

### Current provider

MapTiler.

### Alternatives under consideration

- VIETMAP
- Mapbox
- Google Maps

Reasons for potential migration:

- Cost optimization
- Vietnamese geographic labels
- Appropriate representation of Vietnamese geography, including the East Sea, Hoang Sa, and Truong Sa

### Coordinate standard

Use WGS84 / EPSG:4326:

- Latitude
- Longitude

Database coordinates must not depend on a specific map provider.

### Public map features

- Display current public location.
- Update the marker without a full page reload.
- Allow zooming and panning.
- Support optional follow-location mode.
- Display approved journey routes.
- Display visited locations.
- Show the last update time.
- Respect public sharing settings.

### Update strategy

Start with REST polling approximately every 15 seconds.

Consider Server-Sent Events only if necessary.

GPS updates alone should not require reloading the entire map.

## 10. Content Management

Go Donkey supports Blog and Video publishing.

### Content metadata

- Title
- Slug
- Description or main content
- Cover image or thumbnail
- Author
- Publication status
- Publication date
- Creation date
- Last updated date
- Optional related location

### Publication states

- Draft
- Published
- Archived

### Rules

- Admin and Tracker may publish according to their permissions.
- Public APIs only expose published content.
- Sort published content by publication date, newest first.
- Store media in Cloudinary.
- Store media references and metadata in MySQL.
- Validate uploads and media ownership on the backend.

## 11. Donations

The platform records donations and displays fundraising progress.

### Requirements

- Manage donor records.
- Record donation amount, time, status, and references.
- Display confirmed donation totals publicly.
- Prevent duplicate payment confirmation.
- Never trust a client-provided payment status.
- Validate payment confirmation on the backend.
- Keep sensitive donor information private.

Specific payment gateway integration remains to be determined.

## 12. Performance

Expected traffic: approximately 800–1,000 visits per day.

Initial strategy:

- Cloudinary CDN for media delivery.
- Efficient database indexes.
- Pagination for content and large datasets.
- Appropriate HTTP caching.
- Lightweight public GPS polling.
- Efficient MySQL connection pooling.
- Avoid unnecessary Redis, WebSocket, or microservices.

Optimize based on measured performance, not assumptions.

## 13. Implementation Status

The project is under active development.

### Known existing foundation

- React/Vite frontend
- Express backend
- MySQL connection pool
- Basic health endpoint
- Initial map/route interface
- Hostinger deployment workflow
- MySQL V4 schema created

### Planned or in-progress features

- JWT Bearer Authentication
- Role-based authorization
- Secure Admin account creation
- Android GPS ingestion API
- Public journey tracking API
- Journey statistics
- Blog and Video management
- Cloudinary integration
- Donation management
- Administrative dashboard

This section must be updated only after verifying implementation in actual source code.

## 14. Development Priorities

Implement features incrementally.

1. Authentication and authorization
2. GPS Tracking API
3. Journey progress and public map APIs
4. Blog and Video management
5. Media integration
6. Donations
7. Admin dashboard and operational improvements

Each feature should follow the existing backend architecture and be tested independently before progressing.

## 15. Project Documentation

This document records **what the project is intended to do**.

`AGENTS.md` records **how Codex should work with the project**.

CodeGraph and the actual source code describe **how the current implementation works**.

When information conflicts:

- Verify implementation claims against actual code and database.
- Preserve approved product decisions.
- Explain discrepancies before proposing changes.
- Never silently alter project requirements.
- Update documentation only when a decision or implementation status has genuinely changed.
