//mqtt
Blockly.Blocks.mqtt={};
Blockly.Blocks.mqtt.HUE=Blockly.Blocks.procedures.HUE;
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
Blockly.Blocks.tools_convert_str_int={init:function(){
  this.setHelpUrl(Blockly.Msg.TOOLS_HELPURL);
  this.setColour(Blockly.Blocks.math.HUE);
  this.appendDummyInput().appendField(Blockly.Msg.LJJ_TOOLS_CONVERT_STR_INY);
  this.appendValueInput("MY_VAR")
      .setCheck("String");
  this.setInputsInline(!0);
  this.setOutput(!0,profile.common.number_type);
  this.setTooltip(Blockly.Msg.LJJ_TOOLS_TOOLTIP)}
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