var data = {
    resource_id: '313e56df-6d77-49d2-9c49-ee411f10cf58', // the resource id
    limit:10 // get 5 results
  };
  $.ajax({
    url: 'https://data.boston.gov/api/3/action/datastore_search',
    data: data,
    success: function(data) {
      alert('Total results found: ' + data.result.total)
      console.log(data.result.records)
      display_recent(data)
    }
  });

function display_recent(data){
    data = data.result.records;
    console.log(data)
    const table = document.getElementById('tablebody');
    for(const [key, value] of Object.entries(data)){
        let row = table.insertRow();
        let inc_num = row.insertCell(0);
        let node0 = document.createTextNode(value['INCIDENT_NUMBER'])
        inc_num.appendChild(node0);
        let date = row.insertCell(1);
        let node1 = document.createTextNode(value['OCCURRED_ON_DATE'])
        date.appendChild(node1);
        let offense = row.insertCell(2);
        let node2 = document.createTextNode(value['OFFENSE_DESCRIPTION'])
        offense.appendChild(node2);
        let offense_code = row.insertCell(3);
        let node3 = document.createTextNode(value['OFFENSE_CODE'])
<<<<<<< HEAD
        offense.appendChild(node3);
=======
        offense_code.appendChild(node3);
>>>>>>> c2ff1380988379df1469601c272df415ddc702a5
        let district = row.insertCell(4);
        let node4 = document.createTextNode(value['DISTRICT'])
        district.appendChild(node4);
        let street = row.insertCell(5);
        let node5 = document.createTextNode(value['STREET'])
        street.appendChild(node5);
        let loc = row.insertCell(6);
<<<<<<< HEAD
        let node6 = document.createTextNode(value['LOCATION'])
=======
        let node6 = document.createTextNode(value['Location'])
>>>>>>> c2ff1380988379df1469601c272df415ddc702a5
        loc.appendChild(node6);
    }
    

   
}
