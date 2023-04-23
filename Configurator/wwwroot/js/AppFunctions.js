$("#appInitiator").click(function () {
    makeNewCopy();
    $(".confTable").toggle();
    $("#appInitiator").toggle();


    $("#val_one").change(function (val) { $("#val_one_val").html(val.target.value) });
    $("#val_two").change(function (val) { $("#val_two_val").html(val.target.value) });


    $("#confirmButton").click(function (o) {
        var lengthVal = $("#val_one").val();
        var radVal = $("#val_two").val();

        sendConfig();
    })


    
})



function makeNewCopy() {
    
    $.ajax({
        url: "/api/STL/Document/f/f",
        async: true,
        method: 'GET',
        data: "",
        success: function (data) {
            
            window.newData = JSON.parse(data);
            window.newFileWID = newData.newWorkspaceId;
            window.newFileDID = newData.newDocumentId;
            getDEID();
        }
        ,
        error: function (e) {
        }
    });
}

function getDEID() {
    
    $.ajax({
        url: "/api/STL/DocumentEID/" + newFileDID + "/" + newFileWID,
        async: true,
        method: 'GET',
        data: "",
        success: function (data) {
            
            window.DEID = JSON.parse(data); 
            window.eid = DEID[0].id;
            window.microversionID = GetMicroversion();


        }
        ,
        error: function (e) {
            
        }
    });
}




function sendConfig() {
    window.lenConf = $("#val_one").val();
    window.radConf = $("#val_two").val();

    var newConfig = {
        "elbowLength": lenConf,
        "arcRadius": radConf
    }

    $.ajax({
        url: "/api/STL/modify/" + newFileDID + "/" + newFileWID + "/" + eid + "/" + microversionID,
        async: true,
        method: 'POST', dataType: 'json', contentType: 'application/json', processData: false,
        data: JSON.stringify(newConfig),

        contentType: "application/json",
        success: function (data) {
            createDownloadLink();
        }
        ,
        error: function (e) {
            console.log(e);
        }
    })
}


function GetMicroversion() {
    $.ajax({
        url: "/api/STL/GetDocumentMicroversion/" + newFileDID,
        async: true,
        method: 'GET',
        data: "",
        success: function (data) {
            
            window.microversionID = JSON.parse(data)[0].microversion;
        }
        ,
        error: function (e) {
            console.log(e);
        }
    });
}

// create div with button to download file
function createDownloadLink() {
    var div = document.getElementById("downloadButtonDIV");
    
    var button = document.createElement("button");
    button.id = "downloadButton";
    button.innerHTML = "Generate File ";
    button.className = "startButton";
    button.onclick = function () { downloadFile() };
    div.appendChild(button);
    
}

function downloadFile() {
    window.bar = new ldBar("#loadingBar", {
        "stroke": '#0f0',
        "width": "100%",
        "stroke-width": 3,
        
        "preset": "energy",
        "value": 0
    });
    window.loadtimercount = 0;
    setInterval(ProgressLoading, 1000);
    
    window.downloaddone = false;
    function ProgressLoading() {
        if (loadtimercount < 100 && downloaddone != true) {
            if (loadtimercount >= 90) {
                if (IsFilePresent(fileurl) == true) {
                    {
                        loadtimercount += 10;
                        bar.set(
                            loadtimercount,     /* target value. */
                            true   /* enable animation. default is true */
                        );
                        GenerateButtonElement();
                    }
                }
            } else {
                loadtimercount += 10;
                bar.set(
                    loadtimercount,     /* target value. */
                    true   /* enable animation. default is true */
                );
            }
            
        }
        else {
            downloaddone = true;
            loadtimercount = 0;
        }

    }
    var config1 = parseInt(lenConf) / 1000;
    var config2 = parseInt(radConf) / 1000;
    var config = "ElbobRadius=" + config1 + " meter;HandleRadius=" + config2 +" meter;List_5LYKuaBDUO4vsW=Default";
    $.ajax({
        
        url: "/api/STL/GetDownloadLink/" + newFileDID + "/" + newFileWID + "/" + eid + "/" + config,
        method: 'GET',
        data: "",
        success: function (data) {

            window.fileurl = data;
         
           // setTimeout(GenerateButtonElement, 10000) ;
        }
        ,
        error: function (e) {
            
        }
    });
}


function GenerateButtonElement() {
    var div = document.getElementById("loadingBar");

    div.innerHTML = '<div class="downloadlinkcontainer"><a class="getstl" href="' + fileurl + '" class="button">Download File </a></div>';
    div.innerHTML += '<div class="downloadlinkcontainer" onclick="LivePreview()">Reset Preview</div>'

}

function IsFilePresent(fileName) {
    var present = false;
    $.ajax({

        url: "/api/STL/CheckFile/" + fileName.replace("/stlfiles/", ""),
        method: 'GET',
        data: "",
        async: false,
        success: function (data) {

            if (data == "Success") {
                
                present = true;
            }
            else {
                present = false;
            }
        }
        ,
        error: function (e) {
            
        }
    })
    return present;
};

//update 3s object with new link
function LivePreview()
{
    if (fileurl != null && fileurl != undefined)
    {
        var div = document.getElementById("loadingBar");
        STLfile = "." + fileurl;
        document.getElementById('tdcontainer').innerHTML = "";
        Reload = true;
        div.innerHTML = '<div class="downloadlinkcontainer"><a class="getstl" href="' + fileurl + '" class="button">Download File </a></div>';
    }
}

jQuery('#colorPicker').colpick(

);