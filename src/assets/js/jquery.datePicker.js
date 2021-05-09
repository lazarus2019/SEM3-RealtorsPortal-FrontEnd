$(function () {
    // Date Range Picker
    $('input[name="daterange"]').daterangepicker();
    $('input[name="singledatepicker"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true
    });
    // Date and Time Picker
    $('input[name="daterange"]').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        locale: {
            format: 'MM/DD/YYYY h:mm A'
        }
    });
});

