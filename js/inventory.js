//game inventory system
clsInventory = function() {
   var self = {
      arr_objItems: [], //individuals list of items
   }
   //add to actor inventory
   self.addItem = function(_id, _amount) {
      for(var i = 0; i < self.arr_objItems.length; i++){
         if(self.arr_objItems[i].id === _id) {
            self.arr_objItems[i].amount += _amount;
            self.refreshRender(); //update player view
            return; //exit function
         }
      }
      //if here, the player does not have the item
      self.arr_objItems.push({id: _id, amount: _amount}); //add item to this inventory
      self.refreshRender(); //update player view
   }
   //remove from actor inventory
   self.removeItem = function(_id, _amount) {
      for(var i = 0; i < self.arr_objItems.length; i++) {
         if(self.arr_objItems[i].id === _id) {
            self.arr_objItems[i].amount -= _amount; 
            if(self.arr_objItems[i].amount <= 0)
               self.arr_objItems.splice(i, 1); //remove item from inventory
            self.refreshRender(); //update player view
            return; //exit function
         }
      }    
   }
   //test to see if actor has this item
   self.hasItem = function(id) {
      for(var i = 0; i < self.arr_objItems.length; i++) {
         if(self.arr_objItems[i].id === id) {
            return self.arr_objItems[i].amount;
         }
      } 
      //if here, the player does not have the item
      return false; //add item to this inventory
   }
   //refresh hotbar and carco interface displays of inventory
   self.refreshRender = function() {
      //player only function
      clearCarco(); //formatting.js procedure to clear list
      var arrFavs = gol_objPlayer.getInventoryFavorites(); //check for players favorite items
      if (arrFavs !== false) { //any favorite items?
         for (var i = 0; i < arrFavs.length; i++) {
            let objItem = clsItem.list[arrFavs[i]];
            var amount = self.hasItem(arrFavs[i]);
            if (!amount) //if false
               amount = 0;
            printFaveCarco(objItem,amount); //formatting.js procedure to populate list
         } //end of any favorite items
      }
      //
      if (gol_objControllerModal !== undefined) { //is modal set
         if (gol_objControllerModal.mode === "carco") { //is open modal carco
            Modalbox.clearBody(); //clear modal list
            Modalbox.printPopulateCarco(); //rebuild list
         }
      }
   }
   //
   self.getInventory = function() {
      return self.arr_objItems;
   }
   //
   return self;
} //end of clsInventory class

//item constructor
clsItem = function(_id,_type,_name,_stats,_description,_action,_unique) {
   if (_stats === undefined) 
      _stats = [{empty:false}]; //empty object
   if (_description === undefined) _description = "MISSING DESCRIPTION FOR " + _id; //error control
   if (_action === undefined) 
      _action = function() { //action
         //placeholder for the item to do something, this is to prevent errors with empty function items
      } //end of action
   if (_unique === undefined) 
      _unique = false; //item is exinguishable
   var self = {
      id:_id,
      type:_type, //enum: special, regular, weapon, tool, armor, deflector, shield
      name:_name, //displayed to user
      stats:_stats, //array of objects
      description:_description,
      action:_action, //procedure called on item use
      unique:_unique, //boolean
   }
   //
   clsItem.list[self.id] = self; //add to global index list
   //primary handler for an item being used
   self.useItem = function() {
      if(self.preUseItem() === false) //false means game is not ready
            return; //stop item use
      self.action(); //item unique action
      self.postUseItem();
   }
   //create and return string of item for description
   self.printDescString = function() {
      var message = self.name + " - " + self.description;
      //loop all regular stats first
      for (var key in self.stats) {
         if(key === "recover")
            message += "<br>Use to recover " + self.stats.recover;
         if(key === "weaponType") {
            message += "<br>Type: " + self.stats.weaponType + "<br>"; //type
            message += "Atk Sp: " + self.stats.cooldown / 25 + " secs<br>"; //25 ticks = 1 second;
            message += "Dmg: " + self.stats.damage; //damage
         }
      }; //end of self.stats loop
      //loop all weapon override stats
      for (key in self.stats.overrides) {
         if(key === "scatter")
            message += " (per hit), firing " + self.stats.overrides.scatter;
         if(key === "unbalanced")
            message += "<br>Inaccuracy: ~" + self.stats.overrides.unbalanced + " more degrees";
         //if(key === "explosionDamage")
         //   message += " (per hit) firing " + self.stats.overrides.explosionDamage;
         //if(key === "explosionRadius")
         //   message += " (per hit) firing " + self.stats.overrides.scatter;
      }
      //html additional controls
      message = message.replace(/\s/g,"&nbsp;"); //whitespace replace with no-break-space
      return message;
   }
   //
   self.preUseItem = function() { //test and print message
      var playerReady = gol_objSpaceGame.getGameReady();
      if(!playerReady || !gol_objPlayer.objInventory.hasItem(self.id)) //game has not started or player does not have this item
         return false;
      //continue with item
      logPrint(self.printDescString()); //print output to user
   }
   //
   self.postUseItem = function() { //remove item check
      var remove = false; //assume false
      if (self.type ==="regular")
         remove = true; //they are exaustable
      if (remove) //remove true
         gol_objPlayer.objInventory.removeItem(self.id,1); //remove one
   }
   //
   return self;
} //end of clsItem class

//add list and an method to access any item
clsItem.list = {}; //list of all items

/**Stats = {
 *    recover:int,            //user recover hp
 *    weaponType:string,      //subtype
 *    cooldown:int,           //attack speed, 25 = 1 second
 *    damage:int,             //damage deal by hit
 *    overrides: {            //additional weapon stats
 *       scatter:                //number of projectiles fired
 *       unbalanced:int          //additional weapon inaccuracy
 *       explosionDamage:int,    //damage deal by explosion from projectile
 *       explosionRadius:5,      //measurement of the explosion
 *       player:inventory        //add to player inventory
 *    },
 * }
 */

//initialize game's items
clsItem.declareItems = function() {
   var emptyStats = {empty:false}; //empty object
   /////////////////////////////////////////////////////////////////////////////
   //spawn enemy
   clsItem("enemy", //id
      "special",//type
      "Spawn Enemy", //name
      emptyStats, //stats
      "Used Monster spawner", //description
      function() { //action
         var self = clsVessel.randomlyGenerateEnemy();
         console.log("random enemy spawned: ");
         console.log(self);
      }, //end of action
      true); //unique, set item
   /////////////////////////////////////////////////////////////////////////////
   //sponsers
   var sponserString = "Reminder of your committment to your sponser"; //description
   clsItem("tech", //id 
      "special",//type
      "TECH Sponser Certificate", //name
      emptyStats, //stats
      sponserString, //description
      function() { //action
         //display pic of it?
         //research lab
      }, //end of action
      true); //unique, set item
   clsItem("ore", //id
      "special",//type
      "ORE Sponser Certificate", //name
      emptyStats, //stats
      sponserString, //description
      function() { //action
         //display pic of it?
         //sollar collector
         //mining gear
      }, //end of action
      true); //unique, set item
   clsItem("manu", //id
      "special",//type
      "MANU Sponser Certificate", //name
      emptyStats, //stats
      sponserString, //description
      function() { //action
         //display pic of it?
         //arms requisitions requests (ask for product)
         //supplies fulfillment requests (sell product)
         //discounts on purchases
      }, //end of action
      true); //unique, set item
   /////////////////////////////////////////////////////////////////////////////
   var recoverSmall = 5; //hp to be recovered
   clsItem("kit", //id
      "regular",//type
      "Repair Kit", //name
      [ {recover:5} ], //stats
      "Used to repaire your vessel.", //description
      function() { //action
         gol_objPlayer.changeHp(recoverSmall);
         printStatBar(); //update hp
      } //end of action
   ); //set item
   /////////////////////////////////////////////////////////////////////////////
   clsItem("station", //id
      "regular",//type
      "Space Station Module", //name
      emptyStats, //stats
      "Use in orbit around an availiable planet to begin construction of a space station.", //description
      function() { //action
         //perform
            //check if planet is already clamed
            //place ally in center of a space station scaffolding
            //mission complete?
      } //end of action
   ); //set item
   clsItem("starting_gun", //id
      "weapon",//type
      "Simple Gun", //name
      { //stats
         weaponType:"gun", //subtype
         cooldown:25, //4 second
         damage:3, //beginning damage
      }, //stats end
      "A basic gun." //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("starting_shotgun", //id
      "weapon",//type
      "Simple Shotgun", //name
      { //stats
         weaponType:"gun", //subtype
         cooldown:100, //4 second
         damage:3, //beginning damage
         overrides: //weapon properties
            {scatter:3, unbalanced:15},
      }, //stats end
      "Scatter shot bullets" //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("auto_gun", //id
   "weapon",//type
   "Auto Gun", //name
   { //stats
      weaponType:"gun", //subtype
      cooldown:18.75, //three quarter second
      damage:3, //average
      overrides: //weapon properties
         {unbalanced:35},
   }, //stats end
   "Shoots bullets faster." //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("auto_shotgun", //id
   "weapon",//type
   "Auto Shotgun", //name
   { //stats
      weaponType:"gun", //subtype
      cooldown:25, //1 second
      damage:3, //average
      overrides: //weapon properties
         {scatter:3, unbalanced:15},
   }, //stats end
   "Scatter shot bullets faster." //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("chain_gun", //id
   "weapon",//type
   "Chaingun", //name
   { //stats
      weaponType:"gun", //subtype
      cooldown:12.5, //half second
      damage:3, //average
      overrides: //weapon properties
         {unbalanced:25},
   }, //stats end
   "Fire bullets at a fast rate." //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("gatling_gun", //id
   "weapon",//type
   "Gatling Gun", //name
   { //stats
      weaponType:"gun", //subtype
      cooldown:6.25, //quarter second
      damage:3, //average
      overrides: //weapon properties
         {unbalanced:35},
   }, //stats end
   "Fire bullets at a very faster rate, but more inaccurate." //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("mini_gun", //id
   "weapon",//type
   "Minigun", //name
   { //stats
      weaponType:"gun", //subtype
      cooldown:4, //4/25 second or 6.25 per second
      damage:2, //below average
      overrides: //weapon properties
         {unbalanced:15},
   }, //stats end
   "Fire smaller bullets for maximum discharg speed." //description
   ); 
   /////////////////////////////////////////////////////////////////////////////
   clsItem("starting_cannon", //id
   "weapon",//type
   "Cannon", //name
   { //stats
      weaponType:"cannon", //subtype
      cooldown:100, //4 seconds
      damage:8, //damage
   }, //stats end
   "Fire shells that explode on impact." //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("auto_cannon", //id
   "weapon",//type
   "Auto Cannon", //name
   { //stats
      weaponType:"cannon", //subtype
      cooldown:25, //1 seconds
      damage:8, //damage
   }, //stats end
   "Fire shells faster that explode on impact." //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("howitzer", //id
   "weapon",//type
   "Howitzer", //name
   { //stats
      weaponType:"cannon", //subtype
      cooldown:250, //10 seconds
      damage:10, //below average
      overrides: //weapon properties
         {explosionDamage:2,explosionRadius:5},
   }, //stats end

   "Powerful cannon that fires even more powerful shells." //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("starting_railgun", //id
   "weapon",//type
   "Railgun", //name
   { //stats
      weaponType:"railgun", //subtype
      cooldown:75, //3 seconds
      damage:12, //damage
   }, //stats end
   "Fires large solid rods at high velocitiy dealing massive damage." //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("starting_launcher", //id
   "weapon",//type
   "Missle Launcher", //name
   { //stats
      weaponType:"launcher", //subtype
      cooldown:150, //6 seconds
      damage:0, //launcher itsself does not damage
   }, //stats end
   "Specialized weapon to launch missles." //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("starting_lander", //id
   "weapon",//type
   "Spacemine Lander", //name
   { //stats
      weaponType:"lander", //subtype
      cooldown:25, //1 seconds
      damage:0, //launcher itsself does not damage
   }, //stats end
   "Specialized weapon to deploy mines." //description
   );
   /////////////////////////////////////////////////////////////////////////////
   clsItem("starting_bomb_attack", //id
   "weapon",//type
   "Explosion Attack", //name
   { //stats
      weaponType:"bomb", //subtype
      cooldown:250, //10 seconds
      damage:5, //above average
      overrides: //weapon properties
         {unbalanced:25},
   }, //stats end
   "Shoots 8 bullets, in a circle." //description
   );
}
