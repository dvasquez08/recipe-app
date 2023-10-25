document.addEventListener("DOMContentLoaded", function () {
  const ingredientInput = document.getElementById("items");
  const searchButton = document.getElementById("search-button");
  const recipeList = document.getElementById("recipe-list");

  // Event listener that fetches recipe data after the text box is filled and the search button is clicked

  searchButton.addEventListener("click", function () {
    const ingredients = ingredientInput.value;
    if (ingredients.trim() === "") {
      recipeList.innerHTML = "Please enter ingredients";
    } else {
      recipeList.innerHTML = "Searching for recipes...";
      const apiKey = "3c8a4c31879e41d18d7c211b35fddc69";
      const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            recipeList.innerHTML = "No reciptes found.";
          } else {
            showRecipes(data);
          }
        })
        .catch((error) => {
          console.error(error);
          recipeList.innerHTML = "An error occured while obtaining recipes";
        });
    }
  });

  // This is pretty much identical to the previous event listener except that it has fetches recipes from the API using the enter key

  ingredientInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const ingredients = ingredientInput.value;
      if (ingredients.trim() === "") {
        recipeList.innerHTML = "Please enter ingredients";
      } else {
        recipeList.innerHTML = "Searching for recipes...";
        const apiKey = "3c8a4c31879e41d18d7c211b35fddc69";
        const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.length === 0) {
              recipeList.innerHTML = "No recipes found";
            } else {
              showRecipes(data);
            }
          })
          .catch((error) => {
            console.error(error);
            recipeList.innerHTML = "An error occured while obtaining recipes";
          });
      }
    }
  });

  // This is a function that makes the list of recipes into clickable links that takes the user to
  // a Google search result of the name of the dish that they clicked on

  function showRecipes(recipes) {
    recipeList.innerHTML = "";

    const ul = document.createElement("ul");
    recipes.forEach((recipe) => {
      const li = document.createElement("li");
      const titleLink = document.createElement("a");
      titleLink.textContent = recipe.title;
      titleLink.href = `https://www.google.com/search?q=${encodeURI(
        recipe.title
      )}`;
      titleLink.target = "_blank";

      li.appendChild(titleLink);
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        const ingredientsText = document.createElement("p");
        ingredientsText.textContent = `Ingredients: ${recipe.ingredients.join(
          ", "
        )}`;
        li.appendChild(ingredientsText);
      }

      ul.appendChild(li);
    });

    recipeList.appendChild(ul);
  }
});
