# SaaS WebApp

An Angular 20 frontend for building multi-tenant SaaS products. Built on top of devextreme-gallery and redesigned to cover real-world enterprise needs out of the box.

![SaaS WebApp](/images/ui-template-gallery.png)

## What's included

This is not just a UI template. It ships with the building blocks you actually need to launch a SaaS product:

- **Auth & permissions** · Login, registration, role-based access control, and API-driven authorization
- **Subscription & pricing** · Plan management, billing cycles, upgrades, and renewals
- **Payments** · Stripe integration for checkout and invoicing
- **Master-detail views** · Full CRUD with nested detail panels, ready for any entity
- **Dashboards & analytics** · CRM boards, sales reports, and KPI cards
- **Scheduler & task management** · Planning tools with Gantt, Kanban, and calendar views

## Tech stack

| | |
|---|---|
| Angular | ~20.3 |
| DevExtreme | 25.2 |
| TypeScript | ~5.8 |
| RxJS | ^7.8 |

## Getting started

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Project structure

```
src/app/
  components/   # Reusable UI components
  layouts/      # App shell and navigation
  pages/        # Route-level views
  services/     # Data and business logic
  types/        # TypeScript definitions
  theme/        # Styles and theme variables
```

## License

This project depends on DevExtreme, which requires a [commercial license](https://js.devexpress.com/Angular/Documentation/Guide/Common/Licensing/) from DevExpress.
