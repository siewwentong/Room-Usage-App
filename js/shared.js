"use strict";
// Define any constants
    const STORAGE_KEY = "ENG1003-RoomUseList";

/* Room usage class
This class has 7 private attributes in the constructor, each one being relevant to a property in a given room.
This class stores the data of the room usage observations when a new class instance is called. 
It has appropriate getter & setter methods as well to obtain or set the private attributes. 
*/
class RoomUsage
    {
        constructor(roomNumber,address,lightsOn,heatingCoolingOn,seatsUsed,seatsTotal,timeChecked)
        {
            // Private attributes:
            this._roomNumber = roomNumber;
            this._address = address;
            this._lightsOn = lightsOn;
            this._heatingCoolingOn = heatingCoolingOn;
            this._seatsUsed = seatsUsed;
            this._seatsTotal = seatsTotal;
            this._timeChecked = timeChecked;
        }
        
        // Methods: setter methods for each of the private attributes
        
        set roomNumber(roomNum)
        {
                
            if (typeof(roomNum)==="string")
                {
                    this._roomNumber = roomNum;
                }
            else 
                {
                    return alert("This room number is invalid");
                }
        }
        
        set address(address)
        {
            if (typeof(address)==="string" && address !== "")
                {
                    this._address = address;
                }
            else 
                {
                    return alert("This address is invalid");
                }
        }
        
        set lightsOn(truth)
        {
            if (typeof(truth)==="boolean")
                {
                    this._lightsOn = truth;
                }
            else
                {
                    return alert("Please enter a boolean value, either true or false without quotations")
                }
        }
        
        set heatingCoolingOn(truth)
        {
            if (typeof(truth)==="boolean")
                {
                    this._heatingCoolingOn = truth;
                }
            else
                {
                    return alert("Please enter a boolean value, either true or false without quotations")
                }
        }
        
        set seatsUsed(usedSeats)
        {
            if (typeof(usedSeats)==="number" && usedSeats>=0 && usedSeats<500)
                {
                    this._seatsUsed = usedSeats;
                }
            else 
                {
                    return alert("The number of seats are invalid")
                }
        }
        
        set seatsTotal(totalSeats)
        {
            if (typeof(totalSeats)==="number" && totalSeats>=0 && totalSeats<500 && totalSeats>=this._seatsUsed)
                {
                    this._seatsTotal = totalSeats;
                }
            else 
                {
                    return alert("The number of seats are invalid")
                }
        }

        set timeChecked(timeChecked)
        {
            if (typeof(timeChecked)==="string")
                {
                    this._timeChecked = new Date(timeChecked);
                }
            else
            {
                return alert("The time & date checked is invalid")
            }
        }
        
        // Reinitialises this instance from a public-data room usage object.
        initialiseFromRoomUsagePDO(RoomUsageObject)
        {
            // Initialise the instance via the mutator methods from the PDO object.
            this.roomNumber= RoomUsageObject._roomNumber;
            this.address = RoomUsageObject._address;
            this.lightsOn = RoomUsageObject._lightsOn;
            this.heatingCoolingOn = RoomUsageObject._heatingCoolingOn;
            this.seatsUsed = RoomUsageObject._seatsUsed;
            this.seatsTotal = RoomUsageObject._seatsTotal;
            this.timeChecked = RoomUsageObject._timeChecked;
        }
        
        // Methods: getter methods for each of the private attributes
        
        get roomNumber()
        {
            return this._roomNumber;
        }
        
        get address()
        {
            return this._address;
        }
        
        get lightsOn()
        {
            return this._lightsOn;
        }
        
        get heatingCoolingOn()
        {
            return this._heatingCoolingOn;
        }
        
        get seatsUsed()
        {
            return this._seatsUsed;
        }
        
        get seatsTotal()
        {
            return this._seatsTotal;
        }
        
        get timeChecked()
        {
            return this._timeChecked;
        }
    }


/* Room usage list class
This class has a single private attribute in the constructor, an array that stores RoomUsage Instances
Using an appropraite setter method, the RoomUsage instance can be added to this array that will store all RoomUsage observations.  
It has appropriate getter & setter methods as well to obtain or set the private attributes. 
*/
class RoomUsageList
    {
        /*contructor method
        Parameter: None
        Output: a empty array named roomlist
        */
        constructor()
        {
            // Private attributes:
            this._roomList = [];
        }
        
        // Public Methods
        /* Method will push the input into the roomlist array
        Parameter: roomList class instance to be added into the roomUsageList class instance
        Output: Array contain the input room usage class instance in the roomlist array
        */
        pushEntry(roomList)
        {
            this._roomList.push(roomList);
        }
        
        /* Method will innitialise the roomUsageList class instance using the PDO object
        Parameter: roomList class instance to be added into the roomUsageList class instance
        Output: the roomUsageClassInstance will contain all the attributes of the PDO object as well as the roomUsageList class methods
        */
        initialiseFromRoomUsageListPDO(roomListPDO)
        {
            this._roomList = [];
            
             for (let i=0;i<roomListPDO._roomList.length;i++)
                {
                    let roomData = new RoomUsage();
                    roomData.initialiseFromRoomUsagePDO(roomListPDO._roomList[i]);
                    this._roomList.push(roomData);
                } 
        }
        
        /*This method takes another function as an input and returns an object, it is essentially carrying out bucketing 
        Parameter: function that return value of a property of the roomUsage Class Instance
        Output: An Object with aggregate keys as its property, where the aggregate key is the returned value of the input function. Within every property, there is a roomlist containing all roomUsage Class Instance that share the same aggregate key value.
        */
        aggregateBy(func)
        {   
            let bucket={};
            let key="";
            for(let i = 0;i<roomUsageList._roomList.length;i++)
                { 
                    let roomUsageTemp = roomUsageList._roomList[i];
                    key=func(i);
                    if (isNaN(key) || ( key >= 8 && key <= 18)) // for all buidling or hours from 8am to 6pm
                        {
                            if (bucket.hasOwnProperty(key)=== true)
                                {
                                    bucket[key].pushEntry(roomUsageTemp);
                                }
                            else
                                {
                                    bucket[key]=new RoomUsageList();
                                    bucket[key].pushEntry(roomUsageTemp);
                                }
                        }
                }
            return bucket;
        }
        
        /*setter method
        Parameter: a new room list (array)
        Output: if the input is an array, the previous roomList is replaced with the input room list
        */
        set roomList(newRoomList)
        {
            if (Array.isArray(newRoomList))
                {
                    this._roomList = newRoomList;
                }
        }
        
        /*getter method
        Parameter: None
        Output: roomlist array of the roomUsageList class instance
        */
        get roomList() 
        {
            return this._roomList;
        }
    }

// Feature 5
/* This function will store the RoomUsageList data into the local storage 
Parameters : RoomUsageList
Output : When function is called, it accepts a RoomUsageList as an input and proceeds to stringify it. Then, using the local storage setter method, it stores the stringified data under a specified key.
*/
function storeData(roomUsageList)
{
    if (typeof(Storage) !== "undefined")
        {
            // Storing data by stringifying the roomUsageInstance to a JSON string
            let JSONData = JSON.stringify(roomUsageList);
    
            // Store this JSON string to local storage using the key
            localStorage.setItem(STORAGE_KEY, JSONData);
        }
    else
         {
            displayMessage("Error: localStorage is not supported by current browser.",3000);
         }
}

// Feature 6
/* This function will recover data from the local storage  
Parameters : None 
Output : When function is called, it uses the local storage getter method to obtain the key from local storage. Once the data is obtained, it parses the JSON data such that an object is returned. That object is then initialised such that its contents can be accessed. 
*/ 
function retrieveData()
{
    if (typeof(Storage) !== "undefined")
    {
        // Retrieve the stored JSON string dataObject and return the string back to the class odject 
        let JSONData = localStorage.getItem(STORAGE_KEY);
        
        let dataObject = JSON.parse(JSONData);
        roomUsageList.initialiseFromRoomUsageListPDO(dataObject);
        
    }
    else
        {
            displayMessage("Error: localStorage is not supported by current browser.",3000);
        }
}

/* This function will shorten a long address such that only the relevant part is shown  
Parameters : fullAdd (full address string) 
Output : It takes the full address as an input, then detects if a comma is present in it. If it is, the adress before the comma is taken as the shortened address. If not, the input is the short address. 
*/ 
function shortBuildAdd(fullAdd)
{
    let shortAdd;
    let commaIndex = fullAdd.indexOf(",")
    if (commaIndex === -1) // if comma is not found in the address
        {
            shortAdd = fullAdd;
        }
    else
        {
            shortAdd = fullAdd.substring(0,commaIndex);
        }
    return shortAdd;
        
}
