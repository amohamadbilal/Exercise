var formContext = "";
function employees(executionContext) {
  formContext = executionContext.getFormContext();
  formContext.getAttribute("balbilal_relationship").addOnChange(function () {
    businessReq();
    addNotification();
  });
  retrieveAccessOrigin();
  formContext.getAttribute("balbilal_employeename").addOnChange(setFocus);
}

function retrieveAccessOrigin() {
  var Sdk = window.Sdk || {};
  var entityName = formContext.data.entity.getEntityName();
  var id = formContext.data.entity.getId();
  var userSettings = Xrm.Utility.getGlobalContext().userSettings;
  var currentUserId = userSettings.userId;

  Sdk.RetrieveAccess = function (objectId, logicalName, principalId) {
    this.ObjectId = objectId;
    this.LogicalName = logicalName;
    this.PrincipalId = principalId;
  };

  Sdk.RetrieveAccess.prototype.getMetadata = function () {
    return {
      boundParameter: null,
      parameterTypes: {
        ObjectId: {
          typeName: "Edm.Guid",
          structuralProperty: 1,
        },
        LogicalName: {
          typeName: "Edm.String",
          structuralProperty: 1,
        },
        PrincipalId: {
          typeName: "Edm.Guid",
          structuralProperty: 1,
        },
      },
      operationType: 1,
      operationName: "RetrieveAccessOrigin",
    };
  };
  var objectId = id;
  objectId = id.replace("{", "").replace("}", "");

  var logicalName = entityName + "s";
  var principalId = currentUserId;
  principalId = currentUserId.replace("{", "").replace("}", "");
  var retrieveAccess = new Sdk.RetrieveAccess(
    objectId,
    logicalName,
    principalId
  );

  Xrm.WebApi.online
    .execute(retrieveAccess)
    .then(function (response) {
      if (response.ok) {
        // If a response was received.
        console.log("Status:", response.status, response.statusText);
        alert("Status:" + response.status + response.statusText);

        // Use response.json() to access the content of the response body.
        return response.json();
      }
    })
    .then(function (responseBody) {
      //Do something with the response
      console.log("The response is:", responseBody);
      alert(
        "Since the user is System User, this record can be viewed" +
          responseBody
      );
    })
    .catch(function (error) {
      console.log(error.message);
      // handle error conditions
    });
}

function addNotification() {
  var rnName = formContext.getControl("balbilal_relationship");
  var rnNameVal = formContext.getAttribute("balbilal_relationship").getValue();
  var nameOfRn = formContext.data.entity.attributes.get("balbilal_ename");
  if (
    rnNameVal == 578550001 &&
    formContext.getAttribute("balbilal_relationship") != null
  ) {
    var actionsCol = {
      message: "Do you want to use the abbreviation Mrs.?",
      actions: null,
    };
    actionsCol.actions = [
      function () {
        nameOfRn.setValue("Mrs.");
        rnName.clearNotification("abv");
      },
    ];

    rnName.addNotification({
      actions: [actionsCol],
      messages: ["Set abbreviation as Mrs."],
      notificationLevel: "RECOMMENDATION",
      uniqueId: "abv",
    });
  } else {
    nameOfRn.setValue(null);
  }
}

function businessReq() {
  var rType = formContext.getAttribute("balbilal_relationship").getText();
  if (
    rType !== null &&
    formContext.getAttribute("balbilal_relationship") != null
  ) {
    var rName = formContext
      .getAttribute("balbilal_ename")
      .setRequiredLevel("required");
    var rMob = formContext
      .getAttribute("balbilal_emobileno")
      .setRequiredLevel("required");
    formContext.getAttribute("balbilal_employeename").fireOnChange();
  } else {
    var rName = formContext
      .getAttribute("balbilal_ename")
      .setRequiredLevel("recommended");
    var rMob = formContext
      .getAttribute("balbilal_emobileno")
      .setRequiredLevel("recommended");
  }
}

function setFocus() {
  var empName = formContext.getAttribute("balbilal_employeename").getValue();

  if (
    empName !== null &&
    formContext.getAttribute("balbilal_employeename") != null
  ) {
    formContext.getControl("balbilal_gender").setFocus();
  }
}
