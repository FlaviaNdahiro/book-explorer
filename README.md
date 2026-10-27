# Book Explorer

Book Explorer is a responsive web application that helps readers discover books, explore new stories, and save their favorite books.

## Features

- **Search Books:** Search for books by title.
- **Book Information:** View book titles, authors, publication years, and cover images when available.
- **Favorites:** Add books to your favorites and remove them whenever you want.
- **Persistent Storage:** Favorite books remain saved in the browser using localStorage.
- **Responsive Design:** Browse the application on desktop and mobile screens.
- **Multiple Pages:** Navigate between Home, Favorites, and About pages.
- **Loading Indicator:** See a loading spinner while books are being fetched.
- **Error Handling:** Display messages when no books are found or when loading fails.

## Technologies Used

- HTML5
- Tailwind CSS v4
- JavaScript (ES Modules)
- Vite
- Open Library API
- Browser localStorage
- Git and GitHub

## API

Book Explorer uses the [Open Library Search API](https://openlibrary.org/developers/api) to retrieve book information and the Open Library Covers service to display available book covers.

## Getting Started

### Prerequisites

- Node.js
- npm
- A web browser

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/FlaviaNdahiro/book-explorer.git
   ```

2. Open the project folder:

   ```bash
   cd book-explorer
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

## Project Pages

- **Home:** Search and explore books.
- **Favorites:** View and remove saved books.
- **About:** Learn about Book Explorer.

## Author

Flavia Ndahiro

GitHub: [FlaviaNdahiro](https://github.com/FlaviaNdahiro)
