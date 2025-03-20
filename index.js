// Objeto com nomes dos animes e suas URLs
const animePosters = {
  "Ao no Exorcist": "https://cdn.myanimelist.net/images/anime/10/75195l.webp",
  "Code Geass: Lelouch of the Rebellion":
    "https://cdn.myanimelist.net/images/anime/1032/135088l.webp",
  Dandadan: "https://cdn.myanimelist.net/images/anime/1584/143719l.webp",
  "Death Note": "https://cdn.myanimelist.net/images/anime/1079/138100l.webp",
  "Fullmetal Alchemist: Brotherhood":
    "https://cdn.myanimelist.net/images/anime/1208/94745l.webp",
  "Magi: The Kingdom of Magic":
    "https://cdn.myanimelist.net/images/anime/13/55039l.webp",
  "Mirai Nikki (TV)": "https://cdn.myanimelist.net/images/anime/13/33465l.webp",
  "Mob Psycho 100": "https://cdn.myanimelist.net/images/anime/8/80356l.webp",
  Naruto: "https://cdn.myanimelist.net/images/anime/1141/142503l.webp",
  Noragami: "https://cdn.myanimelist.net/images/anime/1886/128266l.webp",
  "One Punch Man": "https://cdn.myanimelist.net/images/anime/12/76049l.webp",
  "Psycho-Pass": "https://cdn.myanimelist.net/images/anime/1314/142015l.webp",
  "Shingeki no Kyojin":
    "https://cdn.myanimelist.net/images/anime/10/47347l.webp",
  "Steins;Gate": "https://cdn.myanimelist.net/images/anime/1935/127974l.webp",
  "Sword Art Online": "https://cdn.myanimelist.net/images/anime/11/39717l.webp",
  "Yofukashi no Uta":
    "https://cdn.myanimelist.net/images/anime/1045/123711l.webp",
  Jigokuraku: "https://cdn.myanimelist.net/images/anime/1075/131925l.webp",
};

document.addEventListener("DOMContentLoaded", () => {
  // Armazena os objetos Image pré-carregados.
  const preloadedImages = {};

  Object.keys(animePosters).forEach((animeName) => {
    const img = new Image();
    img.src = animePosters[animeName];
    preloadedImages[animeName] = img;
  });

  const listItems = document.querySelectorAll("#animeList li");
  const animeImageContainer = document.getElementById("animeImageContainer");
  const defaultImage = document.getElementById("animeImage");

  listItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("hovered");
      animeImageContainer.classList.add("hovered");

      const animeName = item.textContent.trim();
      const preImg = preloadedImages[animeName];
      if (preImg) {
        // Clona a imagem pré-carregada
        const newImage = preImg.cloneNode(true);
        // Configura a opacidade para transição (se desejado)
        newImage.style.opacity = 0;
        newImage.onload = () => {
          newImage.style.opacity = 1;
        };

        // Atualiza o container com a nova imagem
        animeImageContainer.innerHTML = "";
        animeImageContainer.appendChild(newImage);
      }
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("hovered");
      animeImageContainer.classList.remove("hovered");

      // Limpa o container e adiciona uma cópia da imagem padrão
      animeImageContainer.innerHTML = "";
      animeImageContainer.appendChild(defaultImage.cloneNode(true));
    });
  });
});


