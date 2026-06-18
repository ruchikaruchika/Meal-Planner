# SmartMeal Planner

SmartMeal Planner is a web application designed to help users organize their weekly meals and manage grocery shopping more efficiently. The application allows users to generate meal plans based on their preferences, create grocery lists automatically, and keep track of their shopping items in one place.

## Key Features

### Weekly Meal Planning

Users can generate personalized meal plans according to their dietary preferences, calorie requirements, and food restrictions. This helps simplify meal preparation throughout the week.

### Grocery List Management

The application automatically creates grocery lists from selected meal plans. Users can add, edit, delete, and mark items as completed, making shopping more organized and convenient.

### User Authentication

The system includes account registration and login functionality. User sessions are stored locally, allowing users to remain logged in even after refreshing the browser.

### Responsive Interface

The application is designed to work smoothly across desktops, tablets, and mobile devices, providing a consistent user experience on different screen sizes.

---

## Technologies Used

* **React 18** for building the user interface
* **TypeScript** for type-safe development
* **Vite** for fast development and build processes
* **Tailwind CSS** for styling
* **Shadcn/UI** for reusable UI components
* **React Context API** for state management
* **localStorage** for client-side data persistence
* **Supabase** (optional integration) for future backend and database support

---

## Project Structure

```text
Meal-Planner-Final-Working/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── scripts/
├── docs/
├── .env.example
├── .gitignore
└── README.md
```

---

## Installation and Setup

### Prerequisites

Before running the project, make sure the following are installed:

* Node.js (version 18 or later)
* npm

### Automatic Setup (Recommended)

The easiest way to set up the project is to use the provided setup scripts. These scripts will automatically verify your environment, install missing tools (Node.js, npm, Git), install all project dependencies, configure `.env` files, and run security audits.

**Windows:**
```bat
cd scripts
install-dependencies.bat
```

**Linux / macOS:**
```bash
cd scripts
chmod +x install-dependencies.sh
./install-dependencies.sh
```

**How the scripts work:**
1. **Environment Verification:** Checks for Node.js, npm, and Git.
2. **Auto Installation:** Installs missing global tools via `winget`/`choco` (Windows) or `brew`/`apt`/`dnf`/`pacman` (Linux/macOS).
3. **Frontend Setup:** Installs all `npm` dependencies, generates `package-lock.json` if missing, and runs safe audit fixes.
4. **Environment Config:** Automatically creates `.env` files from `.env.example` templates.
5. **Validation:** Verifies the complete stack before completing.

These scripts are idempotent, meaning you can safely run them multiple times without breaking anything.

### Manual Setup

If you prefer to install dependencies manually:

```bash
git clone <repository-url>
cd Meal-Planner-Final-Working/frontend
npm install
npm run dev
```

After starting the development server, the application can be accessed through:

```text
http://localhost:8080
```

---

## Startup Scripts

### Windows

```bat
cd scripts
start-project.bat
```

### Linux/macOS

```bash
cd scripts
./start-project.sh
```

---

## Stopping the Application

### Windows

```bat
cd scripts
stop-project.bat
```

### Linux/macOS

```bash
cd scripts
./stop-project.sh
```

---

## Environment Configuration

The project includes support for Supabase integration. If required, configure the following variables inside the environment file:

| Variable                      | Purpose                     |
| ----------------------------- | --------------------------- |
| VITE_SUPABASE_PROJECT_ID      | Supabase project identifier |
| VITE_SUPABASE_PUBLISHABLE_KEY | Public API key              |
| VITE_SUPABASE_URL             | Supabase project URL        |

Currently, most application data is stored using localStorage, allowing the project to run without requiring a database setup.

---

## Authentication System

The application includes:

* User Registration
* User Login
* Session Persistence
* Local Storage Based Authentication

These features allow users to securely access and manage their meal plans and grocery lists.

---

## Common Issues

| Problem                       | Possible Solution                                                  |
| ----------------------------- | ------------------------------------------------------------------ |
| Dependency installation fails | Delete node_modules and package-lock.json, then reinstall packages |
| Port already in use           | Stop existing processes or use the provided stop script            |
| Login issues                  | Clear browser localStorage and try again                           |
| Build errors                  | Run TypeScript checks and verify dependencies                      |

---

## Future Improvements

Some planned enhancements for future versions include:

* Full Supabase database integration
* Cloud synchronization
* User profile management
* Nutrition tracking
* Recipe recommendations
* Advanced meal customization

---

## Conclusion

SmartMeal Planner was developed to simplify meal organization and grocery management through an easy-to-use interface. The project demonstrates practical use of modern frontend technologies, state management, authentication, and responsive design principles while providing a useful real-world solution for everyday meal planning.



