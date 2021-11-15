# Room-Usage-App

This is a group assignment project in one of the units I took, which is [ENG1003: Engineering Mobile Apps] (https://handbook.monash.edu/2021/units/ENG1003).

This app can be distributed amongst the students to allow them to report on how rooms throughout the campus are being used, so that our client can make some adjustments to heating, cooling and lighting system in the campus. The purpose of this application is to provide a platform for the school’s management department to track how rooms throughout the campus are being used, so that the organisation  can make adjustments to the utilisation of rooms in the campus. Therefore, they can reduce the waste of energy and space.

## App features
### Automatic detection and input of address
Utilizing GPS technology, it is possible to pinpoint the current location of the user. Upon checking this option to determine their address, their current location will be stored as the address automatically. This feature was implemented to assist user experience and allow for a convenient entry of their address.


### Systematic display of recorded information in multiple pages
Reports from the app users are first stored before being displayed on 2 different pages for compilation and analysis. The two pages have different criterias, one is for the worst occupancies in a given hour while the other is the statistics for a building. This feature aims to improve the efficiency in information extraction based on certain variables. 

<img src=screenshots/2.png width=50 />

### Search button
This app also has a search feature that run through the list of observations and filter entries on search input. In the observations page, the administrator is able to search through the entire list of entries by using the search filter. During this process, only entries that match with the search input will be displayed and the displayed entries would be updated on input of a new character. This feature allows for precise information extraction.


### Delete faulty observations
In the observations page, where all recorded observations from users are stored and displayed, each entry possesses a bin icon that will delete said entry when clicked. This would allow the administrator to delete any observations that were invalid or unwanted from the list. This feature was implemented to provide a more effective way in filtering useful data. 


## How to use the App? (User Guide)
### To make an observation report
In the new observations tab, users can make a report provided their phones are connected to the internet. For the address, room number, seats used and total seats, there are text boxes available to the user to manually type values of a given room. There are two sliders for the lights and heating that can be adjusted by tapping to either indicate if they are on or off. 


As mentioned, there is an alternative feature for the address, where there is a checkbox, that when tapped, will automatically detect and input your address into the text box. The address will only be inputed when the accuraccy of the address is within 500m, hence users will need to manually key in the address if the address fails to appear.

Finally, when all information has been defined in this form, the user can tap the “save” button at the bottom of the page to submit their observation. If the user wishes to reset all the data fields, they can tap the “reset” button at the bottom of the page to reload the page, in which the default values would return.


### To view information 
This is mainly for administrative use, as the viewing of information is mainly of use to the management team. In this section of the instructions guide, we will run through some of the basic navigation of our application. 

By clicking the icon with the triple lines in the top left corner, we are able to open the menu tab. In this menu tab, four page options are available to us. These are new observation, observations, occupancy and building stats. New observations would be the page we described in the previous part, where it’s available to the user to fill in information. The other three pages, would be for administrative purposes as they are all pages displaying the recorded data following unique properties such as data for different hours of the day and different buildings. Once here, we can navigate between the three information pages for different purposes by tapping on them. 

### Observation tab
In the Observations tab, users are able to see the total number of observations collected earlier, with the most recent observations at the top. The information shown in the header of each entry are the location, the room number that the report was made and date of the report. In the box below the header, information included are the time is was recorded, whether the lights and heating/cooling are on or off as well as the seat usage of the room. 

The users can find specific observations they wanted to see via the search function on the top right corner of the screen of the observations page. To use this feature, just click on the search icon and begin typing keywords related to your search. During this process, only the relevant entries related to the keywords will appear and the number of matching entries will be shown at the top of the screen.


In order to manage data more effectively, users can also delete unwanted individual observation entries by clicking on the delete (dustbin) icon.


### Occupancy page
In the Occupancy tab, users are able to see the worst five room observations in terms of occupancy from 8am to 6pm. Occupancy can be defined as the percentage of seats used in the room. The layout of the page consists of a header, showing the hour, and below it, text boxes for the five worst occupancy entries for that hour. In the five occupancy entries, information include the name of the building and the room number, the percentage of the room occupancy, whether the lights and heating/cooling are on or off  as well as the date and time of the observations being reported.  

Our app is designed in such a way that if there are more than 5 entries, the 5 worst occupancy entries will be shown. However, if there are less than 5 entries for a given hour, all entries will be shown regardless of occupancy.

### Building stats
In the Building Stats tab, users are able to see the observations by building. The layout consist of a header, containing the building’s name, and a box below it containing information for the respective building. Information in the box include the total number of observations collected at each building, number of wasteful observations, the average seat utilisation, the average lights utilisation as well as the average heating/cooling utilisation. Wasteful observations can be defined as rooms in those buildings that have the lights or heating/cooling on but no seats are used. 

The app will also automatically highlight any buildings that has one or more wasteful observations in red, so that action can be taken and energy can be conserved.


## Known Bugs and Limitations
- Requires wifi connection
- The accuracy of the location-tracking function is set to be at most 500m. Thus, if the building address is incorrect / unavailable, users are expected to untick the checkbox and manually key in the correct building address.
- Since local storage is stored in one’s device, one couldn’t access to previously saved observations if he or she uses a different device to view. Also, one may need to manually delete the local storage every time the the local storage is full. 
- In the “Observations” page, the search function will only filter building address, room number and date. Thus, searching for a specific time, number of seats will not give any results.
- The inputs for building address and room number is case-sensitive. This indicates that instead of having all building statistics in one card, the statistics of the same building might be in different cards due to capitalisation issues.
