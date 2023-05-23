import { getImages } from "./services/planets.js"
import { builtCard } from "./utils/cards.js"

const $ = (element) => document.querySelector(element)

const $planets = $(".planets__grid")
const $search = $("#busqueda")
const $inputSeatch = $("#search")


// document.addEventListener("DOMContentLoaded", ready);
// TODO solo cargar las tarjetas por ahora
$search.addEventListener("submit", async (e) => {
  e.preventDefault()
  const $card = document.createElement("aticle")
  $card.classList.add("planets__card")
  $card.innerHTML = `
    <h3>titulo</h3>
    <p>descripccion Lorem ipsum dolor sit amet.</p>
    <button class="button">ver mas</button>
  `
  console.log($inputSeatch.value)
  const { collection } = await getImages($inputSeatch.value)
  const { items } = collection

  const dataImg = items.map((img) => {
    const data = img.data[0]
    const imagen = img.links[0].href
    const { title } = data
    const { nasa_id } = data
    const { photographer } = data

    const { description } = data
    const { location } = data
    const card = builtCard({ title, nasa_id, imagen, photographer,location })
    return card
  })
  const videoPromises = items.map(async (img) => {
    const data = img.data[0]
    const { href } = img
    const videos = await (await fetch(href)).json()
    return videos[0]
  })


  // const videos = await Promise.all(videoPromises)
  // console.log(videos);
  // console.log(dataImg);
  console.log("carga");
  $planets.innerHTML = ""
  $planets.append(
    ...dataImg
  )
})










