var formContext = "";
//Activity Entity
function activityOnLoad(executionContext) {
  formContext = executionContext.getFormContext();

  activitySetDate();
  formContext.getAttribute("balbilal_activitytype").addOnChange(setEmpLookup);
}

// setDate
function activitySetDate() {
  var todayDate = new Date();

  if (formContext.getAttribute("actualstart").getValue() == null) {
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
// -----------------------------------------------------------------------

// Subscription Entity
function subOnLoad(executionContext) {
  formContext = executionContext.getFormContext();

  formContext.getControl("balbilal_planprice").setDisabled(true);
  formContext.getControl("balbilal_subscriptionprice").setDisabled(true);
  formContext.getControl("balbilal_duration").setDisabled(true);
  formContext.getControl("balbilal_discount").setDisabled(true);

  formContext.getAttribute("balbilal_enddate").addOnChange(dateCheckAndCalc);
}

// setNotification
function dateCheckAndCalc() {
  var getStartDate = formContext.getAttribute("balbilal_startdate").getValue();
  var getEndDate = formContext.getAttribute("balbilal_enddate").getValue();

  if (getStartDate >= getEndDate) {
    formContext
      .getControl("balbilal_enddate")
      .setNotification(
        "End date should be greater than and not equal to start date",
        "eDate"
      );
    formContext.getAttribute("balbilal_subscriptionprice").setValue(null);
    formContext.getAttribute("balbilal_duration").setValue(null);
  }
  // Final Price Calculation
  else {
    formContext.getControl("balbilal_enddate").clearNotification("eDate");

    var duration = Math.round(
      (getEndDate - getStartDate) / (24 * 60 * 60 * 1000)
    );
    var durationToString = duration.toString();

    formContext
      .getAttribute("balbilal_duration")
      .setValue(durationToString + " days");

    var planPrice = formContext.getAttribute("balbilal_planprice").getValue();
    var discount = formContext.getAttribute("balbilal_discount").getValue();

    var durationInMonths = duration / 30.4;
    var totalPrice = durationInMonths * planPrice;
    var finalPrice = totalPrice - discount;

    formContext.getAttribute("balbilal_subscriptionprice").setValue(finalPrice);
  }

  // Discount Calculation
  if (duration > 365) {
    var discount = (duration - 365) * 0.1;

    formContext.getAttribute("balbilal_discount").setValue(discount);
    formContext.getControl("balbilal_discount").setVisible(true);

    alert(
      "Discount of 10% is applied to the duration days exceeded after 365 days."
    );
  } else {
    formContext.getControl("balbilal_discount").setVisible(false);
    formContext.getAttribute("balbilal_discount").setValue(null);
    alert(
      "Since duration days are less than 365 days. No discount is applicable."
    );
  }
}
// -----------------------------------------------------------------------

// Plan Entity
function planOnLoad(executionContext) {
  formContext = executionContext.getFormContext();

  formContext.getAttribute("balbilal_servicetype").addOnChange(voiceHide);
  formContext.getAttribute("balbilal_servicetype").addOnChange(lockFields);
  formContext.getAttribute("balbilal_planname").addOnChange(setPlanName);
}
// setVisibility;
function voiceHide() {
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

// setDisabled
function lockFields() {
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
    formContext.getAttribute("balbilal_planname").removeOnChange(setPlanName);
  } else {
    formContext.getControl("balbilal_allocateddata").setDisabled(false);
    formContext.getControl("balbilal_broadbandspeed").setDisabled(false);
    formContext.getControl("balbilal_uploadspeed").setDisabled(false);
  }
}

function setPlanName() {
  var planName = formContext.getAttribute("balbilal_planname").getValue();
  if (planName !== null) {
    formContext.getAttribute("balbilal_pricemonth").setValue(600);
  } else {
    formContext.getAttribute("balbilal_pricemonth").setValue(null);
  }
}

// -----------------------------------------------------------------------

// Contact Entity
function contactOnLoad(executionContext) {
  formContext = executionContext.getFormContext();

  formContext.getAttribute("gendercode").addOnChange(setSpouseLabel);
  formContext.getAttribute("familystatuscode").addOnChange(setSpouseLabel);
}
//  setLabelDynamic
function setSpouseLabel() {
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
// -----------------------------------------------------------------------

// Employee Entity
function empOnLoad(executionContext) {
  formContext = executionContext.getFormContext();

  formContext.getAttribute("balbilal_employeename").addOnChange(setFocus);
  formContext.getAttribute("balbilal_relationship").addOnChange(function () {
    businessReq();
    addNotification();
  });
}
// setFocus
function setFocus() {
  var empName = formContext.getAttribute("balbilal_employeename").getValue();

  if (empName !== null) {
    formContext.getControl("balbilal_gender").setFocus();
  }
}

function businessReq() {
  var rType = formContext.getAttribute("balbilal_relationship").getText();
  if (rType !== null) {
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
// -----------------------------------------------------------------------

// Subscription Entity - OnSave
// Text Field
function getAndAlert(executionContext) {
  formContext = executionContext.getFormContext();

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
// --------------------------------------------------------------------

// Plan Entity OnLoad

// function setAndAlert(executionContext) {
//   formContext = executionContext.getFormContext();
//   // Text Field
//   if (formContext.getAttribute("balbilal_planname").getValue() == null) {
//     formContext.getAttribute("balbilal_planname").setValue("BL");
//     var planName = formContext.getAttribute("balbilal_planname").getValue();
//     alert("Plan starts with " + planName);
//   }
//   // Option Set
//   if (formContext.getAttribute("balbilal_servicetype").getValue() == null) {
//     formContext.getAttribute("balbilal_servicetype").setValue(578550002);
//     var optionSet = formContext.getAttribute("balbilal_servicetype").getText();
//     alert("Default Service Type is " + optionSet);
//   }
//   // Currency
//   if (formContext.getAttribute("balbilal_pricemonth").getValue() == null) {
//     formContext.getAttribute("balbilal_pricemonth").setValue(600);
//     var currency = formContext.getAttribute("balbilal_pricemonth").getValue();
//     alert(
//       "Base plan price for Broadband and Landline service type is Rs. " +
//         currency
//     );
//   }
// }

function account(executionContext) {
  formContext = executionContext.getFormContext();
  formContext.getAttribute("address1_city").addOnChange(getFormat);
  alertFormTypeCreate();
  setEntityName();
  formContext.getAttribute("name").addOnChange(setLabelSec);
  formContext.getAttribute("websiteurl").addOnChange(setVisibleSec);
  formContext.getAttribute("address1_line1").addOnChange(setFocusTab);
  formContext.getAttribute("address1_line2").addOnChange(setFormNotify);
  formContext.getAttribute("address1_line3").addOnChange(clearNotification);
  // formContext.ui.tabs.get("DETAILS_TAB").addTabStateChange(tabChange);
}

// setLabel - Section
function setLabelSec() {
  var getDetailsTab = formContext.ui.tabs.get("DETAILS_TAB");
  var getSec = getDetailsTab.sections.get("COMPANY_PROFILE");
  var acName = formContext.getAttribute("name").getValue();

  if (acName == "setLabel" && formContext.getAttribute("name") != null) {
    var setSec = getSec.setLabel(acName);

    alert("In details tab section name Company profile changed to" + acName);
  }
}

// setVisible - Section

function setVisibleSec() {
  var getDetailsTab = formContext.ui.tabs.get("DETAILS_TAB");
  var getDescpSec = getDetailsTab.sections.get("DETAILS_TAB_section_6");
  var getUrl = formContext.getAttribute("websiteurl").getValue();

  if (
    getUrl == "https://setVisible" &&
    formContext.getAttribute("websiteurl") != null
  ) {
    var setSecVisible = getDescpSec.setVisible(false);
    alert("In details tab, section description visibility is hidden.");
  } else {
    alert("In details tab, section description visibility is displayed.");

    var setSecVisible = getDescpSec.setVisible(true);
  }
}
// setFocus - Tab
function setFocusTab() {
  var getDetails = formContext.ui.tabs.get("DETAILS_TAB");
  var address1 = formContext.getAttribute("address1_line1").getValue();
  if (
    address1 == "setFocus" &&
    formContext.getAttribute("address1_line1") != null
  ) {
    var focus = getDetails.setFocus();
    alert("Focus set to details tab.");
  }
}

// // addTabStateChange - Tab
// function tabChange() {
//   var getDetails = formContext.ui.tabs.get("DETAILS_TAB");

//   if (getDetails != null) {
//     getDetails.sections
//       .get("DETAILS_TAB_section_6")
//       .setValue("Tab change function");
//   }
// }
// getFormType
function alertFormTypeCreate() {
  var formtype = formContext.ui.getFormType();

  if (formtype == 1) {
    alert("Get Form Type");
  }
}
// setEntityName
function setEntityName() {
  var formtype = formContext.ui.getFormType();
  if (formtype == 1) {
    var setFormType = formContext.ui.setFormEntityName(
      "Create New Account Record"
    );
    alert("Entity Form Name Changed");
  }
}

function setFormNotify() {
  var address2 = formContext.getAttribute("address1_line2").getValue();

  if (
    address2 == "setFormNotification" &&
    formContext.getAttribute("address1_line2") != null
  ) {
    formContext.ui.setFormNotification("Form Notification", "INFO", "SFN");
  }
}

function clearNotification() {
  var address3 = formContext.getAttribute("address1_line3").getValue();

  if (
    address3 == "clearNotification" &&
    formContext.getAttribute("address1_line3") != null
  ) {
    formContext.ui.clearFormNotification("SFN");
  }
}

function getFormat() {
  var city = formContext.getAttribute("address1_city").getValue();

  if (city == "getFormat" && formContext.getAttribute("address1_city") != null)
    var format = formContext.getAttribute("websiteurl").getFormat();
  alert("The fomat type of the website field is: " + format);
}

// addNotification - Employee Entity
function addNotification() {
  var rnName = formContext.getControl("balbilal_relationship");
  var rnNameVal = formContext.getAttribute("balbilal_relationship").getValue();
  var nameOfRn = formContext.data.entity.attributes.get("balbilal_ename");
  if (rnNameVal == 578550001) {
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
