function searchRecipes(){
    const searchInput = document.getElementById('searchInput').value;
    const recipesDiv = document.getElementById('recipes');
    const notFoundDiv = document.getElementById('notFound');

    //clear previous results
    recipesDiv.innerHTML = '';
    notFoundDiv.style.display = 'none';

    if(searchInput.trim() === ''){
        notFoundDiv.innerHTML = 'Oops! Recipe not found. Please try another dish 🍽️';
        notFoundDiv.style.display ='block';
        return;
    }

    // fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)

    .then(response => response.json())
    .then(data => {
        if(!data.meals){
            notFoundDiv.innerText = 'Oops! Recipe not found. Please try another dish 🍽️'
            notFoundDiv.style.display ='block';

        }
        else{
            data.meals.forEach(meal =>{
                const card = document.createElement('div');
                card.classList.add('recipe-card');
                
                card.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strCategory}</p>
                <span class="badge ${meal.strCategory}">${meal.strCategory}</span>
                <p>${meal.strArea}</p>
                 <button onclick="viewRecipes('${meal.idMeal}')">View Recipe</button>

                `;
                recipesDiv.appendChild(card);
            
            })
        }
    })
}

function viewRecipes(mealId){
    const popupCard = document.getElementById('popupCard');
    const recipeTitle = document.getElementById('recipeTitle');
    const recipeDetails = document.getElementById('recipeDetails');

     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)


    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        recipeTitle.innerText = meal.strMeal;
        recipeDetails.innerText = meal.strInstructions;
        popupCard.style.display = 'block';
    })
}

function closeRecipe(){
   document.getElementById('popupCard').style.display = 'none';
}


function filterByArea() {
    const area = document.getElementById('areaSelect').value;
    const recipesDiv = document.getElementById('recipes');
    const notFoundDiv = document.getElementById('notFound');

    // clear previous results
    recipesDiv.innerHTML = '';
    notFoundDiv.style.display = 'none';

    if(area === '') return;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then(response => response.json())
    .then(data => {
        if(!data.meals){
            notFoundDiv.innerText = 'No recipes found for this area 🌍';
            notFoundDiv.style.display = 'block';
        } else {
            data.meals.forEach(meal =>{
                const card = document.createElement('div');
                card.classList.add('recipe-card');

                card.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <button onclick="viewRecipes('${meal.idMeal}')">View Recipe</button>
                `;

                recipesDiv.appendChild(card);
            });
        }
    });
}


//dark and light mode
const toggleBtn = document.getElementById('modeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

//search for enter key
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {
        const query = searchInput.value.trim();
        if(query) {
            console.log('Searching for:', query);
            searchRecipes(); // aapka search function
        }
    }
});








