document.addEventListener("DOMContentLoaded", function () {
  const ingredientInput = document.getElementById('ingredients');
  const searchButton = document.getElementById('search-button');
  const recipeList = document.getElementById('recipe-list');

  searchButton.addEventListener('click', function () {
    const ingredients = ingredientInput.value;
    if (ingredients.trim() === '') {
      recipeList.innerHTML = 'Please enter ingredients';
    } else {
      recipeList.innerHTML = 'Searching for recipes...';
      const apiKey = '3c8a4c31879e41d18d7c211b35fddc69';
      const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            recipeList.innerHTML = 'No reciptes found.';
          } else {
            showRecipes(data);
          }
        })
        .catch((error) => {
          console.error(error);
          recipeList.innerHTML = 'An error occured while obtaining recipes';
        });
    }
  });

  function showRecipes(recipes) {
    recipeList.innerHTML = '';

    const ul = document.createElement('ul');
    recipes.forEach((recipe) => {
      const li = document.createElement('li');
      li.textContent = `${
        recipe.title
      } - Ingredients: ${recipe.ingredients.join(', ')}`;
      ul.appendChild(li);
    });

    recipeList.appendChild(ul);
  }
});
