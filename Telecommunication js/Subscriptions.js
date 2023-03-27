var formContext = "";

function subscriptions(executionContext) {
  formContext = executionContext.getFormContext();
  formContext
    .getAttribute("balbilal_associatedplanname")
    .addOnChange(retrievePlanPrice);
  formContext.getAttribute("balbilal_subduration").addOnChange(subPrice);
  formContext.getControl("balbilal_planprice").setDisabled(true);
  formContext.getControl("balbilal_subscriptionprice").setDisabled(true);
  formContext
    .getAttribute("balbilal_generatemonthlybill")
    .addOnChange(generateBills);

  // formContext.getControl("balbilal_duration").setDisabled(true);
  // formContext.getControl("balbilal_discount").setDisabled(true);
  // formContext.getAttribute("balbilal_enddate").addOnChange(dateCheckAndCalc);
  // createBillRecord();
  // updateBillRecord();
}

function retrievePlanPrice() {
  if (
    formContext.getAttribute("balbilal_associatedplanname").getValue() != null
  ) {
    var ID = formContext
      .getAttribute("balbilal_associatedplanname")
      .getValue()[0].id;
    Xrm.WebApi.retrieveRecord(
      "balbilal_service",
      ID,
      "?$select=balbilal_pricemonth"
    ).then(
      function success(result) {
        formContext
          .getAttribute("balbilal_planprice")
          .setValue(result.balbilal_pricemonth);
        formContext.getAttribute("balbilal_subduration").fireOnChange();
      },
      function (error) {
        console.log(error.message);
      }
    );
  } else {
    formContext.getAttribute("balbilal_planprice").setValue(null);
  }
}

function lockSubDuration() {
  var subDuration = formContext.getAttribute("balbilal_subduration").getValue();
  if (
    subDuration != null &&
    formContext.getAttribute("balbilal_subduration") != null
  ) {
    formContext.getControl("balbilal_subduration").setDisabled(true);
  }
}

function subPrice() {
  var planPrice = formContext.getAttribute("balbilal_planprice").getValue();
  var subDuration = formContext.getAttribute("balbilal_subduration").getValue();

  if (
    subDuration == 578550002 &&
    formContext.getAttribute("balbilal_planprice") != null &&
    formContext.getAttribute("balbilal_subduration") != null &&
    formContext.getAttribute("balbilal_subscriptionprice") != null
  ) {
    var subPrice = planPrice * 3;
    formContext.getAttribute("balbilal_subscriptionprice").setValue(subPrice);
  } else if (
    subDuration == 578550001 &&
    formContext.getAttribute("balbilal_planprice") != null &&
    formContext.getAttribute("balbilal_subduration") != null &&
    formContext.getAttribute("balbilal_subscriptionprice") != null
  ) {
    var subPrice = planPrice * 6;
    formContext.getAttribute("balbilal_subscriptionprice").setValue(subPrice);
  } else if (
    subDuration == 578550000 &&
    formContext.getAttribute("balbilal_planprice") != null &&
    formContext.getAttribute("balbilal_subduration") != null &&
    formContext.getAttribute("balbilal_subscriptionprice") != null
  ) {
    var subPrice = planPrice * 12;
    formContext.getAttribute("balbilal_subscriptionprice").setValue(subPrice);
  } else {
    formContext.getAttribute("balbilal_subscriptionprice").setValue(null);
  }
}

function generateBills() {
  var subNo = formContext
    .getAttribute("balbilal_telecomsubscriptionid")
    .getValue();
  var duration = formContext.getAttribute("balbilal_subduration").getText();
  var generateMonthlyBill = formContext
    .getAttribute("balbilal_generatemonthlybill")
    .getValue();
  var subPrice = formContext
    .getAttribute("balbilal_subscriptionprice")
    .getValue();
  var subId = formContext.data.entity.getId().replace("{", "").replace("}", "");

  if (duration != null && generateMonthlyBill === true) {
    var monthlyFee = subPrice / duration;

    Xrm.WebApi.retrieveRecord(
      "balbilal_subscription",
      subId,
      "?$select=balbilal_startdate"
    ).then(
      function success(result) {
        var subscriptionStartDate = result.balbilal_startdate;

        for (var i = 1; i <= duration; i++) {
          var billID = "B" + i + "-" + subNo;
          var remainingBills = duration - i;
          var billDate = new Date(subscriptionStartDate);
          billDate.setMonth(billDate.getMonth() + i);
          var billDateString = billDate.toISOString();
          var billDateSubString = billDateString.substring(0, 10);

          var dueDate = new Date(billDate);
          dueDate.setDate(dueDate.getDate() + 7);
          var dueDateString = dueDate.toISOString();
          var dueDateSubString = dueDateString.substring(0, 10);

          var newBill = {
            balbilal_telbillingid: billID,
            "balbilal_SubscriptionIDLP@odata.bind":
              "/balbilal_subscriptions(" + subId + ")",
            balbilal_billamount: monthlyFee,
            balbilal_billstatus: 578550000,

            balbilal_billfor: "Month " + i,
            balbilal_remainingbills: remainingBills.toString(),
            balbilal_subscriptionamount: subPrice,
            balbilal_billgeneratedon: billDateSubString,
            balbilal_duedate: dueDateSubString,
          };

          Xrm.WebApi.createRecord("balbilal_billing", newBill).then(
            function success(result) {
              console.log("Bill created with ID: " + result.id);
            },
            function (error) {
              console.log(error.message);
            }
          );
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
    alert(duration + " Bill records created");
  } else if (duration != null && generateMonthlyBill === false) {
    Xrm.WebApi.retrieveRecord(
      "balbilal_subscription",
      subId,
      "?$select=balbilal_startdate"
    ).then(
      function success(result) {
        var subscriptionStartDate1 = result.balbilal_startdate;

        var subDueDate = new Date(subscriptionStartDate1);
        subDueDate.setDate(subDueDate.getDate() + 7);
        var subDueDateString = subDueDate.toISOString();
        var subDueDateSubString = subDueDateString.substring(0, 10);

        var newSubBill = {
          balbilal_telbillingid: "BF" + "-" + subNo,
          "balbilal_SubscriptionIDLP@odata.bind":
            "/balbilal_subscriptions(" + subId + ")",
          balbilal_billamount: subPrice,
          balbilal_billstatus: 578550000,

          balbilal_billfor: duration + " Months",
          balbilal_remainingbills: "0",
          balbilal_subscriptionamount: subPrice,
          balbilal_billgeneratedon: subscriptionStartDate1,
          balbilal_duedate: subDueDateSubString,
        };
        Xrm.WebApi.createRecord("balbilal_billing", newSubBill).then(
          function success(result) {
            console.log("Bill created with ID: " + result.id);
            alert("Total Subscription Amount Bill Generated");
          },
          function (error) {
            console.log(error.message);
          }
        );
      },
      function (error) {
        console.log(error.message);
      }
    );
  }
}

// // setNotification
// function dateCheckAndCalc() {
//   var getStartDate = formContext.getAttribute("balbilal_startdate").getValue();
//   var getEndDate = formContext.getAttribute("balbilal_enddate").getValue();

//   if (
//     getStartDate >= getEndDate &&
//     formContext.getAttribute("balbilal_enddate") != null &&
//     formContext.getAttribute("balbilal_startdate") != null
//   ) {
//     formContext
//       .getControl("balbilal_enddate")
//       .setNotification(
//         "End date should be greater than and not equal to start date",
//         "eDate"
//       );
//     formContext.getAttribute("balbilal_subscriptionprice").setValue(null);
//     formContext.getAttribute("balbilal_duration").setValue(null);
//   }
//   // Final Price Calculation
//   else {
//     formContext.getControl("balbilal_enddate").clearNotification("eDate");

//     var duration = Math.round(
//       (getEndDate - getStartDate) / (24 * 60 * 60 * 1000)
//     );
//     var durationToString = duration.toString();

//     formContext
//       .getAttribute("balbilal_duration")
//       .setValue(durationToString + " days");

//     var planPrice = formContext.getAttribute("balbilal_planprice").getValue();
//     var discount = formContext.getAttribute("balbilal_discount").getValue();

//     var durationInMonths = duration / 30.4;
//     var totalPrice = durationInMonths * planPrice;
//     var finalPrice = totalPrice - discount;

//     formContext.getAttribute("balbilal_subscriptionprice").setValue(finalPrice);
//   }

//   // Discount Calculation
//   if (duration > 365 && formContext.getAttribute("balbilal_enddate") != null) {
//     var discount = (duration - 365) * 0.1;

//     formContext.getAttribute("balbilal_discount").setValue(discount);
//     formContext.getControl("balbilal_discount").setVisible(true);

//     alert(
//       "Discount of 10% is applied to the duration days exceeded after 365 days."
//     );
//   } else {
//     formContext.getControl("balbilal_discount").setVisible(false);
//     formContext.getAttribute("balbilal_discount").setValue(null);
//     alert(
//       "Since duration days are less than 365 days. No discount is applicable."
//     );
//   }
// }

// function createBillRecord() {
//   var data = {
//     "balbilal_telbillingid": "B0",
//     "balbilal_address": "38, West Street, Anna Nagar, Chennai.",
//     "balbilal_billinginterval": 578550003,
//     "balbilal_SubscriptionIDLP@odata.bind":
//       "/balbilal_subscriptions(5b529309-f75d-4b0a-a180-7ae912331862)",
//     "balbilal_billamount": 4000,
//     "balbilal_billgeneratedon": "2023-03-13",
//   };

//   // create account record
//   Xrm.WebApi.createRecord("balbilal_billing", data).then(
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

// function updateBillRecord() {
//   var data = {
//     "balbilal_telbillingid": "upda",
//     "balbilal_address": "38, West Street, Anna Nagar, Chennai.",
//     "balbilal_billinginterval": 578550003,
//     "balbilal_SubscriptionIDLP@odata.bind":
//       "/balbilal_subscriptions(5b529309-f75d-4b0a-a180-7ae912331862)",
//     "balbilal_billamount": 4000,
//     "balbilal_billgeneratedon": "2023-03-13",
//   };

//   // create account record
//   Xrm.WebApi.updateRecord(
//     "balbilal_billing",
//     "82a6c383-d7c7-ed11-b597-000d3a0a825c",
//     data
//   ).then(
//     function success(result) {
//       alert("Updated with ID: " + result.id);
//       // perform operations on record creation
//     },
//     function (error) {
//       console.log(error.message);
//       // handle error conditions
//     }
//   );
// }
