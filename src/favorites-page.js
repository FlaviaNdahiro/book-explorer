
import './style.css'
import { getFavorites, removeFavorite } from './favorites.js'

const app = document.querySelector('#app')

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
  const favorites = getFavorites()

  app.innerHTML = `
    <div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col">

      <!-- Navigation: matches the Home page -->
      <header class="bg-blue-900 text-white">
        <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="index.html" class="text-2xl font-bold">
            Book Explorer
          </a>

          <div class="flex gap-5 text-sm font-medium">
            <a href="index.html" class="hover:text-blue-200">Home</a>
            <a href="favorites.html" class="font-bold text-blue-200 hover:text-white">Favorites</a>
            <a href="about.html" class="hover:text-blue-200">About</a>
          </div>
        </nav>
      </header>

      <!-- Main content -->
      <main class="mx-auto w-full max-w-6xl flex-1 px-6 py-16">

        <h1 class="text-3xl font-bold text-gray-900">
          My Favorite Books
        </h1>

        <p class="mt-2 mb-8 text-gray-600">
          Your saved books are collected here.
        </p>

        ${
          favorites.length === 0
            ? `
              <section class="rounded-2xl bg-blue-100 px-6 py-12 text-center sm:px-12">
                <h2 class="text-2xl font-bold text-gray-900">
                  No favorites yet 📚
                </h2>

                <p class="mx-auto mt-4 max-w-2xl text-gray-600">
                  You haven't saved any books yet. Explore books and add your favorites!
                </p>

                <a
                  href="index.html"
                  class="mt-6 inline-block rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                >
                  Explore Books
                </a>
              </section>
            `
            : `
              <section class="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">

                ${favorites.map((book) => `
                  <article class="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">

                    <div class="flex h-64 items-center justify-center bg-white p-4">
                      ${
                        book.coverId
                          ? `
                            <img
                              src="https://covers.openlibrary.org/b/id/${encodeURIComponent(book.coverId)}-M.jpg"
                              alt="Cover of ${escapeHTML(book.title)}"
                              class="h-full max-w-full object-contain"
                              loading="lazy"
                            >
                          `
                          : `
                            <div class="flex h-full w-full items-center justify-center bg-blue-100 text-blue-900">
                              No cover available
                            </div>
                          `
                      }
                    </div>

                    <div class="flex flex-1 flex-col p-4">
                      <h2 class="text-lg font-bold">
                        ${escapeHTML(book.title)}
                      </h2>

                      <p class="mt-2 text-sm text-gray-600">
                        Author: ${escapeHTML(book.author || 'Unknown author')}
                      </p>

                      <p class="mt-1 text-sm text-gray-500">
                        Published: ${escapeHTML(String(book.year || 'Year unknown'))}
                      </p>

                      <button
                        type="button"
                        data-remove-favorite="${escapeHTML(book.id)}"
                        class="mt-auto mt-4 w-full rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Remove Favorite
                      </button>
                    </div>

                  </article>
                `).join('')}

              </section>
            `
        }

      </main>

      <!-- Footer: matches the Home page -->
      <footer class="mt-12 bg-gray-900 px-6 py-8 text-center text-white">
        <p>&copy; 2026 Book Explorer. Discover your next great read.</p>
      </footer>

    </div>
  `

  app.querySelectorAll('[data-remove-favorite]').forEach((button) => {
    button.addEventListener('click', () => {
      removeFavorite(button.dataset.removeFavorite)
      displayFavorites()
    })
  })
}

displayFavorites()
