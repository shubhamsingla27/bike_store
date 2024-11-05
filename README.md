# BikeStore Web Application

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
  - [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
  - [Schema Definition](#schema-definition)
  - [Running Migrations](#running-migrations)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

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

├── components           # Reusable UI components
├── db                   # Database setup and schema definitions
├── lib                  # Helper functions and API functions
├── pages                # Next.js pages and API routes
├── public               # Public assets (images, icons)
├── styles               # Global CSS and styling files
└── README.md            # Project documentation

