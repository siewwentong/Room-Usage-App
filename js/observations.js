"use strict";
// Define any variables that should be available to all functions 
let roomUsageList = new RoomUsageList();
let currentRoomUsageList = localStorage.getItem(STORAGE_KEY);
if (currentRoomUsageList !== null)
    {
        retrieveData(STORAGE_KEY);
    }

//Display observation in reverse order 
let observation = document.getElementById("content")
let listObservation="" ;

//create a message cell to show the number of observations
listObservation += "<div class=\"mdl-cell mdl-cell--4-col\">"
listObservation += "<table class=\"mdl-data-table mdl-js-data-table mdl-shadow--2dp\"><tbody>"
listObservation += "<tr><td class=\"mdl-data-table__cell--non-numeric\" id = 'messageCell'>"+"Total Observation = "+roomUsageList.roomList.length+"</td></tr></tbody></table></div>"

for (let i = roomUsageList.roomList.length-1; i>=0;i--) 
    { 
        let lights = "";
        
        //translate boolean values (true/false) to "On" or "Off"
        if (roomUsageList.roomList[i].lightsOn===true)
            {
                lights = "On";
            }
        else
            {
                lights = "Off";
            }
        let heatingCooling = "";
        if (roomUsageList.roomList[i].heatingCoolingOn===true)
            {
                heatingCooling = "On";
            }
        else
            {
                heatingCooling = "Off"; 
            }
        
        //extract short buidling name
        let Address = shortBuildAdd(roomUsageList.roomList[i].address);
        
        //Create a card per observation that contains its corresposing datas
        listObservation +=  "<div class=\"mdl-cell mdl-cell--4-col\" id="+i+">" //id is the index of the observation
        listObservation +=  "<table class=\"observation-table mdl-data-table mdl-js-data-table mdl-shadow--2dp\">"
        listObservation += "<thead><tr><th class=\"mdl-data-table__cell--non-numeric\">"
        listObservation += "<h4 class=\"date\">" +roomUsageList.roomList[i].timeChecked.toLocaleDateString('en',{day: "numeric",month:"short"})+"</h4>"
        listObservation += "<h4>" + Address +"<br />" + roomUsageList.roomList[i].roomNumber + "</h4>" + "</th></tr>" + "</thead>" + "<tbody>"
        listObservation += "<tr><td class=\"mdl-data-table__cell--non-numeric\">"
        listObservation += "Time: "+ roomUsageList.roomList[i].timeChecked.toLocaleTimeString() + "<br />"
        listObservation += "Lights: "+ lights +"<br />"
        listObservation += "Heating/cooling: "+ heatingCooling + "<br />"
        listObservation += "Seat usage: " + roomUsageList.roomList[i].seatsUsed + " / " + roomUsageList.roomList[i].seatsTotal + "<br/ >"
        listObservation += "<button class=\"mdl-button mdl-js-button mdl-button--icon\" onclick=\"deleteObservationAtIndex("+i+");\">"
        listObservation += "<i class=\"material-icons\">delete</i>" + "</button>" + "</td></tr>" + "</tbody>" + "</table>" + "</div>"
    } 
    
observation.innerHTML = listObservation;


/* Funcrion willfilter observation list while user is inputing the search feild.
Parameter: None. Function will be called if the input value for searching is altered.
Output: Obseravations that matches the input will be display, and vise versa. Number of matching observation(s) will also be shown in the message cell
*/
function search()
{
    //retrieve input
    let inputRef = document.getElementById("searchField");
    let input = inputRef.value.toLowerCase();
    //
    let page = document.getElementById("content");
    let list = page.getElementsByTagName("thead");
    let matchedObserv = 0; // to calculate the number of matching observations
    
    for (let i = 0; i < list.length; i++)
         {
            //getting the search input value
            let keywordsText = list[i].getElementsByTagName("h4");
            let keywords = keywordsText[0].innerHTML.toLowerCase() + keywordsText[1].innerHTML.toLowerCase();
            
            if (keywords.includes(input)) //if the input matches the buidling address, room number or date
                {
                    //display the observation card
                    list[i].parentNode.parentNode.style.display = "";
                    matchedObserv ++; // calculating the number of matching observations
                }
            else
                {
                    //hide the observation card
                    list[i].parentNode.parentNode.style.display = "none";
                }

    }
        //displaying number of observations that matches the input
        let messageRef = document.getElementById("messageCell");
        if (input === "") //when there is no input
            {
                //show the total number of observations
                 messageRef.innerHTML = "Total Observation: "+roomUsageList.roomList.length;
             }
         // when there is input, show the number of matching observations
         else if (matchedObserv === 0)
             {
                 messageRef.innerHTML = "no matching observations";
             }
         else if (matchedObserv === 1)
             {
                 messageRef.innerHTML = matchedObserv + " matching observation";
             }
         else
             {
                 messageRef.innerHTML = matchedObserv + " matching observations";
             }
}

/*fuction receives the index of table to be deleted, then will remove the corresponding table from observation.html
Parameter: index of roomlist array to be deleted. Called when delete icon is pressed on one od the observation cards
Output: remove the card from the displaying and delete the roomUsage class instance from the roomlist array. Then, the updated roomlist array is overwritten to the local storage
*/
function deleteObservationAtIndex(i)
{
    //remove html element (table) with that index
    let table = document.getElementById(i);
    table.parentNode.removeChild(table);
    // or call the display data
    
    //remove the array element with that index
    roomUsageList.roomList.splice(i,1);
    
    //update the Local Storage
    storeData(roomUsageList,STORAGE_KEY);
}