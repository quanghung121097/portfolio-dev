(function () {
  var btn = document.querySelector(".no-print button");
  if (!btn) return;

  var isVi = (document.documentElement.lang || "").toLowerCase().startsWith("vi");
  var pdfPath = isVi ? "/Hung-Nguyen-CV-Tieng-Viet.pdf" : "/Hung-Nguyen-CV-English.pdf";
  var pdfName = isVi ? "Hung-Nguyen-CV-Tieng-Viet.pdf" : "Hung-Nguyen-CV-English.pdf";

  var prefersDownload =
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(hover: none)").matches;

  if (prefersDownload) {
    btn.textContent = isVi ? "Tải PDF" : "Download PDF";
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      var anchor = document.createElement("a");
      anchor.href = pdfPath;
      anchor.download = pdfName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    });
  }
})();
