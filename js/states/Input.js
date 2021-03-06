BasicApp.Input = function(){
	this.binary = [];
	this.binaryText = null;
	this.maxLength = 18;
	this.length = 0;
	this.generateButton = null;
	this.inputSprite = null;
	//keys
	this.one = null;
	this.oneNumpad = null;
	this.zero = null;
	this.zeroNumpad = null;
	this.del = null;
	this.ent = null;
};

BasicApp.Input.prototype = {

	create: function(){
		var style = { font: '64pt Arial', fill: 'white', align: 'center', boundsAlignH: 'center', boundsAlignV: 'middle', wordWrap: false };
		this.binaryText = this.add.text(200,100, '', style);
		this.binaryText.setTextBounds(0,0, 900, 100);

		this.generateButton = this.game.add.button((app.width/2)-app.cache.getImage('generate').width/2,500, 'generate', this.generate, this);
		this.inputSprite = this.game.add.sprite((app.width/2)-app.cache.getImage('textfield').width/2,75,'textfield');
		this.addKeys();
		this.addPointers();
	},

	update: function(){
	},

	render: function(){
		//this.draw(this.houses, this.sites);
	},

	shutdown: function(){
		this.generateButton.destroy();
		this.generateButton = null;

		this.inputSprite.destroy();
		this.inputSprite = null;

		this.length = 0;
		this.binaryText.setText('');
		this.binary = [];
		this.clearEvents();
	},

	clearEvents: function(){
		this.input.mousePointer.rightButton.onDown.removeAll();
		this.input.mousePointer.leftButton.onDown.removeAll();

		this.input.keyboard.reset();
	},

	addPointers: function(){
		//this.input.mousePointer.rightButton.onDown.add(this.rightClick, this);

		//this.input.mousePointer.leftButton.onDown.add(this.leftClick, this, 10);
		//this.input.mousePointer.leftButton.onDown.add(this.draw, this, 0, this.houses, this.sites);
	},

	addKeys: function(){
		//Reset keys
		this.input.keyboard.reset();

		this.zero = this.input.keyboard.addKey(Phaser.Keyboard.ZERO);
		this.zero.onDown.add(this.zeroPress, this, 0, this.binaryText);

		this.zeroNumpad = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
		this.zeroNumpad.onDown.add(this.zeroPress, this, 0, this.binaryText);

		this.one = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
		this.one.onDown.add(this.onePress, this, 0, this.binaryText);

		this.oneNumpad = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
		this.oneNumpad.onDown.add(this.onePress, this, 0, this.binaryText);

		this.del = this.input.keyboard.addKey(Phaser.Keyboard.DELETE);
		this.del.onDown.add(this.delete, this);

		this.ent = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.ent.onDown.add(this.generate, this);
	},

	onePress: function(){
		if(this.length < this.maxLength){
			this.binaryText.setText(this.binaryText.text+"1");
			this.binary.push(1);
			this.length++;
		}
	},

	zeroPress: function(){
		if(this.length < this.maxLength){
			this.binaryText.setText(this.binaryText.text+"0");
			this.binary.push(0);
			this.length++;
		}
	},

	delete: function(){
		if(this.length>0){
			this.binaryText.setText(this.binaryText.text.substring(0,this.binaryText.text.length-1));
			this.binary.pop();
			this.length--;
		}
	},

	generate: function(){
		this.state.start("Info", false, false, new Rythm(this.binary));
	}
};
