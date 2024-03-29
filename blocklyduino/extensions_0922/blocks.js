//mqtt
Blockly.Blocks.mqtt={};
Blockly.Blocks.mqtt.HUE=Blockly.Blocks.procedures.HUE;
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
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)},onchange:function(){}
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
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mqtt.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.MQTT_WARNING))}
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
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mqtt.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.MQTT_WARNING))}
};
Blockly.Blocks.mqtt_received_topic={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.texts.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_RECEIVED_TOPIC);
  this.setInputsInline(!0);
  this.setOutput(!0,"String")
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mqtt.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.MQTT_WARNING))}
};
Blockly.Blocks.mqtt_received_msg={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.texts.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_RECEIVED_MSG);
  this.setInputsInline(!0);
  this.setOutput(!0,"String")
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mqtt.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.MQTT_WARNING))}
};

Blockly.Blocks.mqtt_event={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.mqtt.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_EVENT);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_TOPIC_EQAL");
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mqtt.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.MQTT_WARNING))}
};

Blockly.Blocks.mqtt_connected={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.mqtt.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_CONNECTED);
  this.setInputsInline(!0);
  this.setOutput(!0,"Boolean");
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mqtt.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.MQTT_WARNING))}
};

Blockly.Blocks.mqtt_reconnect={init:function(){
  this.setHelpUrl(Blockly.Msg.MOTT_HELPURL);
  this.setColour(Blockly.Blocks.mqtt.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MQTT_RECONNECT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.MQTT_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mqtt.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.MQTT_WARNING))}
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
Blockly.Blocks.mp3.HUE=Blockly.Blocks.times.HUE;
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
  this.appendDummyInput().appendField(Blockly.Msg.MP3_SET_PINS_TITLE);
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


//KSB045
Blockly.Blocks.ksb045={};
Blockly.Blocks.ksb045.HUE1=287;
Blockly.Blocks.ksb045_button={init:function(){
  this.setHelpUrl(Blockly.Msg.KSB045_HELPURL);
  this.setColour(Blockly.Blocks.ksb045.HUE1);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_WHEN+Blockly.Msg.LIOU_ROBOT_BUTTON)
      .appendField(new Blockly.FieldDropdown([["A","0"],["B","7"],["C","11"],["D","12"],["E","13"],["F","4"],["Stick SW","17"]]),"BUTTON");
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
      .appendField(Blockly.Msg.KSB045_XY)
      .appendField(new Blockly.FieldDropdown([["KSB045","KSB045"],["WaveSahre","WAVESHARE"]]),"TYPE")
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
      .appendField(Blockly.Msg.KSB045_MID_XY)
      .appendField(new Blockly.FieldDropdown([["KSB045","KSB045"],["WaveSahre","WAVESHARE"]]),"TYPE")
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
      .appendField(Blockly.Msg.KSB045_VIBRATION)
      .appendField(new Blockly.FieldDropdown([["ON","1"],["OFF","0"]]),"STAT");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.KSB045_TOOLTIP)}
};

Blockly.Blocks.ksb045_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.KSB045_TOOLTIP);
    this.setColour(Blockly.Blocks.ksb045.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MAQUEEN_TONE_PRETEXT);
    this.appendDummyInput()
        .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
        .appendField(new Blockly.FieldDropdown(profile["default"].tone),"FREQ");
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.INOUT_TONE_TOOLTIP)}
};

Blockly.Blocks.ksb045_no_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.KSB045_TOOLTIP);
    this.setColour(Blockly.Blocks.ksb045.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MAQUEEN_NO_TONE_PRETEXT);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.INOUT_TONE_TOOLTIP)}
};

Blockly.Blocks.ksb045_custom_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.KSB045_TOOLTIP);
    this.setColour(Blockly.Blocks.ksb045.HUE1);
    this.appendDummyInput()
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
        .appendField(new Blockly.FieldDropdown(profile["default"].tone),"FREQ");
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

Blockly.Blocks.neopixel.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("neopixel_setpixelcolor"!=a[c].type&&"neopixel_custom_setpixelcolor"!=a[c].type&&"neopixel_show"!=a[c].type&&"neopixel_setpixelcolor2"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"neopixel_begin"==a[c].type || "neopixel_begin_maqueen"==a[c].type)
				return!0;
		return b
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
	this.setTooltip(Blockly.Msg.NEOPIXEL_BEGIN_TOOLTIP)},onchange:function(){}
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
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)},onchange:function(){}
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
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.maqueen.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.LIOU_ROBOT_IR_WARNING))}
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
  this.setTooltip(Blockly.Msg.MAQUEEN_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.maqueen.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.LIOU_ROBOT_IR_WARNING))}
};
Blockly.Blocks.maqueen_ir_received_type={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.texts.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_RECEIVED_TYPE)
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.maqueen.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.LIOU_ROBOT_IR_WARNING))}
};

Blockly.Blocks.maqueen_ir_received_code={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.texts.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_RECEIVED_CODE)
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.maqueen.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.LIOU_ROBOT_IR_WARNING))}

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
			if("ir_event"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"ir_receiver_pin"==a[c].type)
				return!0;
		return b
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

Blockly.Blocks.ir_event={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.LIOU_ROBOT_IR_EVENT)
  this.setInputsInline(!0);
  this.appendStatementInput("IR_EVENT");
  this.setPreviousStatement(!0);
  this.setNextStatement(!0);
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ir.checkSetPin(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.IR_PIN_WARNING))}
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
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ir.checkSetPin(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.IR_PIN_WARNING))}
};

Blockly.Blocks.ir_received_type={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_RECEIVED_TYPE)
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ir.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.LIOU_ROBOT_IR_WARNING))}
};

Blockly.Blocks.ir_received_code={init:function(){
  this.setHelpUrl(Blockly.Msg.IR_HELPURL);
  this.setColour(Blockly.Blocks.ir.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.IR_RECEIVED_CODE)
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.IR_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ir.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.LIOU_ROBOT_IR_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEATHER_TOOLTIP)},onchange:function(){}
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
  this.setTooltip(Blockly.Msg.WEATHER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.weather.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEATHER_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEATHER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.weather.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEATHER_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEATHER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.weather.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEATHER_WARNING))}
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
  this.setTooltip(Blockly.Msg.AQI_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.aqi.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.AQI_WARNING))}
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
  this.setTooltip(Blockly.Msg.AQI_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.aqi.checkBlocks2(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.AQI_WARNING2))}
};


Blockly.Blocks.aqi_attrname_list={init:function(){
  var AttrName=[["AQI指標","AQI"],["狀態(Status)","Status"],["二氧化硫(SO2)","SO2"],["一氧化碳(CO)","CO"],["臭氧(O3)","O3"],["風速","WindSpeed"],["風向角度","WindDirec"],
               ["PM10","PM10"],["PM2.5","PM2.5"],["PM10平均值","PM10_AVG"],["PM2.5平均值","PM2.5_AVG"],["發佈時間","PublishTime"],["監測站名","SiteName"]];
  this.setHelpUrl(Blockly.Msg.AQI_HELPURL);
  this.setColour(Blockly.Blocks.aqi.HUE);
  this.appendDummyInput()  
      .appendField(" ")
      .appendField(new Blockly.FieldDropdown(AttrName),"ATTRNAME");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.AQI_TOOLTIP)}
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
  this.setTooltip(Blockly.Msg.BME280_TOOLTIP)},onchange:function(){}
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
  this.setTooltip(Blockly.Msg.BME280_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.bme280.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.BME280_WARNING))}
};

//MTK7697:bit
Blockly.Blocks.mtk7697bit={};
Blockly.Blocks.mtk7697bit.HUE=80;
Blockly.Blocks.mtk7697bit_button={init:function(){
  this.setHelpUrl(Blockly.Msg.MTK7697BIT_HELPURL);
  this.setColour(Blockly.Blocks.mtk7697bit.HUE);
  this.appendDummyInput()
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
        .appendField(Blockly.Msg.INITIALIZES_SETUP_APPENDTEXT)
        .appendField(Blockly.Msg.OLED_DISPLAY_TITLE)
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.OLED_DISPLAY_TOOLTIP)}
};

Blockly.Blocks.oled_display_show_xbm={
  init:function(){
    this.setHelpUrl(Blockly.Msg.OLED_DISPLAY_HELPURL_NEW);
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
        .appendField(new Blockly.FieldDropdown([["Yes","u8g2.setFontMode(1);\n"],["No","u8g2.setFontMode(0);\n"]]),"OVERWRITE_MODE");
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
        .appendField(new Blockly.FieldDropdown([["White","u8g2.setDrawColor(1);\n"],["Black","u8g2.setDrawColor(0);\n"]]),"DRAW_COLOR");
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
  this.setTooltip(Blockly.Msg.AIRBOX_TOOLTIP)},onchange:function(){}
};

Blockly.Blocks.airbox_getValue={init:function(){
  this.setHelpUrl(Blockly.Msg.AIRBOX_HELPURL);
  this.setColour(Blockly.Blocks.airbox.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.AIRBOX_GET_VALUE);
  this.appendDummyInput()  
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.AIRBOX_VALUE_DROPDOWN),"VALUE_NAME");
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.AIRBOX_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.airbox.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.AIRBOX_WARNING))}
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
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)},onchange:function(){}
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
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.probbie.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.PROBBIE_WARNING))}
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
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.probbie.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.PROBBIE_WARNING))}
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
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.probbie.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.PROBBIE_WARNING))}
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
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.probbie.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.PROBBIE_WARNING))}
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
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.probbie.checkBlocks1(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.PROBBIE_OBSTACLE_WARNING))}
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
  this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.probbie.checkBlocks1(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.PROBBIE_OBSTACLE_WARNING))}
};

Blockly.Blocks.probbie_tone={init:function(){
    this.setHelpUrl(Blockly.Msg.PROBBIE_HELPURL);
    this.setColour(Blockly.Blocks.probbie.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PROBBIE_TITLE)
        .appendField(Blockly.Msg.MAQUEEN_TONE_PRETEXT);
    this.appendDummyInput()
        .appendField(Blockly.Msg.INOUT_TONE_APPENDTEXT_FREQ)
        .appendField(new Blockly.FieldDropdown(profile["default"].tone),"FREQ");
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.probbie.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.PROBBIE_WARNING))}
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
    this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.probbie.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.PROBBIE_WARNING))}
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
    this.setTooltip(Blockly.Msg.PROBBIE_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.probbie.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.PROBBIE_WARNING))}
};
//UDP Broadcast
Blockly.Blocks.broadcast_udp={};
Blockly.Blocks.broadcast_udp.HUE=120;
Blockly.Blocks.broadcast_udp.checkBlocks=function(a){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if("broadcast_udp_send"!=a[c].type&&"broadcast_udp_received_event"!=a[c].type&&"broadcast_udp_received_msg"!=a[c].type&&"broadcast_udp_reset"!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),"broadcast_udp_init"==a[c].type)
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
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)},onchange:function(){}
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
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.broadcast_udp.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.BROADCAST_UDP_WARNING))}
};

Blockly.Blocks.broadcast_udp_received_event={init:function(){
  this.setHelpUrl(Blockly.Msg.BROADCAST_UDP_HELPURL);
  this.setColour(Blockly.Blocks.broadcast_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BROADCAST_UDP_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_RECEIVED_EVENT);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_UDP");
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.broadcast_udp.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.BROADCAST_UDP_WARNING))}
};

Blockly.Blocks.broadcast_udp_received_msg={init:function(){
  this.setHelpUrl(Blockly.Msg.BROADCAST_UDP_HELPURL);
  this.setColour(Blockly.Blocks.broadcast_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.BROADCAST_UDP_TITLE)
      .appendField(Blockly.Msg.BROADCAST_UDP_RECEIVED_MSG);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.broadcast_udp.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.BROADCAST_UDP_WARNING))}
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
  this.setTooltip(Blockly.Msg.BROADCAST_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.broadcast_udp.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.BROADCAST_UDP_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_WARNING))}
};

Blockly.Blocks.webserver_prepare_body={init:function(){
  this.setHelpUrl(Blockly.Msg.WEBSERVER_HELPURL);
  this.setColour(Blockly.Blocks.webserver.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.WEBSERVER_TITLE)
      .appendField(Blockly.Msg.WEBSERVER_PREPARE_BODY);
  this.setInputsInline(!0);
  this.appendStatementInput("WEBSERVER_BODY");
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks_body(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_BODY_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks_body(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_BODY_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks_body(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_BODY_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks_body(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_BODY_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks_body(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_BODY_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks_body(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_BODY_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks_body(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_BODY_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks_body(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_BODY_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks_body(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_BODY_WARNING))}
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
  this.setTooltip(Blockly.Msg.WEBSERVER_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.webserver.checkBlocks_body(this)?this.setWarningText(null):this.setWarningText(Blockly.Msg.WEBSERVER_BODY_WARNING))}
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
      .appendField(new Blockly.FieldDropdown([["7697","7697"],["Arduino","Arduino"],["ESP32","ESP32"],["ESP8266","ESP8266"]]),"BOARD_TYPE")
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
      .appendField(new Blockly.FieldDropdown([["7697","7697"],["Arduino","Arduino"],["ESP32","ESP32"],["ESP8266","ESP8266"]]),"BOARD_TYPE");
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
      .appendField("ESP8266 "+Blockly.Msg.BOARDS_DIGITAL)
      .appendField(new Blockly.FieldDropdown([["D0","16"],["D1","5"],["D2","4"],["D3","0"],["D4","2"],["D5","14"],["D6","12"],["D7","13"],["D8","15"]]),"MY_PIN");
  this.setOutput(!0,"Number")
  this.setTooltip(Blockly.Msg.BOARDS_TOOLTIP)}
};

Blockly.Blocks.board_esp8266_analog={init:function(){
  this.setHelpUrl(Blockly.Msg.BOARDS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput()
      .appendField("ESP8266 "+Blockly.Msg.BOARDS_ANALOG)
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
      .setCheck("Number")
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
      .setCheck("Number")
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
      .setCheck("Number")
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
        .appendField(new Blockly.FieldDropdown(profile["default"].tone),"FREQ");
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

//PocketCard
Blockly.Blocks.pocketcard={};
Blockly.Blocks.pocketcard.HUE=120;
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
      .appendField(new Blockly.FieldDropdown([["P0","26"],["P1","33"],["P2","32"],["P3","35"],["P4","4"],["P5","14"],["P6","16"],["P7","17"],["P8","27"],["P9","13"],["P10","2"],["P11","25"],["P12","15"],["P13","18"],["P14","19"],["P15","23"],["P16","5"],["P17",""],["P19","22"],["P20","21"]]),"POCKETCARD_PIN");
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
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mpu9250.checkBlocks(this,"mpu9250_accel_fetch","mpu9250_accel_begin")?this.setWarningText(null):this.setWarningText(Blockly.Msg.MPU9250_ACCEL_WARNING))}
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
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mpu9250.checkBlocks(this,"mpu9250_accel_3axis","mpu9250_accel_fetch")?this.setWarningText(null):this.setWarningText(Blockly.Msg.MPU9250_ACCEL_3AXIS_WARNING))}
};

Blockly.Blocks.mpu9250_accel_pitch_roll={init:function(){
  this.setHelpUrl(Blockly.Msg.MPU9250_HELPURL);
  this.setColour(Blockly.Blocks.mpu9250.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.MPU9250_TITLE+" "+Blockly.Msg.MPU9250_ACCEL_PITCH_ROLL)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.MPU9250_PITCH_ROLL),"PITCH_ROLL");
  this.setInputsInline(!0);
  this.setOutput(!0,"Number");
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mpu9250.checkBlocks(this,"mpu9250_accel_pitch_roll","mpu9250_accel_fetch")?this.setWarningText(null):this.setWarningText(Blockly.Msg.MPU9250_ACCEL_3AXIS_WARNING))}
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
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mpu9250.checkBlocks(this,"mpu9250_mag_fetch","mpu9250_mag_begin")?this.setWarningText(null):this.setWarningText(Blockly.Msg.MPU9250_MAG_WARNING))}
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
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mpu9250.checkBlocks(this,"mpu9250_mag_3axis","mpu9250_mag_fetch")?this.setWarningText(null):this.setWarningText(Blockly.Msg.MPU9250_MAG_3AXIS_WARNING))}
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
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mpu9250.checkBlocks(this,"mpu9250_gyro_fetch","mpu9250_gyro_begin")?this.setWarningText(null):this.setWarningText(Blockly.Msg.MPU9250_GYRO_WARNING))}
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
  this.setTooltip(Blockly.Msg.MPU9250_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.mpu9250.checkBlocks(this,"mpu9250_gyro_3axis","mpu9250_gyro_fetch")?this.setWarningText(null):this.setWarningText(Blockly.Msg.MPU9250_GYRO_3AXIS_WARNING))}
};