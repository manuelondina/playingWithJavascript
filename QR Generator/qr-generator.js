//@author: Manuel Ondina
//@date: 11-March-2023
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var location = "https://www.google.com/maps?q=" + latitude + "," + longitude;
    document.getElementById("qr-location").value = location;

    generateQRCode(location);
}


function generateQRCode(location) {
    
    var qr = qrcode(0, 'L');
    qr.addData(location);
    qr.make();
    var qrCode = qr.createImgTag(4);

    qrCode = qrCode.replace('<img', '<img onclick="location.href=\'' + location + '\';"');
    document.getElementById("qr-code").innerHTML = qrCode;
}

document.getElementById("generate-qr-btn").addEventListener("click", function() {
    getLocation();
});
