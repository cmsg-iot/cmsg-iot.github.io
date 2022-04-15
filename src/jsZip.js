import { saveAs } from "file-saver";
import JSZip from "jszip";
import pako from "pako";

var zip = new JSZip();

// codeArray = [{name:'', code:''},{name:'', code:''},...]
const jsZip = (props) => {
  let outputFileName = props.outputFileName;
  let codeArray = props.codeArray;
  let start = performance.now();

  console.log("Zip proccessing...");

  if (!outputFileName) {
    outputFileName = `${Date.now()}_BEExANT_MCU_WEB`;
  }

  // add each splited code to zip file
  codeArray.forEach((element, i) => {
    let file = pako.gzip(element.code);
    zip.file(`${element.name}.gz`, file);
  });

  // generate zip file
  zip.generateAsync({ type: "blob" }).then(function (content) {
    let end = (performance.now() - start) / 1000;
    saveAs(content, `${outputFileName}.zip`);
    console.log(`Zip done, spend time: ${end}`);
  });
};

export default jsZip;
