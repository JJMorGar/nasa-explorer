export const getImages = async (query) => {
  try {
    const api = `https://images-api.nasa.gov/search?q=${query}&media_type=video`
    const res = await fetch(api)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error);
  }
}
