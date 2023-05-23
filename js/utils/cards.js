export const builtCard = ({ title, nasa_id, imagen, photographer, location }) => {
  const $card = document.createElement("aticle")
  $card.classList.add("planets__card")
  $card.id = nasa_id
  $card.style = `
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.635) 50%,
      rgba(0, 0, 0, 0.635) 50%
    ),
    url('${imagen}');
    background-position: center;
    background-size: 100%, 70rem;
    background-repeat: no-repeat;

  `

  $card.innerHTML = `
    <h3>${title}</h3>
    <p>${photographer || ""}</p>
    <p>${location ? "location: " + location : ""}</p>
    <button id="button--card" class="button">ver mas</button>
  `
  return $card
}



