var formContext = "";
function accounts(executionContext) {
  formContext = executionContext.getFormContext();
  formContext.getAttribute("name").addOnChange(capitalize);
  formContext.getAttribute("name").addOnChange(setRequired);
  whoAmI();
  retrieveDuplicates();
  associate();
}

function whoAmI() {
  var Sdk = window.Sdk || {};
  /**
   * Request to execute WhoAmI function
   */
  Sdk.WhoAmIRequest = function () {};

  // NOTE: The getMetadata property should be attached to the function prototype instead of the
  //       function object itself.
  Sdk.WhoAmIRequest.prototype.getMetadata = function () {
    return {
      boundParameter: null,
      parameterTypes: {},
      operationType: 1, // This is a function. Use '0' for actions and '2' for CRUD
      operationName: "WhoAmI",
    };
  };

  // Construct a request object from the metadata
  var whoAmIRequest = new Sdk.WhoAmIRequest();

  // Use the request object to execute the function
  Xrm.WebApi.online
    .execute(whoAmIRequest)
    .then(function (response) {
      if (response.ok) {
        console.log("Status:", response.status, response.statusText);

        alert("Status:" + response.status + response.statusText);
        // Use response.json() to access the content of the response body.
        return response.json();
      }
    })
    .then(function (responseBody) {
      console.log("User Id: %s", responseBody.UserId);
      alert("User Id:" + responseBody.UserId);
      // perform other operations as required;
    })
    .catch(function (error) {
      console.log(error.message);
      // handle error conditions
    });
}

function retrieveDuplicates() {
  var Sdk = window.Sdk || {};

  Sdk.RetrieveDuplicatesRequest = function (
    businessEntity,
    matchingEntityName,
    pagingInfo
  ) {
    this.BusinessEntity = businessEntity;
    this.MatchingEntityName = matchingEntityName;
    this.PagingInfo = pagingInfo;
  };

  // NOTE: The getMetadata property should be attached to the function prototype instead of the
  // function object itself.
  Sdk.RetrieveDuplicatesRequest.prototype.getMetadata = function () {
    return {
      boundParameter: null,
      parameterTypes: {
        BusinessEntity: {
          typeName: "mscrm.crmbaseentity",
          structuralProperty: 5, // Entity Type
        },
        MatchingEntityName: {
          typeName: "Edm.String",
          structuralProperty: 1, // Primitive Type
        },
        PagingInfo: {
          typeName: "mscrm.PagingInfo", // Complex Type
          structuralProperty: 5,
        },
      },
      operationType: 1, // This is a function. Use '0' for actions and '2' for CRUD
      operationName: "RetrieveDuplicates",
    };
  };

  // Create a variable to point to a contact record and with specific data in the needed columns
  var contactRecord = {
    "@odata.type": "Microsoft.Dynamics.CRM.contact",
    firstname: "Sample",
    lastname: "Contact",
  };

  // Create a paging object to keep track of the current page and how many records we get per page
  var pagingInfo = {
    PageNumber: 1,
    Count: 10,
    ReturnTotalRecordCount: true,
  };

  // Create the variable retrieveDuplicatesRequest to build the request
  var retrieveDuplicatesRequest = new Sdk.RetrieveDuplicatesRequest(
    contactRecord,
    "contact",
    pagingInfo
  );

  // Use the request object to execute the function
  Xrm.WebApi.online
    .execute(retrieveDuplicatesRequest)
    .then(function (response) {
      if (response.ok) {
        console.log("Status: ", response.status, response.statusText);
        alert("Status: " + response.status + response.statusText);

        // Use response.json() to access the content of the response body.
        return response.json();
      }
    })
    .then(function (responseBody) {
      // Do something with the response
      console.log("The response is: ", responseBody);
      alert("The response is: " + responseBody);
    })
    .catch(function (error) {
      console.log(error.message);
      // handle error conditions
    });
}

function associate() {
  var Sdk = window.Sdk || {};

  /*
   * Request to execute an Associate operation.
   */
  Sdk.AssociateRequest = function (target, relatedEntities, relationship) {
    this.target = target;
    this.relatedEntities = relatedEntities;
    this.relationship = relationship;
  };

  // NOTE: The getMetadata property should be attached to the function prototype instead of the
  // function object itself.
  Sdk.AssociateRequest.prototype.getMetadata = function () {
    return {
      boundParameter: null,
      parameterTypes: {},
      operationType: 2, // Associate and Disassociate fall under the CRUD umbrella
      operationName: "Associate",
    };
  };

  // Construct the target EntityReference object
  var target = {
    entityType: "account",
    id: "a4cea450-cb0c-ea11-a813-000d3a1b1223",
  };

  // Construct the related EntityReferences that the Target will be associated with.
  var relatedEntities = [
    {
      entityType: "contact",
      id: "80ac35a0-01af-ea11-a812-000d3a8b3ec6",
    },
    {
      entityType: "contact",
      id: "79ae8582-84bb-ea11-a812-000d3a8b3ec6",
    },
  ];

  // The name of the existing relationship to associate on.
  var relationship = "contact_customer_accounts";

  var oneToManyAssociateRequest = new Sdk.AssociateRequest(
    target,
    relatedEntities,
    relationship
  );

  Xrm.WebApi.online
    .execute(oneToManyAssociateRequest)
    .then(function (response) {
      if (response.ok) {
        console.log("Status:", response.status, response.statusText);
        alert("Status:" + response.status + response.statusText);

        // The Associate request does not return any response body content. So we
        // need not access the response.json() property.

        // perform other operations as required;
      }
    })
    .catch(function (error) {
      console.log(error.message);
      // handle error conditions
    });
}

function capitalize() {
  var acName = formContext.getAttribute("name").getValue();
  if (acName != null && formContext.getAttribute("name") != null) {
    var capSlice = acName.slice(0, 1);
    var capFirstLetter = capSlice.toUpperCase();
    var smallSlice = acName.slice(1, acName.length);
    var smallRestOfLetter = smallSlice.toLowerCase();
    var capOnlyFirstRestSmall = capFirstLetter + smallRestOfLetter;
    formContext.getAttribute("name").setValue(capOnlyFirstRestSmall);
  }
}

function setRequired() {
  var acName = formContext.getAttribute("name").getValue();
  if (acName != null && formContext.getAttribute("name") != null) {
    var address1 = formContext
      .getAttribute("address1_line1")
      .setRequiredLevel("required");
    var city = formContext
      .getAttribute("address1_city")
      .setRequiredLevel("required");
    var state = formContext
      .getAttribute("address1_stateorprovince")
      .setRequiredLevel("required");
    var pincode = formContext
      .getAttribute("address1_postalcode")
      .setRequiredLevel("required");
    var country = formContext
      .getAttribute("address1_country")
      .setRequiredLevel("required");
  }
}
