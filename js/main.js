import { getImages } from "./services/planets.js";
import { builtCard } from "./utils/cards.js";

const $ = (element) => document.querySelector(element);

const $planets = $(".planets__grid");
const $search = $("#busqueda");
const $inputSeatch = $("#search");
const $modalCard = $("#modal-card");
const $videoCard = $("#video-url");

$planets.addEventListener("click", async (e) => {
  const $element = e.target;
  if ($element.id === "button--card") {
    const idImg = $element.parentElement.id;
    const api = `https://images-assets.nasa.gov/video/${idImg}/collection.json`;
    const data = await (await fetch(api)).json();
    const urlVideo = data.find((link) => {
      console.log(link.split(".").at(-1));
      return link.split(".").at(-1) === "mp4";
    });

    $modalCard.innerHTML = "";
    $modalCard.innerHTML = `
      <article class="modal">
        <header>
          <a id="modalClose" href="#close" aria-label="Close" class="close"></a>
          Modal title
        </header>
        <body>
          <video class="video-modal" width="420" height="240" controls>
            <source id="video-url" src="${urlVideo}" type="video/mp4" />
          </video>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id ut
            repellat nihil, quos magnam quisquam velit? Iusto reiciendis
            inventore, quo velit perferendis beatae, optio, rerum architecto
            quae sapiente quisquam laudantium expedita corporis blanditiis ex!
            Maxime iure delectus facere laborum adipisci.
          </p>
        </body>
      </article>
    `;

    $modalCard.showModal()
  }
});

$modalCard.addEventListener("click", (e) => {
  const $element = e.target;
  if ($element.id === "modalClose") {
    $modalCard.close();
  }
});

$search.addEventListener("submit", async (e) => {
  e.preventDefault();

  const { collection } = await getImages($inputSeatch.value);
  const { items } = collection;

  const dataImgs = items.map(async (img) => {
    // imagen data
    const data = img.data[0];
    const imagen = img.links[0].href;
    const { title } = data;
    const { nasa_id } = data;
    const { photographer } = data;
    const { description } = data;
    const { location } = data;

    // videos data
    const { href } = img;
    const videos = await (await fetch(href)).json();

    const dataImg = {
      title,
      nasa_id,
      imagen,
      photographer,
      location,
      description,
      videos,
    };
    return dataImg;
  });

  const images = await Promise.all(dataImgs);
  const imagesHtml = images.map((images) => builtCard(images));

  $planets.innerHTML = "";
  $planets.append(...imagesHtml);
});
