window.btmMenu_previous = "btmMenu_sche";

window.CORE_CMD = {
  wifi_scan: "@ap scan",
  wifi_connect: (ssid, pwd) => {
    return `@ap connect [${ssid}]:[${pwd}]`;
  },
  wifi_reconnect: "@ap connect reconnect",
  wifi_reset: "@ap connect reset",
  device_set_name: (name) => {
    return `@set device id:${name}`;
  },
  device_set_ssid: (ssid, pwd) => {
    return `@set sap [${ssid}]:[${pwd}]`;
  },
  device_set_bps: (baud) => {
    return `@bps: ${baud}`;
  },
  device_set_SSbps: (baud) => {
    return `SS bps: ${baud}`;
  },
  sche_show: "schedule show",
  sche_add: (week, time, area_arr) => {
    return `schedule add Week:${week} H:M=${time} ${area_arr.join(" ")}`;
  },
  sche_save: "schedule save",
  sche_remove: (index) => {
    return `schedule remove ${index}`;
  },
  ws_ping: "@rssi?",
};

window.CUSTOM_CMD = {
  wifi_set_addr: (addr) => {
    return `set recv Addr ${addr}`;
  },
  wifi_get_addr: "get recv Addr",
  system_setting: "system setting",
  system_set: (key, value) => {
    return `system setting ${key}: ${value}`;
  },
  system_save: "system setting save",
  file_write: "write DNA",
  file_get: "get DNA",
  file_remove: "remove file DNA.dat",
  modbus_add: (st, cycle, rds, key_arr) => {
    return `add station st:${st}|cycle:${cycle}|rds:${rds}|${key_arr.join("")}`;
  },
  modbus_show: "show station",
};

window.$ = function (id) {
  return document.getElementById(id);
};

/*------------Interface Action------------*/

// bottom menu switch page
window.switch_page = function (target) {
  if (target.id === btmMenu_previous) {
    return;
  }
  if (btmMenu_previous === "home" || btmMenu_previous === "menu") {
    $(target.id).parentElement.classList.add("buttomMenu-selected");
    show_page(target.id.split("_")[1]);
  } else if (btmMenu_previous !== "") {
    $(btmMenu_previous).parentElement.classList.remove("buttomMenu-selected");
    $(target.id).parentElement.classList.add("buttomMenu-selected");
    show_page(target.id.split("_")[1]);
    hide_page(btmMenu_previous.split("_")[1]);
  }
  btmMenu_previous = target.id;
};

// show target page
window.show_page = function (target) {
  switch (target) {
    case "sche":
      localStorage.setItem("current_hash", location.hash);
      $("btmMenu_sche").parentElement.classList.add("buttomMenu-selected");
      $("sche_editor").classList.add("hidden");
      $("sche_page").classList.remove("hidden");
      $("sche_list").classList.remove("hidden");
      $("sche_list").scrollTo({
        top: 0,
        behavior: "smooth",
      });
      $("sche_btn_group").classList.remove("hidden");
      break;
    case "custom":
      localStorage.setItem("current_hash", location.hash);
      $("btmMenu_custom").parentElement.classList.add("buttomMenu-selected");
      $("custom_page").classList.remove("hidden");
      $("custom_list").scrollTo({
        top: 0,
        behavior: "instant",
      });
      break;
    case "network":
      localStorage.setItem("current_hash", location.hash);
      $("btmMenu_network").parentElement.classList.add("buttomMenu-selected");
      $("network_page").classList.remove("hidden");
      break;
    case "system":
      localStorage.setItem("current_hash", location.hash);
      $("btmMenu_system").parentElement.classList.add("buttomMenu-selected");
      $("system_page").classList.remove("hidden");
      $("system_list").scrollTo({
        top: 0,
        behavior: "instant",
      });
      break;
    case "terminal":
      localStorage.setItem("current_hash", location.hash);
      $("btmMenu_terminal").parentElement.classList.add("buttomMenu-selected");
      $("terminal_page").classList.remove("hidden");
      break;
    case "home":
      localStorage.setItem("current_hash", location.hash);
      $("menu_bottom").classList.add("hidden");
      $("mask_setting").classList.add("hidden");
      $("sche_page").classList.add("hidden");
      $("custom_page").classList.add("hidden");
      $("network_page").classList.add("hidden");
      $("system_page").classList.add("hidden");
      $("terminal_page").classList.add("hidden");
      $("btmMenu_sche").parentElement.classList.remove("buttomMenu-selected");
      $("btmMenu_custom").parentElement.classList.remove("buttomMenu-selected");
      $("btmMenu_network").parentElement.classList.remove(
        "buttomMenu-selected"
      );
      $("btmMenu_system").parentElement.classList.remove("buttomMenu-selected");
      $("btmMenu_terminal").parentElement.classList.remove(
        "buttomMenu-selected"
      );
      $("body").classList.remove("overflow-hidden");
      break;

    default:
      break;
  }
};

// hide target page
window.hide_page = function (target) {
  switch (target) {
    case "sche":
      $("sche_page").classList.add("hidden");
      clearScheduleAdd();
      break;
    case "custom":
      $("custom_page").classList.add("hidden");
      break;
    case "network":
      $("network_page").classList.add("hidden");
      break;
    case "system":
      $("system_page").classList.add("hidden");
      break;
    case "terminal":
      $("terminal_page").classList.add("hidden");
      break;
    case "home":
      $("menu_bottom").classList.remove("hidden");
      $("mask_setting").classList.remove("hidden");
      $("mask").classList.add("hidden");
      $("menu").classList.add("hidden");
      break;
    default:
      break;
  }
};

// open setting menu
$("open-menu").addEventListener("click", () => {
  switchMenu(1);
});

// close setting menu
$("mask").addEventListener("click", () => {
  switchMenu(0);
});

window.switchMenu = function (flag) {
  if (flag) {
    window.location.hash = "#menu";
    localStorage.setItem("current_hash", location.hash);
    $("mask").classList.remove("hidden");
    $("menu").classList.remove("hidden");
    $("body").classList.add("overflow-hidden");
  } else {
    window.location.hash = "#home";
    $("mask").classList.add("hidden");
    $("menu").classList.add("hidden");
    $("body").classList.remove("overflow-hidden");
  }
};

// switch to schedule page(show)
$("open-sche").addEventListener("click", () => {
  window.location.hash = "#sche";
});

$("btmMenu_sche").addEventListener("click", (e) => {
  if (btmMenu_previous === "btmMenu_sche") return;
  window.location.hash = "#sche";
});

$("sche_btn_cancel").addEventListener("click", () => {
  show_page("sche");
  clearScheduleAdd();
});

// switch to schedule page(edit)
$("sche_btn_add").addEventListener("click", () => {
  // if (SYSDATA.STMODE !== "停止" && SYSDATA.STMODE !== "手動") {
  //   alert("停止或手動模式下才可修改排程");
  //   return;
  // }
  clearScheduleAdd();
  $("sche_list").classList.add("hidden");
  $("sche_btn_group").classList.add("hidden");
  $("sche_editor").classList.remove("hidden");
  updateScheduleArea();
});

// update schedule page(show)
// data-struct: [["W1",11,50,2,2,0,0,0,0,0,0],["W1",14,16,1,0,1,1,1,1,0,0]]
window.updateSchedulePage = function () {
  $("sche_list").innerHTML = "";
  let data = SYSDATA.Sched;
  // define DOM elements
  let div;
  let table;
  let tbody;
  let tr;
  let td;
  let input;
  let lable;
  let span;
  // create schedule elements
  for (let i = data.length - 1; i > -1; i--) {
    // get one schedule data
    let sche_data = data[i];

    // make 7 check box
    let week = sche_data[0].split("W")[1].split("");

    tbody = document.createElement("tbody");
    td = document.createElement("td");
    td.innerText = "X";
    td.className = "schedule-remove";
    td.onclick = (e) => {
      // if (SYSDATA.STMODE !== "停止" && SYSDATA.STMODE !== "手動") {
      //   alert("停止或手動模式下才可修改排程");
      //   return;
      // }
      let result = confirm("確認是否刪除排程？");
      if (result) {
        let index = getChildElementIndex(
          e.target.parentElement.parentElement.parentElement
        );
        let r = data.length + 1 - index;
        index = index + (r - index) - 2;
        removeSchedule(index);
      }
    };
    tbody.append(td);

    // td = document.createElement("td");
    // td.innerText = "週";
    // tbody.append(td);

    for (let j = 0; j < 7; j++) {
      input = document.createElement("input");
      span = document.createElement("span");
      lable = document.createElement("label");
      td = document.createElement("td");
      input.type = "checkbox";
      input.disabled = true;

      if (week.length > 0 && week[0] == j + 1) {
        week.shift();
        input.checked = true;
      }

      if (j === 0) span.innerText = "一";
      if (j === 1) span.innerText = "二";
      if (j === 2) span.innerText = "三";
      if (j === 3) span.innerText = "四";
      if (j === 4) span.innerText = "五";
      if (j === 5) span.innerText = "六";
      if (j === 6) span.innerText = "日";

      lable.append(input);
      lable.append(span);
      td.append(lable);
      tbody.append(td);
    }

    let table_week = document.createElement("table");
    table_week.className = "schedule-week";
    table_week.append(tbody);

    // make schedule area
    span = document.createElement("span");
    div = document.createElement("div");
    let min =
      sche_data[2] == 0
        ? "00"
        : sche_data[2] < 10
        ? `0${sche_data[2]}`
        : sche_data[2];
    span.innerText = `${sche_data[1]}:${min}`;
    div.className = "schedule-time";
    div.append(span);

    let div_container = document.createElement("div");
    div_container.className = "schedule-container";
    div_container.append(div);

    tr = document.createElement("tr");
    tbody = document.createElement("tbody");

    for (let k = 0; k < parseInt(SYSDATA.Stations); k++) {
      td = document.createElement("td");
      if (sche_data[k + 3] > 0) {
        td.className = "schedule-exec";
      } else {
        td.className = "schedule-close";
      }
      td.innerText = `${k + 1}區`;
      tr.append(td);
    }

    tbody.append(tr);
    tr = document.createElement("tr");
    tr.style.height = "4rem";
    for (let l = 0; l < parseInt(SYSDATA.Stations); l++) {
      td = document.createElement("td");
      if (sche_data[l + 3] > 0) {
        td.className = "schedule-exec";
      } else {
        td.className = "schedule-close";
      }
      td.innerText = sche_data[l + 3];
      tr.append(td);
    }

    tbody.append(tr);

    table = document.createElement("table");
    table.className = "schedule-area";
    table.append(tbody);
    div_container.append(table);

    // make schedule
    div = document.createElement("div");
    div.className = "schedule";
    div.append(table_week);
    div.append(div_container);

    document.getElementById("sche_list").append(div);
  }
};

// switch to custom page
$("open-custom").addEventListener("click", () => {
  window.location.hash = "#custom";
});
$("btmMenu_custom").addEventListener("click", (e) => {
  if (btmMenu_previous === "btmMenu_custom") return;
  window.location.hash = "#custom";
});

// update custom page

// switch to network page
$("open-network").addEventListener("click", () => {
  window.location.hash = "#network";
});
$("btmMenu_network").addEventListener("click", (e) => {
  if (btmMenu_previous === "btmMenu_network") return;
  window.location.hash = "#network";
});

// update wifi list

// switch to system page
$("open-system").addEventListener("click", () => {
  window.location.hash = "#system";
});
$("btmMenu_system").addEventListener("click", (e) => {
  if (btmMenu_previous === "btmMenu_system") return;
  window.location.hash = "#system";
});

// switch to terminal page
$("open-terminal").addEventListener("click", () => {
  window.location.hash = "#terminal";
});
$("btmMenu_terminal").addEventListener("click", (e) => {
  if (btmMenu_previous === "btmMenu_terminal") return;
  window.location.hash = "#terminal";
});

// back to home page
$("btmMenu_close").addEventListener("click", () => {
  window.location.hash = "#home";
});

// hide bottom menu when focus input
document.querySelectorAll('input[name="float-input"]').forEach((e) => {
  // console.log(e);
  if (window.innerWidth > 768) return;
  e.addEventListener("focus", (el) => {
    // console.log(el.target.id + " focus");
    $("menu_bottom").classList.add("hidden");
  });
  e.addEventListener("blur", (el) => {
    // console.log(el.target.id + " blur");
    $("menu_bottom").classList.remove("hidden");
  });
});

/*------------Command Action------------*/

window.postCmd = function postCmd(str) {
  if (str === "") return;
  let jsonCmd = { SENDCMD: str };
  console.log(jsonCmd);
  if (!window.worker) {
    console.log("websocket not ready...");
    return;
  }
  try {
    window.worker.postMessage(jsonCmd);
  } catch (error) {
    console.log(error);
  }
};

// clear all running interval
window.createClearAllInterval = function () {
  const noop = () => {};
  let firstId = setInterval(noop, 0);

  return () => {
    const lastId = setInterval(noop, 0);
    while (firstId !== lastId) {
      firstId += 1;
      clearInterval(firstId);
    }
  };
};

var clearAllInterval = createClearAllInterval();

/** Schedule */

// create control option of time
window.createControlOption = function (maxTime) {
  for (let i = 0; i < SYSDATA.Stations; i++) {
    $(`sche_add_area_${i + 1}`).innerHTML = "";
    for (let j = 0; j < maxTime + 1; j++) {
      let op = document.createElement("option");
      op.innerText = j;
      $(`sche_add_area_${i + 1}`).appendChild(op);
    }
  }
};

window.getOptionValue = function (id) {
  return $(id).options[$(id).selectedIndex].value;
};

// add new schedule
window.addSchedule = function () {
  let week = "";
  for (let i = 0; i < 7; i++) {
    if ($(`sche_add_w${i + 1}`).checked) {
      week += i + 1;
    }
  }
  if (week === "") {
    alert("至少選擇一個星期");
    return;
  }
  let time = $("sche_add_time").value;
  if (time === "") {
    alert("請選擇灑水時段");
    return;
  }
  let area = [];
  for (let j = 0; j < SYSDATA.Stations; j++) {
    area.push(`ST${j + 1}:` + getOptionValue(`sche_add_area_${j + 1}`));
  }
  if (
    area.filter((t) => t.split(":")[1] > 0 && t.split(":")[1] <= 30).length < 1
  ) {
    alert("至少設定一區有效的灑水時間,為防止電磁閥過熱，每站上限為30分鐘。");
    return;
  }

  postCmd(window.CORE_CMD.sche_add(week, time, area));

  clearScheduleAdd();
  spin(1);

  setTimeout(() => {
    spin(0);
    btmMenu_previous = "btmMenu_sche";
    hide_page("home");
    show_page("sche");
    updateSchedulePage();
    postCmd(window.CORE_CMD.sche_save);
    alert("新增排程完成，若需要自動控制，請回到首頁將模式切換回自動。");
  }, 2000);
};

$("sche_btn_confirm").addEventListener("click", () => {
  addSchedule();
});

// remove schedule
window.removeSchedule = function (index) {
  spin(1);
  postCmd(window.CORE_CMD.sche_remove(index));
  setTimeout(() => {
    spin(0);
    updateSchedulePage();
    postCmd(window.CORE_CMD.sche_save);
  }, 2000);
};

// update schedule
$("sche_btn_update").addEventListener("click", () => {
  $("sche_list").innerHTML = "";
  SYSDATA.Sched = [];
  postCmd(window.CORE_CMD.sche_show);
  spin(1);

  setTimeout(() => {
    postCmd(window.CUSTOM_CMD.system_setting);
  }, 1000);

  setTimeout(() => {
    spin(0);
    if (SYSDATA.Sched.length === 0) {
      alert("無任何設定排程");
      return;
    }
    updateSchedulePage();
  }, 2000);
});

// clear schedule edit
window.clearScheduleAdd = function () {
  for (let i = 0; i < 7; i++) {
    $(`sche_add_w${i + 1}`).checked = false;
  }
  $("sche_add_time").value = "";
  for (let j = 0; j < SYSDATA.Stations; j++) {
    $(`sche_add_area_${j + 1}`).selectedIndex = 0;
  }
};

// set num of editable area
window.updateScheduleArea = function () {
  for (let i = 0; i < 8; i++) {
    if (i < parseInt(SYSDATA.Stations)) {
      $(`area_title_${i + 1}`).classList.remove("hidden");
      $(`area_input_${i + 1}`).classList.remove("hidden");
    } else {
      $(`area_title_${i + 1}`).classList.add("hidden");
      $(`area_input_${i + 1}`).classList.add("hidden");
    }
  }
};

/** Network */

// scan wifi
$("network_btn_scan").addEventListener("click", () => {
  scanWifi();
  spin(1);
});
var scanHandler;
// 搜尋並顯示結果
window.scanWifi = function () {
  var timeout = 0;
  var res = "";
  var wr = $("wifi-result");
  var wf = $("network_btn_scan");
  res_wifi = "";
  wr.innerHTML = "";
  postCmd(window.CORE_CMD.wifi_scan);
  wf.disabled = true;
  var div = document.createElement("div");
  wr.appendChild(div);
  scanHandler = setInterval(() => {
    timeout += 1;
    if (timeout >= 10) {
      spin(0);
      alert("已逾時，請重新搜尋。");
      clearInterval(scanHandler);
      wr.innerHTML = "";
      wf.disabled = false;
      return;
    }
    if (res_wifi) {
      spin(0);
      res = res_wifi;
      wr.innerHTML = "";
      var res_result = res.split("|");
      res_result.forEach((e) => {
        if (e === "") return;
        var li = document.createElement("li");
        var btn = document.createElement("input");
        btn.className = "w-btn";
        btn.type = "button";
        btn.value = e;
        btn.onclick = () => inputWifiPWD(e);
        li.appendChild(btn);
        wr.appendChild(li);
      });
      clearInterval(scanHandler);
      wf.disabled = false;
    }
  }, 1000);
};

// connect selected wifi
window.inputWifiPWD = function (e) {
  let pwd = prompt(`SSID: ${e},Wifi密碼: `);
  if (pwd === null) {
    return;
  }
  postCmd(window.CORE_CMD.wifi_connect(e, pwd));
};

// reconnect the last connected wifi
$("network_btn_reconnect").addEventListener("click", () => {
  postCmd(window.CORE_CMD.wifi_reconnect);
  spin(1);
  setTimeout(() => {
    spin(0);
  }, 1000);
});

// set recv socket address
$("network_btn_set_socket").addEventListener("click", () => {
  let v = prompt("請輸入Socket Server位址：");
  if (!v) return;
  postCmd(window.CUSTOM_CMD.wifi_set_addr(v));
  spin(1);
  setTimeout(() => {
    postCmd(window.CUSTOM_CMD.wifi_get_addr);
  }, 500);
  setTimeout(() => {
    spin(0);
  }, 1000);
});

// get recv socket address
$("network_btn_get_socket").addEventListener("click", () => {
  postCmd(window.CUSTOM_CMD.wifi_get_addr);
  spin(1);
  setTimeout(() => {
    spin(0);
  }, 500);
});

/** System */

// set device name
$("system_set_device").addEventListener("click", () => {
  let name = prompt("請輸入裝置名稱:");
  if (!name) {
    alert("請輸入至少一個字");
    return;
  }
  postCmd(window.CORE_CMD.device_set_name(name));
});

// set system time
$("system_set_time").addEventListener("click", () => {
  let time = new Date(Date.now());
  let y = time.getFullYear();
  let m =
    time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
  let d = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
  let hr = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  let min =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  let week = time.getDay();
  let now = `${y}-${m}-${d}T${hr}:${min} ${week}`;
  let flag = confirm(`確定要更新系統時間？ ${now}`);
  if (flag) {
    spin(1);
    postCmd(`set time ${now}`);
    setTimeout(() => {
      spin(0);
    }, 500);
  }
});

// set SSID
$("system_set_ssid").addEventListener("click", () => {
  let ssid = prompt("請輸入SSID:");
  if (!ssid) {
    alert("格式不符，請重試");
    return;
  }
  let pwd = prompt("請輸入8~16位密碼:");
  if (!pwd) {
    alert("格式不符，請重試");
    return;
  }
  let result = confirm(`確定更改為 wifi名稱: ${ssid}, 密碼: ${pwd} ?`);
  if (result) {
    postCmd(window.CORE_CMD.device_set_ssid(ssid, pwd));
  }
});

// set UART baud
$("system_set_bps").addEventListener("click", () => {
  let baud = prompt("請輸入serial baud rate:");
  if (!baud) {
    return;
  }
  postCmd(window.CORE_CMD.device_set_bps(baud));
  spin(1);
  setTimeout(() => {
    spin(0);
  }, 500);
});

// set SS bps
$("system_set_SSbps").addEventListener("click", () => {
  let baud = prompt("請輸入soft serial baud rate:");
  if (!baud) {
    return;
  }
  postCmd(window.CORE_CMD.device_set_SSbps(baud));
  spin(1);
  setTimeout(() => {
    spin(0);
  }, 500);
});

// reload fresh data
$("system_reload").addEventListener("click", () => {
  let result = confirm("確認強制重新整理?");
  if (result) {
    reloadWeb();
  }
});

// update system page
window.updateSystemPage = function () {
  $("system_device").innerText = SYSDATA.device;
};

/** Terminal */

// send command
$("terminal_send").addEventListener("click", () => {
  let cmd = $("cmd_input").value;
  if (cmd === "config") {
    $("btmMenu_custom_btn").classList.remove("hidden");
    return;
  }
  postCmd(cmd);
  $("cmd_input").value = "";
});

// clear log
$("terminal_clear").addEventListener("click", () => {
  $("tx").value = "";
});

// auto scroll
$("terminal_scroll").addEventListener("click", () => {
  if (window.terminal_scroll) {
    window.terminal_scroll = false;
    $("terminal_scroll").innerText = "捲動: OFF";
    $("terminal_scroll").classList.remove("success");
    $("terminal_scroll").classList.add("default");
  } else {
    window.terminal_scroll = true;
    $("terminal_scroll").innerText = "捲動: ON";
    $("terminal_scroll").classList.add("success");
    $("terminal_scroll").classList.remove("default");
  }
});

// enable/disable log
$("terminal_log").addEventListener("click", () => {
  if (window.terminal_log) {
    window.terminal_log = false;
    $("terminal_log").innerText = "Log: OFF";
    $("terminal_log").classList.remove("success");
    $("terminal_log").classList.add("default");
  } else {
    window.terminal_log = true;
    $("terminal_log").innerText = "Log: ON";
    $("terminal_log").classList.add("success");
    $("terminal_log").classList.remove("default");
  }
});

/** System setting */
window.callSystemSetting = function (cmd) {
  spin(1);
  postCmd(cmd);
  setTimeout(() => {
    postCmd(window.CUSTOM_CMD.system_setting);
    spin(0);
  }, 1000);
};

// 顯示等待動畫
window.spin = function (flag) {
  flag
    ? $("spin").classList.remove("hidden")
    : $("spin").classList.add("hidden");
};

// 顯示等待動畫(秒數)
window.spinWithTime = function (s) {
  $("spin").classList.remove("hidden");
  setTimeout(() => {
    $("spin").classList.add("hidden");
  }, s * 1000);
};

window.getChildElementIndex = function (node) {
  console.log(node);
  return Array.prototype.indexOf.call(node.parentElement.children, node);
};

// 清除緩存並重新整理
window.reloadWeb = () => {
  localStorage.clear();
  window.location.reload();
};

window.addEventListener("hashchange", (e) => {
  e.preventDefault();
  console.log("hashchange: " + location.hash);
  switch (location.hash) {
    case "#home":
      show_page("home");
      switchMenu(0);
      btmMenu_previous = "home";
      break;
    case "#menu":
      show_page("home");
      switchMenu(1);
      btmMenu_previous = "menu";
      break;
    case "#sche":
      switch_page($("btmMenu_sche"));
      $("sche_list").innerHTML = "";
      SYSDATA.Sched = [];
      postCmd(window.CORE_CMD.sche_show);
      spin(1);

      setTimeout(() => {
        postCmd(window.CUSTOM_CMD.system_setting);
      }, 1000);

      setTimeout(() => {
        spin(0);
        if (SYSDATA.Sched.length === 0) {
          alert("無任何設定排程");
          return;
        }
        updateSchedulePage();
      }, 2000);
      createControlOption(30);
      btmMenu_previous = "btmMenu_sche";
      hide_page("home");
      break;
    case "#custom":
      switch_page($("btmMenu_custom"));
      btmMenu_previous = "btmMenu_custom";
      hide_page("home");
      break;
    case "#network":
      switch_page($("btmMenu_network"));
      btmMenu_previous = "btmMenu_network";
      hide_page("home");
      postCmd(window.CORE_CMD.ws_ping);
      break;
    case "#system":
      switch_page($("btmMenu_system"));
      btmMenu_previous = "btmMenu_system";
      hide_page("home");
      updateSystemPage();
      break;
    case "#terminal":
      switch_page($("btmMenu_terminal"));
      btmMenu_previous = "btmMenu_terminal";
      hide_page("home");
      break;

    default:
      window.location.hash = "#home";
      console.log("not vaild hash, back to home.");
      break;
  }
});
