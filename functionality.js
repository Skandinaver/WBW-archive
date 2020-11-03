moviecontent = '[{"Title":"Flåklypa Grandprix", "File":"Flåklypa_GP_CINEMA_RELEASE.webm", "Date":"03.11.2020"}]'
litcontent = '[{"Title":"Peer Gynt", "File":"Peer_Gynt_Ibsen1867.epub", "Date":"03.11.2020"}]'
artcontent = '[{"Title":"Skrik", "File":"Skrik.png", "Date":"03.11.2020"}]'

parslit = []
parsart = []
parsmov = []

$(document).ready(function() {
getTableData();
    
});



function uploadSheetPresent() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function uploadSheetdismiss() {
    document.getElementById("overlay").style.display = "none";
  }

function clearTable() {
    $(".fileSection").remove();
}

function popTable(parsedTableContent) {
    clearTable();
    tableContent="";
    
    for(i=0; i<parsedTableContent.length; i++){
        var object = parsedTableContent[i];
        tableContent += '  <tr> \
        <td> \
            '+object["Title"]+' \
        </td> \
        <td> \
            '+object["File"]+' \
        </td> \
        <td> \
            '+object["Date"]+' \
        </td> \
    </tr>'
    }
    $(".itemSection").append("<table class='fileSection'> \
 \
    <tr> \
        <th class='titleSection'>Title</th> \
        <th class='filenameSection'>File</th> \
        <th class='dateSectio'>Upload date</th> \
    </tr> \
    "+tableContent+" \
    </table>")
    
}

function getTableData()
{
    parslit = JSON.parse(litcontent);
    parsart = JSON.parse(artcontent);
    parsmov = JSON.parse(moviecontent);
}

function GetTodayDate() {
    var tdate = new Date();
    var dd = ("0" + tdate.getDate()).slice(-2); //yields day
    var MM = ("0" + (tdate.getMonth() + 1)).slice(-2); //yields month
    var yyyy = tdate.getFullYear(); //yields year
    var currentDate= dd + "." +( MM ) + "." + yyyy;
 
    return currentDate;
 }

 $( ".uploadForm" ).submit(function( event ) {
    var formdata = $( this ).serializeArray();
    var newData = { 
        "Title":"",
        "File": $("#inputFile").prop('files')[0].name,
        "Date": GetTodayDate(),
    }
    var cat = "";
    for(i=0; i<formdata.length; i++)
    {
        if(formdata[i]["name"] == "category")
        {
            cat = formdata[i]["value"];
        }
        if(formdata[i]["name"] == "inputTitle")
        {
            newData["Title"] = formdata[i]["value"];
        }
        if(formdata[i]["name"] == "inputFile")
        {
            newData["File"] = formdata[i]["value"];
        }
        

    }
    if(cat=="movie")
    {
        parsmov.push(newData);
        popTable(parsmov)

    }
    else if(cat=="literature")
    {
        parslit.push(newData);
        popTable(parslit)

    }
    else if(cat=="art")
    {
        parsart.push(newData);
        popTable(parsart)

    }
    else 
    {

        console.log("Cat error"+ cat);
    }
    event.preventDefault();
    uploadSheetdismiss();
    $('form').trigger('reset');
  });