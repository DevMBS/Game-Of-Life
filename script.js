var gridContainer = document.getElementById("grid");
var table = document.createElement("table");
var nextGen = [];
for (let i = 0; i < 60; i++) {
  let tr = document.createElement("tr");
  nextGen.push([]);
  for (let j = 0; j < 60; j++) {
    let cell = document.createElement("td");
    tr.appendChild(cell);
    if((j == 0 || i == 0) || (j == 59 || i == 59)){
      cell.setAttribute("class", "dead");
      cell.setAttribute("style", "display:none;");
      cell.setAttribute("id", [j, i]);
      nextGen[i].push("dead");
    }
    else if (Math.random() > 0.7) {
      cell.setAttribute("class", "live");
      cell.setAttribute("id", [j, i]);
      nextGen[i].push("live");
    } 
    else {
      cell.setAttribute("class", "dead");
      cell.setAttribute("id", [j, i]);
      nextGen[i].push("dead");
    }
  }
  table.appendChild(tr);
}
gridContainer.appendChild(table);
function applyNextGen(){
for (let i = 0; i < 60; i++) {
  for (let j = 0; j < 60; j++) {
      let cell = document.getElementById(j+","+i);
      cell.setAttribute("class", nextGen[i][j]);
  }
}
}

function startStop(s){
  if(s){
    var interval = setInterval(calcNextGen, s);
    sessionStorage.setItem("stopper", false);
    document.getElementById("speed").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("stop").style.display = "block";
  }
  else{
    sessionStorage.setItem("stopper", true);
    document.getElementById("stop").style.display = "none";
    document.getElementById("start").style.display = "block";
    document.getElementById("speed").style.display = "block";
  }
}
var generation = 0;
function calcNextGen() {
  if(sessionStorage.getItem("stopper") == 'false'){
  for (let i = 1; i < 59; i++) {
    for (let j = 1; j < 59; j++) {
      let liveNeighbours = 0;
      let x = 0;
      let y = 0;
      for (let z = 1; z <= 8; z++) {
        if (z == 1) {
          x = -1;
          y = 0;
        } 
        else if (z == 2) {
          x = -1;
          y = -1;
        } 
        else if (z == 3) {
          x = 0;
          y = -1;
        } 
        else if (z == 4) {
          x = 1;
          y = -1;
        } 
        else if (z == 5) {
          x = 1;
          y = 0;
        } 
        else if (z == 6) {
          x = 1;
          y = 1;
        } 
        else if (z == 7) {
          x = 0;
          y = 1;
        } 
        else if (z == 8) {
          x = -1;
          y = 1;
        }
        if (document.getElementById(String(j + x) + "," + String(i + y)).getAttribute("class") == "live") {
          liveNeighbours++;
        } 
      }
        if(nextGen[i][j] == "live"){
          if (liveNeighbours < 2) {
            nextGen[i][j] = "dead";
            
          } 
          else if (liveNeighbours > 3) {
            nextGen[i][j] = "dead";
            
          } 
          else if(liveNeighbours == 2){
            nextGen[i][j] = "live";
          }
          else if(liveNeighbours == 3){
            nextGen[i][j] = "live";
          }
        }
        else{
          if (liveNeighbours == 3) {
            nextGen[i][j] = "live";
          }
        }
        
    }
    
  }
    
    generation++;
    document.getElementById("genCounter").innerHTML = "Generation №"+String(generation);
    applyNextGen();
}
}
