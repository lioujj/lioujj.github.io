//UDP Broadcast
Blockly.Blocks.ycsh_udp={};
Blockly.Blocks.ycsh_udp.HUE=320;
Blockly.Blocks.ycsh_udp.checkBlocks=function(a,slave,master){
	var b=null,
	    d=a.type;
		a=a.workspace.getAllBlocks();
		for(var c=0;c<a.length;c++)
			if(slave!=a[c].type||null!=b||(b=a[c].type!=d?!0:!1),master==a[c].type){
			  return!0;
      }
		return b
};

Blockly.Blocks.ycsh_udp_init={init:function(){
  this.setHelpUrl(Blockly.Msg.YCSH_UDP_HELPURL);
  this.setColour(Blockly.Blocks.ycsh_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.YCSH_UDP_TITLE)
      .appendField(Blockly.Msg.YCSH_UDP_INIT);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.YCSH_UDP_TOOLTIP)}
};

Blockly.Blocks.ycsh_udp_setPort={init:function(){
  this.setHelpUrl(Blockly.Msg.YCSH_UDP_HELPURL);
  this.setColour(Blockly.Blocks.ycsh_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.YCSH_UDP_TITLE)
      .appendField(Blockly.Msg.YCSH_UDP_SET_PORT);
  this.appendValueInput("PORT")
      .setCheck("Number");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.YCSH_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ycsh_udp.checkBlocks(this,"ycsh_udp_setPort","ycsh_udp_init")?this.setWarningText(null):this.setWarningText(Blockly.Msg.YCSH_UDP_WARNING))}
};

Blockly.Blocks.ycsh_udp_begin={init:function(){
  this.setHelpUrl(Blockly.Msg.YCSH_UDP_HELPURL);
  this.setColour(Blockly.Blocks.ycsh_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.YCSH_UDP_TITLE)
      .appendField(Blockly.Msg.YCSH_UDP_BEGIN);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.YCSH_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ycsh_udp.checkBlocks(this,"ycsh_udp_begin","ycsh_udp_init")?this.setWarningText(null):this.setWarningText(Blockly.Msg.YCSH_UDP_WARNING))}
};

Blockly.Blocks.ycsh_udp_stop={init:function(){
  this.setHelpUrl(Blockly.Msg.YCSH_UDP_HELPURL);
  this.setColour(Blockly.Blocks.ycsh_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.YCSH_UDP_TITLE)
      .appendField(Blockly.Msg.YCSH_UDP_STOP);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.YCSH_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ycsh_udp.checkBlocks(this,"ycsh_udp_end","ycsh_udp_begin")?this.setWarningText(null):this.setWarningText(Blockly.Msg.YCSH_UDP_BEGIN_WARNING))}
};

Blockly.Blocks.ycsh_udp_check_msg={init:function(){
  this.setHelpUrl(Blockly.Msg.YCSH_UDP_HELPURL);
  this.setColour(Blockly.Blocks.ycsh_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.YCSH_UDP_TITLE)
      .appendField(Blockly.Msg.YCSH_UDP_CHECK);
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.YCSH_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ycsh_udp.checkBlocks(this,"ycsh_udp_check_msg","ycsh_udp_begin")?this.setWarningText(null):this.setWarningText(Blockly.Msg.YCSH_UDP_BEGIN_WARNING))}
};


Blockly.Blocks.ycsh_udp_send={init:function(){
  this.setHelpUrl(Blockly.Msg.YCSH_UDP_HELPURL);
  this.setColour(Blockly.Blocks.ycsh_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.YCSH_UDP_TITLE)
      .appendField(Blockly.Msg.YCSH_UDP_SEND);
  this.appendValueInput("MESSAGE")
      .setCheck("String");
  this.setInputsInline(!0);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.YCSH_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ycsh_udp.checkBlocks(this,"ycsh_udp_send","ycsh_udp_begin")?this.setWarningText(null):this.setWarningText(Blockly.Msg.YCSH_UDP_BEGIN_WARNING))}
};

Blockly.Blocks.ycsh_udp_send_to_ip={init:function(){
  this.setHelpUrl(Blockly.Msg.YCSH_UDP_HELPURL);
  this.setColour(Blockly.Blocks.ycsh_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.YCSH_UDP_TITLE)
      .appendField(Blockly.Msg.YCSH_UDP_SEND);

  this.appendValueInput("IMEI")
      .setCheck("String")
      .appendField(Blockly.Msg.YCSH_UDP_IMEI);
  this.appendValueInput("FIELD_NO")
      .setCheck("String")
      .appendField(Blockly.Msg.YCSH_UDP_FIELD_NO);
  this.appendValueInput("MESSAGE")
      .setCheck("String")
      .appendField(Blockly.Msg.YCSH_UDP_MESSAGE);
  this.appendValueInput("TEST_CODE")
      .setCheck("String")
      .appendField(Blockly.Msg.YCSH_UDP_CODE);
  this.appendValueInput("IP")
      .setCheck("String")
      .appendField(Blockly.Msg.YCSH_UDP_SEND_IP);
  this.setPreviousStatement(!0,null);
  this.setNextStatement(!0,null);
  this.setTooltip(Blockly.Msg.YCSH_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ycsh_udp.checkBlocks(this,"ycsh_udp_send_to_ip","ycsh_udp_begin")?this.setWarningText(null):this.setWarningText(Blockly.Msg.YCSH_UDP_BEGIN_WARNING))}
};

Blockly.Blocks.ycsh_udp_received_event={init:function(){
  this.setHelpUrl(Blockly.Msg.YCSH_UDP_HELPURL);
  this.setColour(Blockly.Blocks.ycsh_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.YCSH_UDP_TITLE)
      .appendField(Blockly.Msg.YCSH_UDP_RECEIVED_EVENT);
  this.setInputsInline(!0);
  this.appendStatementInput("MSG_UDP");
  this.setTooltip(Blockly.Msg.YCSH_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ycsh_udp.checkBlocks(this,"ycsh_udp_received_event","ycsh_udp_check_msg")?this.setWarningText(null):this.setWarningText(Blockly.Msg.YCSH_UDP_LISTEN_WARNING))}
};

Blockly.Blocks.ycsh_udp_received_msg={init:function(){
  this.setHelpUrl(Blockly.Msg.YCSH_UDP_HELPURL);
  this.setColour(Blockly.Blocks.ycsh_udp.HUE);
  this.appendDummyInput()
      .appendField(Blockly.Msg.YCSH_UDP_TITLE)
      .appendField(Blockly.Msg.YCSH_UDP_RECEIVED_MSG);
  this.setInputsInline(!0);
  this.setOutput(!0,"String");
  this.setTooltip(Blockly.Msg.YCSH_UDP_TOOLTIP)},onchange:function(){
      this.workspace&&(Blockly.Blocks.ycsh_udp.checkBlocks(this,"ycsh_udp_received_msg","ycsh_udp_check_msg")?this.setWarningText(null):this.setWarningText(Blockly.Msg.YCSH_UDP_LISTEN_WARNING))}
};