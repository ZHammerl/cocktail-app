let cocktailRepository = (function () {
  let cocktailList = [],
    apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail',
    modalContainer = document.querySelector('#modal-container');

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

  // filter cocktails by name ?? why can I not use result in an if statement??
  function filter(input) {
    let result = cocktailList.filter((e) => e.name === input);
    document.write('The ' + result[0].name + ' is served in a ' + result[0].glass);
  }

  function addListItem(cocktail) {
    let list = document.querySelector('.cocktail-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = cocktail.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(cocktail);
    });
  }

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

  function loadDetails(cocktail) {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail.name}`;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })

      .then(function (details) {
        cocktail.instructions = details.drinks[0].strInstructions;
        cocktail.glass = details.drinks[0].strGlass;
        cocktail.ingredients = [
          details.drinks[0].strIngredient1,
          details.drinks[0].strIngredient2,
          details.drinks[0].strIngredient3,
          details.drinks[0].strIngredient4,
          details.drinks[0].strIngredient5,
          details.drinks[0].strIngredient6,
          details.drinks[0].strIngredient7,
          details.drinks[0].strIngredient8,
          details.drinks[0].strIngredient9,
          details.drinks[0].strIngredient10,
        ];
        cocktail.measures = [
          details.drinks[0].strMeasure1,
          details.drinks[0].strMeasure2,
          details.drinks[0].strMeasure3,
          details.drinks[0].strMeasure4,
          details.drinks[0].strMeasure5,
          details.drinks[0].strMeasure6,
          details.drinks[0].strMeasure7,
          details.drinks[0].strMeasure8,
          details.drinks[0].strMeasure9,
          details.drinks[0].strMeasure10,
        ];
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
    modalContainer.innerHTML = '';
    // creating modal element in DOM
    let modal = document.createElement('div');
    modal.classList.add('modal');
    // adding modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    // Cocktail name as title
    let titleElement = document.createElement('h1');
    titleElement.innerText = cocktail.name;
    titleElement.classList.add('modal-text');

    // image of cocktail
    let imageElement = document.createElement('img');
    imageElement.src = cocktail.img;
    imageElement.classList.add('modal-img');

    // prepartation instructions
    let instructionsElement = document.createElement('p');
    instructionsElement.innerText = `Instructions: 
    ${cocktail.instructions}`;
    instructionsElement.classList.add('modal-text');

    // Ingredients
    let ingredientsElement = document.createElement('p');
    ingredientsElement.innerText = cocktail.ingredients;
    ingredientsElement.classList.add('modal-text');

    // // Measures
    // let measuresIngredientElement = document.createElement('p');
    // measuresElement.innerText = cocktail.measures;
    // measuresElement.classList.add('modal-text');

    // glass type for cocktail
    let glassElement = document.createElement('p');
    glassElement.innerText = `Serve in: 
    ${cocktail.glass}`;
    glassElement.classList.add('modal-text');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(glassElement);
    modal.appendChild(instructionsElement);
    modal.appendChild(imageElement);
    modal.appendChild(ingredientsElement);
    // modal.appendChild(measuresElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }
  // hide Modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  // ...when ESC key is pressed
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  // ...when clicked outside of the modal
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  return {
    add,
    getAll,
    filter,
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
