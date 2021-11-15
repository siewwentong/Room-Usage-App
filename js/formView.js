"use strict";
// Reference all DOM elements and declare any constants
    let addressRef = document.getElementById("address");
    let roomNumberRef = document.getElementById("roomNumber");
    let lightsRef = document.getElementById("lights");
    let heatingCoolingRef = document.getElementById("heatingCooling");
    let seatsUsedRef = document.getElementById("seatsUsed");
    let seatsTotalRef = document.getElementById("seatsTotal");
    let errorMessagesRef = document.getElementById("errorMessages");
    let checkboxRef = document.getElementById("useAddress");
    let addLabel = document.getElementById("label1");
    let formRef = document.getElementById("observationForm");



// Define any variables that should be available to all functions 
    let roomUsageList = new RoomUsageList();
    let currentRoomUsageList = localStorage.getItem(STORAGE_KEY);
    if (currentRoomUsageList !== null)
        {
            retrieveData(STORAGE_KEY);
        }

/* This function is to clear all inputs on the new observations page.
Parameters : None.  Called when Clear button is clicked.
Output : Reset all values to its default values or remove them completely when called.
*/
function Clear()
    //reload the form
{   
    location.reload(true);
}

/* This function validates the input data (whether the inputs are of the correct data type) and saves if it is valid. 
Parameters : None.  Called when Save button is clicked.
Output : If data is validated, input will be saved as a roomUsage Class Instance and be pushed in the roomUsageList Class Instance Array and user will be notified. If not, correspoding error messages will be shown to user.
*/
function Save()
{   
    // Working variables
    let strAddress,strRoomNumber,strSeatsUsed,strSeatsTotal,checkLights,checkHeatingCooling,numSeatsUsed,numSeatsTotal,strTimeChecked;
    
    // Retrieving inputs from reference object
    strAddress = addressRef.value;
    strRoomNumber = roomNumberRef.value;
    strSeatsUsed = seatsUsedRef.value;
    strSeatsTotal = seatsTotalRef.value;
    checkLights = lightsRef.checked;
    checkHeatingCooling = heatingCoolingRef.checked;
    
    // Define check variables to ensure each data is valid 
    let check1,check2,check3,check4,check5,check6;
    
    // Check for similar data types
    // First check for address which should be string
    if (strAddress.length!==0)
        if (isNaN(strAddress))
            {
                check1 = true;
            }
        else
            {
                return errorMessagesRef.innerText = "The address should consists of words (eg. Building 1)";
            }
    else if (strAddress.length===0) 
            {
                return errorMessagesRef.innerText = "The address field has not been filled up yet";
            }
    
    // Second check for room number which be string
    if (strRoomNumber.length!==0)
        {
            check2 = true; //since room number can be number too, isNaN need not to be excecuted to validate
        }
    else if (strRoomNumber.length===0)
        {
            return errorMessagesRef.innerText = "The room number field has not been filled up yet";
        }
    
    // Third check for lights on which should be boolean 
    if (typeof(checkLights)==="boolean")
        {
            check3 = true;
        }
    else 
        {
            return errorMessagesRef.innerText = "The data type of checkLights is wrong"
        }
    
    // Fourth check for heating and cooling which should be boolean
    if (typeof(checkHeatingCooling)==="boolean")
        {
            check4 = true;
        }
    else
        {
            return errorMessagesRef.innerText = "The data type of heating cooling is wrong"
        }
    
    // Fifth check for seats used data type which should be number
    if (isNaN(Number(strSeatsUsed))===false)
        {
            if (strSeatsUsed!=="" && strSeatsUsed>=0 && strSeatsUsed<500) 
            {
                check5 = true;
                numSeatsUsed = Number(strSeatsUsed);
            }
            else if (strSeatsUsed>=500)
            {
                return errorMessagesRef.innerText = "The number of seats used is invalid as it is out of the range of any lecture hall";
            }
        else if (strSeatsUsed<0)
            {
                return errorMessagesRef.innerText = "The number of seats cannot be a negative number";
            }
        else if (strSeatsUsed==="")
            {
                return errorMessagesRef.innerText = "The seats used field has not been filled yet";
            }
        }
    else
        {
            return errorMessagesRef.innerText = "Please enter a number in the seats used field"
        }
    
    // Sixth check for total seats data type which should be number
    if (isNaN(Number(strSeatsTotal))===false)
        {
            if (strSeatsTotal!=="" && strSeatsTotal>0 && strSeatsTotal<500 && Number(strSeatsTotal)>=Number(strSeatsUsed))
            {
                check6 = true;
                numSeatsTotal = Number(strSeatsTotal);
            }
            else if (strSeatsTotal==="")
            {
                return errorMessagesRef.innerText = "The total seats field has not been filled yet";
            }
            else if (strSeatsTotal<=0)
            {
                return errorMessagesRef.innerText = "The number of total seats cannot be zero or a negative number";
            }
            else if (strSeatsTotal>=500)
            {
                return errorMessagesRef.innerText = "The number of total seats is invalid as it is out of the range of any lecture hall";
            }
            else if (Number(strSeatsUsed)>Number(strSeatsTotal))
            {
                return errorMessagesRef.innerText = "The data is invalid as there cannot be more used seats than total seats";
            }
        }
    else
        {
            return errorMessagesRef.innerText = "Please enter a number in the total seats field"
        }
    
    // Record time the observation was made
    strTimeChecked = new Date();

    // If checking is true, create an instance of room usage class
    if (check1===true && check2===true && check3===true && check4===true && check5===true && check6===true)
        {
            let roomUsageInstance = new RoomUsage(strRoomNumber, strAddress, checkLights, checkHeatingCooling, numSeatsUsed, numSeatsTotal, strTimeChecked);
            
            // Retrieve data from local storage, if it is empty, push it as the first entry into local sotrage. If not, add it to the array. 
            if (currentRoomUsageList !== null)
                {
                    retrieveData(STORAGE_KEY);
                    roomUsageList.pushEntry(roomUsageInstance);
                }
            else 
                {
                    roomUsageList.pushEntry(roomUsageInstance);
                }
            storeData(roomUsageList,STORAGE_KEY);
            
            // Produce message to user its successful
            displayMessage("Your response has been recorded! Thank you",3000); 
        }
}   

// Function header
/* Function will call an in built function to get user's current position when checkbox is ticked
Parameter: None.  Called when Automatically determine address checkbox is clicked.
Output: Call the getCurrentPosition method if checkbox is ticked, stop the method when it isn't ticked
*/
function geoloc()
{
    let ticked = checkboxRef.checked; //check whether checkbox is ticked or not
    let watchId;
    if (ticked) // checking whether geolocation is supported by browser
        {
            if (navigator.geolocation)
                {
                    //detact lat and lon of current location
                    watchId = navigator.geolocation.getCurrentPosition(encodeAPI,errPostion,{enableHighAccuracy: true});
                }
            else
                {
                    alert("geolocation is not supported by browser");
                }
        }
    else
        {
            navigator.geolocation.clearWatch(watchId);
            addressRef.value = null;
            addLabel.textContent = "Building Address..."
        }
}

//if current location is not get
function errPostion(errPos)
{
    alert("Location not detacted. Please allow web app to access your location.");
}

/* Function takes position object from Geolocation API, then create script element in HTML file, which is an URL containing the corresponding query keys
Parameter: position object from watchCurretPosition method if success
Output: If requirement for accuracy is met, script element of URL will be attched in the index.html. If not, display message will be shown for the end users.
*/
function encodeAPI(pos)
{   
    if (pos.coords.accuracy <= 500)
        {
            //encode URI for the latitude and longtitude
            let URI = pos.coords.latitude + "," + pos.coords.longitude;
            let coordinate = encodeURIComponent(URI);

            //create script element in HTML
            let script = document.createElement('script');
            script.src = "https://api.opencagedata.com/geocode/v1/json?q=" + coordinate + "&key=e2298f0c0d344520a86e7c2f4cab0621&language=en&pretty=1&callback=reverseGeoLoc";
            document.body.appendChild(script); // attach element to parent node
        }
    else
        {
            displayMessage("Hold on. Trying to get an accurate address....",4000)
        }
}

/* Function takes JSONP from OpenCage Geocoder and returns the building address in the input field. This function is called when the script containning the URL is appended to index.html
Parameter: JSONP from OpenCage Geocoder
Output: Auto-fill the input field with the building Address
*/
function reverseGeoLoc(coordinateJSONP)
{
    //find out what type of address
    let typeOfLoc = coordinateJSONP.results[0].components._type;
    
    //find the building address
    let buildingAdd = coordinateJSONP.results[0].components[typeOfLoc];
    
    //delete the label text content
    addLabel.textContent = "";
    
    //add the address to input
    addressRef.value = buildingAdd;
}



