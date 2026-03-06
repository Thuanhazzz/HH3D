// HH3D Auto Updater
// Kiểm tra phiên bản mới nhất từ repository
// https://github.com/Thuanhazzz/HH3D

(function () {
  "use strict";

  var BASE_URL = "https://raw.githubusercontent.com/Thuanhazzz/HH3D/main/";

  function fetchJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url + "?t=" + Date.now(), true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        try {
          callback(null, JSON.parse(xhr.responseText));
        } catch (e) {
          callback(new Error("Lỗi parse JSON: " + e.message));
        }
      } else {
        callback(new Error("HTTP " + xhr.status));
      }
    };
    xhr.send();
  }

  function getLatestVersion(versions) {
    var keys = Object.keys(versions);
    if (!keys.length) return null;
    keys.sort(function (a, b) {
      var pa = a.split(".").map(Number);
      var pb = b.split(".").map(Number);
      var len = Math.max(pa.length, pb.length);
      for (var i = 0; i < len; i++) {
        if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0);
      }
      return 0;
    });
    return versions[keys[keys.length - 1]];
  }

  // Lấy danh sách phiên bản
  fetchJSON(BASE_URL + "versions.json", function (err, versions) {
    if (err) {
      console.warn("[HH3D] Không thể tải versions.json:", err.message);
      return;
    }
    var latest = getLatestVersion(versions);
    if (latest) {
      console.log("[HH3D] Phiên bản mới nhất:", latest.version, "–", latest.url);
      if (typeof window !== "undefined") {
        window.__HH3D_LATEST__ = latest;
      }
    }
  });

  // Lấy thông báo
  fetchJSON(BASE_URL + "notifications.json", function (err, data) {
    if (err) {
      console.warn("[HH3D] Không thể tải notifications.json:", err.message);
      return;
    }
    if (typeof window !== "undefined") {
      window.__HH3D_NOTIFICATIONS__ = data;
    }
  });
})();
