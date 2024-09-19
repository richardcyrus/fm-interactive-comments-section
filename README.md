# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Interactive comments section solution](#frontend-mentor---interactive-comments-section-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Expected behaviour](#expected-behaviour)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

To build out this interactive comments section and get it looking as close to the design as possible.

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Expected behaviour

- First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
- Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
- A confirmation modal should pop up before a comment or reply is deleted.
- Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.
- You can only edit or delete your own comments and replies.

### Screenshot

![Desktop design](./design/desktop-design.jpg)

### Links

- Solution URL
- [Live Site URL](https://www.richardcyrus.com/fm-interactive-comments-section)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Vite.js](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Vitest](https://vitest.dev/) - Next Generation Testing Framework
- [Testing Library](https://testing-library.com) - Simple and complete testing utilities that encourage good testing practices
- [tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework
- [Chrono](https://github.com/wanasit/chrono) - A natural language date parser in Javascript.
- [Dexie.js](https://dexie.org/) - A Minimalistic Wrapper for IndexedDB
- [fake-indexeddb](https://github.com/dumbmatter/fakeIndexedDB) - A pure JS in-memory implementation of the IndexedDB API
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps.

### What I learned

- When building the reset to initial data functionality for the app, use the `key` prop on the `<UserSwitcher /`> component to force a re-render when the IndexedDB is re-initialized. This causes the displayed user to reset correctly.
- In Dexie.js 4.x optimizations were introduced for the `useLiveQuery` hook. Those optimizations caused the user list selection to be multiplied each time IndexedDB was reset. To eliminate this issue, the optimization had to be disabled. This forces `useLiveQuery` to only update after transactions are committed (disables optimistic updates).

### Useful resources

- [Convert relative time to datetime in Javascript](https://stackoverflow.com/questions/49689463/convert-relative-time-to-datetime-in-javascript)
- [fakeIndexedDB and vitest](https://github.com/jsdom/jsdom/issues/3363#issuecomment-1921575184)
- [Authentication with React Router v6: A complete guide](https://blog.logrocket.com/authentication-react-router-v6/)
- [How to manage user authentication With React JS](https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5)
- [Re-initialize Dexie](https://github.com/dexie/Dexie.js/issues/521#issuecomment-298136079)
- [How and when to force a React component to re-render](https://blog.logrocket.com/how-when-to-force-react-component-re-render/)

## Author

- Website - [Richard Cyrus](https://www.richardcyrus.com)
- Frontend Mentor - [@richardcyrus](https://www.frontendmentor.io/profile/richardcyrus)
