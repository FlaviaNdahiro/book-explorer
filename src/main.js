
import './style.css'

document.querySelector('#app').innerHTML = `
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

        <div id="book-list" class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <p class="text-gray-500">Our book collection will appear here soon.</p>
        </div>
      </section>
    </main>

    <footer class="mt-12 bg-gray-900 px-6 py-8 text-center text-white">
      <p>&copy; 2026 Book Explorer. Discover your next great read.</p>
    </footer>
  </div>
`
