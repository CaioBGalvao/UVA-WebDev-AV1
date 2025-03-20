document.addEventListener('DOMContentLoaded', () => {
  async function loadRandomRecipe() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const meal = data.meals[0];
      
      // Seleciona o container onde a receita será exibida
      const container = document.getElementById('recipe-container');
      
      // Limpa o conteúdo anterior, se houver
      container.innerHTML = '';
      
      // Cria e insere o título da receita
      const title = document.createElement('h2');
      title.textContent = meal.strMeal;
      container.appendChild(title);
      
      // Cria e insere a imagem da receita
      const image = document.createElement('img');
      image.src = meal.strMealThumb;
      image.alt = meal.strMeal;
      container.appendChild(image);
      
      // Cria e insere as instruções da receita
      const instructions = document.createElement('p');
      instructions.textContent = meal.strInstructions;
      container.appendChild(instructions);
      
      // Cria e insere a lista de ingredientes
      const ingredientsList = document.createElement('ul');
      
      // Loop para 20 ingredientes (a API possui 20 campos para ingredientes e medidas)
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal['strIngredient' + i];
        const measure = meal['strMeasure' + i];
        
        // Verifica se o ingrediente não está vazio ou nulo
        if (ingredient && ingredient.trim() !== '') {
          const li = document.createElement('li');
          li.textContent = `${ingredient.trim()} - ${measure.trim()}`;
          ingredientsList.appendChild(li);
        }
      }
      container.appendChild(ingredientsList);
      
    } catch (error) {
      // Caso ocorra algum erro, exibe uma mensagem e loga no console
      const container = document.getElementById('recipe-container');
      container.textContent = 'Ops, não foi possível carregar a receita no momento.';
      console.error(error);
    }
  }

  // Chama a função para carregar a receita aleatória
  loadRandomRecipe();
});

  