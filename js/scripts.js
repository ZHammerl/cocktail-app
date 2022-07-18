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

// for loop iterates over cocktail list and writes their names and what type of glass they are served in
for (let i = 0; cocktailList[i]; i++) {
  //writes special text for cocktails served in a special glass
  if (cocktailList[i].glass !== 'Cocktail glass') {
    document.write(
      '<p>' +
        cocktailList[i].name +
        ' (glass: ' +
        cocktailList[i].glass +
        ') - Served in a special type of glass!'
    );
  } else {
    document.write('<p>' + cocktailList[i].name + ' (glass: ' + cocktailList[i].glass + ')');
  }
}
