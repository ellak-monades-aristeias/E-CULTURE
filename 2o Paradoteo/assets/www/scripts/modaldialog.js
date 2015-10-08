   var doUploadsArray = new Array();
   var doUploadsArrayIndices = new Array();
   var index = 0;
$(document).ready(function() {

    $(function() {
        $('.upload').click(function(e) {
            e.preventDefault();
            var btn_id = $(this).attr('id')
            var input_id = btn_id.toString().replace('upload_', '');
            var answer_div = $(this).parent();
            if ($('#' + input_id + '') != null) {
                $('#' + input_id + '_hiddenbtn').remove();
                $('#' + input_id + '').remove();
                $('#' + input_id + '_filecount').remove();
                $('#' + input_id + '_smallimg').remove();
            }
            answer_div.append('<button id="' + input_id + '_hiddenbtn" style="display:none" >');
            answer_div.append('<input id="' + input_id + '" type="hidden" value="" name="' + input_id + '">');
            answer_div.append('<input id="' + input_id + '_filecount" type="hidden" value="" name="' + input_id + '_filecount">');
            $('#' + input_id + '_uploadedfiles').append('<img style="width:100px;height:100px;display:none" id="' + input_id + '_smallimg" />');
            takePhoto(input_id);




        });
    });

});
function onBodyLoad(){
    document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady(){
//navigator.notification.alert("onDeviceReady");
}
function onGetDirectorySuccess(dir) {

            DevExpress.ui.notify("Everything Ok!", 'success', 3000);

        }
function onGetDirectoryFail(error) {
            if ($('#' + input_id + '') != null) {
                $('#' + input_id + '_hiddenbtn').remove();
                $('#' + input_id + '').remove();
                $('#' + input_id + '_filecount').remove();
                $('#' + input_id + '_smallimg').remove();
            }
            DevExpress.ui.notify("Something went wrong!!!", 'error', 3000);
        }
function onRequestFileSystemSuccess(fileSystem) {
            var entry = fileSystem.root;
            global_save = entry.toURI() + "/adeccoimages";
            entry.getDirectory("adeccoimages", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail);
        }
function gotDestinationEntry(destination) {
    targetImg.moveTo(destination, targetImoveSuccessmg.name, moveSuccess,
            function(error) {
                onfail(error, 'Move Image')
            });
}
function onFileSystemSuccess(fileSystem) {
    console.log(fileSystem.name);

}
function moveSuccess(data) {
    var smallImage = document.getElementById(input_id + '_smallimg');
    smallImage.src = '';
    smallImage.src = data.fullPath;
    smallImage.style.display = 'block';
}
function gotFileEntry(targetImg) {
            window.resolveLocalFileSystemURI(global_save, gotDestinationEntry, function(error) {
                onfail(error, 'Get Destination Dir')
            });
}
function onFTPsuccess(r) {
    var resp_data = $.parseJSON(r.response);
    if (resp_data.success == true || resp_data.success == 'true') {
        var jsnstr = '[{"title":"","comment":"","size":"' + resp_data.size + '","name":"' + resp_data.name + '","filename":"' + resp_data.filename + '","ext":"' + resp_data.ext + '"}]';
        $("#" + input_id).val(jsnstr);
        $("#" + input_id + '_filecount').val(1);
        var global_save;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
        window.resolveLocalFileSystemURI(imageData, gotFileEntry, function(error) {
            onfail(error, 'Get Target Image')
        });
    }
    else {
        DevExpress.ui.notify("Something Went Wrong!\nPlease try again!", 'error', 3000);
    }
}
function onFTPerror() {
    if ($('#' + input_id + '') != null) {
        $('#' + input_id + '_hiddenbtn').remove();
        $('#' + input_id + '').remove();
        $('#' + input_id + '_filecount').remove();
        $('#' + input_id + '_smallimg').remove();
    }

    DevExpress.ui.notify("File Transfer Failed!\nPlease try again!", 'error', 3000);
}

function onCameraError(e) {
    console.log(e);
    DevExpress.ui.notify("Camera Error!\nPlease try again!", 'error', 3000);
}
function takePhoto(input_id) {
    navigator.camera.getPicture(
            function (imageData) {
   // alert("onCameraSuccess");
//    var imgData = imageData;
//    var data = {};
//    var params = new Object();
//    var options = new FileUploadOptions();
//    var sid = $('#id').val();
//    options.fileKey = "uploadfile";
//    options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
//    options.mimeType = "image/jpeg";
//    options.chunkedMode = false;
//    options.headers = {Connection: "close"};
//    params.fullpath = imgData;
//    params.name = options.fileName;
//    params.valid_extensions = 'jpg, jpeg, pdf';
//    params.max_filesize = '10240';
//    params.HTTP_MBINTRAPIAUTH_USER = globaluser;
//    params.HTTP_MBINTRAPIAUTH_PASS = globalpass;
//    params.sid = sid;
//    params.preview = 0;
//    params.fieldname = input_id;
//    params.extension = "jpg";
//    options.params = params;
//    alert(imgData);
//    var ft = new FileTransfer();
    
    var imgData = imageData;
    var smallImage = document.getElementById(input_id + '_smallimg');
    smallImage.src = '';
    smallImage.src = imgData;
    smallImage.style.display = 'block';
    var i = $.inArray(input_id,doUploadsArrayIndices);
    if(i==-1){
        if($('#pr')==null) $("#progressbar").prepend('<p id="pr">Uploading Files: 0% Completed </p>');
        doUploadsArrayIndices[index]=input_id;
        doUploadsArray[index] =   imgData;
        index++;
    }
    else{

        doUploadsArray[i] =   imgData;
    }
//    if($("#uploadscripts")!=null){
//        $("#uploadscripts").remove();
//    }
//    
    //alert(doUploadsArray.join("\n"));
    //
},
            onCameraError,
            {
                quality: 90,
                destinationType: Camera.DestinationType.FILE_URI,
                targetWidth: 1024
               // targetHeight: 768
            }
            );
}
function getQueryVariable(variable, url) {
    var vars = url.split("/");
    for (var i = 0; i < vars.length; i++) {
        if (vars[i] == variable) {
            return vars[i + 1];
        }
    }
    var vars = url.replace(/\&amp;/g, '&').split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return null;
}
function isValueInArray(arr, val) {
    inArray = false;
    for (i = 0; i < arr.length; i++) {
        if (val.toLowerCase() == arr[i].toLowerCase()) {
            inArray = true;
        }
    }

    return inArray;
}
function displayUploadedFiles(jsonstring, filecount, fieldname, show_title, show_comment, pos) {
    var jsonobj;
    var i;
    var display = '';

    if (jsonstring == '[]') {
        $('#' + fieldname + '_uploadedfiles').html(display);
        return;
    }

    if (jsonstring !== '')
    {
        jsonobj = eval('(' + jsonstring + ')');
        display = '<table width="100%" class="question uploadedfiles"><thead><tr><td width="20%">&nbsp;</td>';
        if (show_title != 0)
            display += '<th>' + translt.headTitle + '</th>';
        if (show_comment != 0)
            display += '<th>' + translt.headComment + '</th>';
        display += '<th>' + translt.headFileName + '</th></tr></thead><tbody>';
        var image_extensions = new Array('gif', 'jpeg', 'jpg', 'png', 'swf', 'psd', 'bmp', 'tiff', 'jp2', 'iff', 'bmp', 'xbm', 'ico');

        for (i = 0; i < filecount; i++)
        {
            if (pos)
            {
                if (isValueInArray(image_extensions, jsonobj[i].ext))
                    display += '<tr><td class="upload image"><img src="http://intrade-platform.eu/' + uploadurl + '/sid/' + surveyid + '/filegetcontents/' + decodeURIComponent(jsonobj[i].filename) + '" height=100px /></td>';
                else
                    display += '<tr><td class="upload placeholder"><img src="http://intrade-platform.eu/' + imageurl + '/placeholder.png" height=100px /></td>';
            }
            else
            {
                if (isValueInArray(image_extensions, jsonobj[i].ext))
                    display += '<tr><td class="upload image"><img src="http://intrade-platform.eu/' + uploadurl + 'filegetcontents/' + decodeURIComponent(jsonobj[i].filename) + '" height=100px /></td>';
                else
                    display += '<tr><td class="upload placeholder"><img src="http://intrade-platform.eu/' + imageurl + '/placeholder.png" height=100px /></td>';
            }
            if (show_title != 0)
                display += '<td class="upload title">' + jsonobj[i].title + '</td>';
            if (show_comment != 0)
                display += '<td class="upload comment">' + jsonobj[i].comment + '</td>';
            display += '<td class="upload edit">' + decodeURIComponent(jsonobj[i].name) + '</td><td>' + '<img src="' + imageurl + '/edit.png" onclick="javascript:upload_' + fieldname + '();$(\'#upload_' + fieldname + '\').click();" style="cursor:pointer"></td></tr>';
        }
        display += '</tbody></table>';

        $('#' + fieldname + '_uploadedfiles').html(display);
    }
}
function copyJSON(jsonstring, filecount, fieldname, show_title, show_comment, pos) {
    $('#' + fieldname).val(jsonstring);
    $('#' + fieldname + '_filecount').val(filecount);
    displayUploadedFiles(jsonstring, filecount, fieldname, show_title, show_comment, pos);
}
function showBasic() {
    $('#basic').show();
}
function hideBasic() {
    $('#basic').hide();
}
