# Room-Usage-App

This is a group assignment project in one of the units I took, which is [ENG1003: Engineering Mobile Apps] (https://handbook.monash.edu/2021/units/ENG1003).

This app can be distributed amongst the students to allow them to report on how rooms throughout the campus are being used, so that our client can make some adjustments to heating, cooling and lighting system in the campus. The purpose of this application is to provide a platform for the school’s management department to track how rooms throughout the campus are being used, so that the organisation  can make adjustments to the utilisation of rooms in the campus. Therefore, they can reduce the waste of energy and space.

## App features
### Automatic detection and input of address
Utilizing GPS technology, it is possible to pinpoint the current location of the user. Upon checking this option to determine their address, their current location will be stored as the address automatically. This feature was implemented to assist user experience and allow for a convenient entry of their address.


### Systematic display of recorded information in multiple pages
Reports from the app users are first stored before being displayed on 2 different pages for compilation and analysis. The two pages have different criterias, one is for the worst occupancies in a given hour while the other is the statistics for a building. This feature aims to improve the efficiency in information extraction based on certain variables. 


### Search button
This app also has a search feature that run through the list of observations and filter entries on search input. In the observations page, the administrator is able to search through the entire list of entries by using the search filter. During this process, only entries that match with the search input will be displayed and the displayed entries would be updated on input of a new character. This feature allows for precise information extraction.


### Delete faulty observations
In the observations page, where all recorded observations from users are stored and displayed, each entry possesses a bin icon that will delete said entry when clicked. This would allow the administrator to delete any observations that were invalid or unwanted from the list. This feature was implemented to provide a more effective way in filtering useful data. 


## How to use the App?
### To make an observation report
In the new observations tab, users can make a report provided their phones are connected to the internet. For the address, room number, seats used and total seats, there are text boxes available to the user to manually type values of a given room. There are two sliders for the lights and heating that can be adjusted by tapping to either indicate if they are on or off. 


As mentioned above, there is an alternative feature for the address, where there is a checkbox, that when tapped, will automatically detect and input your address into the text box.

Finally, when all information has been defined in this form, the user can tap the “save” button at the bottom of the page to submit their observation. If the user wishes to reset all the data fields, they can tap the “reset” button at the bottom of the page to reload the page, in which the default values would return.


### To view information 
This is mainly for administrative use, as the viewing of information is mainly of use to the management team. In this section of the instructions guide, we will run through some of the basic navigation of our application. 

By moving clicking the icon with the triple lines in the top left corner, we are able to open the menu tab. In this menu tab, four page options are available to us. These are new observation, observations, occupancy and building stats. New observations would be the page we described in the previous part, where it’s available to the user to fill in information. The other three pages, would be for administrative purposes as they are all pages displaying the recorded data following unique properties such as data for different hours of the day and different buildings. Once here, we can navigate between the three information pages for different purposes by tapping on them. 

### Observation tab
In the Observations tab, users are able to see the total number of observations collected earlier, with the most recent observations at the top. The information shown in the header of each entry are the location, the room number that the report was made and date of the report. In the box below the header, information included are the time is was recorded, whether the lights and heating/cooling are on or off as well as the seat usage of the room. 

This app was also designed to help users find specific observations they wanted to see, through a search function. The search function, can be found in the top right corner of the screen of the observations page. As described earlier, this feature is a filtering tool to help us extract information with more fluidity. To use this feature, just click on the search icon and begin typing keywords related to your search. During this process, only the relevant entries related to the keywords will appear and the number of matching entries will be shown at the top of the screen.

Another feature included in the observations page is the delete button for individual observation entries. The delete icon is a dustbin icon that can be found in the box of an entry. As described earlier, this feature is to help us manage our data more effectively. To use this feature, we just click the icon of any unwanted entries and the entry would be deleted from the observation page.


### Occupancy page
In the Occupancy tab, users are able to see the worst five room observations in terms of occupancy from 8am to 6pm. Occupancy can be defined as the percentage of seats used in the room. The layout of the page consists of a header, showing the hour, and below it, text boxes for the five worst occupancy entries for that hour. In the five occupancy entries, information include the name of the building and the room number, the percentage of the room occupancy, whether the lights and heating/cooling are on or off  as well as the date and time of the observations being reported.  

Our app is designed in such a way that if there are more than 5 entries, the 5 worst occupancy entries will be shown. However, if there are less than 5 entries for a given hour, all entries will be shown regardless of occupancy.

### Building stats
In the Building Stats tab, users are able to see the observations by building. The layout consist of a header, containing the building’s name, and a box below it containing information for the respective building. Information in the box include the total number of observations collected at each building, number of wasteful observations, the average seat utilisation, the average lights utilisation as well as the average heating/cooling utilisation. Wasteful observations can be defined as rooms in those buildings that have the lights or heating/cooling on but no seats are used. 

Another feature our app possesses is the ability to automatically highlight any buildings that has one or more wasteful observations in red. This is to notify the administrator about the situation so that action can be taken and energy can be conserved.


## Known Bugs and Limitations
There are few known bugs or limitations for this app, which will be explained so that users know how to prevent or solve them. 
One of the limitation is new observations will not be saved as long as any of the input fields is left empty or invalid. This is to ensure that no faulty entries are saved. Specific error message will be displayed so that users know which input is incorrect. Therefore, users are expected to correct the inputs so that the observation can be saved. 
Besides, wifi is needed to launch the app and to enable the function to automatically determine user’s  location. This is a common limitations for any web apps.
Furthermore, the accuracy of the location-tracking function is set to be at most 500m. In other words, the location tracking function is not 100% accurate because the data we use to track users location may not contain all the buildings information in our clients campus. Thus, if the building address is incorrect, users are expected to untick the checkbox and manually key in the correct building address. 
Since local storage is stored in one’s device, one couldn’t access to previously saved observations if he or she uses a different device to view. Also, one may need to manually delete the local storage every time the the local storage is full. 
In the “Observations” page, the search function will only filter building address, room number and date. Thus, searching for a specific time, number of seats will not give any results.
If occupancy of a room is 0/0, the observation will be neglected to prevent math error. Moreover, occupancy is sorted by hours regardless of which day the observation is recorded, which may cause confusion to the viewer. For example, the occupancy may differ for the same room in the same hour, as these two observation may be recorded at different days.
The inputs for building address and room number is case-sensitive. This indicates that instead of having all building statistics in one card, the statistics of the same building might be in different cards due to capitalisation issues.
For building address and room number, since alphanumeric string inputs are accepted, there is no way to determine if the building address or room number is proper data or false data. It also means that the administrator may need to check the observations frequently and delete any faulty entries. 
