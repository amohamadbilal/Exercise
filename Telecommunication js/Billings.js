var formContext = "";
function billings(executionContext) {
  formContext = executionContext.getFormContext();
  getNextAutoNumberValueRequest();
  // retrieveNoOfPaidBills();
  // createNewRecordCustomerLookup();
  // Last7DaysSumAmt()
}

function getNextAutoNumberValueRequest() {
  var Sdk = window.Sdk || {};

  Sdk.AutoNumber = function (entityName, attributeName) {
    this.EntityName = entityName;
    this.AttributeName = attributeName;
  };

  Sdk.AutoNumber.prototype.getMetadata = function () {
    return {
      boundParameter: null,
      parameterTypes: {
        EntityName: {
          typeName: "Edm.String",
          structuralProperty: 1,
        },
        AttributeName: {
          typeName: "Edm.String",
          structuralProperty: 1,
        },
      },
      operationType: 0,
      operationName: "GetNextAutoNumberValue",
    };
  };

  var autoNumber = new Sdk.AutoNumber(
    "balbilal_billing",
    "balbilal_autonumber"
  );

  Xrm.WebApi.online
    .execute(autoNumber)
    .then(function (response) {
      if (response.ok) {
        alert("Status: " + response.status);
        return response.json();
      }
    })
    .then(function (responseBody) {
      alert("Next Auto Generate Number is" + responseBody.NextAutoNumberValue);
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

// function retrieveNoOfPaidBills() {
//   var entity = "balbilal_billing";
//   var FetchXML =
//     "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
//     "  <entity name='balbilal_billing'>" +
//     "    <attribute name='balbilal_billingid' />" +
//     "    <attribute name='balbilal_telbillingid' />" +
//     "    <attribute name='createdon' />" +
//     "    <attribute name='balbilal_billamount' />" +
//     "    <order attribute='balbilal_telbillingid' descending='false' />" +
//     "    <filter type='and'>" +
//     "      <condition attribute='balbilal_billamount' operator='not-null' />" +
//     "      <condition attribute='balbilal_billgeneratedon' operator='last-seven-days' />" +
//     "    </filter>" +
//     "  </entity>" +
//     "</fetch>";
//   FetchXML = "?fetchXml=" + encodeURIComponent(FetchXML);

//   Xrm.WebApi.retrieveMultipleRecords(entity, FetchXML).then(
//     function success(result) {
//       var sumAmt = 0;
//       for (var i = 0; i < result.entities.length; i++) {
//         sumAmt += result.entities[i].balbilal_billamount;
//       }
//       alert("Total Last week payment " + sumAmt);
//     },
//     function (error) {
//       // Handle error conditions
//       console.log(error.message);
//     }
//   );
// }

// function createNewRecordCustomerLookup() {
//   var data = {
//     "balbilal_Customer_contact@odata.bind":
//       "/contacts(ae7fbbb6-ffae-ea11-a812-000d3a8b3ec6)",
//     "balbilal_telecomsubscriptionid": "S0",
//   };
//   // create account record
//   Xrm.WebApi.createRecord("balbilal_subscription", data).then(
//     function success(result) {
//       alert("Account created with ID: " + result.id);
//       // perform operations on record creation
//     },
//     function (error) {
//       console.log(error.message);
//       // handle error conditions
//     }
//   );
// }

// function retrieveNoOfSubns() {
//   var entity = "balbilal_subscription";
//   var ID = formContext.data.entity.getId();
//   var FetchXML =
//     "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
//     "  <entity name='balbilal_subscription'>" +
//     "    <attribute name='balbilal_subscriptionid' />" +
//     "    <attribute name='balbilal_telecomsubscriptionid' />" +
//     "    <attribute name='createdon' />" +
//     "    <order attribute='balbilal_telecomsubscriptionid' descending='false' />" +
//     "    <filter type='and'>" +
//     "      <condition attribute='balbilal_associatedplanname' operator='eq' value='" +
//     ID +
//     "' />" +
//     "    </filter>" +
//     "  </entity>" +
//     "</fetch>";

//   FetchXML = "?fetchXml=" + encodeURIComponent(FetchXML);

//   Xrm.WebApi.retrieveMultipleRecords(entity, FetchXML).then(
//     function success(result) {
//       for (var i = 0; i < result.entities.length; i++) {}
//       formContext
//         .getAttribute("balbilal_noofsubscriptions")
//         .setValue(result.entities.length);
//     },
//     function (error) {
//       // Handle error conditions
//       console.log(error.message);
//     }
//   );
// }

// function Last7DaysSumAmt() {
//   var entity = "balbilal_billing"
//   Xrm.WebApi.retrieveMultipleRecords(
//     entity,
//     "?$filter=balbilal_billgeneratedon ge 2023-03-17T00:00:00Z and balbilal_billgeneratedon le 2023-03-23T00:00:00Z"
//   ).then(
//     function success(result) {
//       console.log(result.message);
//       var sumAmt = 0;
//       for (var i = 0; i < result.entities.length; i++) {
//         sumAmt += result.entities[i].balbilal_billamount;
//       }
//       alert("Last Seven Days Sum Amount Of Bill is " + sumAmt);
//     },
//     function (error) {
//       console.log(error.message);
//     }
//   );
// }
