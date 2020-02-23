Blockly.Arduino.finish=function(a){
	var myStr="";
	if (Blockly.Arduino.definitions_.define_mqtt_include=="#include <PubSubClient.h>")
		myStr="  myClient.loop();\n";
	a="  "+a.replace(/\n/g,"\n");
	a=a.replace(/\n\s+$/,"\n");
	a="void loop() \n{\n"+myStr+a+"\n}";
	var b=[],c=[];
	for(e in Blockly.Arduino.definitions_){
		var d=Blockly.Arduino.definitions_[e];
		d.match(/^#include/)?b.push(d):c.push(d)
	}
	d=[];
	for(e in Blockly.Arduino.setups_)
		d.push(Blockly.Arduino.setups_[e]);
	var e=new Date((new Date).getTime());
	if (Blockly.Arduino.mqtt_exist=="yes")
		b=b.join("\n")+"\n\n"+c.join("\n")+"\n\n"+Blockly.Arduino.mqtt_callback_header+Blockly.Arduino.mqtt_callback_body+Blockly.Arduino.mqtt_callback_footer+"\nvoid setup() \n{\n  "+d.join("\n  ")+"\n}\n\n";
	else
		b=b.join("\n")+"\n\n"+c.join("\n")+"\n\nvoid setup() \n{\n  "+d.join("\n  ")+"\n}\n\n";
	b=b.replace(/\n\n+/g,"\n\n").replace(/\n*$/,"\n\n\n")+a;
	Blockly.Arduino.mqtt_exist="no";
	return b="/*\n * Generated using BlocklyDuino:\n *\n * https://github.com/MediaTek-Labs/BlocklyDuino-for-LinkIt\n *\n * Date: "+e.toUTCString()+"\n */\n\n"+b
};


//jetmole
Blockly.Arduino.jetmole={};
Blockly.Arduino.mole_move_car=function(){
  var a=this.getFieldValue("STAT"),
      b=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.setups_["setup_jetmole_"]="pinMode(10, OUTPUT);\n  pinMode(11, OUTPUT);\n  pinMode(12, OUTPUT);\n  pinMode(13, OUTPUT);\n";

  if (a == "FORWARD") {
	return"analogWrite(13, "+b+");\nanalogWrite(12, 0);\nanalogWrite(11, 0);\nanalogWrite(10, "+b+");\n"
  } else if (a == "BACKWARD"){
	return"analogWrite(13, 0);\nanalogWrite(12, "+b+");\nanalogWrite(11, "+b+");\nanalogWrite(10, 0);\n"
  } else if (a == "LEFT") {
	return"analogWrite(13, 0);\nanalogWrite(12, "+b+");\nanalogWrite(11, 0);\nanalogWrite(10, "+b+");\n"
  } else if (a == "RIGHT") {
	return"analogWrite(13, "+b+");\nanalogWrite(12, 0);\nanalogWrite(11, "+b+");\nanalogWrite(10, 0);\n"
  } else {
	return"analogWrite(13, 0);\nanalogWrite(12, 0);\nanalogWrite(11, 0);\nanalogWrite(10, 0);\n"
  }
};
Blockly.Arduino.mole_move_motor_L=function(){
  var a=this.getFieldValue("STAT"),
      b=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.setups_["setup_jetmole_"]="pinMode(10, OUTPUT);\n  pinMode(11, OUTPUT);\n  pinMode(12, OUTPUT);\n  pinMode(13, OUTPUT);\n";

  if (a == "FORWARD") {
	return"analogWrite(11, 0);\nanalogWrite(10, "+b+");\n"
  } else if (a == "BACKWARD"){
	return"analogWrite(11, "+b+");\nanalogWrite(10, 0);\n"
  }
};
Blockly.Arduino.mole_move_motor_R=function(){
  var a=this.getFieldValue("STAT"),
      b=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.setups_["setup_jetmole_"]="pinMode(10, OUTPUT);\n  pinMode(11, OUTPUT);\n  pinMode(12, OUTPUT);\n  pinMode(13, OUTPUT);\n";

  if (a == "FORWARD") {
	return"analogWrite(13, "+b+");\nanalogWrite(12, 0);\n"
  } else if (a == "BACKWARD"){
	return"analogWrite(13, 0);\nanalogWrite(12, "+b+");\n"
  }
};

//mqtt
Blockly.Arduino.mqtt={};
Blockly.Arduino.connect_mqtt=function(){
	var a=Blockly.Arduino.valueToCode(this,"BROKER",Blockly.Arduino.ORDER_ATOMIC)||"",b=Blockly.Arduino.valueToCode(this,"PORT",Blockly.Arduino.ORDER_ATOMIC)||"0",c=Blockly.Arduino.valueToCode(this,"ID",Blockly.Arduino.ORDER_ATOMIC)||"",d=Blockly.Arduino.valueToCode(this,"USERNAME",Blockly.Arduino.ORDER_ATOMIC)||"",e=Blockly.Arduino.valueToCode(this,"PASSWORD",Blockly.Arduino.ORDER_ATOMIC)||"",
        a=a.replace(/"/g,""),
        b=b.replace(/"/g,""),
        c=c.replace(/"/g,""),
        d=d.replace(/"/g,""),
        e=e.replace(/"/g,"");
    Blockly.Arduino.definitions_.define_mqtt_include="#include <PubSubClient.h>";
    Blockly.Arduino.definitions_.define_mqtt_broker='#define MQTT_SERVER_IP "'+a+'"';
    Blockly.Arduino.definitions_.define_mqtt_port='#define MQTT_SERVER_PORT '+b+'';
    Blockly.Arduino.definitions_.define_mqtt_id='#define MQTT_ID "'+c+'"';
    Blockly.Arduino.definitions_.define_mqtt_username='#define MQTT_USERNAME "'+d+'"';
    Blockly.Arduino.definitions_.define_mqtt_password='#define MQTT_PASSWORD "'+e+'"';
	Blockly.Arduino.definitions_.define_mqtt_received_topic='String receivedTopic="";';
	Blockly.Arduino.definitions_.define_mqtt_received_msg='String receivedMsg="";';
	Blockly.Arduino.definitions_.define_mqtt_client='WiFiClient mqttClient;';
	Blockly.Arduino.definitions_.define_mqtt_pubclient='PubSubClient myClient(mqttClient);\n';
	Blockly.Arduino.mqtt_exist="yes";
	Blockly.Arduino.mqtt_callback_header='void mqttCallback(char* topic, byte* payload, unsigned int length){\n  receivedTopic=String(topic);\n  receivedMsg="";\n  for (uint8_t myIndex = 0; myIndex < length; myIndex++)\n  {\n      receivedMsg += (char)payload[myIndex];\n  }\n  receivedMsg.trim();\n';
	Blockly.Arduino.mqtt_callback_body='';
	Blockly.Arduino.mqtt_callback_footer='\n}\n';
	Blockly.Arduino.definitions_.define_mqtt_connect_mqtt='void connectMQTT(){\n  while (!myClient.connected()){\n    if (!myClient.connect(MQTT_ID,MQTT_USERNAME,MQTT_PASSWORD))\n    {\n      delay(5000);\n    }\n  }\n}\n';
    Blockly.Arduino.setups_["setup_mqtt_"]="myClient.setServer(MQTT_SERVER_IP, MQTT_SERVER_PORT);\n  myClient.setCallback(mqttCallback);\n";
	return"connectMQTT();\n"
};

Blockly.Arduino.publish_mqtt=function(){
	var a=Blockly.Arduino.valueToCode(this,"TOPIC",Blockly.Arduino.ORDER_ATOMIC)||"",
	    b=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"";
	return'myClient.publish(String('+a+').c_str(),String('+b+').c_str());\n'
};

Blockly.Arduino.subscribe_mqtt=function(){
	var a=Blockly.Arduino.valueToCode(this,"TOPIC",Blockly.Arduino.ORDER_ATOMIC)||'""';
	return'myClient.subscribe(String('+a+').c_str());\n'
};

Blockly.Arduino.mqtt_received_topic=function(){
  return["receivedTopic",Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.mqtt_received_msg=function(){
  return["receivedMsg",Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.mqtt_event=function(){
	var a=Blockly.Arduino.valueToCode(this,"TOPIC",Blockly.Arduino.ORDER_ATOMIC)||"",b=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"",
        a=a.replace(/"/g,""),
        b=b.replace(/"/g,"");
	Blockly.Arduino.mqtt_callback_body=Blockly.Arduino.statementToCode(this,"MSG_TOPIC_EQAL");
	return''
};

//thingspeak
Blockly.Arduino.thingspeak={};
Blockly.Arduino.things_get_url=function(){
	Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <LWiFi.h>";
	Blockly.Arduino.definitions_.define_thingspeak_invoke='\nvoid invokeThingSpeak(const String& key, const String& p1, const String& p2, const String& p3, const String& p4, const String& p5, const String& p6, const String& p7, const String& p8)\n{\n  // Initialize the Ethernet client library\n  // with the IP address and port of the server\n  // that you want to connect to (port 80 is default for HTTP):\n  static TLSClient client;\n\n  // This is the root certificate(CA) for https://api.thingspeak.com/\n  // Different host server may use different root CA.\n  static const char rootCA[] = "-----BEGIN CERTIFICATE-----\\r\\n"\n  "MIIFJjCCBA6gAwIBAgIIRJxbLJxAihkwDQYJKoZIhvcNAQELBQAwgbQxCzAJBgNV\\r\\n"\n  "BAYTAlVTMRAwDgYDVQQIEwdBcml6b25hMRMwEQYDVQQHEwpTY290dHNkYWxlMRow\\r\\n"\n  "GAYDVQQKExFHb0RhZGR5LmNvbSwgSW5jLjEtMCsGA1UECxMkaHR0cDovL2NlcnRz\\r\\n"\n  "LmdvZGFkZHkuY29tL3JlcG9zaXRvcnkvMTMwMQYDVQQDEypHbyBEYWRkeSBTZWN1\\r\\n"\n  "cmUgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IC0gRzIwHhcNMTYwNzI1MTc0NTM4WhcN\\r\\n"\n  "MTgwOTI4MjIxMzU0WjA5MSEwHwYDVQQLExhEb21haW4gQ29udHJvbCBWYWxpZGF0\\r\\n"\n  "ZWQxFDASBgNVBAMMCyouaWZ0dHQuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A\\r\\n"\n  "MIIBCgKCAQEA8c1HRaRBFWER/SG2eXN++ykWLSoCyJ1xcxOXy15Bk57WXGLIBZHn\\r\\n"\n  "Y8/SN+H1KuUcN40KC35NuGhaQP43cELcBSG/BiYTlFPIAizauX2K9VZh+zWhwkgq\\r\\n"\n  "y8bJ5+yvZKH5gwqNL248Y4gjwaPeU8o2K1xrFYWSfM/7kFQFul2goWOA3HIn5qE3\\r\\n"\n  "NUsgxF8uLh2BSuJKQF73WDvM1zE86MIU20M9+PEo/pV5orIPZX/54cAZgXnr+59t\\r\\n"\n  "KPL14Rl9qqTiptMJC8y2CIqKC9zHBwIwX4uYPOquom1oqAuItWgqAJwtC3z5a20r\\r\\n"\n  "wbI2eNbDPdbeweT/4RtCjTwKlQuHmzeLbwIDAQABo4IBtDCCAbAwDAYDVR0TAQH/\\r\\n"\n  "BAIwADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDgYDVR0PAQH/BAQD\\r\\n"\n  "AgWgMDcGA1UdHwQwMC4wLKAqoCiGJmh0dHA6Ly9jcmwuZ29kYWRkeS5jb20vZ2Rp\\r\\n"\n  "ZzJzMS0yNzMuY3JsMF0GA1UdIARWMFQwSAYLYIZIAYb9bQEHFwEwOTA3BggrBgEF\\r\\n"\n  "BQcCARYraHR0cDovL2NlcnRpZmljYXRlcy5nb2RhZGR5LmNvbS9yZXBvc2l0b3J5\\r\\n"\n  "LzAIBgZngQwBAgEwdgYIKwYBBQUHAQEEajBoMCQGCCsGAQUFBzABhhhodHRwOi8v\\r\\n"\n  "b2NzcC5nb2RhZGR5LmNvbS8wQAYIKwYBBQUHMAKGNGh0dHA6Ly9jZXJ0aWZpY2F0\\r\\n"\n  "ZXMuZ29kYWRkeS5jb20vcmVwb3NpdG9yeS9nZGlnMi5jcnQwHwYDVR0jBBgwFoAU\\r\\n"\n  "QMK9J47MNIMwojPX+2yz8LQsgM4wIQYDVR0RBBowGIILKi5pZnR0dC5jb22CCWlm\\r\\n"\n  "dHR0LmNvbTAdBgNVHQ4EFgQUTv/uQ1GFjIW3WdcM3sn8fwtzoKQwDQYJKoZIhvcN\\r\\n"\n  "AQELBQADggEBAA0L5s4DXdeyx2rsVKljSq7CsDUbl1w8AgyxO0o1JAdYoPwZOlUT\\r\\n"\n  "Yl6xL+jYtlgdINAOi/SDsEXtTQSMNb6xrGN0AfPgCRlKEBSEIluiRQc97H/AOmwp\\r\\n"\n  "6HVeMQm/BVdQtp+i9MauwKJclB7ljReS0vlqMfk5FnlD3AT9eT61HUGcBVuyR37p\\r\\n"\n  "vbHP2yRg+5uZnw5BqUOL1Y0asuK0vqlizllpRxikq9kMKsR8KaesRyHkVX/FAC9u\\r\\n"\n  "uxxYke0T3f+dGlGzxm/ly6g5gQVbjdZGeoNma8qXjJ9o5BhZuAll7SajSLiXWERu\\r\\n"\n  "n4PtYxVA4KsvJNDabHea1zF3pGyKzv7HAUc=\\r\\n"\n  "-----END CERTIFICATE-----\\r\\n";\n\n  // We must set root CA before connecting to host\n  // Note that the lenght includes the terminating NULL,\n  // so use sizeof() instead of strlen().\n  client.setRootCA(rootCA, sizeof(rootCA));\n  if (client.connect("api.thingspeak.com", 443)) {\n      // Make a HTTP request over SSL (HTTPS)\n\n      const String payload = String() + "{\\"api_key\\":\\"" + key\n                        + "\\",\\"field1\\":\\"" + p1\n                        + "\\",\\"field2\\":\\"" + p2\n                        + "\\",\\"field3\\":\\"" + p3\n                        + "\\",\\"field4\\":\\"" + p4\n                        + "\\",\\"field5\\":\\"" + p5\n                        + "\\",\\"field6\\":\\"" + p6\n                        + "\\",\\"field7\\":\\"" + p7\n                        + "\\",\\"field8\\":\\"" + p8\n                        + "\\"}";\n\n      const String url = String() + "https://api.thingspeak.com/update";\n\n      client.println(String() + "POST " + url + " HTTP/1.1");\n      client.println("Host: api.thingspeak.com");\n      client.println("User-Agent: BlocklyDuino/1.0");\n      client.println("Content-Type: application/json;charset=utf-8");\n      client.print("Content-Length: ");\n      client.println(payload.length());\n      client.println("User-Agent: BlocklyDuino/1.0");\n      client.println("Accept: */*");\n      client.println("Connection: close");\n\n      client.println();\n      client.print(payload);\n\n      client.println();\n      delay(300);\n  } else {\n    // Serial.println("failed to connect to ThingSpeak");\n  }\n\n  // wait for server response\n  // if there are incoming bytes available\n  // from the server, read them and print them:\n  while (client.available()) {\n      char c = client.read();\n      // Serial.print(c);\n      delay(1);\n  }\n\n  // if the server\'s disconnected, stop the client:\n  if (!client.connected()) {\n      //Serial.println();\n      //Serial.println("disconnecting from server passively.");\n      client.stop();\n  } else {\n    // otherwise we actively stop the connection. we\'ll reconnect next time.\n    //Serial.println("disconnecting from server.");\n    client.stop();\n  }\n}  \n';
	var a=Blockly.Arduino.valueToCode(this,"KEY",Blockly.Arduino.ORDER_ATOMIC)||'"---"',
	b=Blockly.Arduino.valueToCode(this,"FIELD1",Blockly.Arduino.ORDER_ATOMIC)||"0",
	c=Blockly.Arduino.valueToCode(this,"FIELD2",Blockly.Arduino.ORDER_ATOMIC)||"0",
	d=Blockly.Arduino.valueToCode(this,"FIELD3",Blockly.Arduino.ORDER_ATOMIC)||"0",
	e=Blockly.Arduino.valueToCode(this,"FIELD4",Blockly.Arduino.ORDER_ATOMIC)||"0",
	f=Blockly.Arduino.valueToCode(this,"FIELD5",Blockly.Arduino.ORDER_ATOMIC)||"0",
	g=Blockly.Arduino.valueToCode(this,"FIELD6",Blockly.Arduino.ORDER_ATOMIC)||"0",
	h=Blockly.Arduino.valueToCode(this,"FIELD7",Blockly.Arduino.ORDER_ATOMIC)||"0",
	i=Blockly.Arduino.valueToCode(this,"FIELD8",Blockly.Arduino.ORDER_ATOMIC)||"0";
	return"invokeThingSpeak("+[a,"String("+b+")","String("+c+")","String("+d+")","String("+e+")","String("+f+")","String("+g+")","String("+h+")","String("+i+")"].join(", ")+");\n"
};

//mp3
Blockly.Arduino.mp3={};
Blockly.Arduino.mp3_set_pins=function(){
	var a=Blockly.Arduino.valueToCode(this,"RX_PIN",Blockly.Arduino.ORDER_ATOMIC)||"2",
	    b=this.getFieldValue("TX_PIN");
	Blockly.Arduino.definitions_.define_softwareserial="#include <SoftwareSerial.h>\n";
    Blockly.Arduino.definitions_.define_mp3_include='#include <DFRobotDFPlayerMini.h>\n';
    Blockly.Arduino.definitions_["mp3_serial"]='SoftwareSerial mySoftwareSerial('+a+', '+b+');';
	Blockly.Arduino.definitions_["mp3_dfplayer"]='DFRobotDFPlayerMini myDFPlayer;';
	Blockly.Arduino.setups_["setup_mp3_"]="mySoftwareSerial.begin(9600);\n  myDFPlayer.begin(mySoftwareSerial);\n";
	return''
};

Blockly.Arduino.mp3_playfolder=function(){
	var a=Blockly.Arduino.valueToCode(this,"FOLDER",Blockly.Arduino.ORDER_ATOMIC)||"1",
	    b=Blockly.Arduino.valueToCode(this,"MP3_INDEX",Blockly.Arduino.ORDER_ATOMIC)||"1";
	return'myDFPlayer.playFolder('+a+', '+b+');\n'
};

Blockly.Arduino.mp3_execute=function(){
  var a=this.getFieldValue("STAT");
  if (a == "PLAY") {
	return'myDFPlayer.start();\n'
  } else if (a == "STOP"){
	return'myDFPlayer.stop();\n'
  } else if (a == "PAUSE") {
	return'myDFPlayer.pause();\n'
  } else if (a == "NEXT") {
	return'myDFPlayer.next();\n'
  } else if (a == "PREVIOUS") {
	return'myDFPlayer.previous();\n'
  }
};

Blockly.Arduino.mp3_volume=function(){
	var a=Blockly.Arduino.valueToCode(this,"VOLUME",Blockly.Arduino.ORDER_ATOMIC)||"0";
	return'myDFPlayer.volume('+a+');\n'
};

Blockly.Arduino.mp3_loop_folder=function(){
	var a=Blockly.Arduino.valueToCode(this,"FOLDER",Blockly.Arduino.ORDER_ATOMIC)||"1";
	return'myDFPlayer.loopFolder('+a+');\n'
};

Blockly.Arduino.mp3_loop_options=function(){
  var a=this.getFieldValue("STAT");
  if (a == "LOOP_MP3") {
	return'myDFPlayer.enableLoop();\n'
  } else if (a == "DISABLE_LOOP_MP3"){
	return'myDFPlayer.disableLoop();\n'
  } else if (a == "ALL") {
	return'myDFPlayer.enableLoopAll();\n'
  } else if (a == "DISABLE_ALL") {
	return'myDFPlayer.disableLoopAll();\n'
  }
};

Blockly.Arduino.mp3_random=function(){
	return'myDFPlayer.randomAll();\n'
};

//ljj_tools
Blockly.Arduino.ljj_tools={};
Blockly.Arduino.tools_convert_str_int=function(){
	var a=Blockly.Arduino.valueToCode(this,"MY_VAR",Blockly.Arduino.ORDER_ATOMIC)||"";
	return['String('+a+').toInt()',Blockly.Arduino.ORDER_ATOMIC]
};