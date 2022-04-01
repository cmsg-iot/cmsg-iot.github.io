import { saveAs } from "file-saver";
import JSZip from "jszip";

var zip = new JSZip();

// codeArray = [{name:'', code:'', ext:''},{name:'', code:'', ext:''},...]
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
    zip.file(`${element.name}.${element.ext}`, element.code);
  });

  // generate zip file
  zip.generateAsync({ type: "blob" }).then(function (content) {
    let end = (performance.now() - start) / 1000;
    saveAs(content, `${outputFileName}.zip`);
    console.log(`Zip done, spend time: ${end}`);
  });
};

export default jsZip;
