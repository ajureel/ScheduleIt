var calendarDivEl = $('#calendar');

// seed the hours
var dailyHours = [
    '9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'
];

// Uchange to true for testing mode
var testingBln = false;

// getting the current time 
var now = moment();
var actualHour = ((now.hour()) >= 12 ? now.hour()-12: now.hour());
actualHour = actualHour + ((now.hour()) >= 12 ? 'PM' : 'AM');

var loadPage= function() {
    //load local storage for tasks
    var tasks = [];
    tasks = JSON.parse(localStorage.getItem("dailytTasks"));

    // if nothing in localStorage, create a new object to track all task status arrays
    if (!tasks) {
        if (testingBln) {
            //test data
            tasks = [{'myHour': "9AM", 'myTask': "TEST: coffee"},
            {myHour: "12PM", myTask: "TEST: lunch"}];
        }  else {
            tasks = [];
        }     
    };
    // loop through each hour and create our rows
    $.each(dailyHours, function(index, currentHour){
        
        //set hourStatus
        var hourStatus = 'future'; //default to the future
        
        if(currentHour === actualHour){
            hourStatus = 'present';
        } else {
            currentMorningBln = (currentHour.slice( -2)  == 'AM' ? true : false);
            var cur_hr = currentHour.slice(0, -2);
            var act_hr = actualHour.slice(0, -2);
            
            if (currentMorningBln && (actualHour.slice(-2) == 'PM' || ((cur_hr - act_hr)<0))) {
                hourStatus = 'past'; //covers AM past
            } else {
                if (!currentMorningBln && actualHour.slice(-2) == 'PM' && (act_hr !== '12' &&  ((cur_hr - act_hr)<0))) {
                    hourStatus = 'past'; 
                    }else { 
                       if (!currentMorningBln && actualHour.slice(-2) == 'PM' && cur_hr == '12'){
                            hourStatus = 'past'; //12 is past
                       }            
                       console.log (cur_hr, 'defaulted to future');
                    }
            }
        }

        //get task
        //filter our tasks array to get the task for the current hour
        var currentTask = tasks.filter( obj => obj.myHour === currentHour);
        
        //Get the todo frim the current task
        var toDo = '';
        // confrim that we do not have an empty array then get the task if defined
        if (currentTask.length !== 0) {
            if (currentTask[0].myTask){
                toDo = currentTask[0].myTask;}
        }

        //create the row
        var row = $(`<div class='row'>
        <div class="col-2 text-right border-top border-bottom p-3 time">
               ${currentHour}
            </div>
            <input id=${currentHour} type='text' class='col border p-3 note text-dark ${hourStatus}' value='${toDo}' />
            
            <button class="btn-sm btn-success col-2 border-top border-bottom p-3 save">
                Save <i class="far fa-save"></i>
            </button>`);
        $(".calendar").append(row);
    }
    )
    

}

//save function, saves to local storage
var saveCal = () =>{
    //create json obj
    const jsonObj = [];
    i = 0;
    $("#calendar input[type=text]").each(function(){
        if (this.value) {
            //insert into obj
            var myHour = this.id;
            var myTask = this.value;
            jsonObj[i] = {myHour, myTask};
            i++;
        }
    });
    //write to local storage localStorage.getItem("dailytTasks")
    localStorage.setItem('dailytTasks', JSON.stringify(jsonObj));
}

loadPage();

calendarDivEl.on('click', '.save', saveCal);
