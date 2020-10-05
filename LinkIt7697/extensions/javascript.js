Blockly.Arduino.finish=function(a){
  if (Blockly.Arduino.probbie_type=="Tobbie")
    if (Blockly.Arduino.definitions_.define_linkit_wifi_include!=null)
     Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <WiFi.h>";
	var myStr="";
	if (Blockly.Arduino.definitions_.define_mqtt_include=="#include <PubSubClient.h>")
		myStr="  myClient.loop();\n";
	if (Blockly.Arduino.definitions_.define_broadcast_include=="#include <WiFiUdp.h>")
		myStr=myStr+"  checkBroadcastUDP();\n";
	if (Blockly.Arduino.webserver.webserver_exist=="yes"){
    Blockly.Arduino.webserver.webserver_header=Blockly.Arduino.webserver.webserver_header.replace("#title#",Blockly.Arduino.webserver.webserver_myTitle);
    Blockly.Arduino.webserver.webserver_header=Blockly.Arduino.webserver.webserver_header.replace("#color#",Blockly.Arduino.webserver.webserver_myColor);
		myStr=myStr+"  checkWebClient();\n";
  }
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
	b="/*\n * Generated using BlocklyDuino:\n *\n * https://github.com/MediaTek-Labs/BlocklyDuino-for-LinkIt\n *\n * Date: "+e.toUTCString()+"\n */\n\n"+"/*\n\n * 部份程式碼由吉哥積木產生\n * https://sites.google.com/jes.mlc.edu.tw/ljj/linkit7697\n\n*/\n\n"+b
  if (Blockly.Arduino.webserver.webserver_exist=="yes"){
    b=b+Blockly.Arduino.webserver.webserver_header+Blockly.Arduino.webserver.webserver_body+Blockly.Arduino.webserver.webserver_footer;
    Blockly.Arduino.webserver.webserver_exist="no";
  }

  if (Blockly.Arduino.broadcast_udp.broadcast_exist=="yes"){
	  for(e in Blockly.Arduino.broadcast_udp.defineFunction){
		  b=b+Blockly.Arduino.broadcast_udp.defineFunction[e];
	  }
    //b=b+Blockly.Arduino.webserver.webserver_header+Blockly.Arduino.webserver.webserver_body+Blockly.Arduino.webserver.webserver_footer;
    Blockly.Arduino.broadcast_udp.broadcast_exist="no";
  }


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
	Blockly.Arduino.definitions_.define_mqtt_received_msg='String receivedMsg="";\nbool waitForE=true;\nbool ended=true;\nbool pubCtrl=false;\n';
	Blockly.Arduino.definitions_.define_mqtt_client='WiFiClient mqttClient;';
	Blockly.Arduino.definitions_.define_mqtt_pubclient='PubSubClient myClient(mqttClient);\n';
	Blockly.Arduino.mqtt_exist="yes";
	Blockly.Arduino.mqtt_callback_header='void mqttCallback(char* topic, byte* payload, unsigned int length){\n  receivedTopic=String(topic);\n  receivedMsg="";\n  for (unsigned int myIndex = 0; myIndex < length; myIndex++)\n  {\n      receivedMsg += (char)payload[myIndex];\n  }\n  receivedMsg.trim();\n';
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
	Blockly.Arduino.mqtt_callback_body+=Blockly.Arduino.statementToCode(this,"MSG_TOPIC_EQAL");
	return''
};

Blockly.Arduino.mqtt_connected=function(){
  return['myClient.connected()',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mqtt_reconnect=function(){
	return"connectMQTT();\n"
};

//thingspeak
Blockly.Arduino.thingspeak={};
Blockly.Arduino.things_get_url=function(){
	//Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <LWiFi.h>";
	Blockly.Arduino.definitions_.define_thingspeak_invoke='\nvoid invokeThingSpeak(const String& key, const String& p1, const String& p2, const String& p3, const String& p4, const String& p5, const String& p6, const String& p7, const String& p8)\n{\n  // Initialize the Ethernet client library\n  // with the IP address and port of the server\n  // that you want to connect to (port 80 is default for HTTP):\n  static WiFiClient client;\n\n  if (client.connect("api.thingspeak.com", 80)) {\n  const String payload = String() + "{\\"api_key\\":\\"" + key\n                        + "\\",\\"field1\\":\\"" + p1\n                        + "\\",\\"field2\\":\\"" + p2\n                        + "\\",\\"field3\\":\\"" + p3\n                        + "\\",\\"field4\\":\\"" + p4\n                        + "\\",\\"field5\\":\\"" + p5\n                        + "\\",\\"field6\\":\\"" + p6\n                        + "\\",\\"field7\\":\\"" + p7\n                        + "\\",\\"field8\\":\\"" + p8\n                        + "\\"}";\n\n      const String url = String() + "https://api.thingspeak.com/update";\n\n      client.println(String() + "POST " + url + " HTTP/1.1");\n      client.println("Host: api.thingspeak.com");\n      client.println("User-Agent: BlocklyDuino/1.0");\n      client.println("Content-Type: application/json;charset=utf-8");\n      client.print("Content-Length: ");\n      client.println(payload.length());\n      client.println("User-Agent: BlocklyDuino/1.0");\n      client.println("Accept: */*");\n      client.println("Connection: close");\n\n      client.println();\n      client.print(payload);\n\n      client.println();\n      delay(300);\n  } else {\n    // Serial.println("failed to connect to ThingSpeak");\n  }\n\n  // wait for server response\n  // if there are incoming bytes available\n  // from the server, read them and print them:\n  while (client.available()) {\n      char c = client.read();\n      // Serial.print(c);\n      delay(1);\n  }\n\n  // if the server\'s disconnected, stop the client:\n  if (!client.connected()) {\n      //Serial.println();\n      //Serial.println("disconnecting from server passively.");\n      client.stop();\n  } else {\n    // otherwise we actively stop the connection. we\'ll reconnect next time.\n    //Serial.println("disconnecting from server.");\n    client.stop();\n  }\n}  \n';
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

Blockly.Arduino.mp3_set_pins1=function(){
	var a=Blockly.Arduino.valueToCode(this,"RX_PIN",Blockly.Arduino.ORDER_ATOMIC)||"2",
	    b=Blockly.Arduino.valueToCode(this,"TX_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
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
Blockly.Arduino.convert_str_int=function(){
	var a=Blockly.Arduino.valueToCode(this,"MY_VAR",Blockly.Arduino.ORDER_ATOMIC)||"";
	return['String('+a+').toInt()',Blockly.Arduino.ORDER_ATOMIC]
};


//KSB045
Blockly.Arduino.ksb045={};
Blockly.Arduino.ksb045_button=function(){
  var a=this.getFieldValue("BUTTON"),
	b=Blockly.Arduino.statementToCode(this,"KSB045_BUTTON_CALL");
	b=b.replace(/\n  /g,'\n    ');
  Blockly.Arduino.definitions_.define_ksb045_mid_xy="int midX=0;\nint midY=0;\n";
  Blockly.Arduino.definitions_.define_ksb045_button='bool checkPinPressed(byte myPin)\n{\n  if (digitalRead(myPin) == 1)\n    return false;\n  else\n    return true;\n}\n';
  Blockly.Arduino.setups_.setup_ksb045_button='analogReadResolution(10);\n  pinMode(0, INPUT);\n  pinMode(7, INPUT);\n  pinMode(11, INPUT);\n  pinMode(12, INPUT);\n  pinMode(13, INPUT);\n  pinMode(4, INPUT);\n  pinMode(10, OUTPUT);\n  pinMode(17, INPUT);\n  pinMode(16, INPUT);\n  pinMode(15, INPUT);\n  delay(300);\n  midX=analogRead(16);\n  midY=analogRead(15);\n';
	return"if (checkPinPressed("+a+")){\n  "+b+"    while(checkPinPressed("+a+")){}\n  }\n";
};

Blockly.Arduino.ksb045_xy=function(){
  Blockly.Arduino.definitions_.define_ksb045_mid_xy="int midX=0;\nint midY=0;\n";
  Blockly.Arduino.setups_.setup_ksb045_button='analogReadResolution(10);\n  pinMode(0, INPUT);\n  pinMode(7, INPUT);\n  pinMode(11, INPUT);\n  pinMode(12, INPUT);\n  pinMode(13, INPUT);\n  pinMode(4, INPUT);\n  pinMode(10, OUTPUT);\n  pinMode(17, INPUT);\n  pinMode(16, INPUT);\n  pinMode(15, INPUT);\n  delay(300);\n  midX=analogRead(16);\n  midY=analogRead(15);\n';
  var a=this.getFieldValue("TYPE"),
      b=this.getFieldValue("XY"),
      xyPin=0;
  if (a=="KSB045"){
    if (b=="X")
      xyPin=16;
    else
      xyPin=15;
  } else{
    if (b=="X")
      xyPin=15;
    else
      xyPin=16;
  }
  return['analogRead('+xyPin+')',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ksb045_mid_xy=function(){
  Blockly.Arduino.definitions_.define_ksb045_mid_xy="int midX=0;\nint midY=0;\n";
  Blockly.Arduino.setups_.setup_ksb045_button='analogReadResolution(10);\n  pinMode(0, INPUT);\n  pinMode(7, INPUT);\n  pinMode(11, INPUT);\n  pinMode(12, INPUT);\n  pinMode(13, INPUT);\n  pinMode(4, INPUT);\n  pinMode(10, OUTPUT);\n  pinMode(17, INPUT);\n  pinMode(16, INPUT);\n  pinMode(15, INPUT);\n  delay(300);\n  midX=analogRead(16);\n  midY=analogRead(15);\n';
  var a=this.getFieldValue("TYPE"),
      b=this.getFieldValue("XY");
  if (a=="KSB045"){
    if (b=="X")
      return['midX',Blockly.Arduino.ORDER_ATOMIC];
    else
      return['midY',Blockly.Arduino.ORDER_ATOMIC];
  } else{
    if (b=="X")
      return['midY',Blockly.Arduino.ORDER_ATOMIC];
    else
      return['midX',Blockly.Arduino.ORDER_ATOMIC];
  }
}

Blockly.Arduino.ksb045_vibration=function(){
  Blockly.Arduino.definitions_.define_ksb045_mid_xy="int midX=0;\nint midY=0;\n";
  Blockly.Arduino.setups_.setup_ksb045_button='analogReadResolution(10);\n  pinMode(0, INPUT);\n  pinMode(7, INPUT);\n  pinMode(11, INPUT);\n  pinMode(12, INPUT);\n  pinMode(13, INPUT);\n  pinMode(4, INPUT);\n  pinMode(10, OUTPUT);\n  pinMode(17, INPUT);\n  pinMode(16, INPUT);\n  pinMode(15, INPUT);\n  delay(300);\n  midX=analogRead(16);\n  midY=analogRead(15);\n';
  var a=this.getFieldValue("STAT");
  return'digitalWrite(10,'+a+');\n';
}

Blockly.Arduino.ksb045_tone=function(){
  var a=this.getFieldValue("FREQ");
  return"tone("+14+", "+a+");\n"
};
Blockly.Arduino.ksb045_no_tone=function(){
    return"noTone(14);\n"
};

Blockly.Arduino.ksb045_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||0,
      b=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||0;
  return"tone(14, "+a+", "+b+");\n"
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
	return"if (myBtnStatus=='"+a+"'){\n"+b+"  while(buttonPressed('"+a+"')){}\n}\n"
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

Blockly.Arduino.ir_receiver_pin1=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
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

Blockly.Arduino.ir_remote_received=function(){
  var a=this.getFieldValue("IR_SIGNAL");
  return'if (ir_type(results.decode_type) == "NEC" && String(results.value, HEX) == "'+a+'") {\n'+Blockly.Arduino.statementToCode(this,"IR_RECEIVED")+'}\n';
};
Blockly.Arduino.ir_received_type=function(){
  return["ir_type(results.decode_type)",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ir_received_code=function(){
  return["String(results.value, HEX)",Blockly.Arduino.ORDER_ATOMIC];
};

//weather
Blockly.Arduino.weather={};
Blockly.Arduino.weather_fetchWeatherInfo=function(){
	//Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <LWiFi.h>";
  Blockly.Arduino.definitions_.define_json_include="#define ARDUINOJSON_DECODE_UNICODE 1\n#include <ArduinoJson.h>";
  Blockly.Arduino.definitions_.define_ctimes_include="#include <ctime>";
  Blockly.Arduino.definitions_.define_json_invoke="const size_t capacity = JSON_ARRAY_SIZE(1) + JSON_OBJECT_SIZE(1) + 2*JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(4) + JSON_OBJECT_SIZE(5) + JSON_OBJECT_SIZE(6) + JSON_OBJECT_SIZE(13) + 280;\nDynamicJsonDocument doc(capacity);";
	Blockly.Arduino.definitions_.define_fetch_weather_invoke='void fetchWeatherInfo(char* cityID, char* myKey)\n{\n  static WiFiClient client;\n  client.setTimeout(10000);\n  if (!client.connect("api.openweathermap.org", 80)) {\n    return;\n  }\n  const String url = String() + "/data/2.5/weather?id="+cityID+"&appid="+myKey;\n  client.println("GET " + url + " HTTP/1.1");\n  client.println(F("Host: api.openweathermap.org"));\n  client.println(F("Accept: */*"));\n  client.println(F("Connection: close"));\n  if (client.println() == 0) {\n    return;\n  }\n  char status[32] = {0};\n  client.readBytesUntil(\'\\r\', status, sizeof(status));\n  if (strcmp(status, "HTTP/1.1 200 OK") != 0) {\n    return;\n  }\n  char endOfHeaders[] = "\\r\\n\\r\\n";\n  if (!client.find(endOfHeaders)) {\n    return;\n  }\n  DeserializationError error = deserializeJson(doc, client);\n  if (error) {\n    return;\n  }\n  client.stop();\n}\n';
  Blockly.Arduino.definitions_.define_weather_ctime='String convMyTime(long myTimeStamp)\n{\n  static char time_text[]="YYYY-MM-DDTHH:MM:SS";\n  const time_t myTime = myTimeStamp;\n  strftime(time_text, sizeof(time_text), "%Y-%m-%dT%H:%M:%S", gmtime(&myTime));\n  return String((const char*)time_text);\n}\n';
  var a=Blockly.Arduino.valueToCode(this,"CITYID",Blockly.Arduino.ORDER_ATOMIC)||"0",
	b=Blockly.Arduino.valueToCode(this,"KEY",Blockly.Arduino.ORDER_ATOMIC)||"";
	return'fetchWeatherInfo('+a+','+b+');\n'
};

Blockly.Arduino.weather_getID=function(){
  var a=this.getFieldValue("CITY_ID");
  return['"'+a+'"',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.weather_getID_TW=function(){
  var a=this.getFieldValue("CITY_ID");
  return['"'+a+'"',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.weather_getValue=function(){
  var a=this.getFieldValue("VALUE_NAME");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

//Taiwan AQI
Blockly.Arduino.aqi={};
Blockly.Arduino.aqi_fetchAQIInfo=function(){
  Blockly.Arduino.definitions_.define_json_include="#define ARDUINOJSON_DECODE_UNICODE 1\n#include <ArduinoJson.h>";
  Blockly.Arduino.definitions_.define_json_aqi_invoke="const size_t capacity_AQI = JSON_ARRAY_SIZE(83) + 83*JSON_OBJECT_SIZE(24) + 25480;\nDynamicJsonDocument doc_aqi(capacity_AQI);";
	Blockly.Arduino.definitions_.define_fetch_aqi_invoke='void fetchAQIInfo()\n{\n  static WiFiClient client;\n  client.setTimeout(10000);\n  if (!client.connect("opendata2.epa.gov.tw", 80)) {\n    return;\n  }\n  const String url = String() + "/AQI.json";\n  client.println("GET " + url + " HTTP/1.1");\n  client.println(F("Host: opendata2.epa.gov.tw"));\n  client.println(F("Accept: */*"));\n  client.println(F("Connection: close"));\n  if (client.println() == 0) {\n    return;\n  }\n  char status[32] = {0};\n  client.readBytesUntil(\'\\r\', status, sizeof(status));\n  if (strcmp(status, "HTTP/1.1 200 OK") != 0) {\n    return;\n  }\n  char endOfHeaders[] = "\\r\\n\\r\\n";\n  if (!client.find(endOfHeaders)) {\n    return;\n  }\n  DeserializationError error = deserializeJson(doc_aqi, client);\n  if (error) {\n    return;\n  }\n  client.stop();\n}\n';
	Blockly.Arduino.definitions_.define_get_aqi_invoke='String getAQIValue(String mySitename,String myAttr)\n{\n  String myStr="";\n  for(int i=0;i<doc_aqi.size();i++){\n    if (doc_aqi[i]["SiteName"].as<String>()==mySitename){\n       myStr=String(doc_aqi[i][myAttr].as<char*>());\n       break;\n    }\n  }\n  return myStr;\n}\n';
  return'fetchAQIInfo();\n'
};

Blockly.Arduino.ESP8266_aqi_fetchAQIInfo=function(){
  var a=Blockly.Arduino.valueToCode(this,"SITENAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_json_include="#define ARDUINOJSON_DECODE_UNICODE 1\n#include <ArduinoJson.h>";
  Blockly.Arduino.definitions_.define_json_aqi_invoke="const size_t capacity_AQI = JSON_OBJECT_SIZE(24) + 310;\nDynamicJsonDocument doc_aqi(capacity_AQI);";
	//Blockly.Arduino.definitions_.define_fetch_aqi_invoke='void fetchAQIInfo()\n{\n  static WiFiClient client;\n  client.setTimeout(10000);\n  if (!client.connect("opendata2.epa.gov.tw", 80)) {\n    return;\n  }\n  const String url = String() + "/AQI.json";\n  client.println("GET " + url + " HTTP/1.1");\n  client.println(F("Host: opendata2.epa.gov.tw"));\n  client.println(F("Accept: */*"));\n  client.println(F("Connection: close"));\n  if (client.println() == 0) {\n    return;\n  }\n  char status[32] = {0};\n  client.readBytesUntil(\'\\r\', status, sizeof(status));\n  if (strcmp(status, "HTTP/1.1 200 OK") != 0) {\n    return;\n  }\n  char endOfHeaders[] = "\\r\\n\\r\\n";\n  if (!client.find(endOfHeaders)) {\n    return;\n  }\n  DeserializationError error = deserializeJson(doc_aqi, client);\n  if (error) {\n    return;\n  }\n  client.stop();\n}\n';
	Blockly.Arduino.definitions_.define_fetch_aqi_invoke='void esp8266FetchAQIInfo(String mySiteName)\n{\n  String line;\n  static WiFiClient client;\n  client.setTimeout(10000);\n  if (!client.connect("opendata2.epa.gov.tw", 80)) {\n    return;\n  }\n  const String url = String() + "/AQI.json";\n  client.println("GET " + url + " HTTP/1.1");\n  client.println(F("Host: opendata2.epa.gov.tw"));\n  client.println(F("Accept: */*"));\n  client.println(F("Connection: close"));\n  if (client.println() == 0) {\n    return;\n  }\n  char status[32] = {0};\n  client.readBytesUntil(\'\\r\', status, sizeof(status));\n  if (strcmp(status, "HTTP/1.1 200 OK") != 0) {\n    return;\n  }\n  char endOfHeaders[] = "\\r\\n\\r\\n";\n  if (!client.find(endOfHeaders)) {\n    return;\n  }\n  while(client.connected()){\n    line=client.readStringUntil(\'{\');\n    line.replace("[","");\n    if (line!="" & line.indexOf(mySiteName)>0){\n      line="{"+line;\n      line.replace("]","");\n      line.replace("},","}");\n      DeserializationError error = deserializeJson(doc_aqi, line);\n      if (error) {\n        return;\n      }\n      break;\n    }\n  }\n  client.stop();\n}\n';
  //Blockly.Arduino.definitions_.define_get_aqi_invoke='String getAQIValue(String mySitename,String myAttr)\n{\n  String myStr="";\n  for(int i=0;i<doc_aqi.size();i++){\n    if (doc_aqi[i]["SiteName"].as<String>()==mySitename){\n       myStr=String(doc_aqi[i][myAttr].as<char*>());\n       break;\n    }\n  }\n  return myStr;\n}\n';
  Blockly.Arduino.definitions_.define_get_aqi_invoke='String esp8266GetAQIValue(String myAttr)\n{\n  String myStr="";\n  myStr=String(doc_aqi[myAttr].as<char*>());\n  return myStr;\n}\n';
  return'esp8266FetchAQIInfo('+a+');\n'
};

Blockly.Arduino.aqi_getAQIValue=function(){
  var a=Blockly.Arduino.valueToCode(this,"SITENAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"ATTRNAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  return['getAQIValue('+a+','+b+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ESP8266_aqi_getAQIValue=function(){
  var a=Blockly.Arduino.valueToCode(this,"ATTRNAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  return['esp8266GetAQIValue('+a+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.aqi_attrname_list=function(){
  var a=this.getFieldValue("ATTRNAME");
  return['"'+a+'"',Blockly.Arduino.ORDER_ATOMIC];
};

//LDM6432
Blockly.Arduino.ldm6432={};
Blockly.Arduino.LDM_Check_prefix="if (ended){\n  ended=((!waitForE)||pubCtrl);\n";
Blockly.Arduino.LDM_Check_postfix="  while(!ended){myClient.loop();}\n  ended=true;\n  if((!waitForE)||pubCtrl)\n    delay(250);\n}\n";
Blockly.Arduino.LDM_Check_postfix2="  while(!ended){myClient.loop();}\n  ended=true;\n  delay(800);\n}\n";
Blockly.Arduino.ldm_mqtt_topic=function(){
  var a=Blockly.Arduino.valueToCode(this,"TOPIC",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_ldm6432_topic='String ldmTopic="";\nString echoTopic="";\nString bitmapTopic="";\n';
  var tempCode='  if (receivedTopic == echoTopic){\n    if (receivedMsg == "E") {\n      ended = true;\n    }\n  }\n';
  Blockly.Arduino.mqtt_callback_body=Blockly.Arduino.mqtt_callback_body.replace(tempCode,"");
  Blockly.Arduino.mqtt_callback_body+=tempCode;
  return'pubCtrl=false;\nldmTopic=String("ezDisplay/")+'+a+';\nbitmapTopic=String("Bitmap/")+'+a+';\nechoTopic=String("Echo/")+'+a+';\nmyClient.subscribe(echoTopic.c_str());\n';
};

Blockly.Arduino.ldm_mqtt_public=function(){
  var a=Blockly.Arduino.valueToCode(this,"TOPIC",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"BITMAP_TOPIC",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_ldm6432_topic='String ldmTopic="";\nString echoTopic="";\nString bitmapTopic="";\n';
  //Blockly.Arduino.mqtt_callback_body+='  if (receivedTopic == echoTopic){\n    if (receivedMsg == "E") {\n      ended = true;\n    }\n  }\n';
  return'pubCtrl=true;\nldmTopic='+a+';\nbitmapTopic='+b+';\nechoTopic="NoThisTopic";\n';
};

Blockly.Arduino.ldm_send_bitmap=function(){
  var a=Blockly.Arduino.valueToCode(this,"BITMAP",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(bitmapTopic.c_str(),String('+a+').c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_waitForE=function(){
  var a=this.getFieldValue("WAITFORE");
  if (a=="1")
    return'waitForE=true;\n'
  else
    return'waitForE=false;\n'
};

Blockly.Arduino.ldm_clock=function(){
  var a=this.getFieldValue("CLOCK");
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+a+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix2;
};

Blockly.Arduino.ldm_clear=function(){
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("ATd0=()").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_display=function(){
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("ATd1=()").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_on_off=function(){
  var a=this.getFieldValue("LDM");
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+a+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_show_ver=function(){
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("AT20=()").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_command=function(){
  var a=Blockly.Arduino.valueToCode(this,"COMMAND",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String('+a+').c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_showPage1=function(){
  var a=Blockly.Arduino.valueToCode(this,"PAGE",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATfc=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_effectSpeed=function(){
  var a=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATbf=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_showPage2=function(){
  var a=Blockly.Arduino.valueToCode(this,"PAGE",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("EFFECT");

  a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATfc=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  b=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+b+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix2;
  //var pre_command=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("ATfd=(0)").c_str());\n'+Blockly.Arduino.LDM_Check_postfix2;
  return a+b;
};

Blockly.Arduino.ldm_stop_animation=function(){
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("ATfd=(0)").c_str());\n'+Blockly.Arduino.LDM_Check_postfix2;
};

Blockly.Arduino.ldm_saveToROM=function(){
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("ATfe=()").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_pagesInterval=function(){
  var a=Blockly.Arduino.valueToCode(this,"INTERVAL",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATbe=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_playPages=function(){
  var a=Blockly.Arduino.valueToCode(this,"PAGES",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("EFFECT"),
  a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATdf=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  b=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+b+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix2;
  //var pre_command=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("ATfd=(0)").c_str());\n'+Blockly.Arduino.LDM_Check_postfix2;
  return a+b;
};

Blockly.Arduino.ldm_setColor=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATef=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  return a;
};

Blockly.Arduino.ldm_putString=function(){
  var a=Blockly.Arduino.valueToCode(this,"PUTSTRING",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("FONT"),
      c=Blockly.Arduino.valueToCode(this,"LINE",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"COLUMN",Blockly.Arduino.ORDER_ATOMIC)||"";
      //e=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  //e=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATef=(") +'+e+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+b +'(") +'+c+'+","+'+ d+'+","+'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  return a;
};

Blockly.Arduino.ldm_transparent=function(){
  var a=this.getFieldValue("TRANSPARENT");
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+a+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_colorCode=function(){
  var a=this.getFieldValue("COLOR_CODE");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ldm_background=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATec=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_global_change_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR1",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"COLOR2",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATcc=(") +'+a +'+","+'+ b+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_local_change_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"WIDTH",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"HEIGHT",Blockly.Arduino.ORDER_ATOMIC)||"",
      e=Blockly.Arduino.valueToCode(this,"COLOR1",Blockly.Arduino.ORDER_ATOMIC)||"",
      f=Blockly.Arduino.valueToCode(this,"COLOR2",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATcf=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+","+'+f+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_setXYcolor=function(){
  var a=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATee=(") +'+a +'+","+'+ b +'+","+'+ c+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_allColorChange=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATc0=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_drawLine=function(){
  var a=Blockly.Arduino.valueToCode(this,"X1",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y1",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"X2",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"Y2",Blockly.Arduino.ORDER_ATOMIC)||"",
      e=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT90=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_drawRectangle=function(){
  var a=Blockly.Arduino.valueToCode(this,"X1",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y1",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"X2",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"Y2",Blockly.Arduino.ORDER_ATOMIC)||"",
      e=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
      f=this.getFieldValue("FILLED_TYPE");
  if (f=="1")
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT92=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  else
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT91=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_drawCircle=function(){
  var a=Blockly.Arduino.valueToCode(this,"X1",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y1",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"RADIUS",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
      e=this.getFieldValue("FILLED_TYPE");
  if (e=="1")
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT95=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  else
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT94=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_drawSquare=function(){
  var a=Blockly.Arduino.valueToCode(this,"X1",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y1",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"WIDTH",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT93=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_pageScroll=function(){
  var a=this.getFieldValue("SCROLL_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"SCROLLTIME",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+a +'(") +'+b+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  return a;
};

Blockly.Arduino.ldm_eraseImageInOut=function(){
  var a=this.getFieldValue("SCROLL_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"SCROLLTIME",Blockly.Arduino.ORDER_ATOMIC)||"";
  var myCommand="";
  if(a=="0")
    myCommand="ATaa=";
  else
    myCommand="ATab=";
  a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+myCommand +'(") +'+b+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  return a;
};

Blockly.Arduino.ldm_showImageInOut=function(){
  var a=this.getFieldValue("SCROLL_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"SCROLLTIME",Blockly.Arduino.ORDER_ATOMIC)||"";
  var myCommand="";
  if(a=="0")
    myCommand="ATa8=";
  else
    myCommand="ATa9=";
  a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+myCommand +'(") +'+b+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  return a;
};

Blockly.Arduino.ldm_saveDisplayed=function(){
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("AT2c=()").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_loadDisplayed=function(){
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("AT2d=()").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

Blockly.Arduino.ldm_loadPattern=function(){
  var a=this.getFieldValue("SHOW_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"X1",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"Y1",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=this.getFieldValue("ICON_TYPE"),
      e=Blockly.Arduino.valueToCode(this,"ICON_ID",Blockly.Arduino.ORDER_ATOMIC)||"";
  var myCommand="AT29=";
  if(a=="0")
    myCommand="AT2e=";
  a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+myCommand +'(") +'+b +'+","+'+ c+'+","+'+ d+'+","+'+ d+'+","+'+ e+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  return a;
};

Blockly.Arduino.ldm_movePattern=function(){
  var a=this.getFieldValue("MOVE_TYPE"),
      b=this.getFieldValue("ICON_TYPE"),
      c=Blockly.Arduino.valueToCode(this,"ICON_ID",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+a +'(") +'+b +'+","+'+ b+'+","+'+ c+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  return a;
};

Blockly.Arduino.ldm_showAll=function(){
  return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("AT2f=()").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
};

//BME280
Blockly.Arduino.bme280={};
Blockly.Arduino.bme280_addr=function(){
  var a=this.getFieldValue("ADDRESS");
  Blockly.Arduino.definitions_.define_bme280="#include <Adafruit_BME280.h>\n#define SEALEVELPRESSURE_HPA (1013.25)\nAdafruit_BME280 bme;\nbool bmeStatus=false;";
  Blockly.Arduino.setups_["bme280_addr_"]="bmeStatus = bme.begin("+a+");\n";
  return''
};

Blockly.Arduino.getBme280_value=function(){
  var a=this.getFieldValue("VALUE_TYPE");
  a='(bmeStatus?'+a+':0)';
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

//MTK7697:bit
Blockly.Arduino.mtk7697bit={};
Blockly.Arduino.mtk7697bit_button=function(){
    var a=this.getFieldValue("AB_BUTTON"),
	    b=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL");
	  b=b.replace(/\n/g,'\n  ');
    Blockly.Arduino.definitions_.define_m_button="char myBtnStatus;\nbool buttonPressed(char btnName)\n{\n  byte A_Pin=0;\n  byte B_Pin=7;\n  if (btnName=='A'){\n    if (digitalRead(A_Pin) == 1)\n      return false;\n    else\n      return true;\n  }\n  else if (btnName=='B'){\n    if (digitalRead(B_Pin) == 1)\n      return false;\n    else\n      return true;\n  } else {\n    if ((digitalRead(A_Pin) == 1) && (digitalRead(B_Pin) == 1))\n      return false;\n    else\n      return true;\n  }\n}\n"
    Blockly.Arduino.definitions_.define_m_getBtnStatus="char getBtnStatus(){\n  char buttonStatus=' ';\n  int checkButtonDelay=200;\n  if (buttonPressed('A')){\n    delay(checkButtonDelay);\n    if (buttonPressed('A')){\n      buttonStatus='A';\n      if (buttonPressed('B'))\n        buttonStatus='C';\n    }\n  } else if (buttonPressed('B')){\n      delay(checkButtonDelay);\n      if (buttonPressed('B')){\n        buttonStatus='B';\n        if (buttonPressed('A'))\n          buttonStatus='C';\n      }\n  }\n  return buttonStatus;\n}\n";
    Blockly.Arduino.setups_.setup_button='pinMode(0, INPUT);\n  pinMode(7, INPUT);\n';
	  return"if (myBtnStatus=='"+a+"'){\n"+b+"  while(buttonPressed('"+a+"')){}\n}\n"
};

Blockly.Arduino.mtk7697bit_pinMap=function(){
  var a=this.getFieldValue("MTK_7697_PIN");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.oled_display_setting_new=function(){
  Blockly.Arduino.definitions_.define_wire='#include "Wire.h"';
  Blockly.Arduino.definitions_.define_u8g2_oled_include='#include "U8g2lib.h"';
  Blockly.Arduino.definitions_.define_u8g2_oled_declare="U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, /* reset=*/ U8X8_PIN_NONE);";
  Blockly.Arduino.setups_.setup_define_u8g2_oled="u8g2.begin();\n  u8g2.setFont(u8g2_font_6x10_tf);\n  u8g2.setFontRefHeightExtendedText();\n  u8g2.setDrawColor(1);\n  u8g2.setFontPosTop();\n  u8g2.setFontDirection(0);\n";return""
}

Blockly.Arduino.oled_display_show_xbm=function(){
    var a=Blockly.Arduino.valueToCode(this,"XBM",Blockly.Arduino.ORDER_ATOMIC)||"";
    Blockly.Arduino.definitions_.define_xbm_include="#include \"StringSplitter.h\"";
	  Blockly.Arduino.definitions_.define_showXBM="void showXBM(String myXBM,unsigned char *myBitMap){\n    myXBM.replace(\" \",\"\");\n    myXBM.replace(\"\\r\",\"\");\n    myXBM.replace(\"\\n\",\"\");\n    StringSplitter *splitter = new StringSplitter(myXBM, ',', 1024);\n    for(int i = 0; i < 1024; i++){\n      myBitMap[i]= 0;\n    }\n    for(int i = 0; i < splitter->getItemCount(); i++){\n      splitter->getItemAtIndex(i)=\"0x\"+splitter->getItemAtIndex(i);\n      myBitMap[i]= strtol(splitter->getItemAtIndex(i).c_str(), 0, 16);       \n    }\n    delete splitter;\n}\n";
    return'unsigned char xBitMap[1024];\nshowXBM('+a+',xBitMap);\nu8g2.clearBuffer();\nu8g2.drawXBMP(0, 0, 128, 64, xBitMap);\ndelete xBitMap;\n';
};

Blockly.Arduino.oled_display_clear_buffer=function(){
  return'u8g2.clearBuffer();\n'
};

Blockly.Arduino.oled_display_send_buffer=function(){
  return'u8g2.sendBuffer();\n'
};

Blockly.Arduino.oled_display_set_overwrite=function(){
  var a=this.getFieldValue("OVERWRITE_MODE");
  return a;
};

Blockly.Arduino.oled_display_set_color=function(){
  var a=this.getFieldValue("DRAW_COLOR");
  return a;
};

//airbox
Blockly.Arduino.airbox={};
Blockly.Arduino.airbox_fetchData=function(){
  Blockly.Arduino.definitions_.define_json_include="#define ARDUINOJSON_DECODE_UNICODE 1\n#include <ArduinoJson.h>";
  Blockly.Arduino.definitions_.define_ctimes_include="#include <ctime>";
  if (Blockly.Arduino.my_board_type=="ESP8266")
    Blockly.Arduino.definitions_.define_json_esp8266_fingerprint="const char fingerPrint[] PROGMEM=\"9cc81261af3f9f6ab36d9167a5ef5796094e7656\";";
  Blockly.Arduino.definitions_.define_airbox_json_invoke="const size_t capacity_airbox = JSON_ARRAY_SIZE(1) + JSON_OBJECT_SIZE(1) + JSON_OBJECT_SIZE(5) + JSON_OBJECT_SIZE(25) + 500;\nDynamicJsonDocument docAirbox(capacity_airbox);";
	Blockly.Arduino.definitions_.define_fetch_airbox_invoke='void fetchAirboxInfo(String myID){\n  static TLSClient client;\n  if (!client.connect("pm25.lass-net.org", 443)) {\n    return;\n  }\n  const String url = String() + "/data/last.php?device_id="+myID;\n  client.println("GET " + url + " HTTP/1.1");\n  client.println("Host: pm25.lass-net.org");\n  client.println("Accept: */*");\n  client.println("Connection: close");\n  client.println();\n  client.println();\n  while (client.connected()) {\n    String line = client.readStringUntil(\'\\n\');\n    if (line.startsWith("{\\"device_id\\"")) {\n      DeserializationError error = deserializeJson(docAirbox, line);\n      if (error) {\n        client.stop();\n        return;\n      }\n      break;\n    }\n  }\n  client.stop();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_fetch_airbox_invoke=Blockly.Arduino.definitions_.define_fetch_airbox_invoke.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_fetch_airbox_invoke=Blockly.Arduino.definitions_.define_fetch_airbox_invoke.replace(" client;\n"," client;\n  client.setFingerprint(fingerPrint);\n");
    }  
  }
  var a=Blockly.Arduino.valueToCode(this,"DEVICEID",Blockly.Arduino.ORDER_ATOMIC)||"";
	return'fetchAirboxInfo(String('+a+').c_str());\n'
};

Blockly.Arduino.airbox_getValue=function(){
  var a=this.getFieldValue("VALUE_NAME");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

//Probbie
Blockly.Arduino.probbie={};
Blockly.Arduino.probbie_init=function(){
  var a=this.getFieldValue("PROBBIE_TYPE");
  if (a=="Probbie"){
    Blockly.Arduino.probbie_type="Probbie";
    Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>\n";
    Blockly.Arduino.definitions_.define_probbie_variable1="#define TurnMotor_A   13\n#define TurnMotor_B   10\n#define LegMotor_A    12\n#define LegMotor_B    17\n#define NeoPixelPin    5\n#define NeoPixelnum    2\nAdafruit_NeoPixel pixels = Adafruit_NeoPixel(NeoPixelnum, NeoPixelPin, NEO_GRB + NEO_KHZ800);\n#define irEmitterPin    11\n#define irRightPin      14\n#define irLeftPin       15\n#define BuzzerPin     7\n#define irLowerProximity     256\n";
  }  
  else{
    Blockly.Arduino.probbie_type="Tobbie";
    Blockly.Arduino.definitions_.define_include_neopixel="#include <Tone32.h>\n";
    Blockly.Arduino.definitions_.define_probbie_variable1="#define TurnMotor_A   23\n#define TurnMotor_B   5\n#define LegMotor_A    18\n#define LegMotor_B    19\n#define NeoPixelPin    5\n#define NeoPixelnum    27\n#define irEmitterPin    15\n#define irRightPin      33\n#define irLeftPin       32\n#define BuzzerPin     26\n#define irLowerProximity     700\n";
  }
  Blockly.Arduino.definitions_.define_probbie_variable2="int Tone_counter = 0;\nint AutoDemo_OnOff = 0;\nint irRightAmbient;\nint irLeftAmbient;\nint irRightObstacle;\nint irLeftObstacle;\nint irRightDistance;\nint irLeftDistance;\nint irRightValue[10];\nint irLeftValue[10];\nint ProximityValue = 0;\n";
  if (a=="Probbie"){  
    Blockly.Arduino.definitions_.define_probbie_function="void Probbie_Stop()\n{\n  digitalWrite(LegMotor_A, LOW);\n  digitalWrite(LegMotor_B, LOW);\n  digitalWrite(TurnMotor_A, LOW);\n  digitalWrite(TurnMotor_B, LOW);\n}\nvoid Probbie_Forward()\n{\n  Probbie_Stop();\n  digitalWrite(LegMotor_A, HIGH);\n  digitalWrite(LegMotor_B, LOW);\n}\nvoid Probbie_Backward()\n{\n  Probbie_Stop();\n  digitalWrite(LegMotor_A, LOW);\n  digitalWrite(LegMotor_B, HIGH);\n}\nvoid Probbie_TurnLeft()\n{\n  Probbie_Stop();\n  digitalWrite(TurnMotor_A, HIGH);\n  digitalWrite(TurnMotor_B, LOW);\n}\nvoid Probbie_TurnRight()\n{\n  Probbie_Stop();\n  digitalWrite(TurnMotor_A, LOW);\n  digitalWrite(TurnMotor_B, HIGH);\n}\nvoid Beep(int note, int duration)\n{\n  tone(BuzzerPin, note, duration);\n  if (Tone_counter % 2 == 0)\n  {\n    delay(duration);\n  }\n  else\n  {\n    delay(duration);\n  }\n  noTone(BuzzerPin);\n  pinMode(BuzzerPin, OUTPUT);\n}\nvoid Probbie_StartUp()\n{\n  pinMode(BuzzerPin, OUTPUT);\n  pinMode(LegMotor_A, OUTPUT);\n  pinMode(LegMotor_B, OUTPUT);\n  pinMode(TurnMotor_A, OUTPUT);\n  pinMode(TurnMotor_B, OUTPUT);\n  Probbie_Stop();\n  pinMode(irLeftPin, INPUT);\n  pinMode(irRightPin, INPUT);\n  pinMode(irEmitterPin, OUTPUT);\n  pixels.begin();\n  pixels.show();\n  pixels.setBrightness(255);\n  for(int i=0;i<NeoPixelnum;i++)\n    pixels.setPixelColor(i,pixels.Color(0,0,255));     \n  pixels.show();\n  Beep(698, 200);\n}\nvoid Read_IR_Distance(int times)\n{\n  irLeftDistance=0;\n  irRightDistance=0;\n  for (int x = 0; x < times; x++)\n  {\n    digitalWrite(irEmitterPin, LOW);\n    delay(1);\n    irLeftAmbient = analogRead(irLeftPin);\n    irRightAmbient = analogRead(irRightPin);\n    digitalWrite(irEmitterPin, HIGH);\n    delay(1);\n    irLeftObstacle = analogRead(irLeftPin);\n    irRightObstacle = analogRead(irRightPin);\n    irLeftValue[x] = irLeftObstacle - irLeftAmbient;\n    irRightValue[x] = irRightObstacle - irRightAmbient;\n  }\n  digitalWrite(irEmitterPin, LOW);\n  for (int x = 0; x < times; x++)\n  {\n    irLeftDistance += irLeftValue[x];\n    irRightDistance += irRightValue[x];\n  }\n  irLeftDistance = irLeftDistance / times;\n  irRightDistance = irRightDistance / times;\n  ProximityValue = 0;\n  if (irLeftDistance > irLowerProximity)\n    ProximityValue = ProximityValue + 1;\n  if (irRightDistance > irLowerProximity)\n    ProximityValue = ProximityValue + 2;\n}\n";
	}else{
    Blockly.Arduino.definitions_.define_probbie_function="void Probbie_Stop()\n{\n  digitalWrite(LegMotor_A, LOW);\n  digitalWrite(LegMotor_B, LOW);\n  digitalWrite(TurnMotor_A, LOW);\n  digitalWrite(TurnMotor_B, LOW);\n}\nvoid Probbie_Forward()\n{\n  Probbie_Stop();\n  digitalWrite(LegMotor_A, HIGH);\n  digitalWrite(LegMotor_B, LOW);\n}\nvoid Probbie_Backward()\n{\n  Probbie_Stop();\n  digitalWrite(LegMotor_A, LOW);\n  digitalWrite(LegMotor_B, HIGH);\n}\nvoid Probbie_TurnLeft()\n{\n  Probbie_Stop();\n  digitalWrite(TurnMotor_A, HIGH);\n  digitalWrite(TurnMotor_B, LOW);\n}\nvoid Probbie_TurnRight()\n{\n  Probbie_Stop();\n  digitalWrite(TurnMotor_A, LOW);\n  digitalWrite(TurnMotor_B, HIGH);\n}\nvoid Probbie_StartUp()\n{\n  pinMode(BuzzerPin, OUTPUT);\n  pinMode(LegMotor_A, OUTPUT);\n  pinMode(LegMotor_B, OUTPUT);\n  pinMode(TurnMotor_A, OUTPUT);\n  pinMode(TurnMotor_B, OUTPUT);\n  Probbie_Stop();\n  pinMode(irLeftPin, INPUT);\n  pinMode(irRightPin, INPUT);\n  pinMode(irEmitterPin, OUTPUT);\n  tone(BuzzerPin, 698 , 200, 0);\n}\nvoid Read_IR_Distance(int times)\n{\n  irLeftDistance=0;\n  irRightDistance=0;\n  for (int x = 0; x < times; x++)\n  {\n    digitalWrite(irEmitterPin, LOW);\n    delay(1);\n    irLeftAmbient = analogRead(irLeftPin);\n    irRightAmbient = analogRead(irRightPin);\n    digitalWrite(irEmitterPin, HIGH);\n    delay(1);\n    irLeftObstacle = analogRead(irLeftPin);\n    irRightObstacle = analogRead(irRightPin);\n    irLeftValue[x] = irLeftObstacle - irLeftAmbient;\n    irRightValue[x] = irRightObstacle - irRightAmbient;\n  }\n  digitalWrite(irEmitterPin, LOW);\n  for (int x = 0; x < times; x++)\n  {\n    irLeftDistance += irLeftValue[x];\n    irRightDistance += irRightValue[x];\n  }\n  irLeftDistance = irLeftDistance / times;\n  irRightDistance = irRightDistance / times;\n  ProximityValue = 0;\n  if (irLeftDistance > irLowerProximity)\n    ProximityValue = ProximityValue + 1;\n  if (irRightDistance > irLowerProximity)\n    ProximityValue = ProximityValue + 2;\n}\n";
  }
  //Blockly.Arduino.setups_.setup_probbie="Probbie_StartUp();\n";
  return'Probbie_StartUp();\n'
}
Blockly.Arduino.probbie_move=function(){
  var a=this.getFieldValue("MOVE_TYPE");
  return a+'\n';
}

Blockly.Arduino.probbie_eyes1=function(){
  if (Blockly.Arduino.probbie_type=="Probbie")
  {
    var a=this.getFieldValue("EYES_TYPE");
        b=this.getFieldValue("RGB");
    if (a=="2")
      return"pixels.setPixelColor(0,pixels.Color("+hexToR(b)+","+hexToG(b)+","+hexToB(b)+"));\npixels.show();\npixels.setPixelColor(1,pixels.Color("+hexToR(b)+","+hexToG(b)+","+hexToB(b)+"));\npixels.show();\n"
    else
      return"pixels.setPixelColor("+a+",pixels.Color("+hexToR(b)+","+hexToG(b)+","+hexToB(b)+"));\npixels.show();\n"
  }
  else
    return'';
};

Blockly.Arduino.probbie_eyes2=function(){
  if (Blockly.Arduino.probbie_type=="Probbie")
  {
    var a=this.getFieldValue("EYES_TYPE");
        r=Blockly.Arduino.valueToCode(this,"R",Blockly.Arduino.ORDER_ATOMIC)||"0",
        g=Blockly.Arduino.valueToCode(this,"G",Blockly.Arduino.ORDER_ATOMIC)||"0",
        b=Blockly.Arduino.valueToCode(this,"B",Blockly.Arduino.ORDER_ATOMIC)||"255";
    if (a=="2")
      return"pixels.setPixelColor(0,pixels.Color("+r+","+g+","+b+"));\npixels.show();\npixels.setPixelColor(1,pixels.Color("+r+","+g+","+b+"));\npixels.show();\n"
    else
      return"pixels.setPixelColor("+a+",pixels.Color("+r+","+g+","+b+"));\npixels.show();\n"
  }
  else
    return'';  
};

Blockly.Arduino.probbie_detect=function(){
  return"Read_IR_Distance(5);\n"
};

Blockly.Arduino.probbie_obstacle=function(){
  var a=this.getFieldValue("OBSTACLE_TYPE");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.probbie_read_ir=function(){
  var a=this.getFieldValue("IR_VALUE");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.probbie_tone=function(){
  var a=this.getFieldValue("FREQ");
  if (Blockly.Arduino.probbie_type=="Probbie")
    return"tone(BuzzerPin, "+a+");\n";
  else
    return"tone(BuzzerPin, "+a+", 0, 0);\n";
};
Blockly.Arduino.probbie_no_tone=function(){
  if (Blockly.Arduino.probbie_type=="Probbie")
    return"noTone(BuzzerPin);\n";
  else
    return"noTone(BuzzerPin,0);\n";
};

Blockly.Arduino.probbie_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||0,
      b=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||0;
  if (Blockly.Arduino.probbie_type=="Probbie")
    return"Beep("+a+", "+b+");\n"
  else
    return"tone(BuzzerPin, "+a+", "+b+", 0);\n";
};

//Broadcast UDP
Blockly.Arduino.broadcast_udp={};
Blockly.Arduino.broadcast_udp_init=function(){
  Blockly.Arduino.broadcast_udp.broadcast_exist="yes";
	var a=Blockly.Arduino.valueToCode(this,"PORT",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_broadcast_include="#include <WiFiUdp.h>";
  Blockly.Arduino.definitions_.define_broadcast_port="const int UDP_BUFFER_SIZE=255;\nuint16_t UDP_LISTEN_PORT="+a+";\nWiFiUDP Udp;\n//IPAddress broadcastIP;\nchar packetBuffer[UDP_BUFFER_SIZE];\n";
  Blockly.Arduino.definitions_.define_broadcast_send="void sendBroadcastUDP(const char* myMessage){\n  IPAddress broadcastIP(WiFi.localIP()[0],WiFi.localIP()[1],WiFi.localIP()[2],255);\n  Udp.beginPacket(broadcastIP,UDP_LISTEN_PORT);\n  Udp.write(myMessage);\n  Udp.endPacket();\n}\n";

  Blockly.Arduino.broadcast_udp.defineFunction={};
	//Blockly.Arduino.broadcast_udp.defineFunction.broadcast_send="\nvoid sendBroadcastUDP(const char* myMessage){\n  IPAddress broadcastIP(WiFi.localIP()[0],WiFi.localIP()[1],WiFi.localIP()[2],255);\n  Udp.beginPacket(broadcastIP,UDP_LISTEN_PORT);\n  Udp.write(myMessage);\n  Udp.endPacket();\n}\n";
  Blockly.Arduino.broadcast_udp.defineFunction.broadcast_my_check_header="\nvoid myCheckUDP(){\n";
  Blockly.Arduino.broadcast_udp.defineFunction.broadcast_my_check_body="";
  Blockly.Arduino.broadcast_udp.defineFunction.broadcast_my_check_footer="}\n";
  Blockly.Arduino.broadcast_udp.defineFunction.broadcast_check="\nvoid checkBroadcastUDP(){\n  int packetSize = Udp.parsePacket();\n  if (packetSize) {\n    int len = Udp.read(packetBuffer, UDP_BUFFER_SIZE);\n    if (len > 0) {\n      packetBuffer[len] = 0;\n      myCheckUDP();\n    }\n  }\n}\n";
  return"Udp.begin(UDP_LISTEN_PORT);\n"
};

Blockly.Arduino.broadcast_udp_send=function(){
	var a=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'sendBroadcastUDP(String('+a+').c_str());\n';
};

Blockly.Arduino.broadcast_udp_received_event=function(){
	Blockly.Arduino.broadcast_udp.defineFunction.broadcast_my_check_body=Blockly.Arduino.statementToCode(this,"MSG_UDP");
	return''
};

Blockly.Arduino.broadcast_udp_received_msg=function(){
  return["String(packetBuffer)",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.broadcast_udp_reset=function(){
	var a=Blockly.Arduino.valueToCode(this,"PORT",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return"Udp.stop();\nUDP_LISTEN_PORT="+a+";\nUdp.begin(UDP_LISTEN_PORT);\n"
};

//Web Server
Blockly.Arduino.webserver={};
Blockly.Arduino.webserver_init=function(){
	var a=Blockly.Arduino.valueToCode(this,"PORT",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"SECS",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.webserver.webserver_refresh="";
  if (b!="0")
    Blockly.Arduino.webserver.webserver_refresh="          WebClient.println(\"Refresh: "+b+"\");\n";
  Blockly.Arduino.webserver.webserver_myTitle="";
  Blockly.Arduino.webserver.webserver_myColor="";
  Blockly.Arduino.definitions_.define_webserver_port="WiFiServer WebServer("+a+");\n";
  Blockly.Arduino.definitions_.define_webserver_pwm="";
  Blockly.Arduino.definitions_.define_webserver_servo="";
  Blockly.Arduino.setups_["webserver_"]="";
  Blockly.Arduino.definitions_.define_webserver_param="String webPara=\"\";\nString tempPara=\"\";";
  return'WebServer.begin();\n';
};

Blockly.Arduino.webserver_title=function(){
	var a=Blockly.Arduino.valueToCode(this,"TITLE",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.webserver_myColor=" bgcolor='"+this.getFieldValue("RGB")+"'";
  Blockly.Arduino.webserver_myTitle=a.replace(/\"/g, "");
  return'';
};

Blockly.Arduino.webserver_paragraph_begin=function(){
  var a=this.getFieldValue("ALIGN"),
      b=this.getFieldValue("SIZE"),
      c=this.getFieldValue("RGB"),
      d=Blockly.Arduino.statementToCode(this,"PARAGRAPH");
      d=d.replace(/  /g,"        ");
      d=d.replace(/                /g,"          ");
  var tempHead="        WebClient.println(\"<p align="+a+"><font size='"+b+"' color='"+c+"'>\");\n"+d+"        WebClient.println(\"</font></p>\");\n";
  return tempHead;
};

Blockly.Arduino.webserver_text=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("BOLD");
  if (b=="Yes")
    a="WebClient.println(\"<b>\"+String("+a+")+\"</b>\");\n";
  else
    a="WebClient.println(String("+a+"));\n";
  return a;
};

Blockly.Arduino.webserver_paragraph_break=function(){
  var tempHead="WebClient.println(\"<br>\");\n";
  return tempHead;
};


Blockly.Arduino.webserver_prepare_body=function(){
  Blockly.Arduino.webserver.webserver_exist="yes";
  Blockly.Arduino.webserver.webserver_header="\n\nvoid checkWebClient(){\n  WiFiClient WebClient = WebServer.available();\n  if (WebClient) {\n    webPara=\"\";\n    boolean currentLineIsBlank = true;\n    while (WebClient.connected()) {\n      if (WebClient.available()) {\n        char c = WebClient.read();\n        if (c == '\\n' && currentLineIsBlank) {\n          WebClient.println(\"HTTP/1.1 200 OK\");\n          WebClient.println(\"Content-Type: text/html\");\n          WebClient.println(\"Connection: close\");\n"+Blockly.Arduino.webserver.webserver_refresh+"          WebClient.println();\n          WebClient.println(\"<!DOCTYPE HTML>\");\n          WebClient.println(\"<html><head><meta http-equiv=\\\"Content-Type\\\" content=\\\"text/html; charset=utf-8\\\"><title>#title#</title></head><body#color#>\");\n";
  Blockly.Arduino.webserver.webserver_body=Blockly.Arduino.statementToCode(this,"WEBSERVER_BODY");
  Blockly.Arduino.webserver.webserver_footer="          WebClient.println(\"</body></html>\");\n          break;\n        }\n        if (c == '\\n') {\n          currentLineIsBlank = true;\n        } else if (c != '\\r') {\n          webPara=webPara+c;\n         currentLineIsBlank = false;\n        }\n      }\n    }\n    delay(1);\n    WebClient.stop();\n  }\n}";


  Blockly.Arduino.webserver.webserver_header=Blockly.Arduino.webserver.webserver_header.replace("#color#",Blockly.Arduino.webserver_myColor);
  Blockly.Arduino.webserver.webserver_header=Blockly.Arduino.webserver.webserver_header.replace("#title#",Blockly.Arduino.webserver_myTitle);


  return '';
};

Blockly.Arduino.webserver_custom=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g, "'");
  a=a.replace("'","");
  a=a.replace(/'$/,"");
  a="WebClient.println(\""+a+"\");\n";
  return a;
};

Blockly.Arduino.webserver_digital=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("BTN_TYPE");
  var btn_1="String(\"<input type='button' value=HIGH onclick=\\\"location.href='/digital/\")+"+a+"+String(\"/HIGH';return true;\\\"\")+(digitalRead("+a+")==1?\" disabled\":\"\")+\">\"";
      btn_0="String(\"<input type='button' value=LOW onclick=\\\"location.href='/digital/\")+"+a+"+String(\"/LOW';return true;\\\"\")+(digitalRead("+a+")==0?\" disabled\":\"\")+\">\"";
  if (b=="1"){
    btn_0=btn_0.replace("value=LOW","value=OFF");
    btn_1=btn_1.replace("value=HIGH","value=ON");
  } else if (b=="2"){
    btn_0=btn_0.replace("value=LOW","value=關");
    btn_1=btn_1.replace("value=HIGH","value=開");
  }
  var tempHead="if (webPara.indexOf(String(\"GET /digital/\")+"+a+"+String(\"/HIGH\")) >= 0){\n  pinMode("+a+",OUTPUT);\n  digitalWrite("+a+",HIGH);\n}\n";
  tempHead=tempHead+"if (webPara.indexOf(String(\"GET /digital/\")+"+a+"+String(\"/LOW\")) >= 0){\n  pinMode("+a+",OUTPUT);\n  digitalWrite("+a+",LOW);\n}\n";
  tempHead=tempHead+"WebClient.println("+btn_1+"+\"&nbsp;&nbsp;\"+"+ btn_0+");\n";
  return tempHead;
};

Blockly.Arduino.webserver_pwm=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("BTN_TYPE");
  Blockly.Arduino.definitions_.define_webserver_pwm+=("int pwm_"+a+"=0;\n");
  var slider="String(\"<input type='range' width='1000' step='1' min='0' max='255' value='\")+pwm_"+a+"+String(\"' id='myRange_"+a+"' onchange=\\\"document.getElementById('myLabel_"+a+"').innerHTML=this.value;\\\"><label id='myLabel_"+a+"'>\")+pwm_"+a+"+String(\"</label>\")";
  var btn="String(\"<input type='button' value='#value#' onclick=\\\"location.href='/pwm/"+a+"/'+document.getElementById('myRange_"+a+"').value;return true;\\\">\")";
  btn=btn.replace("#value#",b);
  var tempHead="if (webPara.indexOf(String(\"GET /pwm/\")+"+a+"+String(\"/\")) >= 0){\n  tempPara=webPara.substring(webPara.indexOf(\"GET /\"));\n  tempPara.replace(\"GET /pwm/\",\"\");\n  pwm_"+a+"=String(tempPara.substring(tempPara.indexOf(\"/\")+1)).toInt();\n  analogWrite(String(tempPara.substring(0,tempPara.indexOf(\"/\"))).toInt(),String(tempPara.substring(tempPara.indexOf(\"/\")+1)).toInt());\n}\n";
  tempHead=tempHead+"WebClient.println("+slider+"+"+ btn+");\n";
  return tempHead;
};

Blockly.Arduino.webserver_servo=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("BTN_TYPE");
  Blockly.Arduino.definitions_.define_webserver_servo+=("#include <Servo.h>\nint servo_"+a+"=0;\nServo myServo_"+a+";\n");
  Blockly.Arduino.setups_["webserver_"]+="myServo_"+a+".attach("+a+");\n";
  Blockly.Arduino.setups_["webserver_"]=Blockly.Arduino.setups_["webserver_"].replace(/[\n]/g, "\n ");
  var slider="String(\"<input type='range' width='1000' step='1' min='0' max='180' value='\")+servo_"+a+"+String(\"' id='myServo_"+a+"' onchange=\\\"document.getElementById('myLabel_"+a+"').innerHTML=this.value;\\\"><label id='myLabel_"+a+"'>\")+servo_"+a+"+String(\"</label>\")";
  var btn="String(\"<input type='button' value='#value#' onclick=\\\"location.href='/servo/"+a+"/'+document.getElementById('myServo_"+a+"').value;return true;\\\">\")";
  btn=btn.replace("#value#",b);
  var tempHead="if (webPara.indexOf(String(\"GET /servo/\")+"+a+"+String(\"/\")) >= 0){\n  tempPara=webPara.substring(webPara.indexOf(\"GET /\"));\n  tempPara.replace(\"GET /servo/\",\"\");\n  servo_"+a+"=String(tempPara.substring(tempPara.indexOf(\"/\")+1)).toInt();\n  myServo_"+a+".write(String(tempPara.substring(tempPara.indexOf(\"/\")+1)).toInt());\n}\n";
  tempHead=tempHead+"WebClient.println("+slider+"+"+ btn+");\n";
  return tempHead;
};

Blockly.Arduino.webserver_custom_controller=function(){
  var a=Blockly.Arduino.valueToCode(this,"HREF",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=this.getFieldValue("CONTROLLER_TYPE");
  //a=a.replace(/\"/g, "\"");
  //b=b.replace(/\"/g, "\"");
  if (a.charAt(0)=="\""){
    if (a.charAt(1)!="/")
      a=a.replace("\"","\"/");
    a="String("+a+")";
  }
  else
  {
    a="String(\"/\")+"+a;
  }
  //a="String("+a+")";
  b="String("+b+")";
  var myCustom="";
  if (c=="text")
    myCustom="String(\"\")+String(\"<a href='\")+#href#+String(\"'>\")+#content#+String(\"</a>\")";
  else if (c=="button")
    myCustom="String(\"<input type='button' value='\")+#content#+String(\"' onclick='location.href=\\\"\")+#href#+String(\"\\\";return true;'>\")";
    //myCustom="String(\"\")+\"<input type='button' value='\"+#content#+\"' onclick='location.href=\\\"\"+#href#+\"\\\";return true;'>\"";
  myCustom=myCustom.replace("#href#",a);
  myCustom=myCustom.replace("#content#",b);
  myCustom="WebClient.println("+myCustom+");\n";
  return myCustom;
};

Blockly.Arduino.webserver_event=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.statementToCode(this,"EVENT_BODY");
  if (a.charAt(0)=="\""){
    if (a.charAt(1)!="/")
      a=a.replace("\"","\"/");
    a="String("+a+")";
  }
  else
  {
    a="String(\"/\")+"+a;
  }
  b=b.replace(/  /g,"        ");
  b=b.replace(/                /g,"          ");
  var tempHead="if (webPara.indexOf(String(\"\")+\"GET \"+"+a+") >= 0){\n"+b+"}\n";
  return tempHead;
};

Blockly.Arduino.webserver_talk=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  //a=a.replace(/\"/g, "");
  var b="String(\"https://google-translate-proxy.herokuapp.com/api/tts?query=\")+"+a+"+String(\"&language=zh-tw\")";
  a="WebClient.println(String(\"<iframe width=0 height=0 frameborder=0 src='\")+"+b+"+\"' allow='autoplay'></iframe>\");\n";
  return a;
};

//wifi
Blockly.Arduino.linkit_wifi_wait_until_ready=function(){
  var a=Blockly.Arduino.valueToCode(this,"SSID",Blockly.Arduino.ORDER_ATOMIC)||"",
  b=Blockly.Arduino.valueToCode(this,"PASSWORD",Blockly.Arduino.ORDER_ATOMIC)||"";
  //c=this.getFieldValue("BOARD_TYPE");
  //Blockly.Arduino.my_board_type=c;
  a=a.replace(/"/g,"");b=b.replace(/"/g,"");
  if (Blockly.Arduino.my_board_type=="7697")
    Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <LWiFi.h>";
  else if (Blockly.Arduino.my_board_type=="ESP32")
    Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <WiFi.h>";
  else if (Blockly.Arduino.my_board_type=="ESP8266")
    Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <ESP8266WiFi.h>";
  Blockly.Arduino.definitions_.define_linkit_wifi_ssid='char _lwifi_ssid[] = "'+a+'";';
  Blockly.Arduino.definitions_.define_linkit_wifi_pass='char _lwifi_pass[] = "'+b+'";';
  if (Blockly.Arduino.my_board_type=="7697")
    return"while (WiFi.begin(_lwifi_ssid, _lwifi_pass) != WL_CONNECTED) { delay(1000); }\n"
  else if (Blockly.Arduino.my_board_type=="ESP32")
    return"WiFi.begin(_lwifi_ssid, _lwifi_pass);\nwhile (WiFi.status() != WL_CONNECTED) { delay(500); }\ndelay(300);\n"
  else if (Blockly.Arduino.my_board_type=="ESP8266")
    return"WiFi.begin(_lwifi_ssid, _lwifi_pass);\nwhile (WiFi.status() != WL_CONNECTED) { delay(500); }\ndelay(300);\n"
};

//Custom_blocks
Blockly.Arduino.custom_include=function(){
  var a=Blockly.Arduino.valueToCode(this,"FILE",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.definitions_.define_custom_include==null)
    Blockly.Arduino.definitions_.define_custom_include="#include "+a;
  else
    Blockly.Arduino.definitions_.define_custom_include=Blockly.Arduino.definitions_.define_custom_include+"\n#include \""+a;
  return'';
};

Blockly.Arduino.custom_code=function(){
  var a=Blockly.Arduino.valueToCode(this,"CODE",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace("\"","");
  a=a.replace(/\"*$/, "");
  return a+"\n";
};

//Boards
Blockly.Arduino.board_setup=function(){
  var a=this.getFieldValue("BOARD_TYPE");
  Blockly.Arduino.my_board_type=a;
  return'';
};

Blockly.Arduino.board_7697_digital=function(){
  return[this.getFieldValue("MY_PIN"),Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.board_arduino_digital=function(){
  return[this.getFieldValue("MY_PIN"),Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.board_esp32_digital=function(){
  return[this.getFieldValue("MY_PIN"),Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.board_esp8266_digital=function(){
  return[this.getFieldValue("MY_PIN"),Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.board_7697_analog=function(){
  return[this.getFieldValue("MY_PIN"),Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.board_arduino_analog=function(){
  return[this.getFieldValue("MY_PIN"),Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.board_esp32_analog=function(){
  return[this.getFieldValue("MY_PIN"),Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.board_esp8266_analog=function(){
  return[this.getFieldValue("MY_PIN"),Blockly.Arduino.ORDER_ATOMIC];
}

//尤哲哲ESP32_board
Blockly.Arduino.esp32_board={};
Blockly.Arduino.esp32_board_usb=function(){
  var a=this.getFieldValue("USB_PORT"),
      b=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (a=="1")
     Blockly.Arduino.setups_["setup_esp32_expansion_usb_1"]="pinMode(1,OUTPUT);"
  else if(a=="3")
     Blockly.Arduino.setups_["setup_esp32_expansion_usb_2"]="pinMode(3,OUTPUT);"
  return'digitalWrite('+a+','+b+');\n'
}

Blockly.Arduino.esp32_board_rgb=function(){
  var a=this.getFieldValue("RGB"),
      b=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_.define_esp32_i2c_read='byte myRead=0;\nbyte myLEDs[]={1,2,4,8,16,32,64,128};\nbyte allLEDs=255;\nbyte ledAddr=0x20;\n\nvoid lightOn(byte myLED,byte LED_on){\n  byte myTempByte=0;\n  Wire.requestFrom((int)ledAddr, 1);\n  myRead=Wire.read();\n  Wire.beginTransmission((int)ledAddr);\n  if (LED_on==1)\n    myTempByte=(myRead & ~myLEDs[myLED]);\n  else if (LED_on==0)\n    myTempByte=(myRead | myLEDs[myLED]);\n  Wire.write(myTempByte);\n  Wire.endTransmission();\n}\n';
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin(26,27);";
  return'lightOn('+a+','+b+');\n';
}

Blockly.Arduino.esp32_board_rgb_custom=function(){
  var a=Blockly.Arduino.valueToCode(this,"RGB",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_.define_esp32_i2c_read='byte myRead=0;\nbyte myLEDs[]={1,2,4,8,16,32,64,128};\nbyte allLEDs=255;\nbyte ledAddr=0x20;\n\nvoid lightOn(byte myLED,byte LED_on){\n  byte myTempByte=0;\n  Wire.requestFrom((int)ledAddr, 1);\n  myRead=Wire.read();\n  Wire.beginTransmission((int)ledAddr);\n  if (LED_on==1)\n    myTempByte=(myRead & ~myLEDs[myLED]);\n  else if (LED_on==0)\n    myTempByte=(myRead | myLEDs[myLED]);\n  Wire.write(myTempByte);\n  Wire.endTransmission();\n}\n';
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin(26,27);";
  return'lightOn('+a+','+b+');\n';
}