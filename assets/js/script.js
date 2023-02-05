const dateDisplayEl = $('#currentDay');
const plannerTableEl = $('#tableSection');

// Key
let hour = 9;
let storedTasks = [];
console.log(storedTasks);
initialise()

// Task 2: Present timeblocks for standard business hours when the user scrolls down.
function timeSlotGeneration() {

    for (let i = 0; i < 9; i++) {
        let time = moment(hour, "hh").format("hA");

        //Row for time slot
        const timeSlot = $("<div>").addClass("row time-block mx-auto");

        // Section for Hour
        const hourText = $("<h5>").addClass("hourtext text-right").text(time)
        const hourEl = $("<div>").addClass("hour col-1").append(hourText);

        // Task 4: Allow a user to enter an event when they click a timeblock
        // User input area for text entry
        const taskEntry = $("<textarea>").addClass(" overflow-auto text-dark col-8").text("").attr("id", time);
        colourCodeTimeBackground(taskEntry);

        // Save Button block at end of row 
        const saveIcon = $("<span>").addClass("fa fa-save");
        const saveButton = $("<button>").addClass("btn saveBtn col-1").append(saveIcon);

        // Appending hour, text entry and button to time slot
        timeSlot.append(
            hourEl,
            taskEntry,
            saveButton,);

        //Append Time slot to Planner table area

        plannerTableEl.append(timeSlot);

        // Task 5: Save the event in local storage when the save button is clicked in that timeblock.
        // Event Listener for Save Button
        $(saveButton).on("click", saveHourTask);

        // Increase by 1 hour
        hour++;

    }
}
// Task 3: Color-code each timeblock based on past, present, and future when the timeblock is viewed.
function colourCodeTimeBackground(taskEntry) {
    let currentTime = parseInt(moment().format("H A"));

    if (hour < currentTime) {
        taskEntry.addClass("past");
    }
    else if (hour > currentTime) {
        taskEntry.addClass("future");
    }
    else if (hour === currentTime) {
        taskEntry.addClass("present");
    }
}

// Task 6: Persist events between refreshes of a page

// function to Save Task to localStorage
function saveHourTask() {
    let updateStorage = false;
    let taskText = $(this).parent().children()[1];
    let currentHour = taskText.id;

    // Creating Object to store Task in localStorage
    const currentTask = {
        taskTime: currentHour,
        taskInput: taskText.value
    };

    //Pulls Tasks if stored in localStorage
    storedTasks = JSON.parse(localStorage.getItem("storedTasks"));

    // If stored in localStorage
    if (storedTasks != null) {
        for (let i = 0; i < storedTasks.length; i++) {
            // Update Event if hour has previous entry
            if (storedTasks[i].taskTime === currentHour) {
                storedTasks[i].taskInput = taskText.value;
                updateStorage = true;
            }
        }
        if (updateStorage === false) {
            // if empty return out of function
            if (currentTask.taskInput === "") {
                return;
            }
            else {
                //push current Task object into stored Tasks array
                storedTasks.push(currentTask);
            }
        }
    }
    else {
        if (currentTask.taskInput === "") {
            return;
        }
        else {
            //If lcoalStorage does not exist, create array
            storedTasks = [currentTask];
        }
    }
    localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
}


// Recalls local sotrage for Persist events on page
function recallHourTask() {

    // Retrive Tasks from localStorage
    let storedTasks = JSON.parse(localStorage.getItem("storedTasks"));

    // Adding Text to HTML from localStorage
    if (storedTasks != null) {
        for (let i = 0; i < storedTasks.length; i++) {
            let taskTime = storedTasks[i].taskTime;
            $("#" + taskTime).text(storedTasks[i].taskInput);
        }
    }
}
// Initialising page for entries
function initialise() {
    timeSlotGeneration();
    recallHourTask();
    // Task 1: Display the current day at the top of the calender when a user opens the planner.
    dateDisplayEl.text(moment().format("dddd, MMMM Do YYYY"));
}

