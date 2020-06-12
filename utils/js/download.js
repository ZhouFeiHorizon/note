/**
 * 下载Excel文件
 * @param {string} url
 * @param {string} fileName
 */
function downloadExcelFile(url, fileName) {
  let xhr = new XMLHttpRequest();

  // xhr.open("GET", "/file");
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4) {
      saveExcelFile(fileName, e.target.response);
    }
  };

  /* 请求文件一定要设置 responseType 值才可以 */
  xhr.responseType = "blob";

  xhr.send(null);
}

/**
 * 保存文件
 * @param {string} fileName 文件名
 * @param {*} fileStream 文件、文件流
 */
function saveExcelFile(fileName, fileStream) {
  let blob = new Blob([fileStream], {
    // 文件格式
    type: "application/vnd.ms-excel",
  });
  let objectUrl = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = objectUrl;
  a.download = fileName;
  //a.click();
  //下面这个写法兼容火狐
  a.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );
  window.URL.revokeObjectURL(blob);
}
