
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
          <a href="about.html" class="text-blue-200">About</a>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-4xl px-6 py-16">
      <section class="rounded-2xl bg-white p-8 shadow sm:p-12">
        <h1 class="text-3xl font-bold text-blue-900 sm:text-4xl">
          About Book Explorer
        </h1>

        <p class="mt-6 leading-7 text-gray-600">
          Book Explorer is a simple web application that helps readers
          discover books and explore new stories.
        </p>

        <h2 class="mt-8 text-2xl font-bold">
          What You Can Do
        </h2>

        <ul class="mt-4 list-disc space-y-3 pl-6 text-gray-600">
          <li>Search for books by title.</li>
          <li>Explore book covers, authors, and publication years.</li>
          <li>Save your favorite books in your browser.</li>
          <li>Remove books from your favorites whenever you want.</li>
        </ul>

        <h2 class="mt-8 text-2xl font-bold">
          Where Do the Books Come From?
        </h2>

        <p class="mt-4 leading-7 text-gray-600">
  Book Explorer uses the Open Library API to retrieve book
  information and cover images when available.
</p>

<div class="mt-8">
  <a
    href="index.html"
    class="inline-block rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
  >
    Explore Books
  </a>
</div>
      </section>
    </main>

    <footer class="bg-gray-900 px-6 py-8 text-center text-white">
      <p>&copy; 2026 Book Explorer. Discover your next great read.</p>
    </footer>
  </div>
`
