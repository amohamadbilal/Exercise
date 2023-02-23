function getAndAlert(executionContext) {
  var formContext = executionContext.getFormContext();

  // Subscription Entity OnSave
  // Text Field
  var subscriptionId = formContext
    .getAttribute("balbilal_telecomsubscriptionid")
    .getValue();
  alert("Subscription ID is " + subscriptionId);

  // Customer Lookup
  var customer = formContext
    .getAttribute("balbilal_customer")
    .getValue()[0].name;
  alert("Customer name is " + customer);

  // Lookup
  var planName = formContext
    .getAttribute("balbilal_associatedplanname")
    .getValue()[0].name;
  alert("Selected plan is " + planName);

  // Currency
  var price = formContext.getAttribute("balbilal_subscriptionprice").getValue();
  alert("Price for this subscription is Rs. " + price);

  // Option Set
  var billingInterval = formContext
    .getAttribute("balbilal_paymentplan")
    .getText();
  alert("Selected billing interval is " + billingInterval);

  // Dates
  // Start Date
  var startDate = formContext.getAttribute("balbilal_startdate").getValue();
  alert("Subscription start date is " + startDate);

  // End Date
  var endDate = formContext.getAttribute("balbilal_enddate").getValue();
  alert("Subscription end date is " + endDate);

  // Form save alert
  alert("Form is saved successfully!");
}

function setAndAlert(executionContext) {
  var formContext = executionContext.getFormContext();

  // Plan Entity OnLoad
  // Text Field
  formContext.getAttribute("balbilal_planname").setValue("BL");
  var planName = formContext.getAttribute("balbilal_planname").getValue();
  alert("Plan starts with " + planName);

  // Option Set
  formContext.getAttribute("balbilal_servicetype").setValue(578550002);
  var optionSet = formContext.getAttribute("balbilal_servicetype").getText();
  alert("Default Service Type is " + optionSet);

  // Currency
  formContext.getAttribute("balbilal_pricemonth").setValue(600);
  var currency = formContext.getAttribute("balbilal_pricemonth").getValue();
  alert(
    "Base plan price for Broadband and Landline service type is Rs. " + currency
  );
}

// Set Label - OnChange
function contact(executionContext) {
  var formContext = executionContext.getFormContext();
  var gender = formContext.getAttribute("gendercode").getValue();
  var marStatus = formContext.getAttribute("familystatuscode").getValue();
  var spouse = formContext.getControl("spousesname");

  if (gender == 1 && marStatus == 2) {
    spouse.setLabel("Wife's Name");
  } else if (gender == 2 && marStatus == 2) {
    spouse.setLabel("Husband's Name");
  } else {
    spouse.setLabel("Spouse/Partner Name");
  }
}

// x-----------------------------x

// Activity Entity OnChange
function activitySetAndAlert(executionContext) {
  var formContext = executionContext.getFormContext();
  // Lookup
  var eNameLookup = new Array();
  eNameLookup[0] = new Object();
  eNameLookup[0].id = "b8861c3c-e0a7-ed11-aacf-6045bda56711";
  eNameLookup[0].entityType = "balbilal_employee";
  eNameLookup[0].name = "Swathi";
  if (
    formContext.getAttribute("balbilal_activitytype").getValue() === 578550002
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

// Activity Entity
// Date - OnLoad
function activitySetDate(executionContext) {
  var formContext = executionContext.getFormContext();
  var todayDate = new Date();

  if (formContext.getAttribute("actualstart").getValue() == null) {
    formContext.getAttribute("actualstart").setValue(todayDate);
  }
  var activityStartDate = formContext.getAttribute("actualstart").getValue();
  alert("Activity Start Date and Time is: " + activityStartDate);
}

// Control
// Employee entity - OnChange
// Focus
function empControl(executionContext) {
  var formContext = executionContext.getFormContext();
  var empName = formContext.getAttribute("balbilal_employeename").getValue();

  if (empName !== null) {
    formContext.getControl("balbilal_gender").setFocus();
  }
}

// Plan Entity
// Set Visibility
function voiceHide(executionContext) {
  var formContext = executionContext.getFormContext();
  var serviceTypeBroadband = formContext
    .getAttribute("balbilal_servicetype")
    .getValue();

  if (serviceTypeBroadband === 578550000) {
    formContext.getControl("balbilal_voice").setVisible(false);
    formContext.getAttribute("balbilal_voice").setValue(null);
  } else {
    formContext.getControl("balbilal_voice").setVisible(true);
  }
}

// Plan Entity
// Set Disabled - OnChange
function disableForLandline(executionContext) {
  var formContext = executionContext.getFormContext();
  var serviceTypeLandline = formContext
    .getAttribute("balbilal_servicetype")
    .getValue();

  if (serviceTypeLandline === 578550001) {
    formContext.getAttribute("balbilal_allocateddata").setValue(null);
    formContext.getAttribute("balbilal_broadbandspeed").setValue(null);
    formContext.getAttribute("balbilal_uploadspeed").setValue(null);
    formContext.getControl("balbilal_allocateddata").setDisabled(true);
    formContext.getControl("balbilal_broadbandspeed").setDisabled(true);
    formContext.getControl("balbilal_uploadspeed").setDisabled(true);
  } else {
    formContext.getControl("balbilal_allocateddata").setDisabled(false);
    formContext.getControl("balbilal_broadbandspeed").setDisabled(false);
    formContext.getControl("balbilal_uploadspeed").setDisabled(false);
  }
}

// Subscription Entity
// Set Notification
function dateCheck(executionContext) {
  var formContext = executionContext.getFormContext();
  var getStartDate = formContext.getAttribute("balbilal_startdate").getValue();
  var getEndDate = formContext.getAttribute("balbilal_enddate").getValue();

  if (getStartDate >= getEndDate) {
    formContext
      .getControl("balbilal_enddate")
      .setNotification(
        "End date should be greater than and not equal to start date",
        "eDate"
      );
  } else {
    formContext.getControl("balbilal_enddate").clearNotification("eDate");
  }
}
