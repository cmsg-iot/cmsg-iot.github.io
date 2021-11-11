var btmMenu_previous = "btmMenu_sche";
// show_page('terminal');
// hide_page('sche');

function $(id) {
  return document.getElementById(id);
}

window.postCmd = function postCmd(str) {
  if (str === "") return;
  jsonCmd = { SENDCMD: str };
  console.log(jsonCmd);
  w.postMessage(jsonCmd);
};

/*------------Interface Action------------*/

// bottom menu switch page
function switch_page(target) {
  if (target.id === btmMenu_previous) {
    return;
  }
  if (btmMenu_previous !== "") {
    $(btmMenu_previous).parentElement.classList.remove("buttomMenu-selected");
    $(target.id).parentElement.classList.add("buttomMenu-selected");
    show_page(target.id.split("_")[1]);
    hide_page(btmMenu_previous.split("_")[1]);
  }
  btmMenu_previous = target.id;
}

// show target page
function show_page(target) {
  switch (target) {
    case "sche":
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
      $("btmMenu_custom").parentElement.classList.add("buttomMenu-selected");
      $("custom_page").classList.remove("hidden");
      $("custom_list").scrollTo({
        top: 0,
        behavior: "instant",
      });
      updateCustomPage();
      break;
    case "network":
      $("btmMenu_network").parentElement.classList.add("buttomMenu-selected");
      $("network_page").classList.remove("hidden");
      break;
    case "system":
      $("btmMenu_system").parentElement.classList.add("buttomMenu-selected");
      $("system_page").classList.remove("hidden");
      $("system_list").scrollTo({
        top: 0,
        behavior: "instant",
      });
      break;
    case "terminal":
      $("btmMenu_terminal").parentElement.classList.add("buttomMenu-selected");
      $("terminal_page").classList.remove("hidden");
      break;
    case "main":
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
}

// hide target page
function hide_page(target) {
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
    case "main":
      $("menu_bottom").classList.remove("hidden");
      $("mask_setting").classList.remove("hidden");
      $("mask").classList.add("hidden");
      $("menu").classList.add("hidden");
      break;
    default:
      break;
  }
}

// open setting menu
$("open-menu").addEventListener("click", () => {
  $("mask").classList.remove("hidden");
  $("menu").classList.remove("hidden");
  $("body").classList.add("overflow-hidden");
});

// close setting menu
$("mask").addEventListener("click", () => {
  $("mask").classList.add("hidden");
  $("menu").classList.add("hidden");
  $("body").classList.remove("overflow-hidden");
});

// switch to schedule page(show)
$("open-sche").addEventListener("click", () => {
  btmMenu_previous = "btmMenu_sche";
  hide_page("main");
  show_page("sche");
  updateSchedulePage();
});

$("btmMenu_sche").addEventListener("click", (e) => {
  switch_page(e.target);
});

$("sche_btn_cancel").addEventListener("click", () => {
  show_page("sche");
});

// switch to schedule page(edit)
$("sche_btn_add").addEventListener("click", () => {
  if (SYSDATA.STMODE !== "停止") {
    alert("停止模式下才可修改排程");
    return;
  }
  $("sche_list").classList.add("hidden");
  $("sche_btn_group").classList.add("hidden");
  $("sche_editor").classList.remove("hidden");
  updateScheduleArea();
});

// update schedule page(show)
// data: [["W1",11,50,2,2,0,0,0,0,0,0],["W1",14,16,1,0,1,1,1,1,0,0]]
function updateSchedulePage() {
  document.getElementById("sche_list").innerHTML = "";
  let data = DATA.Sched;
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
  for (let i = 0; i < data.length; i++) {
    // get one schedule data
    let sche_data = data[i];

    // make 7 check box
    let week = sche_data[0].split("W")[1].split("");

    tbody = document.createElement("tbody");
    td = document.createElement("td");
    td.innerText = "X";
    td.className = "schedule-remove";
    td.onclick = (e) => {
      if (SYSDATA.STMODE !== "停止") {
        alert("停止模式下才可修改排程");
        return;
      }
      let result = confirm("確認是否刪除排程？");
      if (result) {
        let index = getChildElementIndex(
          e.target.parentElement.parentElement.parentElement
        );
        removeSchedule(index);
      }
    };
    tbody.append(td);

    td = document.createElement("td");
    td.innerText = "星期";
    tbody.append(td);

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
}

// switch to custom page
$("open-custom").addEventListener("click", () => {
  btmMenu_previous = "btmMenu_custom";
  hide_page("main");
  show_page("custom");
});
$("btmMenu_custom").addEventListener("click", (e) => {
  switch_page(e.target);
});

// update custom page

// switch to network page
$("open-network").addEventListener("click", () => {
  btmMenu_previous = "btmMenu_network";
  hide_page("main");
  show_page("network");
});
$("btmMenu_network").addEventListener("click", (e) => {
  switch_page(e.target);
});

// update wifi list

// switch to system page
$("open-system").addEventListener("click", () => {
  btmMenu_previous = "btmMenu_system";
  hide_page("main");
  show_page("system");
  updateSystemPage();
});
$("btmMenu_system").addEventListener("click", (e) => {
  switch_page(e.target);
  updateSystemPage();
});

// switch to terminal page
$("open-terminal").addEventListener("click", () => {
  btmMenu_previous = "btmMenu_terminal";
  hide_page("main");
  show_page("terminal");
});
$("btmMenu_terminal").addEventListener("click", (e) => {
  switch_page(e.target);
});

// back to main page
$("btmMenu_close").addEventListener("click", () => {
  show_page("main");
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

/** Control */

// change control mode
$("mode").addEventListener("change", (e) => {
  let select = $("mode").options[$("mode").selectedIndex].value;
  switch (select) {
    case "停止":
      postCmd("change mode 0");
      break;
    case "手動":
      postCmd("change mode 1");
      break;
    case "自動":
      postCmd("change mode 2");
      break;
    default:
      console.log("not defiend mode");
      console.log(select);
      break;
  }
});

// switch control
for (let i = 0; i < 8; i++) {
  $(`control_sw_${i + 1}`).addEventListener("click", () => {
    // 手動模式才能按鈕控制
    if (DATA.mode == 1) {
      // console.log(`station ${i + 1} Swap`);
      postCmd(`station ${i + 1} Swap`);
    }
  });
}

/** Schedule */

// add new schedule
function addSchedule() {
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
    area.push(`ST${j + 1}:` + $(`sche_add_area_${j + 1}`).value);
  }
  if (area.filter((t) => t.split(":")[1] > 0).length < 1) {
    alert("至少設定一區有效的灑水時間");
    return;
  }

  postCmd(`schedule add Week:${week} H:M=${time} ${area.join(" ")}`);

  clearScheduleAdd();
  spin(1);

  setTimeout(() => {
    spin(0);
    btmMenu_previous = "btmMenu_sche";
    hide_page("main");
    show_page("sche");
    updateSchedulePage();
    postCmd("schedule save");
  }, 2000);
}

$("sche_btn_confirm").addEventListener("click", () => {
  addSchedule();
});

// remove schedule
function removeSchedule(index) {
  spin(1);
  postCmd(`schedule remove ${index}`);
  setTimeout(() => {
    spin(0);
    updateSchedulePage();
  }, 2000);
}

// update schedule
$("sche_btn_update").addEventListener("click", () => {
  postCmd("schedule show");
  spin(1);
  setTimeout(() => {
    spin(0);
    if (DATA.Sched.length === 0) {
      alert("無任何設定排程");
      return;
    }
    updateSchedulePage();
  }, 1500);
});

// clear schedule edit
function clearScheduleAdd() {
  for (let i = 0; i < 7; i++) {
    $(`sche_add_w${i + 1}`).checked = false;
  }
  $("sche_add_time").value = "";
  for (let j = 0; j < SYSDATA.Stations; j++) {
    $(`sche_add_area_${j + 1}`).value = 0;
  }
}

// set num of editable area
function updateScheduleArea() {
  for (let i = 0; i < 8; i++) {
    if (i < parseInt(SYSDATA.Stations)) {
      $(`area_title_${i + 1}`).classList.remove("hidden");
      $(`area_input_${i + 1}`).classList.remove("hidden");
    } else {
      $(`area_title_${i + 1}`).classList.add("hidden");
      $(`area_input_${i + 1}`).classList.add("hidden");
    }
  }
}

/** Custom */

// [control] set num of controllers
$("custom_Stations").addEventListener("click", () => {
  let data = prompt("設定開關數量(Stations)：");
  if (data) {
    callSystemSetting("Stations", data);
  }
});
function updateControlNum() {
  for (let i = 0; i < 8; i++) {
    if (i < parseInt(SYSDATA.Stations)) {
      $(`control_sw_${i + 1}`).classList.remove("hidden");
    } else {
      $(`control_sw_${i + 1}`).classList.add("hidden");
    }
  }
}

// [input water] set shift of input water pressure
$("custom_ILWPSH").addEventListener("click", () => {
  let data = prompt("設定進水水壓位移(ILWPSH)：");
  if (data) {
    callSystemSetting("ILWPSH", data);
  }
});

// [input water] set persent of input water pressure
$("custom_ILWPR").addEventListener("click", () => {
  let data = prompt("設定進水水壓比例(ILWPR)：");
  if (data) {
    callSystemSetting("ILWPR", data);
  }
});

// [output water] set shift of output water pressure
$("custom_OLWPSH").addEventListener("click", () => {
  let data = prompt("設定出水水壓位移(OLWPSH)：");
  if (data) {
    callSystemSetting("OLWPSH", data);
  }
});

// [output water] set persent of output water pressure
$("custom_OLWPR").addEventListener("click", () => {
  let data = prompt("設定出水水壓比例(OLWPR)：");
  if (data) {
    callSystemSetting("OLWPR", data);
  }
});

// [soil humidity] set humidity of soil 0%
$("custom_SMZero").addEventListener("click", () => {
  let data = prompt("設定土壤水分 0%(SMZero)：");
  if (data) {
    callSystemSetting("SMZero", data);
  }
});

// [soil humidity] set humidity of soil 100%
$("custom_SMFull").addEventListener("click", () => {
  let data = prompt("設定土壤水分 100%(SMFull)：");
  if (data) {
    callSystemSetting("SMFull", data);
  }
});

// [system protect] stop motor when the value input water pressure less than setting
$("custom_Pump_IL_Stop").addEventListener("click", () => {
  let data = prompt("設定汞浦壓力小於值時停止(Pump IL Stop)：");
  if (data) {
    callSystemSetting("Pump IL Stop", data);
  }
});

// [system protect] go next setting when the input water pressure greater than setting
$("custom_Pump_IL_Start").addEventListener("click", () => {
  let data = prompt("設定汞浦壓力大於值時執行下一設定(Pump IL Start)：");
  if (data) {
    callSystemSetting("Pump IL Start", data);
  }
});

// [system protect] trigger target event
$("custom_Pump_IL_Start_Act_ID").addEventListener("click", () => {
  let data = prompt("執行設定ID(Pump IL Start Act ID)：");
  if (data) {
    callSystemSetting("Pump IL Start Act ID", data);
  }
});

// [system protect] go next setting when the humidity of soil less than setting
$("custom_SML").addEventListener("click", () => {
  let data = prompt("設定土壤含水低於值時執行下一設定(SML)：");
  if (data) {
    callSystemSetting("SML", data);
  }
});

// [system protect] set action time
$("custom_SMLActT").addEventListener("click", () => {
  let data = prompt("設定動作時間(SMLActT)：");
  if (data) {
    callSystemSetting("SMLActT", data);
  }
});

// [favogn setting] go next setting when the temp of air greater than setting
$("custom_foehn_Temp").addEventListener("click", () => {
  let data = prompt("設定空氣溫度大於條件(foehn Temp)：");
  if (data) {
    callSystemSetting("foehn Temp", data);
  }
});

// [favogn setting] go next setting when the humidity of air less than setting
$("custom_foehn_Hum").addEventListener("click", () => {
  let data = prompt("設定相對濕度小於條件(foehn Hum)：");
  if (data) {
    callSystemSetting("foehn Hum", data);
  }
});

// [favogn setting] each station spray with setting time until the event end
$("custom_foehn_OpT").addEventListener("click", () => {
  let data = prompt("上面兩個條件達成時設定每站循環噴灑(foehn OpT)");
  if (data) {
    callSystemSetting("foehn OpT", data);
  }
});

// update custom page
function updateCustomPage() {
  $("custom_Stations_val").innerText = SYSDATA.Stations;
  $("custom_ILWPSH_val").innerText = SYSDATA.ILWPSH;
  $("custom_ILWPR_val").innerText = SYSDATA.ILWPR;
  $("custom_OLWPSH_val").innerText = SYSDATA.OLWPSH;
  $("custom_OLWPR_val").innerText = SYSDATA.OLWPR;
  $("custom_SMZero_val").innerText = SYSDATA.SMZero;
  $("custom_SMFull_val").innerText = SYSDATA.SMFull;
  $("custom_Pump_IL_Stop_val").innerText = SYSDATA.PumpILStop;
  $("custom_Pump_IL_Start_val").innerText = SYSDATA.PumpILStart;
  $("custom_Pump_IL_Start_Act_ID_val").innerText = SYSDATA.PumpILStartActID;
  $("custom_SML_val").innerText = SYSDATA.SML;
  $("custom_SMLActT_val").innerText = SYSDATA.SMLActT;
  $("custom_foehn_Temp_val").innerText = SYSDATA.foehnTemp;
  $("custom_foehn_Hum_val").innerText = SYSDATA.foehnHum;
  $("custom_foehn_OpT_val").innerText = SYSDATA.foehnOpT;
}

/** Network */

// scan wifi

// connect selected wifi

// reconnect the last connected wifi

/** System */

// set device name

// set SSID

// set UART baud

// set SS bps

// update system page
function updateSystemPage() {
  $("system_device").innerText = SYSDATA.device;
}

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

/** System setting */
function callSystemSetting(key, value) {
  spin(1);
  postCmd(`system setting ${key}: ${value}`);
  setTimeout(() => {
    postCmd(`system setting save`);
    updateControlNum();
    updateCustomPage();
    spin(0);
  }, 2000);
}

function refreshSystemSetting() {
  spin(1);
  setTimeout(() => {
    postCmd("system setting");
  }, 2000);
  setTimeout(() => {
    console.log("done");
    updateControlNum();
    spin(0);
  }, 3000);
}
refreshSystemSetting();

function spin(flag) {
  flag
    ? $("spin").classList.remove("hidden")
    : $("spin").classList.add("hidden");
}

function getChildElementIndex(node) {
  console.log(node);
  return Array.prototype.indexOf.call(node.parentElement.children, node);
}
