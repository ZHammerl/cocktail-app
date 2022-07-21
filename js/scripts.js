let cocktailRepository = (function () {
  let cocktailList = [
    {
      name: 'Margarita',
      tags: ['alcoholic', 'contemporary classic'],
      glass: 'Cocktail glass',
      ingredient1: 'Tequila',
    },
    {
      name: 'Mojito',
      tags: ['alcoholic', 'contemporary classic'],
      glass: 'Highball glass',
      ingredient1: 'White rum',
    },
    {
      name: 'Dry Martini',
      tags: ['alcoholic', 'classic'],
      glass: 'Cocktail glass',
      ingredient1: 'Gin',
    },
  ];

  // validation of type of added item and if all objectkeys are the same of the orginial array
  function add(item) {
    if (typeof item === 'object' && Object.keys(cocktailList[0]).every((key) => key in item)) {
      cocktailList.push(item);
    } else {alert('Please make sure to fill in all necessary data.')}
  }

  function getAll() {
    return cocktailList;
  }

  // filter cocktails by name ?? why can I not use result in an if statement??
  function filter(input) {
    let result = cocktailList.filter((e) => e.name === input);
    document.write(result[0].name + ' is served in a ' + result[0].glass);
  }

  return {
    add,
    getAll,
  };
})();

// for loop iterates over cocktail list and writes their names and what type of glass they are served in
cocktailRepository.getAll().forEach(function (cocktail) {
  //writes special text for cocktails served in a special glass
  if (cocktail.glass !== 'Cocktail glass') {
    document.write(
      '<p>' +
        cocktail.name +
        ' (glass: ' +
        cocktail.glass +
        ') - Served in a special type of glass!'
    );
  } else {
    document.write('<p>' + cocktail.name + ' (glass: ' + cocktail.glass + ')');
  }
});
