const gol_objModalBody = document.getElementById("modalBody");
const gol_objModalFooter = document.getElementById("modalFooter");
//**************************************************************************************** */

//open player modal control
Modalbox = function(_mode, _returnedData) {
   //_returnedData = {
      //title:"NAME DISPLAYED",  //description:"LONG DESCIRPTION.",  //dataArray:[...]
      //dataArray:[{id:"attachmentFirst", type:"choice", option:"Primary Attachment", value:player.equip1, constructor:Modalbox.attachmentsSelectPopulate, },]
      //resolutions:[{display:"Confirm",event:objectX},{display:"Cancel",event:Modalbox.closeModal}], 
      //postConstructor:functionEvent,} //OPTIONAL
   //MOVED TO clsGame - paused = true; //pause the game
   gol_objSpaceGame.setGamePaused(true); //pause the game
   gol_divModalCover.style.display = "block"; //hide all items

   //prepare object
   var self = {
      mode:_mode,
      data:_returnedData, //object with properties title, description and dataArray
      controlVariables:[], //empty placeholder for control variables
   }; //prepare empty object
   //display title
   document.getElementById("modalDisplayTitle").innerHTML = self.data.title;
   document.getElementById("modalSubTitle").innerHTML = self.data.description;
   //populate body
   var dataModalArray = self.data.dataArray; 
   //dataArray:[
      //id is OPTIONAL
      //{id:"", type:"body", paragraph:"A body of text to be printed out to read."
      //{id:"", type:"columns", constructor:functionEvent
      //{id:"", type:"choice", option:"Primary Attachment", value:object.identiifer, constructor:functionEvent
      //{id:"", type:"image", picture:Img.example, title:"text to show if image does not load.", mouseover: "test to show when user hovers mouse over image"
   for (var key in dataModalArray) { //loop all data, check type
      if (dataModalArray[key].type === "body")
         Modalbox.populateParagraph(dataModalArray[key]);
      if (dataModalArray[key].type === "choice")
         Modalbox.populateSelection(dataModalArray[key]);
      if (dataModalArray[key].type === "columns")
         Modalbox.populateList(dataModalArray[key]);
      if (dataModalArray[key].type === "image")
         Modalbox.populatePicture(dataModalArray[key]);
   } //end of loop of data
   //populate footer
   for (var key in self.data.resolutions) { //read data, check type
      //resolutions:["confirmed"], //enumerated array of footer options, confirm, cancel, ok, yes, no, close.  Custom values: leave
      Modalbox.populateFooter(self.data.resolutions[key]);
   }
   return self;
} //end of Modalbox object constructor

//
Modalbox.openModal = function(_mode) {
   var self; 
   switch (_mode) {
      case "attachments": //ship attachments
         self = Modalbox.funReturnAttachments(); //unique object for attachment options
         break;
      case "defensive": //ship defensive
         self = Modalbox.returnDefensive();
         break;
      case "engineering": //ship engineering
         self = Modalbox.returnEngineering();
         break;
      case "auxiliary": //ship auxiliary
         self = Modalbox.returnAuxiliary();
         break;
      case "carco": //ship carco
         self = Modalbox.returnCarco();
         break;
      case "navigation": //ship navigation
         self = Modalbox.funReturnNavigation();
         break;
      case "docking": //ship docking
         
         break;
      case "upgrade": //ship upgrade
         
         break;
      case "placements": //augmentation or attachments to building
         
         break;
      case "facilities": //specialized rooms 
         
         break;
      case "infrastructure": //space building
         
         break;
      case "build": //spacestation building
         
         break;
      case "equip":
         
         break;
      case "drydock":
         self = Modalbox.returnDrydock();
         break;
      case "controls":
         self = Modalbox.returnControls();
         break;
   }
   gol_objControllerModal = Modalbox(_mode,self); //set global variable
   //additional validation for just attachments modal
   if (gol_objControllerModal.data.hasOwnProperty('postConstructor'))
      gol_objControllerModal.data.postConstructor(); //run additional function
}

//close player modal control
Modalbox.closeModal = function() {
   gol_divModalCover.style.display = "none";
   Modalbox.clearBody();
   gol_objModalFooter.innerHTML = ""; //destroy html
   gol_objControllerModal = {}; //destroy object
   Modalbox.navigationTravel_finishCleanup(); //remove navigation confirmation window, if appliciable
 } //end of closeModal function

//
Modalbox.populateParagraph = function(_dataObject) {
   //_dataObject = {id:"", type:"body", paragraph:"A body of text to be printed out to read.",},
   var objContainer = document.createElement("p");
   objContainer.innerHTML = _dataObject.paragraph;
   gol_objModalBody.appendChild(objContainer);
} //end of Modalbox populateParagraph

//
Modalbox.populateSelection = function(_dataObject) {
   //_dataObject = {id:"", type:"option", option:"Primary Attachment", value:object.identiifer, constructor:functionEvent, },
   var parameters = _dataObject;
   var objContainer = document.createElement("div");
   objContainer.classList.add("two-grid-container");
   var objLeftGrid = document.createElement("div");
   objLeftGrid.classList.add("grid-item");
   var objLabel = document.createElement("label");
   objLabel.for = parameters.id;
   objLabel.innerText = parameters.option;
   var objRightGrid = document.createElement("div");
   objRightGrid.classList.add("grid-item");

   //use functions here to specialize print out, but the constructor was suppose to do this 
   //attachment constructor = attachmentsSelectPopulate function
   //to fix this, I need to expand the attachmentsSelectPopulate procedure to do the loop and return a bigger DOM object
   //RIGHT NOW...
   /******** *
   if (_request === "attachment") { //redundant
      /////////////
      //unique to the attachments, add to constructor to work ->
      //UNIQUE: player.attachments
      //UNIQUE: Modalbox.attachmentsValidate
      //_dataObject needs to be passed to the constructor, this may be the only thing that needs to be passed

      var objSelector = document.createElement("select"); //declare
      objSelector.classList.add("modal-sel");
      if (_dataObject.hasOwnProperty("id")) //id include to print, CHECK
         objSelector.id = _dataObject.id;
      
      objSelector.addEventListener("change",Modalbox.attachmentsValidate); //CHECK
      var equippedId = _dataObject.value.id; //declare, CHECK
      for (var key in player.attachments) { //loop every item in array, CHECK
         objSelector.appendChild(x); //where x is the old constructor
         /*
         objSelector.appendChild(_dataObject.constructor(key, equippedId)) //return javascript html select element
         *
      }
      /////////////
   }
   //******** */ 
   //WANT TO HAVE...

   var objSelector = parameters.constructor(parameters); //constructor returns DOM object

   //compile object
   objLeftGrid.appendChild(objLabel);
   objRightGrid.appendChild(objSelector);
   objContainer.appendChild(objLeftGrid);
   objContainer.appendChild(objRightGrid);
   //print out
   gol_objModalBody.appendChild(objContainer);
} //end of Modalbox populateSelection

//
Modalbox.populateList = function(_dataObject) {
   //{_dataObject = id:"", type:"columns", constructor:functionEvent, },
   //entire html setup in constructor
   objContainer = _dataObject.constructor(_dataObject); //return object of html elements
   //print out
   gol_objModalBody.appendChild(objContainer);
} //end of Modalbox populateList

//
Modalbox.populatePicture = function(_dataObject) {
   
} //end of Modalbox populatePicture

//bottom of modal box
Modalbox.populateFooter = function(_Object) {
   var objDivHolder = document.createElement("inline-block");
   objDivHolder.classList.add("modal-btn-div");
   var objButton = document.createElement("button");
   objButton.type = "button";
   objButton.innerHTML = _Object.display;
   objButton.addEventListener("click",_Object.event);
   objButton.classList.add(_Object.style);
   /*
   if (_Object.display === "Cancel" || _Object.display === "Close") {
      objButton.classList.add("modal-btn-close");
   } else if (_Object.display === "Confirm") {
      objButton.classList.add("modal-btn-confirm");
   } else if (_Object.display === "Set Fave") {
      objButton.classList.add("modal-btn-command");
   }
   */
   objDivHolder.appendChild(objButton);
   //populate footer
   gol_objModalFooter.appendChild(objDivHolder);
} //end of Modalbox populateFooter

//
Modalbox.clearBody = function() {
   gol_objModalBody.innerHTML = ""; //destroy current content
}