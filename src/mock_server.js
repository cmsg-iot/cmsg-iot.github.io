function runMockWSserver(data) {
  let e = { data: data };
  try {
    if (e.data instanceof Blob) {
      new Response(e.data).arrayBuffer().then(function (buffer) {
        arr = new Uint8Array(buffer);
        window.wkMsg({ data: arr });
      });
      return;
    }
    if (e.data === undefined || e.data.indexOf('{"') != 0) {
      return;
    }
    jsData = JSON.parse(e.data);
    window.wkMsg({ data: jsData });
  } catch (error) {
    window.wkMsg({ data: e.data });
    console.error(error);
    return;
  }
}
