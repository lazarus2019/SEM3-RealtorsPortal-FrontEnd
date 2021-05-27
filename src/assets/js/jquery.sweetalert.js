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
        success: function (title, content) {
            swal({
                title: title,
                text: content,
                icon: "success",
                timer: 2000,
                button: false
            })
        },
        error: function (title, content) {
            swal({
                title: title,
                text: content,
                icon: "error",
                timer: 2000,
            })
        },
        payment: function () {
            swal("Good job!", "Payment success!", "success")
        }
    }
})(alertFunction || {})


