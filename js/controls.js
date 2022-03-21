/*MOUSE CONTROLS*/
//user clicked down mouse
document.onmousedown = function(mouse) {
   switch (mouse.which) {
      case 1: 
         gol_objPlayer.pressingMouseLeft = true; 
         break;
      case 2: 
         gol_objPlayer.pressingMouseMiddle = true; 
         break;
      case 3: 
         gol_objPlayer.pressingMouseRight = true;
         break; 
   }
} //end of onmousedown event

//user clicked up mouse
document.onmouseup = function(mouse) {
   switch (mouse.which) {
   case 1: 
      gol_objPlayer.pressingMouseLeft = false; 
      break;
   case 2: 
      gol_objPlayer.pressingMouseMiddle = false; 
      break;
   case 3: 
      gol_objPlayer.pressingMouseRight = false;
      break; 
   }
} //end of onmouseup event

//stop right clicking on canvas for user input
gol_objCanvas.oncontextmenu = function(mouse) {
   mouse.preventDefault(); //prevent context menu from appering
}

//control for right-click
window.oncontextmenu = function(mouse) {
   if (!gol_objSpaceGame.getRightclickEnable()) //check if right click disabled
   mouse.preventDefault(); //prevent context menu from appering
}

//user moves mouse, calculate angle
document.onmousemove = function(mouse) {
   var mouseX = mouse.clientX - gol_objCanvas.getBoundingClientRect().left; 
   var mouseY = mouse.clientY - gol_objCanvas.getBoundingClientRect().top;
   //center on player position
   var intComputeX = mouseX - gol_objPlayer.getCanvasX();
   var intComputeY = mouseY - gol_objPlayer.getCanvasY();
   // 
   gol_objPlayer.setAimAngle(intComputeY, intComputeX);
}

/*KEYBOARD CONTROLS*/
//user pressed key
document.onkeydown = function(event) {
   //Keycode Website: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
   //setup for asdw
   if(event.keyCode === 83)               //s
      gol_objPlayer.pressedDown();
   else if(event.keyCode === 87)          //w
      gol_objPlayer.pressedUp();
   else if(event.keyCode === 65)          //a
      gol_objPlayer.pressedLeft();
   else if(event.keyCode === 68)          //d
      gol_objPlayer.pressedRight();
   else if(event.keyCode === 32)          //spacebar
      gol_objPlayer.pressingSpaceBar = true;
   else if(event.keyCode === 16)          //shift
      gol_objPlayer.pressingShift = true;
   else if(event.keyCode === 80 || event.keyCode === 19 || event.keyCode === 27) {    //p or pause/break or escape
      //do not run code if player modal is open
      if (playerModal.style.display === "block") {
         if (event.keyCode === 27)       //escape
            Modalbox.closeModal(); //close modal
         else
            return; //cancel command
      } else { //run code
         var bolPaused = gol_objSpaceGame.getGamePaused();
         gol_objSpaceGame.setGamePaused(!bolPaused); //toggle pause command
      }
   }
   if (event.keyCode === 27) {     //escape
      //do not run code if player modal is closed
      if (playerModal.style.display === "none") return;
      //run code
      //cancel modal screen
      Modalbox.closeModal();
   }
   //any key triggers below
   var bolPlayerReady = gol_objSpaceGame.getGameReady();
   if (!bolPlayerReady) { //new game pre
      gol_objSpaceGame.setGameReady(true);  //new game start
   }
} //end of onkeydown event

//user release key
document.onkeyup = function(event) {
   //setup for asdw
   if(event.keyCode === 83)         //s
      gol_objPlayer.releaseDown();
   else if(event.keyCode === 87)    //w
      gol_objPlayer.releaseUp();
   else if(event.keyCode === 65)    //a
      gol_objPlayer.releaseLeft()
   else if(event.keyCode === 68)    //d
      gol_objPlayer.releaseRight();
   else if(event.keyCode === 32)    //spacebar
      gol_objPlayer.pressingSpaceBar = false;
   else if(event.keyCode === 16)    //shift
      gol_objPlayer.pressingShift = false;
} //end of onkeyup event
