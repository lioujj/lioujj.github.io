Blockly.Arduino.finish=function(a){
  if (Blockly.Arduino.probbie_type=="Tobbie")
    if (Blockly.Arduino.definitions_.define_linkit_wifi_include!=null)
     Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <WiFi.h>";
	if (Blockly.Arduino.webserver.webserver_exist=="yes"){
    Blockly.Arduino.webserver.webserver_header=Blockly.Arduino.webserver.webserver_header.replace("#title#",Blockly.Arduino.webserver.webserver_myTitle);
    Blockly.Arduino.webserver.webserver_header=Blockly.Arduino.webserver.webserver_header.replace("#color#",Blockly.Arduino.webserver.webserver_myColor);
  }
  
	var h=[];
	for(e in Blockly.Arduino.loops_)
		h.push("  "+Blockly.Arduino.loops_[e]);	
  a="  "+a.replace(/\n/g,"\n");
	a=a.replace(/\n\s+$/,"\n");
	a="void loop() \n{\n"+h.join("\n\n")+a+"\n}";
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

//--------------------
	var g=[];
	for(e in Blockly.Arduino.functions_)
		g.push(Blockly.Arduino.functions_[e]);
//--------------------

	var e=new Date((new Date).getTime());
  //if ((Blockly.Arduino.my_board_type=="Pico") && (Blockly.Arduino.definitions_["define_ljj_pico_dual_core_1_event"]))
  //   b=b.join("\n")+"\n\n"+c.join("\n")+"\n"+f.join("\n")+"\n\nvoid setup() \n{\n  rp2040.idleOtherCore();"+d.join("\n  ")+"\n  rp2040.resumeOtherCore();\n}\n\n";
  //else
	b=b.join("\n")+"\n\n"+c.join("\n")+"\n"+f.join("\n")+"\n\nvoid setup() \n{\n  "+d.join("\n  ")+"\n}\n\n";
//------------------------
	b=b.replace(/\n\n+/g,"\n\n").replace(/\n*$/,"\n\n")+a+"\n\n"+g.join("\n\n");
	b=b.replace(/\n\n+/g,"\n\n").replace(/\n*$/,"\n\n");
//------------------------

	Blockly.Arduino.mqtt_exist="no";
	b="//Generated Date: "+e.toUTCString()+"\n\n"+b
  if (Blockly.Arduino.webserver.webserver_exist=="yes"){
    b=b+Blockly.Arduino.webserver.webserver_header+Blockly.Arduino.webserver.webserver_body+Blockly.Arduino.webserver.webserver_footer;
    Blockly.Arduino.webserver.webserver_exist="no";
  }
//------------------------
	this.isInitialized=!1;
	this.nameDB_.reset();
	this.variableDB_.reset();
//-------------------------
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
	Blockly.Arduino.mqtt_callback_header='void mqttCallback(char* topic, byte* payload, unsigned int length){\n  receivedTopic=String(topic);\n  receivedMsg="";\n  for (unsigned int myIndex = 0; myIndex < length; myIndex++)\n  {\n    receivedMsg += (char)payload[myIndex];\n  }\n  receivedMsg.trim();\n';
	Blockly.Arduino.mqtt_callback_body='';
	Blockly.Arduino.mqtt_callback_footer='\n}\n';
	Blockly.Arduino.definitions_.define_mqtt_connect_mqtt_event='void connectMQTT(){\n  while (!myClient.connected()){\n    if (!myClient.connect(MQTT_ID,MQTT_USERNAME,MQTT_PASSWORD))\n    {\n      delay(5000);\n    }\n  }\n}\n';
  Blockly.Arduino.definitions_.define_mqtt_receivedMsg_event=Blockly.Arduino.mqtt_callback_header+Blockly.Arduino.mqtt_callback_body+Blockly.Arduino.mqtt_callback_footer;
  Blockly.Arduino.setups_["setup_mqtt_"]="myClient.setServer(MQTT_SERVER_IP, MQTT_SERVER_PORT);\n  myClient.setCallback(mqttCallback);\n";
	Blockly.Arduino.loops_.ljj_mqtt_loop = "myClient.loop();\n"
  return"connectMQTT();\n"
};

Blockly.Arduino.publish_mqtt=function(){
	var a=Blockly.Arduino.valueToCode(this,"TOPIC",Blockly.Arduino.ORDER_ATOMIC)||"",
	    b=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (this.getFieldValue("RETAIN") == 'TRUE')
    return'myClient.publish(String('+a+').c_str(),String('+b+').c_str(),true);\n'
  else
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
	    b=Blockly.Arduino.valueToCode(this,"TX_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=this.getFieldValue("UART_NO");
  Blockly.Arduino.definitions_.define_mp3_include='#include <DFRobotDFPlayerMini.h>\n';
  Blockly.Arduino.definitions_["mp3_serial"]='HardwareSerial mp3Serial('+c+');';
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

Blockly.Arduino.convert_float_str=function(){
	var a=Blockly.Arduino.valueToCode(this,"MY_VAR",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"PLACES",Blockly.Arduino.ORDER_ATOMIC)||0;
	return['String('+a+','+b+')',Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.create_custom_array=function(){
	var a=Blockly.Arduino.valueToCode(this,"MY_VAR",Blockly.Arduino.ORDER_ATOMIC);
  a='{'+a+'}';
  a=a.replace('{"','{');
  a=a.replace('"}','}');
	return[a,Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.ljj_string_startswith=function(){
	var a=Blockly.Arduino.valueToCode(this,"SOURCE",Blockly.Arduino.ORDER_ATOMIC),
      b=Blockly.Arduino.valueToCode(this,"INCLUDE",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=this.getFieldValue("STAT");
  var returnStr='';
  if (c=='indexOf')
    return['String('+a+').'+c+'('+b+')>-1',Blockly.Arduino.ORDER_ATOMIC]
  else
 	  return['String('+a+').'+c+'('+b+')',Blockly.Arduino.ORDER_ATOMIC]
  //return['',Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.ljj_number_map=function(){
	var a=Blockly.Arduino.valueToCode(this,"ORG_NUMBER",Blockly.Arduino.ORDER_ATOMIC)||0,
      b=Blockly.Arduino.valueToCode(this,"FROM_LOW",Blockly.Arduino.ORDER_ATOMIC)||0,
      c=Blockly.Arduino.valueToCode(this,"FROM_HIGH",Blockly.Arduino.ORDER_ATOMIC)||0,
      d=Blockly.Arduino.valueToCode(this,"TO_LOW",Blockly.Arduino.ORDER_ATOMIC)||0,
      e=Blockly.Arduino.valueToCode(this,"TO_HIGH",Blockly.Arduino.ORDER_ATOMIC)||0;
  return['map('+a+','+b+','+c+','+d+','+e+')',Blockly.Arduino.ORDER_ATOMIC];
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
    else if (Blockly.Arduino.ksb045.board_type=="kodorobot")
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 32\n#define padY 33\n#define padSW 16\n#define padA 2\n#define padB 23\n#define padC 14\n#define padD 5\n#define padE 18\n#define padF 17\n#define padMotor 19\n';
    Blockly.Arduino.setups_["esp32_tone1"]="tone(padBuz,255,0,0);\n  delay(1);\n  noTone(padBuz,0);\n";
    if (Blockly.Arduino.ksb045.board_type=="kodorobot"){
      delete Blockly.Arduino.definitions_.define_tone;
      delete Blockly.Arduino.setups_["esp32_tone1"];
    }
  } else if (Blockly.Arduino.my_board_type=="7697"){
    if (Blockly.Arduino.ksb045.board_type=="KSB045")
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 16\n#define padY 15\n#define padSW 17\n#define padA 0\n#define padB 7\n#define padC 11\n#define padD 12\n#define padE 13\n#define padF 4\n#define padBuz 14\n#define padMotor 10\n';
    else if (Blockly.Arduino.ksb045.board_type=="waveshare") 
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 15\n#define padY 16\n#define padSW 17\n#define padA 0\n#define padB 7\n#define padC 11\n#define padD 12\n#define padE 13\n#define padF 4\n#define padBuz 14\n#define padMotor 10\n';
    else if (Blockly.Arduino.ksb045.board_type=="Joystick:bit")
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 15\n#define padY 16\n#define padSW 17\n#define padA 0\n#define padB 7\n#define padC 4\n#define padD 13\n#define padE 12\n#define padF 11\n#define padBuz 14\n#define padMotor 10\n';
  } else if (Blockly.Arduino.my_board_type=="Pico"){
    if (Blockly.Arduino.ksb045.board_type=="kodorobot")
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 27\n#define padY 26\n#define padSW 5\n#define padA 4\n#define padB 14\n#define padC 17\n#define padD 8\n#define padE 9\n#define padF 7\n#define padMotor 10\n';
    else if (Blockly.Arduino.ksb045.board_type=="KSB045")
      Blockly.Arduino.definitions_.define_ksb045_pin_map='#define padX 28\n#define padY 27\n#define padSW 8\n#define padA 2\n#define padB 19\n#define padC 7\n#define padD 4\n#define padE 6\n#define padF 18\n#define padBuz 3\n#define padMotor 9\n';
  }
  Blockly.Arduino.definitions_.define_ksb045_mid_xy="int padMidX=0;\nint padMidY=0;\n";
  if (Blockly.Arduino.ksb045.board_type=="KSB045"){
    Blockly.Arduino.definitions_.define_ksb045_button='bool checkPinPressed(byte myPin)\n{\n  if (digitalRead(myPin) == 1)\n    return false;\n  else\n    return true;\n}\n';
    Blockly.Arduino.setups_.setup_ksb045_button='pinMode(padX, INPUT);\n  pinMode(padY, INPUT);\n  pinMode(padSW, INPUT);\n  pinMode(padA, INPUT);\n  pinMode(padB, INPUT);\n  pinMode(padC, INPUT);\n  pinMode(padD, INPUT);\n  pinMode(padE, INPUT);\n  pinMode(padF, INPUT);\n  pinMode(padMotor, OUTPUT);\n  digitalWrite(padMotor,0);\n  delay(300);\n  padMidX=('+(Blockly.Arduino.my_board_type=='Pico'?1023:4095)+'-analogRead(padX));\n  padMidY=analogRead(padY);\n';
  } else if (Blockly.Arduino.ksb045.board_type=="Joystick:bit"){
    Blockly.Arduino.definitions_.define_ksb045_button='bool checkPinPressed(byte myPin)\n{\n  if (digitalRead(myPin) == 1)\n    return false;\n  else\n    return true;\n}\n';
    Blockly.Arduino.setups_.setup_ksb045_button='pinMode(padX, INPUT);\n  pinMode(padY, INPUT);\n  pinMode(padSW, INPUT);\n  pinMode(padA, INPUT);\n  pinMode(padB, INPUT);\n  pinMode(padC, INPUT_PULLUP);\n  pinMode(padD, INPUT_PULLUP);\n  pinMode(padE, INPUT_PULLUP);\n  pinMode(padF, INPUT_PULLUP);\n  pinMode(padMotor, OUTPUT);\n  digitalWrite(padMotor,1);\n  delay(300);\n  padMidX=(4095-analogRead(padX));\n  padMidY=(4095-analogRead(padY));\n';
  } else if (Blockly.Arduino.ksb045.board_type=="waveshare"){
    Blockly.Arduino.definitions_.define_ksb045_button='bool checkPinPressed(byte myPin)\n{\n  if (digitalRead(myPin) == 1)\n    return false;\n  else\n    return true;\n}\n';
    Blockly.Arduino.setups_.setup_ksb045_button='pinMode(padX, INPUT);\n  pinMode(padY, INPUT);\n  pinMode(padSW, INPUT);\n  pinMode(padA, INPUT);\n  pinMode(padB, INPUT);\n  pinMode(padC, INPUT);\n  pinMode(padD, INPUT);\n  pinMode(padE, INPUT);\n  pinMode(padF, INPUT);\n  pinMode(padMotor, OUTPUT);\n  digitalWrite(padMotor,0);\n  delay(300);\n  padMidX=analogRead(padX);\n  padMidY=analogRead(padY);\n';
  } else if (Blockly.Arduino.ksb045.board_type=="kodorobot"){
    Blockly.Arduino.definitions_.define_ksb045_button='bool checkPinPressed(byte myPin)\n{\n  if (digitalRead(myPin) == 1)\n    return false;\n  else\n    return true;\n}\n';
    Blockly.Arduino.setups_.setup_ksb045_button='pinMode(padX, INPUT);\n  pinMode(padY, INPUT);\n  pinMode(padSW, INPUT_PULLUP);\n  pinMode(padA, INPUT_PULLUP);\n  pinMode(padB, INPUT_PULLUP);\n  pinMode(padC, INPUT_PULLUP);\n  pinMode(padD, INPUT_PULLUP);\n  pinMode(padE, INPUT_PULLUP);\n  pinMode(padF, INPUT_PULLUP);\n  pinMode(padMotor, OUTPUT);\n  digitalWrite(padMotor,0);\n  delay(300);\n  padMidX=('+(Blockly.Arduino.my_board_type=='ESP32'?4095:1023)+'-analogRead(padX));\n  padMidY=('+(Blockly.Arduino.my_board_type=='ESP32'?4095:1023)+'-analogRead(padY));\n';
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
      xyPin='('+(Blockly.Arduino.my_board_type=='Pico'?1023:4095)+'-analogRead(padX))';
    else
      xyPin='analogRead(padY)';
  } else if (a=="Joystick:bit"){
    xyPin='(4095-analogRead(pad'+b+'))';
  } else if (a=="kodorobot"){
    xyPin='('+(Blockly.Arduino.my_board_type=='ESP32'?4095:1023)+'-analogRead(pad'+b+'))';
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
  if (Blockly.Arduino.ksb045.board_type=="kodorobot")
    return'';
  else if (Blockly.Arduino.my_board_type=="ESP32"){
    return'tone(padBuz,'+a+',0,0);\n';
  } else {
    return"tone(padBuz, "+a+");\n"
  }
};
Blockly.Arduino.ksb045_no_tone=function(){
  if (Blockly.Arduino.ksb045.board_type=="kodorobot")
    return'';
  else if (Blockly.Arduino.my_board_type=="ESP32"){
    return'noTone(padBuz,0);\n';
  } else {
    return"noTone(padBuz);\n";
  }
};

Blockly.Arduino.ksb045_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||0,
      b=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||0;
  if (Blockly.Arduino.ksb045.board_type=="kodorobot")
    return'';
  else if (Blockly.Arduino.my_board_type=="ESP32"){
    return'tone(padBuz,'+a+','+b+',0);\n';
  } else {
    return"tone(padBuz, "+a+", "+b+");\n"
  }
};

//Maqueen
Blockly.Arduino.maqueen={};
Blockly.Arduino.maqueen_head_light=function(){
  var a=this.getFieldValue("STAT1"),
      b=this.getFieldValue("STAT2"),
      leftPin=17,
      rightPin=4;
  if (Blockly.Arduino.my_board_type=="ESP32"){
    leftPin=27;
    rightPin=15;
  }
  if (a == "LEFT") {
	  Blockly.Arduino.setups_["setup_maqueen_headlight_left"]='pinMode('+leftPin+', OUTPUT);';
	  if (b == "ON"){
	     return'digitalWrite('+leftPin+', 1);\n'
	  } else if (b=="OFF"){
		 return'digitalWrite('+leftPin+', 0);\n'
	  }
  } else if (a == "RIGHT"){
	  Blockly.Arduino.setups_["setup_maqueen_headlight_right"]='pinMode('+rightPin+', OUTPUT);';
	  if (b == "ON"){
	     return'digitalWrite('+rightPin+', 1);\n'
	  } else if (b=="OFF"){
		 return'digitalWrite('+rightPin+', 0);\n'
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
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_['define_sonar_set']="Ultrasonic maqueen_sonar(33, 32);"
  }
  return ["maqueen_sonar.convert(maqueen_sonar.timing(), Ultrasonic::CM)", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.maqueen_line_follower=function(){
  var a=this.getFieldValue("STAT1"),
      b=this.getFieldValue("STAT2");
  Blockly.Arduino.setups_["setup_maqueen_line_follower"]="pinMode(13, INPUT);\n  pinMode(12, INPUT);";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.setups_["setup_maqueen_line_follower"]="pinMode(18, INPUT);\n  pinMode(19, INPUT);";
    if (a=="13")
      a="18";
    else if (a=="12")
      a="19";
  }
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
  var a=this.getFieldValue("FREQ"),
      tonePin=14;
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
    tonePin=26;
    Blockly.Arduino.setups_["esp32_tone1"]="tone("+tonePin+",100,0,0);\n  delay(1);\n  noTone("+tonePin+",0);\n";
    return"noTone("+tonePin+",0);\ntone("+tonePin+", "+a+",0,0);\n"
  } else
    return"tone("+tonePin+", "+a+");\n"
};

Blockly.Arduino.maqueen_no_tone=function(){
  var tonePin=14;
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
    tonePin=26;
    Blockly.Arduino.setups_["esp32_tone1"]="tone("+tonePin+",100,0,0);\n  delay(1);\n  noTone("+tonePin+",0);\n";
    return"noTone("+tonePin+",0);\n"
  } else
    return"noTone("+tonePin+");\n"
};

Blockly.Arduino.maqueen_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||0,
      b=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||0,
      tonePin=14;
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
    tonePin=26;
    Blockly.Arduino.setups_["esp32_tone1"]="tone("+tonePin+",100,0,0);\n  delay(1);\n  noTone("+tonePin+",0);\n";
    return"tone("+tonePin+", "+a+", "+b+",0);\n"
  } else
    return"tone("+tonePin+", "+a+", "+b+");\n"
};

Blockly.Arduino.neopixel_begin_maqueen=function(){
	var a=this.getFieldValue("NUM"),
	    b=this.getFieldValue("PIN"),
	    c=this.getFieldValue("BRIGHTNESS"),
      ledPin=11;
  if (Blockly.Arduino.my_board_type=="ESP32")
      ledPin=23;    
	Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>\n";
	Blockly.Arduino.definitions_.define_neopixel="Adafruit_NeoPixel pixels = Adafruit_NeoPixel(4,"+ledPin+",NEO_GRB + NEO_KHZ800);\n";
	Blockly.Arduino.setups_.setup_neopixel_begin="pixels.begin();\n";
	Blockly.Arduino.setups_.setup_neopixel_brightness="pixels.setBrightness("+c+");\n  pixels.show();\n";
  return""
};

Blockly.Arduino.maqueen_button=function(){
  var a=this.getFieldValue("AB_BUTTON"),
	    b=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL"),
      A_Pin=0,
      B_Pin=7;
	b=b.replace(/\n/g,'\n  ');
  if (Blockly.Arduino.my_board_type=="ESP32"){
    A_Pin=14,
    B_Pin=25;
  }
  Blockly.Arduino.definitions_.define_m_button="char myBtnStatus;\nbool buttonPressed(char btnName)\n{\n  byte A_Pin="+A_Pin+";\n  byte B_Pin="+B_Pin+";\n  if (btnName=='A'){\n    if (digitalRead(A_Pin) == 1)\n      return false;\n    else\n      return true;\n  }\n  else if (btnName=='B'){\n    if (digitalRead(B_Pin) == 1)\n      return false;\n    else\n      return true;\n  } else {\n    if ((digitalRead(A_Pin) == 1) && (digitalRead(B_Pin) == 1))\n      return false;\n    else\n      return true;\n  }\n}\n"
  Blockly.Arduino.definitions_.define_m_getBtnStatus="char getBtnStatus(){\n  char buttonStatus=' ';\n  int checkButtonDelay=200;\n  if (buttonPressed('A')){\n    delay(checkButtonDelay);\n    if (buttonPressed('A')){\n      buttonStatus='A';\n      if (buttonPressed('B'))\n        buttonStatus='C';\n    }\n  } else if (buttonPressed('B')){\n      delay(checkButtonDelay);\n      if (buttonPressed('B')){\n        buttonStatus='B';\n        if (buttonPressed('A'))\n          buttonStatus='C';\n      }\n  }\n  return buttonStatus;\n}\n";
  Blockly.Arduino.setups_.setup_button='pinMode('+A_Pin+', INPUT);\n  pinMode('+B_Pin+', INPUT);\n';
	return"if (myBtnStatus=='"+a+"'){\n"+b+"  while(buttonPressed('"+a+"')){}\n}\n"
};

Blockly.Arduino.maqueen_ir_event=function(){
  var a=10;
  Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.h>";
  Blockly.Arduino.definitions_.ljj_define_irremote_init="IRrecv IrReceiver("+a+");";
  Blockly.Arduino.definitions_.define_irremote_decode="decode_results results;\nString myCodeType;\nString myIRcode;";
  Blockly.Arduino.definitions_.define_irremote_ir_type_event='String ir_type(int tip)\n{\n  if (tip == 1){\n    return "RC5";\n  } else if (tip == 2){\n    return "RC6";\n  } else if (tip == 3){\n    return "NEC";\n  } else if (tip == 4){\n    return "SONY";\n  } else if (tip == 5){\n    return "PANASONIC";\n  } else if (tip == 6){\n    return "JVC";\n  } else if (tip == 7){\n    return "SAMSUNG";\n  } else if (tip == 10){\n    return "LG";\n  } else if (tip == 14){\n    return "SHARP";\n  } else if (tip == 17){\n    return "LEGO_PF";\n  } else {\n    return "UNKNOWN";\n  }\n}\n';
  Blockly.Arduino.setups_["ljj_irremote_"]||(Blockly.Arduino.setups_["ljj_irremote_"]="IrReceiver.enableIRIn();\n");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.hpp>";
    delete Blockly.Arduino.definitions_.ljj_define_irremote_init;
    Blockly.Arduino.definitions_.define_irremote_ir_type_event='String ir_type(int tip)\n{\n  if (tip == 14){\n    return "RC5";\n  } else if (tip == 15){\n    return "RC6";\n  } else if (tip == 7){\n    return "NEC";\n  } else if (tip == 18){\n    return "SONY";\n  } else if (tip == 8){\n    return "PANASONIC";\n  } else if (tip == 4){\n    return "JVC";\n  } else if (tip == 16){\n    return "SAMSUNG";\n  } else if (tip == 5){\n    return "LG";\n  } else if (tip == 3){\n    return "SHARP";\n  } else if (tip == 22){\n    return "LEGO_PF";\n  } else {\n    return String(tip);\n  }\n}\n';
    Blockly.Arduino.setups_["ljj_irremote_"]="IrReceiver.begin(5);\n";
  }
  return'if (IrReceiver.decode(&results)) {\n  if (results.decode_type>0){\n    myCodeType=ir_type(results.decode_type);\n    if (String(results.value, HEX)!="ffffffff"){\n      myIRcode=String(results.value, HEX);\n'+Blockly.Arduino.statementToCode(this,"IR_EVENT")+'}\n  }\n  IrReceiver.resume();\n}\n'
};

Blockly.Arduino.maqueen_ir_remote_received1=function(){
  var a=this.getFieldValue("IR_SIGNAL");
  return'if (ir_type(results.decode_type) == "NEC" && String(results.value, HEX) == "'+a+'") {\n'+Blockly.Arduino.statementToCode(this,"IR_RECEIVED")+'\n}\n';
};

Blockly.Arduino.maqueen_ir_remote_received2=function(){
  var a=this.getFieldValue("IR_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"IR_SIGNAL",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    if (a=="3")
      a="7";
    else if (a=="4")
      a="18";
    else if (a=="1")
      a="14";
    else if (a=="2")
      a="15";
  }
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
  if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.h>";
    Blockly.Arduino.definitions_.ljj_define_irremote_init="IRrecv IrReceiver("+a+");";
    Blockly.Arduino.definitions_.define_irremote_decode="decode_results results;\nString myCodeType;\nString myIRcode;";
    Blockly.Arduino.definitions_.define_irremote_ir_type_event='String ir_type(int tip)\n{\n  if (tip == 1){\n    return "RC5";\n  } else if (tip == 2){\n    return "RC6";\n  } else if (tip == 3){\n    return "NEC";\n  } else if (tip == 4){\n    return "SONY";\n  } else if (tip == 5){\n    return "PANASONIC";\n  } else if (tip == 6){\n    return "JVC";\n  } else if (tip == 7){\n    return "SAMSUNG";\n  } else if (tip == 10){\n    return "LG";\n  } else if (tip == 14){\n    return "SHARP";\n  } else if (tip == 17){\n    return "LEGO_PF";\n  } else {\n    return "UNKNOWN";\n  }\n}\n';
    Blockly.Arduino.setups_["ljj_irremote_"]||(Blockly.Arduino.setups_["ljj_irremote_"]="IrReceiver.enableIRIn();\n");
  } else {
    Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.hpp>";
    Blockly.Arduino.definitions_.ljj_define_irremote_decode="#define MY_IR_RECEIVE_PIN "+a+"\ndecode_results results;\nString myCodeType;\nString myIRcode;";
    Blockly.Arduino.definitions_.ljj_define_irremote_ir_type_event='String ir_type(int tip)\n{\n  if (tip == 14){\n    return "RC5";\n  } else if (tip == 15){\n    return "RC6";\n  } else if (tip == 7){\n    return "NEC";\n  } else if (tip == 18){\n    return "SONY";\n  } else if (tip == 8){\n    return "PANASONIC";\n  } else if (tip == 4){\n    return "JVC";\n  } else if (tip == 16){\n    return "SAMSUNG";\n  } else if (tip == 5){\n    return "LG";\n  } else if (tip == 3){\n    return "SHARP";\n  } else if (tip == 22){\n    return "LEGO_PF";\n  } else {\n    return String(tip);\n  }\n}\n';
    Blockly.Arduino.setups_["ljj_irremote_"]||(Blockly.Arduino.setups_["ljj_irremote_"]="IrReceiver.begin(MY_IR_RECEIVE_PIN);\n");
  }
  return''
};

Blockly.Arduino.ir_receiver_pin1=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.h>";
    Blockly.Arduino.definitions_.ljj_define_irremote_init="IRrecv IrReceiver("+a+");";
    Blockly.Arduino.definitions_.define_irremote_decode="decode_results results;\nString myCodeType;\nString myIRcode;";
    Blockly.Arduino.definitions_.define_irremote_ir_type_event='String ir_type(int tip)\n{\n  if (tip == 1){\n    return "RC5";\n  } else if (tip == 2){\n    return "RC6";\n  } else if (tip == 3){\n    return "NEC";\n  } else if (tip == 4){\n    return "SONY";\n  } else if (tip == 5){\n    return "PANASONIC";\n  } else if (tip == 6){\n    return "JVC";\n  } else if (tip == 7){\n    return "SAMSUNG";\n  } else if (tip == 10){\n    return "LG";\n  } else if (tip == 14){\n    return "SHARP";\n  } else if (tip == 17){\n    return "LEGO_PF";\n  } else {\n    return "UNKNOWN";\n  }\n}\n';
    Blockly.Arduino.setups_["ljj_irremote_"]||(Blockly.Arduino.setups_["ljj_irremote_"]="IrReceiver.enableIRIn();\n");
  } else {
    Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.hpp>";
    Blockly.Arduino.definitions_.ljj_define_irremote_decode="#define MY_IR_RECEIVE_PIN "+a+"\ndecode_results results;\nString myCodeType;\nString myIRcode;";
    Blockly.Arduino.definitions_.ljj_define_irremote_ir_type_event='String ir_type(int tip)\n{\n  if (tip == 14){\n    return "RC5";\n  } else if (tip == 15){\n    return "RC6";\n  } else if (tip == 7){\n    return "NEC";\n  } else if (tip == 18){\n    return "SONY";\n  } else if (tip == 8){\n    return "PANASONIC";\n  } else if (tip == 4){\n    return "JVC";\n  } else if (tip == 16){\n    return "SAMSUNG";\n  } else if (tip == 5){\n    return "LG";\n  } else if (tip == 3){\n    return "SHARP";\n  } else if (tip == 22){\n    return "LEGO_PF";\n  } else {\n    return String(tip);\n  }\n}\n';
    Blockly.Arduino.setups_["ljj_irremote_"]||(Blockly.Arduino.setups_["ljj_irremote_"]="IrReceiver.begin(MY_IR_RECEIVE_PIN);\n");
  }
  return''
};

Blockly.Arduino.ir_receiver_7697_pin=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.h>";
  Blockly.Arduino.definitions_.ljj_define_irremote_init="IRrecv irrecv("+a+");";
  Blockly.Arduino.definitions_.define_irremote_decode="decode_results results;\nString myCodeType;\nString myIRcode;";
  Blockly.Arduino.definitions_.define_irremote_ir_type_event='String ir_type(int tip)\n{\n  if (tip == 1){\n    return "RC5";\n  } else if (tip == 2){\n    return "RC6";\n  } else if (tip == 3){\n    return "NEC";\n  } else if (tip == 4){\n    return "SONY";\n  } else if (tip == 5){\n    return "PANASONIC";\n  } else if (tip == 6){\n    return "JVC";\n  } else if (tip == 7){\n    return "SAMSUNG";\n  } else if (tip == 10){\n    return "LG";\n  } else if (tip == 14){\n    return "SHARP";\n  } else if (tip == 17){\n    return "LEGO_PF";\n  } else {\n    return "UNKNOWN";\n  }\n}\n';
  Blockly.Arduino.setups_["ljj_irremote_"]||(Blockly.Arduino.setups_["ljj_irremote_"]="irrecv.enableIRIn();\n");
  return''
};

Blockly.Arduino.ir_sender_8266_pin=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremoteESP8266.h>";
  Blockly.Arduino.definitions_.define_irsend_esp8266="#include <IRsend.h>";
  Blockly.Arduino.definitions_.ljj_define_irremote_init="IRsend irsend("+a+");";
  Blockly.Arduino.setups_.setup_esp8266_ir_send="irsend.begin();\n";
  return'';
};

Blockly.Arduino.ljj_ir_sender_pin=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.h>";
    Blockly.Arduino.definitions_.ljj_define_irremote_send_init="IRsend IrSender;";
  } else {
    Blockly.Arduino.definitions_.ljj_define_irremote_include="#define NO_LED_FEEDBACK_CODE\n#include <PinDefinitionsAndMore.h>\n#define IR_SEND_PIN "+a+"\n#include <IRremote.hpp>";
    Blockly.Arduino.setups_.setup_ljj_ir_send='IrSender.begin();';
  }
  return'';
};

Blockly.Arduino.ljj_ir_send=function(){
  var a=this.getFieldValue("IR_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"CODE",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.h>";
    Blockly.Arduino.definitions_.ljj_define_irremote_send_init="IRsend IrSender;";
  }
  Blockly.Arduino.definitions_.ljj_define_send_ir_event="int x2i(const char *s)\n{\n  int x = 0;\n  for(;;) {\n    char c = *s;\n    if (c >= '0' && c <= '9') {\n      x *= 16;\n      x += c - '0';\n    }  else if (c >= 'a' && c <= 'f') {\n      x *= 16;\n      x += (c - 'a') + 10;\n    }\n    else break;\n    s++;\n  }\n  return x;\n}";
  if (a == "NEC") {
    return"IrSender.sendNEC(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "SONY"){
    return"IrSender.sendSony(x2i(String("+b+").c_str()), 12);\n"
  } else if (a == "RC5") {
    return"IrSender.sendRC5(x2i(String("+b+").c_str()), 12);\n"
  } else if (a == "RC6") {
    return"IrSender.sendRC6(x2i(String("+b+").c_str()), 20);\n"
  } else if (a == "JVC") {
    return"IrSender.sendJVC(x2i(String("+b+").c_str()),16, false);\n"
  } else if (a == "SAMSUNG") {
    return"IrSender.sendSAMSUNG(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "LG") {
    return"IrSender.sendLG(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "LEGO_PF") {
    return"IrSender.sendLegoPowerFunctions(x2i(String("+b+").c_str()), true);\n"
  } else {
    return'';
  }
};

Blockly.Arduino.ljj_ir_send2=function(){
  var a=Blockly.Arduino.valueToCode(this,"IR_TYPE",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"CODE",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.h>";
    Blockly.Arduino.definitions_.ljj_define_irremote_send_init="IRsend IrSender;";
  }
  a=a.replace(/\"/g,'');
  a=a.toUpperCase();
  Blockly.Arduino.definitions_.ljj_define_send_ir_event="int x2i(const char *s)\n{\n  int x = 0;\n  for(;;) {\n    char c = *s;\n    if (c >= '0' && c <= '9') {\n      x *= 16;\n      x += c - '0';\n    }  else if (c >= 'a' && c <= 'f') {\n      x *= 16;\n      x += (c - 'a') + 10;\n    }\n    else break;\n    s++;\n  }\n  return x;\n}";
  if (a == "NEC") {
    return"IrSender.sendNEC(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "SONY"){
    return"IrSender.sendSony(x2i(String("+b+").c_str()), 12);\n"
  } else if (a == "RC5") {
    return"IrSender.sendRC5(x2i(String("+b+").c_str()), 12);\n"
  } else if (a == "RC6") {
    return"IrSender.sendRC6(x2i(String("+b+").c_str()), 20);\n"
  } else if (a == "JVC") {
    return"IrSender.sendJVC(x2i(String("+b+").c_str()),16, false);\n"
  } else if (a == "SAMSUNG") {
    return"IrSender.sendSAMSUNG(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "LG") {
    return"IrSender.sendLG(x2i(String("+b+").c_str()), 32);\n"
  } else if (a == "LEGO_PF") {
    return"IrSender.sendLegoPowerFunctions(x2i(String("+b+").c_str()), true);\n"
  } else {
    return'';
  }
};


Blockly.Arduino.ir_event=function(){
  var a=Blockly.Arduino.statementToCode(this,"IR_EVENT");
  a="    "+a.replace(/\n/g,'\n    ');
  return'if (IrReceiver.decode(&results)) {\n  if (results.decode_type>0){\n    myCodeType=ir_type(results.decode_type);\n    if (String(results.value, HEX)!="ffffffff"){\n      myIRcode=String(results.value, HEX);\n'+a+'}\n  }\n  IrReceiver.resume();\n}\n'
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


//Lumex 7-seg
Blockly.Arduino.lmx_7_seg={};
Blockly.Arduino.lmx_7seg_init=function(){
  if (Blockly.Arduino.my_board_type=="ESP32"){
    var a=Blockly.Arduino.valueToCode(this,"TX_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
        b=Blockly.Arduino.valueToCode(this,"RX_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
        c=this.getFieldValue("UART_NO");
    Blockly.Arduino.definitions_.define_lmx_7seg_esp32_init_invoke="byte lmx7SegDigits=4;";
    Blockly.Arduino.lmx_7_seg.allDigits=""+4;
    Blockly.Arduino.definitions_.define_lmx_7seg_esp32_init_event='void sendToLMX_7seg(String myCommand){\n  '+c+'.print(myCommand);\n  while('+c+'.read()!=\'E\'){}\n  delay(10);\n}\n';
    return c+'.begin(115200,SERIAL_8N1,'+b+','+a+');\nsendToLMX_7seg("atf2=(4)");\n';
  } else {
    return'';
  }
};

Blockly.Arduino.lmx_7seg_7697_init=function(){
  if (Blockly.Arduino.my_board_type!="ESP32"){
    var c=this.getFieldValue("UART_NO");
    Blockly.Arduino.definitions_.define_lmx_7seg_esp32_init_invoke="byte lmx7SegDigits=4;";
    Blockly.Arduino.lmx_7_seg.allDigits=""+4;
    Blockly.Arduino.definitions_.define_lmx_7seg_esp32_init_event='void sendToLMX_7seg(String myCommand){\n  '+c+'.print(myCommand);\n  while('+c+'.read()!=\'E\'){}\n  delay(10);\n}\n';
    return c+'.begin(115200);\nsendToLMX_7seg("atf2=(4)");\n';
  } else {
    return'';
  }
};

Blockly.Arduino.lmx_7seg_digits_count=function(){
  var a=this.getFieldValue("DIGITS");
  Blockly.Arduino.lmx_7_seg.allDigits=""+a;
  Blockly.Arduino.definitions_.define_lmx_7seg_esp32_init_invoke='byte lmx7SegDigits='+a+';';
  return'';
};

Blockly.Arduino.lmx_7seg_clear=function(){
  return'sendToLMX_7seg("ATd0=()");\n';
};

Blockly.Arduino.lmx_7seg_blink=function(){
  var a=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return'sendToLMX_7seg(String("")+"ate1=("+'+a+'+")");\nsendToLMX_7seg("ate0=(1)");\n';
};

Blockly.Arduino.lmx_7seg_no_blink=function(){
  return'sendToLMX_7seg("ate0=(0)");\n';
};

Blockly.Arduino.lmx_7seg_light_level=function(){
  var a=Blockly.Arduino.valueToCode(this,"LIGHT",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return'sendToLMX_7seg(String("")+"atf2=("+'+a+'+")");\n';
};

Blockly.Arduino.lmx_7seg_putNumber=function(){
  var a=Blockly.Arduino.valueToCode(this,"MY_NUM",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("ALIGN_TYPE");
  var myTempStr=""+a;
  var tempStr=myTempStr;
  var allDigits=parseInt(Blockly.Arduino.lmx_7_seg.allDigits);
  if (b=="right"){
    if (tempStr.length<allDigits){
      for(let i=0;i<(allDigits-tempStr.length);i++)
        myTempStr=" "+myTempStr;
    }
    return'sendToLMX_7seg(String("")+'+myTempStr+');\n';
  } else {
    return'sendToLMX_7seg(String("")+'+myTempStr+');\n';
  }
};

Blockly.Arduino.lmx_7seg_putString=function(){
  var a=Blockly.Arduino.valueToCode(this,"MY_TEXT",Blockly.Arduino.ORDER_ATOMIC)||"",
      returnStr="";
  var myTempStr=a;
  myTempStr=myTempStr.replace(/\"/g,'');
  var max=myTempStr.length;
  var allDigits=parseInt(Blockly.Arduino.lmx_7_seg.allDigits);
  if (max>allDigits)
    max=allDigits;
  for(i=0;i<max;i++)
    returnStr+='sendToLMX_7seg("AT80=(0,'+i+','+myTempStr.substr(i, 1)+')");\n';
  return returnStr;
}

Blockly.Arduino.lmx_7seg_putSingle=function(){
  var a=Blockly.Arduino.valueToCode(this,"MY_NUM",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"POS",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return'sendToLMX_7seg(String("")+"AT80=(0,"+'+b+'+","+'+a+'+")");\n';
}

Blockly.Arduino.lmx_7seg_clear_indicator=function(){
  var a=this.getFieldValue("ALIGN_TYPE");
  var returnStr="";
  if (a=="6"){
    returnStr+='sendToLMX_7seg("at80=(0,4, )");\n';
    returnStr+='sendToLMX_7seg("at80=(0,5, )");\n';
  } else {
    returnStr='sendToLMX_7seg("at80=(0,'+a+', )");\n'
  }
  return returnStr;
}

Blockly.Arduino.lmx_7seg_indicatorLevel=function(){
  var a=this.getFieldValue("ALIGN_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"LEVEL",Blockly.Arduino.ORDER_ATOMIC)||"0";
  var returnStr="";
  if (a=="6"){
    returnStr+='sendToLMX_7seg(String("")+"at80=(0,4,"+'+b+'+")");\n';
    returnStr+='sendToLMX_7seg(String("")+"at80=(0,5,"+'+b+'+")");\n';
  } else {
    returnStr='sendToLMX_7seg(String("")+"at80=(0,'+a+',"+'+b+'+")");\n';
  }
  return returnStr;
}

Blockly.Arduino.lmx_7seg_mode_indicator=function(){
  var a=this.getFieldValue("MODE");
  return'sendToLMX_7seg("ate2=('+a+')");\n';
}


//LDM6432
Blockly.Arduino.ldm6432={};
Blockly.Arduino.LDM_Check_prefix="if (ended){\n  ended=((!waitForE)||pubCtrl);\n";
Blockly.Arduino.LDM_Check_postfix="  while(!ended){myClient.loop();}\n  ended=true;\n  if((!waitForE)||pubCtrl)\n    delay(250);\n}\n";
Blockly.Arduino.LDM_Check_postfix2="  while(!ended){myClient.loop();}\n  ended=true;\n  delay(800);\n}\n";
Blockly.Arduino.ldm_mqtt_topic=function(){
  var a=Blockly.Arduino.valueToCode(this,"TOPIC",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.LDM_CONNECTION_TYPE="MQTT";
  Blockly.Arduino.definitions_.define_ldm6432_topic_invoke='String ldmTopic="";\nString echoTopic="";\nString bitmapTopic="";\n';
  var tempCode='  if (receivedTopic == echoTopic){\n    if (receivedMsg == "E") {\n      ended = true;\n    }\n  }\n';
  Blockly.Arduino.mqtt_callback_body=Blockly.Arduino.mqtt_callback_body.replace(tempCode,"");
  Blockly.Arduino.mqtt_callback_body+=tempCode;
  return'pubCtrl=false;\nldmTopic=String("ezDisplay/")+'+a+';\nbitmapTopic=String("Bitmap/")+'+a+';\nechoTopic=String("Echo/")+'+a+';\nmyClient.subscribe(echoTopic.c_str());\n';
};

Blockly.Arduino.ldm_mqtt_public=function(){
  var a=Blockly.Arduino.valueToCode(this,"TOPIC",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"BITMAP_TOPIC",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.LDM_CONNECTION_TYPE="MQTT";
  Blockly.Arduino.definitions_.define_ldm6432_topic_invoke='String ldmTopic="";\nString echoTopic="";\nString bitmapTopic="";\n';
  //Blockly.Arduino.mqtt_callback_body+='  if (receivedTopic == echoTopic){\n    if (receivedMsg == "E") {\n      ended = true;\n    }\n  }\n';
  return'pubCtrl=true;\nldmTopic='+a+';\nbitmapTopic='+b+';\nechoTopic="NoThisTopic";\n';
};

Blockly.Arduino.ldm_send_bitmap=function(){
  var a=Blockly.Arduino.valueToCode(this,"BITMAP",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT")
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(bitmapTopic.c_str(),String('+a+').c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  else
    return'';
};

Blockly.Arduino.ldm_esp32_init=function(){
  Blockly.Arduino.LDM_CONNECTION_TYPE="SERIAL";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    var a=Blockly.Arduino.valueToCode(this,"TX_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
        b=Blockly.Arduino.valueToCode(this,"RX_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
        c=this.getFieldValue("UART_NO");
    Blockly.Arduino.definitions_.define_ldm6432_esp32_init_event='void sendToLDM6432(const char* myCommand){\n  '+c+'.print(myCommand);\n  while('+c+'.read()!=\'E\'){}\n}\n';
    return c+'.begin(115200,SERIAL_8N1,'+b+','+a+');\n';
  } else {
    return'';
  }
};

Blockly.Arduino.ldm_7697_init=function(){
  Blockly.Arduino.LDM_CONNECTION_TYPE="SERIAL";
  if (Blockly.Arduino.my_board_type!="ESP32"){
    var c=this.getFieldValue("UART_NO");
    Blockly.Arduino.definitions_.define_ldm6432_esp32_init_event='void sendToLDM6432(const char* myCommand){\n  '+c+'.print(myCommand);\n  while('+c+'.read()!=\'E\'){}\n}\n';
    return c+'.begin(115200);\n';
  } else {
    return'';
  }
};

Blockly.Arduino.ldm_waitForE=function(){
  var a=this.getFieldValue("WAITFORE");
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    if (a=="1")
      return'waitForE=true;\n'
    else
      return'waitForE=false;\n'
  } else {
    return'';
  }
};

Blockly.Arduino.ldm_clock=function(){
  var sendCommand=this.getFieldValue("CLOCK");
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+sendCommand+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix2;
  } else {
    return 'sendToLDM6432(String("'+sendCommand+'").c_str());\n';
  }
};

Blockly.Arduino.ldm_clear=function(){
  var sendCommand='ATd0=()';
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+sendCommand+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String("'+sendCommand+'").c_str());\n';
  }
};

Blockly.Arduino.ldm_display=function(){
  var sendCommand='ATd1=()';
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+sendCommand+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String("'+sendCommand+'").c_str());\n';
  }
};

Blockly.Arduino.ldm_on_off=function(){
  var sendCommand=this.getFieldValue("LDM");
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+sendCommand+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String("'+sendCommand+'").c_str());\n';
  }
};

Blockly.Arduino.ldm_show_ver=function(){
  var sendCommand='AT20=()';
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+sendCommand+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String("'+sendCommand+'").c_str());\n';
  }
};

Blockly.Arduino.ldm_command=function(){
  var sendCommand=Blockly.Arduino.valueToCode(this,"COMMAND",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String('+sendCommand+').c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String('+sendCommand+').c_str());\n';
  }
};

Blockly.Arduino.ldm_showPage1=function(){
  var a=Blockly.Arduino.valueToCode(this,"PAGE",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATfc=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String(String("ATfc=(") +'+a+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_effectSpeed=function(){
  var a=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATbf=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String(String("ATbf=(") +'+a+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_showPage2=function(){
  var a=Blockly.Arduino.valueToCode(this,"PAGE",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("EFFECT");
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATfc=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
    b=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+b+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix2;
    return a+b;
  } else {
    return 'sendToLDM6432(String(String("ATfc=(") +'+a+'+")").c_str());\nsendToLDM6432(String("'+b+'").c_str());\n';
  }  
};

Blockly.Arduino.ldm_stop_animation=function(){
  var sendCommand='ATfd=(0)';
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+sendCommand+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix2;
  } else {
    return 'sendToLDM6432(String("'+sendCommand+'").c_str());\n';
  }
};

Blockly.Arduino.ldm_saveToROM=function(){
  var sendCommand='ATfe=()';
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+sendCommand+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String("'+sendCommand+'").c_str());\n';
  }
};

Blockly.Arduino.ldm_pagesInterval=function(){
  var a=Blockly.Arduino.valueToCode(this,"INTERVAL",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATbe=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String(String("ATbe=(") +'+a+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_playPages=function(){
  var a=Blockly.Arduino.valueToCode(this,"PAGES",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("EFFECT");
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATdf=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
    b=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+b+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix2;
    return a+b;
  } else {
    return 'sendToLDM6432(String(String("ATdf=(") +'+a+'+")").c_str());\nsendToLDM6432(String("'+b+'").c_str());\n';
  }
};

Blockly.Arduino.ldm_setColor=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATef=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
    return a;
  } else {
    return 'sendToLDM6432(String(String("ATef=(") +'+a+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_putString=function(){
  var a=Blockly.Arduino.valueToCode(this,"PUTSTRING",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("FONT"),
      c=Blockly.Arduino.valueToCode(this,"LINE",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"COLUMN",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+b +'(") +'+c+'+","+'+ d+'+","+'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
    return a;
  } else {
    return 'sendToLDM6432(String(String("'+b +'(") +'+c+'+","+'+ d+'+","+'+a+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_transparent=function(){
  var a=this.getFieldValue("TRANSPARENT");
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("'+a+'").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String("'+a+'").c_str());\n';
  }
};

Blockly.Arduino.ldm_colorCode=function(){
  var a=this.getFieldValue("COLOR_CODE");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ldm_background=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATec=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String(String("ATec=(") +'+a+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_global_change_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR1",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"COLOR2",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATcc=(") +'+a +'+","+'+ b+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String(String("ATcc=(") +'+a +'+","+'+ b+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_local_change_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"WIDTH",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"HEIGHT",Blockly.Arduino.ORDER_ATOMIC)||"",
      e=Blockly.Arduino.valueToCode(this,"COLOR1",Blockly.Arduino.ORDER_ATOMIC)||"",
      f=Blockly.Arduino.valueToCode(this,"COLOR2",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATcf=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+","+'+f+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String(String("ATcf=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+","+'+f+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_setXYcolor=function(){
  var a=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATee=(") +'+a +'+","+'+ b +'+","+'+ c+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String(String("ATee=(") +'+a +'+","+'+ b +'+","+'+ c+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_allColorChange=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("ATc0=(") +'+a+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String(String("ATc0=(") +'+a+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_drawLine=function(){
  var a=Blockly.Arduino.valueToCode(this,"X1",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y1",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"X2",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"Y2",Blockly.Arduino.ORDER_ATOMIC)||"",
      e=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT90=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String(String("AT90=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_drawRectangle=function(){
  var a=Blockly.Arduino.valueToCode(this,"X1",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y1",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"X2",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"Y2",Blockly.Arduino.ORDER_ATOMIC)||"",
      e=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
      f=this.getFieldValue("FILLED_TYPE");
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    if (f=="1")
      return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT92=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
    else
      return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT91=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    if (f=="1")
      return 'sendToLDM6432(String(String("AT92=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+")").c_str());\n';
    else
      return 'sendToLDM6432(String(String("AT91=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+","+'+e+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_drawCircle=function(){
  var a=Blockly.Arduino.valueToCode(this,"X1",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y1",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"RADIUS",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
      e=this.getFieldValue("FILLED_TYPE");
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    if (e=="1")
      return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT95=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
    else
      return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT94=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    if (e=="1")
      return 'sendToLDM6432(String(String("AT95=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+")").c_str());\n';
    else
      return 'sendToLDM6432(String(String("AT94=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_drawSquare=function(){
  var a=Blockly.Arduino.valueToCode(this,"X1",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"Y1",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"WIDTH",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("AT93=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String(String("AT93=(") +'+a +'+","+'+ b +'+","+'+ c+'+","+'+ d+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_pageScroll=function(){
  var a=this.getFieldValue("SCROLL_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"SCROLLTIME",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+a +'(") +'+b+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
    return a;
  } else {
    return 'sendToLDM6432(String(String("'+a +'(") +'+b+'+")").c_str());\n';
  } 
};

Blockly.Arduino.ldm_eraseImageInOut=function(){
  var a=this.getFieldValue("SCROLL_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"SCROLLTIME",Blockly.Arduino.ORDER_ATOMIC)||"";
  var myCommand="";
  if(a=="0")
    myCommand="ATaa=";
  else
    myCommand="ATab=";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+myCommand +'(") +'+b+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
    return a;
  } else {
    return 'sendToLDM6432(String(String("'+myCommand +'(") +'+b+'+")").c_str());\n';
  } 
};

Blockly.Arduino.ldm_showImageInOut=function(){
  var a=this.getFieldValue("SCROLL_TYPE"),
      b=Blockly.Arduino.valueToCode(this,"SCROLLTIME",Blockly.Arduino.ORDER_ATOMIC)||"";
  var myCommand="";
  if(a=="0")
    myCommand="ATa8=";
  else
    myCommand="ATa9=";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+myCommand +'(") +'+b+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
    return a;
  } else {
    return 'sendToLDM6432(String(String("'+myCommand +'(") +'+b+'+")").c_str());\n';
  } 
};

Blockly.Arduino.ldm_saveDisplayed=function(){
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("AT2c=()").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String("AT2c=()").c_str());\n';
  } 
};

Blockly.Arduino.ldm_loadDisplayed=function(){
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("AT2d=()").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String("AT2d=()").c_str());\n';
  } 
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
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+myCommand +'(") +'+b +'+","+'+ c+'+","+'+ d+'+","+'+ d+'+","+'+ e+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
    return a;
  } else {
    return 'sendToLDM6432(String(String("'+myCommand +'(") +'+b +'+","+'+ c+'+","+'+ d+'+","+'+ d+'+","+'+ e+'+")").c_str());\n';
  } 
};

Blockly.Arduino.ldm_movePattern=function(){
  var a=this.getFieldValue("MOVE_TYPE"),
      b=this.getFieldValue("ICON_TYPE"),
      c=Blockly.Arduino.valueToCode(this,"ICON_ID",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    a=Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String(String("'+a +'(") +'+b +'+","+'+ b+'+","+'+ c+'+")").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
    return a;
  } else {
    return 'sendToLDM6432(String(String("'+a +'(") +'+b +'+","+'+ b+'+","+'+ c+'+")").c_str());\n';
  }
};

Blockly.Arduino.ldm_showAll=function(){
  if (Blockly.Arduino.LDM_CONNECTION_TYPE=="MQTT"){
    return Blockly.Arduino.LDM_Check_prefix+'  myClient.publish(ldmTopic.c_str(),String("AT2f=()").c_str());\n'+Blockly.Arduino.LDM_Check_postfix;
  } else {
    return 'sendToLDM6432(String("AT2f=()").c_str());\n';
  }
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
    Blockly.Arduino.definitions_.define_xbm_invoke='unsigned char xBitMap[1024];\n';
	  Blockly.Arduino.definitions_.define_showXBM_event="void showXBM(String myXBM,unsigned char *myBitMap){\n    myXBM.replace(\" \",\"\");\n    myXBM.replace(\"\\r\",\"\");\n    myXBM.replace(\"\\n\",\"\");\n    StringSplitter *splitter = new StringSplitter(myXBM, ',', 1024);\n    for(int i = 0; i < 1024; i++){\n      myBitMap[i]= 0;\n    }\n    for(int i = 0; i < splitter->getItemCount(); i++){\n      splitter->getItemAtIndex(i)=\"0x\"+splitter->getItemAtIndex(i);\n      myBitMap[i]= strtol(splitter->getItemAtIndex(i).c_str(), 0, 16);       \n    }\n    delete splitter;\n}\n";
    return'showXBM('+a+',xBitMap);\nu8g2.clearBuffer();\nu8g2.drawXBMP(0, 0, 128, 64, xBitMap);\n';
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
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
    Blockly.Arduino.definitions_.define_getDataFromRTC_event="int get_data_from_RTC(byte dataType) {\n  int myResult=0;\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  switch(dataType){\n    case 0:\n      myResult=(1900 + t_st->tm_year);\n      break;\n    case 1:\n      myResult=( 1 + t_st->tm_mon);\n      break;\n    case 2:\n      myResult=t_st->tm_mday;\n      break;\n    case 3:\n      myResult=t_st->tm_hour;\n      break;\n    case 4:\n      myResult=t_st->tm_min;\n      break;\n    case 5:\n      myResult=t_st->tm_sec;\n      break;\n  }\n  return myResult;\n}\n";
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
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_fetch_airbox_invoke=Blockly.Arduino.definitions_.define_fetch_airbox_invoke.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_fetch_airbox_invoke=Blockly.Arduino.definitions_.define_fetch_airbox_invoke.replace(" client;\n"," client;\n  client.setInsecure();\n");
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
  if (Blockly.Arduino.my_board_type=="Pico")
    Blockly.Arduino.definitions_.define_fetch_stock_invoke=Blockly.Arduino.definitions_.define_fetch_stock_invoke.replace(" close"," Keep-Alive"); 
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_fetch_stock_invoke=Blockly.Arduino.definitions_.define_fetch_stock_invoke.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_fetch_stock_invoke=Blockly.Arduino.definitions_.define_fetch_stock_invoke.replace(" stockClient;\n"," stockClient;\n  stockClient.setInsecure();\n");
  }
  var a=Blockly.Arduino.valueToCode(this,"STOCKID",Blockly.Arduino.ORDER_ATOMIC)||"";
	return'fetchStockInfo(String('+a+').c_str());\n'
};

Blockly.Arduino.stock_getValue=function(){
  var a=this.getFieldValue("VALUE_NAME");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

//Google Translation
Blockly.Arduino.translation={};
Blockly.Arduino.fetchTranslation=function(){
  var a=Blockly.Arduino.valueToCode(this,"SOURCE_TEXT",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"LANG_CODE",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_translation_invoke='String translateResult="";';
  Blockly.Arduino.definitions_.define_urlencode_event="String URLEncode(const char* msg)\n{\n  const char *hex = \"0123456789abcdef\";\n  String encodedMsg = \"\";\n  while (*msg!='\\0'){\n      if( ('a' <= *msg && *msg <= 'z')\n              || ('A' <= *msg && *msg <= 'Z')\n              || ('0' <= *msg && *msg <= '9') ) {\n          encodedMsg += *msg;\n      } else {\n          encodedMsg += '%';\n          encodedMsg += hex[*msg >> 4];\n          encodedMsg += hex[*msg & 15];\n      }\n      msg++;\n  }\n  return encodedMsg;\n}\n";
  Blockly.Arduino.definitions_.define_fetch_translation_invoke='void translateText(const String& lang_code, const String& myText){\n  translateResult="";\n  static TLSClient translateClient;\n  const char* host="translate.googleapis.com";\n  String url="/translate_a/single?client=gtx&sl=auto&dt=t&tl="+lang_code+"&q="+myText;\n  translateClient.connect(host, 443);\n  while (!translateClient.connected());\n  translateClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  while (!translateClient.available());\n  String result="";\n  while (translateClient.available()){\n    result=translateClient.readStringUntil(\'\\n\');\n    if (result.startsWith("[[[\\"")){\n      result.replace("[[[\\"","");\n      result.replace("\\\\\\"","&&&");\n      result=result.substring(0,result.indexOf(\'\\"\'));\n      result.replace("&&&","\\"");\n      translateResult=result;\n      break;\n    }\n  }\n  translateClient.stop();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_fetch_translation_invoke=Blockly.Arduino.definitions_.define_fetch_translation_invoke.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_fetch_translation_invoke=Blockly.Arduino.definitions_.define_fetch_translation_invoke.replace(" translateClient;\n"," translateClient;\n  translateClient.setInsecure();\n");
  }
	return'translateText('+b+',URLEncode(String('+a+').c_str()));\n'
};

Blockly.Arduino.translation_result=function(){
  return['translateResult',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.language_code=function(){
  var a=this.getFieldValue("LANG_CODE");
  return['"'+a+'"',Blockly.Arduino.ORDER_ATOMIC];
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
  Blockly.Arduino.definitions_.define_broadcast_port="const int UDP_BUFFER_SIZE=255;\nuint16_t UDP_LISTEN_PORT="+a+";\nWiFiUDP castUdp;\nIPAddress broadcastIP;\nIPAddress myBroadCastIP;\nchar broadcastBuffer[UDP_BUFFER_SIZE];\n";
  Blockly.Arduino.definitions_.define_broadcast_send_event="\nvoid sendBroadcastUDP(IPAddress broadcastIP, const char* myMessage){\n  castUdp.beginPacket(broadcastIP,UDP_LISTEN_PORT);\n  for (int myi = 0; myi < strlen(myMessage); myi++)\n  {\n    castUdp.write(myMessage[myi]);\n  }\n  castUdp.endPacket();\n}\n";
  Blockly.Arduino.definitions_.define_broadcast_check1_event="\nvoid myCheckUDP(){\n}\n";
  Blockly.Arduino.definitions_.define_broadcast_check2_event="\nvoid checkBroadcastUDP(){\n  int packetSize = castUdp.parsePacket();\n  if (packetSize) {\n    int len = castUdp.read(broadcastBuffer, UDP_BUFFER_SIZE);\n    if (len > 0) {\n      broadcastBuffer[len] = 0;\n      myCheckUDP();\n    }\n  }\n}\n";
  return"castUdp.begin(UDP_LISTEN_PORT);\nbroadcastIP=IPAddress(WiFi.localIP()[0],WiFi.localIP()[1],WiFi.localIP()[2],255);\n"
};

Blockly.Arduino.broadcast_udp_check_msg=function(){
  return'checkBroadcastUDP();\n';
};


Blockly.Arduino.broadcast_udp_send=function(){
  var a=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"";
  //var myReturStr='IPAddress myBroadCastIP(WiFi.localIP()[0],WiFi.localIP()[1],WiFi.localIP()[2],255);\nsendBroadcastUDP(myBroadCastIP,String('+a+').c_str());\n'
  var myReturStr='sendBroadcastUDP(broadcastIP,String('+a+').c_str());\n'
  return myReturStr;
};

Blockly.Arduino.broadcast_udp_send_to_ip=function(){
  var a=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"IP",Blockly.Arduino.ORDER_ATOMIC)||"";
  myReturStr='myBroadCastIP.fromString('+b+');\nsendBroadcastUDP(myBroadCastIP,String('+a+').c_str());\n'
  return myReturStr;
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

Blockly.Arduino.broadcast_udp_received_v7rc=function(){
  var a=this.getFieldValue("TYPE"),
      b=Blockly.Arduino.statementToCode(this,"STATEMENT");
  return 'if (String(broadcastBuffer).startsWith("'+a+'")){\n  byte numberBase='+ ((a=='LED' || a=='LE2')?'16':'10') +';\n'+b+'}\n'
}

Blockly.Arduino.broadcast_udp_received_msg_v7rc=function(){
  var a=this.getFieldValue("CHANNEL"),
      b=this.getFieldValue("VALUE_TYPE"),
      startsIndex=parseInt(a)*4+3,
      endsIndex=startsIndex+4;
  if (b=="Number")
    return['strtol(String(broadcastBuffer).substring('+startsIndex+','+endsIndex+').c_str(),0,numberBase)',Blockly.Arduino.ORDER_ATOMIC];
  else
    return['String(broadcastBuffer).substring('+startsIndex+','+endsIndex+')',Blockly.Arduino.ORDER_ATOMIC];
}

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
  Blockly.Arduino.loops_.ljj_webserver_loop = "checkWebClient();\n";
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
  else if ((Blockly.Arduino.my_board_type=="ESP32") || (Blockly.Arduino.my_board_type=="Pico"))
    Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <WiFi.h>";
  else if (Blockly.Arduino.my_board_type=="ESP8266")
    Blockly.Arduino.definitions_.define_linkit_wifi_include="#include <ESP8266WiFi.h>";
  Blockly.Arduino.definitions_.define_linkit_wifi_ssid='char _lwifi_ssid[] = "'+a+'";';
  Blockly.Arduino.definitions_.define_linkit_wifi_pass='char _lwifi_pass[] = "'+b+'";';
  if (Blockly.Arduino.my_board_type=="7697")
    return"while (WiFi.begin(_lwifi_ssid, _lwifi_pass) != WL_CONNECTED) { delay(1000); }\n";
  else if ((Blockly.Arduino.my_board_type=="ESP32") || (Blockly.Arduino.my_board_type=="Pico"))
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

Blockly.Arduino.dht_read=function(){
  var a=this.getFieldValue("SENSOR"),
      b=this.getFieldValue("PIN"),
      c=this.getFieldValue("TYPE"),
      d=a.toLowerCase()+"_p"+b;
  if (Blockly.Arduino.my_board_type=="Arduino" || Blockly.Arduino.my_board_type=="Pico")
    Blockly.Arduino.definitions_.define_dht_include="#include <DHT_mini.h>";
  else
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


Blockly.Arduino.dht_read_pin=function(){
  var a=this.getFieldValue("SENSOR"),
  b=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
  c=this.getFieldValue("TYPE"),
  d=a.toLowerCase()+"_p"+b;
  if (Blockly.Arduino.my_board_type=="Arduino" || Blockly.Arduino.my_board_type=="Pico")
    Blockly.Arduino.definitions_.define_dht_include="#include <DHT_mini.h>";
  else
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

Blockly.Arduino.custom_declaire=function(){
  var a=Blockly.Arduino.valueToCode(this,"CODE",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace("\"","");
  a=a.replace(/\"*$/, "");
  var words = a.split('\\\\n');
  if (!Blockly.Arduino.definitions_.define_custom_declaire)
    Blockly.Arduino.definitions_.define_custom_declaire='';
  for(i=0;i<words.length;i++)
    Blockly.Arduino.definitions_.define_custom_declaire+=(words[i]+'\n');
  return '';
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

Blockly.Arduino.board_spi_reset=function(){
  var a=Blockly.Arduino.valueToCode(this,"SCLK_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"MISO_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"MOSI_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      d=Blockly.Arduino.valueToCode(this,"CS_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_spi="#include <SPI.h>";
  Blockly.Arduino.definitions_.define_SD_CS_invoke='int pinCS=SS;';
  return'pinCS='+d+';\nSPI.begin('+a+','+b+','+c+',pinCS);\n';
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

Blockly.Arduino.board_nano_pins=function(){
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
    Blockly.Arduino.setups_["esp32_tone1"]="tone("+a+",100,0,"+c+");\n  delay(1);\n  noTone("+a+","+c+");\n";
    return"noTone("+a+","+c+");\ntone("+a+","+b+",0,"+c+");\n"
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
    Blockly.Arduino.setups_["esp32_tone1"]="tone("+a+",100,0,"+d+");\n  delay(1);\n  noTone("+a+","+d+");\n";
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
      Blockly.Arduino.definitions_.define_dual_core_declaire=Blockly.Arduino.definitions_.define_dual_core_declaire+'TaskHandle_t '+a+';\nbool '+a+'_Created=false;\n';
  }
  else
    Blockly.Arduino.definitions_.define_dual_core_declaire='TaskHandle_t '+a+';\nbool '+a+'_Created=false;\n';
  if (c!=''){
    c='  '+c.replace(/\n  /g,"\n    ");
    Blockly.Arduino.definitions_["define_dual_core_"+a]='void '+a+'_code( void * pvParameters )\n{\n'+b+'  while(true){\n'+c+'  }\n}\n';
  } else {
    Blockly.Arduino.definitions_["define_dual_core_"+a]='void '+a+'_code( void * pvParameters )\n{\n'+b+'}\n';
  }
  return'';
}

Blockly.Arduino.esp32_core_run=function(){
  var a=Blockly.Arduino.valueToCode(this,"TASK_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"STACK",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"PRIORITY",Blockly.Arduino.ORDER_ATOMIC)||"0",
      d=this.getFieldValue("CORE");
  a=a.replace(/\"/g,"");
  return 'if (!'+a+'_Created)\n  '+a+'_Created=xTaskCreatePinnedToCore('+a+'_code,"'+a+'",'+b+',NULL,'+c+',&'+a+','+d+');\n';
}

Blockly.Arduino.esp32_core_stop=function(){
  var a=Blockly.Arduino.valueToCode(this,"TASK_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  return'if ('+a+'_Created)\n{\n  vTaskDelete('+a+');\n  '+a+'_Created=false;\n}\n';
}

Blockly.Arduino.esp32_core_suspend=function(){
  var a=Blockly.Arduino.valueToCode(this,"TASK_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  return'if ('+a+'_Created)\n{\n  vTaskSuspennd('+a+');\n}\n';
}

Blockly.Arduino.esp32_core_resume=function(){
  var a=Blockly.Arduino.valueToCode(this,"TASK_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  return'if ('+a+'_Created)\n{\n  vTaskResume('+a+');\n}\n';
}

Blockly.Arduino.esp32_core_yield=function(){
  return'taskYIELD();\n';
}

Blockly.Arduino.esp32_core_num=function(){
  return["xPortGetCoreID()",Blockly.Arduino.ORDER_ATOMIC];
}

//PocketCard
Blockly.Arduino.pocketcard={};
Blockly.Arduino.pocketcard_cam_init=function(){
  Blockly.Arduino.definitions_.define_ksb065_cam_include='#include "POCKETCARD_pins.h"';
  Blockly.Arduino.definitions_.define_esp32_cam_gpio_include ='';
  return'';
};

Blockly.Arduino.pocketcard_cam_pins_clear=function(){
  var a=this.getFieldValue("VFLIP_VALUE"),
      b=this.getFieldValue("HMIRROR_VALUE");
  if (Blockly.Arduino.definitions_.define_esp32_cam_gpio_include)
    delete Blockly.Arduino.definitions_.define_esp32_cam_gpio_include;
  if (Blockly.Arduino.definitions_['define_linkit_wifi_include']){
      var tempIndex=Blockly.Arduino.definitions_['define_linkit_wifi_include'].indexOf('#define PWDN_GPIO_NUM');
      if (tempIndex>-1)
        Blockly.Arduino.definitions_['define_linkit_wifi_include']=Blockly.Arduino.definitions_['define_linkit_wifi_include'].substring(0,tempIndex);
  }
  if (Blockly.Arduino.setups_.setup_cam_initial){
    var tempIndex=Blockly.Arduino.setups_.setup_cam_initial.indexOf('esp_err_t err = esp_camera_init(&config);');
    if (tempIndex>-1){
      Blockly.Arduino.setups_.setup_cam_initial=(Blockly.Arduino.setups_.setup_cam_initial.substring(0,tempIndex)+'pinMode(13, INPUT_PULLUP);\n  pinMode(14, INPUT_PULLUP);\n  '+Blockly.Arduino.setups_.setup_cam_initial.substring(tempIndex));
    }
  }
  return's->set_vflip(s, '+a+');\ns->set_hmirror(s, '+b+');\n'
};

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


//KSB065
Blockly.Arduino.KSB065={};
Blockly.Arduino.KSB065_camera_pins=function(){
  var a=this.getFieldValue("CAM_TYPE");
  Blockly.Arduino.KSB065.cam_type=a;
  if (a=='1'){
    Blockly.Arduino.definitions_.define_ksb065_cam_include='#include "KSB065_pins.h"';
    return'';
  }
  else if (a=='2'){
    Blockly.Arduino.definitions_.define_ksb065_cam_include='#include "POCKETCARD_pins.h"';
    return''
  }
  else
    return'';
};

Blockly.Arduino.KSB065_camera_pins_clear=function(){
  var a=this.getFieldValue("VFLIP_VALUE"),
      b=this.getFieldValue("HMIRROR_VALUE");
  if (Blockly.Arduino.definitions_.define_esp32_cam_gpio_include)
    delete Blockly.Arduino.definitions_.define_esp32_cam_gpio_include;
  if (Blockly.Arduino.definitions_['define_linkit_wifi_include']){
      var tempIndex=Blockly.Arduino.definitions_['define_linkit_wifi_include'].indexOf('#define PWDN_GPIO_NUM');
      if (tempIndex>-1)
        Blockly.Arduino.definitions_['define_linkit_wifi_include']=Blockly.Arduino.definitions_['define_linkit_wifi_include'].substring(0,tempIndex);
  }

  if (Blockly.Arduino.KSB065.cam_type=='2'){
    if (Blockly.Arduino.setups_.setup_cam_initial){
      var tempIndex=Blockly.Arduino.setups_.setup_cam_initial.indexOf('esp_err_t err = esp_camera_init(&config);');
      if (tempIndex>-1){
        Blockly.Arduino.setups_.setup_cam_initial=(Blockly.Arduino.setups_.setup_cam_initial.substring(0,tempIndex)+'pinMode(13, INPUT_PULLUP);\n  pinMode(14, INPUT_PULLUP);\n  '+Blockly.Arduino.setups_.setup_cam_initial.substring(tempIndex));
      }
    }
  }

  return's->set_vflip(s, '+a+');\ns->set_hmirror(s, '+b+');\n'
};

Blockly.Arduino.KSB065_button=function(){
  var a=this.getFieldValue("AB_BUTTON"),
	  b=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL");
  Blockly.Arduino.definitions_.define_m_button="byte A_Pin=14;\nbyte B_Pin=25;\nchar myBtnStatus;\nbool buttonPressed(char btnName)\n{\n  if (btnName=='A'){\n    if (digitalRead(A_Pin) == 1)\n      return false;\n    else\n      return true;\n  }\n  else if (btnName=='B'){\n    if (digitalRead(B_Pin) == 1)\n      return false;\n    else\n      return true;\n  } else {\n    if ((digitalRead(A_Pin) == 1) && (digitalRead(B_Pin) == 1))\n      return false;\n    else\n      return true;\n  }\n}\n"
  Blockly.Arduino.definitions_.define_m_getBtnStatus="char getBtnStatus(){\n  char buttonStatus=' ';\n  int checkButtonDelay=200;\n  if (buttonPressed('A')){\n    delay(checkButtonDelay);\n    if (buttonPressed('A')){\n      buttonStatus='A';\n      if (buttonPressed('B'))\n        buttonStatus='C';\n    }\n  } else if (buttonPressed('B')){\n      delay(checkButtonDelay);\n      if (buttonPressed('B')){\n        buttonStatus='B';\n        if (buttonPressed('A'))\n          buttonStatus='C';\n      }\n  }\n  return buttonStatus;\n}\n";
  Blockly.Arduino.setups_.setup_button='pinMode(A_Pin, INPUT);\n  pinMode(B_Pin, INPUT);\n';
	return"if (myBtnStatus=='"+a+"'){\n"+b+"  while(buttonPressed('"+a+"')){}\n}\n"
};

Blockly.Arduino.KSB065_analog=function(){
  var a=this.getFieldValue("TYPE");
  return["analogRead("+a+")",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.KSB065_dht11=function(){
  var a=this.getFieldValue("DHT"),
      pin="13";
  Blockly.Arduino.definitions_['define_dht_']="#include <DHT_mini.h>";
  Blockly.Arduino.definitions_['define_dht_set']="DHT dht11_p"+pin+"("+pin+", DHT11);";
  Blockly.Arduino.setups_["setup_dht_"]="dht11_p"+pin+".begin();";
  return["dht11_p"+pin+"."+a+"()",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.KSB065_sonar=function(){
  Blockly.Arduino.definitions_.define_ultrasonic='#include "Ultrasonic.h"\n';
  Blockly.Arduino.definitions_["var_ultrasonic_19_19"]="Ultrasonic ultrasonic_19_19(19,19);\n";
  return["ultrasonic_19_19.convert(ultrasonic_19_19.timing(), Ultrasonic::CM)",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.KSB065_relay=function(){
  var a=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0",
      pin="17";
  Blockly.Arduino.setups_["setup_relay_"+pin]="pinMode("+pin+", OUTPUT);";
  return"digitalWrite("+pin+", "+a+");\n";
};

Blockly.Arduino.KSB065_motor=function(){
  var a=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("DIR");
  Blockly.Arduino.definitions_.define_KSB065_motor_invoke='byte L9110S_1A=16;\nbyte L9110S_1B=33;\nbyte L9110S_1B_ch=10;\n';
  Blockly.Arduino.setups_["setup_KSB065_L9110"]='pinMode(L9110S_1A, OUTPUT);\n  ledcSetup(L9110S_1B_ch, 5000, 8);\n  ledcAttachPin(L9110S_1B, L9110S_1B_ch);\n';
  if (b=="1"){
    return'digitalWrite(L9110S_1A , HIGH);\nledcWrite(L9110S_1B_ch, 255-'+a+');\n'
  } else {
    return'digitalWrite(L9110S_1A , LOW);\nledcWrite(L9110S_1B_ch, '+a+');\n'
  }
};

Blockly.Arduino.KSB065_motor_stop=function(){
  Blockly.Arduino.definitions_.define_KSB065_motor_invoke='byte L9110S_1A=16;\nbyte L9110S_1B=33;\nbyte L9110S_1B_ch=10;\n';
  Blockly.Arduino.setups_["setup_KSB065_L9110"]='pinMode(L9110S_1A, OUTPUT);\n  ledcSetup(L9110S_1B_ch, 5000, 8);\n  ledcAttachPin(L9110S_1B, L9110S_1B_ch);\n';
  return'digitalWrite(L9110S_1A , LOW);\nledcWrite(L9110S_1B_ch, 0);\n'
};

Blockly.Arduino.KSB065_tone=function(){
  var a=this.getFieldValue("FREQ");
  Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
  Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=26;\nbyte buzz_ch=0;\n";
  Blockly.Arduino.setups_["esp32_tone1"]="tone(buzz_pin,262,0,buzz_ch);\n  delay(1);\n  noTone(buzz_pin,buzz_ch);";
  return"noTone(buzz_pin,buzz_ch);\ntone(buzz_pin,"+a+",0,buzz_ch);\n";
};

Blockly.Arduino.KSB065_no_tone=function(){
  Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
  Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=26;\nbyte buzz_ch=0;\n";
  Blockly.Arduino.setups_["esp32_tone1"]="tone(buzz_pin,262,0,buzz_ch);\n  delay(1);\n  noTone(buzz_pin,buzz_ch);";
  return"noTone(buzz_pin,buzz_ch);\n";
};

Blockly.Arduino.KSB065_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_tone="#include <Tone32.h>";
  Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=26;\nbyte buzz_ch=0;\n";
  Blockly.Arduino.setups_["esp32_tone1"]="tone(buzz_pin,262,0,buzz_ch);\n  delay(1);\n  noTone(buzz_pin,buzz_ch);";
  return"tone(buzz_pin,"+a+","+b+",buzz_ch);\n";
};

Blockly.Arduino.KSB065_neopixel_begin=function(){
  var a=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"0";
	  Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>";
    Blockly.Arduino.definitions_.define_plus_neopixel='Adafruit_NeoPixel ksb065Pixels = Adafruit_NeoPixel(4,2,NEO_GRB + NEO_KHZ800);\n';
    Blockly.Arduino.setups_.setup_plus_neopixel="ksb065Pixels.begin();\n  ksb065Pixels.setBrightness("+a+");\n  ksb065Pixels.show();\n  ksb065Pixels.setPixelColor(0,ksb065Pixels.Color(0,0,0));\n  ksb065Pixels.setPixelColor(1,ksb065Pixels.Color(0,0,0));\n  ksb065Pixels.setPixelColor(2,ksb065Pixels.Color(0,0,0));\n  ksb065Pixels.show();";
  return"";
};

Blockly.Arduino.KSB065_neopixel_set_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"INDEX",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  b=b.replace("tft.color565","ksb065Pixels.Color");
  return"ksb065Pixels.setPixelColor("+a+","+b+");\n";
};

Blockly.Arduino.KSB065_neopixel_show=function(){
  return"ksb065Pixels.show();\n";
};

Blockly.Arduino.KSB065_neopixel_set_colors=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace("tft.color565","ksb065Pixels.Color");
  return"ksb065Pixels.setPixelColor(0,"+a+");\nksb065Pixels.setPixelColor(1,"+a+");\nksb065Pixels.setPixelColor(2,"+a+");\nksb065Pixels.setPixelColor(3,"+a+");\nksb065Pixels.show();\n";
};

Blockly.Arduino.KSB065_ir_receive=function(){
  var a=35;
  Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.hpp>";
  Blockly.Arduino.definitions_.ljj_define_irremote_decode="#define MY_IR_RECEIVE_PIN "+a+"\ndecode_results results;\nString myCodeType;\nString myIRcode;";
  Blockly.Arduino.definitions_.ljj_define_irremote_ir_type_event='String ir_type(int tip)\n{\n  if (tip == 14){\n    return "RC5";\n  } else if (tip == 15){\n    return "RC6";\n  } else if (tip == 7){\n    return "NEC";\n  } else if (tip == 18){\n    return "SONY";\n  } else if (tip == 8){\n    return "PANASONIC";\n  } else if (tip == 4){\n    return "JVC";\n  } else if (tip == 16){\n    return "SAMSUNG";\n  } else if (tip == 5){\n    return "LG";\n  } else if (tip == 3){\n    return "SHARP";\n  } else if (tip == 22){\n    return "LEGO_PF";\n  } else {\n    return String(tip);\n  }\n}\n';
  Blockly.Arduino.setups_["ljj_irremote_"]||(Blockly.Arduino.setups_["ljj_irremote_"]="IrReceiver.begin(MY_IR_RECEIVE_PIN);\n");
  return''
};

Blockly.Arduino.KSB065_pinMap=function(){
  var a=this.getFieldValue("KSB065_PIN");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
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
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_send_sheet_event=Blockly.Arduino.definitions_.define_send_sheet_event.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_send_sheet_event=Blockly.Arduino.definitions_.define_send_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
  }
  var c=Blockly.Arduino.valueToCode(this,"data",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'sendToGoogleSheets("'+a+'",URLEncode(('+c+').c_str()));\n'
};

Blockly.Arduino.getLastRow=function(){
  //Blockly.Arduino.definitions_.define_read_sheet_last_row_event='int getSheetLastRow(){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  while (!newUrl.startsWith("https:")){\n     if (!sheetClient.connect(host, 443)) {\n      return 0;\n    }\n    const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=getLastRow&sheetId="+sheetId+"&sheetTag="+sheetTag;\n    sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: keep-alive\\n\\n\\n");\n    while (sheetClient.connected()) {\n      newUrl = sheetClient.readStringUntil(\'\\n\');\n      if (newUrl.startsWith("Location: https://")) {\n        newUrl.replace("Location: ","");\n        break;\n      }\n    }\n  }\n  sheetClient.stop();\n  String jsonData ="";\n  String dataResult="";\n  while(!jsonData.startsWith("{")){\n    if (!sheetClient.connect(host, 443)) {\n      return 0;\n    }\n    sheetClient.print("GET " + newUrl + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: keep-alive\\n\\n\\n");\n    while (sheetClient.connected()) {\n      jsonData = sheetClient.readStringUntil(\'\\n\');\n      if (jsonData.startsWith("{")) {\n        dataResult=jsonData;\n        dataResult.replace("{\\"lastRow\\":","");\n        dataResult.replace("}","");\n        break;\n      }\n    }\n  }\n  sheetClient.stop();\n  return dataResult.toInt();\n}\n';
  Blockly.Arduino.definitions_.define_read_sheet_last_row_event='int getSheetLastRow(){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=getLastRow&sheetId="+sheetId+"&sheetTag="+sheetTag;\n  sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  while (!newUrl.startsWith("https:")){\n    newUrl = sheetClient.readStringUntil(\'\\n\');\n    if (newUrl.startsWith("Location: https://")) {\n      newUrl.replace("Location: ","");\n      break;\n    }\n  }\n  sheetClient.stop();\n  String jsonData ="";\n  String dataResult="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  sheetClient.print("GET " + newUrl + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  while(!jsonData.startsWith("{")){\n    jsonData = sheetClient.readStringUntil(\'\\n\');\n    if (jsonData.startsWith("{")) {\n      dataResult=jsonData;\n      dataResult.replace("{\\"lastRow\\":","");\n      dataResult.replace("}","");\n      break;\n    }\n  }\n  sheetClient.stop();\n  return dataResult.toInt();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_read_sheet_last_row_event=Blockly.Arduino.definitions_.define_read_sheet_last_row_event.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_read_sheet_last_row_event=Blockly.Arduino.definitions_.define_read_sheet_last_row_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
  }
  return['getSheetLastRow()',Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.fetchFromSheet=function(){
  var a=Blockly.Arduino.valueToCode(this,"beginCell",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"endCell",Blockly.Arduino.ORDER_ATOMIC)||"";
  const CODE_PATTERN= /^[a-zA-Z]{1}[0-9]{1,4}$/;
  var tempFieldName='';
  if (a.startsWith('"')){
    tempFieldName=a.replace(/\"/g,"");
    if (!CODE_PATTERN.test(tempFieldName))
     a='"A1"';
  }
  if (b.startsWith('"')){
    tempFieldName=b.replace(/\"/g,"");
    if (!CODE_PATTERN.test(tempFieldName))
     b='"A1"';
  }
  Blockly.Arduino.definitions_.define_json_include="#define ARDUINOJSON_DECODE_UNICODE 1\n#include <ArduinoJson.h>";
  Blockly.Arduino.definitions_.define_sheet_json_doc_invoke='DynamicJsonDocument docSheet(2048);\n';
  //Blockly.Arduino.definitions_.define_read_sheet_invoke='void fetchFromSheet(const String& begin, const String& end){\n  static WiFiClientSecure sheetClient;\n  const char* host="script.google.com";\n  if (!sheetClient.connect(host, 443)) {\n    return;\n  }\n  const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=read&sheetId="+sheetId+"&sheetTag="+sheetTag+"&begin="+begin+"&end="+end;\n  sheetClient.println("GET " + url + " HTTP/1.1");\n  sheetClient.println(String()+"Host: "+host);\n  sheetClient.println("Accept: */*");\n  sheetClient.println("Connection: close");\n  sheetClient.println();\n  sheetClient.println();\n  String newUrl="";\n  while (sheetClient.connected()) {\n    newUrl = sheetClient.readStringUntil(\'\\n\');\n    if (newUrl.startsWith("The document has moved <A HREF=\\"")) {\n      newUrl.replace("The document has moved <A HREF=\\"","");\n      newUrl.replace("\\">here</A>.","");\n      newUrl.replace("amp;","");\n      break;\n    }\n  }\n  sheetClient.stop();\n  if (!sheetClient.connect(host, 443)) {\n    return;\n  }\n  sheetClient.println("GET " + newUrl + " HTTP/1.1");\n  sheetClient.println(String()+"Host: "+host);\n  sheetClient.println("Accept: */*");\n  sheetClient.println("Connection: close");\n  sheetClient.println();\n  sheetClient.println();\n  while (sheetClient.connected()) {\n    String line = sheetClient.readStringUntil(\'\\n\');\n    if (line.startsWith("{")) {\n      DeserializationError error = deserializeJson(docSheet, line);\n      break;\n    }\n  }\n  sheetClient.stop();\n}\n';
  //Blockly.Arduino.definitions_.define_read_sheet_event='void fetchFromSheet(const String& begin, const String& end){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  while (!newUrl.startsWith("https:")){\n     if (!sheetClient.connect(host, 443)) {\n      return;\n    }\n    const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=read&sheetId="+sheetId+"&sheetTag="+sheetTag+"&begin="+begin+"&end="+end;\n    sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n    while (sheetClient.connected()) {\n      newUrl = sheetClient.readStringUntil(\'\\n\');\n      if (newUrl.startsWith("Location: https://")) {\n        newUrl.replace("Location: ","");\n        break;\n      }\n    }\n  }\n  sheetClient.stop();\n  String jsonData ="";\n  while(!jsonData.startsWith("{")){\n    if (!sheetClient.connect(host, 443)) {\n      return;\n    }\n    sheetClient.print("GET " + newUrl + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n    while (sheetClient.connected()) {\n      jsonData = sheetClient.readStringUntil(\'\\n\');\n      if (jsonData.startsWith("{")) {\n        DeserializationError error = deserializeJson(docSheet, jsonData);\n        break;\n      }\n    }\n  }\n  sheetClient.stop();\n}\n';
  Blockly.Arduino.definitions_.define_read_sheet_event='void fetchFromSheet(const String& begin, const String& end){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=read&sheetId="+sheetId+"&sheetTag="+sheetTag+"&begin="+begin+"&end="+end;\n  sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  while (!newUrl.startsWith("https:")){\n    newUrl = sheetClient.readStringUntil(\'\\n\');\n    if (newUrl.startsWith("Location: https://")) {\n      newUrl.replace("Location: ","");\n      break;\n    }\n  }\n  sheetClient.stop();\n  String jsonData ="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  sheetClient.print("GET " + newUrl + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  while(!jsonData.startsWith("{")){\n    jsonData = sheetClient.readStringUntil(\'\\n\');\n    if (jsonData.startsWith("{")) {\n      DeserializationError error = deserializeJson(docSheet, jsonData);\n      break;\n    }\n  }\n  sheetClient.stop();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_read_sheet_event=Blockly.Arduino.definitions_.define_read_sheet_event.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_read_sheet_event=Blockly.Arduino.definitions_.define_read_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
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
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_search_sheet_event=Blockly.Arduino.definitions_.define_search_sheet_event.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_search_sheet_event=Blockly.Arduino.definitions_.define_search_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
  }
  return'searchSheet('+a+',URLEncode(String('+b+').c_str()).c_str());\n'
};

Blockly.Arduino.deleteSearch=function(){
  var a=Blockly.Arduino.valueToCode(this,"Column",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"keyWord",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.toUpperCase();
  Blockly.Arduino.definitions_.define_delete_search_sheet_event='void deleteSearch(const String& fname, const String& sname){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=deleteQ&sheetId="+sheetId+"&sheetTag="+sheetTag+"&fname="+fname+"&sname="+sname;\n  sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  sheetClient.stop();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_delete_search_sheet_event=Blockly.Arduino.definitions_.define_delete_search_sheet_event.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_delete_search_sheet_event=Blockly.Arduino.definitions_.define_delete_search_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
  }
  return'deleteSearch('+a+',URLEncode(String('+b+').c_str()).c_str());\n'
};

Blockly.Arduino.deleteRow=function(){
  var a=Blockly.Arduino.valueToCode(this,"RowIndex",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_delete_rows_sheet_event='void deleteRows(int nBegin, int nEnd){\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  String newUrl="";\n  sheetClient.connect(host, 443);\n  while (!sheetClient.connected());\n  String url="";\n  if (nEnd<0){\n    url= String() +"https://"+host+"/macros/s/"+asId+"/exec?type=deleteRow&sheetId="+sheetId+"&sheetTag="+sheetTag+"&dBegin="+nBegin;\n  } else {\n    url= String() +"https://"+host+"/macros/s/"+asId+"/exec?type=deleteRows&sheetId="+sheetId+"&sheetTag="+sheetTag+"&dBegin="+nBegin+"&dEnd="+nEnd;\n  }\n  sheetClient.print("GET " + url + " HTTP/1.1\\n"+String()+"Host: "+host+"\\nAccept: */*\\nConnection: close\\n\\n\\n");\n  sheetClient.stop();\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_delete_rows_sheet_event=Blockly.Arduino.definitions_.define_delete_rows_sheet_event.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_delete_rows_sheet_event=Blockly.Arduino.definitions_.define_delete_rows_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
  }
  return'deleteRows('+a+',-1);\n'
};

Blockly.Arduino.getCellValue=function(){
  var a=Blockly.Arduino.valueToCode(this,"cell",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (a.startsWith('"'))
    a=a.toUpperCase();
  return['docSheet['+a+'].as<String>()',Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.getFieldValue=function(){
  var a=Blockly.Arduino.valueToCode(this,"field",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (a.startsWith('"'))
    a=a.toUpperCase();
  return['docSheet['+a+'].as<String>()',Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.updateCellValue=function(){
  var a=Blockly.Arduino.valueToCode(this,"cell",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"data",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_update_sheet_event='void  updateCellValue(const String& cell,const String& data)\n{\n  static TLSClient sheetClient;\n  const char* host="script.google.com";\n  if (sheetClient.connect(host, 443)) {\n      const String url = String() +"https://"+host+"/macros/s/"+asId+"/exec?type=update&sheetId="+sheetId+"&sheetTag="+sheetTag+"&cell="+cell+"&data="+data;\n      sheetClient.println("GET " + url + " HTTP/1.1");\n      sheetClient.println(String()+"Host: "+host);\n      sheetClient.println("Accept: */*");\n      sheetClient.println("Connection: close");\n      sheetClient.println();\n      sheetClient.println();\n      sheetClient.stop();\n  }\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_update_sheet_event=Blockly.Arduino.definitions_.define_update_sheet_event.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_update_sheet_event=Blockly.Arduino.definitions_.define_update_sheet_event.replace(" sheetClient;\n"," sheetClient;\n  sheetClient.setInsecure();\n");
  }
  var c=Blockly.Arduino.valueToCode(this,"data",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'updateCellValue('+a+',URLEncode(String(String()+'+b+').c_str()));\n'
};

//ESP32 NTP
Blockly.Arduino.esp32_ntp={};
Blockly.Arduino.set_ntp_time=function(){
  var a=this.getFieldValue("TZ");
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
    Blockly.Arduino.definitions_.define_getDataFromRTC_event="int get_data_from_RTC(byte dataType) {\n  int myResult=0;\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  switch(dataType){\n    case 0:\n      myResult=(1900 + t_st->tm_year);\n      break;\n    case 1:\n      myResult=( 1 + t_st->tm_mon);\n      break;\n    case 2:\n      myResult=t_st->tm_mday;\n      break;\n    case 3:\n      myResult=t_st->tm_hour;\n      break;\n    case 4:\n      myResult=t_st->tm_min;\n      break;\n    case 5:\n      myResult=t_st->tm_sec;\n      break;\n    case 6:\n      myResult=t_st->tm_wday;\n      break;\n  }\n  return myResult;\n}\n";
    if (Blockly.Arduino.my_board_type=="Pico"){
      if (a.substr(0,1)=='-')
        a=a.replace('-','+');
      else
        a=('-'+a);
      return'putenv("TZ=UTC'+a+'");\nconfigTime(0, 0, "time.stdtime.gov.tw","time.nist.gov");\nwhile(get_data_from_RTC(0)<2000){delay(500);}\n'
    } else
      return'configTime('+a+'*3600, 0, "time.stdtime.gov.tw","time.nist.gov");\nwhile(get_data_from_RTC(0)<2000){delay(500);}\n'
  }else{
    return''
  }
};

Blockly.Arduino.get_RTC_str=function(){
  var a=this.getFieldValue("TIMEFORMAT");
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
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
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    if (a=='7'){
      return['millis()',Blockly.Arduino.ORDER_ATOMIC] 
    } else {
      Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
      Blockly.Arduino.definitions_.define_getDataFromRTC_event="int get_data_from_RTC(byte dataType) {\n  int myResult=0;\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  switch(dataType){\n    case 0:\n      myResult=(1900 + t_st->tm_year);\n      break;\n    case 1:\n      myResult=( 1 + t_st->tm_mon);\n      break;\n    case 2:\n      myResult=t_st->tm_mday;\n      break;\n    case 3:\n      myResult=t_st->tm_hour;\n      break;\n    case 4:\n      myResult=t_st->tm_min;\n      break;\n    case 5:\n      myResult=t_st->tm_sec;\n      break;\n    case 6:\n      myResult=t_st->tm_wday;\n      break;\n  }\n  return myResult;\n}\n";
      return['get_data_from_RTC('+a+')',Blockly.Arduino.ORDER_ATOMIC]
    }      
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
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
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
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_send_line_notify_invoke=Blockly.Arduino.definitions_.define_send_line_notify_invoke.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_send_line_notify_invoke=Blockly.Arduino.definitions_.define_send_line_notify_invoke.replace(" line_client;\n"," line_client;\n  line_client.setInsecure();\n");
  }
  return'sendLineMsg(String("message=\\n")+'+a+');\n';
};

Blockly.Arduino.sendSticker=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"",
  b=Blockly.Arduino.valueToCode(this,"PACKAGEID",Blockly.Arduino.ORDER_ATOMIC)||"",
  c=Blockly.Arduino.valueToCode(this,"STICKERID",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_send_line_notify_invoke='void sendLineMsg(String myMsg) {\n  static TLSClient line_client;\n  myMsg.replace("%","%25");\n  myMsg.replace("&","%26");\n  myMsg.replace("§","&");\n  myMsg.replace("\\\\n","\\n");\n  if (line_client.connect("notify-api.line.me", 443)) {\n    line_client.println("POST /api/notify HTTP/1.1");\n    line_client.println("Connection: close");\n    line_client.println("Host: notify-api.line.me");\n    line_client.println("Authorization: Bearer " + lineToken);\n    line_client.println("Content-Type: application/x-www-form-urlencoded");\n    line_client.println("Content-Length: " + String(myMsg.length()));\n    line_client.println();\n    line_client.println(myMsg);\n    line_client.println();\n    line_client.stop();\n  }\n  else {\n    Serial.println("Line Notify failed");\n  }\n}\n';
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="ESP8266" || Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_send_line_notify_invoke=Blockly.Arduino.definitions_.define_send_line_notify_invoke.replace("TLSClient","WiFiClientSecure");
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_send_line_notify_invoke=Blockly.Arduino.definitions_.define_send_line_notify_invoke.replace(" line_client;\n"," line_client;\n  line_client.setInsecure();\n");
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
  Blockly.Arduino.ttgo_tft.my_type=a;
  //Blockly.Arduino.definitions_.define_spi="#include <SPI.h>";
  Blockly.Arduino.definitions_.define_ttgo_tft_include="#include <TFT_eSPI_"+a+".h>\n#include <U8g2_for_TFT_eSPI.h>";
  Blockly.Arduino.definitions_.define_ttgo_tft_init_invoke="TFT_eSPI tft = TFT_eSPI();\nU8g2_for_TFT_eSPI u8g2;\nuint32_t tft_color=TFT_WHITE;\nuint32_t tft_bg_color=TFT_BLACK;\nuint32_t tft_fg_color=TFT_WHITE;\nbyte tftTextSize=1;\nbyte tftTextFont=1;\n";
  Blockly.Arduino.definitions_.define_SD_CS_invoke='int pinCS=SS;';
  if (a=="KSB065" || a=="KSB064"){
    Blockly.Arduino.setups_.ttgo_tft='tft.begin();\n  tft.setRotation(1);\n';
    if (a=="KSB064")
      Blockly.Arduino.definitions_.define_SD_CS_invoke='int pinCS=33;';
  }
  else if (a=="PIXELBIT")
    Blockly.Arduino.setups_.ttgo_tft='tft.begin();\n  tft.setRotation(3);\n';
  else
    Blockly.Arduino.setups_.ttgo_tft='tft.begin();\n';
  Blockly.Arduino.setups_.ttgo_tft+='  tft.setTextFont(tftTextFont);\n  tft.setTextSize(tftTextSize);\n  tft.fillScreen(TFT_BLACK);\n  u8g2.begin(tft);\n  tft.setTextColor(tft_color);\n  u8g2.setForegroundColor(tft_color);\n';
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

Blockly.Arduino.ttgo_tft_wh=function(){
  var a=this.getFieldValue("W_H");
  return[a,Blockly.Arduino.ORDER_ATOMIC]
};



Blockly.Arduino.ttgo_tft_set_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  return 'tft_color='+a+';\n';
};

Blockly.Arduino.ttgo_tft_set_font_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"FG_COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"BG_COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  b=b.replace(/\"/g,"");
//  return 'tft_fg_color='+a+';\ntft_bg_color='+b+';\ntft.setTextColor(tft_fg_color,tft_bg_color,'+c+');\nu8g2.setForegroundColor(tft_fg_color);\nu8g2.setBackgroundColor(tft_bg_color);\nu8g2.setFontMode('+c+');\n';
  return 'tft_fg_color='+a+';\ntft_bg_color='+b+';\ntft.setTextColor(tft_fg_color,tft_bg_color,true);\nu8g2.setForegroundColor(tft_fg_color);\nu8g2.setBackgroundColor(tft_bg_color);\n';
};

Blockly.Arduino.ttgo_tft_draw_u8g2_text=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_NONE)||"",
  d=this.getFieldValue("TRANSPARENT"),
  e=Blockly.Arduino.valueToCode(this,"FONT_NAME",Blockly.Arduino.ORDER_NONE)||"";
  e=e.replace(/\"/g,"");
  return"u8g2.setFont("+e+");\nu8g2.setFontMode("+d+");\nu8g2.setCursor("+a+", "+b+");\nu8g2.print(String("+c+").c_str());\n"
};

Blockly.Arduino.ttgo_tft_draw_chinese_text=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_NONE)||"",
  d=this.getFieldValue("TRANSPARENT");
  return"u8g2.setFont(u8g2_font_unifont_t_chinese1);\nu8g2.setFontMode("+d+");\nu8g2.setCursor("+a+", ("+b+"+16));\nu8g2.print(String("+c+").c_str());\n"
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
  c=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_NONE)||"",
  d=this.getFieldValue("TRANSPARENT");
  var myReturnStr="tft.setCursor("+a+", "+b+");\ntft.printf(String("+c+").c_str());\n";
  if (d=="1")
    myReturnStr="tft.setTextColor(tft_fg_color,tft_fg_color,true);\n"+myReturnStr+"tft.setTextColor(tft_fg_color,tft_bg_color,true);\n"
  return myReturnStr;
};
Blockly.Arduino.ttgo_tft_draw_eng_text=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_NONE)||"",
  d=this.getFieldValue("TRANSPARENT");
  var myReturnStr='tft.drawString(String('+c+').c_str(),'+a+','+b+');\n';
  if (d=="1")
    myReturnStr="tft.setTextColor(tft_fg_color,tft_fg_color,true);\n"+myReturnStr;
  else
    myReturnStr="tft.setTextColor(tft_fg_color,tft_bg_color,true);\n"+myReturnStr;
  return myReturnStr;
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
  return"u8g2.setFont("+a+");\n";
};

Blockly.Arduino.ttgo_tft_draw_symbol=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=Blockly.Arduino.valueToCode(this,"SYMBOL_NUM",Blockly.Arduino.ORDER_NONE)||"0",
  d=this.getFieldValue("TRANSPARENT");
  return'u8g2.setFontMode('+d+');\nu8g2.drawGlyph('+a+','+b+','+c+');\n';
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
  Blockly.Arduino.definitions_.define_ttgo_tft_init_invoke="TFT_eSPI tft = TFT_eSPI();\nTFT_eSprite graph= TFT_eSprite(&tft);\nU8g2_for_TFT_eSPI u8g2;\nuint32_t tft_color=TFT_WHITE;\nuint32_t tft_bg_color=TFT_BLACK;\nuint32_t tft_fg_color=TFT_WHITE;\nbyte tftTextSize=1;\nbyte tftTextFont=1;\n";
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

Blockly.Arduino.ttgo_tft_create_sprite=function(){
    var a=Blockly.Arduino.valueToCode(this,"SPRITE_NAME",Blockly.Arduino.ORDER_NONE)||"",
      b=Blockly.Arduino.valueToCode(this,"WIDTH",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"HEIGHT",Blockly.Arduino.ORDER_NONE)||"0",
      d=Blockly.Arduino.statementToCode(this,"EXTRA");
  a=a.replace(/\"/g,"");
  d=d.replace("  ","");
  d=d.replace(/\n  /g,"\n");
  d=d.replace(/tft\./g,a+".");
  d=d.replace(/\.fillScreen/g,".fillSprite");
  d=d.replace(new RegExp(a+".color565","gm"),"tft.color565");
  d=d.replace(new RegExp("1,&tft","gm"),"2,&"+a);
  if (!Blockly.Arduino.definitions_.define_ttgo_tft_sprite_invoke)
    Blockly.Arduino.definitions_.define_ttgo_tft_sprite_invoke='TFT_eSprite '+a+'= TFT_eSprite(&tft);\n';
  else
    Blockly.Arduino.definitions_.define_ttgo_tft_sprite_invoke+='TFT_eSprite '+a+'= TFT_eSprite(&tft);\n';
  return a+'.createSprite('+b+','+c+');\nu8g2.begin('+a+');\n'+d+'u8g2.begin(tft);\n';
};

Blockly.Arduino.ttgo_tft_push_sprite=function(){
  var a=Blockly.Arduino.valueToCode(this,"SPRITE_NAME",Blockly.Arduino.ORDER_NONE)||"",
      b=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_NONE)||"0";
  a=a.replace(/\"/g,"");
  return a+'.pushSprite('+b+', '+c+');\n'
};

Blockly.Arduino.ttgo_tft_push_sprite_trans=function(){
  var a=Blockly.Arduino.valueToCode(this,"SPRITE_NAME",Blockly.Arduino.ORDER_NONE)||"",
      b=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_NONE)||"0",
      d=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace(/\"/g,"");
  return a+'.pushSprite('+b+', '+c+','+d+');\n'
};

Blockly.Arduino.ttgo_tft_delete_sprite=function(){
  var a=Blockly.Arduino.valueToCode(this,"SPRITE_NAME",Blockly.Arduino.ORDER_NONE)||"";
  a=a.replace(/\"/g,"");
  return a+'.deleteSprite();\n'
};


Blockly.Arduino.ttgo_tft_push_image=function(){
  var a=Blockly.Arduino.valueToCode(this,"FILE_NAME",Blockly.Arduino.ORDER_NONE)||"",
      b=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_NONE)||"0",
      d=d=this.getFieldValue("F_SOURCE");
  if (Blockly.Arduino.definitions_.define_ttgo_tft_include.indexOf('JPEGDecoder.h')<0)
    Blockly.Arduino.definitions_.define_ttgo_tft_include+="\n#include <JPEGDecoder.h>\n#define minimum(a,b)     (((a) < (b)) ? (a) : (b))";
  Blockly.Arduino.definitions_.define_ttgo_tft_draw_jpeg_event='void drawJpegFile(const char *filename, int xpos, int ypos,byte mediaType,byte tftType,TFT_eSPI *myTFTaddr) {\n  File jpegFile;\n  boolean decoded=false;\n  if (mediaType==1){\n    SD.begin(pinCS);\n    jpegFile = SD.open( filename, FILE_READ);\n    if ( !jpegFile )  return;\n    decoded = JpegDec.decodeSdFile(jpegFile);\n  } else if (mediaType==2){\n    SPIFFS.begin();\n    jpegFile = SPIFFS.open( filename, FILE_READ);\n    if ( !jpegFile )  return;\n    decoded = JpegDec.decodeFsFile(jpegFile);\n  }\n  if ( !jpegFile )  return;\n  if (decoded) {\n    renderJPEG(xpos, ypos,tftType,myTFTaddr);\n  }\n  jpegFile.close();\n  if (mediaType==1)\n    SD.end();\n  else if (mediaType==2)\n    SPIFFS.end();\n}\n';
  Blockly.Arduino.definitions_.define_ttgo_tft_render_jpeg_event='void renderJPEG(int xpos, int ypos,byte tftType,TFT_eSPI *myTarget) {\n  TFT_eSprite* myTempSprite;\n  if (tftType==2)\n    myTempSprite=(TFT_eSprite*)myTarget;\n  uint16_t *pImg;\n  uint16_t mcu_w = JpegDec.MCUWidth;\n  uint16_t mcu_h = JpegDec.MCUHeight;\n  uint32_t max_x = JpegDec.width;\n  uint32_t max_y = JpegDec.height;\n  uint32_t min_w = minimum(mcu_w, max_x % mcu_w);\n  uint32_t min_h = minimum(mcu_h, max_y % mcu_h);\n  uint32_t win_w = mcu_w;\n  uint32_t win_h = mcu_h;\n  uint32_t drawTime = millis();\n  max_x += xpos;\n  max_y += ypos;\n  while (JpegDec.readSwappedBytes()) {\n    pImg = JpegDec.pImage ;\n    int mcu_x = JpegDec.MCUx * mcu_w + xpos;\n    int mcu_y = JpegDec.MCUy * mcu_h + ypos;\n    if (mcu_x + mcu_w <= max_x) win_w = mcu_w;\n    else win_w = min_w;\n    if (mcu_y + mcu_h <= max_y) win_h = mcu_h;\n    else win_h = min_h;\n    if (win_w != mcu_w)\n    {\n      uint16_t *cImg;\n      int p = 0;\n      cImg = pImg + win_w;\n      for (int h = 1; h < win_h; h++)\n      {\n        p += mcu_w;\n        for (int w = 0; w < win_w; w++)\n        {\n          *cImg = *(pImg + w + p);\n          cImg++;\n        }\n      }\n    }\n    if (tftType==1){\n      if (( mcu_x + win_w ) <= myTarget->width() && ( mcu_y + win_h ) <= myTarget->height())\n        myTarget->pushImage(mcu_x, mcu_y, win_w, win_h, pImg);\n      else if ( (mcu_y + win_h) >= myTarget->height()) JpegDec.abort();\n    } else if (tftType==2){\n      if (( mcu_x + win_w ) <= myTempSprite->width() && ( mcu_y + win_h ) <= myTempSprite->height())\n        myTempSprite->pushImage(mcu_x, mcu_y, win_w, win_h, pImg);\n      else if ( (mcu_y + win_h) >= myTempSprite->height()) JpegDec.abort();\n    }\n  }\n  drawTime = millis() - drawTime;\n}\n';
  if (Blockly.Arduino.ttgo_tft.my_type=='KSB065'){
      Blockly.Arduino.definitions_.define_SD_CS_invoke='int pinCS=4;';
  }
  if (d=='1'){
    if (Blockly.Arduino.ttgo_tft.my_type=='KSB065'){
      if (Blockly.Arduino.setups_.ttgo_tft.indexOf('SD.begin(pinCS)')<0)
        Blockly.Arduino.setups_.ttgo_tft='SD.begin(pinCS);\n  SD.end();\n  '+Blockly.Arduino.setups_.ttgo_tft;
    }
    else if (Blockly.Arduino.ttgo_tft.my_type=='PIXELBIT'){
      if (Blockly.Arduino.setups_.ttgo_tft.indexOf('SD_MMC.begin()')<0)
        Blockly.Arduino.setups_.ttgo_tft='SD_MMC.begin();\n  SD_MMC.end();\n  '+Blockly.Arduino.setups_.ttgo_tft;
      Blockly.Arduino.definitions_.define_ttgo_tft_include+="\n#include <SD_MMC.h>";
      Blockly.Arduino.definitions_.define_ttgo_tft_draw_jpeg_event=Blockly.Arduino.definitions_.define_ttgo_tft_draw_jpeg_event.replace(new RegExp("SD.","gm"),"SD_MMC.");
      Blockly.Arduino.definitions_.define_ttgo_tft_draw_jpeg_event=Blockly.Arduino.definitions_.define_ttgo_tft_draw_jpeg_event.replace("pinCS","");
    }
    else
      Blockly.Arduino.setups_.ttgo_tft='SD.begin();\n  SD.end();\n  '+Blockly.Arduino.setups_.ttgo_tft;
  }
  else if (d=='2')
    Blockly.Arduino.setups_.ttgo_tft='SPIFFS.begin();\n  SPIFFS.end();\n  '+Blockly.Arduino.setups_.ttgo_tft;
  return 'drawJpegFile(String('+a+').c_str(),'+b+','+c+','+d+',1,&tft);\n'
};




//Blockly.Arduino.definitions_['define_linkit_wifi_include']





Blockly.Arduino.ttgo_tft_get_camera=function(){
  var a=this.getFieldValue("SCALE"),
      b=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_NONE)||"0",
      c=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_NONE)||"0";
  Blockly.Arduino.definitions_.define_ttgo_tft_TJPG_include='#include <TJpg_Decoder.h>';
  Blockly.Arduino.definitions_.define_ttgo_tft_TJPG_invoke='uint16_t dmaBuffer1[16 * 16];\nuint16_t dmaBuffer2[16 * 16];\nuint16_t *dmaBufferPtr = dmaBuffer1;\nbool dmaBufferSel = 0;\n';
  Blockly.Arduino.definitions_.define_ttgo_tft_TJPG_event='bool cameraToTft(int16_t x, int16_t y, uint16_t w, uint16_t h, uint16_t *bitmap)\n{\n  if (y >= tft.height())\n    return false;\n  if (dmaBufferSel)\n    dmaBufferPtr = dmaBuffer2;\n  else\n    dmaBufferPtr = dmaBuffer1;\n  dmaBufferSel = !dmaBufferSel;\n  tft.dmaWait();\n  tft.pushImageDMA(x, y, w, h, bitmap, dmaBufferPtr);\n  return true;\n}\n';
  Blockly.Arduino.setups_.ttgo_tft_TJPG_callback='TJpgDec.setCallback(cameraToTft);\n'
  if (Blockly.Arduino.setups_.ttgo_tft.indexOf('tft.initDMA')<0)
    Blockly.Arduino.setups_.ttgo_tft+='  tft.initDMA(true);\n  tft.setSwapBytes(true);\n';
  var returnStr='TJpgDec.setJpgScale('+a+');\ntft.startWrite();\nTJpgDec.drawJpg('+b+','+c+', fb->buf, fb->len);\ntft.endWrite();\n';
  if (Blockly.Arduino.definitions_.stream_function){
    if (Blockly.Arduino.definitions_.define_ttgo_tft_include.indexOf('include <TFT_eSPI_PIXELBIT.h>')>-1){
      if (Blockly.Arduino.definitions_.define_esp_http_server_h_include){
        Blockly.Arduino.definitions_.define_esp_http_server_h_include=Blockly.Arduino.definitions_.define_esp_http_server_h_include.replace('#include <tca5405.h>\n',('#include <tca5405.h>\n'+Blockly.Arduino.definitions_.define_ttgo_tft_include+'\n'));
        //Blockly.Arduino.definitions_.define_ttgo_tft_show_fb_event='void TFTShowCamera() {\n  camera_fb_t *fb = NULL;\n  fb = esp_camera_fb_get();\n  if (!fb) {\n    Serial.println("Camera capture failed");\n    esp_camera_fb_return(fb);\n    return;\n  }\n  if (fb->format != PIXFORMAT_JPEG) {\n    Serial.println("Non-JPEG data not implemented");\n    return;\n  }\n  TJpgDec.setJpgScale(1);\n  tft.startWrite();\n  TJpgDec.drawJpg(0,0, fb->buf, fb->len);\n  tft.endWrite();\n  esp_camera_fb_return(fb);\n}\n';
        //Blockly.Arduino.setups_.ttgo_tft_resb='sensor_t *sg = esp_camera_sensor_get();\n  sg->set_brightness(sg, -1);\n  sg->set_contrast(sg, 1);\n  sg->set_saturation(sg, 1);\n';
        delete Blockly.Arduino.definitions_.define_ttgo_tft_include;
        //return'TFTShowCamera();\n';
      }
    }
    var tempIndex=Blockly.Arduino.definitions_.stream_function.indexOf('if(fb)');
    if (tempIndex<0)
      tempIndex=Blockly.Arduino.definitions_.stream_function.indexOf('if (fb)');
    if (tempIndex>-1){
      var tempMe=Blockly.Arduino.definitions_.stream_function.substring(tempIndex);
      var tempIndex2=tempMe.indexOf('esp_camera_fb_return(fb)');
      if (tempIndex2>-1)
        Blockly.Arduino.definitions_.stream_function=(Blockly.Arduino.definitions_.stream_function.substring(0,tempIndex)+tempMe.substring(0,tempIndex2)+returnStr+tempMe.substring(tempIndex2));
    }
    return'';
  }
  else if (Blockly.Arduino.definitions_.getRequest){
    if (Blockly.Arduino.definitions_.define_ttgo_tft_include.indexOf('include <TFT_eSPI_PIXELBIT.h>')>-1){
      if (Blockly.Arduino.definitions_['define_linkit_wifi_include']){
        Blockly.Arduino.definitions_['define_linkit_wifi_include']=Blockly.Arduino.definitions_['define_linkit_wifi_include'].replace('#include <tca5405.h>\n',('#include <tca5405.h>\n'+Blockly.Arduino.definitions_.define_ttgo_tft_include+'\n'));
        Blockly.Arduino.definitions_.define_ttgo_tft_show_fb_event='void TFTShowCamera() {\n  camera_fb_t *fb = NULL;\n  fb = esp_camera_fb_get();\n  if (!fb) {\n    Serial.println("Camera capture failed");\n    esp_camera_fb_return(fb);\n    return;\n  }\n  if (fb->format != PIXFORMAT_JPEG) {\n    Serial.println("Non-JPEG data not implemented");\n    return;\n  }\n  TJpgDec.setJpgScale('+a+');\n  tft.startWrite();\n  TJpgDec.drawJpg(0,0, fb->buf, fb->len);\n  tft.endWrite();\n  esp_camera_fb_return(fb);\n}\n';
        Blockly.Arduino.setups_.ttgo_tft_resb='sensor_t *sg = esp_camera_sensor_get();\n  sg->set_brightness(sg, -1);\n  sg->set_contrast(sg, 1);\n  sg->set_saturation(sg, 1);\n';
        delete Blockly.Arduino.definitions_.define_ttgo_tft_include;
        return'TFTShowCamera();\n';
      }
    } else{
      var tempIndex=Blockly.Arduino.definitions_.getRequest.indexOf('esp_camera_fb_return(fb)');
      if (tempIndex>-1)
        Blockly.Arduino.definitions_.getRequest=(Blockly.Arduino.definitions_.getRequest.substring(0,tempIndex)+returnStr+Blockly.Arduino.definitions_.getRequest.substring(tempIndex));
      return'';
    }
  } else
    return returnStr;
}

Blockly.Arduino.ttgo_tft_draw_qr=function(){
  var a=Blockly.Arduino.valueToCode(this,"START_X",Blockly.Arduino.ORDER_NONE)||"0",
  b=Blockly.Arduino.valueToCode(this,"START_Y",Blockly.Arduino.ORDER_NONE)||"0",
  c=this.getFieldValue("SIZE"),
  d=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
  e=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_NONE)||'""';
  if (Blockly.Arduino.definitions_.define_ttgo_tft_include.indexOf('qrcode.h')<0)
    Blockly.Arduino.definitions_.define_ttgo_tft_include+='\n#include \"qrcode.h\"';
  //Blockly.Arduino.definitions_.define_ttgo_tft_draw_QR_event='void drawQRcode(TFT_eSPI *myTft,int myX,int myY, byte myVersion,String myData,byte border,uint16_t myColor)\n{\n    QRCode qrcode;\n    uint8_t qrcodeData[qrcode_getBufferSize(myVersion)];\n    qrcode_initText(&qrcode, qrcodeData,myVersion , 0, myData.c_str());\n    TFT_eSprite graphQR= TFT_eSprite(myTft);\n    graphQR.createSprite((qrcode.size+border)*2,(qrcode.size+border)*2);\n    graphQR.fillRect(0, 0, (qrcode.size+border)*2,(qrcode.size+border)*2, myColor);\n    graphQR.fillRect(border, border, qrcode.size*2, qrcode.size*2, TFT_BLACK);\n    for (uint8_t y = 0; y < qrcode.size; y++) {\n        for (uint8_t x = 0; x < qrcode.size; x++) {\n          if (!qrcode_getModule(&qrcode, x, y))\n            graphQR.fillRect(x*2+border, y*2+border, 2,2, myColor);\n        }\n    }\n    graphQR.pushSprite(myX, myY);\n    graphQR.deleteSprite();\n}\n';
  Blockly.Arduino.definitions_.define_ttgo_tft_draw_QR_event='void drawQRcode(byte tftType,TFT_eSPI *myTft,int myX,int myY, byte myVersion,String myData,byte border,uint16_t myColor)\n{\n  TFT_eSprite* graphQR;\n  if (tftType==2)\n    graphQR=(TFT_eSprite*)myTft;\n  QRCode qrcode;\n  uint8_t qrcodeData[qrcode_getBufferSize(myVersion)];\n  qrcode_initText(&qrcode, qrcodeData,myVersion , 0, myData.c_str());\n  if(tftType==1){\n    myTft->fillRect(myX, myY, (qrcode.size+border)*2,(qrcode.size+border)*2, myColor);\n    myTft->fillRect(myX+border, myY+border, qrcode.size*2, qrcode.size*2, TFT_BLACK);\n    for (uint8_t y = 0; y < qrcode.size; y++) {\n      for (uint8_t x = 0; x < qrcode.size; x++) {\n        if (!qrcode_getModule(&qrcode, x, y))\n          myTft->fillRect(myX+x*2+border, myY+y*2+border, 2,2, myColor);\n      }\n    }\n  } else if (tftType==2){\n    graphQR->fillRect(myX, myY, (qrcode.size+border)*2,(qrcode.size+border)*2, myColor);\n    graphQR->fillRect(myX+border, myY+border, qrcode.size*2, qrcode.size*2, TFT_BLACK);\n    for (uint8_t y = 0; y < qrcode.size; y++) {\n      for (uint8_t x = 0; x < qrcode.size; x++) {\n        if (!qrcode_getModule(&qrcode, x, y))\n          graphQR->fillRect(myX+x*2+border, myY+y*2+border, 2,2, myColor);\n      }\n    }\n  }\n}\n';
  return'drawQRcode(1,&tft,'+a+','+b+','+c+','+e+',5,'+d+');\n';
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
  Blockly.Arduino.definitions_.define_getDataFromRTC_event="int get_data_from_RTC(byte dataType) {\n  int myResult=0;\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  switch(dataType){\n    case 0:\n      myResult=(1900 + t_st->tm_year);\n      break;\n    case 1:\n      myResult=( 1 + t_st->tm_mon);\n      break;\n    case 2:\n      myResult=t_st->tm_mday;\n      break;\n    case 3:\n      myResult=t_st->tm_hour;\n      break;\n    case 4:\n      myResult=t_st->tm_min;\n      break;\n    case 5:\n      myResult=t_st->tm_sec;\n      break;\n  }\n  return myResult;\n}\n";
  Blockly.Arduino.definitions_.define_ttgo_clock_invoke='const float pi = 3.14159267 ;\nint clock_center_x=64;\nint clock_center_y=32;\nint x_old;\nint y_old;\nint x_new;\nint y_new;\nuint32_t clock_hour=TFT_BLUE;\nuint32_t clock_minute=TFT_YELLOW;\nuint32_t clock_second=TFT_GREEN;\nuint32_t clock_scale=TFT_RED;\nint radius;\n\nvoid draw_second(int second){\n   y_old= ((radius-16)*cos(pi-(2*pi)/60*second))+clock_center_y;\n   x_old =((radius-16)*sin(pi-(2*pi)/60*second))+clock_center_x;\n   tft.drawCircle(x_old, y_old, 4,clock_second);\n}\n\nvoid draw_hour(int hour, int minute){\n   y_old= ((radius-28)*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y;\n   x_old =((radius-28)*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x;\n   y_new=((radius-28)*cos(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_y+1;\n   x_new=((radius-28)*sin(pi-(2*pi)/12*hour-(2*PI)/720*minute))+clock_center_x+1;\n   tft.drawLine(clock_center_x,clock_center_y,x_old,y_old,clock_hour);\n   tft.drawLine(clock_center_x+1,clock_center_y+1,x_new,y_new,clock_hour);\n}\n\nvoid draw_minute(int minute){\n   y_old =((radius-16)*cos(pi-(2*pi)/60*minute))+clock_center_y;\n   x_old =((radius-16)*sin(pi-(2*pi)/60*minute))+clock_center_x;\n   y_new =((radius-16)*cos(pi-(2*pi)/60*minute))+clock_center_y+1;\n   x_new =((radius-16)*sin(pi-(2*pi)/60*minute))+clock_center_x+1;\n   tft.drawLine(clock_center_x,clock_center_y,x_old,y_old,clock_minute);\n   tft.drawLine(clock_center_x+1,clock_center_y+1,x_old,y_old,clock_minute);\n}\n\nvoid draw_clock_face(void){\n  tft.drawCircle(clock_center_x, clock_center_y,6,clock_scale);\n  tft.drawCircle(clock_center_x, clock_center_y,5,clock_scale);\n  for (int i=0;i<12;i++){\n     y_old= (radius*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_old =(radius*sin(pi-(2*pi)/12*i))+clock_center_x;\n     y_new= ((radius-8)*cos(pi-(2*pi)/12*i))+clock_center_y;\n     x_new =((radius-8)*sin(pi-(2*pi)/12*i))+clock_center_x;\n     if (i==0){\n       tft.setTextSize(1);\n       tft.setTextFont(2);\n       tft.setTextColor(clock_scale);\n       tft.drawString("12",x_old-5,y_old-3);\n       tft.setTextColor(tft_color);\n       tft.setTextSize(tftTextSize);\n       tft.setTextFont(tftTextFont);\n     } else {\n       tft.drawLine(x_new,y_new,x_old,y_old,clock_scale);\n       tft.drawLine(x_new+1,y_new+1,x_old+1,y_old+1,clock_scale);\n     }\n  }\n}\n\nvoid tftClockSetColors(uint32_t color1,uint32_t color2,uint32_t color3,uint32_t color4){\n  clock_hour=color1;\n  clock_minute=color2;\n  clock_second=color3;\n  clock_scale=color4;\n}\n\nvoid checkClockCenter(byte myPos){\n  if (tft.width()==tft.height()){\n    clock_center_x=tft.width()/2;\n    clock_center_y=clock_center_x;\n    radius=clock_center_x;\n  }else if (tft.width()>tft.height()){\n    clock_center_y=tft.height()/2;\n    radius=clock_center_y;\n    switch(myPos){\n      case 0:\n        clock_center_x=radius;\n        break;\n      case 1:\n        clock_center_x=tft.width()/2;\n        break;\n      case 2:\n        clock_center_x=tft.width()-radius;\n        break;\n    }\n  } else {\n    clock_center_x=tft.width()/2;\n    radius=clock_center_x;\n    switch(myPos){\n      case 0:\n        clock_center_y=radius;\n        break;\n      case 1:\n        clock_center_y=tft.height()/2;\n        break;\n      case 2:\n        clock_center_y=tft.height()-radius;\n        break;\n    }\n  }\n}\n\nvoid runClock(byte clockPos){\n  checkClockCenter(clockPos);\n  tft.fillCircle(clock_center_x, clock_center_y, radius-8, TFT_BLACK);\n  draw_clock_face();\n  draw_second(get_data_from_RTC(5));\n  draw_minute(get_data_from_RTC(4));\n  draw_hour(get_data_from_RTC(3),get_data_from_RTC(4));\n}\n';
  return'tftClockSetColors('+a+','+b+','+c+','+d+');\n';
};

Blockly.Arduino.ttgo_tft_draw_clock=function(){
  var a=this.getFieldValue("CLOCK_POS");
  Blockly.Arduino.definitions_.define_ESP_time_include="#include <time.h>";
  Blockly.Arduino.definitions_.define_getDataFromRTC_event="int get_data_from_RTC(byte dataType) {\n  int myResult=0;\n  time_t t = time(NULL);\n  struct tm *t_st;\n  t_st = localtime(&t);\n  switch(dataType){\n    case 0:\n      myResult=(1900 + t_st->tm_year);\n      break;\n    case 1:\n      myResult=( 1 + t_st->tm_mon);\n      break;\n    case 2:\n      myResult=t_st->tm_mday;\n      break;\n    case 3:\n      myResult=t_st->tm_hour;\n      break;\n    case 4:\n      myResult=t_st->tm_min;\n      break;\n    case 5:\n      myResult=t_st->tm_sec;\n      break;\n  }\n  return myResult;\n}\n";
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
  Blockly.Arduino.definitions_.define_SPIFFS_include='#include "SPIFFS.h"';
  Blockly.Arduino.definitions_.define_HTTPCLIENT_include='#include <HTTPClient.h>';
  Blockly.Arduino.definitions_.define_ESP8266Audio_include='#include "AudioFileSourceSPIFFS.h"\n#include "AudioFileSourceSD.h"\n#include "AudioFileSourceHTTPStream.h"\n#include "AudioFileSourceBuffer.h"\n#include "AudioOutputI2S.h"\n#include "AudioGeneratorMP3.h"\n#include "AudioGeneratorWAV.h"\n#include "AudioFileSourceID3.h"\n';
  Blockly.Arduino.definitions_.define_SD_CS_invoke='int pinCS=SS;';
  Blockly.Arduino.definitions_.define_ESP8266Audio_variable_invoke='AudioFileSourceSD *i2sSdFile;\nAudioFileSourceSPIFFS *i2sSPIFFSfile;\nAudioGeneratorMP3 *i2sMp3;\nAudioGeneratorWAV *i2sWav;\nAudioFileSourceHTTPStream *i2sFile=new AudioFileSourceHTTPStream();\nAudioFileSourceBuffer *i2sBuff;\nAudioOutputI2S *i2sOut;\nAudioFileSourceID3 *i2sID3;\nString dacPlayType;\nString voiceFileExt="";\nString mp3FileName;\nString ttsContent;\nString httpLink;\nfloat gainValue=1.0;\nbool ttsDone=true;\nbool httpDone=true;\nbool mp3Done=true;\n';
  Blockly.Arduino.definitions_.define_urlencode_event="String URLEncode(const char* msg)\n{\n  const char *hex = \"0123456789abcdef\";\n  String encodedMsg = \"\";\n  while (*msg!='\\0'){\n      if( ('a' <= *msg && *msg <= 'z')\n              || ('A' <= *msg && *msg <= 'Z')\n              || ('0' <= *msg && *msg <= '9') ) {\n          encodedMsg += *msg;\n      } else {\n          encodedMsg += '%';\n          encodedMsg += hex[*msg >> 4];\n          encodedMsg += hex[*msg & 15];\n      }\n      msg++;\n  }\n  return encodedMsg;\n}\n";
  //Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_checkRunning_event='bool checkDACrunning()\n{\n  bool isRunning=false;\n  if (i2sMp3->isRunning()) {\n    isRunning=true;\n    if (!i2sMp3->loop()){\n      i2sMp3->stop();\n      mp3Done=true;\n      ttsDone=true;\n      httpDone=true;\n      isRunning=false;\n    }\n  }else{\n    isRunning=false;\n  }\n  return isRunning;\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_checkRunning_event='bool checkDACrunning()\n{\n  bool isRunning=false;\n  bool looping=false;\n  String playType="mp3";\n  if (dacPlayType=="MP3"){\n    if (voiceFileExt=="wav")\n      playType="wav";\n  }\n  isRunning=((playType=="mp3")?i2sMp3->isRunning():i2sWav->isRunning());\n  if (isRunning) {\n    looping=((playType=="mp3")?i2sMp3->loop():i2sWav->loop());\n    if (!looping){\n      if (playType=="mp3")\n        i2sMp3->stop();\n      else\n        i2sWav->stop();\n      mp3Done=true;\n      ttsDone=true;\n      httpDone=true;\n      isRunning=false;\n    }\n  }\n  return isRunning;\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_TTS_event='void getVoiceFromGoogle(String myTalk,String tl)\n{\n  myTalk=URLEncode(myTalk.c_str());\n  ttsDone=false;\n  httpDone=true;\n  mp3Done=true;\n  dacPlayType="TTS";\n  ttsContent=myTalk;\n  myTalk="http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl="+tl+"&q="+myTalk;\n  saveTTStoFile(myTalk,"/TTS/tts.mp3",2);\n  getVoiceFromFile("/TTS/tts.mp3",2);\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_saveTTStoFile_event='void saveTTStoFile(String myLink,String fileName,byte sdType)\n{\n  myLink.replace(" ","%20");\n  File myTTSFile;\n  if(fileName.indexOf("/")!=0)\n    fileName="/"+fileName;\n  if (sdType==1){\n    if(!SD.begin(pinCS)){\n      return;\n    }\n    String path=fileName.substring(1,fileName.lastIndexOf("/"));\n    String mySubStr="/";\n    while(path.indexOf("/")>-1){\n      mySubStr+=path.substring(0,path.indexOf("/"));\n      if( !SD.exists( mySubStr.c_str()))\n        SD.mkdir(mySubStr.c_str());\n      mySubStr+="/";\n      path= path.substring(path.indexOf("/")+1);\n    }\n    if (path!=""){\n      mySubStr+=path;\n      if( !SD.exists( mySubStr.c_str()))\n        SD.mkdir(mySubStr.c_str());\n    }\n    myTTSFile = SD.open(fileName, "w");\n    if (!myTTSFile) {\n      return;\n    }\n  } else if (sdType==2){\n    if(!SPIFFS.begin(true)){\n      return;\n    }\n    myTTSFile = SPIFFS.open(fileName, "w");\n    if (!myTTSFile) {\n      return;\n    }\n  }\n  HTTPClient http;\n  http.begin(myLink);\n  int httpCode = http.GET();\n  if (httpCode == HTTP_CODE_OK) {\n      http.writeToStream(&myTTSFile);\n  }\n  myTTSFile.close();\n  http.end();\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_radio_event='void playRadioStation(String myStationURL)\n{\n  httpDone=true;\n  mp3Done=true;\n  ttsDone=true;\n  dacPlayType="radio";\n  i2sFile->open(myStationURL.c_str());\n  if (i2sBuff!=NULL)\n    i2sBuff->close();\n  i2sBuff = new AudioFileSourceBuffer(i2sFile, 2048);\n  i2sMp3->begin(i2sBuff, i2sOut);\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_httpMp3_event='void playHttpMP3(String myStationURL)\n{\n  mp3Done=true;\n  ttsDone=true;\n  httpDone=false;\n  dacPlayType="HTTPMP3";\n  httpLink=myStationURL;\n  myStationURL.replace("www.dropbox","dl.dropboxusercontent");\n  myStationURL.replace("?dl=0","");\n  i2sFile->open(myStationURL.c_str());\n  if (i2sBuff!=NULL)\n    i2sBuff->close();\n  i2sBuff = new AudioFileSourceBuffer(i2sFile, 2048);\n  i2sMp3->begin(i2sBuff, i2sOut);\n}\n';
  //Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_file_event='void getVoiceFromFile(String myFileName,byte sdType)\n{\n  httpDone=true;\n  ttsDone=true;\n  mp3Done=false;\n  dacPlayType="MP3";\n  if(myFileName.indexOf("/")!=0)\n    myFileName="/"+myFileName;\n  if (sdType==1){\n    SD.begin(pinCS);\n    i2sSdFile = new AudioFileSourceSD(String(myFileName).c_str());\n    if (i2sBuff!=NULL)\n      i2sBuff->close();\n    i2sBuff = new AudioFileSourceBuffer(i2sSdFile, 2048);\n    mp3FileName=myFileName;\n  }\n  else {\n    if (myFileName=="/TTS/tts.mp3"){\n      ttsDone=false;\n      mp3Done=true;\n      dacPlayType="TTS";\n    } else {\n      mp3FileName=myFileName;\n    }\n    SPIFFS.begin();\n    i2sSPIFFSfile=new AudioFileSourceSPIFFS(String(myFileName).c_str());\n    if (i2sBuff!=NULL)\n      i2sBuff->close();\n    i2sBuff = new AudioFileSourceBuffer(i2sSPIFFSfile, 2048);\n  }\n  i2sMp3->begin(i2sBuff, i2sOut);\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_file_event='void getVoiceFromFile(String myFileName,byte sdType)\n{\n  voiceFileExt="";\n  if (myFileName.length()<4)\n    return;\n  String extendName=myFileName.substring(myFileName.length()-3);\n  extendName.toLowerCase();\n  if ((extendName!="wav") && (extendName!="mp3"))\n    return;\n  voiceFileExt=extendName;\n  httpDone=true;\n  ttsDone=true;\n  mp3Done=false;\n  dacPlayType="MP3";\n  if(myFileName.indexOf("/")!=0)\n    myFileName="/"+myFileName;\n  if (sdType==1){\n    SD.begin(pinCS);\n    i2sSdFile = new AudioFileSourceSD(String(myFileName).c_str());\n    if (extendName=="mp3"){\n      if (i2sBuff!=NULL)\n        i2sBuff->close();\n      i2sBuff = new AudioFileSourceBuffer(i2sSdFile, 2048);\n    } else {\n      if (i2sID3!=NULL)\n        i2sID3->close();\n      i2sID3 = new AudioFileSourceID3(i2sSdFile);\n    }\n    mp3FileName=myFileName;\n  }\n  else {\n    if (myFileName=="/TTS/tts.mp3"){\n      ttsDone=false;\n      mp3Done=true;\n      dacPlayType="TTS";\n    } else {\n      mp3FileName=myFileName;\n    }\n    SPIFFS.begin();\n    i2sSPIFFSfile=new AudioFileSourceSPIFFS(String(myFileName).c_str());\n    if (extendName=="mp3"){\n      if (i2sBuff!=NULL)\n        i2sBuff->close();\n      i2sBuff = new AudioFileSourceBuffer(i2sSPIFFSfile, 2048);\n    } else {\n      if (i2sID3!=NULL)\n        i2sID3->close();\n      i2sID3 = new AudioFileSourceID3(i2sSPIFFSfile);\n    }\n  }\n  if (extendName=="mp3")\n    i2sMp3->begin(i2sBuff, i2sOut);\n  else if (extendName=="wav")\n    i2sWav->begin(i2sID3, i2sOut);\n}\n';
  Blockly.Arduino.definitions_.define_DAC_checkTTS_event='void checkTTS(){\n}\n';
  Blockly.Arduino.definitions_.define_DAC_checkMP3_event='void checkMP3(){\n}\n';
  Blockly.Arduino.definitions_.define_DAC_checkHttpMP3_event='void checkHttpMP3(){\n}\n';
//  Blockly.Arduino.definitions_.define_DAC_stop_event='void dacStop()\n{\n  httpDone=true;\n  mp3Done=true;\n  ttsDone=true;\n  dacPlayType="";\n  httpLink="";\n  mp3FileName="";\n  ttsContent="";\n  if (i2sMp3->isRunning()) {\n    i2sMp3->stop();\n    i2sBuff->close();\n  }\n}\n';
  Blockly.Arduino.definitions_.define_DAC_stop_event='void dacStop()\n{  bool isRunning=false;\n  String playType="mp3";\n  if (dacPlayType=="MP3"){\n    if (voiceFileExt=="wav")\n      playType="wav";\n  }\n  if (playType=="mp3"){\n    if (i2sMp3->isRunning()){\n      i2sMp3->stop();\n      i2sBuff->close();\n    }\n  } else {\n    if (i2sWav->isRunning()){\n      i2sWav->stop();\n      i2sID3->close();\n    }\n  }\n  httpDone=true;\n  mp3Done=true;\n  ttsDone=true;\n  dacPlayType="";\n  httpLink="";\n  mp3FileName="";\n  ttsContent="";\n  voiceFileExt="";\n}\n';
  Blockly.Arduino.dac.ESP8266Audio="yes";
  return'i2sMp3 = new AudioGeneratorMP3();\ni2sWav = new AudioGeneratorWAV();\ni2sOut = new AudioOutputI2S();\ni2sOut->SetPinout('+a+','+b+','+c+');\ni2sOut->SetGain(gainValue);\n';
}

Blockly.Arduino.pocketcard_dac_init=function(){
  var a="33",
      b="32",
      c="26";
  Blockly.Arduino.definitions_.define_SPIFFS_include='#include "SPIFFS.h"';
  Blockly.Arduino.definitions_.define_HTTPCLIENT_include='#include <HTTPClient.h>';
  Blockly.Arduino.definitions_.define_ESP8266Audio_include='#include "AudioFileSourceSPIFFS.h"\n#include "AudioFileSourceSD.h"\n#include "AudioFileSourceHTTPStream.h"\n#include "AudioFileSourceBuffer.h"\n#include "AudioOutputI2S.h"\n#include "AudioGeneratorMP3.h"\n#include "AudioGeneratorWAV.h"\n#include "AudioFileSourceID3.h"\n';
  Blockly.Arduino.definitions_.define_SD_CS_invoke='int pinCS=4;';
  Blockly.Arduino.definitions_.define_ESP8266Audio_variable_invoke='AudioFileSourceSD *i2sSdFile;\nAudioFileSourceSPIFFS *i2sSPIFFSfile;\nAudioGeneratorMP3 *i2sMp3;\nAudioGeneratorWAV *i2sWav;\nAudioFileSourceHTTPStream *i2sFile=new AudioFileSourceHTTPStream();\nAudioFileSourceBuffer *i2sBuff;\nAudioOutputI2S *i2sOut;\nAudioFileSourceID3 *i2sID3;\nString dacPlayType;\nString voiceFileExt="";\nString mp3FileName;\nString ttsContent;\nString httpLink;\nfloat gainValue=1.0;\nbool ttsDone=true;\nbool httpDone=true;\nbool mp3Done=true;\n';
  Blockly.Arduino.definitions_.define_urlencode_event="String URLEncode(const char* msg)\n{\n  const char *hex = \"0123456789abcdef\";\n  String encodedMsg = \"\";\n  while (*msg!='\\0'){\n      if( ('a' <= *msg && *msg <= 'z')\n              || ('A' <= *msg && *msg <= 'Z')\n              || ('0' <= *msg && *msg <= '9') ) {\n          encodedMsg += *msg;\n      } else {\n          encodedMsg += '%';\n          encodedMsg += hex[*msg >> 4];\n          encodedMsg += hex[*msg & 15];\n      }\n      msg++;\n  }\n  return encodedMsg;\n}\n";
//  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_checkRunning_event='bool checkDACrunning()\n{\n  bool isRunning=false;\n  if (i2sMp3->isRunning()) {\n    isRunning=true;\n    if (!i2sMp3->loop()){\n      i2sMp3->stop();\n      mp3Done=true;\n      ttsDone=true;\n      httpDone=true;\n      isRunning=false;\n    }\n  }else{\n    isRunning=false;\n  }\n  return isRunning;\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_checkRunning_event='bool checkDACrunning()\n{\n  bool isRunning=false;\n  bool looping=false;\n  String playType="mp3";\n  if (dacPlayType=="MP3"){\n    if (voiceFileExt=="wav")\n      playType="wav";\n  }\n  isRunning=((playType=="mp3")?i2sMp3->isRunning():i2sWav->isRunning());\n  if (isRunning) {\n    looping=((playType=="mp3")?i2sMp3->loop():i2sWav->loop());\n    if (!looping){\n      if (playType=="mp3")\n        i2sMp3->stop();\n      else\n        i2sWav->stop();\n      mp3Done=true;\n      ttsDone=true;\n      httpDone=true;\n      isRunning=false;\n    }\n  }\n  return isRunning;\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_TTS_event='void getVoiceFromGoogle(String myTalk,String tl)\n{\n  myTalk=URLEncode(myTalk.c_str());\n  ttsDone=false;\n  httpDone=true;\n  mp3Done=true;\n  dacPlayType="TTS";\n  ttsContent=myTalk;\n  myTalk="http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl="+tl+"&q="+myTalk;\n  saveTTStoFile(myTalk,"/TTS/tts.mp3",2);\n  getVoiceFromFile("/TTS/tts.mp3",2);\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_saveTTStoFile_event='void saveTTStoFile(String myLink,String fileName,byte sdType)\n{\n  myLink.replace(" ","%20");\n  File myTTSFile;\n  if(fileName.indexOf("/")!=0)\n    fileName="/"+fileName;\n  if (sdType==1){\n    if(!SD.begin(pinCS)){\n      return;\n    }\n    String path=fileName.substring(1,fileName.lastIndexOf("/"));\n    String mySubStr="/";\n    while(path.indexOf("/")>-1){\n      mySubStr+=path.substring(0,path.indexOf("/"));\n      if( !SD.exists( mySubStr.c_str()))\n        SD.mkdir(mySubStr.c_str());\n      mySubStr+="/";\n      path= path.substring(path.indexOf("/")+1);\n    }\n    if (path!=""){\n      mySubStr+=path;\n      if( !SD.exists( mySubStr.c_str()))\n        SD.mkdir(mySubStr.c_str());\n    }\n    myTTSFile = SD.open(fileName, "w");\n    if (!myTTSFile) {\n      return;\n    }\n  } else if (sdType==2){\n    if(!SPIFFS.begin(true)){\n      return;\n    }\n    myTTSFile = SPIFFS.open(fileName, "w");\n    if (!myTTSFile) {\n      return;\n    }\n  }\n  HTTPClient http;\n  http.begin(myLink);\n  int httpCode = http.GET();\n  if (httpCode == HTTP_CODE_OK) {\n      http.writeToStream(&myTTSFile);\n  }\n  myTTSFile.close();\n  http.end();\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_radio_event='void playRadioStation(String myStationURL)\n{\n  httpDone=true;\n  mp3Done=true;\n  ttsDone=true;\n  dacPlayType="radio";\n  i2sFile->open(myStationURL.c_str());\n  if (i2sBuff!=NULL)\n    i2sBuff->close();\n  i2sBuff = new AudioFileSourceBuffer(i2sFile, 2048);\n  i2sMp3->begin(i2sBuff, i2sOut);\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_httpMp3_event='void playHttpMP3(String myStationURL)\n{\n  mp3Done=true;\n  ttsDone=true;\n  httpDone=false;\n  dacPlayType="HTTPMP3";\n  httpLink=myStationURL;\n  myStationURL.replace("www.dropbox","dl.dropboxusercontent");\n  myStationURL.replace("?dl=0","");\n  i2sFile->open(myStationURL.c_str());\n  if (i2sBuff!=NULL)\n    i2sBuff->close();\n  i2sBuff = new AudioFileSourceBuffer(i2sFile, 2048);\n  i2sMp3->begin(i2sBuff, i2sOut);\n}\n';
//  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_file_event='void getVoiceFromFile(String myFileName,byte sdType)\n{\n  httpDone=true;\n  ttsDone=true;\n  mp3Done=false;\n  dacPlayType="MP3";\n  if(myFileName.indexOf("/")!=0)\n    myFileName="/"+myFileName;\n  if (sdType==1){\n    SD.begin(pinCS);\n    i2sSdFile = new AudioFileSourceSD(String(myFileName).c_str());\n    if (i2sBuff!=NULL)\n      i2sBuff->close();\n    i2sBuff = new AudioFileSourceBuffer(i2sSdFile, 2048);\n    mp3FileName=myFileName;\n  }\n  else {\n    if (myFileName=="/TTS/tts.mp3"){\n      ttsDone=false;\n      mp3Done=true;\n      dacPlayType="TTS";\n    } else {\n      mp3FileName=myFileName;\n    }\n    SPIFFS.begin();\n    i2sSPIFFSfile=new AudioFileSourceSPIFFS(String(myFileName).c_str());\n    if (i2sBuff!=NULL)\n      i2sBuff->close();\n    i2sBuff = new AudioFileSourceBuffer(i2sSPIFFSfile, 2048);\n  }\n  i2sMp3->begin(i2sBuff, i2sOut);\n}\n';
  Blockly.Arduino.definitions_.define_ESP8266Audio_function_invoke_file_event='void getVoiceFromFile(String myFileName,byte sdType)\n{\n  voiceFileExt="";\n  if (myFileName.length()<4)\n    return;\n  String extendName=myFileName.substring(myFileName.length()-3);\n  extendName.toLowerCase();\n  if ((extendName!="wav") && (extendName!="mp3"))\n    return;\n  voiceFileExt=extendName;\n  httpDone=true;\n  ttsDone=true;\n  mp3Done=false;\n  dacPlayType="MP3";\n  if(myFileName.indexOf("/")!=0)\n    myFileName="/"+myFileName;\n  if (sdType==1){\n    SD.begin(pinCS);\n    i2sSdFile = new AudioFileSourceSD(String(myFileName).c_str());\n    if (extendName=="mp3"){\n      if (i2sBuff!=NULL)\n        i2sBuff->close();\n      i2sBuff = new AudioFileSourceBuffer(i2sSdFile, 2048);\n    } else {\n      if (i2sID3!=NULL)\n        i2sID3->close();\n      i2sID3 = new AudioFileSourceID3(i2sSdFile);\n    }\n    mp3FileName=myFileName;\n  }\n  else {\n    if (myFileName=="/TTS/tts.mp3"){\n      ttsDone=false;\n      mp3Done=true;\n      dacPlayType="TTS";\n    } else {\n      mp3FileName=myFileName;\n    }\n    SPIFFS.begin();\n    i2sSPIFFSfile=new AudioFileSourceSPIFFS(String(myFileName).c_str());\n    if (extendName=="mp3"){\n      if (i2sBuff!=NULL)\n        i2sBuff->close();\n      i2sBuff = new AudioFileSourceBuffer(i2sSPIFFSfile, 2048);\n    } else {\n      if (i2sID3!=NULL)\n        i2sID3->close();\n      i2sID3 = new AudioFileSourceID3(i2sSPIFFSfile);\n    }\n  }\n  if (extendName=="mp3")\n    i2sMp3->begin(i2sBuff, i2sOut);\n  else if (extendName=="wav")\n    i2sWav->begin(i2sID3, i2sOut);\n}\n';
  Blockly.Arduino.definitions_.define_DAC_checkTTS_event='void checkTTS(){\n}\n';
  Blockly.Arduino.definitions_.define_DAC_checkMP3_event='void checkMP3(){\n}\n';
  Blockly.Arduino.definitions_.define_DAC_checkHttpMP3_event='void checkHttpMP3(){\n}\n';
//  Blockly.Arduino.definitions_.define_DAC_stop_event='void dacStop()\n{\n  httpDone=true;\n  mp3Done=true;\n  ttsDone=true;\n  dacPlayType="";\n  httpLink="";\n  mp3FileName="";\n  ttsContent="";\n  if (i2sMp3->isRunning()) {\n    i2sMp3->stop();\n    i2sBuff->close();\n  }\n}\n';
  Blockly.Arduino.definitions_.define_DAC_stop_event='void dacStop()\n{  bool isRunning=false;\n  String playType="mp3";\n  if (dacPlayType=="MP3"){\n    if (voiceFileExt=="wav")\n      playType="wav";\n  }\n  if (playType=="mp3"){\n    if (i2sMp3->isRunning()){\n      i2sMp3->stop();\n      i2sBuff->close();\n    }\n  } else {\n    if (i2sWav->isRunning()){\n      i2sWav->stop();\n      i2sID3->close();\n    }\n  }\n  httpDone=true;\n  mp3Done=true;\n  ttsDone=true;\n  dacPlayType="";\n  httpLink="";\n  mp3FileName="";\n  ttsContent="";\n  voiceFileExt="";\n}\n';
  Blockly.Arduino.dac.ESP8266Audio="yes";
  return'i2sMp3 = new AudioGeneratorMP3();\ni2sWav = new AudioGeneratorWAV();\ni2sOut = new AudioOutputI2S();\ni2sOut->SetPinout('+a+','+b+','+c+');\ni2sOut->SetGain(gainValue);\n';
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
      b=Blockly.Arduino.valueToCode(this,"L_CODE",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'getVoiceFromGoogle('+a+','+b+');\n';
}

Blockly.Arduino.dac_tts_file=function(){
  var a=Blockly.Arduino.valueToCode(this,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"L_CODE",Blockly.Arduino.ORDER_ATOMIC)||"",
//      b=this.getFieldValue("L_CODE"),
      c=Blockly.Arduino.valueToCode(this,"FILENAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=this.getFieldValue("F_SOURCE");
  //b=b.replace(/\"/g,"");
  //var myLink='http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl='+b+'&q=';
  var myLink='http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=';
  return'saveTTStoFile(String()+"'+myLink+'"+'+b+'+"&q="+URLEncode(String('+a+').c_str()),'+c+','+d+');\n';
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
  Blockly.Arduino.definitions_.define_SDFAT_include='#include "SdFat.h"';
  Blockly.Arduino.definitions_.define_SDFAT_variable_invoke='SdFat mySD;\nbool SD_exists=false;\n';
  Blockly.Arduino.definitions_.define_SD_CS_invoke='int pinCS=SS;';
  if (Blockly.Arduino.my_board_type=="7697"){
    return'SD_exists=mySD.begin();\n';
  } else {
    return'SD_exists=mySD.begin(pinCS, SD_SCK_MHZ(10));\n';
  }
}

Blockly.Arduino.sd_KSB065_init=function(){
  Blockly.Arduino.definitions_.define_SDFAT_include='#include "SdFat.h"';
  Blockly.Arduino.definitions_.define_SDFAT_variable_invoke='SdFat mySD;\nbool SD_exists=false;\n';
  Blockly.Arduino.definitions_.define_SD_CS_invoke='int pinCS=4;';
  if (Blockly.Arduino.my_board_type=="7697"){
    return'SD_exists=mySD.begin();\n';
  } else {
    return'SD_exists=mySD.begin(pinCS, SD_SCK_MHZ(10));\n';
  }
}

Blockly.Arduino.sd_set_cs=function(){
  var a=Blockly.Arduino.valueToCode(this,"CS_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return'pinCS='+a+';\n';
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

Blockly.Arduino.sd_file_download=function(){
    var a=Blockly.Arduino.valueToCode(this,"F_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
        b=Blockly.Arduino.valueToCode(this,"URL",Blockly.Arduino.ORDER_ATOMIC)||"";
    Blockly.Arduino.definitions_.define_HTTPCLIENT_include='#include <HTTPClient.h>';
    Blockly.Arduino.definitions_.define_SDFAT_download_event = 'void saveToSD(String myLink,String fileName)\n{\n  myLink.replace("www.dropbox","dl.dropboxusercontent");\n  myLink.replace("?dl=0","");\n  myLink.replace(" ","%20");\n  File mySDFile;\n  if(fileName.indexOf("/")!=0)\n    fileName="/"+fileName;\n  if(!SD_exists){\n    return;\n  }\n  mySDFile = mySD.open(fileName, O_CREAT | O_WRITE);\n  if (!mySDFile) {\n    return;\n  }\n  WiFiClientSecure sslClient;\n  HTTPClient http;\n  http.begin(sslClient,myLink);\n  int httpCode = http.GET();\n  if (httpCode == HTTP_CODE_OK) {\n      http.writeToStream(&mySDFile);\n  }\n  mySDFile.close();\n  http.end();\n}\n';
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
      Blockly.Arduino.definitions_.define_SDFAT_download_event=Blockly.Arduino.definitions_.define_SDFAT_download_event.replace("WiFiClientSecure sslClient;\n","WiFiClientSecure sslClient;\n  sslClient.setInsecure();\n");
    else if (Blockly.Arduino.my_board_type=="7697")
      Blockly.Arduino.definitions_.define_SDFAT_download_event=Blockly.Arduino.definitions_.define_SDFAT_download_event.replace("WiFiClientSecure","TLSClient");
    return 'saveToSD('+b+','+a+');\n';
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
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_L9110_invoke='byte m1aL9110='+a+';\nbyte m1bL9110='+b+';\nbyte m2aL9110='+c+';\nbyte m2bL9110='+d+';\nbyte m1bCH=13;\nbyte m2bCH=14;\n';
    Blockly.Arduino.setups_["setup_L9110"]='pinMode(m1aL9110,OUTPUT);\n  pinMode(m2aL9110,OUTPUT);\n  ledcSetup(m1bCH, 5000, 8);\n  ledcAttachPin(m1bL9110,m1bCH);\n  ledcSetup(m2bCH, 5000, 8);\n  ledcAttachPin(m2bL9110,m2bCH);\n  digitalWrite(m1aL9110,1);\n  ledcWrite(m1bCH,255);\n  digitalWrite(m2aL9110,1);\n  ledcWrite(m2bCH,255);\n';
  } else {
    Blockly.Arduino.definitions_.define_L9110_invoke='byte m1aL9110='+a+';\nbyte m1bL9110='+b+';\nbyte m2aL9110='+c+';\nbyte m2bL9110='+d+';\n';
    Blockly.Arduino.setups_["setup_L9110"]='pinMode(m1aL9110,OUTPUT);\n  pinMode(m1bL9110,OUTPUT);\n  pinMode(m2aL9110,OUTPUT);\n  pinMode(m2bL9110,OUTPUT);\n  digitalWrite(m1aL9110,1);\n  analogWrite(m1bL9110,255);\n  digitalWrite(m2aL9110,1);\n  analogWrite(m2bL9110,255);\n';
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
        returnValue='digitalWrite(m1aL9110,1);\nanalogWrite(m1bL9110,255-'+c+');\ndigitalWrite(m2aL9110,1);\nanalogWrite(m2bL9110,255-'+c+');\n';
      else
        returnValue='digitalWrite(m1aL9110,0);\nanalogWrite(m1bL9110,'+c+');\ndigitalWrite(m2aL9110,0);\nanalogWrite(m2bL9110,'+c+');\n';
    } else {
      if (b=="1")
        returnValue='digitalWrite('+a+'aL9110,1);\nanalogWrite('+a+'bL9110,255-'+c+');\n';
      else
        returnValue='digitalWrite('+a+'aL9110,0);\nanalogWrite('+a+'bL9110,'+c+');\n';
    }
  if (Blockly.Arduino.my_board_type=="ESP32"){
    returnValue=returnValue.replace(/analogWrite/g,"ledcWrite");
    //returnValue=returnValue.replace(/m1aL9110/g,"m1aCH");
    returnValue=returnValue.replace(/m1bL9110/g,"m1bCH");
    //returnValue=returnValue.replace(/m2aL9110/g,"m2aCH");
    returnValue=returnValue.replace(/m2bL9110/g,"m2bCH");
  } 
  return returnValue;
}


Blockly.Arduino.l9110_stop=function(){
  var a=this.getFieldValue("MOTOR"),
      returnValue="";
    if (a=="both"){
      returnValue='digitalWrite(m1aL9110,1);\nanalogWrite(m1bL9110,255);\ndigitalWrite(m2aL9110,1);\nanalogWrite(m2bL9110,255);\n';
    } else {
      returnValue='digitalWrite('+a+'aL9110,1);\nanalogWrite('+a+'bL9110,255);\n';
    }
  if (Blockly.Arduino.my_board_type=="ESP32"){
    returnValue=returnValue.replace(/analogWrite/g,"ledcWrite");
    //returnValue=returnValue.replace(/m1aL9110/g,"m1aCH");
    returnValue=returnValue.replace(/m1bL9110/g,"m1bCH");
    //returnValue=returnValue.replace(/m2aL9110/g,"m2aCH");
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
  } else if (Blockly.Arduino.my_board_type=="Arduino"){
    pinStr="byte A_Pin=4;\nbyte B_Pin=5;\n";
  }
  if ((Blockly.Arduino.my_board_type=="ESP32") || (Blockly.Arduino.my_board_type=="7697")|| (Blockly.Arduino.my_board_type=="Arduino")){
    Blockly.Arduino.definitions_.define_m_button=pinStr+"char myBtnStatus;\nbool buttonPressed(char btnName)\n{\n  if (btnName=='A'){\n    if (digitalRead(A_Pin) == 1)\n      return false;\n    else\n      return true;\n  }\n  else if (btnName=='B'){\n    if (digitalRead(B_Pin) == 1)\n      return false;\n    else\n      return true;\n  } else {\n    if ((digitalRead(A_Pin) == 1) && (digitalRead(B_Pin) == 1))\n      return false;\n    else\n      return true;\n  }\n}\n"
    Blockly.Arduino.definitions_.define_m_getBtnStatus="char getBtnStatus(){\n  char buttonStatus=' ';\n  int checkButtonDelay=200;\n  if (buttonPressed('A')){\n    delay(checkButtonDelay);\n    if (buttonPressed('A')){\n      buttonStatus='A';\n      if (buttonPressed('B'))\n        buttonStatus='C';\n    }\n  } else if (buttonPressed('B')){\n      delay(checkButtonDelay);\n      if (buttonPressed('B')){\n        buttonStatus='B';\n        if (buttonPressed('A'))\n          buttonStatus='C';\n      }\n  }\n  return buttonStatus;\n}\n";
    Blockly.Arduino.setups_.setup_button='pinMode(A_Pin, INPUT);\n  pinMode(B_Pin, INPUT);';
    if (Blockly.Arduino.my_board_type=="Arduino")
      Blockly.Arduino.setups_.setup_button='pinMode(A_Pin, INPUT_PULLUP);\n  pinMode(B_Pin, INPUT_PULLUP);';
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
  } else if (Blockly.Arduino.my_board_type=="Arduino"){
     if (a=="vr")
       pin="A1"
     else if (a=="phr")
       pin="A0";
     Blockly.Arduino.setups_["setup_"+a+"_"]="pinMode("+pin+", INPUT);";
     return["analogRead("+pin+")",Blockly.Arduino.ORDER_ATOMIC];
  } else {
    return["",Blockly.Arduino.ORDER_ATOMIC];
  }
};

Blockly.Arduino.startPlus_dht11=function(){
  var a=this.getFieldValue("DHT"),
      pin="",
      checkOK=false;
  if (Blockly.Arduino.my_board_type=="ESP32"){
     pin="15";
     checkOK=true;
  } else if ((Blockly.Arduino.my_board_type=="7697") || (Blockly.Arduino.my_board_type=="Arduino")){
     pin="10";
     checkOK=true;
  }
  if (checkOK){
    if (Blockly.Arduino.my_board_type=="Arduino" || Blockly.Arduino.my_board_type=="Pico")
      Blockly.Arduino.definitions_['define_dht_']="#include <DHT_mini.h>";
    else
      Blockly.Arduino.definitions_['define_dht_']="#include <DHT.h>";
    Blockly.Arduino.definitions_['define_dht_set']="DHT dht11_p"+pin+"("+pin+", DHT11);";
    Blockly.Arduino.setups_["setup_dht_"]="dht11_p"+pin+".begin();";
    return["dht11_p"+pin+"."+a+"()",Blockly.Arduino.ORDER_ATOMIC];
  } else {
    return["",Blockly.Arduino.ORDER_ATOMIC];
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
  } else if (Blockly.Arduino.my_board_type=="Arduino"){
    pin="8";
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
  } else if ((Blockly.Arduino.my_board_type=="7697")||(Blockly.Arduino.my_board_type=="Arduino")){
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
  } else if ((Blockly.Arduino.my_board_type=="7697")||(Blockly.Arduino.my_board_type=="Arduino")){
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
    return"noTone(buzz_pin,buzz_ch);\ntone(buzz_pin,"+a+",0,buzz_ch);\n";
  } else if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=14;";
    return"tone(buzz_pin, "+a+");\n";
  } else if (Blockly.Arduino.my_board_type=="Arduino"){
    Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=3;";
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
  } else if (Blockly.Arduino.my_board_type=="Arduino"){
    Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=3;\n";
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
  } else if (Blockly.Arduino.my_board_type=="Arduino"){
    Blockly.Arduino.definitions_.define_start_plus_tone_invoke="byte buzz_pin=3;";
    return"tone(buzz_pin, "+a+");\ndelay("+b+");\nnoTone(buzz_pin);\n";
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
  } else if (Blockly.Arduino.my_board_type=="Arduino"){
	  Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>";
    Blockly.Arduino.definitions_.define_plus_neopixel='Adafruit_NeoPixel plusPixels = Adafruit_NeoPixel(3,9,NEO_GRB + NEO_KHZ800);\n';
    Blockly.Arduino.setups_.setup_plus_neopixel="plusPixels.begin();\n  plusPixels.setBrightness("+a+");\n  plusPixels.show();\n  plusPixels.setPixelColor(0,plusPixels.Color(0,0,0));\n  plusPixels.setPixelColor(1,plusPixels.Color(0,0,0));\n  plusPixels.setPixelColor(2,plusPixels.Color(0,0,0));\n  plusPixels.show();"; 
  }
  return"";
};

Blockly.Arduino.startPlus_neopixel_set_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"INDEX",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  b=b.replace("tft.color565","plusPixels.Color");
  if ((Blockly.Arduino.my_board_type=="ESP32")||(Blockly.Arduino.my_board_type=="7697")||(Blockly.Arduino.my_board_type=="Arduino")){
    return"plusPixels.setPixelColor("+a+","+b+");\n";
  } else {
    return"";
  }
};

Blockly.Arduino.startPlus_neopixel_show=function(){
  if ((Blockly.Arduino.my_board_type=="ESP32")||(Blockly.Arduino.my_board_type=="7697")||(Blockly.Arduino.my_board_type=="Arduino")){
    return"plusPixels.show();\n";
  } else {
    return"";
  }
};

Blockly.Arduino.startPlus_neopixel_set_colors=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace("tft.color565","plusPixels.Color");
  if ((Blockly.Arduino.my_board_type=="ESP32")||(Blockly.Arduino.my_board_type=="7697")||(Blockly.Arduino.my_board_type=="Arduino")){
    return"plusPixels.setPixelColor(0,"+a+");\nplusPixels.setPixelColor(1,"+a+");\nplusPixels.setPixelColor(2,"+a+");\nplusPixels.show();\n";
  } else {
    return"";
  }
};

Blockly.Arduino.startPlus_ir_receive=function(){
  var a="";
  if ((Blockly.Arduino.my_board_type=="ESP32")||(Blockly.Arduino.my_board_type=="7697")||(Blockly.Arduino.my_board_type=="Arduino")){
    if (Blockly.Arduino.my_board_type=="ESP32"){
      a="33";
    } else if (Blockly.Arduino.my_board_type=="7697"){
      a="17";
    } else if (Blockly.Arduino.my_board_type=="Arduino"){
      a="2";
    }
    if (Blockly.Arduino.my_board_type=="7697"){
      Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.h>";
      Blockly.Arduino.definitions_.ljj_define_irremote_init="IRrecv IrReceiver("+a+");";
      Blockly.Arduino.definitions_.define_irremote_decode="decode_results results;\nString myCodeType;\nString myIRcode;";
      Blockly.Arduino.definitions_.define_irremote_ir_type_event='String ir_type(int tip)\n{\n  if (tip == 1){\n    return "RC5";\n  } else if (tip == 2){\n    return "RC6";\n  } else if (tip == 3){\n    return "NEC";\n  } else if (tip == 4){\n    return "SONY";\n  } else if (tip == 5){\n    return "PANASONIC";\n  } else if (tip == 6){\n    return "JVC";\n  } else if (tip == 7){\n    return "SAMSUNG";\n  } else if (tip == 10){\n    return "LG";\n  } else if (tip == 14){\n    return "SHARP";\n  } else if (tip == 17){\n    return "LEGO_PF";\n  } else {\n    return "UNKNOWN";\n  }\n}\n';
      Blockly.Arduino.setups_["ljj_irremote_"]||(Blockly.Arduino.setups_["ljj_irremote_"]="IrReceiver.enableIRIn();\n");
    } else {
      Blockly.Arduino.definitions_.ljj_define_irremote_include="#include <IRremote.hpp>";
      Blockly.Arduino.definitions_.ljj_define_irremote_decode="#define MY_IR_RECEIVE_PIN "+a+"\ndecode_results results;\nString myCodeType;\nString myIRcode;";
      Blockly.Arduino.definitions_.ljj_define_irremote_ir_type_event='String ir_type(int tip)\n{\n  if (tip == 14){\n    return "RC5";\n  } else if (tip == 15){\n    return "RC6";\n  } else if (tip == 7){\n    return "NEC";\n  } else if (tip == 18){\n    return "SONY";\n  } else if (tip == 8){\n    return "PANASONIC";\n  } else if (tip == 4){\n    return "JVC";\n  } else if (tip == 16){\n    return "SAMSUNG";\n  } else if (tip == 5){\n    return "LG";\n  } else if (tip == 3){\n    return "SHARP";\n  } else if (tip == 22){\n    return "LEGO_PF";\n  } else {\n    return String(tip);\n  }\n}\n';
      Blockly.Arduino.setups_["ljj_irremote_"]||(Blockly.Arduino.setups_["ljj_irremote_"]="IrReceiver.begin(MY_IR_RECEIVE_PIN);\n");
    }
  }
  return'';
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
    if ((arduinoCore_ESP32) || (Blockly.Arduino.my_board_type=="ESP8266") || (Blockly.Arduino.my_board_type=="Pico"))
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

//CCS811
Blockly.Arduino.ccs811={};
Blockly.Arduino.ccs811_init=function(){
  Blockly.Arduino.definitions_.define_ccs811="#include \"SparkFunCCS811.h\"";
  Blockly.Arduino.definitions_.define_ccs811_invoke='CCS811 myCCS811(0x5B);';
  return'myCCS811.begin();\n'
}

Blockly.Arduino.ccs811_freq=function(){
  var a=this.getFieldValue("FREQ");
  return'myCCS811.setDriveMode('+a+');\n';
}

Blockly.Arduino.ccs811_update=function(){
  return'myCCS811.readAlgorithmResults();\n';
}

Blockly.Arduino.ccs811_check=function(){
  return['myCCS811.dataAvailable()',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ccs811_getData=function(){
  var a=this.getFieldValue("DATA_TYPE");
  return['myCCS811.get'+a+'()',Blockly.Arduino.ORDER_ATOMIC];
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
  return['(myNFC_UID!="")',Blockly.Arduino.ORDER_ATOMIC];
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

//pinMap
Blockly.Arduino.pinMap_7697ext=function(){
  var a=this.getFieldValue("PIN");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

//I2S MIC
Blockly.Arduino.i2s_mic={};
Blockly.Arduino.i2sMic_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"SCK_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"WS_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"SD_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_i2sMic_include="#include <driver/i2s.h>\n#include \"SPIFFS.h\"\n#include <SD.h>";
    Blockly.Arduino.definitions_.define_i2sMic_invoke='#define MIC_SCK '+a+'\n#define MIC_WS '+b+'\n#define MIC_SD '+c+'\n#define I2S_MIC_PORT I2S_NUM_1\n#define RECORD_TIME (recTime)\n#define MIC_SAMPLE_RATE     (16000)\n#define MIC_SAMPLE_BITS     (16)\n#define MIC_READ_LEN        (3 * 1024)\n#define MIC_CHANNEL_NUM     (1)\n#define FLASH_RECORD_SIZE   (MIC_CHANNEL_NUM * MIC_SAMPLE_RATE * MIC_SAMPLE_BITS / 8 * RECORD_TIME)\nint recTime=5;\nFile wavFile;\nconst int headerSize = 44;\n';
    Blockly.Arduino.definitions_.define_SD_CS_invoke='int pinCS=SS;';
    Blockly.Arduino.definitions_.define_i2sMic_event='void i2sMicInit(){\n  i2s_config_t i2s_config = {\n    .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),\n    .sample_rate = MIC_SAMPLE_RATE,\n    .bits_per_sample = i2s_bits_per_sample_t(MIC_SAMPLE_BITS),\n    .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,\n    .communication_format = i2s_comm_format_t(I2S_COMM_FORMAT_I2S | I2S_COMM_FORMAT_I2S_MSB),\n    .intr_alloc_flags = 0,\n    .dma_buf_count = 64,\n    .dma_buf_len = 1024,\n    .use_apll = 1\n  };\n  i2s_driver_install(I2S_MIC_PORT, &i2s_config, 0, NULL);\n  const i2s_pin_config_t pin_config = {\n    .bck_io_num = MIC_SCK,\n    .ws_io_num = MIC_WS,\n    .data_out_num = -1,\n    .data_in_num = MIC_SD\n  };\n  i2s_set_pin(I2S_MIC_PORT, &pin_config);\n}\n';
  }
  return'';
}

Blockly.Arduino.PocketCard_i2sMic_init=function(){
  var a=2,
      b=13,
      c=15;
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_i2sMic_include="#include <driver/i2s.h>\n#include \"SPIFFS.h\"\n#include <SD.h>";
    Blockly.Arduino.definitions_.define_i2sMic_invoke='#define MIC_SCK '+a+'\n#define MIC_WS '+b+'\n#define MIC_SD '+c+'\n#define I2S_MIC_PORT I2S_NUM_1\n#define RECORD_TIME (recTime)\n#define MIC_SAMPLE_RATE     (16000)\n#define MIC_SAMPLE_BITS     (16)\n#define MIC_READ_LEN        (3 * 1024)\n#define MIC_CHANNEL_NUM     (1)\n#define FLASH_RECORD_SIZE   (MIC_CHANNEL_NUM * MIC_SAMPLE_RATE * MIC_SAMPLE_BITS / 8 * RECORD_TIME)\nint recTime=5;\nFile wavFile;\nconst int headerSize = 44;\n';
    Blockly.Arduino.definitions_.define_SD_CS_invoke='int pinCS=SS;';
    Blockly.Arduino.definitions_.define_i2sMic_event='void i2sMicInit(){\n  i2s_config_t i2s_config = {\n    .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),\n    .sample_rate = MIC_SAMPLE_RATE,\n    .bits_per_sample = i2s_bits_per_sample_t(MIC_SAMPLE_BITS),\n    .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,\n    .communication_format = i2s_comm_format_t(I2S_COMM_FORMAT_I2S | I2S_COMM_FORMAT_I2S_MSB),\n    .intr_alloc_flags = 0,\n    .dma_buf_count = 64,\n    .dma_buf_len = 1024,\n    .use_apll = 1\n  };\n  i2s_driver_install(I2S_MIC_PORT, &i2s_config, 0, NULL);\n  const i2s_pin_config_t pin_config = {\n    .bck_io_num = MIC_SCK,\n    .ws_io_num = MIC_WS,\n    .data_out_num = -1,\n    .data_in_num = MIC_SD\n  };\n  i2s_set_pin(I2S_MIC_PORT, &pin_config);\n}\n';
  }
  return'pinCS='+4+';\n';
}

Blockly.Arduino.i2sMic_start=function(){
  if (Blockly.Arduino.my_board_type=="ESP32")
    return'i2sMicInit();\n';
  else
    return'';
}

Blockly.Arduino.i2sMic_stop=function(){
  if (Blockly.Arduino.my_board_type=="ESP32")
    return'i2s_driver_uninstall(I2S_MIC_PORT);\n';
  else
    return'';
}

Blockly.Arduino.i2sMic_record=function(){
  var a=Blockly.Arduino.valueToCode(this,"FILENAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"REC_TIME",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=this.getFieldValue("F_TARGET");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_i2sMic_tool_event='void i2s_adc_data_scale(uint8_t * d_buff, uint8_t* s_buff, uint32_t len){\n  uint32_t j = 0;\n  uint32_t dac_value = 0;\n  for (int i = 0; i < len; i += 2) {\n    dac_value = ((((uint16_t) (s_buff[i + 1] & 0xf) << 8) | ((s_buff[i + 0]))));\n    d_buff[j++] = 0;\n    d_buff[j++] = dac_value * 256 / 2048;\n  }\n}\n\nvoid wavHeader(byte* header, int wavSize){\n  header[0] = \'R\';\n  header[1] = \'I\';\n  header[2] = \'F\';\n  header[3] = \'F\';\n  unsigned int fileSize = wavSize + headerSize - 8;\n  header[4] = (byte)(fileSize & 0xFF);\n  header[6] = (byte)((fileSize >> 16) & 0xFF);\n  header[7] = (byte)((fileSize >> 24) & 0xFF);\n  header[8] = \'W\';\n  header[9] = \'A\';\n  header[10] = \'V\';\n  header[11] = \'E\';\n  header[12] = \'f\';\n  header[13] = \'m\';\n  header[14] = \'t\';\n  header[15] = \' \';\n  header[16] = 0x10;\n  header[17] = 0x00;\n  header[18] = 0x00;\n  header[19] = 0x00;\n  header[20] = 0x01;\n  header[21] = 0x00;\n  header[22] = 0x01;\n  header[23] = 0x00;\n  header[24] = 0x80;\n  header[25] = 0x3E;\n  header[26] = 0x00;\n  header[27] = 0x00;\n  header[28] = 0x00;\n  header[29] = 0x7D;\n  header[30] = 0x00;\n  header[31] = 0x00;\n  header[32] = 0x02;\n  header[33] = 0x00;\n  header[34] = 0x10;\n  header[35] = 0x00;\n  header[36] = \'d\';\n  header[37] = \'a\';\n  header[38] = \'t\';\n  header[39] = \'a\';\n  header[40] = (byte)(wavSize & 0xFF);\n  header[41] = (byte)((wavSize >> 8) & 0xFF);\n  header[42] = (byte)((wavSize >> 16) & 0xFF);\n  header[43] = (byte)((wavSize >> 24) & 0xFF);\n}\n';
    Blockly.Arduino.definitions_.define_i2sMic_rec_event='void i2sMic_adc_toFile(){\n  int i2s_read_len = MIC_READ_LEN;\n  int flash_wr_size = 0;\n  size_t bytes_read;\n  char* i2s_read_buff = (char*) calloc(i2s_read_len, sizeof(char));\n  uint8_t* flash_write_buff = (uint8_t*) calloc(i2s_read_len, sizeof(char));\n  i2s_read(I2S_MIC_PORT, (void*) i2s_read_buff, i2s_read_len, &bytes_read, portMAX_DELAY);\n  i2s_read(I2S_MIC_PORT, (void*) i2s_read_buff, i2s_read_len, &bytes_read, portMAX_DELAY);\n  while (flash_wr_size < FLASH_RECORD_SIZE) {\n    i2s_read(I2S_MIC_PORT, (void*) i2s_read_buff, i2s_read_len, &bytes_read, portMAX_DELAY);\n    i2s_adc_data_scale(flash_write_buff, (uint8_t*)i2s_read_buff, i2s_read_len);\n    wavFile.write((const byte*) flash_write_buff, i2s_read_len);\n    flash_wr_size += i2s_read_len;\n  };\n  free(i2s_read_buff);\n  i2s_read_buff = NULL;\n  free(flash_write_buff);\n  flash_write_buff = NULL;\n}\n\nvoid saveWave(byte mediaType,String fileName) {\n  i2sMicInit();\n  if (mediaType==1){\n    if(!SD.begin(pinCS))\n      return;\n    wavFile = SD.open(fileName.c_str(), "w");\n  } else if (mediaType==2){\n    if(!SPIFFS.begin(true))\n      return;\n    wavFile = SPIFFS.open(fileName.c_str(), "w");\n  }\n  if (!wavFile)\n    return;\n  byte header[headerSize];\n  wavHeader(header, FLASH_RECORD_SIZE);\n  wavFile.write(header, headerSize);\n  i2sMic_adc_toFile();\n  wavFile.close();\n  i2s_driver_uninstall(I2S_MIC_PORT);\n  if (mediaType==1){\n    SD.end();\n  } else if (mediaType==2){\n    SPIFFS.end();\n  }\n}\n';
    return'recTime='+b+';\nsaveWave('+c+','+a+');\n';
  } else {
    return'';
  }
}

Blockly.Arduino.i2sMic_STT_Azure=function(){
  var a=Blockly.Arduino.valueToCode(this,"FILENAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"L_CODE",Blockly.Arduino.ORDER_ATOMIC)||"",
//      b=this.getFieldValue("L_CODE"),
      c=Blockly.Arduino.valueToCode(this,"KEY",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=this.getFieldValue("F_TARGET"),
      e=this.getFieldValue("PUNCTUATION");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_i2sMic_RecgText_invoke='String myRecgText="";';
    Blockly.Arduino.definitions_.define_i2sMic_Azure_RecgText_event='void uploadWavFileAzure(String fileName,String lang_code,String api_key,int mediaType,bool punctuation){\n  File myWavFile;\n  if (mediaType==1){\n    if(!SD.begin(pinCS)){\n      myRecgText="SD error";\n      return;\n    }\n    myWavFile = SD.open(fileName.c_str(), FILE_READ);\n  } else if (mediaType==2){\n    if(!SPIFFS.begin(true)){\n      myRecgText="SPIFFS error";\n      return;\n    }\n    myWavFile = SPIFFS.open(fileName.c_str(), FILE_READ);\n  }\n  if(!myWavFile){\n    myRecgText="file error";\n    return;\n  }\n  myRecgText="error";\n  static WiFiClientSecure sttClient;\n  const char* host="eastasia.stt.speech.microsoft.com";\n  String url="/speech/recognition/conversation/cognitiveservices/v1?language="+lang_code+"&format=detailed";\n  sttClient.connect(host, 443);\n  while(!sttClient.connected());\n  sttClient.println("POST " + url + " HTTP/1.1\\r\\nHost: " + String(host)+ "\\r\\nOcp-Apim-Subscription-Key: "+api_key+"\\r\\nContent-Type: audio/wav\\r\\nContent-Length: " + String(myWavFile.size()));\n  sttClient.println();\n  while(myWavFile.available() && sttClient.connected()) {\n    int nextPacketSize = myWavFile.available();\n    if (nextPacketSize > 512) {\n      nextPacketSize = 512;\n    }\n    uint8_t buffer[nextPacketSize] = { 0 };\n    for(int i=0;i<nextPacketSize;i++) {\n      buffer[i]=myWavFile.read();\n    }\n    sttClient.write(buffer,nextPacketSize);\n  }\n  myWavFile.close();\n  while (!sttClient.available());\n  String resStr="";\n  while (sttClient.available()){\n    resStr=sttClient.readStringUntil(\'\\n\');\n    if (resStr.startsWith("{\\"RecognitionStatus")){\n      if (punctuation){\n        resStr.replace(resStr.substring(0,resStr.indexOf("Display")+10),"");\n        resStr=resStr.substring(0,resStr.indexOf("\\""));\n      } else {\n        resStr.replace(resStr.substring(0,resStr.indexOf("MaskedITN")+12),"");\n        resStr=resStr.substring(0,resStr.indexOf("\\",\\""));\n      }\n      myRecgText=resStr;\n      myRecgText.trim();\n      break;\n    }\n  }\n  sttClient.stop();\n  if (mediaType==1){\n    SD.end();\n  } else if (mediaType==2){\n    SPIFFS.end();\n  }\n}\n';
    if (arduinoCore_ESP32)
      Blockly.Arduino.definitions_.define_i2sMic_Azure_RecgText_event=Blockly.Arduino.definitions_.define_i2sMic_Azure_RecgText_event.replace(" sttClient;\n"," sttClient;\n  sttClient.setInsecure();\n");
    return'uploadWavFileAzure('+a+','+b+','+c+','+d+','+e+');\n';
  } else {
    return'';
  }
}

Blockly.Arduino.i2sMic_STT_Azure_direct=function(){
  var a=Blockly.Arduino.valueToCode(this,"L_CODE",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"KEY",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=this.getFieldValue("PUNCTUATION"),
      d=Blockly.Arduino.valueToCode(this,"REC_TIME",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_i2sMic_RecgText_invoke='String myRecgText="";';
    Blockly.Arduino.definitions_.define_i2sMic_direct_load_event='void i2sMicAzureInit(){\n  i2s_config_t i2s_config = {\n    .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),\n    .sample_rate = MIC_SAMPLE_RATE,\n    .bits_per_sample = i2s_bits_per_sample_t(MIC_SAMPLE_BITS),\n    .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,\n    .communication_format = i2s_comm_format_t(I2S_COMM_FORMAT_I2S | I2S_COMM_FORMAT_I2S_MSB),\n    .intr_alloc_flags = 0,\n    .dma_buf_count = 64,\n    .dma_buf_len = 512,\n    .use_apll = 1\n  };\n  i2s_driver_install(I2S_MIC_PORT, &i2s_config, 0, NULL);\n  const i2s_pin_config_t pin_config = {\n    .bck_io_num = MIC_SCK,\n    .ws_io_num = MIC_WS,\n    .data_out_num = -1,\n    .data_in_num = MIC_SD\n  };\n  i2s_set_pin(I2S_MIC_PORT, &pin_config);\n}\n';
    Blockly.Arduino.definitions_.define_i2sMic_tool_event='void i2s_adc_data_scale(uint8_t * d_buff, uint8_t* s_buff, uint32_t len){\n  uint32_t j = 0;\n  uint32_t dac_value = 0;\n  for (int i = 0; i < len; i += 2) {\n    dac_value = ((((uint16_t) (s_buff[i + 1] & 0xf) << 8) | ((s_buff[i + 0]))));\n    d_buff[j++] = 0;\n    d_buff[j++] = dac_value * 256 / 2048;\n  }\n}\n\nvoid wavHeader(byte* header, int wavSize){\n  header[0] = \'R\';\n  header[1] = \'I\';\n  header[2] = \'F\';\n  header[3] = \'F\';\n  unsigned int fileSize = wavSize + headerSize - 8;\n  header[4] = (byte)(fileSize & 0xFF);\n  header[6] = (byte)((fileSize >> 16) & 0xFF);\n  header[7] = (byte)((fileSize >> 24) & 0xFF);\n  header[8] = \'W\';\n  header[9] = \'A\';\n  header[10] = \'V\';\n  header[11] = \'E\';\n  header[12] = \'f\';\n  header[13] = \'m\';\n  header[14] = \'t\';\n  header[15] = \' \';\n  header[16] = 0x10;\n  header[17] = 0x00;\n  header[18] = 0x00;\n  header[19] = 0x00;\n  header[20] = 0x01;\n  header[21] = 0x00;\n  header[22] = 0x01;\n  header[23] = 0x00;\n  header[24] = 0x80;\n  header[25] = 0x3E;\n  header[26] = 0x00;\n  header[27] = 0x00;\n  header[28] = 0x00;\n  header[29] = 0x7D;\n  header[30] = 0x00;\n  header[31] = 0x00;\n  header[32] = 0x02;\n  header[33] = 0x00;\n  header[34] = 0x10;\n  header[35] = 0x00;\n  header[36] = \'d\';\n  header[37] = \'a\';\n  header[38] = \'t\';\n  header[39] = \'a\';\n  header[40] = (byte)(wavSize & 0xFF);\n  header[41] = (byte)((wavSize >> 8) & 0xFF);\n  header[42] = (byte)((wavSize >> 16) & 0xFF);\n  header[43] = (byte)((wavSize >> 24) & 0xFF);\n}\n';
    Blockly.Arduino.definitions_.define_i2sMic_Azure_RecgText_DIRECT_event='void i2sMic_adc_to_HTTPS(WiFiClientSecure *myHttpsClient){\n  byte header[headerSize];\n  wavHeader(header, FLASH_RECORD_SIZE);\n  myHttpsClient->write(header, headerSize);\n  int i2s_read_len = MIC_READ_LEN;\n  int flash_wr_size = 0;\n  size_t bytes_read;\n  char* i2s_read_buff = (char*) calloc(i2s_read_len, sizeof(char));\n  uint8_t* flash_write_buff = (uint8_t*) calloc(i2s_read_len, sizeof(char));\n  i2s_read(I2S_MIC_PORT, (void*) i2s_read_buff, i2s_read_len, &bytes_read, portMAX_DELAY);\n  i2s_read(I2S_MIC_PORT, (void*) i2s_read_buff, i2s_read_len, &bytes_read, portMAX_DELAY);\n  while (flash_wr_size < FLASH_RECORD_SIZE) {\n    i2s_read(I2S_MIC_PORT, (void*) i2s_read_buff, i2s_read_len, &bytes_read, portMAX_DELAY);\n    i2s_adc_data_scale(flash_write_buff, (uint8_t*)i2s_read_buff, i2s_read_len);\n    myHttpsClient->write((const byte*) flash_write_buff, i2s_read_len);\n    flash_wr_size += i2s_read_len;\n  };\n  free(i2s_read_buff);\n  i2s_read_buff = NULL;\n  free(flash_write_buff);\n  flash_write_buff = NULL;\n}\n\nvoid directUploadAzure(String lang_code,String api_key,bool punctuation){\n  i2sMicAzureInit();\n  myRecgText="error";\n  static WiFiClientSecure sttClient;\n  const char* host="eastasia.stt.speech.microsoft.com";\n  String url="/speech/recognition/conversation/cognitiveservices/v1?language="+lang_code+"&format=detailed";\n  sttClient.connect(host, 443);\n  while(!sttClient.connected());\n  sttClient.println("POST " + url + " HTTP/1.1\\r\\nHost: " + String(host)+ "\\r\\nOcp-Apim-Subscription-Key: "+api_key+"\\r\\nContent-Type: audio/wav\\r\\nContent-Length: " + String(FLASH_RECORD_SIZE +headerSize-8));\n  sttClient.println();\n  if (sttClient.connected())\n     i2sMic_adc_to_HTTPS(&sttClient);\n  while (!sttClient.available());\n  String resStr="";\n  while (sttClient.available()){\n    resStr=sttClient.readStringUntil(\'\\n\');\n    if (resStr.startsWith("{\\"RecognitionStatus")){\n      if (punctuation){\n        resStr.replace(resStr.substring(0,resStr.indexOf("Display")+10),"");\n        resStr=resStr.substring(0,resStr.indexOf("\\""));\n      } else {\n        resStr.replace(resStr.substring(0,resStr.indexOf("MaskedITN")+12),"");\n        resStr=resStr.substring(0,resStr.indexOf("\\",\\""));\n      }\n      myRecgText=resStr;\n      myRecgText.trim();\n      break;\n    }\n  }\n  sttClient.stop();\n  i2s_driver_uninstall(I2S_MIC_PORT);\n}\n';
    if (arduinoCore_ESP32)
      Blockly.Arduino.definitions_.define_i2sMic_Azure_RecgText_DIRECT_event=Blockly.Arduino.definitions_.define_i2sMic_Azure_RecgText_DIRECT_event.replace(" sttClient;\n"," sttClient;\n  sttClient.setInsecure();\n");
    return'recTime='+d+';\ndirectUploadAzure('+a+','+b+','+c+');\n';
  } else {
    return'';
  }
}

Blockly.Arduino.i2sMic_STT=function(){
  var a=Blockly.Arduino.valueToCode(this,"FILENAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"L_CODE",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"KEY",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=this.getFieldValue("F_TARGET");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_secure_include="#include <WiFiClientSecure.h>";
    Blockly.Arduino.definitions_.define_base64Mic_include="#include \"Base64_tool.h\"";
    Blockly.Arduino.definitions_.define_i2sMic_RecgText_invoke='String myRecgText="";';
    Blockly.Arduino.definitions_.define_i2sMic_RecgText_event='void uploadWavFile(String fileName,String lang_code,String api_key,int mediaType){\n  File myWavFile;\n  if (mediaType==1){\n    if(!SD.begin(pinCS)){\n      myRecgText="SD error";\n      return;\n    }\n    myWavFile = SD.open(fileName.c_str(), FILE_READ);\n  } else if (mediaType==2){\n    if(!SPIFFS.begin(true)){\n      myRecgText="SPIFFS error";\n      return;\n    }\n    myWavFile = SPIFFS.open(fileName.c_str(), FILE_READ);\n  }\n  if(!myWavFile){\n    myRecgText="file error";\n    return;\n  }\n  String wavString = "";\n  uint8_t *fileinput;\n  unsigned int fileSize = myWavFile.size();\n  unsigned int extendSize = 0;\n  unsigned int encodeSize = 0;\n  if ((fileSize%3)!=0)\n    extendSize=fileSize+(3-(fileSize % 3));\n  else\n    extendSize=fileSize;\n  encodeSize=extendSize/3*4;\n  String fixStr=String("")+"{\\"config\\":{\\"encoding\\":\\"LINEAR16\\",\\"sampleRateHertz\\":16000,\\"languageCode\\":\\""+lang_code+"\\"},\\"audio\\":{\\"content\\":\\"";\n  String postStr="\\"}}";\n  myRecgText="error";\n  static WiFiClientSecure sttClient;\n  const char* host="speech.googleapis.com";\n  String url="/v1/speech:recognize?key="+api_key;\n  sttClient.connect(host, 443);\n  while(!sttClient.connected());\n  sttClient.println("POST " + url + " HTTP/1.1");\n  sttClient.println("Host: " + String(host));\n  sttClient.println("Content-Type: application/json");\n  sttClient.println("Content-Length: " + String(fixStr.length()+postStr.length()+encodeSize));\n  sttClient.println();\n  sttClient.print(fixStr);\n  char input[3] ={\'\\0\'};\n  char output[base64_enc_len(3)];\n  for (int i = 0; i < extendSize; i+=3) {\n    for(int j=0;j<3;j++){\n      if (myWavFile.available())\n        input[j]=myWavFile.read();\n      else\n        input[j]=\'\\0\';\n    }\n    base64_encode(output, input, 3);\n    wavString+=String(output);\n    if ((i%3000)==0){\n      sttClient.print(wavString);\n      wavString="";\n    }\n  }\n  if (wavString.length()>0)\n    sttClient.print(wavString);\n  sttClient.print(postStr);\n  myWavFile.close();\n  while (!sttClient.available());\n  String resStr="";\n  while (sttClient.available()){\n    resStr=sttClient.readStringUntil(\'\\n\');\n    if (resStr.indexOf("transcript")>0){\n      resStr.replace(" ","");\n      resStr.replace("\\"transcript\\":","");\n      resStr.replace("\\"","");\n      resStr.replace(",","");\n      resStr.replace("\\r","");\n      myRecgText=resStr;\n      myRecgText.trim();\n      break;\n    }\n  }\n  sttClient.stop();\n  if (mediaType==1){\n    SD.end();\n  } else if (mediaType==2){\n    SPIFFS.end();\n  }\n}\n';
    if (arduinoCore_ESP32)
      Blockly.Arduino.definitions_.define_i2sMic_RecgText_event=Blockly.Arduino.definitions_.define_i2sMic_RecgText_event.replace(" sttClient;\n"," sttClient;\n  sttClient.setInsecure();\n");
    return'uploadWavFile('+a+','+b+','+c+','+d+');\n';
  } else {
    return'';
  }
}

Blockly.Arduino.i2sMic_STT_result=function(){
  if (Blockly.Arduino.my_board_type=="ESP32"){
    return['myRecgText',Blockly.Arduino.ORDER_ATOMIC];
  } else {
    return['""',Blockly.Arduino.ORDER_ATOMIC];
  }
}

//I2S DB Meter
Blockly.Arduino.i2s_mic_db={};
Blockly.Arduino.i2sMic_db_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"SCK_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"WS_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"SD_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      d=this.getFieldValue("MODEL");
      e='';
  if (d=='None')
    e='0.0';
  else
    e='3.0103';
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_i2sMic_db_include="#include <driver/i2s.h>\n#include \"sos-iir-filter.h\"";
    Blockly.Arduino.definitions_.define_i2sMic_db_pin_invoke='#define I2S_DB_SCK '+a+'\n#define I2S_DB_WS '+b+'\n#define I2S_DB_SD '+c+'\n#define I2S_DB_PORT I2S_NUM_1'
    Blockly.Arduino.definitions_.define_i2sMic_db_model_invoke='#define MIC_EQUALIZER '+d+'\n#define MIC_OFFSET_DB '+e;
    Blockly.Arduino.definitions_.define_i2sMic_db_other1_invoke='#define LEQ_PERIOD myDBperiod\n#define WEIGHTING C_weighting\n#define LEQ_UNITS \"LAeq\"\n#define DB_UNITS \"dBA\"\n#define MIC_SENSITIVITY -26\n#define MIC_REF_DB 94.0\n#define MIC_OVERLOAD_DB 116.0\n#define MIC_NOISE_DB 29\n#define MIC_BITS 24\n#define MIC_CONVERT(s) (s >> (DB_SAMPLE_BITS - MIC_BITS))\n#define DB_SAMPLE_RATE 48000\n#define DB_SAMPLE_BITS 32\n#define DB_SAMPLE_T int32_t\n#define DB_SAMPLES_SHORT (DB_SAMPLE_RATE / 8)\n#define DB_SAMPLES_LEQ (DB_SAMPLE_RATE * LEQ_PERIOD)\n#define DMA_BANK_SIZE (DB_SAMPLES_SHORT / 16)\n#define DMA_BANKS 32\n#define DB_I2S_TASK_PRI 4\n#define DB_I2S_TASK_STACK 2048';
    Blockly.Arduino.definitions_.define_i2sMic_db_other2_invoke='constexpr double MIC_REF_AMPL = pow(10, double(MIC_SENSITIVITY)/20) * ((1<<(MIC_BITS-1))-1);\nfloat samples[DB_SAMPLES_SHORT] __attribute__((aligned(4)));\nTaskHandle_t mic_dba_task;\nfloat myDBperiod=1;\nbool dbTaskCreated=false;\ndouble dbMeter=0.0;\n\nSOS_IIR_Filter DC_BLOCKER = {\n  gain: 1.0,\n  sos: {{-1.0, 0.0, +0.9992, 0}}\n};\n\nSOS_IIR_Filter ICS43434 = {\n  gain: 0.477326418836803,\n  sos: {\n   {+0.96986791463971267, 0.23515976355743193, -0.06681948004769928, -0.00111521990688128},\n   {-1.98905931743624453, 0.98908924206960169, +1.99755331853906037, -0.99755481510122113}\n  }\n};\n\nSOS_IIR_Filter ICS43432 = {\n  gain: -0.457337023383413,\n  sos: {\n    {-0.544047931916859, -0.248361759321800, +0.403298891662298, -0.207346186351843},\n    {-1.909911869441421, +0.910830292683527, +1.790285722826743, -0.804085812369134},\n    {+0.000000000000000, +0.000000000000000, +1.148493493802252, -0.150599527756651}\n  }\n};\n\nSOS_IIR_Filter INMP441 = {\n  gain: 1.00197834654696,\n  sos: {\n    {-1.986920458344451, +0.986963226946616, +1.995178510504166, -0.995184322194091}\n  }\n};\n\nSOS_IIR_Filter IM69D130 = {\n  gain: 1.00124068496753,\n  sos: {\n    {-1.0, 0.0, +0.9992, 0},\n    {-1.994461610298131, 0.994469278738208, +1.997675693595542, -0.997677044195563}\n  }\n};\n\nSOS_IIR_Filter SPH0645LM4H_B_RB = {\n  gain: 1.00123377961525,\n  sos: {\n    {-1.0, 0.0, +0.9992, 0},\n    {-1.988897663539382, +0.988928479008099, +1.993853376183491, -0.993862821429572}\n  }\n};\n\nSOS_IIR_Filter A_weighting = {\n  gain: 0.169994948147430,\n  sos: {\n    {-2.00026996133106, +1.00027056142719, -1.060868438509278, -0.163987445885926},\n    {+4.35912384203144, +3.09120265783884, +1.208419926363593, -0.273166998428332},\n    {-0.70930303489759, -0.29071868393580, +1.982242159753048, -0.982298594928989}\n  }\n};\n\nSOS_IIR_Filter C_weighting = {\n  gain: -0.491647169337140,\n  sos: {\n    {+1.4604385758204708, +0.5275070373815286, +1.9946144559930252, -0.9946217070140883},\n    {+0.2376222404939509, +0.0140411206016894, -1.3396585608422749, -0.4421457807694559},\n    {-2.0000000000000000, +1.0000000000000000, +0.3775800047420818, -0.0356365756680430}\n  }\n};\n\nstruct sum_queue_t {\n  float sum_sqr_SPL;\n  float sum_sqr_weighted;\n  uint32_t proc_ticks;\n};\n';
  }
  return'';
}


Blockly.Arduino.i2sMic_pocket_db_init=function(){
  var a='2',b='13',c='15',d='None',e='0.0';
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_i2sMic_db_include="#include <driver/i2s.h>\n#include \"sos-iir-filter.h\"";
    Blockly.Arduino.definitions_.define_i2sMic_db_pin_invoke='#define I2S_DB_SCK '+a+'\n#define I2S_DB_WS '+b+'\n#define I2S_DB_SD '+c+'\n#define I2S_DB_PORT I2S_NUM_1'
    Blockly.Arduino.definitions_.define_i2sMic_db_model_invoke='#define MIC_EQUALIZER '+d+'\n#define MIC_OFFSET_DB '+e;
    Blockly.Arduino.definitions_.define_i2sMic_db_other1_invoke='#define LEQ_PERIOD myDBperiod\n#define WEIGHTING C_weighting\n#define LEQ_UNITS \"LAeq\"\n#define DB_UNITS \"dBA\"\n#define MIC_SENSITIVITY -26\n#define MIC_REF_DB 94.0\n#define MIC_OVERLOAD_DB 116.0\n#define MIC_NOISE_DB 29\n#define MIC_BITS 24\n#define MIC_CONVERT(s) (s >> (DB_SAMPLE_BITS - MIC_BITS))\n#define DB_SAMPLE_RATE 48000\n#define DB_SAMPLE_BITS 32\n#define DB_SAMPLE_T int32_t\n#define DB_SAMPLES_SHORT (DB_SAMPLE_RATE / 8)\n#define DB_SAMPLES_LEQ (DB_SAMPLE_RATE * LEQ_PERIOD)\n#define DMA_BANK_SIZE (DB_SAMPLES_SHORT / 16)\n#define DMA_BANKS 32\n#define DB_I2S_TASK_PRI 4\n#define DB_I2S_TASK_STACK 2048';
    Blockly.Arduino.definitions_.define_i2sMic_db_other2_invoke='constexpr double MIC_REF_AMPL = pow(10, double(MIC_SENSITIVITY)/20) * ((1<<(MIC_BITS-1))-1);\nfloat samples[DB_SAMPLES_SHORT] __attribute__((aligned(4)));\nTaskHandle_t mic_dba_task;\nfloat myDBperiod=1;\nbool dbTaskCreated=false;\ndouble dbMeter=0.0;\n\nSOS_IIR_Filter DC_BLOCKER = {\n  gain: 1.0,\n  sos: {{-1.0, 0.0, +0.9992, 0}}\n};\n\nSOS_IIR_Filter ICS43434 = {\n  gain: 0.477326418836803,\n  sos: {\n   {+0.96986791463971267, 0.23515976355743193, -0.06681948004769928, -0.00111521990688128},\n   {-1.98905931743624453, 0.98908924206960169, +1.99755331853906037, -0.99755481510122113}\n  }\n};\n\nSOS_IIR_Filter ICS43432 = {\n  gain: -0.457337023383413,\n  sos: {\n    {-0.544047931916859, -0.248361759321800, +0.403298891662298, -0.207346186351843},\n    {-1.909911869441421, +0.910830292683527, +1.790285722826743, -0.804085812369134},\n    {+0.000000000000000, +0.000000000000000, +1.148493493802252, -0.150599527756651}\n  }\n};\n\nSOS_IIR_Filter INMP441 = {\n  gain: 1.00197834654696,\n  sos: {\n    {-1.986920458344451, +0.986963226946616, +1.995178510504166, -0.995184322194091}\n  }\n};\n\nSOS_IIR_Filter IM69D130 = {\n  gain: 1.00124068496753,\n  sos: {\n    {-1.0, 0.0, +0.9992, 0},\n    {-1.994461610298131, 0.994469278738208, +1.997675693595542, -0.997677044195563}\n  }\n};\n\nSOS_IIR_Filter SPH0645LM4H_B_RB = {\n  gain: 1.00123377961525,\n  sos: {\n    {-1.0, 0.0, +0.9992, 0},\n    {-1.988897663539382, +0.988928479008099, +1.993853376183491, -0.993862821429572}\n  }\n};\n\nSOS_IIR_Filter A_weighting = {\n  gain: 0.169994948147430,\n  sos: {\n    {-2.00026996133106, +1.00027056142719, -1.060868438509278, -0.163987445885926},\n    {+4.35912384203144, +3.09120265783884, +1.208419926363593, -0.273166998428332},\n    {-0.70930303489759, -0.29071868393580, +1.982242159753048, -0.982298594928989}\n  }\n};\n\nSOS_IIR_Filter C_weighting = {\n  gain: -0.491647169337140,\n  sos: {\n    {+1.4604385758204708, +0.5275070373815286, +1.9946144559930252, -0.9946217070140883},\n    {+0.2376222404939509, +0.0140411206016894, -1.3396585608422749, -0.4421457807694559},\n    {-2.0000000000000000, +1.0000000000000000, +0.3775800047420818, -0.0356365756680430}\n  }\n};\n\nstruct sum_queue_t {\n  float sum_sqr_SPL;\n  float sum_sqr_weighted;\n  uint32_t proc_ticks;\n};\n';
  }
  return'';
}

Blockly.Arduino.i2sMic_db_start=function(){
  var a=Blockly.Arduino.valueToCode(this,"PERIOD",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("CORE");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_i2sMic_db_init_event='void mic_i2s_db_init(){\n  const i2s_config_t i2s_config = {\n    mode: i2s_mode_t(I2S_MODE_MASTER | I2S_MODE_RX),\n    sample_rate: DB_SAMPLE_RATE,\n    bits_per_sample: i2s_bits_per_sample_t(DB_SAMPLE_BITS),\n    channel_format: I2S_CHANNEL_FMT_ONLY_LEFT,\n    communication_format: i2s_comm_format_t(I2S_COMM_FORMAT_I2S | I2S_COMM_FORMAT_I2S_MSB),\n    intr_alloc_flags: ESP_INTR_FLAG_LEVEL1,\n    dma_buf_count: DMA_BANKS,\n    dma_buf_len: DMA_BANK_SIZE,\n    use_apll: true,\n    tx_desc_auto_clear: false,\n    fixed_mclk: 0\n  };\n  const i2s_pin_config_t pin_config = {\n    bck_io_num:   I2S_DB_SCK,\n    ws_io_num:    I2S_DB_WS,\n     data_out_num: -1,\n    data_in_num:  I2S_DB_SD\n  };\n  i2s_driver_install(I2S_DB_PORT, &i2s_config, 0, NULL);\n  i2s_set_pin(I2S_DB_PORT, &pin_config);\n}\n';
    Blockly.Arduino.definitions_.define_i2sMic_db_task_event='void mic_i2s_reader_task(void* parameter){\n  size_t bytes_read = 0;\n  i2s_read(I2S_DB_PORT, &samples, DB_SAMPLES_SHORT * sizeof(int32_t), &bytes_read, portMAX_DELAY);\n  uint32_t Leq_samples = 0;\n  double Leq_sum_sqr = 0;\n  double Leq_dB = 0;\n  while (true) {\n    i2s_read(I2S_DB_PORT, &samples, DB_SAMPLES_SHORT * sizeof(DB_SAMPLE_T), &bytes_read, portMAX_DELAY);\n    TickType_t start_tick = xTaskGetTickCount();\n    DB_SAMPLE_T* int_samples = (DB_SAMPLE_T*)&samples;\n    for(int i=0; i<DB_SAMPLES_SHORT; i++) samples[i] = MIC_CONVERT(int_samples[i]);\n    sum_queue_t q;\n    q.sum_sqr_SPL = MIC_EQUALIZER.filter(samples, samples, DB_SAMPLES_SHORT);\n    q.sum_sqr_weighted = WEIGHTING.filter(samples, samples, DB_SAMPLES_SHORT);\n    q.proc_ticks = xTaskGetTickCount() - start_tick;\n    double short_RMS = sqrt(double(q.sum_sqr_SPL) / DB_SAMPLES_SHORT);\n    double short_SPL_dB = MIC_OFFSET_DB + MIC_REF_DB + 20 * log10(short_RMS / MIC_REF_AMPL);\n    if (short_SPL_dB > MIC_OVERLOAD_DB) {\n      Leq_sum_sqr = INFINITY;\n    } else if (isnan(short_SPL_dB) || (short_SPL_dB < MIC_NOISE_DB)) {\n      Leq_sum_sqr = -INFINITY;\n    }\n    Leq_sum_sqr += q.sum_sqr_weighted;\n    Leq_samples += DB_SAMPLES_SHORT;\n    if (Leq_samples >= DB_SAMPLE_RATE * LEQ_PERIOD) {\n      double Leq_RMS = sqrt(Leq_sum_sqr / Leq_samples);\n      Leq_dB = MIC_OFFSET_DB + MIC_REF_DB + 20 * log10(Leq_RMS / MIC_REF_AMPL);\n      Leq_sum_sqr = 0;\n      Leq_samples = 0;\n      dbMeter=Leq_dB;\n    }\n    taskYIELD();\n  }\n}\n';
    return'if (!dbTaskCreated){\n  myDBperiod='+a+';\n  mic_i2s_db_init();\n  dbTaskCreated=xTaskCreatePinnedToCore(mic_i2s_reader_task, "mic_dba_task", DB_I2S_TASK_STACK, NULL, DB_I2S_TASK_PRI, &mic_dba_task,'+b+');\n}\n';
  } else
    return'';
}

Blockly.Arduino.i2sMic_db_stop=function(){
  if (Blockly.Arduino.my_board_type=="ESP32")
    return'if (dbTaskCreated){\n  vTaskDelete(mic_dba_task);\n  i2s_driver_uninstall(I2S_DB_PORT);\n  dbTaskCreated=false;\n}\n';
  else
    return'';
}

Blockly.Arduino.i2sMic_db_is_measuring=function(){
  if (Blockly.Arduino.my_board_type=="ESP32")
    return['dbTaskCreated',Blockly.Arduino.ORDER_ATOMIC];
  else
    return['',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.i2sMic_db_value=function(){
  if (Blockly.Arduino.my_board_type=="ESP32")
    return['dbMeter',Blockly.Arduino.ORDER_ATOMIC];
  else
    return['',Blockly.Arduino.ORDER_ATOMIC];
}

//Keyboards
Blockly.Arduino.keyboards={};
Blockly.Arduino.keyboards_0_init=function(){
  var a0=Blockly.Arduino.valueToCode(this,"PIN_0",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a1=Blockly.Arduino.valueToCode(this,"PIN_1",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a2=Blockly.Arduino.valueToCode(this,"PIN_2",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a3=Blockly.Arduino.valueToCode(this,"PIN_3",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a4=Blockly.Arduino.valueToCode(this,"PIN_4",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a5=Blockly.Arduino.valueToCode(this,"PIN_5",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a6=Blockly.Arduino.valueToCode(this,"PIN_6",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_keypad_include="#include \"Adafruit_Keypad.h\"";
  Blockly.Arduino.definitions_.define_keypad_invoke='char keyPadChar=\'\\0\';\nconst byte keyRowsCount = 4;\nconst byte keyColsCount = 3;\nchar keys[keyRowsCount][keyColsCount] = {{\'1\', \'2\', \'3\'}, {\'4\', \'5\', \'6\'}, {\'7\', \'8\', \'9\'}, {\'*\', \'0\', \'#\'}};\nbyte rowPins[keyRowsCount] = {'+a0+','+a1+','+a2+','+a3+'};\nbyte colPins[keyColsCount] = {'+a4+','+a5+','+a6+'};\nAdafruit_Keypad customKeypad = Adafruit_Keypad( makeKeymap(keys), rowPins, colPins, keyRowsCount, keyColsCount);\n';
  Blockly.Arduino.definitions_.define_keypad_event="void checkPad(keypadEvent e)\n{\n  if (((char)e.bit.KEY!=\'\\0\')&&(e.bit.EVENT == KEY_JUST_PRESSED))\n    checkPadPress();\n  else if (((char)e.bit.KEY!=\'\\0\')&&(e.bit.EVENT == KEY_JUST_RELEASED))\n    checkPadRelease();\n}\n";
  Blockly.Arduino.definitions_.define_keypad_press_event="void checkPadPress()\n{\n}\n";
  Blockly.Arduino.definitions_.define_keypad_release_event="void checkPadRelease()\n{\n}\n";
  return'customKeypad.begin();\n';
}

Blockly.Arduino.keyboards_1_init=function(){
  var a0=Blockly.Arduino.valueToCode(this,"PIN_0",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a1=Blockly.Arduino.valueToCode(this,"PIN_1",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a2=Blockly.Arduino.valueToCode(this,"PIN_2",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a3=Blockly.Arduino.valueToCode(this,"PIN_3",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a4=Blockly.Arduino.valueToCode(this,"PIN_4",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a5=Blockly.Arduino.valueToCode(this,"PIN_5",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a6=Blockly.Arduino.valueToCode(this,"PIN_6",Blockly.Arduino.ORDER_ATOMIC)||"0",
      a7=Blockly.Arduino.valueToCode(this,"PIN_7",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_keypad_include="#include \"Adafruit_Keypad.h\"";
  Blockly.Arduino.definitions_.define_keypad_invoke='char keyPadChar=\'\\0\';\nconst byte keyRowsCount = 4;\nconst byte keyColsCount = 4;\nchar keys[keyRowsCount][keyColsCount] = {{\'1\', \'2\', \'3\', \'A\'}, {\'4\', \'5\', \'6\', \'B\'}, {\'7\', \'8\', \'9\', \'C\'}, {\'*\', \'0\', \'#\', \'D\'}};\nbyte rowPins[keyRowsCount] = {'+a0+','+a1+','+a2+','+a3+'};\nbyte colPins[keyColsCount] = {'+a4+','+a5+','+a6+','+a7+'};\nAdafruit_Keypad customKeypad = Adafruit_Keypad( makeKeymap(keys), rowPins, colPins, keyRowsCount, keyColsCount);\n';
  Blockly.Arduino.definitions_.define_keypad_event="void checkPad(keypadEvent e)\n{\n  if (((char)e.bit.KEY!=\'\\0\')&&(e.bit.EVENT == KEY_JUST_PRESSED))\n    checkPadPress();\n  else if (((char)e.bit.KEY!=\'\\0\')&&(e.bit.EVENT == KEY_JUST_RELEASED))\n    checkPadRelease();\n}\n";
  Blockly.Arduino.definitions_.define_keypad_press_event="void checkPadPress()\n{\n}\n";
  Blockly.Arduino.definitions_.define_keypad_release_event="void checkPadRelease()\n{\n}\n";
  return'customKeypad.begin();\n';
}

Blockly.Arduino.keyboards_check=function(){
  return'customKeypad.tick();\nif(customKeypad.available()){\n  keypadEvent e = customKeypad.read();\n  keyPadChar=(char)e.bit.KEY;\n  checkPad(e);\n}\n';
}

Blockly.Arduino.keyboards_event=function(){
  var a=this.getFieldValue("EVENT"),
      b=Blockly.Arduino.statementToCode(this,"KEYBOARD_EVENT");
  if (a=="1"){
    Blockly.Arduino.definitions_.define_keypad_press_event="void checkPadPress()\n{\n"+b+"}\n";
  }
  else if (a=="0"){
    Blockly.Arduino.definitions_.define_keypad_release_event="void checkPadRelease()\n{\n"+b+"}\n";
  }
  return'';
}

Blockly.Arduino.keyboards_value=function(){
  return['String(keyPadChar)',Blockly.Arduino.ORDER_ATOMIC];
}


//MPU6050
/*
Blockly.Arduino.ljj_mpu6050={};
Blockly.Arduino.ljj_mpu6050_accel_begin=function(){
  var a=this.getFieldValue("ACCEL_MODE");
  Blockly.Arduino.definitions_.define_ljj_mpu6050_include="#include <MPU6050.h>";
  Blockly.Arduino.definitions_.define_ljj_mpu6050_invoke="MPU6050 myMPU6050;";
  //Blockly.Arduino.definitions_.define_ljj_mpu6050_pitch_roll_invoke="void calcMPU6050angle(){\n   pitch = atan2 (myMPU6050.accelY() ,( sqrt ((myMPU6050.accelX() * myMPU6050.accelX()) + (myMPU6050.accelZ() * myMPU6050.accelZ()))))*57.3;\n   roll = atan2(myMPU6050.accelX() ,( sqrt((myMPU6050.accelY() * myMPU6050.accelY()) + (myMPU6050.accelZ() * myMPU6050.accelZ()))))*57.3;\n}\n";
  Blockly.Arduino.definitions_.define_ljj_mpu6050_pitch_roll_invoke='';
  Blockly.Arduino.setups_.setup_mpu6050_begin="myMPU6050.begin();";
	return'myMPU6050.setRange('+a+');\n';
};

Blockly.Arduino.ljj_mpu6050_accel_fetch=function(){
	return"Vector normAccel = myMPU6050.readNormalizeAccel();\n"
};

Blockly.Arduino.ljj_mpu6050_accel_3axis=function(){
  var a=this.getFieldValue("3AXIS_MODE");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};



Blockly.Arduino.ljj_mpu6050_gyro_begin=function(){
  var a=this.getFieldValue("GYRO_MODE");
  Blockly.Arduino.definitions_.define_ljj_mpu6050_include="#include <MPU6050.h>";
  Blockly.Arduino.definitions_.define_ljj_mpu6050_invoke="MPU6050 myMPU6050;";
  Blockly.Arduino.definitions_.define_ljj_mpu6050_pitch_roll_invoke='';
  Blockly.Arduino.setups_.setup_mpu6050_begin="myMPU6050.begin();";
	return'myMPU6050.setScale('+a+');\nmyMPU6050.calibrateGyro();\n';
};

Blockly.Arduino.ljj_mpu6050_gyro_fetch=function(){
	return"Vector normGyro = myMPU6050.readNormalizeGyro();\n"
};

Blockly.Arduino.ljj_mpu6050_gyro_3axis=function(){
  var a=this.getFieldValue("3AXIS_MODE");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_mpu6050_temperature=function(){
  return['myMPU6050.readTemperature()',Blockly.Arduino.ORDER_ATOMIC];
};
*/

//CAMERA
Blockly.Arduino.ljj_camera={};
Blockly.Arduino.ljj_camera_init=function(){
  var a=this.getFieldValue("CAM_TYPE"),
      b=this.getFieldValue("RES_TYPE");
  Blockly.Arduino.ljj_camera.cam_type=a;
  Blockly.Arduino.definitions_.define_ljj_cam_include='#include "esp_camera.h"\n#include "'+a+'_pins.h"';
  Blockly.Arduino.definitions_.define_ljj_cam_invoke='sensor_t *myCamera;';
  if (a=="PIXELBIT"){
    Blockly.Arduino.definitions_.define_ljj_cam_pixelbit_include='#include <tca5405.h>';
    Blockly.Arduino.definitions_.define_ljj_cam_pixelbit_tca_invoke='TCA5405 tca5405;';
    Blockly.Arduino.setups_.setup_ljj_camera_pixelbit_tca='tca5405.init(21);\n  tca5405.set_gpo(PIXELBIT_CAMERA_POWER, 0);\n  tca5405.transmit();\n  delay(100);\n  tca5405.set_gpo(PIXELBIT_CAMERA_POWER, 1);\n  tca5405.transmit();\n  delay(100);\n';
  }
  Blockly.Arduino.setups_.setup_ljj_camera='camera_config_t config;\n  config.ledc_channel=LEDC_CHANNEL_0;\n  config.ledc_timer=LEDC_TIMER_0;\n  config.pin_d0=Y2_GPIO_NUM;\n  config.pin_d1=Y3_GPIO_NUM;\n  config.pin_d2=Y4_GPIO_NUM;\n  config.pin_d3=Y5_GPIO_NUM;\n  config.pin_d4=Y6_GPIO_NUM;\n  config.pin_d5=Y7_GPIO_NUM;\n  config.pin_d6=Y8_GPIO_NUM;\n  config.pin_d7=Y9_GPIO_NUM;\n  config.pin_xclk=XCLK_GPIO_NUM;\n  config.pin_pclk=PCLK_GPIO_NUM;\n  config.pin_vsync=VSYNC_GPIO_NUM;\n  config.pin_href=HREF_GPIO_NUM;\n  config.pin_sscb_sda=SIOD_GPIO_NUM;\n  config.pin_sscb_scl=SIOC_GPIO_NUM;\n  config.pin_pwdn=PWDN_GPIO_NUM;\n  config.pin_reset=RESET_GPIO_NUM;\n  config.xclk_freq_hz=20000000;\n  config.pixel_format=PIXFORMAT_JPEG;\n  config.frame_size=FRAMESIZE_QVGA;\n  config.fb_count=2;\n  config.jpeg_quality=10;\n  esp_err_t err = esp_camera_init(&config);\n  if (err != ESP_OK) {\n    Serial.printf("Camera init failed with error 0x%x", err);\n    return;\n  }\n  myCamera = esp_camera_sensor_get();\n  myCamera->set_brightness(myCamera, -1);\n  myCamera->set_contrast(myCamera, 1);\n  myCamera->set_saturation(myCamera, 1);\n';
  Blockly.Arduino.setups_.setup_ljj_camera=Blockly.Arduino.setups_.setup_ljj_camera.replace("_QVGA",("_"+b));
	return'';
};

Blockly.Arduino.ljj_camera_rotation=function(){
  var a=this.getFieldValue("ROTATION_TYPE"),
      b=this.getFieldValue("VALUE");
  var returnStr='myCamera->set_'+a+'(myCamera, '+b+');\n'
  if (Blockly.Arduino.definitions_['define_linkit_wifi_include'])
    returnStr=returnStr.replace(/myCamera/g,"s");
  return returnStr;
};

Blockly.Arduino.ljj_camera_resolution=function(){
  var a=this.getFieldValue("RES_TYPE");
	var returnStr='myCamera->set_framesize(myCamera, FRAMESIZE_'+a+');\n'
  if (Blockly.Arduino.definitions_['define_linkit_wifi_include'])
    returnStr=returnStr.replace(/myCamera/g,"s");
  return returnStr;
};

Blockly.Arduino.ljj_camera_effect1=function(){
  var a=this.getFieldValue("EFFECT_TYPE");
	var returnStr='myCamera->set_special_effect(myCamera, '+a+');\n'
  if (Blockly.Arduino.definitions_['define_linkit_wifi_include'])
    returnStr=returnStr.replace(/myCamera/g,"s");
  return returnStr;
};

Blockly.Arduino.ljj_camera_effect2=function(){
  var a=Blockly.Arduino.valueToCode(this,"VALUE",Blockly.Arduino.ORDER_ATOMIC)||"0";
	var returnStr='myCamera->set_special_effect(myCamera, '+a+');\n'
  if (Blockly.Arduino.definitions_['define_linkit_wifi_include'])
    returnStr=returnStr.replace(/myCamera/g,"s");
  return returnStr;
};

Blockly.Arduino.ljj_camera_image=function(){
  var a=this.getFieldValue("TYPE"),
      b=Blockly.Arduino.valueToCode(this,"VALUE",Blockly.Arduino.ORDER_ATOMIC)||"0";
	var returnStr='myCamera->set_'+a+'(myCamera, '+b+');\n'
  if (Blockly.Arduino.definitions_['define_linkit_wifi_include'])
    returnStr=returnStr.replace(/myCamera/g,"s");
  return returnStr;
};

Blockly.Arduino.ljj_camera_fb_get=function(){
  return'camera_fb_t *fb = NULL;\nfb = esp_camera_fb_get();\nif (!fb) {\n  Serial.println("Camera capture failed");\n  esp_camera_fb_return(fb);\n  return;\n}\nif (fb->format != PIXFORMAT_JPEG) {\n  Serial.println("Non-JPEG data not implemented");\n  return;\n}\n';
}

Blockly.Arduino.ljj_camera_fb_free=function(){
  return'esp_camera_fb_return(fb);\n';
}

Blockly.Arduino.ljj_camera_fb_detected_face=function(){
  if (Blockly.Arduino.definitions_.define_ljj_cam_include){
    if (Blockly.Arduino.definitions_.define_ljj_cam_include.indexOf()<0)
      Blockly.Arduino.definitions_.define_ljj_cam_include+='\n#include "fd_forward.h"';
    Blockly.Arduino.definitions_.define_ljj_cam_face_invoke="mtmn_config_t mtmn_config = {0};";
    Blockly.Arduino.setups_.setup_face_data="mtmn_config = mtmn_init_config();";
    Blockly.Arduino.definitions_.define_ljj_cam_face_event='bool camDetectedFace(camera_fb_t * frame)\n{\n  dl_matrix3du_t *image_matrix = dl_matrix3du_alloc(1, frame->width, frame->height, 3);\n  fmt2rgb888(frame->buf, frame->len, frame->format, image_matrix->item);\n  box_array_t *boxes = face_detect(image_matrix, &mtmn_config);\n  dl_matrix3du_free(image_matrix);\n  if (boxes != NULL) {\n    dl_lib_free(boxes->score);\n    dl_lib_free(boxes->box);\n    dl_lib_free(boxes->landmark);\n    dl_lib_free(boxes);\n    return true;\n  } else\n    return false;\n}\n';
  }
  return['(camDetectedFace(fb))',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ljj_camera_fb_save=function(){
  var a=Blockly.Arduino.ljj_camera.cam_type,
      b=this.getFieldValue("F_SOURCE"),
      c=Blockly.Arduino.valueToCode(this,"FILE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_ljj_cam_save_event=' void cameraSaveTo(byte mediaType,String filename,camera_fb_t *myFB)\n{\n  File jpegFile;\n  if (mediaType==1){\n    if (!SD.begin(pinCS)) return;\n    jpegFile = SD.open(filename.c_str(),"w");\n    if ( !jpegFile )  return;\n  } else if (mediaType==2){\n    SPIFFS.begin();\n    jpegFile = SPIFFS.open(filename.c_str(),"w");\n    if ( !jpegFile )  return;\n  }\n  jpegFile.write(myFB->buf, myFB->len);\n  jpegFile.close();\n  if (mediaType==1)\n    SD.end();\n  else if (mediaType==2)\n    SPIFFS.end();\n}\n';
  if ((a=="PIXELBIT")||(a=="ESP32-CAM")){
    Blockly.Arduino.definitions_.define_ljj_cam_include+="\n#include <SD_MMC.h>";
    Blockly.Arduino.definitions_.define_ljj_cam_save_event=Blockly.Arduino.definitions_.define_ljj_cam_save_event.replace(new RegExp("SD.","gm"),"SD_MMC.");
    Blockly.Arduino.definitions_.define_ljj_cam_save_event=Blockly.Arduino.definitions_.define_ljj_cam_save_event.replace("pinCS","");
  } else {
    Blockly.Arduino.definitions_.define_ljj_cam_include+="\n#include <SD.h>";
    if ((a=="KSB065")||(a=="POCKETCARD"))
       Blockly.Arduino.definitions_.define_SD_CS_invoke='int pinCS=4;';
  }
  if (b=='1'){
    if (a=='KSB065'){
      if (Blockly.Arduino.setups_.ttgo_tft)
        if (Blockly.Arduino.setups_.ttgo_tft.indexOf("SD.begin(pinCS)")<0)
          Blockly.Arduino.setups_.ttgo_tft='SD.begin(pinCS);\n  SD.end();\n  '+Blockly.Arduino.setups_.ttgo_tft;  
    }
    else if (a=='PIXELBIT' || a=='ESP32-CAM'){
      if (Blockly.Arduino.setups_.ttgo_tft)
        if (Blockly.Arduino.setups_.ttgo_tft.indexOf('SD_MMC.begin()')<0)
          Blockly.Arduino.setups_.ttgo_tft='SD_MMC.begin();\n  SD_MMC.end();\n  '+Blockly.Arduino.setups_.ttgo_tft;
    }
    else
      Blockly.Arduino.setups_.ttgo_tft='SD.begin();\n  SD.end();\n  '+Blockly.Arduino.setups_.ttgo_tft;
  }
  else if (b=='2')
    Blockly.Arduino.setups_.ttgo_tft='SPIFFS.begin();\n  SPIFFS.end();\n  '+Blockly.Arduino.setups_.ttgo_tft;
  return'cameraSaveTo('+b+','+c+',fb);\n';
}


//KSB069
Blockly.Arduino.ljj_ksb069={};
Blockly.Arduino.ljj_ksb069_motor_init=function(){
  var a=2,
      b=15,
      c=12,
      d=4;
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_L9110_invoke='byte m1aL9110='+a+';\nbyte m1bL9110='+b+';\nbyte m2aL9110='+c+';\nbyte m2bL9110='+d+';\nbyte m1bCH=13;\nbyte m2bCH=14;\n';
    Blockly.Arduino.setups_["setup_L9110"]='pinMode(m1aL9110,OUTPUT);\n  pinMode(m2aL9110,OUTPUT);\n  ledcSetup(m1bCH, 5000, 8);\n  ledcAttachPin(m1bL9110,m1bCH);\n  ledcSetup(m2bCH, 5000, 8);\n  ledcAttachPin(m2bL9110,m2bCH);\n  digitalWrite(m1aL9110,0);\n  ledcWrite(m1bCH,0);\n  digitalWrite(m2aL9110,0);\n  ledcWrite(m2bCH,0);\n';
  } else {
    a=3;
    b=2;
    c=28;
    d=5;
    Blockly.Arduino.definitions_.define_L9110_invoke='byte m1aL9110='+a+';\nbyte m1bL9110='+b+';\nbyte m2aL9110='+c+';\nbyte m2bL9110='+d+';\n';
    Blockly.Arduino.setups_["setup_L9110"]='pinMode(m1aL9110,OUTPUT);\n  pinMode(m1bL9110,OUTPUT);\n  pinMode(m2aL9110,OUTPUT);\n  pinMode(m2bL9110,OUTPUT);\n  digitalWrite(m1aL9110,0);\n  analogWrite(m1bL9110,0);\n  digitalWrite(m2aL9110,0);\n  analogWrite(m2bL9110,0);\n';
  }
  return'';
}

Blockly.Arduino.ljj_ksb069_motor_run=function(){
  var a=this.getFieldValue("MOTOR"),
      b=this.getFieldValue("DIR"),
      c=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0",
      returnValue="";
    if (a=="both"){
      if (b=="1")
        returnValue='digitalWrite(m1aL9110,1);\nanalogWrite(m1bL9110,255-'+c+');\ndigitalWrite(m2aL9110,1);\nanalogWrite(m2bL9110,255-'+c+');\n';
      else
        returnValue='digitalWrite(m1aL9110,0);\nanalogWrite(m1bL9110,'+c+');\ndigitalWrite(m2aL9110,0);\nanalogWrite(m2bL9110,'+c+');\n';
    } else {
      if (b=="1")
        returnValue='digitalWrite('+a+'aL9110,1);\nanalogWrite('+a+'bL9110,255-'+c+');\n';
      else
        returnValue='digitalWrite('+a+'aL9110,0);\nanalogWrite('+a+'bL9110,'+c+');\n';
    }
  if (Blockly.Arduino.my_board_type=="ESP32"){
    returnValue=returnValue.replace(/analogWrite/g,"ledcWrite");
    returnValue=returnValue.replace(/m1bL9110/g,"m1bCH");
    returnValue=returnValue.replace(/m2bL9110/g,"m2bCH");
  } 
  return returnValue;
}

Blockly.Arduino.ljj_ksb069_motor_stop=function(){
  var a=this.getFieldValue("MOTOR"),
      returnValue="";
    if (a=="both"){
      returnValue='digitalWrite(m1aL9110,0);\nanalogWrite(m1bL9110,0);\ndigitalWrite(m2aL9110,0);\nanalogWrite(m2bL9110,0);\n';
    } else {
      returnValue='digitalWrite('+a+'aL9110,0);\nanalogWrite('+a+'bL9110,0);\n';
    }
  if (Blockly.Arduino.my_board_type=="ESP32"){
    returnValue=returnValue.replace(/analogWrite/g,"ledcWrite");
    returnValue=returnValue.replace(/m1bL9110/g,"m1bCH");
    returnValue=returnValue.replace(/m2bL9110/g,"m2bCH");
  } 
  return returnValue;
}

Blockly.Arduino.ljj_ksb069_cam_pins_clear=function(){
  var a=this.getFieldValue("VFLIP_VALUE"),
      b=this.getFieldValue("HMIRROR_VALUE");
  return's->set_vflip(s, '+a+');\ns->set_hmirror(s, '+b+');\n'
};

//Serial
Blockly.Arduino.ljj_serial={};
Blockly.Arduino.ljj_serial_begin=function(){
  var a=this.getFieldValue("SERIAL_PORT"),
      b=this.getFieldValue("BOUND_RATE");
  return a+'.begin('+b+');\n';
}

Blockly.Arduino.ljj_serial_end=function(){
  var a=this.getFieldValue("SERIAL_PORT");
  return a+'.end();\n';
}

Blockly.Arduino.ljj_serial_print=function(){
  var a=this.getFieldValue("SERIAL_PORT"),
      b=Blockly.Arduino.valueToCode(this,"TEXT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return a+'.print(String('+b+'));\n';
}

Blockly.Arduino.ljj_serial_println=function(){
  var a=this.getFieldValue("SERIAL_PORT"),
      b=Blockly.Arduino.valueToCode(this,"TEXT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return a+'.println(String('+b+'));\n';
}

Blockly.Arduino.ljj_serial_readString=function(){
  var a=this.getFieldValue("SERIAL_PORT"),
      c=Blockly.Arduino.statementToCode(this,"STATEMENT");
  Blockly.Arduino.definitions_.define_ljj_serial_invoke='String serialStr="";';
  //var returnStr='if ('+a+'.available()) {\n  serialStr = "";\n  while ('+a+'.available()) {\n    serialStr='+a+'.readStringUntil('+b+');\n    serialStr.replace("\\r","");\n'+c+'  }\n}\n';
  var returnStr='if ('+a+'.available()) {\n  serialStr = "";\n  while ('+a+'.available()) {\n    char tempChar='+a+'.read();\n    if (tempChar!=\'\\n\'&& tempChar!=\'\\r\')\n      serialStr+=String(tempChar);\n    delay(1);\n  }\n'+c+'}\n'
  return returnStr;
}

Blockly.Arduino.ljj_serial_readuntil=function(){
  var a=this.getFieldValue("SERIAL_PORT"),
      b=Blockly.Arduino.valueToCode(this,"TEXT",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.statementToCode(this,"STATEMENT");
  Blockly.Arduino.definitions_.define_ljj_serial_invoke='String serialStr="";';
  b=b.replace(/\"/g,"\'");
  b=b.replace(/\\\\/g,"\\");
  if (c!=''){
    c=c.replace(new RegExp("\n  ","gm"),"\n    ");
    c='  '+c;
  }
  var returnStr='if ('+a+'.available()) {\n  serialStr = "";\n  while ('+a+'.available()) {\n    serialStr='+a+'.readStringUntil('+b+');\n    serialStr.replace("\\r","");\n'+c+'  }\n}\n';
  return returnStr;
}

Blockly.Arduino.ljj_serial_read_result=function(){
  return['serialStr',Blockly.Arduino.ORDER_ATOMIC];
}

//Quno
Blockly.Arduino.ljj_quno={};
Blockly.Arduino.ljj_quno_wifi=function(){
  var a=Blockly.Arduino.valueToCode(this,"SSID",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"PASSWORD",Blockly.Arduino.ORDER_ATOMIC)||"";
      Blockly.Arduino.definitions_.define_ljj_quno_wifi_include="#include <esp8266_ifttt.h>";
      Blockly.Arduino.definitions_.define_ljj_quno_wifi_invoke='String qunoLocalIP="";\nString qunoBroadcastIP="";\n';
      //Blockly.Arduino.setups_.setup_ljj_quno_wifi='qunoLocalIP=setWifiInfo('+a+', '+b+');\n  qunoBroadcastIP=qunoLocalIP.substring(0,  qunoLocalIP.lastIndexOf("."))+".255";';
  return'qunoLocalIP=setWifiInfo('+a+', '+b+');\nqunoBroadcastIP=qunoLocalIP.substring(0,qunoLocalIP.lastIndexOf("."))+".255";';    
}

Blockly.Arduino.ljj_quno_wifi_localIP=function(){
  return['qunoLocalIP',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_quno_wifi_datetime=function(){
  var a=this.getFieldValue("TYPE");
  return['getQunoDatime('+a+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_quno_ifttt=function(){
  var a=Blockly.Arduino.valueToCode(this,"EVENT",Blockly.Arduino.ORDER_ATOMIC)||'"event"',
      b=Blockly.Arduino.valueToCode(this,"KEY",Blockly.Arduino.ORDER_ATOMIC)||'"---"',
      c=Blockly.Arduino.valueToCode(this,"VALUE1",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"VALUE2",Blockly.Arduino.ORDER_ATOMIC)||"",
      e=Blockly.Arduino.valueToCode(this,"VALUE3",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'sendIFTTTMessage('+b+', '+a+', String('+c+'), String('+d+'), String('+e+'));\n';
};

Blockly.Arduino.ljj_quno_thingspeak=function(){
  var a=Blockly.Arduino.valueToCode(this,"KEY",Blockly.Arduino.ORDER_ATOMIC)||'"---"',
    b=Blockly.Arduino.valueToCode(this,"FIELD1",Blockly.Arduino.ORDER_ATOMIC)||"0",
    c=Blockly.Arduino.valueToCode(this,"FIELD2",Blockly.Arduino.ORDER_ATOMIC)||"0",
    d=Blockly.Arduino.valueToCode(this,"FIELD3",Blockly.Arduino.ORDER_ATOMIC)||"0",
    e=Blockly.Arduino.valueToCode(this,"FIELD4",Blockly.Arduino.ORDER_ATOMIC)||"0",
    f=Blockly.Arduino.valueToCode(this,"FIELD5",Blockly.Arduino.ORDER_ATOMIC)||"0",
    g=Blockly.Arduino.valueToCode(this,"FIELD6",Blockly.Arduino.ORDER_ATOMIC)||"0",
    h=Blockly.Arduino.valueToCode(this,"FIELD7",Blockly.Arduino.ORDER_ATOMIC)||"0",
    i=Blockly.Arduino.valueToCode(this,"FIELD8",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return'sendThingSpeakMessage('+a+', String('+b+'), String('+c+'), String('+d+'), String('+e+'), String('+f+'), String('+g+'), String('+h+'), String('+i+'));\n';
};

Blockly.Arduino.ljj_quno_sheet_id=function(){
  var a=Blockly.Arduino.valueToCode(this,"sheetId",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_ljj_quno_sheets='String qunoSheetId="";\n';
  return'qunoSheetId='+a+';\n';
};

Blockly.Arduino.ljj_quno_sheet_append=function(){
  var d="qunoSheetId",
      a=Blockly.Arduino.valueToCode(this,"VALUE1",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"VALUE2",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"VALUE3",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'sendGoogleSheet("append", '+d+', "A1", String('+a+'), String('+b+'), String('+c+'));\n';
};

Blockly.Arduino.ljj_quno_sheet_update=function(){
  var a="qunoSheetId",
      b=Blockly.Arduino.valueToCode(this,"CELL",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"VALUE1",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'sendGoogleSheet("update", '+a+', '+b+', String('+c+'));\n';
};

Blockly.Arduino.ljj_quno_sheet_read=function(){
  var a="qunoSheetId",
      b=Blockly.Arduino.valueToCode(this,"CELL",Blockly.Arduino.ORDER_ATOMIC)||"";
  return['sendGoogleSheet("read", '+a+', '+b+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_quno_udp_register=function(){
  var a=Blockly.Arduino.valueToCode(this,"IP",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"PORT",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return'listenUdpPort('+a+','+b+');\n';
};


Blockly.Arduino.ljj_quno_udp_broadcastIP=function(){
  return['qunoBroadcastIP',Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.ljj_quno_udp_unrigister=function(){
  return'stopUDP();\n';
};

Blockly.Arduino.ljj_quno_udp_send=function(){
  var a=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"";
  return'sendUDPmessage('+a+');\n';
};

Blockly.Arduino.ljj_quno_udp_received_event=function(){
  var a=Blockly.Arduino.statementToCode(this,"MSG_UDP");
  a=a.replace(/\n  /g,"\n  ");
  Blockly.Arduino.definitions_.define_ljj_quno_udp_msg_invoke='String qunoUDPmsg="";';
  Blockly.Arduino.definitions_.define_ljj_quno_udp_event='void qunoCheckUDP(){\n  qunoUDPmsg=checkUDPmessage();\n  if (qunoUDPmsg=="")\n    return;\n'+a+'}\n';
  Blockly.Arduino.loops_.ljj_quno_udp_loop="qunoCheckUDP();\n";
  return'';
}

Blockly.Arduino.ljj_quno_udp_received_msg=function(){
  return['qunoUDPmsg',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_quno_rgb=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace("tft.color565","QunoLedColor");
  Blockly.Arduino.definitions_.define_ljj_quno_rgb_event='void QunoLedColor(byte red,byte green,byte blue)\n{\n  analogWrite(10,red);\n  analogWrite(9,green);\n  analogWrite(11,blue);\n}\n';
  Blockly.Arduino.setups_.setup_ljj_quno_rgb='pinMode(9,OUTPUT);\n  pinMode(10,OUTPUT);\n  pinMode(11,OUTPUT);';
	return a+";\n";
};
Blockly.Arduino.ljj_quno_button=function(){
  var a=this.getFieldValue("AB_BUTTON"),
	  b=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL");
  Blockly.Arduino.definitions_.define_m_button="byte A_Pin=2;\nbyte B_Pin=4;\nchar myBtnStatus;\n";
  Blockly.Arduino.definitions_.define_m_button_event="bool buttonPressed(char btnName)\n{\n  if (btnName=='A'){\n    if (digitalRead(A_Pin) == 0)\n      return false;\n    else\n      return true;\n  }\n  else if (btnName=='B'){\n    if (digitalRead(B_Pin) == 0)\n      return false;\n    else\n      return true;\n  } else {\n    if ((digitalRead(A_Pin) == 0) && (digitalRead(B_Pin) == 0))\n      return false;\n    else\n      return true;\n  }\n}\n"
  Blockly.Arduino.definitions_.define_m_getBtnStatus_event="char getBtnStatus(){\n  char buttonStatus=' ';\n  int checkButtonDelay=200;\n  if (buttonPressed('A')){\n    delay(checkButtonDelay);\n    if (buttonPressed('A')){\n      buttonStatus='A';\n      if (buttonPressed('B'))\n        buttonStatus='C';\n    }\n  } else if (buttonPressed('B')){\n      delay(checkButtonDelay);\n      if (buttonPressed('B')){\n        buttonStatus='B';\n        if (buttonPressed('A'))\n          buttonStatus='C';\n      }\n  }\n  return buttonStatus;\n}\n";
  Blockly.Arduino.setups_.setup_button='pinMode(A_Pin, INPUT);\n  pinMode(B_Pin, INPUT);\n';
	return"if (myBtnStatus=='"+a+"'){\n"+b+"  while(buttonPressed('"+a+"')){}\n}\n"
};

Blockly.Arduino.ljj_quno_button_boolean=function(){
  var a=this.getFieldValue("AB_BUTTON");
  Blockly.Arduino.definitions_.define_m_button="byte A_Pin=2;\nbyte B_Pin=4;\n";
  Blockly.Arduino.setups_.setup_button='pinMode(A_Pin, INPUT);\n  pinMode(B_Pin, INPUT);\n';
	return['(digitalRead('+a+'_Pin)==1)',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_quno_led=function(){
  var a=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("LED");
  if(!Blockly.Arduino.setups_.setup_ljj_quno_led)
    Blockly.Arduino.setups_.setup_ljj_quno_led="pinMode("+b+", OUTPUT);";
  else if (!(Blockly.Arduino.setups_.setup_ljj_quno_led.indexOf("("+b+",")>0))
    Blockly.Arduino.setups_.setup_ljj_quno_led+="\n  pinMode("+b+", OUTPUT);";
  return"digitalWrite("+b+", "+a+");\n";
};

Blockly.Arduino.ljj_quno_led_analog=function(){
  var a=this.getFieldValue("LED"),
      b=Blockly.Arduino.valueToCode(this,"NUM",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if(!Blockly.Arduino.setups_.setup_ljj_quno_led)
    Blockly.Arduino.setups_.setup_ljj_quno_led="pinMode("+a+", OUTPUT);";
  else if (!(Blockly.Arduino.setups_.setup_ljj_quno_led.indexOf("("+a+",")>0))
    Blockly.Arduino.setups_.setup_ljj_quno_led+="\n  pinMode("+a+", OUTPUT);";
  return"analogWrite("+a+", "+b+");\n";
};

Blockly.Arduino.ljj_quno_tone=function(){
  var a=this.getFieldValue("FREQ");
  Blockly.Arduino.definitions_.define_ljj_quno_tone_invoke="byte buzz_pin=3;";
  return"tone(buzz_pin, "+a+");\n";
};

Blockly.Arduino.ljj_quno_no_tone=function(){
  Blockly.Arduino.definitions_.define_ljj_quno_tone_invoke="byte buzz_pin=3;";
  return"noTone(buzz_pin);\n";
};

Blockly.Arduino.ljj_quno_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_ljj_quno_tone_invoke="byte buzz_pin=3;";
  return"tone(buzz_pin, "+a+");\ndelay("+b+");\nnoTone(buzz_pin);\ndelay(2);\n";
};

Blockly.Arduino.ljj_quno_sonar=function(){
  Blockly.Arduino.definitions_.define_ljj_quno_sonar_include="#include <Ultrasonic.h>";
  Blockly.Arduino.definitions_.define_ljj_quno_sonar_invoke="Ultrasonic ultrasonic_(A0, A1);";
  return['ultrasonic_.convert(ultrasonic_.timing(), Ultrasonic::CM)',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_quno_digital_read=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.setups_["setup_"+a+"_"]="pinMode("+a+", INPUT);";
  return["digitalRead("+a+")",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_quno_analog_read=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.setups_["setup_"+a+"_"]="pinMode("+a+", INPUT);";
  return["analogRead("+a+")",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_quno_pir_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_ljj_quno_pir_invoke="byte pir_pin="+a+";";
  Blockly.Arduino.setups_.setup_ljj_quno_ir="pinMode(pir_pin, INPUT);";
  return"";
};

Blockly.Arduino.ljj_quno_pir_detected=function(){
  return['(digitalRead(pir_pin)==1)',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_quno_servo_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  //Blockly.Arduino.definitions_.define_servo="#include <ServoTimer2.h>";
  Blockly.Arduino.definitions_.define_servo="#include <Adafruit_SoftServo.h>";
  //Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";
  Blockly.Arduino.definitions_["define_class_servo_"+a]="Adafruit_SoftServo "+b+";";
  //Blockly.Arduino.definitions_["define_class_servo_"+a]="Servo "+b+";";
  return b+'.attach('+a+');\n';
};

Blockly.Arduino.ljj_quno_servo_write_pin=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME),
      b=Blockly.Arduino.valueToCode(this,"ANGLE",Blockly.Arduino.ORDER_ATOMIC)||"90";
  return a+".write("+b+");\n"
};

Blockly.Arduino.ljj_quno_pins=function(){
  var a=this.getFieldValue("QUNO_PIN");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_quno_dht11=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("DHT11_TYPE"),
      myType='';
  if (b=='temperature')
    myType='readTemperature';
  else if (b=='humidity')
    myType='readHumidity';
  Blockly.Arduino.definitions_['define_dht_']="#include <DHT_mini.h>";
  Blockly.Arduino.definitions_['define_dht_set_'+a]="DHT dht11_p"+a+"("+a+", DHT11);";
  Blockly.Arduino.setups_["setup_dht_"+a]="dht11_p"+a+".begin();";
  return["dht11_p"+a+"."+myType+"()",Blockly.Arduino.ORDER_ATOMIC];
};

//Basic
Blockly.Arduino.ljj_basic={};
Blockly.Arduino.ljj_basic_button=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("PIN_MODE"),
      c=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL_PRESSED"),
      d=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL_RELEASED");
  if (b=='LOW')
    Blockly.Arduino.setups_["button_"+a]='pinMode('+a+', INPUT_PULLUP);';
  else
    Blockly.Arduino.setups_["button_"+a]='pinMode('+a+', INPUT);';
	return'if (digitalRead('+a+')=='+b+'){\n'+c+'  while(digitalRead('+a+')=='+b+'){}\n'+d+'}\n'
};

Blockly.Arduino.ljj_basic_led=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.setups_["led_"+a]="pinMode("+a+", OUTPUT);";
  return"digitalWrite("+a+", "+b+");\n";
};

Blockly.Arduino.ljj_basic_led_analog=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"NUM",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.setups_["led_"+a]="pinMode("+a+", OUTPUT);";
  return"analogWrite("+a+", "+b+");\n";
};

Blockly.Arduino.ljj_basic_rgb_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN_RED",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"PIN_GREEN",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"PIN_BLUE",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_ljj_basic_rgb_invoke='int rgbRedPin='+a+';\nint rgbGreenPin='+b+';\nint rgbBluePin='+c+';';
  Blockly.Arduino.definitions_.define_ljj_quno_rgb_event='void QunoLedColor(byte red,byte green,byte blue)\n{\n  analogWrite(rgbRedPin,red);\n  analogWrite(rgbGreenPin,green);\n  analogWrite(rgbBluePin,blue);\n}\n';
  Blockly.Arduino.setups_.setup_ljj_quno_rgb='pinMode(rgbRedPin,OUTPUT);\n  pinMode(rgbGreenPin,OUTPUT);\n  pinMode(rgbBluePin,OUTPUT);';
	return'';
};

Blockly.Arduino.ljj_basic_rgb_led=function(){
  var a=this.getFieldValue("PIN"),
      b=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return"digitalWrite("+a+", "+b+");\n";
};

Blockly.Arduino.ljj_basic_rgb_analog=function(){
  var a=this.getFieldValue("PIN"),
      b=Blockly.Arduino.valueToCode(this,"NUM",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return"analogWrite("+a+", "+b+");\n";
};

Blockly.Arduino.ljj_basic_rgb=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace("tft.color565","QunoLedColor");
	return a+";\n";
};

Blockly.Arduino.ljj_basic_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("FREQ");
  Blockly.Arduino.definitions_.define_ljj_basic_tone_invoke='byte buzzPin='+a+';';
  return"tone(buzzPin, "+b+");\n";
};

Blockly.Arduino.ljj_basic_no_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_ljj_basic_tone_invoke='byte buzzPin='+a+';';
  return"noTone(buzzPin);\n";
};

Blockly.Arduino.ljj_basic_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_ljj_basic_tone_invoke='byte buzzPin='+a+';';
  return"tone(buzzPin, "+b+");\ndelay("+c+");\nnoTone(buzzPin);\n";
};

Blockly.Arduino.ljj_basic_sonar_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"TRIG_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"ECHO_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  Blockly.Arduino.definitions_.define_ljj_quno_sonar_include="#include <Ultrasonic.h>";
  Blockly.Arduino.definitions_['define_ljj_quno_sonar_'+c+'_invoke']='Ultrasonic '+c+'('+a+', '+b+');';
  return'';
};

Blockly.Arduino.ljj_basic_sonar=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  return[a+'.convert('+a+'.timing(), Ultrasonic::CM)',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_basic_dht11=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("DHT11_TYPE"),
      myType='';
  if (b=='temperature')
    myType='readTemperature';
  else if (b=='humidity')
    myType='readHumidity';
  var tempBoardName=getBoardFullName();
  //if (tempBoardName=='arduino:avr:pro' || tempBoardName=='arduino:avr:nano' || tempBoardName.startsWith("rp2040:rp2040:rpipico"))
  Blockly.Arduino.definitions_['define_dht_']="#include <DHT_mini.h>";
  //else
  //  Blockly.Arduino.definitions_['define_dht_']="#include <DHT.h>";
  Blockly.Arduino.definitions_['define_dht_set_'+a]="DHT dht11_p"+a+"("+a+", DHT11);";
  Blockly.Arduino.setups_['setup_dht_'+a]="dht11_p"+a+".begin();";
  return["dht11_p"+a+"."+myType+"()",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_ws2812_neopixel_begin=function(){
  var a=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"TOTAL",Blockly.Arduino.ORDER_ATOMIC)||"0",
      d=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
      e=this.getFieldValue("PIXEL_FORMAT");
  Blockly.Arduino.ljj_basic[d+'_ws2812_brightness']=a;
	Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>";
  Blockly.Arduino.definitions_['define_ws2812_neopixel_'+d]='Adafruit_NeoPixel '+d+' = Adafruit_NeoPixel('+c+','+b+',NEO_'+e+' + NEO_KHZ800);\nuint32_t '+d+'_arr['+c+']={0};';
//  Blockly.Arduino.definitions_['ljj_ws2812_'+d+'_event']='void '+d+'SetAllLedsColor(uint32_t myLedColor)\n{\n  for(int i=0;i<'+c+';i++)\n    '+d+'.setPixelColor(i,myLedColor);\n  '+d+'.show();\n}\n';
  Blockly.Arduino.definitions_['ljj_ws2812_'+d+'_event']='void '+d+'SetAllLedsColor(uint32_t myLedColor)\n{\n  for(int i=0;i<'+c+';i++)\n    '+d+'_arr[i]=myLedColor;\n}\n\nvoid '+d+'ShowAllLedsColor()\n{\n  for(int i=0;i<'+c+';i++)\n    '+d+'.setPixelColor(i,'+d+'_arr[i]);\n  '+d+'.show();\n}\n\nvoid '+d+'FlowLedsColors(byte dir)\n{\n  uint32_t tempData=0;\n  if (dir==1){\n    tempData='+d+'_arr[0];\n    for(int i=0;i<'+(parseInt(c)-1)+';i++)\n      '+d+'_arr[i]='+d+'_arr[i+1];\n    '+d+'_arr['+(parseInt(c)-1)+']=tempData;\n  } else if (dir==2){\n    tempData='+d+'_arr['+(parseInt(c)-1)+'];\n    for(int i='+(parseInt(c)-1)+';i>0;i--)\n      '+d+'_arr[i]='+d+'_arr[i-1];\n    '+d+'_arr[0]=tempData;\n  }\n  '+d+'ShowAllLedsColor();\n}\n';
  Blockly.Arduino.setups_['setup_ws2812_neopixel_'+d]=''+d+'.begin();\n  '+d+'.setBrightness('+a+');\n  '+d+'.show();\n  '+d+'ShowAllLedsColor();';
  return"";
};

Blockly.Arduino.ljj_ws2812_neopixel_set_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"INDEX",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  b=b.replace('tft.color565',c+'.Color');
  return c+'_arr['+a+']='+b+';\n'+c+'.setPixelColor('+a+','+b+');\n';
};

Blockly.Arduino.ljj_ws2812_neopixel_show=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  return a+'.show();\n';
};

Blockly.Arduino.ljj_ws2812_neopixel_set_colors=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  a=a.replace('tft.color565',b+'.Color');
  return b+'SetAllLedsColor('+a+');\n'+b+'ShowAllLedsColor();\n';
};

Blockly.Arduino.ljj_ws2812_neopixel_current_color=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME),
      b=Blockly.Arduino.valueToCode(this,"INDEX",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return[a+'_arr['+b+']',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_ws2812_neopixel_brightness=function(){
  var a=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  Blockly.Arduino.ljj_basic[b+'_ws2812_brightness']=a;
  return b+'.setBrightness('+a+');\n'+b+'.show();\n';
};

Blockly.Arduino.ljj_ws2812_neopixel_clear=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  return a+'.clear();\n'+a+'.show();\n';
};

Blockly.Arduino.ljj_ws2812_neopixel_display=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  return a+'ShowAllLedsColor();\n';
};

Blockly.Arduino.ljj_ws2812_color_join=function(){
  var varName=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  var returnValue='';
  for(var a="",b=0;b<this.itemCount_;b++){
    var c=Blockly.Arduino.valueToCode(this,"ADD"+b,Blockly.Arduino.ORDER_COMMA);
    c=c.replace("tft.color565",varName+".Color");
    returnValue+=(varName+'_arr['+b+']='+c+';\n');
  }
  returnValue+=(varName+'ShowAllLedsColor();\n');
  return returnValue;
};

Blockly.Arduino.ljj_ws2812_color_flow=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME),
      b=this.getFieldValue("DIRECTION");
  return a+'FlowLedsColors('+b+');\n';
};

Blockly.Arduino.ljj_ws2812_color_next=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME),
      b=this.getFieldValue("DIRECTION"),
      c=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"INTERVAL",Blockly.Arduino.ORDER_ATOMIC)||"0";
  c=c.replace("tft.color565",a+".Color");
  Blockly.Arduino.definitions_['ljj_ws2812_next_'+a+'_color_event']='void '+a+'ChangeNextColor(uint32_t myLedColor,byte dir,uint8_t interval)\n{\n  int myLength=(sizeof('+a+'_arr)/sizeof('+a+'_arr[0]));\n  if (dir==2){\n    for(int i=0;i<myLength;i++){\n      '+a+'_arr[i]=myLedColor;\n      '+a+'.setPixelColor(i,myLedColor);\n      '+a+'.show();\n      delay(interval);\n    }\n  } else if (dir==1){\n    for(int i=(myLength-1);i>-1;i--){\n      '+a+'_arr[i]=myLedColor;\n      '+a+'.setPixelColor(i,myLedColor);\n      '+a+'.show();\n      delay(interval);\n    }\n  }\n}\n';
  return a+'ChangeNextColor('+c+','+b+','+d+');\n';
};

Blockly.Arduino.ljj_ws2812_2_colors_blink=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME),
      b=Blockly.Arduino.valueToCode(this,"COLOR1",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"COLOR2",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"INTERVAL",Blockly.Arduino.ORDER_ATOMIC)||"0";
  b=b.replace("tft.color565",a+".Color");
  c=c.replace("tft.color565",a+".Color");
  Blockly.Arduino.definitions_['ljj_ws2812_'+a+'_2color_blink_event']='void '+a+'ColorsBlink(uint32_t myLedColor1,uint32_t myLedColor2,uint8_t interval)\n{\n  int myLength=(sizeof('+a+'_arr)/sizeof('+a+'_arr[0]));\n  for(int i=0;i<myLength;i++){\n    if ((i%2)==0)\n      '+a+'_arr[i]=myLedColor1;\n    else\n      '+a+'_arr[i]=myLedColor2;\n    '+a+'.setPixelColor(i,'+a+'_arr[i]);\n  }\n  '+a+'.show();\n  delay(interval);\n}\n';
  return a+'ColorsBlink('+b+','+c+','+d+');\n'+a+'ColorsBlink('+c+','+b+','+d+');\n';
};

Blockly.Arduino.ljj_ws2812_breathe=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME),
      b=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"INTERVAL",Blockly.Arduino.ORDER_ATOMIC)||"0";
  b=b.replace("tft.color565",a+".Color");
  Blockly.Arduino.definitions_['ljj_ws2812_'+a+'_breathe_event']='void '+a+'Breathe(uint32_t myLedColor,uint8_t interval)\n{\n  '+a+'.clear();\n  '+a+'.show();\n  '+a+'.setBrightness(0);\n  '+a+'SetAllLedsColor(myLedColor);\n  '+a+'ShowAllLedsColor();\n  for(int i=0;i<255;i++){\n    '+a+'.setBrightness(i);\n    '+a+'.show();\n    if (i==1)\n      '+a+'ShowAllLedsColor();\n    delay(interval);\n  }\n  for(int i=255;i>-1;i--){\n    '+a+'.setBrightness(i);\n    '+a+'.show();\n    delay(interval);\n  }\n}\n';
  return a+'Breathe('+b+','+c+');\n'+a+'.setBrightness('+Blockly.Arduino.ljj_basic[a+'_ws2812_brightness']+');\n'
};

//MAX7219
Blockly.Arduino.ljj_max7219={};
Blockly.Arduino.ljj_max7219_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN_DIN",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"PIN_CS",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"PIN_CLK",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=Blockly.Arduino.valueToCode(this,"DEV_NUM",Blockly.Arduino.ORDER_ATOMIC)||"";
  Blockly.Arduino.definitions_.define_ljj_max7219_include="#include <MD_Parola.h>\n#include <MD_MAX72xx.h>\n#define HARDWARE_TYPE MD_MAX72XX::GENERIC_HW\n#define DEVICE_NUMBER "+d;
  Blockly.Arduino.definitions_.define_ljj_max7219_invoke='char *max7219Char;\nString max7219Str="";\nMD_Parola myDisplay = MD_Parola(HARDWARE_TYPE,'+a+','+c+','+b+',DEVICE_NUMBER);\nMD_MAX72XX mx = MD_MAX72XX(HARDWARE_TYPE,'+a+','+c+','+b+',DEVICE_NUMBER);\n';
  Blockly.Arduino.setups_["ljj_max7219"]='myDisplay.begin();\n  myDisplay.displayClear();\n  mx.begin();';
	return''
};

Blockly.Arduino.ljj_max7219_clear=function(){
  return 'myDisplay.displayClear();\nmx.clear();\n';
}

Blockly.Arduino.ljj_max7219_setpoint=function(){
  var b=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_ATOMIC)||"",
      a=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=this.getFieldValue("PLOT_TYPE");
  b='8*DEVICE_NUMBER-1-'+b;
  if (c=='toggle'){
    return 'mx.setPoint('+a+', '+b+',!mx.getPoint('+a+','+b+'));\n';
  } else {
    return 'mx.setPoint('+a+', '+b+', '+c+');\n';
  }
}

Blockly.Arduino.ljj_max7219_getpoint=function(){
  var b=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_ATOMIC)||"",
      a=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_ATOMIC)||"";
  b='8*DEVICE_NUMBER-1-'+b;
  return['mx.getPoint('+a+','+b+')',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ljj_max7219_bitmap=function(){
  var a=this.getFieldValue("DEV_INDEX"),
      swapStr="",
      allSwapStr="";
  for(tempX=0;tempX<8;tempX++){
    for(tempY=0;tempY<8;tempY++){
      if (this.getFieldValue("L"+tempX+tempY) == 'TRUE')
        swapStr+="1";
      else
        swapStr+="0";
    }
    allSwapStr+=('  myBitmap_max7219['+tempX+']=B'+swapStr+';\n');
    swapStr="";
  }
  Blockly.Arduino.definitions_.define_ljj_5012_max7219_invoke='uint8_t myBitmap_max7219[8] ={0};';
  returnStr='for(int i=0;i<8;i++){\n'+allSwapStr+'}\nmx.setBuffer((DEVICE_NUMBER-'+a+')*8-1, 8, myBitmap_max7219);\n';
  return returnStr;
}

Blockly.Arduino.ljj_max7219_inverse=function(){
  var a=this.getFieldValue("INVERSE_TYPE");
  return'myDisplay.setInvert('+a+');\n'
}

Blockly.Arduino.ljj_max7219_print=function(){
  var a=Blockly.Arduino.valueToCode(this,"TEXT",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("POSITION_TYPE");
  //return'max7219Str='+a+';\nmax7219Char = new char [max7219Str.length()+1];\nstrcpy (max7219Char, max7219Str.c_str());\nmyDisplay.begin();\nmyDisplay.displayText(max7219Char,'+b+',0,0,PA_NO_EFFECT,PA_NO_EFFECT);\nif (myDisplay.displayAnimate()) {myDisplay.displayReset();}\n';
  return'myDisplay.print(String('+a+'));\n';
}

Blockly.Arduino.ljj_max7219_scroll=function(){
  var a=Blockly.Arduino.valueToCode(this,"TEXT",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=this.getFieldValue("POSITION_TYPE"),
      c=this.getFieldValue("EFFECT_TYPE"),
      d=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return'max7219Str='+a+';\nmax7219Char = new char [max7219Str.length()+1];\nstrcpy (max7219Char, max7219Str.c_str());\nmyDisplay.begin();\nmyDisplay.displayScroll(max7219Char,'+b+','+c+','+d+');\n'
}

Blockly.Arduino.ljj_max7219_animate=function(){
  return'if (myDisplay.displayAnimate()) {myDisplay.displayReset();}\n';
}

Blockly.Arduino.ljj_max7219_animate_stop=function(){
  return'myDisplay.displaySuspend(true);\n';
}

Blockly.Arduino.ljj_max7219_begin=function(){
  return'myDisplay.begin();\n';
}

//NKNU5012
Blockly.Arduino.ljj_5012_sonar=function(){
  Blockly.Arduino.definitions_.define_ljj_5012_sonar_include="#include <Ultrasonic.h>";
  Blockly.Arduino.definitions_.define_ljj_5012_sonar_invoke="Ultrasonic ultrasonic_(A2, A3);";
  return['ultrasonic_.convert(ultrasonic_.timing(), Ultrasonic::CM)',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_5012_dht11=function(){
  var a=this.getFieldValue("PIN"),
      b=this.getFieldValue("DHT11_TYPE"),
      myType='';
  if (b=='temperature')
    myType='readTemperature';
  else if (b=='humidity')
    myType='readHumidity';
  Blockly.Arduino.definitions_['define_dht_']="#include <DHT_mini.h>";
  Blockly.Arduino.definitions_['define_dht_set_'+a]="DHT dht11_p"+a+"("+a+", DHT11);";
  Blockly.Arduino.setups_["setup_dht_"+a]="dht11_p"+a+".begin();";
  return["dht11_p"+a+"."+myType+"()",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_5012_hall=function(){
  return['analogRead(A6)',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_5012_bh1750=function(){
  Blockly.Arduino.definitions_.define_bh1750_include='#include <BH1750.h>\n#include <Wire.h>';
  Blockly.Arduino.definitions_.define_bh1750_invoke='BH1750 lightMeter;';
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();\n  lightMeter.begin();";
  return['lightMeter.readLightLevel()',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_5012_fan=function(){
  var a=Blockly.Arduino.valueToCode(this,"ON_OFF",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=13;
  Blockly.Arduino.setups_.setup_ljj_5012_fan="pinMode("+b+", OUTPUT);";
  return"digitalWrite("+b+", "+a+");\n";
};

Blockly.Arduino.ljj_5012_servo_write_pin=function(){
  var a=6,
  b=Blockly.Arduino.valueToCode(this,"ANGLE",Blockly.Arduino.ORDER_ATOMIC)||"90";
  Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";
  Blockly.Arduino.definitions_["define_class_servo_"+a]="Servo __myservo"+a+";";
  Blockly.Arduino.setups_["servo_"+a]||(Blockly.Arduino.setups_["servo_"+a]="__myservo"+a+".attach("+a+");");
  return"__myservo"+a+".write("+b+");\n"
};

Blockly.Arduino.ljj_5012_stickXY=function(){
  var a=this.getFieldValue("XY_TYPE");
  return['analogRead('+a+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_5012_stickButton=function(){
  var a=7,
      b=this.getFieldValue("PIN_MODE"),
      c=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL_PRESSED"),
      d=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL_RELEASED")
  Blockly.Arduino.setups_["button_"+a]='pinMode('+a+', INPUT);';
	return'if (digitalRead('+a+')=='+b+'){\n'+c+'  while(digitalRead('+a+')=='+b+'){}\n'+d+'}\n'
};

Blockly.Arduino.ljj_5012_tone=function(){
  var a=this.getFieldValue("FREQ");
  Blockly.Arduino.definitions_.define_ljj_quno_tone_invoke="byte buzz_pin=8;";
  return"tone(buzz_pin, "+a+");\n";
};

Blockly.Arduino.ljj_5012_no_tone=function(){
  Blockly.Arduino.definitions_.define_ljj_quno_tone_invoke="byte buzz_pin=8;";
  return"noTone(buzz_pin);\n";
};

Blockly.Arduino.ljj_5012_custom_tone=function(){
  var a=Blockly.Arduino.valueToCode(this,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"DURATION",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_ljj_quno_tone_invoke="byte buzz_pin=8;";
  return"tone(buzz_pin, "+a+");\ndelay("+b+");\nnoTone(buzz_pin);\n";
};

Blockly.Arduino.ljj_tone_list=function(){
  var a=this.getFieldValue("FREQ");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_5012_max7219=function(){
  var a=12,
      b=10,
      c=11,
      d=1;
  Blockly.Arduino.definitions_.define_ljj_max7219_include="#include <MD_Parola.h>\n#include <MD_MAX72xx.h>\n#define HARDWARE_TYPE MD_MAX72XX::GENERIC_HW\n#define DEVICE_NUMBER "+d;
  Blockly.Arduino.definitions_.define_ljj_max7219_invoke='char *max7219Char;\nString max7219Str="";\nMD_Parola myDisplay = MD_Parola(HARDWARE_TYPE,'+a+','+c+','+b+',DEVICE_NUMBER);\nMD_MAX72XX mx = MD_MAX72XX(HARDWARE_TYPE,'+a+','+c+','+b+',DEVICE_NUMBER);\n';
  Blockly.Arduino.setups_["ljj_max7219"]='myDisplay.begin();\n  myDisplay.displayClear();\n  mx.begin();';
	return''
};

Blockly.Arduino.ljj_5012_max7219_bitmap=function(){
  var a="0",
      swapStr="",
      allSwapStr="";
  for(tempX=0;tempX<8;tempX++){
    for(tempY=0;tempY<8;tempY++){
      if (this.getFieldValue("L"+tempX+tempY) == 'TRUE')
        swapStr+="1";
      else
        swapStr+="0";
    }
    allSwapStr+=('  myBitmap_max7219['+tempX+']=B'+swapStr+';\n');
    swapStr="";
  }
  Blockly.Arduino.definitions_.define_ljj_5012_max7219_invoke='uint8_t myBitmap_max7219[8] ={0};';
  returnStr='for(int i=0;i<8;i++){\n'+allSwapStr+'}\nmx.setBuffer(7, 8, myBitmap_max7219);\n';
  return returnStr;
}

Blockly.Arduino.ljj_5012_neopixel_begin=function(){
  var a=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"0";
	  Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>";
    Blockly.Arduino.definitions_.define_plus_neopixel='Adafruit_NeoPixel nknuPixels = Adafruit_NeoPixel(8,4,NEO_GRB + NEO_KHZ800);\n';
    Blockly.Arduino.setups_.setup_plus_neopixel="nknuPixels.begin();\n  nknuPixels.setBrightness("+a+");\n  nknuPixels.show();\n  nknuPixels.setPixelColor(0,nknuPixels.Color(0,0,0));\n  nknuPixels.setPixelColor(1,nknuPixels.Color(0,0,0));\n  nknuPixels.setPixelColor(2,nknuPixels.Color(0,0,0));\n  nknuPixels.show();";
  return"";
};

Blockly.Arduino.ljj_5012_neopixel_set_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"INDEX",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  b=b.replace("tft.color565","nknuPixels.Color");
  return"nknuPixels.setPixelColor("+a+","+b+");\n";
};

Blockly.Arduino.ljj_5012_neopixel_show=function(){
  return"nknuPixels.show();\n";

};

Blockly.Arduino.ljj_5012_neopixel_set_colors=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace("tft.color565","nknuPixels.Color");
  return"nknuPixels.setPixelColor(0,"+a+");\nnknuPixels.setPixelColor(1,"+a+");\nnknuPixels.setPixelColor(2,"+a+");\nnknuPixels.setPixelColor(3,"+a+");\nnknuPixels.show();\n";
};

Blockly.Arduino.ljj_5012_l9110_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"M1A",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"M1B",Blockly.Arduino.ORDER_ATOMIC)||"0",
      e=this.getFieldValue("PIN_TYPE");
  if (e=="A"){
    a=3;
    b=5;
  } else if (e=="B"){
    a=2;
    b=3;
  }
  Blockly.Arduino.definitions_.define_ljj_5012_L9110_invoke='byte mA_1A='+a+';\nbyte mA_1B='+b+';\n';
  Blockly.Arduino.setups_["setup_ljj_L9110"]='pinMode(mA_1A,OUTPUT);\n  pinMode(mA_1B,OUTPUT);\n';
  return'';
}

Blockly.Arduino.ljj_5012_l9110_run=function(){
  var b=this.getFieldValue("DIR"),
      c=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0",
      returnValue="";
  if (b=="1")
    returnValue='digitalWrite(mA_1A,1);\nanalogWrite(mA_1B,255-'+c+');\n';
  else
    returnValue='digitalWrite(mA_1A,0);\nanalogWrite(mA_1B,'+c+');\n';
  return returnValue;
}

Blockly.Arduino.ljj_5012_l9110_stop=function(){
  return'digitalWrite(mA_1A,0);\nanalogWrite(mA_1B,0);\n';
}

//PixelBit
Blockly.Arduino.ljj_pixelbit={};
Blockly.Arduino.ljj_pixelbit_button=function(){
  var a=this.getFieldValue("AB_BUTTON"),
      b="LOW",
      c=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL_PRESSED"),
      d=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL_RELEASED")
  Blockly.Arduino.setups_["button_"+a]='pinMode('+a+', INPUT_PULLUP);';
	return'if (digitalRead('+a+')=='+b+'){\n'+c+'  while(digitalRead('+a+')=='+b+'){}\n'+d+'}\n'
};

Blockly.Arduino.ljj_pixelbit_arduino_pins=function(){
  var a=this.getFieldValue("ARDUINO_PIN");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_pixelbit_microbit_pins=function(){
  var a=this.getFieldValue("ARDUINO_PIN");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};

function getBoardFullName() {
	var sel = document.getElementById('board-selector');
  if(sel.value) 
    return sel.value;
  else
    return "";
}

function getBoardShortName() {
	var sel = document.getElementById('board-selector');
	if (sel.value)
		return sel.value.split(":")[0];
	else
		return "";
}

//ESP_NOW
Blockly.Arduino.ljj_broadcast={};
Blockly.Arduino.ljj_broadcast_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"CHANNEL",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP32"){
	  Blockly.Arduino.definitions_.define_ljj_broadcast_include="#include <esp_now.h>\n#include <WiFi.h>\n#include <esp_wifi.h>"
    Blockly.Arduino.definitions_.define_ljj_broadcast_invoke='#define PRINTSCANRESULTS 0\n#define DELETEBEFOREPAIR 0\n\nesp_now_peer_info_t slave;\nString recBroadcastStr="";\nboolean receivedBroadcast=false;\nuint8_t broadcastChannel=1;\nchar sourceMacChar[18]={\0};\nchar selfMacChar[18]={\0};';
    Blockly.Arduino.definitions_.define_ljj_broadcast_event='void InitESPNow() {\n  if (esp_now_init() == ESP_OK) {\n    Serial.println("ESPNow Init Success");\n  }\n  else {\n    Serial.println("ESPNow Init Failed");\n    ESP.restart();\n  }\n}\n\nvoid initBroadcastSlave() {\n  memset(&slave, 0, sizeof(slave));\n  for (int ii = 0; ii < 6; ++ii)\n    slave.peer_addr[ii] = (uint8_t)0xff;\n  slave.channel = broadcastChannel;\n  slave.encrypt = 0;\n  manageSlave();\n}\n\nbool manageSlave() {\n  if (slave.channel == broadcastChannel) {\n    if (DELETEBEFOREPAIR) {\n      deletePeer();\n    }\n    const esp_now_peer_info_t *peer = &slave;\n    const uint8_t *peer_addr = slave.peer_addr;\n    bool exists = esp_now_is_peer_exist(peer_addr);\n    if (exists) {\n      return true;\n    }\n    else {\n      esp_err_t addStatus = esp_now_add_peer(peer);\n      if (addStatus == ESP_OK) {\n        return true;\n     }\n      else if (addStatus == ESP_ERR_ESPNOW_NOT_INIT) {\n        return false;\n      }\n      else if (addStatus == ESP_ERR_ESPNOW_ARG) {\n        return false;\n     }\n      else if (addStatus == ESP_ERR_ESPNOW_FULL) {\n        return false;\n      }\n      else if (addStatus == ESP_ERR_ESPNOW_NO_MEM) {\n        return false;\n      }\n      else if (addStatus == ESP_ERR_ESPNOW_EXIST) {\n        return true;\n      }\n      else {\n        return false;\n      }\n   }\n  }\n  else {\n    return false;\n  }\n}\n\nvoid deletePeer() {\n  const esp_now_peer_info_t *peer = &slave;\n  const uint8_t *peer_addr = slave.peer_addr;\n  esp_err_t delStatus = esp_now_del_peer(peer_addr);\n}\n\nvoid sendBroadcastData(String broadcastSendStr) {\n  const char* tempChar=broadcastSendStr.c_str();\n  uint8_t dataToSend[broadcastSendStr.length()+1];\n  memcpy(dataToSend, tempChar, broadcastSendStr.length()+1);\n  const uint8_t *peer_addr = slave.peer_addr;\n  Serial.print("Sending: "); Serial.println((const char*)dataToSend);\n  esp_err_t result = esp_now_send(peer_addr, dataToSend, broadcastSendStr.length()+1);\n}\n\nvoid onBroadcastDataRecv(const uint8_t *mac_addr, const uint8_t *data, int data_len){\n  snprintf(sourceMacChar, sizeof(sourceMacChar),"%02x:%02x:%02x:%02x:%02x:%02x",mac_addr[0], mac_addr[1], mac_addr[2], mac_addr[3], mac_addr[4], mac_addr[5]);\n  recBroadcastStr=String((const char*)data);\n  receivedBroadcast=true;\n}\n\nvoid getMyMacAddr(){\n  uint8_t mac_addr[6];\n  WiFi.macAddress(mac_addr);\n  snprintf(selfMacChar, sizeof(selfMacChar),"%02x:%02x:%02x:%02x:%02x:%02x",mac_addr[0], mac_addr[1], mac_addr[2], mac_addr[3], mac_addr[4], mac_addr[5]);\n}\n\n';
    //Blockly.Arduino.setups_["ljj_broadcast"]='broadcastChannel='+a+';\n  WiFi.mode(WIFI_STA);\n  InitESPNow();\n  esp_wifi_set_promiscuous(true);\n  esp_wifi_set_channel(broadcastChannel, WIFI_SECOND_CHAN_NONE);\n  esp_wifi_set_promiscuous(false);\n  esp_now_register_recv_cb(onBroadcastDataRecv);\n  initBroadcastSlave();\n  getMyMacAddr();\n';
    return'broadcastChannel='+a+';\nWiFi.mode(WIFI_STA);\nInitESPNow();\nesp_wifi_set_promiscuous(true);\nesp_wifi_set_channel(broadcastChannel, WIFI_SECOND_CHAN_NONE);\nesp_wifi_set_promiscuous(false);\nesp_now_register_recv_cb(onBroadcastDataRecv);\ninitBroadcastSlave();\ngetMyMacAddr();\n';
  } else
    return"";
};

Blockly.Arduino.ljj_broadcast_get_channel=function(){
  return["WiFi.channel()",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_broadcast_sendData=function(){
  var a=Blockly.Arduino.valueToCode(this,"MSG",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    return'sendBroadcastData(String('+a+'));\n';
  } else {
    return"";
  }
};

Blockly.Arduino.ljj_broadcast_on_receive=function(){
  var a=Blockly.Arduino.statementToCode(this,"STATEMENT_RECEIVE");
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_ljj_broadcast_receive_event='void myCheckEspNow(){\n'+a+'}\n\nvoid checkBroadcastEspNow(){\n  if (receivedBroadcast){\n    myCheckEspNow();\n    receivedBroadcast=false;\n  }\n}\n';
    Blockly.Arduino.loops_.ljj_broadcast_loop="checkBroadcastEspNow();\n";
  }
  return'';
};

Blockly.Arduino.ljj_broadcast_msg=function(){
  return["recBroadcastStr",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_broadcast_source_mac=function(){
  return["sourceMacChar",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ljj_broadcast_self_mac=function(){
  return["selfMacChar",Blockly.Arduino.ORDER_ATOMIC];
};

//Pico setup
Blockly.Arduino.ljj_pico_setup={};
Blockly.Arduino.ljj_pico_i2c_reset=function(){
  var a=Blockly.Arduino.valueToCode(this,"SDA",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"SCL",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=this.getFieldValue("WIRE_LIST");
  if (Blockly.Arduino.my_board_type=="Pico"){
    Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
    Blockly.Arduino.setups_.setup_wire_lib=c+'.setSDA('+a+');\n  '+c+'.setSCL('+b+');';
  }
  return'';
}

//Pico Dual Core
Blockly.Arduino.ljj_pico_dual_core={};
Blockly.Arduino.ljj_pico_core1_task=function(){
  var b=Blockly.Arduino.statementToCode(this,"setup1"),
      c=Blockly.Arduino.statementToCode(this,"loop1");
  if (Blockly.Arduino.my_board_type=="Pico")
  Blockly.Arduino.definitions_["define_ljj_pico_dual_core_1_event"]="void setup1(){\n"+b+"}\n\nvoid loop1(){\n"+c+"}\n";
  return'';
}

Blockly.Arduino.ljj_pico_core_idle=function(){
  if (Blockly.Arduino.my_board_type=="Pico")
    return'rp2040.idleOtherCore();\n';
  else
    return'';
}

Blockly.Arduino.ljj_pico_core_resume=function(){
  if (Blockly.Arduino.my_board_type=="Pico")
    return'rp2040.resumeOtherCore();\n';
  else
    return'';
}

Blockly.Arduino.ljj_pico_core1_restart=function(){
  if (Blockly.Arduino.my_board_type=="Pico")
    return'rp2040.restartCore1();\n';
  else
    return'';
}

//Pico:bit
Blockly.Arduino.ljj_picobit={};
Blockly.Arduino.ljj_picobit_button=function(){
    var a=this.getFieldValue("AB_BUTTON"),
	    b=Blockly.Arduino.statementToCode(this,"MSG_BUTTON_CALL");
	  b=b.replace(/\n/g,'\n  ');
    Blockly.Arduino.definitions_.define_m_button="char myBtnStatus;\nbool buttonPressed(char btnName)\n{\n  byte A_Pin=2;\n  byte B_Pin=20;\n  if (btnName=='A'){\n    if (digitalRead(A_Pin) == 1)\n      return false;\n    else\n      return true;\n  }\n  else if (btnName=='B'){\n    if (digitalRead(B_Pin) == 1)\n      return false;\n    else\n      return true;\n  } else {\n    if ((digitalRead(A_Pin) == 1) && (digitalRead(B_Pin) == 1))\n      return false;\n    else\n      return true;\n  }\n}\n"
    Blockly.Arduino.definitions_.define_m_getBtnStatus="char getBtnStatus(){\n  char buttonStatus=' ';\n  int checkButtonDelay=200;\n  if (buttonPressed('A')){\n    delay(checkButtonDelay);\n    if (buttonPressed('A')){\n      buttonStatus='A';\n      if (buttonPressed('B'))\n        buttonStatus='C';\n    }\n  } else if (buttonPressed('B')){\n      delay(checkButtonDelay);\n      if (buttonPressed('B')){\n        buttonStatus='B';\n        if (buttonPressed('A'))\n          buttonStatus='C';\n      }\n  }\n  return buttonStatus;\n}\n";
    Blockly.Arduino.setups_.setup_button='pinMode(2, INPUT_PULLUP);\n  pinMode(20, INPUT_PULLUP);\n';
	  return"if (myBtnStatus=='"+a+"'){\n"+b+"  while(buttonPressed('"+a+"')){}\n}\n"
};

Blockly.Arduino.ljj_picobit_pinMap=function(){
  var a=this.getFieldValue("PICO_BIT_PIN");
  return[a,Blockly.Arduino.ORDER_ATOMIC];
};


//WiFi extra
Blockly.Arduino.linkit_wifi_check_conncetion=function(){
  return["(WiFi.status() != WL_CONNECTED)",Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.linkit_wifi_reconnect=function(){
  if (Blockly.Arduino.my_board_type=="7697")
    return"WiFi.disconnect();\nwhile (WiFi.begin(_lwifi_ssid, _lwifi_pass) != WL_CONNECTED) { delay(1000); }\n";
  else if ((Blockly.Arduino.my_board_type=="ESP32") || (Blockly.Arduino.my_board_type=="Pico"))
    return"WiFi.disconnect();\nWiFi.softAPdisconnect(true);\nWiFi.mode(WIFI_STA);\nWiFi.begin(_lwifi_ssid, _lwifi_pass);\nwhile (WiFi.status() != WL_CONNECTED) { delay(500); }\ndelay(300);\n";
  else if (Blockly.Arduino.my_board_type=="ESP8266")
    return"WiFi.disconnect();\nWiFi.begin(_lwifi_ssid, _lwifi_pass);\nwhile (WiFi.status() != WL_CONNECTED) { delay(500); }\ndelay(300);\n";
  else
    return'';
};

//HX711
Blockly.Arduino.ljj_hx711={};
Blockly.Arduino.ljj_hx711_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"DATA_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"SCK_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_ljj_hx711_include="#include \"HX711.h\"";
  Blockly.Arduino.definitions_.define_ljj_hx711_invoke="HX711 loadCell;\nfloat scale_factor;";
  return'loadCell.begin('+a+', '+b+');\n';
};

Blockly.Arduino.ljj_hx711_set_scale=function(){
  var a=Blockly.Arduino.valueToCode(this,"SCALE",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (a=="0")
    return"loadCell.set_scale();\n";
  else
    return'loadCell.set_scale('+a+');\n';
}

Blockly.Arduino.ljj_hx711_tare=function(){
  return'loadCell.tare();\n';
}

Blockly.Arduino.ljj_hx711_get_units=function(){
  var a=Blockly.Arduino.valueToCode(this,"AVERAGE_TIMES",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return['loadCell.get_units('+a+')',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ljj_hx711_power=function(){
  var a=this.getFieldValue("POWER");
  return'loadCell.power_'+a+'();\n';
}

Blockly.Arduino.ljj_2023_init=function(){
  return'';
}

Blockly.Arduino.ljj_2023_loop=function(){
  return'';
}

Blockly.Arduino.ljj_2023_who=function(){
  return["",Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ljj_2023_what=function(){
  return["",Blockly.Arduino.ORDER_ATOMIC];
}

//IFTTT
Blockly.Arduino.ljj_ifttt={};
Blockly.Arduino.ljj_ifttt_webhook=function(){
  var a=Blockly.Arduino.valueToCode(this,"EVENT",Blockly.Arduino.ORDER_ATOMIC)||'"event"',
      b=Blockly.Arduino.valueToCode(this,"KEY",Blockly.Arduino.ORDER_ATOMIC)||'"---"',
      c=Blockly.Arduino.valueToCode(this,"VALUE1",Blockly.Arduino.ORDER_ATOMIC)||"0",
      d=Blockly.Arduino.valueToCode(this,"VALUE2",Blockly.Arduino.ORDER_ATOMIC)||"0",
      e=Blockly.Arduino.valueToCode(this,"VALUE3",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_ifttt_invoke='\nvoid invokeIFTTT(const String& key, const String& event, const String& p1, const String& p2, const String& p3)\n{\n  // Initialize the Ethernet client library\n  // with the IP address and port of the server\n  // that you want to connect to (port 80 is default for HTTP):\n  static TLSClient client;\n\n  // This is the root certificate(CA) for https://maker.ifttt.com/\n  // Different host server may use different root CA.\n  static const char rootCA[] = "-----BEGIN CERTIFICATE-----\\r\\n"\n  "MIIFJjCCBA6gAwIBAgIIRJxbLJxAihkwDQYJKoZIhvcNAQELBQAwgbQxCzAJBgNV\\r\\n"\n  "BAYTAlVTMRAwDgYDVQQIEwdBcml6b25hMRMwEQYDVQQHEwpTY290dHNkYWxlMRow\\r\\n"\n  "GAYDVQQKExFHb0RhZGR5LmNvbSwgSW5jLjEtMCsGA1UECxMkaHR0cDovL2NlcnRz\\r\\n"\n  "LmdvZGFkZHkuY29tL3JlcG9zaXRvcnkvMTMwMQYDVQQDEypHbyBEYWRkeSBTZWN1\\r\\n"\n  "cmUgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IC0gRzIwHhcNMTYwNzI1MTc0NTM4WhcN\\r\\n"\n  "MTgwOTI4MjIxMzU0WjA5MSEwHwYDVQQLExhEb21haW4gQ29udHJvbCBWYWxpZGF0\\r\\n"\n  "ZWQxFDASBgNVBAMMCyouaWZ0dHQuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A\\r\\n"\n  "MIIBCgKCAQEA8c1HRaRBFWER/SG2eXN++ykWLSoCyJ1xcxOXy15Bk57WXGLIBZHn\\r\\n"\n  "Y8/SN+H1KuUcN40KC35NuGhaQP43cELcBSG/BiYTlFPIAizauX2K9VZh+zWhwkgq\\r\\n"\n  "y8bJ5+yvZKH5gwqNL248Y4gjwaPeU8o2K1xrFYWSfM/7kFQFul2goWOA3HIn5qE3\\r\\n"\n  "NUsgxF8uLh2BSuJKQF73WDvM1zE86MIU20M9+PEo/pV5orIPZX/54cAZgXnr+59t\\r\\n"\n  "KPL14Rl9qqTiptMJC8y2CIqKC9zHBwIwX4uYPOquom1oqAuItWgqAJwtC3z5a20r\\r\\n"\n  "wbI2eNbDPdbeweT/4RtCjTwKlQuHmzeLbwIDAQABo4IBtDCCAbAwDAYDVR0TAQH/\\r\\n"\n  "BAIwADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDgYDVR0PAQH/BAQD\\r\\n"\n  "AgWgMDcGA1UdHwQwMC4wLKAqoCiGJmh0dHA6Ly9jcmwuZ29kYWRkeS5jb20vZ2Rp\\r\\n"\n  "ZzJzMS0yNzMuY3JsMF0GA1UdIARWMFQwSAYLYIZIAYb9bQEHFwEwOTA3BggrBgEF\\r\\n"\n  "BQcCARYraHR0cDovL2NlcnRpZmljYXRlcy5nb2RhZGR5LmNvbS9yZXBvc2l0b3J5\\r\\n"\n  "LzAIBgZngQwBAgEwdgYIKwYBBQUHAQEEajBoMCQGCCsGAQUFBzABhhhodHRwOi8v\\r\\n"\n  "b2NzcC5nb2RhZGR5LmNvbS8wQAYIKwYBBQUHMAKGNGh0dHA6Ly9jZXJ0aWZpY2F0\\r\\n"\n  "ZXMuZ29kYWRkeS5jb20vcmVwb3NpdG9yeS9nZGlnMi5jcnQwHwYDVR0jBBgwFoAU\\r\\n"\n  "QMK9J47MNIMwojPX+2yz8LQsgM4wIQYDVR0RBBowGIILKi5pZnR0dC5jb22CCWlm\\r\\n"\n  "dHR0LmNvbTAdBgNVHQ4EFgQUTv/uQ1GFjIW3WdcM3sn8fwtzoKQwDQYJKoZIhvcN\\r\\n"\n  "AQELBQADggEBAA0L5s4DXdeyx2rsVKljSq7CsDUbl1w8AgyxO0o1JAdYoPwZOlUT\\r\\n"\n  "Yl6xL+jYtlgdINAOi/SDsEXtTQSMNb6xrGN0AfPgCRlKEBSEIluiRQc97H/AOmwp\\r\\n"\n  "6HVeMQm/BVdQtp+i9MauwKJclB7ljReS0vlqMfk5FnlD3AT9eT61HUGcBVuyR37p\\r\\n"\n  "vbHP2yRg+5uZnw5BqUOL1Y0asuK0vqlizllpRxikq9kMKsR8KaesRyHkVX/FAC9u\\r\\n"\n  "uxxYke0T3f+dGlGzxm/ly6g5gQVbjdZGeoNma8qXjJ9o5BhZuAll7SajSLiXWERu\\r\\n"\n  "n4PtYxVA4KsvJNDabHea1zF3pGyKzv7HAUc=\\r\\n"\n  "-----END CERTIFICATE-----\\r\\n";\n\n  // We must set root CA before connecting to host\n  // Note that the lenght includes the terminating NULL,\n  // so use sizeof() instead of strlen().\n  client.setRootCA(rootCA, sizeof(rootCA));\n  if (client.connect("maker.ifttt.com", 443)) {\n      // Make a HTTP request over SSL (HTTPS)\n\n      const String payload = String() + "{\\"value1\\":\\"" + p1\n                        + "\\",\\"value2\\":\\"" + p2\n                        + "\\",\\"value3\\":\\"" + p3\n                        + "\\"}";\n\n      const String url = String() + "https://maker.ifttt.com/trigger/" + event + "/with/key/" + key;\n\n      client.println(String() + "POST " + url + " HTTP/1.1");\n      client.println("Host: maker.ifttt.com");\n      client.println("User-Agent: BlocklyDuino/1.0");\n      client.println("Content-Type: application/json;charset=utf-8");\n      client.print("Content-Length: ");\n      client.println(payload.length());\n      client.println("User-Agent: BlocklyDuino/1.0");\n      client.println("Accept: */*");\n      client.println("Connection: close");\n\n      client.println();\n      client.print(payload);\n\n      client.println();\n      delay(300);\n  } else {\n    // Serial.println("failed to connect to IFTTT");\n  }\n\n  // wait for server response\n  // if there are incoming bytes available\n  // from the server, read them and print them:\n  while (client.available()) {\n      char c = client.read();\n      // Serial.print(c);\n      delay(1);\n  }\n\n  // if the server\'s disconnected, stop the client:\n  if (!client.connected()) {\n      //Serial.println();\n      //Serial.println("disconnecting from server passively.");\n      client.stop();\n  } else {\n    // otherwise we actively stop the connection. we\'ll reconnect next time.\n    //Serial.println("disconnecting from server.");\n    client.stop();\n  }\n}  \n';
  } else {
    Blockly.Arduino.definitions_.define_HTTPCLIENT_include='#include <HTTPClient.h>';
    Blockly.Arduino.definitions_.define_ifttt_invoke='void invokeIFTTT(const String& key, const String& event, const String& p1, const String& p2, const String& p3)\n{\n  static HTTPClient client;\n  client.begin("http://maker.ifttt.com/trigger/"+event+"/with/key/"+key);\n  client.addHeader("Content-Type", "application/json");\n  const String payload = String() + "{\\"value1\\":\\"" + p1\n                        + "\\",\\"value2\\":\\"" + p2\n                        + "\\",\\"value3\\":\\"" + p3\n                        + "\\"}";\n  int postCode=client.POST(payload);\n  client.end();\n}\n';
  }
	return"invokeIFTTT("+[b,a,"String("+c+")","String("+d+")","String("+e+")"].join(", ")+");\n"
};

//WuKong
Blockly.Arduino.ljj_wukong={};

Blockly.Arduino.ljj_wukong_i2c_reset=function(){
  var b=this.getFieldValue("CARD_TYPE");
      b=b.replace("_1","");
  if (b=="5_9"){
    if (Blockly.Arduino.my_board_type=="ESP32")
      b=b.substring(0,1);
    else if (Blockly.Arduino.my_board_type=="Pico")
      b=b.substring(2,3);
  }
  Blockly.Arduino.ljj_wukong.ws2812_pin=b;
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  if ((Blockly.Arduino.my_board_type=="Pico") && (b=="9"))
    Blockly.Arduino.setups_.setup_wire_lib_before="Wire.setSDA(20);\n  Wire.setSCL(21);";
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  return'';
};


Blockly.Arduino.ljj_wukong_motor_move=function(){
  var a=this.getFieldValue("STAT1"),
      b=this.getFieldValue("STAT2"),
      c=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  Blockly.Arduino.definitions_.define_ljj_wukong_motor_run='void wukongMotorRun(byte addr,byte motor, byte dir ,byte power){\n  Wire.setClock(100000);\n  byte myParams[]={motor,dir,power,0};\n  Wire.beginTransmission(addr);\n  Wire.write(myParams,4);\n  Wire.endTransmission();\n}'; 
  if (a == "all") {
     return'wukongMotorRun(0x10,0x01,'+b+','+c+');\nwukongMotorRun(0x10,0x02,'+b+','+c+');\n'
  } else {
     return'wukongMotorRun(0x10,'+a+','+b+','+c+');\n'
  }
};

Blockly.Arduino.ljj_wukong_motor_stop=function(){
  var a=this.getFieldValue("STAT1");
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  Blockly.Arduino.definitions_.define_ljj_wukong_motor_run='void wukongMotorRun(byte addr,byte motor, byte dir ,byte power){\n  Wire.setClock(100000);\n  byte myParams[]={motor,dir,power,0};\n  Wire.beginTransmission(addr);\n  Wire.write(myParams,4);\n  Wire.endTransmission();\n}'; 
  if (a == "all") {
     return'wukongMotorRun(0x10,0x01,0x01,0);\nwukongMotorRun(0x10,0x02,0x01,0);\n'
  } else {
     return'wukongMotorRun(0x10,'+a+',0x01,0);\n'
  }
};

Blockly.Arduino.ljj_wukong_servo180=function(){
  var a=Blockly.Arduino.valueToCode(this,"ANGLE",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=this.getFieldValue("PIN");
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  Blockly.Arduino.definitions_.define_ljj_wukong_motor_run='void wukongMotorRun(byte addr,byte motor, byte dir ,byte power){\n  Wire.setClock(100000);\n  byte myParams[]={motor,dir,power,0};\n  Wire.beginTransmission(addr);\n  Wire.write(myParams,4);\n  Wire.endTransmission();\n}'; 
  return'wukongMotorRun(0x10,'+b+','+a+',0);\n'
};

Blockly.Arduino.ljj_wukong_servo360=function(){
  var a=this.getFieldValue("DIR"),
      b=this.getFieldValue("PIN"),
      c=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  var speed='90';
  if (a=='0')
    speed='(90-'+c+')';
  else if (a=='180')
    speed='('+c+'+90)';
  Blockly.Arduino.definitions_.define_ljj_wukong_motor_run='void wukongMotorRun(byte addr,byte motor, byte dir ,byte power){\n  Wire.setClock(100000);\n  byte myParams[]={motor,dir,power,0};\n  Wire.beginTransmission(addr);\n  Wire.write(myParams,4);\n  Wire.endTransmission();\n}'; 
  return'wukongMotorRun(0x10,'+b+','+speed+',0);\n'
};

Blockly.Arduino.ljj_wukong_neopixel_begin=function(){
  var a=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"0";
      b="5";
  if (Blockly.Arduino.ljj_wukong.ws2812_pin!=null)
    b=Blockly.Arduino.ljj_wukong.ws2812_pin;
	Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>";
  Blockly.Arduino.definitions_.define_wukong_neopixel='Adafruit_NeoPixel wukongPixels = Adafruit_NeoPixel(4,'+b+',NEO_GRB + NEO_KHZ800);\n';
  Blockly.Arduino.setups_.setup_plus_neopixel="wukongPixels.begin();\n  wukongPixels.setBrightness("+a+");\n  wukongPixels.show();\n  wukongPixels.setPixelColor(0,wukongPixels.Color(0,0,0));\n  wukongPixels.setPixelColor(1,wukongPixels.Color(0,0,0));\n  wukongPixels.setPixelColor(2,wukongPixels.Color(0,0,0));\n  wukongPixels.setPixelColor(3,wukongPixels.Color(0,0,0));\n  wukongPixels.show();";
  return"";
};

Blockly.Arduino.ljj_wukong_neopixel_set_color=function(){
  var a=Blockly.Arduino.valueToCode(this,"INDEX",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  b=b.replace("tft.color565","wukongPixels.Color");
  return"wukongPixels.setPixelColor("+a+","+b+");\n";
};

Blockly.Arduino.ljj_wukong_neopixel_set_colors=function(){
  var a=Blockly.Arduino.valueToCode(this,"COLOR",Blockly.Arduino.ORDER_ATOMIC)||"";
  a=a.replace("tft.color565","wukongPixels.Color");
  return"wukongPixels.setPixelColor(0,"+a+");\nwukongPixels.setPixelColor(1,"+a+");\nwukongPixels.setPixelColor(2,"+a+");\nwukongPixels.setPixelColor(3,"+a+");\nwukongPixels.show();\n";
};

Blockly.Arduino.ljj_wukong_neopixel_show=function(){
  return"wukongPixels.show();\n";
};

Blockly.Arduino.ljj_wukong_neopixel_brightness=function(){
  var a=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return"wukongPixels.setBrightness("+a+");\nwukongPixels.show();\n";
};

Blockly.Arduino.ljj_wukong_board_blue_enable=function(){
  var a=this.getFieldValue("MODE");
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  Blockly.Arduino.definitions_.define_ljj_wukong_motor_run='void wukongMotorRun(byte addr,byte motor, byte dir ,byte power){\n  Wire.setClock(100000);\n  byte myParams[]={motor,dir,power,0};\n  Wire.beginTransmission(addr);\n  Wire.write(myParams,4);\n  Wire.endTransmission();\n}'; 
  if (a == "up") {
     return'wukongMotorRun(0x10,0x11,0x00,0);\nwukongMotorRun(0x10,0x12,150,0);\n'
  } else {
     return'wukongMotorRun(0x10,0x12,0,0);\nwukongMotorRun(0x10,0x11,160,0);\n'
  }
};

Blockly.Arduino.ljj_wukong_board_blue_brightness=function(){
  var a=Blockly.Arduino.valueToCode(this,"BRIGHTNESS",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_wire="#include <Wire.h>";
  Blockly.Arduino.setups_.setup_wire_lib="Wire.begin();";
  Blockly.Arduino.definitions_.define_ljj_wukong_motor_run='void wukongMotorRun(byte addr,byte motor, byte dir ,byte power){\n  Wire.setClock(100000);\n  byte myParams[]={motor,dir,power,0};\n  Wire.beginTransmission(addr);\n  Wire.write(myParams,4);\n  Wire.endTransmission();\n}'; 
  return'wukongMotorRun(0x10,0x12,'+a+',0);\nwukongMotorRun(0x10,0x11,160,0);\n'
};


//LCD1602
Blockly.Arduino.ljj_lcd1602_init = function() { 
  var a = this.getFieldValue('ADDRESS'),
      b = this.getFieldValue('TYPE');
  Blockly.Arduino.definitions_.define_ljj_lcd1602_include = '#include "LiquidCrystal_I2C.h"';
  Blockly.Arduino.definitions_.define_ljj_lcd1602_invoke = 'LiquidCrystal_I2C lcd('+a+');';
  Blockly.Arduino.setups_.ljj_lcd1602 = 'lcd.begin('+b+');';
  return '';
};

Blockly.Arduino.ljj_lcd1602_show = function() { 
  var a=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"TEXT",Blockly.Arduino.ORDER_ATOMIC)||"";
  return 'lcd.setCursor('+a+','+b+');\nlcd.print(String('+c+'));\n';
};

Blockly.Arduino.ljj_lcd1602_char = function() { 
  var a=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"INDEX",Blockly.Arduino.ORDER_ATOMIC)||"",
      d=this.getFieldValue('BINARY');
      if (d=='TRUE')
        c='B'+c;
  return 'lcd.setCursor('+a+','+b+');\nlcd.write('+c+');\n';
};

Blockly.Arduino.ljj_lcd1602_bitmap=function(){
  var a=this.getFieldValue('INDEX'),
      swapStr="0b",
      allSwapStr="{";
  for(tempY=0;tempY<8;tempY++){
    for(tempX=0;tempX<5;tempX++){
      if (this.getFieldValue("L"+tempY+tempX) == 'TRUE')
        swapStr+="1";
      else
        swapStr+="0";
    }
    allSwapStr+=swapStr;
    if (tempY<7)
      allSwapStr+=',';
    swapStr="0b";
  }
  allSwapStr+='}';
  Blockly.Arduino.definitions_['define_ljj_lcd1602_bitmap_'+a+'invoke']='const uint8_t lcdBitmap_'+a+'[8]='+allSwapStr+';';
  return 'lcd.createChar('+a+',(uint8_t *)lcdBitmap_'+a+');\n';
}

Blockly.Arduino.ljj_lcd1602_bitmap_show=function(){
  var a=Blockly.Arduino.valueToCode(this,"X",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"Y",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"INDEX",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return 'lcd.setCursor('+a+','+b+');\nlcd.write('+c+');\n';
}

Blockly.Arduino.ljj_lcd1602_clear = function() { 
  return 'lcd.clear();\n';
};

Blockly.Arduino.ljj_lcd1602_scroll = function() { 
  var a = this.getFieldValue('MODE');
  return 'lcd.'+a+'();\n';
};

Blockly.Arduino.ljj_lcd1602_backlight = function() { 
  var a = this.getFieldValue('MODE');
  return 'lcd.setBacklight('+(a=='up'?'HIGH':'LOW')+');\n';
};

/*
Blockly.Arduino.ljj_lcd1602_blink = function(block) { 
  var a = this.getFieldValue('BLINK');
  return 'lcd.'+a+'();\n';
};
*/

Blockly.Arduino.ljj_time_delay = function() { 
  var a=Blockly.Arduino.valueToCode(this,"DELAY",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME),
      c=Blockly.Arduino.statementToCode(this,"TIME_EVENT");
  c=c.replace(/\n  /g,"\n  ");
  Blockly.Arduino.definitions_['define_time_'+c]='unsigned long '+b+'=0;';
  var returnStr='if ('+b+'==0){\n  '+b+'=millis();\n'+c+'}\nif (millis()-'+b+'>='+a+')\n  '+b+'=0;\n';
  return returnStr;
};

Blockly.Arduino.ljj_time_reset = function() { 
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  return a+'=0;\n'
};

Blockly.Arduino.ljj_time_system_time = function() { 
  var a = this.getFieldValue('MODE');
  if (a=='1000')
    return['millis()',Blockly.Arduino.ORDER_ATOMIC];
  else
    return['micros()',Blockly.Arduino.ORDER_ATOMIC];
};

//SU-03T
Blockly.Arduino.ljj_su03t={};
Blockly.Arduino.ljj_su03t_init = function() {
  var a = this.getFieldValue('SERIAL_PORT');
  Blockly.Arduino.ljj_su03t.serial_port=a;
  Blockly.Arduino.definitions_.define_ljj_su03t_send_event = '\nvoid su03tSendInteger(byte command,long data){\n  typedef union {\n    long longInt;\n    byte binary[4];\n  } myType;\n  myType sharedData;\n  sharedData.longInt = data;\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(0xAA);\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(command);\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(sharedData.binary,4);\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(0xFF);\n}\n\nvoid su03tSaySomething(byte command){\n  byte buff[3]={0xAA,0,0xFF};\n  buff[1]=command;\n  Serial.write(buff,3);\n}\n';
  if (Blockly.Arduino.ljj_su03t.serial_change_port)
    delete Blockly.Arduino.ljj_su03t.serial_change_port;
  return 'delay(300);\n'+a+'.begin(115200);\n';
};

Blockly.Arduino.ljj_su03t_init_pinmap = function() {
  var a = this.getFieldValue('SERIAL_PORT');
      b=Blockly.Arduino.valueToCode(this,"RX",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"TX",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.ljj_su03t.serial_port=a;
  Blockly.Arduino.definitions_.define_ljj_su03t_send_event = '\nvoid su03tSendInteger(byte command,long data){\n  typedef union {\n    long longInt;\n    byte binary[4];\n  } myType;\n  myType sharedData;\n  sharedData.longInt = data;\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(0xAA);\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(command);\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(sharedData.binary,4);\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(0xFF);\n}\n\nvoid su03tSaySomething(byte command){\n  byte buff[3]={0xAA,0,0xFF};\n  buff[1]=command;\n  Serial.write(buff,3);\n}\n';
  Blockly.Arduino.ljj_su03t.serial_change_port='.begin(115200,SERIAL_8N1,'+b+','+c+');\n';
  return 'delay(300);\n'+a+'.begin(115200,SERIAL_8N1,'+b+','+c+');\n';
};

Blockly.Arduino.ljj_su03t_reconnect = function() {
  var a = Blockly.Arduino.ljj_su03t.serial_port;
  if (Blockly.Arduino.ljj_su03t.serial_change_port)
    return a+'.end();\n'+a+Blockly.Arduino.ljj_su03t.serial_change_port;
  else
    return a+'.end();\n'+a+'.begin(115200);\n';
};

Blockly.Arduino.ljj_su03t_listening = function() { 
  var a=Blockly.Arduino.statementToCode(this,"SU03T_IF");
       
  return 'if('+Blockly.Arduino.ljj_su03t.serial_port+'.available()==4){\n  byte uart_cmd[4] = {};\n  for(int i=0 ; i<4; i++){\n    uart_cmd[i] =byte('+Blockly.Arduino.ljj_su03t.serial_port+'.read());\n  }\n'+a+'}\n';
};

Blockly.Arduino.ljj_su03t_listened_result = function() { 
  var a=this.getFieldValue('COMMAND'),
      previousByte=a.substring(0,a.indexOf(',')),
      nextByte=a.substring(a.indexOf(',')+1);
    return 'uart_cmd[1]==0x'+previousByte+' && uart_cmd[2]==0x'+nextByte;
};

Blockly.Arduino.ljj_su03t_send_data = function() { 
  var a=this.getFieldValue('COMMAND'),
      b=Blockly.Arduino.valueToCode(this,"SAY_DATA",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return 'su03tSendInteger('+a+','+b+');\n';
};

Blockly.Arduino.ljj_su03t_send_custom_data = function() { 
  var a=this.getFieldValue('COMMAND'),
      b=Blockly.Arduino.valueToCode(this,"SAY_DATA",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (a=="1")
    return 'su03tSendInteger(6,'+b+');\n';
  else if (a=="2"){
    Blockly.Arduino.definitions_.define_ljj_su03t_send_float_event='void float2Double(float floatIn, uint8_t * doubleOut, uint8_t reverseIn, uint8_t reverseOut)\n{\n  uint32_t floatbytes;\n  uint32_t upper = 0, lower = 0;\n  if(reverseIn) endianSwap4b((uint32_t *) (&floatIn));\n  memset(doubleOut, 0, 8);\n  memcpy(&floatbytes, &floatIn, 4);\n  if((floatbytes & 0x80000000) > 0) upper = 0x80000000;\n  uint32_t exponent = (floatbytes & 0x7F800000) >> 23;\n  uint32_t fraction =  floatbytes & 0x007FFFFF;\n  exponent = exponent - 127 + 1023;\n  exponent = exponent << 20;\n  upper |= exponent;\n  lower = fraction;\n  lower &= 0x00000003;\n  lower = lower << 29;\n  fraction = fraction >> 3;\n  upper |= fraction;\n  if(reverseOut)\n  {\n    uint32_t reverseUpper = 0, reverseLower = 0;\n    uint8_t * upperPtr = (uint8_t *) (&upper);\n    uint8_t * lowerPtr = (uint8_t *) (&lower);\n    uint8_t * revrsUpperPtr = (uint8_t *) (&reverseUpper);\n    uint8_t * revrsLowerPtr = (uint8_t *) (&reverseLower);\n    revrsUpperPtr[0] = lowerPtr[3];\n    revrsUpperPtr[1] = lowerPtr[2];\n    revrsUpperPtr[2] = lowerPtr[1];\n    revrsUpperPtr[3] = lowerPtr[0];\n    revrsLowerPtr[0] = upperPtr[3];\n    revrsLowerPtr[1] = upperPtr[2];\n    revrsLowerPtr[2] = upperPtr[1];\n    revrsLowerPtr[3] = upperPtr[0];\n    upper = reverseUpper;\n    lower = reverseLower;\n  }\n  endianSwap4b(&upper);\n  memcpy(&doubleOut[0], &upper, 4);\n  endianSwap4b(&lower);\n  memcpy(&doubleOut[4], &lower, 4);\n}\n\nvoid endianSwap4b(uint32_t * swapMe)\n{\n  uint32_t reversed = 0;\n  uint8_t * inputPtr = (uint8_t *) swapMe;\n  uint8_t * revrsPtr = (uint8_t *) (&reversed);\n  revrsPtr[0] = inputPtr[3];\n  revrsPtr[1] = inputPtr[2];\n  revrsPtr[2] = inputPtr[1];\n  revrsPtr[3] = inputPtr[0];\n  memcpy(inputPtr, revrsPtr, 4);\n}\n\nvoid su03tSendDouble(byte command,float data){\n  uint8_t byteArray[8];\n  float2Double(data, byteArray, 0, 1);\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(0xAA);\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(command);\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(byteArray,8);\n  '+Blockly.Arduino.ljj_su03t.serial_port+'.write(0xFF);\n}\n';
    return 'su03tSendDouble(7,'+b+');\n';
  }
  else
    return'';
};

Blockly.Arduino.ljj_su03t_system_command = function() { 
  var a=this.getFieldValue('COMMAND');
  return 'su03tSendInteger('+a+',0);\n';
};

Blockly.Arduino.ljj_su03t_say_something = function() { 
  var a=this.getFieldValue('COMMAND');
  return 'su03tSaySomething('+a+');\n';
};

//ljj_servo
Blockly.Arduino.ljj_servo={};
Blockly.Arduino.ljj_servo_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  if (Blockly.Arduino.my_board_type=="ATtiny85"){
    Blockly.Arduino.definitions_.define_servo="#include <Adafruit_SoftServo.h>";
    Blockly.Arduino.definitions_["define_class_servo_"+b]="Adafruit_SoftServo "+b+";";
  } else{
    Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";
    Blockly.Arduino.definitions_["define_class_servo_"+b]="Servo "+b+";";
  }
  return b+'.attach('+a+');\n';
};

Blockly.Arduino.ljj_esp32_servo_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME),
      c=Blockly.Arduino.valueToCode(this,"CHANNEL",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";
    Blockly.Arduino.definitions_["define_class_servo_"+b]="Servo "+b+";";
    return b+'.attach('+a+','+c+');\n';
  } else
    return'';
};

Blockly.Arduino.ljj_servo_custom_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME),
      c=Blockly.Arduino.valueToCode(this,"MIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      d=Blockly.Arduino.valueToCode(this,"MAX",Blockly.Arduino.ORDER_ATOMIC)||"0";
  if (Blockly.Arduino.my_board_type=="ATtiny85"){
    Blockly.Arduino.definitions_.define_servo="#include <Adafruit_SoftServo.h>";
    Blockly.Arduino.definitions_["define_class_servo_"+b]="Adafruit_SoftServo "+b+";";
  } else{
    Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";
    Blockly.Arduino.definitions_["define_class_servo_"+b]="Servo "+b+";";
  }
  return b+'.attach('+a+','+c+','+d+');\n';
};

Blockly.Arduino.ljj_servo_write_pin=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME),
      b=Blockly.Arduino.valueToCode(this,"ANGLE",Blockly.Arduino.ORDER_ATOMIC)||"90";
  return a+".write("+b+");\n"
};

Blockly.Arduino.ljj_servo_360=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME),
      b=this.getFieldValue('DIR'),
      c=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0"; 
  var speed='90';
  if (b=='0')
    speed='90-'+c;
  else if (b=='180')
    speed='90+'+c; 
  if (Blockly.Arduino.my_board_type=="ATtiny85")
    return a+".write360("+speed+");\n"
  else
    return a+".write("+speed+");\n"
};

Blockly.Arduino.ljj_servo_detach=function(){
  var a=Blockly.Arduino.nameDB_.getName(this.getFieldValue('varName'), Blockly.VARIABLE_CATEGORY_NAME);
  return a+".detach();\n"
};

//Cage Bot
Blockly.Arduino.ljj_cagebot={};

Blockly.Arduino.ljj_cagebot_line_follower_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"LEFT_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      b=Blockly.Arduino.valueToCode(this,"MIDDLE_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0",
      c=Blockly.Arduino.valueToCode(this,"RIGHT_PIN",Blockly.Arduino.ORDER_ATOMIC)||"0";
  Blockly.Arduino.definitions_.define_cagebot_line_invoke='byte cageBotLeftPin='+a+';\nbyte cageBotMiddlePin='+b+';\nbyte cageBotRightPin='+c+';\n'
  Blockly.Arduino.setups_["setup_cagebot_line"]='pinMode(cageBotLeftPin,INPUT);\n  pinMode(cageBotMiddlePin,INPUT);\n  pinMode(cageBotRightPin,INPUT);\n';
  return'';
}

Blockly.Arduino.ljj_cagebot_line_follower_read=function(){
  var a=this.getFieldValue("PLACE"),
      b=this.getFieldValue("VALUE");
  if (a=="left")
    a="cageBotLeftPin";
  else if (a=="middle")
    a="cageBotMiddlePin";
  else
    a="cageBotRightPin";
  return[(b==0?'!':'')+'digitalRead('+a+')',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ljj_cagebot_motor_run=function(){
  var a=this.getFieldValue("MOTOR"),
      b=this.getFieldValue("DIR"),
      c=Blockly.Arduino.valueToCode(this,"SPEED",Blockly.Arduino.ORDER_ATOMIC)||"0",
      returnValue="";
  if (a=="both"){
    if (b=="1")
      returnValue='digitalWrite(m1aL9110,0);\nanalogWrite(m1bL9110,'+c+');\ndigitalWrite(m2aL9110,1);\nanalogWrite(m2bL9110,'+c+');\n';
    else
      returnValue='digitalWrite(m1aL9110,1);\nanalogWrite(m1bL9110,'+c+');\ndigitalWrite(m2aL9110,0);\nanalogWrite(m2bL9110,'+c+');\n';
  } else {
    if (b=="1"){
      returnValue='digitalWrite('+a+'aL9110,'+(a=='m1'?0:1)+');\nanalogWrite('+a+'bL9110,'+c+');\n';
    } else {
      returnValue='digitalWrite('+a+'aL9110,'+(a=='m1'?1:0)+');\nanalogWrite('+a+'bL9110,'+c+');\n';
    }
  }
  Blockly.Arduino.definitions_.define_cagebot_motor_invoke='byte m1aL9110=7;\nbyte m1bL9110=5;\nbyte m2aL9110=4;\nbyte m2bL9110=6;\n';
  Blockly.Arduino.setups_["setup_cagebot_motor"]='pinMode(m1aL9110,OUTPUT);\n  pinMode(m1bL9110,OUTPUT);\n  pinMode(m2aL9110,OUTPUT);\n  pinMode(m2bL9110,OUTPUT);\n';
  return returnValue;
}

Blockly.Arduino.ljj_cagebot_motor_stop=function(){
  var a=this.getFieldValue("MOTOR"),
      returnValue="";
  if (a=="both"){
    returnValue='digitalWrite(m1aL9110,0);\nanalogWrite(m1bL9110,0);\ndigitalWrite(m2aL9110,0);\nanalogWrite(m2bL9110,0);\n';
  } else {
    returnValue='digitalWrite('+a+'aL9110,0);\nanalogWrite('+a+'bL9110,0);\n';
  }
  Blockly.Arduino.definitions_.define_cagebot_motor_invoke='byte m1aL9110=7;\nbyte m1bL9110=5;\nbyte m2aL9110=4;\nbyte m2bL9110=6;\n';
  Blockly.Arduino.setups_["setup_cagebot_motor"]='pinMode(m1aL9110,OUTPUT);\n  pinMode(m1bL9110,OUTPUT);\n  pinMode(m2aL9110,OUTPUT);\n  pinMode(m2bL9110,OUTPUT);\n';
  return returnValue;
}

//ESP32_BLE
Blockly.Arduino.ljj_esp32_BLE={};

Blockly.Arduino.ljj_esp32_ble_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"BLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"UUID",Blockly.Arduino.ORDER_ATOMIC)||"";
  var myIndex=b.indexOf('-');
  var indexChar=b.substring(myIndex-1,myIndex);
  var uuidFirst=b.substring(0,myIndex-1);
  var uuidLast=b.substring(myIndex);
  var c="4",d="5";
  if (!isNaN(parseInt(indexChar,16)))
  {
    var tempNum=parseInt(indexChar,16)+1;
    if (tempNum>15)
      tempNum=1;
    c=""+tempNum.toString(16);
    c=c.toUpperCase();
    d=""+(tempNum+1).toString(16);
    d=d.toUpperCase();
  }    
  c=uuidFirst+c+uuidLast;
  d=uuidFirst+d+uuidLast;
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_invoke='\n#define SERVICE_UUID           '+b+'\n#define CHARACTERISTIC_UUID_RX '+c+'\n#define CHARACTERISTIC_UUID_TX '+d+'\n';
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_connected_event='void ljjBtConnected(){\n\n}\n';
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_disconnected_event='void ljjBtDisconnected(){\n\n}\n';
  }
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_var_invoke='BLECharacteristic *pCharacteristic;\nbool btConnected = false;\nbool btReceiveDone=false;\nString btRxLoad="";\nString sendTemp="";\n';
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_include='#include <BLEDevice.h>\n#include <BLEServer.h>\n#include <BLEUtils.h>\n#include <BLE2902.h>';
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_event='class btLjjServerCallbacks: public BLEServerCallbacks {\n    void onConnect(BLEServer* pServer) {\n      btConnected = true;\n      ljjBtConnected();\n    };\n    void onDisconnect(BLEServer* pServer) {\n      btConnected = false;\n      ljjBtDisconnected();\n    }\n};\n\nclass btLjjCallbacks: public BLECharacteristicCallbacks {\n    void onWrite(BLECharacteristic *pCharacteristic) {\n      btReceiveDone=false;\n      std::string rxValue = pCharacteristic->getValue();\n      if (rxValue.length() > 0) {\n        btRxLoad="";\n        for (int i = 0; i < rxValue.length(); i++){\n          btRxLoad +=(char)rxValue[i];\n        }\n        btRxLoad.replace("\\r","");\n        btRxLoad.replace("\\n","");\n        btReceiveDone=true;\n      }\n    }\n};\n\nvoid setupBLE(String BLEName){\n  const char *ble_name=BLEName.c_str();\n  BLEDevice::init(ble_name);\n  BLEServer *pServer = BLEDevice::createServer();\n  pServer->setCallbacks(new btLjjServerCallbacks());\n  BLEService *pService = pServer->createService(SERVICE_UUID);\n  pCharacteristic= pService->createCharacteristic(CHARACTERISTIC_UUID_TX,BLECharacteristic::PROPERTY_NOTIFY);\n  pCharacteristic->addDescriptor(new BLE2902());\n  BLECharacteristic *pCharacteristic = pService->createCharacteristic(CHARACTERISTIC_UUID_RX,BLECharacteristic::PROPERTY_WRITE);\n  pCharacteristic->setCallbacks(new btLjjCallbacks());\n  pService->start();\n  pServer->getAdvertising()->addServiceUUID(SERVICE_UUID);\n  pServer->getAdvertising()->setScanResponse(true);\n  pServer->getAdvertising()->setMinPreferred(0x06);\n  pServer->getAdvertising()->setMinPreferred(0x12);\n  pServer->getAdvertising()->start();\n}\n';
    return'setupBLE('+a+');\n';
  } else if (Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_include='#include <LBLE.h>\n#include <LBLEPeriphral.h>';
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_var_invoke='LBLEService ble7697Service(SERVICE_UUID);\nLBLECharacteristicString ble7697Rx(CHARACTERISTIC_UUID_RX, LBLE_WRITE);\nLBLECharacteristicString ble7697Tx(CHARACTERISTIC_UUID_TX, LBLE_READ);\nbool connected7697=false;\nString btRxLoad="";\nString sendTemp="";\n';
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_event='void setupBLE(String BLEName){\n  LBLE.begin();\n  while (!LBLE.ready()) {delay(100);}\n  LBLEUuid uuid(SERVICE_UUID);\n  LBLEAdvertisementData advertisement;\n  advertisement.configAsConnectableDevice(BLEName.c_str(), uuid);\n  LBLEPeripheral.setName(BLEName.c_str());\n  ble7697Service.addAttribute(ble7697Rx);\n  ble7697Service.addAttribute(ble7697Tx);\n  LBLEPeripheral.addService(ble7697Service);\n  LBLEPeripheral.begin();\n  LBLEPeripheral.advertise(advertisement);\n}\n';
    return'setupBLE('+a+');\n';
  } else
    return'';
}

Blockly.Arduino.ljj_esp32_ble_onConnected=function(){
  var a=Blockly.Arduino.statementToCode(this,"STATEMENT"),
      b=this.getFieldValue("STATUS"),
      c=b.charAt(0).toUpperCase() + b.slice(1);
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_['define_ljj_esp32_ble_'+b+'_event']='void ljjBt'+c+'(){\n'+a+'\n}\n';
    if (Blockly.Arduino.my_board_type=="7697"){
      Blockly.Arduino.loops_.ljj_esp32_ble_loop="check7697BleCoonection();\n";
      Blockly.Arduino.definitions_.define_ljj_7697_ble_event='void check7697BleCoonection(){\n  if ((!connected7697) && LBLEPeripheral.connected()){\n    connected7697=true;\n    ljjBtConnected();\n  }\n  if (connected7697 && (!LBLEPeripheral.connected())){\n    connected7697=false;\n    ljjBtDisconnected();\n  }\n}\n';
    }
  }
  return'';
}

Blockly.Arduino.ljj_esp32_ble_recv_avalable=function(){
  var a=Blockly.Arduino.statementToCode(this,"STATEMENT");
  if (Blockly.Arduino.my_board_type=="ESP32")
    return 'if (btConnected && btReceiveDone && btRxLoad.length()>0){\n'+a+'  btRxLoad="";\n}\n';
  else if (Blockly.Arduino.my_board_type=="7697")
    return 'if (LBLEPeripheral.connected() && ble7697Rx.isWritten()) {\n  btRxLoad=ble7697Rx.getValue();\n  btRxLoad.replace("\\r","");\n  btRxLoad.replace("\\n","");\n'+a+'  btRxLoad="";\n}\n';
  else
    return '';
}

Blockly.Arduino.ljj_esp32_ble_read_result=function(){
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="7697")
    return['btRxLoad',Blockly.Arduino.ORDER_ATOMIC];
  else
    return['',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ljj_esp32_ble_read_v7rc=function(){
  var a=this.getFieldValue("TYPE"),
      b=Blockly.Arduino.statementToCode(this,"STATEMENT");
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="7697")
    return 'if (btRxLoad.startsWith("'+a+'")){\n  byte numberBase='+ ((a=='LED' || a=='LE2')?'16':'10') +';\n'+b+'}\n';
  else
    return'';
}

Blockly.Arduino.ljj_esp32_ble_read_v7rc_result=function(){
  var a=this.getFieldValue("CHANNEL"),
      b=this.getFieldValue("VALUE_TYPE"),
      startsIndex=parseInt(a)*4+3,
      endsIndex=startsIndex+4;
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="7697"){
    if (b=="Number")
      return['strtol(btRxLoad.substring('+startsIndex+','+endsIndex+').c_str(),0,numberBase)',Blockly.Arduino.ORDER_ATOMIC];
    else
      return['btRxLoad.substring('+startsIndex+','+endsIndex+')',Blockly.Arduino.ORDER_ATOMIC];
  } else
    return'';
}

Blockly.Arduino.ljj_esp32_ble_send=function(){
  var a=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (this.getFieldValue("LINE") == 'TRUE')
    a='sendTemp=String('+a+')+String("\\n");';
  else
    a='sendTemp=String('+a+');';
  if (Blockly.Arduino.my_board_type=="ESP32"){
    return a+'\npCharacteristic->setValue(sendTemp.c_str());\npCharacteristic->notify();\n';
  } else if (Blockly.Arduino.my_board_type=="7697")
    return a+'\nble7697Tx.setValue(sendTemp);\nLBLEPeripheral.notifyAll(ble7697Tx);\n';
  else
    return '';
}

Blockly.Arduino.ljj_esp32_ble_connected=function(){
  if (Blockly.Arduino.my_board_type=="ESP32")
    return['btConnected',Blockly.Arduino.ORDER_ATOMIC];
  else if (Blockly.Arduino.my_board_type=="7697")
    return['LBLEPeripheral.connected()',Blockly.Arduino.ORDER_ATOMIC];
  else
    return'';
}

//ESP32_BLE_CLIENT
Blockly.Arduino.ljj_esp32_BLE_client={};

Blockly.Arduino.ljj_esp32_ble_client_init=function(){
  var a=Blockly.Arduino.valueToCode(this,"BLE_NAME",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"UUID",Blockly.Arduino.ORDER_ATOMIC)||"";
  var myIndex=b.indexOf('-');
  var indexChar=b.substring(myIndex-1,myIndex);
  var uuidFirst=b.substring(0,myIndex-1);
  var uuidLast=b.substring(myIndex);
  var c="4",d="5";
  if (!isNaN(parseInt(indexChar,16)))
  {
    var tempNum=parseInt(indexChar,16)+1;
    if (tempNum>15)
      tempNum=1;
    c=""+tempNum.toString(16);
    c=c.toUpperCase();
    d=""+(tempNum+1).toString(16);
    d=d.toUpperCase();
  }    
  c=uuidFirst+c+uuidLast;
  d=uuidFirst+d+uuidLast;
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_client_invoke='\n#define SERVICE_UUID_STR           '+b+'\n#define CHARACTERISTIC_UUID_RX_STR '+c+'\n#define CHARACTERISTIC_UUID_TX_STR '+d+'\n';
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_client_connected_event='void ljjBtConnected(){\n\n}\n';
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_client_disconnected_event='void ljjBtDisconnected(){\n\n}\n';
  }
  if (Blockly.Arduino.my_board_type=="ESP32"){
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_client_var_invoke='static BLEUUID serviceUUID(SERVICE_UUID_STR);\nstatic BLEUUID    CHARACTERISTIC_UUID_RX(CHARACTERISTIC_UUID_RX_STR);\nstatic BLEUUID    CHARACTERISTIC_UUID_TX(CHARACTERISTIC_UUID_TX_STR);\nstatic boolean doConnect = false;\nstatic boolean btConnected = false;\nstatic boolean doScan = false;\nstatic BLERemoteCharacteristic* pRemoteCharacteristicTx;\nstatic BLERemoteCharacteristic* pRemoteCharacteristicRx;\nstatic BLERemoteCharacteristic* pRemoteCharacteristicTemp;\nstatic BLEAdvertisedDevice* ljjBtDevice;\nBLERemoteDescriptor* pRD;\nbool btReceiveDone=false;\nString btRxLoad="";\nuint8_t dataIndicate[2] = {0x02, 0x00};\nString serverBtDeviceName="";\nString sendTemp="";\n';
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_client_include='#include <BLEDevice.h>';
    Blockly.Arduino.definitions_.define_ljj_esp32_ble_client_event='static void btLjjNotifyCallback(BLERemoteCharacteristic* pBLERemoteCharacteristic, uint8_t* pData, size_t length, bool isNotify) {\n  btReceiveDone=false;\n  if (length > 0) {\n    btRxLoad="";\n    for (int i = 0; i < length; i++)\n      btRxLoad +=(char)pData[i];\n  }\n  btRxLoad.replace("\\r","");\n  btRxLoad.replace("\\n","");\n  if (pBLERemoteCharacteristic->canIndicate())\n    pRD->writeValue(dataIndicate, 2, false);\n  btReceiveDone=true;\n}\n\nclass btLjjClientCallback : public BLEClientCallbacks {\n  void onConnect(BLEClient* pclient) {\n    ljjBtConnected();\n  }\n\n  void onDisconnect(BLEClient* pclient) {\n    btConnected = false;\n    btReceiveDone=false;\n    btRxLoad="";\n    ljjBtDisconnected();\n  }\n};\n\nbool connectToServer() {\n  BLEClient*  pClient  = BLEDevice::createClient();\n  pClient->setClientCallbacks(new btLjjClientCallback());\n  pClient->connect(ljjBtDevice);\n  BLERemoteService* pRemoteService = pClient->getService(serviceUUID);\n  if (pRemoteService == nullptr) {\n    pClient->disconnect();\n    return false;\n  }\n  pRemoteCharacteristicTx = pRemoteService->getCharacteristic(CHARACTERISTIC_UUID_TX);\n  pRemoteCharacteristicRx = pRemoteService->getCharacteristic(CHARACTERISTIC_UUID_RX);\n  if (pRemoteCharacteristicTx == nullptr) {\n    pClient->disconnect();\n    return false;\n  }\n  if (pRemoteCharacteristicRx == nullptr) {\n    pClient->disconnect();\n    return false;\n  }\n  if (!pRemoteCharacteristicTx->canWrite()){\n    pRemoteCharacteristicTemp=pRemoteCharacteristicTx;\n    pRemoteCharacteristicTx=pRemoteCharacteristicRx;\n    pRemoteCharacteristicRx=pRemoteCharacteristicTemp;\n  }\n  if (pRemoteCharacteristicRx->canIndicate() || pRemoteCharacteristicRx->canNotify())\n    pRemoteCharacteristicRx->registerForNotify(btLjjNotifyCallback);\n  if (pRemoteCharacteristicRx->canIndicate()){\n    pRD = pRemoteCharacteristicRx->getDescriptor(BLEUUID((uint16_t)0x2902));\n    if (pRD == nullptr){\n      pClient->disconnect();\n      return false;\n    }\n    pRD->writeValue(dataIndicate, 2, false);\n  }\n  btConnected = true;\n  return true;\n}\n\nclass ljjAdvertisedDeviceCallbacks: public BLEAdvertisedDeviceCallbacks {\n  void onResult(BLEAdvertisedDevice advertisedDevice) {\n    String tempDeviceName=advertisedDevice.getName().c_str();\n    if (tempDeviceName.equals(serverBtDeviceName)) {\n      BLEDevice::getScan()->stop();\n      ljjBtDevice = new BLEAdvertisedDevice(advertisedDevice);\n      doConnect = true;\n      doScan = true;\n    }\n  }\n};\n\nvoid ljjBtStartScan(){\n  BLEDevice::init("");\n  BLEScan* pBLEScan = BLEDevice::getScan();\n  pBLEScan->setAdvertisedDeviceCallbacks(new ljjAdvertisedDeviceCallbacks());\n  pBLEScan->setInterval(1349);\n  pBLEScan->setWindow(449);\n  pBLEScan->setActiveScan(true);\n  pBLEScan->start(5, false);\n}\n\nvoid checkBtScan(){\n  if (doConnect) {\n    if (connectToServer()) {\n      Serial.println("We are now connected to the BLE Server.");\n    } else {\n      Serial.println("We have failed to connect to the server; there is nothin more we will do.");\n    }\n    doConnect = false;\n  }\n}\n';
    Blockly.Arduino.loops_.ljj_esp32_ble_client_loop="checkBtScan();\n";
    return'serverBtDeviceName='+a+';\nljjBtStartScan();\n';
  } else if (Blockly.Arduino.my_board_type=="7697"){
    return'';
  } else
    return'';
}

Blockly.Arduino.ljj_esp32_ble_client_onConnected=function(){
  var a=Blockly.Arduino.statementToCode(this,"STATEMENT"),
      b=this.getFieldValue("STATUS"),
      c=b.charAt(0).toUpperCase() + b.slice(1);
  if (Blockly.Arduino.my_board_type=="ESP32" || Blockly.Arduino.my_board_type=="7697"){
    Blockly.Arduino.definitions_['define_ljj_esp32_ble_client_'+b+'_event']='void ljjBt'+c+'(){\n'+a+'\n}\n';
    if (Blockly.Arduino.my_board_type=="7697"){

    }
  }
  return'';
}

Blockly.Arduino.ljj_esp32_ble_client_recv_avalable=function(){
  var a=Blockly.Arduino.statementToCode(this,"STATEMENT");
  if (Blockly.Arduino.my_board_type=="ESP32")
    return 'if (btConnected && btReceiveDone && btRxLoad.length()>0){\n'+a+'  btRxLoad="";\n}\n';
  else if (Blockly.Arduino.my_board_type=="7697")
    return '';
  else
    return '';
}

Blockly.Arduino.ljj_esp32_ble_client_read_result=function(){
  if (Blockly.Arduino.my_board_type=="ESP32")
    return['btRxLoad',Blockly.Arduino.ORDER_ATOMIC];
  else
    return['',Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ljj_esp32_ble_client_send=function(){
  var a=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"";
  if (this.getFieldValue("LINE") == 'TRUE')
    a='sendTemp=String('+a+')+String("\\n");';
  else
    a='sendTemp=String('+a+');';
  if (Blockly.Arduino.my_board_type=="ESP32"){
    return a+'\npRemoteCharacteristicTx->writeValue(sendTemp.c_str(), sendTemp.length());\n';
  }
  else if (Blockly.Arduino.my_board_type=="7697")
    return'';
  else
    return '';
}

Blockly.Arduino.ljj_esp32_ble_client_connected=function(){
  if (Blockly.Arduino.my_board_type=="ESP32")
    return['btConnected',Blockly.Arduino.ORDER_ATOMIC];
  else if (Blockly.Arduino.my_board_type=="7697")
    return['',Blockly.Arduino.ORDER_ATOMIC];
  else
    return'';
}


//SEN0539
Blockly.Arduino.ljj_sen0539={};
Blockly.Arduino.ljj_sen0539_init=function(){
  Blockly.Arduino.definitions_.define_ljj_sen0539_include='#include "DFRobot_DF2301Q.h"';
  Blockly.Arduino.definitions_.define_ljj_sen0539_invoke='DFRobot_DF2301Q_I2C sen0539;\nuint8_t sen0539CmdId;';
  return'sen0539.begin();\n';
}

Blockly.Arduino.ljj_sen0539_setVolume=function(){
  var a=Blockly.Arduino.valueToCode(this,"VOLUME",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return'sen0539.setVolume('+a+');\n';
}

Blockly.Arduino.ljj_sen0539_wakeup_time=function(){
  var a=Blockly.Arduino.valueToCode(this,"SECONDS",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return'sen0539.setWakeTime('+a+');\n';
}

Blockly.Arduino.ljj_sen0539_setMute=function(){
  var a=this.getFieldValue("MUTE");
  return'sen0539.setMuteMode('+a+');\n';
}

Blockly.Arduino.ljj_sen0539_execute=function(){
  var a=this.getFieldValue("COMMAND");
  return'sen0539.playByCMDID('+a+');\n';
}

Blockly.Arduino.ljj_sen0539_listening = function() { 
  var a=Blockly.Arduino.statementToCode(this,"SEN0539_IF");
  a=a.replace("  ","");
  a=a.replace(/\n  /g,"\n");
  return 'sen0539CmdId=sen0539.getCMDID();\n'+a+'\n';
};

Blockly.Arduino.ljj_sen0539_command = function() { 
  var a=this.getFieldValue('COMMAND');
    return 'sen0539CmdId=='+a;
};

//----------------------------------------
setTimeout(function(){
/*
	if (Blockly.Blocks.board_initializes_setup)
		var xmlDoc = Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"><block type="board_initializes_setup" id="0" x="100" y="50"><statement name="CONTENT"><block type="ljj_2023_init"></block></statement><next><block type="initializes_loop" id="1"><statement name="CONTENT"><block type="ljj_2023_loop"><value name="WHO"><block type="ljj_2023_who"></block></value><value name="WHAT"><block type="ljj_2023_what"></block></value></block></statement></block></next></block></xml>');
	else
		var xmlDoc = Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"><block type="initializes_setup" id="0" x="100" y="50"><next><block type="initializes_loop" id="1"></block></next></block></xml>');
*/
	if (Blockly.Blocks.board_initializes_setup)
		var xmlDoc = Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"><block type="board_initializes_setup" id="0" x="100" y="50">         <next><block type="initializes_loop" id="1"></block></next></block></xml>');
	else
		var xmlDoc = Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"><block type="initializes_setup" id="0" x="100" y="50"><next><block type="initializes_loop" id="1"></block></next></block></xml>');

	Blockly.mainWorkspace.clear();					
	Blockly.Xml.domToWorkspace(xmlDoc, Blockly.mainWorkspace);
}, 3000);