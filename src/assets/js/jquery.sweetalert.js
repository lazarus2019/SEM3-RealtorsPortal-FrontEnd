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

var alertFunction = (function(){
    return {
        success: function(){
            swal("Good job!", "All your changes had saved!", "success")
        },
        error: function(){
            swal("Query error!", "Please try it again!", "error")
        }
    }
})(alertFunction||{})