function base64ToArrayBuffer(base64) {
  console.log("coming");
  var binary_string = window.atob(base64);
  console.log("coming1");
  var len = binary_string.length;
  console.log("coming2");
  var bytes = new Uint8Array(len);
  console.log("coming3");
  //   a;
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  console.log("going");
  return bytes;
  //   var byteArray = Base64Binary.decode(base64);
  //   return byteArray;
  //   return decodeURIComponent(escape(window.atob(base64)));
}

document.querySelector(".files").addEventListener("click", () => {
  //   const data = new FormData();
  const input = document.querySelector("#input").files[0];
  console.log(input);
  const data = new FormData();
  data.append("File", input, "random (2).pdf");
  // data.append("File", );

  const options = {
    method: "POST",
    headers: {
      //   "Content-Type":
      //     "multipart/form-data; boundary=<calculated when request is sent>",
      "Accept-Encoding": "gzip, deflate, br",
      Accept: "*/*",
      "X-RapidAPI-Key": "2c8be93a48msh8a3e054ad37fb73p1d4f4bjsn7b1edb7b2798",
      "X-RapidAPI-Host": "pdf4me.p.rapidapi.com",
    },
    body: data,
  };

  fetch("https://pdf4me.p.rapidapi.com/RapidApi/OptimizePdf", options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response.file);
      var downloadedFile = base64ToArrayBuffer(response.file);
      console.log("hmm", downloadedFile);
      //   return;
      // var downloadedFile = new Uint8Array(file);
      var downloadLink = document.createElement("a");
      downloadLink.target = "_blank";
      downloadLink.download = "name_to_give_saved_file.pdf";
      console.log(downloadedFile.buffer);
      // convert downloaded data to a Blob
      //   var blob = new Blob([downloadedFile], {
      //     type: "application/pdf",
      //   });
      var blob = new Blob([downloadedFile.buffer], { type: "application/pdf" });

      // create an object URL from the Blob
      var URL = window.URL || window.webkitURL;
      var downloadUrl = URL.createObjectURL(blob);

      // set object URL as the anchor's href
      downloadLink.href = downloadUrl;

      // append the anchor to document body
      document.body.append(downloadLink);

      // fire a click event on the anchor
      downloadLink.click();

      // cleanup: remove element and revoke object URL
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);
    })
    .catch((err) => console.error(err));
});
