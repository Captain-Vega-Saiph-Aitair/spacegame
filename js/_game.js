//objCanvas declaration
var gol_objContext = gol_objCanvas.getContext("2d"); //ctx becomes the canvas
gol_objContext.font = '30px Arial';     //Font used
//global constants
var HEIGHT = 500;
var WIDTH = 500;
//global variables
var gol_objPlayer; //player object, single player

//game configuration
clsGame = function() {
   //single player game
   self = {
      //game settings
      intIntervalRate: 40, //speed of the game, 1000ms / 40ms = 25 fps
      intFrameCount: 0, //control variable, one per tick, 25 ticks per second
      bolPlayerReady: false, //control variable for very first action on game
      bolGameLaunched: false, //control varialbe to setup player on start
      bolPaused: false, //control variable for game pause
      intCount: 0, //count by one for object ids
      //game play
      intCurrentLevel: 1, //new game, chapter 1
      objCurrentMap: {}, //map that player is on
      strLogMessage: "", //print out on bottom of screen
      //GUI settings
      bolDrawHitbox: false,  //default no
      bolRightclickEnable: false, //default no
      bolPrintFrames: false, //default no
      //statistics 
      datTimeWhenGameStarted:Date.now(), //time stamp at creation
      intFrameCurrentSecond:0, //control variable
      intFramesLastSecond:0, //control variable
      intFramesPerSecCount:0, //control variable
   }
   //id recorder
   self.getNextId = function() {
      self.intCount++; //increment
      return self.intCount;
   }
   //clear recorder
   self.resetNextId = function() {
      self.intCount = 0; //set to zero
   }
   //get game running speed
   self.getIntervalRate = function(_speed) {
      return self.intIntervalRate;
   }
   //change game running speed
   self.setIntervalRate = function(_speed) {
      self.intIntervalRate = _speed;
      clearInterval(gol_objGameInterval); 
      gol_objGameInterval = setInterval(clsGame.update, self.intIntervalRate);
   }
   //
   self.resetFrameCount = function() {
      self.intFrameCount = 0; //set to zero
   }
   //game control for the current frame
   self.updateFrameCount = function() {
      self.intFrameCount++;
   }
   //
   self.getGameReady = function() {
      return self.bolPlayerReady;
   }
   //
   self.setGameReady = function(_boolean) {
      self.bolPlayerReady = _boolean;
   }
   //
   self.getGameLaunch = function() {
      return self.bolGameLaunched;
   }
   //
   self.setGameLaunch = function(_boolean) {
      self.bolGameLaunched = true; //default to true
      if (_boolean === false) self.bolGameLaunched = _boolean; //if false passed, game restarted
   }
   //
   self.getGamePaused = function() {
      return self.bolPaused;
   }
   //
   self.setGamePaused = function(_boolean) {
      self.bolPaused = _boolean;
   }
   //
   self.getCurrentMap = function() {
      return self.objCurrentMap;
   }
   //
   self.setCurrentMap = function(_object) {
      self.objCurrentMap = _object;
   }
   //
   self.getLogMessage = function() {
      return self.strLogMessage;
   }
   //
   self.addLogMessage = function(_string) {
      self.strLogMessage += _string; //add to string
   }
   //
   self.clearLogMessage = function() {
      self.strLogMessage = "";
   }
   //
   self.getDrawHitbox = function() {
      return self.bolDrawHitbox;
   }
   //
   self.setDrawHitbox = function(_boolean) {
      self.bolDrawHitbox = _boolean;
   }
   //
   self.getRightclickEnable = function() {
      return self.bolRightclickEnable;
   }
   //
   self.setRightclickEnable = function(_boolean) {
      self.bolRightclickEnable = _boolean;
   }
   //
   self.getPrintFrames = function() {
      return self.bolPrintFrames;
   }
   //
   self.setPrintFrames = function(_boolean) {
      self.bolPrintFrames = _boolean;
   }
   //calculate and return frames per second
   self.getFPS = function() {
      //calculate the current second
      var intSec = Math.floor(Date.now() / 1000);

      if (intSec != self.intFrameCurrentSecond) {
         self.intFrameCurrentSecond = intSec; //reset current second
         self.intFramesLastSecond = self.intFramesPerSecCount; //update last second
         self.intFramesPerSecCount = 1; //reset count
      } else {
         self.intFramesPerSecCount++; //increase frame count
      }
      return self.intFramesLastSecond;
   }

   return self;
} //end of game configuration

//
clsGame.arrPlayers = []; //player container

//iterate all entities and game functions
clsGame.runLevel = function() {
   gol_objPlayer.clearDockable();
   clsObjective.update();
   clsBullet.update();
   clsPickup.update();
   clsVessel.update();
   clsNatural.update();
   gol_objGamePhase.updateFrameCount();
   gol_objGamePhase.spawnElements();
}

//
clsGame.layMap = function() {
   gol_objContext.clearRect(0,0,WIDTH,HEIGHT); //clear entire map
   var objCurrentMap = gol_objSpaceGame.getCurrentMap();
   objCurrentMap.drawBackground();  //draw map
}

//new game initialize 
clsGame.startNewGame = function() {
   //set game variables
   timeWhenGameStarted = Date.now();
   gol_objSpaceGame.resetNextId();
   //clear lists
   clsNatural.list = {}; 
   clsVessel.list = {};
   clsPickup.list = {}; 
   clsBullet.list = {}; 
   clsModule.list = {}; 
   //reset objectives
   eraseMissionLog();
   //set game variables
   gol_objGamePhase = clsGamePhase.start();
   //reset player variables
   var objCurrentMap = gol_objSpaceGame.getCurrentMap();
   gol_objPlayer = clsPlayer(objCurrentMap.getId(), objCurrentMap.getWidth() * .7, objCurrentMap.getHeight() * .55);   //initialize player on bottom right side
   //beginning inventory
   gol_objPlayer.objAttachments = { //starting weapons
      0:clsWeapon.createWeapon("none",{gol_objPlayer:"inventory"}), //OPTIONAL
      1:clsWeapon.createWeapon("starting_gun",{gol_objPlayer:"inventory"}),
      2:clsWeapon.createWeapon("starting_shotgun",{gol_objPlayer:"inventory"}),
      3:clsWeapon.createWeapon("starting_bomb_attack",{gol_objPlayer:"inventory"}), };
   //default weapon placements
   gol_objPlayer.funEquipAttachment(1, gol_objPlayer.objAttachments[1]); //(_equipSlot, thingEquipped)
   gol_objPlayer.funEquipAttachment(2, gol_objPlayer.objAttachments[2]); //(_equipSlot, thingEquipped)
   gol_objPlayer.funEquipAttachment(3, gol_objPlayer.objAttachments[3]); //(_equipSlot, thingEquipped)
   //carco
   gol_objPlayer.objInventory.addItem("kit",2);
   //beginning navigation
   gol_objPlayer.addNewLocation("home");
   gol_objPlayer.addNewLocation("earth");
   //new navigation favorites
   gol_objPlayer.addNewFavoriteLocation("home");
   gol_objPlayer.addNewFavoriteLocation("earth");
   //refresh interface view
   gol_objPlayer.refreshGUI(); 
   //
   gol_objSpaceGame.setGameReady(false);
   //gol_objSpaceGame.setGameLaunch(false);
   //
   refreshInterfaceForStart(); //hide player stats
} //end of new game initialize

//game iteration
clsGame.update = function() {
   //error control: console.log("tick"); //tick
   //intro 'movie'
   if(!gol_objSpaceGame.getGameReady()) {     //animate map
      clsGame.layMap(); //draw background
      gol_objPlayer.runIntro_pre();
      gol_objPlayer.update(); //run player object
      gol_objPlayer.runIntro_post();
      printReadyQueston();
      return;
   }
   //one time game launch
   if(!gol_objSpaceGame.getGameLaunch()) {
      gol_objPlayer.resetControls(); //stop all key press
      clsGame.layMap(); //draw background
      funAdminNextPhase(); //move player to chapter one
      gol_objSpaceGame.setGameLaunch(); //set to true
      return;
   }
   //game paused
   if (gol_objSpaceGame.getGamePaused()) {
      printPause();
      return;
   }
   //display hidden elements from start
   activateInterfaceForGame();
   //draw background
   clsGame.layMap();
   //increse game variables, default 25 framecount per second
   gol_objSpaceGame.updateFrameCount();
   //process game
   clsGame.runLevel();
   if (gol_objSpaceGame.getPrintFrames()) 
      displayFrames();
   //
   printStatBar(); //update players info across the top
   //
   gol_objPlayer.update(); //run player object
} //end of game iteration

//***begin program
var gol_objSpaceGame = clsGame(); //start game object

//prepare interface, interface.js
loadInterfaceFunctions(); //programs javascript to html elements
loadInterfaceResources(); //load images to html elements
refreshInterfaceForStart(); //blank out interface
funLockUnfinishedFeatures(); /**lock unprepared features of game */
//memory
clsItem.declareItems(); //prepare inventory, inventory.js
clsLocation.declareLocations(); //prepare locations, design.js
//initialize game
clsGame.startNewGame(); 
//check if debug mode is on
adminDebugMode(); 

//run program
var gol_objGameInterval = setInterval(clsGame.update, gol_objSpaceGame.getIntervalRate());