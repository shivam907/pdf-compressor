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

document.querySelector(".uploadButton").addEventListener("click", (el) => {
  //   const data = new FormData();
  el.preventDefault();
  const input = document.querySelector("#fileInput").files[0];
  console.log(input);
  const data = new FormData();
  data.append("File", input, "random (2).pdf");
  // data.append("File", );

  const options = {
    method: "POST",
    params: { Profile: "web" },
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
  document.querySelector(".convert").classList.remove("op");
  fetch(
    "https://pdf4me.p.rapidapi.com/RapidApi/OptimizePdf?Profile=web",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const done = () => {
        console.log("oohoh");
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
        var blob = new Blob([downloadedFile.buffer], {
          type: "application/pdf",
        });

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
        console.log("ook");
        document.querySelector(".convert").classList.add("op");
        return 1;
      };
      done();
      // if (done() != 1) {
      //   console.log("No");
      // } else {
      //   console.log("yes");
      // }
    })
    .catch((err) => console.error(err));
});

var dropFileForm = document.getElementById("dropFileForm");
var fileLabelText = document.getElementById("fileLabelText");
// var uploadStatus = document.getElementById("uploadStatus");
var fileInput = document.getElementById("fileInput");
var droppedFiles;

function overrideDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}

function fileHover() {
  dropFileForm.classList.add("fileHover");
}

function fileHoverEnd() {
  dropFileForm.classList.remove("fileHover");
}

function addFiles(event) {
  droppedFiles = event.target.files || event.dataTransfer.files;
  showFiles(droppedFiles);
}

function showFiles(files) {
  if (files.length > 1) {
    fileLabelText.innerText = files.length + " files selected";
  } else {
    fileLabelText.innerText = files[0].name;
  }
}

// function uploadFiles(event) {
//   event.preventDefault();
//   changeStatus("Uploading...");

//   var formData = new FormData();

//   for (var i = 0, file; (file = droppedFiles[i]); i++) {
//     formData.append(fileInput.name, file, file.name);
//   }

//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function (data) {
//     //handle server response and change status of
//     //upload process via changeStatus(text)
//     console.log(xhr.response);
//   };
//   xhr.open(dropFileForm.method, dropFileForm.action, true);
//   xhr.send(formData);
// }

// function changeStatus(text) {
//   uploadStatus.innerText = text;
// }
