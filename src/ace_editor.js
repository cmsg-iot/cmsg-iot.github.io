import ace from "./lib/ace-builds/src-noconflict/ace";
import ext from "./lib/ace-builds/src-noconflict/ext-language_tools";

ace.config.set("basePath", "lib/ace-builds/src-noconflict");
ace.config.set("basePath", "lib/ace-builds/src-noconflict");
ace.config.set("modePath", "lib/ace-builds/src-noconflict");
ace.config.set("themePath", "lib/ace-builds/src-noconflict");
ace.config.set("workerPath", "lib/ace-builds/src-noconflict");

ace.require(ext);
var editor_html = ace.edit("editor_ui_html");
var editor_css = ace.edit("editor_ui_css");
var editor_data = ace.edit("editor_data");
var editor_app = ace.edit("editor_app");

editor_html.setTheme("ace/theme/tomorrow");
editor_css.setTheme("ace/theme/tomorrow");
editor_data.setTheme("ace/theme/tomorrow");
editor_app.setTheme("ace/theme/tomorrow");

editor_html.session.setMode("ace/mode/html");
editor_css.session.setMode("ace/mode/css");
editor_data.session.setMode("ace/mode/javascript");
editor_app.session.setMode("ace/mode/javascript");

editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: false,
});
