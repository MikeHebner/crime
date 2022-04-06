
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
      <td> { row.district }</td>
      <td> { row.count }</td>
  </tr>
  );
  console.log(rows);
  let element =(
    <div>
      <h2>Crime Database</h2>
        <table id="myTable">
        <thead>
        <tr><th>District</th><th>Crime Count</th></tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
        </table>
    </div>
    );
    ReactDOM.render(
      element, document.getElementById('dataView')
    );

    const dataTable = new simpleDatatables.DataTable("#myTable");
}
function error(){
  console.log(xhttp.readyState);
  console.log(xhttp.status);
}