﻿//configuring clndr.js
$(document).ready(function () {
    //RequestData
    // Assuming you've got the appropriate language files,
    // clndr will respect whatever moment's language is set to.

    moment.locale("ru");

    // Here's some magic to make sure the dates are happening this month.
    var thisMonth = moment().format('DD-MM-YYYY');

    // The order of the click handlers is predictable. Direct click action
    // callbacks come first: click, nextMonth, previousMonth, nextYear,
    // previousYear, nextInterval, previousInterval, or today. Then
    // onMonthChange (if the month changed), inIntervalChange if the interval
    // has changed, and finally onYearChange (if the year changed).

    var schedule = $('#schedule').clndr({

        moment: moment,

        numberOfRows: 5,

        dateParameter: 'Date',

        trackSelectedDate: true,

        clickEvents: {
            //dont use a selected date in click handlers because a seleceted date is setted after invoking click handlers
            click: function (target) {

                PatientRecordsList.DeleteAll();

                //as ISO
                var Start = moment(target.date).format(0);
                var End = moment(target.date).add({ days: 1 }).format(0);


                $.ajax({
                    url: "PatientRecords",
                    dataType: "json",
                    cache: false,
                    data: {
                        DoctorId: RequestData.DoctorId,
                        StartDateTime: Start,
                        EndDateTime: End
                    },
                    success: function (response) {

                        PatientRecordsList.Add(response);
                    }
                });

                //

            },
            today: function () {
                console.log('Cal-1 today');
            },
            nextMonth: function () {

                schedule.removeEvents(function () {
                    return true;
                });

                schedule.getRelieves();

            },
            previousMonth: function () {

                schedule.removeEvents(function () {
                    return true;
                });

                schedule.getRelieves();

            },
            onMonthChange: function () {
                console.log('Cal-1 month changed');
            },
            nextYear: function () {
                console.log('Cal-1 next year');
            },
            previousYear: function () {
                console.log('Cal-1 previous year');
            },
            onYearChange: function () {
                console.log('Cal-1 year changed');
            },
            nextInterval: function () {
                console.log('Cal-1 next interval');
            },
            previousInterval: function () {
                console.log('Cal-1 previous interval');
            },
            onIntervalChange: function () {
                console.log('Cal-1 interval changed');
            }
        },
        doneRendering: function () {

        },
        showAdjacentMonths: true,
        adjacentDaysChangeMonth: false,
        template: $("#scheduletemplate").html()
    });

    schedule.getRelievesByDateComp = function (year, month, day) {

        schedule.removeEvents(function (event) {
            var curr = moment(event.Date);
            console.log(year);
            if (curr.get("year") == year || year == undefined)
                if (curr.get("month") == month - 1 || month == undefined)
                    if (curr.get("date") == day || day == undefined)
                        return true;

            return false;

        });

        $.ajax({
            url: "Relieves",
            dataType: "json",
            cache: false,
            data: {
                DoctorId: RequestData.DoctorId,
                year: year,
                month: month,
                day: day,
                WithRecordsCount: "true"
            },
            success: function (response) {
                schedule.addEvents(response);
            }
        });

    };

    schedule.getRelievesByMomentObj = function (Date) {
        console.log(Date);
        schedule.getRelievesByDateComp(Date.get("year"), parseInt(Date.get("month")) + 1, Date.get("Date"));
    }

    schedule.getRelieves = function () {

        //by default current month
        var currDate = schedule.intervalStart;

        schedule.getRelievesByDateComp(currDate.format("YYYY"), currDate.format("MM"));


    };
    //
    var PatientRecordsList = new ListView({
        container: $("#PatientRecordsList"),
        itemTag: "tr",
        template: $("#PatientRecordTemplate").html()
    });

    //

    InitDynamicModal("#WriteCheckUpInfoModal", {
        "WriteCheckUpInfo": function (modal, form, initiator) {

            var id = $(initiator).closest(".ListItem").attr("id");

            var data = PatientRecordsList.getDataElement(id);

            $(form).find("[name=RecordId]").val(data["Id"]);

            //it's for  a trigger reset
            $(form).find("[type=checkbox]").triggerHandler("change");   
        }
    },
    {
        "WriteCheckUpInfo": function (form, initiator, response) {

            schedule.getRelievesByMomentObj(moment(schedule.options.selectedDate));

            $("#schedule .day.selected").trigger("click");

        }
    });

    function init() {

        schedule.getRelieves();

        $("#schedule .today").trigger("click");

    }

    init();

});