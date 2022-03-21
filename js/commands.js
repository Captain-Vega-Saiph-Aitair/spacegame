/**entire page needs restructuring as the interface for the users constructions options.  The interface shows modal box now */

//
clsStructures = function(_nameshort, _nameLong, _price) {
   var self = {
      strNameShort: _nameshort,//unique identifier
      strNameLong: _nameLong, 
      intPrice: _price,
   };

   self.costPrint = function() {
      return self.strNameLong + " " + self.intPrice.toLocaleString() + " credits";
   }

   self.costPay = function() {
      return self.intPrice;
   }

   self.title = function() {
      return self.strNameLong;
   }

   self.requestConstruction = function() {
      //do not run code if game is not ready
      //MOVED TO clsGame - if (!playerReady) return; 
      if (!gol_objSpaceGame.getGameReady()) return;
      //run code
      gol_objPlayer.resetControls();
      var message; //declare control variable
      //MOVED TO clsPlayer - if (player.credits >= self.intPrice) { //have enough credits
      var intPlayerCash = getCredits();
      if (intPlayerCash >= self.intPrice) { //have enough credits
         var build = confirm("Do you want to construct a " + self.strNameLong + " for " + self.intPrice + " credits?"); //ask user to continue
         if (build) {
            //MOVED TO clsPlayer - player.credits -= self.intPrice; //subtract credits
            gol_objPlayer.decreaseCredits(self.intPrice);
            message = "Started building " + self.strNameShort + ".";
            printStatBar(); //update credits
         } else {
            message = "Construction cancelled.";
         }
      } else {
         message = "Not enough credits for " + self.strNameLong + ", you need another " + (self.intPrice - intPlayerCash) + " credits as it costs " + self.intPrice +".";
      }
      logPrint(message); //print out message
   }

   return self;
}

//
clsStructures.blueprints = function() {
   var buildDataSet =  [ //set structure information array
      ["Placement","Module Placement",500],
      ["Depot","Storage Depot",2500],
      ["Array","Sensor and Communications Array",3000],
      ["Platform","Weapon Platform",4000],
      ["Collector","Solar Collectors",5000],
      ["Port","Shipyard",8000],
      ["Lab","Research Lab",10000]];
   var self = []; //placeholder for objects
   //loop array to build structure blueprints
   for (key in buildDataSet) {
      self[buildDataSet[key][0]] = clsStructures(buildDataSet[key][0],buildDataSet[key][1],buildDataSet[key][2]); //add structure objects
   }
    
   return self;
}

//setup library
var libraryBlueprints; //object of all building options
//initalize librarie
libraryBlueprints = clsStructures.blueprints();