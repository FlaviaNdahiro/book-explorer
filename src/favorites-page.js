
import './style.css'
import { getFavorites, removeFavorite } from './favorites.js'

const favoritesContainer =
  document.querySelector('#favorites-container') ||
  document.querySelector('#favorites-list') ||
  document.querySelector('#favorites-grid')

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return entities[character]
  })
}

function displayFavorites() {
  if (!favoritesContainer) {
    console.error('Favorites container was not found in favorites.html.')
    return
  }

  const favorites = getFavorites()

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = `
      <div class="col-span-full py-12 text-center">
        <h2 class="mb-3 text-2xl font-bold">No favorites yet 📚</h2>
        <p class="mb-6 text-gray-600">
          You haven't saved any books yet. Explore books to find your favorites!
        </p>
        <a
          href="/index.html"
          class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Explore Books
        </a>
      </div>
    `
    return
  }

  favoritesContainer.innerHTML = `
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      ${favorites.map((book) => `
        <article class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          ${
            book.coverId
              ? `<img
                   src="https://covers.openlibrary.org/b/id/${encodeURIComponent(book.coverId)}-M.jpg"
                   alt="Cover of ${escapeHTML(book.title)}"
                   class="h-64 w-full object-contain p-4"
                   loading="lazy"
                 >`
              : `<div class="flex h-64 items-center justify-center bg-gray-100 text-gray-500">
                   No cover available
                 </div>`
          }

          <div class="p-5">
            <h2 class="mb-2 text-lg font-bold">
              ${escapeHTML(book.title)}
            </h2>

            <p class="mb-1 text-gray-600">
              Author: ${escapeHTML(book.author || 'Unknown author')}
            </p>

            <p class="mb-4 text-gray-600">
              Year: ${escapeHTML(book.year || 'Year unknown')}
            </p>

            <button
              type="button"
              data-remove-favorite="${escapeHTML(book.id)}"
              class="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              Remove Favorite
            </button>
          </div>
        </article>
      `).join('')}
    </div>
  `

  favoritesContainer
    .querySelectorAll('[data-remove-favorite]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        removeFavorite(button.dataset.removeFavorite)
        displayFavorites()
      })
    })
}

displayFavorites()
