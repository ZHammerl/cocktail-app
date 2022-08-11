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
    let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.ID}`;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })

      .then(function (details) {
        console.log(details);
        let newDrinksArray = Object.entries(details.drinks[0]);

        let getIngredients = function () {
          return (newDrinksArray
             .reduce((listIng, [key, ingredient]) => {
                if (!key.startsWith('strIng')) return listIng;
                if (!ingredient) {
                  return listIng;
                }
                
                return [...listIng, ingredient];
              }, [])
                  );
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
              return `<li class="ingredients"> <span class="measure">${
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
    modalContainer.innerHTML = '';
    // creating modal element in DOM
    let modal = document.createElement('div');
    modal.classList.add('modal');
    // adding modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    // Cocktail name as title
    let titleElement = document.createElement('h1');
    titleElement.innerText = cocktail.name;
    titleElement.classList.add('modal-text');

    //container for imagen and ingredients
    let modalGrid = document.createElement('div')
    modalGrid.classList.add('modal-grid')

    // image of cocktail
    let imageElement = document.createElement('img');
    imageElement.src = cocktail.img;
    imageElement.classList.add('modal-img');

    // Ingredients
    let ingredientsElement = document.createElement('ul');
    ingredientsElement.innerHTML = cocktail.ingredients;
    ingredientsElement.classList.add('modal-text');

    // instructions
    let instructionsElement = document.createElement('p');
    instructionsElement.innerText = `Instructions: ${cocktail.instructions}`;
    instructionsElement.classList.add('modal-text');

    // glass type for cocktail
    let glassElement = document.createElement('p');
    glassElement.innerText = `Serve in: 
    ${cocktail.glass}`;
    glassElement.classList.add('modal-text');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(glassElement);
    modal.appendChild(modalGrid);
    modalGrid.appendChild(imageElement);
    modalGrid.appendChild(ingredientsElement);
    modal.appendChild(instructionsElement);
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
