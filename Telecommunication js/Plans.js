var formContext = "";
function plans(executionContext) {
  formContext = executionContext.getFormContext();

  formContext.getAttribute("balbilal_servicetype").addOnChange(voiceHide);
  formContext.getAttribute("balbilal_servicetype").addOnChange(lockFields);
  retrieveNoOfSubns();
  // formContext.getAttribute("balbilal_broadbandspeed").addOnChange(RemoveOption);
  // deleteRecord();
  // formContext.getAttribute("balbilal_planname").addOnChange(setPlanName);
}

// showHide
function voiceHide() {
  var serviceTypeBroadband = formContext
    .getAttribute("balbilal_servicetype")
    .getValue();

  if (
    serviceTypeBroadband === 578550000 &&
    formContext.getAttribute("balbilal_servicetype") != null
  ) {
    formContext.getControl("balbilal_voice").setVisible(false);
    formContext.getAttribute("balbilal_voice").setValue(null);
  } else {
    formContext.getControl("balbilal_voice").setVisible(true);
  }
}

// setDisabled
function lockFields() {
  var serviceTypeLandline = formContext
    .getAttribute("balbilal_servicetype")
    .getValue();

  if (
    serviceTypeLandline === 578550001 &&
    formContext.getAttribute("balbilal_servicetype") != null
  ) {
    formContext.getAttribute("balbilal_allocateddata").setValue(null);
    formContext.getAttribute("balbilal_broadbandspeed").setValue(null);
    formContext.getAttribute("balbilal_uploadspeed").setValue(null);
    formContext.getControl("balbilal_allocateddata").setDisabled(true);
    formContext.getControl("balbilal_broadbandspeed").setDisabled(true);
    formContext.getControl("balbilal_uploadspeed").setDisabled(true);
    formContext.getAttribute("balbilal_planname").removeOnChange(setPlanName);
  } else {
    formContext.getControl("balbilal_allocateddata").setDisabled(false);
    formContext.getControl("balbilal_broadbandspeed").setDisabled(false);
    formContext.getControl("balbilal_uploadspeed").setDisabled(false);
  }
}

function retrieveNoOfSubns() {
  var entity = "balbilal_subscription";
  var ID = formContext.data.entity.getId();
  var FetchXML =
    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
    "  <entity name='balbilal_subscription'>" +
    "    <attribute name='balbilal_subscriptionid' />" +
    "    <attribute name='balbilal_telecomsubscriptionid' />" +
    "    <attribute name='createdon' />" +
    "    <order attribute='balbilal_telecomsubscriptionid' descending='false' />" +
    "    <filter type='and'>" +
    "      <condition attribute='balbilal_associatedplanname' operator='eq' value='" +
    ID +
    "' />" +
    "    </filter>" +
    "  </entity>" +
    "</fetch>";

  FetchXML = "?fetchXml=" + encodeURIComponent(FetchXML);

  Xrm.WebApi.retrieveMultipleRecords(entity, FetchXML).then(
    function success(result) {
      for (var i = 0; i < result.entities.length; i++) {}
      formContext
        .getAttribute("balbilal_noofsubscriptions")
        .setValue(result.entities.length);
    },
    function (error) {
      // Handle error conditions
      console.log(error.message);
    }
  );
}

// function RemoveOption() {
//   var dwlSpeed = formContext.getAttribute("balbilal_broadbandspeed").getValue();
//   if (
//     dwlSpeed == 578550000 &&
//     formContext.getAttribute("balbilal_broadbandspeed") != null
//   ) {
//     formContext.getControl("balbilal_uploadspeed").removeOption(578550002);
//     formContext.getControl("balbilal_uploadspeed").removeOption(578550003);
//   }
//   if (
//     dwlSpeed == 578550001 &&
//     formContext.getAttribute("balbilal_broadbandspeed") != null
//   ) {
//     formContext.getControl("balbilal_uploadspeed").removeOption(578550000);
//     formContext.getControl("balbilal_uploadspeed").removeOption(578550003);
//   }
//   if (
//     dwlSpeed == 578550002 &&
//     formContext.getAttribute("balbilal_broadbandspeed") != null
//   ) {
//     formContext.getControl("balbilal_uploadspeed").removeOption(578550000);
//     formContext.getControl("balbilal_uploadspeed").removeOption(578550001);
//   }
//   if (
//     dwlSpeed == 578550004 &&
//     formContext.getAttribute("balbilal_broadbandspeed") != null
//   ) {
//     formContext.getControl("balbilal_uploadspeed").removeOption(578550000);
//     formContext.getControl("balbilal_uploadspeed").removeOption(578550001);
//     formContext.getControl("balbilal_uploadspeed").removeOption(578550002);
//   }
// }

// function setPlanName() {
//   var planName = formContext.getAttribute("balbilal_planname").getValue();
//   if (
//     planName !== null &&
//     formContext.getAttribute("balbilal_planname") != null
//   ) {
//     formContext.getAttribute("balbilal_pricemonth").setValue(600);
//   } else {
//     formContext.getAttribute("balbilal_pricemonth").setValue(null);
//   }
// }
// function deleteRecord() {
//   Xrm.WebApi.deleteRecord(
//     "balbilal_billing",
//     "92f89fef-d7c7-ed11-b597-000d3a0a825c"
//   ).then(
//     function success(result) {
//       alert("Deleted Record ID is: " + result.id);
//       // perform operations on record deletion
//     },
//     function (error) {
//       console.log(error.message);
//       // handle error conditions
//     }
//   );
// }
