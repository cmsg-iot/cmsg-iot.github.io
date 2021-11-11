window.w;
window.act;
window.editCmd = 0;
window.kM;
window.paramCnt = 0;
window.previous_mode = 99;
window.SYSDATA = {
  // 系統參數
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
  foehnHum: "",
  foehnOpT: "",
  foehnTemp: "",
};
window.DATA = {
  // 使用者參數
  mode: 0,
  cur_station: [],
  OLP: 0.0,
  Temp: 0.0,
  Hum: 0.0,
  SoilMoisture: 0.0,
  Sched: [],
};

function $(id) {
  return document.getElementById(id);
}

window.connect = function connect() {
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
};

function wkMsg(e) {
  try {
    if (e.data instanceof Uint8Array) {
      e.data[0] === 0x00
        ? showSYS(e.data)
        : e.data[0] === 0x01
        ? showEEPROM(e.data)
        : e.data[0] === 0x02
        ? showUserData(e.data)
        : 0;
      return;
    }
    var ii;
    for (i in e.data) {
      // 更新DATA內容(系統參數)
      if (e.data[i].toString().includes("啟動模式")) {
        let data = e.data[i].split("\r\n");
        refactData(data);
      }

      if (i == "tx") {
        ii = $("tx");
        str = ii.value;
        str += "\n";
        str += e.data[i];
        ii.value = str;
        ii.scrollTop = ii.scrollHeight;
        let msg = e.data[i].toString();

        if (["ESP:set", "ESP:SET"].some((el) => msg.includes(el))) {
          alert("更換SSID成功，reset後生效");
        }

        if (msg === "reconnected") {
          alert("已重新連上wifi!");
        }

        if (msg === "reset") {
          alert("已切換至獨立模式!");
        }

        if (msg.includes("set Device ID:")) {
          alert("已修改裝置名稱!");
        }

        if (msg.includes("set Serial baudrate")) {
          alert("已修改裝置 UART Baud!");
        }

        if (msg.includes("set correct baudrate")) {
          alert("請設定支援的Baud: 9600,19200,38400,74800,115200,230400");
        }
        continue;
      }
      if (i == "Sched") {
        DATA["Sched"] = e.data[i];
        continue;
      }
      ii = $(i);

      // 更新DATA內容(device,bps,wifi,RSSI,Sched)
      if (ii) {
        ii.innerHTML = e.data[i];
        SYSDATA[i] = e.data[i];
      }
      // console.log(SYSDATA);
    }
  } catch (error) {
    console.log(error);
  }
}
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

function showUserData(data) {
  let v = 0.0;
  DATA["mode"] = data[12];
  DATA["cur_station"] = [
    data[3],
    data[4],
    data[5],
    data[6],
    data[7],
    data[8],
    data[9],
    data[10],
  ];
  for (let i = 0; i < parseInt(SYSDATA.Stations); i++) {
    // 開啟/關閉
    if (data[12] == 0) {
      $(`control_sw_${i + 1}`).classList.remove("on");
      $(`control_sw_${i + 1}`).classList.add("off");
    } else if (DATA.cur_station[i] === 0) {
      $(`control_sw_${i + 1}`).classList.remove("on");
      $(`control_sw_${i + 1}`).classList.add("off");
    } else {
      $(`control_sw_${i + 1}`).classList.remove("off");
      $(`control_sw_${i + 1}`).classList.add("on");
    }

    // 非手動模式顯示噴灑時間
    if (data[12] != 1) {
      $(`control_sw_${i + 1}`).innerHTML = `${i + 1}區<br>${
        DATA.cur_station[i]
      }`;
    } else {
      $(`control_sw_${i + 1}`).innerHTML = `${i + 1}區`;
    }
  }
  if (previous_mode != data[12] && SYSDATA.STMODE != "") {
    previous_mode = data[12];
    console.log("changed");
    switch (data[12]) {
      case 0:
        $("mode").value = "停止";
        SYSDATA.STMODE = "停止";
        break;
      case 1:
        $("mode").value = "手動";
        SYSDATA.STMODE = "手動";
        break;
      case 2:
        $("mode").options[2] = new Option("自動(執行)", "自動");
        $("mode").value = "自動";
        SYSDATA.STMODE = "自動";
        break;
      case 3:
        $("mode").options[2] = new Option("自動(待機)", "自動");
        $("mode").value = "自動";
        SYSDATA.STMODE = "自動";
        break;
      case 4:
        $("mode").options[2] = new Option("自動(暫停)", "自動");
        $("mode").value = "自動";
        SYSDATA.STMODE = "自動";
        break;
      default:
        console.log("not allowed mode");
        break;
    }
  }

  //	$( 'event' ).innerHTML = data[ 13 ];
  v = data[16];
  v <<= 8;
  v += data[17];
  $("OLP").innerHTML = v / 100;
  DATA["OLP"] = v / 100;
  v = data[18];
  v <<= 8;
  v += data[19];
  $("Temp").innerHTML = v / 10;
  DATA["Temp"] = v / 10;
  v = data[20];
  v <<= 8;
  v += data[21];
  $("Hum").innerHTML = v / 10;
  DATA["Hum"] = v / 10;

  v = data[22];
  v <<= 8;
  v += data[23];
  //	$( "SoilMoisture").innerHTML = v / 10;
  DATA["SoilMoisture"] = v / 10;

  str = data[25] > 9 ? data[25] : "0" + data[25];
  str += ":";
  str += data[26] > 9 ? data[26] : "0" + data[26];
  str += " 星期";
  str +=
    data[24] == 1
      ? "一"
      : data[24] == 2
      ? "二"
      : data[24] == 3
      ? "三"
      : data[24] == 4
      ? "四"
      : data[24] == 5
      ? "五"
      : data[24] == 6
      ? "六"
      : "日";
  $("time").innerHTML = str;
}

function refactData(data) {
  for (let i = 0; i < data.length - 1; i++) {
    // 模式參數獨立處理
    if (data[i].includes("STMODE")) {
      SYSDATA["STMODE"] = data[i].split("( ")[1].split(" ): ")[1];
      // console.log(data[i].split("( ")[1].split(" ): "));
      continue;
    }

    // 正則化取得英文與數字
    let output = data[i]
      .replace(/[^A-Za-z0-9]/g, "")
      .match(/[a-zA-Z]+|[0-9]+/g);

    // 結果為null則跳過
    if (output == null) continue;

    // 第一個元素要為英文，若是數字則移除
    if (output[0].match(/[a-z]/i) == null) {
      output = [output[1], output[2]];
    }
    console.log(output);

    // 將output內容更新至SYSDATA中
    for (let j = 0; j < output.length / 2; j++) {
      SYSDATA[output[j * 2]] = output[j * 2 + 1];
    }
  }
}

function isModeChanged(origin) {
  return origin === SYSDATA.STMODE;
}
