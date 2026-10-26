
const API_URL = 'https://openlibrary.org/search.json'

export async function fetchBooks(query = 'fiction') {
  const url = `${API_URL}?q=${encodeURIComponent(query)}&limit=12`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch books. Please try again.')
  }

  const data = await response.json()

  return data.docs.map((book) => ({
    id: book.key,
    title: book.title,
    author: book.author_name?.[0] || 'Unknown author',
    year: book.first_publish_year || 'Year unknown',
    coverId: book.cover_i || null,
  }))
}
