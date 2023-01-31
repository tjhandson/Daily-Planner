const dateDisplayEl = $('#currentDay');
const plannerTableEl = $('#tableSection');

// Task 1: Display the current day at the top of the calender when a user opens the planner.

dateDisplayEl.text(moment().format("dddd, MMMM Do YYYY"));

let hour = 9;

// Task 2: Present timeblocks for standard business hours when the user scrolls down.
function timeSlotGeneration() {

    for (let i = 0; i < 9; i++) {
        let time = moment(hour, "hh").format("hA");

        //Row for time slot
        const timeSlot = $("<div>").addClass("row mx-auto");

        // Section for Hour
        const hourText = $("<h5>").addClass("hourtext text-right").text(time)
        const hourEl = $("<div>").addClass("hour col-1").append(hourText);

        // User input area for text entry
        const taskEntry = $("<textarea>").addClass("UserInput overflow-auto text-dark col-8").text("").attr("id", time);


        // Save Button block at end of row 
        const saveIcon = $("<span>").addClass("fa fa-save");
        const saveButton = $("<button>").addClass("btn saveBtn time-block col-1").append(saveIcon);

        // Appending hour, text entry and button to time slot
        timeSlot.append(
            hourEl,
            taskEntry,
            saveButton,);

        //Append Time slot to Planner table area

        plannerTableEl.append(timeSlot);

        // Increase by 1 hour
        hour++;

    }
}
// Task 3: Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// Task 4: Allow a user to enter an event when they click a timeblock

// Task 5: Save the event in local storage when the save button is clicked in that timeblock.

// Task 6: Persist events between refreshes of a page




timeSlotGeneration();

