var formContext = "";
function contacts(executionContext) {
  formContext = executionContext.getFormContext();
  formContext.getAttribute("gendercode").addOnChange(setLabel);
  formContext.getAttribute("familystatuscode").addOnChange(setLabel);
  formContext.getAttribute("familystatuscode").addOnChange(busnsRqd);
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
