var scoreArray = new Array();
var seconds = 0;
var tableSize;
var tableIndex;
var isActive; 
var numberofMoves;
var tableArray = new Array();
var arrTmp;



function isSolvable(){//probably couldve just checked to see if they were all even...
	var inversionCount = invCount();
	if(tableSize%2==1 && inversionCount%2==0){
		return true;
	}
	else{
		var positionFifteen = Math.floor(tableSize+1-findFifteen()/tableSize);
		if(positionFifteen%2==0 && tableSize%2==0 && inversionCount%2==1){
			return true;}
		else if(positionFifteen%2==1 && tableSize%2==0 && inversionCount%2==0){
			return true;}
	}
	return false;
}


//function randomize(){}
//take the length of your input array and then do a randomize for that times
//the math.random function inside a while loop twice
//set those valeus to variables, then pass those variables to shuffle
//then decrement the starting value.

function shuffle(){
	var length = tableArray.length;
	while(length>0){
		var i = Math.floor(Math.random()*length);
		var j = Math.floor(Math.random()*length);
		swap(i,j);
		length--;
	}
}

//function shuffle(i, j){}
//set a temp value = the numeric value in the array at that index[i]
//set the array at i = value at j
//set the array at j = value at temp

function swap(i,j){
	var temp = tableArray[i];
	tableArray[i]=tableArray[j];
	tableArray[j]=temp;
}

function checkInversionFunction(){
	var inversionCount = invCount();
	document.getElementById('test').innerHTML = inversionCount;

}

function checkfindFifteen(){
	var positionFifteen = Math.floor(tableSize+1-findFifteen()/tableSize);
	document.getElementById('test').innerHTML = positionFifteen;
}

	
function isCompleted(){
	for(var i = 0; i<tableArray.length; i++){
		
	}
	
	
}

//function checkShuffle(){}
//simply print out the array to the test element

function checkShuffle(){
	var tableString = tableArray.toString();
	document.getElementById('test').innerHTML = tableString;
}

//function inversionCounter(){}

function invCount(){
	var tmp = 0;
	for(var i = 0; i<tableArray.length-1; i++){
		for(var j = 1; j<tableArray.length-1; j++){
			if(tableArray[i] > tableArray[j]){
					tmp++;
				}
			}	
	}
	return tmp;
}	

	

//function findFifteen(){}

function findFifteen(){
	for(var i = 0; i<tableArray.length; i++){
		if(tableArray[i]==15){
					return i;}
			}	
}


function populateArray(){
	for(var i = 0; i<tableSize*tableSize; i++){
		tableArray.push(i);}
}


function gameStart(buttonID){
		gameClear();
		isActive = true;
		tableSize = buttonID;
		populateArray();
		shuffle();
		var solveCheck = isSolvable();
		while(!solveCheck){
			shuffle();
			solveCheck = isSolvable();
		}
		
		buildTable();
		//clockStart();
}

function gameClear(){
		if(seconds!=0){
		scoreArray.push(seconds);}
		seconds = 0;
		document.getElementById('test').innerHTML = "";	//has to be single quotes to clear it and double quotes for = value
		document.getElementById('gameClock').innerHTML = "";
		tableSize=0;
		document.getElementById('mytable').innerHTML = "";
		tableArray = [];
		isActive = false;
		clockUpdate();		
}


function clockStart(){
	   if(isActive){
			var time = window.setInterval("clockUpdate()", 1000);}
}

function clockUpdate(){
	if(isActive){
	seconds++;//can't make own function, otherwise it makes the time increment really quickly
    document.getElementById("gameClock").innerHTML = seconds+" seconds in game.";}
}



function buildTable(){//need to build it with every cell being named
	var tablelocation = document.getElementById('mytable'); 
	var table = document.createElement('table');
	table.style.border = '1px solid black';
	
	for(var i = 0; i<tableSize; i++){
		var tableRow = table.insertRow();
		for(var j = 0; j<tableSize; j++){
			var tmp = (tableSize*tableSize-1)-(i*tableSize+j);
			arrTmp = tableArray[tmp];
			var cell = tableRow.insertCell();
			
			cell.style.border = '1px solid black';
			cell.style.width = '50px';
			cell.style.height = '50px';
			cell.id = arrTmp;		
			if(arrTmp==15){
				cell.className = "empty_cell";
				cell.appendChild(document.createTextNode(""));}
			else{
				cell.addEventListener("click",function(){
				cellMove(this.id);
				});
				cell.className = "cell";	
				cell.appendChild(document.createTextNode(arrTmp));}
			
		}
	}
	
	tablelocation.appendChild(table);
}

function cellMove(index){//index is the actual id
	document.getElementById('test').innerHTML = "seems to work"+index;
	//find location of number fifteen
	//determine if index isAdjacent();
}
