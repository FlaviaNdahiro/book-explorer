
import './style.css'
import { getFavorites, removeFavorite } from './favorites.js'

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <header class="bg-blue-900 text-white">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="index.html" class="text-2xl font-bold">Book Explorer</a>

        <div class="flex gap-5 text-sm font-medium">
          <a href="index.html" class="hover:text-blue-200">Home</a>
          <a href="favorites.html" class="text-blue-200">Favorites</a>
          <a href="about.html" class="hover:text-blue-200">About</a>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-12">
      <h1 class="text-3xl font-bold">My Favorite Books ❤️</h1>
      <p class="mt-2 text-gray-600">
        Your saved books are collected here.
      </p>

      <div id="favorites-list"
        class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      </div>
    </main>

    <footer class="mt-12 bg-gray-900 px-6 py-8 text-center text-white">
      <p>&copy; 2026 Book Explorer. Discover your next great read.</p>
    </footer>
  </div>
`

const favoritesList = document.querySelector('#favorites-list')

function displayFavorites() {
  const favorites = getFavorites()

  if (favorites.length === 0) {
    favoritesList.innerHTML = `
      <p class="text-gray-500">
        You haven't saved any books yet.
        <a href="index.html" class="font-semibold text-blue-900 underline">
          Explore books
        </a>
      </p>
    `
    return
  }

  favoritesList.innerHTML = favorites.map((book) => `
    <article class="overflow-hidden rounded-xl bg-white shadow">
      ${
        book.coverId
          ? `<img
              src="https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg"
              alt="Book cover"
              class="h-64 w-full object-cover"
            >`
          : `<div class="flex h-64 items-center justify-center bg-blue-100 text-blue-900">
              No cover available
            </div>`
      }

      <div class="p-4">
        <h2 class="text-lg font-bold">${escapeHTML(book.title)}</h2>
        <p class="mt-2 text-sm text-gray-600">
          Author: ${escapeHTML(book.author)}
        </p>
        <p class="mt-1 text-sm text-gray-500">
          Published: ${escapeHTML(String(book.year))}
        </p>

        <button
          type="button"
          data-remove-id="${escapeHTML(book.id)}"
         style="background-color: #1e40af; color: white; padding: 10px; width: 100%; border: none; border-radius: 8px; cursor: pointer; margin-top: 16px; font-weight: 600;">
          
          Remove Favorite
        </button>
      </div>
    </article>
  `).join('')
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character])
}

favoritesList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove-id]')

  if (!button) return

  removeFavorite(button.dataset.removeId)
  displayFavorites()
})

displayFavorites()

