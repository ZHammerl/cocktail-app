let cocktailRepository = (function () {
  let cocktailList = [],
    apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail',
    modalContainer = document.querySelector('.modal-container');
  modalBody = document.querySelector('.modal-body');

  // validation of type of added item and if all objectkeys are the same of the orginial array
  function add(cocktail) {
    if (typeof cocktail === 'object' && 'name' in cocktail) {
      cocktailList.push(cocktail);
    } else {
      alert('Please make sure to fill in all necessary data.');
    }
  }

  function getAll() {
    return cocktailList;
  }

  // adding list item
  function addListItem(cocktail) {
    let list = document.querySelector('.cocktail-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = cocktail.name;
    button.classList.add('button-class', 'btn', 'btn-secondary', 'col', 'list-group-item');
    $('button').attr({ 'data-toggle': 'modal', 'data-target': '#detailsModal' });
    listItem.appendChild(button);
    list.appendChild(listItem);
    list.classList.add('container');
    // listItem.classList.add('group-list-item');
    button.addEventListener('click', function () {
      showDetails(cocktail);
    });
  }

  // loading List (Cocktail-Api)
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json);
        json.drinks.forEach(function (item) {
          let cocktail = {
            name: item.strDrink,
            img: item.strDrinkThumb,
            ID: item.idDrink,
          };
          add(cocktail);
          //console.log(cocktail);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // loading Details fetching (Api) + assigning details to show
  function loadDetails(cocktail) {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.ID}`;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })

      .then(function (details) {
        console.log(details);
        let newDrinksArray = Object.entries(details.drinks[0]);

        let getIngredients = function () {
          return newDrinksArray
            .filter((e) => e[0].startsWith('strIngredient'))
            .map(function (e) {
              return e[1];
            })
            .filter((e) => e !== null);
        };

        let getMeasures = function () {
          return newDrinksArray
            .filter((e) => e[0].startsWith('strMeas'))
            .map(function (e) {
              return e[1];
            })
            .filter((e) => e !== null);
        };

        // join ingredients with measures
        let matchIngredientMeasures = function () {
          let ingredients = getIngredients();
          let measures = getMeasures();
          console.log(ingredients, measures);
          return ingredients
            .map(function (ing, i) {
              return `<li class="ingredients group-list-item list-unstyled"> <span class="measure">${
                measures[i] === undefined ? '' : `${measures[i]} `
              }</span>
            <span class="ingredient">${ing}</span>
            </li>`;
            })
            .toString()
            .replace(/,/g, ' ');
        };
        cocktail.instructions = details.drinks[0].strInstructions;
        cocktail.glass = details.drinks[0].strGlass;
        cocktail.ingredients = matchIngredientMeasures();
      })
      .catch(function (e) {
        console.warn(e);
      });
  }

  // show details in Modal for cocktail
  function showDetails(cocktail) {
    loadDetails(cocktail).then(function () {
      showModal(cocktail);
    });
  }

  // MODAL
  function showModal(cocktail) {
    // Clear all the existing modal content
    modalBody.innerHTML = '';

    // adding modal content

    // Cocktail name as title
    let titleElement = document.querySelector('.modal-title');
    titleElement.innerHTML = '<strong>'+cocktail.name+'<strong>';
    titleElement.classList.add('modal-text');

    // image of cocktail
    let imageElement = document.createElement('img');
    imageElement.src = cocktail.img;
    imageElement.classList.add('modal-img', 'img-fluid', 'col-6');

    // Ingredients
    let ingredientsElement = document.createElement('ul');
    ingredientsElement.innerHTML =
      '<span><strong>Ingredients:</strong></span>' + ` ${cocktail.ingredients}`;
    ingredientsElement.classList.add('modal-text', 'list-group', 'col-6');

    // instructions
    let instructionsElement = document.createElement('p');
    instructionsElement.innerHTML =
      '<span class="text-center"><strong>Instructions:</strong></span><br>' + ` ${cocktail.instructions}`;
    instructionsElement.classList.add('modal-text', 'col-12', 'text-center');

    // glass type for cocktail
    let glassElement = document.createElement('p');
    glassElement.innerHTML = '<span><strong>Serve in:</strong></span><br>' + ` ${cocktail.glass}`;
    glassElement.classList.add('modal-text', 'col', 'text-center');

    // ingredients and cocktail image in same container
    let ingredientImageContainer = document.createElement('div');
    ingredientImageContainer.classList.add('row');

    // glass type and instructions container
    let glassInstructionsContainer = document.createElement('div');
    glassInstructionsContainer.classList.add('row')

    ingredientImageContainer.appendChild(imageElement);
    ingredientImageContainer.appendChild(ingredientsElement);
    glassInstructionsContainer.appendChild(glassElement);
    modalBody.appendChild(ingredientImageContainer);
    modalBody.appendChild(glassInstructionsContainer);
    glassInstructionsContainer.appendChild(instructionsElement);
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
  };
})();

//cocktailRepository.filter('Mojito');

cocktailRepository.loadList().then(function () {
  // Now the data is loaded!
  // for each loop iterates over cocktail list and writes their names in a button
  cocktailRepository.getAll().forEach(function (cocktail) {
    cocktailRepository.addListItem(cocktail);
  });
});

cocktailRepository.loadDetails('Margarita');
