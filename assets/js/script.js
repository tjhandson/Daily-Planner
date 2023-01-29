const dateDisplayEl = $('#currentDay');

// Task 1: Display the current day at the top of the calender when a user opens the planner.
setInterval(function () {
    dateDisplayEl.text(moment().format('dddd DD MMM YYYY - h:mm:ss a'));
}
    , 1000);


// Task 2: Present timeblocks for standard business hours when the user scrolls down.
 
// Task 3: Color-code each timeblock based on past, present, and future when the timeblock is viewed.
 
// Task 4: Allow a user to enter an event when they click a timeblock

// Task 5: Save the event in local storage when the save button is clicked in that timeblock.

// Task 6: Persist events between refreshes of a page