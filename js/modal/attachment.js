//
Modalbox.funReturnAttachments = function() {
   //
   var equip1 = gol_objPlayer.getEquiped(1);
   var equip2 = gol_objPlayer.getEquiped(2);
   var equip3 = gol_objPlayer.getEquiped(3);
   //
   var self = {
      title:"Ship Attachments", //display
      description:"Weapons, arments, hardware, tools and special devices.",  //display
      dataArray:[
         {
            id: "attachmentFirst",
            type: "choice",
            option: "Primary Attachment", //display
            value: equip1.getId(), //expecting id
            constructor: Modalbox.funAttachmentsSelectPopulate, //located in modal/builds.js, accepts one paremeter
         },
         {
            id: "attachmentSecond",
            type: "choice",
            option: "Secondary Attachment", //display
            value: equip2.getId(), //expecting id
            constructor: Modalbox.funAttachmentsSelectPopulate, //located in modal/builds.js, accepts one paremeter
         },
         {
            id: "attachmentThird",
            type: "choice",
            option: "Tertiary Attachment", //display
            value: equip3.getId(), //expecting id
            constructor: Modalbox.funAttachmentsSelectPopulate, //located in modal/builds.js, accepts one paremeter
         }
      ], //arry to hold options, come in option,value pair objects. Can be dynamic later
      controlVariable: [],
      resolutions: [
         {display: "Confirm", event: Modalbox.attachmentsConfirm, style: "modal-btn-confirm"},
         {display: "Cancel", event: Modalbox.closeModal, style: "modal-btn-close"}
      ],
      postConstructor: Modalbox.attachmentsValidate,
   };
   return self;
}

//
Modalbox.attachmentsConfirm = function() {
   /**Original design added everything back to inventory then removed what is being used */
   
   /**New Design */

   //check for validation
   var bolDupEquip1 = document.getElementById("attachmentFirst").classList.contains("validation-caution");
   var bolDupEquip2 = document.getElementById("attachmentSecond").classList.contains("validation-caution");
   var bolDupEquip3 = document.getElementById("attachmentThird").classList.contains("validation-caution");
   //get current equiped as objects
   var equip1 = gol_objPlayer.getEquiped(1); 
   var equip2 = gol_objPlayer.getEquiped(2);
   var equip3 = gol_objPlayer.getEquiped(3);
   //id of selected things to now equip
   var s1 = gol_objControllerModal.controlVariables[1];
   var s2 = gol_objControllerModal.controlVariables[2];
   var s3 = gol_objControllerModal.controlVariables[3];
   /**New Design, does not work
    * 
   //check selected equip, slot 1
   if (s1 != 0) { //is not zero
      if (s1 != equip1.getId()) { //not the same item
         if (equip1.getId() !== 0) //equiped item is not nothing
            //gol_objPlayer.objInventory.addItem(equip1.getItemId(), 1); //add currently equipped to inventory 
      }
      if (!bolDupEquip1) { //not invalid (being valid)
         gol_objPlayer.objInventory.removeItem(gol_objPlayer.objAttachments[s1].getItemId(), 1); //remove new equiped from inventory
      }
   } else if (equip1.getId() !== 0) { //selection is zero and player is holding something in that slot
      //gol_objPlayer.objInventory.addItem(equip1.getItemId(), 1); //add currently equipped to inventory//update player equipped values 
   }
   //regardless of above, update attachedment to selection
   gol_objPlayer.funEquipAttachment(1, gol_objPlayer.objAttachments[s1]); //(_equipSlot, thingEquipped)
   //check selected equip, slot 2
   if (s2 != 0) { //is not zero
      if (s2 != equip2.getId()) { //not the same item
         if (equip2.getId() !== 0) //equiped item is not nothing
            //gol_objPlayer.objInventory.addItem(equip2.getItemId(), 1); //add currently equipped to inventory 
      }
      if (!bolDupEquip2) { //not invalid (being valid)
         gol_objPlayer.objInventory.removeItem(gol_objPlayer.objAttachments[s2].getItemId(), 1); //remove new equiped from inventory
      }
   } else if (equip2.getId() !== 0) { //selection is zero and player is holding something in that slot
      //gol_objPlayer.objInventory.addItem(equip2.getItemId(), 1); //add currently equipped to inventory//update player equipped values
   }
   //regardless of above, update attachedment to selection
   gol_objPlayer.funEquipAttachment(2, gol_objPlayer.objAttachments[s2]); //(_equipSlot, thingEquipped)
   //check selected equip, slot 3 //different that s1 and s2 because I was trying to fix but could not solve
   if (s3 != 0) { //is not zero
      if (s3 != equip3.getId() && !bolDupEquip3) { //not the same and not invalid (being valid)
         gol_objPlayer.objInventory.addItem(equip3.getItemId(), 1); //add currently equipped to inventory
         gol_objPlayer.objInventory.removeItem(gol_objPlayer.objAttachments[s3].getItemId(), 1); //remove new equiped from inventory
      }
   } else if (equip3.getId() !== 0) { //selection is zero and player is holding something in that slot
      gol_objPlayer.objInventory.addItem(equip3.getItemId(), 1); //add currently equipped to inventory//update player equipped values
   }
   //
   gol_objPlayer.funEquipAttachment(3, gol_objPlayer.objAttachments[s3]); //(_equipSlot, thingEquipped)
    */
   /**Old Design 
   //
   var equip1 = gol_objPlayer.getEquiped(1); //returns object
   var equip2 = gol_objPlayer.getEquiped(2);
   var equip3 = gol_objPlayer.getEquiped(3);
   //
   var s1 = gol_objControllerModal.controlVariables[1];
   var s2 = gol_objControllerModal.controlVariables[2];
   var s3 = gol_objControllerModal.controlVariables[3];
   //manuplate inventory   
   if (equip1.getId() !== 0 && !bolDupEquip1) gol_objPlayer.objInventory.addItem(equip1.getItemId(), 1); //check if selection changed
   if (equip2.getId() !== 0 && !bolDupEquip2) gol_objPlayer.objInventory.addItem(equip2.getItemId(), 1); //check for validation, if on, do not add to inventory
   if (equip3.getId() !== 0 && !bolDupEquip3) gol_objPlayer.objInventory.addItem(equip3.getItemId(), 1); //add currently equipped to inventory
   //remove new selections from inventory
   if (s1 !== 0 && !bolDupEquip1) gol_objPlayer.objInventory.removeItem(gol_objPlayer.objAttachments[s1].getItemId(), 1);
   if (s2 !== 0 && !bolDupEquip1) gol_objPlayer.objInventory.removeItem(gol_objPlayer.objAttachments[s2].getItemId(), 1);
   if (s3 !== 0 && !bolDupEquip1) gol_objPlayer.objInventory.removeItem(gol_objPlayer.objAttachments[s3].getItemId(), 1);
   //update player equipped values
   gol_objPlayer.funEquipAttachment(1, gol_objPlayer.objAttachments[s1]); //(_equipSlot, thingEquipped)
   gol_objPlayer.funEquipAttachment(2, gol_objPlayer.objAttachments[s2]); //(_equipSlot, thingEquipped)
   gol_objPlayer.funEquipAttachment(3, gol_objPlayer.objAttachments[s3]); //(_equipSlot, thingEquipped)
   */
   gol_objPlayer.funEquipAttachment(1, gol_objPlayer.objAttachments[s1]); //(_equipSlot, thingEquipped)
   gol_objPlayer.funEquipAttachment(2, gol_objPlayer.objAttachments[s2]); //(_equipSlot, thingEquipped)
   gol_objPlayer.funEquipAttachment(3, gol_objPlayer.objAttachments[s3]); //(_equipSlot, thingEquipped)
   //**want to print a confirmation that fades or click/keypress to remove immeditly*/
   Modalbox.closeModal(); //close modal box
} //end of attachmentsConfirm function

//
Modalbox.returnDefensive = function() {
   var self = {
      title:"Defensive Systems", //display
      description:"Hull, protection and security.",  //display
      dataArray:[
         {
            id:"defensiveArmor",
            type:"choice",
            option:"Armor", //display
            value:"", //expecting id
            constructor:Modalbox.armorSelectPopulate, //correct later, must be set or will cause error
         },
         {
            id:"defensiveDeflector",
            type:"choice",
            option:"Deflector", //display
            value:"", //expecting id
            constructor:Modalbox.deflectorSelectPopulate, //correct later, must be set or will cause error
         },
         {
            id:"defensiveShields",
            type:"choice",
            option:"Shields", //display
            value:"", //expecting id
            constructor:Modalbox.shieldSelectPopulate, //correct later, must be set or will cause error
         }
      ],
      resolutions:[
         {display:"Confirm",event:objectX,style:"modal-btn-confirm",},
         {display:"Cancel",event:Modalbox.closeModal,style:"modal-btn-close",}
      ],
   };
   return self;
}

//
Modalbox.returnEngineering = function() {
   var self = {
      title:"Engineering Deck", //display
      description:"Propulsion and power.",  //display
      dataArray:[
         {
            id:"engineeringPower",
            type:"choice",
            option:"Power Reactor", //display
            value:"", //expecting id
            constructor:Modalbox.powerSelectPopulate, //correct later, must be set or will cause error
         },
         {
            id:"engineeringSLS",
            type:"choice",
            option:"Sub-light Systems", //display
            value:"", //expecting id
            constructor:Modalbox.slsSelectPopulate, //correct later, must be set or will cause error
         },
         {
            id:"engineeringFTL",
            type:"choice",
            option:"FTL Drive", //display
            value:"", //expecting id
            constructor:Modalbox.ftlSelectPopulate, //correct later, must be set or will cause error
         }
      ],
      resolutions:[
         {display:"Confirm",event:objectX,style:"modal-btn-confirm",},
         {display:"Cancel",event:Modalbox.closeModal,style:"modal-btn-close",}
      ],
   };
   return self;
}

//
Modalbox.returnAuxiliary = function() {
   var self = {
      title:"Auxiliary Systems", //display
      description:"Augmentations and modifications.",  //display
      dataArray:[
         {
            id:"supportAlpha",
            type:"choice",
            option:"Support Alpha", //display
            value:"", //expecting id
            constructor:Modalbox.supportSelectPopulate, //correct later, must be set or will cause error
         },
         {
            id:"supportBeta",
            type:"choice",
            option:"Support Beta", //display
            value:"", //expecting id
            constructor:Modalbox.supportSelectPopulate, //correct later, must be set or will cause error
         },
         {
            id:"supportBackup",
            type:"choice",
            option:"Backup", //display
            value:"", //expecting id
            constructor:Modalbox.backupSelectPopulate, //correct later, must be set or will cause error
         }
      ], //arry to hold options, come in option,value pair objects. Can be dynamic later
      resolutions:[
         {display:"Confirm",event:objectX,style:"modal-btn-confirm",},
         {display:"Cancel",event:Modalbox.closeModal,style:"modal-btn-close",}
      ],
   };
   return self;
} //end of Modalbox.returnAuxiliary modal settings

//
Modalbox.returnCarco = function() {
   var self = {
      title: "Carco hold", //display
      description: "Onboard ship inventory. Click to use, mouse over to see description.",  //display
      dataArray: [
         {
            id: "carcoLOV",
            type: "columns",
            constructor: Modalbox.listPopulateCarco, //to build inventory modal
         }
      ],      
      controlVariable: [], //favorites list
      resolutions: [
         {display: "Set Fave", event: Modalbox.listCarcoFavorites_start, style: "modal-btn-command",},
         {display: "Close", event: Modalbox.closeModal, style: "modal-btn-close",}
      ],
   };
   return self;
} //end of Modalbox.returnCarco modal settings

//
Modalbox.funReturnNavigation = function() {
   var self = {
      title:"Navigation", //display
      description:"Travel to destinations. You require a FTL (faster than light) drive to travel.",  //display
      dataArray:[
         {
            id:"navigationLOV",
            type:"columns",
            constructor:Modalbox.listPopulateNavigation, 
         }
      ],      
      resolutions:[
         {display:"Set Fave",event:Modalbox.listNavFavorites_start,style:"modal-btn-command",},
         {display:"Cancel",event:Modalbox.closeModal,style:"modal-btn-close",}
      ],
   };
   return self;
} //end of Modalbox.funReturnNavigation modal settings

//
Modalbox.returnDrydock = function() {
   var self = {
      title:"Docked", //display
      description:"Repaire ship and swap out components.",  //display
      dataArray:[
         {
            type:"body",
            paragraph:"You require a space station, shipyard or hanger to dock.", //display
         },
         {
            type:"body",
            paragraph:"Move your ship an ally space station to dock.", //display
         },
         {
            type:"body",
            paragraph:"Return to your space station to dock.", //display
         },
         {
            type:"body",
            paragraph:"Cannot dock neutral or enemy space stations.", //display
         }
      ],     
      resolutions:[{display:"Leave",event:Modalbox.closeModal,style:"modal-btn-close",}],
   };
   return self;
} //end of Modalbox.returnDrydock modal settings

//
Modalbox.returnControls = function() {
   var self = {
      title:"Player Controls", //display
      description:"For now they cannot change, update to come.",  //display
      dataArray:[
         {
            type:"choice",
            option:"Move Up", //display
            value:"W", //expecting id
            constructor:Modalbox.selectPopulateAttachments, //correct later, must be set or will cause error
         },
         {
            type:"choice",
            option:"Move Left", //display
            value:"A", //expecting id
            constructor:Modalbox.selectPopulateAttachments, //correct later, must be set or will cause error
         },
         {
            type:"choice",
            option:"Move Down", //display
            value:"S", //expecting id
            constructor:Modalbox.selectPopulateAttachments, //correct later, must be set or will cause error
         },
         {
            type:"choice",
            option:"Move Right", //display
            value:"S", //expecting id
            constructor:Modalbox.selectPopulateAttachments, //correct later, must be set or will cause error
         },
         {
            type:"choice",
            option:"Pause/Unpause Game", //display
            value:"P", //expecting id
            constructor:Modalbox.selectPopulateAttachments, //correct later, must be set or will cause error
         },
         {
            type:"choice",
            option:"First Attachment", //display
            value:"Left Click", //expecting id
            constructor:Modalbox.selectPopulateAttachments, //correct later, must be set or will cause error
         },
         {
            type:"choice",
            option:"Second Attachment", //display
            value:"Right Click", //expecting id
            constructor:Modalbox.selectPopulateAttachments, //correct later, must be set or will cause error
         },
         {
            type:"choice",
            option:"Third Attachment", //display
            value:"Spacebar", //expecting id
            constructor:Modalbox.selectPopulateAttachments, //correct later, must be set or will cause error
         },
         {
            type:"choice",
            option:"Alpha Support", //display
            value:"CTRL", //expecting id
            constructor:Modalbox.selectPopulateAttachments, //correct later, must be set or will cause error
         },
         {
            type:"choice",
            option:"Beta Support", //display
            value:"CONTROL", //expecting id
            constructor:Modalbox.selectPopulateAttachments, //correct later, must be set or will cause error
         }
      ], //arry to hold options, come in option,value pair objects. Can be dynamic later
      resolutions:[{display:"Close",event:Modalbox.closeModal,style:"modal-btn-close",}],
   };
   return self;
}

//
objectX = function() {
   //placeholder
}