import { Config } from 'config';

/* This page is currently unused */

var teachers = {}
var classes = {}
var time = {}
var schedule = {}
var locations = {}

var gotData = {}
function resetData() {
    gotData = {
        'teachers': false,
        'classes': false,
        'time': false,
        'schedule': false,
        'locations': false
    }
}

function checkData() {
    return gotData.teachers && gotData.classes && gotData.time && gotData.schedule && gotData.locations
}

var ready = false;

function getData() {
    resetData();
    Config.time.getDay((day) => {
        time = {
            'week': day.week,
            'day': day.day,
            'period': day.period
        };
        gotData.time = true;
        verifyData();
        Config.time.getSchedule(Config.time.toString(day, true), (scheduleData) => {
            schedule = scheduleData;
            gotData.schedule = true;
            verifyData();
        })
    });
    Config.classes.get((classList) => { classes = classList; gotData.classes = true;
        verifyData();
    });
    Config.locations.get((locationList) => { locations = locationList; gotData.locations = true;
        verifyData();
    });
    Config.teachers.get((teachersData) => {
        teachers = teachersData
        gotData.teachers = true;
        verifyData();
    });
}

function verifyData() {
    if (!checkData()) return;

    setReady();
}

function setReady() {
    ready = true;
    var dataReadyEvent = new Event('dataready')
    document.dispatchEvent(dataReadyEvent);
}

export default { 'getData': getData }
export { getData }
