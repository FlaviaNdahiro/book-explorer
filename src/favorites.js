
const STORAGE_KEY = 'book-explorer-favorites'

export function getFavorites() {
  const savedFavorites = localStorage.getItem(STORAGE_KEY)

  return savedFavorites ? JSON.parse(savedFavorites) : []
}

export function addFavorite(book) {
  const favorites = getFavorites()

  const alreadySaved = favorites.some(
    (favorite) => favorite.id === book.id
  )

  if (alreadySaved) {
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
  const favorites = getFavorites()

  const updatedFavorites = favorites.filter(
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
