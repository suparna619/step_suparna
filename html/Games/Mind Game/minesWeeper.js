function addRowHandlers() {
    var table = document.getElementById("tableId");
    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        row = table.rows[i];
        row.onclick = function(){
          var cell = this.getElementsByTagName("td")[i];
          var id = cell.innerHTML;
          alert("id:" + id);
        };
    }
}