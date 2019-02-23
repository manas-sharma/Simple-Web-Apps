var num1="",num2="",op=""; // num1, num2 are the operands and op is the operator

$("button").click(function(){
  var clickedButton = $(this).text();
  if(!isNaN(clickedButton)){ // Checking if clickedButton is a number
    if(num1=="" || op==""){ // Checking to see if the clicked number is to be added to num1 or num2
      num1+=clickedButton;
      displayResult(num1);
    }      
    else{
      num2+=clickedButton;
      displayResult(num2);
    }     
  }
  else if(clickedButton=="CLEAR"){ // Checking if clickedButton is CLEAR
    num1=num2=op="";
    displayResult(num1);
  }
  else if(clickedButton=="="){ // Checking if clickedButton is "="
    if(num1!="" && num2!=""){ 
      num1 = getResult(num1,num2,op);
      displayResult(num1);
      num1=num2=op="";
      }
    else{
      displayResult(num1);
    }
  }
  else if(clickedButton=="."){ // Checking if clickedButton is a decimal point
    if(num1=="" || op==""){ // Checking to see if the decimal point is to be added to num1 or num2
      if(num1=="")
        num1+="0";
      if(num1.indexOf('.')===-1) //Checking if the num1 already has a decimal point
        num1+=clickedButton;
    }      
    else{
      if(num2=="")
        num2+="0";
      if(num2.indexOf('.')===-1) //Checking if the num2 already has a decimal point
        num2+=clickedButton;
    }      
  }
  else{// Checking if clickedButton is an operator
    if(num2!=""){ // For continuous calculation e.g 7+5*8+6-9....=
      num1 = getResult(num1,num2,op);
      displayResult(num1);
      num2="";
    }
    op = clickedButton;
    if($(".screen").text()!=="") // For continuing calculation after pressing "=" e.g 7+5=12+5*8-9/2....=
      num1=$(".screen").text();
  }
});

function getResult(n1,n2,op1){ //Calculates and returns result
  var number1=parseFloat(n1);
  var number2=parseFloat(n2);
  switch(op1){
    case '+':return number1+number2;break;
    case '-':return number1-number2;break;
    case '/':return number1/number2;break;
    case 'x':return number1*number2;break;
    case '%':return (number1/100)*number2;break;
    default: return number1;
  }
}

function displayResult(num){ // Displays the result on screen
  $(".screen").text(num);
}