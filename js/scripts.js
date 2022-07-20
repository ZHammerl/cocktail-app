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

  function add(item) {
    cocktailList.push(item);
  }

  function getAll() {
    return cocktailList;
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
