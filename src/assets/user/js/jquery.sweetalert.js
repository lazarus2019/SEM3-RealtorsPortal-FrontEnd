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
    swal("Thanks !", "All message had send ", "success")
  }
  
  var alertFunction = (function () {
    return {
      success: function (string) {
        swal("Thanks!", string, "success")
      },
      error: function (string) {
        swal("Query error!", string, "error")
      },
      yesNo: function () {
        swal({
          title: "Are you sure?",
          text: "dasdsad",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }),
          function callBackFunc() {
            return true;
          }
      }
    }
  })(alertFunction || {})
  
  
  function myFunc(param) {
    return param;
  }