var formContext = "";
function employees(executionContext) {
  formContext = executionContext.getFormContext();
  formContext.getAttribute("balbilal_relationship").addOnChange(function () {
    businessReq();
    addNotification();
  });
  formContext.getAttribute("balbilal_employeename").addOnChange(setFocus);
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
