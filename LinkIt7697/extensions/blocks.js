//Serial
Blockly.Blocks.ljj_serial={};
Blockly.Blocks.ljj_serial.HUE=290;
Blockly.Blocks.ljj_serial_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SERIAL_HELPURL);
  this.setColour(Blockly.Blocks.ljj_serial.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_SERIAL_TITLE)
      .appendField(Blockly.Msg.LJJ_SERIAL_INIT);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_SERIAL_BAUDRATE)
      .appendField(new Blockly.FieldDropdown([["4800","4800"],["9600","9600"],["19200","19200"],["38400","38400"],["57600","57600"],["115200","115200"],["230400","230400"]]),"BOUND_RATE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_SERIAL_TOOLTIP)}
};

Blockly.Blocks.ljj_serial_end={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SERIAL_HELPURL);
  this.setColour(Blockly.Blocks.ljj_serial.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_SERIAL_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT")
      .appendField(Blockly.Msg.LJJ_SERIAL_END);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_SERIAL_TOOLTIP)}
};

Blockly.Blocks.ljj_serial_print={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SERIAL_HELPURL);
  this.setColour(Blockly.Blocks.ljj_serial.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_SERIAL_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT");
  this.appendValueInput("TEXT")
      .appendField(Blockly.Msg.LJJ_SERIAL_PRINT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_SERIAL_TOOLTIP)}
};

Blockly.Blocks.ljj_serial_println={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SERIAL_HELPURL);
  this.setColour(Blockly.Blocks.ljj_serial.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_SERIAL_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT");
  this.appendValueInput("TEXT")
      .appendField(Blockly.Msg.LJJ_SERIAL_PRINTLN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_SERIAL_TOOLTIP)}
};

Blockly.Blocks.ljj_serial_readString={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SERIAL_HELPURL);
  this.setColour(Blockly.Blocks.ljj_serial.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_SERIAL_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT")
      .appendField(Blockly.Msg.LJJ_SERIAL_READ_STRING);
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_SERIAL_TOOLTIP)}
};

Blockly.Blocks.ljj_serial_readuntil={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SERIAL_HELPURL);
  this.setColour(Blockly.Blocks.ljj_serial.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_SERIAL_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT");
  this.appendValueInput("TEXT")
      .setCheck("String")
      .appendField(Blockly.Msg.LJJ_SERIAL_READUNTIL);
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_SERIAL_TOOLTIP)}
};

Blockly.Blocks.ljj_serial_read_result={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SERIAL_HELPURL);
  this.setColour(Blockly.Blocks.ljj_serial.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_SERIAL_TITLE)
      .appendField(Blockly.Msg.LJJ_SERIAL_READ_RESULT);
  this.setOutput(!0,"String")
  this.setTooltip(Blockly.Msg.LJJ_SERIAL_TOOLTIP)}
};

//mqtt
Blockly.Blocks.mqtt={};
Blockly.Blocks.mqtt.HUE=290;
Blockly.Blocks.mqtt.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("mqtt_event"!=a[c].type&&"subscribe_mqtt"!=a[c].type&&"publish_mqtt"!=a[c].type&&"mqtt_received_topic"!=a[c].type&&"mqtt_received_msg"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"connect_mqtt"==a[c].type)
				return!0;
		return b
};

Blockly.Blocks.connect_mqtt={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.mqtt.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SET_MQTT_UNTIL_READY_TITLE);
  this.appendValueInput("BROKER")
      .setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MQTT_BROKER);
  this.appendValueInput("PORT")
      .setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MQTT_PORT);
  this.appendValueInput("ID")
      .setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MQTT_ID);
  this.appendValueInput("USERNAME")
      .setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MQTT_USERNAME);
  this.appendValueInput("PASSWORD")
      .setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MQTT_PASSWORD);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)}
};

Blockly.Blocks.subscribe_mqtt={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.mqtt.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_SUB);
  this.appendValueInput("TOPIC").setCheck("String");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)}
};
Blockly.Blocks.publish_mqtt={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.mqtt.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_PUB_TITLE);
  this.appendValueInput("TOPIC")
      .setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MQTT_TOPIC);
  this.appendValueInput("MESSAGE")
      .setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MQTT_MESSAGE);
  this.appendDummyInput()
      .appendField("retain")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "RETAIN");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)}
};
Blockly.Blocks.mqtt_received_topic={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.texts.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_RECEIVED_TOPIC);
  this.setInputsInline(!0);
  this.setOutput(!0,"String")
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)}
};
Blockly.Blocks.mqtt_received_msg={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.texts.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_RECEIVED_MSG);
  this.setInputsInline(!0);
  this.setOutput(!0,"String")
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)}
};

Blockly.Blocks.mqtt_event={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.mqtt.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_EVENT);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_TOPIC_EQAL");
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)}
};

Blockly.Blocks.mqtt_connected={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.mqtt.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_CONNECTED);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)}
};

Blockly.Blocks.mqtt_reconnect={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.mqtt.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_RECONNECT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)}
};

//ThingSpeak
Blockly.Blocks.thingspeak={};
Blockly.Blocks.thingspeak.HUE=180;
Blockly.Blocks.things_get_url={init:function(){
  this.setHelpUrl(Blockly.Msg.THINGS_GET_URL_HELPURL);
  this.setColour(Blockly.Blocks.thingspeak.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.THINGS_GET_URL_TITLE);
  this.appendValueInput("KEY")
      .setCheck("String")
	  .setAlign(Blockly.ALIGN_RIGHT)
	  .appendField(Blockly.Msg.THINGS_KEY);
  this.appendValueInput("FIELD1").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD1);
  this.appendValueInput("FIELD2").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD2);
  this.appendValueInput("FIELD3").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD3);
  this.appendValueInput("FIELD4").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD4);
  this.appendValueInput("FIELD5").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD5);
  this.appendValueInput("FIELD6").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD6);
  this.appendValueInput("FIELD7").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD7);
  this.appendValueInput("FIELD8").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD8);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.THINGS_GET_URL_TOOLTIP)}
};  

Blockly.Blocks.things_get_rec={init:function(){
  this.setHelpUrl(Blockly.Msg.THINGS_GET_URL_HELPURL);
  this.setColour(Blockly.Blocks.thingspeak.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.THINGS_GET_REC_TITLE);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.THINGS_GET_URL_TOOLTIP)}
};  

//jetmole
Blockly.Blocks.jetmole={};
Blockly.Blocks.jetmole.HUE1=60;
Blockly.Blocks.mole_move_car={init:function(){
  this.setHelpUrl(Blockly.Msg.JETMOLE_HELPURL);
  this.setColour(Blockly.Blocks.jetmole.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MOLE_MOVE_CAR)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LIOU_ROBOT_FORWARD,"FORWARD"],[Blockly.Msg.LIOU_ROBOT_BACKWARD,"BACKWARD"],[Blockly.Msg.LIOU_ROBOT_LEFT,"LEFT"],[Blockly.Msg.LIOU_ROBOT_RIGHT,"RIGHT"],[Blockly.Msg.LIOU_ROBOT_STOP,"STOP"]]),"STAT");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED);
  this.appendValueInput("SPEED")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MOLE_MOVE_CAR_TOOLTIP)}
};
Blockly.Blocks.mole_move_motor_L={init:function(){
  this.setHelpUrl(Blockly.Msg.JETMOLE_HELPURL);
  this.setColour(Blockly.Blocks.jetmole.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MOLE_MOVE_MOTOR_L)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LIOU_ROBOT_FORWARD,"FORWARD"],[Blockly.Msg.LIOU_ROBOT_BACKWARD,"BACKWARD"]]),"STAT");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED);
  this.appendValueInput("SPEED")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MOLE_MOVE_CAR_TOOLTIP)}
};
Blockly.Blocks.mole_move_motor_R={init:function(){
  this.setHelpUrl(Blockly.Msg.JETMOLE_HELPURL);
  this.setColour(Blockly.Blocks.jetmole.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MOLE_MOVE_MOTOR_R)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LIOU_ROBOT_FORWARD,"FORWARD"],[Blockly.Msg.LIOU_ROBOT_BACKWARD,"BACKWARD"]]),"STAT");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED);
  this.appendValueInput("SPEED")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MOLE_MOVE_CAR_TOOLTIP)}
};


//MP3
Blockly.Blocks.mp3={};
Blockly.Blocks.mp3.HUE=90;
Blockly.Blocks.mp3_set_pins={init:function(){
  this.setHelpUrl(Blockly.Msg.MP3_HELPURL);
  this.setColour(Blockly.Blocks.mp3.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.MP3_SET_PINS_TITLE);
  this.appendValueInput("RX_PIN")
      .setCheck("Number")
	  .setAlign(Blockly.ALIGN_RIGHT)
	  .appendField(Blockly.Msg.MP3_TX_PIN);
  this.appendDummyInput().appendField(Blockly.Msg.MP3_RX_PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital),"TX_PIN").setAlign(Blockly.ALIGN_RIGHT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MP3_TOOLTIP)}
};

Blockly.Blocks.mp3_set_pins1={init:function(){
  this.setHelpUrl(Blockly.Msg.MP3_HELPURL);
  this.setColour(Blockly.Blocks.mp3.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MP3_SET_PINS_TITLE);
  this.appendValueInput("RX_PIN")
      .setCheck("Number")
	  .setAlign(Blockly.ALIGN_RIGHT)
	  .appendField(Blockly.Msg.MP3_TX_PIN);
  this.appendValueInput("TX_PIN")
      .setCheck("Number")
	  .setAlign(Blockly.ALIGN_RIGHT)
	  .appendField(Blockly.Msg.MP3_RX_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MP3_TOOLTIP)}
};

Blockly.Blocks.mp3_set_pins_esp32={init:function(){
  this.setHelpUrl(Blockly.Msg.MP3_HELPURL);
  this.setColour(Blockly.Blocks.mp3.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MP3_SET_PINS_TITLE+"  ESP32")
      .appendField(new Blockly.FieldDropdown([["Serial1","1"],["Serial2","2"],["Serial","0"]]),"UART_NO");
  this.appendValueInput("RX_PIN")
      .setCheck("Number")
	  .setAlign(Blockly.ALIGN_RIGHT)
	  .appendField(Blockly.Msg.MP3_TX_PIN_ESP32);
  this.appendValueInput("TX_PIN")
      .setCheck("Number")
	  .setAlign(Blockly.ALIGN_RIGHT)
	  .appendField(Blockly.Msg.MP3_RX_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MP3_TOOLTIP)}
};

Blockly.Blocks.mp3_playfolder={init:function(){
  this.setHelpUrl(Blockly.Msg.MP3_HELPURL);
  this.setColour(Blockly.Blocks.mp3.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MP3_PLAYFOLDER_TITLE);
  this.appendValueInput("FOLDER")
      .setCheck("Number").appendField(Blockly.Msg.MP3_FOLDER);
  this.appendValueInput("MP3_INDEX")
      .setCheck("Number").appendField(Blockly.Msg.MP3_INDEX_IN_FOLDER);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MP3_TOOLTIP)}
};

Blockly.Blocks.mp3_execute={init:function(){
  this.setHelpUrl(Blockly.Msg.MP3_HELPURL);
  this.setColour(Blockly.Blocks.mp3.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MP3_EXECUTE)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MP3_PLAY,"PLAY"],[Blockly.Msg.MP3_STOP,"STOP"],[Blockly.Msg.MP3_PLAY_NEXT,"NEXT"],[Blockly.Msg.MP3_PLAY_PREVIOUS,"PREVIOUS"],[Blockly.Msg.MP3_PAUSE,"PAUSE"]]),"STAT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MOLE_MOVE_CAR_TOOLTIP)}
};

Blockly.Blocks.mp3_volume={init:function(){
  this.setHelpUrl(Blockly.Msg.MP3_HELPURL);
  this.setColour(Blockly.Blocks.mp3.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MP3_VOLUME_TITLE);
  this.appendValueInput("VOLUME")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MP3_TOOLTIP)}
};

Blockly.Blocks.mp3_loop_folder={init:function(){
  this.setHelpUrl(Blockly.Msg.MP3_HELPURL);
  this.setColour(Blockly.Blocks.mp3.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MP3_LOOP_PLAYFOLDER);
  this.appendValueInput("FOLDER")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MP3_TOOLTIP)}
};

Blockly.Blocks.mp3_loop_options={init:function(){
  this.setHelpUrl(Blockly.Msg.MP3_HELPURL);
  this.setColour(Blockly.Blocks.mp3.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MP3_LOOP_OPTIONS)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MP3_LOOP_MP3,"LOOP_MP3"],[Blockly.Msg.MP3_DISABLE_LOOP_MP3,"DISABLE_LOOP_MP3"],[Blockly.Msg.MP3_LOOP_ALL,"ALL"],[Blockly.Msg.MP3_DISABLE_LOOP_ALL,"DISABLE_ALL"]]),"STAT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MOLE_MOVE_CAR_TOOLTIP)}
};

Blockly.Blocks.mp3_random={init:function(){
  this.setHelpUrl(Blockly.Msg.MP3_HELPURL);
  this.setColour(Blockly.Blocks.mp3.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MP3_RANDOM);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MOLE_MOVE_CAR_TOOLTIP)}
};

//TOOLS
Blockly.Blocks.ljj_tools={};
Blockly.Blocks.ljj_tools.HUE=180;
Blockly.Blocks.convert_str_int={init:function(){
  this.setHelpUrl(Blockly.Msg.TOOLS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LJJ_TOOLS_CONVERT_STR_INT);
  this.appendValueInput("MY_VAR")
      .setCheck("String");
  this.setInputsInline(!0);
  this.setOutput(!0,profile.common.number_type);
  this.setTooltip(Blockly.Msg.LJJ_TOOLS_TOOLTIP)}
};

Blockly.Blocks.convert_str_float={init:function(){
  this.setHelpUrl(Blockly.Msg.TOOLS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LJJ_TOOLS_CONVERT_STR_FLOAT);
  this.appendValueInput("MY_VAR")
      .setCheck("String");
  this.setInputsInline(!0);
  this.setOutput(!0,profile.common.number_type);
  this.setTooltip(Blockly.Msg.LJJ_TOOLS_TOOLTIP)}
};

Blockly.Blocks.convert_float_str={init:function(){
  this.setHelpUrl(Blockly.Msg.TOOLS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendValueInput("MY_VAR")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_TOOLS_CONVERT_FLOAT);
  this.appendValueInput("PLACES")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_TOOLS_CONVERT_TO_STRING)
      .appendField(Blockly.Msg.LJJ_TOOLS_DECIMAL_PLACES);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LJJ_TOOLS_TOOLTIP)}
};

Blockly.Blocks.create_custom_array={init:function(){
  this.setHelpUrl(Blockly.Msg.TOOLS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.TOOLS_ARRAY_VALUE);
  this.appendValueInput("MY_VAR")
      .setCheck("String");
  this.setInputsInline(!0);
  this.setOutput(!0, ["Array","Array1","Array2"]);
  this.setTooltip(Blockly.Msg.LJJ_TOOLS_TOOLTIP)}
};

Blockly.Blocks.ljj_string_startswith={init:function(){
  this.setHelpUrl(Blockly.Msg.TOOLS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_TOOLS_STRING);
  this.appendValueInput("SOURCE")
      .setCheck("String");
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TOOLS_SUBSTRING_LIST),"STAT");
  this.appendValueInput("INCLUDE")
      .setCheck("String")
  this.appendDummyInput()
      .appendField("?");
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LJJ_TOOLS_TOOLTIP)}
};

Blockly.Blocks.ljj_string_startswith={init:function(){
  this.setHelpUrl(Blockly.Msg.TOOLS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_TOOLS_STRING);
  this.appendValueInput("SOURCE")
      .setCheck("String");
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TOOLS_SUBSTRING_LIST),"STAT");
  this.appendValueInput("INCLUDE")
      .setCheck("String")
  this.appendDummyInput()
      .appendField("?");
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LJJ_TOOLS_TOOLTIP)}
};

Blockly.Blocks.ljj_number_map={init:function(){
  this.setHelpUrl(Blockly.Msg.TOOLS_HELPURL);
  this.setColour(Blockly.Msg["MATH_HUE"]);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MATH_MAP_APPENDTEXT_MAP);
  this.appendValueInput("ORG_NUMBER")
      .setCheck("Number")
      .appendField(Blockly.Msg.MATH_MAP_APPENDTEXT_VALUE);
  this.appendValueInput("FROM_LOW")
      .setCheck("Number")
      .appendField(Blockly.Msg.MATH_MAP_APPENDTEXT_FROMLOW);
  this.appendValueInput("FROM_HIGH")
      .setCheck("Number")
      .appendField(Blockly.Msg.MATH_MAP_APPENDTEXT_FROMHIGH);
  this.appendValueInput("TO_LOW")
      .setCheck("Number")
      .appendField(Blockly.Msg.MATH_MAP_APPENDTEXT_TOLOW);
  this.appendValueInput("TO_HIGH")
      .setCheck("Number")
      .appendField(Blockly.Msg.MATH_MAP_APPENDTEXT_TOHIGH);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MATH_MAP_TOOLTIP)}
};

//KSB045
Blockly.Blocks.ksb045={};
Blockly.Blocks.ksb045.HUE1=287;
Blockly.Blocks.ksb045.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.ksb045_init={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB045_HELPURL);
  this.setColour(Blockly.Blocks.ksb045.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.KSB045_TITLE)
      .appendField(new Blockly.FieldDropdown([["KSB045","KSB045"],["kodorobot","kodorobot"],["Joystick:bit","Joystick:bit"],["waveshare","waveshare"]]),"TYPE")
      .appendField(Blockly.Msg.PROBBIE_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KSB045_TOOLTIP)}
};

Blockly.Blocks.ksb045_button={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB045_HELPURL);
  this.setColour(Blockly.Blocks.ksb045.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.KSB045_TITLE)
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"],["Stick SW","SW"]]),"BUTTON");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_BUTTON_CHECK);
  this.setInputsInline(!0);
  this.appendStatementInput("KSB045_BUTTON_CALL");
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KSB045_TOOLTIP)}
};

Blockly.Blocks.ksb045_xy={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB045_HELPURL);
  this.setColour(Blockly.Blocks.ksb045.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.KSB045_TITLE)
      .appendField(Blockly.Msg.KSB045_XY)
      .appendField(new Blockly.FieldDropdown([["X","X"],["Y","Y"]]),"XY");
  this.appendDummyInput()
      .appendField(Blockly.Msg.KSB045_AXIS_END);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.KSB045_TOOLTIP)}
};

Blockly.Blocks.ksb045_mid_xy={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB045_HELPURL);
  this.setColour(Blockly.Blocks.ksb045.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.KSB045_TITLE)
      .appendField(Blockly.Msg.KSB045_MID_XY)
      .appendField(new Blockly.FieldDropdown([["X","X"],["Y","Y"]]),"XY");
  this.appendDummyInput()
      .appendField(Blockly.Msg.KSB045_AXIS_END);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.KSB045_TOOLTIP)}
};

Blockly.Blocks.ksb045_vibration={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB045_HELPURL);
  this.setColour(Blockly.Blocks.ksb045.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.KSB045_TITLE)
      .appendField(Blockly.Msg.KSB045_VIBRATION)
      .appendField(new Blockly.FieldDropdown([["ON","1"],["OFF","0"]]),"STAT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KSB045_TOOLTIP)}
};

Blockly.Blocks.ksb045_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.KSB045_HELPURL);
    this.setColour(Blockly.Blocks.ksb045.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.KSB045_TITLE)
        .appendField(Blockly.Msg.MAQUEEN_TONE_PRETEXT);
    this.appendDummyInput()
        .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TONE_LIST),"FREQ");
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.INOUT_TONE_TOOLTIP)}
};

Blockly.Blocks.ksb045_no_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.KSB045_HELPURL);
    this.setColour(Blockly.Blocks.ksb045.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.KSB045_TITLE)
        .appendField(Blockly.Msg.MAQUEEN_NO_TONE_PRETEXT);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.INOUT_TONE_TOOLTIP)}
};

Blockly.Blocks.ksb045_custom_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.KSB045_HELPURL);
    this.setColour(Blockly.Blocks.ksb045.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.KSB045_TITLE)
        .appendField(Blockly.Msg.MAQUEEN_TONE_PRETEXT);
    this.appendValueInput("FREQ")
        .setCheck("Number")
    this.appendValueInput("DURATION").setCheck("Number")
        .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_DURATION);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.INOUT_TONE_TOOLTIP)}
};

//Maqueen
Blockly.Blocks.maqueen={};
Blockly.Blocks.maqueen.HUE1=80;
Blockly.Blocks.maqueen.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("maqueen_ir_received_type"!=a[c].type&&"maqueen_ir_received_code"!=a[c].type&&"maqueen_ir_remote_received1"!=a[c].type&&"maqueen_ir_remote_received2"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"maqueen_ir_event"==a[c].type)
				return!0;
		return b
};
Blockly.Blocks.maqueen_head_light={init:function(){
  this.setHelpUrl(Blockly.Msg.MAQUEEN_HELPURL);
  this.setColour(Blockly.Blocks.maqueen.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CATEGORY_MAQUEEN)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MAQUEEN_LIGHT_LEFT,"LEFT"],[Blockly.Msg.MAQUEEN_LIGHT_RIGHT,"RIGHT"]]),"STAT1");
  this.appendDummyInput()
      .appendField("   ")
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MAQUEEN_LIGHT_ON,"ON"],[Blockly.Msg.MAQUEEN_LIGHT_OFF,"OFF"]]),"STAT2");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)}
};
Blockly.Blocks.maqueen_move_car={init:function(){
  this.setHelpUrl(Blockly.Msg.MAQUEEN_HELPURL);
  this.setColour(Blockly.Blocks.maqueen.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CATEGORY_MAQUEEN)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LIOU_ROBOT_FORWARD,"FORWARD"],[Blockly.Msg.LIOU_ROBOT_BACKWARD,"BACKWARD"],[Blockly.Msg.LIOU_ROBOT_LEFT,"LEFT"],[Blockly.Msg.LIOU_ROBOT_RIGHT,"RIGHT"],[Blockly.Msg.LIOU_ROBOT_STOP,"STOP"]]),"STAT");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED);
  this.appendValueInput("SPEED")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)}
};
Blockly.Blocks.maqueen_move_motor={init:function(){
  this.setHelpUrl(Blockly.Msg.MAQUEEN_HELPURL);
  this.setColour(Blockly.Blocks.maqueen.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CATEGORY_MAQUEEN)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LIOU_ROBOT_LEFT_SIDE,"LEFT"],[Blockly.Msg.LIOU_ROBOT_RIGHT_SIDE,"RIGHT"]]),"STAT1")
	  .appendField(Blockly.Msg.LIOU_ROBOT_WHEEL);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LIOU_ROBOT_FORWARD,"FORWARD"],[Blockly.Msg.LIOU_ROBOT_BACKWARD,"BACKWARD"],[Blockly.Msg.LIOU_ROBOT_STOP,"STOP"]]),"STAT2");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED);
  this.appendValueInput("SPEED")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)}
};
Blockly.Blocks.maqueen_sonar={init:function(){
  this.setHelpUrl(Blockly.Msg.MAQUEEN_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_SONAR)
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)}
};

Blockly.Blocks.maqueen_line_follower={init:function(){
  this.setHelpUrl(Blockly.Msg.MAQUEEN_HELPURL);
  this.setColour(Blockly.Blocks.logic.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_LINE_FOLLOWER)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LIOU_ROBOT_LEFT_SIDE,"13"],[Blockly.Msg.LIOU_ROBOT_RIGHT_SIDE,"12"]]),"STAT1")
      .appendField(" ");
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LIOU_ROBOT_BLACK,"0"],[Blockly.Msg.LIOU_ROBOT_WHITE,"1"]]),"STAT2")
      .appendField("?");
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)}
};
Blockly.Blocks.maqueen_servo={init:function(){
  this.setHelpUrl(Blockly.Msg.MAQUEEN_HELPURL);
  this.setColour(Blockly.Blocks.maqueen.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CATEGORY_MAQUEEN)
      .appendField(Blockly.Msg.LIOU_ROBOT_SERVO)
      .appendField(new Blockly.FieldDropdown([["S1","0x14"],["S2","0x15"]]),"STAT");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_ANGLE);
  this.appendValueInput("ANGLE")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)}
};

Blockly.Blocks.maqueen_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.INOUT_TONE_HELPURL);
    this.setColour(Blockly.Blocks.maqueen.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CATEGORY_MAQUEEN)
        .appendField(Blockly.Msg.MAQUEEN_TONE_PRETEXT);
    this.appendDummyInput()
        .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TONE_LIST),"FREQ");
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.INOUT_TONE_TOOLTIP)}
};

Blockly.Blocks.maqueen_no_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.INOUT_TONE_HELPURL);
    this.setColour(Blockly.Blocks.maqueen.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CATEGORY_MAQUEEN)
        .appendField(Blockly.Msg.MAQUEEN_NO_TONE_PRETEXT);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.INOUT_TONE_TOOLTIP)}
};

Blockly.Blocks.maqueen_custom_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.INOUT_TONE_HELPURL);
    this.setColour(Blockly.Blocks.maqueen.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CATEGORY_MAQUEEN)
        .appendField(Blockly.Msg.MAQUEEN_TONE_PRETEXT);
    this.appendValueInput("FREQ")
        .setCheck("Number")
    this.appendValueInput("DURATION").setCheck("Number")
        .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_DURATION);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.INOUT_TONE_TOOLTIP)}
};

Blockly.Blocks.neopixel_begin_maqueen={init:function(){
	this.setHelpUrl(Blockly.Msg.NEOPIXEL_BEGIN_HELPURL);
	this.setColour(Blockly.Blocks.neopixel.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.INITIALIZES_SETUP_APPENDTEXT)
		.appendField(Blockly.Msg.NEOPIXEL_TITLE)
	this.appendDummyInput()
	    .appendField(Blockly.Msg.NEOPIXEL_BEGIN_BRIGHTNESS)
		.appendField(new Blockly.FieldTextInput("30"),"BRIGHTNESS");
	this.setInputsInline(!0);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
	this.setTooltip(Blockly.Msg.NEOPIXEL_BEGIN_TOOLTIP)}
};

Blockly.Blocks.maqueen_button={init:function(){
  this.setHelpUrl(Blockly.Msg.MAQUEEN_HELPURL);
  this.setColour(Blockly.Blocks.maqueen.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["A","A"],["B","B"],["A+B","C"]]),"AB_BUTTON");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_BUTTON_CHECK);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_BUTTON_CALL");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)}
};


Blockly.Blocks.maqueen_ir_event={init:function(){
  this.setHelpUrl(Blockly.Msg.MAQUEEN_HELPURL);
  this.setColour(Blockly.Blocks.maqueen.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_IR_EVENT)
  this.setInputsInline(!0);
  this.appendStatementInput("IR_EVENT");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)}
};

Blockly.Blocks.maqueen_ir_remote_received1={init:function(){
  var Maqueen_IR=[["Power","fd00ff"],["VOL+","fd807f"],["FUNC/STOP","fd40bf"],["|<<","fd20df"],[">||","fda05f"],[">>|","fd609f"],["▼","fd10ef"],["VOL-","fd906f"],["▲","fd50af"],["EQ","fdb04f"],["ST/REPT","fd708f"]
  ,["0","fd30cf"],["1","fd08f7"],["2","fd8877"],["3","fd487"],["4","fd28d7"],["5","fda857"],["6","fd6897"],["7","fd18e7"],["8","fd9867"],["9","fd58a7"]];
  this.setHelpUrl(Blockly.Msg.MAQUEEN_HELPURL);
  this.setColour(Blockly.Blocks.maqueen.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_IR_RECEIVED1)
	  .appendField(new Blockly.FieldDropdown(Maqueen_IR),"IR_SIGNAL");
  this.setInputsInline(!0);
  this.appendStatementInput("IR_RECEIVED");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)}
};

Blockly.Blocks.maqueen_ir_remote_received2={init:function(){
  this.setHelpUrl(Blockly.Msg.MAQUEEN_HELPURL);
  this.setColour(Blockly.Blocks.maqueen.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_IR_RECEIVED2_TYPE)
	    .appendField(new Blockly.FieldDropdown([["NEC","3"],["Sony","4"],["RC5","1"],["RC6","2"]]),"IR_TYPE");
  this.appendValueInput("IR_SIGNAL").setCheck("String")
      .appendField(Blockly.Msg.LIOU_ROBOT_IR_RECEIVED2_MSG);
  this.setInputsInline(!0);
  this.appendStatementInput("IR_RECEIVED");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)}
};
Blockly.Blocks.maqueen_ir_received_type={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.texts.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_RECEIVED_TYPE)
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.maqueen_ir_received_code={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.texts.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_RECEIVED_CODE)
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}

};

//IR
Blockly.Blocks.ir={};
Blockly.Blocks.ir.HUE=320;
Blockly.Blocks.ir.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("ir_received_type"!=a[c].type&&"ir_received_code"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"ir_event"==a[c].type)
				return!0;
		return b
};
Blockly.Blocks.ir.checkSetPin=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("ir_event"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),("ir_receiver_pin"==a[c].type)||("ir_receiver_pin1"==a[c].type)||("startPlus_ir_receive"==a[c].type))
				return!0;
		return b
};

Blockly.Blocks.ir.checkESP8266pin=function(a){
	var b=null;
  if (Blockly.Arduino.my_board_type!="ESP8266"){
		return b;
  }
  else
		return!0;
};

Blockly.Blocks.ir.checkESP8266=function(a,slave,master){
	var b=null;
  if (Blockly.Arduino.my_board_type!="ESP8266"){
		return!0;
  }
  else{
    var d=a.type;
    a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b;
  }
};

Blockly.Blocks.ir_receiver_pin={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_RECEIVE_PIN_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(profile["default"].digital),"PIN");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.ir_receiver_pin1={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_RECEIVE_PIN_TITLE);
  this.appendValueInput("PIN")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.ir_receiver_7697_pin={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_RECEIVE_PIN_TITLE+"(7697)");
  this.appendValueInput("PIN")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.ir_sender_8266_pin={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_SENDER_8266_PIN_TITLE);
  this.appendValueInput("PIN")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.ljj_ir_sender_pin={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_SENDER_PIN_TITLE);
  this.appendValueInput("PIN")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.ljj_ir_send={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendValueInput("CODE")
      .setCheck("String")
      .appendField(Blockly.Msg.IR_REMOTE_SEND);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_REMOTE_TYPE)
      .appendField(new Blockly.FieldDropdown([["NEC","NEC"],["SONY","SONY"],["RC5","RC5"],["RC6","RC6"],["JVC","JVC"],["SAMSUNG","SAMSUNG"],["LG","LG"],["LEGO_PF","LEGO_PF"]]),"IR_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.ljj_ir_send2={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendValueInput("CODE")
      .setCheck("String")
      .appendField(Blockly.Msg.IR_REMOTE_SEND);
  this.appendValueInput("IR_TYPE")
      .setCheck("String")
      .appendField(Blockly.Msg.IR_REMOTE_TYPE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.ir_event={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_IR_EVENT)
  this.setInputsInline(!0);
  this.appendStatementInput("IR_EVENT");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.ir_remote_received={init:function(){
  var KSRobot_IR=[["A","ffa25d"],["B","ff629d"],["C","ffe21d"],["D","ff22dd"],["▲","ff02fd"],["E","ffc23d"],["◄","ffe01f"],["⚙","ffa857"],["►","ff906f"],
                  ["0","ff6897"],["▼","ff9867"],["F","ffb04f"],["1","ff30cf"],["2","ff18e7"],["3","ff7a85"],["4","ff10ef"],["5","ff38c7"],["6","ff5aa5"],
                  ["7","ff42bd"],["8","ff4ab5"],["9","ff52ad"]];
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_IR_RECEIVED1+Blockly.Msg.IR_REMOTE)
	    .appendField(new Blockly.FieldDropdown(KSRobot_IR),"IR_SIGNAL");
  this.setInputsInline(!0);
  this.appendStatementInput("IR_RECEIVED");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.ir_received_type={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_RECEIVED_TYPE)
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.ir_received_code={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_RECEIVED_CODE)
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.ir_sender_pin={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_SENDER_PIN_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(profile["default"].digital),"PIN");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};



//weather
Blockly.Blocks.weather={};
Blockly.Blocks.weather.HUE=180;
Blockly.Blocks.weather.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("weather_getID"!=a[c].type&&"weather_getID_TW"!=a[c].type&&"weather_getValue"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"weather_fetchWeatherInfo"==a[c].type)
				return!0;
		return b
};


Blockly.Blocks.weather_fetchWeatherInfo={init:function(){
  this.setHelpUrl(Blockly.Msg.WEATHER_HELPURL);
  this.setColour(Blockly.Blocks.weather.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.FETCH_WEATHER_TITLE);
  this.appendValueInput("CITYID").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.WEATHER_CITYID);
  this.appendValueInput("KEY")
      .setCheck("String")
	    .setAlign(Blockly.ALIGN_RIGHT)
	    .appendField(Blockly.Msg.WEATHER_KEY);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.WEATHER_TOOLTIP)}
};

Blockly.Blocks.weather_getID={init:function(){
  var CityID=[["Taipei","1668341"],["Hong Kong","1819729"],["Tokyo","1850147"],["Seoul","1835848"],["Beijing","1816670"],["Shanghai","1796236"],
      ["Singapore","1880252"],["London","2643743"],["Berlin","2950159"],["Paris","2988507"],["NewYork","5128638"],["Sydney","2147714"]];
  this.setHelpUrl(Blockly.Msg.WEATHER_HELPURL);
  this.setColour(Blockly.Blocks.weather.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.WEATHER_GET_CITYID);
  this.appendDummyInput()  
      .appendField(new Blockly.FieldDropdown(CityID),"CITY_ID");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.WEATHER_TOOLTIP)}
};

Blockly.Blocks.weather_getID_TW={init:function(){
  var CityID=[["基隆市","6724654"],["台北市","1668341"],["新北市","1670029"],["桃園市","1667905"],["新竹市","1675107"],["苗栗縣","1671971"],["台中市","1668399"],
      ["彰化縣","1679136"],["南投縣","1671564"],["雲林縣","1665194"],["嘉義市","1678836"],["台南市","1668352"],["高雄市","7280289"],["屏東縣","1670479"],
      ["宜蘭縣","1674197"],["花蓮縣","1674502"],["台東縣","1668295"],["澎湖縣","1670651"],["金門金城縣","1678008"],["馬祖南竿","7552914"]];
  this.setHelpUrl(Blockly.Msg.WEATHER_HELPURL);
  this.setColour(Blockly.Blocks.weather.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.WEATHER_GET_CITYID_TW);
  this.appendDummyInput()  
      .appendField(new Blockly.FieldDropdown(CityID),"CITY_ID");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.WEATHER_TOOLTIP)}
};

Blockly.Blocks.weather_getValue={init:function(){
  this.setHelpUrl(Blockly.Msg.WEATHER_HELPURL);
  this.setColour(Blockly.Blocks.weather.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.WEATHER_GET_VALUE);
  this.appendDummyInput()  
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.WEATHER_CITY_NAME,"doc[\"name\"].as<char*>()"],
                                              [Blockly.Msg.WEATHER_CITY_WEATHER,"doc[\"weather\"][0][\"main\"].as<char*>()"],
                                              [Blockly.Msg.WEATHER_CITY_DESCRIPTION,"doc[\"weather\"][0][\"description\"].as<char*>()"],
                                              [Blockly.Msg.WEATHER_CITY_TEMP,"(doc[\"main\"][\"temp\"].as<float>()-273.15)"],
                                              [Blockly.Msg.WEATHER_CITY_TEMP_MIN,"(doc[\"main\"][\"temp_min\"].as<float>()-273.15)"],
                                              [Blockly.Msg.WEATHER_CITY_TEMP_MAX,"(doc[\"main\"][\"temp_max\"].as<float>()-273.15)"],
                                              [Blockly.Msg.WEATHER_CITY_PRESSURE,"doc[\"main\"][\"pressure\"].as<long>()"],
                                              [Blockly.Msg.WEATHER_CITY_HUMIDITY,"doc[\"main\"][\"humidity\"].as<long>()"],
                                              [Blockly.Msg.WEATHER_CITY_WIND_SPEED,"doc[\"wind\"][\"speed\"].as<float>()"],
                                              [Blockly.Msg.WEATHER_CITY_WIND_DEG,"doc[\"wind\"][\"deg\"].as<long>()"],
                                              [Blockly.Msg.WEATHER_CITY_SUNRISE,"convMyTime(doc[\"sys\"][\"sunrise\"].as<long>()+doc[\"timezone\"].as<long>())"],
                                              [Blockly.Msg.WEATHER_CITY_SUNSET,"convMyTime(doc[\"sys\"][\"sunset\"].as<long>()+doc[\"timezone\"].as<long>())"]
      
      ]),"VALUE_NAME");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.WEATHER_TOOLTIP)}
};

//AQI
Blockly.Blocks.aqi={};
Blockly.Blocks.aqi.HUE=320;
Blockly.Blocks.aqi.HUE2=30;
Blockly.Blocks.aqi.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("aqi_getAQIValue"!=a[c].type&&"aqi_getAQIValue"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"aqi_fetchAQIInfo"==a[c].type)
				return!0;
		return b
};

Blockly.Blocks.aqi.checkBlocks2=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("ESP8266_aqi_getAQIValue"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"ESP8266_aqi_fetchAQIInfo"==a[c].type)
				return!0;
		return b
};

Blockly.Blocks.aqi_fetchAQIInfo={init:function(){
  this.setHelpUrl(Blockly.Msg.AQI_HELPURL);
  this.setColour(Blockly.Blocks.aqi.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.FETCH_AQI_TITLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.AQI_TOOLTIP)}
};

Blockly.Blocks.aqi_getAQIValue={init:function(){
  this.setHelpUrl(Blockly.Msg.AQI_HELPURL);
  this.setColour(Blockly.Blocks.aqi.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.AQI_GET_VALUE_TITLE);
  this.appendValueInput("SITENAME")
      .setCheck("String")
      .appendField(Blockly.Msg.AQI_GET_VALUE_STATION);
  this.appendValueInput("ATTRNAME")
      .setCheck("String")
      .appendField(Blockly.Msg.AQI_GET_VALUE_ATTR);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.AQI_TOOLTIP)}
};

Blockly.Blocks.ESP8266_aqi_fetchAQIInfo={init:function(){
  this.setHelpUrl(Blockly.Msg.AQI_HELPURL);
  this.setColour(Blockly.Blocks.aqi.HUE2);
  this.appendDummyInput().appendField("ESP8266 "+Blockly.Msg.FETCH_AQI_TITLE);
  this.appendValueInput("SITENAME")
      .setCheck("String")
      .appendField(Blockly.Msg.AQI_GET_VALUE_STATION);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.AQI_TOOLTIP)}
};

Blockly.Blocks.ESP8266_aqi_getAQIValue={init:function(){
  this.setHelpUrl(Blockly.Msg.AQI_HELPURL);
  this.setColour(Blockly.Blocks.aqi.HUE2);
  this.appendDummyInput().appendField("ESP8266 "+Blockly.Msg.AQI_GET_VALUE_TITLE);
  this.appendValueInput("ATTRNAME")
      .setCheck("String")
      .appendField(Blockly.Msg.AQI_GET_VALUE_ATTR);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.AQI_TOOLTIP)}
};


Blockly.Blocks.aqi_attrname_list={init:function(){
  this.setHelpUrl(Blockly.Msg.AQI_HELPURL);
  this.setColour(Blockly.Blocks.aqi.HUE);
  this.appendDummyInput()  
      .appendField(" ")
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.AQI_AttrName),"ATTRNAME");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.AQI_TOOLTIP)}
};

//Lumex 7-seg
Blockly.Blocks.lmx_7_seg={};
Blockly.Blocks.lmx_7_seg.HUE=90;
Blockly.Blocks.lmx_7seg_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE)
      .appendField(Blockly.Msg.LMX_7SEG_INIT);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial1","Serial1"],["Serial2","Serial2"],["Serial","Serial"]]),"UART_NO");
  this.appendValueInput("TX_PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LMX_7SEG_TX_PIN);
  this.appendValueInput("RX_PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LMX_7SEG_RX_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_7697_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE)
      .appendField(Blockly.Msg.LMX_7697_INIT);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial1","Serial1"],["Serial","Serial"]]),"UART_NO");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_digits_count={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE)
      .appendField(Blockly.Msg.LMX_7SEG_DIGITS_COUNT);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["3","3"],["4","4"],["5","5"],["6","6"]]),"DIGITS");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_clear={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE)
      .appendField(Blockly.Msg.LMX_7SEG_CLEAR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_blink={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE)
      .appendField(Blockly.Msg.LMX_7SEG_BLINK);
  this.appendValueInput("FREQ")
      .setCheck("Number")
      .appendField(Blockly.Msg.LMX_7SEG_FREQ);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_no_blink={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE)
      .appendField(Blockly.Msg.LMX_7SEG_STOP_BLINK);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_light_level={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE);
  this.appendValueInput("LIGHT")
      .setCheck("Number")
      .appendField(Blockly.Msg.LMX_7SEG_LIGHT_LEVEL);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_putNumber={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE);
  this.appendValueInput("MY_NUM")
      .setCheck("Number")
      .appendField(Blockly.Msg.LMX_7SEG_PUT_NUMBER);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_ALIGN)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LMX_7SEG_ALIGN_TYPE),"ALIGN_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_putString={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE);
  this.appendValueInput("MY_TEXT")
      .setCheck("String")
      .appendField(Blockly.Msg.LMX_7SEG_PUT_STRING);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_putSingle={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE);
  this.appendValueInput("MY_NUM")
      .setCheck("Number")
      .appendField(Blockly.Msg.LMX_7SEG_PUT_SINGLE);
  this.appendValueInput("POS")
      .setCheck("Number")
      .appendField(Blockly.Msg.LMX_7SEG_POS);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_clear_indicator={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_CLEAR_INDICATOR)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LMX_7SEG_INDICATOR_LIST),"ALIGN_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_mode_indicator={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_MODE_INDICATOR)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LMX_7SEG_INDICATOR_MODE_LIST),"MODE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

Blockly.Blocks.lmx_7seg_indicatorLevel={init:function(){
  this.setHelpUrl(Blockly.Msg.LMX_7SEG_HELPURL);
  this.setColour(Blockly.Blocks.lmx_7_seg.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LMX_7SEG_SET)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LMX_7SEG_INDICATOR_LIST),"ALIGN_TYPE");
  this.appendValueInput("LEVEL")
      .setCheck("Number")
      .appendField(Blockly.Msg.LMX_7SEG_SHOW_LEVEL);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LMX_7SEG_TOOLTIP)}
};

//LDM6432
Blockly.Blocks.ldm6432={};
Blockly.Blocks.ldm6432.HUE=90;
Blockly.Blocks.ldm_mqtt_topic={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_SET_TOPIC_PREFIX);
  this.appendValueInput("TOPIC")
      .setCheck("String");
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_SET_TOPIC_POST);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_mqtt_public={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_SET_MQTT_PUBLIC);
  this.appendValueInput("TOPIC")
      .setCheck("String");
  this.appendValueInput("BITMAP_TOPIC")
      .appendField(Blockly.Msg.LDM6432_SET_MQTT_BITMAP_PUBLIC)
      .setCheck("String");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_send_bitmap={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_SEND_BITMAP);
  this.appendValueInput("BITMAP")
      .setCheck("String");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_esp32_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_UART_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_ESP32_INIT);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial1","Serial1"],["Serial2","Serial2"],["Serial","Serial"]]),"UART_NO");
  this.appendValueInput("TX_PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LDM6432_TX_PIN);
  this.appendValueInput("RX_PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LDM6432_RX_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_7697_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_UART_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_7697_INIT);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Serial1","Serial1"],["Serial","Serial"]]),"UART_NO");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_waitForE={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_WAIT_FOR_E)
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"WAITFORE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_clock={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_CLOCK)
      .appendField(new Blockly.FieldDropdown([["ON","run"],["OFF","atfd=(0)"]]),"CLOCK");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_clear={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_CLEAR)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_display={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_DISPLAY)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_on_off={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_ON_OFF)
      .appendField(new Blockly.FieldDropdown([["ON","ATf1=()"],["OFF","ATf0=()"]]),"LDM");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_show_ver={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_VERSION)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_command={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_COMMAND);
  this.appendValueInput("COMMAND")
      .setCheck("String");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_showPage1={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_SHOWPAGE1);
  this.appendValueInput("PAGE")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_effectSpeed={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_EFFECTSPEED);
  this.appendValueInput("SPEED")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_showPage2={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_SHOWPAGE2);
  this.appendValueInput("PAGE")
      .setCheck("Number");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_SHOWPAGE2_EFFECT)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LDM6432_ANIMATION_TYPE1,"ATfd=(2)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE2,"ATfd=(3)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE3,"ATfd=(4)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE4,"ATfd=(5)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE5,"ATfd=(6)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE6,"ATfd=(7)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE7,"ATfd=(8)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE8,"ATfd=(9)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE9,"ATfd=(10)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE10,"ATfd=(11)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE11,"ATfd=(12)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE12,"ATfd=(13)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE13,"ATfd=(14)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE14,"ATfd=(15)"]]),"EFFECT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_pagesInterval={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_PAGES_INTERVAL);
  this.appendValueInput("INTERVAL")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_playPages={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_PLAY_PAGES);
  this.appendValueInput("PAGES")
      .appendField(Blockly.Msg.LDM6432_PLAY_PAGES_TOTAL)
      .setCheck("Number");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_SHOWPAGE2_EFFECT)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LDM6432_ANIMATION_TYPE1,"ATfd=(16)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE2,"ATfd=(17)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE3,"ATfd=(18)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE4,"ATfd=(19)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE5,"ATfd=(20)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE6,"ATfd=(22)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE7,"ATfd=(23)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE8,"ATfd=(24)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE9,"ATfd=(25)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE10,"ATfd=(26)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE11,"ATfd=(27)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE12,"ATfd=(28)"],
                                              [Blockly.Msg.LDM6432_ANIMATION_TYPE13,"ATfd=(29)"],[Blockly.Msg.LDM6432_ANIMATION_TYPE14,"ATfd=(30)"]]),"EFFECT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_stop_animation={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_STOP_ANIMATION)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_saveToROM={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_SAVE_TO_ROM)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_putString={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_PUTSTRING);
  this.appendValueInput("PUTSTRING")
      .appendField(Blockly.Msg.LDM6432_PUTSTRING_CONTENT)
      .setCheck("String");
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_FONTSIZE)
      .appendField(new Blockly.FieldDropdown([["5*7","AT81="],["8*16","AT83="]]),"FONT");
  this.appendValueInput("LINE")
      .setCheck("Number")
      .appendField(Blockly.Msg.LDM6432_LINE);
  this.appendValueInput("COLUMN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LDM6432_COLUMN);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_transparent={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_TRANSPARENT)
      .appendField(new Blockly.FieldDropdown([["ON","AT2b=(0)"],["OFF","AT2b=(1)"]]),"TRANSPARENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_setColor={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_SET_COLOR);
  this.appendValueInput("COLOR")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_colorCode={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_COLOR_CODE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LDM6432_COLOR),"COLOR_CODE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_background={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_BACKGROUND);
  this.appendValueInput("COLOR")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_global_change_color={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_GLOBAL_CHANGE_COLOR);
  this.appendValueInput("COLOR1")
      .setCheck("Number");
  this.appendValueInput("COLOR2")
      .appendField(Blockly.Msg.LDM6432_GLOBAL_CHANGE_COLOR_TO)
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_local_change_color={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_LOCAL_CHANGE_COLOR);
  this.appendValueInput("X")
      .appendField(Blockly.Msg.LDM6432_LOCAL_CHANGE_COLOR_X)
      .setCheck("Number");
  this.appendValueInput("Y")
      .appendField(Blockly.Msg.LDM6432_LOCAL_CHANGE_COLOR_Y)
      .setCheck("Number");
  this.appendValueInput("WIDTH")
      .appendField(Blockly.Msg.LDM6432_LOCAL_CHANGE_COLOR_WIDTH)
      .setCheck("Number");
  this.appendValueInput("HEIGHT")
      .appendField(Blockly.Msg.LDM6432_LOCAL_CHANGE_COLOR_HEIGHT)
      .setCheck("Number");
  this.appendValueInput("COLOR1")
      .appendField(Blockly.Msg.LDM6432_LOCAL_CHANGE_COLOR1)
      .setCheck("Number");
  this.appendValueInput("COLOR2")
      .appendField(Blockly.Msg.LDM6432_LOCAL_CHANGE_COLOR2)
      .setCheck("Number");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_setXYcolor={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_XY_COLOR);
  this.appendValueInput("COLOR")
      .setCheck("Number");
  this.appendValueInput("X")
      .appendField(Blockly.Msg.LDM6432_XY_COLOR_X)
      .setCheck("Number");
  this.appendValueInput("Y")
      .appendField(Blockly.Msg.LDM6432_XY_COLOR_Y)
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_allColorChange={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_ALL_COLOR_CHANGE);
  this.appendValueInput("COLOR")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_drawLine={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_DRAW_LINE);
  this.appendValueInput("X1")
      .appendField(Blockly.Msg.LDM6432_DRAW_LINE_COLOR_X1+"(0~63)")
      .setCheck("Number");
  this.appendValueInput("Y1")
      .appendField(Blockly.Msg.LDM6432_DRAW_LINE_COLOR_Y1+"(0~31)")
      .setCheck("Number");
  this.appendValueInput("X2")
      .appendField(Blockly.Msg.LDM6432_DRAW_LINE_COLOR_X2+"(0~63)")
      .setCheck("Number");
  this.appendValueInput("Y2")
      .appendField(Blockly.Msg.LDM6432_DRAW_LINE_COLOR_Y2+"(0~31)")
      .setCheck("Number");
  this.appendValueInput("COLOR")
      .appendField(Blockly.Msg.LDM6432_COLOR_CODE+"(0~111)")
      .setCheck("Number");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_drawRectangle={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_DRAW_RECTANGLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_FILLED)
      .appendField(new Blockly.FieldDropdown([["YES","1"],["NO","0"]]),"FILLED_TYPE");
  this.appendValueInput("X1")
      .appendField(Blockly.Msg.LDM6432_DRAW_LINE_COLOR_X1+"(0~63)")
      .setCheck("Number");
  this.appendValueInput("Y1")
      .appendField(Blockly.Msg.LDM6432_DRAW_LINE_COLOR_Y1+"(0~31)")
      .setCheck("Number");
  this.appendValueInput("X2")
      .appendField(Blockly.Msg.LDM6432_DRAW_LINE_COLOR_X2+"(0~63)")
      .setCheck("Number");
  this.appendValueInput("Y2")
      .appendField(Blockly.Msg.LDM6432_DRAW_LINE_COLOR_Y2+"(0~31)")
      .setCheck("Number");
  this.appendValueInput("COLOR")
      .appendField(Blockly.Msg.LDM6432_COLOR_CODE+"(0~111)")
      .setCheck("Number");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_drawCircle={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_DRAW_CIRCLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_FILLED)
      .appendField(new Blockly.FieldDropdown([["YES","1"],["NO","0"]]),"FILLED_TYPE");
  this.appendValueInput("X1")
      .appendField(Blockly.Msg.LDM6432_DRAW_CIRCLE_CENTER_X+"(0~63)")
      .setCheck("Number");
  this.appendValueInput("Y1")
      .appendField(Blockly.Msg.LDM6432_DRAW_CIRCLE_CENTER_Y+"(0~31)")
      .setCheck("Number");
  this.appendValueInput("RADIUS")
      .appendField(Blockly.Msg.LDM6432_DRAW_CIRCLE_RADIUS)
      .setCheck("Number");
  this.appendValueInput("COLOR")
      .appendField(Blockly.Msg.LDM6432_COLOR_CODE+"(0~111)")
      .setCheck("Number");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_drawSquare={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_DRAW_SQUARE);
  this.appendValueInput("X1")
      .appendField(Blockly.Msg.LDM6432_DRAW_LINE_COLOR_X1+"(0~63)")
      .setCheck("Number");
  this.appendValueInput("Y1")
      .appendField(Blockly.Msg.LDM6432_DRAW_LINE_COLOR_Y1+"(0~31)")
      .setCheck("Number");
  this.appendValueInput("WIDTH")
      .appendField(Blockly.Msg.LDM6432_DRAW_SQUARE_WIDTH)
      .setCheck("Number");
  this.appendValueInput("COLOR")
      .appendField(Blockly.Msg.LDM6432_COLOR_CODE+"(0~111)")
      .setCheck("Number");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_pageScroll={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_PAGE_SCROLL);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_PAGE_SCROLL_TYPE_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LDM6432_PAGE_SCROLL_TYPE),"SCROLL_TYPE");
  this.appendValueInput("SCROLLTIME")
      .appendField(Blockly.Msg.LDM6432_PAGE_SCROLL_TIME)
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_eraseImageInOut={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_ERASE_IMAGE_OUT);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_IMAGE_DIRECTION_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LDM6432_IMAGE_OUT_TYPE),"SCROLL_TYPE");
  this.appendValueInput("SCROLLTIME")
      .appendField(Blockly.Msg.LDM6432_IMAGE_OUT_TIME)
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_showImageInOut={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_SHOW_IMAGE_OUT);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_IMAGE_DIRECTION_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LDM6432_IMAGE_OUT_TYPE),"SCROLL_TYPE");
  this.appendValueInput("SCROLLTIME")
      .appendField(Blockly.Msg.LDM6432_IMAGE_OUT_TIME)
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_saveDisplayed={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_SAVE_DISPLAYED)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_loadDisplayed={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_LOAD_DISPLAYED)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_loadPattern={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_LOAD_PATTERN);
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_LOAD_PATTERN_ICON)
      .appendField(new Blockly.FieldDropdown([["5*5","5"],["8*8","8"],["12*12","12"],["16*16","16"]]),"ICON_TYPE");
  this.appendValueInput("ICON_ID")
      .appendField(Blockly.Msg.LDM6432_LOAD_PATTERN_ICON_ID)
      .setCheck("Number");
  this.appendValueInput("X1")
      .appendField(Blockly.Msg.LDM6432_XY_COLOR_X+"(0~63)")
      .setCheck("Number");
  this.appendValueInput("Y1")
      .appendField(Blockly.Msg.LDM6432_XY_COLOR_Y+"(0~31)")
      .setCheck("Number");
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_LOAD_PATTERN_NOW)
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"SHOW_TYPE");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_movePattern={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_MOVE_PATTERN)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LDM6432_MOVE_PATTERN_TYPE),"MOVE_TYPE");
  this.appendDummyInput().appendField(Blockly.Msg.LDM6432_LOAD_PATTERN_ICON)
      .appendField(new Blockly.FieldDropdown([["5*5","5"],["8*8","8"],["12*12","12"],["16*16","16"]]),"ICON_TYPE");
  this.appendValueInput("ICON_ID")
      .appendField(Blockly.Msg.LDM6432_LOAD_PATTERN_ICON_ID)
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

Blockly.Blocks.ldm_showAll={init:function(){
  this.setHelpUrl(Blockly.Msg.LDM6432_HELPURL);
  this.setColour(Blockly.Blocks.ldm6432.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_SHOW_ALL)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LDM6432_TOOLTIP)}
};

//BME280
Blockly.Blocks.bme280={};
Blockly.Blocks.bme280.HUE = "300";
Blockly.Blocks.bme280.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("getBme280_value"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"bme280_addr"==a[c].type)
				return!0;
		return b
};
Blockly.Blocks.bme280_addr={init:function(){
  this.setHelpUrl(Blockly.Msg.BME280_HELPURL);
  this.setColour(Blockly.Blocks.bme280.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BME280_ADDR_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["0x76","0x76"],["0x77","0x77"]]),"ADDRESS");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.BME280_TOOLTIP)}
};

Blockly.Blocks.getBme280_value={init:function(){
  this.setHelpUrl(Blockly.Msg.BME280_HELPURL);
  this.setColour(Blockly.Blocks.bme280.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BME280_GET_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.BME280_VALUE_TYPE),"VALUE_TYPE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.BME280_TOOLTIP)}
};

//MTK7697:bit
Blockly.Blocks.mtk7697bit={};
Blockly.Blocks.mtk7697bit.HUE=80;
Blockly.Blocks.mtk7697bit_button={init:function(){
  this.setHelpUrl(Blockly.Msg.MTK7697BIT_HELPURL);
  this.setColour(Blockly.Blocks.mtk7697bit.HUE);
  this.appendDummyInput()
      .appendField("7697:Bit")
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["A","A"],["B","B"],["A+B","C"]]),"AB_BUTTON");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_BUTTON_CHECK);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_BUTTON_CALL");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MTK7697BIT_TOOLTIP)}
};

Blockly.Blocks.mtk7697bit_pinMap={init:function(){
  this.setHelpUrl(Blockly.Msg.MTK7697BIT_HELPURL);
  this.setColour(Blockly.Blocks.mtk7697bit.HUE);
  this.appendDummyInput()
      .appendField("7697:Bit")
      .appendField(Blockly.Msg.MTK7697BIT_PINMAP_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["P0","14"],["P1","15"],["P2","16"],["P3","2"],["P4","6"],["P5","0"],["P6","3"],["P8","17"],["P9","5"],["P10","1"],["P11","7"],["P12","4"],["P13","13"],["P14","12"],["P15","11"],["P16","10"],["P19","8"],["P20","9"]]),"MTK_7697_PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MTK7697BIT_TOOLTIP)}
};

Blockly.Blocks.oled_display_setting_new={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE +"  "+Blockly.Msg.INITIALIZES_SETUP_APPENDTEXT+'(I2C)')
        .appendField(new Blockly.FieldDropdown([["SSD1306","U8G2_SSD1306_128X64_NONAME_F_HW_I2C"],["SH1106","U8G2_SH1106_128X64_NONAME_F_HW_I2C"]]),"OLED_TYPE");
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_setting_spi={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE +"  "+Blockly.Msg.INITIALIZES_SETUP_APPENDTEXT)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.OLED_DISPLAY_SPI_TYPE_LIST,this.validate),"SPI_TYPE");
    this.appendDummyInput("opt")
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.OLED_DISPLAY_SPI),"OLED_TYPE");
    this.appendValueInput("DIN")
        .setCheck("Number")
        .appendField("DIN(MOSI) "+Blockly.Msg.LIOU_ROBOT_PIN)
        .setVisible(false);
    this.appendValueInput("SCLK")
        .setCheck("Number")
        .appendField("SCLK "+Blockly.Msg.LIOU_ROBOT_PIN)
        .setVisible(false);
    this.appendValueInput("CS")
        .setCheck("Number")
        .appendField("CS "+Blockly.Msg.LIOU_ROBOT_PIN);
    this.appendValueInput("DC")
        .setCheck("Number")
        .appendField("DC "+Blockly.Msg.LIOU_ROBOT_PIN);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setInputsInline(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)},validate: function(newValue) {
	    const sourceBlock = this.sourceBlock_;
	    sourceBlock.getInput("opt").removeField("OLED_TYPE");
      var myOpts=[];
      for(i=0;i<Blockly.Msg.OLED_DISPLAY_SPI.length;i++){
        myOpts.push([Blockly.Msg.OLED_DISPLAY_SPI[i][0],Blockly.Msg.OLED_DISPLAY_SPI[i][1].replace("aa",newValue)]);
      }
      sourceBlock.getInput("opt").appendField(new Blockly.FieldDropdown(myOpts),"OLED_TYPE");
      if (newValue=="SW"){
        sourceBlock.getInput("DIN").setVisible(true);
			  sourceBlock.getInput("SCLK").setVisible(true);
      } else if (newValue="HW"){
        sourceBlock.getInput("DIN").setVisible(false);
			  sourceBlock.getInput("SCLK").setVisible(false);
      }
    }
};

Blockly.Blocks.oled_display_rotation={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
        .appendField(Blockly.Msg.OLED_DISPLAY_ROTATION)
        .appendField(new Blockly.FieldDropdown([["0","U8G2_R0"],["1","U8G2_R1"],["2","U8G2_R2"],["3","U8G2_R3"]]),"ROTATION_MODE");
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_flip={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
        .appendField(Blockly.Msg.OLED_DISPLAY_FLIP)
        .appendField(new Blockly.FieldDropdown([["0","0"],["1","1"]]),"FLIP_MODE");
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_font_direction={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
        .appendField(Blockly.Msg.OLED_DISPLAY_FONT_DIR)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.OLED_DISPLAY_FONT_DIR_LIST),"FONT_DIR");
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_set_font={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
        .appendField(Blockly.Msg.OLED_DISPLAY_SET_ENG_FONT)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.OLED_DISPLAY_SET_FONT_SMALL,"u8g2_font_6x10_mf"],
                                                [Blockly.Msg.OLED_DISPLAY_SET_FONT_LARGE,"u8g2_font_8x13_mf"]
                                              ]),"FONT");
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_set_chinese_font={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.OLED_DISPLAY_TITLE+"  "+Blockly.Msg.OLED_DISPLAY_CHINESE_FONT);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_set_alphabet_font={init:function(){
  this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
  this.setColour(Blockly.Blocks.oled_display.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_TITLE);
  this.appendValueInput("FONT")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_SET_ALPHABET_FONT_NAME);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_show_xbm={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_IMAGE);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.OLED_DISPLAY_TITLE);
    this.appendValueInput("XBM").appendField(Blockly.Msg.OLED_DISPLAY_SHOW_XBM);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_set_overwrite={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
        .appendField(Blockly.Msg.OLED_DISPLAY_SET_OVERWRITE)
        .appendField(new Blockly.FieldDropdown([["Yes","u8g2.setFontMode(1);"],["No","u8g2.setFontMode(0);"]]),"OVERWRITE_MODE");
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_set_color={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
        .appendField(Blockly.Msg.OLED_DISPLAY_SET_COLOR)
        .appendField(new Blockly.FieldDropdown([["White","u8g2.setDrawColor(1);"],["Black","u8g2.setDrawColor(0);"]]),"DRAW_COLOR");
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_clear_buffer={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
        .appendField(Blockly.Msg.OLED_DISPLAY_CLEAR_BUFFER);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_send_buffer={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
        .appendField(Blockly.Msg.OLED_DISPLAY_SEND_BUFFER);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_draw_box={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
        .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_BOX_START);
    this.appendValueInput("START_X")
        .setCheck("Number")
        .appendField("X");
    this.appendValueInput("START_Y")
        .setCheck("Number")
        .appendField("Y");
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_BOX_END_NEW);
    this.appendValueInput("END_X")
        .setCheck("Number")
        .appendField("W");
    this.appendValueInput("END_Y")
        .setCheck("Number")
        .appendField("H");
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_draw_frame={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
        .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_FRAME_START);
    this.appendValueInput("START_X")
        .setCheck("Number")
        .appendField("X");
    this.appendValueInput("START_Y")
        .setCheck("Number")
        .appendField("Y");
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_FRAME_END_NEW);
    this.appendValueInput("END_X")
        .setCheck("Number")
        .appendField("W");
    this.appendValueInput("END_Y")
        .setCheck("Number")
        .appendField("H");
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_clock={
  init:function(){
    this.setHelpUrl(Blockly.Msg.ESP32NTP_HELPURL);
    this.setColour(Blockly.Blocks.oled_display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
        .appendField(Blockly.Msg.OLED_DISPLAY_CLOCK);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_set_glyph_font={init:function(){
  this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
  this.setColour(Blockly.Blocks.oled_display.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_TITLE);
  this.appendValueInput("FONT")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_SET_FONT_NAME);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_draw_symbol={init:function(){
  this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
  this.setColour(Blockly.Blocks.oled_display.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_DRAW_SYMBOL);
  this.appendValueInput("START_X")
      .setCheck("Number")
      .appendField("X:");
  this.appendValueInput("START_Y")
      .setCheck("Number")
      .appendField("Y:");
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_DRAW_SYMBOL_NUMBER);
  this.appendValueInput("SYMBOL_NUM")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_draw_chart={init:function(){
  this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_CHART);
  this.setColour(Blockly.Blocks.oled_display.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART);
  this.appendValueInput("INPUT")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_INPUT);
  this.appendValueInput("MIN")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_MIN);
  this.appendValueInput("MAX")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_MAX);
  this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_TYPE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.OLED_DISPLAY_CHART_TYPE_LIST),"CHART_TYPE");
  this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_SCROLL)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.OLED_DISPLAY_CHART_DIR_LIST),"DIR_TYPE");
  this.appendStatementInput("EXTRA")
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_EXTRA);
  this.setInputsInline(0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_clear_chart={init:function(){
  this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_CHART);
  this.setColour(Blockly.Blocks.oled_display.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_CLEAR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_draw_qr={init:function(){
  this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_CHART);
  this.setColour(Blockly.Blocks.oled_display.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
      .appendField(Blockly.Msg.OLED_DISPLAY_QR);
  this.appendValueInput("START_X")
      .setCheck("Number")
      .appendField("X:");
  this.appendValueInput("START_Y")
      .setCheck("Number")
      .appendField("Y:");
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_QR_SIZE)
      .appendField(new Blockly.FieldDropdown([["63x63","10"],["59x59","9"],["55x55","8"],["51x51","7"],["47x47","6"],["43x43","5"],["39x39","4"],["35x35","3"],["31x31","2"],["27x27","1"]]),"SIZE");
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.OLED_DISPLAY_QR_CONTENT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

//airbox
Blockly.Blocks.airbox={};
Blockly.Blocks.airbox.HUE=180;
Blockly.Blocks.airbox.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("airbox_getValue"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"airbox_fetchData"==a[c].type)
				return!0;
		return b
};

Blockly.Blocks.airbox_fetchData={init:function(){
  this.setHelpUrl(Blockly.Msg.AIRBOX_HELPURL);
  this.setColour(Blockly.Blocks.airbox.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.FETCH_AIRBOX_TITLE);
  this.appendValueInput("DEVICEID").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.AIRBOX_DEVICEID);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.AIRBOX_TOOLTIP)}
};

Blockly.Blocks.airbox_getValue={init:function(){
  this.setHelpUrl(Blockly.Msg.AIRBOX_HELPURL);
  this.setColour(Blockly.Blocks.airbox.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.AIRBOX_GET_VALUE);
  this.appendDummyInput()  
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.AIRBOX_VALUE_DROPDOWN),"VALUE_NAME");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.AIRBOX_TOOLTIP)}
};


//TW Stock
Blockly.Blocks.stock={};
Blockly.Blocks.stock.HUE=180;
Blockly.Blocks.stock.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.stock_fetchData={init:function(){
  this.setHelpUrl(Blockly.Msg.STOCK_HELPURL);
  this.setColour(Blockly.Blocks.stock.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.FETCH_STOCK_TITLE);
  this.appendValueInput("STOCKID").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.STOCK_STOCKID);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.STOCK_TOOLTIP)}
};

Blockly.Blocks.stock_getValue={init:function(){
  this.setHelpUrl(Blockly.Msg.STOCK_HELPURL);
  this.setColour(Blockly.Blocks.stock.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.STOCK_GET_VALUE);
  this.appendDummyInput()  
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.STOCK_VALUE_DROPDOWN),"VALUE_NAME");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.STOCK_TOOLTIP)}
};


//Google Translation
Blockly.Blocks.translation={};
//Blockly.Blocks.translation.HUE=300;
Blockly.Blocks.translation.HUE=100;

Blockly.Blocks.fetchTranslation={init:function(){
  this.setHelpUrl(Blockly.Msg.TRANSLATION_HELPURL);
  this.setColour(Blockly.Blocks.translation.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.TRANSLATION_TITLE);
  this.appendValueInput("SOURCE_TEXT")
      .appendField(Blockly.Msg.TRANSLATION_SOURCE);
  this.appendValueInput("LANG_CODE")
      .appendField(Blockly.Msg.TRANSLATION_TARGET_LANG);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TRANSLATION_TOOLTIP)}
};

Blockly.Blocks.translation_result={init:function(){
  this.setHelpUrl(Blockly.Msg.TRANSLATION_HELPURL);
  this.setColour(Blockly.Blocks.translation.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TRANSLATION_TITLE)
      .appendField(Blockly.Msg.TRANSLATION_RESULT)
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.TRANSLATION_TOOLTIP)}
};

Blockly.Blocks.language_code={init:function(){
  this.setHelpUrl("https://cloud.google.com/speech-to-text/docs/languages");
  this.setColour(Blockly.Blocks.translation.HUE);
  this.appendDummyInput()  
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.DAC_TTS_LANGUAGES),"LANG_CODE");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip("")}
};

//Probbie
Blockly.Blocks.probbie={};
Blockly.Blocks.probbie.HUE1=300;
Blockly.Blocks.probbie.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("probbie_move"!=a[c].type&&"probbie_eyes1"!=a[c].type&&"probbie_eyes2"!=a[c].type&&"probbie_detect"!=a[c].type&&"probbie_tone"!=a[c].type&&"probbie_no_tone"!=a[c].type&&"probbie_custom_tone"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"probbie_init"==a[c].type)
				return!0;
		return b
};
Blockly.Blocks.probbie.checkBlocks1=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("probbie_obstacle"!=a[c].type&&"probbie_read_ir"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"probbie_detect"==a[c].type)
				return!0;
		return b
};


Blockly.Blocks.probbie_init={init:function(){
  this.setHelpUrl(Blockly.Msg.PROBBIE_HELPURL);
  this.setColour(Blockly.Blocks.probbie.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PROBBIE_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PROBBIE_INIT)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.PROBBIE_7697,"Probbie"],[Blockly.Msg.PROBBIE_POCKETCARD,"Tobbie"]]),"PROBBIE_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)}
};

Blockly.Blocks.probbie_move={init:function(){
  this.setHelpUrl(Blockly.Msg.PROBBIE_HELPURL);
  this.setColour(Blockly.Blocks.probbie.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PROBBIE_TITLE)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LIOU_ROBOT_FORWARD,"Probbie_Forward();"],[Blockly.Msg.LIOU_ROBOT_BACKWARD,"Probbie_Backward();"],[Blockly.Msg.LIOU_ROBOT_LEFT,"Probbie_TurnLeft();"],[Blockly.Msg.LIOU_ROBOT_RIGHT,"Probbie_TurnRight();"],[Blockly.Msg.LIOU_ROBOT_STOP,"Probbie_Stop();"]]),"MOVE_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)}
};

Blockly.Blocks.probbie_eyes1={init:function(){
  this.setHelpUrl(Blockly.Msg.PROBBIE_HELPURL);
  this.setColour(Blockly.Blocks.probbie.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PROBBIE_TITLE)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.PROBBIE_LEFT_EYE,"1"],[Blockly.Msg.PROBBIE_RIGHT_EYE,"0"],[Blockly.Msg.PROBBIE_ALL_EYES,"2"]]),"EYES_TYPE");
  this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.PROBBIE_COLOR)
      .appendField(new Blockly.FieldColour("#0000ff"),"RGB");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)}
};

Blockly.Blocks.probbie_eyes2={init:function(){
  this.setHelpUrl(Blockly.Msg.PROBBIE_HELPURL);
  this.setColour(Blockly.Blocks.probbie.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PROBBIE_TITLE)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.PROBBIE_LEFT_EYE,"1"],[Blockly.Msg.PROBBIE_RIGHT_EYE,"0"],[Blockly.Msg.PROBBIE_ALL_EYES,"2"]]),"EYES_TYPE")
      .appendField(Blockly.Msg.PROBBIE_COLOR);
  this.appendValueInput("R")
      .setCheck("Number")
      .appendField("R");
  this.appendValueInput("G")
      .setCheck("Number")
      .appendField("G");
  this.appendValueInput("B")
      .setCheck("Number")
      .appendField("B");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)}
};

Blockly.Blocks.probbie_detect={init:function(){
  this.setHelpUrl(Blockly.Msg.PROBBIE_HELPURL);
  this.setColour(Blockly.Blocks.probbie.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PROBBIE_TITLE)
      .appendField(Blockly.Msg.PROBBIE_DETECT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)}
};

Blockly.Blocks.probbie_obstacle={init:function(){
  this.setHelpUrl(Blockly.Msg.PROBBIE_HELPURL);
  this.setColour(Blockly.Blocks.probbie.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PROBBIE_TITLE)
      .appendField(Blockly.Msg.PROBBIE_OBSTACLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.PROBBIE_OBSTACLE_TYPE),"OBSTACLE_TYPE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)}
};

Blockly.Blocks.probbie_read_ir={init:function(){
  this.setHelpUrl(Blockly.Msg.PROBBIE_HELPURL);
  this.setColour(Blockly.Blocks.probbie.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PROBBIE_TITLE)
      .appendField(Blockly.Msg.PROBBIE_READ_IR_VALUE)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LIOU_ROBOT_LEFT_SIDE,"irLeftDistance"],[Blockly.Msg.LIOU_ROBOT_RIGHT_SIDE,"irRightDistance"]]),"IR_VALUE")
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)}
};

Blockly.Blocks.probbie_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.PROBBIE_HELPURL);
    this.setColour(Blockly.Blocks.probbie.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PROBBIE_TITLE)
        .appendField(Blockly.Msg.MAQUEEN_TONE_PRETEXT);
    this.appendDummyInput()
        .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TONE_LIST),"FREQ");
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)}
};

Blockly.Blocks.probbie_no_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.PROBBIE_HELPURL);
    this.setColour(Blockly.Blocks.probbie.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PROBBIE_TITLE)
        .appendField(Blockly.Msg.MAQUEEN_NO_TONE_PRETEXT);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)}
};

Blockly.Blocks.probbie_custom_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.PROBBIE_HELPURL);
    this.setColour(Blockly.Blocks.probbie.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PROBBIE_TITLE)
        .appendField(Blockly.Msg.MAQUEEN_TONE_PRETEXT);
    this.appendValueInput("FREQ")
        .setCheck("Number")
    this.appendValueInput("DURATION").setCheck("Number")
        .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_DURATION);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)}
};
//UDP Broadcast
Blockly.Blocks.broadcast_udp={};
Blockly.Blocks.broadcast_udp.HUE=120;
Blockly.Blocks.broadcast_udp.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("broadcast_udp_send"!=a[c].type && "broadcast_udp_check_msg"!=a[c].type && "broadcast_udp_received_event"!=a[c].type&&"broadcast_udp_received_msg"!=a[c].type&&"broadcast_udp_reset"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"broadcast_udp_init"==a[c].type)
				return!0;
		return b
};

Blockly.Blocks.broadcast_udp_init={init:function(){
  this.setHelpUrl(Blockly.Msg.BROADCAST_UDP_HELPURL);
  this.setColour(Blockly.Blocks.broadcast_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BROADCAST_UDP_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_INIT);
  this.appendValueInput("PORT")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)}
};

Blockly.Blocks.broadcast_udp_check_msg={init:function(){
  this.setHelpUrl(Blockly.Msg.BROADCAST_UDP_HELPURL);
  this.setColour(Blockly.Blocks.broadcast_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BROADCAST_UDP_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_CHECK);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)}
};


Blockly.Blocks.broadcast_udp_send={init:function(){
  this.setHelpUrl(Blockly.Msg.BROADCAST_UDP_HELPURL);
  this.setColour(Blockly.Blocks.broadcast_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BROADCAST_UDP_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_SEND);
  this.appendValueInput("MESSAGE")
      .setCheck("String");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)}
};

Blockly.Blocks.broadcast_udp_send_to_ip={init:function(){
  this.setHelpUrl(Blockly.Msg.BROADCAST_UDP_HELPURL);
  this.setColour(Blockly.Blocks.broadcast_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BROADCAST_UDP_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_SEND);
  this.appendValueInput("MESSAGE")
      .setCheck("String");
  this.appendValueInput("IP")
      .setCheck("String")
      .appendField(Blockly.Msg.BROADCAST_UDP_SEND_IP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)}
};

Blockly.Blocks.broadcast_udp_received_event={init:function(){
  this.setHelpUrl(Blockly.Msg.BROADCAST_UDP_HELPURL);
  this.setColour(Blockly.Blocks.broadcast_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BROADCAST_UDP_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_RECEIVED_EVENT);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_UDP");
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)}
};

Blockly.Blocks.broadcast_udp_received_msg={init:function(){
  this.setHelpUrl(Blockly.Msg.BROADCAST_UDP_HELPURL);
  this.setColour(Blockly.Blocks.broadcast_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BROADCAST_UDP_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_RECEIVED_MSG);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)}
};

Blockly.Blocks.broadcast_udp_received_v7rc={init:function(){
  this.setHelpUrl(Blockly.Msg.BROADCAST_UDP_HELPURL);
  this.setColour(Blockly.Blocks.broadcast_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BROADCAST_UDP_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_V7RC);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_ESP32_BLE_V7RC_DATATYPE),"TYPE")
      .appendField("?");
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)}
};

Blockly.Blocks.broadcast_udp_received_msg_v7rc={init:function(){
  this.setHelpUrl(Blockly.Msg.BROADCAST_UDP_HELPURL);
  this.setColour(Blockly.Blocks.broadcast_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BROADCAST_UDP_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_RECEIVED_MSG);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_V7RC_CONVERT)
      .appendField("channel:")
      .appendField(new Blockly.FieldDropdown([["1","0"],["2","1"],["3","2"],["4","3"]]),"CHANNEL")
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_ESP32_BLE_V7RC_VALUETYPE),"VALUE_TYPE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)},onchange:function(){
      this.setOutput(!0,this.getFieldValue("VALUE_TYPE"));
  }
};

Blockly.Blocks.broadcast_udp_reset={init:function(){
  this.setHelpUrl(Blockly.Msg.BROADCAST_UDP_HELPURL);
  this.setColour(Blockly.Blocks.broadcast_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BROADCAST_UDP_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_RESET);
  this.appendValueInput("PORT")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)}
};

//Web Server
Blockly.Blocks.webserver={};
Blockly.Blocks.webserver.HUE=30;
Blockly.Blocks.webserver.HUE_PARAGRAPH=110;
Blockly.Blocks.webserver.HUE_TEXT=240;
Blockly.Blocks.webserver.HUE_CONTROLLER=330;
Blockly.Blocks.webserver.HUE_TALK=80;
Blockly.Blocks.webserver.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("webserver_title"!=a[c].type&&"webserver_prepare_body"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"webserver_init"==a[c].type)
				return!0;
		return b
};

Blockly.Blocks.webserver.checkBlocks_body=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("webserver_paragraph_begin"!=a[c].type&&"webserver_text"!=a[c].type&&"webserver_paragraph_break"!=a[c].type&&"webserver_custom"!=a[c].type&&"webserver_digital"!=a[c].type&&"webserver_pwm"!=a[c].type&&"webserver_servo"!=a[c].type&&"webserver_custom_controller"!=a[c].type&&"webserver_event"!=a[c].type&&"webserver_digital"!=a[c].type&&"webserver_talk"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"webserver_prepare_body"==a[c].type)
				return!0;
		return b
};

Blockly.Blocks.webserver_init={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE);
  this.appendValueInput("PORT")
      .setCheck("Number")
      .appendField(Blockly.Msg.WEBSERVER_INIT);
  this.appendValueInput("SECS")
      .setCheck("Number")
      .appendField(Blockly.Msg.WEBSERVER_EVERY);
  this.appendDummyInput().appendField(Blockly.Msg.WEBSERVER_UPDATE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_title={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE);
  this.appendValueInput("TITLE")
      .setCheck("String")
      .appendField(Blockly.Msg.WEBSERVER_HEAD_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_BG_COLOR)
      .appendField(new Blockly.FieldColour("#FFFFFF"),"RGB");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_prepare_body={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE)
      .appendField(Blockly.Msg.WEBSERVER_PREPARE_BODY);
  this.setInputsInline(!0);
  this.appendStatementInput("WEBSERVER_BODY");
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_paragraph_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE_PARAGRAPH);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE)
      .appendField(Blockly.Msg.WEBSERVER_PARAGRAPH_BEGIN);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_HEAD_ALIGN)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.WEBSERVER_HEAD_ALIGN_TYPE),"ALIGN");
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_FONT_SIZE)
      .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"]]),"SIZE");
  this.appendDummyInput()
      .appendField(Blockly.Msg.PROBBIE_COLOR)
      .appendField(new Blockly.FieldColour("#000000"),"RGB");
  this.setInputsInline(!0);
  this.appendStatementInput("PARAGRAPH");
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_text={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE_TEXT);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE)
      .appendField(Blockly.Msg.WEBSERVER_TEXT);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_FONT_BOLD)
      .appendField(new Blockly.FieldDropdown([["No","No"],["Yes","Yes"]]),"BOLD");
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.WEBSERVER_FONT_CONTENT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_paragraph_break={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE_TEXT);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE)
      .appendField(Blockly.Msg.WEBSERVER_PARAGRAPH_BREAK);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_custom={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE_TEXT);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE);
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.WEBSERVER_CUSTOM);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_digital={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE_CONTROLLER);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE);
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.WEBSERVER_DIGITAL);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_BTN_TYPE)
      .appendField(new Blockly.FieldDropdown([["HIGH LOW","0"],["ON OFF","1"],["開 關","2"]]),"BTN_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_pwm={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE_CONTROLLER);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE);
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.WEBSERVER_PWM);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_BTN_TYPE)
      .appendField(new Blockly.FieldDropdown([["Send","Send"],["送出","送出"]]),"BTN_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_servo={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE_CONTROLLER);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE);
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.WEBSERVER_SERVO);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_BTN_TYPE)
      .appendField(new Blockly.FieldDropdown([["Send","Send"],["送出","送出"]]),"BTN_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_custom_controller={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE_CONTROLLER);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE)
      .appendField(Blockly.Msg.WEBSERVER_CUSTOM_CONTROLLER);
  this.appendValueInput("HREF")
      .setCheck("String")
      .appendField(Blockly.Msg.WEBSERVER_CUSTOM_HREF);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_CUSTOM_CONTROLLER_TYPE_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.WEBSERVER_CUSTOM_CONTROLLER_TYPE),"CONTROLLER_TYPE");
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.WEBSERVER_CUSTOM_CONTROLLER_VALUE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_event={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE_CONTROLLER);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE);
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.WEBSERVER_EVENT_TITLE);
  this.appendStatementInput("EVENT_BODY");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.webserver_talk={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE_TALK);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE);
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.WEBSERVER_TALK_TITLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)}
};

Blockly.Blocks.lcd_i2c_setting={init:function(){
  this.setHelpUrl(Blockly.Msg.LCD_I2C_HELPURL);
  this.setColour(Blockly.Blocks.lcd_i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.INITIALIZES_SETUP_APPENDTEXT)
      .appendField(Blockly.Msg.LCD_I2C_TITLE)
      .appendField(new Blockly.FieldDropdown([["1602","1602"],["2004","2004"]]),"LCD_DIM")
      .appendField(Blockly.Msg.SIGNAL_PIN)
      .appendField(new Blockly.FieldDropdown([["I2C","PIN"]]),"PIN")
      .appendField(Blockly.Msg.LCD_I2C_I2C_ADDRESS)
      .appendField(new Blockly.FieldDropdown([["0x27","0x27"],["0x3F","0x3F"],["0x20","0x20"]]),"I2C_ADDRESS");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LCD_I2C_TOOLTIP)}};

Blockly.Blocks.servo_write_pin={init:function(){
  this.setHelpUrl(Blockly.Msg.SERVO_WRITE_HELPURL);
  this.setColour(Blockly.Blocks.servo.HUE);
  this.appendValueInput("PIN")
      .appendField(Blockly.Msg.SERVO_WRITE_TEXT1)
      .appendField(Blockly.Msg.SERVO_WRITE_TEXT2);
  this.appendValueInput("ANGLE")
      .setCheck("Number")
      .appendField(Blockly.Msg.SERVO_ANGLE_TEXT1);
  this.appendDummyInput().appendField(Blockly.Msg.SERVO_ANGLE_TEXT2);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.SERVO_WRITE_TOOLTIP)}
};

Blockly.Blocks.neopixel.checkBlocks=function(a){
  var b=null,
  d=a.type;
  a=a.workspace.getAllBlocks();
  for(var c=0;c<a.length;c++)
    if("neopixel_setpixelcolor"!=a[c].type&&"neopixel_custom_setpixelcolor"!=a[c].type&&"neopixel_show"!=a[c].type&&"neopixel_setpixelcolor2"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"neopixel_begin"==a[c].type||"neopixel_begin2"==a[c].type)
      return!0;
  return b
};
Blockly.Blocks.neopixel_begin2={
  init:function(){
    this.setHelpUrl(Blockly.Msg.NEOPIXEL_BEGIN_HELPURL);
    this.setColour(Blockly.Blocks.neopixel.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.INITIALIZES_SETUP_APPENDTEXT)
        .appendField(Blockly.Msg.NEOPIXEL_TITLE)
        .appendField(Blockly.Msg.NEOPIXEL_BEGIN_NUM)
        .appendField(new Blockly.FieldTextInput("16"),"NUM");
    this.appendValueInput("PIN")
        .setCheck("Number")
        .appendField(Blockly.Msg.NEOPIXEL_BEGIN_PIN);
    this.appendDummyInput()
        .appendField(Blockly.Msg.NEOPIXEL_BEGIN_BRIGHTNESS)
        .appendField(new Blockly.FieldTextInput("30"),"BRIGHTNESS");
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.NEOPIXEL_BEGIN_TOOLTIP)}
};

Blockly.Blocks.dht_read_pin={init:function(){
  this.setHelpUrl(Blockly.Msg.DHT_HELPURL);
  this.setColour(Blockly.Blocks.dht.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DHT_TITLE)
      .appendField(new Blockly.FieldDropdown(profile["default"].dht),"SENSOR");
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.NEOPIXEL_BEGIN_PIN);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MESUREMENT_TYPE)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.HUMIDITY_PERCENT,"h"],[Blockly.Msg.TEMPERATURE_CELCIUS,"C"]]),"TYPE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.DHT_TOOLTIP)}
};

Blockly.Blocks.ultrasonic_read_pin={init:function(){
  this.setHelpUrl(Blockly.Msg.ULTRASONIC_SETTING_HELPURL);
  this.setColour(Blockly.Blocks.ultrasonic.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ULTRASONIC_SETTING_TITLE)
      .appendField(new Blockly.FieldDropdown([["HC-SR04P","DUMMY"]]),"SENSOR");
  this.appendValueInput("TRIG")
      .setCheck("Number")
      .appendField(Blockly.Msg.ULTRASONIC_SETTING_TRIG);
  this.appendValueInput("ECHO")
      .setCheck("Number")
      .appendField(Blockly.Msg.ULTRASONIC_SETTING_ECHO);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MESUREMENT_TYPE)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.GROVE_ULTRASONIC_RANGER_UNIT_CM,"CM"],[Blockly.Msg.GROVE_ULTRASONIC_RANGER_UNIT_INCH,"INCH"]]),"MEASUREMENT");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.ULTRASONIC_SETTING_TOOLTIP)}
};

//Custom_blocks
Blockly.Blocks.custom_block={};
Blockly.Blocks.custom_block.HUE=30;
Blockly.Blocks.custom_include={init:function(){
  this.setHelpUrl("");
  this.setColour(Blockly.Blocks.custom_block.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CUSTOM_BLOCK_TITLE);
  this.appendValueInput("FILE")
      .setCheck("String")
      .appendField(Blockly.Msg.CUSTOM_BLOCK_INCLUDE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip("")}
};

Blockly.Blocks.custom_declaire={init:function(){
  this.setHelpUrl("");
  this.setColour(Blockly.Blocks.custom_block.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CUSTOM_BLOCK_TITLE);
  this.appendValueInput("CODE")
      .setCheck("String")
      .appendField(Blockly.Msg.CUSTOM_BLOCK_DECLAIRE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip("")}
};

Blockly.Blocks.custom_code={init:function(){
  this.setHelpUrl("");
  this.setColour(Blockly.Blocks.custom_block.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CUSTOM_BLOCK_TITLE);
  this.appendValueInput("CODE")
      .setCheck("String")
      .appendField(Blockly.Msg.CUSTOM_BLOCK_CODE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip("")}
};

//Boards
Blockly.Blocks.boards={};
Blockly.Blocks.boards.HUE=30;
Blockly.Blocks.board_initializes_setup={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.initializes.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BOARDS_TITLE)
      .appendField(new Blockly.FieldDropdown([["7697","7697"],["Arduino","Arduino"],["ESP32","ESP32"],["Pico","Pico"],["ESP8266","ESP8266"],["ATtiny85","ATtiny85"],["micro:bit","micro:bit"]]),"BOARD_TYPE")
      .appendField(Blockly.Msg.INITIALIZES_SETUP_APPENDTEXT);
  this.appendStatementInput("CONTENT");
  this.setInputsInline(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)},onchange:function(){
      Blockly.Arduino.my_board_type=this.getFieldValue("BOARD_TYPE");}
};

Blockly.Blocks.board_setup={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.initializes.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BOARDS_TITLE)
      .appendField(Blockly.Msg.BOARDS_SETUP)
      .appendField(new Blockly.FieldDropdown([["7697","7697"],["Arduino","Arduino"],["ESP32","ESP32"],["ESP8266","ESP8266"],["ATtiny85","ATtiny85"],["micro:bit","micro:bit"]]),"BOARD_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)},onchange:function(){
      Blockly.Arduino.my_board_type=this.getFieldValue("BOARD_TYPE");}
};

Blockly.Blocks.board_i2c_reset={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.initializes.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BOARDS_TITLE)
      .appendField(Blockly.Msg.BOARDS_I2C_RESET);
  this.appendValueInput("SDA")
      .setCheck("Number")
      .appendField("SDA");
  this.appendValueInput("SCL")
      .setCheck("Number")
      .appendField("SCL");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.ESP32_BOARD_TOOLTIP)}
};

Blockly.Blocks.board_spi_reset={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.initializes.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BOARDS_TITLE)
      .appendField(Blockly.Msg.BOARDS_SPI_RESET);
  this.appendValueInput("SCLK_PIN")
      .setCheck("Number")
      .appendField("SCLK");
  this.appendValueInput("MISO_PIN")
      .setCheck("Number")
      .appendField("MISO");
  this.appendValueInput("MOSI_PIN")
      .setCheck("Number")
      .appendField("MOSI");
  this.appendValueInput("CS_PIN")
      .setCheck("Number")
      .appendField("CS");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ESP32_BOARD_TOOLTIP)}
};

Blockly.Blocks.board_7697_digital={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField("7697 "+Blockly.Msg.BOARDS_DIGITAL)
      .appendField(new Blockly.FieldDropdown([["0 - UART","0"],["1 - UART","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8 - I2C","8"],["9 - I2C","9"],["10 - SPI","10"],["11 - SPI","11"],["12 - SPI","12"],["13 - SPI","13"],["14","14"],["15","15"],["16","16"],["17","17"]]),"MY_PIN");
  this.setOutput(!0,"Number")
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)}
};

Blockly.Blocks.board_7697_analog={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField("7697 "+Blockly.Msg.BOARDS_ANALOG)
      .appendField(new Blockly.FieldDropdown([["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"]]),"MY_PIN");
  this.setOutput(!0,"Number")
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)}
};

Blockly.Blocks.board_arduino_digital={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField("Arduino "+Blockly.Msg.BOARDS_DIGITAL)
      .appendField(new Blockly.FieldDropdown([["0 - UART","0"],["1 - UART","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10 - SPI","10"],["11 - SPI","11"],["12 - SPI","12"],["13 - SPI","13"],["14","14"],["15","15"],["16","16"],["17","17"],["18 - I2C","18"],["19 - I2C","19"]]),"MY_PIN");
  this.setOutput(!0,"Number")
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)}
};

Blockly.Blocks.board_arduino_analog={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField("Arduino "+Blockly.Msg.BOARDS_ANALOG)
      .appendField(new Blockly.FieldDropdown([["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],["A4","A4"],["A5","A5"]]),"MY_PIN");
  this.setOutput(!0,"Number")
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)}
};

Blockly.Blocks.board_nano_pins={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField("Nano "+Blockly.Msg.LIOU_ROBOT_PIN)
      .appendField(new Blockly.FieldDropdown([["0 - RX","0"],["1 - TX","1"],["2","2"],["3 ~ PWM","3"],["4","4"],["5 ~ PWM","5"],["6 ~ PWM","6"],["7","7"],["8","8"],["9 ~ PWM","9"],["10 ~ PWM","10"],["11 ~ PWM","11"],["12","12"],["13","13"],["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],["A4 - SDA","A4"],["A5 - SCL","A5"],["A6","A6"],["A7","A7"]]),"MY_PIN");
  this.setOutput(!0,"Number")
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)}
};

Blockly.Blocks.board_esp32_digital={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField("ESP32 "+Blockly.Msg.BOARDS_DIGITAL)
      .appendField(new Blockly.FieldDropdown([["0","0"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"],["16","16"],["17","17"],["18","18"],["19","19"],["21","21"],["22","22"],["23","23"],["25","25"],["26","26"],["27","27"],["32","32"],["33","33"],["34","34"],["35","35"],["36","36"],["39","39"]]),"MY_PIN");
  this.setOutput(!0,"Number")
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)}
};

Blockly.Blocks.board_esp32_analog={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField("ESP32 "+Blockly.Msg.BOARDS_ANALOG)
      .appendField(new Blockly.FieldDropdown([["A0","A0"],["A3","A3"],["A4","A4"],["A5","A5"],["A6","A6"],["A7","A7"]]),"MY_PIN");
  this.setOutput(!0,"Number")
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)}
};


Blockly.Blocks.board_esp8266_digital={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField("NodeMCU "+Blockly.Msg.BOARDS_DIGITAL)
      .appendField(new Blockly.FieldDropdown([["D0","16"],["D1 -SCL","5"],["D2 - SDA","4"],["D3","0"],["D4","2"],["D5","14"],["D6","12"],["D7","13"],["D8","15"],["D9 - RX","3"],["D10 - TX","1"]]),"MY_PIN");
  this.setOutput(!0,"Number")
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)}
};

Blockly.Blocks.board_esp8266_analog={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField("NodeMCU "+Blockly.Msg.BOARDS_ANALOG)
      .appendField(new Blockly.FieldDropdown([["A0","A0"]]),"MY_PIN");
  this.setOutput(!0,"Number")
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)}
};

//尤哲哲ESP32_board
Blockly.Blocks.esp32_board={};
Blockly.Blocks.esp32_board.HUE=110;
Blockly.Blocks.esp32_board_usb={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32_BOARD_HELPURL);
  this.setColour(Blockly.Blocks.esp32_board.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_BOARD_TITLE)
      .appendField(new Blockly.FieldDropdown([["USB1","1"],["USB2","3"]]),"USB_PORT")
  this.appendValueInput("ON_OFF")
      .setCheck("Boolean")
      .appendField(Blockly.Msg.ESP32_BOARD_RGB_STATUS);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.ESP32_BOARD_TOOLTIP)}
};

Blockly.Blocks.esp32_board_rgb={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32_BOARD_HELPURL);
  this.setColour(Blockly.Blocks.esp32_board.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_BOARD_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.ESP32_BOARD_RGB),"RGB")
  this.appendValueInput("ON_OFF")
      .setCheck("Boolean")
      .appendField(Blockly.Msg.ESP32_BOARD_RGB_STATUS);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.ESP32_BOARD_TOOLTIP)}
};

Blockly.Blocks.esp32_board_rgb_custom={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32_BOARD_HELPURL);
  this.setColour(Blockly.Blocks.esp32_board.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_BOARD_TITLE);
  this.appendValueInput("RGB")
      .setCheck("Number")
      .appendField(Blockly.Msg.ESP32_BOARD_RGB_CUSTOM);
  this.appendValueInput("ON_OFF")
      .setCheck("Boolean")
      .appendField(Blockly.Msg.ESP32_BOARD_RGB_STATUS);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.ESP32_BOARD_TOOLTIP)}
};

Blockly.Blocks.esp32_board_i2c_reset={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32_BOARD_HELPURL);
  this.setColour(Blockly.Blocks.esp32_board.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_BOARD_TITLE)
      .appendField(Blockly.Msg.ESP32_BOARD_I2C_RESET)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.ESP32_BOARD_TOOLTIP)}
};

//ESP32_analogWrite
Blockly.Blocks.esp32_analog={};
Blockly.Blocks.esp32_analog_write={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32_ANALOG_WRITE_HELPURL);
  this.setColour(Blockly.Blocks.inout.HUE);
  this.appendValueInput("PIN_ANALOGWRITE")
      .setCheck("Number")
      .appendField("ESP32 "+Blockly.Msg.INOUT_ANALOG_WRITE_APPENDTEXT_PIN);
  this.appendValueInput("NUM")
      .setCheck("Number")
      .appendField(Blockly.Msg.INOUT_ANALOG_WRITE_APPENDTEXT_VALUE);
  this.appendValueInput("CHANNEL")
      .setCheck("Number")
      .appendField(Blockly.Msg.ESP32_ANALOG_WRITE_CHANNEL);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ESP32_ANALOG_WRITE_TOOLTIP)}
};

Blockly.Blocks.esp32_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.ESP32_ANALOG_WRITE_HELPURL);
    this.setColour(Blockly.Blocks.inout.HUE);
    this.appendValueInput("PIN")
        .setCheck("Number")
        .appendField("ESP32 "+Blockly.Msg.INOUT_TONE_APPENDTEXT_PIN);
    this.appendDummyInput()
        .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TONE_LIST),"FREQ");
    this.appendValueInput("CHANNEL")
        .setCheck("Number")
        .appendField(Blockly.Msg.ESP32_ANALOG_WRITE_CHANNEL);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.INOUT_TONE_TOOLTIP)}
};

Blockly.Blocks.esp32_no_tone={
  init:function(){
    this.setHelpUrl(Blockly.Msg.ESP32_ANALOG_WRITE_HELPURL);
    this.setColour(Blockly.Blocks.inout.HUE);
    this.appendValueInput("PIN")
        .setCheck("Number")
        .appendField("ESP32 "+Blockly.Msg.INOUT_NO_TONE_APPENDTEXT_PIN);
    this.appendValueInput("CHANNEL")
        .setCheck("Number")
        .appendField(Blockly.Msg.ESP32_ANALOG_WRITE_CHANNEL);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.INOUT_TONE_TOOLTIP)}
};

Blockly.Blocks.esp32_custom_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.ESP32_ANALOG_WRITE_HELPURL);
    this.setColour(Blockly.Blocks.inout.HUE);
    this.appendValueInput("PIN")
        .setCheck("Number")
        .appendField("ESP32 "+Blockly.Msg.INOUT_TONE_APPENDTEXT_PIN);
    this.appendValueInput("FREQ")
        .setCheck("Number")
        .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ);
    this.appendValueInput("DURATION")
        .setCheck("Number")
        .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_DURATION);
    this.appendValueInput("CHANNEL")
        .setCheck("Number")
        .appendField(Blockly.Msg.ESP32_ANALOG_WRITE_CHANNEL);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.INOUT_TONE_TOOLTIP)}
};

//ESP32_BUILTIN SENSOR
Blockly.Blocks.builtin={};
Blockly.Blocks.builtin.HUE=180;
Blockly.Blocks.builtin.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};
Blockly.Blocks.esp32_hall_read={init:function(){
  this.setHelpUrl(Blockly.Msg.BUILTIN_HELPURL);
  this.setColour(Blockly.Blocks.builtin.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BUILTIN_TITLE)
      .appendField(Blockly.Msg.BUILTIN_HALL_READ);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.BUILTIN_TOOLTIP)}
};

Blockly.Blocks.esp32_touch_read={init:function(){
  this.setHelpUrl(Blockly.Msg.BUILTIN_HELPURL);
  this.setColour(Blockly.Blocks.builtin.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BUILTIN_TITLE)
      .appendField(Blockly.Msg.BUILTIN_TOUCH_READ);
  this.appendDummyInput()
      .appendField("Pin")
      .appendField(new Blockly.FieldDropdown([["2","2"],["4","4"],["12","12"],["13","13"],["14","14"],["15","15"],["27","27"],["32","32"],["33","33"]]),"TOUCH_PIN")
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.BUILTIN_TOOLTIP)}
};

Blockly.Blocks.esp32_touched={init:function(){
  this.setHelpUrl(Blockly.Msg.BUILTIN_HELPURL);
  this.setColour(Blockly.Blocks.builtin.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BUILTIN_TITLE)
      .appendField(Blockly.Msg.BUILTIN_TOUCHED_PREFIX);
  this.appendDummyInput()
      .appendField("Pin")
      .appendField(new Blockly.FieldDropdown([["2","2"],["4","4"],["12","12"],["13","13"],["14","14"],["15","15"],["27","27"],["32","32"],["33","33"]]),"TOUCH_PIN")
      .appendField(Blockly.Msg.BUILTIN_TOUCHED_POSTFIX);
  this.appendStatementInput("TOUCHED");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.BUILTIN_TOOLTIP)}
};

Blockly.Blocks.esp32_core_run={init:function(){
  this.setHelpUrl(Blockly.Msg.BUILTIN_HELPURL);
  this.setColour(Blockly.Blocks.builtin.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CORE_TITLE)
      .appendField(Blockly.Msg.CORE_RUN);
  this.appendValueInput("TASK_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.CORE_TASK_NAME);
  this.appendValueInput("STACK")
      .setCheck("Number")
      .appendField(Blockly.Msg.CORE_STACK);
  this.appendValueInput("PRIORITY")
      .setCheck("Number")
      .appendField(Blockly.Msg.CORE_PRIORITY);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CORE_INDEX)
      .appendField(new Blockly.FieldDropdown([["0","0"],["1","1"]]),"CORE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.BUILTIN_TOOLTIP)}
};

Blockly.Blocks.esp32_core_task={init:function(){
  this.setHelpUrl(Blockly.Msg.BUILTIN_HELPURL);
  this.setColour(Blockly.Blocks.builtin.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CORE_TITLE)
      .appendField(Blockly.Msg.CORE_SETUP);
  this.appendValueInput("TASK_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.CORE_TASK_NAME);
  this.appendStatementInput("SETUP");
  this.appendDummyInput()
      .appendField(Blockly.Msg.CORE_LOOP);
  this.appendStatementInput("LOOP");
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.BUILTIN_TOOLTIP)}
};

Blockly.Blocks.esp32_core_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.BUILTIN_HELPURL);
  this.setColour(Blockly.Blocks.builtin.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CORE_TITLE)
      .appendField(Blockly.Msg.CORE_STOP);
  this.appendValueInput("TASK_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.CORE_TASK_NAME);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.BUILTIN_TOOLTIP)}
};

Blockly.Blocks.esp32_core_suspend={init:function(){
  this.setHelpUrl(Blockly.Msg.BUILTIN_HELPURL);
  this.setColour(Blockly.Blocks.builtin.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CORE_TITLE)
      .appendField(Blockly.Msg.CORE_SUSPEND);
  this.appendValueInput("TASK_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.CORE_TASK_NAME);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.BUILTIN_TOOLTIP)}
};

Blockly.Blocks.esp32_core_resume={init:function(){
  this.setHelpUrl(Blockly.Msg.BUILTIN_HELPURL);
  this.setColour(Blockly.Blocks.builtin.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CORE_TITLE)
      .appendField(Blockly.Msg.CORE_RESUME);
  this.appendValueInput("TASK_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.CORE_TASK_NAME);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.BUILTIN_TOOLTIP)}
};

Blockly.Blocks.esp32_core_yield={init:function(){
  this.setHelpUrl(Blockly.Msg.BUILTIN_HELPURL);
  this.setColour(Blockly.Blocks.builtin.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CORE_TITLE)
      .appendField(Blockly.Msg.CORE_YIELD);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.BUILTIN_TOOLTIP)}
};

Blockly.Blocks.esp32_core_num={init:function(){
  this.setHelpUrl(Blockly.Msg.BUILTIN_HELPURL);
  this.setColour(Blockly.Blocks.builtin.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CORE_TITLE)
      .appendField(Blockly.Msg.CORE_NUM);
  this.setOutput(!0,"Number");
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.BUILTIN_TOOLTIP)}
};

//PocketCard
Blockly.Blocks.pocketcard={};
Blockly.Blocks.pocketcard.HUE=120;

Blockly.Blocks.pocketcard_cam_init={init:function(){
  this.setHelpUrl(Blockly.Msg.POCKETCARD_HELPURL);
  this.setColour(Blockly.Blocks.pocketcard.HUE);
  this.appendDummyInput()
      .appendField("PocketCard CAMERA "+Blockly.Msg.DAC_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.POCKETCARD_TOOLTIP)}
};

Blockly.Blocks.pocketcard_cam_pins_clear={init:function(){
  this.setHelpUrl(Blockly.Msg.POCKETCARD_HELPURL);
  this.setColour(Blockly.Blocks.pocketcard.HUE);
  this.appendDummyInput()
      .appendField("PocketCard CAMERA ")
      .appendField(Blockly.Msg.KSB065_CAMERA_PINS_CLEAR);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_ROTATION)
      .appendField(Blockly.Msg.LJJ_CAMERA_ROTATION_LIST[0][0])
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"VFLIP_VALUE");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_ROTATION_LIST[1][0])
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"HMIRROR_VALUE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.POCKETCARD_TOOLTIP)}
};

Blockly.Blocks.pocketcard_button={init:function(){
  this.setHelpUrl(Blockly.Msg.POCKETCARD_HELPURL);
  this.setColour(Blockly.Blocks.pocketcard.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+" PocketCard "+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["A","A"],["B","B"],["A+B","C"]]),"AB_BUTTON");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_BUTTON_CHECK);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_BUTTON_CALL");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.POCKETCARD_TOOLTIP)}
};

Blockly.Blocks.pocketcard_pinMap={init:function(){
  this.setHelpUrl(Blockly.Msg.POCKETCARD_HELPURL);
  this.setColour(Blockly.Blocks.pocketcard.HUE);
  this.appendDummyInput()
      .appendField("PocketCard "+Blockly.Msg.MTK7697BIT_PINMAP_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["P0","26"],["P1","33"],["P2","32"],["P3 (INPUT ONLY)","35"],["P4","4"],["P6","16"],["P7","17"],["P8","27"],["P9","13"],["P10","2"],["P12","15"],["P13","18"],["P14","19"],["P15","23"],["P16","5"],["P17",""],["P19-SCL","22"],["P20-SDA","21"]]),"POCKETCARD_PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.POCKETCARD_TOOLTIP)}
};

Blockly.Blocks.pocketcard_pinMap_ez={init:function(){
  this.setHelpUrl(Blockly.Msg.POCKETCARD_HELPURL);
  this.setColour(Blockly.Blocks.pocketcard.HUE);
  this.appendDummyInput()
      .appendField("PocketCard "+Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["IO_0","26"],["IO_1","33"],["IO_2","32"],["IO_3","27"],["IO_4","18"],["IO_5","19"],["IO_6","23"],["IO_7","5"],["IO_8 (INPUT ONLY)","35"],["IO_9","16"],["IO_10","4"],["IO_11","14"],["IO_12","17"],["IO_13","13"],["IO_14","2"],["IO_15","25"],["IO_16","15"],["IO_17","22"],["IO_18","21"]]),"EZ_PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.POCKETCARD_TOOLTIP)}
};

Blockly.Blocks.pocketcard_light_sensor={init:function(){
  this.setHelpUrl(Blockly.Msg.POCKETCARD_HELPURL);
  this.setColour(Blockly.Blocks.pocketcard.HUE);
  this.appendDummyInput()
      .appendField("PocketCard "+Blockly.Msg.POCKETCARD_LIGHT_SENSOR);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["A","39"],["B","36"]]),"POCKETCARD_PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.POCKETCARD_TOOLTIP)}
};

Blockly.Blocks.pocketcard_temperature_sensor={init:function(){
  this.setHelpUrl(Blockly.Msg.POCKETCARD_HELPURL);
  this.setColour(Blockly.Blocks.pocketcard.HUE);
  this.appendDummyInput()
      .appendField("PocketCard "+Blockly.Msg.POCKETCARD_TEMPERATURE_SENSOR);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.POCKETCARD_TOOLTIP)}
};

Blockly.Blocks.pocketcard_pixels_brightness={init:function(){
  this.setHelpUrl(Blockly.Msg.POCKETCARD_HELPURL);
  this.setColour(Blockly.Blocks.pocketcard.HUE);
  this.appendDummyInput()
      .appendField("PocketCard "+Blockly.Msg.POCKETCARD_PIXELS_BRIGHTNESS+"(0~255)");
  this.appendValueInput("BRIGHTNESS")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.POCKETCARD_TOOLTIP)}
};

Blockly.Blocks.pocketcard_rgb_type={init:function(){
  this.setHelpUrl(Blockly.Msg.POCKETCARD_HELPURL);
  this.setColour(Blockly.Blocks.pocketcard.HUE);
  this.appendDummyInput()
      .appendField("PocketCard "+Blockly.Msg.POCKETCARD_PIXEL_FORMAT);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["RGB","RGB"],["GRB","GRB"]]),"PIXEL_FORMAT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.POCKETCARD_TOOLTIP)}
};

Blockly.Blocks.pocketcard_rgb_color={init:function(){
  this.setHelpUrl(Blockly.Msg.POCKETCARD_HELPURL);
  this.setColour(Blockly.Blocks.pocketcard.HUE);
  this.appendDummyInput()
      .appendField("PocketCard");
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.POCKETCARD_PIXELS_COLOR);
  this.appendValueInput("BRIGHTNESS")
      .setCheck("Number")
      .appendField(Blockly.Msg.POCKETCARD_PIXELS_BRIGHTNESS+"(0~255)");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.POCKETCARD_TOOLTIP)}
};

//KSB065
Blockly.Blocks.KSB065={};
Blockly.Blocks.KSB065.HUE=120;
Blockly.Blocks.KSB065.HUE5=290;
Blockly.Blocks.KSB065.HUE4=157;

Blockly.Blocks.KSB065_camera_pins={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.KSB065_CAMERA_PINS);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["ESP32-S","1"],["PocketCard","2"]]),"CAM_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_camera_pins_clear={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.KSB065_CAMERA_PINS_CLEAR);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_ROTATION)
      .appendField(Blockly.Msg.LJJ_CAMERA_ROTATION_LIST[0][0])
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"VFLIP_VALUE");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_ROTATION_LIST[1][0])
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"HMIRROR_VALUE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};


Blockly.Blocks.KSB065_button={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+" KSB065 "+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["A","A"],["B","B"],["A+B","C"]]),"AB_BUTTON");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_BUTTON_CHECK);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_BUTTON_CALL");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_analog={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.KSB065_ANALOG_LIST),"TYPE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_dht11={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.STARTPLUS_DHT)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.EZ_DHT_TEMP,"readTemperature"],[Blockly.Msg.EZ_DHT_HUMID,"readHumidity"]]),"DHT");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_sonar={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.LIOU_ROBOT_SONAR);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_relay={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.EZ_RELAY)
  this.appendValueInput("ON_OFF")
      .setCheck("Boolean");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_motor={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.L9110_MOTOR);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_ROTATE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.L9110_DIRECTION),"DIR");
  this.appendValueInput("SPEED")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_motor_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.L9110_MOTOR)
      .appendField(Blockly.Msg.LIOU_ROBOT_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE4);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.EZ_TONE)
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TONE_LIST),"FREQ");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.KSB065_no_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE4);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.EZ_noTONE)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.KSB065_custom_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE4);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.EZ_TONE);
  this.appendValueInput("FREQ")
      .setCheck("Number")
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ);
  this.appendValueInput("DURATION")
      .setCheck("Number")
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_DURATION);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.KSB065_neopixel_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE5);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.EZ_NEOPIXEL_BEGIN_BRIGHTNESS)
  this.appendValueInput("BRIGHTNESS")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_neopixel_set_color={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE5);
  this.appendDummyInput()
      .appendField("KSB065");
  this.appendValueInput("INDEX")
      .setCheck("Number")
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE);
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.NEOPIXEL_CUSTOM_SETPIXELCOLOR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_neopixel_set_colors={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE5);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE)
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.startPlus_NEOPIXEL_SET_ALL_COLORS);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_neopixel_show={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.KSB065.HUE5);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE)
      .appendField(Blockly.Msg.NEOPIXEL_SHOW);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

Blockly.Blocks.KSB065_ir_receive={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.STARTPLUS_IR_TITLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};

Blockly.Blocks.KSB065_pinMap={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB065_HELPURL);
  this.setColour(Blockly.Blocks.pocketcard.HUE);
  this.appendDummyInput()
      .appendField("KSB065")
      .appendField(Blockly.Msg.MTK7697BIT_PINMAP_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["P0","26"],["P1","33"],["P2","32"],["P3 (INPUT ONLY)","35"],["P4","4"],["P5","14"],["P6","16"],["P7","17"],["P8","27"],["P9","13"],["P10","2"],["P11","25"],["P12","15"],["P13","18"],["P14","19"],["P15","23"],["P16","5"]]),"KSB065_PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.KSB065_TOOLTIP)}
};

//MPU9250
Blockly.Blocks.mpu9250={};
Blockly.Blocks.mpu9250.HUE=120;
Blockly.Blocks.mpu9250.HUE1=320;
Blockly.Blocks.mpu9250.HUE2=200;
Blockly.Blocks.mpu9250.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.mpu9250_accel_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.MPU9250_HELPURL);
  this.setColour(Blockly.Blocks.mpu9250.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MPU9250_TITLE+" "+Blockly.Msg.MPU9250_ACCEL_BEGIN)
      .appendField(new Blockly.FieldDropdown([["16G","0x18"],["8G","0x10"],["4G","0x08"],["2G","0x00"]]),"ACCEL_MODE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)}
};

Blockly.Blocks.mpu9250_accel_fetch={init:function(){
  this.setHelpUrl(Blockly.Msg.MPU9250_HELPURL);
  this.setColour(Blockly.Blocks.mpu9250.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MPU9250_TITLE+" "+Blockly.Msg.MPU9250_ACCEL_FETCH)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)}
};

Blockly.Blocks.mpu9250_accel_3axis={init:function(){
  this.setHelpUrl(Blockly.Msg.MPU9250_HELPURL);
  this.setColour(Blockly.Blocks.mpu9250.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MPU9250_TITLE+" "+Blockly.Msg.MPU9250_ACCEL_3AXIS)
      .appendField(new Blockly.FieldDropdown([["X","accelX()"],["Y","accelY()"],["Z","accelZ()"]]),"3AXIS_MODE")
      .appendField(Blockly.Msg.MPU925_3AXIS_POST_FIX);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)}
};

Blockly.Blocks.mpu9250_accel_pitch_roll={init:function(){
  this.setHelpUrl(Blockly.Msg.MPU9250_HELPURL);
  this.setColour(Blockly.Blocks.mpu9250.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MPU9250_TITLE+" "+Blockly.Msg.MPU9250_ACCEL_PITCH_ROLL)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.MPU9250_PITCH_ROLL),"PITCH_ROLL");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)}
};

Blockly.Blocks.mpu9250_mag_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.MPU9250_HELPURL);
  this.setColour(Blockly.Blocks.mpu9250.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MPU9250_TITLE+" "+Blockly.Msg.MPU9250_MAG_BEGIN)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)}
};

Blockly.Blocks.mpu9250_mag_fetch={init:function(){
  this.setHelpUrl(Blockly.Msg.MPU9250_HELPURL);
  this.setColour(Blockly.Blocks.mpu9250.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MPU9250_TITLE+" "+Blockly.Msg.MPU9250_MAG_FETCH)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)}
};

Blockly.Blocks.mpu9250_mag_3axis={init:function(){
  this.setHelpUrl(Blockly.Msg.MPU9250_HELPURL);
  this.setColour(Blockly.Blocks.mpu9250.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MPU9250_TITLE+" "+Blockly.Msg.MPU9250_MAG_3AXIS)
      .appendField(new Blockly.FieldDropdown([["X","magX()"],["Y","magY()"],["Z","magZ()"]]),"3AXIS_MODE")
      .appendField(Blockly.Msg.MPU925_3AXIS_POST_FIX);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)}
};

Blockly.Blocks.mpu9250_gyro_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.MPU9250_HELPURL);
  this.setColour(Blockly.Blocks.mpu9250.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MPU9250_TITLE+" "+Blockly.Msg.MPU9250_GYRO_BEGIN)
      .appendField(new Blockly.FieldDropdown([["2000DPS","0x18"],["1000DPS","0x10"],["500DPS","0x08"],["250DPS","0x00"]]),"GYRO_MODE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)}
};

Blockly.Blocks.mpu9250_gyro_fetch={init:function(){
  this.setHelpUrl(Blockly.Msg.MPU9250_HELPURL);
  this.setColour(Blockly.Blocks.mpu9250.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MPU9250_TITLE+" "+Blockly.Msg.MPU9250_GYRO_FETCH)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)}
};

Blockly.Blocks.mpu9250_gyro_3axis={init:function(){
  this.setHelpUrl(Blockly.Msg.MPU9250_HELPURL);
  this.setColour(Blockly.Blocks.mpu9250.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MPU9250_TITLE+" "+Blockly.Msg.MPU9250_GYRO_3AXIS)
      .appendField(new Blockly.FieldDropdown([["X","gyroX()"],["Y","gyroY()"],["Z","gyroZ()"]]),"3AXIS_MODE")
      .appendField(Blockly.Msg.MPU925_3AXIS_POST_FIX+" "+Blockly.Msg.MPU925_3AXIS_POST_FIX_UNIT);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)}
};


//MSA301
Blockly.Blocks.msa301={};
Blockly.Blocks.msa301.HUE=200;
Blockly.Blocks.msa301.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.msa301_accel_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.MSA301_HELPURL);
  this.setColour(Blockly.Blocks.msa301.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MSA301_TITLE+" "+Blockly.Msg.MSA301_ACCEL_BEGIN)
      .appendField(new Blockly.FieldDropdown([["2G","MSA301_RANGE_2_G"],["4G","MSA301_RANGE_4_G"],["8G","MSA301_RANGE_8_G"],["16G","MSA301_RANGE_16_G"]]),"ACCEL_MODE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MSA301_TOOLTIP)}
};

Blockly.Blocks.msa301_accel_fetch={init:function(){
  this.setHelpUrl(Blockly.Msg.MSA301_HELPURL);
  this.setColour(Blockly.Blocks.msa301.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MSA301_TITLE+" "+Blockly.Msg.MSA301_ACCEL_FETCH)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MSA301_TOOLTIP)}
};

Blockly.Blocks.msa301_accel_3axis={init:function(){
  this.setHelpUrl(Blockly.Msg.MSA301_HELPURL);
  this.setColour(Blockly.Blocks.msa301.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MSA301_TITLE+" "+Blockly.Msg.MSA301_ACCEL_3AXIS)
      .appendField(new Blockly.FieldDropdown([["X","x"],["Y","y"],["Z","z"]]),"3AXIS_MODE")
      .appendField(Blockly.Msg.MSA301_3AXIS_POST_FIX);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MSA301_TOOLTIP)}
};

Blockly.Blocks.msa301_accel_pitch_roll={init:function(){
  this.setHelpUrl(Blockly.Msg.MSA301_HELPURL);
  this.setColour(Blockly.Blocks.msa301.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MSA301_TITLE+" "+Blockly.Msg.MPU9250_ACCEL_PITCH_ROLL)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.MPU9250_PITCH_ROLL),"PITCH_ROLL");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)}
};

Blockly.Blocks.msa301_tap_setup={init:function(){
  this.setHelpUrl(Blockly.Msg.MSA301_HELPURL);
  this.setColour(Blockly.Blocks.msa301.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MSA301_TITLE+" "+Blockly.Msg.MSA301_TAP_SETUP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MSA301_TOOLTIP)}
};

Blockly.Blocks.msa301_tap_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.MSA301_HELPURL);
  this.setColour(Blockly.Blocks.msa301.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+" MSA301")
      .appendField(Blockly.Msg.MSA301_TAP_BEGIN);
  this.setInputsInline(!0);
  this.appendStatementInput("TAP_CALL");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MSA301_TOOLTIP)}
};

Blockly.Blocks.msa301_tap_count={init:function(){
  this.setHelpUrl(Blockly.Msg.MSA301_HELPURL);
  this.setColour(Blockly.Blocks.msa301.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MSA301_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.MSA301_TAP_MODE),"MODE")
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.MSA301_TOOLTIP)}
};


//GoogleSheets
Blockly.Blocks.googlesheets={};
Blockly.Blocks.googlesheets.HUE=275;
Blockly.Blocks.googlesheets.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};
Blockly.Blocks.setupSheets={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE+" "+Blockly.Msg.GOOGLESHEETS_SETUP_TITLE);
  this.appendValueInput("sheetId")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_SHEETID);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)}
};

Blockly.Blocks.setupForm={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE+" "+Blockly.Msg.GOOGLESHEETS_SETUP_TITLE);
  this.appendValueInput("sheetTag")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_SHEETTAG);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)}
};

Blockly.Blocks.getLastRow={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE+"  "+Blockly.Msg.GOOGLESHEETS_GET_LAST_ROW);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)}
};

Blockly.Blocks.fetchFromSheet={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE+"  "+Blockly.Msg.GOOGLESHEETS_FETCH_FROM_SHEET);
  this.appendValueInput("beginCell")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_BEGIN);
  this.appendValueInput("endCell")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_END);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)}
};

Blockly.Blocks.sendToGoogle={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_DATEINCLUDE)
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"dateInclude");
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_SEND_DATA);
  this.appendValueInput("data")
      .setCheck("String");
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)}
};

Blockly.Blocks.getCellValue={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE);
  this.appendValueInput("cell")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_GET_CELL_VALUE);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)}
};

Blockly.Blocks.searchSheet={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE+"  "+Blockly.Msg.GOOGLESHEETS_SEARCH_FROM_SHEET);
  this.appendValueInput("Column")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_COLUMN_NAME);
  this.appendValueInput("keyWord")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_KEY_WORD);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)}
};

Blockly.Blocks.deleteSearch={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE+"  "+Blockly.Msg.GOOGLESHEETS_DELETE_SEARCH);
  this.appendValueInput("Column")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_COLUMN_NAME);
  this.appendValueInput("keyWord")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_KEY_WORD);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)}
};

Blockly.Blocks.deleteRow={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE+"  "+Blockly.Msg.GOOGLESHEETS_DELETE_ROW);
  this.appendValueInput("RowIndex")
      .setCheck("Number")
      .appendField(Blockly.Msg.GOOGLESHEETS_ROWINDEX);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)}
};

Blockly.Blocks.getFieldValue={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE+"  "+Blockly.Msg.GOOGLESHEETS_GET_FIELD_VALUE);
  this.appendValueInput("field")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_COLUMN_NAME);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)}
};

Blockly.Blocks.updateCellValue={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE);
  this.appendValueInput("cell")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_UPDATE_TITLE);
  this.appendValueInput("data")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_UPDATE_DATA_TITLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)}
};

if (Blockly.Blocks.lists_create_with) {

Blockly.Blocks.data_join={
	init:function(){
    this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
    this.setColour(Blockly.Blocks.googlesheets.HUE);
		//this.setStyle("list_blocks");
		this.itemCount_=3;
		this.updateShape_();
		this.setOutput(!0,"String");
		this.setMutator(new Blockly.Mutator(["lists_create_with_item"]));
		this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)
	}
	,mutationToDom:function(){
		var a=Blockly.utils.xml.createElement("mutation");
		a.setAttribute("items",this.itemCount_);
		return a
	}
	,domToMutation:function(a){
		this.itemCount_=parseInt(a.getAttribute("items"),10);
		this.updateShape_()
	}
	,decompose:function(a){
		var b=a.newBlock("lists_create_with_container");
		b.initSvg();
		for(var c=b.getInput("STACK").connection,d=0;d<this.itemCount_;d++){
			var e=a.newBlock("lists_create_with_item");
			e.initSvg();
			c.connect(e.previousConnection);
			c=e.nextConnection}
			return b
	}
	,compose:function(a){
		var b=a.getInputTargetBlock("STACK");
		for(a=[];b&&!b.isInsertionMarker();)
			a.push(b.valueConnection_),b=b.nextConnection&&b.nextConnection.targetBlock();
		for(b=0;b<this.itemCount_;b++){
			var c=this.getInput("ADD"+b).connection.targetConnection;
			c&&-1==a.indexOf(c)&&c.disconnect()
		}
		this.itemCount_=a.length;
		this.updateShape_();
		for(b=0;b<this.itemCount_;b++)
			Blockly.Mutator.reconnect(a[b],this,"ADD"+b)
	}
	,saveConnections:function(a){
		a=a.getInputTargetBlock("STACK");
		for(var b=0;a;){
			var c=this.getInput("ADD"+b);
			a.valueConnection_=c&&c.connection.targetConnection;
			b++;
			a=a.nextConnection&&a.nextConnection.targetBlock()
		}
	}
	,updateShape_:function(){
		this.itemCount_&&this.getInput("EMPTY")?this.removeInput("EMPTY"):this.itemCount_||this.getInput("EMPTY")||this.appendDummyInput("EMPTY").appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE,"TITLE");
		for(var a=0;a<this.itemCount_;a++)
			if(!this.getInput("ADD"+a)){
				var b=this.appendValueInput("ADD"+a).setAlign(Blockly.ALIGN_RIGHT);
				0==a&&b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH,"TITLE")
			}
			for(;this.getInput("ADD"+a);)
				this.removeInput("ADD"+a),a++
	}
	,onchange: function(event) {
		if (!this.workspace) {
		  // Block is deleted.
		  return;
		}
		if (!event.recordUndo) {
		  // Events not generated by user. Skip handling.
		  return;
		}
		if (this.mutator.block_.parentBlock_) {
			if (this.mutator.block_.parentBlock_.type=="procedures_callnoreturn") {
				this.getField("TITLE").setValue(Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH_PROCEDURE_VALUE"]);
				this.getField("TITLE").isDirty_=true;
				return;
			}
			else if (this.mutator.block_.parentBlock_.type=="procedures_callreturn") {
				this.getField("TITLE").setValue(Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH_PROCEDURE_VALUE"]);
				this.getField("TITLE").isDirty_=true;
				return;
			}
			else if (this.mutator.block_.parentBlock_.type=="procedures_defnoreturn"||this.mutator.block_.parentBlock_.type=="procedures_defreturn") {	
				if (this.itemCount_) {
					for (var i=0;i<this.itemCount_;i++) {
						var targetBlock = this.getInputTargetBlock('ADD'+i);
						if (targetBlock) { 
							if (targetBlock.type!="variables_set2") {
								targetBlock.unplug();
							}
						}
					}
				}
				this.getField("TITLE").setValue(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH_PROCEDURE);
				this.getField("TITLE").isDirty_=true;
				//this.setInputsInline(!0);
				return;
			}	
		}
		if (this.itemCount_) {
			for (var i=0;i<this.itemCount_;i++) {
				var targetBlock = this.getInputTargetBlock('ADD'+i);
				if (targetBlock) { 
					if (targetBlock.type=="variables_set2") {
						this.getField("TITLE").setValue(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH_PROCEDURE);
						this.getField("TITLE").isDirty_=true;
						return;
					}
				}
			}				
			this.getField("TITLE").setValue(Blockly.Msg.GOOGLESHEETS_TITLE+" "+Blockly.Msg.GOOGLESHEETS_DATA_TITLE_CREATEWITH);
		}
		else
			this.getField("TITLE").setValue(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
		
		this.getField("TITLE").isDirty_=true;
		this.setInputsInline(0);
	} 
};

} else {

Blockly.Blocks.data_join={init:function(){
  this.setHelpUrl(Blockly.Msg.GOOGLESHEETS_HELPURL);
  this.setColour(Blockly.Blocks.googlesheets.HUE);
  this.itemCount_=2;
  this.updateShape_();
  this.setOutput(!0,"String");
  this.setMutator(new Blockly.Mutator(["text_create_join_item"]));
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)
},mutationToDom:function(){
  var a=document.createElement("mutation");
  a.setAttribute("items",this.itemCount_);
  return a
},domToMutation:function(a){
  this.itemCount_=parseInt(a.getAttribute("items"),10);
  this.updateShape_()
},decompose:function(a){
  var b=Blockly.Block.obtain(a,"text_create_join_container");
  b.initSvg();
  for(var d=b.getInput("STACK").connection,c=0;c<this.itemCount_;c++){
    var e=Blockly.Block.obtain(a,"text_create_join_item");
    e.initSvg();
    d.connect(e.previousConnection);
    d=e.nextConnection
  }
  return b
},compose:function(a){
  a=a.getInputTargetBlock("STACK");
  for(var b=[],d=0;a;)
    b[d]=a.valueConnection_,
    a=a.nextConnection&&a.nextConnection.targetBlock(),
    d++;
  this.itemCount_=d;
  this.updateShape_();
  for(d=0;d<this.itemCount_;d++)
    b[d]&&this.getInput("ADD"+d).connection.connect(b[d])
},saveConnections:function(a){
  a=a.getInputTargetBlock("STACK");
  for(var b=0;a;){
    var d=this.getInput("ADD"+b);
    a.valueConnection_=d&&d.connection.targetConnection;
    b++;
    a=a.nextConnection&&a.nextConnection.targetBlock()
  }
},updateShape_:function(){
  if(this.getInput("EMPTY"))
    this.removeInput("EMPTY");
  else
    for(var a=0;this.getInput("ADD"+a);)
      this.removeInput("ADD"+a),a++;
    if(0==this.itemCount_)
      this.appendDummyInput("EMPTY").appendField(new Blockly.FieldImage(Blockly.pathToMedia+"quote0.png",12,12,'"')).appendField(new Blockly.FieldImage(Blockly.pathToMedia+"quote1.png",12,12,'"'));
    else
      for(a=0;a<this.itemCount_;a++){
        var b=this.appendValueInput("ADD"+a);
        0==a&&b.appendField(Blockly.Msg.GOOGLESHEETS_TITLE+" "+Blockly.Msg.GOOGLESHEETS_DATA_TITLE_CREATEWITH)
      }
}};


}

//NTP_time
Blockly.Blocks.esp32_ntp={};
Blockly.Blocks.esp32_ntp.HUE=275;
Blockly.Blocks.set_ntp_time={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32NTP_HELPURL);
  this.setColour(Blockly.Blocks.esp32_ntp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32NTP_TITLE+"  "+Blockly.Msg.ESP32NTP_SETUP_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32NTP_TIMEZONE)
      .appendField(new Blockly.FieldDropdown([["UTC+8","8"],["UTC+0","0"],["UTC+1","1"],["UTC+2","2"],["UTC+3","3"],["UTC+4","4"],["UTC+5","5"],["UTC+6","6"],["UTC+7","7"],["UTC+9","9"],["UTC+10","10"],["UTC+11","11"],["UTC+12","12"]
                                              ,["UTC-1","-1"],["UTC-2","-2"],["UTC-3","-3"],["UTC-4","-4"],["UTC-5","-5"],["UTC-6","-6"],["UTC-7","-7"],["UTC-8","-8"],["UTC-9","-9"],["UTC-10","-10"],["UTC-11","-11"]]),"TZ");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ESP32NTP_TOOLTIP)}
};

Blockly.Blocks.get_RTC_str={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32NTP_HELPURL);
  this.setColour(Blockly.Blocks.esp32_ntp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32NTP_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32NTP_GET_RTC_STR)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.ESP32NTP_TIME_FORMAT),"TIMEFORMAT");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.ESP32NTP_TOOLTIP)}
};

Blockly.Blocks.get_RTC_field={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32NTP_HELPURL);
  this.setColour(Blockly.Blocks.esp32_ntp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32NTP_TITLE+"  "+Blockly.Msg.ESP32NTP_GET_RTC_FIELD)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.ESP32NTP_RTC_FIELD_TYPE),"FIELDTYPE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.ESP32NTP_TOOLTIP)}
};

Blockly.Blocks.set_manual_time={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32NTP_HELPURL);
  this.setColour(Blockly.Blocks.esp32_ntp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32NTP_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32NTP_SET_TIME);
  this.appendValueInput("YEAR")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.TIMES_DATETIME_RTC_APPENDTEXT_YEAR);
  this.appendValueInput("MONTH")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.TIMES_DATETIME_RTC_APPENDTEXT_MONTH);
  this.appendValueInput("DAY")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.TIMES_DATETIME_RTC_APPENDTEXT_DAY);
  this.appendValueInput("HOUR")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.TIMES_DATETIME_RTC_APPENDTEXT_HOUR);
  this.appendValueInput("MINUTE")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.TIMES_DATETIME_RTC_APPENDTEXT_MIN);
  this.appendValueInput("SECOND")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.TIMES_DATETIME_RTC_APPENDTEXT_SEC);
  this.setInputsInline(0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ESP32NTP_TOOLTIP)}
};

//Line Notify
Blockly.Blocks.line_notify={};
Blockly.Blocks.line_notify.HUE=120;
Blockly.Blocks.line_notify.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};
Blockly.Blocks.setLineToken={init:function(){
  this.setHelpUrl(Blockly.Msg.LINENOTIFY_HELPURL);
  this.setColour(Blockly.Blocks.line_notify.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LINENOTIFY_TITLE);
  this.appendValueInput("TOKEN")
      .setCheck("String")
      .appendField(Blockly.Msg.LINENOTIFY_SETUP_TOKEN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LINENOTIFY_TOOLTIP)}
};

Blockly.Blocks.sendLineMsg={init:function(){
  this.setHelpUrl(Blockly.Msg.LINENOTIFY_HELPURL);
  this.setColour(Blockly.Blocks.line_notify.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LINENOTIFY_TITLE);
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.LINENOTIFY_SEND_MSG);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LINENOTIFY_TOOLTIP)}
};

Blockly.Blocks.sendSticker={init:function(){
  this.setHelpUrl(Blockly.Msg.LINENOTIFY_HELPURL);
  this.setColour(Blockly.Blocks.line_notify.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LINENOTIFY_TITLE);
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.LINENOTIFY_SEND_MSG);
  this.appendValueInput("PACKAGEID")
      .setCheck("Number")
      .appendField(Blockly.Msg.LINENOTIFY_PACKAGEID);
  this.appendValueInput("STICKERID")
      .setCheck("Number")
      .appendField(Blockly.Msg.LINENOTIFY_STICKERID);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LINENOTIFY_TOOLTIP)}
};

Blockly.Blocks.breakLine={init:function(){
  this.setHelpUrl(Blockly.Msg.LINENOTIFY_HELPURL);
  this.setColour(Blockly.Blocks.line_notify.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LINENOTIFY_LINE_BREAK);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LINENOTIFY_TOOLTIP)}
};

//ttgo tft
Blockly.Blocks.ttgo_tft={};
Blockly.Blocks.ttgo_tft.HUE=120;
Blockly.Blocks.ttgo_tft.HUE2=Blockly.Blocks.mp3.HUE;
Blockly.Blocks.ttgo_tft.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.ttgo_tft_init={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_INIT)
      .appendField(new Blockly.FieldDropdown([["KSB065","KSB065"],["KSB064","KSB064"],["PixelBit","PIXELBIT"],["TTGO","TTGO"],["I2S_GO","I2SGO"]]),"TFT_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
}

Blockly.Blocks.ttgo_tft_wh={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_GET_WIDTH_HEIGHT)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.TTGO_TFT_WIDTH_HEIGHT_LIST),"W_H");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_rotation={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_SET_ROTATION)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.TTGO_TFT_ROTATION),"ROTATION");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_rotation4={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_SET_ROTATION)
      .appendField(new Blockly.FieldDropdown([["0","0"],["1","1"],["2","2"],["3","3"]]),"ROTATION");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_fill={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE);
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_TFT_FILL_COLOR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_set_color={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE);
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_TFT_DRAW_COLOR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_set_font_color={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE);
  this.appendValueInput("FG_COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_TFT_SET_FONT_COLOR+" "+Blockly.Msg.TTGO_TFT_FG_COLOR);
  this.appendValueInput("BG_COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_TFT_BG_COLOR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_draw_u8g2_text={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_DRAW_U8G2_TEXT);
  this.appendValueInput("START_X")
      .setCheck("Number")
      .appendField("X:");
  this.appendValueInput("START_Y")
      .setCheck("Number")
      .appendField("Y:");
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_DRAW_U8G2_FONT_NAME);
  this.appendValueInput("FONT_NAME")
      .setCheck("String");
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_TEXT_CONTENT);
  this.appendValueInput("CONTENT")
      .setCheck("String");
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TRANSPARENT)
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"TRANSPARENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_draw_chinese_text={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_DRAW_CHINESE_TEXT);
  this.appendValueInput("START_X")
      .setCheck("Number")
      .appendField("X:");
  this.appendValueInput("START_Y")
      .setCheck("Number")
      .appendField("Y:");
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_TEXT_CONTENT);
  this.appendValueInput("CONTENT")
      .setCheck("String");
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TRANSPARENT)
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"TRANSPARENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_set_eng_font={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_DRAW_ENG_FONT_SIZE);
  this.appendValueInput("SIZE")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_set_eng_font_num={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_DRAW_ENG_FONT_NUMBER);
  this.appendValueInput("FONT")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_print_eng_text={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_PRINT_ENG_TEXT);
  this.appendValueInput("START_X")
      .setCheck("Number")
      .appendField("X:");
  this.appendValueInput("START_Y")
      .setCheck("Number")
      .appendField("Y:");
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_TEXT_CONTENT);
  this.appendValueInput("CONTENT")
      .setCheck("String");
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TRANSPARENT)
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"TRANSPARENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_draw_eng_text={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_DRAW_ENG_TEXT);
  this.appendValueInput("START_X")
      .setCheck("Number")
      .appendField("X:");
  this.appendValueInput("START_Y")
      .setCheck("Number")
      .appendField("Y:");
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_TEXT_CONTENT);
  this.appendValueInput("CONTENT")
      .setCheck("String");
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TRANSPARENT)
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"TRANSPARENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_button={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+" TTGO "+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["A","A"],["B","B"],["A+B","C"]]),"AB_BUTTON");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_BUTTON_CHECK);
  this.setInputsInline(!0);
  this.appendStatementInput("TTGO_BUTTON_CALL");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_set_font={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE);
  this.appendValueInput("FONT")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_SET_FONT_NAME);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};


Blockly.Blocks.ttgo_tft_draw_symbol={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_DRAW_SYMBOL);
  this.appendValueInput("START_X")
      .setCheck("Number")
      .appendField("X:");
  this.appendValueInput("START_Y")
      .setCheck("Number")
      .appendField("Y:");
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_DRAW_SYMBOL_NUMBER);
  this.appendValueInput("SYMBOL_NUM")
      .setCheck("Number");
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TRANSPARENT)
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"TRANSPARENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_draw_chart={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART);
  this.appendValueInput("INPUT")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_INPUT);
  this.appendValueInput("MIN")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_MIN);
  this.appendValueInput("MAX")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_MAX);
  this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_TYPE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.OLED_DISPLAY_CHART_TYPE_LIST),"CHART_TYPE");
  this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_SCROLL)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.OLED_DISPLAY_CHART_DIR_LIST),"DIR_TYPE");
  this.appendValueInput("COLOR")
      .setAlign(Blockly.ALIGN_RIGHT)
      .setCheck("String")
      .appendField(Blockly.Msg.PROBBIE_COLOR);
  this.appendStatementInput("EXTRA")
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_EXTRA);
  this.setInputsInline(0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_clear_chart={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.OLED_DISPLAY_CHART_CLEAR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_create_sprite={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_CRATE_SPRITE);
  this.appendValueInput("SPRITE_NAME")
      .appendField(Blockly.Msg.TTGO_TFT_SPRITE_NAME);
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_BOX_END_NEW);
  this.appendValueInput("WIDTH")
      .setCheck("Number")
      .appendField("W");
  this.appendValueInput("HEIGHT")
      .setCheck("Number")
      .appendField("H");
  this.appendStatementInput("EXTRA");
  this.setInputsInline(1);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_delete_sprite={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_DELETE_SPRITE);
  this.appendValueInput("SPRITE_NAME")
      .appendField(Blockly.Msg.TTGO_TFT_SPRITE_NAME);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_push_sprite={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_PUSH_SPRITE);
  this.appendValueInput("SPRITE_NAME")
      .appendField(Blockly.Msg.TTGO_TFT_SPRITE_NAME);
  this.appendDummyInput()
  this.appendValueInput("X")
      .setCheck("Number")
      .appendField("X");
  this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("Y");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_push_sprite_trans={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_PUSH_SPRITE);
  this.appendValueInput("SPRITE_NAME")
      .appendField(Blockly.Msg.TTGO_TFT_SPRITE_NAME);
  this.appendDummyInput()
  this.appendValueInput("X")
      .setCheck("Number")
      .appendField("X");
  this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("Y");
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_TFT_TRANSPARENT_COLOR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_push_image={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_PUSH_IMAGE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_UPLOAD_FROM)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.DAC_FILE_SOURCE),"F_SOURCE");
  this.appendValueInput("FILE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_FILE_NAME);
  this.appendValueInput("X")
      .setCheck("Number")
      .appendField("X");
  this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("Y");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_get_camera={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_GET_CAMERA);
  this.appendValueInput("X")
      .setCheck("Number")
      .appendField("X");
  this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("Y");
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_GET_CAMERA_SCALE)
      .appendField(new Blockly.FieldDropdown([["1","1"],["1/2","2"],["1/4","4"],["1/8","8"]]),"SCALE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_draw_qr={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.OLED_DISPLAY_QR);
  this.appendValueInput("START_X")
      .setCheck("Number")
      .appendField("X:");
  this.appendValueInput("START_Y")
      .setCheck("Number")
      .appendField("Y:");
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_QR_SIZE)
      .appendField(new Blockly.FieldDropdown([["132x132","11"],["124x124","10"],["116x116","9"],["108x108","8"],["100x100","7"],["92x92","6"],["84x84","5"],["76x76","4"],["68x68","3"],["60x60","2"],["52x52","1"]]),"SIZE");
  this.appendValueInput("COLOR")
      .setAlign(Blockly.ALIGN_RIGHT)
      .setCheck("String")
      .appendField(Blockly.Msg.PROBBIE_COLOR);
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.OLED_DISPLAY_QR_CONTENT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_draw_line={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_LINE_START);
  this.appendValueInput("START_X")
      .setCheck("Number")
      .appendField("X");
  this.appendValueInput("START_Y")
      .setCheck("Number")
      .appendField("Y");
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_LINE_END);
  this.appendValueInput("END_X")
      .setCheck("Number")
      .appendField("X");
  this.appendValueInput("END_Y")
      .setCheck("Number")
      .appendField("Y");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_draw_box={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_DRAW_BOX);
  this.appendValueInput("START_X")
      .setCheck("Number")
      .appendField("X");
  this.appendValueInput("START_Y")
      .setCheck("Number")
      .appendField("Y");
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_BOX_END_NEW);
  this.appendValueInput("END_X")
      .setCheck("Number")
      .appendField("W");
  this.appendValueInput("END_Y")
      .setCheck("Number")
      .appendField("H");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_FILLED)
      .appendField(new Blockly.FieldDropdown([["YES","1"],["NO","0"]]),"FILLED_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_draw_circle={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_CIRCLE_CENTER);
  this.appendValueInput("X")
      .setCheck("Number")
      .appendField("X");
  this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("Y");
  this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DISPLAY_DRAW_CIRCLE_RADIUS);
  this.appendValueInput("RADIUS")
      .setCheck("Number");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_FILLED)
      .appendField(new Blockly.FieldDropdown([["YES","1"],["NO","0"]]),"FILLED_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_draw_triangle={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_DRAW_TRIANGLE);
  this.appendValueInput("X1")
      .setCheck("Number")
      .appendField("X1");
  this.appendValueInput("Y1")
      .setCheck("Number")
      .appendField("Y1");
  this.appendValueInput("X2")
      .setCheck("Number")
      .appendField("X2");
  this.appendValueInput("Y2")
      .setCheck("Number")
      .appendField("Y2");
  this.appendValueInput("X3")
      .setCheck("Number")
      .appendField("X3");
  this.appendValueInput("Y3")
      .setCheck("Number")
      .appendField("Y3");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LDM6432_FILLED)
      .appendField(new Blockly.FieldDropdown([["YES","1"],["NO","0"]]),"FILLED_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_getRGBcolor={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PROBBIE_COLOR);
  this.appendValueInput("RED")
      .setCheck("Number")
      .appendField("R");
  this.appendValueInput("GREEN")
      .setCheck("Number")
      .appendField("G");
  this.appendValueInput("BLUE")
      .setCheck("Number")
      .appendField("B");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_getFromColorPicker={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.PROBBIE_COLOR)
      .appendField(new Blockly.FieldColour("#0000ff"),"RGB");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_set_clock={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.TTGO_TFT_SET_CLOCK);
  this.appendValueInput("COLOR_HOUR")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_TFT_COLOR_HOUR);
  this.appendValueInput("COLOR_MINUTE")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_TFT_COLOR_MIN);
  this.appendValueInput("COLOR_SECOND")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_TFT_COLOR_SEC);
  this.appendValueInput("COLOR_SCALE")
      .setCheck("String")
      .appendField(Blockly.Msg.TTGO_TFT_COLOR_SCALE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};

Blockly.Blocks.ttgo_tft_draw_clock={init:function(){
  this.setHelpUrl(Blockly.Msg.TTGO_TFT_HELPURL);
  this.setColour(Blockly.Blocks.ttgo_tft.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_TITLE)
      .appendField(Blockly.Msg.OLED_DISPLAY_CLOCK);
  this.appendDummyInput()
      .appendField(Blockly.Msg.TTGO_TFT_CLOCK_POSITION_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.TTGO_TFT_CLOCK_POSITION),"CLOCK_POS");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.TTGO_TFT_TOOLTIP)}
};


//S20
Blockly.Blocks.s20={};
Blockly.Blocks.s20.HUE=198;
Blockly.Blocks.s20_led={init:function(){
  this.setHelpUrl(Blockly.Msg.S20_HELPURL);
  this.setColour(Blockly.Blocks.s20.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.S20_TITLE)
  this.appendValueInput("ON_OFF")
      .setCheck("Boolean")
      .appendField(Blockly.Msg.S20_LED);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.S20_TOOLTIP)}
};

Blockly.Blocks.s20_relay={init:function(){
  this.setHelpUrl(Blockly.Msg.S20_HELPURL);
  this.setColour(Blockly.Blocks.s20.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.S20_TITLE);
  this.appendValueInput("ON_OFF")
      .setCheck("Boolean")
      .appendField(Blockly.Msg.S20_RELAY);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.S20_TOOLTIP)}
};

Blockly.Blocks.s20_button={init:function(){
  this.setHelpUrl(Blockly.Msg.S20_HELPURL);
  this.setColour(Blockly.Blocks.s20.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.S20_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+Blockly.Msg.LIOU_ROBOT_BUTTON+"(P0) "+Blockly.Msg.LIOU_ROBOT_BUTTON_CHECK);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_BUTTON_CALL");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.S20_TOOLTIP)}
};

Blockly.Blocks.s20_button_bool={init:function(){
  this.setHelpUrl(Blockly.Msg.S20_HELPURL);
  this.setColour(Blockly.Blocks.s20.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.S20_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.S20_PRESSED);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.S20_TOOLTIP)}
};

Blockly.Blocks.s20_relay_bool={init:function(){
  this.setHelpUrl(Blockly.Msg.S20_HELPURL);
  this.setColour(Blockly.Blocks.s20.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.S20_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.S20_RELAY_OPENED);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.S20_TOOLTIP)}
};

//I2S DAC
Blockly.Blocks.dac={};
Blockly.Blocks.dac.HUE=90;
Blockly.Blocks.dac.HUE1=288;
Blockly.Blocks.dac.HUE2=166;
Blockly.Blocks.dac.HUE3=222;
Blockly.Blocks.dac.HUE4=30;
Blockly.Blocks.dac.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
    if (master.indexOf('dac_init')>-1){
	  	for(var c=0;c<a.length;c++){
		  	if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),(master==a[c].type)||(a[c].type.indexOf('pocketcard')>-1)){
			    return!0;
        }
      }
    } else {
	  	for(var c=0;c<a.length;c++)
		  	if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			    return!0;
      }
    }
		return b
};

Blockly.Blocks.dac_init={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE)
      .appendField(Blockly.Msg.DAC_INIT);
  this.appendValueInput("LRC_PIN")
      .setCheck("Number")
      .appendField("LRC "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("BCLK_PIN")
      .setCheck("Number")
      .appendField("BCLK "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("DATA_PIN")
      .setCheck("Number")
      .appendField("DATA "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.pocketcard_dac_init={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE)
      .appendField("PocketCard "+Blockly.Msg.POCKETCARD_DAC_INIT)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_loop={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE)
      .appendField(Blockly.Msg.DAC_LOOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE)
      .appendField(Blockly.Msg.DAC_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};


Blockly.Blocks.dac_set_gain={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE);
  this.appendValueInput("GAIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.DAC_GAIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_tts={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE)
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_TTS_TITLE);
  this.appendValueInput("L_CODE")
      .appendField(Blockly.Msg.DAC_TTS_LANGUAGE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_tts_file={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE)
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_TTS_FILE_TITLE);
  this.appendValueInput("L_CODE")
      .appendField(Blockly.Msg.DAC_TTS_LANGUAGE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TTS_SAVE_TO)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.DAC_FILE_SOURCE),"F_SOURCE");
  this.appendValueInput("FILENAME")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_FILE_NAME);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_radio={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE);
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_RADIO_TITLE+" URL");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_radioList={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_RADIO_LIST_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.DAC_RADIO_LIST),"RADIO_URL");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_http_mp3={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE);
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_HTTP_MP3_TITLE+" URL");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_http_mp3_end={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE)
      .appendField(Blockly.Msg.DAC_HTTP_MP3_END);
  this.setInputsInline(!0);
  this.appendStatementInput("HTTP_MP3_END_CALL");
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_http_mp3_ends_with={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE);
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_HTTP_MP3_ENDS_WITH);
  this.appendStatementInput("HTTP_MP3_ENDS_WITH_CALL");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_tts_end={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE)
      .appendField(Blockly.Msg.DAC_TTS_END);
  this.setInputsInline(!0);
  this.appendStatementInput("TTS_END_CALL");
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_tts_ends_with={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE);
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_TTS_ENDS_WITH);
  this.appendStatementInput("TTS_ENDS_WITH_CALL");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_is_running={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE)
      .appendField(Blockly.Msg.DAC_IS_RUNNING);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_file={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_FILE_SOURCE_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.DAC_FILE_SOURCE),"F_SOURCE");
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_FILE_NAME);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};


Blockly.Blocks.dac_mp3_end={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE)
      .appendField(Blockly.Msg.DAC_MP3_END);
  this.setInputsInline(!0);
  this.appendStatementInput("MP3_END_CALL");
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

Blockly.Blocks.dac_mp3_ends_with={init:function(){
  this.setHelpUrl(Blockly.Msg.DAC_HELPURL);
  this.setColour(Blockly.Blocks.dac.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.DAC_TITLE);
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_MP3_ENDS_WITH);
  this.appendStatementInput("MP3_ENDS_WITH_CALL");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.DAC_TOOLTIP)}
};

//SD_Card
Blockly.Blocks.sd={};
Blockly.Blocks.sd.HUE=90;
Blockly.Blocks.sd.HUE_FILE=288;
Blockly.Blocks.sd.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.sd_init={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE)
      .appendField(Blockly.Msg.SD_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_KSB065_init={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE);
  this.appendDummyInput()
      .appendField("KSB065 & PocketCard")
      .appendField(Blockly.Msg.SD_TITLE)
      .appendField(Blockly.Msg.SD_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_set_cs={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("CS_PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.SD_SET_CS);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_exists={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE)
      .appendField(Blockly.Msg.SD_EXISTS);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_mkdir={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("DIR")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_MKDIR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_rmdir={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("DIR")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_RMDIR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_file_download={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("URL")
      .setCheck("String")
      .appendField(Blockly.Msg.SPIFFS_FILE_DOWNLOAD);
  this.appendValueInput("F_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SPIFFS_FILE_SAVE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.sd_file_init={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_VARIABLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_file_open={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendValueInput("FILE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_OPEN);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_FILE_OPEN_MODE_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.SD_FILE_OPEN_MODE),"MODE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_file_exists={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_FILE_EXISTS);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_file_close={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_FILE_CLOSE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_file_println={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.SD_FILE_PRINT_MODE),"MODE");
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_PRINT_CONTENT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_file_available={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_FILE_AVAILABLE);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_file_readuntil_char={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendValueInput("CHAR")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_READ_UNTIL_CHAR);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

Blockly.Blocks.sd_file_read_line={init:function(){
  this.setHelpUrl(Blockly.Msg.SD_HELPURL);
  this.setColour(Blockly.Blocks.sd.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_FILE_READ_LINE);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.SD_TOOLTIP)}
};

//ESP32_IRQ
Blockly.Blocks.esp32_irq={};
Blockly.Blocks.esp32_irq.HUE=274;
Blockly.Blocks.esp32_irq.HUE2=91;
Blockly.Blocks.esp32_irq.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.esp32_irq_timer_task={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32_IRQ_HELPURL);
  this.setColour(Blockly.Blocks.esp32_irq.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_TIMER_TITLE)
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION);
  this.appendValueInput("F_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION_NAME);
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.ESP32_IRQ_TOOLTIP)}
};

Blockly.Blocks.esp32_irq_timer_run={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32_IRQ_HELPURL);
  this.setColour(Blockly.Blocks.esp32_irq.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_TIMER_TITLE)
      .appendField(Blockly.Msg.ESP32_IRQ_RUN);
  this.appendValueInput("F_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION+" "+Blockly.Msg.ESP32_IRQ_FUNCTION_NAME);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_RUN_ON_TIMER)
      .appendField(new Blockly.FieldDropdown([["0","0"],["1","1"],["2","2"],["3","3"]]),"TIMER");
  this.appendValueInput("DURATION")
      .setCheck("Number")
      .appendField(Blockly.Msg.ESP32_IRQ_TIMER_DURATION);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.ESP32_IRQ_TIMER_UNIT),"UNIT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ESP32_IRQ_TOOLTIP)}
};

Blockly.Blocks.esp32_irq_timer_delete={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32_IRQ_HELPURL);
  this.setColour(Blockly.Blocks.esp32_irq.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_TIMER_TITLE)
      .appendField(Blockly.Msg.ESP32_IRQ_DELETE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_RUN_ON_TIMER)
      .appendField(new Blockly.FieldDropdown([["0","0"],["1","1"],["2","2"],["3","3"]]),"TIMER");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ESP32_IRQ_TOOLTIP)}
};

Blockly.Blocks.esp32_irq_pin_task={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32_IRQ_HELPURL);
  this.setColour(Blockly.Blocks.esp32_irq.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_PIN_TITLE)
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION);
  this.appendValueInput("F_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION_NAME);
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.ESP32_IRQ_TOOLTIP)}
};

Blockly.Blocks.esp32_irq_pin_run={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32_IRQ_HELPURL);
  this.setColour(Blockly.Blocks.esp32_irq.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_PIN_TITLE)
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN)
      .appendField("Pin");
  this.appendValueInput("PIN")
      .setCheck("Number");
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.ESP32_IRQ_PIN_MODE),"MODE");
  this.appendValueInput("F_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.ESP32_IRQ_RUN +" "+Blockly.Msg.ESP32_IRQ_FUNCTION+" "+Blockly.Msg.ESP32_IRQ_FUNCTION_NAME);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ESP32_IRQ_TOOLTIP)}
};

Blockly.Blocks.esp32_irq_pin_delete={init:function(){
  this.setHelpUrl(Blockly.Msg.ESP32_IRQ_HELPURL);
  this.setColour(Blockly.Blocks.esp32_irq.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_PIN_TITLE)
      .appendField(Blockly.Msg.ESP32_IRQ_PIN_DELETE)
      .appendField("Pin");
  this.appendValueInput("PIN")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ESP32_IRQ_TOOLTIP)}
};

//ESP32_BLE
Blockly.Blocks.ljj_esp32_BLE={};
Blockly.Blocks.ljj_esp32_BLE.HUE=80;

Blockly.Blocks.ljj_esp32_ble_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_TITLE)
      .appendField(Blockly.Msg.SD_INIT);
  this.appendValueInput("BLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_NAME);
  this.appendValueInput("UUID")
      .setCheck("String")
      .appendField("Service UUID");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_ble_onConnected={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_ON)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_ESP32_BLE_CONNECTED_STATUS),"STATUS")
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_ble_recv_avalable={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_RECEIVED_EVENT);
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_ble_read_result={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_TITLE)
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_MESSAGE);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_ble_read_v7rc={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_TITLE)
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_V7RC);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_ESP32_BLE_V7RC_DATATYPE),"TYPE")
      .appendField("?");
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_ble_read_v7rc_result={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_TITLE)
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_MESSAGE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_V7RC_CONVERT)
      .appendField("channel:")
      .appendField(new Blockly.FieldDropdown([["1","0"],["2","1"],["3","2"],["4","3"]]),"CHANNEL")
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_ESP32_BLE_V7RC_VALUETYPE),"VALUE_TYPE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_TOOLTIP)},onchange:function(){
      this.setOutput(!0,this.getFieldValue("VALUE_TYPE"));
  }
};

Blockly.Blocks.ljj_esp32_ble_send={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_TITLE);
  this.appendValueInput("MESSAGE")
      .setCheck("String")
      .appendField(Blockly.Msg.LINENOTIFY_SEND_MSG);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_RETURN)
      .appendField(new Blockly.FieldCheckbox("FALSE"), "LINE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_ble_connected={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_TITLE)
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CONNECTED);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_TOOLTIP)}
};

//ESP32_BLE_CLIENT
Blockly.Blocks.ljj_esp32_BLE_client={};
Blockly.Blocks.ljj_esp32_BLE_client.HUE=240;

Blockly.Blocks.ljj_esp32_ble_client_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE_client.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TITLE)
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_SCAN_CONNECT);
  this.appendValueInput("BLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_NAME);
  this.appendValueInput("UUID")
      .setCheck("String")
      .appendField("Service UUID");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_ble_client_onConnected={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE_client.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_ON)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_ESP32_BLE_CONNECTED_STATUS),"STATUS")
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_ble_client_recv_avalable={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE_client.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_RECEIVED_EVENT);
  this.appendStatementInput("STATEMENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_ble_client_read_result={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE_client.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TITLE)
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_MESSAGE);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_ble_client_send={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE_client.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TITLE);
  this.appendValueInput("MESSAGE")
      .setCheck("String")
      .appendField(Blockly.Msg.LINENOTIFY_SEND_MSG);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_RETURN)
      .appendField(new Blockly.FieldCheckbox("FALSE"), "LINE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_ble_client_connected={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_HELPURL);
  this.setColour(Blockly.Blocks.ljj_esp32_BLE_client.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TITLE)
      .appendField(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_CONNECTED);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LJJ_ESP32_BLE_CLIENT_TOOLTIP)}
};

//L9110
Blockly.Blocks.l9110={};
Blockly.Blocks.l9110.HUE=340;
Blockly.Blocks.l9110.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.l9110_init_channel={init:function(){
  this.setHelpUrl(Blockly.Msg.L9110_HELPURL);
  this.setColour(Blockly.Blocks.l9110.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_TITLE)
      .appendField('ESP32')
      .appendField(Blockly.Msg.L9110_MOTORS_CHANNEL);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.L9110_TWO_MOTORS,'both'],[Blockly.Msg.L9110_SINGLE,'A']],this.validate),'SINGLE')
  this.appendValueInput("M1B_CHANNEL")
      .setCheck("Number")
      .appendField(Blockly.Msg.L9110_MOTOR+'A '+Blockly.Msg.ESP32_ANALOG_WRITE_CHANNEL);
  this.appendValueInput("M2B_CHANNEL")
      .setCheck("Number")
      .appendField(Blockly.Msg.L9110_MOTOR+'B '+Blockly.Msg.ESP32_ANALOG_WRITE_CHANNEL);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.L9110_TOOLTIP)},validate: function(newValue) {
        const sourceBlock = this.sourceBlock_;
        sourceBlock.getInput("M2B_CHANNEL").setVisible(newValue=='both');
  }
};

Blockly.Blocks.l9110_init={init:function(){
  this.setHelpUrl(Blockly.Msg.L9110_HELPURL);
  this.setColour(Blockly.Blocks.l9110.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_TITLE)
      .appendField(Blockly.Msg.L9110_TWO_MOTORS)
      .appendField(Blockly.Msg.L9110_INIT);
  this.appendValueInput("M1A")
      .setCheck("Number")
      .appendField("A-1A"+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("M1B")
      .setCheck("Number")
      .appendField("A-1B"+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("M2A")
      .setCheck("Number")
      .appendField("B-1A"+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("M2B")
      .setCheck("Number")
      .appendField("B-1B"+Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.L9110_TOOLTIP);}
};

Blockly.Blocks.l9110_init_single={init:function(){
  this.setHelpUrl(Blockly.Msg.L9110_HELPURL);
  this.setColour(Blockly.Blocks.l9110.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_TITLE)
      .appendField(Blockly.Msg.L9110_SINGLE)
      .appendField(Blockly.Msg.L9110_INIT);
  this.appendValueInput("M1A")
      .setCheck("Number")
      .appendField("A-1A"+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("M1B")
      .setCheck("Number")
      .appendField("A-1B"+Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.L9110_TOOLTIP)}
};

Blockly.Blocks.l9110_run={init:function(){
  this.setHelpUrl(Blockly.Msg.L9110_HELPURL);
  this.setColour(Blockly.Blocks.l9110.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_MOTOR)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.L9110_MOTOR_LIST),"MOTOR");
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_ROTATE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.L9110_DIRECTION),"DIR");
  this.appendValueInput("SPEED")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.L9110_TOOLTIP)}
};

Blockly.Blocks.l9110_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.L9110_HELPURL);
  this.setColour(Blockly.Blocks.l9110.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_MOTOR)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.L9110_MOTOR_LIST),"MOTOR");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.L9110_TOOLTIP)}
};

//EZ Start Plus
Blockly.Blocks.startPlus={};
Blockly.Blocks.startPlus.HUE=340;
Blockly.Blocks.startPlus.HUE1=30;
Blockly.Blocks.startPlus.HUE2=236;
Blockly.Blocks.startPlus.HUE3=97;
Blockly.Blocks.startPlus.HUE4=157;
Blockly.Blocks.startPlus.HUE5=290;
Blockly.Blocks.startPlus.HUE6=60;
Blockly.Blocks.startPlus_button={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+" "+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["A","A"],["B","B"],["A+B","C"]]),"AB_BUTTON");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_BUTTON_CHECK);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_BUTTON_CALL");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_vr={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.EZ_VR,"vr"],[Blockly.Msg.EZ_PHR,"phr"]]),"TYPE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_dht11={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.STARTPLUS_DHT)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.EZ_DHT_TEMP,"readTemperature"],[Blockly.Msg.EZ_DHT_HUMID,"readHumidity"]]),"DHT");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_relay={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.EZ_RELAY)
  this.appendValueInput("ON_OFF")
      .setCheck("Boolean");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_led={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.EZ_LED)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.EZ_LED_RED,"r_pin"],[Blockly.Msg.EZ_LED_YELLOW,"y_pin"],[Blockly.Msg.EZ_LED_GREEN,"g_pin"]]),"LED")
  this.appendValueInput("ON_OFF")
      .setCheck("Boolean");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_led_analog={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.EZ_LED)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.EZ_LED_RED,"r_pin"],[Blockly.Msg.EZ_LED_YELLOW,"y_pin"],[Blockly.Msg.EZ_LED_GREEN,"g_pin"]]),"LED")
  this.appendValueInput("NUM")
      .setCheck("Number")
      .appendField(Blockly.Msg.ESP32_ANALOG_WRITE_TITLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_pin={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE6);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(new Blockly.FieldDropdown([["IO_4","5"],["IO_5","6"],["IO_6","7"],["IO_8 (INPUT ONLY FOR ESP32)","0"],["IO_9","2"],["IO_10","1"],["IO_12 (ONLY FOR ESP32)","3"],["IO_14","4"]]),"PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.EZ_TONE)
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TONE_LIST),"FREQ");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_no_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.EZ_noTONE)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_custom_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.EZ_TONE);
  this.appendValueInput("FREQ")
      .setCheck("Number")
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ);
  this.appendValueInput("DURATION")
      .setCheck("Number")
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_DURATION);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_neopixel_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE5);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.EZ_NEOPIXEL_BEGIN_BRIGHTNESS)
  this.appendValueInput("BRIGHTNESS")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_neopixel_set_color={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE5);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE);
  this.appendValueInput("INDEX")
      .setCheck("Number")
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE);
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.NEOPIXEL_CUSTOM_SETPIXELCOLOR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_neopixel_set_colors={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL5);
  this.setColour(Blockly.Blocks.startPlus.HUE5);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE)
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.STARTPLUS_NEOPIXEL_SET_ALL_COLORS);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_neopixel_show={init:function(){
  this.setHelpUrl(Blockly.Msg.STARTPLUS_HELPURL);
  this.setColour(Blockly.Blocks.startPlus.HUE5);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE)
      .appendField(Blockly.Msg.NEOPIXEL_SHOW);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.STARTPLUS_TOOLTIP)}
};

Blockly.Blocks.startPlus_ir_receive={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.STARTPLUS_TITLE)
      .appendField(Blockly.Msg.STARTPLUS_IR_TITLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)}
};


//MAX30105
Blockly.Blocks.max30105={};
Blockly.Blocks.max30105.HUE=97;
Blockly.Blocks.max30105.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.max30105_init={init:function(){
  this.setHelpUrl(Blockly.Msg.MAX30105_HELPURL);
  this.setColour(Blockly.Blocks.max30105.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MAX30105_TITLE)
      .appendField(Blockly.Msg.PROBBIE_INIT);
  this.appendValueInput("LED")
      .setCheck("Number")
      .appendField(Blockly.Msg.MAX30105_LED+"(0~255)");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MAX30105_TOOLTIP)}
};

Blockly.Blocks.max30105_check={init:function(){
  this.setHelpUrl(Blockly.Msg.MAX30105_HELPURL);
  this.setColour(Blockly.Blocks.max30105.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MAX30105_TITLE)
      .appendField(Blockly.Msg.MAX30105_CHECK)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.MAX30105_CHECK_LIST),"CHECK_TYPE")
      .appendField("?");
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.MAX30105_TOOLTIP)}
};

Blockly.Blocks.max30105_get_beat_rate={init:function(){
  this.setHelpUrl(Blockly.Msg.MAX30105_HELPURL);
  this.setColour(Blockly.Blocks.max30105.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MAX30105_TITLE)
      .appendField(Blockly.Msg.MAX30105_BEATRATE);
  this.appendValueInput("AVG")
      .setCheck("Number");
  this.appendDummyInput()
      .appendField(Blockly.Msg.MAX30105_AVG);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MAX30105_TOOLTIP)}
};

Blockly.Blocks.max30105_get_spo2={init:function(){
  this.setHelpUrl(Blockly.Msg.MAX30105_HELPURL);
  this.setColour(Blockly.Blocks.max30105.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MAX30105_TITLE)
      .appendField(Blockly.Msg.MAX30105_SPO2);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MAX30105_TOOLTIP)}
};

Blockly.Blocks.max30105_get_temperature={init:function(){
  this.setHelpUrl(Blockly.Msg.MAX30105_HELPURL);
  this.setColour(Blockly.Blocks.max30105.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MAX30105_TITLE)
      .appendField(Blockly.Msg.MAX30105_TEMPERATURE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.MAX30105_TEMP_LIST),"TEMP_TYPE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MAX30105_TOOLTIP)}
};

Blockly.Blocks.max30105_set_beat_range={init:function(){
  this.setHelpUrl(Blockly.Msg.MAX30105_HELPURL);
  this.setColour(Blockly.Blocks.max30105.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MAX30105_TITLE)
      .appendField(Blockly.Msg.MAX30105_BEAT_RANGE);
  this.appendValueInput("MIN")
      .setCheck("Number");
  this.appendValueInput("MAX")
      .setCheck("Number")
      .appendField("~");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MAX30105_TOOLTIP)}
};

Blockly.Blocks.max30105_set_spo2_clear={init:function(){
  this.setHelpUrl(Blockly.Msg.MAX30105_HELPURL);
  this.setColour(Blockly.Blocks.max30105.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MAX30105_TITLE)
      .appendField(Blockly.Msg.MAX30105_SPO2_CLEAR)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MAX30105_TOOLTIP)}
};

//SPIFFS
Blockly.Blocks.spiffs={};
Blockly.Blocks.spiffs.HUE=90;
Blockly.Blocks.spiffs.HUE_FILE=288;
Blockly.Blocks.spiffs.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.spiffs_init={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE)
      .appendField(Blockly.Msg.SPIFFS_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_exists={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE)
      .appendField(Blockly.Msg.SPIFFS_EXISTS);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_format={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE)
      .appendField(Blockly.Msg.SPIFFS_FORMAT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_file_init={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_VARIABLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_file_open={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendValueInput("FILE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_OPEN);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_FILE_OPEN_MODE_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.SPIFFS_FILE_OPEN_MODE),"MODE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_file_exists={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_FILE_EXISTS);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_file_println={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.SD_FILE_PRINT_MODE),"MODE");
  this.appendValueInput("CONTENT")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_PRINT_CONTENT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_file_available={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_FILE_AVAILABLE);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_file_readuntil_char={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendValueInput("CHAR")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_READ_UNTIL_CHAR);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_file_read_line={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_FILE_READ_LINE);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_file_close={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE_FILE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE);
  this.appendValueInput("VARIABLE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SD_FILE_VARIABLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SD_FILE_CLOSE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_file_delete={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE);
  this.appendValueInput("F_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SPIFFS_FILE_DELETE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

Blockly.Blocks.spiffs_file_download={init:function(){
  this.setHelpUrl(Blockly.Msg.SPIFFS_HELPURL);
  this.setColour(Blockly.Blocks.spiffs.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.SPIFFS_TITLE);
  this.appendValueInput("URL")
      .setCheck("String")
      .appendField(Blockly.Msg.SPIFFS_FILE_DOWNLOAD);
  this.appendValueInput("F_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SPIFFS_FILE_SAVE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.SPIFFS_TOOLTIP)}
};

//ASR
Blockly.Blocks.asr={};
Blockly.Blocks.asr.HUE=97;
Blockly.Blocks.asr.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.asr_check={init:function(){
  this.setHelpUrl(Blockly.Msg.ASR_HELPURL);
  this.setColour(Blockly.Blocks.asr.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ASR_TITLE)
      .appendField(Blockly.Msg.ASR_CHECK);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ASR_TOOLTIP)}
};

Blockly.Blocks.asr_learn={init:function(){
  this.setHelpUrl(Blockly.Msg.ASR_HELPURL);
  this.setColour(Blockly.Blocks.asr.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ASR_TITLE)
      .appendField(Blockly.Msg.ASR_LEARN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ASR_TOOLTIP)}
};

Blockly.Blocks.asr_clear={init:function(){
  this.setHelpUrl(Blockly.Msg.ASR_HELPURL);
  this.setColour(Blockly.Blocks.asr.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ASR_TITLE)
      .appendField(Blockly.Msg.ASR_CLEAR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ASR_TOOLTIP)}
};

Blockly.Blocks.asr_check_result={init:function(){
  this.setHelpUrl(Blockly.Msg.ASR_HELPURL);
  this.setColour(Blockly.Blocks.asr.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ASR_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.ASR_SPEECH_LIST),"RESULT")
      .appendField(Blockly.Msg.ASR_WHEN_CHECKED);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.ASR_TOOLTIP)}
};

//CCS811
Blockly.Blocks.ccs811={};
Blockly.Blocks.ccs811.HUE=236;
Blockly.Blocks.ccs811.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.ccs811_init={init:function(){
  this.setHelpUrl(Blockly.Msg.CCS811_HELPURL);
  this.setColour(Blockly.Blocks.ccs811.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CCS811_TITLE)
      .appendField(Blockly.Msg.CCS811_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.CCS811_TOOLTIP)}
};

Blockly.Blocks.ccs811_freq={init:function(){
  this.setHelpUrl(Blockly.Msg.CCS811_HELPURL);
  this.setColour(Blockly.Blocks.ccs811.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CCS811_TITLE)
      .appendField(Blockly.Msg.CCS811_FREQ)
      .appendField(new Blockly.FieldDropdown([["1","1"],["10","2"],["60","3"],["0.25","4"]]),"FREQ")
      .appendField(Blockly.Msg.CCS811_FREQ_UNIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.CCS811_TOOLTIP)}
};

Blockly.Blocks.ccs811_update={init:function(){
  this.setHelpUrl(Blockly.Msg.CCS811_HELPURL);
  this.setColour(Blockly.Blocks.ccs811.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CCS811_TITLE)
      .appendField(Blockly.Msg.CCS811_UPDATE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.CCS811_TOOLTIP)}
};

Blockly.Blocks.ccs811_check={init:function(){
  this.setHelpUrl(Blockly.Msg.CCS811_HELPURL);
  this.setColour(Blockly.Blocks.ccs811.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CCS811_TITLE)
      .appendField(Blockly.Msg.CCS811_CHECK);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.CCS811_TOOLTIP)}
};

Blockly.Blocks.ccs811_getData={init:function(){
  this.setHelpUrl(Blockly.Msg.CCS811_HELPURL);
  this.setColour(Blockly.Blocks.ccs811.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CCS811_TITLE)
      .appendField(Blockly.Msg.CCS811_GET_DATA)
      .appendField(new Blockly.FieldDropdown([["eCO2(PPM)","CO2"],["TVOC(PPB)","TVOC"]]),"DATA_TYPE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.CCS811_TOOLTIP)}
};

//PN532_I2C
Blockly.Blocks.pn532i2c={};
Blockly.Blocks.pn532i2c.HUE=270;
Blockly.Blocks.pn532i2c.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.pn532i2c_init={init:function(){
  this.setHelpUrl(Blockly.Msg.PN532I2C_HELPURL);
  this.setColour(Blockly.Blocks.pn532i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_TITLE)
      .appendField(Blockly.Msg.PN532I2C_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.PN532I2C_TOOLTIP)}
};

Blockly.Blocks.pn532i2c_loop={init:function(){
  this.setHelpUrl(Blockly.Msg.PN532I2C_HELPURL);
  this.setColour(Blockly.Blocks.pn532i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_TITLE)
      .appendField(Blockly.Msg.PN532I2C_LOOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.PN532I2C_TOOLTIP)}
};


Blockly.Blocks.pn532i2c_checkUID={init:function(){
  this.setHelpUrl(Blockly.Msg.PN532I2C_HELPURL);
  this.setColour(Blockly.Blocks.pn532i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_TITLE)
      .appendField(Blockly.Msg.PN532I2C_CHECK_UID);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.PN532I2C_TOOLTIP)}
};


Blockly.Blocks.pn532i2c_getUID={init:function(){
  this.setHelpUrl(Blockly.Msg.PN532I2C_HELPURL);
  this.setColour(Blockly.Blocks.pn532i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_TITLE)
      .appendField(Blockly.Msg.PN532I2C_UID);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.PN532I2C_TOOLTIP)}
};

Blockly.Blocks.pn532i2c_getType={init:function(){
  this.setHelpUrl(Blockly.Msg.PN532I2C_HELPURL);
  this.setColour(Blockly.Blocks.pn532i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_TITLE)
      .appendField(Blockly.Msg.PN532I2C_TYPE);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.PN532I2C_TOOLTIP)}
};

Blockly.Blocks.pn532i2c_writeBlock={init:function(){
  this.setHelpUrl(Blockly.Msg.PN532I2C_HELPURL);
  this.setColour(Blockly.Blocks.pn532i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_TITLE+"("+Blockly.Msg.PN532I2C_CLASSIC+")");
  this.appendValueInput("MY_DATA")
      .setCheck("String")
      .appendField(Blockly.Msg.PN532I2C_WRITE_BLOCK);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_ON)
      .appendField(Blockly.Msg.PN532I2C_SECTOR);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"]]),"SECTOR");
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_BLOCK);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["0","0"],["1","1"],["2","2"]]),"BLOCK");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.PN532I2C_TOOLTIP)}
};
Blockly.Blocks.pn532i2c_writeSector={init:function(){
  this.setHelpUrl(Blockly.Msg.PN532I2C_HELPURL);
  this.setColour(Blockly.Blocks.pn532i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_TITLE+"("+Blockly.Msg.PN532I2C_CLASSIC+")");
  this.appendValueInput("MY_DATA")
      .setCheck("String")
      .appendField(Blockly.Msg.PN532I2C_WRITE_SECTOR);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_ON)
      .appendField(Blockly.Msg.PN532I2C_SECTOR);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"]]),"SECTOR");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.PN532I2C_TOOLTIP)}
};

Blockly.Blocks.pn532i2c_readBlock={init:function(){
  this.setHelpUrl(Blockly.Msg.PN532I2C_HELPURL);
  this.setColour(Blockly.Blocks.pn532i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_TITLE+"("+Blockly.Msg.PN532I2C_CLASSIC+")")
      .appendField(Blockly.Msg.PN532I2C_READ_BLOCK);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_FROM)
      .appendField(Blockly.Msg.PN532I2C_SECTOR);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"]]),"SECTOR");
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_BLOCK);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["0","0"],["1","1"],["2","2"]]),"BLOCK");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.PN532I2C_TOOLTIP)}
};

Blockly.Blocks.pn532i2c_readSector={init:function(){
  this.setHelpUrl(Blockly.Msg.PN532I2C_HELPURL);
  this.setColour(Blockly.Blocks.pn532i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_TITLE+"("+Blockly.Msg.PN532I2C_CLASSIC+")")
      .appendField(Blockly.Msg.PN532I2C_READ_SECTOR);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_FROM)
      .appendField(Blockly.Msg.PN532I2C_SECTOR);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"]]),"SECTOR");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.PN532I2C_TOOLTIP)}
};

Blockly.Blocks.pn532i2c_writePage={init:function(){
  this.setHelpUrl(Blockly.Msg.PN532I2C_HELPURL);
  this.setColour(Blockly.Blocks.pn532i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_TITLE+"("+Blockly.Msg.PN532I2C_ULTRALIGHT+")");
  this.appendValueInput("MY_DATA")
      .setCheck("String")
      .appendField(Blockly.Msg.PN532I2C_WRITE_BLOCK);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_ON)
      .appendField(Blockly.Msg.PN532I2C_PAGE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.PN532I2C_PAGE_List),"PAGE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.PN532I2C_TOOLTIP)}
};

Blockly.Blocks.pn532i2c_readPage={init:function(){
  this.setHelpUrl(Blockly.Msg.PN532I2C_HELPURL);
  this.setColour(Blockly.Blocks.pn532i2c.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_TITLE+"("+Blockly.Msg.PN532I2C_ULTRALIGHT+")")
      .appendField(Blockly.Msg.PN532I2C_READ_BLOCK);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PN532I2C_FROM)
      .appendField(Blockly.Msg.PN532I2C_PAGE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.PN532I2C_PAGE_List),"PAGE");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.PN532I2C_TOOLTIP)}
};


//PINMAP
Blockly.Blocks.pimMap={};
Blockly.Blocks.pimMap.HUE=120;
Blockly.Blocks.pinMap_7697ext={init:function(){
  this.setHelpUrl("123");
  this.setColour(Blockly.Blocks.pimMap.HUE);
  this.appendDummyInput()
      .appendField("7697_EXT")
      .appendField("Pin");
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.EXT_7697_PIN_MAP),"PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip("123")}
};

//I2S MIC
Blockly.Blocks.i2s_mic={};
Blockly.Blocks.i2s_mic.HUE=180;
Blockly.Blocks.i2sMic_init={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_INIT);
  this.appendValueInput("SCK_PIN")
      .setCheck("Number")
      .appendField("SCK "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("WS_PIN")
      .setCheck("Number")
      .appendField("WS "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("SD_PIN")
      .setCheck("Number")
      .appendField("SD "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_TOOLTIP)}
};

Blockly.Blocks.PocketCard_i2sMic_init={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_POCKETCARD_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_TOOLTIP)}
};

Blockly.Blocks.i2sMic_start={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_START);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_TOOLTIP)}
};

Blockly.Blocks.i2sMic_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_TOOLTIP)}
};

Blockly.Blocks.i2sMic_record={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_SAVE_TO)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.DAC_FILE_SOURCE),"F_TARGET");
  this.appendValueInput("FILENAME")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_FILE_NAME);
  this.appendValueInput("REC_TIME")
      .setCheck("Number")
      .appendField(Blockly.Msg.I2S_MIC_REC_TIME);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_TOOLTIP)}
};

Blockly.Blocks.i2sMic_STT={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_UPLOAD_FROM)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.DAC_FILE_SOURCE),"F_TARGET")
      .appendField(Blockly.Msg.I2S_MIC_STT);
  this.appendValueInput("FILENAME")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_FILE_NAME);
  this.appendValueInput("L_CODE")
      .appendField(Blockly.Msg.DAC_TTS_LANGUAGE);
  this.appendValueInput("KEY")
      .setCheck("String")
      .appendField(Blockly.Msg.I2S_MIC_KEY);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_TOOLTIP)}
};

Blockly.Blocks.i2sMic_STT_Azure={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_UPLOAD_FROM)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.DAC_FILE_SOURCE),"F_TARGET")
      .appendField(Blockly.Msg.I2S_MIC_STT_AZURE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.I2S_MIC_PUNCTUATION),"PUNCTUATION");
  this.appendValueInput("FILENAME")
      .setCheck("String")
      .appendField(Blockly.Msg.DAC_FILE_NAME);
  this.appendValueInput("L_CODE")
      .appendField(Blockly.Msg.DAC_TTS_LANGUAGE);
  this.appendValueInput("KEY")
      .setCheck("String")
      .appendField(Blockly.Msg.I2S_MIC_KEY);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_TOOLTIP)}
};

Blockly.Blocks.i2sMic_STT_Azure_direct={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_DIRECT_UPLOAD);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.I2S_MIC_PUNCTUATION),"PUNCTUATION");
  this.appendValueInput("REC_TIME")
      .setCheck("Number")
      .appendField(Blockly.Msg.I2S_MIC_REC_TIME);
  this.appendValueInput("L_CODE")
      .appendField(Blockly.Msg.DAC_TTS_LANGUAGE);
  this.appendValueInput("KEY")
      .setCheck("String")
      .appendField(Blockly.Msg.I2S_MIC_KEY);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_TOOLTIP)}
};

Blockly.Blocks.i2sMic_STT_result={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_STT_RESULT);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.I2S_MIC_TOOLTIP)}
};

//I2S DB Meter
Blockly.Blocks.i2s_mic_db={};
Blockly.Blocks.i2s_mic_db.HUE=53;
Blockly.Blocks.i2sMic_db_init={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_DB_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic_db.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_DB_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_INIT);
  this.appendValueInput("SCK_PIN")
      .setCheck("Number")
      .appendField("SCK "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("WS_PIN")
      .setCheck("Number")
      .appendField("WS "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("SD_PIN")
      .setCheck("Number")
      .appendField("SD "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_DB_MODEL)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.I2S_MIC_DB_MODEL_LIST),"MODEL");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_DB_TOOLTIP)}
};

Blockly.Blocks.i2sMic_pocket_db_init={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_DB_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic_db.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_DB_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_POCKETCARD_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_DB_TOOLTIP)}
};

Blockly.Blocks.i2sMic_db_start={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_DB_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic_db.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_DB_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_DB_START);
  this.appendValueInput("PERIOD")
      .setCheck("Number")
      .appendField(Blockly.Msg.I2S_MIC_DB_PERIOD);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CORE_INDEX)
      .appendField(new Blockly.FieldDropdown([["0","0"],["1","1"]]),"CORE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_DB_TOOLTIP)}
};

Blockly.Blocks.i2sMic_db_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_DB_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic_db.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_DB_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_DB_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.I2S_MIC_DB_TOOLTIP)}
};

Blockly.Blocks.i2sMic_db_is_measuring={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_DB_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic_db.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_DB_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_DB_MEASURING);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.I2S_MIC_DB_TOOLTIP)}
};

Blockly.Blocks.i2sMic_db_value={init:function(){
  this.setHelpUrl(Blockly.Msg.I2S_MIC_DB_HELPURL);
  this.setColour(Blockly.Blocks.i2s_mic_db.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.I2S_MIC_DB_TITLE)
      .appendField(Blockly.Msg.I2S_MIC_DB_VALUE);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.I2S_MIC_DB_TOOLTIP)}
};

//Keyboard
Blockly.Blocks.keyboards={};
Blockly.Blocks.keyboards.HUE=285;
Blockly.Blocks.keyboards_0_init={init:function(){
  this.setHelpUrl(Blockly.Msg.KEYBOARDS_HELPURL);
  this.setColour(Blockly.Blocks.keyboards.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.KEYBOARDS_TITLE+'(3X4)')
      .appendField(Blockly.Msg.KEYBOARDS_INIT);
  this.appendValueInput("PIN_0")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"1");
  this.appendValueInput("PIN_1")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"2");
  this.appendValueInput("PIN_2")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"3");
  this.appendValueInput("PIN_3")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"4");
  this.appendValueInput("PIN_4")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"5");
  this.appendValueInput("PIN_5")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"6");
  this.appendValueInput("PIN_6")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"7");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KEYBOARDS_TOOLTIP)}
};

Blockly.Blocks.keyboards_1_init={init:function(){
  this.setHelpUrl(Blockly.Msg.KEYBOARDS_HELPURL);
  this.setColour(Blockly.Blocks.keyboards.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.KEYBOARDS_TITLE+'(4X4)')
      .appendField(Blockly.Msg.KEYBOARDS_INIT);
  this.appendValueInput("PIN_0")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"1");
  this.appendValueInput("PIN_1")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"2");
  this.appendValueInput("PIN_2")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"3");
  this.appendValueInput("PIN_3")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"4");
  this.appendValueInput("PIN_4")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"5");
  this.appendValueInput("PIN_5")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"6");
  this.appendValueInput("PIN_6")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"7");
  this.appendValueInput("PIN_7")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN+"8");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KEYBOARDS_TOOLTIP)}
};

Blockly.Blocks.keyboards_check={init:function(){
  this.setHelpUrl(Blockly.Msg.KEYBOARDS_HELPURL);
  this.setColour(Blockly.Blocks.keyboards.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.KEYBOARDS_TITLE)
      .appendField(Blockly.Msg.KEYBOARDS_CHECK);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KEYBOARDS_TOOLTIP)}
};

Blockly.Blocks.keyboards_event={init:function(){
  this.setHelpUrl(Blockly.Msg.KEYBOARDS_HELPURL);
  this.setColour(Blockly.Blocks.keyboards.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.KEYBOARDS_TITLE)
      .appendField(Blockly.Msg.KEYBOARDS_EVENT);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.KEYBOARDS_EVENT_LIST),"EVENT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.appendStatementInput("KEYBOARD_EVENT");
  this.setTooltip(Blockly.Msg.KEYBOARDS_TOOLTIP)}
};

Blockly.Blocks.keyboards_value={init:function(){
  this.setHelpUrl(Blockly.Msg.KEYBOARDS_HELPURL);
  this.setColour(Blockly.Blocks.keyboards.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.KEYBOARDS_TITLE)
      .appendField(Blockly.Msg.KEYBOARDS_VALUE);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.KEYBOARDS_TOOLTIP)}
};

//MPU6050
/*
Blockly.Blocks.ljj_mpu6050={};
Blockly.Blocks.ljj_mpu6050.HUE=120;
Blockly.Blocks.ljj_mpu6050.HUE1=320;
Blockly.Blocks.ljj_mpu6050.HUE2=200;

Blockly.Blocks.ljj_mpu6050_accel_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MPU6050_HELPURL);
  this.setColour(Blockly.Blocks.ljj_mpu6050.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MPU6050_TITLE+" "+Blockly.Msg.MPU9250_ACCEL_BEGIN)
      .appendField(new Blockly.FieldDropdown([["16G","MPU6050_RANGE_16G"],["8G","MPU6050_RANGE_8G"],["4G","MPU6050_RANGE_4G"],["2G","MPU6050_RANGE_2G"]]),"ACCEL_MODE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_MPU6050_TOOLTIP)}
};

Blockly.Blocks.ljj_mpu6050_accel_fetch={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MPU6050_HELPURL);
  this.setColour(Blockly.Blocks.ljj_mpu6050.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MPU6050_TITLE+" "+Blockly.Msg.MPU9250_ACCEL_FETCH)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_MPU6050_TOOLTIP)}
};

Blockly.Blocks.ljj_mpu6050_accel_3axis={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MPU6050_HELPURL);
  this.setColour(Blockly.Blocks.ljj_mpu6050.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MPU6050_TITLE+" "+Blockly.Msg.MPU9250_ACCEL_3AXIS)
      .appendField(new Blockly.FieldDropdown([["X","normAccel.XAxis"],["Y","normAccel.YAxis"],["Z","normAccel.ZAxis"]]),"3AXIS_MODE")
      .appendField(Blockly.Msg.MPU925_3AXIS_POST_FIX);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_MPU6050_TOOLTIP)}};

Blockly.Blocks.ljj_mpu6050_gyro_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MPU6050_HELPURL);
  this.setColour(Blockly.Blocks.ljj_mpu6050.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MPU6050_TITLE+" "+Blockly.Msg.MPU9250_GYRO_BEGIN)
      .appendField(new Blockly.FieldDropdown([["2000DPS","MPU6050_SCALE_2000DPS"],["1000DPS","MPU6050_SCALE_1000DPS"],["500DPS","MPU6050_SCALE_500DPS"],["250DPS","MPU6050_SCALE_250DPS"]]),"GYRO_MODE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_MPU6050_TOOLTIP)}
};

Blockly.Blocks.ljj_mpu6050_gyro_fetch={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MPU6050_HELPURL);
  this.setColour(Blockly.Blocks.ljj_mpu6050.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MPU6050_TITLE+" "+Blockly.Msg.MPU9250_GYRO_FETCH)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_MPU6050_TOOLTIP)}
};

Blockly.Blocks.ljj_mpu6050_gyro_3axis={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MPU6050_HELPURL);
  this.setColour(Blockly.Blocks.ljj_mpu6050.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MPU6050_TITLE+" "+Blockly.Msg.MPU9250_GYRO_3AXIS)
      .appendField(new Blockly.FieldDropdown([["X","normGyro.XAxis"],["Y","normGyro.YAxis"],["Z","normGyro.ZAxis"]]),"3AXIS_MODE")
      .appendField(Blockly.Msg.MPU925_3AXIS_POST_FIX+" "+Blockly.Msg.MPU925_3AXIS_POST_FIX_UNIT);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_MPU6050_TOOLTIP)}
};

Blockly.Blocks.ljj_mpu6050_temperature={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MPU6050_HELPURL);
  this.setColour(Blockly.Blocks.ljj_mpu6050.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MPU6050_TITLE+" "+Blockly.Msg.POCKETCARD_TEMPERATURE_SENSOR);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_MPU6050_TOOLTIP)}
};
*/

//camera
Blockly.Blocks.ljj_camera={};
Blockly.Blocks.ljj_camera.HUE=270;

Blockly.Blocks.ljj_camera_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_CAMERA_HELPURL);
  this.setColour(Blockly.Blocks.ljj_camera.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_TITLE)
      .appendField(Blockly.Msg.LJJ_CAMERA_INIT)
      .appendField(Blockly.Msg.LJJ_CAMERA_TYPE)
      .appendField(new Blockly.FieldDropdown([["KSB065","KSB065"],["PocketCard","POCKETCARD"],["PixelBit","PIXELBIT"],["ESP32-CAM","ESP32-CAM"]]),"CAM_TYPE");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_RESOLUTION)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_CAMERA_RES_TYPE),"RES_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_CAMERA_TOOLTIP)}
}

Blockly.Blocks.ljj_camera_rotation={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_CAMERA_HELPURL);
  this.setColour(Blockly.Blocks.ljj_camera.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_TITLE)
      .appendField(Blockly.Msg.LJJ_CAMERA_ROTATION)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_CAMERA_ROTATION_LIST),"ROTATION_TYPE")
      .appendField(new Blockly.FieldDropdown([["Enable","1"],["Disable","0"]]),"VALUE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_CAMERA_TOOLTIP)}
}

Blockly.Blocks.ljj_camera_resolution={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_CAMERA_HELPURL);
  this.setColour(Blockly.Blocks.ljj_camera.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_TITLE)
      .appendField(Blockly.Msg.LJJ_CAMERA_RESET_RESOLUTION)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_CAMERA_RES_TYPE),"RES_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_CAMERA_TOOLTIP)}
}

Blockly.Blocks.ljj_camera_image={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_CAMERA_HELPURL);
  this.setColour(Blockly.Blocks.ljj_camera.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_SET)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_CAMERA_SET_IMAGE_LIST),"TYPE");
  this.appendValueInput("VALUE")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_CAMERA_VALUE_HINT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_CAMERA_TOOLTIP)}
}

Blockly.Blocks.ljj_camera_effect1={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_CAMERA_HELPURL);
  this.setColour(Blockly.Blocks.ljj_camera.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_TITLE)
      .appendField(Blockly.Msg.LJJ_CAMERA_EFFECT)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_CAMERA_EFFECT_TYPE),"EFFECT_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_CAMERA_TOOLTIP)}
}

Blockly.Blocks.ljj_camera_effect2={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_CAMERA_HELPURL);
  this.setColour(Blockly.Blocks.ljj_camera.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_TITLE)
      .appendField(Blockly.Msg.LJJ_CAMERA_EFFECT)
  this.appendValueInput("VALUE")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_CAMERA_EFFECT_VALUE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_CAMERA_TOOLTIP)}
}

Blockly.Blocks.ljj_camera_fb_get={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_CAMERA_HELPURL);
  this.setColour(Blockly.Blocks.ljj_camera.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_TITLE)
      .appendField(Blockly.Msg.LJJ_CAMERA_GET);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_CAMERA_TOOLTIP)}
}

Blockly.Blocks.ljj_camera_fb_free={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_CAMERA_HELPURL);
  this.setColour(Blockly.Blocks.ljj_camera.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_TITLE)
      .appendField(Blockly.Msg.LJJ_CAMERA_FB_FREE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_CAMERA_TOOLTIP)}
}

Blockly.Blocks.ljj_camera_fb_save={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_CAMERA_HELPURL);
  this.setColour(Blockly.Blocks.ljj_camera.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_SAVE_TO)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.DAC_FILE_SOURCE),"F_SOURCE");
  this.appendValueInput("FILE_NAME")
      .setCheck("String")
      .appendField(Blockly.Msg.SPIFFS_FILE_SAVE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_CAMERA_TOOLTIP)}
}

Blockly.Blocks.ljj_camera_fb_detected_face={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_CAMERA_HELPURL);
  this.setColour(Blockly.Blocks.ljj_camera.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_TITLE)
      .appendField(Blockly.Msg.LJJ_CAMERA_FACE_DETECTED);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LJJ_CAMERA_TOOLTIP)}
}

//KSB069
Blockly.Blocks.ljj_ksb069={};
Blockly.Blocks.ljj_ksb069.HUE=340;

Blockly.Blocks.ljj_ksb069_motor_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_KSB069_HELPURL);
  this.setColour(Blockly.Blocks.ljj_ksb069.HUE);
  this.appendDummyInput()
      .appendField("KSB069"+Blockly.Msg.L9110_MOTOR)
      .appendField(Blockly.Msg.L9110_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_KSB069_TOOLTIP)}
};

Blockly.Blocks.ljj_ksb069_motor_run={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_KSB069_HELPURL);
  this.setColour(Blockly.Blocks.ljj_ksb069.HUE);
  this.appendDummyInput()
      .appendField("KSB069"+Blockly.Msg.L9110_MOTOR);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_MOTOR)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.CAGEBOT_MOTOR_LIST),"MOTOR");
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_ROTATE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.L9110_DIRECTION),"DIR");
  this.appendValueInput("SPEED")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_KSB069_TOOLTIP)}
};

Blockly.Blocks.ljj_ksb069_motor_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_KSB069_HELPURL);
  this.setColour(Blockly.Blocks.ljj_ksb069.HUE);
  this.appendDummyInput()
      .appendField("KSB069"+Blockly.Msg.L9110_MOTOR);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_MOTOR)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.CAGEBOT_MOTOR_LIST),"MOTOR");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_KSB069_TOOLTIP)}
};

Blockly.Blocks.ljj_ksb069_cam_pins_clear={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_KSB069_HELPURL);
  this.setColour(Blockly.Blocks.ljj_camera.HUE);
  this.appendDummyInput()
      .appendField("KSB069")
      .appendField(Blockly.Msg.KSB065_CAMERA_PINS_CLEAR);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_ROTATION)
      .appendField(Blockly.Msg.LJJ_CAMERA_ROTATION_LIST[0][0])
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"VFLIP_VALUE");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_CAMERA_ROTATION_LIST[1][0])
      .appendField(new Blockly.FieldDropdown([["Yes","1"],["No","0"]]),"HMIRROR_VALUE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_KSB069_TOOLTIP)}
};

//Basic
Blockly.Blocks.ljj_basic={};
Blockly.Blocks.ljj_basic.HUE=340;
Blockly.Blocks.ljj_basic.HUE1=30;
Blockly.Blocks.ljj_basic.HUE2=236;
Blockly.Blocks.ljj_basic.HUE3=97;
Blockly.Blocks.ljj_basic.HUE4=157;
Blockly.Blocks.ljj_basic.HUE5=290;
Blockly.Blocks.ljj_basic.HUE6=60;
Blockly.Blocks.ljj_basic.HUE7=320;
Blockly.Blocks.ljj_basic_button={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+Blockly.Msg.LIOU_ROBOT_BUTTON+" "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("PIN")
      .setCheck("Number");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BASIC_BUTTON_EVENT+" "+Blockly.Msg.KEYBOARDS_EVENT_LIST[0][0])
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_BASIC_PIN_MODE),"PIN_MODE");
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_BUTTON_CALL_PRESSED");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BASIC_BUTTON_EVENT+" "+Blockly.Msg.KEYBOARDS_EVENT_LIST[1][0]);
  this.appendStatementInput("MSG_BUTTON_CALL_RELEASED");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_basic_led={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE2);
  this.appendDummyInput()
      .appendField("LED "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("PIN")
      .setCheck("Number");
  this.appendValueInput("ON_OFF")
      .setCheck("Boolean");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_basic_led_analog={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE2);
  this.appendDummyInput()
      .appendField("LED "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("PIN")
      .setCheck("Number");
  this.appendValueInput("NUM")
      .setCheck("Number")
      .appendField(Blockly.Msg.ESP32_ANALOG_WRITE_TITLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_basic_rgb_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE2);
  this.appendDummyInput()
      .appendField("RGB LED "+Blockly.Msg.LIOU_ROBOT_PIN)
      .appendField(Blockly.Msg.TTGO_TFT_INIT);
  this.appendValueInput("PIN_RED")
      .setCheck("Number")
      .appendField(Blockly.Msg.EZ_LED_RED);
  this.appendValueInput("PIN_GREEN")
      .setCheck("Number")
      .appendField(Blockly.Msg.EZ_LED_GREEN);
  this.appendValueInput("PIN_BLUE")
      .setCheck("Number")
      .appendField(Blockly.Msg.EZ_LED_BLUE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_basic_rgb_led={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE2);
  this.appendDummyInput()
      .appendField("RGB LED")
      .appendField(Blockly.Msg.EZ_LED)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.EZ_LED_RED,"rgbRedPin"],[Blockly.Msg.EZ_LED_GREEN,"rgbGreenPin"],[Blockly.Msg.EZ_LED_BLUE,"rgbBluePin"]]),"PIN");
  this.appendValueInput("ON_OFF")
      .setCheck("Boolean");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_basic_rgb_analog={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE2);
  this.appendDummyInput()
      .appendField("RGB LED")
      .appendField(Blockly.Msg.EZ_LED)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.EZ_LED_RED,"rgbRedPin"],[Blockly.Msg.EZ_LED_GREEN,"rgbGreenPin"],[Blockly.Msg.EZ_LED_BLUE,"rgbBluePin"]]),"PIN");
  this.appendValueInput("NUM")
      .setCheck("Number")
      .appendField(Blockly.Msg.ESP32_ANALOG_WRITE_TITLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_basic_rgb={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE2);
  this.appendDummyInput()
      .appendField("RGB LED")
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.LJJ_QUNO_RGB_COLOR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};


Blockly.Blocks.ljj_basic_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.EZ_TONE)
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("PIN")
      .setCheck("Number"); 
  this.appendDummyInput()      
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TONE_LIST),"FREQ");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_basic_no_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.EZ_TONE)
      .appendField(Blockly.Msg.EZ_noTONE);
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_basic_custom_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.EZ_TONE);
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("FREQ")
      .setCheck("Number")
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ);
  this.appendValueInput("DURATION")
      .setCheck("Number")
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_DURATION);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_basic_sonar_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BASIC_SONAR)
      .appendField(Blockly.Msg.LJJ_SERIAL_INIT)
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("sonar"), "varName");
  this.appendValueInput("TRIG_PIN")
      .setCheck("Number")
      .appendField("Trig "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("ECHO_PIN")
      .setCheck("Number")
      .appendField("Echo "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_basic_sonar={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BASIC_SONAR)
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("sonar"), "varName")
      .appendField(Blockly.Msg.LJJ_BASIC_SONAR_DISTANCE);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_basic_dht11={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BASIC_HELPURL);
  this.setColour(Blockly.Blocks.ljj_basic.HUE7);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BASIC_DHT11)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_BASIC_DHT11_MODE),"DHT11_TYPE");
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_ws2812_neopixel_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName")
      .appendField(Blockly.Msg.LJJ_MAX7219_INIT);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WS2812_PIXEL_FORMAT)
      .appendField(new Blockly.FieldDropdown([["GRB","GRB"],["RGB","RGB"]]),"PIXEL_FORMAT");
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("TOTAL")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_BASIC_LEDS_TOTAL);
  this.appendValueInput("BRIGHTNESS")
      .setCheck("Number")
      .appendField(Blockly.Msg.POCKETCARD_PIXELS_BRIGHTNESS+'(0~255)');
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_ws2812_neopixel_set_color={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName");
  this.appendValueInput("INDEX")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_BASIC_LEDS_PIXEL_INDEX);
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.NEOPIXEL_CUSTOM_SETPIXELCOLOR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_ws2812_neopixel_show={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName")
      .appendField(Blockly.Msg.NEOPIXEL_SHOW);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_ws2812_neopixel_set_colors={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName")
      .appendField(Blockly.Msg.LJJ_BASIC_LEDS_SET_ALL_COLORS);
  this.appendValueInput("COLOR")
      .setCheck("String");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_ws2812_neopixel_current_color={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName");
  this.appendValueInput("INDEX")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_BASIC_LEDS_PIXEL_INDEX);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WS2812_CURRENT_COLOR);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_ws2812_color_flow={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WS2812_FLOW)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_WS2812_FLOW_LIST),"DIRECTION");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_ws2812_color_next={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName");
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.LJJ_WS2812_COLOR_NEXT);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WS2812_DIRECTION)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_WS2812_FLOW_LIST),"DIRECTION");
  this.appendValueInput("INTERVAL")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_WS2812_TIME_INTERVAL);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_ws2812_2_colors_blink={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName");
  this.appendValueInput("COLOR1")
      .setCheck("String")
      .appendField(Blockly.Msg.LJJ_WS2812_COLOR_BLINK)
      .appendField(Blockly.Msg.PROBBIE_COLOR+"1");
  this.appendValueInput("COLOR2")
      .setCheck("String")
      .appendField(Blockly.Msg.PROBBIE_COLOR+"2");
  this.appendValueInput("INTERVAL")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_WS2812_TIME_INTERVAL);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_ws2812_breathe={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName");
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.LJJ_WS2812_BREATHE)
      .appendField(Blockly.Msg.PROBBIE_COLOR);
  this.appendValueInput("INTERVAL")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_WS2812_TIME_INTERVAL);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};


Blockly.Blocks.ljj_ws2812_neopixel_brightness={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName");
  this.appendValueInput("BRIGHTNESS")
      .setCheck("Number")
      .appendField(Blockly.Msg.POCKETCARD_PIXELS_BRIGHTNESS+'(0~255)');
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_ws2812_neopixel_clear={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName")
      .appendField(Blockly.Msg.LJJ_BASIC_LEDS_CLEAR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

Blockly.Blocks.ljj_ws2812_neopixel_display={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName")
      .appendField(Blockly.Msg.LJJ_BASIC_LEDS_DISPLAY);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_BASIC_TOOLTIP)}
};

if (Blockly.Blocks.lists_create_with) {
Blockly.Blocks.ljj_ws2812_color_join={
	init:function(){
    this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
    this.setColour(Blockly.Blocks.ljj_5012.HUE5);
		//this.setStyle("list_blocks");

    this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName")
      .appendField(Blockly.Msg.LJJ_WS2812_SET_COLORS);
		this.itemCount_=3;
		this.updateShape_();
    this.setPreviousStatement(!0,null);
    this.setNextStatement(!0,null);
		this.setMutator(new Blockly.Mutator(["lists_create_with_item"]));
		this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)
	}
	,mutationToDom:function(){
		var a=Blockly.utils.xml.createElement("mutation");
		a.setAttribute("items",this.itemCount_);
		return a
	}
	,domToMutation:function(a){
		this.itemCount_=parseInt(a.getAttribute("items"),10);
		this.updateShape_()
	}
	,decompose:function(a){
		var b=a.newBlock("lists_create_with_container");
		b.initSvg();
		for(var c=b.getInput("STACK").connection,d=0;d<this.itemCount_;d++){
			var e=a.newBlock("lists_create_with_item");
			e.initSvg();
			c.connect(e.previousConnection);
			c=e.nextConnection}
			return b
	}
	,compose:function(a){
		var b=a.getInputTargetBlock("STACK");
		for(a=[];b&&!b.isInsertionMarker();)
			a.push(b.valueConnection_),b=b.nextConnection&&b.nextConnection.targetBlock();
		for(b=0;b<this.itemCount_;b++){
			var c=this.getInput("ADD"+b).connection.targetConnection;
			c&&-1==a.indexOf(c)&&c.disconnect()
		}
		this.itemCount_=a.length;
		this.updateShape_();
		for(b=0;b<this.itemCount_;b++)
			Blockly.Mutator.reconnect(a[b],this,"ADD"+b)
	}
	,saveConnections:function(a){
		a=a.getInputTargetBlock("STACK");
		for(var b=0;a;){
			var c=this.getInput("ADD"+b);
			a.valueConnection_=c&&c.connection.targetConnection;
			b++;
			a=a.nextConnection&&a.nextConnection.targetBlock()
		}
	}
	,updateShape_:function(){
		this.itemCount_&&this.getInput("EMPTY")?this.removeInput("EMPTY"):this.itemCount_||this.getInput("EMPTY")||this.appendDummyInput("EMPTY").appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE,"TITLE");
		for(var a=0;a<this.itemCount_;a++)
			if(!this.getInput("ADD"+a)){
				var b=this.appendValueInput("ADD"+a).setAlign(Blockly.ALIGN_RIGHT);
				//0==a&&b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH,"TITLE")
        b.appendField("LED "+a)
			}
			for(;this.getInput("ADD"+a);)
				this.removeInput("ADD"+a),a++
	}
	,onchange: function(event) {
		if (!this.workspace) {
		  // Block is deleted.
		  return;
		}
		if (!event.recordUndo) {
		  // Events not generated by user. Skip handling.
		  return;
		}
		if (this.mutator.block_.parentBlock_) {
			if (this.mutator.block_.parentBlock_.type=="procedures_callnoreturn") {
				this.getField("TITLE").setValue(Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH_PROCEDURE_VALUE"]);
				this.getField("TITLE").isDirty_=true;
				return;
			}
			else if (this.mutator.block_.parentBlock_.type=="procedures_callreturn") {
				this.getField("TITLE").setValue(Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH_PROCEDURE_VALUE"]);
				this.getField("TITLE").isDirty_=true;
				return;
			}
			else if (this.mutator.block_.parentBlock_.type=="procedures_defnoreturn"||this.mutator.block_.parentBlock_.type=="procedures_defreturn") {	
				if (this.itemCount_) {
					for (var i=0;i<this.itemCount_;i++) {
						var targetBlock = this.getInputTargetBlock('ADD'+i);
						if (targetBlock) { 
							if (targetBlock.type!="variables_set2") {
								targetBlock.unplug();
							}
						}
					}
				}
				this.getField("TITLE").setValue(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH_PROCEDURE);
				this.getField("TITLE").isDirty_=true;
				//this.setInputsInline(!0);
				return;
			}	
		}
		if (this.itemCount_) {
			for (var i=0;i<this.itemCount_;i++) {
				var targetBlock = this.getInputTargetBlock('ADD'+i);
				if (targetBlock) { 
					if (targetBlock.type=="variables_set2") {
						this.getField("TITLE").setValue(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH_PROCEDURE);
						this.getField("TITLE").isDirty_=true;
						return;
					}
				}
			}				
			this.getField("TITLE").setValue(Blockly.Msg.PROBBIE_COLOR);
		}
		else
			this.getField("TITLE").setValue(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
		
		this.getField("TITLE").isDirty_=true;
		this.setInputsInline(0);
	} 
};
} else {
Blockly.Blocks.ljj_ws2812_color_join={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WS2812_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField("WS2812")
      .appendField(Blockly.Msg.LJJ_BASIC_VARIABLE_NAME)
      .appendField(new Blockly.FieldVariable("strip"), "varName")
      .appendField(Blockly.Msg.LJJ_WS2812_SET_COLORS);  
  this.itemCount_=2;
  this.updateShape_();
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setMutator(new Blockly.Mutator(["text_create_join_item"]));
  this.setTooltip(Blockly.Msg.GOOGLESHEETS_TOOLTIP)
},mutationToDom:function(){
  var a=document.createElement("mutation");
  a.setAttribute("items",this.itemCount_);
  return a
},domToMutation:function(a){
  this.itemCount_=parseInt(a.getAttribute("items"),10);
  this.updateShape_()
},decompose:function(a){
  var b=Blockly.Block.obtain(a,"text_create_join_container");
  b.initSvg();
  for(var d=b.getInput("STACK").connection,c=0;c<this.itemCount_;c++){
    var e=Blockly.Block.obtain(a,"text_create_join_item");
    e.initSvg();
    d.connect(e.previousConnection);
    d=e.nextConnection
  }
  return b
},compose:function(a){
  a=a.getInputTargetBlock("STACK");
  for(var b=[],d=0;a;)
    b[d]=a.valueConnection_,
    a=a.nextConnection&&a.nextConnection.targetBlock(),
    d++;
  this.itemCount_=d;
  this.updateShape_();
  for(d=0;d<this.itemCount_;d++)
    b[d]&&this.getInput("ADD"+d).connection.connect(b[d])
},saveConnections:function(a){
  a=a.getInputTargetBlock("STACK");
  for(var b=0;a;){
    var d=this.getInput("ADD"+b);
    a.valueConnection_=d&&d.connection.targetConnection;
    b++;
    a=a.nextConnection&&a.nextConnection.targetBlock()
  }
},updateShape_:function(){
  if(this.getInput("EMPTY"))
    this.removeInput("EMPTY");
  else
    for(var a=0;this.getInput("ADD"+a);)
      this.removeInput("ADD"+a),a++;
    if(0==this.itemCount_)
      this.appendDummyInput("EMPTY").appendField(new Blockly.FieldImage(Blockly.pathToMedia+"quote0.png",12,12,'"')).appendField(new Blockly.FieldImage(Blockly.pathToMedia+"quote1.png",12,12,'"'));
    else
      for(a=0;a<this.itemCount_;a++){
        var b=this.appendValueInput("ADD"+a);
        0==a&&b.appendField(Blockly.Msg.PROBBIE_COLOR)
      }
}};
}

//Quno
Blockly.Blocks.ljj_quno={};
Blockly.Blocks.ljj_quno.HUE=340;
Blockly.Blocks.ljj_quno.HUE1=30;
Blockly.Blocks.ljj_quno.HUE2=236;
Blockly.Blocks.ljj_quno.HUE3=97;
Blockly.Blocks.ljj_quno.HUE4=157;
Blockly.Blocks.ljj_quno.HUE5=290;
Blockly.Blocks.ljj_quno.HUE6=60;
Blockly.Blocks.ljj_quno.HUE7=320;
Blockly.Blocks.ljj_quno.HUE8=120;
Blockly.Blocks.ljj_quno.HUE9=250;
Blockly.Blocks.ljj_quno.HUE10=160;
Blockly.Blocks.ljj_quno.HUE11=140;

Blockly.Blocks.ljj_quno_wifi={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.linkit.HUE);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LJJ_QUNO_WIFI_CONNECT_TO);
  this.appendValueInput("SSID")
      .setCheck("String")
      .appendField("SSID");
  this.appendValueInput("PASSWORD")
      .setCheck("String")
      .appendField(Blockly.Msg.LJJ_QUNO_WIFI_PASSWORD);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_wifi_localIP={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.linkit.HUE);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LJJ_QUNO_WIFI_LOCAL_IP);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_wifi_datetime={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.linkit.HUE);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LJJ_QUNO_WIFI_DATETIME)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.ESP32NTP_TIME_FORMAT),"TYPE");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_ifttt={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE8);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LJJ_IFTTT_TITLE);
  this.appendValueInput("KEY")
      .setCheck("String")
	    .setAlign(Blockly.ALIGN_RIGHT)
	    .appendField(Blockly.Msg.LJJ_IFTTT_KEY);
  this.appendValueInput("EVENT")
      .setCheck("String")
	    .setAlign(Blockly.ALIGN_RIGHT)
	    .appendField(Blockly.Msg.LJJ_IFTTT_EVENT_NAME);
  this.appendValueInput("VALUE1").setAlign(Blockly.ALIGN_RIGHT).appendField("Value 1:");
  this.appendValueInput("VALUE2").setAlign(Blockly.ALIGN_RIGHT).appendField("Value 2:");
  this.appendValueInput("VALUE3").setAlign(Blockly.ALIGN_RIGHT).appendField("Value 3:");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_thingspeak={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.thingspeak.HUE);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.THINGS_GET_URL_TITLE);
  this.appendValueInput("KEY")
      .setCheck("String")
	    .setAlign(Blockly.ALIGN_RIGHT)
	    .appendField(Blockly.Msg.THINGS_KEY);
  this.appendValueInput("FIELD1").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD1);
  this.appendValueInput("FIELD2").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD2);
  this.appendValueInput("FIELD3").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD3);
  this.appendValueInput("FIELD4").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD4);
  this.appendValueInput("FIELD5").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD5);
  this.appendValueInput("FIELD6").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD6);
  this.appendValueInput("FIELD7").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD7);
  this.appendValueInput("FIELD8").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.THINGS_FIELD8);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.THINGS_GET_URL_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_sheet_id={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE9);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE+" "+Blockly.Msg.GOOGLESHEETS_SETUP_TITLE);
  this.appendValueInput("sheetId")
      .setCheck("String")
      .appendField(Blockly.Msg.GOOGLESHEETS_SHEETID);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_sheet_append={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE9);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE)
      .appendField(Blockly.Msg.LJJ_QUNO_SHEET_APPEND);
  this.appendValueInput("VALUE1").setAlign(Blockly.ALIGN_RIGHT).appendField("A");
  this.appendValueInput("VALUE2").setAlign(Blockly.ALIGN_RIGHT).appendField("B");
  this.appendValueInput("VALUE3").setAlign(Blockly.ALIGN_RIGHT).appendField("C");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_sheet_update={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE9);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE);
  this.appendValueInput("CELL")
      .setCheck("String")
	    .setAlign(Blockly.ALIGN_RIGHT)
	    .appendField(Blockly.Msg.GOOGLESHEETS_UPDATE_TITLE);
  this.appendValueInput("VALUE1").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.GOOGLESHEETS_UPDATE_DATA_TITLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_sheet_read={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE9);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.GOOGLESHEETS_TITLE);
  this.appendValueInput("CELL")
      .setCheck("String")
	    .setAlign(Blockly.ALIGN_RIGHT)
	    .appendField(Blockly.Msg.LJJ_QUNO_SHEET_READ_FROM);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_udp_register={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE10);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.UDP_RIGISTER);
  this.appendValueInput("IP")
      .setCheck("String")
	    .setAlign(Blockly.ALIGN_RIGHT)
	    .appendField(Blockly.Msg.LJJ_QUNO_REMOTE_IP);
  this.appendValueInput("PORT")
      .setCheck("Number")
	    .setAlign(Blockly.ALIGN_RIGHT)
	    .appendField(Blockly.Msg.LJJ_QUNO_REMOTE_PORT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_udp_broadcastIP={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE10);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LJJ_QUNO_UDP_BROADCAST_IP);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_udp_send={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE10);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.UDP_RIGISTER);
  this.appendValueInput("MESSAGE")
      .setCheck("String")
	    .setAlign(Blockly.ALIGN_RIGHT)
	    .appendField(Blockly.Msg.LJJ_QUNO_UDP_SEND);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_udp_received_event={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE10);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.UDP_RIGISTER)
      .appendField(Blockly.Msg.LJJ_QUNO_UDP_RECEIVED_EVENT);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_UDP");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_udp_received_msg={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE10);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.UDP_RIGISTER)
      .appendField(Blockly.Msg.LJJ_QUNO_RECEIVED_MSG);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_udp_unrigister={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE10);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.UDP_RIGISTER)
      .appendField(Blockly.Msg.UDP_UNRIGISTER);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_pins={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE3);
  this.appendDummyInput()
      .appendField("Quno "+Blockly.Msg.LIOU_ROBOT_PIN)
      .appendField(new Blockly.FieldDropdown([["0","0"],["1","1"],["5 ~PWM","5"],["6 ~PWM","6"],["7","7"],["8","8"],["12","12"],["13","13"],["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],["A4","A4"],["A5","A5"]]),"QUNO_PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_button={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+" Quno "+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["1","A"],["2","B"],["1+2","C"]]),"AB_BUTTON");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_BUTTON_CHECK);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_BUTTON_CALL");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_button_boolean={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE1);
  this.appendDummyInput()
      .appendField("Quno "+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["1","A"],["2","B"]]),"AB_BUTTON");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_BUTTON_CHECK+"?");
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_led={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE2);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.EZ_LED)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.EZ_LED_RED,"10"],[Blockly.Msg.EZ_LED_GREEN,"9"],[Blockly.Msg.EZ_LED_BLUE,"11"]]),"LED")
  this.appendValueInput("ON_OFF");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_led_analog={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE2);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.EZ_LED)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.EZ_LED_RED,"10"],[Blockly.Msg.EZ_LED_GREEN,"9"],[Blockly.Msg.EZ_LED_BLUE,"11"]]),"LED")
  this.appendValueInput("NUM")
      .setCheck("Number")
      .appendField(Blockly.Msg.ESP32_ANALOG_WRITE_TITLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_rgb={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE2);
  this.appendDummyInput()
      .appendField("Quno");
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.LJJ_QUNO_RGB_COLOR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE3);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.EZ_TONE)
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TONE_LIST),"FREQ");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_no_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE3);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.EZ_noTONE)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_custom_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE3);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.EZ_TONE);
  this.appendValueInput("FREQ")
      .setCheck("Number")
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ);
  this.appendValueInput("DURATION")
      .setCheck("Number")
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_DURATION);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_tone_list={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TONE_LIST),"FREQ");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_servo_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE4);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LIOU_ROBOT_SERVO)
      .appendField(Blockly.Msg.CORE_SETUP);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION_NAME)
      .appendField(new Blockly.FieldVariable("qunoServo"), "varName");
   this.appendValueInput("PIN")      
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendDummyInput().appendField(Blockly.Msg.SERVO_ANGLE_TEXT2);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_servo_write_pin={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE4);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LIOU_ROBOT_SERVO)
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION_NAME)
      .appendField(new Blockly.FieldVariable("qunoServo"), "varName");
  this.appendValueInput("ANGLE")
      .setCheck("Number")
      .appendField(Blockly.Msg.SERVO_ANGLE_TEXT1);
  this.appendDummyInput().appendField(Blockly.Msg.SERVO_ANGLE_TEXT2);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_digital_read={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE11);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LJJ_QUNO_DIGITAL_READ);
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_analog_read={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE11);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LJJ_QUNO_ANALOG_READ);
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_pir_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE5);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LJJ_QUNO_IR)
      .appendField(Blockly.Msg.LJJ_SERIAL_INIT);
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_pir_detected={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE5);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LJJ_QUNO_WHEN_DETECT_IR);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_sonar={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE6);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LJJ_QUNO_SONAR);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_quno_dht11={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE7);
  this.appendDummyInput()
      .appendField("Quno")
      .appendField(Blockly.Msg.LJJ_BASIC_DHT11)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_BASIC_DHT11_MODE),"DHT11_TYPE");
  this.appendValueInput("PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

//MAX7219
Blockly.Blocks.ljj_max7219={};
Blockly.Blocks.ljj_max7219.HUE=285;
Blockly.Blocks.ljj_max7219_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_INIT);
  this.appendValueInput("PIN_DIN")
      .setCheck("Number")
      .appendField("DIN "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("PIN_CS")
      .setCheck("Number")
      .appendField("CS "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("PIN_CLK")
      .setCheck("Number")
      .appendField("CLK "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("DEV_NUM")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_MAX7219_DEV_MAX);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_MAX7219_TOOLTIP)},onchange:function(){
    var myMenuMax=Blockly.Msg.LJJ_MAX7219_DEV_INDEX_LIST.length;
    var inputCount=parseInt(Blockly.Arduino.valueToCode(this,"DEV_NUM",Blockly.Arduino.ORDER_ATOMIC)||"");
    if (inputCount>myMenuMax){
      for(tempIndex=myMenuMax;tempIndex<inputCount;tempIndex++){
        Blockly.Msg.LJJ_MAX7219_DEV_INDEX_LIST.push([""+(tempIndex+1),""+tempIndex]);
      }
    }
  }
};


Blockly.Blocks.ljj_max7219_clear={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_CLEAR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_MAX7219_TOOLTIP)}
};

Blockly.Blocks.ljj_max7219_setpoint={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_MAX7219_PLOT_TYPE),"PLOT_TYPE");
  this.appendValueInput("X")
      .setCheck("Number")
      .appendField("X:");
  this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("Y:");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_MAX7219_TOOLTIP)}
};

Blockly.Blocks.ljj_max7219_getpoint={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_GETPOINT);
  this.appendValueInput("X")
      .setCheck("Number")
      .appendField("X:");
  this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("Y:");
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LJJ_MAX7219_TOOLTIP)}
};

Blockly.Blocks.ljj_max7219_bitmap={init: function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_BITMAP);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_DEV_INDEX)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_MAX7219_DEV_INDEX_LIST),"DEV_INDEX");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L07")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L17")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L27")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L37")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L47")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L57")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L67")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L77");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L06")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L16")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L26")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L36")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L46")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L56")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L66")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L76");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L05")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L15")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L25")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L35")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L45")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L55")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L65")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L75");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L04")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L14")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L24")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L34")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L44")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L54")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L64")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L74");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L03")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L13")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L23")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L33")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L43")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L53")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L63")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L73");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L02")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L12")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L22")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L32")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L42")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L52")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L62")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L72");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L01")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L11")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L21")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L31")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L41")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L51")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L61")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L71");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L00")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L10")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L20")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L30")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L40")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L50")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L60")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L70");
  this.setPreviousStatement(!0, null);
  this.setNextStatement(!0, null)}
};

Blockly.Blocks.ljj_max7219_inverse={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_TEXT_INVERSE)
      .appendField(new Blockly.FieldDropdown([["No","false"],["Yes","true"]]),"INVERSE_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_MAX7219_TOOLTIP)}
};

Blockly.Blocks.ljj_max7219_print={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE);
  this.appendValueInput("TEXT")
      .appendField(Blockly.Msg.LJJ_MAX7219_PRINT);
/*
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_POSITION)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_MAX7219_POSITION_TYPE),"POSITION_TYPE");
*/
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_MAX7219_TOOLTIP)}
};

Blockly.Blocks.ljj_max7219_scroll={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE);
  this.appendValueInput("TEXT")
      .setCheck("String")
      .appendField(Blockly.Msg.LJJ_MAX7219_SCROLL);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_POSITION)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_MAX7219_POSITION_TYPE),"POSITION_TYPE");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_EFFECT)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_MAX7219_EFFECT_TYPE),"EFFECT_TYPE");
  this.appendValueInput("SPEED")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_MAX7219_SPEED);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_MAX7219_TOOLTIP)}
};

Blockly.Blocks.ljj_max7219_animate={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_ANIMATE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_MAX7219_TOOLTIP)}
};

Blockly.Blocks.ljj_max7219_animate_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_ANIMATE_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_MAX7219_TOOLTIP)}
};

Blockly.Blocks.ljj_max7219_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_BEGIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_MAX7219_TOOLTIP)}
};

//NKNU5012
Blockly.Blocks.ljj_5012={};
Blockly.Blocks.ljj_5012.HUE=340;
Blockly.Blocks.ljj_5012.HUE1=30;
Blockly.Blocks.ljj_5012.HUE2=236;
Blockly.Blocks.ljj_5012.HUE3=97;
Blockly.Blocks.ljj_5012.HUE4=157;
Blockly.Blocks.ljj_5012.HUE5=290;
Blockly.Blocks.ljj_5012.HUE6=60;
Blockly.Blocks.ljj_5012.HUE7=320;

Blockly.Blocks.ljj_5012_max7219={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_MAX7219_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_max7219_bitmap={init: function(){
  this.setHelpUrl(Blockly.Msg.LJJ_MAX7219_HELPURL);
  this.setColour(Blockly.Blocks.ljj_max7219.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_MAX7219_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_BITMAP);
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L07")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L17")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L27")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L37")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L47")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L57")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L67")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L77");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L06")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L16")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L26")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L36")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L46")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L56")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L66")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L76");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L05")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L15")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L25")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L35")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L45")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L55")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L65")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L75");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L04")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L14")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L24")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L34")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L44")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L54")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L64")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L74");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L03")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L13")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L23")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L33")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L43")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L53")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L63")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L73");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L02")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L12")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L22")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L32")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L42")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L52")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L62")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L72");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L01")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L11")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L21")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L31")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L41")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L51")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L61")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L71");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L00")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L10")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L20")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L30")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L40")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L50")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L60")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L70");
  this.setPreviousStatement(!0, null);
  this.setNextStatement(!0, null)}
};

Blockly.Blocks.ljj_5012_sonar={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE6);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.LJJ_QUNO_SONAR);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_dht11={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE7);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.LJJ_BASIC_DHT11)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_BASIC_DHT11_MODE),"DHT11_TYPE");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN) 
      .appendField(new Blockly.FieldDropdown([["D2","2"],["D5","5"]]),"PIN");      
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_hall={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.LJJ_5012_HALL)
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_bh1750={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.LJJ_5012_BH1750);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_fan={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.LJJ_5012_FAN)
  this.appendValueInput("ON_OFF")
      .setCheck("Boolean");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_servo_write_pin={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.SERVO_WRITE_TEXT1.replace("Pin",""));
  this.appendValueInput("ANGLE")
      .setCheck("Number")
      .appendField(Blockly.Msg.SERVO_ANGLE_TEXT1)
      .appendField(Blockly.Msg.SERVO_ANGLE_TEXT2);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_stickXY={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.KSB045_XY)
      .appendField(new Blockly.FieldDropdown([["X","A0"],["Y","A1"]]),"XY_TYPE")
      .appendField(Blockly.Msg.KSB045_AXIS_END)
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_stickButton={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN)
      .appendField(Blockly.Msg.LJJ_5012_JOYSTICK)
      .appendField(Blockly.Msg.LIOU_ROBOT_BUTTON);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BASIC_BUTTON_EVENT+" "+Blockly.Msg.KEYBOARDS_EVENT_LIST[0][0])
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_BASIC_PIN_MODE),"PIN_MODE");
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_BUTTON_CALL_PRESSED");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BASIC_BUTTON_EVENT+" "+Blockly.Msg.KEYBOARDS_EVENT_LIST[1][0]);
  this.appendStatementInput("MSG_BUTTON_CALL_RELEASED");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.EZ_TONE)
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_TONE_LIST),"FREQ");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_no_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.EZ_noTONE)
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_custom_tone={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.EZ_TONE);
  this.appendValueInput("FREQ")
      .setCheck("Number")
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ);
  this.appendValueInput("DURATION")
      .setCheck("Number")
      .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_DURATION);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_neopixel_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.ljj_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.EZ_NEOPIXEL_BEGIN_BRIGHTNESS)
  this.appendValueInput("BRIGHTNESS")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.ljj_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_neopixel_set_color={init:function(){
  this.setHelpUrl(Blockly.Msg.ljj_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE);
  this.appendValueInput("INDEX")
      .setCheck("Number")
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE);
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.NEOPIXEL_CUSTOM_SETPIXELCOLOR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ljj_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_neopixel_set_colors={init:function(){
  this.setHelpUrl(Blockly.Msg.ljj_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE)
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.startPlus_NEOPIXEL_SET_ALL_COLORS);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ljj_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_neopixel_show={init:function(){
  this.setHelpUrl(Blockly.Msg.ljj_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE)
      .appendField(Blockly.Msg.NEOPIXEL_SHOW);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.ljj_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_l9110_init={init:function(){
  this.setHelpUrl(Blockly.Msg.ljj_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.L9110_MOTOR)
      .appendField(Blockly.Msg.L9110_INIT);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN)
      .appendField(new Blockly.FieldDropdown([["D3,D5","A"],["D2,D3","B"]]),"PIN_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ljj_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_l9110_run={init:function(){
  this.setHelpUrl(Blockly.Msg.ljj_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.L9110_MOTOR);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_ROTATE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.L9110_DIRECTION),"DIR");
  this.appendValueInput("SPEED")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ljj_5012_TOOLTIP)}
};

Blockly.Blocks.ljj_5012_l9110_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.ljj_5012_HELPURL);
  this.setColour(Blockly.Blocks.ljj_5012.HUE5);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_5012_TITLE)
      .appendField(Blockly.Msg.L9110_MOTOR)
      .appendField(Blockly.Msg.LIOU_ROBOT_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.ljj_5012_TOOLTIP)}
};

//PixelBit
Blockly.Blocks.ljj_pixelbit={};
Blockly.Blocks.ljj_pixelbit.HUE=320;
Blockly.Blocks.ljj_pixelbit.HUE1=97;
Blockly.Blocks.ljj_pixelbit_button={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_PIXELBIT_HELPURL);
  this.setColour(Blockly.Blocks.ljj_pixelbit.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_PIXELBIT_TITLE)
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+" "+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["A","4"],["B","5"]]),"AB_BUTTON")
      .appendField(Blockly.Msg.KEYBOARDS_EVENT_LIST[0][0]);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_BUTTON_CALL_PRESSED");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BASIC_BUTTON_EVENT+" "+Blockly.Msg.KEYBOARDS_EVENT_LIST[1][0]);
  this.appendStatementInput("MSG_BUTTON_CALL_RELEASED");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_PIXELBIT_TOOLTIP)}
};

Blockly.Blocks.ljj_pixelbit_arduino_pins={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_PIXELBIT_HELPURL);
  this.setColour(Blockly.Blocks.ljj_pixelbit.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_PIXELBIT_TITLE)
      .appendField("arduino")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN)
      .appendField(new Blockly.FieldDropdown([["2","2"],["3 ~PWM","3"],["6 ~PWM","6"],["7","7"],["8","8"],["9 ~PWM","9"],["10 ~PWM","10"],["11 ~PWM","11"],["12","12"],["13","13"],["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],["A4","A4"],["A5","A5"],["A6","A6"],["A7","A7"]]),"ARDUINO_PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_PIXELBIT_TOOLTIP)}
};

Blockly.Blocks.ljj_pixelbit_microbit_pins={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_PIXELBIT_HELPURL);
  this.setColour(Blockly.Blocks.ljj_pixelbit.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_PIXELBIT_TITLE)
      .appendField("micro:bit")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN)
      .appendField(new Blockly.FieldDropdown([["P0 ~PWM","3"],["P1 ~analog","A0"],["P2 ~analog","A1"],["P3 ~analog","A2"],["P4 ~analog","A3"],["P6 ~PWM","6"],["P7","7"],["P8","2"],["P9","8"],["P10 ~analog","A7"],["P12 ~PWM","9"],["P13","13"],["P14","12"],["P15 ~PWM","11"],["P16 ~PWM","10"],["P19 ~analog","A5"],["P20 ~analog","A4"]]),"ARDUINO_PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_PIXELBIT_TOOLTIP)}
};

//ESP_NOW
Blockly.Blocks.ljj_broadcast={};
Blockly.Blocks.ljj_broadcast.HUE=180;
Blockly.Blocks.ljj_broadcast_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BROADCAST_HELPURL);
  this.setColour(Blockly.Blocks.ljj_broadcast.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BROADCAST_TITLE)
      .appendField(Blockly.Msg.LJJ_BROADCAST_INIT);
  this.appendValueInput("CHANNEL")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_BROADCAST_CHANNEL);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_BROADCAST_TOOLTIP)}
};

Blockly.Blocks.ljj_broadcast_get_channel={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BROADCAST_HELPURL);
  this.setColour(Blockly.Blocks.linkit.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BROADCAST_GET_CHANNEL);
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_BROADCAST_TOOLTIP)}
};

Blockly.Blocks.ljj_broadcast_sendData={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BROADCAST_HELPURL);
  this.setColour(Blockly.Blocks.ljj_broadcast.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BROADCAST_TITLE);
  this.appendValueInput("MSG")
      .setCheck("String")
      .appendField(Blockly.Msg.LJJ_BROADCAST_SEND_DATA);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_BROADCAST_TOOLTIP)}
};

Blockly.Blocks.ljj_broadcast_on_receive={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BROADCAST_HELPURL);
  this.setColour(Blockly.Blocks.ljj_broadcast.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BROADCAST_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_RECEIVED_EVENT);
  this.setInputsInline(!0);
  this.appendStatementInput("STATEMENT_RECEIVE");
  this.setTooltip(Blockly.Msg.LJJ_BROADCAST_TOOLTIP)}
};

Blockly.Blocks.ljj_broadcast_msg={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BROADCAST_HELPURL);
  this.setColour(Blockly.Blocks.ljj_broadcast.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BROADCAST_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_RECEIVED_MSG);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LJJ_BROADCAST_TOOLTIP)}
};

Blockly.Blocks.ljj_broadcast_source_mac={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BROADCAST_HELPURL);
  this.setColour(Blockly.Blocks.ljj_broadcast.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BROADCAST_TITLE)
      .appendField(Blockly.Msg.LJJ_BROADCAST_SOURCE_MAC_CHAR);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LJJ_BROADCAST_TOOLTIP)}
};

Blockly.Blocks.ljj_broadcast_self_mac={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_BROADCAST_HELPURL);
  this.setColour(Blockly.Blocks.ljj_broadcast.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_BROADCAST_TITLE)
      .appendField(Blockly.Msg.LJJ_BROADCAST_SELF_MAC_CHAR);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.LJJ_BROADCAST_TOOLTIP)}
};


//Pico setup
Blockly.Blocks.ljj_pico_i2c_reset={init:function(){
  this.setColour(Blockly.Blocks.initializes.HUE);
  this.appendDummyInput()
      .appendField("Pico")
      .appendField(Blockly.Msg.BOARDS_I2C_RESET)
      .appendField(new Blockly.FieldDropdown([["I2C0","Wire"],["I2C1","Wire1"]]),"WIRE_LIST");
  this.appendValueInput("SDA")
      .setCheck("Number")
      .appendField("SDA");
  this.appendValueInput("SCL")
      .setCheck("Number")
      .appendField("SCL");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);}
};

//Pico Dual Core
Blockly.Blocks.ljj_pico_dual_core={};
Blockly.Blocks.ljj_pico_dual_core.HUE=180;
Blockly.Blocks.ljj_pico_core1_task={init:function(){
  this.setHelpUrl(Blockly.Msg.PICO_DUAL_CORE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_pico_dual_core.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PICO_TITLE)
      .appendField(Blockly.Msg.PICO_DUAL_CORE_1_TITLE)
      .appendField(Blockly.Msg.CORE_SETUP);
  this.appendStatementInput("setup1");
  this.appendDummyInput()
      .appendField(Blockly.Msg.CORE_LOOP);
  this.appendStatementInput("loop1");
  this.setInputsInline(!0);
  this.setTooltip(Blockly.Msg.PICO_DUAL_CORE_TOOLTIP)}
};

Blockly.Blocks.ljj_pico_core_idle={init:function(){
  this.setHelpUrl(Blockly.Msg.PICO_DUAL_CORE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_pico_dual_core.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PICO_TITLE)
      .appendField(Blockly.Msg.PICO_IDLE_OTHER);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.PICO_DUAL_CORE_TOOLTIP)}
};

Blockly.Blocks.ljj_pico_core_resume={init:function(){
  this.setHelpUrl(Blockly.Msg.PICO_DUAL_CORE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_pico_dual_core.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PICO_TITLE)
      .appendField(Blockly.Msg.PICO_RESUME_OTHER);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.PICO_DUAL_CORE_TOOLTIP)}
};

Blockly.Blocks.ljj_pico_core1_restart={init:function(){
  this.setHelpUrl(Blockly.Msg.PICO_DUAL_CORE_HELPURL);
  this.setColour(Blockly.Blocks.ljj_pico_dual_core.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.PICO_TITLE)
      .appendField(Blockly.Msg.PICO_RESTART);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.PICO_DUAL_CORE_TOOLTIP)}
};

//pico:bit
Blockly.Blocks.ljj_picobit={};
Blockly.Blocks.ljj_picobit.HUE=80;
Blockly.Blocks.ljj_picobit_button={init:function(){
  this.setColour(Blockly.Blocks.mtk7697bit.HUE);
  this.appendDummyInput()
      .appendField("Pico:Bit")
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["A","A"],["B","B"],["A+B","C"]]),"AB_BUTTON");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_BUTTON_CHECK);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_BUTTON_CALL");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.MTK7697BIT_TOOLTIP)}
};

Blockly.Blocks.ljj_picobit_pinMap={init:function(){
  this.setColour(Blockly.Blocks.mtk7697bit.HUE);
  this.appendDummyInput()
      .appendField("Pico:Bit")
      .appendField(Blockly.Msg.MTK7697BIT_PINMAP_TITLE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["P0","26"],["P1","27"],["P2","28"],["P3","0"],["P4","1"],["P5","2"],["P6","6"],["P7","7"],["P8","8"],["P9","9"],["P10","22"],["P11","20"],["P12","21"],["P13","18"],["P14","16"],["P15","19"],["P16","17"],["P19","5"],["P20","4"]]),"PICO_BIT_PIN");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MTK7697BIT_TOOLTIP)}
};

//WiFi extra
Blockly.Blocks.linkit_wifi_check_conncetion={init:function(){
  this.setHelpUrl(Blockly.Msg.LINKIT_SET_WIFI_HELPURL);
  this.setColour(Blockly.Blocks.linkit.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LINKIT_CHECK_CONNECTION_TITLE);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LINKIT_SET_WIFI_TOOLTIP)}
};

Blockly.Blocks.linkit_wifi_reconnect={init:function(){
  this.setHelpUrl(Blockly.Msg.LINKIT_SET_WIFI_HELPURL);
  this.setColour(Blockly.Blocks.linkit.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LINKIT_RECONNECT_TITLE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LINKIT_SET_WIFI_TOOLTIP)}
};

//HX711
Blockly.Blocks.ljj_hx711={};
Blockly.Blocks.ljj_hx711.HUE=180;
Blockly.Blocks.ljj_hx711_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_HX711_HELPURL);
  this.setColour(Blockly.Blocks.ljj_hx711.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_HX711_TITLE)
      .appendField(Blockly.Msg.LJJ_HX711_INIT);
  this.appendValueInput("DATA_PIN")
      .setCheck("Number")
      .appendField("DATA "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("SCK_PIN")
      .setCheck("Number")
      .appendField("SCK "+Blockly.Msg.LIOU_ROBOT_PIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_HX711_TOOLTIP)}
};

Blockly.Blocks.ljj_hx711_set_scale={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_HX711_HELPURL);
  this.setColour(Blockly.Blocks.ljj_hx711.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_HX711_TITLE);
  this.appendValueInput("SCALE")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_HX711_SET_SCALE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_HX711_TOOLTIP)}
};

Blockly.Blocks.ljj_hx711_tare={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_HX711_HELPURL);
  this.setColour(Blockly.Blocks.ljj_hx711.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_HX711_TITLE)
      .appendField(Blockly.Msg.LJJ_HX711_TARE);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_HX711_TOOLTIP)}
};

Blockly.Blocks.ljj_hx711_get_units={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_HX711_HELPURL);
  this.setColour(Blockly.Blocks.ljj_hx711.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_HX711_TITLE);
  this.appendValueInput("AVERAGE_TIMES")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_HX711_GET_UNITS);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_HX711_GET_UNITS_TIMES);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_HX711_TOOLTIP)}
};

Blockly.Blocks.ljj_hx711_power={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_HX711_HELPURL);
  this.setColour(Blockly.Blocks.ljj_hx711.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_HX711_TITLE)
      .appendField(Blockly.Msg.LJJ_HX711_POWER)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_HX711_POWER_MODE),"POWER");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_HX711_TOOLTIP)}
};


//IFTTT
Blockly.Blocks.ljj_ifttt={};
Blockly.Blocks.ljj_ifttt.HUE=180;
Blockly.Blocks.ljj_ifttt_webhook={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_IFTTT_HELPURL);
  this.setColour(Blockly.Blocks.ljj_ifttt.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_IFTTT_TITLE);
  this.appendValueInput("KEY")
      .setCheck("String")
	    .setAlign(Blockly.ALIGN_RIGHT)
	    .appendField(Blockly.Msg.LJJ_IFTTT_KEY);
  this.appendValueInput("EVENT")
      .setCheck("String")
	    .setAlign(Blockly.ALIGN_RIGHT)
	    .appendField(Blockly.Msg.LJJ_IFTTT_EVENT_NAME);
  this.appendValueInput("VALUE1").setAlign(Blockly.ALIGN_RIGHT).appendField("Value 1:");
  this.appendValueInput("VALUE2").setAlign(Blockly.ALIGN_RIGHT).appendField("Value 2:");
  this.appendValueInput("VALUE3").setAlign(Blockly.ALIGN_RIGHT).appendField("Value 3:");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_IFTTT_TOOLTIP)}
};  

//Wukong
Blockly.Blocks.ljj_wukong={};
Blockly.Blocks.ljj_wukong.HUE1=80;
Blockly.Blocks.ljj_wukong.HUE2=290;
Blockly.Blocks.ljj_wukong.HUE3=150;
Blockly.Blocks.ljj_wukong.HUE4=100;
Blockly.Blocks.ljj_wukong_i2c_reset={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE)
      .appendField(Blockly.Msg.LJJ_SERIAL_INIT)
      .appendField(Blockly.Msg.LJJ_CAMERA_TYPE)
      .appendField(new Blockly.FieldDropdown([["PocketCard","5"],["Pixel:Bit","10"],["7697:Bit","10_1"],["Pico:Bit","17_1"],["KSB072","5_9"]]),"CARD_TYPE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};


Blockly.Blocks.ljj_wukong_motor_move={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE)
      .appendField(Blockly.Msg.L9110_MOTOR)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_WUKONG_MOTORS_LIST),"STAT1");
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_ROTATE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_WUKONG_MOTOR_DIRECTION),"STAT2");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED.replace("0~255","0~100"));
  this.appendValueInput("SPEED")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};

Blockly.Blocks.ljj_wukong_motor_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE)
      .appendField(Blockly.Msg.L9110_MOTOR)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_WUKONG_MOTORS_LIST),"STAT1")
      .appendField(Blockly.Msg.LIOU_ROBOT_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};

Blockly.Blocks.ljj_wukong_servo180={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE)
      .appendField(Blockly.Msg.LIOU_ROBOT_SERVO)
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN)
      .appendField(new Blockly.FieldDropdown([["S0","0x03"],["S1","0x04"],["S2","0x05"],["S3","0x06"],["S4","0x07"],["S5","0x08"],["S6","0x09"],["S7","0x10"],]),"PIN")
  this.appendValueInput("ANGLE")
      .setCheck("Number")
      .appendField(Blockly.Msg.SERVO_ANGLE_TEXT1);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};

Blockly.Blocks.ljj_wukong_servo360={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE)
      .appendField(Blockly.Msg.LJJ_SERVO_360)
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN)
      .appendField(new Blockly.FieldDropdown([["S0","0x03"],["S1","0x04"],["S2","0x05"],["S3","0x06"],["S4","0x07"],["S5","0x08"],["S6","0x09"],["S7","0x10"],]),"PIN")
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_ROTATE)  
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SERVO_360_DIRECTION),"DIR");
  this.appendValueInput("SPEED")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED.replace('~255','~90'));
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};

Blockly.Blocks.ljj_wukong_neopixel_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE);
//      .appendField(Blockly.Msg.LJJ_CAMERA_TYPE)
//      .appendField(new Blockly.FieldDropdown([["PocketCard","5"],["Pixel:Bit","10"],["7697:Bit","10_1"],["Pico:Bit","17_1"],["KSB072","5_9"]]),"CARD_TYPE");
   this.appendDummyInput()     
      .appendField(Blockly.Msg.EZ_NEOPIXEL_BEGIN_BRIGHTNESS);
  this.appendValueInput("BRIGHTNESS")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};

Blockly.Blocks.ljj_wukong_neopixel_set_color={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE);
  this.appendValueInput("INDEX")
      .setCheck("Number")
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE);
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.NEOPIXEL_CUSTOM_SETPIXELCOLOR);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};

Blockly.Blocks.ljj_wukong_neopixel_set_colors={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE)
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE)
  this.appendValueInput("COLOR")
      .setCheck("String")
      .appendField(Blockly.Msg.startPlus_NEOPIXEL_SET_ALL_COLORS);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};

Blockly.Blocks.ljj_wukong_neopixel_show={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE)
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE)
      .appendField(Blockly.Msg.NEOPIXEL_SHOW);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};

Blockly.Blocks.ljj_wukong_neopixel_brightness={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE2);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE)
      .appendField(Blockly.Msg.EZ_NEOPIXEL_TITLE);
  this.appendValueInput("BRIGHTNESS")
      .setCheck("Number")
      .appendField(Blockly.Msg.POCKETCARD_PIXELS_BRIGHTNESS+"(0~255)");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};

Blockly.Blocks.ljj_wukong_board_blue_enable={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE)
      .appendField(Blockly.Msg.LJJ_WUKONG_BOARD_BLUE_LED)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_HX711_POWER_MODE),"MODE");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};

Blockly.Blocks.ljj_wukong_board_blue_brightness={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_WUKONG_HELPURL);
  this.setColour(Blockly.Blocks.ljj_wukong.HUE3);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_WUKONG_TITLE)
      .appendField(Blockly.Msg.LJJ_WUKONG_BOARD_BLUE_LED);
  this.appendValueInput("BRIGHTNESS")
      .setCheck("Number")
      .appendField(Blockly.Msg.POCKETCARD_PIXELS_BRIGHTNESS+"(0~100)");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.LJJ_WUKONG_TOOLTIP)}
};

//LCD1602
Blockly.Blocks.ljj_lcd1602={};
Blockly.Blocks.ljj_lcd1602.HUE=80;
Blockly.Blocks.ljj_lcd1602_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_LCD1602_HELPURL);
  this.setColour(Blockly.Blocks.ljj_lcd1602.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_LCD1602_TITLE)
      .appendField(new Blockly.FieldDropdown([["1602","16,2"],["2004","20,4"]]), "TYPE")
      .appendField(Blockly.Msg.LJJ_SERIAL_INIT)
	    .appendField(Blockly.Msg.LJJ_LCD1602_ADDRESS);
 	this.appendDummyInput()    
		  .appendField(new Blockly.FieldDropdown([["0x27","0x27"],["0x3F","0x3F"],["0x20","0x20"]]), "ADDRESS");
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_LCD1602_TOOLTIP)}
};

Blockly.Blocks.ljj_lcd1602_show={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_LCD1602_HELPURL);
  this.setColour(Blockly.Blocks.ljj_lcd1602.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_LCD1602_TITLE)
	    .appendField(Blockly.Msg.TTGO_TFT_PRINT_ENG_TEXT);
  this.appendValueInput("X")
      .setCheck("Number")
      .appendField("X");
  this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("Y");
  this.appendValueInput("TEXT")
      .setCheck("String")
      .appendField(Blockly.Msg.LDM6432_PUTSTRING_CONTENT);
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_LCD1602_TOOLTIP)}
};

Blockly.Blocks.ljj_lcd1602_char={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_LCD1602_HELPURL);
  this.setColour(Blockly.Blocks.ljj_lcd1602.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_LCD1602_TITLE)
	    .appendField(Blockly.Msg.LJJ_LCD1602_CHAR);
  this.appendValueInput("X")
      .setCheck("Number")
      .appendField("X");
  this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("Y");
  this.appendValueInput("INDEX")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_LCD1602_CHAR_INDEX);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_LCD1602_CHAR_BINARY)
      .appendField(new Blockly.FieldCheckbox("FALSE"), "BINARY");
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_LCD1602_TOOLTIP)}
};

Blockly.Blocks.ljj_lcd1602_bitmap={init: function(){
  this.setHelpUrl(Blockly.Msg.LJJ_LCD1602_HELPURL);
  this.setColour(Blockly.Blocks.ljj_lcd1602.HUE);
  this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_LCD1602_TITLE)
      .appendField(Blockly.Msg.LJJ_LCD1602_BITMAP);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_LCD1602_BITMAP_INDEX)
		  .appendField(new Blockly.FieldDropdown([["0","0"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"]]), "INDEX");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L00")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L01")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L02")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L03")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L04");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L10")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L11")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L12")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L13")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L14");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L20")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L21")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L22")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L23")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L24");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L30")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L31")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L32")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L33")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L34");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L40")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L41")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L42")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L43")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L44");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L50")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L51")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L52")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L53")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L54");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L60")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L61")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L62")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L63")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L64");
  this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L70")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L71")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L72")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L73")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "L74");
	this.setInputsInline(false);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_LCD1602_TOOLTIP)}
};

Blockly.Blocks.ljj_lcd1602_bitmap_show={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_LCD1602_HELPURL);
  this.setColour(Blockly.Blocks.ljj_lcd1602.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_LCD1602_TITLE)
      .appendField(Blockly.Msg.LJJ_LCD1602_BITMAP_SHOW);
  this.appendValueInput("X")
      .setCheck("Number")
      .appendField("X");
  this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("Y");
  this.appendValueInput("INDEX")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_LCD1602_BITMAP_INDEX);
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_LCD1602_TOOLTIP)}
};

Blockly.Blocks.ljj_lcd1602_clear={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_LCD1602_HELPURL);
  this.setColour(Blockly.Blocks.ljj_lcd1602.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_LCD1602_TITLE)
      .appendField(Blockly.Msg.LJJ_MAX7219_CLEAR);
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_LCD1602_TOOLTIP)}
};

Blockly.Blocks.ljj_lcd1602_scroll={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_LCD1602_HELPURL);
  this.setColour(Blockly.Blocks.ljj_lcd1602.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_LCD1602_TITLE)
      .appendField(Blockly.Msg.LJJ_LCD1602_SCROLL)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_LCD1602_SCROLL_TYPE), "MODE")
      .appendField(Blockly.Msg.LJJ_LCD1602_SCROLL_CHARACTER);
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_LCD1602_TOOLTIP)}
};

Blockly.Blocks.ljj_lcd1602_backlight={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_LCD1602_HELPURL);
  this.setColour(Blockly.Blocks.ljj_lcd1602.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_LCD1602_TITLE)
      .appendField(Blockly.Msg.LJJ_LCD1602_BACKLIGHT)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_HX711_POWER_MODE), "MODE");
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_LCD1602_TOOLTIP)}
};

/*
Blockly.Blocks.ljj_lcd1602_blink={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_LCD1602_HELPURL);
  this.setColour(Blockly.Blocks.ljj_lcd1602.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_LCD1602_TITLE)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LMX_7SEG_BLINK,"blink"],[Blockly.Msg.LMX_7SEG_STOP_BLINK,"noBlink"]]), "BLINK");
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_LCD1602_TOOLTIP)}
};
*/

Blockly.Blocks.ljj_time_delay={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_TIME_HELPURL);
  this.setColour(Blockly.Blocks.esp32_irq.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_TIME)
      .appendField(Blockly.Msg.CORE_RUN)
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION)
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION_NAME)
      .appendField(new Blockly.FieldVariable("timeEvent"), "varName");
  this.appendValueInput("DELAY")
      .setCheck("Number")
      .appendField(Blockly.Msg.ESP32_IRQ_TIMER_DURATION);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_TIME_MS);
  this.setInputsInline(!0);
  this.appendStatementInput("TIME_EVENT");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_TIME_TOOLTIP)}
};

Blockly.Blocks.ljj_time_reset={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_TIME_HELPURL);
  this.setColour(Blockly.Blocks.esp32_irq.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_TIME)
      .appendField(Blockly.Msg.LJJ_TIME_TIMER_RESET)
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION)
      .appendField(new Blockly.FieldVariable("timeEvent"), "varName");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_TIME_TOOLTIP)}
};

Blockly.Blocks.ljj_time_system_time={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_TIME_HELPURL);
  this.setColour(Blockly.Blocks.esp32_irq.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_TIME)
      .appendField(Blockly.Msg.LJJ_TIME_SYSTEM_TIME)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.ESP32_IRQ_TIMER_UNIT), "MODE");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_TIME_TOOLTIP)}
};

//SU-03T
Blockly.Blocks.ljj_su03t={};
Blockly.Blocks.ljj_su03t.HUE=80;
Blockly.Blocks.ljj_su03t_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SU03T_HELPURL);
  this.setColour(Blockly.Blocks.ljj_su03t.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SU03T_TITLE)
      .appendField(Blockly.Msg.LJJ_SU03T_CONNECT_TO_SERIAL)
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT")
      .appendField('(RX-->B7,TX-->B6)');     
  this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SU03T_TOOLTIP)}
};

Blockly.Blocks.ljj_su03t_init_pinmap={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SU03T_HELPURL);
  this.setColour(Blockly.Blocks.ljj_su03t.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SU03T_TITLE)
      .appendField(Blockly.Msg.LJJ_SU03T_CONNECT_TO_SERIAL)
      .appendField(new Blockly.FieldDropdown([["Serial","Serial"],["Serial1","Serial1"],["Serial2","Serial2"]]),"SERIAL_PORT")
      .appendField('(RX-->B7,TX-->B6)');
  this.appendValueInput("RX")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_SU03T_PINMAP +" RX");
  this.appendValueInput("TX")
      .setCheck("Number")
      .appendField("TX");
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SU03T_TOOLTIP)}
};

Blockly.Blocks.ljj_su03t_reconnect={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SU03T_HELPURL);
  this.setColour(Blockly.Blocks.ljj_su03t.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SU03T_TITLE)
      .appendField(Blockly.Msg.LJJ_SU03T_RECONNECT);  
  this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SU03T_TOOLTIP)}
};

Blockly.Blocks.ljj_su03t_listening={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SU03T_HELPURL);
  this.setColour(Blockly.Blocks.ljj_su03t.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SU03T_TITLE)
      .appendField(Blockly.Msg.LJJ_SU03T_LISTENING)
	this.setInputsInline(true);
  this.appendStatementInput("SU03T_IF");
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SU03T_TOOLTIP)}
};

Blockly.Blocks.ljj_su03t_listened_result={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SU03T_HELPURL);
  this.setColour(Blockly.Blocks.ljj_su03t.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SU03T_TITLE)
      .appendField(Blockly.Msg.LJJ_SU03T_LISTENED_RESULT)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SU03T_VOICE_COMMAND_LIST),"COMMAND")
      .appendField("?");
	this.setInputsInline(true);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LJJ_SU03T_TOOLTIP)}
};

Blockly.Blocks.ljj_su03t_send_data={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SU03T_HELPURL);
  this.setColour(Blockly.Blocks.ljj_su03t.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SU03T_TITLE)
      .appendField(Blockly.Msg.LJJ_SU03T_SEND_AND_SAY)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SU03T_SAY_COMMAND_LIST),"COMMAND");
  this.appendValueInput("SAY_DATA")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_SU03T_VALUE_INTEGER);
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SU03T_TOOLTIP)}
};

Blockly.Blocks.ljj_su03t_send_custom_data={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SU03T_HELPURL);
  this.setColour(Blockly.Blocks.ljj_su03t.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SU03T_TITLE)
      .appendField(Blockly.Msg.LJJ_SU03T_SEND_AND_SAY)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SU03T_SAY_CUSTOM_COMMAND_LIST),"COMMAND");
  this.appendValueInput("SAY_DATA")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_SU03T_VALUE);
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SU03T_TOOLTIP)}
};

Blockly.Blocks.ljj_su03t_system_command={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SU03T_HELPURL);
  this.setColour(Blockly.Blocks.ljj_su03t.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SU03T_TITLE)
      .appendField(Blockly.Msg.LJJ_SU03T_EXECUTE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SU03T_SYSTEM_COMMAND_LIST),"COMMAND");
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SU03T_TOOLTIP)}
};

Blockly.Blocks.ljj_su03t_say_something={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SU03T_HELPURL);
  this.setColour(Blockly.Blocks.ljj_su03t.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SU03T_TITLE)
      .appendField(Blockly.Msg.LJJ_SU03T_SAY_SOMETHING)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SU03T_SAY_SOMETHING_LIST),"COMMAND");
	this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SU03T_TOOLTIP)}
};


//ljj_servo
Blockly.Blocks.ljj_servo={};
//Blockly.Blocks.ljj_servo.HUE=80;
Blockly.Blocks.ljj_servo_init={init:function(){
  //this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_SERVO)
      .appendField(Blockly.Msg.CORE_SETUP);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION_NAME)
      .appendField(new Blockly.FieldVariable("servo1"), "varName");
   this.appendValueInput("PIN")      
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendDummyInput().appendField(Blockly.Msg.SERVO_ANGLE_TEXT2);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_esp32_servo_init={init:function(){
  //this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_SERVO)
      .appendField("ESP32")
      .appendField(Blockly.Msg.CORE_SETUP);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION_NAME)
      .appendField(new Blockly.FieldVariable("servo1"), "varName");
   this.appendValueInput("PIN")      
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
   this.appendValueInput("CHANNEL")      
      .appendField(Blockly.Msg.ESP32_ANALOG_WRITE_CHANNEL);
  this.appendDummyInput().appendField(Blockly.Msg.SERVO_ANGLE_TEXT2);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_servo_custom_init={init:function(){
  //this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_SERVO)
      .appendField(Blockly.Msg.CORE_SETUP);
  this.appendDummyInput()
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION_NAME)
      .appendField(new Blockly.FieldVariable("servo1"), "varName");
  this.appendValueInput("PIN")      
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN)
      .appendField(Blockly.Msg.SERVO_ANGLE_TEXT2);
  this.appendValueInput("MIN")   
      .appendField(Blockly.Msg.LJJ_SERVO_PULSE_RANGE);
  this.appendValueInput("MAX")      
      .appendField(Blockly.Msg.DAC_TTS_SAVE_TO);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_servo_write_pin={init:function(){
  //this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_SERVO)
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION_NAME)
      .appendField(new Blockly.FieldVariable("servo1"), "varName");
  this.appendValueInput("ANGLE")
      .setCheck("Number")
      .appendField(Blockly.Msg.SERVO_ANGLE_TEXT1);
  this.appendDummyInput().appendField(Blockly.Msg.SERVO_ANGLE_TEXT2);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_servo_360={init:function(){
  //this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LJJ_SERVO_360)
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION_NAME)
      .appendField(new Blockly.FieldVariable("servo1"), "varName");
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_ROTATE)  
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SERVO_360_DIRECTION),"DIR");
  this.appendValueInput("SPEED")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED.replace('~255','~90'));
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

Blockly.Blocks.ljj_servo_detach={init:function(){
  //this.setHelpUrl(Blockly.Msg.LJJ_QUNO_HELPURL);
  this.setColour(Blockly.Blocks.ljj_quno.HUE4);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_SERVO)
      .appendField(Blockly.Msg.ESP32_IRQ_FUNCTION_NAME)
      .appendField(new Blockly.FieldVariable("servo1"), "varName")
      .appendField(Blockly.Msg.LJJ_SERVO_DETACH);
  this.appendDummyInput().appendField(Blockly.Msg.SERVO_ANGLE_TEXT2);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_QUNO_TOOLTIP)}
};

//Cage Bot
Blockly.Blocks.ljj_cagebot={};
Blockly.Blocks.ljj_cagebot.HUE=340;
Blockly.Blocks.ljj_cagebot.HUE1=157;

Blockly.Blocks.ljj_cagebot_line_follower_init={init:function(){
  this.setColour(Blockly.Blocks.l9110.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CAGEBOT_TITLE)
      .appendField(Blockly.Msg.LIOU_ROBOT_LINE_FOLLOWER)
      .appendField(Blockly.Msg.PROBBIE_INIT);
  this.appendValueInput("LEFT_PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.CAGEBOT_LINE_FOLLOWER_LEFT);
  this.appendValueInput("MIDDLE_PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.CAGEBOT_LINE_FOLLOWER_MIDDLE);
  this.appendValueInput("RIGHT_PIN")
      .setCheck("Number")
      .appendField(Blockly.Msg.CAGEBOT_LINE_FOLLOWER_RIGHT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);}
};

Blockly.Blocks.ljj_cagebot_line_follower_read={init:function(){
  this.setColour(Blockly.Blocks.l9110.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CAGEBOT_TITLE)
      .appendField(Blockly.Msg.LIOU_ROBOT_LINE_FOLLOWER);
	this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.CAGEBOT_LINE_FOLLOWER_LIST),"PLACE");
	this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LIOU_ROBOT_BLACK,"1"],[Blockly.Msg.LIOU_ROBOT_WHITE,"0"]]),"VALUE")
      .appendField("?");
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");}
};

Blockly.Blocks.ljj_cagebot_motor_run={init:function(){
  this.setColour(Blockly.Blocks.l9110.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CAGEBOT_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_MOTOR)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.CAGEBOT_MOTOR_LIST),"MOTOR");
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_ROTATE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.L9110_DIRECTION),"DIR");
  this.appendValueInput("SPEED")
      .setCheck("Number")
      .appendField(Blockly.Msg.LIOU_ROBOT_MOVE_SPEED);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);}
};

Blockly.Blocks.ljj_cagebot_motor_stop={init:function(){
  this.setColour(Blockly.Blocks.l9110.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.CAGEBOT_TITLE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.L9110_MOTOR)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.CAGEBOT_MOTOR_LIST),"MOTOR");
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);}
};

//SEN0539
Blockly.Blocks.ljj_sen0539={};
Blockly.Blocks.ljj_sen0539.HUE=80;
Blockly.Blocks.ljj_sen0539_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SEN0539_HELPURL);
  this.setColour(Blockly.Blocks.ljj_sen0539.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SEN0539_TITLE)
      .appendField(Blockly.Msg.LJJ_SERIAL_INIT);
  this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SEN0539_TOOLTIP)}
};

Blockly.Blocks.ljj_sen0539_setVolume={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SEN0539_HELPURL);
  this.setColour(Blockly.Blocks.ljj_sen0539.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SEN0539_TITLE);
  this.appendValueInput("VOLUME")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_SEN0539_VOLUME+"(1~7)");       
  this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SEN0539_TOOLTIP)}
};

Blockly.Blocks.ljj_sen0539_setMute={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SEN0539_HELPURL);
  this.setColour(Blockly.Blocks.ljj_sen0539.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SEN0539_TITLE)
      .appendField(Blockly.Msg.LJJ_SEN0539_MUTE)
      .appendField(new Blockly.FieldDropdown([["ON","1"],["OFF","0"]]),"MUTE");  
  this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SEN0539_TOOLTIP)}
};

Blockly.Blocks.ljj_sen0539_wakeup_time={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SEN0539_HELPURL);
  this.setColour(Blockly.Blocks.ljj_sen0539.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SEN0539_TITLE);
  this.appendValueInput("SECONDS")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_SEN0539_WAKEUP_SECONDS);      
  this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SEN0539_TOOLTIP)}
};

Blockly.Blocks.ljj_sen0539_execute={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SEN0539_HELPURL);
  this.setColour(Blockly.Blocks.ljj_sen0539.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SEN0539_TITLE)
      .appendField(Blockly.Msg.LJJ_SEN0539_EXECUTE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_COMMAND_TYPE, this.validate),"TYPE");
	this.appendDummyInput("opt")
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_FIXED_COMMAND_LIST),"COMMAND");
  this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SEN0539_TOOLTIP)
  },validate: function(newValue) {
	  const sourceBlock = this.sourceBlock_;
	  sourceBlock.getInput("opt").removeField("COMMAND");
	  if (newValue=="fixed") {
      sourceBlock.getInput("opt").appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_FIXED_COMMAND_LIST),"COMMAND");		 
	  } else if (newValue=="wake") {
		  sourceBlock.getInput("opt").appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_WAKE_COMMAND_LIST),"COMMAND"); 
	  } else if (newValue=="custom") {
		  sourceBlock.getInput("opt").appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_CUSTOM_COMMAND_LIST),"COMMAND"); 
	  } else if (newValue=="learning") {
		  sourceBlock.getInput("opt").appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_LEARNING_COMMAND_LIST),"COMMAND"); 
	  }
  }
};

Blockly.Blocks.ljj_sen0539_listening={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SEN0539_HELPURL);
  this.setColour(Blockly.Blocks.ljj_sen0539.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SEN0539_TITLE)
      .appendField(Blockly.Msg.LJJ_SU03T_LISTENING);
	this.setInputsInline(true);
  this.appendStatementInput("SEN0539_IF");
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_SEN0539_TOOLTIP)}
};

Blockly.Blocks.ljj_sen0539_command={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_SEN0539_HELPURL);
  this.setColour(Blockly.Blocks.ljj_sen0539.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_SEN0539_TITLE)
      .appendField(Blockly.Msg.LJJ_SEN0539_RECOGNIZED)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_COMMAND_TYPE, this.validate),"TYPE");
 	this.appendDummyInput("opt")   
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_FIXED_COMMAND_LIST),"COMMAND");
 	this.appendDummyInput().appendField("?");
	this.setInputsInline(true);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LJJ_SEN0539_TOOLTIP)
  },validate: function(newValue) {
	  const sourceBlock = this.sourceBlock_;
	  sourceBlock.getInput("opt").removeField("COMMAND");
	  if (newValue=="fixed") {
      sourceBlock.getInput("opt").appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_FIXED_COMMAND_LIST),"COMMAND"); 
	  } else if (newValue=="wake") {
		  sourceBlock.getInput("opt").appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_WAKE_COMMAND_LIST),"COMMAND");
	  } else if (newValue=="custom") {
		  sourceBlock.getInput("opt").appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_CUSTOM_COMMAND_LIST),"COMMAND");
	  } else if (newValue=="learning") {
		  sourceBlock.getInput("opt").appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_SEN0539_LEARNING_COMMAND_LIST),"COMMAND"); 
	  }
  }
};

//STEPPER
Blockly.Blocks.ljj_stepper={};
Blockly.Blocks.ljj_stepper.HUE=80;
Blockly.Blocks.ljj_stepper_init={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_STEPPER_HELPURL);
  this.setColour(Blockly.Blocks.ljj_stepper.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_STEPPER_TITLE)
      .appendField(Blockly.Msg.LJJ_SERIAL_INIT);
	this.appendDummyInput() 
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_STEPPER_LIST),"INDEX")
      .appendField(Blockly.Msg.LIOU_ROBOT_PIN);
  this.appendValueInput("PIN1")
      .setCheck("Number")
      .appendField('IN_1');
  this.appendValueInput("PIN2")
      .setCheck("Number")  
      .appendField('IN_2');
  this.appendValueInput("PIN3")
      .setCheck("Number")  
      .appendField('IN_3');
  this.appendValueInput("PIN4")
      .setCheck("Number")  
      .appendField('IN_4');
  this.appendValueInput("stepsPerRev")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_STEPPER_StepsPerRev);
  this.appendValueInput("stepDelay")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_STEPPER_SETP_DELAY);
  this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_STEPPER_TOOLTIP)}
};

Blockly.Blocks.ljj_stepper_move={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_STEPPER_HELPURL);
  this.setColour(Blockly.Blocks.ljj_stepper.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_STEPPER_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_STEPPER_LIST),"INDEX")
  this.appendValueInput("STEPS")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_STEPPER_MOVE_STEPS);
  this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_STEPPER_TOOLTIP)}
};

Blockly.Blocks.ljj_stepper_move_to={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_STEPPER_HELPURL);
  this.setColour(Blockly.Blocks.ljj_stepper.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_STEPPER_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_STEPPER_LIST),"INDEX")
  this.appendValueInput("STEPS")
      .setCheck("Number")
      .appendField(Blockly.Msg.LJJ_STEPPER_MOVE_TO);
  this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_STEPPER_TOOLTIP)}
};

Blockly.Blocks.ljj_stepper_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_STEPPER_HELPURL);
  this.setColour(Blockly.Blocks.ljj_stepper.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_STEPPER_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_STEPPER_LIST),"INDEX")
      .appendField(Blockly.Msg.LJJ_STEPPER_STOP);
  this.setInputsInline(true);
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_STEPPER_TOOLTIP)}
};

Blockly.Blocks.ljj_stepper_statement_not_moving={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_STEPPER_HELPURL);
  this.setColour(Blockly.Blocks.ljj_stepper.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_STEPPER_TITLE)
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_STEPPER_LIST),"INDEX")
      .appendField(Blockly.Msg.LJJ_STEPPER_STATEMENT_NOT_MOVING);
	this.setInputsInline(true);
  this.appendStatementInput("STEPPER_NOT_MOVING_IF");
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.LJJ_STEPPER_TOOLTIP)}
};

Blockly.Blocks.ljj_stepper_is_moving={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_STEPPER_HELPURL);
  this.setColour(Blockly.Blocks.ljj_stepper.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_STEPPER_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_STEPPER_LIST),"INDEX")
      .appendField(Blockly.Msg.LJJ_STEPPER_IS_MOVING);
  this.setInputsInline(true);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.LJJ_STEPPER_TOOLTIP)}
};

Blockly.Blocks.ljj_stepper_remain_steps={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_STEPPER_HELPURL);
  this.setColour(Blockly.Blocks.ljj_stepper.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_STEPPER_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_STEPPER_LIST),"INDEX")
      .appendField(Blockly.Msg.LJJ_STEPPER_REMAIN_STEPS);
  this.setInputsInline(true);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_STEPPER_TOOLTIP)}
};

Blockly.Blocks.ljj_stepper_position={init:function(){
  this.setHelpUrl(Blockly.Msg.LJJ_STEPPER_HELPURL);
  this.setColour(Blockly.Blocks.ljj_stepper.HUE);
	this.appendDummyInput()
	    .appendField(Blockly.Msg.LJJ_STEPPER_TITLE)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.LJJ_STEPPER_LIST),"INDEX")
      .appendField(Blockly.Msg.LJJ_STEPPER_POSITION);
  this.setInputsInline(true);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.LJJ_STEPPER_TOOLTIP)}
};

//-----------------------------------------------
Blockly.Blocks.ljj_2023_init={init:function(){
  this.setHelpUrl("");
  this.setColour(120);
  this.appendDummyInput()
      .appendField("新年快樂！給過年還在寫程式的您：兔年初始化就大吉大利！");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip("")}
};

Blockly.Blocks.ljj_2023_who={init:function(){
  this.setHelpUrl("");
  this.setColour(0);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
      ["大家","1"],
      ["自己","2"],
      ["父親大人","19"],
      ["母親大人","20"],
      ["老公","3"],
      ["老婆","4"],
      ["男朋友","5"],
      ["女朋友","6"],
      ["好朋友","7"],
      ["兒子","8"],
      ["女兒","9"],
      ["家人","10"],
      ["學生","11"],
      ["同學","12"],
      ["同事","13"],
      ["老闆","14"],
      ["校長","15"],
      ["鄰居","16"],
      ["舊情人","19"],
      ["隔壁老王","17"],
      ["遠方小三","18"],
      ["舊情人","21"]]),"WHO");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip("")}
};

Blockly.Blocks.ljj_2023_what={init:function(){
  this.setHelpUrl("");
  this.setColour(0);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
      ["兔飛猛進，錢兔無量","0"],
      ["小人退散","1"],
      ["一切平安","2"],
      ["心想事成","3"],
      ["談一場戀愛","4"],
      ["減肥五十公斤","5"],
      ["跑一場馬拉松","6"],
      ["月跑量200公里","7"],
      ["發大財","8"],
      ["如願退休","9"],
      ["繼續工作做到65歲","10"],
      ["升官加新","11"],
      ["週遊世界，遊遍百國","12"],
      ["結婚，順利脫單","13"],
      ["私房錢愈藏愈多，不被找到","27"],
      ["桃花處處開，左右逢源","28"],
      ["有人幫忙推輪椅出去曬太陽","29"],
      ["計畫多到忙不完","30"],
      ["寫程式順到找不到bug","31"],
      ["完成拖了好幾年的論文","32"],
      ["找到男朋友","14"],
      ["找到女朋友","15"],
      ["生小孩增產報國","16"],
      ["身材火辣","17"],
      ["體格健壯","18"],
      ["溫柔賢慧","19"],
      ["聰明智慧","20"],
      ["疾病退散","21"],
      ["身體健康","22"],
      ["健康快樂","23"],
      ["刮刮樂每刮必中","24"],
      ["樂透中千億","25"],
      ["百病消散","26"]]),"WHAT");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip("")}
};

Blockly.Blocks.ljj_2023_loop={init:function(){
  this.setHelpUrl("");
  this.setColour(120);
  this.appendDummyInput()
      .appendField("願");
  this.appendValueInput("WHO")
      .setCheck("String");
  this.appendDummyInput()
      .appendField("新的一年能");
  this.appendValueInput("WHAT")
      .setCheck("String");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip("")}
};