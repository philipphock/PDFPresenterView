window.addEventListener("message", receiveMessage, false);
var endtimestamp = nnow();
var init = false;
function receiveMessage(event)
{
  var data = event.data;
  if(data.currentslide)
    $("#cur").attr("src",data.currentslide);

  if(data.nextslide)
    $("#nex").attr("src",data.nextslide);
  
  if(data.num)
    $("#slidenum").html(data.num);

    if(data.notes){
        $("#notes").html(data.notes);
    }else{
        $("#notes").html("");
    }
     // $("#notest").height(notesH);

    if(data.endseconds && !init){
        if (data.endseconds){
            endtimestamp = nnow()+data.endseconds;
            init = true;
        }
        
    }
    
}

function toTimeString(seconds){
    function prependZero(t){
        if(t<10)return "0"+t;
        return t;
    }
    var minutes = Math.floor(seconds / 60);
    var seconds = seconds - minutes * 60;
    return prependZero(minutes)+":"+prependZero(seconds);
}



function nnow(){
    return Math.floor(Date.now() / 1000);

}

function checkTime(){
    var $t = $("#timecur");
    var $tl = $("#timeleft");
    setTimeout(function (){
        checkTime();
    },1000);
    var d = new Date();
    var datetext = d.toTimeString();
    var datetext = datetext.split(' ')[0];
    $t.text(datetext);
    
    var n = nnow();
    var left;
    if(endtimestamp<n){
        left =  n-endtimestamp;
    }else{
        left =  endtimestamp-n;
    }
    
    $tl.text(toTimeString(left));    
}

checkTime();

var notesH;
$(document).ready(function(){
   // notesH = $("#notest").height();
    //fix height to 100% of origin
});