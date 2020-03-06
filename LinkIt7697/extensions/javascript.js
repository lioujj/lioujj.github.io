Blockly.Arduino.finish=function(a){
	var myStr="";
	if (Blockly.Arduino.definitions_.define_mqtt_include=="#include <PubSubClient.h>")
		myStr="  myClient.loop();\n";
	a="  "+a.replace(/\n/g,"\n");
	a=a.replace(/\n\s+$/,"\n");
	a="void loop() \n{\n"+myStr+a+"\n}";
	a=a.replace("  if (myBtnStatus=='","  myBtnStatus=getBtnStatus();\n  if (myBtnStatus=='");
	var b=[],c=[];
	for(e in Blockly.Arduino.definitions_){
		var d=Blockly.Arduino.definitions_[e];
		d.match(/^#include/)?b.push(d):c.push(d)
	}
	d=[];
	for(e in Blockly.Arduino.setups_){
		Blockly.Arduino.setups_[e]=Blockly.Arduino.setups_[e].replace("if (myBtnStatus=='","myBtnStatus=getBtnStatus();\n  if (myBtnStatus=='");
		d.push(Blockly.Arduino.setups_[e]);
	}
	var e=new Date((new Date).getTime());
	if (Blockly.Arduino.mqtt_exist=="yes")
		b=b.join("\n")+"\n\n"+c.join("\n")+"\n\n"+Blockly.Arduino.mqtt_callback_header+Blockly.Arduino.mqtt_callback_body+Blockly.Arduino.mqtt_callback_footer+"\nvoid setup() \n{\n  "+d.join("\n  ")+"\n}\n\n";
	else
		b=b.join("\n")+"\n\n"+c.join("\n")+"\n\nvoid setup() \n{\n  "+d.join("\n  ")+"\n}\n\n";
	b=b.replace(/\n\n+/g,"\n\n").replace(/\n*$/,"\n\n\n")+a;
	Blockly.Arduino.mqtt_exist="no";
	b="/*\n * Generated using BlocklyDuino:\n *\n * https://github.com/MediaTek-Labs/BlocklyDuino-for-LinkIt\n *\n * Date: "+e.toUTCString()+"\n */\n\n"+b
	return b
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


//Maqueen
Blockly.Arduino.maqueen={};
Blockly.Arduino.maqueen_head_light=function(){
  var a=this.getFieldValue("STAT1"),
      b=this.getFieldValue("STAT2");

  if (a == "LEFT") {
	  Blockly.Arduino.setups_["setup_maqueen_headlight_left"]="pinMode(17, OUTPUT);";
	  if (b == "ON"){
	     return'digitalWrite(17, 1);\n'
	  } else if (b=="OFF"){
		 return'digitalWrite(17, 0);\n'
	  }
  } else if (a == "RIGHT"){
	  Blockly.Arduino.setups_["setup_maqueen_headlight_right"]="pinMode(4, OUTPUT);";
	  if (b == "ON"){
	     return'digitalWrite(4, 1);\n'
	  } else if (b=="OFF"){
		 return'digitalWrite(4, 0);\n'
	  }
  } else
	  return''
};
Blockly.Arduino.maqueen_move_car=function(){
  var a=this.getFieldValue("STAT"),
      b=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_["maqueen_address"]='byte maqueenAddr=0x10;';
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  Blockly.Arduino.definitions_.define_maqueen_motor_run='void motorRun(byte motor, byte dir ,byte power){\n  Wire.setClock(100000);\n  byte myParams[]={motor,dir,power};\n  Wire.beginTransmission(maqueenAddr);\n  Wire.write(myParams,3);\n  Wire.endTransmission();\n}'; 
  if (a == "FORWARD") {
    return'motorRun(0x00,0,'+b+');\nmotorRun(0x02,0,'+b+');\n'
  } else if (a == "BACKWARD"){
    return'motorRun(0x00,1,'+b+');\nmotorRun(0x02,1,'+b+');\n'
  } else if (a == "LEFT") {
    return'motorRun(0x00,1,'+b+');\nmotorRun(0x02,0,'+b+');\n'
  } else if (a == "RIGHT") {
    return'motorRun(0x00,0,'+b+');\nmotorRun(0x02,1,'+b+');\n'
  } else {
    return'motorRun(0x00,0,0);\nmotorRun(0x02,0,0);\n'
  }
};
Blockly.Arduino.maqueen_move_motor=function(){
  var a=this.getFieldValue("STAT1"),
      b=this.getFieldValue("STAT2"),
      c=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_["maqueen_address"]='byte maqueenAddr=0x10;';
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  Blockly.Arduino.definitions_.define_maqueen_motor_run='void motorRun(byte motor, byte dir ,byte power){\n  Wire.setClock(100000);\n  byte myParams[]={motor,dir,power};\n  Wire.beginTransmission(maqueenAddr);\n  Wire.write(myParams,3);\n  Wire.endTransmission();\n}'; 
  if (a == "LEFT") {
	  if (b=="FORWARD")
		  return'motorRun(0x00,0,'+c+');\n'
	  else if (b=="BACKWARD")
		  return'motorRun(0x00,1,'+c+');\n'
      else
          return'motorRun(0x00,0,0);\n'
  } else if (a == "RIGHT"){
	  if (b=="FORWARD")
		  return'motorRun(0x02,0,'+c+');\n'
	  else if (b=="BACKWARD")
		  return'motorRun(0x02,1,'+c+');\n'
      else
          return'motorRun(0x02,0,0);\n'
  }
};

Blockly.Arduino.maqueen_sonar=function(){
  Blockly.Arduino.definitions_['define_sonar_']="#include <Ultrasonic.h>";
  Blockly.Arduino.definitions_['define_sonar_set']="Ultrasonic maqueen_sonar(15, 16);"
  return ["maqueen_sonar.convert(maqueen_sonar.timing(), Ultrasonic::CM)", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.maqueen_line_follower=function(){
  var a=this.getFieldValue("STAT1"),
      b=this.getFieldValue("STAT2");
  Blockly.Arduino.setups_["setup_maqueen_line_follower"]="pinMode(13, INPUT);\n  pinMode(12, INPUT);";
  Blockly.Arduino.definitions_.define_maqueen_line_follower='bool detectLine(byte myPin, byte myResult){\n  if (digitalRead(myPin)==myResult)\n     return true;\n  else\n     return false;\n}';
  return['detectLine('+a+','+b+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.maqueen_servo=function(){
  var a=this.getFieldValue("STAT"),
      b=Blockly.Arduino.valueToCode(this,"ANGLE",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (b>180)
      b=180;
  else if (b<0)
      b=0;
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_["maqueen_address"]='byte maqueenAddr=0x10;';
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  Blockly.Arduino.definitions_.define_maqueen_servo='void servoRun(byte myServo, byte angle){\n  Wire.setClock(100000);\n  Wire.beginTransmission(maqueenAddr);\n  Wire.write(myServo);\n  Wire.write(angle);\n  Wire.endTransmission();\n}';
  return'servoRun('+a+','+b+');\n'
};

Blockly.Arduino.maqueen_tone=function(){
  var a=this.getFieldValue("FREQ");
  return"tone("+14+", "+a+");\n"
};
Blockly.Arduino.maqueen_no_tone=function(){
    return"noTone(14);\n"
};

Blockly.Arduino.maqueen_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||0,
      b=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||0;
  return"tone(14, "+a+", "+b+");\n"
};

Blockly.Arduino.neopixel_begin_maqueen=function(){
	var a=this.getFieldValue("NUM"),
	b=this.getFieldValue("PIN"),
	c=this.getFieldValue("BRIGHTNESS");
	Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>\n";
	Blockly.Arduino.definitions_.define_neopixel="Adafruit_NeoPixel pixels = Adafruit_NeoPixel(4,11,NEO_GRB + NEO_KHZ800);\n";
	Blockly.Arduino.setups_.setup_neopixel_begin="pixels.begin();\n";
	Blockly.Arduino.setups_.setup_neopixel_brightness="pixels.setBrightness("+c+");\n";
    return""
};

Blockly.Arduino.maqueen_button=function(){
    var a=this.getFieldValue("AB_BUTTON"),
	    b=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL");
	b=b.replace(/\n/g,'\n  ');
    Blockly.Arduino.definitions_.define_m_button="char myBtnStatus;\nbool buttonPressed(char btnName)\n{\n  byte A_Pin=0;\n  byte B_Pin=7;\n  if (btnName=='A'){\n    if (digitalRead(A_Pin) == 1)\n      return false;\n    else\n      return true;\n  }\n  else if (btnName=='B'){\n    if (digitalRead(B_Pin) == 1)\n      return false;\n    else\n      return true;\n  } else {\n    if ((digitalRead(A_Pin) == 1) && (digitalRead(B_Pin) == 1))\n      return false;\n    else\n      return true;\n  }\n}\n"
    Blockly.Arduino.definitions_.define_m_getBtnStatus="char getBtnStatus(){\n  char buttonStatus=' ';\n  int checkButtonDelay=200;\n  if (buttonPressed('A')){\n    delay(checkButtonDelay);\n    if (buttonPressed('A')){\n      buttonStatus='A';\n      if (buttonPressed('B'))\n        buttonStatus='C';\n    }\n  } else if (buttonPressed('B')){\n      delay(checkButtonDelay);\n      if (buttonPressed('B')){\n        buttonStatus='B';\n        if (buttonPressed('A'))\n          buttonStatus='C';\n      }\n  }\n  return buttonStatus;\n}\n";
    Blockly.Arduino.setups_.setup_button='pinMode(0, INPUT);\n  pinMode(7, INPUT);\n';
	return"if (myBtnStatus=='"+a+"'){\n"+b+"while(buttonPressed('"+a+"')){}\n}\n"
};

Blockly.Arduino.maqueen_ir_event=function(){
  var a=this.getFieldValue("IR_EVENT");
  Blockly.Arduino.definitions_.define_irremote="#include <IRremote.h>";
  Blockly.Arduino.definitions_.define_irremote_init="IRrecv irrecv(10);";
  Blockly.Arduino.definitions_.define_irremote_decode="decode_results results;";
  Blockly.Arduino.definitions_.define_irremote_ir_type='String ir_type(int tip)\n{\n  if (tip == 1) {\n    return "RC5";\n  } else if (tip == 2){\n    return "RC6";\n  } else if (tip == 3){\n    return "NEC";\n  } else {\n    return "Sony";\n  }\n}\n';
  Blockly.Arduino.setups_["irremote_"]||(Blockly.Arduino.setups_["irremote_"]="irrecv.enableIRIn();\n");
  return'  if (irrecv.decode(&results)) {\n'+Blockly.Arduino.statementToCode(this,"IR_EVENT")+'  irrecv.resume();\n}\n'
};

Blockly.Arduino.maqueen_ir_remote_received1=function(){
  var a=this.getFieldValue("IR_SIGNAL");
  return'if (ir_type(results.decode_type) == "NEC" && String(results.value, HEX) == "'+a+'") {\n'+Blockly.Arduino.statementToCode(this,"IR_RECEIVED")+'\n}\n';
};

Blockly.Arduino.maqueen_ir_remote_received2=function(){
  var a=this.getFieldValue("IR_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"IR_SIGNAL",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'if (results.decode_type == '+a+' && String(results.value, HEX) == '+b+') {\n'+Blockly.Arduino.statementToCode(this,"IR_RECEIVED")+'\n}\n';
};
Blockly.Arduino.maqueen_ir_received_type=function(){
  return["ir_type(results.decode_type)",Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.maqueen_ir_received_code=function(){
  return["String(results.value, HEX)",Blockly.Arduino.ORDER_ATOMIC];
};


//ir
Blockly.Arduino.ir_receiver_pin=function(){
  var a=this.getFieldValue("PIN");
  Blockly.Arduino.definitions_.define_irremote="#include <IRremote.h>";
  Blockly.Arduino.definitions_.define_irremote_init="IRrecv irrecv("+a+");";
  Blockly.Arduino.definitions_.define_irremote_decode="decode_results results;";
  Blockly.Arduino.definitions_.define_irremote_ir_type='String ir_type(int tip)\n{\n  if (tip == 1) {\n    return "RC5";\n  } else if (tip == 2){\n    return "RC6";\n  } else if (tip == 3){\n    return "NEC";\n  } else {\n    return "Sony";\n  }\n}\n';
  Blockly.Arduino.setups_["irremote_"]||(Blockly.Arduino.setups_["irremote_"]="irrecv.enableIRIn();\n");
  return''
};

Blockly.Arduino.ir_event=function(){
  var a=this.getFieldValue("IR_EVENT");
  return'  if (irrecv.decode(&results)) {\n'+Blockly.Arduino.statementToCode(this,"IR_EVENT")+'  irrecv.resume();\n}\n'
};

Blockly.Arduino.ir_received_type=function(){
  return["ir_type(results.decode_type)",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ir_received_code=function(){
  return["String(results.value, HEX)",Blockly.Arduino.ORDER_ATOMIC];
};