# Repositories Explorer

A simple **GitHub user and repository explorer** built with **React** and **TypeScript**.  
Search GitHub users, view their profiles, and browse repositories. Designed **mobile-first** with good UX.

This project allows you to type a GitHub username, search for users, expand to see their repositories, and open any repository in a new tab. Loading states, errors, and empty states are handled gracefully. The app is fully responsive for mobile view.

👉 **Live Demo:** [https://repositoriesexplorer.netlify.app/](https://repositoriesexplorer.netlify.app/)

---

## Features

- Search GitHub users by username
- View user profile link
- Expand user to see repositories
- Loading skeletons for better UX
- Error handling and empty states
- Mobile-friendly responsive design
- TypeScript strict typing

---

## Requirements

- Node.js >= 20  
- npm or yarn  

> Note: Without a GitHub token, the GitHub API allows only 60 requests per hour per IP.

---

## Installation and Running

Clone the repository and install dependencies:

```bash
git clone https://github.com/fayerin/repositories-explorer.git
cd repositories-explorer
npm install
# or
yarn dev
```
---

## Start the development server
npm run dev
# or
yarn dev

---

---

## Tests
This project includes:
- Unit tests for UI components
- Integration tests for main App flow

---

## Usage

- Type a GitHub username in the search bar.
- Press Enter or click Search.
- User results appear below the search bar.
- Click on a user to expand repositories.
- Click on a repository to open it in a new tab.
- Press Esc in the search input to clear the query.
- While fetching data, the search button is disabled and a skeleton loader is shown.

---

## Known Limitations

Without a token, the GitHub API allows only 60 requests/hour per IP.

No authentication is required; however, frequent searches may hit the rate limit.

## Tech Stack

- React + TypeScript
- TailwindCSS for styling
- Vite as build tool
