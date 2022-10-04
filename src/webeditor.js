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
    $("webeditor_expand").children[0].innerHTML = "expand_more";
    $("webeditor").style.height = "50px";
  } else {
    window.webeditor_expand = true;
    $("webeditor_container").style.display = "";
    $("webeditor_expand").children[0].innerHTML = "expand_less";
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
  $("webeditor_expand").children[0].innerHTML = "expand_less";
  $("webeditor").style.height = "";
});

// 隱藏網頁編輯器
$("webeditor_hidden").addEventListener("click", () => {
  alert("隱藏編輯器，雙擊畫面後可再顯示");
  $("webeditor").classList.add("hidden");
});

// 網頁版本資訊
$("webeditor_info").addEventListener("click", () => {
  alert("即將顯示網頁版本相關資訊...");
});

// 切換 UI 編輯
$("webeditor_ui_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.remove("hidden");
  $("webeditor_data").classList.add("hidden");
  $("webeditor_cmd").classList.add("hidden");
  $("webeditor_config").classList.add("hidden");
  $("webeditor_file").classList.add("hidden");
  // editor_html.setValue(window.web_file["tx_html"]);
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

  reloadUserInfo();
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
  lib_size: {},
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
  web_file["lib_size"] = {};
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

// 嵌入 DATA 與 CMD 程式編輯區塊內容至 script 中
$("script_data_run").addEventListener("click", () => {
  clearAllInterval();
  if ($("script_data")) {
    $("script_data").remove();
  }

  $("custom_list").innerHTML = "";
  $("main_ui").innerHTML = "";
  $("main_ui").innerHTML = editor_html.getValue();
  window.parseCmdBtn();

  let script = document.createElement("script");
  script.id = "script_app";
  document.getElementsByTagName("html")[0].appendChild(script);

  $("script_app").textContent = "";
  $("script_app").textContent = editor_app.getValue();

  script = document.createElement("script");
  script.id = "script_data";
  document.getElementsByTagName("html")[0].appendChild(script);

  $("script_data").textContent = "";
  $("script_data").textContent = editor_data.getValue();

  window.spinWithTime(1);
});

// 停止並清除嵌入的程式碼
$("script_data_reset").addEventListener("click", () => {
  clearAllInterval();
  $("main_ui").innerHTML = editor_html.getValue();
  $("script_data").remove();
  window.dataFormatEntryPoint = undefined;
  $("script_app").remove();
  $("custom_list").innerHTML = "";
  window.parseCmdBtn();
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
// $("script_app_run").addEventListener("click", () => {
//   clearAllInterval();
//   $("custom_list").innerHTML = "";
//   $("main_ui").innerHTML = "";
//   $("main_ui").innerHTML = editor_html.getValue();
//   window.parseCmdBtn();
//   if ($("script_app")) {
//     $("script_app").remove();
//   }
//   let script = document.createElement("script");
//   script.id = "script_app";
//   document.getElementsByTagName("html")[0].appendChild(script);

//   $("script_app").textContent = "";
//   $("script_app").textContent = editor_app.getValue();

//   window.spinWithTime(1);
// });

// 停止並清除嵌入的程式碼
// $("script_app_reset").addEventListener("click", () => {
//   clearAllInterval();
//   $("script_app").remove();
//   $("custom_list").innerHTML = "";
//   window.parseCmdBtn();
//   window.spinWithTime(1);
// });

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
/*------------------網頁編輯器設定-----------------*/
/*----------------------------------------------*/

// 同步更新區塊內資料至localstorage
function syncDataLocalStorage() {
  if (localStorage.getItem("file_name") !== "") {
    localStorage.setItem(
      `file_save_${localStorage.getItem("file_name")}`,
      JSON.stringify(window.web_file)
    );
  }
}

/*---------------編輯器UI屬性---------------*/

// 透明度設定
$("webeditor_opacity").addEventListener("change", (e) => {
  $("webeditor").style.opacity = e.target.value / 100;
});

/*----------------網頁功能----------------*/

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

// 更新參數設定、功能啟用
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

/*-----------------------------------------------*/
/*-------------------檔案管理設定------------------*/
/*-----------------------------------------------*/

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

  refreshLib();
}

// 套件重新整理
function refreshLib() {
  removeLib();

  if (localStorage.getItem("file_global_libs")) {
    let glib = JSON.parse(localStorage.getItem("file_global_libs"));
    injectLib(glib.libs, Object.keys(glib.libs).length);
  }
  injectLib(window.web_file.libs, Object.keys(window.web_file.libs).length);
}

// 插入套件至網頁
function injectLib(lib, len) {
  let libs = lib;
  let libs_len = len;
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
}

// 從網頁移除套件
function removeLib() {
  // remove previous lib
  let old_lib = $("head").children.length - 24;
  let bd = $("body").children.length - 14;

  for (let i = 0; i < old_lib; i++) {
    $("head").children[24].remove();
  }

  // for (let i = 0; i < bd; i++) {
  //   $("body").children[14].remove();
  // }
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

/*--------------本地檔案管理---------------*/

// 套件匯入
$("btn_import_lib").addEventListener("change", () => {
  let isGlobal = confirm("是否為共用套件？");
  let files = $("btn_import_lib").files;
  let libs = {};
  let libName = prompt("請輸入套件名稱");

  // libName 不可包含特殊符號
  if (!libName) {
    $("btn_import_lib").value = "";
    return;
  }

  if (Object.keys(window.web_file["libs"]).includes(libName)) {
    window.web_file["libs"][libName] = {};
  }

  let ext = files[0].name.split(".")[files[0].name.split(".").length - 1];
  let size = 0;
  for (const key in files) {
    if (Object.hasOwnProperty.call(files, key)) {
      const file = files[key];
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        size += evt.target.result.length;
        if (file.name.includes("_")) {
          libs[`${file.name.split("_")[0]}_${libName}.${ext}`] =
            evt.target.result;
        } else {
          libs[`0_${libName}.${ext}`] = evt.target.result;
        }
      };
    }
  }
  window.spinWithTime(2);
  setTimeout(() => {
    console.log(`libName: ${libName}, size: ${size}`);
    if (isGlobal) {
      let origin = localStorage.getItem("file_global_libs");
      if (origin) {
        origin = JSON.parse(origin);
      } else {
        origin = { libs: {}, lib_size: {} };
      }
      origin["libs"][libName] = libs;
      origin["lib_size"][libName] = size;
      localStorage.setItem("file_global_libs", JSON.stringify(origin));
    } else {
      window.web_file["libs"][libName] = libs;
      window.web_file["lib_size"][libName] = size;
    }

    $("btn_import_lib").value = "";
    refreshLib();
  }, 500);

  setTimeout(() => {
    syncDataLocalStorage();
  }, 1000);
});

// 套件清除
$("btn_clear_lib").addEventListener("click", () => {
  let isGlobal = confirm("是否為共用套件？");
  let result = confirm("確定清除套件?");
  if (!result) return;

  window.spinWithTime(1);
  if (isGlobal) {
    console.log("removed global lib");
    localStorage.removeItem("file_global_libs");
  } else {
    console.log("removed current lib");
    removeLib();
    window.web_file["lib_size"] = {};
    window.web_file["libs"] = {};
    syncDataLocalStorage();
  }
});

// 網頁匯出
$("btn_export_web").addEventListener("click", async () => {
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
  clone_html.innerHTML = "";
  clone_html.childNodes[0].remove();
  clone_html.childNodes[0].remove();

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

  // 清除設定頁程式
  if (
    !web_file["options_flag"]["config"] ||
    !web_file["options_flag"]["footer"]
  ) {
    clone_ui.querySelector("#page_setting").innerHTML = "";
  }

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
  clone_html.appendChild(html_head);
  clone_html.appendChild(html_body);

  // 建立初始載入檔案與暫存程式(掛在index.html下),若有匯入套件則加入套件載入描述, fileName: index.html
  let clone_index = $("dev_load").cloneNode(true);
  let libInfo = [];
  let lib = window.web_file["libs"];
  let size = window.web_file["lib_size"];

  if (localStorage.getItem("file_global_libs")) {
    let glib = JSON.parse(localStorage.getItem("file_global_libs"));
    lib = glib.libs;
    size = glib.lib_size;
  }

  for (const key in lib) {
    if (Object.hasOwnProperty.call(lib, key)) {
      const element = lib[key];
      let num = Object.keys(element).length;
      let ext =
        Object.keys(element)[0].split(".")[
          Object.keys(element)[0].split(".").length - 1
        ];
      libInfo.push({ name: key, num: num, ext: ext, size: size[key] });
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
  if (localStorage.getItem("file_global_libs")) {
    let glib = JSON.parse(localStorage.getItem("file_global_libs"));
    libs = glib.libs;
  }

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
$("btn_import_html").addEventListener("change", () => {
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
$("btn_import_css").addEventListener("change", () => {
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
$("btn_import_data").addEventListener("change", () => {
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
$("btn_import_cmd").addEventListener("change", () => {
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
      if (key.includes("file_")) {
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
$("btn_export_file").addEventListener("click", () => {
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
  var f = $("btn_import_file").files[0];
  var json = {};
  var str;
  var reader = new FileReader();
  reader.readAsText(f, "UTF-8");
  reader.onload = function (evt) {
    str = evt.target.result;
    console.log(`import: ${f.name}`);
    json = JSON.parse(reader.result)["web_file"];
    for (const key in json) {
      if (Object.hasOwnProperty.call(json, key)) {
        const element = json[key];
        localStorage.setItem(key, element);
      }
    }
    $("btn_import_file").value = "";
    window.location.reload();
  };
}

// 連結匯入
function fileImportByURL() {}

// 檔案上傳成功時呼叫匯入程式
$("btn_import_file").addEventListener("change", () => {
  let check = confirm("匯入將覆蓋原有檔案");
  if (!check) {
    $("btn_import_file").value = "";
    return;
  }
  fileImport();
});

// 檢查檔案連結是否有效後再匯入
$("btn_import_file_link").addEventListener("click", () => {
  let link = prompt("輸入有效檔案來源連結");
  if (!link) return;

  fetch(link).then((e) => {
    if (!e.ok) {
      alert("檔案連結無效！");
      return;
    }
    e.text().then((data) => {
      if (!data.includes("web_file")) {
        alert("檔案格式錯誤！");
        return;
      }

      let check = confirm("已取得檔案，匯入將覆蓋原有檔案");
      if (!check) return;

      let json = JSON.parse(data)["web_file"];
      for (const key in json) {
        if (Object.hasOwnProperty.call(json, key)) {
          const element = json[key];
          localStorage.setItem(key, element);
        }
      }

      window.location.reload();
    });
  });
});

/*--------------雲端檔案管理---------------*/
window.cloud_edit_mode_flag = false;
let origin = window.location.origin + "/fileserver";

// 雲端檔案清單
$("btn_cloud_file_list").addEventListener("click", () => {
  isUserLogin().then((res) => {
    if (res.status !== 200) {
      cloudGoPage("login");
    } else {
      cloudGoPage("menu");
    }
  });
});

// 上傳目前存檔
$("btn_cloud_upload_current").addEventListener("click", () => {
  window.spin(1);
  isUserLogin()
    .then((res) => {
      if (handleResponse(res)) {
        getTags()
          .then((tags) => {
            return tags.json();
          })
          .then((data) => {
            window.selected_tagId = data[0].id;
            uploadCurrentFile("")
              .then((res) => {
                window.spin(0);
                if (handleResponse(res)) {
                  alert("已上傳當前暫存檔");
                }
              })
              .catch((err) => {
                window.spin(0);
                console.log(err);
              });
          })
          .catch((err) => {
            window.spin(0);
            console.log(err);
          });
      }
    })
    .catch((err) => {
      window.spin(0);
      console.log(err);
    });
});

// 更新使用者資訊
function reloadUserInfo() {
  getUserInfo()
    .then((res) => {
      if (res.status !== 200) {
        $("cloud_user_info_2").innerText = "未登入";
        return;
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        $("cloud_user_info_2").innerText = `User: ${data.username}`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 登入
$("btn_cloud_login").addEventListener("click", () => {
  let username = $("cloud_login_username").value;
  let password = $("cloud_login_password").value;
  if (!(username && password)) {
    alert("請填寫使用者名稱及密碼！");
    return;
  }

  window.spinOnlyIcon(1);
  // 使用者登入
  let body = { username: username, password: password };
  fetch(origin + "/api/auth/signin", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => {
    console.log(res);
    window.spinOnlyIcon(0);
    if (res.status === 401) {
      alert("密碼錯誤！");
      $("cloud_login_password").value = "";
      return;
    } else if (res.status === 404) {
      alert("不存在的使用者！");
      $("cloud_login_username").value = "";
      $("cloud_login_password").value = "";
      return;
    } else if (res.status === 200) {
      localStorage.setItem("firstLogin", true);
      window.location.reload();
    }
    $("cloud_login_username").value = "";
    $("cloud_login_password").value = "";
  });
});

if (localStorage.getItem("firstLogin") === "true") {
  setTimeout(() => {
    $("btn_cloud_file_list").click();
  }, 100);
  localStorage.setItem("firstLogin", "");
}

// 登出
$("btn_cloud_logout").addEventListener("click", () => {
  let res = confirm("確定登出?");
  if (res) {
    fetch(origin + "/api/auth/logout").then((res) => {
      console.log(res);
      cloudGoPage("login");
    });
  }
});

// 關閉Login頁面
$("btn_close_login").addEventListener("click", () => {
  cloudGoPage("home");
});

// 關閉Menu頁面
$("btn_close_menu").addEventListener("click", () => {
  cloudGoPage("home");
});

function handleResponse(res) {
  console.log(res);
  if (res.status === 403) {
    window.spinOnlyIcon(0);
    alert("使用者未登入！");
    cloudGoPage("login");
    return false;
  } else if (res.status === 400) {
    window.spinOnlyIcon(0);
    alert(`錯誤代碼400\n訊息:${JSON.stringify(res.json())}`);
    return false;
  }
  return true;
}
window.selected_tagId = "";
window.selected_tagName = "";
function handleSelectTag(id, name) {
  window.selected_tagId = id;
  window.selected_tagName = name;
}

function cloudGoPage(page) {
  $("cloud_file_container").classList.add("hidden");
  $("cloud_file_login").classList.add("hidden");
  $("cloud_file_menu").classList.add("hidden");
  switch (page) {
    case "home":
      break;
    case "login":
      $("cloud_file_container").classList.remove("hidden");
      $("cloud_file_login").classList.remove("hidden");
      break;
    case "menu":
      $("cloud_file_container").classList.remove("hidden");
      $("cloud_file_menu").classList.remove("hidden");
      $("cloud_tags_list").innerHTML = "";
      $("cloud_files_list").innerHTML = "";
      handleSelectTag("", "");
      if (window.cloud_edit_mode_flag) {
        switchEditMode();
      }
      window.spinOnlyIcon(1);
      getUserInfo()
        .then((res) => {
          handleResponse(res);
          return res.json();
        })
        .then((data) => {
          console.log(data.username);
          $("cloud_user_info").innerText = `User: ${data.username}`;
        })
        .catch((err) => {
          console.log(err);
          window.spinOnlyIcon(0);
        });

      getTags()
        .then((res) => {
          handleResponse(res);
          return res.json();
        })
        .then((data) => {
          window.spinOnlyIcon(0);
          showTagList(data);
        })
        .catch((err) => {
          console.log(err);
          window.spinOnlyIcon(0);
        });
      break;
    default:
      break;
  }
}

function isUserLogin() {
  let api = "/api/user";
  return fetch(origin + api);
}

function getUserInfo() {
  return fetch(origin + "/api/user/info");
}

function getTags() {
  $("cloud_tags_list").innerHTML = "";
  return fetch(origin + "/api/file/tag");
}

function getFileList(tagId) {
  $("cloud_files_list").innerHTML = "";
  let body = { tagId: tagId };
  return fetch(origin + "/api/file/list", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
}

function getFileAndImport(tagId, fileName) {
  window.spinOnlyIcon(1);
  let body = { tagId: tagId, fileName: fileName };
  fetch(origin + "/api/file/data", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => {
      handleResponse(res);
      return res.json();
    })
    .then((data) => {
      localStorage.clear();
      let decode = new TextDecoder().decode(new Uint8Array(data.data.data));
      let json = JSON.parse(decode)["web_file"];
      for (const key in json) {
        if (Object.hasOwnProperty.call(json, key)) {
          const element = json[key];
          localStorage.setItem(key, element);
        }
      }
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      window.spinOnlyIcon(0);
    });
}

function removeTagAndFiles(tagId) {
  let body = { tagId: tagId };
  return fetch(origin + "/api/tag", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(body),
  });
}

function removeFilesByTag(tagId) {
  let body = { tagId: tagId };
  return fetch(origin + "/api/files", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(body),
  });
}
function removeFile(tagId, fileName) {
  let body = { tagId: tagId, fileName: fileName };
  return fetch(origin + "/api/file", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(body),
  });
}

function showTagList(tags) {
  console.log(tags);
  window.selected_tagId = "";
  $("cloud_files_list").innerHTML = "";

  for (let i = 0; i < tags.length; i++) {
    let li = document.createElement("li");
    let div = document.createElement("div");
    li.id = tags[i].id;
    div.innerText = tags[i].tag;
    li.onclick = function () {
      window.selected_tagId = tags[i].id;
      handleSelectTag(tags[i].id, tags[i].tag);
      highlightSeletedTag();
      window.spinOnlyIcon(1);
      getFileList(tags[i].id)
        .then((res) => {
          handleResponse(res);
          return res.json();
        })
        .then((data) => {
          window.spinOnlyIcon(0);
          showFileList(data);
        })
        .catch((err) => {
          window.spinOnlyIcon(0);
          console.log(err);
        });
    };
    li.appendChild(div);
    $("cloud_tags_list").appendChild(li);
  }
}

function highlightSeletedTag() {
  for (let i = 0; i < $("cloud_tags_list").children.length; i++) {
    if (window.selected_tagId === $("cloud_tags_list").children[i].id) {
      $("cloud_tags_list").children[i].classList.add("tag-highlight");
    } else {
      $("cloud_tags_list").children[i].classList.remove("tag-highlight");
    }
  }
}

function showFileList(files) {
  console.log(files);

  for (let i = 0; i < files.length; i++) {
    let li = document.createElement("li");
    let div = document.createElement("div");
    li.title = files[i].createdAt;
    li.className = "fadeIn";
    div.innerText = files[i].fileName;
    li.onclick = function () {
      let res = confirm(
        `覆蓋檔案後無法恢復，\n確定載入 ${files[i].fileName} ? `
      );
      if (res) {
        getFileAndImport(window.selected_tagId, files[i].fileName);
      }
    };
    li.appendChild(div);
    $("cloud_files_list").appendChild(li);
  }
  if (window.cloud_edit_mode_flag) {
    createFileDelete();
  }
}

function switchEditMode() {
  if (!window.cloud_edit_mode_flag) {
    // enable edit
    $("cloud_edit_mode").classList.add("edit-mode-enable");
    window.cloud_edit_mode_flag = true;
    $("cloud_tag_add").classList.remove("hidden");
    $("cloud_file_upload").classList.remove("hidden");
    createTagDelete();
    createFileDelete();
  } else {
    // disable edit
    $("cloud_edit_mode").classList.remove("edit-mode-enable");
    window.cloud_edit_mode_flag = false;

    $("cloud_tag_add").classList.add("hidden");
    $("cloud_file_upload").classList.add("hidden");

    for (let i = 0; i < $("cloud_tags_list").children.length; i++) {
      $("cloud_tags_list").children[i].classList.remove("delete-icon");
      $("cloud_tags_list").children[i].children[1].remove();
      $("cloud_tags_list").children[i].children[0].style.width = "100%";
    }

    for (let i = 0; i < $("cloud_files_list").children.length; i++) {
      $("cloud_files_list").children[i].classList.remove("delete-icon");
      $("cloud_files_list").children[i].children[1].remove();
      $("cloud_files_list").children[i].children[0].style.width = "100%";
    }
  }
}

function createTagDelete() {
  for (let i = 0; i < $("cloud_tags_list").children.length; i++) {
    let div = document.createElement("div");
    let span = document.createElement("span");
    span.innerText = "delete";
    span.className = "material-symbols-outlined";
    $("cloud_tags_list").children[i].children[0].style.width = "75%";
    div.className = "cloud-tag-delete fadeIn";

    // 第一個 tag:temp 插入清除所有file的功能
    if (!i) {
      span.innerText = "clear_all";
      div.appendChild(span);
      div.onclick = function (e) {
        e.stopPropagation();
        let result = confirm("清除所有暫存檔?");
        if (result) {
          removeFilesByTag($("cloud_tags_list").children[i].id)
            .then((res) => {
              handleResponse(res);
              return res.json();
            })
            .then((data) => {
              console.log(data);
              getTags()
                .then((res) => {
                  handleResponse(res);
                  return res.json();
                })
                .then((data) => {
                  showTagList(data);
                  createTagDelete();
                });
            });
        }
      };
      $("cloud_tags_list").children[i].classList.add("delete-icon");
      $("cloud_tags_list").children[i].appendChild(div);
      continue;
    }

    div.appendChild(span);

    div.onclick = function (e) {
      e.stopPropagation();
      let result = confirm(
        `刪除標籤將會同時刪除標籤底下的檔案，\n確定刪除標籤: ${
          $("cloud_tags_list").children[i].children[0].innerText
        } ?`
      );
      if (result) {
        removeTagAndFiles($("cloud_tags_list").children[i].id)
          .then((res) => {
            handleResponse(res);
            return res.json();
          })
          .then((data) => {
            console.log(data);
            getTags()
              .then((res) => {
                handleResponse(res);
                return res.json();
              })
              .then((data) => {
                showTagList(data);
                createTagDelete();
              });
          });
      }
    };
    $("cloud_tags_list").children[i].classList.add("delete-icon");
    $("cloud_tags_list").children[i].appendChild(div);
  }
}

function createFileDelete() {
  for (let i = 0; i < $("cloud_files_list").children.length; i++) {
    let div = document.createElement("div");
    let span = document.createElement("span");
    span.innerText = "delete";
    span.className = "material-symbols-outlined";
    $("cloud_files_list").children[i].children[0].style.width = "75%";
    div.className = "cloud-file-delete fadeIn";
    div.appendChild(span);
    div.onclick = function (e) {
      e.stopPropagation();
      let result = confirm(
        `刪除檔案將無法恢復，\n確定刪除檔案: ${
          $("cloud_files_list").children[i].children[0].innerText
        } ?`
      );
      if (result) {
        removeFile(
          window.selected_tagId,
          $("cloud_files_list").children[i].children[0].innerText
        )
          .then((res) => {
            handleResponse(res);
            return res.json();
          })
          .then((data) => {
            console.log(data);
            getFileList(window.selected_tagId)
              .then((res) => {
                handleResponse(res);
                return res.json();
              })
              .then((data) => {
                showFileList(data);
              });
          });
      }
    };
    $("cloud_files_list").children[i].classList.add("delete-icon");
    $("cloud_files_list").children[i].appendChild(div);
  }
}

$("cloud_edit_mode").addEventListener("click", () => {
  switchEditMode();
});

function createNewTag(name) {
  let body = { tag: name };
  return fetch(origin + "/api/file/tag", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
}

function uploadCurrentFile(fileName) {
  const obj = {};
  obj["web_file"] = {};
  let sourceObj = { ...localStorage };
  for (const key in sourceObj) {
    if (Object.hasOwnProperty.call(sourceObj, key)) {
      const element = sourceObj[key];
      if (key.includes("file_")) {
        obj["web_file"][key] = element;
      }
    }
  }

  let cur_time = new Date();
  let Y = cur_time.getFullYear();
  let M =
    cur_time.getMonth() + 1 >= 10
      ? cur_time.getMonth() + 1
      : `0${cur_time.getMonth() + 1}`;
  let d =
    cur_time.getDate() >= 10 ? cur_time.getDate() : `0${cur_time.getDate()}`;
  let h =
    cur_time.getHours() >= 10 ? cur_time.getHours() : `0${cur_time.getHours()}`;
  let m =
    cur_time.getMinutes() >= 10
      ? cur_time.getMinutes()
      : `0${cur_time.getMinutes()}`;
  let s =
    cur_time.getSeconds() >= 10
      ? cur_time.getSeconds()
      : `0${cur_time.getSeconds()}`;
  let fn = `${Y}/${M}/${d}T${h}:${m}:${s} ${fileName}`.replace(
    /^\s+|\s+$/g,
    ""
  );
  let body = {
    tagId: window.selected_tagId,
    fileName: fn,
    fileData: JSON.stringify(obj, null, 2),
  };
  return fetch(origin + "/api/file", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
}

$("cloud_tag_add").addEventListener("click", () => {
  let name = prompt("新增標籤名稱?");
  if (name) {
    handleSelectTag("", "");
    createNewTag(name)
      .then((res) => {
        handleResponse(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        $("cloud_files_list").innerHTML = "";
        getTags()
          .then((res) => {
            handleResponse(res);
            return res.json();
          })
          .then((data) => {
            showTagList(data);
            createTagDelete();
          });
      });
  }
});

$("cloud_file_upload").addEventListener("click", () => {
  if (window.selected_tagId === "") {
    alert("請選擇標籤！");
    return;
  }
  let fileName = prompt(`目前標籤:${window.selected_tagName}\n上傳檔案名稱?`);
  if (!fileName) {
    return;
  }
  uploadCurrentFile(fileName)
    .then((res) => {
      if (handleResponse(res)) {
        $(window.selected_tagId).click();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/*-----------------------------------------------*/
/*-----------------編輯器熱鍵功能------------------*/
/*----------------------------------------------*/

// 恢復隱藏的編輯器視窗
document.ondblclick = function (e) {
  $("webeditor").classList.remove("hidden");
};
