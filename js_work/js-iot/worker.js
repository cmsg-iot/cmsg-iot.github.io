var ws=void 0,argv={},timeout=5e3;function WSOn(e){console.log("websocket connected")}function WSCe(e){ws.close(),ws=void 0,console.log("connection lost\r\nreconnect..."),newWS(argv.wsStr)}function WSMsg(e){try{if(e.data instanceof Blob)return void new Response(e.data).arrayBuffer().then(function(e){arr=new Uint8Array(e),self.postMessage(arr)});if(void 0===e.data||0!=e.data.indexOf('{"'))return;if(e.data.includes("content")&&e.data.includes("from")){var t=e.data.substring(e.data.indexOf("REQ:")+4,e.data.indexOf('"}')).split("from ")[1].split("\r\n")[0];return void self.postMessage(JSON.parse(`{"tx":"IP:${t}"}`))}jsData=JSON.parse(e.data),self.postMessage(jsData)}catch(e){return void console.error(e)}}function WSErr(e){console.log(e.data)}function newWS(e){return argv.wsStr=e,console.log("Connect: "+argv.wsStr),(ws=new WebSocket(argv.wsStr))&&(ws.onopen=WSOn,ws.onclose=WSCe,ws.onmessage=WSMsg,ws.onerror=WSErr),ws}function wkMsg(e){for(i in e.data)switch(i){case"URL":argv.url=e.data.URL;break;case"SENDCMD":ws.send(e.data.SENDCMD),timeout=5e3}}function stage1(){console.log(argv.url),void 0!==argv.url&&void 0===ws&&(ws=newWS(-1!=argv.url.indexOf("http://")?argv.url.split("#")[0].replace("http://","ws://"):"ws://10.10.10.10/"))&&(f=stage2),setTimeout("f()",1e3)}function stage2(){ws.readyState,setTimeout("f()",5e3)}onmessage=wkMsg,f=stage1,f(),setInterval(()=>{0<timeout?timeout-=100:0==timeout&&(timeout=5e3,1==ws.readyState&&ws.send("RSSI?"),self.postMessage({RSSI:"<----\x3e"}))},100);