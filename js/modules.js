//module constrctor
clsModule = function(_id,_moduleType,_itemId) {
   var self = {
      intId: _id,
      enmModuleType: _moduleType,
      itemId:_itemId, //every module is an item (not every item is a module)
   }
   //
   self.draw = function() {

   }
   //
   self.getItemId = function() {
      return self.itemId;
   }
   //
   return self;
}

//all modues, weapons, tools, defenses
clsModule.list = {};

//weapon constructor
clsWeapon = function(_id,_weaponType,_itemId,_cooldown,_damage,_mode) {
   var self = clsModule(_id,"attachment",_itemId);
      self.intId = _id;
      self.enmWeaponType = _weaponType;
      self.intCooldown = _cooldown;
      self.intCooldownCooling = _cooldown;  //counter for cooling down
      self.intDamage = _damage;
      self.enmMode = _mode;
      self.idLocation = "";
      self.intX = 0; //tied to the owner or last place keep
      self.intY = 0; //tied to the owner or last place keep
      self.aimAngle = 0; //weapon aiming
      self.enmCombatType = "neutral"; //the attacker
      if (self.enmMode.hasOwnProperty("cooldown")) { //override cooldown of weapon
         self.intCooldown = self.enmMode.cooldown;
         self.intCooldownCooling = self.enmMode.cooldown;
      };
   //update function
   self.update = function(_actor) {
      //correct weapon
      self.idLocation = _actor.getLocation();
      self.intX = _actor.getXPosition();
      self.intY = _actor.getYPosition();
      self.aimAngle = _actor.getAimAngle(); 
      self.enmCombatType = _actor.getFightingSide(); //either player, enemy or ally
      //reloading weapon
      var intRate = 1; //one per frame
      intRate += _actor.getAtkSpd(); //add actors natural attack speed
      if (self.intCooldownCooling > 0) //is gun cooling down
         self.intCooldownCooling -= intRate; //reduce cooldown of weapon
   }
   //
   self.getDamage = function() {
      return self.intDamage;
   }
   //
   self.getLocation = function() {
      return self.idLocation;
   }
   //
   self.getXPosition = function() {
      return self.intX;
   }
   //
   self.getYPosition = function() {
      return self.intY;
   }
   //
   self.getCombatType = function() {
      return self.enmCombatType;
   }
   //return if can be fired
   self.loaded = function() {
      var bolTest = (self.intCooldownCooling <= 0);
      return bolTest; //check if zero
   }
   //the weapon is fired
   self.fire = function() {
      self.intCooldownCooling = self.intCooldown; //reset cooldown to reload
   }
   //weapon attack
   self.performAttack = function() {
      if(self.loaded()) {
         self.fire(); //weapon fired
         switch (self.enmWeaponType) { //different default weapons
            case "gun": //fire bullet
               clsWeapon.gun(self);
               break;
            case "cannon":
               //shell explode on impact
               break;
            case "railgun":
               //fires rods, pentrating
               break;
            case "launcher":
               //launches missles / satellites
               //armed
               break;
            case "unmanedvehicle":
               //collision vessel, more carring capacity for explosives than missle
               //surveillance / scouting
               //armed
               break;
            case "lander":
               //lays mines / charges
               //ratius detection
               //armed
               break;
            case "lasergun":
               //continous beam attack
               break;
            case "bomb": //release bullets arounds weapon in a ring
               clsBullet.explosion(self.idLocation, self.intX, self.intY, 1, 8, self.enmCombatType); //default power 24, damage 1
               break;
            default: //none
               break;
            //mode.hasOwnProperty("booster");
            //mode.hasOwnProperty("burst");
            //mode.hasOwnProperty("feed");
            //mode.hasOwnProperty("warhead");
         } //end of switch (self.weaponType)
      }
   }
   //
   self.getId = function() {
      return self.intId;
   }
   //
   clsModule[self.intId] = self; //local variable set to global variable
   return self;
} //end of clsWeapon class

//object handles gun mechanics
clsWeapon.gun = function(_weapon) {
   //declare variables
   var scatterShot = 0; //additional bullets
   if (_weapon.enmMode.hasOwnProperty("scatter")) 
      scatterShot = _weapon.enmMode.scatter;
   var unbalanced = 0; //random angle of bullet
   if (_weapon.enmMode.hasOwnProperty("unbalanced"))
      unbalanced = _weapon.enmMode.unbalanced;
   var i = 0; //lcv
   do { //fire once
      var rnd = Math.random() * 30 - 15; //natural randomness to shot
      if (unbalanced > 0) //add randomness to shot
         unbalanced = Math.random() * unbalanced - (unbalanced / 2); //set unbalanced to random angle between -x and x, where x = unbalanced/2
      var overrideAngle = _weapon.aimAngle + rnd + unbalanced;
      generateBullet(_weapon, _weapon.getDamage(), overrideAngle); //shoot bullet
      i++;
    } while (i < scatterShot); //shotgun modifier, fire additional bullets
}

//initialize weapon
clsWeapon.createWeapon = function(_itemId,_overrides) {
   var overrides = _overrides; //OPTIONAL // {player:inventory,}
   if (_overrides === undefined) // test if not passed
      overrides = {empty: false,}; //empty object decleared 
   var itemId = false; //unique identifer for inventory
   var displayName = "None"; //default
   if (_itemId !== "none")  //test for weapon passed
      itemId = _itemId;
   var weaponType = "none"
   var cooldown = 0; //default
   var damage = 0; //default
   if (itemId !== false) {//is this an item
      //declare weapon from item properties
      displayName = clsItem.list[itemId].name;
      var itemTemplate = clsItem.list[itemId].stats;
      weaponType = itemTemplate.weaponType;
      cooldown = itemTemplate.cooldown;
      damage = itemTemplate.damage;
      var weaponProperties = itemTemplate.overrides;
      if (weaponProperties !== undefined) { //test value
         //check weapon properties
         if (itemTemplate.overrides.hasOwnProperty("scatter")) 
            overrides.scatter = itemTemplate.overrides.scatter;
         if (itemTemplate.overrides.hasOwnProperty("unbalanced")) 
            overrides.unbalanced = itemTemplate.overrides.unbalanced;
      }
   }
   //additional modifications
   if (overrides.hasOwnProperty("cooldown"))   //check if cooldown mod
      cooldown = overrides.cooldown;
   if (overrides.hasOwnProperty("damage"))   //check if damage mod
      damage = overrides.damage;
   if (overrides.hasOwnProperty("player")) { //player ownership
      if (overrides.player == "inventory") { //add to player inventory
         //if (itemId !== false) //is NOT nothing            /**Attachments use to be added to inventory, but could not get it to work properly */
            //gol_objPlayer.objInventory.addItem(itemId, 1); /**Attachments use to be added to inventory, but could not get it to work properly */
      }
      //other checks to add to startship inventory
   }
   //create weapon
   var id = gol_objSpaceGame.getNextId();
   var self = clsWeapon(id,weaponType,itemId,cooldown,damage,overrides);
   self.displayName = displayName;
   //
   return self;
} //end of createWeapon

//bullet constructor
clsBullet = function(_id,_location,_x,_y,_spdX,_spdY,_width,_height,_combatType,_damage,_overrides) {
   var self = clsEntity("bullet",_id,_location,_x,_y,_width,_height,Img.bullet);
   if (_overrides === undefined) 
      _overrides = {empty:false}; //empty object
   self.intSpeedX = _spdX;
   self.intSpeedY = _spdY;
   self.enmCombatType = _combatType;
   self.intDamage = _damage;
   self.arr_objOverrides = _overrides;
   self.intTimer = 0;
   self.bolToRemove = false; //control variable
   //inject code on update function
   var super_update = self.update;
   self.update = function() {
      super_update();
      self.intTimer++; //increase bullet life span
      //bullet controls
      if (self.intTimer > 100) { //after 5 seconds
         self.bolToRemove = true; //change control 
         //error catching: console.log("run out of time");
      }
      //cycle all natural for collision
      for (var key in clsNatural.list) {
            var bolColliding = self.testCollision(clsNatural.list[key]);
            if (bolColliding) {
               self.bolToRemove = true; //change control
               //error catching: console.log("collide with nature");
               clsNatural.list[key].hardness -= self.intDamage; //TO COME
               break; //leave loop
            }
      }
      //cycle all vessels for collision
      for (var key in clsVessel.list) {
         if (self.enmCombatType !== clsVessel.list[key].getFightingSide()) { //only target other teams
            var bolColliding = self.testCollision(clsVessel.list[key]);
            if (bolColliding) {
               self.bolToRemove = true; //change control
               //error catching: console.log("collide with vessel");
               clsVessel.list[key].changeHp(-self.intDamage); //reduce health by damage
               break; //leave loop
            }
         } //end of allegiance
      }
      //is player on opponent team?
      if (self.enmCombatType !== gol_objPlayer.getFightingSide()) { //only target other teams
         //otherwise, is the bullet hitting the player?
         var bolColliding = self.testCollision(gol_objPlayer);
         //MOVED TO clsPlayer - if (isColliding && !invincible) {
         var bolInvincible = gol_objPlayer.getInvincible();
         if (bolColliding && !bolInvincible) {
            self.bolToRemove = true; //change control
            //error catching: console.log("collide with player");
            //MOVED TO clsActor - player.hp -= self.damage;
            gol_objPlayer.changeHp(-self.intDamage);
         }
      }
      //if bullet left the map
      var objCurrentMap = gol_objSpaceGame.getCurrentMap();
      if(self.getXPosition() < 0 || self.getXPosition() > objCurrentMap.getWidth()) { //test Out of Bounds
         self.bolToRemove = true;
         //console.log("left map x");
      }
      if(self.getYPosition() < 0 || self.getYPosition() > objCurrentMap.getHeight()) { //test Out of Bounds
         self.bolToRemove = true;
          //error catching: console.log("left map y");
      }
      //removing bullet?
      if(self.bolToRemove) { //test if true
         delete clsBullet.list[self.intId]; //remove bullet
         if(self.arr_objOverrides.hasOwnProperty("explosion")) { }  //check if explosion mod
      }
   }
   //
   self.updatePosition = function() {
      self.intX += self.intSpeedX;
      self.intY += self.intSpeedY;
   }
   //
   clsBullet.list[self.intId] = self; //local variable set to global variable
} //end of bullet constructor

//bullet entities
clsBullet.list = {};

//bullet iteration
clsBullet.update = function() {
   //iterate all bullets
   for (var key in clsBullet.list)
      clsBullet.list[key].update(); 

} //end of bullet iteration

//treated as a weapon
clsBullet.explosion = function(_location,_posX,_posY,_damage,_power,_typeOverride) {
   //360 divided by power for bullets roation added, power determs number of bullets
   var power = 24; //weakest blast
   if (_power !== undefined)
      power = _power;
   var damage = 1; //weakest damage
   if (_damage !== undefined)
      damage = _damage;
   //self is a temporary weapon object, tempWeapon
   var tempWeapon = {
      intX:_posX,
      intY:_posY,
      aimAngle:0,
      enmCombatType:"explosion",
      idLocation:_location,
   };
   //
   if (_typeOverride !== undefined)
      tempWeapon.enmCombatType = _typeOverride;
   //
   tempWeapon.getLocation = function() {
      return tempWeapon.idLocation;
   }
   //
   tempWeapon.getXPosition = function() {
      return tempWeapon.intX;
   }
   //
   tempWeapon.getYPosition = function() {
      return tempWeapon.intY;
   }
   //
   tempWeapon.getCombatType = function() {
      return tempWeapon.enmCombatType;
   }
   var increment = Math.floor(360 / power);
   var rnd = Math.random() * 360; //random factor
   var rotationCount = 0; //control variable
   //launch attack
   while (rotationCount < 360) {
      rotationCount += increment; //increase control
      tempWeapon.aimAngle = rotationCount + rnd; //rotate bullets and by same additional degree
      generateBullet(tempWeapon, damage);
   }
}

//initialize bullet
generateBullet = function(_weapon,_damage,_overwriteAngle,_overrides) {
   var overrides = {empty: false,};
   if (_overrides !== undefined)
      overrides = _overrides;
   var location = _weapon.getLocation();
   var x = _weapon.getXPosition();
   var y = _weapon.getYPosition();
   var height = 5;
   var width = 5;
   var id = gol_objSpaceGame.getNextId();
   var angle = _weapon.aimAngle;  
   if(_overwriteAngle !== undefined) { //is angle being overriden?
      angle = _overwriteAngle;
   }
   var type = _weapon.getCombatType(); //attacker
   //calculate triangulation
   var intSpeedX = Math.cos(angle/180*Math.PI)*15;
   var intSpeedY = Math.sin(angle/180*Math.PI)*15;
   var damage = _damage;
   clsBullet(id,location,x,y,intSpeedX,intSpeedY,width,height,type,damage,overrides);
} //end of generateBullet function

//
clsDefensive = function(_id) {
   var self = clsModule(_id,"defensive");
   //
   self = {
      id:_id,
   }
   //
   return self;
}

//
Defensive.createDefensive = function(_defensive) {
   var displayName= _defensive;
   var defensive = _defensive.toLowerCase();
   var defensiveType = defensive; //name normally carries over to the type
   //test for defensive passed
   switch (defensive) {
      case "armor":
         break;
      case "deflector":
         break;
      case "shields":
         break;
      case "abladed armor":
         defensiveType = "armor";
         break;  
      case "heavy plated armor":
         defensiveType = "armor";
         //slow movement
         break;  
   }
   //
   var id = gol_objSpaceGame.getNextId();
   //create defensive
   var self = Defensive(id, defensive, defensiveType);
   self.displayName = displayName;
   return self;
} //end of createDefensive