var dailyHours = [
    '9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'
];
var testTasks = [
    '','','Prep for lunch','lunch','','','','',''
];
var testHourStatus = 'future';



var loadPage= function() {
    //load local storage for tasks
    


    $.each(dailyHours, function(index,item){
        //set hourStatus
        var row = $(`<div class='row'>
        <div class="col-2 text-right border-top border-bottom p-3 time">
               ${item}
            </div>
            <input type='text' class='col border p-3 note text-dark ${testHourStatus}' value='${testTasks[index]}' />
            
            <button class="btn-sm btn-success col-2 border-top border-bottom p-3 save">
                Save <i class="far fa-save"></i>
            </button>`);
        console.log(row);
        $(".calendar").append(row);
    }
    )
    

}

loadPage();



// var row = $(`<div class='row'>
// <div class="col-2 text-right border-top border-bottom p-3 time">
//         ${time}
//     </div>
//     ${inputEl}
//     <input type='text' class='bg-secondary col border p-3 note text-dark' value='test' />
    
//     <button class="btn-sm btn-success col-2 border-top border-bottom p-3 save">
//         Save <i class="far fa-save"></i>
//     </button>`);
// $(".calendar").append(row);

// <div class='row'>
// <div class="col-2 text-right border-top border-bottom p-3 time">
//         ${AlarmIco}
//         ${time}
//     </div>
//     <input type='text' class='bg-secondary col border p-3 note text-dark' value='test' />
//     <button class="btn-sm btn-success col-2 border-top border-bottom p-3 save">
//         Save <i class="far fa-save"></i>
//     </button>
// </div>