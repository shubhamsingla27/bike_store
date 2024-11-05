# BikeStore Web Application

Hosted on Vercel, Demo:
[Bike Store](https://bike-store-beta.vercel.app/)

BikeStore is a web application for managing bike inventory and browsing bikes available in the store. It features CRUD functionality for bike entries, user authentication, and filtering options for easy navigation. The application is built with Next.js, Drizzle ORM, Neon PostgreSQL, and Tailwind CSS.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Database Setup](#database-setup)
  - [Schema Definition](#schema-definition)
  - [Running Migrations](#running-migrations)
- [Available Scripts](#available-scripts)

---

## Project Overview
BikeStore is a full-stack application that allows users to browse, filter, and manage an inventory of bikes. It is designed to be user-friendly with a responsive UI and supports real-time data updates.

## Features
- **CRUD Operations:** Add, view, edit, and delete bikes from the store inventory.
- **Search and Filter:** Filter bikes by name and type.
- **User Authentication:** Secure user authentication using NextAuth.
- **Responsive Design:** Built with Tailwind CSS for mobile-friendly responsiveness.
- **Database Integration:** Uses Neon PostgreSQL as the database with Drizzle ORM for database interaction.

## Technologies Used
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API Routes, Drizzle ORM
- **Database:** Neon PostgreSQL
- **Authentication:** NextAuth
- **Deployment:** Vercel, Neon DB

## Project Structure

```bash
├── components           # Reusable UI components
├── db                   # Database setup and schema definitions
├── lib                  # Helper functions and API functions
├── pages                # Next.js pages and API routes
├── public               # Public assets (images, icons)
├── styles               # Global CSS and styling files
└── README.md            # Project documentation
```
## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- PostgreSQL (Use Neon DB for cloud-hosted PostgreSQL)
- NPM or Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bikestore.git
cd bikestore
```
2. Install dependencies:
```
npm install
or
yarn install
```
3. Set up environment variables: Create a .env.local file in the root directory and add the following environment variables:
```
DATABASE_URL=your_neon_database_url
AUTH_SECRET=your_oauth_secret
AUTH_GITHUB_ID=your_github_oauth_id
AUTH_GITHUB_SECRET=your_github_oauth_secret
```
## Database Setup

### Schema Definition 
The database schema is defined in db/schema.ts. The main bikes table includes fields such as:
```
    id: Unique identifier for each bike
    name: Bike name
    image: URL to the bike's image
    price: Price of the bike
    description: Description of the bike
    type: Type/category of bike (e.g., Mountain, Electric)
    quantity: Number of bikes available
    rating: Average rating of the bike
```

### Running Migrations
1. Generate migrations using Drizzle's CLI:
```
drizzle-kit generate
```
2. Run migrations:
```
drizzle-kit push
```

## Available Scripts
In the project directory, you can run:
```
    npm run dev: Runs the app in development mode at http://localhost:3000
    npm run build: Builds the app for production
    npm run start: Starts the production build
    db:generate: Generates migration files
    db:migrate: Applies migration files to the database
```

