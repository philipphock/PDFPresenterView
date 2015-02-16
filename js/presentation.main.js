
var pcontroller = new PresentationController();
var fcontroller = new FirstpageController();
var presentation = new Presentation();

fcontroller.init(presentation);
pcontroller.init(presentation);
presentation.init(pcontroller,PDFJS,$("#c0"),$("#c1"));