//Make the DIV element draggagle:
window.$ = function (id) {
  return document.getElementById(id);
};

/* DragElement reference https://www.w3schools.com/howto/howto_js_draggable.asp */

dragElement($("webeditor"));

// 網頁編輯器拖拉功能
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if ($(elmnt.id + "_drag")) {
    /* if present, the header is where you move the DIV from:*/
    $(elmnt.id + "_drag").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// clear all running interval
function createClearAllInterval() {
  const noop = () => {};
  let firstId = setInterval(noop, 0);

  return () => {
    const lastId = setInterval(noop, 0);
    while (firstId !== lastId) {
      firstId += 1;
      clearInterval(firstId);
    }
  };
}

var clearAllInterval = createClearAllInterval();

/*------------------------------------------*/
/*---------------網頁編輯器介面---------------*/
/*-----------------------------------------*/

window.webeditor_scale = true;

// 縮小/展開 網頁編輯器
$("webeditor_scale").addEventListener("click", () => {
  if (window.webeditor_scale) {
    window.webeditor_scale = false;
    $("webeditor_container").style.display = "none";
    $("webeditor_scale").innerHTML = "&#10010;";
    $("webeditor").style.height = "";
  } else {
    window.webeditor_scale = true;
    $("webeditor_container").style.display = "";
    $("webeditor_scale").innerHTML = "&#8210;";
    $("webeditor").style.height = "";
  }
});

// 重置網頁編輯器位置
$("webeditor_top").addEventListener("click", () => {
  $("webeditor").style.width = "";
  $("webeditor").style.height = "";
  $("webeditor").style.top = "0px";
  //   $("webeditor").style.left = `${
  //     window.innerWidth / 2 - $("webeditor").offsetWidth / 2
  //   }px`;
  $("webeditor").style.left = `${
    window.innerWidth - $("webeditor").offsetWidth
  }px`;
});

// 切換 UI 編輯
$("webeditor_ui_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.remove("hidden");
  $("webeditor_data").classList.add("hidden");
  $("webeditor_cmd").classList.add("hidden");
  $("webeditor_config").classList.add("hidden");
  $("webeditor_file").classList.add("hidden");
});

// 切換 DATA 編輯
$("webeditor_data_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.add("hidden");
  $("webeditor_data").classList.remove("hidden");
  $("webeditor_cmd").classList.add("hidden");
  $("webeditor_config").classList.add("hidden");
  $("webeditor_file").classList.add("hidden");
});

// 切換 CMD 編輯
$("webeditor_cmd_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.add("hidden");
  $("webeditor_data").classList.add("hidden");
  $("webeditor_cmd").classList.remove("hidden");
  $("webeditor_config").classList.add("hidden");
  $("webeditor_file").classList.add("hidden");
});

// 切換 Config 編輯
$("webeditor_config_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.add("hidden");
  $("webeditor_data").classList.add("hidden");
  $("webeditor_cmd").classList.add("hidden");
  $("webeditor_config").classList.remove("hidden");
  $("webeditor_file").classList.add("hidden");
});

// 切換 File 編輯
$("webeditor_file_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.add("hidden");
  $("webeditor_data").classList.add("hidden");
  $("webeditor_cmd").classList.add("hidden");
  $("webeditor_config").classList.add("hidden");
  $("webeditor_file").classList.remove("hidden");
});

/*----------------------------------------*/
/*-----------------變數區塊----------------*/
/*---------------------------------------*/

const start_data = {
  tx_ui_html: "",
  tx_ui_css: "",
  tx_data:
    "/*data will be e.data from websocket*/\nfunction dataFormatEntryPoint(data) {\n    \n};",
  tx_app:
    '/*Create events with id*/\n$("id").addEventListener("click",()=>{\n    \n});',
  option_title: "BEExANT MCU Web",
  option_home_color: "#ffffff",
  option_home_background: "#3f3f3f",
};

let web_file_data = {
  tx_ui_html: "",
  tx_ui_css: "",
  tx_data:
    "/*data will be e.data from websocket*/\nfunction dataFormatEntryPoint(data) {\n    \n};",
  tx_app:
    '/*Create events with id*/\n$("id").addEventListener("click",()=>{\n    \n});',
  option_title: "BEExANT MCU Web",
  option_home_color: "#ffffff",
  option_home_background: "#3f3f3f",
};

window.web_file = web_file_data;

var file_selectIndex = 0;
var file_arr = [];

/*----------------------------------------*/
/*---------------UI 編輯區塊---------------*/
/*---------------------------------------*/

$("tx_ui_html").value = start_data.tx_ui_html;

// HTML 程式編輯區塊
$("tx_ui_html").addEventListener("input", (e) => {
  // console.log(e.target.value);
  $("main_ui").innerHTML = e.target.value;
  window.web_file["tx_ui_html"] = e.target.value;
  syncDataLocalStorage();
});

$("tx_ui_css").value = start_data.tx_ui_css;

// CSS 程式編輯區塊
$("tx_ui_css").addEventListener("input", (e) => {
  // console.log(e.target.value);
  $("ui_css").textContent = e.target.value;
  window.web_file["tx_ui_css"] = e.target.value;
  syncDataLocalStorage();
});

/*-------------------------------------------------*/
/*---------------DATA Format 編輯區塊---------------*/
/*------------------------------------------------*/

$("tx_data").value = start_data.tx_data;

$("tx_data").addEventListener("input", (e) => {
  window.web_file["tx_data"] = e.target.value;
  syncDataLocalStorage();
});

// 嵌入 DATA 程式編輯區塊內容至script中
$("script_data_run").addEventListener("click", () => {
  clearAllInterval();
  if ($("script_data")) {
    $("script_data").remove();
  }
  let script = document.createElement("script");
  script.id = "script_data";
  document.getElementsByTagName("html")[0].appendChild(script);

  $("script_data").textContent = "";
  $("script_data").textContent = $("tx_data").value;
});

// 停止並清除嵌入的程式碼
$("script_data_reset").addEventListener("click", () => {
  clearAllInterval();
  $("script_data").remove();
  window.dataFormatEntryPoint = undefined;
});

/*----------------------------------------------------*/
/*---------------Custom Command 編輯區塊---------------*/
/*---------------------------------------------------*/

$("tx_app").value = start_data.tx_app;

$("tx_app").addEventListener("input", (e) => {
  window.web_file["tx_app"] = e.target.value;
  syncDataLocalStorage();
});

// 嵌入 Custom Command 程式編輯區塊內容至script中
$("script_app_run").addEventListener("click", () => {
  clearAllInterval();
  if ($("script_app")) {
    $("script_app").remove();
  }
  let script = document.createElement("script");
  script.id = "script_app";
  document.getElementsByTagName("html")[0].appendChild(script);

  $("script_app").textContent = "";
  $("script_app").textContent = $("tx_app").value;
});

// 停止並清除嵌入的程式碼
$("script_app_reset").addEventListener("click", () => {
  clearAllInterval();
  $("script_app").remove();
});

/*-----------------------------------------------*/
/*---------------網頁編輯器設定與檔案---------------*/
/*----------------------------------------------*/

// 更新主頁文字顏色
function setHomeColor(color) {
  window.web_file["option_home_color"] = color;
  $("system_status_1").style.color = color;
  $("system_status_2").style.color = color;
  $("bottom_title").style.color = color;
  $("option_home_color").value = color;
}
// 更新主頁背景顏色
function setHomeBackground(color) {
  window.web_file["option_home_background"] = color;
  $("container").style.backgroundColor = color;
  $("footer").style.backgroundColor = color;
  $("option_home_background").value = color;
}

// 同步更新區塊內資料至localstorage
function syncDataLocalStorage() {
  if (localStorage.getItem("file_name") !== "")
    localStorage.setItem(
      `file_save_${localStorage.getItem("file_name")}`,
      JSON.stringify(window.web_file)
    );
}

// 初始化網頁
function initialData() {
  window.web_file = web_file_data;
  $("tx_ui_html").value = start_data.tx_ui_html;
  $("main_ui").innerHTML = "";

  $("tx_ui_css").value = start_data.tx_ui_css;
  $("ui_css").textContent = "";

  $("tx_data").value = start_data.tx_data;
  if ($("script_data")) $("script_data").remove();
  $("tx_app").value = start_data.tx_app;
  if ($("script_app")) $("script_app").remove();

  $("option_title").value = start_data.option_title;
  $("title").innerText = start_data.option_title;
  $("bottom_title").innerText = start_data.option_title;

  // $("option_home_color").value = start_data.option_home_color;
  // $("option_home_background").value = start_data.option_home_background;

  setHomeColor(start_data.option_home_color);
  setHomeBackground(start_data.option_home_background);
}

// 插入資料
function importData(data) {
  window.web_file = data;
  $("tx_ui_html").value = data["tx_ui_html"];
  $("main_ui").innerHTML = data["tx_ui_html"];

  $("tx_ui_css").value = data["tx_ui_css"];
  $("ui_css").textContent = data["tx_ui_css"];

  $("tx_data").value = data["tx_data"];
  if ($("script_data")) $("script_data").textContent = "";
  $("tx_app").value = data["tx_app"];
  if ($("script_app")) $("script_app").textContent = "";

  $("option_title").value = data["option_title"];
  $("title").innerText = data["option_title"];
  $("bottom_title").innerText = data["option_title"];

  setHomeColor(data["option_home_color"]);
  setHomeBackground(data["option_home_background"]);
}

// 檔案管理 - 重新排序選單
function fileRefactLocalStorage() {
  var tmpKey = [];
  for (const key in localStorage) {
    if (Object.hasOwnProperty.call(localStorage, key)) {
      if (key.includes("file_save")) {
        tmpKey.push(key);
      }
    }
  }
  tmpKey = tmpKey.sort();
  for (let i = 0; i < tmpKey.length; i++) {
    const value = localStorage.getItem(tmpKey[i]);
    localStorage.removeItem(tmpKey[i]);
    var len = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;
    tmpKey[i] = `${tmpKey[i].substring(0, 10)}${len}:${tmpKey[i].substring(
      13
    )}`;
    localStorage.setItem(tmpKey[i], value);
  }
}

// 檔案管理 - 選擇存檔
function fileSelect(index) {
  var opt = $("file_select").options;
  if (index === opt.length - 2) {
    fileNew();
    return;
  } else if (index === opt.length - 1) {
    fileRemove();
    return;
  }
  var name = opt[index].text;
  localStorage.setItem("file_name", name);
  file_selectIndex = index;

  if (localStorage.getItem(`file_save_${name}`) === "") {
    return;
  }
  let data = JSON.parse(localStorage.getItem(`file_save_${name}`));
  importData(data);
}

// 檔案管理 - 新增存檔
function fileNew() {
  var opt = $("file_select").options;
  var len = opt.length - 2;
  var name = prompt("請輸入名稱:", "未命名");
  if (name) {
    initialData();
    console.log(start_data);
    name = len < 10 ? `0${len}:${name}` : `${len}:${name}`;
    opt.add(new Option(name, name), opt[opt.length - 2]);
    localStorage.setItem(`file_save_${name}`, JSON.stringify(start_data));
    $("file_select").selectedIndex = opt.length - 3;
    localStorage.setItem("file_name", name);
  } else {
    $("file_select").selectedIndex = file_selectIndex;
  }
}

// 檔案管理 - 刪除存檔
function fileRemove() {
  var name = localStorage.getItem("file_name");
  if (!name) {
    alert("選擇存檔後才可刪除");
    $("file_select").selectedIndex = 0;
    return;
  }
  var res = confirm(`確定要刪除 ${name} ?`);
  if (res) {
    localStorage.removeItem(`file_save_${name}`);
    fileRefactLocalStorage();
    fileInit();
  } else {
    $("file_select").selectedIndex = file_selectIndex;
  }
}

// 檔案管理 - 初始化選單
function fileInit() {
  localStorage.setItem("file_name", "");
  initialData();
  var select = $("file_select");
  var opt = select.options;
  var option = document.createElement("option");
  select.innerHTML = "";
  option.selected = true;
  option.disabled = "選擇存檔";
  option.label = "選擇存檔";
  opt.add(option);
  file_arr = [];
  for (const key in localStorage) {
    if (Object.hasOwnProperty.call(localStorage, key)) {
      if (key.includes("file_save")) {
        file_arr.push(key.substring(10));
      }
    }
  }
  file_arr = file_arr.sort();
  for (let i = 0; i < file_arr.length; i++) {
    const element = file_arr[i];
    opt.add(new Option(element, element), opt[opt.length]);
  }
  option = document.createElement("option");
  option.label = "新增存檔";
  opt.add(option);
  option = document.createElement("option");
  option.label = "刪除存檔";
  opt.add(option);
}

// 重新整理時初始化檔案
window.onload = function () {
  fileInit();
};

// 網頁匯出

// 網頁匯入 - HTML
$("import_html").addEventListener("change", () => {
  var f = $("import_html").files[0];
  var str;
  var reader = new FileReader();
  reader.readAsText(f, "UTF-8");
  reader.onload = function (evt) {
    str = evt.target.result;
    console.log(`import: ${f.name}`);
    window.web_file["tx_ui_html"] = str;
    $("tx_ui_html").value = str;
    $("main_ui").innerHTML = str;
    syncDataLocalStorage();
    $("import_html").value = "";
  };
});

// 網頁匯入 - CSS
$("import_css").addEventListener("change", () => {
  var f = $("import_css").files[0];
  var str;
  var reader = new FileReader();
  reader.readAsText(f, "UTF-8");
  reader.onload = function (evt) {
    str = evt.target.result;
    console.log(`import: ${f.name}`);
    window.web_file["tx_ui_css"] = str;
    $("tx_ui_css").value = str;
    $("ui_css").textContent = str;
    syncDataLocalStorage();
    $("import_css").value = "";
  };
});

// 網頁匯入 - Data Format
$("import_data").addEventListener("change", () => {
  var f = $("import_data").files[0];
  var str;
  var reader = new FileReader();
  reader.readAsText(f, "UTF-8");
  reader.onload = function (evt) {
    str = evt.target.result;
    console.log(`import: ${f.name}`);
    window.web_file["tx_data"] = str;
    $("tx_data").value = str;
    syncDataLocalStorage();
    $("import_data").value = "";
  };
});

// 網頁匯入 - Custom Cmd
$("import_cmd").addEventListener("change", () => {
  var f = $("import_cmd").files[0];
  var str;
  var reader = new FileReader();
  reader.readAsText(f, "UTF-8");
  reader.onload = function (evt) {
    str = evt.target.result;
    console.log(`import: ${f.name}`);
    window.web_file["tx_app"] = str;
    $("tx_app").value = str;
    syncDataLocalStorage();
    $("import_cmd").value = "";
  };
});

// 存檔匯出
function fileExport() {
  const obj = {};
  obj["web_file"] = {};
  let sourceObj = { ...localStorage };
  for (const key in sourceObj) {
    if (Object.hasOwnProperty.call(sourceObj, key)) {
      const element = sourceObj[key];
      if (key.includes("file_save")) {
        obj["web_file"][key] = element;
      }
    }
  }
  var blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: "application/json",
  });
  var url = URL.createObjectURL(blob);
  var fileName = prompt("檔案命名", `未命名`);
  if (fileName) {
    let f = `${Date.now()}_${fileName}.json`;
    console.log(`export: ${f}`);
    $("export_file").href = url;
    $("export_file").download = f;
  } else {
    $("export_file").removeAttribute("href");
    $("export_file").removeAttribute("download");
  }
}

// 觸發 export_file 下載連結
$("export_file_btn").addEventListener("click", () => {
  $("export_file").click();
});

// 呼叫檔案匯出
$("export_file").addEventListener("click", () => {
  fileExport();
});

// 存檔匯入
function fileImport() {
  let sourceObj = { ...localStorage };
  for (const key in sourceObj) {
    if (Object.hasOwnProperty.call(sourceObj, key)) {
      if (key.includes("file")) {
        localStorage.removeItem(key);
      }
    }
  }
  fileInit();
  var f = $("import_file").files[0];
  var json = {};
  var str;
  var reader = new FileReader();
  reader.readAsText(f, "UTF-8");
  reader.onload = function (evt) {
    str = evt.target.result;
    console.log(`import: ${f.name}`);
    json = JSON.parse(reader.result)["web_file"];
    window.web_file = json;
    for (const key in json) {
      if (Object.hasOwnProperty.call(json, key)) {
        const element = json[key];
        localStorage.setItem(key, element);
      }
    }
    console.log(window.web_file);
  };
  $("import_file").value = "";
  window.location.reload();
}

// 檔案上傳成功時呼叫匯入程式
$("import_file").addEventListener("change", () => {
  let check = confirm("匯入將覆蓋原有檔案");
  if (!check) {
    $("import_file").value = "";
    return;
  }
  fileImport();
});

// 選單選擇檔案
$("file_select").addEventListener("change", (e) => {
  let s = e.target;
  if (s.options.selectedIndex) {
    fileSelect(s.options.selectedIndex);
  }
});

// 透明度設定
$("webeditor_opacity").addEventListener("change", (e) => {
  $("webeditor").style.opacity = e.target.value / 100;
});

// 網頁標頭設定
$("option_title").addEventListener("input", (e) => {
  let title = e.target.value;
  $("title").innerText = title;
  $("bottom_title").innerText = title;
  window.web_file["option_title"] = title;
  syncDataLocalStorage();
});

// 主頁文字顏色設定
$("option_home_color").addEventListener("input", (e) => {
  setHomeColor(e.target.value);
  syncDataLocalStorage();
});

// 主頁背景顏色設定
$("option_home_background").addEventListener("input", (e) => {
  setHomeBackground(e.target.value);
  syncDataLocalStorage();
});

// 功能開關 - 排程設定
$("option_schedule").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-sche").classList.remove("hidden");
    $("btmMenu_sche").parentElement.classList.remove("hidden");
    return;
  }
  $("open-sche").classList.add("hidden");
  $("btmMenu_sche").parentElement.classList.add("hidden");
});

// 功能開關 - 網路設定
$("option_network").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-network").classList.remove("hidden");
    $("btmMenu_network").parentElement.classList.remove("hidden");
    return;
  }
  $("open-network").classList.add("hidden");
  $("btmMenu_network").parentElement.classList.add("hidden");
});

// 功能開關 - 自定義設定
$("option_custom").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-custom").classList.remove("hidden");
    $("btmMenu_custom").parentElement.classList.remove("hidden");
    return;
  }
  $("open-custom").classList.add("hidden");
  $("btmMenu_custom").parentElement.classList.add("hidden");
});

// 功能開關 - 系統設定
$("option_system").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-system").classList.remove("hidden");
    $("btmMenu_system").parentElement.classList.remove("hidden");
    return;
  }
  $("open-system").classList.add("hidden");
  $("btmMenu_system").parentElement.classList.add("hidden");
});

// 功能開關 - 終端機
$("option_terminal").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-terminal").classList.remove("hidden");
    $("btmMenu_terminal").parentElement.classList.remove("hidden");
    return;
  }
  $("open-terminal").classList.add("hidden");
  $("btmMenu_terminal").parentElement.classList.add("hidden");
});
