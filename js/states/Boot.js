var BasicApp = {};

BasicApp.Boot = function (app) {

};

BasicApp.Boot.prototype = {

    init: function () {

        this.input.maxPointers = 1;

        //  pause game if the tab loses focus
        this.stage.disableVisibilityChange = true;

		//game.time.advancedTiming = true;

        if (this.game.device.desktop)
        {
			this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
			//this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			this.scale.setMinMax(640, 360, 1920, 1080);

			this.scale.setResizeCallback(function(){
				var scale = Math.min(window.innerWidth / this.game.width, window.innerHeight / this.game.height);
				this.scale.setUserScale(scale,scale,0,0);
			},this);
			this.scale.refresh();
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            this.scale.setMinMax(640, 360, 1920, 1080);
            //this.scale.forceLandscape = true;
			this.scale.forceOrientation(true);
            this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			this.time.desiredFps = 25;

			this.scale.setResizeCallback(function(){
				var scale = Math.min(window.innerWidth / this.game.width, window.innerHeight / this.game.height);
				this.scale.setUserScale(scale,scale,0,0);
			},this);
			this.scale.refresh();
        }
    },

    preload: function () {
			this.load.image("back", "images/Back.png");
			this.load.image("generate", "images/Generate.png");
			this.load.image("textfield", "images/Input.png");
			this.load.image("play", "images/Play.png");
      this.load.image("stop", "images/Stop.png");
    },

    create: function () {
			graphics = this.add.graphics(0, 0);
			this.state.start('Input', false);
    }

};
