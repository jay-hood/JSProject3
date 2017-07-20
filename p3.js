var scoreArray = new Array();
var seconds = 0;
var tableSize;
var tableIndex;
var isActive; 
var numberofMoves;



function gameStart(buttonID){
		isActive=true;
		tableSize = buttonID;
		buildTable(tableSize);
		clockStart();
}


/*Now comes the part where we actually have to build the table
need boolean value for if the table is completed and a var for 
* the number of moves taken
* The way the example works to initialize the table is to have the table
* premade and to give ever cell a class name = to cell
* then it uses a random number generator to randomize the cells...somehow
* and to store the results of that randomization in an array.
* Then it uses a for loop from 0 1o 16 (exclusive) and if that randomized cell
* has a value of 16, it is renamed to a class of "cell empty"
* There is a way I can randomize the puzzle, whic is the fisher-yates algorithm
* function initTiles() {
    var i = tileCount * tileCount - 1;
    while (i > 0) {
      var j = Math.floor(Math.random() * i);
      var xi = i % tileCount;
      var yi = Math.floor(i / tileCount);
      var xj = j % tileCount;
      var yj = Math.floor(j / tileCount);
      swapTiles(xi, yi, xj, yj);
      --i;
    }
  }
  * function swapTiles(i, j, k, l) {
    var temp = new Object();
    temp = boardParts[i][j];
    boardParts[i][j] = boardParts[k][l];
    boardParts[k][l] = temp;
  }
  * function countInversions(i, j) {
    var inversions = 0;
    var tileNum = j * tileCount + i;
    var lastTile = tileCount * tileCount;
    var tileValue = boardParts[i][j].y * tileCount + boardParts[i][j].x;
    for (var q = tileNum + 1; q < lastTile; ++q) {
      var k = q % tileCount;
      var l = Math.floor(q / tileCount);
  
      var compValue = boardParts[k][l].y * tileCount + boardParts[k][l].x;
      if (tileValue > compValue && tileValue != (lastTile - 1)) {
        ++inversions;
      }
    }
    return inversions;
  }
  * function sumInversions() {
    var inversions = 0;
    for (var j = 0; j < tileCount; ++j) {
      for (var i = 0; i < tileCount; ++i) {
        inversions += countInversions(i, j);
      }
    }
    return inversions;
  }
  * 
  * if (!isSolvable()) {
    swapTiles(0, 0, 1, 0);
    initEmpty();
  }
  * 
  * if (!isSolvable(tileCount, tileCount, emptyLoc.y + 1)) {
    if (emptyLoc.y == 0 && emptyLoc.x <= 1) {
      swapTiles(tileCount - 2, tileCount - 1, tileCount - 1, tileCount - 1);
    } else {
      swapTiles(0, 0, 1, 0);
    }
    initEmpty();
  }
  * 
  * 
  * 
  * 
  * function isSolvable(width, height, emptyRow) {
    if (width % 2 == 1) {
      return (sumInversions() % 2 == 0)
    } else {
      return ((sumInversions() + height - emptyRow) % 2 == 0)
    }
  }
  * 	
  * So I can use that to randomize the tile positions.
*  
*/

function fisherYatesAlgorithm(){
	
//my understanding of the process is this:
/*
 * 
 * 
 * 
 * 
 */
	
	function initTiles() {
		var i = tileCount * tileCount - 1;//n^2 - 1 where n is side length(can also set equal to puzzle 'size'
		while (i > 0) {
		  var j = Math.floor(Math.random() * i);//some random value between 0 and 15, so basically a random tile
		  var xi = i % tileCount;//15%4, 14%3, etc.(column index) 
		  var yi = Math.floor(i / tileCount);//15/4, 14/4, etc.(row index)
		  var xj = j % tileCount;//random tile index % 4
		  var yj = Math.floor(j / tileCount);//random tile index / 4
		  swapTiles(xi, yi, xj, yj);
		  --i;
		}
	  }

	function swapTiles(i, j, k, l) {
		var temp = new Object();//instantiate a new object
		temp = boardParts[i][j];//set that object equal to the cell at i,j
		boardParts[i][j] = boardParts[k][l];//set the object at position i,j with position k,j
		boardParts[k][l] = temp;//set position k,l to be equal to temp
	  }//given that this seems to reference a two dimensional array, it is easy enough
	  //to have a one dimensional array for the cells and to do some basic algebra to swap these indices.
	  
	  
	  //Counting inversions seems to be a fairly complicated task and realistically not worth the effort
	  //at least not with this implementation, because you can just do nested for loops
	  
	  function countInversions(i, j) {//pretty sure this goes after the while loop in initTiles
		var inversions = 0;				//j is a randmom tile and i is the current index being worked on
		var tileNum = j * tileCount + i;//y*w+x, or the immediate index
		var lastTile = tileCount * tileCount;//actual length of array (well, only used for finding last index)
		var tileValue = boardParts[i][j].y * tileCount + boardParts[i][j].x;//i'm assuming that these are meant to be properties of the object
		for (var q = tileNum + 1; q < lastTile; ++q) {								//found at boardParts[index number], which means the cells themselves need to be
		  var k = q % tileCount;//row position of value to the right of q			//created as objects with property values and shoved into an array
		  var l = Math.floor(q / tileCount);//column position..."  "
	  
		  var compValue = boardParts[k][l].y * tileCount + boardParts[k][l].x;
		  if (tileValue > compValue && tileValue != (lastTile - 1)) {
			++inversions;
		  }
		}
		return inversions;
	  }
	  
	  function sumInversions() {
		var inversions = 0;
		for (var j = 0; j < tileCount; ++j) {
		  for (var i = 0; i < tileCount; ++i) {
			inversions += countInversions(i, j);
		  }
		}
		return inversions;
	  }
	  
	  if (!isSolvable(tileCount, tileCount, emptyLoc.y + 1)) {
		if (emptyLoc.y == 0 && emptyLoc.x <= 1) {
		  swapTiles(tileCount - 2, tileCount - 1, tileCount - 1, tileCount - 1);
		} else {
		  swapTiles(0, 0, 1, 0);
		}
		initEmpty();
	}
		
		
		function isSolvable(width, height, emptyRow) {
		if (width % 2 == 1) {
		  return (sumInversions() % 2 == 0)
		} else {
		  return ((sumInversions() + height - emptyRow) % 2 == 0)
		}
	  }	
	
	
}




function gameClear(){
		if(seconds!=0){
		scoreArray.push(seconds);}
		seconds = 0;
		document.getElementById('test').innerHTML = "";	//has to be single quotes to clear it and double quotes for = value
		document.getElementById('gameClock').innerHTML = "";
		tableSize=0;
		document.getElementById('mytable').innerHTML = "";
		isActive = false;
}


function clockStart(){
	   if(isActive){
	   window.setInterval("clockUpdate()", 1000);}
}

function clockUpdate(){
	if(isActive){
	seconds++;//can't make own function, otherwise it makes the time increment really quickly
    document.getElementById("gameClock").innerHTML = seconds+" seconds in game.";}
}



function buildTable(){//need to build it with every cell being named
	var tablelocation = document.getElementById('mytable'); 
	var table = document.createElement('table');
	table.style.width = '500px';
	table.style.height = '500px';
	table.style.border = '1px solid black';
	
	for(var i = 0; i<tableSize; i++){
		var tableRow = table.insertRow();
		for(var j = 0; j<tableSize; j++){
			var tmp = (tableSize*tableSize-1)-(i*tableSize+j);
			var cell = tableRow.insertCell();
			cell.appendChild(document.createTextNode(tmp));
			cell.style.border = '1px solid black';
			cell.className = "cell";
			cell.id = tmp;
		}
	}
	tablelocation.appendChild(table);
}
