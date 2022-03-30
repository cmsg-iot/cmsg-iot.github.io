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
});

// 切換 DATA 編輯
$("webeditor_data_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.add("hidden");
  $("webeditor_data").classList.remove("hidden");
  $("webeditor_cmd").classList.add("hidden");
  $("webeditor_config").classList.add("hidden");
});

// 切換 CMD 編輯
$("webeditor_cmd_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.add("hidden");
  $("webeditor_data").classList.add("hidden");
  $("webeditor_cmd").classList.remove("hidden");
  $("webeditor_config").classList.add("hidden");
});

// 切換 Config 編輯
$("webeditor_config_btn").addEventListener("click", () => {
  $("webeditor_ui").classList.add("hidden");
  $("webeditor_data").classList.add("hidden");
  $("webeditor_cmd").classList.add("hidden");
  $("webeditor_config").classList.remove("hidden");
});

/*----------------------------------------*/
/*---------------UI 編輯區塊---------------*/
/*---------------------------------------*/

// HTML 程式編輯區塊
$("tx_ui_html").addEventListener("input", (e) => {
  // console.log(e.target.value);
  $("main_ui").innerHTML = e.target.value;
});

// CSS 程式編輯區塊
$("tx_ui_css").addEventListener("input", (e) => {
  // console.log(e.target.value);
  $("ui_css").textContent = e.target.value;
});

/*-------------------------------------------------*/
/*---------------DATA Format 編輯區塊---------------*/
/*------------------------------------------------*/
$("tx_data").value = "function dataFormatEntryPoint(data) {\n    \n};";

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
$("script_data_stop").addEventListener("click", () => {
  clearAllInterval();
  $("script_data").remove();
  window.dataFormatEntryPoint = undefined;
});

/*----------------------------------------------------*/
/*---------------Custom Command 編輯區塊---------------*/
/*---------------------------------------------------*/

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
$("script_app_stop").addEventListener("click", () => {
  clearAllInterval();
  $("script_app").remove();
});

/*-----------------------------------------------*/
/*---------------網頁編輯器設定與檔案---------------*/
/*----------------------------------------------*/

$("webeditor_opacity").addEventListener("change", (e) => {
  $("webeditor").style.opacity = e.target.value / 100;
});

$("option_title").addEventListener("input", (e) => {
  let title = e.target.value;
  $("title").innerText = title;
  $("bottom_title").innerText = title;
});

$("option_schedule").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-sche").classList.remove("hidden");
    return;
  }
  $("open-sche").classList.add("hidden");
});

$("option_network").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-network").classList.remove("hidden");
    return;
  }
  $("open-network").classList.add("hidden");
});

$("option_custom").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-custom").classList.remove("hidden");
    return;
  }
  $("open-custom").classList.add("hidden");
});

$("option_system").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-system").classList.remove("hidden");
    return;
  }
  $("open-system").classList.add("hidden");
});

$("option_terminal").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("open-terminal").classList.remove("hidden");
    return;
  }
  $("open-terminal").classList.add("hidden");
});
