
function Presentation(){
    this.notes;
    this.endseconds;
    this.controller;
    this.pdfjs;
    this.pdfFile;
    this.pdfDocument;

    this.presenterView;
    this.slideIndex = 0;
    var self = this;
    
    this.cview;
    this.cbuffer;
    
    this.cbufferNum = -1;
    
    this.goto = function(num){
        function getPage(num,loaded){
            self.pdfDocument.getPage(num).then(function(page){
        
            if (loaded){
                loaded(num,page);
            }
        });
        }
        
        self.slideIndex = num;
        if (num === self.cbufferNum){
            var tmp = self.cview;
            self.cview.addClass("buffer");
            self.cbuffer.removeClass("buffer");
            self.cview = self.cbuffer;
            self.cbuffer = tmp;
            //updatePresenter();


        }else{
            getPage(num,function(n,page){
               self.show(page);
            });
        }
        var nextpage = num+1;
        getPage(nextpage,function(n,page){
           self.prerender(page);
           self.cbufferNum = nextpage;
        });
    };
    
    this.getSlideIndex = function(){
        return self.slideIndex;
    };


    this.next = function(){
        var i = self.getSlideIndex();
        i++;
        self.goto(i);
    };

    this.prev = function(){
        var i = self.getSlideIndex();
        if (i === 1) return;
        i--;
        self.goto(i);
    };

  
    this.init = function(ctrl,pdfjs,buffer0,buffer1){
         self.controller = ctrl;
         self.pdfjs = pdfjs;
         self.cview  = buffer0;
         self.cbuffer  = buffer1;
    };
    
    this.load = function(url){
        self.pdfjs.disableWorker = true;

        var fileReader = new FileReader();
        fileReader.onload = function(evt) {
        var buffer = evt.target.result;
        var uint8Array = new Uint8Array(buffer);

        self.pdfjs.getDocument(uint8Array).then(function(pdff) {
          self.pdfDocument = pdff;
          self.goto(1);
        });

      };
      fileReader.readAsArrayBuffer(url);
        
    };
    this.start = function(){
        self.load(self.pdfFile);
        self.endseconds = self.controller.getTimer();
        
    };
    this.openPresenterView = function(){
          self.presenterView = window.open("sys/presenterview.html");
    };
    
    this.updatePresenter = function(){
        var snum = self.getSlideIndex()+"/"+self.pdfDocument.numPages;
        var vc=self.cview[0].toDataURL("image/jpg");
        var vn=self.cbuffer[0].toDataURL("image/jpg");
        var s = {num:snum,currentslide:vc,nextslide:vn,notes:self.getPresenterNotes(),endseconds:self.endseconds};
         //TODO send to pw
        self.presenterView.postMessage(s,"*");
    };
    
    this.onSlideChanged = function(){
        var slideNum = SLIDE.getIndex();
        self.updatePresenter(slideNum);
    };
    
    this.render = function(page, context, viewport,after){
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext).then(after);

    };
    
    this.prerender = function(page){
        var canvas = self.cbuffer[0];
        var context = canvas.getContext('2d');
        var viewport = self.viewport(page,canvas);
        
        self.controller.fullscreenify(canvas);

       
        self.render(page,context,viewport,function(){
            self.updatePresenter();
        });
    };
    
    this.viewport = function(page,canvas){
        
  
        canvas.height = $(window).height()-10;
        var scale = canvas.height / page.getViewport(1.0).height;
        canvas.width = page.getViewport(1.0).width*scale;
        
        var viewport = page.getViewport(scale);
        return viewport;
        
    };
    this.show = function(page){
        var canvas = self.cview[0];
        var viewport = self.viewport(page,canvas);
        var context = canvas.getContext('2d');
       
        self.controller.fullscreenify(canvas);
        self.render(page,context,viewport);
    };
    
    this.loadNotes = function(path){
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.

              self.notes = $($.parseHTML(e.target.result));
            };
          })(path);
          // Read in the image file as a data URL

        reader.readAsText(path);
     };
     
     this.getPresenterNotes = function(){
        var i = "#"+self.getSlideIndex();
        if (this.notes)
            return self.notes.find(i).prop("outerHTML");

        return "";
    };

    
};



























