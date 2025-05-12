# CodeLeap Network

**Deployed on:** Vercel  
**Live Demo:** [https://codeleap-challenge-theta.vercel.app/](https://codeleap-challenge-theta.vercel.app/)  
**Author:** Gabriel Nogueira

> **Note:** This repository contains the solution to the CodeLeap Challenge, completed as part of the application process for a **Junior Frontend Engineer** position.

## Table of Contents

- [CodeLeap Network](#codeleap-network)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Potential future Improvements](#potential-future-improvements)

## Overview

CodeLeap Network is a React application where users can create, read, update, and delete posts in a social feed. _All_ authentication flows—email/password sign-up and login, anonymous “guest” login, profile updates, and sign-out—are managed via Firebase Authentication. The UI is styled using SCSS, and the app is deployed on Vercel.

## Features

- **SCSS Styling**
  Modular and maintainable SCSS architecture for components and pages.

- **Firebase Authentication (All Flows)**

  - **Email & Password**: Users create accounts and log in securely.
  - **Anonymous “Guest”**: Users start an anonymous Firebase session and set a display name.
  - **Secure Logout**: Sign-out via Firebase.

- **Firestore Integration**

  - Store guest usernames and profile info in Firestore “users” collection.
  - Real-time auth-state listener.

- **Routing & Guards**

  - React Router for SPA navigation.
  - Protected routes (e.g. `/main`) require a Firebase-authenticated user.
  - Redirects to login/guest modal when unauthenticated.

- **CRUD Posts via REST API**

  - Create posts (title, content, author handle).
  - Fetch posts and display in feed.
  - Edit & delete only your own posts (with confirmation modals).
  - Relative “time ago” formatting via date-fns.

- **Responsive Modals & Forms**

  - Reusable sign-up, login, and guest-login modals.
  - Client-side validation: email format, password ≥ 6 chars, unique guest username.
  - Shared button and form components for consistency.

## Tech Stack

- **Framework:** React with TypeScript
- **Styling:** SCSS, React Icons, React Tooltip
- **Routing:** React Router v6
- **Auth & Database:** Firebase Authentication & Firestore
- **Date Handling:** date-fns
- **Deployment:** Vercel

## Project Structure

```
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── codeleap_icon.png
├── src
│   ├── App.scss
│   ├── App.tsx
│   ├── components
│   │   ├── BaseComponents
│   │   │   ├── BaseButton
│   │   │   │   └── BaseButton.tsx
│   │   │   ├── BaseModal
│   │   │   │   └── BaseModal.tsx
│   │   │   ├── ModalLogin
│   │   │   │   ├── ModalGuest.tsx
│   │   │   │   └── ModalLogin.tsx
│   │   │   └── Modals
│   │   │       ├── DeleteModal
│   │   │       │   └── DeleteModal.tsx
│   │   │       └── EditModal
│   │   │           └── EditModal.tsx
│   │   ├── Form
│   │   │   ├── Form.tsx
│   │   │   └── Post
│   │   │       ├── Post.tsx
│   │   │       └── PostForm
│   │   │           └── PostForm.tsx
│   │   ├── Modal
│   │   │   └── Modal.tsx
│   │   └── ModalSignUp
│   │       └── ModalSignUp.tsx
│   ├── firebase.ts
│   ├── hooks
│   │   └── usePosts.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── MainPage
│   │   │   └── MainPage.tsx
│   │   └── SignUp
│   │       └── SignUp.tsx
│   ├── styles
│   │   ├── BaseButton.scss
│   │   ├── BaseModal.scss
│   │   ├── DeleteModal.scss
│   │   ├── Form.scss
│   │   ├── Modal.scss
│   │   ├── ModalSignUp.scss
│   │   ├── Post.scss
│   │   └── PostForm.scss
│   ├── types
│   │   ├── AuthContext.ts
│   │   └── Post.ts
│   ├── utils
│   │   ├── AuthContext.tsx
│   │   ├── apiAccess.ts
│   │   ├── helpers.ts
│   │   └── loginWithUsername.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

## Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/Bielnog/codeleap-challenge.git
   cd codeleap-challenge
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:5173`.

## Usage

1. **Sign Up / Login**

   - Click “Create Account” to register with email & password.
   - Or click “Login as Guest” to start an anonymous Firebase session with a chosen username, you won't be able to log in again using this username.

2. **Main Feed**

   - Submit new posts (title & body).
   - Edit or delete your own posts.
   - View author handle and relative timestamp.

3. **Logout**

   - Click the logout icon, which signs out via Firebase.

## Potential future Improvements

- **Infinite scroll** for the feed
- **User avatars** and profile pages
- **Commenting** and reactions (likes)

_Authored by Gabriel Nogueira_
