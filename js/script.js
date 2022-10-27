let red = document.getElementById('red');
let green = document.getElementById('green');
let blue = document.getElementById('blue');
let box = document.querySelector('div.neumorphism-3');
  
let r = 0, g = 0, b = 0;
  
red.addEventListener("keyup", function (event) {
    r = red.value;
    if (!r)
        r = 0;
    box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});
  
green.addEventListener("keyup", function (event) {
    g = green.value;
    if (!g)
        g = 0;
    box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});
  
blue.addEventListener("keyup", function (event) {
    b = blue.value;
    if (!b)
        b = 0;
    box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});

src="js/mqttws31.js" type="text/javascript">
src="js/host.js" type="text/javascript">                                                                        
var mqtt;
var reconnectTimeout = 2000;
function MQTTconnect() {
mqtt = new Paho.MQTT.Client(
                            host,
                            port,
                            "web_" + parseInt(Math.random() * 100,
                            10));
var options = {
     timeout: 3,
     useSSL: useTLS,
     cleanSession: cleansession,
     onSuccess: onConnect,
     onFailure: function (message) {
       $('#status').val("Connection failed: " + message.errorMessage + "Retrying");
       setTimeout(MQTTconnect, reconnectTimeout);
     }
};
mqtt.onConnectionLost = onConnectionLost;
mqtt.onMessageArrived = onMessageArrived;
if (username != null) {
    options.userName = username;
    options.password = password;
}
console.log("Host="+ host + ", port=" + port + " TLS = " + useTLS + " username=" + username + " password=" + password);
mqtt.connect(options);
}
function onConnect() {
    $('#status').val('Connected to ' + host + ':' + port);
    // Connection succeeded; subscribe to our topic
    mqtt.subscribe(topic, {qos: 0});
    $('#topic').val(topic);
    mqtt.publish("/arduino/commando/", "test Intel");
}
function onConnectionLost(response) {
    setTimeout(MQTTconnect, reconnectTimeout);
    $('#status').val("connection lost: " + responseObject.errorMessage + ". Reconnecting");
};
function onMessageArrived(message) {
    var topic = message.destinationName;
    var payload = message.payloadString;
    $('#ws').prepend('<li>' + topic + ' = ' + payload + '</li>');
};
$(document).ready(function() {
MQTTconnect();
});