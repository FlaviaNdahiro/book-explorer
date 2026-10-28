
import './style.css'
import { fetchBooks } from './fetchBooks.js'
import { addFavorite, isFavorite } from './favorites.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <header class="bg-blue-900 text-white">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="index.html" class="text-2xl font-bold">
          Book Explorer
        </a>

        <div class="flex gap-5 text-sm font-medium">
          <a href="index.html" class="hover:text-blue-200">Home</a>
          <a href="favorites.html" class="hover:text-blue-200">Favorites</a>
          <a href="about.html" class="hover:text-blue-200">About</a>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-16">
      <section class="rounded-2xl bg-blue-100 px-6 py-12 text-center sm:px-12">
        <h1 class="text-3xl font-bold sm:text-5xl">
          Discover Your Next Favorite Book
        </h1>

        <p class="mx-auto mt-4 max-w-2xl text-gray-600">
          Explore books, discover new stories, and save your favorites.
        </p>

        <form id="search-form" class="mx-auto mt-8 flex max-w-xl gap-2">
          <input
            id="search-input"
            type="search"
            placeholder="Search books by title..."
            aria-label="Search books by title"
            class="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            class="rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Search
          </button>
        </form>
      </section>

      <section class="mt-12">
        <h2 class="text-2xl font-bold">Explore Books</h2>

        <p class="mt-2 text-gray-600">
          Your next great read is waiting for you.
        </p>

        <div
          id="book-list"
          class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          aria-live="polite"
        >
          <p class="text-gray-500">Loading books...</p>
        </div>
      </section>
    </main>

    <footer class="mt-12 bg-gray-900 px-6 py-8 text-center text-white">
      <p>&copy; 2026 Book Explorer. Discover your next great read.</p>
    </footer>
  </div>
`

const bookList = document.querySelector('#book-list')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

let currentBooks = []

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character])
}

function displayBooks(books) {
  if (books.length === 0) {
    bookList.innerHTML = `
      <p class="col-span-full text-gray-500">
        No books found. Try another title.
      </p>
    `
    return
  }

  bookList.innerHTML = books.map((book) => `
    <article class="overflow-hidden rounded-xl bg-white shadow hover:shadow-lg">
      ${
        book.coverId
          ? `<img
              src="https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg"
              alt="Cover of ${escapeHTML(book.title)}"
              class="h-64 w-full object-cover"
            >`
          : `<div class="flex h-64 items-center justify-center bg-blue-100 text-blue-900">
              No cover available
            </div>`
      }

      <div class="p-4">
        <h3 class="text-lg font-bold">${escapeHTML(book.title)}</h3>

        <p class="mt-2 text-sm text-gray-600">
          Author: ${escapeHTML(book.author)}
        </p>

        <p class="mt-1 text-sm text-gray-500">
          Published: ${escapeHTML(String(book.year))}
        </p>

        <button
          type="button"
          data-favorite-id="${escapeHTML(book.id)}"
          class="mt-4 w-full rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
        >
          ${isFavorite(book.id) ? 'Saved ❤️' : 'Add to Favorites ♡'}
        </button>
      </div>
    </article>
  `).join('')
}

function showLoading() {
  bookList.innerHTML = `
    <div class="col-span-full flex flex-col items-center justify-center py-12">
      <div
        class="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-900"
        role="status"
        aria-label="Loading"
      ></div>
      <p class="mt-4 text-gray-500">Loading books...</p>
    </div>
  `
}

async function loadBooks(query = 'fiction') {
  showLoading()

  try {
    const books = await fetchBooks(query)

    currentBooks = books
    displayBooks(books)
  } catch (error) {
    console.error('Failed to load books:', error)

    currentBooks = []

    bookList.innerHTML = `
      <div class="col-span-full rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <h3 class="text-lg font-bold text-red-700">
          Unable to load books
        </h3>

        <p class="mt-2 text-red-600" role="alert">
          We couldn't load books right now. Please check your internet connection and try again.
        </p>

        <button
          id="retry-search"
          type="button"
          class="mt-4 rounded-lg bg-blue-900 px-5 py-2 font-semibold text-white hover:bg-blue-800"
        >
          Try Again
        </button>
      </div>
    `

    document.querySelector('#retry-search').addEventListener('click', () => {
      loadBooks(searchInput.value.trim() || query || 'fiction')
    })
  }
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const query = searchInput.value.trim()

  if (query === '') {
    loadBooks()
    return
  }

  loadBooks(query)
})

bookList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-favorite-id]')

  if (!button) {
    return
  }

  const bookId = button.dataset.favoriteId
  const book = currentBooks.find((item) => item.id === bookId)

  if (!book) {
    return
  }

  addFavorite(book)
  button.textContent = 'Saved ❤️'
})

loadBooks()
