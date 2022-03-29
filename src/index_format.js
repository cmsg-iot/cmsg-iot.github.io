function dataFormatEntryPoint(data) {
  var ii;
  for (i in data) {
    if (i == "tx" && window.terminal_log === true) {
      ii = $("tx");
      str = ii.value;
      str += "\n";

      ii.value = str;
      if (window.terminal_scroll === true) {
        ii.scrollTop = ii.scrollHeight;
      }
      let msg = data[i].toString();

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

      if (msg.includes("|")) {
        res_wifi = data[i];
      }

      if (msg.includes(".") && msg.includes(":")) {
        $("socket").innerText = data[i];
      }
      continue;
    }
    if (i == "Sched") {
      SYSDATA["Sched"] = data[i];
      continue;
    }

    ii = $(i);

    // 更新SYSDATA顯示
    if (ii) {
      ii.innerHTML = data[i];
      SYSDATA[i] = data[i];
    }
    // console.log(SYSDATA);
  }
}
