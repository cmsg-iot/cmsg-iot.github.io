window.act;
window.editCmd = 0;
window.kM;
window.paramCnt = 0;
window.res_wifi = "";
window.terminal_scroll = true;
window.terminal_log = true;
window.current_LT = 0;
window.previous_LT = 0;
window.lost = 0;
window.flag_lost = false;
window.SYSDATA = {
  device: "-",
  wifi: "",
  RSSI: "",
  LT: 0,
  bps: 0,
  SSbps: 0,
  ILWPR: "",
  ILWPSH: "",
  OLWPR: "",
  OLWPSH: "",
  PumpILStart: "",
  PumpILStartActID: "",
  PumpILStop: "",
  SMFull: "",
  SML: "",
  SMLActT: "",
  SMZero: "",
  STMODE: "",
  Stations: 0,
  FoehnHum: "",
  foehnOpT: "",
  FoehnTemp: "",
  Sched: [],
};

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

function $(id) {
  return document.getElementById(id);
}

window.wkMsg = function wkMsg(e) {
  try {
    if (e.data instanceof Uint8Array) {
      e.data[0] === 0x00
        ? showSYS(e.data)
        : e.data[0] === 0x01
        ? showEEPROM(e.data)
        : 0;
    }

    if (window.dataFormatEntryPoint !== undefined) {
      window.dataFormatEntryPoint(e.data);
    }

    if (e.data.RSSI === "<---->") {
      window.lost++;
    } else if (e.data.RSSI) {
      window.lost--;
    }

    if (window.lost > 1) {
      window.lost = 1;
      console.log("lost connection");
      $("status_light").classList.remove("light-green");

      if (!flag_lost) {
        flag_lost = true;
        alert("連接異常，請重新整理網頁、檢查Wifi或重啟設備。");
      }
    } else {
      flag_lost = false;
      $("status_light").classList.add("light-green");
    }
  } catch (error) {
    console.log(error);
  }
};
function clearMsg() {
  $("tx").value = "";
}

function showSYS(data) {
  len = data[1];
  len <<= 8;
  len += data[2];
  if (len < 4) return;
  lt = 0;
  //get lifetimr
  for (i = 3; i < 7; ++i) {
    lt <<= 8;
    lt += data[i];
  }
  insertText($("LT"), lt);
  insertText($("LT2"), lt);
  SYSDATA["LT"] = lt;
  window.current_LT = lt;
  if (len < 32) return;
  // get softwareserial baudrate
  ssbps = 0;
  for (i = 32; i < 36; ++i) {
    ssbps <<= 8;
    ssbps += data[i];
  }
  insertText($("SSbps"), ssbps);
  SYSDATA["SSbps"] = ssbps;
}

function showEEPROM(data) {
  var str = "\t";
  for (i = 0; i < 16; ++i) {
    str += i < 16 ? "x" : "";
    str += i.toString(16);
    str += "\t";
  }
  str += "\n";
  ptr = 3;
  for (i = 0; i < 20; ++i) {
    str += i < 16 ? "0" : "";
    str += i.toString(16);
    str += "x";
    str += "\t";
    for (j = 0; j < 16; ++j) {
      var k = data[ptr++];
      str += k < 16 ? "0" : "";
      str += k.toString(16);
      str += "\t";
    }
    str += "\n";
  }
  $("tx").value = str;
}

function insertText(id, value) {
  if (!id) {
    return;
  }
  id.innerText = value;
}

// 顯示等待動畫
window.spin = function (flag) {
  flag
    ? $("spin").classList.remove("hidden")
    : $("spin").classList.add("hidden");
};

// 顯示等待動畫-無背景
window.spinOnlyIcon = function (flag) {
  if (flag) {
    $("spin").classList.remove("bg-black-5");
    $("spin").classList.remove("hidden");
  } else {
    $("spin").classList.add("hidden");
    $("spin").classList.add("bg-black-5");
  }
};
