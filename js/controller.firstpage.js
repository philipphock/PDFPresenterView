function FirstpageController(){
    this.presentation;
    var self = this;
    this.init = function(p){
        self.presentation = p;
        $(".startbtn").click(function(){
        //window.location.href = "sys/pdfrender.html";
        $("#loader").hide();
        self.presentation.start();
    
        });

        $("#loadnotes").on("change",function(evt){
            var files = evt.target.files; // FileList object
            // Loop through the FileList and render image files as thumbnails.
            for (var i = 0, f; f = files[i]; i++) {
                self.presentation.loadNotes(f);
                return;
            }

        });



        $("#loadpdf").on("change",function(evt){
            var files = evt.target.files; // FileList object
            // Loop through the FileList and render image files as thumbnails.
            for (var i = 0, f; f = files[i]; i++) {

                self.presentation.pdfFile =  f;
                return;
            }

        });

        $("input[type=checkbox]").click(function(){
            var pv = self.presentation.presenterView;
            if(!pv || pv.closed){
                self.presentation.openPresenterView();
            }else{
                pv.close();    
            }

        });

       
    };
}



        