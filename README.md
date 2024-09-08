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

### Useful resources

- [Convert relative time to datetime in Javascript](https://stackoverflow.com/questions/49689463/convert-relative-time-to-datetime-in-javascript)
- [fakeIndexedDB and vitest](https://github.com/jsdom/jsdom/issues/3363#issuecomment-1921575184)

## Author

- Website - [Richard Cyrus](https://www.richardcyrus.com)
- Frontend Mentor - [@richardcyrus](https://www.frontendmentor.io/profile/richardcyrus)
