"use strict";
// Define any variables that should be available to all functions 
let roomUsageList = new RoomUsageList();
let currentRoomUsageList = localStorage.getItem(STORAGE_KEY);
if (currentRoomUsageList !== null)
    {
        retrieveData(STORAGE_KEY);
    }

//Feature 10 
/*using a first class fuction to get the address from the roomUsageList, which will then be passed to the aggregateBy method of roomUsageList Class as an argument
Parameters: index of roomlist (number)
Output: Address of corresponding roomUsage Class Instance
*/
let getAdd=function(i)
{
    return roomUsageList.roomList[i].address;
}

//aggregate the roomlist by building address
let bucketAdd = roomUsageList.aggregateBy(getAdd);

//store buckets in local storage with another storage key

// display statistics in building stats for each building in the HTML 
let buildingStats= document.getElementById("content");
let listBuilding = "";

for (let prop in bucketAdd) // for each building
    {
        // No of Observations
        let noOfObservations = bucketAdd[prop].roomList.length;
        
        //initialise the values of statistic to aid in calculation later
        let wastefulObserv = 0;
        let totSeatUsed = 0;
        let totSeatAvailable = 0;
        let lightOnObserv = 0;
        let heatCoolObserv = 0;
        
        for (let i = 0; i < noOfObservations; i++)
            {
                let Observation = bucketAdd[prop].roomList[i];
                //if heating cooling or lights is on but there is no ppl in the room
                if (Observation.seatsUsed === 0 && (Observation.heatingCoolingOn || Observation.lightsOn))
                    {
                        //calculating number of wasteful observation
                        wastefulObserv++;
                    }
                
                //average seat utilisations
                totSeatUsed += Number(Observation.seatsUsed);
                totSeatAvailable += Number(Observation.seatsTotal);
                
                //average lights-on observations
                if (Observation.lightsOn)
                    {
                        lightOnObserv++;
                    }
                
                //average heating/cooling-on observations
                if (Observation.heatingCoolingOn)
                    {
                        heatCoolObserv++;
                    }
            }
        //extract short buidling name
        let Address = shortBuildAdd(prop);
        //average seat utilisations
        let seatUtilisations = (totSeatUsed/totSeatAvailable)*100;
        //average lights-on observations
        let lightUtilisations = (lightOnObserv/noOfObservations)*100;
        //average heating/cooling-on observations
        let heatCoolUtilisations = (lightOnObserv/noOfObservations)*100;
        
        //display statistics in building stats for each building
        listBuilding += "<div class=\"mdl-cell mdl-cell--4-col\">"
        listBuilding += "<table class=\"observation-table mdl-data-table mdl-js-data-table mdl-shadow--2dp\">"
        
        //highlight the entries for buildings that have at least one wasteful observation 
        if (wastefulObserv >= 1)
            {
                listBuilding += "<thead><tr><th class=\"mdl-data-table__cell--non-numeric\" id=color>"
            }
        else
            {
                listBuilding += "<thead><tr><th class=\"mdl-data-table__cell--non-numeric\">"
            }
        
        listBuilding += "<h4>" + Address + "</h4></th></tr></thead><tbody>"
        listBuilding += "<tr><td class=\"mdl-data-table__cell--non-numeric\">" 
        listBuilding += "Observations: " + noOfObservations + "<br />"
        listBuilding += "Wasteful observations: " + wastefulObserv +"<br />"
        listBuilding += "Average seat utilisation: " + seatUtilisations.toFixed(2) + "%"+"<br />"
        listBuilding += "Average lights utilisation: " + lightUtilisations.toFixed(2) + "%"+"<br />"
        listBuilding += "Average heating/cooling utilisation: " + heatCoolUtilisations.toFixed(2) +"%"+ "<br />"
        listBuilding += "</td></tr></tbody></table></div>"
        buildingStats.innerHTML = listBuilding;
    }