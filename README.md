# Cafecitos

Cafecitos is a Laravel application for keeping a personal coffee journal and exploring coffee-related places.

## Stack

- Laravel 13 and PHP 8.5
- Inertia.js with React and TypeScript
- Tailwind CSS 4
- SQLite

## Setup

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
composer run dev
```

The application will be available at [http://localhost:8000](http://localhost:8000).

## Checks

```bash
php artisan test
npm run types:check
npm run lint:check
npm run build
```

