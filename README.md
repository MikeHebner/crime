# Boston Crime Tracker
***
### COMP 335 : Web Application Development
#### Kent Loc & Michael Hebner
***
### What it does

- Postgres database that stores crime incident reports from 2015-2021 for Boston,MA 
    - Data sourced from data.boston.gov 
- <b>Map of Boston</b>
  - GeoJson used to overlay the districts
  - Total Crime Incidents per district used for fill color of districts
  - District Names added as labels
  - Hovering over a district displays the Incident count in the top right corner of the map
  - Legend for interpreting district colors added
- <b>Graph</b>
  - D3 (Data Driven Documents) used to build graph
  - Displays same data as map in a bar graph
  - Added labels to axis's and values to the bars
- <b>Tables</b>
    1. Crime count/District
    1. Crime Type/Count/District
    2. Incident involved shooting/District
      1. 2015-2018 --> Not null = shooting
      2. 2019-2021 --> 1 = shooting, 0 = no shooting
       - This hasn't been handled yet, numbers are inflated for 2019-2021
***
### What it doesn't
- Shootings per district counts needs to be queried differently
  - Either a seperate query for 2019-2021 or replacing current query with more complex one
- Had higher hopes for the Map
  - Wanted more interactivity
  - Incorporate up-to-date data through boston.gov API
  - District labels are based off center of shape, this doesn't work with districts that consists of more than one <i>shape</i>
    - Dorchester label is in Boston Harbor
- User generated graphs and tables
  - Generate SQL queries based off user input and generate graphs and/or tables with response