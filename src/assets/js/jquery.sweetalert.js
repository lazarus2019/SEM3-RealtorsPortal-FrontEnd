$(document).on("click", ".click-success", function () {
  swal("Good job!", "All your changes had saved!", "success")
});

$(document).on("click", ".click-error", function () {
  swal("Query error!", "Please try it again!", "error")
});

function errorAlert() {
  swal("Query error!", "Please try it again!", "error")
}

function successAlert() {
  swal("Good job!", "All your changes had saved!", "success")
}

var alertFunction = (function () {
  return {
    success: function (string) {
      swal("Good job!", string, "success")
    },
    error: function (string) {
      swal("Error!", string, "error")
    },
    yesNo: function () {
      swal({
        title: "Are you sure?",
        text: "dasdsad",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        }else{
          return false;
        }
      })
    }
  }
})(alertFunction || {})


function myFunc() {
  return alertFunction.yesNo();
}
