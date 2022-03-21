//load images to memory
var filePath = "../resources/"; //global path
var Img = {};  //new object to hold images

/*INTERFACE ASSETS*/
Img.interface_ship = new Image(); Img.interface_ship.src = filePath + "interface/rocket-solid.svg";
Img.interface_base = new Image(); Img.interface_base.src = filePath + "interface/industry-solid.svg";
Img.interface_fleet = new Image(); Img.interface_fleet.src = filePath + "interface/chess-solid.svg";
Img.interface_intro = new Image(); Img.interface_intro.src = filePath + "interface/book-solid.svg";
Img.mission_log = new Image(); Img.mission_log.src = filePath + "interface/clipboard-check-solid.svg";
Img.interface_notes = new Image(); Img.interface_notes.src = filePath + "interface/clipboard-regular.svg";
Img.interface_setting = new Image(); Img.interface_setting.src = filePath + "interface/sliders-h-solid.svg";
Img.expand = new Image(); Img.expand.src = filePath + "interface/plus-square-regular.svg"; 
Img.collapes = new Image(); Img.collapes.src = filePath + "interface/minus-square-regular.svg";
Img.jump_down = new Image(); Img.jump_down.src = filePath + "interface/angle-double-down-solid.svg"; 
Img.jump_up = new Image(); Img.jump_up.src = filePath + "interface/angle-double-up-solid.svg";
Img.minimize = new Image(); Img.minimize.src = filePath + "interface/window-minimize.svg";
Img.pin = new Image(); Img.pin.src = filePath + "interface/thumbtack-solid.svg";
Img.pinned = new Image(); Img.pinned.src = filePath + "interface/circle-solid.svg";
Img.projectile = new Image(); Img.projectile.src = filePath + "interface/quidditch-solid.svg";
Img.special = new Image(); Img.special.src = filePath + "interface/asterisk-solid.svg";
/*GAME ASSETS*/
Img.player = new Image();
Img.player.src = filePath + "player.png";
Img.player.mode = "topDown";
/*******/
Img.asteroide = new Image();
Img.asteroide.src = filePath + "asteroide.png";
/*******/
Img.round_enemy = new Image();
Img.round_enemy.src = filePath + "enemy1.png";
Img.round_enemy.mode = "topDown";
/*******/
Img.shadow_enemy = new Image();
Img.shadow_enemy.src = filePath + "enemy2.png";
Img.shadow_enemy.mode = "topDown";
/*******/
Img.tri_enemy = new Image();
Img.tri_enemy.src = filePath + "enemy3.png";
Img.tri_enemy.mode = "topDown";
/*******/
Img.bullet = new Image();
Img.bullet.src = filePath + "bullet.png";
Img.bullet.mode = "topDown";
/*******/
Img.upgrade1 = new Image();
Img.upgrade1.src = filePath + "score.png";
Img.upgrade1.mode = "topDown";
/*******/
Img.upgrade2 = new Image();
Img.upgrade2.src = filePath + "upgrade.png";
Img.upgrade2.mode = "topDown";
/*******/
Img.upgrade3 = new Image();
Img.upgrade3.src = filePath + "repaire.png";
Img.upgrade3.mode = "topDown";
/*******/
Img.dust_low = new Image();
Img.dust_low.src = filePath + "dust_low.png";
/*******/
Img.drill = new Image();
Img.drill.src = filePath + "drill.gif";
Img.upgrade3.mode = "topDown";
/*******/
{ //terra sprite
Img.terra = new Image(); //declare image object
Img.terra.src = "../resources/spritesheet/terra.png"; //load spritesheet into memory
Img.terra.mode = "spriteSheet"; //control variable, undeclared is false
Img.terra.divideWidth = 15; //441px
Img.terra.divideHeight = 27; //408px, normal size sprits are 2 parts, large size sprits are 3 parts
Img.terra.partsWidth = 1; Img.terra.partsHeight = 2;
Img.terra.partsWidthFace = 2; Img.terra.partsHeightFace = 3;
Img.terra.partsWidthLarge = 2; Img.terra.partsHeightLarge = 3; //Chocobo and Magiteck sprites
   Img.terra.frontFace = {x:0,y:3,}; Img.terra.frontFaceLeft = {x:0,y:7,}; Img.terra.frontFaceRight = {x:0,y:5,};
   Img.terra.backFace = {x:1,y:3,}; Img.terra.backFaceLeft = {x:1,y:7,}; Img.terra.backFaceRight = {x:1,y:5,};
   Img.terra.leftFace = {x:2,y:3,}; Img.terra.leftFaceLeft = {x:2,y:7,}; Img.terra.leftFaceRight = {x:2,y:5,};
   Img.terra.rightFace = {x:3,y:3,}; Img.terra.rightFaceLeft = {x:3,y:7,}; Img.terra.rightFaceRight = {x:3,y:5,};
}
/*******/
{ //cecil sprite
   Img.cecil = new Image();
   Img.cecil.src =  filePath + "spritesheet/cecil.png";
   Img.cecil.mode = "spriteSheet";
   Img.cecil.divideWidth = 19; //480px
   Img.cecil.divideHeight = 5; //168px
   Img.cecil.partsWidth = 1;
   Img.cecil.partsHeight = 1;
   Img.cecil.partsWidthFace = 2;
   Img.cecil.partsHeightFace = 1;
      Img.cecil.frontFace = {x:0,y:0}; Img.cecil.frontFaceLeft = {x:0,y:2}; Img.cecil.frontFaceRight = {x:0,y:1};
      Img.cecil.backFace = {x:1,y:0}; Img.cecil.backFaceLeft = {x:1,y:2}; Img.cecil.backFaceRight = {x:1,y:1};
      Img.cecil.leftFace = {x:2,y:0}; Img.cecil.leftFaceLeft = {x:2,y:2}; Img.cecil.leftFaceRight = {x:2,y:1};
      Img.cecil.rightFace = {x:3,y:0}; Img.cecil.rightFaceLeft = {x:3,y:2}; Img.cecil.rightFaceRight = {x:3,y:1};
}
/*******/
Img.station_first = new Image();
Img.station_first.src = filePath + "station1.png";
Img.station_first.mode = "none";
/*******/
Img.station_second = new Image();
Img.station_second.src = filePath + "station2.png";
Img.station_second.mode = "none";
/*******/
Img.station_third = new Image();
Img.station_third.src = filePath + "station3.png";
Img.station_third.mode = "none";
/*******/
Img.earth_station = new Image();
Img.earth_station.src = filePath + "international.png";
Img.earth_station.mode = "none";
/*******
{ //intro map
   Img.map_intro = new Image();
   Img.map_intro.src =  filePath + "intro.png";
   Img.map_intro.mode = "none";
   Img.map_intro.width = 1280;    //true width 1280
   Img.map_intro.height = 1279;   //true height 1279
   Img.map_intro.drawModWidth = 1;
   Img.map_intro.drawModHeight = 1;
} */
/*******/
{ //intro map
   Img.map_intro = new Image();
   Img.map_intro.src =  filePath + "intro.png";
   Img.map_intro.mode = "none";
   Img.map_intro.width = 1280;    //true width 1280
   Img.map_intro.height = 1279;   //true height 1279
   Img.map_intro.drawModWidth = 1;
   Img.map_intro.drawModHeight = 1;
}
/*******/
{ //main map
   Img.map_main = new Image();
   Img.map_main.src =  filePath + "splash.png";
   Img.map_main.mode = "none";
   Img.map_main.width = 960;    //true width 1920
   Img.map_main.height = 600;   //true height 1200
   Img.map_main.drawModWidth = 0.5;
   Img.map_main.drawModHeight = 0.5;
}
/*******/
{ //earth map
   Img.map_earth = new Image();
   Img.map_earth.src =  filePath + "earth.png";
   Img.map_earth.mode = "none";
   Img.map_earth.width = 1600;    //true 800
   Img.map_earth.height = 640;   //true 320
   Img.map_earth.drawModWidth = 2;
   Img.map_earth.drawModHeight = 2;
}



/*

*/