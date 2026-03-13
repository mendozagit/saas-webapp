# SaaS WebApp

Angular 20+ application built with DevExtreme UI components. It provides responsive UI templates for common LOB (Line of Business) patterns including CRM, analytics dashboards, planning, and user management.

![SaaS WebApp](/images/ui-template-gallery.png)

## Prerequisites

- Node.js 18+
- npm 9+
- **A valid [DevExtreme license](https://js.devexpress.com/Licensing/)** is required to use the DevExtreme components in this project. [Free trial available](https://js.devexpress.com/Buy/).

## Tech Stack

- **Angular** ~20.3
- **DevExtreme** 25.2 (`devextreme`, `devextreme-angular`)
- **TypeScript** ~5.8
- **RxJS** ^7.8

## Get Started

```bash
npm install
npm start
```

The app will be available at `http://localhost:4200`.

## Project Structure

```
src/
  app/
    components/   # Reusable UI components
    layouts/      # Application layouts
    pages/        # Route-level page components
    services/     # Angular services
    types/        # TypeScript type definitions
    theme/        # Theme styles and variables
```

## License

This project depends on **DevExtreme**, which requires a commercial license from DevExpress. Review the [DevExtreme License Agreement](https://js.devexpress.com/Licensing/) before using this project in production.
