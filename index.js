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
  // Cria um objeto para armazenar os elementos de imagem pré-carregados.
  // Cada chave é o nome do anime e o valor é um objeto Image já carregado.
  const preloadedImages = {};

  // Itera sobre cada chave do objeto animePosters.
  Object.keys(animePosters).forEach((animeName) => {
    // Cria um novo objeto Image para pré-carregar a imagem.
    const img = new Image();
    // Define a URL da imagem. Isso inicia o pré-carregamento.
    img.src = animePosters[animeName];
    // Armazena o objeto Image no objeto preloadedImages.
    preloadedImages[animeName] = img;
  });

  // Seleciona todos os elementos <li> dentro do elemento com id "animeList".
  const listItems = document.querySelectorAll("#animeList li");
  // Seleciona o container que exibirá as imagens.
  const animeImageContainer = document.getElementById("animeImageContainer");
  // Seleciona a imagem padrão que já está definida no HTML.
  const defaultImage = document.getElementById("defaultImage");
  // Seleciona o elemento que indica o loading ("Carregando Poster...").
  const loadingIndicator = document.getElementById("loadingIndicator");

  // Função para exibir a mensagem de loading.
  function showLoading() {
    // Altera o estilo de display do indicador para "block", tornando-o visível.
    loadingIndicator.style.display = "block";
  }

  // Função para esconder a mensagem de loading.
  function hideLoading() {
    // Altera o estilo de display do indicador para "none", escondendo-o.
    loadingIndicator.style.display = "none";
  }

  // Para cada item (<li>) da lista, adiciona os eventos de mouse.
  listItems.forEach((item) => {
    // Evento que dispara quando o mouse entra no <li>.
    // Utiliza "mouseenter" para que o evento não dispare repetidamente ao se mover sobre filhos.
    item.addEventListener("mouseenter", () => {
      // Adiciona a classe "hovered" ao <li> para aplicar estilos (ex.: background).
      item.classList.add("hovered");
      // Adiciona a classe "hovered" ao container da imagem para aplicar estilos correspondentes.
      animeImageContainer.classList.add("hovered");

      // Obtém o nome do anime a partir do texto do <li>.
      const animeName = item.textContent.trim();
      // Recupera o objeto Image pré-carregado correspondente ao nome do anime.
      const preImg = preloadedImages[animeName];
      if (preImg) {
        // Exibe o indicador de loading.
        showLoading();
        // Cria um clone do objeto Image pré-carregado.
        // cloneNode(true) cria uma cópia completa do nó, incluindo atributos e filhos.
        // Assim, evitamos reutilizar o mesmo objeto e garantimos que não haja re-request.
        const newImage = preImg.cloneNode(true);
        // Inicialmente, define a opacidade da nova imagem como 0 (invisível).
        newImage.style.opacity = 0;
        // Quando a nova imagem terminar de carregar, o evento "onload" é disparado.
        newImage.onload = () => {
          // Oculta o indicador de loading.
          hideLoading();
          // Altera a opacidade para 1, fazendo com que a imagem apareça com uma transição suave.
          newImage.style.opacity = 1;
        };
        // Limpa o conteúdo atual do container de imagem.
        animeImageContainer.innerHTML = "";
        // Re-adiciona o indicador de loading ao container, pois a limpeza removeu-o.
        animeImageContainer.appendChild(loadingIndicator);
        // Adiciona a nova imagem clonada ao container, substituindo a imagem anterior.
        animeImageContainer.appendChild(newImage);
      }
    });

    // Evento que dispara quando o mouse sai do <li>.
    item.addEventListener("mouseleave", () => {
      // Remove a classe "hovered" do <li> e do container, revertendo os estilos aplicados.
      item.classList.remove("hovered");
      animeImageContainer.classList.remove("hovered");
      // Restaura o conteúdo do container para exibir a imagem padrão.
      animeImageContainer.innerHTML = "";
      // Re-adiciona o indicador de loading (caso ainda esteja presente).
      animeImageContainer.appendChild(loadingIndicator);
      // Re-adiciona a imagem padrão ao container.
      animeImageContainer.appendChild(defaultImage);
      // Garante que o indicador de loading seja escondido.
      hideLoading();
    });
  });
});
