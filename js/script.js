var obniz = new Obniz("OBNIZ_ID_HERE");
obniz.onconnect = async function() {
  var led = obniz.wired("WS2811", { din: 3, vcc: 2, gnd: 1 });
  led.rgb(0x33, 0x33, 0);

  $("#colorPicker").on("change", function(val) {
    let colorString = $("#colorPicker").val();

    let rgb = colorString2hex(colorString);
    led.rgb(rgb[0], rgb[1], rgb[2]);
  });
};

function colorString2hex(hex) {
  if (hex.slice(0, 1) == "#") hex = hex.slice(1);
  if (hex.length == 3)
    hex =
      hex.slice(0, 1) +
      hex.slice(0, 1) +
      hex.slice(1, 2) +
      hex.slice(1, 2) +
      hex.slice(2, 3) +
      hex.slice(2, 3);

  return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(function(str) {
    return parseInt(str, 16);
  });
}
