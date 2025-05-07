# Notes App Frontend

## Cloud link 

[https://vercel.com/akash-aryans-projects-cde69f05/notes-frontend/HT1oufFwHW8rGeaiy3dMHuzxTnTF](https://notes-frontend-le9dn3oyh-akash-aryans-projects-cde69f05.vercel.app/)

## Features Implemented

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Persistent sessions
- Secure password handling

### Notes Management
- Create new notes with title and content
- Edit existing notes
- Delete notes
- Markdown support for note content
- Note pinning functionality
- Real-time preview of markdown content
- Responsive grid/list view of notes

### User Experience
- Dark/Light mode toggle
- Responsive design for all screen sizes
- Toast notifications for user feedback
- Loading states and error handling
- Smooth transitions and animations
- Markdown guide for content formatting

### Additional Features
- Search functionality for notes
- Note filtering and sorting
- User profile management
- Clean and intuitive UI/UX
- Mobile-first approach

## Technology Stack

### Core Technologies
- React 18
- Vite (Build tool)
- React Router v6 (Routing)
- Styled Components (Styling)
- Axios (API client)

### State Management & Data Flow
- React Context API
- Custom hooks for business logic
- Local storage for persistence

### UI/UX Libraries
- React Icons
- React Toastify (Notifications)
- React MD Editor (Markdown editor)
- Styled Components (CSS-in-JS)

### Development Tools
- ESLint (Code linting)
- Prettier (Code formatting)
- Vite (Development server)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notes-app/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`


## Project Structure

src/
├── assets/ # Static assets
├── components/ # Reusable components
│ ├── auth/ # Authentication components
│ ├── layout/ # Layout components
│ ├── notes/ # Notes-related components
│ └── ui/ # UI components
├── context/ # React context providers
├── hooks/ # Custom React hooks
├── pages/ # Page components
├── services/ # API services
├── styles/ # Global styles
└── utils/ # Utility functions

