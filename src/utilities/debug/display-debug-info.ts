const displayDebugInfo = (debugInfo: string): void => {
  const urlParams = new URLSearchParams(window.location.search);
  const debug = urlParams.get("debug");

  const debugElement = document.getElementById("debug-information");
  if (debugElement && debug === "true") {
    debugElement.innerHTML = debugInfo;
  }
};

export default displayDebugInfo;
