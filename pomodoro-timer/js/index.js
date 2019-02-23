$(document).ready(function(){
  var pMinutes, bMinutes, minutes, timer, breakTime, running, seconds; 
  /*
  pMinutes-->Pomodoro Minutes or session length
  bMinutes-->Break Mminutes or break length
  minutes-->The minutes (session or break) currently on display
  timer-->setInterval variable used for calling display after every 1 second
  breakTime-->To check if it's work time or break time
  running-->To check if the countdown is running or not
  seconds-->The number of seconds (session or break) on display
  */
  
  //Initial Display
  setValues();  
  display();

  //When play button is pressed
  $("#startTimer").click(function(){
    $("#pauseTimer").removeClass("disabled");
    $("#startTimer").addClass("disabled");
    $("#pomodoroSlider").prop("disabled",true);
    $("#breakSlider").prop("disabled",true);
    running=true;
    timer = window.setInterval(display,1000); //Functionality that calls display function after every 1 sec
  });

  //When pause button is pressed
  $("#pauseTimer").click(function(){ 
    timerStopped();
  });

  //When reset button is pressed
  $("#resetTimer").click(function(){
    timerStopped();
    setValues();
    display();
  });
  
  //When the sliders are moved to select length of session and break intervals
  $("#pomodoroSlider, #breakSlider").change(function(){
    setValues();
    display();
  });
  
  //Operations performed when timer is stopped
  function timerStopped(){
    window.clearInterval(timer); //timer variable cleared, so that display function isn't called henceforth
    $("#pauseTimer").addClass("disabled");
    $("#startTimer").removeClass("disabled");
    $("#pomodoroSlider").prop("disabled",false);
    $("#breakSlider").prop("disabled",false);
    running=false;
  }
  
  //Initialize values
  function setValues(){
    pMinutes=$("#pomodoroSlider").val();
    bMinutes=$("#breakSlider").val();
    seconds=0;
    minutes=pMinutes;
    breakTime=false;
    running=false;
  }
  
  //Function that displays all dyanmic content
  function display(){
    //Checking if the session or break is over and switching over
    if(minutes==0 && seconds==0){
      breakTime=!breakTime;
      audiotag1.play();
      
    if(breakTime)
      minutes=bMinutes;     
    else
      minutes=pMinutes;      
    }
    
    //Resetting the minute and second hand after the completion of a minute
    if(seconds==-1){
      seconds=59;
      minutes-=1;
    }
    
    //Making sure that 2 digits are displayed even when the seconds and/or minutes are 1 digit numbers
    if(minutes<10 && seconds<10)
      $(".timerDisplay").text("0"+minutes+":0"+seconds--);
    else if(minutes<10)
      $(".timerDisplay").text("0"+minutes+":"+seconds--);
    else if(seconds<10)
      $(".timerDisplay").text(minutes+":0"+seconds--);
    else
      $(".timerDisplay").text(minutes+":"+seconds--);
    
    //Checking the state of the Timer
    if(!running){
      $(".timerState").text("INITIATE");
      $(".timerState").css("color","#000");
    }      
    else if(running && breakTime){
      $(".timerState").text("BREAK");
      $(".timerState").css("color","#d9534f");
    }      
    else if(running && !breakTime){
      $(".timerState").text("WORK");
      $(".timerState").css("color","#5cb85c");
    }      
  }  
});