var ws = undefined; //定義ws全域變數
var argv = {}; //定義argv全域變數物件
var timeout = 5000; // 檢查是否過久未傳送命令

/**
 * 當websocket連線成功時呼叫，顯示訊息於console
 */
function WSOn(e) {
  console.log("websocket connected");
}

/**
 * 當websocket連接斷開時呼叫，呼叫newWS產生新的websocket連接
 */
function WSCe(e) {
  ws.close();
  ws = undefined;
  console.log("connection lost\r\nreconnect...");
  newWS(argv["wsStr"]);
}

/**
 * 接收到的資料轉換成json物件，透過呼叫self.postMessage觸發index.js中的onmessage方法，將資料傳送至網頁
 */
function WSMsg(e) {
  try {
    if (e.data instanceof Blob) {
      new Response(e.data).arrayBuffer().then(function (buffer) {
        arr = new Uint8Array(buffer);
        self.postMessage(arr);
      });
      return;
    }
    if (e.data === undefined || e.data.indexOf('{"') != 0) {
      return;
    }
    if (e.data.includes("content") && e.data.includes("from")) {
      let ip = e.data
        .substring(e.data.indexOf("REQ:") + 4, e.data.indexOf('"}'))
        .split("from ")[1]
        .split("\r\n")[0];
      self.postMessage(JSON.parse(`{"tx":"IP:${ip}"}`));
      return;
    }
    jsData = JSON.parse(e.data);
    self.postMessage(jsData);
  } catch (error) {
    self.postMessage(e.data);
    console.error(error);
    return;
  }
}

/**
 * 當websocket出現錯誤/例外情況時呼叫，顯示訊息於console
 */
function WSErr(e) {
  console.log(e.data);
}

/**
 * 產生websocket連接，str爲目標IP位址
 */
function newWS(str) {
  argv["wsStr"] = str;
  console.log("Connect: " + argv["wsStr"]);
  ws = new WebSocket(argv["wsStr"]);
  if (ws) {
    ws.onopen = WSOn;
    ws.onclose = WSCe;
    ws.onmessage = WSMsg;
    ws.onerror = WSErr;
  }
  return ws;
}

/**
 * 當worker接收到對應key值的資料時執行對應程式
 */
function wkMsg(e) {
  for (i in e.data) {
    switch (i) {
      case "URL":
        argv["url"] = e.data["URL"];
        break;
      case "SENDCMD":
        ws.send(e.data["SENDCMD"]);
        timeout = 5000;
        break;
      default:
        break;
    }
  }
}

// 初始化產生websocket連接，成功則進入下一階段，失敗則每秒重新嘗試連接直到成功
function stage1() {
  // console.log(argv["url"]);
  if (argv["url"] !== undefined) {
    if (ws === undefined) {
      ws = newWS(
        argv["url"].indexOf("http://") != -1
          ? argv["url"].split("#")[0].replace("http://", "ws://")
          : "ws://10.10.10.10/"
      );
      // ws = newWS("ws://10.10.10.10/");
      if (ws) {
        f = stage2;
      }
    }
  }
  setTimeout("f()", 1000);
}

//第二階段，每5秒傳送訊息確認MCU是否存活
function stage2() {
  if (ws.readyState == 1) {
    // ws.send("RSSI?");
  }
  // self.postMessage({ RSSI: "<---->" });
  setTimeout("f()", 5000);
}
onmessage = wkMsg;
f = stage1;
f();

setInterval(() => {
  try {
    if (timeout > 0) {
      timeout -= 100;
    } else if (timeout == 0) {
      timeout = 5000;
      ws.send("@rssi?");
      self.postMessage({ RSSI: "<---->" });
    }
  } catch (error) {}
}, 100);
