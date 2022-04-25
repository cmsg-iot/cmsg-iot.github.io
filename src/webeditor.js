import jsZip from "./jsZip";
import ace from "./lib/ace-builds/src-noconflict/ace";
import ext from "./lib/ace-builds/src-noconflict/ext-language_tools";
import bt from "./lib/ace-builds/src-noconflict/ext-beautify";

// 設定 ace 資源目標
ace.config.set("basePath", "lib/ace-builds/src-noconflict");
ace.config.set("modePath", "lib/ace-builds/src-noconflict");
ace.config.set("themePath", "lib/ace-builds/src-noconflict");
ace.config.set("workerPath", "lib/ace-builds/src-noconflict");

// 引入 ace 額外 lib
ace.require(ext);
ace.require(bt);

// 整理程式碼
window.beautify = ace.require("ace/ext/beautify");

// 建立 ace editor
window.editor_html = ace.edit("tx_html");
window.editor_css = ace.edit("tx_css");
window.editor_data = ace.edit("tx_data");
window.editor_app = ace.edit("tx_app");

// 設定 ace editor 的主題
editor_html.setTheme("ace/theme/tomorrow_night");
editor_css.setTheme("ace/theme/tomorrow_night");
editor_data.setTheme("ace/theme/tomorrow_night");
editor_app.setTheme("ace/theme/tomorrow_night");

// 設定 ace editor 中使用的程式
editor_html.session.setMode("ace/mode/html");
editor_css.session.setMode("ace/mode/css");
editor_data.session.setMode("ace/mode/javascript");
editor_app.session.setMode("ace/mode/javascript");

// 設定 code completion, snippets, live completion
editor_html.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true,
});

editor_css.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true,
});

editor_data.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true,
});

editor_app.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true,
});

// 定義 $ 以 id 取得 DOM element
window.$ = function (id) {
  return document.getElementById(id);
};

/* DragElement reference https://www.w3schools.com/howto/howto_js_draggable.asp */

// 使目標 div 物件能被拖拉
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

// 清除所有執行中的 interval
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

window.webeditor_expand = true;
window.webeditor_scale = false;

// 縮小/展開 網頁編輯器
$("webeditor_expand").addEventListener("click", () => {
  if (window.webeditor_expand) {
    window.webeditor_expand = false;
    $("webeditor_container").style.display = "none";
    $("webeditor_expand").innerHTML = "&#10010;";
    $("webeditor").style.height = "0";
  } else {
    window.webeditor_expand = true;
    $("webeditor_container").style.display = "";
    $("webeditor_expand").innerHTML = "&#8210;";
    $("webeditor").style.height = "";
  }
});

// 一般/最大化 網頁編輯器
$("webeditor_scale").addEventListener("click", () => {
  if (window.webeditor_scale) {
    window.webeditor_scale = false;
    $("webeditor_scale").innerHTML = "&#10231;";
    $("webeditor").style.width = "";
    $("webeditor").style.height = "";
    $("webeditor").style.top = "0px";
    $("webeditor").style.left = `${
      window.innerWidth - $("webeditor").offsetWidth
    }px`;
  } else {
    window.webeditor_scale = true;
    $("webeditor_scale").innerHTML = "&#8703;";
    $("webeditor").style.top = "0px";
    $("webeditor").style.left = "0px";
    $("webeditor").style.width = "100vw";
    $("webeditor").style.height = "93vh";
  }

  window.webeditor_expand = true;
  $("webeditor_container").style.display = "";
  $("webeditor_expand").innerHTML = "&#8210;";
  $("webeditor").style.height = "";
});

// 隱藏網頁編輯器
$("webeditor_hidden").addEventListener("click", () => {
  alert("隱藏編輯器，雙擊畫面後可再顯示");
  $("webeditor").classList.add("hidden");
});

// 切換 UI 編輯
$("webeditor_ui_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.remove("hidden");
  $("webeditor_data").classList.add("hidden");
  $("webeditor_cmd").classList.add("hidden");
  $("webeditor_config").classList.add("hidden");
  $("webeditor_file").classList.add("hidden");
  editor_html.setValue(window.web_file["tx_html"]);
  editor_css.setValue(window.web_file["tx_css"]);
});

// 切換 DATA 編輯
$("webeditor_data_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.add("hidden");
  $("webeditor_data").classList.remove("hidden");
  $("webeditor_cmd").classList.add("hidden");
  $("webeditor_config").classList.add("hidden");
  $("webeditor_file").classList.add("hidden");
  editor_data.setValue(window.web_file["tx_data"]);
});

// 切換 CMD 編輯
$("webeditor_cmd_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.add("hidden");
  $("webeditor_data").classList.add("hidden");
  $("webeditor_cmd").classList.remove("hidden");
  $("webeditor_config").classList.add("hidden");
  $("webeditor_file").classList.add("hidden");
  $("tx_ui_app").value = window.web_file["tx_ui_app"];
  parseCmdBtn();
  editor_app.setValue(window.web_file["tx_app"]);
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

window.env = "dev";

// 定義初始內容資料
const start_data = Object.freeze({
  tx_html: "",
  tx_css: "",
  tx_data:
    "/*data will be e.data from websocket*/\nfunction dataFormatEntryPoint(data) {\n    \n}",
  tx_ui_app:
    "# 群組標題一\ntitle: 命令改變框中內容 , val: 預設顯示內容, val_id: val_1, btn_id: btn_1\ntitle: 僅框中內容改變 , val: 等待改變..., val_id: val_2\n\n# 群組標題二\ntitle: 僅觸發按鈕事件 , val: 點擊設定 , btn_id: btn_2",
  tx_app:
    '/*Create events with id*/\n$("btn_1").addEventListener("click",()=>{\n    alert("可觸發按鈕事件，按鈕中框的值綁定id能夠改變數值");\n    $("val_1").innerText = "觸發按鈕改變內容";\n});\n\n$("btn_2").addEventListener("click",()=>{\n    let v = prompt("可發送命令或數值改變, 輸入值改變第二個按鈕:");\n    $("val_2").innerText = v;\n});',
  option_title: "BEExANT MCU Web",
  option_home_color: "#ffffff",
  option_home_background: "#3f3f3f",
  option_version: "0.0.1",
  options_flag: {
    title: true,
    footer: true,
    systemStatus: true,
    config: true,
    schedule: true,
    custom: true,
    network: true,
    system: true,
    terminal: true,
  },
  libs: {},
});

// 檔案選擇編號
var file_selectIndex = 0;

// 儲存檔案陣列
var file_arr = [];

window.web_file = {};

function initialGlobalWebFile() {
  let web_file = {};
  web_file["tx_html"] = start_data.tx_html;
  web_file["tx_css"] = start_data.tx_css;
  web_file["tx_data"] = start_data.tx_data;
  web_file["tx_ui_app"] = start_data.tx_ui_app;
  web_file["tx_app"] = start_data.tx_app;
  web_file["option_title"] = start_data.option_title;
  web_file["option_home_color"] = start_data.option_home_color;
  web_file["option_home_background"] = start_data.option_home_background;
  web_file["option_version"] = start_data.option_version;
  web_file["options_flag"] = {
    title: start_data.options_flag.title,
    footer: start_data.options_flag.footer,
    systemStatus: start_data.options_flag.systemStatus,
    config: start_data.options_flag.config,
    schedule: start_data.options_flag.schedule,
    custom: start_data.options_flag.custom,
    network: start_data.options_flag.network,
    system: start_data.options_flag.system,
    terminal: start_data.options_flag.terminal,
  };
  web_file["libs"] = {};
  window.web_file = web_file;
}

initialGlobalWebFile();

/*----------------------------------------*/
/*---------------UI 編輯區塊---------------*/
/*---------------------------------------*/

// 整理程式區塊
function beautifyEditor(editor) {
  window.beautify.beautify(editor.session);
}

window.switch_fullscreen = false;
window.class_temp = undefined;

// 切換全螢幕
function switchFullScreen(tag, editor) {
  let container = `editor_container_${tag}`;
  let block = `editor_block_${tag}`;
  let tx_editor = `tx_${tag}`;
  let btn_full = `full_${tag}`;
  let el = $(block);
  if (window.switch_fullscreen) {
    // exit full screen
    window.switch_fullscreen = false;
    $(tx_editor).className = window.class_temp;
    $(container).appendChild(el);
    $(btn_full).innerText = "全螢幕";
    $("overlay_container").classList.add("hidden");

    // resize editor
    editor.resize();
  } else {
    // full screen
    window.switch_fullscreen = true;
    window.class_temp = $(tx_editor).className;
    $(tx_editor).classList.remove("editor-style");
    $(tx_editor).classList.add("editor-style-full");
    $(btn_full).innerText = "結束全螢幕";
    $("overlay_container").appendChild(el);
    $("overlay_container").classList.remove("hidden");

    // resize editor
    editor.resize();
  }
}

// 初始化 HTML 區塊
editor_html.setValue(start_data.tx_html);

// 同步 HTML 區塊中程式至 localstorage 與畫面
editor_html.on("change", (e) => {
  $("main_ui").innerHTML = editor_html.getValue();
  window.web_file["tx_html"] = editor_html.getValue();
  syncDataLocalStorage();
});

// 整理 HTML 區塊
$("beautify_html").addEventListener("click", (e) => {
  beautifyEditor(editor_html);
});

// HTML 切換全螢幕
$("full_html").addEventListener("click", (e) => {
  switchFullScreen("html", editor_html);
});

// 初始化 CSS 區塊
editor_css.setValue(start_data.tx_css);

// 同步 CSS 區塊中程式至 localstorage 與畫面
editor_css.on("change", (e) => {
  $("ui_css").textContent = editor_css.getValue();
  window.web_file["tx_css"] = editor_css.getValue();
  syncDataLocalStorage();
});

// 整理 CSS 區塊
$("beautify_css").addEventListener("click", (e) => {
  beautifyEditor(editor_css);
});

// CSS 切換全螢幕
$("full_css").addEventListener("click", (e) => {
  switchFullScreen("css", editor_css);
});

/*-------------------------------------------------*/
/*---------------DATA Format 編輯區塊---------------*/
/*------------------------------------------------*/

// 初始化 資料處理區塊
editor_app.setValue(start_data.tx_data);

// 同步區塊中程式至 localstorage
editor_data.on("change", (e) => {
  window.web_file["tx_data"] = editor_data.getValue();
  syncDataLocalStorage();
});

// 嵌入 DATA 程式編輯區塊內容至 script 中，若有套件存在則先載入套件
$("script_data_run").addEventListener("click", () => {
  clearAllInterval();
  if ($("script_data")) {
    $("script_data").remove();
  }
  let libs = window.web_file.libs;
  let libs_len = Object.keys(libs).length;

  if (libs_len) {
    // get each lib
    for (const key_lib in libs) {
      if (Object.hasOwnProperty.call(libs, key_lib)) {
        if ($(`lib_${key_lib}`)) $(`lib_${key_lib}`).remove();
        const lib = libs[key_lib];
        let lib_len = Object.keys(lib).length;
        let lib_ext = Object.keys(lib)[0].split(".")[1];
        let textContent = "";

        // get textContent of the lib
        for (let i = 0; i < lib_len; i++) {
          const element = lib[`${i}_${key_lib}.${lib_ext}`];
          textContent += element;
        }

        if (lib_ext === "js") {
          let script = document.createElement("script");
          script.id = `lib_${key_lib}`;
          script.textContent = textContent;
          document.getElementsByTagName("head")[0].appendChild(script);
        } else if (lib_ext === "css") {
          let style = document.createElement("style");
          style.id = `lib_${key_lib}`;
          style.textContent = textContent;
          document.head.append(style);
        }
      }
    }
  }
  let script = document.createElement("script");
  script.id = "script_data";
  document.getElementsByTagName("html")[0].appendChild(script);

  $("script_data").textContent = "";
  $("script_data").textContent = editor_data.getValue();
  window.spinWithTime(1);
});

// 停止並清除嵌入的程式碼
$("script_data_reset").addEventListener("click", () => {
  clearAllInterval();
  $("script_data").remove();
  window.dataFormatEntryPoint = undefined;
  window.spinWithTime(1);
});

// 建立 websocket 連線
$("script_data_ws").addEventListener("click", () => {
  try {
    let IP = prompt("請輸入 websocket server ip位址");
    if (!IP) {
      return;
    }

    if (typeof Worker === "undefined") {
      console.log("not support Worker");
      return;
    }

    if (typeof window.worker !== "undefined") {
      window.worker.terminate();
    }
    window.worker = undefined;
    let blob = new Blob([$("dev_worker").innerText], {
      type: "text/javascript",
    });
    let url = window.URL.createObjectURL(blob);
    window.worker = new Worker(url);
    window.worker.onmessage = wkMsg;
    let cmd = { URL: `http://${IP}` };
    window.worker.postMessage(cmd);
    window.spinWithTime(1);
  } catch (error) {
    console.error(error);
  }
});

// 移除 websocket 連線
$("script_data_removeWS").addEventListener("click", () => {
  if (typeof window.worker !== "undefined") {
    window.worker.terminate();
    window.worker = undefined;
    window.spinWithTime(1);
  } else {
    alert("not found websocket connection.");
  }
});

// 整理 DATA 區塊
$("beautify_data").addEventListener("click", (e) => {
  beautifyEditor(editor_data);
});

// DATA 切換全螢幕
$("full_data").addEventListener("click", (e) => {
  switchFullScreen("data", editor_data);
});

/*----------------------------------------------------*/
/*---------------Custom Command 編輯區塊---------------*/
/*---------------------------------------------------*/

// 初始化 自定義按鈕 UI 區塊
$("tx_ui_app").value = start_data.tx_ui_app;

// 同步區塊中程式至 localstorage 與畫面
$("tx_ui_app").addEventListener("input", (e) => {
  window.web_file["tx_ui_app"] = e.target.value;
  parseCmdBtn();
  syncDataLocalStorage();
});

// 初始化 自定義按鈕程式區塊
editor_app.value = start_data.tx_app;

// 同步區塊中程式至 localstorage
editor_app.on("change", (e) => {
  window.web_file["tx_app"] = editor_app.getValue();
  syncDataLocalStorage();
});

// 嵌入 Custom Command 程式編輯區塊內容至 script 中
$("script_app_run").addEventListener("click", () => {
  clearAllInterval();
  $("custom_list").innerHTML = "";
  $("main_ui").innerHTML = "";
  $("main_ui").innerHTML = editor_html.getValue();
  window.parseCmdBtn();
  if ($("script_app")) {
    $("script_app").remove();
  }
  let script = document.createElement("script");
  script.id = "script_app";
  document.getElementsByTagName("html")[0].appendChild(script);

  $("script_app").textContent = "";
  $("script_app").textContent = editor_app.getValue();

  window.spinWithTime(1);
});

// 停止並清除嵌入的程式碼
$("script_app_reset").addEventListener("click", () => {
  clearAllInterval();
  $("script_app").remove();
  $("custom_list").innerHTML = "";
  window.parseCmdBtn();
  window.spinWithTime(1);
});

// 解析內容產生按鈕
window.parseCmdBtn = function () {
  $("custom_list").innerHTML = "";
  let str = $("tx_ui_app").value;
  let str_arr = str.split("\n");
  str_arr.map((x) => {
    if (x.indexOf("#") !== -1) {
      let div = document.createElement("div");
      let span = document.createElement("span");
      div.className = "settingTitle";
      span.innerText = x.substr(1);
      div.appendChild(span);
      $("custom_list").appendChild(div);
    } else if (x.indexOf("title:") !== -1) {
      let arr = x.split(",");
      let div = document.createElement("div");
      let table = document.createElement("table");
      let td_title = document.createElement("td");
      let td_val = document.createElement("td");
      div.className = "settingBtn";
      td_title.className = "settingBtn-title";
      td_val.className = "settingBtn-val";
      arr.map((y) => {
        if (y.indexOf("title:") !== -1) {
          td_title.innerText = y.split(":")[1];
        } else if (y.indexOf("val:") !== -1) {
          td_val.innerText = y.split(":")[1];
        } else if (y.indexOf("val_id:") !== -1) {
          td_val.id = y.split(":")[1].replace(/\s/g, "");
        } else if (y.indexOf("btn_id:") !== -1) {
          div.id = y.split(":")[1].replace(/\s/g, "");
        }
      });
      table.appendChild(td_title);
      table.appendChild(td_val);
      div.appendChild(table);
      $("custom_list").appendChild(div);
    }
  });
};

// 整理 APP 區塊
$("beautify_app").addEventListener("click", (e) => {
  beautifyEditor(editor_app);
});

// APP 切換全螢幕
$("full_app").addEventListener("click", (e) => {
  switchFullScreen("app", editor_app);
});

/*-----------------------------------------------*/
/*---------------網頁編輯器設定與檔案---------------*/
/*----------------------------------------------*/

// 更新主頁文字顏色
function setHomeColor(color) {
  window.web_file["option_home_color"] = color;
  $("system_status_1").style.color = color;
  $("system_status_2").style.color = color;
  $("version").style.color = color;
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

// 更新選項顯示
function setOptions(flags) {
  for (const key in flags) {
    if (Object.hasOwnProperty.call(flags, key)) {
      const flag = flags[key];
      // 選項為真
      if (flag) {
        if ($(`option_${key}_flag`).checked === false) {
          $(`option_${key}_flag`).click();
        }
      }
      // 選項為假
      else {
        if ($(`option_${key}_flag`).checked === true) {
          $(`option_${key}_flag`).click();
        }
      }
    }
  }
}

// 同步更新區塊內資料至localstorage
function syncDataLocalStorage() {
  if (localStorage.getItem("file_name") !== "") {
    localStorage.setItem(
      `file_save_${localStorage.getItem("file_name")}`,
      JSON.stringify(window.web_file)
    );
  }
}

// 初始化網頁
function initialData() {
  initialGlobalWebFile();
  editor_html.setValue(start_data["tx_html"]);
  $("main_ui").innerHTML = "";

  let style = document.createElement("style");
  style.id = "ui_css";

  if (!$("ui_css")) document.getElementsByTagName("head")[0].appendChild(style);

  editor_css.setValue(start_data["tx_css"]);
  if (!$("ui_css")) $("ui_css").textContent = "";

  $("tx_ui_app").value = start_data["tx_ui_app"];
  parseCmdBtn();

  editor_data.setValue(start_data["tx_data"]);
  if ($("script_data")) $("script_data").remove();
  editor_app.setValue(start_data["tx_app"]);
  if ($("script_app")) $("script_app").remove();

  $("option_title").value = start_data["option_title"];
  $("title").innerText = start_data["option_title"];
  $("bottom_title").innerText = start_data["option_title"];

  $("option_version").value = start_data["option_version"];
  $("version").innerText = start_data["option_version"];

  setHomeColor(start_data["option_home_color"]);
  setHomeBackground(start_data["option_home_background"]);

  setOptions(start_data["options_flag"]);

  if (typeof window.worker !== "undefined") {
    window.worker.terminate();
    window.worker = undefined;
    window.spinWithTime(1);
  }
}

// 插入資料
function importData(data) {
  initialGlobalWebFile();
  window.web_file = { ...window.web_file, ...data };
  editor_html.setValue(data["tx_html"]);
  $("main_ui").innerHTML = data["tx_html"];

  editor_css.setValue(data["tx_css"]);
  $("ui_css").textContent = data["tx_css"];

  $("tx_ui_app").value = data["tx_ui_app"];
  parseCmdBtn();

  editor_data.setValue(data["tx_data"]);
  editor_app.setValue(data["tx_app"]);

  $("option_title").value = data["option_title"];
  $("title").innerText = data["option_title"];
  $("bottom_title").innerText = data["option_title"];

  $("option_version").value = data["option_version"];
  $("version").innerText = data["option_version"];

  setHomeColor(data["option_home_color"]);
  setHomeBackground(data["option_home_background"]);

  setOptions(window.web_file["options_flag"]);
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
  clearAllInterval();
  initialData();
  importData(data);
}

// 檔案管理 - 新增存檔
function fileNew() {
  var opt = $("file_select").options;
  var len = opt.length - 2;
  var name = prompt("請輸入名稱:", "未命名");
  if (name) {
    name = len < 10 ? `0${len}:${name}` : `${len}:${name}`;
    opt.add(new Option(name, name), opt[opt.length - 2]);
    localStorage.setItem(`file_save_${name}`, JSON.stringify(start_data));
    $("file_select").selectedIndex = opt.length - 3;
    localStorage.setItem("file_name", name);
    initialData();
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
  option.innerText = "選擇存檔";
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
  option.innerText = "新增存檔";
  opt.add(option);
  option = document.createElement("option");
  option.innerText = "刪除存檔";
  opt.add(option);
}

// 重新整理時初始化檔案
window.onload = function () {
  fileInit();
};

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

// 網頁頁腳顯示？
$("option_footer_flag").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("footer").classList.remove("hidden");
  } else {
    $("footer").classList.add("hidden");
  }
  web_file["options_flag"]["footer"] = e.target.checked;
  syncDataLocalStorage();
});

// 網頁標頭顯示？
$("option_title_flag").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("bottom_title").classList.remove("hidden");
  } else {
    $("bottom_title").classList.add("hidden");
  }
  web_file["options_flag"]["title"] = e.target.checked;
  syncDataLocalStorage();
});

// 系統資訊顯示？
$("option_systemStatus_flag").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("system_status_area").classList.remove("hidden");
  } else {
    $("system_status_area").classList.add("hidden");
  }
  web_file["options_flag"]["systemStatus"] = e.target.checked;
  syncDataLocalStorage();
});

// 網頁標頭設定
$("option_title").addEventListener("input", (e) => {
  let title = e.target.value;
  $("title").innerText = title;
  $("bottom_title").innerText = title;
  window.web_file["option_title"] = title;
  syncDataLocalStorage();
});

// 網頁版本設定
$("option_version").addEventListener("input", (e) => {
  let version = e.target.value;
  $("version").innerText = version;
  window.web_file["option_version"] = version;
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

// 功能開關 - 設定頁功能顯示？
$("option_config_flag").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-menu").parentElement.classList.remove("hidden");
  } else {
    $("open-menu").parentElement.classList.add("hidden");
  }
  web_file["options_flag"]["config"] = e.target.checked;
  syncDataLocalStorage();
});

// 功能開關 - 排程設定
$("option_schedule_flag").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-sche").classList.remove("hidden");
    $("btmMenu_sche").parentElement.classList.remove("hidden");
    return;
  }
  $("open-sche").classList.add("hidden");
  $("btmMenu_sche").parentElement.classList.add("hidden");

  web_file["options_flag"]["schedule"] = e.target.checked;
  syncDataLocalStorage();
});

// 功能開關 - 網路設定
$("option_network_flag").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-network").classList.remove("hidden");
    $("btmMenu_network").parentElement.classList.remove("hidden");
    return;
  }
  $("open-network").classList.add("hidden");
  $("btmMenu_network").parentElement.classList.add("hidden");

  web_file["options_flag"]["network"] = e.target.checked;
  syncDataLocalStorage();
});

// 功能開關 - 自定義設定
$("option_custom_flag").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-custom").classList.remove("hidden");
    $("btmMenu_custom").parentElement.classList.remove("hidden");
    return;
  }
  $("open-custom").classList.add("hidden");
  $("btmMenu_custom").parentElement.classList.add("hidden");

  web_file["options_flag"]["custom"] = e.target.checked;
  syncDataLocalStorage();
});

// 功能開關 - 系統設定
$("option_system_flag").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-system").classList.remove("hidden");
    $("btmMenu_system").parentElement.classList.remove("hidden");
    return;
  }
  $("open-system").classList.add("hidden");
  $("btmMenu_system").parentElement.classList.add("hidden");

  web_file["options_flag"]["system"] = e.target.checked;
  syncDataLocalStorage();
});

// 功能開關 - 終端機
$("option_terminal_flag").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-terminal").classList.remove("hidden");
    $("btmMenu_terminal").parentElement.classList.remove("hidden");
    return;
  }
  $("open-terminal").classList.add("hidden");
  $("btmMenu_terminal").parentElement.classList.add("hidden");

  web_file["options_flag"]["terminal"] = e.target.checked;
  syncDataLocalStorage();
});

// 套件匯入
$("import_lib").addEventListener("change", () => {
  let files = $("import_lib").files;
  let libs = {};
  let libName = prompt("請輸入套件名稱");

  // libName 不可包含特殊符號
  if (!libName) {
    $("import_lib").value = "";
    return;
  }

  if (Object.keys(window.web_file["libs"]).includes(libName)) {
    window.web_file["libs"][libName] = {};
  }

  let ext = files[0].name.split(".")[files[0].name.split(".").length - 1];
  for (const key in files) {
    if (Object.hasOwnProperty.call(files, key)) {
      const file = files[key];
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        if (file.name.includes("_")) {
          libs[`${file.name.split("_")[0]}_${libName}.${ext}`] =
            evt.target.result;
        } else {
          libs[`0_${libName}.${ext}`] = evt.target.result;
        }
      };
    }
  }
  console.log(libs);
  window.spinWithTime(1);
  window.web_file["libs"][libName] = libs;
  $("import_lib").value = "";

  setTimeout(() => {
    syncDataLocalStorage();
  }, 1000);
});

// 網頁匯出
$("export_web").addEventListener("click", async () => {
  const delay = (s) => {
    return new Promise((resolve) => {
      setTimeout(resolve, s);
    });
  };
  let name = prompt("請輸入檔案名稱：", window.web_file["option_title"]);
  if (name === null) {
    return;
  }

  window.spin(1);
  // 定義傳入壓縮檔案中的物件結構
  // codeArray = [{name:'', code:''},{name:'', code:''},...]
  let props = {
    outputFileName: name,
    codeArray: [],
  };

  // clone原始html, 對此document操作不影響原始html, fileName: index.html
  let clone_html = $("html").cloneNode(true);
  let html_head = clone_html.getElementsByTagName("head")[0];
  let html_body = clone_html.getElementsByTagName("body")[0];

  // clone要匯出的head內容
  let source_meta = $("source_meta").cloneNode(true);
  let source_manifest = $("manifest-placeholder").cloneNode(true);
  let source_icon = $("icon").cloneNode(true);
  let source_title = $("title").cloneNode(true);
  let source_style = $("source_style").cloneNode(true);

  // 清空head內容後再加入先前clone的元素
  html_head.innerHTML = "";
  html_head.appendChild(source_meta);
  html_head.appendChild(source_manifest);
  html_head.appendChild(source_icon);
  html_head.appendChild(source_title);
  html_head.appendChild(source_style);

  let clone_load = $("loading").cloneNode(true);
  clone_load.style = "";
  let clone_ui = $("ui_html").cloneNode(true);
  let clone_version = $("version").cloneNode(true);
  let clone_buildCheck = $("build_check").cloneNode(true);

  // 將ui_html中的參數初始化
  clone_ui.querySelector("#RSSI").innerText = "-";
  clone_ui.querySelector("#device").innerText = "-";
  clone_ui.querySelector("#time").innerText = "-";
  clone_ui.querySelector("#LT").innerText = "-";
  clone_ui.querySelector("#tx").innerText = "";
  clone_ui.querySelector("#cmd_input").innerText = "";
  clone_ui.querySelector("#system_device").innerText = "-";
  clone_ui.querySelector("#bps").innerText = "-";
  clone_ui.querySelector("#SSbps").innerText = "-";
  clone_ui.querySelector("#wifi").innerText = "-";
  clone_ui.querySelector("#wifi-result").innerHTML = "";
  clone_ui.querySelector("#sche_list").innerHTML = "";
  clone_ui.querySelector("#menu_bottom").classList.add("hidden");
  clone_ui.querySelector("#mask_setting").classList.add("hidden");
  clone_ui.querySelector("#sche_page").classList.add("hidden");
  clone_ui.querySelector("#custom_page").classList.add("hidden");
  clone_ui.querySelector("#network_page").classList.add("hidden");
  clone_ui.querySelector("#system_page").classList.add("hidden");
  clone_ui.querySelector("#terminal_page").classList.add("hidden");
  clone_ui.querySelector("#mask").classList.add("hidden");

  // 建立UI介面的html, fileName: ui.html
  props.codeArray.push({
    name: "ui.html",
    code: `${clone_ui.innerHTML}`,
  });

  // 清空body內容再加入先前clone的元素
  clone_ui.innerHTML = "";
  html_body.innerHTML = "";
  html_body.appendChild(clone_load);
  html_body.appendChild(clone_ui);
  html_body.appendChild(clone_version);
  clone_buildCheck.innerText = "build"; // 將 build check 中的文字改變成 build 讓前端程式判斷處理
  html_body.appendChild(clone_buildCheck);

  // 建立初始載入檔案與暫存程式(掛在index.html下),若有匯入套件則加入套件載入描述, fileName: index.html
  let clone_index = $("dev_load").cloneNode(true);
  let libInfo = [];
  let lib = window.web_file["libs"];

  for (const key in lib) {
    if (Object.hasOwnProperty.call(lib, key)) {
      const element = lib[key];
      let num = Object.keys(element).length;
      let ext =
        Object.keys(element)[0].split(".")[
          Object.keys(element)[0].split(".").length - 1
        ];
      libInfo.push({ name: key, num: num, ext: ext });
    }
  }
  console.log(libInfo);

  clone_index.innerText =
    `window.libList=${JSON.stringify(libInfo)};` + clone_index.innerText;
  clone_html.appendChild(clone_index);
  props.codeArray.push({
    name: "index.html",
    code: `<html>${clone_html.innerHTML}</html>`,
  });

  // 建立處理與ws通訊的worker程式, fileName: worker.js
  let clone_worker = $("dev_worker").innerText;
  props.codeArray.push({
    name: "worker.js",
    code: `${clone_worker}`,
  });

  // 建立將網頁轉換為app的描述檔, fileName: manifest.json
  let clone_manifest = $("index_manifest").innerHTML;
  props.codeArray.push({
    name: "manifest.json",
    code: `${clone_manifest}`,
  });

  // 建立原始頁面包含自定義CSS程式, fileName: style.css
  let clone_css = $("build_style").cloneNode(true);
  let css_name = clone_css.href.split(window.location.origin)[1];
  await fetch(
    `${window.location.protocol}//${window.location.host}/${css_name}`
  )
    .then((res) => {
      res.text().then((data) => {
        props.codeArray.push({
          name: "style.css",
          code: `${data}\n${window.web_file["tx_css"]}`,
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });

  // 建立資料處理程式(原始index.js與自定義data format程式,處理ws資料), fileName: index.js
  let clone_src = $("dev_index").cloneNode(true);
  let src_name = clone_src.src.split(window.location.origin)[1];
  await fetch(
    `${window.location.protocol}//${window.location.host}/${src_name}`
  ).then((res) => {
    res.text().then((data) => {
      props.codeArray.push({
        name: "index.js",
        code: `${data}\n${window.web_file["tx_data"]}`,
      });
    });
  });

  // 建立介面與按鈕觸發事件程式(原始app.js與自定義custom command 程式), fileName: app.js
  let clone_app = $("dev_app").cloneNode(true);
  let app_name = clone_app.src.split(window.location.origin)[1];
  await fetch(
    `${window.location.protocol}//${window.location.host}/${app_name}`
  ).then((res) => {
    res.text().then((data) => {
      props.codeArray.push({
        name: "app.js",
        code: `${data}\n${window.web_file["tx_app"]}`,
      });
    });
  });

  await delay(500);

  let libs = window.web_file["libs"];

  if (Object.keys(libs).length !== 0) {
    for (const key in libs) {
      if (Object.hasOwnProperty.call(libs, key)) {
        let lib = libs[key];
        for (const key2 in lib) {
          if (Object.hasOwnProperty.call(lib, key2)) {
            const element = lib[key2];
            props.codeArray.push({
              name: `lib/${key}/${key2}`,
              code: element,
            });
          }
        }
      }
    }

    await delay(500);
  }

  // 將處理完後的物件傳入 jsZip 中進行壓縮並匯出;
  jsZip(props);

  window.spin(0);
});

// 網頁匯入 - HTML
$("import_html").addEventListener("change", () => {
  var f = $("import_html").files[0];
  var str;
  var reader = new FileReader();
  reader.readAsText(f, "UTF-8");
  reader.onload = function (evt) {
    str = evt.target.result;
    console.log(`import: ${f.name}`);
    window.web_file["tx_html"] = str;
    editor_html.setValue(str);
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
    window.web_file["tx_css"] = str;
    editor_css.setValue(str);
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
    editor_data.setValue(str);
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
    editor_app.setValue(str);
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
    $("import_file").value = "";
    window.location.reload();
  };
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

/*-----------------------------------------------*/
/*-----------------編輯器熱鍵功能------------------*/
/*----------------------------------------------*/

// 恢復隱藏的編輯器視窗
document.ondblclick = function (e) {
  $("webeditor").classList.remove("hidden");
};
