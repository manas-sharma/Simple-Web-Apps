$(document).ready(function(){
  var level=0;
  var strictEnabled=false;
  var currentSequence=0; 
  var seq=[];
  $(".pad").css('pointer-events', 'none');
  var soundURL = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];
  
  $("#start").click(function(){
    newGame();
  });
  
  $("#reset").click(resetGame);
  
  $("#strict").click(function(){
    resetGame();
    if($(this).prop("checked")===true){
      strictEnabled=true;
      $("#strictLabel").removeClass("label-default").addClass("label-warning");
    }      
    else{
      strictEnabled=false;
      $("#strictLabel").removeClass("label-warning").addClass("label-default");
    }
  })
  
  $(".pad").click(function(event){
      var padNo=parseInt(event.target.id.slice(-1));
      console.log("Clicked pad is "+padNo);
      userTurn(padNo);
  });
  
  function newGame(){
    resetGame();
    addToSequence();
    showSequence();
  }
  
  function resetGame(){
    level=0;
    currentSequence=0;
    seq=[];
    $(".pad").css('pointer-events', 'none');
    $("#display").text("--");
  }
  
  function addToSequence(){
    var randomNumber=Math.floor((Math.random()*4)+1);
    console.log("Random Number "+randomNumber);
    seq.push(randomNumber);
    level+=1;
  }
  
  function showSequence(){
    $(".pad").css('pointer-events', 'none');
    $("#display").text(level);
    for(var i=0; i<seq.length;i++){
      doSetTimeout(i);  
    }
    $(".pad").css('pointer-events', 'auto');
  }
  
  function doSetTimeout(i){
    var delay=600+(i*600);
    setTimeout(function(){
      glowButton(seq[i]);
    },delay);
  }
  
  function glowButton(padNo){
    playAudio(padNo);
    //$("#pad"+padNo).animate({opacity:.2},200).animate({opacity:1},100);
    switch(padNo){
      case 1: changeColor(padNo,"#397D02","#66CD00");break;
      case 2: changeColor(padNo,"#B22222","#FF3333");break;
      case 3: changeColor(padNo,"#CDCD00","#FFFF00");break;
      case 4: changeColor(padNo,"#236B8E","#0EBFE9");break;
    }
  }
  
  var audio = new Audio();
  function playAudio(padNo) {
    audio.src = (soundURL[padNo-1]);
    audio.play();
  }
  
  function changeColor(padNo,oldColor,newColor){
    $("#pad"+padNo).css("background-color",newColor);
    setTimeout(function(){
      $("#pad"+padNo).css("background-color",oldColor);
    },200);
    //$("#pad"+padNo).animate({opacity:.2},200).animate({opacity:1},100);
  }
  
  function userTurn(padNo){
    if(currentSequence<seq.length && padNo==seq[currentSequence]){
      glowButton(padNo);
      currentSequence++;
      
      if(currentSequence==seq.length){
      if(currentSequence==20){
        $("#display").text("YOU WON :)");
        setTimeout(function(){
          resetGame();
        },1000);      
      }
      else{
        $("#display").text("PERFECT");
        currentSequence=0;
        setTimeout(function(){
          addToSequence();
          showSequence();
        },1000);
       }
      }
    }
    
    else if(padNo!=seq[currentSequence]){
      $("#display").text("WRONG!!");
      currentSequence=0;
      choiceEnabled=false;
      
      if(strictEnabled===true){
        setTimeout(function(){
          newGame();
        },1000);
      }      
      else{
        setTimeout(function(){
          showSequence();
        },1000);
      }        
    } 
  }
});