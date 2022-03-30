window.act;
window.editCmd = 0;
window.kM;
window.paramCnt = 0;
window.res_wifi = "";
window.terminal_scroll = true;
window.terminal_log = true;
window.SYSDATA = {
  device: "",
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
  if (!w) {
    console.log("websocket not ready...");
    return;
  }
  try {
    w.postMessage(jsonCmd);
  } catch (error) {
    console.log(error);
  }
};

function $(id) {
  return document.getElementById(id);
}

// 建立worker與websocket連線
window.connect = function () {
  try {
    if (typeof Worker === "undefined") {
      console.log("not support Worker");
      return;
    }
    if (typeof w === "undefined") {
      w = new Worker("./worker.js");
      w.onmessage = wkMsg;
    }
    cmd = { URL: document.URL };
    w.postMessage(cmd);
  } catch (error) {
    console.error(error);
    alert(error);
    window.reloadWeb();
  }
};

window.wkMsg = function wkMsg(e) {
  try {
    if (e.data instanceof Uint8Array) {
      e.data[0] === 0x00
        ? showSYS(e.data)
        : e.data[0] === 0x01
        ? showEEPROM(e.data)
        : 0;
      return;
    }
    window.dataFormatEntryPoint(e.data);
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
  $("LT").innerHTML = lt;
  SYSDATA["LT"] = lt;
  if (len < 32) return;
  // get softwareserial baudrate
  ssbps = 0;
  for (i = 32; i < 36; ++i) {
    ssbps <<= 8;
    ssbps += data[i];
  }
  $("SSbps").innerHTML = ssbps;
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

// 顯示等待動畫
function spin(flag) {
  flag
    ? $("spin").classList.remove("hidden")
    : $("spin").classList.add("hidden");
}

// 資料處理
// function dataFormatEntryPoint(data) {
//   var ii;
//   for (i in data) {
//     if (i == "tx" && window.terminal_log === true) {
//       ii = $("tx");
//       str = ii.value;
//       str += "\n";

//       ii.value = str;
//       if (window.terminal_scroll === true) {
//         ii.scrollTop = ii.scrollHeight;
//       }
//       let msg = data[i].toString();

//       if (["ESP:set", "ESP:SET"].some((el) => msg.includes(el))) {
//         alert("更換SSID成功，reset後生效");
//       }

//       if (msg === "reconnected") {
//         alert("已重新連上wifi!");
//       }

//       if (msg === "reset") {
//         alert("已切換至獨立模式!");
//       }

//       if (msg.includes("set Device ID:")) {
//         alert("已修改裝置名稱!");
//       }

//       if (msg.includes("set Serial baudrate")) {
//         alert("已修改裝置 UART Baud!");
//       }

//       if (msg.includes("set correct baudrate")) {
//         alert("請設定支援的Baud: 9600,19200,38400,74800,115200,230400");
//       }

//       if (msg.includes("|")) {
//         res_wifi = data[i];
//       }

//       if (msg.includes(".") && msg.includes(":")) {
//         $("socket").innerText = data[i];
//       }
//       continue;
//     }
//     if (i == "Sched") {
//       SYSDATA["Sched"] = data[i];
//       continue;
//     }

//     ii = $(i);

//     // 更新SYSDATA顯示
//     if (ii) {
//       ii.innerHTML = data[i];
//       SYSDATA[i] = data[i];
//     }
//     // console.log(SYSDATA);
//   }
// }
