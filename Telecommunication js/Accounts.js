var formContext = "";
function accounts(executionContext) {
  formContext = executionContext.getFormContext();
  formContext.getAttribute("name").addOnChange(capitalize);
  formContext.getAttribute("name").addOnChange(setRequired);
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
