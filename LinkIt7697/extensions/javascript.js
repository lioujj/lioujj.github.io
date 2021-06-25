Blockly.Arduino.finish=function(a){
  if (Blockly.Arduino.probbie_type=="Tobbie")
    if (Blockly.Arduino.definitions_.define_linkit_wifi_include!=null)
     Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <WiFi.h>";
	var myStr="";
	if (Blockly.Arduino.definitions_.define_mqtt_include=="#include <PubSubClient.h>")
		myStr="  myClient.loop();\n";
	if (Blockly.Arduino.definitions_.define_broadcast_include=="#include <WiFiUdp.h>"){
    delete Blockly.Arduino.definitions_.define_udp;
    if (Blockly.Arduino.broadcast_udp.defineFunction.broadcast_my_check_body!="")
		   myStr=myStr+"  checkBroadcastUDP();\n";
  }
  if (  Blockly.Arduino.dac.ESP8266Audio=='yes' && Blockly.Arduino.definitions_.define_SPIFFS_include=='#include "SPIFFS.h"'){
		myStr=myStr+'  checkDACrunning();\n  checkTTS();\n  checkMP3();\n';
  }
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

Blockly.Arduino.convert_str_float=function(){
	var a=Blockly.Arduino.valueToCode(this,"MY_VAR",Blockly.Arduino.ORDER_ATOMIC)||"";
	return['String('+a+').toFloat()',Blockly.Arduino.ORDER_ATOMIC]
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
  if (Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_irremote="#include <IRremoteESP8266.h>";
    Blockly.Arduino.definitions_.define_irreceive="#include <IRrecv.h>\n#include <IRutils.h>";
  } else { 
    Blockly.Arduino.definitions_.define_irremote="#include <IRremote.h>";
    delete Blockly.Arduino.definitions_.define_irreceive;
  }
  Blockly.Arduino.definitions_.define_irremote_init="IRrecv irrecv("+a+");";
  Blockly.Arduino.definitions_.define_irremote_decode="decode_results results;\nString myCodeType;\nString myIRcode;";
  Blockly.Arduino.definitions_.define_irremote_ir_type='String ir_type(int tip)\n{\n  if (tip == 1){\n    return "RC5";\n  } else if (tip == 2){\n    return "RC6";\n  } else if (tip == 3){\n    return "NEC";\n  } else if (tip == 4){\n    return "SONY";\n  } else if (tip == 5){\n    return "PANASONIC";\n  } else if (tip == 6){\n    return "JVC";\n  } else if (tip == 7){\n    return "SAMSUNG";\n  } else if (tip == 10){\n    return "LG";\n  } else if (tip == 14){\n    return "SHARP";\n  } else if (tip == 17){\n    return "LEGO_PF";\n  } else {\n    return "UNKNOWN";\n  }\n}\n';
  Blockly.Arduino.setups_["irremote_"]||(Blockly.Arduino.setups_["irremote_"]="irrecv.enableIRIn();\n");
  return''
};

Blockly.Arduino.ir_receiver_pin1=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_irremote="#include <IRremoteESP8266.h>";
    Blockly.Arduino.definitions_.define_irreceive="#include <IRrecv.h>\n#include <IRutils.h>";
  } else { 
    Blockly.Arduino.definitions_.define_irremote="#include <IRremote.h>";
    delete Blockly.Arduino.definitions_.define_irreceive;
  }
  Blockly.Arduino.definitions_.define_irremote_init="IRrecv irrecv("+a+");";
  Blockly.Arduino.definitions_.define_irremote_decode="decode_results results;\nString myCodeType;\nString myIRcode;";
  Blockly.Arduino.definitions_.define_irremote_ir_type='String ir_type(int tip)\n{\n  if (tip == 1){\n    return "RC5";\n  } else if (tip == 2){\n    return "RC6";\n  } else if (tip == 3){\n    return "NEC";\n  } else if (tip == 4){\n    return "SONY";\n  } else if (tip == 5){\n    return "PANASONIC";\n  } else if (tip == 6){\n    return "JVC";\n  } else if (tip == 7){\n    return "SAMSUNG";\n  } else if (tip == 10){\n    return "LG";\n  } else if (tip == 14){\n    return "SHARP";\n  } else if (tip == 17){\n    return "LEGO_PF";\n  } else {\n    return "UNKNOWN";\n  }\n}\n';
  Blockly.Arduino.setups_["irremote_"]||(Blockly.Arduino.setups_["irremote_"]="irrecv.enableIRIn();\n");
  return''
};

Blockly.Arduino.ir_sender_8266_pin=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_irremote="#include <IRremoteESP8266.h>";
  Blockly.Arduino.definitions_.define_irsend_esp8266="#include <IRsend.h>";
  Blockly.Arduino.definitions_.define_irremote_init="IRsend irsend("+a+");";
  Blockly.Arduino.setups_.setup_esp8266_ir_send="irsend.begin();\n";
  return'';
};

Blockly.Arduino.ir_send=function(){
  var a=this.getFieldValue("IR_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"CODE",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.my_board_type!="ESP8266"){
    Blockly.Arduino.definitions_.define_irremote="#include <IRremote.h>";
    Blockly.Arduino.definitions_.define_irremote_init="IRsend irsend;";
    delete Blockly.Arduino.setups_.setup_esp8266_ir_send;
    delete Blockly.Arduino.definitions_.define_irsend_esp8266;
  }
  Blockly.Arduino.definitions_.define_ir_type="int x2i(const char *s)\n{\n  int x = 0;\n  for(;;) {\n    char c = *s;\n    if (c >= '0' && c <= '9') {\n      x *= 16;\n      x += c - '0';\n    }  else if (c >= 'a' && c <= 'f') {\n      x *= 16;\n      x += (c - 'a') + 10;\n    }\n    else break;\n    s++;\n  }\n  return x;\n}";
  if (a == "NEC") {
    return"irsend.sendNEC(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "SONY"){
    return"irsend.sendSony(x2i(String("+b+").c_str()), 12);\n"
  } else if (a == "RC5") {
    return"irsend.sendRC5(x2i(String("+b+").c_str()), 12);\n"
  } else if (a == "RC6") {
    return"irsend.sendRC6(x2i(String("+b+").c_str()), 20);\n"
  } else if (a == "JVC") {
    return"irsend.sendJVC(x2i(String("+b+").c_str()),16, false);\n"
  } else if (a == "SAMSUNG") {
    return"irsend.sendSAMSUNG(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "LG") {
    return"irsend.sendLG(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "LEGO_PF") {
    return"irsend.sendLegoPowerFunctions(x2i(String("+b+").c_str()), true);\n"
  } else {
    return'';
  }
};

Blockly.Arduino.ir_send2=function(){
  var a=Blockly.Arduino.valueToCode(this,"IR_TYPE",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"CODE",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,'');
  a=a.toUpperCase();
  if (Blockly.Arduino.my_board_type!="ESP8266"){
    Blockly.Arduino.definitions_.define_irremote="#include <IRremote.h>";
    Blockly.Arduino.definitions_.define_irremote_init="IRsend irsend;";
    delete Blockly.Arduino.setups_.setup_esp8266_ir_send;
    delete Blockly.Arduino.definitions_.define_irsend_esp8266;
  }
  Blockly.Arduino.definitions_.define_ir_type="int x2i(const char *s)\n{\n  int x = 0;\n  for(;;) {\n    char c = *s;\n    if (c >= '0' && c <= '9') {\n      x *= 16;\n      x += c - '0';\n    }  else if (c >= 'a' && c <= 'f') {\n      x *= 16;\n      x += (c - 'a') + 10;\n    }\n    else break;\n    s++;\n  }\n  return x;\n}";
  if (a == "NEC") {
    return"irsend.sendNEC(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "SONY"){
    return"irsend.sendSony(x2i(String("+b+").c_str()), 12);\n"
  } else if (a == "RC5") {
    return"irsend.sendRC5(x2i(String("+b+").c_str()), 12);\n"
  } else if (a == "RC6") {
    return"irsend.sendRC6(x2i(String("+b+").c_str()), 20);\n"
  } else if (a == "JVC") {
    return"irsend.sendJVC(x2i(String("+b+").c_str()),16, false);\n"
  } else if (a == "SAMSUNG") {
    return"irsend.sendSAMSUNG(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "LG") {
    return"irsend.sendLG(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "LEGO_PF") {
    return"irsend.sendLegoPowerFunctions(x2i(String("+b+").c_str()), true);\n"
  } else {
    return'';
  }
};


Blockly.Arduino.ir_event=function(){
  var a=Blockly.Arduino.statementToCode(this,"IR_EVENT");
  a="  "+a.replace(/\n/g,'\n  ');
  if (Blockly.Arduino.my_board_type=="ESP8266"){
    return'if (irrecv.decode(&results)) {\n  if (results.decode_type>0){\n    myCodeType=ir_type(results.decode_type);\n    myIRcode=resultToHexidecimal(&results);\n    myIRcode.replace("0x","");\n    myIRcode.toLowerCase();\n'+a+'}\n  irrecv.resume();\n}\n'
  }
  else
    return'if (irrecv.decode(&results)) {\n  if (results.decode_type>0){\n    myCodeType=ir_type(results.decode_type);\n    myIRcode=String(results.value, HEX);\n'+a+'}\n  irrecv.resume();\n}\n'
};

Blockly.Arduino.ir_remote_received=function(){
  var a=this.getFieldValue("IR_SIGNAL");
  b=Blockly.Arduino.statementToCode(this,"IR_RECEIVED");
  return'if ((myCodeType == "NEC") && (myIRcode == "'+a+'")) {\n'+b+'}\n';
};
Blockly.Arduino.ir_received_type=function(){
  return["myCodeType",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ir_received_code=function(){
  return["myIRcode",Blockly.Arduino.ORDER_ATOMIC];
};

//weather
Blockly.Arduino.weather={};
Blockly.Arduino.weather_fetchWeatherInfo=function(){
	//Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <LWiFi.h>";
  Blockly.Arduino.definitions_.define_json_include="#define ARDUINOJSON_DECODE_UNICODE 1\n#include <ArduinoJson.h>";
  Blockly.Arduino.definitions_.define_ctimes_include="#include <ctime>";
  Blockly.Arduino.definitions_.define_json_invoke="const size_t capacity = JSON_ARRAY_SIZE(1) + JSON_OBJECT_SIZE(1) + 2*JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(4) + JSON_OBJECT_SIZE(5) + JSON_OBJECT_SIZE(6) + JSON_OBJECT_SIZE(13) + 280;\nDynamicJsonDocument doc(capacity);";
	Blockly.Arduino.definitions_.define_fetch_weather_invoke='void fetchWeatherInfo(String cityID, char* myKey)\n{\n  static WiFiClient client;\n  client.setTimeout(10000);\n  if (!client.connect("api.openweathermap.org", 80)) {\n    return;\n  }\n  const String url = String() + "/data/2.5/weather?id="+cityID+"&appid="+myKey;\n  client.println("GET " + url + " HTTP/1.1");\n  client.println(F("Host: api.openweathermap.org"));\n  client.println(F("Accept: */*"));\n  client.println(F("Connection: close"));\n  if (client.println() == 0) {\n    return;\n  }\n  char status[32] = {0};\n  client.readBytesUntil(\'\\r\', status, sizeof(status));\n  if (strcmp(status, "HTTP/1.1 200 OK") != 0) {\n    return;\n  }\n  char endOfHeaders[] = "\\r\\n\\r\\n";\n  if (!client.find(endOfHeaders)) {\n    return;\n  }\n  DeserializationError error = deserializeJson(doc, client);\n  if (error) {\n    return;\n  }\n  client.stop();\n}\n';
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
  Blockly.Arduino.definitions_.define_json_aqi_invoke="const size_t capacity_AQI = JSON_ARRAY_SIZE(84) + 84*JSON_OBJECT_SIZE(24) + 25480;\nDynamicJsonDocument doc_aqi(capacity_AQI);";
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
  Blockly.Arduino.setups_.setup_define_u8g2_oled="u8g2.begin();\n  u8g2.enableUTF8Print();\n  u8g2.setFont(u8g2_font_6x10_tf);\n  u8g2.setFontRefHeightExtendedText();\n  u8g2.setDrawColor(1);\n  u8g2.setFontPosTop();\n  u8g2.setFontDirection(0);\n";return""
}

Blockly.Arduino.oled_display_show_xbm=function(){
    var a=Blockly.Arduino.valueToCode(this,"XBM",Blockly.Arduino.ORDER_ATOMIC)||"";
    Blockly.Arduino.definitions_.define_xbm_include="#include \"StringSplitter.h\"";
	  Blockly.Arduino.definitions_.define_showXBM="void showXBM(String myXBM,unsigned char *myBitMap){\n    myXBM.replace(\" \",\"\");\n    myXBM.replace(\"\\r\",\"\");\n    myXBM.replace(\"\\n\",\"\");\n    StringSplitter *splitter = new StringSplitter(myXBM, ',', 1024);\n    for(int i = 0; i < 1024; i++){\n      myBitMap[i]= 0;\n    }\n    for(int i = 0; i < splitter->getItemCount(); i++){\n      splitter->getItemAtIndex(i)=\"0x\"+splitter->getItemAtIndex(i);\n      myBitMap[i]= strtol(splitter->getItemAtIndex(i).c_str(), 0, 16);       \n    }\n    delete splitter;\n}\n";
    return'unsigned char xBitMap[1024];\nshowXBM('+a+',xBitMap);\nu8g2.clearBuffer();\nu8g2.drawXBMP(0, 0, 128, 64, xBitMap);\n';
};

Blockly.Arduino.oled_display_set_chinese_font=function(){
  return'u8g2.setFont(u8g2_font_unifont_t_chinese1);\n'
};

Blockly.Arduino.oled_display_draw_text=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_NONE)||'""';
  return"u8g2.setCursor("+a+", "+b+");\nu8g2.print(String("+c+").c_str());\n"
};


Blockly.Arduino.oled_display_clear_buffer=function(){
  return'u8g2.clearBuffer();\n'
};

Blockly.Arduino.oled_display_send_buffer=function(){
  return'u8g2.sendBuffer();\n'
};

Blockly.Arduino.oled_display_set_overwrite=function(){
  var a=this.getFieldValue("OVERWRITE_MODE");
  return a+"\n";
};

Blockly.Arduino.oled_display_set_color=function(){
  var a=this.getFieldValue("DRAW_COLOR");
  return a+"\n";
};

Blockly.Arduino.oled_display_clock=function(){
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
    Blockly.Arduino.definitions_.define_getDataFromRTC_invoke="int get_data_from_RTC(byte dataType) {\n  int myResult=0;\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  switch(dataType){\n    case 0:\n      myResult=(1900 + t_st->tm_year);\n      break;\n    case 1:\n      myResult=( 1 + t_st->tm_mon);\n      break;\n    case 2:\n      myResult=t_st->tm_mday;\n      break;\n    case 3:\n      myResult=t_st->tm_hour;\n      break;\n    case 4:\n      myResult=t_st->tm_min;\n      break;\n    case 5:\n      myResult=t_st->tm_sec;\n      break;\n  }\n  return myResult;\n}\n";
    Blockly.Arduino.definitions_.define_runClock_invoke='const float pi = 3.14159267 ;\nconst int clock_center_x=64;\nconst int clock_center_y=32;\nint x_old;\nint y_old;\nint x_new;\nint y_new;\n\nvoid draw_second(int second){\n   y_old= (24*cos(pi-(2*pi)/60*second))+clock_center_y;\n   x_old =(24*sin(pi-(2*pi)/60*second))+clock_center_x;\n   u8g2.drawCircle(x_old, y_old, 2); \n}\n\nvoid draw_hour(int hour, int minute){\n   y_old= (18*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y;\n   x_old =(18*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x;\n   y_new=(18*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y+1;\n   x_new=(18*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x+1;\n   u8g2.drawLine(clock_center_x,clock_center_y,x_old,y_old);\n   u8g2.drawLine(clock_center_x+1,clock_center_y+1,x_new,y_new);\n}\n\nvoid draw_minute(int minute){\n   y_old= (24*cos(pi-(2*pi)/60*minute))+clock_center_y;\n   x_old =(24*sin(pi-(2*pi)/60*minute))+clock_center_x;\n   u8g2.drawLine(clock_center_x,clock_center_y,x_old,y_old);\n}\n\nvoid draw_clock_face(void){\n  u8g2.drawDisc(clock_center_x, clock_center_y,3);\n  for (int i=0;i<12;i++){\n     y_old= (32*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_old =(32*sin(pi-(2*pi)/12*i))+clock_center_x;\n     y_new= (28*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_new =(28*sin(pi-(2*pi)/12*i))+clock_center_x;\n     u8g2.drawLine(x_new,y_new,x_old,y_old);\n  }\n  u8g2.setCursor(clock_center_x-3,0);\n  u8g2.setFont(u8g2_font_6x10_tf);\n  u8g2.println("12");\n}\n\nvoid runClock(){\n  draw_clock_face();\n  draw_second(get_data_from_RTC(5));\n  draw_minute(get_data_from_RTC(4));\n  draw_hour(get_data_from_RTC(3),get_data_from_RTC(4));\n}\n'
  }else if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_runClock_invoke='const float pi = 3.14159267 ;\nconst int clock_center_x=64;\nconst int clock_center_y=32;\nint x_old;\nint y_old;\nint x_new;\nint y_new;\n\nvoid draw_second(int second){\n   y_old= (24*cos(pi-(2*pi)/60*second))+clock_center_y;\n   x_old =(24*sin(pi-(2*pi)/60*second))+clock_center_x;\n   u8g2.drawCircle(x_old, y_old, 2); \n}\n\nvoid draw_hour(int hour, int minute){\n   y_old= (18*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y;\n   x_old =(18*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x;\n   y_new=(18*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y+1;\n   x_new=(18*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x+1;\n   u8g2.drawLine(clock_center_x,clock_center_y,x_old,y_old);\n   u8g2.drawLine(clock_center_x+1,clock_center_y+1,x_new,y_new);\n}\n\nvoid draw_minute(int minute){\n   y_old= (24*cos(pi-(2*pi)/60*minute))+clock_center_y;\n   x_old =(24*sin(pi-(2*pi)/60*minute))+clock_center_x;\n   u8g2.drawLine(clock_center_x,clock_center_y,x_old,y_old);\n}\n\nvoid draw_clock_face(void){\n  u8g2.drawDisc(clock_center_x, clock_center_y,3);\n  for (int i=0;i<12;i++){\n     y_old= (32*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_old =(32*sin(pi-(2*pi)/12*i))+clock_center_x;\n     y_new= (28*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_new =(28*sin(pi-(2*pi)/12*i))+clock_center_x;\n     u8g2.drawLine(x_new,y_new,x_old,y_old);\n  }\n  u8g2.setCursor(clock_center_x-3,0);\n  u8g2.setFont(u8g2_font_6x10_tf);\n  u8g2.println("12");\n}\n\nvoid runClock(){\n  draw_clock_face();\n  LRTC.get();\n  draw_second(LRTC.second());\n  draw_minute(LRTC.minute());\n  draw_hour(LRTC.hour(),LRTC.minute());\n}\n'
  }
  return'runClock();\n';
};

Blockly.Arduino.oled_display_set_glyph_font=function(){
  var a=Blockly.Arduino.valueToCode(this,"FONT",Blockly.Arduino.ORDER_NONE)||"";
  a=a.replace(/\"/g,"");
  if (!a.startsWith('u8g2_font_')){
    a='u8g2_font_'+a;
  }
  if (!a.endsWith('_t')){
    a=a+'_t';
  }
  return"u8g2.setFont("+a+");\n";
};

Blockly.Arduino.oled_display_draw_symbol=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=Blockly.Arduino.valueToCode(this,"SYMBOL_NUM",Blockly.Arduino.ORDER_NONE)||"0";
  return'u8g2.drawGlyph('+a+','+b+','+c+');\n';
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
  if (Blockly.Arduino.my_board_type=="7697"){
    //Blockly.Arduino.definitions_.define_fetch_airbox_invoke=Blockly.Arduino.definitions_.define_fetch_airbox_invoke.replace(/pm25.lass-net.org/g,"script.google.com");
    //Blockly.Arduino.definitions_.define_fetch_airbox_invoke=Blockly.Arduino.definitions_.define_fetch_airbox_invoke.replace("/data/last.php?device_id=","/macros/s/AKfycbynReIi6nVvMfPu3Wo4sIRnTLw_JxipQEJXgQCcqKjbsHmZGImAJFQUID2wULqhjZBz_Q/exec?device_id=");
    Blockly.Arduino.definitions_.define_fetch_airbox_invoke='void fetchAirboxInfo(String myID){\n  static TLSClient client;\n  if (!client.connect("script.google.com", 443)) {\n    return;\n  }\n  const String url = String() + "/macros/s/AKfycbynReIi6nVvMfPu3Wo4sIRnTLw_JxipQEJXgQCcqKjbsHmZGImAJFQUID2wULqhjZBz_Q/exec?device_id="+myID;\n  client.println("GET " + url + " HTTP/1.1");\n  client.println("Host: script.google.com");\n  client.println("Accept: */*");\n  client.println("Connection: close");\n  client.println();\n  client.println();\n  String newUrl="";\n  while (client.connected()) {\n    newUrl = client.readStringUntil(\'\\n\');\n    if (newUrl.startsWith("Location: https://")) {\n      newUrl.replace("Location: ","");\n      break;\n    }\n  }\n  client.stop();\n  if (!client.connect("script.google.com", 443)) {\n    return;\n  }\n  client.println("GET " + newUrl + " HTTP/1.1");\n  client.println(String()+"Host: script.google.com");\n  client.println("Accept: */*");\n  client.println("Connection: close");\n  client.println();\n  client.println();\n  while (client.connected()) {\n    String line = client.readStringUntil(\'\\n\');\n    if (line.startsWith("{")) {\n      DeserializationError error = deserializeJson(docAirbox, line);\n      break;\n    }\n  }\n  client.stop();\n}\n';
  }  
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

//TW stock
Blockly.Arduino.stock={};
Blockly.Arduino.stock_fetchData=function(){
  Blockly.Arduino.definitions_.define_json_include="#define ARDUINOJSON_DECODE_UNICODE 1\n#include <ArduinoJson.h>";
  //if (Blockly.Arduino.my_board_type=="ESP8266")
  //  Blockly.Arduino.definitions_.define_json_esp8266_stock_fingerprint="const char stockFingerPrint[] PROGMEM=\"0ddb07fcad53ec3e1713f4a5897fc4a4561675ac\";";
  Blockly.Arduino.definitions_.define_stock_json_invoke="const size_t capacity_stock = JSON_ARRAY_SIZE(1) + 2*JSON_OBJECT_SIZE(8) + JSON_OBJECT_SIZE(36) + 680;\nDynamicJsonDocument docStock(capacity_stock);";
	Blockly.Arduino.definitions_.define_fetch_stock_invoke='void fetchStockInfo(String myID){\n  static TLSClient stockClient;\n  if (!stockClient.connect("mis.twse.com.tw", 443)) {\n    return;\n  }\n  const String url = String() + "/stock/api/getStockInfo.jsp?ex_ch=tse_"+myID+".tw";\n  stockClient.println("GET " + url + " HTTP/1.1");\n  stockClient.println("Host: mis.twse.com.tw");\n  stockClient.println("Accept: */*");\n  stockClient.println("Connection: close");\n  stockClient.println();\n  stockClient.println();\n  while (stockClient.connected()) {\n    String line = stockClient.readStringUntil(\'\\n\');\n    if (line.startsWith("{\\"msgArray")) {\n      line.replace(".0000",".00");\n      DeserializationError error = deserializeJson(docStock, line);\n      break;\n    }\n  }\n  stockClient.stop();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_fetch_stock_invoke=Blockly.Arduino.definitions_.define_fetch_stock_invoke.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_fetch_stock_invoke=Blockly.Arduino.definitions_.define_fetch_stock_invoke.replace(" stockClient;\n"," stockClient;\n  stockClient.setInsecure();\n");
    }  
  }
  var a=Blockly.Arduino.valueToCode(this,"STOCKID",Blockly.Arduino.ORDER_ATOMIC)||"";
	return'fetchStockInfo(String('+a+').c_str());\n'
};

Blockly.Arduino.stock_getValue=function(){
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
  delete Blockly.Arduino.definitions_.define_udp;
  Blockly.Arduino.definitions_.define_broadcast_port="const int UDP_BUFFER_SIZE=255;\nuint16_t UDP_LISTEN_PORT="+a+";\nWiFiUDP castUdp;\n//IPAddress broadcastIP;\nchar broadcastBuffer[UDP_BUFFER_SIZE];\n";
  Blockly.Arduino.definitions_.define_broadcast_send="void sendBroadcastUDP(const char* myMessage){\n  IPAddress broadcastIP(WiFi.localIP()[0],WiFi.localIP()[1],WiFi.localIP()[2],255);\n  castUdp.beginPacket(broadcastIP,UDP_LISTEN_PORT);\n  for (int myi = 0; myi < strlen(myMessage); myi++)\n  {\n    castUdp.write(myMessage[myi]);\n  }\n  castUdp.endPacket();\n}\n";
  Blockly.Arduino.broadcast_udp.defineFunction={};
	//Blockly.Arduino.broadcast_udp.defineFunction.broadcast_send="\nvoid sendBroadcastUDP(const char* myMessage){\n  IPAddress broadcastIP(WiFi.localIP()[0],WiFi.localIP()[1],WiFi.localIP()[2],255);\n  castUdp.beginPacket(broadcastIP,UDP_LISTEN_PORT);\n  castUdp.write(myMessage);\n  castUdp.endPacket();\n}\n";
  Blockly.Arduino.broadcast_udp.defineFunction.broadcast_my_check_header="\nvoid myCheckUDP(){\n";
  Blockly.Arduino.broadcast_udp.defineFunction.broadcast_my_check_body="";
  Blockly.Arduino.broadcast_udp.defineFunction.broadcast_my_check_footer="}\n";
  Blockly.Arduino.broadcast_udp.defineFunction.broadcast_check="\nvoid checkBroadcastUDP(){\n  int packetSize = castUdp.parsePacket();\n  if (packetSize) {\n    int len = castUdp.read(broadcastBuffer, UDP_BUFFER_SIZE);\n    if (len > 0) {\n      broadcastBuffer[len] = 0;\n      myCheckUDP();\n    }\n  }\n}\n";
  return"castUdp.begin(UDP_LISTEN_PORT);\n"
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
  return["String(broadcastBuffer)",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.broadcast_udp_reset=function(){
	var a=Blockly.Arduino.valueToCode(this,"PORT",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return"castUdp.stop();\nUDP_LISTEN_PORT="+a+";\ncastUdp.begin(UDP_LISTEN_PORT);\n"
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
  if (Blockly.Arduino.my_board_type=="ESP32")
      Blockly.Arduino.definitions_.define_esp32_pwm_include="#include <analogWrite.h>";
  else
    delete Blockly.Arduino.definitions_.define_esp32_pwm_include;
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
  Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";
  Blockly.Arduino.definitions_.define_webserver_servo+=("int servo_"+a+"=0;\nServo myServo_"+a+";\n");
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
  //var b="String(\"https://google-translate-proxy.herokuapp.com/api/tts?query=\")+"+a+"+String(\"&language=zh-tw\")";
  var b="String(\"http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=\")+"+a+"+String(\"&tl=zh-TW\")";
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
  if (Blockly.Arduino.my_board_type==null)
    Blockly.Arduino.my_board_type="7697";
  if (Blockly.Arduino.my_board_type=="7697")
    Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <LWiFi.h>";
  else if (Blockly.Arduino.my_board_type=="ESP32")
    Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <WiFi.h>";
  else if (Blockly.Arduino.my_board_type=="ESP8266")
    Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <ESP8266WiFi.h>";
  Blockly.Arduino.definitions_.define_linkit_wifi_ssid='char _lwifi_ssid[] = "'+a+'";';
  Blockly.Arduino.definitions_.define_linkit_wifi_pass='char _lwifi_pass[] = "'+b+'";';
  if (Blockly.Arduino.my_board_type=="7697")
    return"while (WiFi.begin(_lwifi_ssid, _lwifi_pass) != WL_CONNECTED) { delay(1000); }\n";
  else if (Blockly.Arduino.my_board_type=="ESP32")
    return"WiFi.disconnect();\nWiFi.softAPdisconnect(true);\nWiFi.mode(WIFI_STA);\nWiFi.begin(_lwifi_ssid, _lwifi_pass);\nwhile (WiFi.status() != WL_CONNECTED) { delay(500); }\ndelay(300);\n";
  else if (Blockly.Arduino.my_board_type=="ESP8266")
    return"WiFi.begin(_lwifi_ssid, _lwifi_pass);\nwhile (WiFi.status() != WL_CONNECTED) { delay(500); }\ndelay(300);\n";
  else
    return'';
};

Blockly.Arduino.servo_write_pin=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
  b=Blockly.Arduino.valueToCode(this,"ANGLE",Blockly.Arduino.ORDER_ATOMIC)||"90";
  Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";
  Blockly.Arduino.definitions_["define_class_servo_"+a]="Servo __myservo"+a+";";
  Blockly.Arduino.setups_["servo_"+a]||(Blockly.Arduino.setups_["servo_"+a]="__myservo"+a+".attach("+a+");");
  return"__myservo"+a+".write("+b+");\n"
};

Blockly.Arduino.neopixel_begin2=function(){
  var a=this.getFieldValue("NUM"),
      b=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=this.getFieldValue("BRIGHTNESS");
  Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>\n";
  Blockly.Arduino.definitions_.define_neopixel="Adafruit_NeoPixel pixels = Adafruit_NeoPixel("+a+","+b+",NEO_GRB + NEO_KHZ800);\n";
  Blockly.Arduino.setups_.setup_neopixel_begin="pixels.begin();\n  pixels.show();\n";
  Blockly.Arduino.setups_.setup_neopixel_brightness="pixels.setBrightness("+c+");\n  pixels.show();\n";
  return""
};

Blockly.Arduino.dht_read_pin=function(){
  var a=this.getFieldValue("SENSOR"),
  b=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
  c=this.getFieldValue("TYPE"),
  d=a.toLowerCase()+"_p"+b;
  Blockly.Arduino.definitions_.define_dht_include="#include <DHT.h>";
  Blockly.Arduino.definitions_["define_dht_"+d]="DHT "+d+"("+b+", "+a+");";
  Blockly.Arduino.setups_["setup_dht_"+b+"_"+a]=d+".begin();";
  a="";
  switch(c){
    case "h":
      a+=d+".readHumidity()";
      break;
    case "C":
      a+=d+".readTemperature()";
      break;
    case "F":
      a+=d+".readTemperature(true)"
  }
  return[a,Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.ultrasonic_read_pin=function(){
  var a=Blockly.Arduino.valueToCode(this,"TRIG",Blockly.Arduino.ORDER_ATOMIC)||"0",
  b=Blockly.Arduino.valueToCode(this,"ECHO",Blockly.Arduino.ORDER_ATOMIC)||"0",
  c=this.getFieldValue("MEASUREMENT"),
  d="ultrasonic_"+a+"_"+b;
  Blockly.Arduino.definitions_.define_ultrasonic_include="#include <Ultrasonic.h>\n";
  Blockly.Arduino.definitions_["define_ultrasonic_inst_"+d]="Ultrasonic "+d+"("+a+", "+b+");\n";
  return["CM"==c?d+".convert("+d+".timing(), Ultrasonic::CM)":d+".convert("+d+".timing(), Ultrasonic::IN)",Blockly.Arduino.ORDER_ATOMIC]
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

Blockly.Arduino.board_initializes_setup=function(){
  var a=Blockly.Arduino.statementToCode(this,"CONTENT");
  b=this.getFieldValue("BOARD_TYPE");
  Blockly.Arduino.my_board_type=b;
  a=a.replace(/(^\s+)|(\s+$)/g,"");
  Blockly.Arduino.setups_.manual_add=a;
  return""
};

Blockly.Arduino.board_setup=function(){
  var a=this.getFieldValue("BOARD_TYPE");
  Blockly.Arduino.my_board_type=a;
  return'';
};

Blockly.Arduino.board_i2c_reset=function(){
  var a=Blockly.Arduino.valueToCode(this,"SDA",Blockly.Arduino.ORDER_ATOMIC)||"0",
  b=Blockly.Arduino.valueToCode(this,"SCL",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin("+a+","+b+");";
  return'';
}

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
  Blockly.Arduino.definitions_.define_esp32_i2c_read='byte myRead=0;\nbyte myLEDs[]={16,8,4,2,1,128,64,32};\nbyte allLEDs=255;\nbyte ledAddr=0x20;\n\nvoid lightOn(byte myLED,byte LED_on){\n  byte myTempByte=0;\n  Wire.requestFrom((int)ledAddr, 1);\n  myRead=Wire.read();\n  Wire.beginTransmission((int)ledAddr);\n  if (LED_on==1)\n    myTempByte=(myRead & ~myLEDs[myLED]);\n  else if (LED_on==0)\n    myTempByte=(myRead | myLEDs[myLED]);\n  Wire.write(myTempByte);\n  Wire.endTransmission();\n}\n';
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin(26,27);";
  return'lightOn('+a+','+b+');\n';
}

Blockly.Arduino.esp32_board_rgb_custom=function(){
  var a=Blockly.Arduino.valueToCode(this,"RGB",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_.define_esp32_i2c_read='byte myRead=0;\nbyte myLEDs[]={16,8,4,2,1,128,64,32};\nbyte allLEDs=255;\nbyte ledAddr=0x20;\n\nvoid lightOn(byte myLED,byte LED_on){\n  byte myTempByte=0;\n  Wire.requestFrom((int)ledAddr, 1);\n  myRead=Wire.read();\n  Wire.beginTransmission((int)ledAddr);\n  if (LED_on==1)\n    myTempByte=(myRead & ~myLEDs[myLED]);\n  else if (LED_on==0)\n    myTempByte=(myRead | myLEDs[myLED]);\n  Wire.write(myTempByte);\n  Wire.endTransmission();\n}\n';
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin(26,27);";
  return'lightOn('+a+','+b+');\n';
}

Blockly.Arduino.esp32_board_i2c_reset=function(){
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin(26,27);";
  return'';
}

Blockly.Arduino.esp32_analog={};
Blockly.Arduino.esp32_analog_write=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN_ANALOGWRITE",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"NUM",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"CHANNEL",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.setups_["ledc_channel_"+c]||(Blockly.Arduino.setups_["ledc_channel_"+c]="ledcSetup("+c+", 5000, 8);");
    Blockly.Arduino.setups_["ledc_"+a]||(Blockly.Arduino.setups_["ledc_"+a]="ledcAttachPin("+a+","+c+");");
    return"ledcWrite("+c+", "+b+");\n";
  }
  else
    return'';
}

Blockly.Arduino.esp32_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("FREQ"),
      c=Blockly.Arduino.valueToCode(this,"CHANNEL",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
    Blockly.Arduino.setups_["esp32_tone1"]="tone("+a+","+b+",0,"+c+");\n  delay(1);\n  noTone("+a+","+c+");\n";
    return"tone("+a+","+b+",0,"+c+");\n"
  }
  else
    return'';
}

Blockly.Arduino.esp32_no_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"CHANNEL",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
    return"noTone("+a+","+b+");\n"
  }
  else
    return'';
}

Blockly.Arduino.esp32_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||"0",
      d=Blockly.Arduino.valueToCode(this,"CHANNEL",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
    Blockly.Arduino.setups_["esp32_tone1"]="tone("+a+","+b+",0,"+d+");\n  delay(1);\n  noTone("+a+","+d+");\n";
    return"tone("+a+","+b+","+c+","+d+");\n"
  }
  else
    return'';
}

//ESP32 builtin sensor
Blockly.Arduino.esp32_esp32_builtin={};
Blockly.Arduino.esp32_hall_read=function(){
  return["hallRead()",Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.esp32_touch_read=function(){
  var a=this.getFieldValue("TOUCH_PIN");
  return['touchRead('+a+')',Blockly.Arduino.ORDER_ATOMIC];
}

//PocketCard
Blockly.Arduino.pocketcard={};
Blockly.Arduino.pocketcard_button=function(){
    var a=this.getFieldValue("AB_BUTTON"),
	    b=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL");
    Blockly.Arduino.definitions_.define_m_button="byte A_Pin=14;\nbyte B_Pin=25;\nchar myBtnStatus;\nbool buttonPressed(char btnName)\n{\n  if (btnName=='A'){\n    if (digitalRead(A_Pin) == 1)\n      return false;\n    else\n      return true;\n  }\n  else if (btnName=='B'){\n    if (digitalRead(B_Pin) == 1)\n      return false;\n    else\n      return true;\n  } else {\n    if ((digitalRead(A_Pin) == 1) && (digitalRead(B_Pin) == 1))\n      return false;\n    else\n      return true;\n  }\n}\n"
    Blockly.Arduino.definitions_.define_m_getBtnStatus="char getBtnStatus(){\n  char buttonStatus=' ';\n  int checkButtonDelay=200;\n  if (buttonPressed('A')){\n    delay(checkButtonDelay);\n    if (buttonPressed('A')){\n      buttonStatus='A';\n      if (buttonPressed('B'))\n        buttonStatus='C';\n    }\n  } else if (buttonPressed('B')){\n      delay(checkButtonDelay);\n      if (buttonPressed('B')){\n        buttonStatus='B';\n        if (buttonPressed('A'))\n          buttonStatus='C';\n      }\n  }\n  return buttonStatus;\n}\n";
    Blockly.Arduino.setups_.setup_button='pinMode(A_Pin, INPUT);\n  pinMode(B_Pin, INPUT);\n';
	  return"if (myBtnStatus=='"+a+"'){\n"+b+"  while(buttonPressed('"+a+"')){}\n}\n"
};

Blockly.Arduino.pocketcard_pinMap=function(){
  var a=this.getFieldValue("POCKETCARD_PIN");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.pocketcard_light_sensor=function(){
  var a=this.getFieldValue("POCKETCARD_PIN");
  return["analogRead("+a+")",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.pocketcard_temperature_sensor=function(){
  Blockly.Arduino.definitions_.define_ntc="#include <thermistor.h>";
  Blockly.Arduino.definitions_.define_ntc_claim="THERMISTOR thermistor(34,10000,3950,10000);";
  return["(thermistor.read()/10.0)",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.pocketcard_pixels_brightness=function(){
  var a=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"0";
	Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>\n";
	Blockly.Arduino.definitions_.define_pocket_neopixel="Adafruit_NeoPixel pocketCardPixels = Adafruit_NeoPixel(1,12,NEO_RGB + NEO_KHZ800);\n";
  Blockly.Arduino.setups_.setup_pocket_neopixel="pocketCardPixels.begin();\n";  
  return'pocketCardPixels.setBrightness('+a+');\npocketCardPixels.show();\n';
};

Blockly.Arduino.pocketcard_rgb_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"0";
	//a=a.replace(/\"/g,"");
  a=a.replace("tft.color565","pocketCardPixels.Color");
	Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>\n";
	Blockly.Arduino.definitions_.define_pocket_neopixel="Adafruit_NeoPixel pocketCardPixels = Adafruit_NeoPixel(1,12,NEO_RGB + NEO_KHZ800);\n";
  Blockly.Arduino.setups_.setup_pocket_neopixel="pocketCardPixels.begin();\n"; 
  return 'pocketCardPixels.setBrightness('+b+');\npocketCardPixels.setPixelColor(0,'+a+');\npocketCardPixels.show();\n';
};


//MPU9250
Blockly.Arduino.mpu9250={};
Blockly.Arduino.mpu9250_accel_begin=function(){
  var a=this.getFieldValue("ACCEL_MODE");
  Blockly.Arduino.definitions_.define_mpu9250="#include <MPU9250_asukiaaa.h>\nMPU9250_asukiaaa myMPU9250;\ndouble pitch,roll,yaw;";
  Blockly.Arduino.definitions_.define_mpu9250_pitch_roll="void calcMPU9250angle(){\n   pitch = atan2 (myMPU9250.accelY() ,( sqrt ((myMPU9250.accelX() * myMPU9250.accelX()) + (myMPU9250.accelZ() * myMPU9250.accelZ()))))*57.3;\n   roll = atan2(myMPU9250.accelX() ,( sqrt((myMPU9250.accelY() * myMPU9250.accelY()) + (myMPU9250.accelZ() * myMPU9250.accelZ()))))*57.3;\n}\n";
  Blockly.Arduino.setups_.setup_mpu9250_accel='myMPU9250.beginAccel('+a+');';
	return""
};

Blockly.Arduino.mpu9250_accel_fetch=function(){
	return"myMPU9250.accelUpdate();\ncalcMPU9250angle();\n"
};

Blockly.Arduino.mpu9250_accel_3axis=function(){
  var a=this.getFieldValue("3AXIS_MODE");
  return["myMPU9250."+a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mpu9250_accel_pitch_roll=function(){
  var a=this.getFieldValue("PITCH_ROLL");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mpu9250_mag_begin=function(){
  Blockly.Arduino.definitions_.define_mpu9250="#include <MPU9250_asukiaaa.h>\nMPU9250_asukiaaa myMPU9250;\ndouble pitch,roll,yaw;";
  Blockly.Arduino.setups_.setup_mpu9250_mag='myMPU9250.beginMag();';
	return""
};

Blockly.Arduino.mpu9250_mag_fetch=function(){
	return"myMPU9250.magUpdate();\n"
};

Blockly.Arduino.mpu9250_mag_3axis=function(){
  var a=this.getFieldValue("3AXIS_MODE");
  return["myMPU9250."+a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mpu9250_gyro_begin=function(){
  var a=this.getFieldValue("GYRO_MODE");
  Blockly.Arduino.definitions_.define_mpu9250="#include <MPU9250_asukiaaa.h>\nMPU9250_asukiaaa myMPU9250;\ndouble pitch,roll,yaw;";
  Blockly.Arduino.setups_.setup_mpu9250_gyro='myMPU9250.beginGyro('+a+');';
	return""
};

Blockly.Arduino.mpu9250_gyro_fetch=function(){
	return"myMPU9250.gyroUpdate();\n"
};

Blockly.Arduino.mpu9250_gyro_3axis=function(){
  var a=this.getFieldValue("3AXIS_MODE");
  return["myMPU9250."+a,Blockly.Arduino.ORDER_ATOMIC];
};

//MSA301
Blockly.Arduino.msa301={};
Blockly.Arduino.msa301_accel_begin=function(){
  var a=this.getFieldValue("ACCEL_MODE");
  Blockly.Arduino.definitions_.define_msa301="#include <Adafruit_MSA301.h>\n#include <Adafruit_Sensor.h>\nAdafruit_MSA301 msa;\nsensors_event_t eventAccel;\nuint8_t motionstat;\n";
  Blockly.Arduino.setups_.setup_msa_accel='msa.begin();\n  msa.setRange('+a+');';
	return""
};

Blockly.Arduino.msa301_accel_fetch=function(){
	return"msa.getEvent(&eventAccel);\n"
};

Blockly.Arduino.msa301_accel_3axis=function(){
  var a=this.getFieldValue("3AXIS_MODE");
  return['eventAccel.acceleration.'+a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.msa301_tap_setup=function(){
  return"msa.setClick(false, false, MSA301_TAPDUR_250_MS, 25);\nmsa.enableInterrupts(true, true);\n";
};

Blockly.Arduino.msa301_tap_begin=function(){
  var a=Blockly.Arduino.statementToCode(this,"TAP_CALL");
  return"motionstat = msa.getMotionInterruptStatus();\nif (motionstat){\n"+a+"}\n";
};

Blockly.Arduino.msa301_tap_count=function(){
  var a=this.getFieldValue("MODE");
  return['motionstat & '+a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Blocks.msa301_tap_count={init:function(){
  this.setHelpUrl(Blockly.Msg.MSA301_HELPURL);
  this.setColour(Blockly.Blocks.msa301.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MSA301_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.MSA301_TAP_MODE),"MODE")
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.MSA301_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.msa301.checkBlocks(this,"msa301_tap_count","msa301_tap_begin")?this.setWarningText(null):this.setWarningText(Blockly.Msg.MSA301_TAP_BEGIN_WARNING))}
};


//GoogleSheets
Blockly.Arduino.googlesheets={};
Blockly.Arduino.data_join=function(){
  for(var a="String()",b=0;b<this.itemCount_;b++){
    var c=Blockly.Arduino.valueToCode(this,"ADD"+b,Blockly.Arduino.ORDER_COMMA);
    if(b<(this.itemCount_-1))
      c&&(a+=" + "+c+" + \",\"")
    else
      c&&(a+=" + "+c)
  }
  return[a,Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.setupSheets=function(){
  var a=Blockly.Arduino.valueToCode(this,"sheetId",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_sheets='const char* asId="AKfycbyR-Yp-uu4nIvnjvnkILaQ5AX8yFxp-UpBO-Sqs0su3ai1N_BvQsz_Q";\nString sheetId="";\nString sheetTag="";\n';
  Blockly.Arduino.definitions_.define_urlencode_invoke="String URLEncode(const char* msg)\n{\n  const char *hex = \"0123456789abcdef\";\n  String encodedMsg = \"\";\n  while (*msg!='\\0'){\n      if( ('a' <= *msg && *msg <= 'z')\n              || ('A' <= *msg && *msg <= 'Z')\n              || ('0' <= *msg && *msg <= '9') ) {\n          encodedMsg += *msg;\n      } else {\n          encodedMsg += '%';\n          encodedMsg += hex[*msg >> 4];\n          encodedMsg += hex[*msg & 15];\n      }\n      msg++;\n  }\n  return encodedMsg;\n}\n";
  return'sheetId='+a+';\n';
};

Blockly.Arduino.setupForm=function(){
  var a=Blockly.Arduino.valueToCode(this,"sheetTag",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'sheetTag=URLEncode('+a+');\n';
};

Blockly.Arduino.sendToGoogle=function(){
  var a=this.getFieldValue("dateInclude");
  Blockly.Arduino.definitions_.define_send_sheet_invoke='void  sendToGoogleSheets(const String& dateInclude,const String& data)\n{\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  if (sheetClient.connect(host, 443)) {\n      const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=insert&dateInclude="+dateInclude+"&sheetId="+sheetId+"&sheetTag="+sheetTag+"&data="+data;\n      sheetClient.println("GET " + url + " HTTP/1.1");\n      sheetClient.println(String()+"Host: "+host);\n      sheetClient.println("Accept: */*");\n      sheetClient.println("Connection: close");\n      sheetClient.println();\n      sheetClient.println();\n      sheetClient.stop();\n  }\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_send_sheet_invoke=Blockly.Arduino.definitions_.define_send_sheet_invoke.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_send_sheet_invoke=Blockly.Arduino.definitions_.define_send_sheet_invoke.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
    }  
  }
  var c=Blockly.Arduino.valueToCode(this,"data",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'sendToGoogleSheets("'+a+'",URLEncode(('+c+').c_str()));\n'
};

Blockly.Arduino.fetchFromSheet=function(){
  var a=Blockly.Arduino.valueToCode(this,"beginCell",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"endCell",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_json_include="#define ARDUINOJSON_DECODE_UNICODE 1\n#include <ArduinoJson.h>";
  Blockly.Arduino.definitions_.define_sheet_json_doc_invoke='DynamicJsonDocument docSheet(2048);\n';
  Blockly.Arduino.definitions_.define_read_sheet_invoke='void fetchFromSheet(const String& begin, const String& end){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  if (!sheetClient.connect(host, 443)) {\n    return;\n  }\n  const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=read&sheetId="+sheetId+"&sheetTag="+sheetTag+"&begin="+begin+"&end="+end;\n  sheetClient.println("GET " + url + " HTTP/1.1");\n  sheetClient.println(String()+"Host: "+host);\n  sheetClient.println("Accept: */*");\n  sheetClient.println("Connection: close");\n  sheetClient.println();\n  sheetClient.println();\n  String newUrl="";\n  while (sheetClient.connected()) {\n    newUrl = sheetClient.readStringUntil(\'\\n\');\n    if (newUrl.startsWith("Location: https://")) {\n      newUrl.replace("Location: ","");\n      break;\n    }\n  }\n  sheetClient.stop();\n  if (!sheetClient.connect(host, 443)) {\n    return;\n  }\n  sheetClient.println("GET " + newUrl + " HTTP/1.1");\n  sheetClient.println(String()+"Host: "+host);\n  sheetClient.println("Accept: */*");\n  sheetClient.println("Connection: close");\n  sheetClient.println();\n  sheetClient.println();\n  while (sheetClient.connected()) {\n    String line = sheetClient.readStringUntil(\'\\n\');\n    if (line.startsWith("{")) {\n      DeserializationError error = deserializeJson(docSheet, line);\n      break;\n    }\n  }\n  sheetClient.stop();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_read_sheet_invoke=Blockly.Arduino.definitions_.define_read_sheet_invoke.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_read_sheet_invoke=Blockly.Arduino.definitions_.define_read_sheet_invoke.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
    }  
  }
  return'fetchFromSheet('+a+','+b+');\n';
};


Blockly.Arduino.getCellValue=function(){
  var a=Blockly.Arduino.valueToCode(this,"cell",Blockly.Arduino.ORDER_ATOMIC)||"";
  //return'docSheet['+a+'].as<char*>()'
  return['docSheet['+a+'].as<char*>()',Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.updateCellValue=function(){
  var a=Blockly.Arduino.valueToCode(this,"cell",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"data",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_update_sheet_invoke='void  updateCellValue(const String& cell,const String& data)\n{\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  if (sheetClient.connect(host, 443)) {\n      const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=update&sheetId="+sheetId+"&sheetTag="+sheetTag+"&cell="+cell+"&data="+data;\n      sheetClient.println("GET " + url + " HTTP/1.1");\n      sheetClient.println(String()+"Host: "+host);\n      sheetClient.println("Accept: */*");\n      sheetClient.println("Connection: close");\n      sheetClient.println();\n      sheetClient.println();\n      sheetClient.stop();\n  }\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_update_sheet_invoke=Blockly.Arduino.definitions_.define_update_sheet_invoke.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_update_sheet_invoke=Blockly.Arduino.definitions_.define_update_sheet_invoke.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
    }  
  }
  var c=Blockly.Arduino.valueToCode(this,"data",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'updateCellValue('+a+',URLEncode('+b+'));\n'
};

//ESP32 NTP
Blockly.Arduino.esp32_ntp={};
Blockly.Arduino.set_ntp_time=function(){
  var a=this.getFieldValue("TZ");
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
    Blockly.Arduino.definitions_.define_getDataFromRTC_invoke="int get_data_from_RTC(byte dataType) {\n  int myResult=0;\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  switch(dataType){\n    case 0:\n      myResult=(1900 + t_st->tm_year);\n      break;\n    case 1:\n      myResult=( 1 + t_st->tm_mon);\n      break;\n    case 2:\n      myResult=t_st->tm_mday;\n      break;\n    case 3:\n      myResult=t_st->tm_hour;\n      break;\n    case 4:\n      myResult=t_st->tm_min;\n      break;\n    case 5:\n      myResult=t_st->tm_sec;\n      break;\n  }\n  return myResult;\n}\n";
    return'configTime('+a+'*3600, 0, "time.stdtime.gov.tw","time.nist.gov");\nwhile(get_data_from_RTC(0)<2000){delay(500);}\n'
  }else{
    return''
  }
};

Blockly.Arduino.get_RTC_str=function(){
  var a=this.getFieldValue("TIMEFORMAT");
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
    Blockly.Arduino.definitions_.define_getStrFromRTC_invoke='String get_time_from_RTC(byte myStrType) {\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  static char buffer[] = "YYYY-MM-DDTHH:MM:SS+08";\n  switch(myStrType){\n    case 0:\n      sprintf(buffer, "%04d-%02d-%02dT%02d:%02d:%02d",\n        1900 + t_st->tm_year,\n        1 + t_st->tm_mon,\n        t_st->tm_mday,\n        t_st->tm_hour,\n        t_st->tm_min,\n        t_st->tm_sec);\n      break;\n    case 1:\n      sprintf(buffer, "%04d-%02d-%02d",\n        1900 + t_st->tm_year,\n        1 + t_st->tm_mon,\n        t_st->tm_mday);\n      break;\n    case 2:\n      sprintf(buffer, "%02d:%02d:%02d",\n        t_st->tm_hour,\n        t_st->tm_min,\n        t_st->tm_sec);\n      break;\n  }\n  return String(buffer);\n}\n';
    //Blockly.Arduino.definitions_.define_getStrFromRTC_invoke='String get_time_from_RTC() {\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  static char buffer[] = "YYYY-MM-DDTHH:MM:SS+08";\n  sprintf(buffer, "%04d-%02d-%02dT%02d:%02d:%02d",\n    1900 + t_st->tm_year,\n    1 + t_st->tm_mon,\n    t_st->tm_mday,\n    t_st->tm_hour,\n    t_st->tm_min,\n    t_st->tm_sec);\n  return String(buffer);\n}\n';
    return['get_time_from_RTC('+a+')',Blockly.Arduino.ORDER_ATOMIC]
  }else{
    return['',Blockly.Arduino.ORDER_ATOMIC]
  }
};

Blockly.Arduino.get_RTC_field=function(){
  var a=this.getFieldValue("FIELDTYPE");
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
    Blockly.Arduino.definitions_.define_getDataFromRTC_invoke="int get_data_from_RTC(byte dataType) {\n  int myResult=0;\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  switch(dataType){\n    case 0:\n      myResult=(1900 + t_st->tm_year);\n      break;\n    case 1:\n      myResult=( 1 + t_st->tm_mon);\n      break;\n    case 2:\n      myResult=t_st->tm_mday;\n      break;\n    case 3:\n      myResult=t_st->tm_hour;\n      break;\n    case 4:\n      myResult=t_st->tm_min;\n      break;\n    case 5:\n      myResult=t_st->tm_sec;\n      break;\n  }\n  return myResult;\n}\n";
    return['get_data_from_RTC('+a+')',Blockly.Arduino.ORDER_ATOMIC]
  }else{
    return['0',Blockly.Arduino.ORDER_ATOMIC]
  }
};

//Line Notify
Blockly.Arduino.line_notify={};
Blockly.Arduino.setLineToken=function(){
  var a=Blockly.Arduino.valueToCode(this,"TOKEN",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_line_token='String lineToken="";\n';
  return'lineToken='+a+';\n';
};

Blockly.Arduino.sendLineMsg=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_send_line_notify_invoke='void sendLineMsg(String myMsg) {\n  static TLSClient line_client;\n  myMsg.replace("%","%25");\n  myMsg.replace("&","%26");\n  myMsg.replace("§","&");\n  myMsg.replace("\\\\n","\\n");\n  if (line_client.connect("notify-api.line.me", 443)) {\n    line_client.println("POST /api/notify HTTP/1.1");\n    line_client.println("Connection: close");\n    line_client.println("Host: notify-api.line.me");\n    line_client.println("Authorization: Bearer " + lineToken);\n    line_client.println("Content-Type: application/x-www-form-urlencoded");\n    line_client.println("Content-Length: " + String(myMsg.length()));\n    line_client.println();\n    line_client.println(myMsg);\n    line_client.println();\n    line_client.stop();\n  }\n  else {\n    Serial.println("Line Notify failed");\n  }\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_send_line_notify_invoke=Blockly.Arduino.definitions_.define_send_line_notify_invoke.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_send_line_notify_invoke=Blockly.Arduino.definitions_.define_send_line_notify_invoke.replace(" line_client;\n"," line_client;\n  line_client.setInsecure();\n");
    }  
  }
  return'sendLineMsg(String("message=\\n")+'+a+');\n';
};

Blockly.Arduino.sendSticker=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"",
  b=Blockly.Arduino.valueToCode(this,"PACKAGEID",Blockly.Arduino.ORDER_ATOMIC)||"",
  c=Blockly.Arduino.valueToCode(this,"STICKERID",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_send_line_notify_invoke='void sendLineMsg(String myMsg) {\n  static TLSClient line_client;\n  myMsg.replace("%","%25");\n  myMsg.replace("&","%26");\n  myMsg.replace("§","&");\n  myMsg.replace("\\\\n","\\n");\n  if (line_client.connect("notify-api.line.me", 443)) {\n    line_client.println("POST /api/notify HTTP/1.1");\n    line_client.println("Connection: close");\n    line_client.println("Host: notify-api.line.me");\n    line_client.println("Authorization: Bearer " + lineToken);\n    line_client.println("Content-Type: application/x-www-form-urlencoded");\n    line_client.println("Content-Length: " + String(myMsg.length()));\n    line_client.println();\n    line_client.println(myMsg);\n    line_client.println();\n    line_client.stop();\n  }\n  else {\n    Serial.println("Line Notify failed");\n  }\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_send_line_notify_invoke=Blockly.Arduino.definitions_.define_send_line_notify_invoke.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_send_line_notify_invoke=Blockly.Arduino.definitions_.define_send_line_notify_invoke.replace(" line_client;\n"," line_client;\n  line_client.setInsecure();\n");
    }  
  }
  return'sendLineMsg(String("message=\\n")+'+a+'+"§stickerPackageId="+'+b+'+"§stickerId="+'+c+');\n';
};

Blockly.Arduino.breakLine=function(){
  return['"\\n"',Blockly.Arduino.ORDER_ATOMIC]
}

//TTGO TFT
Blockly.Arduino.ttgo_tft={};
Blockly.Arduino.ttgo_tft_init=function(){
  Blockly.Arduino.definitions_.define_spi="#include <SPI.h>";
  Blockly.Arduino.definitions_.define_ttgo_tft="#include <TFT_eSPI.h>\n#include <U8g2_for_TFT_eSPI.h>";
  Blockly.Arduino.definitions_.define_ttgo_tft_init_invoke="TFT_eSPI tft = TFT_eSPI();\nU8g2_for_TFT_eSPI u8g2;\nuint32_t tft_color=TFT_WHITE;\nbyte tftTextSize=1;\nbyte tftTextFont=1;\n";
  Blockly.Arduino.setups_.ttgo_tft='tft.begin();\n  tft.fillScreen(TFT_BLACK);\n  u8g2.begin(tft);\n  tft.setTextColor(tft_color);\n  u8g2.setForegroundColor(tft_color);\n  u8g2.setFontMode(1);';
  return'';
};

Blockly.Arduino.ttgo_tft_rotation=function(){
  var a=this.getFieldValue("ROTATION");
  return'tft.setRotation('+a+');\n';
};

Blockly.Arduino.ttgo_tft_fill=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
	a=a.replace(/\"/g,"");
  return 'tft.fillScreen('+a+');\n';
};

Blockly.Arduino.ttgo_tft_set_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  return 'tft_color='+a+';\ntft.setTextColor(tft_color);\nu8g2.setForegroundColor(tft_color);\n';
};

Blockly.Arduino.ttgo_tft_draw_chinese_text=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_NONE)||"";
  return"u8g2.setFont(u8g2_font_unifont_t_chinese1);\nu8g2.setFontMode(1);\nu8g2.setCursor("+a+", "+(parseInt(b)+15)+");\nu8g2.print(String("+c+").c_str());\n"
};

Blockly.Arduino.ttgo_tft_set_eng_font=function(){
  var a=Blockly.Arduino.valueToCode(this,"SIZE",Blockly.Arduino.ORDER_NONE)||"0";
  return 'tftTextSize='+a+';\ntft.setTextSize(tftTextSize);\n';
};

Blockly.Arduino.ttgo_tft_set_eng_font_num=function(){
  var a=Blockly.Arduino.valueToCode(this,"FONT",Blockly.Arduino.ORDER_NONE)||"0";
  return 'tftTextFont='+a+';\ntft.setTextFont(tftTextFont);\n';
};

Blockly.Arduino.ttgo_tft_print_eng_text=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_NONE)||"";
  return"tft.setCursor("+a+", "+b+");\ntft.printf(String("+c+").c_str());\n"
};
Blockly.Arduino.ttgo_tft_draw_eng_text=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_NONE)||"";
  return'tft.drawString(String('+c+').c_str(),'+a+','+b+');\n';
};

Blockly.Arduino.ttgo_button=function(){
    var a=this.getFieldValue("AB_BUTTON"),
	    b=Blockly.Arduino.statementToCode(this,"TTGO_BUTTON_CALL");
    Blockly.Arduino.definitions_.define_m_button="byte A_Pin=0;\nbyte B_Pin=35;\nchar myBtnStatus;\nbool buttonPressed(char btnName)\n{\n  if (btnName=='A'){\n    if (digitalRead(A_Pin) == 1)\n      return false;\n    else\n      return true;\n  }\n  else if (btnName=='B'){\n    if (digitalRead(B_Pin) == 1)\n      return false;\n    else\n      return true;\n  } else {\n    if ((digitalRead(A_Pin) == 1) && (digitalRead(B_Pin) == 1))\n      return false;\n    else\n      return true;\n  }\n}\n"
    Blockly.Arduino.definitions_.define_m_getBtnStatus="char getBtnStatus(){\n  char buttonStatus=' ';\n  int checkButtonDelay=200;\n  if (buttonPressed('A')){\n    delay(checkButtonDelay);\n    if (buttonPressed('A')){\n      buttonStatus='A';\n      if (buttonPressed('B'))\n        buttonStatus='C';\n    }\n  } else if (buttonPressed('B')){\n      delay(checkButtonDelay);\n      if (buttonPressed('B')){\n        buttonStatus='B';\n        if (buttonPressed('A'))\n          buttonStatus='C';\n      }\n  }\n  return buttonStatus;\n}\n";
    Blockly.Arduino.setups_.setup_button='pinMode(A_Pin, INPUT);\n  pinMode(B_Pin, INPUT);\n';
	  return"if (myBtnStatus=='"+a+"'){\n"+b+"  while(buttonPressed('"+a+"')){}\n}\n"
};

Blockly.Arduino.ttgo_set_font=function(){
  var a=Blockly.Arduino.valueToCode(this,"FONT",Blockly.Arduino.ORDER_NONE)||"";
  a=a.replace(/\"/g,"");
  if (!a.startsWith('u8g2_font_')){
    a='u8g2_font_'+a;
  }
  if (!a.endsWith('_t')){
    a=a+'_t';
  }
  return"u8g2.setFont("+a+");\nu8g2.setFontMode(1);\n";
};

Blockly.Arduino.ttgo_tft_draw_symbol=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=Blockly.Arduino.valueToCode(this,"SYMBOL_NUM",Blockly.Arduino.ORDER_NONE)||"0";
  return'u8g2.drawGlyph('+a+','+b+','+c+');\n';
};

Blockly.Arduino.ttgo_tft_draw_line=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
      b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"END_X",Blockly.Arduino.ORDER_NONE)||"0",
      d=Blockly.Arduino.valueToCode(this,"END_Y",Blockly.Arduino.ORDER_NONE)||"0";
  return"tft.drawLine("+a+", "+b+", "+c+", "+d+", tft_color);\n"
};

Blockly.Arduino.ttgo_tft_draw_box=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
      b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"END_X",Blockly.Arduino.ORDER_NONE)||"0",
      d=Blockly.Arduino.valueToCode(this,"END_Y",Blockly.Arduino.ORDER_NONE)||"0",
      e=this.getFieldValue("FILLED_TYPE");
  if (e=="1"){
    return"tft.fillRect("+a+", "+b+", "+c+", "+d+", tft_color);\n";
  } else{
    return"tft.drawRect("+a+", "+b+", "+c+", "+d+", tft_color);\n";
  }
};

Blockly.Arduino.ttgo_tft_draw_circle=function(){
  var a=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_NONE)||"0",
      b=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"RADIUS",Blockly.Arduino.ORDER_NONE)||"0",
      e=this.getFieldValue("FILLED_TYPE");
  if (e=="1"){
    return"tft.fillCircle("+a+", "+b+", "+c+", tft_color);\n";
  } else{
    return"tft.drawCircle("+a+", "+b+", "+c+", tft_color);\n";
  }
};

Blockly.Arduino.ttgo_tft_draw_triangle=function(){
  var a=Blockly.Arduino.valueToCode(this,"X1",Blockly.Arduino.ORDER_NONE)||"0",
      b=Blockly.Arduino.valueToCode(this,"Y1",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"X2",Blockly.Arduino.ORDER_NONE)||"0",
      d=Blockly.Arduino.valueToCode(this,"Y2",Blockly.Arduino.ORDER_NONE)||"0",
      e=Blockly.Arduino.valueToCode(this,"X3",Blockly.Arduino.ORDER_NONE)||"0",
      f=Blockly.Arduino.valueToCode(this,"Y3",Blockly.Arduino.ORDER_NONE)||"0",
      g=this.getFieldValue("FILLED_TYPE");
  if (g=="1"){
    return"tft.fillTriangle("+a+", "+b+", "+c+", "+d+", "+e+", "+f+", tft_color);\n";
  } else{
    return"tft.drawTriangle("+a+", "+b+", "+c+", "+d+", "+e+", "+f+", tft_color);\n";
  }
};

Blockly.Arduino.ttgo_getRGBcolor=function(){
  var a=Blockly.Arduino.valueToCode(this,"RED",Blockly.Arduino.ORDER_NONE)||"0",
      b=Blockly.Arduino.valueToCode(this,"GREEN",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"BLUE",Blockly.Arduino.ORDER_NONE)||"0";
  if (parseInt(a)>255)
    a="255";
  else if(parseInt(a)<0)
    a="0";
  if (parseInt(b)>255)
    b="255";
  else if(parseInt(b)<0)
    b="0";
  if (parseInt(c)>255)
    c="255";
  else if(parseInt(c)<0)
    c="0";
  return['tft.color565('+a+','+b+','+c+')',Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.ttgo_getFromColorPicker=function(){
  var a=this.getFieldValue("RGB");
  return['tft.color565('+hexToR(a)+','+hexToG(a)+','+hexToB(a)+')',Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.ttgo_tft_set_clock=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR_HOUR",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"COLOR_MINUTE",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"COLOR_SECOND",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"COLOR_SCALE",Blockly.Arduino.ORDER_ATOMIC)||"";
	a=a.replace(/\"/g,"");
	b=b.replace(/\"/g,"");
  c=c.replace(/\"/g,"");
  d=d.replace(/\"/g,"");
  Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
  Blockly.Arduino.definitions_.define_ttgo_clock_invoke='const float pi = 3.14159267 ;\nint clock_center_x=64;\nint clock_center_y=32;\nint x_old;\nint y_old;\nint x_new;\nint y_new;\nuint32_t clock_hour=TFT_BLUE;\nuint32_t clock_minute=TFT_YELLOW;\nuint32_t clock_second=TFT_GREEN;\nuint32_t clock_scale=TFT_RED;\nint radius;\n\nvoid draw_second(int second){\n   y_old= ((radius-16)*cos(pi-(2*pi)/60*second))+clock_center_y;\n   x_old =((radius-16)*sin(pi-(2*pi)/60*second))+clock_center_x;\n   tft.drawCircle(x_old, y_old, 4,clock_second);\n}\n\nvoid draw_hour(int hour, int minute){\n   y_old= ((radius-28)*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y;\n   x_old =((radius-28)*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x;\n   y_new=((radius-28)*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y+1;\n   x_new=((radius-28)*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x+1;\n   tft.drawLine(clock_center_x,clock_center_y,x_old,y_old,clock_hour);\n   tft.drawLine(clock_center_x+1,clock_center_y+1,x_new,y_new,clock_hour);\n}\n\nvoid draw_minute(int minute){\n   y_old =((radius-16)*cos(pi-(2*pi)/60*minute))+clock_center_y;\n   x_old =((radius-16)*sin(pi-(2*pi)/60*minute))+clock_center_x;\n   y_new =((radius-16)*cos(pi-(2*pi)/60*minute))+clock_center_y+1;\n   x_new =((radius-16)*sin(pi-(2*pi)/60*minute))+clock_center_x+1;\n   tft.drawLine(clock_center_x,clock_center_y,x_old,y_old,clock_minute);\n   tft.drawLine(clock_center_x+1,clock_center_y+1,x_old,y_old,clock_minute);\n}\n\nvoid draw_clock_face(void){\n  tft.drawCircle(clock_center_x, clock_center_y,6,clock_scale);\n  tft.drawCircle(clock_center_x, clock_center_y,5,clock_scale);\n  for (int i=0;i<12;i++){\n     y_old= (radius*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_old =(radius*sin(pi-(2*pi)/12*i))+clock_center_x;\n     y_new= ((radius-8)*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_new =((radius-8)*sin(pi-(2*pi)/12*i))+clock_center_x;\n     if (i==0){\n       tft.setTextSize(1);\n       tft.setTextFont(2);\n       tft.setTextColor(clock_scale);\n       tft.drawString("12",x_old-5,y_old-3);\n       tft.setTextColor(tft_color);\n       tft.setTextSize(tftTextSize);\n       tft.setTextFont(tftTextFont);\n     } else {\n       tft.drawLine(x_new,y_new,x_old,y_old,clock_scale);\n       tft.drawLine(x_new+1,y_new+1,x_old+1,y_old+1,clock_scale);\n     }\n  }\n}\n\nvoid tftClockSetColors(uint32_t color1,uint32_t color2,uint32_t color3,uint32_t color4){\n  clock_hour=color1;\n  clock_minute=color2;\n  clock_second=color3;\n  clock_scale=color4;\n}\n\nvoid checkClockCenter(byte myPos){\n  if (tft.width()==tft.height()){\n    clock_center_x=tft.width()/2;\n    clock_center_y=clock_center_x;\n    radius=clock_center_x;\n  }else if (tft.width()>tft.height()){\n    clock_center_y=tft.height()/2;\n    radius=clock_center_y;\n    switch(myPos){\n      case 0:\n        clock_center_x=radius;\n        break;\n      case 1:\n        clock_center_x=tft.width()/2;\n        break;\n      case 2:\n        clock_center_x=tft.width()-radius;\n        break;\n    }\n  } else {\n    clock_center_x=tft.width()/2;\n    radius=clock_center_x;\n    switch(myPos){\n      case 0:\n        clock_center_y=radius;\n        break;\n      case 1:\n        clock_center_y=tft.height()/2;\n        break;\n      case 2:\n        clock_center_y=tft.height()-radius;\n        break;\n    }\n  }\n}\n\nvoid runClock(byte clockPos){\n  checkClockCenter(clockPos);\n  tft.fillCircle(clock_center_x, clock_center_y, radius-8, TFT_BLACK);\n  draw_clock_face();\n  draw_second(get_data_from_RTC(5));\n  draw_minute(get_data_from_RTC(4));\n  draw_hour(get_data_from_RTC(3),get_data_from_RTC(4));\n}\n';
  return'tftClockSetColors('+a+','+b+','+c+','+d+');\n';
};

Blockly.Arduino.ttgo_tft_draw_clock=function(){
  var a=this.getFieldValue("CLOCK_POS");
  Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
  Blockly.Arduino.definitions_.define_ttgo_clock_invoke='const float pi = 3.14159267 ;\nint clock_center_x=64;\nint clock_center_y=32;\nint x_old;\nint y_old;\nint x_new;\nint y_new;\nuint32_t clock_hour=TFT_BLUE;\nuint32_t clock_minute=TFT_YELLOW;\nuint32_t clock_second=TFT_GREEN;\nuint32_t clock_scale=TFT_RED;\nint radius;\n\nvoid draw_second(int second){\n   y_old= ((radius-16)*cos(pi-(2*pi)/60*second))+clock_center_y;\n   x_old =((radius-16)*sin(pi-(2*pi)/60*second))+clock_center_x;\n   tft.drawCircle(x_old, y_old, 4,clock_second);\n}\n\nvoid draw_hour(int hour, int minute){\n   y_old= ((radius-28)*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y;\n   x_old =((radius-28)*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x;\n   y_new=((radius-28)*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y+1;\n   x_new=((radius-28)*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x+1;\n   tft.drawLine(clock_center_x,clock_center_y,x_old,y_old,clock_hour);\n   tft.drawLine(clock_center_x+1,clock_center_y+1,x_new,y_new,clock_hour);\n}\n\nvoid draw_minute(int minute){\n   y_old =((radius-16)*cos(pi-(2*pi)/60*minute))+clock_center_y;\n   x_old =((radius-16)*sin(pi-(2*pi)/60*minute))+clock_center_x;\n   y_new =((radius-16)*cos(pi-(2*pi)/60*minute))+clock_center_y+1;\n   x_new =((radius-16)*sin(pi-(2*pi)/60*minute))+clock_center_x+1;\n   tft.drawLine(clock_center_x,clock_center_y,x_old,y_old,clock_minute);\n   tft.drawLine(clock_center_x+1,clock_center_y+1,x_old,y_old,clock_minute);\n}\n\nvoid draw_clock_face(void){\n  tft.drawCircle(clock_center_x, clock_center_y,6,clock_scale);\n  tft.drawCircle(clock_center_x, clock_center_y,5,clock_scale);\n  for (int i=0;i<12;i++){\n     y_old= (radius*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_old =(radius*sin(pi-(2*pi)/12*i))+clock_center_x;\n     y_new= ((radius-8)*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_new =((radius-8)*sin(pi-(2*pi)/12*i))+clock_center_x;\n     if (i==0){\n       tft.setTextSize(1);\n       tft.setTextFont(2);\n       tft.setTextColor(clock_scale);\n       tft.drawString("12",x_old-5,y_old-3);\n       tft.setTextColor(tft_color);\n       tft.setTextSize(tftTextSize);\n       tft.setTextFont(tftTextFont);\n     } else {\n       tft.drawLine(x_new,y_new,x_old,y_old,clock_scale);\n       tft.drawLine(x_new+1,y_new+1,x_old+1,y_old+1,clock_scale);\n     }\n  }\n}\n\nvoid tftClockSetColors(uint32_t color1,uint32_t color2,uint32_t color3,uint32_t color4){\n  clock_hour=color1;\n  clock_minute=color2;\n  clock_second=color3;\n  clock_scale=color4;\n}\n\nvoid checkClockCenter(byte myPos){\n  if (tft.width()==tft.height()){\n    clock_center_x=tft.width()/2;\n    clock_center_y=clock_center_x;\n    radius=clock_center_x;\n  }else if (tft.width()>tft.height()){\n    clock_center_y=tft.height()/2;\n    radius=clock_center_y;\n    switch(myPos){\n      case 0:\n        clock_center_x=radius;\n        break;\n      case 1:\n        clock_center_x=tft.width()/2;\n        break;\n      case 2:\n        clock_center_x=tft.width()-radius;\n        break;\n    }\n  } else {\n    clock_center_x=tft.width()/2;\n    radius=clock_center_x;\n    switch(myPos){\n      case 0:\n        clock_center_y=radius;\n        break;\n      case 1:\n        clock_center_y=tft.height()/2;\n        break;\n      case 2:\n        clock_center_y=tft.height()-radius;\n        break;\n    }\n  }\n}\n\nvoid runClock(byte clockPos){\n  checkClockCenter(clockPos);\n  tft.fillCircle(clock_center_x, clock_center_y, radius-8, TFT_BLACK);\n  draw_clock_face();\n  draw_second(get_data_from_RTC(5));\n  draw_minute(get_data_from_RTC(4));\n  draw_hour(get_data_from_RTC(3),get_data_from_RTC(4));\n}\n';
  return'runClock('+a+');\n';
};


//s20
Blockly.Arduino.s20={};
Blockly.Arduino.s20_led=function(){
  var a=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.setups_["setup_s20_led_13"]="pinMode(13,OUTPUT);\n  digitalWrite(13,HIGH);"
  a="(!("+a+"))";
  return'digitalWrite(13,'+a+');\n'
}
Blockly.Arduino.s20_relay=function(){
  var a=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.setups_["setup_s20_relay_12"]="pinMode(12,OUTPUT);";
  return'digitalWrite(12,'+a+');\n'
}

Blockly.Arduino.s20_button=function(){
  var a=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL");
  Blockly.Arduino.setups_["setup_s20_button_0"]="pinMode(0,INPUT);"
	return"if (!digitalRead(0)){\n"+a+"  while(!digitalRead(0)){}\n}\n"
};

Blockly.Arduino.s20_button_bool=function(){
  Blockly.Arduino.setups_["setup_s20_button_0"]="pinMode(0,INPUT);"
	return['(!digitalRead(0))',Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.s20_relay_bool=function(){
	  return['digitalRead(12)',Blockly.Arduino.ORDER_ATOMIC]
};

//I2S DAC
Blockly.Arduino.dac={};
Blockly.Arduino.dac_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"BCLK_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"LRC_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"DATA_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
/*
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_SPIFFS_include='#include "SPIFFS.h"';
    Blockly.Arduino.definitions_.define_HTTPCLIENT_include='#include <HTTPClient.h>';
  }
  else if (Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_SPIFFS_include='#include <FS.h>';
    Blockly.Arduino.definitions_.define_HTTPCLIENT_include='#include <ESP8266HTTPClient.h>';
  }
*/
  Blockly.Arduino.definitions_.define_SPIFFS_include='#include "SPIFFS.h"';
  Blockly.Arduino.definitions_.define_HTTPCLIENT_include='#include <HTTPClient.h>';
  Blockly.Arduino.definitions_.define_ESP8266Audio_include='#include "AudioFileSourceSPIFFS.h"\n#include "AudioFileSourceSD.h"\n#include "AudioFileSourceICYStream.h"\n#include "AudioFileSourceBuffer.h"\n#include "AudioOutputI2S.h"\n#include "AudioGeneratorMP3.h"\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_variable_invoke='AudioFileSourceSD *i2sSdFile;\nAudioFileSourceSPIFFS *i2sSPIFFSfile;\nAudioGeneratorMP3 *i2sMp3;\nAudioFileSourceICYStream *i2sFile;\nAudioFileSourceBuffer *i2sBuff;\nAudioOutputI2S *i2sOut;\nString dacPlayType;\nString mp3FileName;\nString ttsContent;\nfloat gainValue=1.0;\nbool ttsDone=true;\nbool mp3Done=true;\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_checkRunning='bool checkDACrunning()\n{\n  bool isRunning=false;\n  if (i2sMp3->isRunning()) {\n    isRunning=true;\n    if (!i2sMp3->loop()){\n      i2sMp3->stop();\n      mp3Done=true;\n      ttsDone=true;\n      isRunning=false;\n    }\n  }else{\n    isRunning=false;\n  }\n  return isRunning;\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_TTS='void getVoiceFromGoogle(String myTalk,String tl)\n{\n  ttsDone=false;\n  mp3Done=true;\n  dacPlayType="TTS";\n  ttsContent=myTalk;\n  myTalk="http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl="+tl+"&q="+myTalk;\n  saveTTStoFile(myTalk,"/TTS/tts.mp3",2);\n  getVoiceFromFile("/TTS/tts.mp3",2);\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_saveTTStoFile='void saveTTStoFile(String myLink,String fileName,byte sdType)\n{\n  myLink.replace(" ","%20");\n  Serial.println("filename:"+fileName);\n  File myTTSFile;\n  if(fileName.indexOf("/")!=0)\n    fileName="/"+fileName;\n  if (sdType==1){\n    if(!SD.begin()){\n      return;\n    }\n    String path=fileName.substring(1,fileName.lastIndexOf("/"));\n    String mySubStr="/";\n    while(path.indexOf("/")>-1){\n      mySubStr+=path.substring(0,path.indexOf("/"));\n      if( !SD.exists( mySubStr.c_str()))\n        SD.mkdir(mySubStr.c_str());\n      mySubStr+="/";\n      path= path.substring(path.indexOf("/")+1);\n    }\n    if (path!=""){\n      mySubStr+=path;\n      if( !SD.exists( mySubStr.c_str()))\n        SD.mkdir(mySubStr.c_str());\n    }\n    myTTSFile = SD.open(fileName, "w");\n    if (!myTTSFile) {\n      return;\n    }\n  } else if (sdType==2){\n    if(!SPIFFS.begin(true)){\n      return;\n    }\n    myTTSFile = SPIFFS.open(fileName, "w");\n    if (!myTTSFile) {\n      return;\n    }\n  }\n  HTTPClient http;\n  http.begin(myLink);\n  int httpCode = http.GET();\n  if (httpCode == HTTP_CODE_OK) {\n      http.writeToStream(&myTTSFile);\n  }\n  myTTSFile.close();\n  http.end();\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_radio='void playRadioStation(String myStationURL)\n{\n  mp3Done=true;\n  ttsDone=true;\n  dacPlayType="radio";\n  i2sFile = new AudioFileSourceICYStream(myStationURL.c_str());\n  i2sBuff = new AudioFileSourceBuffer(i2sFile, 2048);\n  i2sMp3->begin(i2sBuff, i2sOut);\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_file='void getVoiceFromFile(String myFileName,byte sdType)\n{\n  ttsDone=true;\n  mp3Done=false;\n  dacPlayType="MP3";\n  if(myFileName.indexOf("/")!=0)\n    myFileName="/"+myFileName;\n  if (sdType==1){\n    SD.begin();\n    i2sSdFile = new AudioFileSourceSD(String(myFileName).c_str());\n    i2sBuff = new AudioFileSourceBuffer(i2sSdFile, 2048);\n    mp3FileName=myFileName;\n  }\n  else {\n    if (myFileName=="/TTS/tts.mp3"){\n      ttsDone=false;\n      mp3Done=true;\n      dacPlayType="TTS";\n    } else {\n      mp3FileName=myFileName;\n    }\n    SPIFFS.begin();\n    i2sSPIFFSfile=new AudioFileSourceSPIFFS(String(myFileName).c_str());\n    i2sBuff = new AudioFileSourceBuffer(i2sSPIFFSfile, 2048);\n  }\n  i2sMp3->begin(i2sBuff, i2sOut);\n}\n';
  Blockly.Arduino.definitions_.define_DAC_checkTTS_invoke='void checkTTS(){\n}\n';
  Blockly.Arduino.definitions_.define_DAC_checkMP3_invoke='void checkMP3(){\n}\n';
  Blockly.Arduino.definitions_.define_DAC_stop_invoke='void dacStop()\n{\n  mp3Done=true;\n  ttsDone=true;\n  dacPlayType="";\n  mp3FileName="";\n  ttsContent="";\n  if (i2sMp3->isRunning()) {\n    i2sMp3->stop();\n    i2sBuff->close();\n  }\n}\n';
  Blockly.Arduino.dac.ESP8266Audio="yes";
  return'i2sMp3 = new AudioGeneratorMP3();\ni2sOut = new AudioOutputI2S();\ni2sOut->SetPinout('+a+','+b+','+c+');\ni2sOut->SetGain(gainValue);\n';
}

Blockly.Arduino.dac_loop=function(){
  return'checkDACrunning();\ncheckTTS();\ncheckMP3();\n';
}

Blockly.Arduino.dac_stop=function(){
  return'dacStop();\n';
}

Blockly.Arduino.dac_set_gain=function(){
  var a=Blockly.Arduino.valueToCode(this,"GAIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return'gainValue='+a+';\ni2sOut->SetGain(gainValue);\n';
}


Blockly.Arduino.dac_tts=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("L_CODE");
  return'getVoiceFromGoogle('+a+',"'+b+'");\n';
}

Blockly.Arduino.dac_tts_file=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("L_CODE"),
      c=Blockly.Arduino.valueToCode(this,"FILENAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=this.getFieldValue("F_SOURCE");
  a=a.replace(/\"/g,"");
  var myLink='http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl='+b+'&q='+a;
  return'saveTTStoFile("'+myLink+'",'+c+','+d+');\n';
}

Blockly.Arduino.dac_radio=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (a.startsWith('"https://')){
    a=a.replace('https://','http://');
  }
  if (!a.startsWith('"http://')){
    a='"http://'+a.replace('"','');
  }
  return'playRadioStation('+a+');\n';
}

Blockly.Arduino.dac_tts_end=function(){
  var a=Blockly.Arduino.statementToCode(this,"TTS_END_CALL");
  a=a.replace(/\n  /g,"\n    ");
  Blockly.Arduino.definitions_.define_DAC_checkTTS_invoke='void checkTTS(){\n  if (ttsDone && dacPlayType=="TTS"){\n    dacPlayType="none";\n  '+a+'  }\n}\n';
  return'';
}

Blockly.Arduino.dac_tts_ends_with=function(){
  var a=Blockly.Arduino.statementToCode(this,"TTS_ENDS_WITH_CALL"),
      b=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return 'if (ttsContent==('+b+')){\n'+a+'}\n';
}

Blockly.Arduino.dac_is_running=function(){
  return['checkDACrunning()',Blockly.Arduino.ORDER_ATOMIC]
}

Blockly.Arduino.dac_file=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("F_SOURCE");
  return'getVoiceFromFile('+a+','+b+');\n';
}

Blockly.Arduino.dac_mp3_end=function(){
  var a=Blockly.Arduino.statementToCode(this,"MP3_END_CALL");
  a=a.replace(/\n  /g,"\n    ");
  Blockly.Arduino.definitions_.define_DAC_checkMP3_invoke='void checkMP3(){\n  if (mp3Done && dacPlayType=="MP3"){\n    dacPlayType="none";\n  '+a+'  }\n}\n';
  return'';
}

Blockly.Arduino.dac_mp3_ends_with=function(){
  var a=Blockly.Arduino.statementToCode(this,"MP3_ENDS_WITH_CALL"),
      b=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return 'if (mp3FileName==('+b+')){\n'+a+'}\n';
}

//SD_Card
Blockly.Arduino.sd={};
Blockly.Arduino.sd_init=function(){
  //Blockly.Arduino.definitions_.define_SD_mkdir_invoke='void ESP32_mkdir(String path){\n  if(path.indexOf("/")!=0)\n    path="/"+path;\n  String mySubStr="/";\n  while(path.indexOf("/")>-1){\n    mySubStr+=path.substring(0,path.indexOf("/"));\n    if( !SD.exists( mySubStr.c_str()))\n      SD.mkdir(mySubStr.c_str());\n    mySubStr+="/";\n    path= path.substring(path.indexOf("/")+1);\n  }\n  if (path!=""){\n    mySubStr+=path;\n    if( !SD.exists( mySubStr.c_str()))\n      SD.mkdir(mySubStr.c_str());\n  }\n}\n';
  Blockly.Arduino.definitions_.define_SDFAT_include='#include "SdFat.h"';
  Blockly.Arduino.definitions_.define_SDFAT_variable_invoke='SdFat mySD;\nbool SD_exists=false;\n';
  if (Blockly.Arduino.my_board_type=="7697"){
    return'SD_exists=mySD.begin();\n';
  } else {
    return'SD_exists=mySD.begin(SS, SD_SCK_MHZ(10));\n';
  }
}

Blockly.Arduino.sd_exists=function(){
  return['SD_exists',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.sd_mkdir=function(){
  var a=Blockly.Arduino.valueToCode(this,"DIR",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (!a.startsWith('"/')){
    a='"/'+a.replace('"','');
  }
  return'mySD.mkdir('+a+');\n';
}

Blockly.Arduino.sd_rmdir=function(){
  var a=Blockly.Arduino.valueToCode(this,"DIR",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (!a.startsWith('"/')){
    a='"/'+a.replace('"','');
  }
  return'mySD.rmdir('+a+');\n';
}

Blockly.Arduino.sd_file_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  Blockly.Arduino.definitions_.define_SDFAT_variable_invoke+=('File '+a+';\n');
  return'';
}

Blockly.Arduino.sd_file_open=function(){
  var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"FILE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=this.getFieldValue("MODE"),
      returnStr='';
  a=a.replace(/\"/g,"");
  returnStr=a+'.open(String('+b+').c_str(),'+c+');\n';
  if (c.indexOf("O_TRUNC")>-1){
    returnStr+=('if ('+a+'){\n  '+a+'.write(0xEF);\n  '+a+'.write(0xBB);\n  '+a+'.write(0xBF);\n  '+a+'.flush();\n}\n');
  }
  return returnStr;
}

Blockly.Arduino.sd_file_exists=function(){
  var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.sd_file_close=function(){
  var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  return a+'.close();\n';
}

Blockly.Arduino.sd_file_println=function(){
  var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=this.getFieldValue("MODE");
  a=a.replace(/\"/g,"");
  return a+c+'(String('+b+').c_str());\n'+a+'.flush();\n';
}

Blockly.Arduino.sd_file_available=function(){
  var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  return[a+'.available()',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.sd_file_readuntil_char=function(){
  var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"CHAR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  b=b.replace(/\"/g,"");
  b=b.replace("\\\\","\\");
  Blockly.Arduino.definitions_.define_sd_file_read_until_invoke="String readStringUntil(File *filePtr,char myChar){\n  String myTempStr=\"\";\n  char nowRead;\n  if (filePtr->available()){\n    nowRead=filePtr->read();\n    while(nowRead!=myChar){\n      if (myChar!='\\n'){\n        if(nowRead!='\\n'){\n          myTempStr+=nowRead;\n        } else{\n          break;\n        }\n      } else {\n        myTempStr+=nowRead;\n      }\n      if (filePtr->available())\n        nowRead=filePtr->read();\n      else\n        break;\n    }\n  }\n  return myTempStr;\n}\n";
  return["readStringUntil(&"+a+",'"+b+"').c_str()",Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.sd_file_read_line=function(){
  var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  Blockly.Arduino.definitions_.define_sd_file_read_until_invoke="String readStringUntil(File *filePtr,char myChar){\n  String myTempStr=\"\";\n  char nowRead;\n  if (filePtr->available()){\n    nowRead=filePtr->read();\n    while(nowRead!=myChar){\n      if (myChar!='\\n'){\n        if(nowRead!='\\n'){\n          myTempStr+=nowRead;\n        } else{\n          break;\n        }\n      } else {\n        myTempStr+=nowRead;\n      }\n      if (filePtr->available())\n        nowRead=filePtr->read();\n      else\n        break;\n    }\n  }\n  return myTempStr;\n}\n";
  return["readStringUntil(&"+a+",'\\n').c_str()",Blockly.Arduino.ORDER_ATOMIC];
}