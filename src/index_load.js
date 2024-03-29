window.$ = function (id) {
  return document.getElementById(id);
};
// 版本與韌體資源
window.cacheName = document.getElementById("version").innerText;
window.sourceState = "";

// 需要緩存的靜態檔案
let cacheList = {
  app: "app.js",
  src: "index.js",
  worker: "worker.js",
  style: "style.css",
  ui: "ui.html",
  manifest: "manifest.json",
};

// 新增的lib檔案
if (window.libList === undefined) {
  window.libList = [];
}

window.worker = undefined;

// worker 程式來源
window.worker_url = `./${cacheList.worker}`;

// 用戶端的緩存版本
window.local_cache_name = localStorage.getItem("local_cache_name");

// 用戶端的緩存檔案內容
window.code_html = localStorage.getItem(`${cacheName}_ui.html`);
window.code_app = localStorage.getItem(`${cacheName}_${cacheList.app}`);
window.code_src = localStorage.getItem(`${cacheName}_${cacheList.src}`);
window.code_worker = localStorage.getItem(`${cacheName}_${cacheList.worker}`);
window.code_style = localStorage.getItem(`${cacheName}_${cacheList.style}`);
window.code_manifest = localStorage.getItem(
  `${cacheName}_${cacheList.manifest}`
);

// 設定主頁面的hash
window.location.hash = "#home";
localStorage.setItem("current_hash", location.hash);

// 建立worker與websocket連線
window.connect = function () {
  try {
    console.log("create worker...");
    console.log(window.worker);
    if (typeof Worker === "undefined") {
      console.log("not support Worker");
      return;
    }
    if (typeof window.worker === "undefined") {
      window.worker = new Worker(window.worker_url);
      console.log(window.worker);
      window.worker.onmessage = wkMsg;
    }
    cmd = { URL: document.URL };
    window.worker.postMessage(cmd);
  } catch (error) {
    console.error(error);
    // alert(error);
    // reloadWeb();
  }
};

// 顯示資源載入狀態
window.sourceLoading = (source) => {
  if (document.getElementById("version")) {
    document.getElementById("version").innerText = `${cacheName}-${source}`;
    console.log(`Load ${source} source.`);
  }
};

// 取得檔案並設定緩存與載入
window.getFileWithImport = (name, type) => {
  sourceLoading(`cached ${name}`);
  fetch(`${window.location.protocol}//${window.location.host}/${name}`)
    .then((res) => {
      res.text().then((data) => {
        // 設定緩存
        localStorage.setItem(`${cacheName}_${name}`, data);
        // 載入檔案
        switch (type) {
          case "html":
            addHTML(data);
            break;
          case "css":
            addStyle(data);
            break;
          case "js":
            addScript(data);
            break;
          case "worker":
            addWorker(data);
            break;
          case "manifest":
            addManifest(data);
            break;
          default:
            console.log("not vaild file type.");
            break;
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// 取得lib分割檔，重組並設定緩存與載入
window.getLibFilesWithImport = async () => {
  const delay = (s) => {
    return new Promise((resolve) => setTimeout(resolve, s));
  };
  let libList = window.libList;

  for (let k = 0; k < libList.length; k++) {
    let file = libList[k];
    let fileData = "";
    for (let i = 0; i < file.num; i++) {
      await fetch(
        `${window.location.protocol}//${window.location.host}/lib/${file.name}/${i}_${file.name}`
      ).then((res) => {
        res.text().then((data) => {
          fileData += data;
        });
      });
      sourceLoading(`cached ${file.name}`);
      await delay(500);
    }

    console.log(fileData);

    // 設定緩存
    localStorage.setItem(`${cacheName}_lib_${file.name}`, fileData);

    await delay(1000);

    if (file.ext === "js") {
      addScript(fileData);
    } else if (file.ext === "css") {
      addStyle(fileData);
    }
  }
};

// 建立緩存
window.createCache = async function (cacheList) {
  const delay = (s) => {
    return new Promise((resolve) => {
      setTimeout(resolve, s);
    });
  };
  if (window.libList.length !== 0) {
    await getLibFilesWithImport();
  }

  getFileWithImport(cacheList.style, "css");
  await delay(500);
  getFileWithImport(cacheList.ui, "html");
  await delay(500);
  getFileWithImport(cacheList.src, "js");
  await delay(500);
  getFileWithImport(cacheList.worker, "worker");
  await delay(500);
  getFileWithImport(cacheList.app, "js");
  await delay(500);
  getFileWithImport(cacheList.manifest, "manifest");
  await delay(500);
  connect();
  await delay(300);
  sourceLoading("origin-done");
  console.log("clear spin");
  document.getElementById("spin").classList.add("hidden");
};

// 使用緩存
window.useCachedData = function () {
  if (window.libList.length !== 0) {
    let libList = window.libList;
    for (let i = 0; i < libList.length; i++) {
      let file = libList[i];
      if (file.ext === "js") {
        addScript(localStorage.getItem(`${cacheName}_lib_${file.name}`));
      } else if (file.ext === "css") {
        addStyle(localStorage.getItem(`${cacheName}_lib_${file.name}`));
      }
    }
  }

  addHTML(code_html);
  addScript(code_src);
  addStyle(code_style);
  addWorker(code_worker);
  addManifest(code_manifest);
  addIcon(code_manifest);

  setTimeout(() => {
    addScript(code_app);
  }, 500);

  setTimeout(connect, 1000);

  setTimeout(() => {
    sourceLoading("cache");
    console.log("clear spin");
    document.getElementById("spin").classList.add("hidden");
  }, 1500);
};

// 重新建立緩存
window.refreshData = function () {
  localStorage.clear();
  localStorage.setItem("local_cache_name", cacheName);
  createCache(cacheList);
};

// 加入html
window.addHTML = function (data) {
  document.getElementById("ui_html").innerHTML += data;
};

// 加入js
window.addScript = function (data) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = data;
  document.getElementsByTagName("head")[0].appendChild(script);
};

// 加入css
window.addStyle = function (data) {
  let style = document.createElement("style");
  // style.id = "style";
  style.textContent = data;
  document.head.append(style);
};

// 加入worker程式
window.addWorker = function (data) {
  let script = document.createElement("script");
  script.id = "worker";
  script.type = "javascript/worker";
  script.textContent = data;
  document.getElementsByTagName("head")[0].appendChild(script);
  let blob = new Blob([data], { type: "text/javascript" });
  window.worker_url = window.URL.createObjectURL(blob);
  console.log(window.worker_url);
};

// 加入manifest定義檔
window.addManifest = function (data) {
  let manifest = data.replace(/(\r\n|\n|\r| )/gm, "");
  manifest = "data:application/manifest+json," + manifest;
  document
    .getElementById("manifest-placeholder")
    .setAttribute("href", manifest);
};

// 加入favicon
window.addIcon = function (data) {
  let manifest = JSON.parse(data.replace(/(\r\n|\n|\r| )/gm, ""));
  let ico = manifest.icons[0].src;
  document.querySelector("#icon").setAttribute("href", ico);
};

// 檢查lib是否完整載入
window.checkLibLoad = function () {
  let libList = window.libList;
  if (libList.length > 0) {
    for (let i = 0; i < libList.length; i++) {
      let file = libList[i];
      if (localStorage.getItem(`${cacheName}_lib_${file.name}`) === null) {
        return false;
      }
    }
    return true;
  } else {
    return true;
  }
};

// 檢查瀏覽器是否支援localStorage，無則向server要求網頁檔案
if (document.getElementById("build_check").innerText === "dev") {
  console.log("local developing...");
} else if (!window.localStorage) {
  console.warn("Browser not support localStorage.");
  refreshData();
}
// 檢查檔案版本與用戶端版本是否一致
else if (
  cacheName === local_cache_name &&
  code_html &&
  code_app &&
  code_src &&
  code_style &&
  code_worker &&
  code_manifest &&
  window.checkLibLoad()
) {
  console.log(`Find Cache: ${cacheName}, use cache file.`);
  useCachedData();
} else {
  console.log(`Can't find cache, fetch fresh data and create new one.`);
  refreshData();
}

document.onreadystatechange = loading;

// 完成Loading
function loading() {
  if (document.readyState == "complete") {
    setTimeout(() => {
      document.getElementById("loading").style = "display: none;";
    }, 1500);
    console.log("load success");
  }
}
