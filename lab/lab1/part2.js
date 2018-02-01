/* =====================
# Lab 1, Part 2 — Functions as Values
Functions can be passed as values to other functions. Each exercise here builds on that theme.
===================== */

/* =====================
Instructions: Write a function that *always* returns the number 1.
===================== */

var justOne = function(num) {return 1};

console.log('justOne success:', justOne() === 1);

/* =====================
Instructions: Write a function that returns true if a number is even.
===================== */

var isEven = function(num) {if(num % 2 === 1){return false;} else{return true;}};

console.log('isEven success:', isEven(2) === true && isEven(3) === false);

/* =====================
Instructions: Write a function that *always* returns false.
              Use functions "justOne" and "isEven" somehow in the definition.
===================== */

var justFalse = function() {return isEven(justOne());};

console.log('justFalse success:', justFalse() === false);

/* =====================
Instructions: Write a function that takes a boolean value and returns its opposite.
===================== */

var not = function(x) {if (x === true){return false;} else {return true;}};

console.log('not success:', not(true) === false);

/* =====================
Instructions: Write a function that returns true if a number is odd
              Use functions "isEven" and "not" somehow in the definition.
===================== */

var isOdd = function(num) {return not(isEven(num))};

console.log('isOdd success:', isOdd(4) === false);

/* =====================
Instructions: Write a function that takes a list of numbers and returns a list with only numbers above 10
===================== */
var blank = [];
var filterOutLessThan10 = function(array) {for (var i = 0; i<array.length; i = i+1){
  if (array[i] > 10){blank.push(array[i]);}
  else { }}
  return blank;};

console.log('filterOutLessThan10 success:', _.isEqual(filterOutLessThan10([4, 11]),[11]));
/* =====================
Stretch goal
Instructions: Let's bring it all together. Write a function that filters a list with a predicate you provide. It takes:
              1. a list of values (to be filtered)
              2. a function that takes a value and returns true (to keep a number) or false (to toss it out)
===================== */

var filter = function(array, func) {
  var newFilterOutLessThan10 = function(array) {for (var i = 0; i<array.length; i = i+1){
    if (array[i] > 10){blank.push(array[i]);}
    else { }}
    return blank;};
  return func(filterOutLessThan10(array));};

console.log('filter success:', _.isEqual(filter([4, 11], isOdd) ,[11]));
