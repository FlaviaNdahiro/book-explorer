
const STORAGE_KEY = 'book-explorer-favorites'

export function getFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) return []

    const favorites = JSON.parse(saved)

    if (!Array.isArray(favorites)) return []

    return favorites
  } catch (error) {
    console.error('Error reading favorites:', error)
    return []
  }
}

export function addFavorite(book) {
  const favorites = getFavorites()

  if (favorites.some((item) => item.id === book.id)) {
    return favorites
  }

  const updatedFavorites = [...favorites, book]

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedFavorites)
  )

  return updatedFavorites
}

export function removeFavorite(bookId) {
  const updatedFavorites = getFavorites().filter(
    (book) => book.id !== bookId
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedFavorites)
  )

  return updatedFavorites
}

export function isFavorite(bookId) {
  return getFavorites().some(
    (book) => book.id === bookId
  )
}
