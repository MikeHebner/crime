let xhttp = new XMLHttpRequest();

xhttp.addEventListener("load",success);
xhttp.addEventListener("error",error);
xhttp.open("GET", "/dataViewout", true);
xhttp.send();

/*
https://reactjs.org/docs/lists-and-keys.html
https://en.wikipedia.org/wiki/Map_(higher-order_function)
*/
function success(){
  let data = JSON.parse(xhttp.response);

  let rows = data.map((row) =>
    <tr key={JSON.stringify(row)}>
        <td> { row.incident_number }</td>
        <td> { row.offense_code }</td>
        <td> { row.offense_code_group }</td>
        <td> { row.offense_description }</td>
        <td> { row.district }</td>
        <td> { row.reporting_area }</td>
        <td> { row.shooting }</td>
        <td> { row.occurred_on_date }</td>
        <td> { row.year }</td>
        <td> { row.month }</td>
        <td> { row.day_of_week }</td>
        <td> { row.hour }</td>
        <td> { row.ucr_part }</td>
        <td> { row.street }</td>
        <td> { row.lat }</td>
        <td> { row.long }</td>
        <td> { row.location }</td>
    </tr>
  );
  console.log(rows);
  let element =(
    <div>
      <h2>Crime Database</h2>
        <table id="myTable">
        <thead>
        <tr><th>incident_number</th><th>offense_code</th><th>offense_code_group</th>
        <th>offense_description</th><th>district</th><th>reporting_area</th><th>shooting</th>
        <th>occurred_on_date</th><th>year</th><th>month</th><th>day_of_week</th><th>hour</th>
        <th>ucr_part</th><th>street</th><th>lat</th><th>long</th><th>location</th></tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
        </table>
    </div>
  );

  ReactDOM.render(
    element,
    document.getElementById('dataView')
  );
  /*
   datatable CSS
   https://datatables.net/
   https://github.com/fiduswriter/Simple-DataTables
  */
  const dataTable = new simpleDatatables.DataTable("#myTable");

}
function error(){
  console.log(xhttp.readyState);
  console.log(xhttp.status);
}