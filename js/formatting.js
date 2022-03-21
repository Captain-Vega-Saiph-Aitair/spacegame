
//print frames display per second 
displayFrames = function() {
   gol_objContext.save();
   //draw background
   gol_objContext.fillStyle = "#FF0000";
   gol_objContext.fillRect(0, 0, 175, 80); //x, y, width, height
   //frames per second
   gol_objContext.font = "15px Consolas";
   gol_objContext.fillStyle = "#1aff1a"; //reset fill in red
	gol_objContext.fillText("FPS: " + gol_objSpaceGame.getFPS(), 20, 25); //print out frames per second
	gol_objContext.fillText("Map X: " + Math.floor(gol_objPlayer.getXPosition()), 20, 35); //print out frames per second
	gol_objContext.fillText("Map Y: " + Math.floor(gol_objPlayer.getYPosition()), 20, 45); //print out frames per second
	//MOVED TO clsGame - ctx.fillText("Draw X: " + Math.floor(currentMap.mapDrawX), 20, 55); //print out frames per second
	gol_objContext.fillText("Draw X: " + Math.floor(gol_objPlayer.getCanvasX()), 20, 55); //print out frames per second
	//MOVED TO clsGame - ctx.fillText("Draw Y: " + Math.floor(currentMap.mapDrawY), 20, 65); //print out frames per second
	gol_objContext.fillText("Draw Y: " + Math.floor(gol_objPlayer.getCanvasY()), 20, 65); //print out frames per second
   gol_objContext.restore();
}

//display time in a nice format
printTimeStamp = function(time) {
   //time number of ms
   var timeSeconds = Math.floor(time / 1000);
   var timeMinutes = Math.floor(timeSeconds / 60);
   var timeHours = Math.floor(timeMinutes / 60);
   var timeDays = Math.floor(timeHours / 24);
   //
   var returnString = "";
   //return DAY
   if(timeDays >= 1) //at least one DAY
      returnString += timeDays + " day";
   if(timeDays > 1) //more than one DAY
      returnString += "s"; //plural
   //return HOUR
   timeHours -= timeDays * 24; //remove that many hours
   if(timeHours >= 1){ //at least one HOUR
      if (returnString !== "") //if control string is empty
         returnString += " "; //add space
      returnString += Math.floor(timeHours) + " hour";
   }
   if(timeHours > 1) //more than one HOUR
      returnString += "s"; //plural
   //return MINUTE
   timeMinutes -= (timeHours * 60) + (timeDays * 24 * 60); //remove that many minutes
   if(timeMinutes >= 1){ //at least one MINUTE
      if (returnString !== "") //if control string is empty
         returnString += " "; //add space
      returnString += Math.floor(timeMinutes) + " min";
   }
   if(timeMinutes > 1) //more than one MINUTE
      returnString += "s"; //plural
   //return SECOND
   timeSeconds -= (timeMinutes * 60) + (timeHours * 60) + (timeDays * 24 * 60); //remove that many s
   if(timeSeconds >= 1){ //at least one SECOND
      if (returnString !== "") //if control string is empty
         returnString += " "; //add space
      returnString += Math.floor(timeSeconds) + " sec";
   }
   //more than one SECOND
   if(timeSeconds > 1)
      returnString += "s"; //plural
   //
   return returnString;
} //end of printTimeStamp function

//diplay pause message
printPause = function() {
      gol_objContext.save(); //store canvas settings
      //background
      gol_objContext.fillStyle = "black";
      gol_objContext.fillRect(WIDTH/2-45,HEIGHT/2-30, WIDTH/2 - 35, HEIGHT/8 + 5);
      //forground
      gol_objContext.fillStyle = "white";
      gol_objContext.fillRect(WIDTH/2-50,HEIGHT/2-35, WIDTH/2 - 40, HEIGHT/8);
      //text
      gol_objContext.fillStyle = "black";
      gol_objContext.fillText("Paused",WIDTH/2,HEIGHT/2);
      gol_objContext.restore(); //reset canvas settings
} //end of printPause

//display player stats
printStatBar = function() {
   document.getElementById("playerStats").style.display = "inline";
   document.getElementById("playerHP").innerHTML = gol_objPlayer.getHp() + "/" + gol_objPlayer.getMaxHp();
   document.getElementById("playerCredits").innerHTML = gol_objPlayer.getCredits();
} //end of printStatBar function

//game start require user input
printReadyQueston = function() {
   var objCurrentMap = gol_objSpaceGame.getCurrentMap();
   gol_objContext.clearRect(0,0,WIDTH,HEIGHT); //clear entire map
   objCurrentMap.drawBackground();  //draw map
   gol_objContext.save(); //store canvas settings
   //background
   gol_objContext.fillStyle = "black";
   gol_objContext.fillRect(45,HEIGHT/2-30, WIDTH *.8, HEIGHT/8 + 5);
   //forground
   gol_objContext.fillStyle = "white";
   gol_objContext.fillRect(50,HEIGHT/2-35, WIDTH *.8, HEIGHT/8);
   //text
   gol_objContext.fillStyle = "black";
   gol_objContext.fillText("Ready? Press any key",100,HEIGHT/2);
   gol_objContext.restore(); //reset canvas settings
} //end of printReadyQueston

//create DOM objects to make Carco favorite dynamic
printFaveCarco = function(_object,_amount) {
   var container = document.getElementById("playerInventoryHotbar");
   var newLine = document.createElement("li");
   var newButton = document.createElement("button");
   //
   newButton.classList.add("interface-btn");
   if (_amount === 0) //none of this item remaining
      newButton.classList.add("fave-empty"); //make look different
   objPrint = _object;
   var buttonString = objPrint.name;
   if (!objPrint.unique) //unique does not show amount
      buttonString += " &times;" + _amount;
   //formatting
   var buttonTitle = printFromHTMLToTitleAttr(_object.printDescString()); //printDescString procedure in inventory.js
   newButton.setAttribute("title",buttonTitle); //add image to button
   buttonString = buttonString.replace(/\s/g,"&nbsp;"); //replace whitespace with no-break-spaces
   newButton.innerHTML = buttonString;
   //end of formatting
   let onClick = objPrint.useItem;
   newButton.addEventListener("click",onClick);
   //compile
   newLine.appendChild(newButton);
   container.appendChild(newLine);
}

//create DOM objects to make Navigation favorite dynamic
printFaveNavigation = function(_object) {
   var container = document.getElementById("playerNavigationHotbar");
   var newLine = document.createElement("li");
   var newButton = document.createElement("button");
   newButton.classList.add("interface-btn");
   objPrint = _object;
   newButton.innerHTML = objPrint.getName();
   newButton.value = objPrint.getId();
//WANT TO PRINT OUT DISTANCE AND IF IT CAN BE TRAVELLED IN DOM TITLE ATTRIBUTE
   newButton.addEventListener("click",printFaveNavigation_travel);
   //compile
   newLine.appendChild(newButton);
   container.appendChild(newLine);
}

//connect button with function
printFaveNavigation_travel = function() {
   Modalbox.openModal("navigation");
   Modalbox.navigationTravel_start(this);
}

//correcting formatting for HTML title attribute
printFromHTMLToTitleAttr = function(_string) {
   message = _string;
   message = message.replace(/<br>/g,"\x0A"); //replace html line breaks with another control characters to line feed
   message = message.replace(/&nbsp;/g,"\x20"); //replace whitespace with another control characters to no-break-spaces
   return message;
}

//remove all DOM objects from cargo favoriate interface
clearCarco = function() {
   var container = document.getElementById("playerInventoryHotbar");
   container.innerHTML = ""; //blank the div
}

//remove all DOM objects from navigation favoriate interface
clearNavigation = function() {
   var container = document.getElementById("playerNavigationHotbar");
   container.innerHTML = ""; //blank the div
}

//
printMissionObjective = function(_id,_title,_description) {
   var missionLogs = document.getElementById("missionLogs");
   var newEntry = document.createElement("div");
   newEntry.classList.add("mission-log-entry");
   //build identifier
   var hiddenId =  document.createElement("input");
   hiddenId.id = "missionLog" + _id;
   hiddenId.setAttribute("type", "hidden");
   hiddenId.setAttribute("value", _id);
   //build name continer
   var nameBar = document.createElement("div");
   nameBar.classList.add("objective-name");
   nameBar.addEventListener("click", function() {
      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;
      if (panel.style.display === "block")
         panel.style.display = "none";
      else
         panel.style.display = "block";
   }); //end of click function
   var nameString = document.createTextNode(_title);
   nameBar.appendChild(nameString);
   //build body container
   var bodyBar = document.createElement("div");
   bodyBar.classList.add("objective-body");
   bodyBar.style.display = "block";
   var bodyString = document.createTextNode(_description);
   bodyBar.appendChild(bodyString);
   //finish compiling
   newEntry.appendChild(hiddenId);
   newEntry.appendChild(nameBar);
   newEntry.appendChild(bodyBar);
   missionLogs.appendChild(newEntry);
}

//update mission log in interface to finished status
completeMissionObjective = function(_id) {
   missionLog = document.getElementById("missionLog" + _id).parentElement;
   missionLog.classList.add("mission-completed");
   //
   var container = document.createElement("span"); //alight right box
   container.classList.add("float-right");
   container.classList.add("mission-tiny-close");
   var closeSpan = document.createElement("span"); //close button
   closeSpan.classList.add("tiny-control");
   closeSpan.innerHTML = "&times;";
   closeSpan.addEventListener("click", function() {
      this.parentElement.parentElement.style.display = "none"; //span inside div
   }); //end of click function
   //compile
   container.appendChild(closeSpan); //add close button
   missionLog.appendChild(container);

}

//
removeMissionObjective = function(_id) {

}

//remove mission from interface
eraseMissionLog = function() {
   document.getElementById("missionLogs").innerHTML = ""; //empty div
}

//print out end of game
printEndGame = function(){ 
   var timeSurvived = Date.now() - timeWhenGameStarted; //find length of game
   var theDate = new Date(Date.now());
   var indentStr = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
   //build output
   var message = "*****Game over:<br>";
   message += indentStr + theDate.toLocaleString() + "<br>";
   message += indentStr + "You survived for " + printTimeStamp(timeSurvived) + ".<br>";
   //MOVED TO clsPlayer - message += indentStr + "Your ending credits is " + player.credits + ", total acquired was " + player.score + ".<br>";
   message += indentStr + "Your ending credits is " + gol_objPlayer.getCredits() + ", total acquired was " + gol_objPlayer.getScore() + ".<br>";
   message += indentStr + "Enemies destroyed: " + gol_objPlayer.getKillCount() + ".<br>";
   logPrint(message); //print out message
   console.log("game over");
} //end of printEndGame function

//more useful features for debugging
adminDebugSettings = function() {
   gol_objPlayer.objInventory.addItem("enemy", 1); //add enemy spawn
   Modalbox.listCarcoFavorites_admin(); //set enemy spawn to favorite _modal.js
   //add additional weapons to player
   gol_objPlayer.objAttachments[Object.keys(gol_objPlayer.objAttachments).length] = clsWeapon.createWeapon("starting_shotgun", {player:"inventory"});
   gol_objPlayer.objAttachments[Object.keys(gol_objPlayer.objAttachments).length] = clsWeapon.createWeapon("auto_gun", {player:"inventory"});
   gol_objPlayer.objAttachments[Object.keys(gol_objPlayer.objAttachments).length] = clsWeapon.createWeapon("auto_shotgun", {player:"inventory"});
   gol_objPlayer.objAttachments[Object.keys(gol_objPlayer.objAttachments).length] = clsWeapon.createWeapon("chain_gun", {player:"inventory"});
   gol_objPlayer.objAttachments[Object.keys(gol_objPlayer.objAttachments).length] = clsWeapon.createWeapon("gatling_gun", {player:"inventory"});
   gol_objPlayer.objAttachments[Object.keys(gol_objPlayer.objAttachments).length] = clsWeapon.createWeapon("mini_gun", {player:"inventory"});

} //end of adminDebugSettings 