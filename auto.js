// HH3D Auto Script
(function () {
  var VERSION_URL = "https://raw.githubusercontent.com/Thuanhazzz/HH3D/main/versions.json";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", VERSION_URL, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("[HH3D] versions:", xhr.responseText);
    }
  };
  xhr.send();
})();
