var formContext = "";
function telecomServiceActivities(executionContext) {
  formContext = executionContext.getFormContext();

  activitySetDate();
  formContext.getAttribute("balbilal_activitytype").addOnChange(setEmpLookup);
}

// setDate
function activitySetDate() {
  var todayDate = new Date();

  if (
    formContext.getAttribute("actualstart").getValue() == null &&
    formContext.getAttribute("actualstart") != null
  ) {
    formContext.getAttribute("actualstart").setValue(todayDate);
  }
  var activityStartDate = formContext.getAttribute("actualstart").getValue();
  alert("Activity Start Date and Time is: " + activityStartDate);
}

// setLookupDynamic
function setEmpLookup() {
  var eNameLookup = new Array();
  eNameLookup[0] = new Object();
  eNameLookup[0].id = "b8861c3c-e0a7-ed11-aacf-6045bda56711";
  eNameLookup[0].entityType = "balbilal_employee";
  eNameLookup[0].name = "Swathi";

  if (
    formContext.getAttribute("balbilal_activitytype").getValue() ===
      578550002 &&
    formContext.getAttribute("balbilal_activitytype") != null
  ) {
    formContext.getAttribute("balbilal_employeename").setValue(eNameLookup);
    eNameLookup = formContext
      .getAttribute("balbilal_employeename")
      .getValue()[0].name;
    alert(
      "For the selected activity type. This the recommended employee. " +
        eNameLookup
    );
  } else {
    formContext.getAttribute("balbilal_employeename").setValue(null);
  }
}

