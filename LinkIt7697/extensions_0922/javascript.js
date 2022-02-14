Blockly.Arduino.finish=function(a){
  if (Blockly.Arduino.probbie_type=="Tobbie")
    if (Blockly.Arduino.definitions_.define_linkit_wifi_include!=null)
     Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <WiFi.h>";
	var myStr="";
	if (Blockly.Arduino.definitions_.define_mqtt_include=="#include <PubSubClient.h>")
		myStr="  myClient.loop();\n";
	if (Blockly.Arduino.webserver.webserver_exist=="yes"){
    Blockly.Arduino.webserver.webserver_header=Blockly.Arduino.webserver.webserver_header.replace("#title#",Blockly.Arduino.webserver.webserver_myTitle);
    Blockly.Arduino.webserver.webserver_header=Blockly.Arduino.webserver.webserver_header.replace("#color#",Blockly.Arduino.webserver.webserver_myColor);
		myStr=myStr+"  checkWebClient();\n";
  }
	a="  "+a.replace(/\n/g,"\n");
	a=a.replace(/\n\s+$/,"\n");
	a="void loop() \n{\n"+myStr+a+"\n}";
	a=a.replace("  if (myBtnStatus=='","  myBtnStatus=getBtnStatus();\n  if (myBtnStatus=='");
	var b=[],c=[],f=[];
	for(e in Blockly.Arduino.definitions_){
		var d=Blockly.Arduino.definitions_[e];
    if (e.indexOf("_event")>0)
      f.push(d);
    else{
      (d.match(/^#include/)||d.match(/^#define/))?b.push(d):c.push(d);
    }
	}
	d=[];
	for(e in Blockly.Arduino.setups_){
		Blockly.Arduino.setups_[e]=Blockly.Arduino.setups_[e].replace("if (myBtnStatus=='","myBtnStatus=getBtnStatus();\n  if (myBtnStatus=='");
		d.push(Blockly.Arduino.setups_[e]);
	}
	var e=new Date((new Date).getTime());
	b=b.join("\n")+"\n\n"+c.join("\n")+"\n"+f.join("\n")+"\n\nvoid setup() \n{\n  "+d.join("\n  ")+"\n}\n\n";
	b=b.replace(/\n\n+/g,"\n\n").replace(/\n*$/,"\n\n\n")+a;
	Blockly.Arduino.mqtt_exist="no";
	b="/*\n * Generated using BlocklyDuino:\n *\n * https://github.com/MediaTek-Labs/BlocklyDuino-for-LinkIt\n *\n * Date: "+e.toUTCString()+"\n */\n"+"/*  部份程式由吉哥積木產生  */\n/*  https://sites.google.com/jes.mlc.edu.tw/ljj/linkit7697  */\n"+b
  if (Blockly.Arduino.webserver.webserver_exist=="yes"){
    b=b+Blockly.Arduino.webserver.webserver_header+Blockly.Arduino.webserver.webserver_body+Blockly.Arduino.webserver.webserver_footer;
    Blockly.Arduino.webserver.webserver_exist="no";
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
	Blockly.Arduino.mqtt_callback_header='void mqttCallback(char* topic, byte* payload, unsigned int length){\n  receivedTopic=String(topic);\n  receivedMsg="";\n  for (unsigned int myIndex = 0; myIndex < length; myIndex++)\n  {\n      receivedMsg += (char)payload[myIndex];\n  }\n  receivedMsg.trim();\n';
	Blockly.Arduino.mqtt_callback_body='';
	Blockly.Arduino.mqtt_callback_footer='\n}\n';
	Blockly.Arduino.definitions_.define_mqtt_connect_mqtt_event='void connectMQTT(){\n  while (!myClient.connected()){\n    if (!myClient.connect(MQTT_ID,MQTT_USERNAME,MQTT_PASSWORD))\n    {\n      delay(5000);\n    }\n  }\n}\n';
  Blockly.Arduino.definitions_.define_mqtt_receivedMsg_event=Blockly.Arduino.mqtt_callback_header+Blockly.Arduino.mqtt_callback_body+Blockly.Arduino.mqtt_callback_footer;
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
  Blockly.Arduino.definitions_.define_mqtt_receivedMsg_event=Blockly.Arduino.mqtt_callback_header+Blockly.Arduino.statementToCode(this,"MSG_TOPIC_EQAL")+Blockly.Arduino.mqtt_callback_footer;
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
  Blockly.Arduino.definitions_.define_thingspeak_invoke="int thingSpeakRec=0;";
  if (Blockly.Arduino.my_board_type=="7697")
	  Blockly.Arduino.definitions_.define_thingspeak_event='void invokeThingSpeak(const String& key, const String& p1, const String& p2, const String& p3, const String& p4, const String& p5, const String& p6, const String& p7, const String& p8)\n{\n  static WiFiClient client;\n  if (client.connect("api.thingspeak.com", 80)) {\n    const String payload = String() + "{\\"api_key\\":\\"" + key\n                          + "\\",\\"field1\\":\\"" + p1\n                          + "\\",\\"field2\\":\\"" + p2\n                          + "\\",\\"field3\\":\\"" + p3\n                          + "\\",\\"field4\\":\\"" + p4\n                          + "\\",\\"field5\\":\\"" + p5\n                          + "\\",\\"field6\\":\\"" + p6\n                          + "\\",\\"field7\\":\\"" + p7\n                          + "\\",\\"field8\\":\\"" + p8\n                          + "\\"}";\n      const String url = String() + "http://api.thingspeak.com/update";\n      client.println(String() + "POST " + url + " HTTP/1.1");\n      client.println("Host: api.thingspeak.com");\n      client.println("User-Agent: BlocklyDuino/1.0");\n      client.println("Content-Type: application/json;charset=utf-8");\n      client.print("Content-Length: ");\n      client.println(payload.length());\n      client.println("User-Agent: BlocklyDuino/1.0");\n      client.println("Accept: */*");\n      client.println("Connection: close");\n      client.println();\n      client.print(payload);\n      client.println();\n      String nLine="";\n      int lineNumber=0;\n      while (client.connected()) {\n        nLine = client.readStringUntil(\'\\n\');\n        lineNumber=nLine.toInt();\n        if (lineNumber!=0){\n          thingSpeakRec=lineNumber;\n          break;\n        }\n      }\n  } else {\n    thingSpeakRec=0;\n  }\n  client.stop();\n}\n';
  else {
    Blockly.Arduino.definitions_.define_HTTPCLIENT_include='#include <HTTPClient.h>';
    Blockly.Arduino.definitions_.define_thingspeak_event='\nvoid invokeThingSpeak(const String& key, const String& p1, const String& p2, const String& p3, const String& p4, const String& p5, const String& p6, const String& p7, const String& p8)\n{\n  static HTTPClient client;\n  client.begin("http://api.thingspeak.com/update");\n  client.addHeader("Content-Type", "application/json");\n  const String payload = String() + "{\\"api_key\\":\\"" + key\n                        + "\\",\\"field1\\":\\"" + p1\n                        + "\\",\\"field2\\":\\"" + p2\n                        + "\\",\\"field3\\":\\"" + p3\n                        + "\\",\\"field4\\":\\"" + p4\n                        + "\\",\\"field5\\":\\"" + p5\n                        + "\\",\\"field6\\":\\"" + p6\n                        + "\\",\\"field7\\":\\"" + p7\n                        + "\\",\\"field8\\":\\"" + p8\n                        + "\\"}";\n  int postCode=client.POST(payload);\n  if (postCode==200)\n    thingSpeakRec=client.getString().toInt();\n  else\n    thingSpeakRec=0;\n  client.end();\n}\n';
  }
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

Blockly.Arduino.things_get_rec=function(){
  return['thingSpeakRec',Blockly.Arduino.ORDER_ATOMIC];
}


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

Blockly.Arduino.mp3_set_pins_esp32=function(){
	var a=Blockly.Arduino.valueToCode(this,"RX_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
	    b=Blockly.Arduino.valueToCode(this,"TX_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_mp3_include='#include <DFRobotDFPlayerMini.h>\n';
  Blockly.Arduino.definitions_["mp3_serial"]='HardwareSerial mp3Serial(2);';
	Blockly.Arduino.definitions_["mp3_dfplayer"]='DFRobotDFPlayerMini myDFPlayer;';
	Blockly.Arduino.setups_["setup_mp3_"]="mp3Serial.begin(9600,SERIAL_8N1,"+a+","+b+");\n  myDFPlayer.begin(mp3Serial);\n";
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

Blockly.Arduino.create_custom_array=function(){
	var a=Blockly.Arduino.valueToCode(this,"MY_VAR",Blockly.Arduino.ORDER_ATOMIC);
  a='{'+a+'}';
  a=a.replace('{"','{');
  a=a.replace('"}','}');
	return[a,Blockly.Arduino.ORDER_ATOMIC]
};


//KSB045
Blockly.Arduino.ksb045={};

Blockly.Arduino.ksb045_init=function(){
  var a=this.getFieldValue("TYPE");
  Blockly.Arduino.ksb045.board_type=a;
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
    if (Blockly.Arduino.ksb045.board_type=="KSB045")
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 32\n#define padY 33\n#define padSW 27\n#define padA 14\n#define padB 25\n#define padC 23\n#define padD 19\n#define padE 18\n#define padF 15\n#define padBuz 26\n#define padMotor 5\n';
    else if (Blockly.Arduino.ksb045.board_type=="waveshare")
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 33\n#define padY 32\n#define padSW 27\n#define padA 14\n#define padB 25\n#define padC 23\n#define padD 19\n#define padE 18\n#define padF 15\n#define padBuz 26\n#define padMotor 5\n';
    else if (Blockly.Arduino.ksb045.board_type=="Joystick:bit")
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 33\n#define padY 32\n#define padSW 27\n#define padA 14\n#define padB 25\n#define padC 15\n#define padD 18\n#define padE 19\n#define padF 23\n#define padBuz 26\n#define padMotor 5\n';
    Blockly.Arduino.setups_["esp32_tone1"]="tone(padBuz,255,0,0);\n  delay(1);\n  noTone(padBuz,0);\n";
  } else if (Blockly.Arduino.my_board_type=="7697"){
    if (Blockly.Arduino.ksb045.board_type=="KSB045")
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 16\n#define padY 15\n#define padSW 17\n#define padA 0\n#define padB 7\n#define padC 11\n#define padD 12\n#define padE 13\n#define padF 4\n#define padBuz 14\n#define padMotor 10\n';
    else if (Blockly.Arduino.ksb045.board_type=="waveshare") 
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 15\n#define padY 16\n#define padSW 17\n#define padA 0\n#define padB 7\n#define padC 11\n#define padD 12\n#define padE 13\n#define padF 4\n#define padBuz 14\n#define padMotor 10\n';
    else if (Blockly.Arduino.ksb045.board_type=="Joystick:bit")
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 15\n#define padY 16\n#define padSW 17\n#define padA 0\n#define padB 7\n#define padC 4\n#define padD 13\n#define padE 12\n#define padF 11\n#define padBuz 14\n#define padMotor 10\n';
  }
  Blockly.Arduino.definitions_.define_ksb045_mid_xy="int padMidX=0;\nint padMidY=0;\n";
  if (Blockly.Arduino.ksb045.board_type=="KSB045"){
    Blockly.Arduino.definitions_.define_ksb045_button='bool checkPinPressed(byte myPin)\n{\n  if (digitalRead(myPin) == 1)\n    return false;\n  else\n    return true;\n}\n';
    Blockly.Arduino.setups_.setup_ksb045_button='pinMode(padX, INPUT);\n  pinMode(padY, INPUT);\n  pinMode(padSW, INPUT);\n  pinMode(padA, INPUT);\n  pinMode(padB, INPUT);\n  pinMode(padC, INPUT);\n  pinMode(padD, INPUT);\n  pinMode(padE, INPUT);\n  pinMode(padF, INPUT);\n  pinMode(padMotor, OUTPUT);\n  digitalWrite(padMotor,0);\n  delay(300);\n  padMidX=(4095-analogRead(padX));\n  padMidY=analogRead(padY);\n';
  } else if (Blockly.Arduino.ksb045.board_type=="Joystick:bit"){
    Blockly.Arduino.definitions_.define_ksb045_button='bool checkPinPressed(byte myPin)\n{\n  if (digitalRead(myPin) == 1)\n    return false;\n  else\n    return true;\n}\n';
    Blockly.Arduino.setups_.setup_ksb045_button='pinMode(padX, INPUT);\n  pinMode(padY, INPUT);\n  pinMode(padSW, INPUT);\n  pinMode(padA, INPUT);\n  pinMode(padB, INPUT);\n  pinMode(padC, INPUT_PULLUP);\n  pinMode(padD, INPUT_PULLUP);\n  pinMode(padE, INPUT_PULLUP);\n  pinMode(padF, INPUT_PULLUP);\n  pinMode(padMotor, OUTPUT);\n  digitalWrite(padMotor,1);\n  delay(300);\n  padMidX=(4095-analogRead(padX));\n  padMidY=(4095-analogRead(padY));\n';
  } else if (Blockly.Arduino.ksb045.board_type=="waveshare"){
    Blockly.Arduino.definitions_.define_ksb045_button='bool checkPinPressed(byte myPin)\n{\n  if (digitalRead(myPin) == 1)\n    return false;\n  else\n    return true;\n}\n';
    Blockly.Arduino.setups_.setup_ksb045_button='pinMode(padX, INPUT);\n  pinMode(padY, INPUT);\n  pinMode(padSW, INPUT);\n  pinMode(padA, INPUT);\n  pinMode(padB, INPUT);\n  pinMode(padC, INPUT);\n  pinMode(padD, INPUT);\n  pinMode(padE, INPUT);\n  pinMode(padF, INPUT);\n  pinMode(padMotor, OUTPUT);\n  digitalWrite(padMotor,0);\n  delay(300);\n  padMidX=analogRead(padX);\n  padMidY=analogRead(padY);\n';
  }
  return'';
};


Blockly.Arduino.ksb045_button=function(){
  var a=this.getFieldValue("BUTTON"),
	b=Blockly.Arduino.statementToCode(this,"KSB045_BUTTON_CALL"),
  c=Blockly.Arduino.ksb045.board_type;
	//b=b.replace(/\n /g,'\n  ');
  return"if (checkPinPressed(pad"+a+")){\n"+b+"  while(checkPinPressed(pad"+a+")){}\n}\n";
};

Blockly.Arduino.ksb045_xy=function(){
  var a=Blockly.Arduino.ksb045.board_type,
      b=this.getFieldValue("XY"),
      xyPin='padX';;
  if (a=="KSB045"){
    if (b=="X")
      xyPin='(4095-analogRead(padX))';
    else
      xyPin='analogRead(padY)';
  } else if (a=="Joystick:bit"){
    xyPin='(4095-analogRead(pad'+b+'))';  
  } else{
    xyPin='analogRead(pad'+b+')';
  }
  return[xyPin,Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ksb045_mid_xy=function(){
  var a=Blockly.Arduino.ksb045.board_type,
      b=this.getFieldValue("XY");
  return['padMid'+b,Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ksb045_vibration=function(){
  var a=this.getFieldValue("STAT"),
      b=Blockly.Arduino.ksb045.board_type;
  if (b=="Joystick:bit"){
    if (a=="1"){
      a="0";
    } else if (a=="0"){
      a="1";
    }
  }
  return'digitalWrite(padMotor,'+a+');\n';
}

Blockly.Arduino.ksb045_tone=function(){
  var a=this.getFieldValue("FREQ");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    return'tone(padBuz,'+a+',0,0);\n';
  } else {
    return"tone(padBuz, "+a+");\n"
  }
};
Blockly.Arduino.ksb045_no_tone=function(){
  if (Blockly.Arduino.my_board_type=="ESP32"){
    return'noTone(padBuz,0);\n';
  } else {
    return"noTone(padBuz);\n";
  }
};

Blockly.Arduino.ksb045_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||0,
      b=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||0;
  if (Blockly.Arduino.my_board_type=="ESP32"){
    return'tone(padBuz,'+a+','+b+',0);\n';
  } else {
    return"tone(padBuz, "+a+", "+b+");\n"
  }
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
	Blockly.Arduino.setups_.setup_neopixel_brightness="pixels.setBrightness("+c+");\npixels.show();\n";
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
	Blockly.Arduino.definitions_.define_fetch_aqi_invoke='void esp8266FetchAQIInfo(String mySiteName)\n{\n  mySiteName="\\"SiteName\\":\\""+mySiteName;\n  String line;\n  static WiFiClient client;\n  client.setTimeout(10000);\n  if (!client.connect("opendata2.epa.gov.tw", 80)) {\n    return;\n  }\n  const String url = String() + "/AQI.json";\n  client.println("GET " + url + " HTTP/1.1");\n  client.println(F("Host: opendata2.epa.gov.tw"));\n  client.println(F("Accept: */*"));\n  client.println(F("Connection: close"));\n  if (client.println() == 0) {\n    return;\n  }\n  char status[32] = {0};\n  client.readBytesUntil(\'\\r\', status, sizeof(status));\n  if (strcmp(status, "HTTP/1.1 200 OK") != 0) {\n    return;\n  }\n  char endOfHeaders[] = "\\r\\n\\r\\n";\n  if (!client.find(endOfHeaders)) {\n    return;\n  }\n  while(client.connected()){\n    line=client.readStringUntil(\'{\');\n    line.replace("[","");\n    if (line!="" && line.indexOf(mySiteName)>-1){\n      line="{"+line;\n      line.replace("]","");\n      line.replace("},","}");\n      DeserializationError error = deserializeJson(doc_aqi, line);\n      if (error) {\n        return;\n      }\n      break;\n    }\n  }\n  client.stop();\n}\n';
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
  Blockly.Arduino.definitions_.define_u8g2_oled_declare="U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, /* reset=*/ U8X8_PIN_NONE);\nint clock_center_x=64;\nint clock_center_y=32;";
  Blockly.Arduino.setups_.setup_define_u8g2_oled="u8g2.begin();\n  u8g2.enableUTF8Print();\n  u8g2.setFont(u8g2_font_6x10_tf);\n  u8g2.setFontRefHeightExtendedText();\n  u8g2.setDrawColor(1);\n  u8g2.setFontPosTop();\n  u8g2.setFontDirection(0);\n";
  return"";
}

Blockly.Arduino.oled_display_rotation=function(){
  var a=this.getFieldValue("ROTATION_MODE");
  return'u8g2.setDisplayRotation('+a+');\nclock_center_x=u8g2.getWidth()/2;\nclock_center_y=u8g2.getHeight()/2;\n';
};

Blockly.Arduino.oled_display_flip=function(){
  var a=this.getFieldValue("FLIP_MODE");
  return'u8g2.setFlipMode('+a+');\nclock_center_x=u8g2.getWidth()/2;\nclock_center_y=u8g2.getHeight()/2;\n';
};

Blockly.Arduino.oled_display_font_direction=function(){
  var a=this.getFieldValue("FONT_DIR");
  return'u8g2.setFontDirection('+a+');\n';
};

Blockly.Arduino.oled_display_show_xbm=function(){
    var a=Blockly.Arduino.valueToCode(this,"XBM",Blockly.Arduino.ORDER_ATOMIC)||"";
    Blockly.Arduino.definitions_.define_xbm_include="#include \"StringSplitter.h\"";
	  Blockly.Arduino.definitions_.define_showXBM="void showXBM(String myXBM,unsigned char *myBitMap){\n    myXBM.replace(\" \",\"\");\n    myXBM.replace(\"\\r\",\"\");\n    myXBM.replace(\"\\n\",\"\");\n    StringSplitter *splitter = new StringSplitter(myXBM, ',', 1024);\n    for(int i = 0; i < 1024; i++){\n      myBitMap[i]= 0;\n    }\n    for(int i = 0; i < splitter->getItemCount(); i++){\n      splitter->getItemAtIndex(i)=\"0x\"+splitter->getItemAtIndex(i);\n      myBitMap[i]= strtol(splitter->getItemAtIndex(i).c_str(), 0, 16);       \n    }\n    delete splitter;\n}\n";
    return'unsigned char xBitMap[1024];\nshowXBM('+a+',xBitMap);\nu8g2.clearBuffer();\nu8g2.drawXBMP(0, 0, 128, 64, xBitMap);\n';
};

Blockly.Arduino.oled_display_set_chinese_font=function(){
  return'u8g2.setFont(u8g2_font_unifont_t_chinese1);\n'
};

Blockly.Arduino.oled_display_set_alphabet_font=function(){
  var a=Blockly.Arduino.valueToCode(this,"FONT",Blockly.Arduino.ORDER_NONE)||"";
  a=a.replace(/\"/g,"");
  return"u8g2.setFont("+a+");\n";
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
    Blockly.Arduino.definitions_.define_runClock_invoke='const float pi = 3.14159267 ;\nint x_old;\nint y_old;\nint x_new;\nint y_new;\n\nvoid draw_second(int second){\n   y_old= (24*cos(pi-(2*pi)/60*second))+clock_center_y;\n   x_old =(24*sin(pi-(2*pi)/60*second))+clock_center_x;\n   u8g2.drawCircle(x_old, y_old, 2); \n}\n\nvoid draw_hour(int hour, int minute){\n   y_old= (18*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y;\n   x_old =(18*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x;\n   y_new=(18*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y+1;\n   x_new=(18*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x+1;\n   u8g2.drawLine(clock_center_x,clock_center_y,x_old,y_old);\n   u8g2.drawLine(clock_center_x+1,clock_center_y+1,x_new,y_new);\n}\n\nvoid draw_minute(int minute){\n   y_old= (24*cos(pi-(2*pi)/60*minute))+clock_center_y;\n   x_old =(24*sin(pi-(2*pi)/60*minute))+clock_center_x;\n   u8g2.drawLine(clock_center_x,clock_center_y,x_old,y_old);\n}\n\nvoid draw_clock_face(void){\n  u8g2.drawDisc(clock_center_x, clock_center_y,3);\n  for (int i=0;i<12;i++){\n     y_old= (32*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_old =(32*sin(pi-(2*pi)/12*i))+clock_center_x;\n     y_new= (28*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_new =(28*sin(pi-(2*pi)/12*i))+clock_center_x;\n     u8g2.drawLine(x_new,y_new,x_old,y_old);\n  }\n  u8g2.setCursor(clock_center_x-3,clock_center_y-32);\n  u8g2.setFont(u8g2_font_6x10_tf);\n  u8g2.println("12");\n}\n\nvoid runClock(){\n  draw_clock_face();\n  draw_second(get_data_from_RTC(5));\n  draw_minute(get_data_from_RTC(4));\n  draw_hour(get_data_from_RTC(3),get_data_from_RTC(4));\n}\n'
  }else if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_runClock_invoke='const float pi = 3.14159267 ;\nint x_old;\nint y_old;\nint x_new;\nint y_new;\n\nvoid draw_second(int second){\n   y_old= (24*cos(pi-(2*pi)/60*second))+clock_center_y;\n   x_old =(24*sin(pi-(2*pi)/60*second))+clock_center_x;\n   u8g2.drawCircle(x_old, y_old, 2); \n}\n\nvoid draw_hour(int hour, int minute){\n   y_old= (18*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y;\n   x_old =(18*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x;\n   y_new=(18*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y+1;\n   x_new=(18*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x+1;\n   u8g2.drawLine(clock_center_x,clock_center_y,x_old,y_old);\n   u8g2.drawLine(clock_center_x+1,clock_center_y+1,x_new,y_new);\n}\n\nvoid draw_minute(int minute){\n   y_old= (24*cos(pi-(2*pi)/60*minute))+clock_center_y;\n   x_old =(24*sin(pi-(2*pi)/60*minute))+clock_center_x;\n   u8g2.drawLine(clock_center_x,clock_center_y,x_old,y_old);\n}\n\nvoid draw_clock_face(void){\n  u8g2.drawDisc(clock_center_x, clock_center_y,3);\n  for (int i=0;i<12;i++){\n     y_old= (32*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_old =(32*sin(pi-(2*pi)/12*i))+clock_center_x;\n     y_new= (28*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_new =(28*sin(pi-(2*pi)/12*i))+clock_center_x;\n     u8g2.drawLine(x_new,y_new,x_old,y_old);\n  }\n  u8g2.setCursor(clock_center_x-3,clock_center_y-32);\n  u8g2.setFont(u8g2_font_6x10_tf);\n  u8g2.println("12");\n}\n\nvoid runClock(){\n  draw_clock_face();\n  LRTC.get();\n  draw_second(LRTC.second());\n  draw_minute(LRTC.minute());\n  draw_hour(LRTC.hour(),LRTC.minute());\n}\n'
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

Blockly.Arduino.oled_display_draw_chart=function(){
  var a=Blockly.Arduino.valueToCode(this,"INPUT",Blockly.Arduino.ORDER_NONE)||"0",
      b=Blockly.Arduino.valueToCode(this,"MIN",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"MAX",Blockly.Arduino.ORDER_NONE)||"0",
      d=this.getFieldValue("CHART_TYPE"),
      e=this.getFieldValue("DIR_TYPE"),
      f=Blockly.Arduino.statementToCode(this,"EXTRA");
  f=f.replace("  ","");
  f=f.replace(/\n  /g,"\n");
  Blockly.Arduino.definitions_.define_oled_chartNumList_invoke="int chartNumList[128]={-1};\n";
  Blockly.Arduino.definitions_.define_oled_drawChart_invoke='void drawChart(U8G2_SSD1306_128X64_NONAME_F_HW_I2C *myOled,int myNumList[],byte chartType=0,byte dirType=0)\n{\n  byte myWidth=myOled->getWidth(),myHeight=myOled->getHeight();\n  myOled->setDrawColor(0);\n  myOled->drawBox(0, 0, myWidth, myHeight);\n  myOled->setDrawColor(1);\n  for (int i = 0; i < ((chartType==0)?(myWidth-1):myWidth) ; i++) {\n    if ((myNumList[i]) >-1 && (myNumList[i + 1]) >-1) {\n      switch(chartType){\n        case 0:\n          if (dirType==0)\n            myOled->drawLine(i, myNumList[i], i + 1, myNumList[i + 1]);\n          else\n            myOled->drawLine(myWidth-1-i, myNumList[i], myWidth-2 -i, myNumList[i + 1]);\n          break;\n        case 1:\n          if (dirType==0)\n            myOled->drawLine(i, myHeight-1, i, myNumList[i]);\n          else\n            myOled->drawLine(myWidth-1-i, myHeight-1, myWidth-1-i, myNumList[i]);\n          break;\n      }\n    }\n  }\n  for (int i = 0; i < (myWidth-1); i++) {\n    myNumList[i] = (myNumList[i + 1]);\n  }\n}\nvoid clearChart()\n{\n  for(int i=0;i<(sizeof(chartNumList)/sizeof(chartNumList[0]));i++)\n   chartNumList[i]=-1;\n}\n';
  Blockly.Arduino.setups_.setup_define_u8g2_oled_chart='clearChart();\n';
  return'chartNumList[u8g2.getWidth()-1] = (map('+a+','+b+','+c+',u8g2.getHeight()-1,0));\ndrawChart(&u8g2,chartNumList,'+d+','+e+');\n'+f+'u8g2.sendBuffer();\n';
};

Blockly.Arduino.oled_display_clear_chart=function(){
  return'clearChart();\n';
}

Blockly.Arduino.oled_display_draw_qr=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=this.getFieldValue("SIZE"),
  d=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_NONE)||'""';
  if (Blockly.Arduino.definitions_.define_u8g2_oled_include)
    Blockly.Arduino.definitions_.define_u8g2_oled_include+='\n#include \"qrcode.h\"';
  Blockly.Arduino.definitions_.define_oled_draw_QR_invoke='void drawQRcode(U8G2_SSD1306_128X64_NONAME_F_HW_I2C *myOled,int myX,int myY, byte myVersion,String myData,byte border)\n{\n    QRCode qrcode;\n    uint8_t qrcodeData[qrcode_getBufferSize(myVersion)];\n    qrcode_initText(&qrcode, qrcodeData,myVersion , 0, myData.c_str());\n    myOled->setDrawColor(1);\n    myOled->drawBox(myX,myY,qrcode.size+border*2,qrcode.size+border*2);\n    myOled->setDrawColor(0);\n    myX+=border;\n    myY+=border;\n    myOled->drawBox(myX,myY,qrcode.size,qrcode.size);\n    myOled->setDrawColor(1);\n    for (uint8_t y = 0; y < qrcode.size; y++) {\n        for (uint8_t x = 0; x < qrcode.size; x++) {\n          if (!qrcode_getModule(&qrcode, x, y))\n            myOled->drawPixel(x+myX,y+myY);\n        }\n    }\n}\n';
  return'drawQRcode(&u8g2,'+a+','+b+','+c+','+d+',3);\n';
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
  Blockly.Arduino.definitions_.define_broadcast_send_event="\nvoid sendBroadcastUDP(const char* myMessage){\n  IPAddress broadcastIP(WiFi.localIP()[0],WiFi.localIP()[1],WiFi.localIP()[2],255);\n  castUdp.beginPacket(broadcastIP,UDP_LISTEN_PORT);\n  for (int myi = 0; myi < strlen(myMessage); myi++)\n  {\n    castUdp.write(myMessage[myi]);\n  }\n  castUdp.endPacket();\n}\n";
	//Blockly.Arduino.broadcast_udp.defineFunction.broadcast_send="\nvoid sendBroadcastUDP(const char* myMessage){\n  IPAddress broadcastIP(WiFi.localIP()[0],WiFi.localIP()[1],WiFi.localIP()[2],255);\n  castUdp.beginPacket(broadcastIP,UDP_LISTEN_PORT);\n  castUdp.write(myMessage);\n  castUdp.endPacket();\n}\n";
  Blockly.Arduino.definitions_.define_broadcast_check1_event="\nvoid myCheckUDP(){\n}\n";
  Blockly.Arduino.definitions_.define_broadcast_check2_event="\nvoid checkBroadcastUDP(){\n  int packetSize = castUdp.parsePacket();\n  if (packetSize) {\n    int len = castUdp.read(broadcastBuffer, UDP_BUFFER_SIZE);\n    if (len > 0) {\n      broadcastBuffer[len] = 0;\n      myCheckUDP();\n    }\n  }\n}\n";
  return"castUdp.begin(UDP_LISTEN_PORT);\n"
};

Blockly.Arduino.broadcast_udp_check_msg=function(){
  return'checkBroadcastUDP();\n';
};


Blockly.Arduino.broadcast_udp_send=function(){
	var a=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'sendBroadcastUDP(String('+a+').c_str());\n';
};

Blockly.Arduino.broadcast_udp_received_event=function(){
  var a=Blockly.Arduino.statementToCode(this,"MSG_UDP");
  a=a.replace(/\n  /g,"\n  ");
  Blockly.Arduino.definitions_.define_broadcast_check1_event="void myCheckUDP(){\n"+a+"}\n";
  return'';
}

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

Blockly.Arduino.esp32_touched=function(){
  var a=this.getFieldValue("TOUCH_PIN"),
      b=Blockly.Arduino.statementToCode(this,"TOUCHED");
  return'if (touchRead('+a+')<30){\n'+b+'  while(touchRead('+a+')<30){}\n  delay(100);\n}\n';
}

Blockly.Arduino.esp32_core_task=function(){
  var a=Blockly.Arduino.valueToCode(this,"TASK_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.statementToCode(this,"SETUP"),
      c=Blockly.Arduino.statementToCode(this,"LOOP");
  a=a.replace(/\"/g,"");
  if (Blockly.Arduino.definitions_.define_dual_core_declaire!=undefined){
    if (Blockly.Arduino.definitions_.define_dual_core_declaire.indexOf(a)<0)
      Blockly.Arduino.definitions_.define_dual_core_declaire=Blockly.Arduino.definitions_.define_dual_core_declaire+'TaskHandle_t '+a+';\n';
  }
  else
    Blockly.Arduino.definitions_.define_dual_core_declaire='TaskHandle_t '+a+';\n';
  c='  '+c.replace(/\n  /g,"\n    ");
  Blockly.Arduino.definitions_["define_dual_core_"+a]='void '+a+'_code( void * pvParameters )\n{\n'+b+'  while(true){\n'+c+'  }\n}\n';
  return'';
}

Blockly.Arduino.esp32_core_run=function(){
  var a=Blockly.Arduino.valueToCode(this,"TASK_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"STACK",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"PRIORITY",Blockly.Arduino.ORDER_ATOMIC)||"0",
      d=this.getFieldValue("CORE");
  a=a.replace(/\"/g,"");
  return'xTaskCreatePinnedToCore('+a+'_code,"'+a+'",'+b+',NULL,'+c+',&'+a+','+d+');\n';
}

Blockly.Arduino.esp32_core_stop=function(){
  var a=Blockly.Arduino.valueToCode(this,"TASK_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  return'vTaskDelete('+a+');\n';
}

Blockly.Arduino.esp32_core_num=function(){
  return["xPortGetCoreID()",Blockly.Arduino.ORDER_ATOMIC];
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

Blockly.Arduino.pocketcard_pinMap_ez=function(){
  var a=this.getFieldValue("EZ_PIN");
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

Blockly.Arduino.pocketcard_rgb_type=function(){
  var a=this.getFieldValue("PIXEL_FORMAT");
  Blockly.Arduino.pocketcard.rgb_format=a;
	Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>\n";
	Blockly.Arduino.definitions_.define_pocket_neopixel='Adafruit_NeoPixel pocketCardPixels = Adafruit_NeoPixel(1,12,NEO_'+a+' + NEO_KHZ800);\n';
  Blockly.Arduino.setups_.setup_pocket_neopixel="pocketCardPixels.begin();\n";
  return'';  
};

Blockly.Arduino.pocketcard_pixels_brightness=function(){
  var a=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"0";
	Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>\n";
  if (Blockly.Arduino.definitions_.define_pocket_neopixel==undefined)
    Blockly.Arduino.definitions_.define_pocket_neopixel='Adafruit_NeoPixel pocketCardPixels = Adafruit_NeoPixel(1,12,NEO_RGB + NEO_KHZ800);\n';
  Blockly.Arduino.setups_.setup_pocket_neopixel="pocketCardPixels.begin();\n";  
  return'pocketCardPixels.setBrightness('+a+');\npocketCardPixels.show();\n';
};

Blockly.Arduino.pocketcard_rgb_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"0";
	//a=a.replace(/\"/g,"");
  a=a.replace("tft.color565","pocketCardPixels.Color");
	Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>\n";
  if (Blockly.Arduino.definitions_.define_pocket_neopixel==undefined)
    Blockly.Arduino.definitions_.define_pocket_neopixel='Adafruit_NeoPixel pocketCardPixels = Adafruit_NeoPixel(1,12,NEO_RGB + NEO_KHZ800);\n';
  Blockly.Arduino.setups_.setup_pocket_neopixel="pocketCardPixels.begin();\n"; 
  return 'pocketCardPixels.setBrightness('+b+');\npocketCardPixels.show();\npocketCardPixels.setPixelColor(0,'+a+');\npocketCardPixels.show();\n';
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
  Blockly.Arduino.definitions_.define_msa301="#include <Adafruit_MSA301.h>\n#include <Adafruit_Sensor.h>\nAdafruit_MSA301 msa;\nsensors_event_t eventAccel;\nuint8_t motionstat;\ndouble pitch,roll,yaw;\n";
  Blockly.Arduino.definitions_.define_msa301_pitch_roll='void calcMSA301angle(){\n   pitch = atan2 (eventAccel.acceleration.y ,( sqrt ((eventAccel.acceleration.x * eventAccel.acceleration.y) + (eventAccel.acceleration.z * eventAccel.acceleration.z))))*(-57.3);\n   roll = atan2(eventAccel.acceleration.x ,( sqrt((eventAccel.acceleration.y * eventAccel.acceleration.y) + (eventAccel.acceleration.z * eventAccel.acceleration.z))))*(-57.3);\n   if (pitch!=pitch)\n   {\n      if (eventAccel.acceleration.y>0)\n        pitch=-90;\n      else if (eventAccel.acceleration.y<0)\n        pitch=90;\n   }\n}\n';
  Blockly.Arduino.setups_.setup_msa_accel='msa.begin();\n  msa.setRange('+a+');';
	return""
};

Blockly.Arduino.msa301_accel_fetch=function(){
	return"msa.getEvent(&eventAccel);\ncalcMSA301angle();\n";
};

Blockly.Arduino.msa301_accel_3axis=function(){
  var a=this.getFieldValue("3AXIS_MODE");
  return['eventAccel.acceleration.'+a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.msa301_accel_pitch_roll=function(){
  var a=this.getFieldValue("PITCH_ROLL");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
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
  Blockly.Arduino.definitions_.define_urlencode_event="String URLEncode(const char* msg)\n{\n  const char *hex = \"0123456789abcdef\";\n  String encodedMsg = \"\";\n  while (*msg!='\\0'){\n      if( ('a' <= *msg && *msg <= 'z')\n              || ('A' <= *msg && *msg <= 'Z')\n              || ('0' <= *msg && *msg <= '9') ) {\n          encodedMsg += *msg;\n      } else {\n          encodedMsg += '%';\n          encodedMsg += hex[*msg >> 4];\n          encodedMsg += hex[*msg & 15];\n      }\n      msg++;\n  }\n  return encodedMsg;\n}\n";
  return'sheetId='+a+';\n';
};

Blockly.Arduino.setupForm=function(){
  var a=Blockly.Arduino.valueToCode(this,"sheetTag",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'sheetTag=URLEncode('+a+');\n';
};

Blockly.Arduino.sendToGoogle=function(){
  var a=this.getFieldValue("dateInclude");
  Blockly.Arduino.definitions_.define_send_sheet_event='void  sendToGoogleSheets(const String& dateInclude,const String& data)\n{\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  if (sheetClient.connect(host, 443)) {\n      const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=insert&dateInclude="+dateInclude+"&sheetId="+sheetId+"&sheetTag="+sheetTag+"&data="+data;\n      sheetClient.println("GET " + url + " HTTP/1.1");\n      sheetClient.println(String()+"Host: "+host);\n      sheetClient.println("Accept: */*");\n      sheetClient.println("Connection: close");\n      sheetClient.println();\n      sheetClient.println();\n      sheetClient.stop();\n  }\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_send_sheet_event=Blockly.Arduino.definitions_.define_send_sheet_event.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_send_sheet_event=Blockly.Arduino.definitions_.define_send_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
    }  
  }
  var c=Blockly.Arduino.valueToCode(this,"data",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'sendToGoogleSheets("'+a+'",URLEncode(('+c+').c_str()));\n'
};

Blockly.Arduino.getLastRow=function(){
  //Blockly.Arduino.definitions_.define_read_sheet_last_row_event='int getSheetLastRow(){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  while (!newUrl.startsWith("https:")){\n     if (!sheetClient.connect(host, 443)) {\n      return 0;\n    }\n    const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=getLastRow&sheetId="+sheetId+"&sheetTag="+sheetTag;\n    sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: keep-alive\\n\\n\\n");\n    while (sheetClient.connected()) {\n      newUrl = sheetClient.readStringUntil(\'\\n\');\n      if (newUrl.startsWith("Location: https://")) {\n        newUrl.replace("Location: ","");\n        break;\n      }\n    }\n  }\n  sheetClient.stop();\n  String jsonData ="";\n  String dataResult="";\n  while(!jsonData.startsWith("{")){\n    if (!sheetClient.connect(host, 443)) {\n      return 0;\n    }\n    sheetClient.print("GET " + newUrl + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: keep-alive\\n\\n\\n");\n    while (sheetClient.connected()) {\n      jsonData = sheetClient.readStringUntil(\'\\n\');\n      if (jsonData.startsWith("{")) {\n        dataResult=jsonData;\n        dataResult.replace("{\\"lastRow\\":","");\n        dataResult.replace("}","");\n        break;\n      }\n    }\n  }\n  sheetClient.stop();\n  return dataResult.toInt();\n}\n';
  Blockly.Arduino.definitions_.define_read_sheet_last_row_event='int getSheetLastRow(){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=getLastRow&sheetId="+sheetId+"&sheetTag="+sheetTag;\n  sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  while (!newUrl.startsWith("https:")){\n    newUrl = sheetClient.readStringUntil(\'\\n\');\n    if (newUrl.startsWith("Location: https://")) {\n      newUrl.replace("Location: ","");\n      break;\n    }\n  }\n  sheetClient.stop();\n  String jsonData ="";\n  String dataResult="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  sheetClient.print("GET " + newUrl + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  while(!jsonData.startsWith("{")){\n    jsonData = sheetClient.readStringUntil(\'\\n\');\n    if (jsonData.startsWith("{")) {\n      dataResult=jsonData;\n      dataResult.replace("{\\"lastRow\\":","");\n      dataResult.replace("}","");\n      break;\n    }\n  }\n  sheetClient.stop();\n  return dataResult.toInt();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_read_sheet_last_row_event=Blockly.Arduino.definitions_.define_read_sheet_last_row_event.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_read_sheet_last_row_event=Blockly.Arduino.definitions_.define_read_sheet_last_row_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
    }  
  }
  return['getSheetLastRow()',Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.fetchFromSheet=function(){
  var a=Blockly.Arduino.valueToCode(this,"beginCell",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"endCell",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_json_include="#define ARDUINOJSON_DECODE_UNICODE 1\n#include <ArduinoJson.h>";
  Blockly.Arduino.definitions_.define_sheet_json_doc_invoke='DynamicJsonDocument docSheet(2048);\n';
  //Blockly.Arduino.definitions_.define_read_sheet_invoke='void fetchFromSheet(const String& begin, const String& end){\n  static WiFiClientSecure sheetClient;\n  const char* host="script.google.com";\n  if (!sheetClient.connect(host, 443)) {\n    return;\n  }\n  const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=read&sheetId="+sheetId+"&sheetTag="+sheetTag+"&begin="+begin+"&end="+end;\n  sheetClient.println("GET " + url + " HTTP/1.1");\n  sheetClient.println(String()+"Host: "+host);\n  sheetClient.println("Accept: */*");\n  sheetClient.println("Connection: close");\n  sheetClient.println();\n  sheetClient.println();\n  String newUrl="";\n  while (sheetClient.connected()) {\n    newUrl = sheetClient.readStringUntil(\'\\n\');\n    if (newUrl.startsWith("The document has moved <A HREF=\\"")) {\n      newUrl.replace("The document has moved <A HREF=\\"","");\n      newUrl.replace("\\">here</A>.","");\n      newUrl.replace("amp;","");\n      break;\n    }\n  }\n  sheetClient.stop();\n  if (!sheetClient.connect(host, 443)) {\n    return;\n  }\n  sheetClient.println("GET " + newUrl + " HTTP/1.1");\n  sheetClient.println(String()+"Host: "+host);\n  sheetClient.println("Accept: */*");\n  sheetClient.println("Connection: close");\n  sheetClient.println();\n  sheetClient.println();\n  while (sheetClient.connected()) {\n    String line = sheetClient.readStringUntil(\'\\n\');\n    if (line.startsWith("{")) {\n      DeserializationError error = deserializeJson(docSheet, line);\n      break;\n    }\n  }\n  sheetClient.stop();\n}\n';
  //Blockly.Arduino.definitions_.define_read_sheet_event='void fetchFromSheet(const String& begin, const String& end){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  while (!newUrl.startsWith("https:")){\n     if (!sheetClient.connect(host, 443)) {\n      return;\n    }\n    const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=read&sheetId="+sheetId+"&sheetTag="+sheetTag+"&begin="+begin+"&end="+end;\n    sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n    while (sheetClient.connected()) {\n      newUrl = sheetClient.readStringUntil(\'\\n\');\n      if (newUrl.startsWith("Location: https://")) {\n        newUrl.replace("Location: ","");\n        break;\n      }\n    }\n  }\n  sheetClient.stop();\n  String jsonData ="";\n  while(!jsonData.startsWith("{")){\n    if (!sheetClient.connect(host, 443)) {\n      return;\n    }\n    sheetClient.print("GET " + newUrl + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n    while (sheetClient.connected()) {\n      jsonData = sheetClient.readStringUntil(\'\\n\');\n      if (jsonData.startsWith("{")) {\n        DeserializationError error = deserializeJson(docSheet, jsonData);\n        break;\n      }\n    }\n  }\n  sheetClient.stop();\n}\n';
  Blockly.Arduino.definitions_.define_read_sheet_event='void fetchFromSheet(const String& begin, const String& end){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=read&sheetId="+sheetId+"&sheetTag="+sheetTag+"&begin="+begin+"&end="+end;\n  sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  while (!newUrl.startsWith("https:")){\n    newUrl = sheetClient.readStringUntil(\'\\n\');\n    if (newUrl.startsWith("Location: https://")) {\n      newUrl.replace("Location: ","");\n      break;\n    }\n  }\n  sheetClient.stop();\n  String jsonData ="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  sheetClient.print("GET " + newUrl + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  while(!jsonData.startsWith("{")){\n    jsonData = sheetClient.readStringUntil(\'\\n\');\n    if (jsonData.startsWith("{")) {\n      DeserializationError error = deserializeJson(docSheet, jsonData);\n      break;\n    }\n  }\n  sheetClient.stop();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_read_sheet_event=Blockly.Arduino.definitions_.define_read_sheet_event.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_read_sheet_event=Blockly.Arduino.definitions_.define_read_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
    }  
  }
  return'fetchFromSheet('+a+','+b+');\n';
};

Blockly.Arduino.searchSheet=function(){
  var a=Blockly.Arduino.valueToCode(this,"Column",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"keyWord",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.toUpperCase();
  Blockly.Arduino.definitions_.define_json_include="#define ARDUINOJSON_DECODE_UNICODE 1\n#include <ArduinoJson.h>";
  Blockly.Arduino.definitions_.define_sheet_json_doc_invoke='DynamicJsonDocument docSheet(2048);\n';
  Blockly.Arduino.definitions_.define_search_sheet_event='void searchSheet(const String& fname, const String& sname){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=search&sheetId="+sheetId+"&sheetTag="+sheetTag+"&fname="+fname+"&sname="+sname;\n  sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  while (!newUrl.startsWith("https:")){\n    newUrl = sheetClient.readStringUntil(\'\\n\');\n    if (newUrl.startsWith("Location: https://")) {\n      newUrl.replace("Location: ","");\n      break;\n    }\n  }\n  sheetClient.stop();\n  String jsonData ="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  sheetClient.print("GET " + newUrl + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  while(!jsonData.startsWith("{")){\n    jsonData = sheetClient.readStringUntil(\'\\n\');\n    if (jsonData.startsWith("{")) {\n      DeserializationError error = deserializeJson(docSheet, jsonData);\n      break;\n    }\n  }\n  sheetClient.stop();\n}\n';
  //Blockly.Arduino.definitions_.define_search_sheet_event='void searchSheet(const String& fname, const String& sname){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  while (!newUrl.startsWith("https:")){\n     if (!sheetClient.connect(host, 443)) {\n      return;\n    }\n    const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=search&sheetId="+sheetId+"&sheetTag="+sheetTag+"&fname="+fname+"&sname="+sname;\n    sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: keep-alive\\n\\n\\n");\n    while (sheetClient.connected()) {\n      newUrl = sheetClient.readStringUntil(\'\\n\');\n      if (newUrl.startsWith("Location: https://")) {\n        newUrl.replace("Location: ","");\n        break;\n      }\n    }\n  }\n  sheetClient.stop();\n  String jsonData ="";\n  while(!jsonData.startsWith("{")){\n    if (!sheetClient.connect(host, 443)) {\n      return;\n    }\n    sheetClient.print("GET " + newUrl + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: keep-alive\\n\\n\\n");\n    while (sheetClient.connected()) {\n      jsonData = sheetClient.readStringUntil(\'\\n\');\n      if (jsonData.startsWith("{")) {\n        DeserializationError error = deserializeJson(docSheet, jsonData);\n        break;\n      }\n    }\n  }\n  sheetClient.stop();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_search_sheet_event=Blockly.Arduino.definitions_.define_search_sheet_event.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_search_sheet_event=Blockly.Arduino.definitions_.define_search_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
    }  
  }
  return'searchSheet('+a+',URLEncode('+b+').c_str());\n'
};

Blockly.Arduino.deleteSearch=function(){
  var a=Blockly.Arduino.valueToCode(this,"Column",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"keyWord",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.toUpperCase();
  Blockly.Arduino.definitions_.define_search_sheet_event='void deleteSearch(const String& fname, const String& sname){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=deleteQ&sheetId="+sheetId+"&sheetTag="+sheetTag+"&fname="+fname+"&sname="+sname;\n  sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  sheetClient.stop();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_search_sheet_event=Blockly.Arduino.definitions_.define_search_sheet_event.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_search_sheet_event=Blockly.Arduino.definitions_.define_search_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
    }  
  }
  return'deleteSearch('+a+',URLEncode('+b+').c_str());\n'
};

Blockly.Arduino.deleteRow=function(){
  var a=Blockly.Arduino.valueToCode(this,"RowIndex",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_search_sheet_event='void deleteRows(int nBegin, int nEnd){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  String url="";\n  if (nEnd<0){\n    url= String() +"https://"+host+"/macros/s/"+asId+"/exec?type=deleteRow&sheetId="+sheetId+"&sheetTag="+sheetTag+"&dBegin="+nBegin;\n  } else {\n    url= String() +"https://"+host+"/macros/s/"+asId+"/exec?type=deleteRows&sheetId="+sheetId+"&sheetTag="+sheetTag+"&dBegin="+nBegin+"&dEnd="+nEnd;\n  }\n  sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  sheetClient.stop();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_search_sheet_event=Blockly.Arduino.definitions_.define_search_sheet_event.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_search_sheet_event=Blockly.Arduino.definitions_.define_search_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
    }  
  }
  return'deleteRows('+a+',-1);\n'
};

Blockly.Arduino.getCellValue=function(){
  var a=Blockly.Arduino.valueToCode(this,"cell",Blockly.Arduino.ORDER_ATOMIC)||"";
  //return'docSheet['+a+'].as<char*>()'
  return['docSheet['+a+'].as<String>()',Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.getFieldValue=function(){
  var a=Blockly.Arduino.valueToCode(this,"field",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.toUpperCase();
  return['docSheet['+a+'].as<String>()',Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.updateCellValue=function(){
  var a=Blockly.Arduino.valueToCode(this,"cell",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"data",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_update_sheet_event='void  updateCellValue(const String& cell,const String& data)\n{\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  if (sheetClient.connect(host, 443)) {\n      const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=update&sheetId="+sheetId+"&sheetTag="+sheetTag+"&cell="+cell+"&data="+data;\n      sheetClient.println("GET " + url + " HTTP/1.1");\n      sheetClient.println(String()+"Host: "+host);\n      sheetClient.println("Accept: */*");\n      sheetClient.println("Connection: close");\n      sheetClient.println();\n      sheetClient.println();\n      sheetClient.stop();\n  }\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_update_sheet_event=Blockly.Arduino.definitions_.define_update_sheet_event.replace("TLSClient","WiFiClientSecure");
    if (Blockly.Arduino.my_board_type=="ESP8266"){
      Blockly.Arduino.definitions_.define_update_sheet_event=Blockly.Arduino.definitions_.define_update_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
    }  
  }
  var c=Blockly.Arduino.valueToCode(this,"data",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'updateCellValue('+a+',URLEncode(String(String()+'+b+').c_str()));\n'
};

//ESP32 NTP
Blockly.Arduino.esp32_ntp={};
Blockly.Arduino.set_ntp_time=function(){
  var a=this.getFieldValue("TZ");
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
    Blockly.Arduino.definitions_.define_getDataFromRTC_invoke="int get_data_from_RTC(byte dataType) {\n  int myResult=0;\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  switch(dataType){\n    case 0:\n      myResult=(1900 + t_st->tm_year);\n      break;\n    case 1:\n      myResult=( 1 + t_st->tm_mon);\n      break;\n    case 2:\n      myResult=t_st->tm_mday;\n      break;\n    case 3:\n      myResult=t_st->tm_hour;\n      break;\n    case 4:\n      myResult=t_st->tm_min;\n      break;\n    case 5:\n      myResult=t_st->tm_sec;\n      break;\n    case 6:\n      myResult=t_st->tm_wday;\n      break;\n  }\n  return myResult;\n}\n";
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
    Blockly.Arduino.definitions_.define_getDataFromRTC_invoke="int get_data_from_RTC(byte dataType) {\n  int myResult=0;\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  switch(dataType){\n    case 0:\n      myResult=(1900 + t_st->tm_year);\n      break;\n    case 1:\n      myResult=( 1 + t_st->tm_mon);\n      break;\n    case 2:\n      myResult=t_st->tm_mday;\n      break;\n    case 3:\n      myResult=t_st->tm_hour;\n      break;\n    case 4:\n      myResult=t_st->tm_min;\n      break;\n    case 5:\n      myResult=t_st->tm_sec;\n      break;\n    case 6:\n      myResult=t_st->tm_wday;\n      break;\n  }\n  return myResult;\n}\n";
    return['get_data_from_RTC('+a+')',Blockly.Arduino.ORDER_ATOMIC]
  }else{
    return['0',Blockly.Arduino.ORDER_ATOMIC]
  }
};

Blockly.Arduino.set_manual_time=function(){
  var year=Blockly.Arduino.valueToCode(this,"YEAR",Blockly.Arduino.ORDER_ATOMIC)||"0",
      month=Blockly.Arduino.valueToCode(this,"MONTH",Blockly.Arduino.ORDER_ATOMIC)||"0",
      day=Blockly.Arduino.valueToCode(this,"DAY",Blockly.Arduino.ORDER_ATOMIC)||"0",
      hour=Blockly.Arduino.valueToCode(this,"HOUR",Blockly.Arduino.ORDER_ATOMIC)||"0",
      minute=Blockly.Arduino.valueToCode(this,"MINUTE",Blockly.Arduino.ORDER_ATOMIC)||"0",
      second=Blockly.Arduino.valueToCode(this,"SECOND",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (parseInt(year)>=1900)
    year=""+(parseInt(year)-1900);
  month=""+(parseInt(month)-1);
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266"){
    Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
    Blockly.Arduino.definitions_.define_ESP_time_set_include="#include <sys/time.h>";
    Blockly.Arduino.definitions_.define_setDataTime_invoke='void setDateTimeRTC(int y,byte m,byte d,byte h,byte min,byte s)\n{\n  time_t today=time(NULL);\n  struct tm myDay={s,min,h,d,m,y};\n  today=mktime(&myDay);\n  struct timeval tv={ .tv_sec = today };\n  settimeofday(&tv, NULL);\n  //setenv("TZ","CST-8",1);\n}\n';
    return'setDateTimeRTC('+year+','+month+','+day+','+hour+','+minute+','+second+');\n';
  }else{
    return"";
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
  var a=this.getFieldValue("TFT_TYPE");
  Blockly.Arduino.definitions_.define_spi="#include <SPI.h>";
  Blockly.Arduino.definitions_.define_ttgo_tft="#include <TFT_eSPI.h>\n#include <U8g2_for_TFT_eSPI.h>";
  if (a!="") {
    Blockly.Arduino.definitions_.define_ttgo_tft="#define "+a+" 1\n"+Blockly.Arduino.definitions_.define_ttgo_tft;
  }
  Blockly.Arduino.definitions_.define_ttgo_tft_init_invoke="TFT_eSPI tft = TFT_eSPI();\nU8g2_for_TFT_eSPI u8g2;\nuint32_t tft_color=TFT_WHITE;\nbyte tftTextSize=1;\nbyte tftTextFont=1;\n";
  Blockly.Arduino.setups_.ttgo_tft='tft.begin();\n  tft.fillScreen(TFT_BLACK);\n  u8g2.begin(tft);\n  tft.setTextColor(tft_color);\n  u8g2.setForegroundColor(tft_color);\n  u8g2.setFontMode(1);';
  return'';
};

Blockly.Arduino.ttgo_tft_rotation=function(){
  var a=this.getFieldValue("ROTATION");
  return'tft.setRotation('+a+');\n';
};

Blockly.Arduino.ttgo_tft_rotation4=function(){
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

Blockly.Arduino.ttgo_tft_draw_chart=function(){
  var a=Blockly.Arduino.valueToCode(this,"INPUT",Blockly.Arduino.ORDER_NONE)||"0",
      b=Blockly.Arduino.valueToCode(this,"MIN",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"MAX",Blockly.Arduino.ORDER_NONE)||"0",
      d=this.getFieldValue("CHART_TYPE"),
      e=this.getFieldValue("DIR_TYPE"),
      f=Blockly.Arduino.statementToCode(this,"EXTRA"),
      g=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  f=f.replace("  ","");
  f=f.replace(/\n  /g,"\n");
  f=f.replace(/tft\./g,"graph.");
  Blockly.Arduino.definitions_.define_ttgo_tft_init_invoke="TFT_eSPI tft = TFT_eSPI();\nTFT_eSprite graph= TFT_eSprite(&tft);\nU8g2_for_TFT_eSPI u8g2;\nuint32_t tft_color=TFT_WHITE;\nbyte tftTextSize=1;\nbyte tftTextFont=1;\n";
  Blockly.Arduino.definitions_.define_ttgo_tft_charNumList_invoke="int chartNumList[TFT_HEIGHT]={-1};\n";
  Blockly.Arduino.definitions_.define_ttgo_tft_drawChart_invoke='void drawTFTchart(int myNumList[],byte chartType=0,byte dirType=0,uint16_t myColor=TFT_YELLOW)\n{\n  byte myWidth=tft.width(),myHeight=tft.height();\n  graph.fillSprite(TFT_BLACK);\n  for (int i = 0; i < ((chartType==0)?(myWidth-1):myWidth) ; i++) {\n    if ((myNumList[i]) >-1 && (myNumList[i + 1]) >-1) {\n      switch(chartType){\n        case 0:\n          if (dirType==0)\n            graph.drawLine(i, myNumList[i], i + 1, myNumList[i + 1], myColor);\n          else\n            graph.drawLine(myWidth-1-i, myNumList[i], myWidth-2 -i, myNumList[i + 1], myColor);\n          break;\n        case 1:\n          if (dirType==0)\n            graph.drawLine(i, myHeight-1, i, myNumList[i], myColor);\n          else\n            graph.drawLine(myWidth-1-i, myHeight-1, myWidth-1-i, myNumList[i], myColor);\n          break;\n      }\n    }\n  }\n  for (int i = 0; i < (myWidth-1); i++) {\n    myNumList[i] = (myNumList[i + 1]);\n  }\n}\nvoid clearTFTchart()\n{\n  for(int i=0;i<TFT_HEIGHT;i++)\n    chartNumList[i]=-1;\n}\n';
  Blockly.Arduino.setups_.ttgo_tft_clear_chart='clearTFTchart();\n';
  if (f!="")
    return'chartNumList[tft.width()-1] = (map('+a+','+b+','+c+',tft.height()-1,0));\ngraph.createSprite(tft.width(),tft.height());\ndrawTFTchart(chartNumList,'+d+','+e+','+g+');\nu8g2.begin(graph);\n'+f+'graph.pushSprite(0, 0);\ngraph.deleteSprite();\nu8g2.begin(tft);\n';
  else
    return'chartNumList[tft.width()-1] = (map('+a+','+b+','+c+',tft.height()-1,0));\ngraph.createSprite(tft.width(),tft.height());\ndrawTFTchart(chartNumList,'+d+','+e+','+g+');\n'+f+'graph.pushSprite(0, 0);\ngraph.deleteSprite();\n';
};

Blockly.Arduino.ttgo_tft_clear_chart=function(){
  return'clearTFTchart();\n';
}

Blockly.Arduino.ttgo_tft_draw_qr=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=this.getFieldValue("SIZE"),
  d=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
  e=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_NONE)||'""';
  if (Blockly.Arduino.definitions_.define_ttgo_tft)
    Blockly.Arduino.definitions_.define_ttgo_tft+='\n#include \"qrcode.h\"';
  Blockly.Arduino.definitions_.define_ttgo_tft_draw_QR_invoke='void drawQRcode(TFT_eSPI *myTft,int myX,int myY, byte myVersion,String myData,byte border,uint16_t myColor)\n{\n    QRCode qrcode;\n    uint8_t qrcodeData[qrcode_getBufferSize(myVersion)];\n    qrcode_initText(&qrcode, qrcodeData,myVersion , 0, myData.c_str());\n    TFT_eSprite graphQR= TFT_eSprite(myTft);\n    graphQR.createSprite((qrcode.size+border)*2,(qrcode.size+border)*2);\n    graphQR.fillRect(0, 0, (qrcode.size+border)*2,(qrcode.size+border)*2, myColor);\n    graphQR.fillRect(border, border, qrcode.size*2, qrcode.size*2, TFT_BLACK);\n    for (uint8_t y = 0; y < qrcode.size; y++) {\n        for (uint8_t x = 0; x < qrcode.size; x++) {\n          if (!qrcode_getModule(&qrcode, x, y))\n            graphQR.fillRect(x*2+border, y*2+border, 2,2, myColor);\n        }\n    }\n    graphQR.pushSprite(myX, myY);\n    graphQR.deleteSprite();\n}\n';
  return'drawQRcode(&tft,'+a+','+b+','+c+','+e+',5,'+d+');\n';
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
  Blockly.Arduino.definitions_.define_ESP8266Audio_include='#include "AudioFileSourceSPIFFS.h"\n#include "AudioFileSourceSD.h"\n#include "AudioFileSourceHTTPStream.h"\n#include "AudioFileSourceBuffer.h"\n#include "AudioOutputI2S.h"\n#include "AudioGeneratorMP3.h"\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_variable_invoke='AudioFileSourceSD *i2sSdFile;\nAudioFileSourceSPIFFS *i2sSPIFFSfile;\nAudioGeneratorMP3 *i2sMp3;\nAudioFileSourceHTTPStream *i2sFile=new AudioFileSourceHTTPStream();\nAudioFileSourceBuffer *i2sBuff;\nAudioOutputI2S *i2sOut;\nString dacPlayType;\nString mp3FileName;\nString ttsContent;\nString httpLink;\nfloat gainValue=1.0;\nbool ttsDone=true;\nbool httpDone=true;\nbool mp3Done=true;\n';
  Blockly.Arduino.definitions_.define_urlencode_event="String URLEncode(const char* msg)\n{\n  const char *hex = \"0123456789abcdef\";\n  String encodedMsg = \"\";\n  while (*msg!='\\0'){\n      if( ('a' <= *msg && *msg <= 'z')\n              || ('A' <= *msg && *msg <= 'Z')\n              || ('0' <= *msg && *msg <= '9') ) {\n          encodedMsg += *msg;\n      } else {\n          encodedMsg += '%';\n          encodedMsg += hex[*msg >> 4];\n          encodedMsg += hex[*msg & 15];\n      }\n      msg++;\n  }\n  return encodedMsg;\n}\n";
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_checkRunning_event='bool checkDACrunning()\n{\n  bool isRunning=false;\n  if (i2sMp3->isRunning()) {\n    isRunning=true;\n    if (!i2sMp3->loop()){\n      i2sMp3->stop();\n      mp3Done=true;\n      ttsDone=true;\n      httpDone=true;\n      isRunning=false;\n    }\n  }else{\n    isRunning=false;\n  }\n  return isRunning;\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_TTS_event='void getVoiceFromGoogle(String myTalk,String tl)\n{\n  myTalk=URLEncode(myTalk.c_str());\n  ttsDone=false;\n  httpDone=true;\n  mp3Done=true;\n  dacPlayType="TTS";\n  ttsContent=myTalk;\n  myTalk="http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl="+tl+"&q="+myTalk;\n  saveTTStoFile(myTalk,"/TTS/tts.mp3",2);\n  getVoiceFromFile("/TTS/tts.mp3",2);\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_saveTTStoFile_event='void saveTTStoFile(String myLink,String fileName,byte sdType)\n{\n  myLink.replace(" ","%20");\n  Serial.println("filename:"+fileName);\n  File myTTSFile;\n  if(fileName.indexOf("/")!=0)\n    fileName="/"+fileName;\n  if (sdType==1){\n    if(!SD.begin()){\n      return;\n    }\n    String path=fileName.substring(1,fileName.lastIndexOf("/"));\n    String mySubStr="/";\n    while(path.indexOf("/")>-1){\n      mySubStr+=path.substring(0,path.indexOf("/"));\n      if( !SD.exists( mySubStr.c_str()))\n        SD.mkdir(mySubStr.c_str());\n      mySubStr+="/";\n      path= path.substring(path.indexOf("/")+1);\n    }\n    if (path!=""){\n      mySubStr+=path;\n      if( !SD.exists( mySubStr.c_str()))\n        SD.mkdir(mySubStr.c_str());\n    }\n    myTTSFile = SD.open(fileName, "w");\n    if (!myTTSFile) {\n      return;\n    }\n  } else if (sdType==2){\n    if(!SPIFFS.begin(true)){\n      return;\n    }\n    myTTSFile = SPIFFS.open(fileName, "w");\n    if (!myTTSFile) {\n      return;\n    }\n  }\n  HTTPClient http;\n  http.begin(myLink);\n  int httpCode = http.GET();\n  if (httpCode == HTTP_CODE_OK) {\n      http.writeToStream(&myTTSFile);\n  }\n  myTTSFile.close();\n  http.end();\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_radio_event='void playRadioStation(String myStationURL)\n{\n  httpDone=true;\n  mp3Done=true;\n  ttsDone=true;\n  dacPlayType="radio";\n  i2sFile->open(myStationURL.c_str());\n  if (i2sBuff!=NULL)\n    i2sBuff->close();\n  i2sBuff = new AudioFileSourceBuffer(i2sFile, 2048);\n  i2sMp3->begin(i2sBuff, i2sOut);\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_httpMp3_event='void playHttpMP3(String myStationURL)\n{\n  mp3Done=true;\n  ttsDone=true;\n  httpDone=false;\n  dacPlayType="HTTPMP3";\n  httpLink=myStationURL;\n  myStationURL.replace("www.dropbox","dl.dropboxusercontent");\n  myStationURL.replace("?dl=0","");\n  i2sFile->open(myStationURL.c_str());\n  if (i2sBuff!=NULL)\n    i2sBuff->close();\n  i2sBuff = new AudioFileSourceBuffer(i2sFile, 2048);\n  i2sMp3->begin(i2sBuff, i2sOut);\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_file_event='void getVoiceFromFile(String myFileName,byte sdType)\n{\n  httpDone=true;\n  ttsDone=true;\n  mp3Done=false;\n  dacPlayType="MP3";\n  if(myFileName.indexOf("/")!=0)\n    myFileName="/"+myFileName;\n  if (sdType==1){\n    SD.begin();\n    i2sSdFile = new AudioFileSourceSD(String(myFileName).c_str());\n    if (i2sBuff!=NULL)\n      i2sBuff->close();\n    i2sBuff = new AudioFileSourceBuffer(i2sSdFile, 2048);\n    mp3FileName=myFileName;\n  }\n  else {\n    if (myFileName=="/TTS/tts.mp3"){\n      ttsDone=false;\n      mp3Done=true;\n      dacPlayType="TTS";\n    } else {\n      mp3FileName=myFileName;\n    }\n    SPIFFS.begin();\n    i2sSPIFFSfile=new AudioFileSourceSPIFFS(String(myFileName).c_str());\n    if (i2sBuff!=NULL)\n      i2sBuff->close();\n    i2sBuff = new AudioFileSourceBuffer(i2sSPIFFSfile, 2048);\n  }\n  i2sMp3->begin(i2sBuff, i2sOut);\n}\n';
  Blockly.Arduino.definitions_.define_DAC_checkTTS_event='void checkTTS(){\n}\n';
  Blockly.Arduino.definitions_.define_DAC_checkMP3_event='void checkMP3(){\n}\n';
  Blockly.Arduino.definitions_.define_DAC_checkHttpMP3_event='void checkHttpMP3(){\n}\n';
  Blockly.Arduino.definitions_.define_DAC_stop_event='void dacStop()\n{\n  httpDone=true;\n  mp3Done=true;\n  ttsDone=true;\n  dacPlayType="";\n  httpLink="";\n  mp3FileName="";\n  ttsContent="";\n  if (i2sMp3->isRunning()) {\n    i2sMp3->stop();\n    i2sBuff->close();\n  }\n}\n';
  Blockly.Arduino.dac.ESP8266Audio="yes";
  return'i2sMp3 = new AudioGeneratorMP3();\ni2sOut = new AudioOutputI2S();\ni2sOut->SetPinout('+a+','+b+','+c+');\ni2sOut->SetGain(gainValue);\n';
}

Blockly.Arduino.dac_loop=function(){
  return'checkDACrunning();\ncheckTTS();\ncheckMP3();\ncheckHttpMP3();\n';
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
  //a=a.replace(/\"/g,"");
  var myLink='http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl='+b+'&q=';
  return'saveTTStoFile(String()+"'+myLink+'"+URLEncode(String('+a+').c_str()),'+c+','+d+');\n';
}

Blockly.Arduino.dac_radio=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'playRadioStation('+a+');\n';
}

Blockly.Arduino.dac_http_mp3=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'playHttpMP3('+a+');\n';
}

Blockly.Arduino.dac_radioList=function(){
  var a='\"'+this.getFieldValue("RADIO_URL")+'\"';
  return[a,Blockly.Arduino.ORDER_ATOMIC]
}

Blockly.Arduino.dac_http_mp3_end=function(){
  var a=Blockly.Arduino.statementToCode(this,"HTTP_MP3_END_CALL");
  a=a.replace(/\n  /g,"\n    ");
  Blockly.Arduino.definitions_.define_DAC_checkHttpMP3_event='void checkHttpMP3(){\n  if (httpDone && dacPlayType=="HTTPMP3"){\n    dacPlayType="none";\n  '+a+'  }\n}\n';
  return'';
}

Blockly.Arduino.dac_http_mp3_ends_with=function(){
  var a=Blockly.Arduino.statementToCode(this,"HTTP_MP3_ENDS_WITH_CALL"),
      b=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return 'if (httpDone & (httpLink==String('+b+').c_str())){\n  httpLink="";\n'+a+'}\n';
}

Blockly.Arduino.dac_tts_end=function(){
  var a=Blockly.Arduino.statementToCode(this,"TTS_END_CALL");
  a=a.replace(/\n  /g,"\n    ");
  Blockly.Arduino.definitions_.define_DAC_checkTTS_event='void checkTTS(){\n  if (ttsDone && dacPlayType=="TTS"){\n    dacPlayType="none";\n  '+a+'  }\n}\n';
  return'';
}

Blockly.Arduino.dac_tts_ends_with=function(){
  var a=Blockly.Arduino.statementToCode(this,"TTS_ENDS_WITH_CALL"),
      b=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return 'if (ttsDone &(ttsContent==(URLEncode(String('+b+').c_str())))){\n  ttsContent="";\n'+a+'}\n';
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
  Blockly.Arduino.definitions_.define_DAC_checkMP3_event='void checkMP3(){\n  if (mp3Done && dacPlayType=="MP3"){\n    dacPlayType="none";\n  '+a+'  }\n}\n';
  return'';
}

Blockly.Arduino.dac_mp3_ends_with=function(){
  var a=Blockly.Arduino.statementToCode(this,"MP3_ENDS_WITH_CALL"),
      b=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return 'if (mp3Done &(mp3FileName== String('+b+').c_str())){\n  mp3FileName="";\n'+a+'}\n';
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

//esp32_irq
Blockly.Arduino.esp32_irq={};

Blockly.Arduino.esp32_irq_timer_task=function(){
  var a=Blockly.Arduino.valueToCode(this,"F_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.statementToCode(this,"STATEMENT");
  a=a.replace(/\"/g,"");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    if (Blockly.Arduino.definitions_.define_esp32_timer_mux_declaire!=undefined)
      Blockly.Arduino.definitions_.define_esp32_timer_mux_declaire=Blockly.Arduino.definitions_.define_esp32_timer_mux_declaire+'portMUX_TYPE '+a+'Mux = portMUX_INITIALIZER_UNLOCKED;\n';
    else
      Blockly.Arduino.definitions_.define_esp32_timer_mux_declaire='portMUX_TYPE '+a+'Mux = portMUX_INITIALIZER_UNLOCKED;\n';
    Blockly.Arduino.definitions_["define_timer_function_"+a]='void IRAM_ATTR '+a+'()\n{\n  portENTER_CRITICAL(&'+a+'Mux);\n'+b+'  portEXIT_CRITICAL(&'+a+'Mux);\n}\n';
  }
  return'';
}

Blockly.Arduino.esp32_irq_timer_run=function(){
  var a=Blockly.Arduino.valueToCode(this,"F_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("TIMER"),
      c=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||"0",
      d=this.getFieldValue("UNIT");
      e=parseInt(c)*parseInt(d);
  a=a.replace(/\"/g,"");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    if (Blockly.Arduino.definitions_.define_esp32_timer_declaire!=undefined){
      if (Blockly.Arduino.definitions_.define_esp32_timer_declaire.indexOf("timer"+b)<0)
        Blockly.Arduino.definitions_.define_esp32_timer_declaire=Blockly.Arduino.definitions_.define_esp32_timer_declaire+'hw_timer_t * timer'+b+';\n';
    } else {
      Blockly.Arduino.definitions_.define_esp32_timer_declaire='hw_timer_t * timer'+b+';\n';
    }
    return'timer'+b+'=timerBegin('+b+',80,true);\ntimerAttachInterrupt(timer'+b+', &'+a+', true);\ntimerAlarmWrite(timer'+b+', '+e+', true);\ntimerAlarmEnable(timer'+b+');\n';
  } else 
    return'';
}

Blockly.Arduino.esp32_irq_timer_delete=function(){
  var a=this.getFieldValue("TIMER");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    return'if (timer'+a+'!=NULL){\n  timerAlarmDisable(timer'+a+');\n  timerDetachInterrupt(timer'+a+');\n  timerEnd(timer'+a+');\n  timer'+a+'=NULL;\n}\n';
  } else 
    return'';
}

Blockly.Arduino.esp32_irq_pin_task=function(){
  var a=Blockly.Arduino.valueToCode(this,"F_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.statementToCode(this,"STATEMENT");
  a=a.replace(/\"/g,"");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_["define_pin_function_"+a]='void IRAM_ATTR '+a+'()\n{\n'+b+'}\n';
  }
  return'';
}

Blockly.Arduino.esp32_irq_pin_run=function(){
  var a=Blockly.Arduino.valueToCode(this,"F_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=this.getFieldValue("MODE");
  a=a.replace(/\"/g,"");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    return'pinMode('+b+', INPUT);\nattachInterrupt('+b+','+a+','+c+');\n';
  } else {
    return'';
  }
}

Blockly.Arduino.esp32_irq_pin_delete=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    return'detachInterrupt('+a+');\n';
  } else {
    return'';
  }
}

//L9110
Blockly.Arduino.l9110={};
Blockly.Arduino.l9110_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"M1A",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"M1B",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"M2A",Blockly.Arduino.ORDER_ATOMIC)||"0",
      d=Blockly.Arduino.valueToCode(this,"M2B",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_L9110_invoke='byte m1aL9110='+a+';\nbyte m1bL9110='+b+';\nbyte m2aL9110='+c+';\nbyte m2bL9110='+d+';\nbyte m1aCH=11;\nbyte m1bCH=12;\nbyte m2aCH=13;\nbyte m2bCH=14;\n';
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.setups_["setup_L9110"]='ledcSetup(m1aCH, 5000, 8);\n  ledcAttachPin(m1aL9110,m1aCH);\n  ledcSetup(m1bCH, 5000, 8);\n  ledcAttachPin(m1bL9110,m1bCH);\n  ledcSetup(m2aCH, 5000, 8);\n  ledcAttachPin(m2aL9110,m2aCH);\n  ledcSetup(m2bCH, 5000, 8);\n  ledcAttachPin(m2bL9110,m2bCH);\n';   
  } else {
    Blockly.Arduino.setups_["setup_L9110"]='pinMode(m1aL9110,OUTPUT);\n  pinMode(m1bL9110,OUTPUT);\n  pinMode(m2aL9110,OUTPUT);\n  pinMode(m2bL9110,OUTPUT);\n';
  }
  return'';
}

Blockly.Arduino.l9110_run=function(){
  var a=this.getFieldValue("MOTOR"),
      b=this.getFieldValue("DIR"),
      c=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0",
      returnValue="";

    if (a=="both"){
      if (b=="1")
        returnValue='analogWrite(m1aL9110,0);\nanalogWrite(m1bL9110,'+c+');\nanalogWrite(m2aL9110,0);\nanalogWrite(m2bL9110,'+c+');\n';
      else
        returnValue='analogWrite(m1aL9110,'+c+');\nanalogWrite(m1bL9110,0);\nanalogWrite(m2aL9110,'+c+');\nanalogWrite(m2bL9110,0);\n';
    } else {
      if (b=="1")
        returnValue='analogWrite('+a+'aL9110,0);\nanalogWrite('+a+'bL9110,'+c+');\n';
      else
        returnValue='analogWrite('+a+'aL9110,'+c+');\nanalogWrite('+a+'bL9110,0);\n';
    }
  if (Blockly.Arduino.my_board_type=="ESP32"){
    returnValue=returnValue.replace(/analogWrite/g,"ledcWrite");
    returnValue=returnValue.replace(/m1aL9110/g,"m1aCH");
    returnValue=returnValue.replace(/m1bL9110/g,"m1bCH");
    returnValue=returnValue.replace(/m2aL9110/g,"m2aCH");
    returnValue=returnValue.replace(/m2bL9110/g,"m2bCH");
  } 
  return returnValue;
}

Blockly.Arduino.l9110_stop=function(){
  var a=this.getFieldValue("MOTOR"),
      returnValue="";
    if (a=="both"){
      returnValue='analogWrite(m1aL9110,0);\nanalogWrite(m1bL9110,0);\nanalogWrite(m2aL9110,0);\nanalogWrite(m2bL9110,0);\n';
    } else {
      returnValue='analogWrite('+a+'aL9110,0);\nanalogWrite('+a+'bL9110,0);\n';
    }
  if (Blockly.Arduino.my_board_type=="ESP32"){
    returnValue=returnValue.replace(/analogWrite/g,"ledcWrite");
    returnValue=returnValue.replace(/m1aL9110/g,"m1aCH");
    returnValue=returnValue.replace(/m1bL9110/g,"m1bCH");
    returnValue=returnValue.replace(/m2aL9110/g,"m2aCH");
    returnValue=returnValue.replace(/m2bL9110/g,"m2bCH");
  } 
  return returnValue;
}

//EZ Start+
Blockly.Arduino.startPlus={};
Blockly.Arduino.startPlus_button=function(){
  var a=this.getFieldValue("AB_BUTTON"),
	  b=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL"),
    pinStr="";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    pinStr="byte A_Pin=5;\nbyte B_Pin=36;\n";
  } else if (Blockly.Arduino.my_board_type=="7697"){
    pinStr="byte A_Pin=0;\nbyte B_Pin=7;\n";
  }
  if ((Blockly.Arduino.my_board_type=="ESP32") || (Blockly.Arduino.my_board_type=="7697")){
    Blockly.Arduino.definitions_.define_m_button=pinStr+"char myBtnStatus;\nbool buttonPressed(char btnName)\n{\n  if (btnName=='A'){\n    if (digitalRead(A_Pin) == 1)\n      return false;\n    else\n      return true;\n  }\n  else if (btnName=='B'){\n    if (digitalRead(B_Pin) == 1)\n      return false;\n    else\n      return true;\n  } else {\n    if ((digitalRead(A_Pin) == 1) && (digitalRead(B_Pin) == 1))\n      return false;\n    else\n      return true;\n  }\n}\n"
    Blockly.Arduino.definitions_.define_m_getBtnStatus="char getBtnStatus(){\n  char buttonStatus=' ';\n  int checkButtonDelay=200;\n  if (buttonPressed('A')){\n    delay(checkButtonDelay);\n    if (buttonPressed('A')){\n      buttonStatus='A';\n      if (buttonPressed('B'))\n        buttonStatus='C';\n    }\n  } else if (buttonPressed('B')){\n      delay(checkButtonDelay);\n      if (buttonPressed('B')){\n        buttonStatus='B';\n        if (buttonPressed('A'))\n          buttonStatus='C';\n      }\n  }\n  return buttonStatus;\n}\n";
    Blockly.Arduino.setups_.setup_button='pinMode(A_Pin, INPUT);\n  pinMode(B_Pin, INPUT);';
	  return"if (myBtnStatus=='"+a+"'){\n"+b+"  while(buttonPressed('"+a+"')){}\n}\n";
  } else {
    return"";
  }
};

Blockly.Arduino.startPlus_vr=function(){
  var a=this.getFieldValue("TYPE"),
      pin="";
  if (Blockly.Arduino.my_board_type=="ESP32"){
     if (a=="vr")
       pin="34"
     else if (a=="phr")
       pin="39";
     Blockly.Arduino.setups_["setup_"+a+"_"]="pinMode("+pin+", INPUT);";
     return["analogRead("+pin+")",Blockly.Arduino.ORDER_ATOMIC];
  } else if (Blockly.Arduino.my_board_type=="7697"){
     if (a=="vr")
       pin="16"
     else if (a=="phr")
       pin="15";
     Blockly.Arduino.setups_["setup_"+a+"_"]="pinMode("+pin+", INPUT);";
     return["analogRead("+pin+")",Blockly.Arduino.ORDER_ATOMIC];
  } else {
    return"";
  }
};

Blockly.Arduino.startPlus_dht11=function(){
  var a=this.getFieldValue("DHT"),
      pin="";
  if (Blockly.Arduino.my_board_type=="ESP32"){
     pin="15";
     Blockly.Arduino.definitions_['define_dht_']="#include <DHT.h>";
     Blockly.Arduino.definitions_['define_dht_set']="DHT dht11_p"+pin+"("+pin+", DHT11);";
     Blockly.Arduino.setups_["setup_dht_"]="dht11_p"+pin+".begin();";
     return["dht11_p"+pin+"."+a+"()",Blockly.Arduino.ORDER_ATOMIC];
  } else if (Blockly.Arduino.my_board_type=="7697"){
     pin="10";
     Blockly.Arduino.definitions_['define_dht_']="#include <DHT.h>";
     Blockly.Arduino.definitions_['define_dht_set']="DHT dht11_p"+pin+"("+pin+", DHT11);";
     Blockly.Arduino.setups_["setup_dht_"]="dht11_p"+pin+".begin();";
     return["dht11_p"+pin+"."+a+"()",Blockly.Arduino.ORDER_ATOMIC];
  } else {
    return"";
  }
};

Blockly.Arduino.startPlus_relay=function(){
  var a=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0";
      pin="14";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    pin="25";
    Blockly.Arduino.setups_["setup_relay_"]="pinMode("+pin+", OUTPUT);";
    return"digitalWrite("+pin+", "+a+");\n";
  } else if (Blockly.Arduino.my_board_type=="7697"){
    pin="5";
    Blockly.Arduino.setups_["setup_relay_"]="pinMode("+pin+", OUTPUT);";
    return"digitalWrite("+pin+", "+a+");\n";
  } else {
    return"";
  }
};

Blockly.Arduino.startPlus_led=function(){
  var a=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("LED");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_start_plus_led_invoke="byte r_pin=16;\nbyte y_pin=12;\nbyte g_pin=13;\n";
    Blockly.Arduino.setups_["setup_led_"+b+"_"]="pinMode("+b+", OUTPUT);";
    return"digitalWrite("+b+", "+a+");\n";
  } else if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_start_plus_led_invoke="byte r_pin=13;\nbyte y_pin=12;\nbyte g_pin=11;\n";
    Blockly.Arduino.setups_["setup_led_"+b+"_"]="pinMode("+b+", OUTPUT);";
    return"digitalWrite("+b+", "+a+");\n";
  } else {
    return"";
  }
};


Blockly.Arduino.startPlus_led_analog=function(){
  var a=this.getFieldValue("LED"),
      b=Blockly.Arduino.valueToCode(this,"NUM",Blockly.Arduino.ORDER_ATOMIC)||"0",
      r_ch="15",
      y_ch="14",
      g_ch="13",
      d=a;
      d=d.replace("pin","ch");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_start_plus_led_invoke="byte r_pin=16;\nbyte y_pin=12;\nbyte g_pin=13;\nbyte r_ch=15;\nbyte y_ch=14;\nbyte g_ch=13;\n";
    Blockly.Arduino.setups_["ledc_channel_"+d]||(Blockly.Arduino.setups_["ledc_channel_"+d]="ledcSetup("+d+", 5000, 8);");
    Blockly.Arduino.setups_["ledc_"+a]||(Blockly.Arduino.setups_["ledc_"+a]="ledcAttachPin("+a+","+d+");");
    return"ledcWrite("+d+", "+b+");\n";
  } else if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_start_plus_led_invoke="byte r_pin=13;\nbyte y_pin=12;\nbyte g_pin=11;\n";
    Blockly.Arduino.setups_["setup_led_"+a+"_"]="pinMode("+a+", OUTPUT);";
    return"analogWrite("+a+", "+b+");\n";
  }
  else {
    return"";
  }
};

Blockly.Arduino.startPlus_pin=function(){
  var a=this.getFieldValue("PIN");
  if (Blockly.Arduino.my_board_type=="ESP32"){
     var myStartPin=["35","17","32","4","27","16","12","13"];
     return[myStartPin[parseInt(a)],Blockly.Arduino.ORDER_ATOMIC];
  } else if (Blockly.Arduino.my_board_type=="7697"){
     var myStartPin=["2","6","3","X","1","13","12","11"];
     return[myStartPin[parseInt(a)],Blockly.Arduino.ORDER_ATOMIC];
  } else {
    return"";
  }
};

Blockly.Arduino.startPlus_tone=function(){
  var a=this.getFieldValue("FREQ");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
    Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=14;\nbyte buzz_ch=0;\n";
    Blockly.Arduino.setups_["esp32_tone1"]="tone(buzz_pin,262,0,buzz_ch);\n  delay(1);\n  noTone(buzz_pin,buzz_ch);";
    return"tone(buzz_pin,"+a+",0,buzz_ch);\n";
  } else if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=14;";
    return"tone(buzz_pin, "+a+");\n";
  }
  else {
    return"";
  }
};

Blockly.Arduino.startPlus_no_tone=function(){
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
    Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=14;\nbyte buzz_ch=0;\n";
    Blockly.Arduino.setups_["esp32_tone1"]="tone(buzz_pin,262,0,buzz_ch);\n  delay(1);\n  noTone(buzz_pin,buzz_ch);";
    return"noTone(buzz_pin,buzz_ch);\n";
  } else if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=14;\n";
    return"noTone(buzz_pin);\n";
  }
  else {
    return"";
  }
};

Blockly.Arduino.startPlus_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
    Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=14;\nbyte buzz_ch=0;\n";
    Blockly.Arduino.setups_["esp32_tone1"]="tone(buzz_pin,262,0,buzz_ch);\n  delay(1);\n  noTone(buzz_pin,buzz_ch);";
    return"tone(buzz_pin,"+a+","+b+",buzz_ch);\n";
  } else if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=14;";
    return"tone(buzz_pin, "+a+","+b+");\n";
  }
  else {
    return"";
  }
};

Blockly.Arduino.startPlus_neopixel_begin=function(){
  var a=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP32"){
	  Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>";
    Blockly.Arduino.definitions_.define_plus_neopixel='Adafruit_NeoPixel plusPixels = Adafruit_NeoPixel(3,26,NEO_GRB + NEO_KHZ800);\n';
    Blockly.Arduino.setups_.setup_plus_neopixel="plusPixels.begin();\n  plusPixels.setBrightness("+a+");\n  plusPixels.show();\n  plusPixels.setPixelColor(0,plusPixels.Color(0,0,0));\n  plusPixels.setPixelColor(1,plusPixels.Color(0,0,0));\n  plusPixels.setPixelColor(2,plusPixels.Color(0,0,0));\n  plusPixels.show();";
  } else if (Blockly.Arduino.my_board_type=="7697"){
	  Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>";
    Blockly.Arduino.definitions_.define_plus_neopixel='Adafruit_NeoPixel plusPixels = Adafruit_NeoPixel(3,4,NEO_GRB + NEO_KHZ800);\n';
    Blockly.Arduino.setups_.setup_plus_neopixel="plusPixels.begin();\n  plusPixels.setBrightness("+a+");\n  plusPixels.show();\n  plusPixels.setPixelColor(0,plusPixels.Color(0,0,0));\n  plusPixels.setPixelColor(1,plusPixels.Color(0,0,0));\n  plusPixels.setPixelColor(2,plusPixels.Color(0,0,0));\n  plusPixels.show();"; 
  }
  return"";
};

Blockly.Arduino.startPlus_neopixel_set_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"INDEX",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  b=b.replace("tft.color565","plusPixels.Color");
  if ((Blockly.Arduino.my_board_type=="ESP32")||(Blockly.Arduino.my_board_type=="7697")){
    return"plusPixels.setPixelColor("+a+","+b+");\n";
  } else {
    return"";
  }
};

Blockly.Arduino.startPlus_neopixel_show=function(){
  if ((Blockly.Arduino.my_board_type=="ESP32")||(Blockly.Arduino.my_board_type=="7697")){
    return"plusPixels.show();\n";
  } else {
    return"";
  }
};

Blockly.Arduino.startPlus_neopixel_set_colors=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace("tft.color565","plusPixels.Color");
  if ((Blockly.Arduino.my_board_type=="ESP32")||(Blockly.Arduino.my_board_type=="7697")){
    return"plusPixels.setPixelColor(0,"+a+");\nplusPixels.setPixelColor(1,"+a+");\nplusPixels.setPixelColor(2,"+a+");\nplusPixels.show();\n";
  } else {
    return"";
  }
};

Blockly.Arduino.startPlus_ir_receive=function(){
  var a="";
  if ((Blockly.Arduino.my_board_type=="ESP32")||(Blockly.Arduino.my_board_type=="7697")){
    if (Blockly.Arduino.my_board_type=="ESP32"){
      a="33";
    } else if (Blockly.Arduino.my_board_type=="7697"){
      a="17";
    }
    Blockly.Arduino.definitions_.define_irremote="#include <IRremote.h>";
    Blockly.Arduino.definitions_.define_irremote_init="IRrecv irrecv("+a+");";
    Blockly.Arduino.definitions_.define_irremote_decode="decode_results results;\nString myCodeType;\nString myIRcode;";
    Blockly.Arduino.definitions_.define_irremote_ir_type='String ir_type(int tip)\n{\n  if (tip == 1){\n    return "RC5";\n  } else if (tip == 2){\n    return "RC6";\n  } else if (tip == 3){\n    return "NEC";\n  } else if (tip == 4){\n    return "SONY";\n  } else if (tip == 5){\n    return "PANASONIC";\n  } else if (tip == 6){\n    return "JVC";\n  } else if (tip == 7){\n    return "SAMSUNG";\n  } else if (tip == 10){\n    return "LG";\n  } else if (tip == 14){\n    return "SHARP";\n  } else if (tip == 17){\n    return "LEGO_PF";\n  } else {\n    return "UNKNOWN";\n  }\n}\n';
    //Blockly.Arduino.setups_["irremote_"]||(Blockly.Arduino.setups_["irremote_"]="irrecv.enableIRIn();\n");
  }
  return'irrecv.enableIRIn();\n';
};

//MAX30105
Blockly.Arduino.max30105={};

Blockly.Arduino.max30105_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"LED",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_.define_MAX30105_include='#include "MAX30105.h"\n#include "heartRate.h"';
  Blockly.Arduino.definitions_.define_MAX30105_variable_invoke='#define FINGER_ON 7000\n#define MINIMUM_SPO2 90.0\nboolean max3010xReady=false;\ndouble avgRed=0, avgIR=0, ESpO2 = MINIMUM_SPO2;\nconst double FSpO2 = 0.7, frate = 0.95;\nbyte validMin=20, validMax=250;\nMAX30105 max3010xSensor;\n';
  Blockly.Arduino.setups_.setup_max30105_init='max3010xReady=max3010xSensor.begin(Wire, I2C_SPEED_FAST);\n  max3010xSensor.setup('+a+', 4, 2, 800, 215, 16384);\n  max3010xSensor.enableDIETEMPRDY();\n  max3010xSensor.setPulseAmplitudeRed(0x0A);\n  max3010xSensor.setPulseAmplitudeGreen(0);\n';
  return'';
};

Blockly.Arduino.max30105_check=function(){
  var a=this.getFieldValue("CHECK_TYPE");
  if(a=="IR"){
    return["(max3010xSensor.getIR()>FINGER_ON)",Blockly.Arduino.ORDER_ATOMIC];
  } else if (a=="HB"){
    return["(checkForBeat(max3010xSensor.getIR()))",Blockly.Arduino.ORDER_ATOMIC];
  } else if (a=="READY"){
    return["(max3010xReady)",Blockly.Arduino.ORDER_ATOMIC];
  } else
    return["",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.max30105_get_beat_rate=function(){
  var a=Blockly.Arduino.valueToCode(this,"AVG",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_MAX30105_heartbeat_invoke='int getHeartBeat(byte avgTimes)\n{\n  long lastBeat=0, myIRvalue=0, delta=0;\n  byte myCount=0;\n  int beatSum=0;\n  float myBPM=0.0;\n  while(myCount<avgTimes){\n    myIRvalue=max3010xSensor.getIR();\n    if (checkForBeat(myIRvalue)) {\n      delta = millis() - lastBeat;\n      lastBeat = millis();\n      myBPM = 60 / (delta / 1000.0);\n      if (myBPM < validMax && myBPM > validMin) {\n        beatSum+=( (byte)myBPM);\n        myCount++;\n      }\n    }\n    if (myIRvalue < FINGER_ON )\n      break;\n  }\n  if (myCount==0)\n    myCount=1;\n  return(beatSum/myCount);\n}\n';
  return['getHeartBeat('+a+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.max30105_get_spo2=function(){
  Blockly.Arduino.definitions_.define_MAX30105_spo2_invoke='double getSPO2(byte avgTimes)\n{\n  uint32_t ir,red;\n  double df_red,df_ir;\n  byte myCount=0;\n  double sumIR = 0, sumRed = 0, SpO2 = 0;\n  while(myCount<avgTimes){\n    max3010xSensor.check();\n    if (max3010xSensor.available()) {\n      myCount++;\n      red = max3010xSensor.getFIFOIR();\n      ir = max3010xSensor.getFIFORed();\n      max3010xSensor.nextSample();\n      df_red = (double)red;\n      df_ir = (double)ir;\n      avgRed = avgRed * frate + (double)red * (1.0 - frate);\n      avgIR = avgIR * frate + (double)ir * (1.0 - frate);\n      sumRed += (df_red - avgRed) * (df_red - avgRed);\n      sumIR += (df_ir - avgIR) * (df_ir - avgIR);\n    }\n  }\n  if (myCount==avgTimes){\n    double R = (sqrt(sumRed) / avgRed) / (sqrt(sumIR) / avgIR);\n    SpO2 = -23.3 * (R - 0.4) + 100;\n    ESpO2 = FSpO2 * ESpO2 + (1.0 - FSpO2) * SpO2;\n    if (ESpO2 <= MINIMUM_SPO2)\n      ESpO2 = MINIMUM_SPO2;\n    if (ESpO2 > 100)\n      ESpO2 = 99.9;\n  } else {\n      ESpO2 = MINIMUM_SPO2;\n  }\n  return ESpO2;\n}\n';
  return['getSPO2(30)',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.max30105_get_temperature=function(){
  var a=this.getFieldValue("TEMP_TYPE"),
      b="max3010xSensor.readTemperature()";
  if (a=="F")
    b="max3010xSensor.readTemperatureF()";
  return[b,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.max30105_set_beat_range=function(){
  var a=Blockly.Arduino.valueToCode(this,"MIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"MAX",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c="";
  if (parseInt(a)>parseInt(b)){
    c=a;
    a=b;
    b=c;
  }
 return'validMin='+a+';\nvalidMax='+b+';\n';
};

Blockly.Arduino.max30105_set_spo2_clear=function(){
  return 'avgRed = 0;\navgIR = 0;\nESpO2 = MINIMUM_SPO2;\n';
};

//SPIFFS
Blockly.Arduino.spiffs={};
Blockly.Arduino.spiffs_init=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP")){
    Blockly.Arduino.definitions_.define_SPIFFS_include='#include "SPIFFS.h"';
    if (Blockly.Arduino.my_board_type=="ESP8266")
      Blockly.Arduino.definitions_.define_SPIFFS_include='#include "FS.h"';
    Blockly.Arduino.definitions_.define_SPIFFS_variable_invoke='bool SPIFFS_exists=false;\n';
    if (Blockly.Arduino.my_board_type=="ESP8266")
      return'SPIFFS_exists=SPIFFS.begin();\n';
    else
      return'SPIFFS_exists=SPIFFS.begin(true);\n';
  } else {
    return'';
  }
}

Blockly.Arduino.spiffs_exists=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP"))
    return['SPIFFS_exists',Blockly.Arduino.ORDER_ATOMIC];
  else
    return'';
}

Blockly.Arduino.spiffs_format=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP"))
    return'SPIFFS_exists=SPIFFS.format();\n';
  else
    return'';
}

Blockly.Arduino.spiffs_file_init=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP")){
    var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
    a=a.replace(/\"/g,"");
    Blockly.Arduino.definitions_.define_SPIFFS_variable_invoke+=('File '+a+';\n');
  }
  return'';
}

Blockly.Arduino.spiffs_file_open=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP")){
    var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
        b=Blockly.Arduino.valueToCode(this,"FILE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
        c=this.getFieldValue("MODE"),
        returnStr='';
    a=a.replace(/\"/g,"");
    return a+'=SPIFFS.open(String('+b+').c_str(),"'+c+'");\n';
  }
  else
    return'';
}

Blockly.Arduino.spiffs_file_exists=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP")){
    var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
    a=a.replace(/\"/g,"");
    return[a,Blockly.Arduino.ORDER_ATOMIC];
  }
  else 
    return'';
}

Blockly.Arduino.spiffs_file_println=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP")){
    var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
        b=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"",
        c=this.getFieldValue("MODE");
    a=a.replace(/\"/g,"");
    return a+c+'(String('+b+').c_str());\n'+a+'.flush();\n';
  }
  else
    return'';
}

Blockly.Arduino.spiffs_file_available=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP")){
    var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
    a=a.replace(/\"/g,"");
    return[a+'.available()',Blockly.Arduino.ORDER_ATOMIC];
  }
  else
    return'';  
}

Blockly.Arduino.spiffs_file_readuntil_char=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP")){
    var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
        b=Blockly.Arduino.valueToCode(this,"CHAR",Blockly.Arduino.ORDER_ATOMIC)||"";
    a=a.replace(/\"/g,"");
    b=b.replace(/\"/g,"");
    b=b.replace("\\\\","\\");
    Blockly.Arduino.definitions_.define_spiffs_file_read_until_event="String readStringUntil(File *filePtr,char myChar){\n  String myTempStr=\"\";\n  char nowRead;\n  if (filePtr->available()){\n    nowRead=filePtr->read();\n    while(nowRead!=myChar){\n      if (myChar!='\\n'){\n        if(nowRead!='\\n'){\n          myTempStr+=nowRead;\n        } else{\n          break;\n        }\n      } else {\n        myTempStr+=nowRead;\n      }\n      if (filePtr->available())\n        nowRead=filePtr->read();\n      else\n        break;\n    }\n  }\n  return myTempStr;\n}\n";
    return["readStringUntil(&"+a+",'"+b+"').c_str()",Blockly.Arduino.ORDER_ATOMIC];
  }
  else
    return'';  
}

Blockly.Arduino.spiffs_file_read_line=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP")){
    var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
    a=a.replace(/\"/g,"");
    Blockly.Arduino.definitions_.define_spiffs_file_read_until_event="String readStringUntil(File *filePtr,char myChar){\n  String myTempStr=\"\";\n  char nowRead;\n  if (filePtr->available()){\n    nowRead=filePtr->read();\n    while(nowRead!=myChar){\n      if (myChar!='\\n'){\n        if(nowRead!='\\n'){\n          myTempStr+=nowRead;\n        } else{\n          break;\n        }\n      } else {\n        myTempStr+=nowRead;\n      }\n      if (filePtr->available())\n        nowRead=filePtr->read();\n      else\n        break;\n    }\n  }\n  return myTempStr;\n}\n";
    return["readStringUntil(&"+a+",'\\n').c_str()",Blockly.Arduino.ORDER_ATOMIC];
  }
  else
    return''; 
}

Blockly.Arduino.spiffs_file_close=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP")){
    var a=Blockly.Arduino.valueToCode(this,"VARIABLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
    a=a.replace(/\"/g,"");
    return a+'.close();\n';
  }
  else
    return''; 
}

Blockly.Arduino.spiffs_file_delete=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP")){
    var a=Blockly.Arduino.valueToCode(this,"F_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
    return 'SPIFFS.remove((String()+'+a+').c_str());\n';
  }
  else
    return''; 
}

Blockly.Arduino.spiffs_file_download=function(){
  if (Blockly.Arduino.my_board_type.startsWith("ESP")){
    var a=Blockly.Arduino.valueToCode(this,"F_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
        b=Blockly.Arduino.valueToCode(this,"URL",Blockly.Arduino.ORDER_ATOMIC)||"";
    Blockly.Arduino.definitions_.define_HTTPCLIENT_include='#include <HTTPClient.h>';
    Blockly.Arduino.definitions_.define_SPIFFS_download_event='void saveToSPIFFS(String myLink,String fileName)\n{\n  myLink.replace("www.dropbox","dl.dropboxusercontent");\n  myLink.replace("?dl=0","");\n  myLink.replace(" ","%20");\n  File myTTSFile;\n  if(fileName.indexOf("/")!=0)\n    fileName="/"+fileName;\n  if(!SPIFFS_exists){\n    return;\n  }\n  myTTSFile = SPIFFS.open(fileName, "w");\n  if (!myTTSFile) {\n    return;\n  }\n  WiFiClientSecure sslClient;\n  HTTPClient http;\n  http.begin(sslClient,myLink);\n  int httpCode = http.GET();\n  if (httpCode == HTTP_CODE_OK) {\n      http.writeToStream(&myTTSFile);\n  }\n  myTTSFile.close();\n  http.end();\n}\n';
    if (Blockly.Arduino.my_board_type=="ESP8266")
      Blockly.Arduino.definitions_.define_SPIFFS_download_event=Blockly.Arduino.definitions_.define_SPIFFS_download_event.replace("WiFiClientSecure sslClient;\n","WiFiClientSecure sslClient;\n  sslClient.setInsecure();\n");
    return 'saveToSPIFFS('+b+','+a+');\n';
  }
  else
    return''; 
}

//ASR
Blockly.Arduino.asr={};
Blockly.Arduino.asr_check=function(){
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_.define_asr_invoke='uint8_t asr_value=0;\nuint8_t checkASR(byte asrAddress){\n  uint8_t myASRvalue=0;\n  Wire.setClock(100000);\n  Wire.requestFrom(asrAddress,1,true);\n  if (Wire.available()){\n    myASRvalue=Wire.read();\n  }\n  return myASRvalue;\n}\nvoid asrSet(byte asrAddress, byte myData){\n  Wire.setClock(100000);\n  Wire.beginTransmission(asrAddress);\n  Wire.write(myData);\n  Wire.endTransmission();\n}\n';
  if (!Blockly.Arduino.setups_.setup_wire_lib)
      Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  return'asr_value=checkASR(0x0B);\n'
}

Blockly.Arduino.asr_learn=function(){
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_.define_asr_invoke='uint8_t asr_value=0;\nuint8_t checkASR(byte asrAddress){\n  uint8_t myASRvalue=0;\n  Wire.setClock(100000);\n  Wire.requestFrom(asrAddress,1,true);\n  if (Wire.available()){\n    myASRvalue=Wire.read();\n  }\n  return myASRvalue;\n}\nvoid asrSet(byte asrAddress, byte myData){\n  Wire.setClock(100000);\n  Wire.beginTransmission(asrAddress);\n  Wire.write(myData);\n  Wire.endTransmission();\n}\n';
  if (!Blockly.Arduino.setups_.setup_wire_lib)
      Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  return'asrSet(0x0B, 0x50);\n';
}

Blockly.Arduino.asr_clear=function(){
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_.define_asr_invoke='uint8_t asr_value=0;\nuint8_t checkASR(byte asrAddress){\n  uint8_t myASRvalue=0;\n  Wire.setClock(100000);\n  Wire.requestFrom(asrAddress,1,true);\n  if (Wire.available()){\n    myASRvalue=Wire.read();\n  }\n  return myASRvalue;\n}\nvoid asrSet(byte asrAddress, byte myData){\n  Wire.setClock(100000);\n  Wire.beginTransmission(asrAddress);\n  Wire.write(myData);\n  Wire.endTransmission();\n}\n';
  if (!Blockly.Arduino.setups_.setup_wire_lib)
      Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  return'asrSet(0x0B, 0x60);\n';
}

Blockly.Arduino.asr_check_result=function(){
  var a=this.getFieldValue("RESULT");
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_.define_asr_invoke='uint8_t asr_value=0;\nuint8_t checkASR(byte asrAddress){\n  uint8_t myASRvalue=0;\n  Wire.setClock(100000);\n  Wire.requestFrom(asrAddress,1,true);\n  if (Wire.available()){\n    myASRvalue=Wire.read();\n  }\n  return myASRvalue;\n}\nvoid asrSet(byte asrAddress, byte myData){\n  Wire.setClock(100000);\n  Wire.beginTransmission(asrAddress);\n  Wire.write(myData);\n  Wire.endTransmission();\n}\n';
  if (!Blockly.Arduino.setups_.setup_wire_lib)
      Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  return['asr_value=='+a,Blockly.Arduino.ORDER_ATOMIC];
}

//PN532_I2C
Blockly.Arduino.pn532i2c={};
Blockly.Arduino.pn532i2c_init=function(){
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.definitions_.define_wire_pn532='#include <PN532_I2C.h>\n#include <PN532.h>\n#include <NfcAdapter.h>';
  Blockly.Arduino.definitions_.define_pn532_invoke='PN532_I2C pn532i2c(Wire);\nPN532 nfc(pn532i2c);\nString myNFC_UID="";\nuint8_t myNFC_UID_array[] = { 0, 0, 0, 0, 0, 0, 0 };\nuint8_t myNFC_UID_Length;\n';
  Blockly.Arduino.definitions_.define_pn532_readNFC_event='String readFromNFC_UID() {\n  uint8_t success;\n  String cardUID="";\n  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, myNFC_UID_array, &myNFC_UID_Length);\n  if (success) {\n    for (uint8_t i=0; i < myNFC_UID_Length; i++)\n    {\n      cardUID+=((String(myNFC_UID_array[i], HEX).length()==1?"0":"")+String(myNFC_UID_array[i], HEX));\n    }\n  }\n  cardUID.toUpperCase();\n  return cardUID;\n}\n';
  Blockly.Arduino.setups_.setup_pn532_i2c='nfc.begin();';
  return'nfc.setPassiveActivationRetries(0xFF);\nnfc.SAMConfig();\n';
}

Blockly.Arduino.pn532i2c_loop=function(){
  return'myNFC_UID_Length=0;\nmyNFC_UID=readFromNFC_UID();\n';
}

Blockly.Arduino.pn532i2c_checkUID=function(){
  return['myNFC_UID!=""',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.pn532i2c_getUID=function(){
  return['myNFC_UID',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.pn532i2c_getType=function(){
  return['(myNFC_UID_Length==4?"'+Blockly.Msg.PN532I2C_CLASSIC+'":(myNFC_UID_Length==7?"'+Blockly.Msg.PN532I2C_ULTRALIGHT+'":""))',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.pn532i2c_writeBlock=function(){
  var a=Blockly.Arduino.valueToCode(this,"MY_DATA",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=parseInt(this.getFieldValue("SECTOR")),
      c=parseInt(this.getFieldValue("BLOCK"));
      d=b*4+c;
  Blockly.Arduino.definitions_.define_pn532_write_classic_block_event='void writeClassicBlock(byte blockIndex, String myMsg)\n{\n  if (myNFC_UID_Length == 4)\n  {\n    uint8_t success;\n    uint8_t keya[6] = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };\n    success = nfc.mifareclassic_AuthenticateBlock(myNFC_UID_array, myNFC_UID_Length, blockIndex, 0, keya);\n    if (success)\n    {\n      uint8_t data[16]={0};\n      char dataArray[17];\n      myMsg.toCharArray(dataArray, 17);\n      for(int i=0;i<strlen(dataArray);i++)\n      {\n        data[i]=dataArray[i];\n      }\n      success = nfc.mifareclassic_WriteDataBlock (blockIndex, data);\n    }\n  }\n}\n';
  return'writeClassicBlock('+d+', '+a+');\n';
}

Blockly.Arduino.pn532i2c_writeSector=function(){
  var a=Blockly.Arduino.valueToCode(this,"MY_DATA",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=parseInt(this.getFieldValue("SECTOR"));
  Blockly.Arduino.definitions_.define_pn532_write_classic_sector_event='void writeClassicSector(byte sectorIndex, String myMsg)\n{\n  byte firstBlockIndex=sectorIndex*4;\n  if (myNFC_UID_Length == 4)\n  {\n    uint8_t success;\n    uint8_t keya[6] = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };\n    uint8_t data[48]={0};\n    uint8_t data_block[16]={0};\n    char dataArray[49];\n    myMsg.toCharArray(dataArray, 49);\n    for(int i=0;i<strlen(dataArray);i++)\n    {\n      data[i]=dataArray[i];\n    }\n    for(int i=0; i<48;i++){\n      data_block[i%16]=data[i];\n      if(((i+1)%16)==0){\n        success = nfc.mifareclassic_AuthenticateBlock(myNFC_UID_array, myNFC_UID_Length, firstBlockIndex, 0, keya);\n        success = nfc.mifareclassic_WriteDataBlock (firstBlockIndex, data_block);\n        data_block[16]={0};\n        firstBlockIndex++;\n      }\n    }\n  }\n}\n';
  return'writeClassicSector('+b+', '+a+');\n';
}

Blockly.Arduino.pn532i2c_readBlock=function(){
  var a=parseInt(this.getFieldValue("SECTOR")),
      b=parseInt(this.getFieldValue("BLOCK"));
      c=a*4+b;
  Blockly.Arduino.definitions_.define_pn532_read_classic_block_event='String readClassicBlock(byte blockIndex)\n{\n  if (myNFC_UID_Length == 4)\n  {\n    uint8_t success;\n    uint8_t keya[6] = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };\n    success = nfc.mifareclassic_AuthenticateBlock(myNFC_UID_array, myNFC_UID_Length, blockIndex, 0, keya);\n    if (success)\n    {\n      uint8_t data[16]={0};\n      char dataArray[17]={\'\\0\'};\n      success = nfc.mifareclassic_ReadDataBlock(blockIndex, data);\n      if (success)\n      {\n        for(int i=0;i<sizeof(data);i++)\n        {\n          dataArray[i]=data[i];\n        }\n        return String(dataArray);\n      }\n      else\n        return "";\n    }\n    else\n      return "";\n  }\n  else\n    return "";\n}\n';
  return['readClassicBlock('+c+')',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.pn532i2c_readSector=function(){
  var a=parseInt(this.getFieldValue("SECTOR"));
  if (!Blockly.Arduino.definitions_.define_pn532_read_classic_block_invoke)
    Blockly.Arduino.definitions_.define_pn532_read_classic_block_event='String readClassicBlock(byte blockIndex)\n{\n  if (myNFC_UID_Length == 4)\n  {\n    uint8_t success;\n    uint8_t keya[6] = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };\n    success = nfc.mifareclassic_AuthenticateBlock(myNFC_UID_array, myNFC_UID_Length, blockIndex, 0, keya);\n    if (success)\n    {\n      uint8_t data[16]={0};\n      char dataArray[17]={\'\\0\'};\n      success = nfc.mifareclassic_ReadDataBlock(blockIndex, data);\n      if (success)\n      {\n        for(int i=0;i<sizeof(data);i++)\n        {\n          dataArray[i]=data[i];\n        }\n        return String(dataArray);\n      }\n      else\n        return "";\n    }\n    else\n      return "";\n  }\n  else\n    return "";\n}\n';
  Blockly.Arduino.definitions_.define_pn532_read_classic_sector_event='String readClassicSector(byte sectorIndex)\n{\n  byte firstBlockIndex=sectorIndex*4;\n  String myTempBlock="";\n  if (myNFC_UID_Length == 4)\n  {\n    for(int i=0;i<3;i++)\n      myTempBlock+=readClassicBlock(firstBlockIndex+i);\n  }\n  return myTempBlock;\n}\n';
  return['readClassicSector('+a+')',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.pn532i2c_writePage=function(){
  var a=Blockly.Arduino.valueToCode(this,"MY_DATA",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("PAGE");
  Blockly.Arduino.definitions_.define_pn532_write_ultra_page_event='void writeUltraPage(byte page, String myMsg)\n{\n  if (myNFC_UID_Length == 7)\n  {\n    uint8_t success;\n    uint8_t data[4]={0};\n    char dataArray[5];\n    myMsg.toCharArray(dataArray, 5);\n    for(int i=0;i<strlen(dataArray);i++)\n    {\n      data[i]=dataArray[i];\n    }\n    success = nfc.mifareultralight_WritePage (page, data);\n  }\n}\n';
  return'writeUltraPage('+b+','+a+');\n';
}

Blockly.Arduino.pn532i2c_readPage=function(){
  var a=this.getFieldValue("PAGE");
  Blockly.Arduino.definitions_.define_pn532_read_ultra_page_event='String readUltraPage(byte page)\n{\n  if (myNFC_UID_Length == 7)\n  {\n    uint8_t success;\n    uint8_t data[4]={0};\n    char dataArray[5]={\'\\0\'};\n    success = nfc.mifareultralight_ReadPage(page, data);\n    if (success)\n    {\n      for(int i=0;i<sizeof(data);i++)\n      {\n        dataArray[i]=data[i];\n      }\n      return String(dataArray);\n    }\n    else\n      return "";\n  }\n  else\n    return "";\n}\n';
  return['readUltraPage('+a+')',Blockly.Arduino.ORDER_ATOMIC];
}

setTimeout(function(){
	if (Blockly.Blocks.board_initializes_setup)
		var xmlDoc = Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"><block type="board_initializes_setup" id="0" x="100" y="50"><next><block type="initializes_loop" id="1"></block></next></block></xml>');
	else
		var xmlDoc = Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"><block type="initializes_setup" id="0" x="100" y="50"><next><block type="initializes_loop" id="1"></block></next></block></xml>');

	Blockly.mainWorkspace.clear();					
	Blockly.Xml.domToWorkspace(xmlDoc, Blockly.mainWorkspace);
}, 3000);