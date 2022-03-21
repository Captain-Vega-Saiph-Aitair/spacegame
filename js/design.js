//game level constructor
clsGamePhase = function(_stage,_title,_startMap,_spawns) {
   var self = {
      intStage: _stage, //stage player is on
      strTitle:_title, //string
      objStartingMap:_startMap, //object
      arr_objSpawns:[{}], //empty array of objects, expecting [{entity:"name",rate:6,mods:{weapons:["gun"]}},{entity:"name2",rate:10,mods:{weapons:["shotgun"]}}]
      intFrameCount: 0,
   };
   //configure object
   if (_spawns !== undefined)
      self.arr_objSpawns = _spawns;
   //game control for the current frame
   self.updateFrameCount = function() {
      self.intFrameCount++;
   }
   //
   self.resetFrameCount = function() {
      self.intFrameCount = 0; //set to zero
   }
   //automatically create natural entities
   self.spawnElements = function() {
      //check spawns array for this phase
      for (var key in self.arr_objSpawns) {
         var spawnEntity = self.arr_objSpawns[key].entity;
         var spawnTick = self.arr_objSpawns[key].rate;
         var spawnLocation = self.arr_objSpawns[key].location;
         //mod for zero, will trigger spawn
         if(self.intFrameCount % spawnTick === 0) { //each tick is 40ms
            switch(spawnEntity) {
               case "astroides":
                  clsNatural.randomlyGenerateNatural(spawnLocation);
                  break;
               case "attackers":
                  clsVessel.randomlyGenerateEnemy(spawnLocation);
                  break;
               case "upgrades":
                  clsPickup.randomlyGenerateUpgrade(spawnLocation);
                  break;
            }
         } //end if zero check
      } //end of for loop
   } //end of spawnElements method
   //end current game phase and return new phase
   self.endPhase = function() {
      //do not run code if game is not ready, this should not matter any longer
      var intMax = 5;
      var intNextStage = self.intStage + 1; //next stage
      //error catching: console.log(intNextStage);
      if (intNextStage > intMax) {//end of game 
         //intNextStage = -1; //cycle back
         intNextStage = intMax; //final stage
      }
      return clsGamePhase.start(intNextStage); //load next stage
      //end of game?
   }
   //return string
   self.getPrintChapter = function() {
      return "Chapter " + self.intStage + ": " + self.strTitle; //return "Chapter x: y"
   }
   console.log("New phase of the game set");
   //error catching: console.log(self);
   return self;
} //end of game level constructor

/** BELOW CAN BE PUT INTO ONE OBJECT */
//dummy phase, test room
clsGamePhase.test = function() {
   var globalspace = clsGamePhase(-1,"Test Room","space");
   //debugging enemy
   clsVessel.randomlyGenerateEnemy();
   return globalspace;
} //end of dummy phase

//phase 0: first load screen
clsGamePhase.startup = function() {
   var globalspace = clsGamePhase(0,"Space Game","splashscreen");
   clsLocation.list["splash"].instanceOfRelocation();
   //
   return globalspace;
} //end of dummy phase

//phase 1: introduction
clsGamePhase.one = function() {
   var arr_objSpawns = [ //array of things to spawn
      {entity:"astroides",rate:80,location:"home"}];
   //jump to home map
   clsLocation.list["home"].funTransition();
   var arrDrops = [];
   var attachments = {0:clsWeapon.createWeapon("chain_gun"), 1:clsWeapon.createWeapon("chain_gun"), 2:clsWeapon.createWeapon("chain_gun")};
   clsVessel("international","ally",Img.earth_station,"earth",300,200,150,150,"stationary",0,0,200,arrDrops,attachments,4,false,{regenerate:.08,}); //market
   clsObjective.mission_entrepreneur (); //launch first mission, entrepreneur
   var globalspace = clsGamePhase(1,"The Beginning","space",arr_objSpawns);
   //reveal story
   document.getElementById("storyPhase1").style.display = "block";
   //
   return globalspace;
} //end of stage 1

//phase 2
clsGamePhase.two = function() {
   var arr_objSpawns = [ //array of things to spawn
      {entity:"astroides",rate:150,location:"home",}];
   var globalspace = clsGamePhase(2,"Setup Shop","space",arr_objSpawns);
   //*initial spawns*/
   //generate space station
   var arrDrops = [];
   var attachments = {0:clsWeapon.createWeapon("starting_bomb_attack")};
   clsVessel("Lvl1Station","ally",Img.station_first,"home",150,500,100,100,"stationary",0,0,200,arrDrops,attachments,4,false,{regenerate:.08,});
   //variable for each enemy, number for if they load on this level 
   //reveal story
   document.getElementById("storyPhase2").style.display = "block";
   return globalspace;
} //end of stage 2

//phase 3
clsGamePhase.three = function() {
   var spawns = [ //array of things to spawn
      {entity:"attackers",rate:100,location:"home",},
      {entity:"upgrades",rate:150,location:"home",},
      {entity:"astroides",rate:200,location:"home",}];
   var globalspace = clsGamePhase(3,"Seek and Destroy","space",spawns);
   //*initial spawns*/
   //beginning enemies
   clsVessel.randomlyGenerateEnemy("home");
   clsVessel.randomlyGenerateEnemy("home");
   //generate specail enemy
   //spawnEnemy(40,40,2,2,80,80,Img.cecil,20,1,"default",{weapons:["gun"]},"DarkKnight");
   var attachments = {0:clsWeapon.createWeapon("starting_gun")};
   var arrDrops = []; //empty array
   clsVessel("DarkKnight","enemy",Img.cecil,"home",40,40,80,80,"default",2,2,20,arrDrops,attachments);
   //reveal story
   document.getElementById("storyPhase3").style.display = "block";
   return globalspace;
} //end of stage 3

//phase 4
clsGamePhase.four = function() {
   var arr_objSpawns = [ //array of things to spawn
      {entity:"defenders",rate:10,location:"home",}];
   var globalspace = clsGamePhase(4,"Survival of the Fittest","space",arr_objSpawns);
   //reveal story
   document.getElementById("storyPhase4").style.display = "block";
   return globalspace;
} //end of stage 4

//phase 5
clsGamePhase.five = function() {
   var globalspace = clsGamePhase(5,"End of Game","space");
   //reveal story
   document.getElementById("storyPhase5").style.display = "block";
   return globalspace;
} //end of stage 5
/** END OF ONE OBJECT FROM ABOVE*/

//begin game phase
clsGamePhase.start = function(_phase) {
   var phase = 0;
   var globalspace;
   if (_phase !== undefined)
      phase = _phase;
   switch (phase) {
      case -1: globalspace = clsGamePhase.test(); break; //load test stage
      case 0 : globalspace = clsGamePhase.startup(); break; //game launched
      case 1 : globalspace = clsGamePhase.one(); break; //load chapter 1
      case 2 : globalspace = clsGamePhase.two(); break; //load chapter 2
      case 3 : globalspace = clsGamePhase.three(); break; //load chapter 3
      case 4 : globalspace = clsGamePhase.four(); break; //load chapter 4
      case 5 : globalspace = clsGamePhase.five(); break; //load chapter 5
   }
   return globalspace;
}
//
clsObjective = function(_id,_title,_description) {
   var self = {
      strId: _id,
      strTitle: _title, //short name
      strDescription: _description, //notes
      bolAchieved: false, //start of mission
   };
   printMissionObjective(self.strId,self.strTitle,self.strDescription); //add mission log 
   //this part will need to be divided up into objects
   self.update = function() {
      //place holder for each mission for their own goals and methods to achieve them
   }
   //
   self.getTitle = function() {
      return self.strTitle;
   }
   //
   self.getDescription = function() {
      return self.strDescription;
   }
   //test to see if actor has this item
   self.hasMission = function(_id) {
      for(var i = 0; i < clsObjective.list; i++) {
         if(clsObjective.list[i].strId === _id) {
            return true;
         }
      } //if end, the player does not have the mission
      return false; //add item to this inventory
   }
   //
   self.getAchieved = function() {
      return self.bolAchieved;
   }
   //
   self.completed = function() {
      completeMissionObjective(self.strId); //on formatting.js
   }

   return self;
}

//update player objectives
clsObjective.list = {}

//objectives iteration
clsObjective.update = function() {
   //iterate all upgrades
   for (var key in clsObjective.list)
      clsObjective.list[key].update();
}

//
clsObjective.nextMission = function(_arrayOfMissions) {
   arrayOfMissions = _arrayOfMissions;
   if (!Array.isArray(arrayOfMissions))  //not an array
      arrayOfMissions = []; //set as empty array
   //loop array
   for (var key in arrayOfMissions) {
      //need table of objects to pull from with id
      clsObjective.addObjective(key);
   }
}

//
clsObjective.addObjective = function(_id,_title,_description) {
   //check first if player already has Mission
   var self = clsObjective(_id,_title,_description); //create object
   console.log("New quest:");
   console.log(self);
   return self;
}

//
clsObjective.mission_entrepreneur = function() {
   //mission 1: entrepreneur
   var strId = "entrepreneur"; //same as object title
   var strTitle = "New Beginnings";
   var strDescription = "Collect 10,000 credits to buy a Spacestation Scaffolding";
   //universal mission variables
   var self = clsObjective.addObjective(strId,strTitle,strDescription);
   //unique to mission variables
   self.target = "10000";

   //mission update
   super_update = self.update; //override update
   self.update = function() {
      if(self.achieved)
         return; //mission completed, stop update
      super_update();
      var counterWeight = gol_objPlayer.getCredits(); //check player credits
      if (counterWeight >= self.target) 
         self.achieved = true; //finished mission

      if (self.achieved) {
         self.completed();
      }
   }

   //mission completed
   var super_completed = self.completed;
   self.completed = function() {
      super_completed();
      //launch next missions
      clsObjective.mission_homesetup(); 
   }

   clsObjective.list[self.strId] = self; //local variable set to global variable
}

//
clsObjective.mission_homesetup = function() {
   //mission 1: entrepreneur
   var strId = "homesetup"; //same as object title
   var strTitle = "Return to Sponsers";
   var strDescription = "Travel to earth, then speak tp a Sponser to buy a spacestation startup kit. You do have an alternative option, to save up 100,000 credits to go it yourself.";
   //universal mission variables
   var self = clsObjective.addObjective(strId,strTitle,strDescription);
   //unique to mission variables
   self.target = "a location";

   //mission update
   self.update = function() {
      //test location
      //   self.achieved = true; //finished mission

      if (self.achieved) {
         self.completed();
      }
   }

   //mission completed
   var super_completed = self.completed;
   self.completed = function() {
      super_completed();
      //launch next missions
   }

   clsObjective.list[self.strId] = self; //local variable set to global variable
}

//map constructor
clsMap = function(_id,_map) {
   var self = {
      strId:_id,
      objImg:new Image(), 
      intWidth:_map.width,
      intHeight:_map.height,
      intDrawX:0,
      intDrawY:0,
      drawModWidth:_map.drawModWidth,
      drawModHeight:_map.drawModHeight,
   }
   //
   self.objImg.src = _map.src;
   //populate map
   self.drawBackground = function() {
      //drawing the map in relation to the player to center the view  
      var x = gol_objPlayer.getXPosition();
      var y = gol_objPlayer.getYPosition(); 
      //map position
      var x = WIDTH/2 - x;
      var y = HEIGHT/2 - y; 
      //check for border of map to lock map
      //left screen lock
      if (x > 0) {
         x = 0; //lock map position
         gol_objPlayer.lockLeftBorder();//global control variable true
      } else {
         gol_objPlayer.lockLeftBorder(false); //global control variable false
      }
      //top screen lock
      if (y > 0) {
         y = 0; //lock map position
         gol_objPlayer.lockTopBorder(); //global control variable true
      } else {
         gol_objPlayer.lockTopBorder(false); //global control variable false
      }
      //right screen lock
      var intRightBorder = (self.intWidth - WIDTH);
      if (-x > intRightBorder) {
         x = -intRightBorder; //lock map position
         gol_objPlayer.lockRightBorder(); //global control variable true
      } else {
         gol_objPlayer.lockRightBorder(false); //global control variable false
      }
      //bottom screen lock
      var intBottomBorder = (self.intHeight - HEIGHT);
      if (-y > intBottomBorder) {
         y = -intBottomBorder; //lock map position
         gol_objPlayer.lockBottomBorder(); //global control variable true
      } else {
         gol_objPlayer.lockBottomBorder(false); //global control variable false
      }
      //set drawn position to memory
      self.intDrawX = x;
      self.intDrawY = y;
      //
      gol_objContext.drawImage(self.objImg,                              //the Image
         0,0,                                                    //CROP image x, y, entire image
         self.objImg.width,self.objImg.height,                   //CROP image width, height, entire image
         x,y,                                                    //DRAW image x, y, entire image
         self.objImg.width * self.drawModWidth,                  //DRAW image width manipulate size
         self.objImg.height * self.drawModHeight);               //DRAW image height manipulate size
   }
   //
   self.getId = function() {
      return self.strId;
   }
   //
   self.getWidth = function() {
      return self.intWidth;
   }
   //
   self.getHeight = function() {
      return self.intHeight;
   }
   //
   self.getMapDrawX = function() {
      return self.intDrawX;
   }
   //
   self.getMapDrawY = function() {
      return self.intDrawY;
   }
   //
   return self;
} //end of map constructor

//navigation constructor
clsNavigation = function() {
   var self = {
      arr_locations: [], //individuals list of places
   }
   //add to actor navigation
   self.addLocation = function(_keyId) {
      self.arr_locations.push(_keyId);
      self.refreshRender(); //update player view
   }
   //remove from actor navigation
   self.removeLocation = function(_id) {
      for(var i = 0; i < self.arr_locations.length; i++) {
         if(self.arr_locations[i].getId() === _id) {
            self.arr_locations.splice(i,1); //remove location from navigation
            self.refreshRender(); //update player view
            return; //exit function
         }
      }    
   }
   //test to see if actor has this location
   self.hasLocation = function(_id) {
      for(var i = 0; i < self.arr_locations.length; i++) {
         if(self.arr_locations[i].getId() === _id) {
            return true;
         }
      } 
      //if here, the player does not have the item
      return false; //add item to this inventory
   }
   //return array of ???
   self.getLocations = function() {
      return self.arr_locations;
   }
   //refresh hotbar and carco interface displays of inventory
   self.refreshRender = function() {
      //player only function
      clearNavigation(); //formatting.js procedure to clear list
      var arrFavs = gol_objPlayer.getNavigationFavorites(); //check for players favorite places
      if (arrFavs !== false) { //any favorite items?
         for (var i = 0; i < arrFavs.length; i++) {
            let objLocation = clsLocation.list[arrFavs[i]];
            printFaveNavigation(objLocation); ////formatting.js procedure to populate list
         } //end of any favorite items
      }
      //
      if (gol_objControllerModal !== undefined) { //is modal set
         if (gol_objControllerModal.mode === "navigation") { //is open modal carco
            Modalbox.clearBody(); //clear modal list
            Modalbox.printPopulateNavigation(); //rebuild list
         }
      }
   }  
   return self;
} //end of clsNavigation function

//location object constructor
clsLocation = function(_id, _name,_x,_y,_z,_map) {
   var self = clsMap(_id,_map);
   self.strName = _name;
   self.parSecX = _x;
   self.parSecY = _y;
   self.parSecZ = _z;
   //
   self.getDistance = function(_destination) {
      /*
      Step 1: Find the DR’s (Direction Ratios) by taking the difference of the corresponding position coordinates of the two given points. l = (x2 – x1), m = (y2 – y1), n = (z2 – z1); Here l, m, n are the DR’s.
      Step 2: Choose either of the two given points say, we choose (x1, y1, z1).
      Step 3: Write the required equation of the straight line passing through the points (x1, y1, z1) and (x2, y2, z2). L : (x – x1)/l = (y – y1)/m = (z – z1)/n
      */
   }
   //player use navigation
   self.funTransition = function() {
      self.instanceOfRelocation(); //initialize map
      var objCurrentMap = gol_objSpaceGame.getCurrentMap();
      //update player location
      gol_objPlayer.setXPosition(objCurrentMap.getWidth() / 2); //place in center of map
      gol_objPlayer.setYPosition(objCurrentMap.getHeight() / 2)
      gol_objPlayer.setLocation(objCurrentMap.getId()); //update location to current map
   }
   //initialize map
   self.instanceOfRelocation = function() {
      //player location is itialized on the player themselves
      //MOVED TO clsGame - currentMap = self;
      gol_objSpaceGame.setCurrentMap(self);
   }
   //
   self.getName = function() {
      return self.strName;
   }
   clsLocation.list[self.getId()] = self; //add to global index list

   return self;
} //end of location object constructor

//all possible locations
clsLocation.list = {};

//declare list of locations
clsLocation.declareLocations = function() {
   /////////////////////////////////////////////////////////////////////////////
   clsLocation("splash","Loading Screen",0,0,0,Img.map_intro);
   /////////////////////////////////////////////////////////////////////////////
   clsLocation("earth","Planet Earth",0,0,0,Img.map_earth);
   /////////////////////////////////////////////////////////////////////////////
   clsLocation("home","Planet Perfect",100.00005002,100.00002,100.00003,Img.map_main); //for now Img.map_earth
   /////////////////////////////////////////////////////////////////////////////
   clsLocation("l1","Perfect, L1 Point",100.00005,100.00005,100.00005,Img.map_earth); //for now Img.map_earth
}
