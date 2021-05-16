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
        success: function () {
            swal("Good job!", "All your changes had saved!", "success")
        },
        error: function () {
            swal("Query error!", "Please try it again!", "error")
        },
        block: function (title, content) {
            swal({
                title: title,
                text: content,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((isConfirm) => {
                    if (isConfirm) {

                        swal("Block successful!", {
                            icon: "success",   
                            buttons: false,
                            timer: 1500, 
                        })
                    }
                });
        },
        unblock: function (title, content) {
            swal({
                title: title,
                text: content,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((isConfirm) => {
                if(isConfirm) {
                    swal("Unblock successful!", {
                        icon: "success",
                        buttons: false,
                        timer: 1500
                    })
                }
            });
                
        },
        deactivate: function (title, content) {
            swal({
                title: title,
                text: content,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        swal("Deactivate successful!", {
                            icon: "success",   
                            buttons: false,
                            timer: 1500
                        })
                    }
                });
        },
        activate: function (title, content) {
            swal({
                title: title,
                text: content,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        swal("Activate successful!", {
                            icon: "success",   
                            buttons: false,
                            timer: 1500
                        })
                    }
                });
        },
        delete: function (title, content) {
            swal({
                title: title,
                text: content,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        swal("Delete successful!", {
                            icon: "success",   
                            buttons: false,
                            timer: 1500                         
                        })
                    }
                });
        }
    }
})(alertFunction || {})


