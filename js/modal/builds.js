//build user selection interface with a list of attachment options
Modalbox.funAttachmentsSelectPopulate = function(_dataObject) {
   var objSelector = document.createElement("select"); //declare DOM object
   objSelector.classList.add("modal-sel");
   if (_dataObject.hasOwnProperty("id")) //id include to print
      objSelector.id = _dataObject.id;
   objSelector.addEventListener("change", Modalbox.attachmentsValidate); 
   var equippedId = _dataObject
   var equippedId = _dataObject.value;

   //the below loop could be used on other constructors
   /////
   for (var key in gol_objPlayer.objAttachments) { //loop every item in array
      //add option to selection tag
      var elementOption = document.createElement("option"); //declare recycled DOM object
      elementOption.value = key;
      var printOut = gol_objPlayer.objAttachments[key].displayName;
      if (gol_objPlayer.objAttachments[key].getId() === equippedId) {
         elementOption.selected = "selected";
      }
      elementOption.textContent = printOut;
      objSelector.appendChild(elementOption);
   }
   /////
   return objSelector; //object
} //end of funAttachmentsSelectPopulate function

//dynamic display of valid choices to the player
Modalbox.attachmentsValidate = function() {
   //control variable = user selection
   var s1 = document.getElementById("attachmentFirst");
   var s2 = document.getElementById("attachmentSecond");
   var s3 = document.getElementById("attachmentThird");
   //set controls
   var e1 = s1.value;
   var e2 = s2.value;
   var e3 = s3.value;
   //clear interface
   s1.classList.remove("validation-caution");
   s2.classList.remove("validation-caution");
   s3.classList.remove("validation-caution");
   //test against player's other equipts, if true
   if (e1 === e2 || e1 === e3) {
      if (e1 != "0") //0 is nothing
         s1.classList.add("validation-caution");
   }
   //test against player's other equipts, if true
   if (e2 === e1 || e2 === e3) {
      if (e2 != "0") //0 is nothing
         s2.classList.add("validation-caution");
   }
   //test against player's other equipts, if true
   if (e3 === e2 || e3 === e1) {
      if (e3 != "0") //0 is nothing 
         s3.classList.add("validation-caution");
   }
   //pass values
   gol_objControllerModal.controlVariables[1] = e1;
   gol_objControllerModal.controlVariables[2] = e2;
   gol_objControllerModal.controlVariables[3] = e3;
} //end of attachmentsValidate function

//build user selection interface with a list of armor options
Modalbox.armorSelectPopulate = function(_dataObject) {
   var objSelector = document.createElement("select"); //declare DOM object
   objSelector.classList.add("modal-sel");
   if (_dataObject.hasOwnProperty("id")) //id include to print
      objSelector.id = _dataObject.id;
      //objSelector.addEventListener("change",Modalbox.attachmentsValidate); //VERIFICATION NOT NEEDED
   var equippedId = _dataObject.value.id;

   //the below loop could be used on other constructors
   for (var key in gol_objPlayer.objAttachments) { //loop every item in array
      //add option to selection tag
      var elementOption = document.createElement("option"); //declare recycled DOM object
      elementOption.value = key;
      var printOut = gol_objPlayer.objAttachments[key].displayName;
      //not setup yet
      /*if (player.attachments[key].id === equippedId) {
         elementOption.selected = "selected";
      }*/
      elementOption.textContent = printOut;
      objSelector.appendChild(elementOption);
   }
   return objSelector; //object
} //end of armorSelectPopulate function

//build user selection interface with a list of deflector options
Modalbox.deflectorSelectPopulate = function(_dataObject) {
   var objSelector = document.createElement("select"); //declare DOM object
   objSelector.classList.add("modal-sel");
   if (_dataObject.hasOwnProperty("id")) //id include to print
      objSelector.id = _dataObject.id;
      //objSelector.addEventListener("change",Modalbox.attachmentsValidate); //VERIFICATION NOT NEEDED 
   var equippedId = _dataObject.value.id;

   //the below loop could be used on other constructors
   for (var key in gol_objPlayer.objAttachments) { //loop every item in array
      //add option to selection tag
      var elementOption = document.createElement("option"); //declare recycled DOM object
      elementOption.value = key;
      var printOut = gol_objPlayer.objAttachments[key].displayName;
      //not setup yet
      /*if (player.attachments[key].id === equippedId) {
         elementOption.selected = "selected";
      }*/
      elementOption.textContent = printOut;
      objSelector.appendChild(elementOption);
   }
   return objSelector; //object
} //end of deflectorSelectPopulate function

//build user selection interface with a list of shields options
Modalbox.shieldSelectPopulate = function(_dataObject) {
   var objSelector = document.createElement("select"); //declare DOM object
   objSelector.classList.add("modal-sel");
   if (_dataObject.hasOwnProperty("id")) //id include to print
      objSelector.id = _dataObject.id;
   //objSelector.addEventListener("change",Modalbox.attachmentsValidate); //VERIFICATION NOT NEEDED
   var equippedId = _dataObject.value.id;

   //the below loop could be used on other constructors
   for (var key in gol_objPlayer.objAttachments) { //loop every item in array
      //add option to selection tag
      var elementOption = document.createElement("option"); //declare recycled DOM object
      elementOption.value = key;
      var printOut = gol_objPlayer.objAttachments[key].displayName;
      //not setup yet
      /*if (player.attachments[key].id === equippedId) {
         elementOption.selected = "selected";
      }*/
      elementOption.textContent = printOut;
      objSelector.appendChild(elementOption);
   }
   return objSelector; //object
} //end of shieldSelectPopulate functions

//build user selection interface with a list of power generator options
Modalbox.powerSelectPopulate = function(_dataObject) {
   var objSelector = document.createElement("select"); //declare DOM object
   objSelector.classList.add("modal-sel");
   if (_dataObject.hasOwnProperty("id")) //id include to print
      objSelector.id = _dataObject.id;
      //objSelector.addEventListener("change",Modalbox.attachmentsValidate); //VERIFICATION NOT NEEDED 
   var equippedId = _dataObject.value.id;

   //the below loop could be used on other constructors
   for (var key in gol_objPlayer.objAttachments) { //loop every item in array
      //add option to selection tag
      var elementOption = document.createElement("option"); //declare recycled DOM object
      elementOption.value = key;
      var printOut = gol_objPlayer.objAttachments[key].displayName;
      //not setup yet
      /*if (player.attachments[key].id === equippedId) {
         elementOption.selected = "selected";
      }*/
      elementOption.textContent = printOut;
      objSelector.appendChild(elementOption);
   }
   return objSelector; //object
} //end of powerSelectPopulate function

//build user selection interface with a list of sub-light system options
Modalbox.slsSelectPopulate = function(_dataObject) {
   var objSelector = document.createElement("select"); //declare DOM object
   objSelector.classList.add("modal-sel");
   if (_dataObject.hasOwnProperty("id")) //id include to print
      objSelector.id = _dataObject.id;
      //objSelector.addEventListener("change",Modalbox.attachmentsValidate); //VERIFICATION NOT NEEDED 
   var equippedId = _dataObject.value.id;

   //the below loop could be used on other constructors
   for (var key in gol_objPlayer.objAttachments) { //loop every item in array
      //add option to selection tag
      var elementOption = document.createElement("option"); //declare recycled DOM object
      elementOption.value = key;
      var printOut = gol_objPlayer.objAttachments[key].displayName;
      //not setup yet
      /*if (player.attachments[key].id === equippedId) {
         elementOption.selected = "selected";
      }*/
      elementOption.textContent = printOut;
      objSelector.appendChild(elementOption);
   }
   return objSelector; //object
} //end of slsSelectPopulate function

//build user selection interface with a list of faster than light drive options
Modalbox.ftlSelectPopulate = function(_dataObject) {
   var objSelector = document.createElement("select"); //declare DOM object
   objSelector.classList.add("modal-sel");
   if (_dataObject.hasOwnProperty("id")) //id include to print
      objSelector.id = _dataObject.id;
      //objSelector.addEventListener("change",Modalbox.attachmentsValidate); //VERIFICATION NOT NEEDED 
   var equippedId = _dataObject.value.id;

   //the below loop could be used on other constructors
   for (var key in gol_objPlayer.objAttachments) { //loop every item in array
      //add option to selection tag
      var elementOption = document.createElement("option"); //declare recycled DOM object
      elementOption.value = key;
      var printOut = gol_objPlayer.objAttachments[key].displayName;
      //not setup yet
      /*if (player.attachments[key].id === equippedId) {
         elementOption.selected = "selected";
      }*/
      elementOption.textContent = printOut;
      objSelector.appendChild(elementOption);
   }
   return objSelector; //object
} //end of ftlSelectPopulate function

//build user selection interface with a list of support options
Modalbox.supportSelectPopulate = function(_dataObject) {
   var objSelector = document.createElement("select"); //declare DOM object
   objSelector.classList.add("modal-sel");
   if (_dataObject.hasOwnProperty("id")) //id include to print
      objSelector.id = _dataObject.id;
      objSelector.addEventListener("change",Modalbox.attachmentsValidate); //WRONG VERIFICATION METHOD
   var equippedId = _dataObject.value.id;

   //the below loop could be used on other constructors
   for (var key in gol_objPlayer.objAttachments) { //loop every item in array
      //add option to selection tag
      var elementOption = document.createElement("option"); //declare recycled DOM object
      elementOption.value = key;
      var printOut = gol_objPlayer.objAttachments[key].displayName;
      //not setup yet
      /*if (player.attachments[key].id === equippedId) {
         elementOption.selected = "selected";
      }*/
      elementOption.textContent = printOut;
      objSelector.appendChild(elementOption);
   }
   return objSelector; //object
} //end of supportSelectPopulate function

//build user selection interface with a list of backup options
Modalbox.backupSelectPopulate = function(_dataObject) {
   var objSelector = document.createElement("select"); //declare DOM object
   objSelector.classList.add("modal-sel");
   if (_dataObject.hasOwnProperty("id")) //id include to print
      objSelector.id = _dataObject.id;
      //objSelector.addEventListener("change",Modalbox.attachmentsValidate); //VERIFICATION NOT NEEDED 
   var equippedId = _dataObject.value.id;

   //the below loop could be used on other constructors
   for (var key in gol_objPlayer.objAttachments) { //loop every item in array
      //add option to selection tag
      var elementOption = document.createElement("option"); //declare recycled DOM object
      elementOption.value = key;
      var printOut = gol_objPlayer.objAttachments[key].displayName;
      //not setup yet
      /*if (player.attachments[key].id === equippedId) {
         elementOption.selected = "selected";
      }*/
      elementOption.textContent = printOut;
      objSelector.appendChild(elementOption);
   }
   return objSelector; //object
} //end of backupSelectPopulate function

//show complete carco list
Modalbox.listPopulateCarco = function(_dataObject) {
   //loads from global player object, _dataObject is not used
   //access player inventory and display all items
   var objContainer = document.createElement("div");
   objContainer.classList.add("three-grid-container");
   var arr_playerInventory = gol_objPlayer.objInventory.getInventory();
   //MOVED TO listPopulateCarco - for (var i = 0; i < gol_objPlayer.objInventory.items.length; i++) {
   for (var i = 0; i < arr_playerInventory.length; i++) {
      let item = clsItem.list[arr_playerInventory[i].id]; //this line is possilbly breaking Encapsulation
      let amount = arr_playerInventory[i].amount;
      //prepare container
      var objInnerContainer = document.createElement("div");
      objInnerContainer.classList.add("carco-grid-item");
      //prepare button
      var objNextItem = document.createElement("button");
      objNextItem.value = arr_playerInventory[i].id;
      objNextItem.classList.add("interface-btn");
      //prepare asset
      var buttonImageObj = new Image(); //blank variable
      var buttonImageSrc = ""; //blank variable
      if (item.type === "special") 
         buttonImageSrc = Img.special.src;
      if (item.type === "weapon")
         buttonImageSrc = Img.projectile.src;
      buttonImageObj.src = buttonImageSrc;
      buttonImageObj.classList.add("btn-img-carco");
      objNextItem.appendChild(buttonImageObj); //add image to button
      var buttonTitle = printFromHTMLToTitleAttr(item.printDescString()); //formatting.js, inventory.js
      //buttonTitle = buttonTitle.replace("<br>","\x0A"); //replace html line breaks with anoter control characters to line feed
      objNextItem.setAttribute("title",buttonTitle); //add image to button
      //prepare item name
      var buttonString = item.name;
      if (!item.unique) //not unique, if unique do not print a number
         buttonString += " &times;" + amount;
      buttonString = buttonString.replace(/\s/g,"&nbsp;"); //replace space with no-break line spaces
      objNextItem.innerHTML += buttonString;
      //MOVED TO clsInventory - let onClick = Item.list[item.id].useItem;
      let onClick = clsItem.list[item.id].useItem;
      objNextItem.addEventListener("click",onClick);
      //compile object
      objInnerContainer.appendChild(objNextItem);
      objContainer.appendChild(objInnerContainer);
   }
   return objContainer; //object
} //end of listPopulateCarco function

//additional procedure for printing out modal list
Modalbox.printPopulateCarco = function() {
   var objContainer = Modalbox.listPopulateCarco(); //rebuild content
   gol_objModalBody.appendChild(objContainer);//print out
}

//
Modalbox.listCarcoFavorites_start = function() {
   //select fav button
   this.classList.add("modal-btn-confirm");
   this.classList.remove("modal-btn-command");
   this.removeEventListener("click",Modalbox.listCarcoFavorites_start);
   this.addEventListener("click",Modalbox.listCarcoFavorites_finish);
   this.innerHTML = "Finish";
   //disable exit button
   var closeButton = document.getElementsByClassName("modal-btn-close")[0]; //select first object in arry of elements
   closeButton.disabled = true;
   //update modal subtitle
   document.getElementById("modalSubTitle").innerHTML = "select (or deselect) your hotbar items.";
   
   //new options over existing buttons
   var arrGUIGrid = document.getElementsByClassName("carco-grid-item");
   for (var i = 0; i < arrGUIGrid.length; i++) { //add to each grid item
      //create false button over current to allow for additional interface
      var objSpan = document.createElement("span");
      objSpan.style.width = "100%";
      objSpan.style.height = "100%";
      objSpan.style.position = "absolute";
      objSpan.style.left = "0";
      objSpan.style.top = "0";
      objSpan.style.zIndex = "1";
      objSpan.addEventListener("click",Modalbox.listCarcoFavorites_btnToggle);
      //if this item is already a favorite
      //MOVED TO clsPlayer - for (var j = 0; j < gol_objPlayer.inventoryFavorites.length; j++) { //check all current favorites
      //MOVED TO clsPlayer -    var itemId = arrGUIGrid[i].firstChild.value; //this grid item id
      //MOVED TO clsPlayer -    if (gol_objPlayer.inventoryFavorites[j] === itemId) { //is this grid
      //MOVED TO clsPlayer -       objSpan.classList.add("btn-favorite");
      //MOVED TO clsPlayer -       break;
      //MOVED TO clsPlayer -    }
      //MOVED TO clsPlayer - }
      
      var arrFavs = gol_objPlayer.getInventoryFavorites(); //check for players favorite items
      if (arrFavs !== false) { //any favorite items?
         for (var j = 0; j < arrFavs.length; j++) { //loop all player favorites
            var itemId = arrGUIGrid[i].firstChild.value; //this grid item id
            if (arrFavs[j] === itemId) { //is this grid
               objSpan.classList.add("btn-favorite");
               break;
            }
         }
      }

      arrGUIGrid[i].appendChild(objSpan);
   }
   
   //for any favorite items not in inventory, create those buttons to add the favorite option
   //...

} //end of listCarcoFavorites_start

//control for user to select favrvorite items
Modalbox.listCarcoFavorites_btnToggle = function() {
   this.classList.toggle("btn-favorite");
}

//user finishes selecting their farvorites 
Modalbox.listCarcoFavorites_finish = function() {
   //reset fav button
   this.classList.add("modal-btn-command");
   this.classList.remove("modal-btn-confirm");
   this.removeEventListener("click",Modalbox.listCarcoFavorites_finish);
   this.addEventListener("click",Modalbox.listCarcoFavorites_start);
   this.innerHTML = "Set Fave";
   //enable exit button
   var closeButton = document.getElementsByClassName("modal-btn-close")[0]; //select first object in arry of elements
   closeButton.disabled = false;
   //update modal subtitle
   document.getElementById("modalSubTitle").innerHTML = gol_objControllerModal.data.description;

   //clear inventory favorites
   //MOVED TO clsPlayer - gol_objPlayer.inventoryFavorites.length = 0; //empty array
   gol_objPlayer.resetInventoryFavorites(); //empty array
   //get all highlighted items, set to fav bar
   var arrGUIGrid = document.getElementsByClassName("btn-favorite");
   for (var i = 0; i < arrGUIGrid.length; i++) { //add to each grid item
      var selectedItem = arrGUIGrid[i].parentElement.firstElementChild.value;
      //MOVED TO clsPlayer - gol_objPlayer.inventoryFavorites.push(selectedItem);
      gol_objPlayer.addInventoryFavorite(selectedItem);
   }

   //reset display
   //MOVED TO clsPlayer - gol_objPlayer.objInventory.refreshRender(); //call redraw
   gol_objPlayer.refreshGUI();
   //Modalbox.printPopulateCarco();
} //end of listCarcoFavorites_finish

//user finishes selecting their farvorites 
Modalbox.listCarcoFavorites_admin = function() {
   //MOVED TO clsPlayer - gol_objPlayer.inventoryFavorites.push("enemy");
   gol_objPlayer.addInventoryFavorite("enemy");
   //reset display
   //MOVED TO clsPlayer - gol_objPlayer.objInventory.refreshRender(); //call redraw
   gol_objPlayer.refreshGUI();
} //end of listCarcoFavorites_admin

//show navigation list
Modalbox.listPopulateNavigation = function() {
   var objContainer = document.createElement("div");
   objContainer.classList.add("three-grid-container");

   //MOVED TO clsNavigation - for (var i = 0; i < gol_objPlayer.navigation.locations.length; i++) {
   var arr_objPlaces = gol_objPlayer.getLocationsKnown();
   for (var i = 0; i < arr_objPlaces.length; i++) {
      var place = clsLocation.list[arr_objPlaces[i]];
      //prepare container
      var objInnerContainer = document.createElement("div");
      objInnerContainer.classList.add("carco-grid-item");
      //prepare button
      var objNextLocation = document.createElement("button");
      objNextLocation.value = place.getId();
      objNextLocation.classList.add("interface-btn");
      var buttonTitle = "Location: X " + place.parSecX + ", Y " + place.parSecY + ", Z " + place.parSecZ;
      objNextLocation.setAttribute("title",buttonTitle); //add title attribute to button
      objNextLocation.innerHTML = place.getName();
      objNextLocation.addEventListener("click",function() {
         Modalbox.navigationTravel_start(this);
      });
      //compile object
      objInnerContainer.appendChild(objNextLocation);
      objContainer.appendChild(objInnerContainer);
    }
   return objContainer; //object

} //end of listPopulateNavigation function

//additional procedure for printing out modal list
Modalbox.printPopulateNavigation = function() {
   var objContainer = Modalbox.listPopulateNavigation(); //rebuild content
   gol_objModalBody.appendChild(objContainer);//print out
}

//update the modal interface to show temp interface of confirm/cancel options to proceed
Modalbox.navigationTravel_start = function(_pass) {
   gol_objPlayer.setTravelDestination(_pass.value);

   var place = clsLocation.list[gol_objPlayer.getTravelDestination()];
   document.getElementById("modalSubTitle").innerHTML = "Confirm your choice to trave to " + place.getName() +" (Distance, possble?).";

   var container = document.getElementsByClassName("modal-title")[0];
   var objSpan = document.createElement("span");
   objSpan.classList.add("mod-nav");

   var objCmdConfirm = document.createElement("button");
   objCmdConfirm.addEventListener("click",Modalbox.navigationTravel_finishConfirmed);
   objCmdConfirm.classList.add("mod-nav-confirm");
   objCmdConfirm.innerHTML = "Confirm Jump";

   var objCmdCancel = document.createElement("button");
   objCmdCancel.addEventListener("click",Modalbox.navigationTravel_finishCleanup);
   objCmdCancel.classList.add("mod-nav-cancel");
   objCmdCancel.innerHTML = "Back";

   //compile 
   objSpan.appendChild(objCmdConfirm);
   objSpan.appendChild(objCmdCancel);
   container.appendChild(objSpan);

} //end of navigationTravel_start function

//user chooses to travel
Modalbox.navigationTravel_finishConfirmed = function() {
   var place = clsLocation.list[gol_objPlayer.getTravelDestination()];
   place.funTransition(); //load new place
   Modalbox.closeModal();
   //MOVED TO clsGame - paused = !paused; //continue game
   gol_objSpaceGame.setGamePaused(true); //continue game
} //end of navigationTravel_finishConfirmed function

//user chooses to cancel travel, close temp interface
Modalbox.navigationTravel_finishCleanup = function() {
   var objNavWindow = document.getElementsByClassName("mod-nav")[0]; //try to select
   if (objNavWindow === undefined) {//test if invalid
      console.log("Custom Error catching, throwing expected undefined object error");
      console.trace();
      return; //stop code
   }  
      //else
   objNavWindow.remove(); //remove window
} //end of navigationTravel_finishCleanup function

Modalbox.listNavFavorites_start = function() {
   //select fav button
   this.classList.add("modal-btn-confirm");
   this.classList.remove("modal-btn-command");
   this.addEventListener("click",Modalbox.listNavFavorites_finish);
   this.removeEventListener("click",Modalbox.listNavFavorites_start);
   this.innerHTML = "Finish";
   //disable exit button
   var closeButton = document.getElementsByClassName("modal-btn-close")[0]; //select first object in arry of elements
   closeButton.disabled = true;
   //update modal subtitle
   document.getElementById("modalSubTitle").innerHTML = "select (or deselect) your hotbar items.";


   /***THIS CODE BELOW REPEATS IN THE OTHER _start procedure on this page */
   //new options over existing buttons
   var arrGUIGrid = document.getElementsByClassName("carco-grid-item");
   for (var i = 0; i < arrGUIGrid.length; i++) { //add to each grid item
      //create false button over current to allow for additional interface
      var objSpan = document.createElement("span");
      objSpan.style.width = "100%";
      objSpan.style.height = "100%";
      objSpan.style.position = "absolute";
      objSpan.style.left = "0";
      objSpan.style.top = "0";
      objSpan.style.zIndex = "1";
      objSpan.addEventListener("click",Modalbox.listNavFavorites_btnToggle);
      //
      var arrPlaces = gol_objPlayer.getNavigationFavorites();
      //MOVED TO listNavFavorites_start - for (var j = 0; j < gol_objPlayer.navigationFavorites.length; j++) { //check all current favorites
      //MOVED TO listNavFavorites_start -    var itemId = arrGUIGrid[i].firstChild.value; //this grid item id
      //MOVED TO listNavFavorites_start -    if (gol_objPlayer.navigationFavorites[j] === itemId) { //is this grid
      //MOVED TO listNavFavorites_start -       objSpan.classList.add("btn-favorite");
      //MOVED TO listNavFavorites_start -       break;
      //MOVED TO listNavFavorites_start -    }
      for (var j = 0; j < arrPlaces.length; j++) { //check all current favorites
         var itemId = arrGUIGrid[i].firstChild.value; //this grid item id
         if (arrPlaces[j] === itemId) { //is this grid
            objSpan.classList.add("btn-favorite");
            break;
         }
      };
      arrGUIGrid[i].appendChild(objSpan);
   }

} //end of listNavFavorites_start function

//control for starting user to select favorite navigation
Modalbox.listNavFavorites_btnToggle = function() {
   this.classList.toggle("btn-favorite");
}

//control for ending user to select favorite navigation
Modalbox.listNavFavorites_finish = function() {
   //reset fav button
   this.classList.add("modal-btn-command");
   this.classList.remove("modal-btn-confirm");
   this.addEventListener("click",Modalbox.listNavFavorites_start);
   this.removeEventListener("click",Modalbox.listNavFavorites_finish);
   this.innerHTML = "Set Fave";
   //enable exit button
   var closeButton = document.getElementsByClassName("modal-btn-close")[0]; //select first object in arry of elements
   closeButton.disabled = false;
   //update modal subtitle
   document.getElementById("modalSubTitle").innerHTML = gol_objControllerModal.data.description;

   //MORE...

   //
   var arrPlaces = gol_objPlayer.getNavigationFavorites();

   //clear navigation favorites
   arrPlaces.length = 0; //empty array

   /***THIS CODE BELOW REPEATS IN THE OTHER _start procedure on this page */
   //get all highlighted items, set to fav bar
   var arrGUIGrid = document.getElementsByClassName("btn-favorite");
   for (var i = 0; i < arrGUIGrid.length; i++) { //add to each grid item
      var selectedItem = arrGUIGrid[i].parentElement.firstElementChild.value;
      //MOVED TO listNavFavorites_finish - gol_objPlayer.navigationFavorites.push(selectedItem);
      arrPlaces.push(selectedItem);
   }

   //reset display
   //MOVED TO clsPlayer - gol_objPlayer.navigation.refreshRender(); //call redraw
   gol_objPlayer.refreshGUI();

} //end of listNavFavorites_finish
