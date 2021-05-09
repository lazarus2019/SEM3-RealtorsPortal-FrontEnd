$(function () {
// Date Range Picker
            $('input[name="daterange"]').daterangepicker();
           $('input[name="singledatepicker"]').daterangepicker({
                singleDatePicker: true,
                showDropdowns: true
            });
});