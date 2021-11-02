var swTrash=!1,count_elements=0;let sourceContainerId="",dragElementId="",targetContainerId="",targetChildId="";for(let t=0;t<300;t++){let e=document.createElement("div");e.id=`target-container-${t+1}`,e.setAttribute("data-role","drag-drop-container"),e.className="container",$("target-containers").appendChild(e)}function init_drag(){ClearAllIntervals();let e=document.querySelectorAll('[draggable="true"]');e.forEach(e=>{e.addEventListener("dragstart",dragStart),e.addEventListener("dragend",dragEnd),e.addEventListener("click",e=>{e.stopPropagation()})});let t=0;for(let e=0;e<$("target-containers").children.length;e++)0<$(`target-container-${e+1}`).childElementCount&&(t+=1);count_elements=t,storeBlock()}function dragStart(e){e.stopPropagation(),vibration(),this.classList.add("dragging"),e.dataTransfer.setData("text/plain",e.target.id),sourceContainerId=this.parentElement.id,dragElementId=this.id,$(dragElementId).classList.remove("inside-if"),dragElementId.includes("index")||swTrashcan(!0)}function dragEnd(e){this.classList.remove("dragging"),swTrashcan(!1),init_drag()}localStorage.setItem("init_block",$("target-containers").innerHTML),init_drag();let dropTargets=document.querySelectorAll('[data-role="drag-drop-container"]');function dropped(e){if(init_drag(),""!=targetContainerId)if(targetContainerId!==sourceContainerId){if(!e.target.parentElement.id.includes("drag-copy")||"source-container"===sourceContainerId||""===sourceContainerId)return"trash-container"!==this.id&&"trash-container2"!==this.id||!dragElementId.includes("drag-source")&&!dragElementId.includes("index")?"trash-container"===this.id||"trash-container2"===this.id?(confirm("確定要丟棄方塊 ( ´•︵•` ) ?")&&$(dragElementId).remove(),void document.getElementById(targetContainerId).classList.remove("trash-ready")):checkVaildElement($(dragElementId),e.target)?void(dragElementId.includes("index")&&"source-container"!==targetContainerId?cloneBlock(e):"source-container"!==sourceContainerId||"source-container"===targetContainerId?this.id!==sourceContainerId&&"source-container"!==targetContainerId&&moveBlock(e):addBlock(e)):(e.target.classList.remove("hover"),void alert("這方塊不能放這裡 (´･ω･`) ")):(this.classList.remove("trash-ready"),void alert("you can't drop source element!"));exchangeBlock(e)}else e.path[0].classList.remove("hover");else e.target.classList.remove("hover")}function dragOver(e){cancelDefault(e),targetContainerId=this.id,targetChildId=e.path[1].id,"trash-container"===this.id||"trash-container2"===this.id?this.classList.add("trash-ready"):e.target.classList.add("hover")}function dragLeave(e){"trash-container"===this.id||"trash-container2"===this.id?this.classList.remove("trash-ready"):e.target.classList.remove("hover")}function cancelDefault(e){return e.preventDefault(),e.stopPropagation(),!1}function exchangeBlock(e){cancelDefault(e);let t=$(sourceContainerId),r=e.target.parentElement.parentElement;var a=$(e.target.parentElement.id),n=$(dragElementId);t.removeChild(n),r.removeChild(a),t.appendChild(a),r.appendChild(n),e.target.classList.remove("hover")}function moveBlock(t){cancelDefault(t);var r=t.dataTransfer.getData("text/plain");let e=$(dragElementId).className;if(t.target.className.split(" ")[0]!==$(r).className.split(" ")[0]){if(!(e.includes("var")||e.includes("val")||e.includes("op")||e.includes("bool")||e.includes("data"))||!t.target.id.includes("target-container")){if(!dragElementId.includes("control")&&!dragElementId.includes("setV")||"target-containers"===targetChildId)t.target.appendChild(document.querySelector("#"+r)),t.target.classList.remove("hover");else{let e=t.target.parentElement;e.style.height=`${50*(e.childElementCount+1)}px`,e.appendChild(document.querySelector("#"+r)),e.classList.remove("hover")}t.target.className.includes("block-area")&&($(r).classList.add("overlap"),t.target.classList.add("hidden"),t.path[1].childElementCount==t.target.getAttribute("data-index")&&addBlockArea(t.target,t.path[1]))}}else t.target.classList.remove("hover")}function cloneBlock(e){try{switch(dragElementId.split("-")[1]){case"data":addBlock(e,"drag-source-data");break;case"val":addBlock(e,"drag-source-val");break;case"var":addBlock(e,"drag-source-var");break;case"op":addBlock(e,"drag-source-op");break;case"bool":addBlock(e,"drag-source-bool");break;case"if":addBlock(e,"drag-source-if");break;case"setV":addBlock(e,"drag-source-setV");break;case"control":addBlock(e,"drag-source-control");break;case"log":addBlock(e,"drag-source-log");break;case"delay":addBlock(e,"drag-source-delay");break;default:alert("Not Vaild Block!")}}catch(e){console.error(e)}}function addBlock(r,e){cancelDefault(r);let t=e,a=document.createElement("div"),n=$(targetContainerId);if(a.id=e.substring(0,4)+"-copy-"+_uuid(),a.className=$(t).className,a.classList.remove("dragging"),a.draggable=!0,a.innerHTML=$(t).getInnerHTML(),r.target.className.split(" ")[0]!==$(t).className.split(" ")[0])if((t.includes("var")||t.includes("val")||t.includes("op")||t.includes("bool")||t.includes("data"))&&(r.path[0].id.includes("target-container")||r.target.className.includes("if")))n.classList.remove("hover");else{if((t.includes("control")||t.includes("setV")||t.includes("delay")||t.includes("log")||t.includes("if"))&&!r.target.id.includes("target-container"))if(t.includes("if"))n.appendChild(a),n.classList.remove("hover");else{let e=r.target.parentElement,t=r.path[1].children;e.appendChild(a),e.children[0].classList.remove("hover");for(let e=1;e<t.length;e++)t[e].classList.add("inside-if")}else r.target.appendChild(a),r.target.classList.remove("hover");let e=$(dragElementId).className.split("-")[0];(r.target.className.includes("block-area")&&"bool"===e||"op"===e||e.includes("v")||e.includes("data"))&&($(a.id).classList.add("overlap"),r.target.classList.add("hidden"),r.path[1].childElementCount==r.target.getAttribute("data-index")&&addBlockArea(r.target,r.path[1]),"if"===r.path[2].className.split("-")[0]&&(r.path[2].style.height=`${(r.path[1].childElementCount+1)/2*80}px`))}else r.target.classList.remove("hover")}function addBlockArea(e,t){let r=document.createElement("div");var a=parseInt(e.getAttribute("data-index"));r.setAttribute("data-role","drag-drop-container"),r.setAttribute("data-index",a+1),"bool"===e.className.split("-")[0]?(r.className="op-block-area",r.innerHTML="邏輯"):"op"===e.className.split("-")[0]&&(r.className="bool-block-area",r.innerHTML="判斷"),t.appendChild(r)}function checkVaildElement(e,t){if(null==e||null==t)return!1;let r=e.className.split("-")[0];e=t.className.split("-")[0];return(!dragElementId.includes("if")||"if"!==e)&&("if"===e&&"op"!==r&&"bool"!==r||(!!r.includes(e)||("data"===r&&"v"===e||(r===e||"container"==t.classList[0]))))}function block2js(n){try{var l=n.childElementCount;if("if"===n.className.split("-")[0]){let a=[],t=[];for(let e=0;e<l;e++){let r=n.children[e];var i=r.className.split("-")[0];if("if"===i)for(let e=0;e<r.childElementCount;e++){let t=r.children[e];if(!(t.childElementCount<1))if("bool"===t.className.split("-")[0]){let e=t.children[0].children[0];"data"===e.children[0].children[0].className.split("-")[0]&&"data"===e.children[2].children[0].className.split("-")[0]?a.push(`(${e.children[0].children[0].children[0].value} ${e.children[1].children[0].value} ${e.children[2].children[0].children[0].value})`):"data"!==e.children[0].children[0].className.split("-")[0]&&"data"===e.children[2].children[0].className.split("-")[0]?a.push(`(${e.children[0].children[0].children[0].innerText} ${e.children[1].children[0].value} ${e.children[2].children[0].children[0].value})`):"data"===e.children[0].children[0].className.split("-")[0]&&"data"!==e.children[2].children[0].className.split("-")[0]?a.push(`(${e.children[0].children[0].children[0].value} ${e.children[1].children[0].value} ${e.children[2].children[0].children[0].innerText})`):a.push(`(${e.children[0].children[0].children[0].innerText} ${e.children[1].children[0].value} ${e.children[2].children[0].children[0].innerText})`)}else"op"===t.className.split("-")[0]&&a.push(`${t.children[0].children[0].value}`)}else switch(i){case"log":"data"===r.children[0].children[0].children[0].className.split("-")[0]?t.push(`  console.log(${r.children[0].children[0].children[0].children[0].value});\n`):t.push(`  console.log(${r.children[0].children[0].children[0].children[0].innerText});\n`);break;case"control":void 0===r.children[0].children[1].children[0]?t.push(`  ${r.children[0].children[0].value}.set(null);\n`):"data"===r.children[0].children[1].children[0].className.split("-")[0]?t.push(`  ${r.children[0].children[0].value}.set(${r.children[0].children[1].children[0].children[0].value});\n`):t.push(`  ${r.children[0].children[0].value}.set(${r.children[0].children[1].children[0].children[0].innerText});\n`);break;case"setV":var d="全域"==r.children[0].innerText?"window.":"";"data"===r.children[0].children[2].children[0].className.split("-")[0]?t.push(`  ${d}${r.children[0].children[1].children[0].children[0].innerText} = ${r.children[0].children[2].children[0].children[0].value};\n`):t.push(`  ${d}${r.children[0].children[1].children[0].children[0].innerText} = ${r.children[0].children[2].children[0].children[0].innerText};\n`);break;case"delay":t.push(`  delay(${r.children[0].children[0].value});\n`)}}return`if(${a.join("")}){\n${t.join("")}}`}{let r=[];for(let t=0;t<l;t++){let e=n.children[t];switch(e.className.split("-")[0]){case"log":"data"===e.children[0].children[0].className.split("-")[0]?r.push(`console.log(${e.children[0].children[0].children[0].value});`):r.push(`console.log(${e.children[0].children[0].children[0].innerText});`);break;case"control":void 0===e.children[1].children[0]?r.push(`${e.children[0].value}.set(null);`):"data"===e.children[1].children[0].className.split("-")[0]?r.push(`${e.children[0].value}.set(${e.children[1].children[0].children[0].value});`):r.push(`${e.children[0].value}.set(${e.children[1].children[0].children[0].innerText});`);break;case"setV":var a="全域"==e.children[0].innerText?"window.":"";"data"===e.children[2].children[0].className.split("-")[0]?r.push(`${a}${e.children[1].children[0].children[0].innerText} = ${e.children[2].children[0].children[0].value};`):r.push(`${a}${e.children[1].children[0].children[0].innerText} = ${e.children[2].children[0].children[0].innerText};`);break;case"delay":r.push(`delay(${e.children[0].value});`)}}return r.join("")}}catch(e){throw e}}function AllBlock2js(){try{var r=$("target-containers"),a=r.children.length;let t=[];for(let e=0;e<a;e++)0<r.children[e].childElementCount&&t.push(`${block2js(r.children[e].children[0])}\n`);return t.join("")}catch(e){return console.error(e),void alert("格式錯誤，請檢查方塊所需變數是否已加入，變數是否已宣告 ( ꒪Д꒪)ノ")}}function storeBlock(){var e=$("target-containers").innerHTML,t=localStorage.getItem("block_code_name");t&&localStorage.setItem(`block_code_save_${t}`,e)}function readBlock(e){$("target-containers").innerHTML=localStorage.getItem(e);let t=document.querySelectorAll('[data-role="drag-drop-container"]');t.forEach(e=>{e.addEventListener("drop",dropped),e.addEventListener("dragenter",cancelDefault),e.addEventListener("dragover",dragOver),e.addEventListener("dragleave",dragLeave)});for(let e=0;e<$("target-containers").children.length;e++){var r=$(`target-container-${e+1}`).innerHTML;$(`target-container-${e+1}`).innerHTML=r}updateDragV(),updateInput(),updateSelect(),init_drag()}function updateDragV(){let e=document.querySelectorAll('[data-role="val-block"]'),t=document.querySelectorAll('[data-role="var-block"]');e.forEach(e=>{e.addEventListener("click",e=>{var t=prompt("輸入值 (^˵◕ω◕˵^) :",e.target.innerText);t.length<1?alert("格式錯誤，長度至少爲1，不可爲空白 ( ꒪Д꒪)ノ"):e.target.innerText=t,storeBlock()})}),t.forEach(e=>{e.addEventListener("click",e=>{var t=prompt("輸入變數名稱 (^˵◕ω◕˵^) :",e.target.innerText);t.length<1?alert("格式錯誤，長度至少爲1，不可爲空白 ( ꒪Д꒪)ノ"):e.target.innerText=t,storeBlock()})})}function updateInput(){let e=document.querySelectorAll("[data-type=input]");e.forEach(e=>{e.addEventListener("input",e=>{e.target.setAttribute("value",e.target.value),storeBlock()})})}function updateSelect(){let e=document.querySelectorAll("[data-type=select]");e.forEach(e=>{e.selectedIndex=e.getAttribute("select-index"),e.addEventListener("click",e=>{e.target.setAttribute("select-index",e.target.selectedIndex),storeBlock()})})}function updateVar(e){var t=confirm("是否爲全域變數?");e.children[0].innerText=t?"全域":"",storeBlock()}function setDataBlock(){let r=$("drag-source-data").children[0];for(let t=0;t<32;t++){let e=document.createElement("option");t<16?(e.value=`DATA.adc[${t}]`,e.label=`ADC(${t+1})`):t<24?(e.value=`DATA.servo[${t-16}]`,e.label=`SERVO(${t-15})`):(e.value=`DATA.pwm[${t-24}]`,e.label=`PWM(${t-23})`),r.appendChild(e)}}function swTrashcan(e){e?($("trash-container").style.display="block",$("trash-container2").style.display="block"):($("trash-container").style.display="none",$("trash-container2").style.display="none")}function _uuid(){var r=Date.now();return"undefined"!=typeof performance&&"function"==typeof performance.now&&(r+=performance.now()),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=(r+16*Math.random())%16|0;return r=Math.floor(r/16),("x"===e?t:3&t|8).toString(16)})}function vibration(){navigator.vibrate([100])}dropTargets.forEach(e=>{e.addEventListener("drop",dropped),e.addEventListener("dragenter",cancelDefault),e.addEventListener("dragover",dragOver),e.addEventListener("dragleave",dragLeave)}),setDataBlock();