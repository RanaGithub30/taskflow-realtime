# Task Management System

A modern full-stack task management application built with Laravel for the backend and React for the frontend. The platform is designed to help users and teams organize tasks, track progress, and manage work efficiently.

## Overview

This project combines a robust Laravel API with a responsive React interface to provide a seamless task management experience. It includes authentication, task handling, and a clean user interface for day-to-day productivity.

## Features

- User authentication and authorization
- Create, update, delete, and view tasks
- Task status tracking
- Responsive and modern UI
- RESTful API architecture
- Secure backend services with Laravel

## Tech Stack

### Backend
- Laravel 12
- PHP 8.2+
- Sanctum for API authentication
- MySQL / SQLite support

### Frontend
- React 18
- React Router DOM
- Axios

## Project Structure

- backend/ - Laravel API and application logic
- frontend/ - React client application
- README.md - Project documentation

## Prerequisites

Before running the project, make sure you have the following installed:

- PHP 8.2 or higher
- Composer
- Node.js 18 or higher
- npm or yarn
- A database such as MySQL or SQLite

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd taskflow-realtime
```

### 2. Backend setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

The backend API will typically run at:

```text
http://127.0.0.1:8000
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend application will usually run at:

```text
http://127.0.0.1:5173
```

## Environment Configuration

Update the backend environment file with your database and application settings:

```env
APP_NAME="Task Management"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_management
DB_USERNAME=root
DB_PASSWORD=
```

## Development Notes

- Run backend changes from the backend directory.
- Run frontend changes from the frontend directory.
- Make sure both services are running simultaneously for full functionality.

## License

This project is open-source and available under the MIT license.
