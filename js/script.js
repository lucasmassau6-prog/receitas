const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=salad";

window.onload = function(){
    loadRecipes();
}

function loadRecipes(){
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        let meals = data.meals.slice(0, 3); // pega 3 receitas
        meals.forEach(showRecipe);
    });
}

function showRecipe(meal){
    let container = document.getElementById("recipes");

    let ingredients = getIngredients(meal);

    container.innerHTML += `
        <div class="card">
            <img src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <p><strong>Categoria:</strong> ${meal.strCategory}</p>
            <p><strong>Origem:</strong> ${meal.strArea}</p>

            <div class="ingredients">
                <strong>Ingredientes:</strong>
                <ul>${ingredients}</ul>
            </div>

            <button onclick="toggleInstructions(this)">Ver modo de preparo</button>

            <div class="instructions">
                ${meal.strInstructions}
            </div>
        </div>
    `;
}

function getIngredients(meal){
    let list = "";

    for(let i = 1; i <= 20; i++){
        let ingredient = meal["strIngredient" + i];
        let measure = meal["strMeasure" + i];

        if(ingredient && ingredient !== ""){
            list += `<li>${measure} ${ingredient}</li>`;
        }
    }

    return list;
}

function toggleInstructions(button){
    let instructions = button.nextElementSibling;

    if(instructions.style.display === "block"){
        instructions.style.display = "none";
        button.innerText = "Ver modo de preparo";
    } else {
        instructions.style.display = "block";
        button.innerText = "Ocultar preparo";
    }
}