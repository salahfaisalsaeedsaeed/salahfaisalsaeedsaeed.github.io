const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const match = source.match(/function initReveal\(\) \{[\s\S]*?\n\}/);

if (!match) {
  throw new Error("initReveal() was not found in script.js");
}

let observedOptions = null;
global.window = { IntersectionObserver: function() {} };
global.IntersectionObserver = function(callback, options) {
  observedOptions = options || {};
  return { observe() {}, unobserve() {} };
};
global.$$ = () => [{ classList: { add() {} } }];

eval(match[0]);
initReveal();

if (!observedOptions || Number(observedOptions.threshold) !== 0) {
  console.error("FAIL|Reveal observer must use threshold 0 so very tall media sections can become visible");
  console.error("ACTUAL|" + JSON.stringify(observedOptions));
  process.exit(1);
}

console.log("PASS|Reveal observer supports very tall sections");
