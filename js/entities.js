//move or stop base on if on map edge 
function gol_funMotion(_object) {
   var objCurrentMap = gol_objSpaceGame.getCurrentMap();
   var bolOut = false; //control variable, assuem not out yet
   //movement
   if (_object.getXPosition() < _object.getWidth() / 2) {
      _object.setXPosition(_object.getWidth() / 2);
   }
   if (_object.getXPosition() > objCurrentMap.getWidth() - _object.getWidth() / 2) { //test Out of Bounds
      _object.setXPosition(objCurrentMap.getWidth() - _object.getWidth() / 2); //move to boundry
      bolOut = true; //switch flag
   }
   if (_object.getYPosition() < _object.getHeight() / 2) {
      _object.setYPosition(_object.getHeight() / 2);
   }
   if (_object.getYPosition() > objCurrentMap.getHeight() - _object.getHeight() / 2) { //test Out of Bounds
      _object.setYPosition(objCurrentMap.getHeight() - _object.getHeight() / 2); //move to boundry
      bolOut = true; //switch flag
   }
   return bolOut; //return out of bounds result
}

//game entity constructor
clsEntity = function(_type,_id,_location,_x,_y,_width,_height,_img) {
   //prepare initial object for new existing thing
   var self = {
      intId : _id,
      enmType : _type, //allegiance ["enemy","ally"]
      idLocation : _location, //id of location the entity is in
      intX : _x,
      intY : _y,
      intWidth : _width,
      intHeight : _height,
      objImg : _img,
      //animation variables
      intPositionX : 0, //position on the canvas
      intPositionY : 0, //position on the canvas
      intRotate : -1, //radius angle of a circle, -1 means roation not used
      intTranslateX : 0, //reposition due to roation
      intTranslateY : 0, //reposition due to roation
      //crop entire image by default
      intCropX : 0,
      intCropY : 0,
      intCropWidth : _img.width,
      intCropHeight : _img.height,
      //
      enmImgMode : "none",
      intSpriteAnimCounter : 0, //if the entity uses a sprite animination
   };
   //
   if (self.objImg.hasOwnProperty("mode")) //test if image has a mode //this throws an error, and I do not know why
      self.enmImgMode = self.objImg.mode;
   //objects draw controller
   self.update = function() {
      self.updatePosition(); 
      if (self.onCurrentMap()) {
         self.calcDraw();
         self.draw(); //primary draw control, will be overriden on Actors with Spritesheets and Natural features
         self.adminDraw(); //draw hit box
      }
   }
   //mechanics to move game objects
   self.updatePosition = function() {
      //default motion
      gol_funMotion(self); 
   }
   //check if on current map
   self.onCurrentMap = function() {
      var objCurrentMap = gol_objSpaceGame.getCurrentMap();
      return self.idLocation === objCurrentMap.getId(); //return boolean
   }
   //movement
   self.calcDraw = function() {
      //declare variables
      var objCurrentMap = gol_objSpaceGame.getCurrentMap();
      //control variable, default not used
      var intXLockControl = -1;
      var intYLockControl = -1;
      //where is it compared to the player
      var initailX = self.intX - gol_objPlayer.getXPosition();
      var initialY = self.intY - gol_objPlayer.getYPosition();
      //now compared to center of canvas
      initailX += WIDTH / 2; 
      initialY += HEIGHT / 2;
      //offset for center of entity
      var x = initailX;
      var y = initialY;
      x -= self.intWidth / 2;
      y -= self.intHeight / 2;
      //check if x coordinates are locked on the map
      if (gol_objPlayer.getLeftBorderLock() === true) {
         intXLockControl = 0; //no modifer
      } else if (gol_objPlayer.getRightBorderLock() === true) {
         intXLockControl = 1; //invert
      }
      //check if y coordinates are locked on the map
      if (gol_objPlayer.getTopBorderLock() === true) {
         intYLockControl = 0; //no modifer
      } else if (gol_objPlayer.getBottomBorderLock() === true) {
         intYLockControl = 1; //invert
      }
      //change x if map is locked
      if (intXLockControl !== -1) { //map is locked
         x += gol_objPlayer.getXPosition() - (WIDTH * 0.5) - (objCurrentMap.getWidth() - WIDTH) * intXLockControl;
      }
      //change y if map is locked
      if (intYLockControl !== -1) {
         y += gol_objPlayer.getYPosition() - (HEIGHT * 0.5) - (objCurrentMap.getHeight() - HEIGHT) * intYLockControl;
      }
      //position on canvas
      self.intPositionX = x; 
      self.intPositionY = y;
   } //end of calcDraw method
   //draw entity on canvas
   self.draw = function() {
      gol_objContext.save();
      //crop image
      var cropX = self.intCropX;
      var cropY = self.intCropY;
      var cropWidth = self.intCropWidth;  
      var cropHeight = self.intCropHeight;
      //
      if(self.enmImgMode === "topDown") { //spin
         //center grid on image
         self.intTranslateX = self.intPositionX + self.intWidth / 2;
         self.intTranslateY = self.intPositionY + self.intHeight / 2;
         gol_objContext.translate(self.intTranslateX, self.intTranslateY);  
         //calculate angle of entity
         var rad = (4 * Math.PI + self.intAimAngle * Math.PI / 180) + Math.PI / 2;
         self.intRotate = rad;
         gol_objContext.rotate(self.intRotate); 
         gol_objContext.translate(-self.intTranslateX,-self.intTranslateY);
      } //end of spin
      if(self.enmCategory === "dust") { //dim
         gol_objContext.globalAlpha = self.intDissipate * 1.3;
      } //end of dim
      //
      gol_objContext.drawImage(self.objImg,
         cropX, cropY, cropWidth, cropHeight,
         self.intPositionX, self.intPositionY, 
         self.intWidth, self.intHeight //position and size
      );  
      gol_objContext.restore();
   } //end of draw function
   //additional drawing
   self.adminDraw = function() {
      //draw hitbox
      if (gol_objSpaceGame.getDrawHitbox()) {
         gol_objContext.save();
         //rotate hitbox
         if (self.intRotate !== -1) {
            gol_objContext.translate(self.intTranslateX, self.intTranslateY); 
            gol_objContext.rotate(self.intRotate);
            gol_objContext.translate(-self.intTranslateX,-self.intTranslateY);
         }
         gol_objContext.strokeRect(self.intPositionX,self.intPositionY,self.intWidth,self.intHeight); 
         gol_objContext.restore();
      }
   } //end of adminDraw function
   //x relative to canvas, return integer
   self.getCanvasX = function() {
      return self.intPositionX;
   }
   //y relative to canvas, return integer
   self.getCanvasY = function() {
      return self.intPositionY;
   }
   //return object id
   self.getId = function() {
      return self.intId;
   }
   //return integer
   self.getWidth = function() {
      return self.intWidth;
   }
   //return integer
   self.getHeight = function() {
      return self.intHeight;
   }
   //distance to entity, 2D plain, return integer
   self.getDistance = function(entity2) { //return distance (number)
      var vx = self.intX - entity2.intX;
      var vy = self.intY - entity2.intY;
      return Math.sqrt(vx * vx * vy * vy);
   } //end of getDistance function
   //x relative to map, return integer
   self.getXPosition = function() {
      return self.intX;
   }
   //y relative to map, return integer
   self.getYPosition = function() {
      return self.intY;
   }
   //
   self.setXPosition = function(_x) {
      self.intX = _x;
   }
   //
   self.setYPosition = function(_y) {
      self.intY = _y;
   }
   //return enumeration
   self.getFightingSide = function() {
      return self.enmType;
   }
   //return id of object
   self.getLocation = function() {
      return self.idLocation;
   }
   //
   self.setLocation = function(_location) {
      self.idLocation = _location;
   }
   //mechanics to see if collide with another entity
   self.testCollision = function(entity2) { //return if colliding (true/false)
      if (self.idLocation !== entity2.idLocation) //not at the same location
         return false; //exit function
      var rect1 = {
         intX:self.intX - self.intWidth / 2,
         intY:self.intY - self.intHeight / 2,
         intWidth:self.intWidth,
         intHeight:self.intHeight,
      }
      var rect2 = {
         intX:entity2.intX - entity2.intWidth / 2,
         intY:entity2.intY - entity2.intHeight / 2,
         intWidth:entity2.intWidth,
         intHeight:entity2.intHeight,
      }
      return clsEntity.testCollisionRectRect(rect1, rect2);
   }
   //
   self.getSpriteAnimCount = function() {
      return self.intSpriteAnimCounter;
   }
   //
   self.setSpriteAnimCount = function(_value) {
      self.intSpriteAnimCounter = _value;
   }
   //
   self.addSpriteAnimCount = function() {
      self.intSpriteAnimCounter += 0.2
   }
   return self;
} //end of entity constructor

//mechanics to see if two rectangles collide
clsEntity.testCollisionRectRect = function(_rect1,_rect2) {  //takes two rectangles objects
   //the rectangle object must have an x, y, widht and height
   return _rect1.intX <= _rect2.intX + _rect2.intWidth     //will return ture if they are colliding
       && _rect2.intX <= _rect1.intX + _rect1.intWidth
       && _rect1.intY <= _rect2.intY + _rect2.intHeight
       && _rect2.intY <= _rect1.intY + _rect1.intHeight;
}

//actor constructor
clsActor = function(_type,_id,_location,_x,_y,_width,_height,_img,_hp,_atkSpd,_mod) {
   //actors move differently, that is why the movement is not in this object
   var self = clsEntity(_type,_id,_location,_x,_y,_width,_height,_img); //actor type = combatType for weapons
   //game control variables
   self.intHp = _hp, self.intHpMax = _hp; //health
   self.intAtkSpd = _atkSpd;
   self.intAimAngle = 0; //control variable to calculate actors aiming
   self.objInventory = clsInventory(); //initialize actors self inventory
   self.objAttachments = {}; //prepare empty object
   self.objTargetLock = false; //this actor locked on another. object or false
   self.arr_objLockedOnMe = []; //control array, other actors who locked on this actor
   //movement control variables
   self.bolPressingDown = false;
   self.bolPressingUp = false;
   self.bolPressingLeft = false;
   self.bolPressingRight = false;
   self.intMaxMoveSpd = 3; //movement rate
   if (_mod === undefined)
      _mod = {empty:false,}; //set empty object
   self.mod = _mod;
   //check to override update because of spreadsheet
   if(self.enmImgMode === "spriteSheet") { //spreadsheet mapping
      //draw method if actor uses spriteSheet
      var super_calcDraw = self.calcDraw;
      self.calcDraw = function() {
         super_calcDraw();
         //size of image in px
         var frameWidth = self.objImg.width / self.objImg.divideWidth; //windows image object
         var frameHeight = self.objImg.height / self.objImg.divideHeight; //windows image object
         //crop dimensions
         var cropWidth = frameWidth * self.objImg.partsWidth;
         var cropHeight = frameHeight * self.objImg.partsHeight;
         //set diameter of sprite
         var cropX = frameWidth;
         var cropY = frameHeight;
         //to animate motion
         var walkingMod = Math.floor(self.getSpriteAnimCount() % 3); //return 1 2 or 0
         //determing facing direction with mouse
         var aimingAngle = self.intAimAngle;
         if (aimingAngle < 0) //correct for negative value
            aimingAngle = 360 + aimingAngle;
         //direction aiming
         switch (true) {
         case (aimingAngle >= 45 && aimingAngle < 135):     //down
            if (walkingMod === 0) {
               cropX *= self.objImg.frontFace.x;      cropY *= self.objImg.frontFace.y;
            } else if (walkingMod === 1) {
               cropX *= self.objImg.frontFaceLeft.x;  cropY *= self.objImg.frontFaceRight.y;
            } else {
               cropX *= self.objImg.frontFaceRight.x; cropY *= self.objImg.frontFaceRight.y;
            }
            break;
         case (aimingAngle >= 135 && aimingAngle < 225):    //left
            if (walkingMod === 0) {
               cropX *= self.objImg.leftFace.x;       cropY *= self.objImg.leftFace.y;
            } else if (walkingMod === 1) {
               cropX *= self.objImg.leftFaceLeft.x;   cropY *= self.objImg.leftFaceRight.y;
            } else {
               cropX *= self.objImg.leftFaceRight.x;  cropY *= self.objImg.leftFaceRight.y;
            }
            break;
         case (aimingAngle >= 225 && aimingAngle < 315):    //up
            if(walkingMod === 0) {
               cropX *= self.objImg.backFace.x;       cropY *= self.objImg.backFace.y;
            }else if (walkingMod === 1) {
               cropX *= self.objImg.backFaceLeft.x;   cropY *= self.objImg.backFaceRight.y;
            }else {
               cropX *= self.objImg.backFaceRight.x;  cropY *= self.objImg.backFaceRight.y;
            }
            break;
         default:                                           //right
            if (walkingMod === 0) {
               cropX *= self.objImg.rightFace.x;      cropY *= self.objImg.rightFace.y;
            } else if (walkingMod === 1) {
               cropX *= self.objImg.rightFaceLeft.x;  cropY *= self.objImg.rightFaceRight.y;
            } else {
               cropX *= self.objImg.rightFaceRight.x; cropY *= self.objImg.rightFaceRight.y;
            }
            break;
         }
         //
         self.intCropX = cropX;
         self.intCropY = cropY;
         self.intCropWidth = cropWidth;  
         self.intCropHeight = cropHeight;
      }
   }
   //override update
   var funSuperUpdate = self.update;
   self.update = function() {
      funSuperUpdate();
      //refresh gear
      for (var key in self.objAttachments) { //cycle objAttachments
         self.objAttachments[key].update(self);
      }
      if (self.intHp <= 0) {
         self.onDeath();
      }
      //special modifications
      if (self.mod.hasOwnProperty("regenerate"))
         self.changeHp(self.mod.regenerate); //recover health over time
   }
   //mechanics to move game object
   self.updatePosition = function() { 
      //change actors direction based on which key is pressed
      if (self.bolPressingDown) self.intY += self.intMaxMoveSpd;
      if (self.bolPressingUp) self.intY -= self.intMaxMoveSpd;
      if (self.bolPressingLeft) self.intX -= self.intMaxMoveSpd;
      if (self.bolPressingRight) self.intX += self.intMaxMoveSpd;
      //test position in boundries
      gol_funMotion(self);
   }
   //key input
   self.pressedDown = function () {
      self.bolPressingDown = true;
   }
   //key input
   self.pressedUp = function () {
      self.bolPressingUp = true;
   }
   //key input
   self.pressedLeft = function () {
      self.bolPressingLeft = true;
   }
   //key input
   self.pressedRight = function () {
      self.bolPressingRight = true;
   }
   //key drop
   self.releaseDown = function () {
      self.bolPressingDown = false;
   }
   //key drop
   self.releaseUp = function () {
      self.bolPressingUp = false;
   }
   //key drop
   self.releaseLeft = function () {
      self.bolPressingLeft = false;
   }
   //key drop
   self.releaseRight = function () {
      self.bolPressingRight = false;
      
   }
   //return boolean
   self.getKeyDown = function () {
      return self.bolPressingDown;
   }
   //return boolean
   self.getKeyUp = function () {
      return self.bolPressingUp;
   }
   //return boolean
   self.getKeyLeft = function () {
      return self.bolPressingLeft;
   }
   //return boolean
   self.getKeyRight = function () {
      return self.bolPressingRight;
   }
   //provide actors current hp, return integer
   self.getHp = function() {
      return self.intHp;
   }
   //provide actors max hp, return integer
   self.getMaxHp = function() {
      return self.intHpMax;
   }
   //increase (or decrease) actors current hp
   self.changeHp = function(_value) {
      self.intHp += _value;
      self.hpCap();
   }
   //update actors current hp
   self.setHp = function(_value, _recover) {
      self.intHp = _value;
      if (_override !== true) 
         self.hpCap();
   }
   //update actors max hp
   self.changeMaxHp = function(_value, _recover) {
      self.intHpMax += _value;
      if (_recover === true) {
         self.intHp = intHpMax;
      }
   }
   //update actors current hp
   self.setMaxHp = function(_value, _recover) {
      self.intHpMax += _value;
      self.hpCap();      
      if (_recover === true) {
         self.intHp = intHpMax;
      }
   }
   //control actors hp 
   self.hpCap = function() {
      if (self.intHp > self.intHpMax) //if current HP above max HP
      self.intHp = self.intHpMax; //reset HP
   }
   //provide actors attack speed
   self.getAtkSpd = function() {
      return self.intAtkSpd;
   }
   //update actors attack speed
   self.setAtkSpd = function(_integer) {
      self.intAtkSpd = _integer;
   }
   //increase (or decrease) actors attack speed
   self.changeAtkSpd = function(_integer) {
      self.intAtkSpd += _integer;
   }
   //return integer
   self.getAimAngle = function() {
      return self.intAimAngle;
   }
   //calculate aim angle
   self.setAimAngle = function(_y,_x) {
      self.intAimAngle = Math.atan2(_y,_x) / Math.PI * 180;
   }
   //targeting method, return object
   self.acquireTarget = function(_mode,_search) { //enum(closest,2nd,fartest,multi,na),object
      var mode = _mode; 
      if (_mode === undefined)
         mode = "closest"; //enum
      if (_search !== undefined)  //if a target to select is passed
         return search; //target the search
      //otherwise, search for closest
      var recordDistance = 0; //control variable
      var lockedTarget = false; //return value, assume false
      //loop all vessels to check distance
      for (var key in clsVessel.list) {
         //check if vessel is a possible valid target
         var bolSameMap = (self.getLocation() === clsVessel.list[key].getLocation()); //check if vessel is on the same map
         if (bolSameMap === false) 
            continue; //skip this iteration
         //else on same map
         if (clsVessel.list[key].getRemoving() === true)
            continue; //skip this iteration
         //else not being removed
         /**Check if set to be removed, if so, do not target, its not removed yet  :) */

         if (self.getFightingSide() !== clsVessel.list[key].getFightingSide()) { //only target other teams
            distance = clsVessel.list[key].getDistance(self);
            //test the mode
            if (mode === "closest") {
               if (recordDistance < distance) { //if shorter than the last check, replace it
                  recordDistance = distance;
                  lockedTarget = clsVessel.list[key];
               }
            } else if (mode === "2nd") {
               //not sure how to do this one
            } else if (mode === "fartest") {
               if (recordDistance > distance) { //if longer than the last check, replace it
                  recordDistance = distance;
                  lockedTarget = clsVessel.list[key];
               }
            } else if (mode === "multi") {
               //check if already targeted already

            }
         } //end of type 'allegiance' check
      }
      //is player on opponent team?
      if (self.getFightingSide() !== gol_objPlayer.getFightingSide()) { //only target other teams
         //check distance to player
         distance = gol_objPlayer.getDistance(self);
         if (recordDistance < distance) { //if shorter than the last check, replace it
            recordDistance = distance;
            lockedTarget = gol_objPlayer;
         }
         /*
            RUN ABOVE CODE HERE, MADE THEM INTO FUNCTIONS
         */
      }
      return lockedTarget; //returns object
   }
   //
   self.occuredLock = function(_target) { //_target is an vessle object
      self.arr_objLockedOnMe.push(_target); //add self to targets array
   }
   //remove object from current target locked
   self.dropTarget = function() {
      self.objTargetLock = false; //drop target
   }
   //when this dies
   self.onDeath = function() {
      //check all things that is targing this
      arrLength = self.arr_objLockedOnMe.length;
      for (var i = 0; i < arrLength; i++) {
         self.arr_objLockedOnMe[i].dropTarget(); //reset other objects targeting system
     } 
   } 
   //return object
   return self;
} //end of actor constructor

//player constructor
clsPlayer = function(_location,x,y) {
   var self = clsActor("ally","P1",_location,x,y,50,50,Img.player,10,1); //ship
   //'intro' controls
   self.bolBeginIntro = false;
   self.enmIntroMoveFirst = "none";
   self.enmIntroMoveSecond = "none";
   self.intIntroTickFirst = 0;
   self.intIntroTickSecond = 0;
   //
   self.intCredits = 0; //money
   self.intScore = 0; //score
   // equips
   self.objEquip1 = {} //empty place holder
   self.objEquip2 = {} //empty place holder
   self.objEquip3 = {} //empty place holder
   self.armor = "";
   self.deflector = "";
   self.shields = "";
   self.SLS = "";
   self.FTL = "";
   self.engins = "";
   self.alpha = "";
   self.beta = "";
   self.backups = "";
   //players position on the current draw screen
   self.drawPositionX = 0;
   self.drawPositionY = 0;
   //self.inventory declared in Actor object
   self.arr_idInventoryFavorites = []; //empty array for carco favorites
   self.objNavigation = clsNavigation(); //player navigation destinations
   self.arr_idNavigationFavorites = []; //empty array for navigation favorites
   self.arr_idDockableInRange = []; //other dockable vessels in range
   self.intMaxMoveSpdIntro = 4; //intro movie speed 
   self.intMaxMoveSpdDefault = 10; //game play speed
   self.intMaxMoveSpd = self.intMaxMoveSpdDefault; //movement rate
   self.idTravelDestination = false;
   //interface control variables
   self.pressingMouseLeft = false;
   self.pressingMouseMiddle = false;
   self.pressingMouseRight = false;
   self.pressingSpaceBar = false;
   self.pressingShift = false;
   self.bolLockDown = false;
   self.bolLockUp = false;
   self.bolLockLeft = false;
   self.bolLockRight = false;
   self.intKills = 0;
   self.bolInvincible = false;
   //player controls
   var funSuperUpdate = self.update;
   self.update = function() {
      funSuperUpdate();
      //player attacks
      if (self.pressingMouseLeft && self.objEquip1 !== undefined){
         self.objEquip1.performAttack();
      }
      if (self.pressingMouseRight) {
         self.objEquip2.performAttack();
      }
      if (self.pressingSpaceBar) {
         self.objEquip3.performAttack();
      }
      /**add actions: toggle, cycle attachments/commands/attack modes (long range, point range, multi-lock) */
      //appliciable to sprite animation
      if (self.getKeyDown() || self.getKeyUp() || self.getKeyLeft() || self.getKeyRight())
         self.addSpriteAnimCount();
      if (self.arr_idDockableInRange.length > 0) //player can dock at something
         interfacePlayerCanDock(true);
      else
         interfacePlayerCanDock(false);
   }
   //
   self.runIntro_pre = function() {
      self.intMaxMoveSpd = self.intMaxMoveSpdIntro; //update player speed for intro
      var intMax = 40 * 0.5; //between 0.1 and 0.5 seconds
      var intMin = 40 * 0.10; //40 ticks per second
      //release all pressed keys
      self.resetControls();
      //check if first time running
      if (self.bolBeginIntro === false) {
         self.enmIntroMoveFirst = self.randomStep(1);
         self.enmIntroMoveSecond = self.randomStep(2);
         self.intIntroTickFirst = Math.random() * intMax + intMin; 
         self.intIntroTickSecond = Math.random() * intMax + intMin;
         self.bolBeginIntro = true; //update control variable
         return; //exit to run again
      } //else has already run
      //update tick counter, first press
      if (self.intIntroTickFirst < 0) {
         self.intIntroTickFirst = Math.random() * intMax + intMin; //new random number
         self.enmIntroMoveFirst = self.randomStep(1); //possibly change direction
      } else {
         self.intIntroTickFirst--; //reduce
      }
      //update tick counter, second press
      if (self.intIntroTickSecond < 0) {
         self.intIntroTickSecond = Math.random() * intMax + intMin; //new random number
         self.enmIntroMoveSecond = self.randomStep(2); //possibly change direction
      } else {
         self.intIntroTickSecond--; //reduce
      }
      //key press simulation, first key
      if(self.enmIntroMoveFirst === "up")
         self.pressedUp();
      else if(self.enmIntroMoveFirst === "down")
         self.pressedDown();
      else if(self.enmIntroMoveFirst === "left")
         self.pressedLeft();
      else if(self.enmIntroMoveFirst === "right")
         self.pressedRight();
      //key press simulation, second key
      if(self.enmIntroMoveSecond === "up")
         self.pressedUp();
      else if(self.enmIntroMoveSecond === "down")
         self.pressedDown();
      else if(self.enmIntroMoveSecond === "left")
         self.pressedLeft();
      else if(self.enmIntroMoveSecond === "right")
         self.pressedRight();
   } //end of runIntro method
   //
   self.randomStep = function(_step) {
      var alphaStep, checkAlpha, checkRnd, rnd, enmSelection;
      //
      if (_step === 1) {
         alphaStep = self.enmIntroMoveSecond;
      } else { //_step = 2
         alphaStep = self.enmIntroMoveFirst;
      }
      //setup controls
      if (alphaStep === "none") {
         checkAlpha = "n";
      } else if (alphaStep === "up" || alphaStep === "down") {
         checkAlpha = "y"; //opposing control
      } else if (alphaStep === "left" || alphaStep === "right") {
         checkAlpha = "x"; //opposing control
      }
      //new direction
      do {
         rnd = Math.random() * 100 / 5; //random number from 0 to 5
         if (rnd < 1) {
            enmSelection = "none";
            checkRnd = "n";
         } else if (rnd < 2) {
            enmSelection = "up";
            checkRnd = "y"; //opposing control
         } else if (rnd < 3) {
            enmSelection = "down";
            checkRnd = "y"; //opposing control
         } else if (rnd < 4) {
            enmSelection = "left";
            checkRnd = "x"; //opposing control
         } else {
            enmSelection = "right";
            checkRnd = "x"; //opposing control
         }
      } while (checkAlpha === checkRnd); //repeat above if opposing controls are equal, meaning the direction was the same or opposing
      //once a mismatch is detected, the program continues
      return enmSelection; //return player variable step
   } //end of randomStep
   //
   self.runIntro_post  = function() {
      var bolScreenLocked = false; //control variable, assume false
      var x = 0; //new directions required
      var y = 0; //default no change
      //check if x coordinates are locked on the map
      if (gol_objPlayer.getLeftBorderLock() === true) { 
         bolScreenLocked = true;
         x = 1; //must be pressing left, reverse to right
      } else if (gol_objPlayer.getRightBorderLock() === true) {
         bolScreenLocked = true;
         x = -1; //must be pressing right, reverse to left
      }
      //check if y coordinates are locked on the map
      if (gol_objPlayer.getTopBorderLock() === true) { 
         bolScreenLocked = true;
         y = -1; //must be pressing up, reverse down
      } else if (gol_objPlayer.getBottomBorderLock() === true) {
         bolScreenLocked = true;
         y = 1; //must be pressing down, revers up
      }
      //
      if (bolScreenLocked === true) {
         //clear key inputs
         self.enmIntroMoveFirst = "none";
         self.enmIntroMoveSecond = "none";
         //rewright direction
         if (x === -1) { //left (+) or right (-)
            self.enmIntroMoveFirst = "left";
         } else if (x === 1) {
            self.enmIntroMoveFirst = "right";
         }
         if (y === -1) { //down (+) or up (-)
            self.enmIntroMoveFirst = "down";
         } else if (y === 1) {
            self.enmIntroMoveFirst = "up";
         }
      }
      //
      self.intMaxMoveSpd = self.intMaxMoveSpdDefault; //reset player speed for play
   }
   //
   self.getCredits = function() {
      return self.intCredits;
   }
   //when ever money increases, score increases
   self.increaseCredits = function(value) {
      self.intCredits += value; //increase by value
      self.intScore += value;
   }
   //
   self.decreaseCredits = function(value) {
      self.intCredits -= value; //reduce by value
   }
   //
   self.getScore = function() {
      return self.intScore;
   }
   //
   self.increaseKillCount = function() {
      self.intKills++;
   }
   //
   self.getKillCount = function() {
      return self.intKills;
   }
   //cheat increase money
   self.adminBoostCredits = function() {
      self.intCredits += 10000; //cheat, no score
   }
   //
   self.getInvincible = function() {
      return self.bolInvincible;
   }
   //
   self.setInvincible = function(_boolean) {
      if (_boolean === undefined)
         _boolean = false;
      self.bolInvincible = _boolean;
   }
   //
   self.addInventoryFavorite = function(_keyId) {
      //check if _keyId exists
      self.arr_idInventoryFavorites.push(_keyId);
   }
   //
   self.getInventoryFavorites = function() {
      if (self.arr_idInventoryFavorites.length == 0)
         return false;
      //else
      return self.arr_idInventoryFavorites;
   }
   //
   self.resetInventoryFavorites = function() {
      self.arr_idInventoryFavorites.length = 0; //empty array
   }
   //player command to add new places to travel to
   self.addNewLocation = function(_keyId) {
      self.objNavigation.addLocation(_keyId);
   }
   //array of places player knows of
   self.getLocationsKnown = function() {
      return self.objNavigation.getLocations();
   }
   //
   self.getTravelDestination = function() {
      return self.idTravelDestination;
   }
   //
   self.setTravelDestination = function(_id) {
      if (_id === undefined)
         _id = false;
      self.idTravelDestination = _id;
   }
   //
   self.addNewFavoriteLocation = function(_keyId) {
      self.arr_idNavigationFavorites.push(_keyId); //add to player control array
   }
   //
   self.getNavigationFavorites = function() {
      return self.arr_idNavigationFavorites;
   }
   //
   self.clearDockable = function() {
      self.arr_idDockableInRange.length = 0; //reset all dockable locations to the player
   }
   //update equipment
   self.funEquipAttachment = function(_equipSlot,_ownedAttachment) {
      var objNewAttachment = _ownedAttachment;
      if (_equipSlot === undefined) 
         _equipSlot = 1; //first slot
      //
      if (_equipSlot == 1) {
         self.objEquip1 = objNewAttachment;
      } else if (_equipSlot == 2) {
         self.objEquip2 = objNewAttachment;
      } else if (_equipSlot == 3) {
         self.objEquip3 = objNewAttachment;
      }
      self.objInventory.removeItem(objNewAttachment.getItemId(),1); //wearing the attachment removes it from inventory
   }
   //return object
   self.getEquiped = function(_slot) {
      var place = _slot;
      if (_slot === undefined) {
         place = 1;
      }
      //return item being held
      if (place === 1) return self.objEquip1;
      if (place === 2) return self.objEquip2;
      if (place === 3) return self.objEquip3;
   }
   //
   /*PLACE HOLDER 
   Mouse tracking attacks:
      things fired will move towards the mouse from the player
      once passed the mouse they go forward until collision or border (no timer),
      add variation, speed, fuel, momentum, click-to-lock*/
   //
   self.refreshGUI = function() {
      self.objNavigation.refreshRender(); //refresh navigation view, including modal box (if open)
      self.objInventory.refreshRender() //refresh inventory view, including modal box (if open)
   }
   //
   self.lockBottomBorder = function(_boolean) {
      if (_boolean === undefined)
         _boolean = true; //default true
      self.bolLockDown = _boolean;
   }
   //
   self.lockTopBorder = function(_boolean) {
      if (_boolean === undefined)
         _boolean = true; //default true
      self.bolLockUp = _boolean;
   }
   //
   self.lockLeftBorder = function(_boolean) {
      if (_boolean === undefined)
         _boolean = true; //default true
      self.bolLockLeft = _boolean;
   }
   //
   self.lockRightBorder = function(_boolean) {
      if (_boolean === undefined)
         _boolean = true; //default true
      self.bolLockRight = _boolean;
   }
   //
   self.getBottomBorderLock = function() {
      return self.bolLockDown;
   }
   //
   self.getTopBorderLock = function() {
      return self.bolLockUp;
   }
   //
   self.getLeftBorderLock = function() {
      return self.bolLockLeft;
   }
   //
   self.getRightBorderLock = function() {
      return self.bolLockRight;
   }
   //
   var funSuperUpdatePosition = self.updatePosition;
   self.updatePosition = function() { 
      funSuperUpdatePosition();
      //Dash speed boost
      if (self.getKeyDown() && self.pressingShift) self.intY += 15;
      if (self.getKeyUp() && self.pressingShift) self.intX += 15;
      if (self.getKeyLeft() && self.pressingShift) self.intX -= 15;
      if (self.getKeyRight() && self.pressingShift) self.intY -= 15;
   }
   //player die
   var funSuperDeath = self.onDeath;
   self.onDeath = function() {
      funSuperDeath();
      console.log("Player died.")
      printEndGame();
      clsGame.startNewGame(); //begin new game
   }
   //set all to off because of user interface
   self.resetControls = function() {
      self.releaseDown();
      self.releaseUp();
      self.releaseLeft();
      self.releaseRight();
      self.pressingMouseLeft = false;
      self.pressingMouseMiddle = false;
      self.pressingMouseRight = false;
      self.pressingSpaceBar = false;
   }
   //
   return self;
} //end of player constructor

//vessel constructor
clsVessel = function(_id,_allegiance,_img,_location,_x,_y,_width,_height,_pattern,_spdX,_spdY,_hp,_drops,_attachments,_atkSpd,_targetLock,_mod) {
   //declare variables
   if (_hp === undefined) _hp = 10; //base vessel health   
   if (_atkSpd === undefined) _atkSpd = 0; //no attack bonus
   if (_mod === undefined) _mod = {}; //empty object
   //setup object
   var self = clsActor(_allegiance,_id,_location,_x,_y,_width,_height,_img,_hp,_atkSpd,_mod);
   self.enmPattern = _pattern;
   if (_pattern === undefined) self.enmPattern = "Stationary"; //no movement or animation
   self.intSpeedX = _spdX;
   if (_spdX === undefined) self.intSpeedX = 0; //no movement
   self.intSpeedY = _spdY;
   if (_spdY === undefined) self.intSpeedY = 0; //no movement
   self.arrDrops = _drops;
   if (_drops === undefined) self.arrDrops = []; //empty array
   self.objAttachments = _attachments;
   if (_attachments === undefined) self.objAttachments = {}; //empty object
   self.objTargetLock = _targetLock;
   if (_targetLock === undefined) self.objTargetLock = false; //empty object
   //track movement, only for default
   self.intAxisX = 1; //x direction movement, positive is right, negative is left
   if (self.intSpeedX < 0) self.intAxisX = -self.intAxisX;
   self.intAxisY = 1; //y direction movement, positive is donw, negative is up
   if (self.intSpeedY < 0) self.intAxisY = -self.intAxisY;
   //control variable
   self.arr_objDockable = false; //other dockable vessels in range
   self.bolToRemove = false; //entity dies 
   //additional updates for vessel
   var funSuperUpdate = self.update;
   self.update = function() {
      if (self.onCurrentMap()) { //run if on map
         funSuperUpdate();
         self.targetCheck(); //determine if new target is needed
         self.updateAim(); //look at target
         self.updateKeyPress(); //move vessel
         self.performAttacks();
         self.playerDockHere();
         if (self.enmImgMode === "spriteSheet") //draw sprite animation
            self.addSpriteAnimCount();
      } //else, not on same map as player, what to do?
      /*do anything here? if so, then the object continues acting while player is not present*/
   } //end of additional updates
   //check if new target needed
   self.targetCheck = function() {
      if (self.objTargetLock === false) {
         self.objTargetLock = self.acquireTarget(); //attemt new lock
         if (self.objTargetLock === false) {
            return
         } //else target returned
         self.objTargetLock.occuredLock(self) //target knows its locked on
      }
      //control variable for when order issuesd to lock on to new target
      //or command for specific target
   } //end of targetCheck
   //vessel aim at target
   self.updateAim = function() {
      //how to multi-target?
      if (self.objTargetLock === false) {
         self.intAimAngle = false; //should throw error if used without a target lock
         return; //stop function
      }
      var diffX = self.objTargetLock.getXPosition() - self.getXPosition(); 
      var diffY = self.objTargetLock.getYPosition() - self.getYPosition();
      //MOVED TO clsActor - self.aimAngle = Math.atan2(diffY,diffX) / Math.PI * 180;
      self.setAimAngle(diffY, diffX);
   }
   //vessel movement
   self.updateKeyPress = function() { //for AI
      var keyRight, keyLeft, keyDown, keyUp; //keys to determine
      if(self.enmPattern === undefined) self.enmPattern = "default";
      switch (self.enmPattern) {
         case ("default"):
            var objCurrentMap = gol_objSpaceGame.getCurrentMap();
               //check if left map        
            var diffX = self.intX - self.intWidth / 2; 
            var diffY = self.intY - self.intHeight / 2;
            var diffXend = self.intX + self.intWidth / 2; 
            var diffYend = self.intY + self.intHeight / 2;
               //touching border
            //MOVED TO clsGame - if(diffX === 0 || diffXend === currentMap.width) 
            if(diffX === 0 || diffXend === objCurrentMap.getWidth()) 
               self.intAxisX = -self.intAxisX; //reverse the direction of motion
            //MOVED TO clsGame - if(diffY === 0 || diffYend === currentMap.height)
            if(diffY === 0 || diffYend === objCurrentMap.getHeight())
               self.intAxisY = - self.intAxisY; //reverse the direction of motion
               //determin key presses
            keyRight = self.intAxisX > 0; //if player to the right, move to the right
            keyLeft = self.intAxisX < 0;
            keyDown = self.intAxisY > 0;
            keyUp = self.intAxisY < 0;
            break;
         case ("follow"):
               //calculate movement towards player
            var diffX = gol_objPlayer.getXPosition() - self.intX; // + gol_objPlayer.getWidth() + self.getWidth()
            var diffY = gol_objPlayer.getYPosition() - self.intY; // + gol_objPlayer.getHeight() + self.getHeight()
            //test distance to player
            keyRight = diffX > self.intMaxMoveSpd / 2 + gol_objPlayer.getWidth() + self.getWidth();
            keyLeft = diffX < -self.intMaxMoveSpd / 2 - gol_objPlayer.getWidth() - self.getWidth();
            keyDown = diffY > self.intMaxMoveSpd / 2 + gol_objPlayer.getHeight() + self.getHeight();
            keyUp = diffY < -self.intMaxMoveSpd / 2 - gol_objPlayer.getHeight() - self.getHeight();
            //pass direction of motion
            self.intAxisX = 0; //default, no movement
            self.intAxisY = 0; //default, no movement
            if (keyRight) Math.abs(self.intAxisX); //positive
            if (keyLeft) Math.abs(self.intAxisX) * -1; //negative
            if (keyDown) Math.abs(self.intAxisY);
            if (keyUp) Math.abs(self.intAxisY) * -1;
            break;
         case ("stationary"):
            //spin in place?
            keyRight = false;
            keyLeft = false;
            keyDown = false;
            keyUp = false;
            break;
         case ("objective"):
            //needs a goal target
            break;
         case ("circular"):
            //around in circles
            break;
         case ("target"):
            //move after target, use follow above
            //self.targetLock;
            break;
      } //end of vessel movement, updateKeyPress
      //
      if (keyDown) { self.pressedDown(); } 
         else { self.releaseDown(); }
      //
      if (keyUp) { self.pressedUp(); }
         else { self.releaseUp(); }
      //
      if (keyLeft) { self.pressedLeft(); }
         else { self.releaseLeft(); }
      //
      if (keyRight) { self.pressedRight(); }
         else { self.releaseRight(); }
   }
   //
   self.performAttacks = function() {
      if (self.objTargetLock !== false) {
         for(var key in self.objAttachments) {
            self.objAttachments[key].performAttack();
         }
      }
   } //end of performAttacks function
   //check if this vessle can dock the players
   self.playerDockHere = function() {
      var bolColliding = self.testCollision(gol_objPlayer); //test if touching player
      if (self.arr_objDockable === false || bolColliding !== true) //is vessle dockable or not touching the player
         return; //end function
         gol_objPlayer.arr_idDockableInRange.push(self); //otherwise, add to player choices to dock at
   }
   //draw hp bar
   var super_draw = self.draw;
   self.draw = function() {
      super_draw();
      gol_objContext.save();
      //
      var x = self.getCanvasX();// + self.getWidth() / 2;
      var y = self.getHeight() / 2;
      y = (y > 25 ? 25 : y); //limite offset
      y = self.getCanvasY() - y;
      var width = self.getWidth() * self.getHp() / self.getMaxHp();
      if (width <0)
         width = 0;
      //
      gol_objContext.fillStyle = "red";
      gol_objContext.fillRect(x, y, width, 10);
      gol_objContext.strokeStyle = "black";
      gol_objContext.strokeRect(x, y, self.getWidth(), 10);
      gol_objContext.restore();
   }
   //return boolean
   self.getRemoving = function() {
      return self.bolToRemove;
   }
   //vessel destroyed
   var funSuperDeath = self.onDeath;
   self.onDeath = function() {
      funSuperDeath();
      self.bolToRemove = true;
      if (self.getFightingSide() != "ally") gol_objPlayer.increaseKillCount(); //not an ally, increase kill count
   }
   //error catching: console.log(self);
   clsVessel.list[self.intId] = self; //local variable set to global variable
   //
   return self;
} //end of vessel constructor

//declare vessel entities
clsVessel.list = {};

//vessel iteration
clsVessel.update = function() {
   //iterate all vessels
   for (var key in clsVessel.list) {
      clsVessel.list[key].update(); //run entity
   }
   //iterate all vessels for any that died
   for (var key in clsVessel.list) {
     if (clsVessel.list[key].getRemoving()) {
         delete clsVessel.list[key];
      }
   }
} //end of vessel update function

//initialize a random enemy
clsVessel.randomlyGenerateEnemy = function(_location) {
   var objCurrentMap = gol_objSpaceGame.getCurrentMap();
   var location = objCurrentMap.getId();
   if (_location !== undefined) {
      location = _location; //override
   }
   var allegiance = "enemy";
   //random properties
   var x = Math.random() * objCurrentMap.getWidth();
   var y = Math.random() * objCurrentMap.getHeight();
   var multiplier = Math.random() * 25; //between zero and 25
   var height = 40 + multiplier; //between 40 and 65
   var width = 40 + multiplier; //between 40 and 65
   var id = gol_objSpaceGame.getNextId();
   var intSpeedX = 3 + Math.random() * 5;
   var intSpeedY = 3 + Math.random() * 5;
   var objAttachments = {}; //empty object
   var arrDrops = []; //empty array
   //var arr_objDockable = false; //can vessels dock here
   //random weapon
   var rnd = Math.round(Math.random() * 100); //hole number
   switch (true) {
      case (rnd >= 0 && rnd <= 59): //60%
         objAttachments = {0:clsWeapon.createWeapon("starting_gun")};
         break;
      case (rnd >= 60 && rnd <= 89): //30%
         objAttachments = {0:clsWeapon.createWeapon("starting_shotgun")};
         break;
      case (rnd >= 90 && rnd <= 100): //10%
         objAttachments = {0:clsWeapon.createWeapon("auto_gun")};
         break;
   }
   //random enemy
   rnd = Math.random() * 100;
   var self; //error catching:
   switch (true) {
      case (rnd >= 0 && rnd <= 16): //16% - Shadow
         var enmPattern = "follow";
         intSpeedX -= 2;
         intSpeedY -= 2;
         var hp = 3;
         var atkSpd = 2;
         self = clsVessel(id,allegiance,Img.shadow_enemy,location,x,y,width,height,enmPattern,intSpeedX,intSpeedY,hp,arrDrops,objAttachments,atkSpd,false);
         break;
      case (rnd >= 17 && rnd <= 49): //34% - Triangle
         width += 25;
         height += 25;
         var enmPattern = "default";
         var hp = 10;
         self = clsVessel(id,allegiance,Img.tri_enemy,location,x,y,width,height,enmPattern,intSpeedX,intSpeedY,hp,arrDrops,objAttachments);
         break;
      case (rnd >= 50 && rnd <= 100): //50% - Round
         var enmPattern = "default";
         var hp = 6;
         self = clsVessel(id,allegiance,Img.round_enemy,location,x,y,width,height,enmPattern,intSpeedX,intSpeedY,hp,arrDrops,objAttachments);
         break;
   }
   return self;
   //error catching:console.log("random enemy spawned: ");
   //error catching:console.log(self)
}

//Natural objet constructor
clsNatural = function(_id,_type,_location,_x,_y,_spdX,_spdY,_size,_hardness) {
   //size will determine width and height
   var intWidth = 25 * _size;
   var intHeight = 25 * _size;
   var objImg = Img.asteroide; //place holder for now
   var self = clsEntity(_type,_id,_location,_x,_y,intWidth,intHeight,objImg);
    //control variables
   self.intSize = _size;
   self.hardness = _hardness; //hp
   self.bolToRemove = false;
   self.intSpeedX = _spdX;
   if (_spdX === undefined) self.intSpeedX = 0; //no movement
   self.intSpeedY = _spdY;
   if (_spdY === undefined) self.intSpeedY = 0; //no movement
      //procedures
   //inject code on update function
   var funSuperUpdate = self.update;
   self.update = function() {
      funSuperUpdate();
      //if natural feature left the map
      var objCurrentMap = gol_objSpaceGame.getCurrentMap();
      var width = self.getWidth() / 2; //half width
      var height = self.getHeight() / 2; //half height
      if (self.getXPosition() < -width || self.getXPosition() > objCurrentMap.getWidth() + width) //test Out of Bounds
         self.bolToRemove = true; 
      if (self.getYPosition() < -height || self.getYPosition() > objCurrentMap.getHeight() + height) //test Out of Bounds
         self.bolToRemove = true; 
      if (self.hardness <= 0) self.onDeath(); //break apart

   }
   //move natural object
   self.updatePosition = function() {
      //move object
      self.intX += self.intSpeedX;
      self.intY += self.intSpeedY;
   }
   //
   self.getRemoving = function() {
      return self.bolToRemove;
   }
   //polymorph natural feature destroyed by damage
   self.onDeath = function() {
      self.bolToRemove = true; //control variable
      clsPickup.generateDustParticles(self.idLocation,self.intX, self.intY); //drop dust
      var newSize = self.intSize - 1; //reduce size
      if (newSize === 0) return; //do no proceed
      var newType = self.getFightingSide(); //type
      //declare variables
      var fstPieceX, fstPieceY, fstPieceSpdX, fstPieceSpdY;
      var sndPieceX, sndPieceY, sndPieceSpdX, sndPieceSpdY;
      //momentum X
      fstPieceX = self.intX;
      sndPieceX = self.intX;
      fstPieceSpdX = self.intSpeedX * 0.5 - Math.random(); //tilt up
      sndPieceSpdX = self.intSpeedX * 0.5 - Math.random(); //tilt down
      //momentum Y
      fstPieceY = self.intY;
      sndPieceY = self.intY;
      fstPieceSpdY = self.intSpeedY * 0.5 - Math.random(); //tilt up
      sndPieceSpdY = self.intSpeedY * 0.5 - Math.random(); //tilt down
      //create smaller asteroids
      clsNatural.generateNatural(newType, self.idLocation, fstPieceX, fstPieceY, fstPieceSpdX, fstPieceSpdY, newSize);
      clsNatural.generateNatural(newType, self.idLocation, sndPieceX, sndPieceY, sndPieceSpdX, sndPieceSpdY, newSize);
   } 

   //error checking console.log(self);
   clsNatural.list[self.getId()] = self; //local variable set to global variable
} //end of Natural objet constructor

//natural entities
clsNatural.list = {};

//natural iteration
clsNatural.update = function() {
   //iterate all natural features
   for (var key in clsNatural.list) {
      //move natural feature
      clsNatural.list[key].update();
   }
   //iterate all natural features for any that died
   for (var key in clsNatural.list) {
     if (clsNatural.list[key].getRemoving()) {
         delete clsNatural.list[key];
      }
   }
} //end of natural update function

clsNatural.randomlyGenerateNatural = function(_location) {
   var objCurrentMap = gol_objSpaceGame.getCurrentMap();
   var id = gol_objSpaceGame.getNextId();
   var type = "astroide";
   var location = objCurrentMap.getId();
   if (_location !== undefined) 
      location =_location; //override
   //prepare coordinates
   var intWall =  Math.round(Math.random()); //0 or 1
   var intLanding = Math.random() * 0.5 + 0.25; //0.25 to 0.75%
   //random choose x and y positions
   var xPosition = Math.round(Math.random()); //0 or 1;
   var yPosition = 0; //default
   if (xPosition === 1) { //come in on X line
      xPosition = intWall * objCurrentMap.getWidth(); //0 left, 1 right
      yPosition = intLanding * objCurrentMap.getHeight();
   } else { //come in on Y line
      yPosition = intWall * objCurrentMap.getHeight(); //0 top, 1 bottom
      xPosition = intLanding * objCurrentMap.getWidth();
   }
   var intSpeedX = Math.ceil(Math.random() * 8 + 0.5); //1.5 to 8.5
   if (xPosition === objCurrentMap.getWidth()) 
      intSpeedX *= -1; //invert direction if at edge
   var intSpeedY = Math.ceil(Math.random() * 8 + 0.5); //1.5 to 8.5
   if (yPosition === objCurrentMap.getHeight()) 
      intSpeedY *= -1; //invert direction if at edge
   //
   var intSize = Math.ceil(Math.random() *  5 + 1 ); //2 to 6
   var hardness = clsNatural.calculateHardness(intSize);
   clsNatural(id,type,location,xPosition,yPosition,intSpeedX,intSpeedY,intSize,hardness); //generate new asteroid

} //end of clsNatural.randomlyGenerateNatural

clsNatural.generateNatural = function(_type,_location,_x,_y,_spdX,_spdY,_size,_hardness) {
   //MOVED TO clsGame - var id = nextId();
   var id = gol_objSpaceGame.getNextId();
   var hardness = clsNatural.calculateHardness(_size);
   if (_hardness !== undefined) //if set, override
      hardness = _hardness; 
   clsNatural(id,_type,_location,_x,_y,_spdX,_spdY,_size,hardness); //generate new asteroid
}

//return the health of the object
clsNatural.calculateHardness = function(_size) {
   var hardnessModifier = Math.ceil(Math.random() * 4); //1 to 4
   hardnessModifier *= _size;
   return hardnessModifier;
}

//Pickup constructor, prior upgrade
clsPickup = function(_id,_location,_x,_y,_width,_height,_category,img) {
   var self = clsEntity("pickup",_id,_location,_x,_y,_width,_height,img);
   self.enmCategory = _category;
   self.intDissipate = 1; //for dust, control variable
   //inject code on update function
   var funSuperUpdate = self.update;
   self.update = function() {
      funSuperUpdate();
      var bolColliding = gol_objPlayer.testCollision(self);
      if (bolColliding) { //test is colliding
         var scrap = 0;
         //increase money
         if(self.enmCategory === "score") {
            scrap = Math.ceil(Math.random() * 500) + 250; //250 - 750
            gol_objPlayer.increaseCredits(scrap);
         }
         //increase money
         if(self.enmCategory === "dust") {
            scrap = Math.ceil(Math.random() * 25) + 25; //25 - 50
            scrap = Math.ceil(scrap * self.intDissipate); //decrease value by dissipate rate
            gol_objPlayer.increaseCredits(scrap); //add timer element to dust so it disappears
         }
         //increase attack speed
         if (self.enmCategory === "atkSpd")
            gol_objPlayer.changeAtkSpd(1.5);
         //recover health
         if (self.enmCategory === "repaire") {
            gol_objPlayer.changeHp(1);
         }
         delete clsPickup.list[self.getId()]; //remove entity from the list
         return; //exit function
      }
   }
   //add to calc draw method for only dust
   if(self.enmCategory === "dust") { //dissipate
      //
      var super_calcDraw = self.calcDraw;
      self.calcDraw = function() {
         super_calcDraw();
         self.intDissipate -= 0.002; //25 ticks per sec => 5% or 1/20, meaning it will take 20 secs
         self.intWidth *= 1.01;
         self.intHeight *= 1.01;
         if (self.intDissipate <= 0)
            delete clsPickup.list[self.getId()]; //remove entity from the list
      }
   }
   //error catching: console.log(self);
   clsPickup.list[self.getId()] = self; //local variable set to global variable
}

//update entities
clsPickup.list = {};

//pickup iteration
clsPickup.update = function() {
   //iterate all upgrades
   for (var key in clsPickup.list)
   clsPickup.list[key].update();
}

//object pickup constructor
clsPickup.randomlyGenerateUpgrade = function(_location) {
   var objCurrentMap = gol_objSpaceGame.getCurrentMap();
   var location = objCurrentMap.getId();
   if (_location !== undefined) location = _location; //override
   var x = Math.random() * objCurrentMap.getWidth();
   var y = Math.random() * objCurrentMap.getHeight();
   var height = 32;
   var width = 32;
   var id = gol_objSpaceGame.getNextId();
   var rnd = Math.floor(Math.random() * 100);
   switch (true) {
      case (rnd >= 0 && rnd <= 33): //33%
         var enmCategory = "score";
         var img = Img.upgrade1;
         break;
      case (rnd >= 34 && rnd <= 66): //33%
         var enmCategory = "atkSpd";
         var img = Img.upgrade2;
         break;
      case (rnd >= 67 && rnd <= 100): //34%
         var enmCategory = "repaire";
         var img = Img.upgrade3;
         break;
      }
   //error catching: console.log("random pickup spawned: ");
   clsPickup(id,location,x,y,width,height,enmCategory,img); //create Pickup
} //end of pickup constructor

//initialize dust particles
clsPickup.generateDustParticles = function(_location,_x,_y) {
   var x = _x;
   var y = _y;
   var height = 15;
   var width = 15;
   var id = gol_objSpaceGame.getNextId();
   var enmCategory = "dust";
   var img = Img.dust_low;
   //
   //error catching: console.log("dust dropped: ");
   clsPickup(id,_location,x,y,width,height,enmCategory,img); //create Pickup
}