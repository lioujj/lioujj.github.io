	//var preHTTP="https://lioujj.github.io/LinkIt7697/"
  var preHTTP="";
	var toolbox = document.getElementById('toolbox');
	
	var zhhant_path = preHTTP+"extensions/zh-hant.js";  //載入自訂積木繁體語系設定檔(預設繁體語系)
	var blocks_path = preHTTP+"extensions/blocks.js";   //載入自訂積木定義檔
	var javascript_path = preHTTP+"extensions/javascript.js";   //載入自訂積木轉出程式碼檔
	var toolbox_path = preHTTP+"extensions/toolbox.xml";  //讀取自訂積木目錄檔
	var fatherCategoryID = "category_liou";    //設定自訂積木的目錄(toolbox.xml)要掛載的官方主目錄Category ID為"category_external" (main.html)
	initial(zhhant_path, blocks_path, javascript_path, toolbox_path, fatherCategoryID);  //載入自訂積木

	var myTimer = setInterval(function(){
		if (document.getElementById('select-lang-en').checked!=document.getElementById('select-lang-zh').checked) {
			clearInterval(myTimer);
			if ((document.getElementById('select-lang-en').checked)) {
				var en_path = preHTTP+"extensions/en.js";  //載入自訂積木英文語系設定檔
				addScript(en_path);  //載入自訂積木英文語系設定檔覆蓋繁體語系設定
				setCategoryName("category_liou", Blockly.Msg.CATEGORY_LIOU);
			}
			setTimeout(function(){
				//setCategoryName("category_liou", Blockly.Msg.CATEGORY_LIOU);
				//setCategoryName("category_liou", "Liou");
				//Blockly.updateToolbox(toolbox);  //目前會造成目錄大風吹，可考慮不執行這行程式碼，目錄僅顯示toolbox.xml內設定的名稱
			}, 1000);
		}
	}, 100); 

	function addScript(url) {
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = url;
		$("body").append(s);
	}

	function setCategoryName(categoryID, msgName) {
		document.getElementById(categoryID).setAttribute("name", msgName);
	}

	function initial(zhhant_path, blocks_path, javascript_path, toolbox_path, fatherCategoryID) {
		addScript(zhhant_path);
		addScript(blocks_path);
		addScript(javascript_path);
		var xml = $.ajax({url: toolbox_path, async: false}).responseXML;
		//toolbox.children[fatherCategoryID].append(xml.firstChild);
		for(i=0;i< 21;i++){
			toolbox.children[fatherCategoryID].append(xml.firstChild.children[20-i]);
		}
	}