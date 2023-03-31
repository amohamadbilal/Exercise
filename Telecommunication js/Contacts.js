var formContext = "";
function contacts(executionContext) {
  formContext = executionContext.getFormContext();
  formContext.getAttribute("gendercode").addOnChange(setLabel);
  formContext.getAttribute("familystatuscode").addOnChange(setLabel);
  formContext.getAttribute("familystatuscode").addOnChange(busnsRqd);
  LocalTimeUTC();
}

function LocalTimeUTC() {
  var Sdk = window.Sdk || {};

  Sdk.localTimeUtc = function (timeZoneCode, utcTime) {
    this.TimeZoneCode = timeZoneCode;
    this.UtcTime = utcTime;
  };

  Sdk.localTimeUtc.prototype.getMetadata = function () {
    return {
      boundParameter: null,
      parameterTypes: {
        TimeZoneCode: {
          typeName: "Edm.Int32",
          structuralProperty: 1,
        },
        UtcTime: {
          typeName: "Edm.DateTimeOffset",
          structuralProperty: 1,
        },
      },
      operationType: 1,
      operationName: "LocalTimeFromUtcTime",
    };
  };

  var localTimeFromUtc = new Sdk.localTimeUtc(120, "2023-03-30T04:04:00Z");

  Xrm.WebApi.online
    .execute(localTimeFromUtc)
    .then(function (response) {
      if (response.ok) {
        alert("LocalTime Status: " + response.status);
        return response.json();
      }
    })
    .then(function (responseBody) {
      alert("Local Time Response: " + responseBody.LocalTime);

      // var localTime = new Date(responseBody.LocalTime);
      // var localTimeString = localTime.toLocaleString();
      // alert("Local Time Response: " + localTimeString);
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

function setLabel() {
  var gender = formContext.getAttribute("gendercode").getValue();
  var marStatus = formContext.getAttribute("familystatuscode").getValue();
  var spouse = formContext.getControl("spousesname");

  if (
    gender == 1 &&
    marStatus == 2 &&
    formContext.getAttribute("gendercode") != null &&
    formContext.getAttribute("familystatuscode") != null
  ) {
    spouse.setLabel("Wife's Name");
    if (
      gender == 2 &&
      marStatus == 2 &&
      formContext.getAttribute("gendercode") != null &&
      formContext.getAttribute("familystatuscode") != null
    ) {
      spouse.setLabel("Husband's Name");
    }
  } else {
    spouse.setLabel("Spouse/Partner Name");
  }
}

function busnsRqd() {
  var marStatus = formContext.getAttribute("familystatuscode").getValue();
  if (marStatus == 2 && formContext.getAttribute("familystatuscode") != null) {
    var spouseRqd = formContext
      .getAttribute("spousesname")
      .setRequiredLevel("required");
    var annRqd = formContext
      .getAttribute("anniversary")
      .setRequiredLevel("required");
  }
}
