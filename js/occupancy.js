"use strict";
// Define any variables that should be available to all functions 
let roomUsageList = new RoomUsageList();
let currentRoomUsageList = localStorage.getItem(STORAGE_KEY);
let occupancy = document.getElementById("content")
let listOccupancy="" 
listOccupancy += "<div class=\"mdl-cell mdl-cell--4-col\">"
listOccupancy += "<table class=\"mdl-data-table mdl-js-data-table mdl-shadow--2dp\"><tbody>"
if (currentRoomUsageList !== null)
    {
        retrieveData(STORAGE_KEY);
        listOccupancy += "<tr><td class=\"mdl-data-table__cell--non-numeric\">"+"Five worst occupancy hour (8am-6pm): "+"</td></tr></tbody></table></div>"
    }
else
    {
        listOccupancy += "<tr><td class=\"mdl-data-table__cell--non-numeric\">"+"Five worst occupancy hour (8am-6pm): No entries to display"+"</td></tr></tbody></table></div>"
    }
    

/*First class function that gets the hours of a roomUsage class instance,which will later be passed as an argument for the aggregate method
Parameter: index of the roomlist array
Output: returns the hours of a roomUsage class instance that corresponds to the input index.
*/
let getHrs=function(i)
{
    return roomUsageList.roomList[i].timeChecked.getHours();
}

//aggregate the roomlist by hours
let bucketHrs = roomUsageList.aggregateBy(getHrs);

// Reference a DOM element from HTML
let content = document.getElementById("content");

for (let prop in bucketHrs) // for each building
    {
        // Set up MDL layout for our occupancy page 
        listOccupancy += "<div class=\"mdl-cell mdl-cell--4-col\">"
        listOccupancy += "<table class=\"mdl-data-table mdl-js-data-table mdl-shadow--2dp\">"
        listOccupancy += "<thead>"+"<tr><th class=\"mdl-data-table__cell--non-numeric\">"
        
        // If hours are above 13 in the 24 hr system, display them as PM, otherwise they will be displayed as AM.
        if(prop >=13)
            {
                listOccupancy += "<h5>"+ "Worst occupancy for " + (prop-12) +" pm " + "</h5>"
            }
        else
            {
                listOccupancy += "<h5>"+ "Worst occupancy for " + prop +" am " + "</h5>"
            }
        
        // No of Observations
        let hrsOfDay = bucketHrs[prop].roomList;
        
        // Initialise some variables to assist in calculation later
        let occArray=[];
        
        for (let i=0; i<hrsOfDay.length; i++)
            {
                let Observ = bucketHrs[prop].roomList[i];

                // Obtain the numbers of seats used and total seats to calculate occupancy 
                Observ.occupancy = ((Observ.seatsUsed/Observ.seatsTotal)*100).toFixed(2);
                if (isNaN(Observ.occupancy)===false)
                    {
                        occArray.push(Observ);
                    }
                else 
                    {
                        continue;
                    }
            }
        // Anonymous function here sorts the occupancy from lowest to highest in the array
        occArray.sort(function(a, b){return a.occupancy - b.occupancy});
        
        // Select only the 5 worst occupancy cases for each hour
        let lastIndex;
        if (occArray.length >= 5)
            {
                lastIndex = 5;
            }
        else
            {
                lastIndex = occArray.length;
            }
        
        // Run a for loop to input all the data of the 5 worst occupancy cases for each hour 
        for (let k=0; k<lastIndex; k++)
            {
                listOccupancy += "</th></tr></thead><tbody>"
                listOccupancy += "<tr><td class=\"mdl-data-table__cell--non-numeric\">"
                listOccupancy += "<div><b>" + shortBuildAdd(occArray[k].address)+ " ; R" +occArray[k].roomNumber+"</b></div>"
                listOccupancy += "<div>Occupancy: "+occArray[k].occupancy + "%" +"</div>"

                //translate boolean values (true/false) to "On" or "Off"
                if(occArray[k].heatingCoolingOn === true)
                    {
                        listOccupancy += "<div>Heating/cooling: On </div>"
                    }
                else
                    {
                        listOccupancy += "<div>Heating/cooling: Off </div>"    
                    }
                if(occArray[k].lightsOn === true)
                    {
                        listOccupancy += "<div>Lights: On </div>"
                    }
                 else
                    {
                          listOccupancy += "<div>Lights: Off </div>"    
                     }

                listOccupancy += "<div><font color=\"grey\">"
                listOccupancy += "<i>"+occArray[k].timeChecked.toLocaleDateString()+", "+ occArray[k].timeChecked.toLocaleTimeString('it-IT')+"</i>"
                listOccupancy += "</font></div></td></tr>"
            }
    }

// Display output onto webpage
occupancy.innerHTML = listOccupancy;