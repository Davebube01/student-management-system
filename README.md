# Student Information Management System

A Next.js application for managing student records with TypeScript, Tailwind CSS, and Chakra UI.

## Features

- View a list of all students
- View detailed student information
- Add new student records
- Edit existing student records
- Delete student records
- Search and filter students by name, major, or GPA
- Form validation

## Tech Stack

- **Framework**: Next.js with TypeScript
- **UI Library**: Chakra UI with Tailwind CSS
- **Form Handling**: React Hook Form with Yup validation
- **Data Storage**: In-memory database (simulated with JSON file)

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com//Davebube01/student-management-system.git
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/components/`: Reusable UI components
- `src/pages/`: Next.js pages and API routes
- `src/lib/`: Utility functions and data access methods
- `data/`: Database simulation (JSON file)

## API Endpoints

The application provides the following API endpoints:

- `GET /api/students`: Get all students
- `POST /api/students`: Create a new student
- `GET /api/students/[id]`: Get a student by ID
- `PUT /api/students/[id]`: Update a student
- `DELETE /api/students/[id]`: Delete a student

## Development Approach

This project follows a modular architecture with clearly separated concerns:

1. **Data Layer**:
   - Simulated database with JSON file
   - Type-safe data access methods

2. **UI Layer**:
   - Reusable components with Chakra UI
   - Responsive design with Tailwind CSS

3. **State Management**:
   - Server-side rendering for initial data
   - Client-side state for filtering and search

4. **Routing**:
   - Dynamic routes for student details and editing
   - API routes for data operations

## Implementation Decisions

- Using **Static Site Generation (SSG)** with revalidation for student detail pages to improve performance
- Using **Server-Side Rendering (SSR)** for the student list page to ensure up-to-date data
- Implementing client-side search for better user experience
- Form validation on both client and server side
- Using Chakra UI for accessible components while leveraging Tailwind CSS for customization