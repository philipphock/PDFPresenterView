function PresentationController(){
    this.numsym = 0;
    this.presentation;
    var self = this;
    
    this.init = function(p){
        self.presentation = p;
        $(window).on("keyup",function(e){
            if (e.keyCode >= 48 && e.keyCode <= 57){
                var c = e.keyCode - 48;

                self.numsym*=10;
                self.numsym+=c;

                setTimeout(function(){
                    self.numsym=0;
                },5000);
            }
            switch (e.keyCode){
                case 13: //enter
                    if(self.numsym === 0){
                        self.launchIntoFullscreen(document.documentElement);    
                    }else{
                        self.presentation.goto(self.numsym);
                        self.numsym=0;
                    }

                break;

                case 71: //g
                break;

                case 33: //pgup
                case 37: // <-
                    self.presentation.prev();
                    
                break;

                case 34: //pgdown
                case 39: //->
                    self.presentation.next();
                break;

                case 190:
                    $("body").toggle();
                    break;



            }
         });
    };
    
    this.getTimer = function(){
        var ts =  $("input[type='time']").val().split(":");
        ts = parseInt(ts[0])*60+parseInt(ts[1]);
        return ts;
    };
    
    this.fullscreenify = function(canvas) {
        var style = canvas.getAttribute('style') || '';

        window.addEventListener('resize', function () {resize(canvas);}, false);

        resize(canvas);

        function resize(canvas) {
            var scale = {x: 1, y: 1};
            scale.x = (window.innerWidth - 10) / canvas.width;
            scale.y = (window.innerHeight - 10) / canvas.height;

            if (scale.x < 1 || scale.y < 1) {
                scale = '1, 1';
            } else if (scale.x < scale.y) {
                scale = scale.x + ', ' + scale.x;
            } else {
                scale = scale.y + ', ' + scale.y;
            }

            canvas.setAttribute('style', style + ' ' + '-ms-transform-origin: center top; -webkit-transform-origin: center top; -moz-transform-origin: center top; -o-transform-origin: center top; transform-origin: center top; -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1); -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');');
        }

    };
    
    this.launchIntoFullscreen = function(element) {
        if(element.requestFullscreen) {
          element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      };

};




 
