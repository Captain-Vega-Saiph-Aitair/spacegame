//globla declarations
var gol_objCanvas = document.getElementById("ctx");
var gol_divModalCover = document.getElementById("playerModal"); //contained in interface.js
var gol_objControllerModal = {}; //control variable for Modal box

//user update the rate of the game
changeRate = function(_speed) {
   gol_objSpaceGame.setIntervalRate(_speed); //set game speed
}

//for clicking on the game area to unpause the game
unPause = function() {   
   //do not run code if player modal is open
   if (gol_divModalCover.style.display === "block") return;
   //run code
   gol_objSpaceGame.setGamePaused(false);
}

//
toggleTreeExpand = function() { 
   //loop all children of playerControl and set each panel to maxheight
   var objMenu = this.parentElement.parentElement;
   var objPanels = objMenu.getElementsByClassName("panel");
   for (let i = 0; i < objPanels.length; i++) {
      objPanels[i].style.display = "block";
   }
   var accObjects = document.getElementsByClassName("accordion");
   for (let i = 0; i < accObjects.length; i++) {
      accObjects[i].classList.add("active");
   }
}

//
toggleTreeCollapes = function() { 
   //loop all children of playerControl and set each panel to zero
   var objMenu = this.parentElement.parentElement;
   var objPanels = objMenu.getElementsByClassName("panel");
   for (let i = 0; i < objPanels.length; i++) {
      objPanels[i].style.display = "none";
   }
   var accObjects = document.getElementsByClassName("accordion");
   for (let i = 0; i < accObjects.length; i++) {
      accObjects[i].classList.remove("active");
   }
}

//
toggleJumpDn = function() {  
   var objMenu = this.parentElement.parentElement;
   objMenu.scrollTop = objMenu.scrollHeight; //jump to bottom
}

//
toggleJumpUp = function() {  
   var objMenu = this.parentElement.parentElement;
   objMenu.scrollTop = 0; //jump to top
}

//
toggleMinimize = function(_object) {
   var objMenu = document.getElementById(_object);
   objMenu.classList.toggle("navbar-minimize");

}

//
toggleCommands = function() {
   toggleMinimize("playerControl");
}

//
toggleLogs = function() {
   toggleMinimize("playerLogs");
}

//toggle mini-guides view
togglePin = function() { 
   var objMenu = this.parentElement.parentElement.parentElement; //inside right span
   objMenu.classList.toggle("navbar-pinned");
   //check if pinned
   if (objMenu.classList.contains("navbar-pinned"))
      this.src = Img.pinned.src;
   else
      this.src = Img.pin.src;
}

//toggle mini-guides view to on
togglePinOn = function() { 
   var objMenu = this.parentElement.parentElement.parentElement; //inside right span
   objMenu.classList.add("navbar-pinned");
   this.src = Img.pinned.src;
}

//open both left and right menu interface bars
togglePinStartPinned =  function() { 
   var objMenuLeft = document.getElementById("playerControl"); //inside right span
   var objMenuRight = document.getElementById("playerLogs"); //inside right span
   //add 'open' css
   objMenuLeft.classList.add("navbar-pinned");
   objMenuRight.classList.add("navbar-pinned");
   //pin image
   objMenuLeft.src = Img.pinned.src;
   objMenuRight.src = Img.pinned.src;
}

//drop down button control
activateAccordion = function() {
   gol_objSpaceGame.setGamePaused(true); //pause the game
   this.classList.toggle("active");
   var panel = this.nextElementSibling;
   toggleViewOfContainer(panel);
}

//
toggleViewOfContainer = function(_object) {
   var panel = _object;
   if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
}

//
interfaceAttachments = function() {
   Modalbox.openModal("attachments");
}

//
interfaceDefensive = function() {
   Modalbox.openModal("defensive");
}

//
interfaceEngineering = function() {
   Modalbox.openModal("engineering");
}

//
interfaceAuxiliary = function() {
   Modalbox.openModal("auxiliary");
}

//
interfaceCarco = function() {
   Modalbox.openModal("carco");
}

//
funInterfaceNavigation = function() {
   Modalbox.openModal("navigation");
}

//
interfaceDocking = function() {
   Modalbox.openModal("docking");
}

//
interfacePlacements = function() {
   Modalbox.openModal("placements");
}

//
interfaceFacilities = function() {
   Modalbox.openModal("facilities");
}

//
interfaceInfrastructures = function() {
   Modalbox.openModal("infrastructure");
}

//
interfaceArmoryBuild = function() {
   Modalbox.openModal("build");
}

//
interfaceArmoryEquip = function() {
   Modalbox.openModal("equip");
}

//
interfaceArmoryDrydock = function() {
   Modalbox.openModal("drydock");
}

//settings option to reset page size
 newWindow = function() {
   var url = "play.html"; //destitation
   var overrideURL = url + "?debugmode=true"; //GET request variable
   var windowName = "**DEBUGGING MODE";
   var width = 1200;
   var height = 800;
   var y = window.top.outerHeight / 2 + window.top.screenY - ( height / 2);
   var x = window.top.outerWidth / 2 + window.top.screenX - ( width / 2);
   var script = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${" + width + "}, height=${" + height + "}, top=${" + y + "}, left=${" + x + "}";
   const gameWindow = window.open(overrideURL, windowName, script);
   gameWindow.focus();
}

//
logPrint = function(message) {
   var divBox = document.getElementById('logConsole');
   var strLogMessage = "<br><br>" + message;
   gol_objSpaceGame.addLogMessage(strLogMessage);
   divBox.innerHTML = gol_objSpaceGame.getLogMessage(); //print out message
   divBox.scrollIntoView({ behavior: 'smooth', block: 'end' }); //scroll to bottom of box
}

//
logClear = function() {
   var divBox = document.getElementById('logConsole');
   divBox.innerHTML = ""; //clear log
}

//
logCopy = function() {
   var logCopy = gol_objSpaceGame.getLogMessage();
   logCopy = logCopy.replace(/&nbsp;/g," "); //replace non-break spaces
   logCopy = logCopy.replace(/<br>/g,"\n"); //replace line breaks
   var promise = navigator.clipboard.writeText(logCopy);
   if (promise)
      alert("Copied the text: \r\n" + logCopy);
   else 
      alert("The browser does not have permission to copy"); 
}

//
 togglePrintFrames = function() {
   var bolprintFrames = gol_objSpaceGame.getPrintFrames();
   gol_objSpaceGame.setPrintFrames(!bolprintFrames); //flip print frame control
}

//
 toggleDrawbox = function() {
   var bolDrawHitbox = gol_objSpaceGame.getDrawHitbox();
   gol_objSpaceGame.setDrawHitbox(!bolDrawHitbox);
}

//
 toggleRightclick = function() {
   bolRightclickEnable = gol_objSpaceGame.getRightclickEnable();
   gol_objSpaceGame.setRightclickEnable(!bolRightclickEnable); //flip right click control
}

//
toggleHighlight = function() {
   var body = document.body;
   body.classList.toggle("user-select");
}

//
interfacePlayerControls = function() {
   Modalbox.openModal("controls");
}

//player docking feature
interfacePlayerCanDock = function(_boolean) {
   var test = _boolean;
   var object = document.getElementById("systemsDocking");
   if (test === true) 
      object.classList.add("flashing-button");
   else
      object.classList.remove("flashing-button");
}

//**ADMIN FUNCTIONS */
adminCrawRate = function() {
   changeRate(320);
}

//
adminCrawSlow = function() {
   changeRate(80);
}

//
adminCrawNorm = function() {
   changeRate(40);
}

//
adminCrawFast = function() {
   changeRate(20);
}

//
adminCrawTubo = function() {
   changeRate(0.5);
}

//
adminCashBonus = function() {
   if(!gol_objSpaceGame.getGameReady()) //game not started
      return; 
   gol_objPlayer.adminBoostCredits();
}

//
function funAdminNextPhase () {
   if(!gol_objSpaceGame.getGameReady()) //game not started
      return; 
   //continue 
   gol_objGamePhase = gol_objGamePhase.endPhase(); //begin new phase
   logPrint(gol_objGamePhase.getPrintChapter()); //print phase title
}

//jump to test chapter
adminTestPhase = function() {
   if(!gol_objSpaceGame.getGameReady()) //game not started
      return; 
   //continue
   gol_objGamePhase = clsGamePhase.start(-1); //start test phase
   var message = "Test Room: " + gol_objGamePhase.getPrintChapter();
   logPrint(message); //print phase title
}

//prevent damage to player
adminInvincible = function() {
   var boolean = gol_objPlayer.getInvincible();
   gol_objPlayer.setInvincible(!boolean);
}

//admin mode
adminDebugMode = function() {
   var test = false; //assume not on
   var url_string = window.location.href; // www.test.com?filename=test
   var url = new URL(url_string); //set as URL object
   var passVal = url.searchParams.get("debugmode");
   if (passVal === "true") test = true; //is debug passed
   if (test === false) return; //stop running
   //else
   document.getElementById("settingRightclick").checked = true
   toggleRightclick(); //flip control variable
   //document.getElementById("settingHighlight").checked = true
   //toggleHighlight(); //flip control variable
   document.getElementById("cheatInvincible").checked = true
   adminInvincible(); //flip control variable
   togglePinStartPinned(); //start with menus locked open
   adminDebugSettings(); //more useful features for debugging, in formatting.js
}

//prepare interface commands
loadInterfaceFunctions = function() {
   //allow unpause by clicking game area
      gol_objCanvas.addEventListener("click", unPause);
   //add functionallity to drop down buttons
      var accObjects = document.getElementsByClassName("accordion");
   //add to all drop down buttons
      for (var i = 0; i < accObjects.length; i++) {
         accObjects[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class, to highlight the button that controls the panel */
            this.classList.toggle("active");
            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block")
               panel.style.display = "none";
            else
               panel.style.display = "block";
         });
      }
   //tiny guide functions
      document.getElementById("treeControlExpand").addEventListener("click", toggleTreeExpand);
      document.getElementById("treeControlCollapes").addEventListener("click", toggleTreeCollapes);
      document.getElementById("jumpControlDown").addEventListener("click", toggleJumpDn);
      document.getElementById("jumpControlUp").addEventListener("click", toggleJumpUp);
      document.getElementById("minimize").addEventListener("click", toggleCommands);
      document.getElementById("pinControl").addEventListener("click", togglePin);
   //add player command functions: systems
      document.getElementById("systemsAttachments").addEventListener("click", interfaceAttachments);
      document.getElementById("systemsDefensive").addEventListener("click", interfaceDefensive);
      document.getElementById("systemsEngineering").addEventListener("click", interfaceEngineering);
      document.getElementById("systemsAuxiliary").addEventListener("click", interfaceAuxiliary);
      document.getElementById("systemsCarco").addEventListener("click", interfaceCarco);
      document.getElementById("systemsNavigation").addEventListener("click", funInterfaceNavigation);
      //document.getElementById("systemsDocking").addEventListener("click", interfaceDocking); //turn off for now, I do not have a object setup for Docking in the modal/attachment.js
   //add player command functions: construction
      //Placement button
      var buttonPlacement = document.getElementById("buildPlacement");
      buttonPlacement.setAttribute('title', "First Build option");
      buttonPlacement.addEventListener("click", interfacePlacements);
      //Facility button
      var buttonFacility = document.getElementById("buildFacility");
      buttonFacility.setAttribute('title', "Second Build option");
      buttonFacility.addEventListener("click", interfaceFacilities);
      //Infrastructure button
      var buttonInfrastructure = document.getElementById("buildInfrastructure");
      buttonInfrastructure.setAttribute('title', "Third Build option");
      buttonInfrastructure.addEventListener("click", interfaceInfrastructures);
   //add player command functions: construction
      //armory Build button
      var buttonArmoryBuild = document.getElementById("armoryBuild");
      buttonArmoryBuild.setAttribute('title', "Build and your arsenal of attachments and modules");
      buttonArmoryBuild.addEventListener("click", interfaceArmoryBuild);
      //armory Equip button
      var buttonArmoryEquip = document.getElementById("armoryEquip");
      buttonArmoryEquip.setAttribute('title', "Change space station's or a ships armaments'");
      buttonArmoryEquip.addEventListener("click", interfaceArmoryEquip);
      //Drydock button
      var buttonArmoryDrydock = document.getElementById("armoryDrydock");
      buttonArmoryDrydock.setAttribute('title', "Starship construction Setup designs for a new ship");
      buttonArmoryDrydock.addEventListener("click", interfaceArmoryDrydock);
   //tiny guide functions: right side
      document.getElementById("rightTreeControlExpand").addEventListener("click", toggleTreeExpand);
      document.getElementById("rightTreeControlCollapes").addEventListener("click", toggleTreeCollapes);
      document.getElementById("rightJumpControlDown").addEventListener("click", toggleJumpDn);
      document.getElementById("rightJumpControlUp").addEventListener("click", toggleJumpUp);
      document.getElementById("rightMinimize").addEventListener("click", toggleLogs);
      document.getElementById("rightPinControl").addEventListener("click", togglePin);
   //both guides right click feature, DOES NOT WORK
      var accGuides = document.getElementsByClassName("tiny-guide");
      for (var i = 0; i < accGuides.length; i++) {
         accGuides[i].oncontextmenu = togglePinOn;
      }
   //output log box
      document.getElementById("logClear").addEventListener("click", logClear);
      document.getElementById("logCopy").addEventListener("click", logCopy);
   //toggle minimize bars
      document.getElementById("leftMaximize").addEventListener("click", toggleCommands);
      document.getElementById("rightMaximize").addEventListener("click", toggleLogs);
   //interface settings
      document.getElementById("newWindow").addEventListener("click", newWindow);
      document.getElementById("settingShowFrames").addEventListener("click", togglePrintFrames);
      document.getElementById("settingDrawBox").addEventListener("click", toggleDrawbox);
      document.getElementById("settingRightclick").addEventListener("click", toggleRightclick);
      document.getElementById("settingHighlight").addEventListener("click", toggleHighlight);
      document.getElementById("settingControls").addEventListener("click", interfacePlayerControls);
   //admin features
      document.getElementById("speedCraw").addEventListener("click", adminCrawRate);
      document.getElementById("speedSlow").addEventListener("click", adminCrawSlow);
      document.getElementById("speedNorm").addEventListener("click", adminCrawNorm);
      document.getElementById("speedFast").addEventListener("click", adminCrawFast);
      document.getElementById("speedTubo").addEventListener("click", adminCrawTubo);
      document.getElementById("cheatInvincible").addEventListener("click", adminInvincible);
      document.getElementById("cheatCashBonus").addEventListener("click", adminCashBonus);
      document.getElementById("cheatNextPhase").addEventListener("click", funAdminNextPhase);
      document.getElementById("cheatTestPhase").addEventListener("click", adminTestPhase);
   //modal setup
      document.getElementById("closeModal").addEventListener("click", Modalbox.closeModal); // <span> (x), close the modal
      //REMOVE: document.getElementById("modalButtonCancel").addEventListener("click", Modalbox.closeModal);
   //window functions
      window.onbeforeunload = goodbye; //exit user check
} //end of loadInterfaceFunctions

//prepare interface assets
loadInterfaceResources = function() {
   //populate images
      document.getElementById("navbarShip").src = Img.interface_ship.src;
      document.getElementById("navbarBase").src = Img.interface_base.src;
      document.getElementById("navbarFleet").src = Img.interface_fleet.src;
   //add game options
      document.getElementById("navbarIntro").src = Img.interface_intro.src;
      document.getElementById("navbarObjectives").src = Img.mission_log.src;
      document.getElementById("navbarNotes").src = Img.interface_notes.src;
      document.getElementById("navbarSettings").src = Img.interface_setting.src;
   //tiny guide functions
      document.getElementById("treeControlExpand").src = Img.expand.src;
      document.getElementById("treeControlCollapes").src = Img.collapes.src;
      document.getElementById("jumpControlDown").src = Img.jump_down.src;
      document.getElementById("jumpControlUp").src = Img.jump_up.src;
      document.getElementById("minimize").src = Img.minimize.src;
      document.getElementById("pinControl").src = Img.pin.src;
   //tiny guide functions: right side
      document.getElementById("rightTreeControlExpand").src = Img.expand.src;
      document.getElementById("rightTreeControlCollapes").src = Img.collapes.src;
      document.getElementById("rightJumpControlDown").src = Img.jump_down.src;
      document.getElementById("rightJumpControlUp").src = Img.jump_up.src;
      document.getElementById("rightMinimize").src = Img.minimize.src;
      document.getElementById("rightPinControl").src = Img.pin.src;
} //end of loadInterfaceResources

//prepare 
refreshInterfaceForStart = function() {
   //hide game interface
   document.getElementById("storyBoardPanel").style.display = "none";
   document.getElementById("storyBoardButton").style.display = "none";
   document.getElementById("missionBoardPanel").style.display = "none";
   document.getElementById("missionBoardButton").style.display = "none";
   document.getElementById("leftMaximize").style.display = "none";
   document.getElementById("playerControl").style.visibility = "hidden";
   //hide all stories
   var objChapters = document.getElementsByClassName("storyBoard-plot");
   //add to all drop down buttons
      for (var i = 0; i < objChapters.length; i++) {
         objChapters[i].style.display = "None";
      }
}

//triggerred each frame but want to trigger once at new game... maybe when creating a new game object?
activateInterfaceForGame = function() {
   //printStatBar procedure display's document.getElementById("playerStats")
   document.getElementById("playerControl").style.visibility = "visible";
   document.getElementById("storyBoardButton").style.display = "block";
   document.getElementById("missionBoardButton").style.display = "block";
   document.getElementById("leftMaximize").style.display = "inline";
   //hide individual buttons

}

//
goodbye = function(e) {
   if(!e) e = window.event; //set as window event if not already
   var message = "Are you finished?";
   //e.cancelBubble is supported by IE - this will kill the bubbling process.
   e.cancelBubble = true;
   e.returnValue = message; //This is displayed on the dialog

   //e.stopPropagation works in Firefox.
   if (e.stopPropagation) {
      alert(message);
       e.stopPropagation();
       e.preventDefault();
   }
}

function funLockUnfinishedFeatures() {
/**disable buttons for features not started yet so others can use this game and know */
   document.getElementById("systemsDefensive").disabled = true;
   document.getElementById("systemsEngineering").disabled = true;
   document.getElementById("systemsAuxiliary").disabled = true;
   document.getElementById("systemsDocking").disabled = true;
   document.getElementById("systemsUpgrade").disabled = true;
   document.getElementById("buildPlacement").disabled = true;
   document.getElementById("buildFacility").disabled = true;
   document.getElementById("buildInfrastructure").disabled = true;
   document.getElementById("armoryBuild").disabled = true;
   document.getElementById("armoryEquip").disabled = true;
   document.getElementById("armoryDrydock").disabled = true;
   document.getElementById("opsResearch").disabled = true;
   document.getElementById("opsResources").disabled = true;
   document.getElementById("opsTrade").disabled = true;
   document.getElementById("opsProduction").disabled = true;
   document.getElementById("baseOptions").disabled = true;
   document.getElementById("fleetWings").disabled = true;
   document.getElementById("fleetOptions").disabled = true;

}