//Broadcast UDP
Blockly.Arduino.ycsh_udp={};
Blockly.Arduino.ycsh_udp_init=function(){
  Blockly.Arduino.definitions_.define_broadcast_include="#include <WiFiUdp.h>";
  delete Blockly.Arduino.definitions_.define_udp;
  Blockly.Arduino.definitions_.define_broadcast_port="const int UDP_BUFFER_SIZE=255;\nuint16_t UDP_LISTEN_PORT=3901;\nWiFiUDP castUdp;\n//IPAddress broadcastIP;\nchar broadcastBuffer[UDP_BUFFER_SIZE];\n";
  Blockly.Arduino.definitions_.define_broadcast_send_event="\nvoid sendBroadcastUDP(IPAddress broadcastIP, const char* myMessage){\n  castUdp.beginPacket(broadcastIP,UDP_LISTEN_PORT);\n  for (int myi = 0; myi < strlen(myMessage); myi++)\n  {\n    castUdp.write(myMessage[myi]);\n  }\n  castUdp.endPacket();\n}\n";
  Blockly.Arduino.definitions_.define_broadcast_check1_event="\nvoid myCheckUDP(){\n}\n";
  Blockly.Arduino.definitions_.define_broadcast_check2_event="\nvoid checkBroadcastUDP(){\n  int packetSize = castUdp.parsePacket();\n  if (packetSize) {\n    int len = castUdp.read(broadcastBuffer, UDP_BUFFER_SIZE);\n    if (len > 0) {\n      broadcastBuffer[len] = 0;\n      myCheckUDP();\n    }\n  }\n}\n";
  return""
};

Blockly.Arduino.ycsh_udp_setPort=function(){
  var a=Blockly.Arduino.valueToCode(this,"PORT",Blockly.Arduino.ORDER_ATOMIC)||"0";
  return "UDP_LISTEN_PORT="+a+";\n";
};

Blockly.Arduino.ycsh_udp_begin=function(){
  return "castUdp.begin(UDP_LISTEN_PORT);\n";
};

Blockly.Arduino.ycsh_udp_stop=function(){
  return "castUdp.stop();\n";
};

Blockly.Arduino.ycsh_udp_check_msg=function(){
  return'checkBroadcastUDP();\n';
};


Blockly.Arduino.ycsh_udp_send=function(){
  var a=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"";
  var myReturStr='IPAddress myBroadCastIP(WiFi.localIP()[0],WiFi.localIP()[1],WiFi.localIP()[2],255);\nsendBroadcastUDP(myBroadCastIP,String('+a+').c_str());\n'
  return myReturStr;
};

Blockly.Arduino.ycsh_udp_send_to_ip=function(){
  var a=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"IP",Blockly.Arduino.ORDER_ATOMIC)||"",
      c=Blockly.Arduino.valueToCode(this,"IMEI",Blockly.Arduino.ORDER_ATOMIC)||"",
      //d=Blockly.Arduino.valueToCode(this,"FIELD_NO",Blockly.Arduino.ORDER_ATOMIC)||"",
      e=Blockly.Arduino.valueToCode(this,"TEST_CODE",Blockly.Arduino.ORDER_ATOMIC)||"";
  b=b.replace(/\"/g,"");
  b=b.replace(/\./g,",");
  //var myReturStr='IPAddress myBroadCastIP('+b+');\nsendBroadcastUDP(myBroadCastIP,String(String("@")+'+c+'+","+'+d+'+","+'+a+'+",*"+'+e+').c_str());\n'
  var myReturStr='IPAddress myBroadCastIP('+b+');\nsendBroadcastUDP(myBroadCastIP,String(String("@")+'+c+'+","+'+a+'+",*"+'+e+').c_str());\n'
  return myReturStr;
};

Blockly.Arduino.ycsh_udp_send_to_ip2=function(){
  var a=Blockly.Arduino.valueToCode(this,"MESSAGE",Blockly.Arduino.ORDER_ATOMIC)||"",
      b=Blockly.Arduino.valueToCode(this,"IP",Blockly.Arduino.ORDER_ATOMIC)||"";
  b=b.replace(/\"/g,"");
  b=b.replace(/\./g,",");
  var myReturStr='IPAddress myBroadCastIP('+b+');\nsendBroadcastUDP(myBroadCastIP,String('+a+').c_str());\n'
  return myReturStr;
};

Blockly.Arduino.ycsh_udp_received_event=function(){
  var a=Blockly.Arduino.statementToCode(this,"MSG_UDP");
  a=a.replace(/\n  /g,"\n  ");
  Blockly.Arduino.definitions_.define_broadcast_check1_event="void myCheckUDP(){\n"+a+"}\n";
  return'';
}

Blockly.Arduino.ycsh_udp_received_msg=function(){
  return["broadcastBuffer",Blockly.Arduino.ORDER_ATOMIC];
};