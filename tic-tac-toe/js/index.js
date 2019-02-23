$(document).ready(function(){
  $(window).load(function(){
        $('#myModal').modal('show');
    });
  
  var compMove,userSymbol,aiSymbol;
  var cellNo={
    cell1:0,
    cell2:1,
    cell3:2,
    cell4:3,
    cell5:4,
    cell6:5,
    cell7:6,
    cell8:7,
    cell9:8,
  };
  var board=["","","","","","","","",""];
  
  $("#X").click(function(){
    userSymbol="X";
    aiSymbol="O"
  });
  $("#O").click(function(){
    userSymbol="O";
    aiSymbol="X"
  });
  $(".col-xs-4").click(userTurn);
  
  function userTurn(event){
    var cellID=event.target.id;
    if($("#"+cellID).html()==""){
      $("#"+cellID).html(userSymbol);
      board[cellNo[cellID]]=userSymbol;
      aiTurn(board);
    }
  }
  
  function aiTurn(newBoard){
    minimax(newBoard,"Comp");
    board[compMove]=aiSymbol;
    var pos=parseInt(compMove)+1;
    $("#cell"+pos).html(aiSymbol);
    if(winner(newBoard)!=="" && winner(newBoard)!==null && winner(newBoard)!==undefined){
      gameOver(newBoard);
    }
  }
  
  function minimax(newBoard,player){
    var winningPlayer = winner(newBoard);
    if(winningPlayer=="User"){
      return 10;
    }
    else if(winningPlayer=="AI"){
      return -10;
    }
    else if(winningPlayer=="Draw"){
      return 0;
    }
    
    var score=[];
    var moves=[];
    availableMoves(newBoard).forEach(function(position){
      newBoard[position]=(player === "Comp") ? aiSymbol : userSymbol;
      score.push(minimax(newBoard,(player === "Comp") ? "Human" : "Comp"));
      moves.push(position);
      newBoard[position]="";
    });
    
    if (player === "Comp") {
      // Comp takes move with min value as best move
      compMove = moves[score.indexOf(Math.min.apply(Math, score))];
      return Math.min.apply(Math, score);
    } else {
      // Else if player, comp tries to maximize
      compMove = moves[score.indexOf(Math.max.apply(Math, score))];
      return Math.max.apply(Math, score);
    }
  }
  
  function availableMoves(newBoard){
    var arr=[];
    for(var i=0;i<newBoard.length;i++){
      if(newBoard[i]=="")
        arr.push(i);
    }
    return arr;
  }
  
  function winner(newBoard){
    if(newBoard[0]==aiSymbol && newBoard[1]==aiSymbol && newBoard[2]==aiSymbol || 
       newBoard[3]==aiSymbol && newBoard[4]==aiSymbol && newBoard[5]==aiSymbol || 
       newBoard[6]==aiSymbol && newBoard[7]==aiSymbol && newBoard[8]==aiSymbol || 
       newBoard[0]==aiSymbol && newBoard[3]==aiSymbol && newBoard[6]==aiSymbol || 
       newBoard[1]==aiSymbol && newBoard[4]==aiSymbol && newBoard[7]==aiSymbol || 
       newBoard[2]==aiSymbol && newBoard[5]==aiSymbol && newBoard[8]==aiSymbol || 
       newBoard[0]==aiSymbol && newBoard[4]==aiSymbol && newBoard[8]==aiSymbol || 
       newBoard[2]==aiSymbol && newBoard[4]==aiSymbol && newBoard[6]==aiSymbol){
      return "AI";
    }
    
    if(newBoard[0]==userSymbol && newBoard[1]==userSymbol && newBoard[2]==userSymbol || 
       newBoard[3]==userSymbol && newBoard[4]==userSymbol && newBoard[5]==userSymbol || 
       newBoard[6]==userSymbol && newBoard[7]==userSymbol && newBoard[8]==userSymbol || 
       newBoard[0]==userSymbol && newBoard[3]==userSymbol && newBoard[6]==userSymbol || 
       newBoard[1]==userSymbol && newBoard[4]==userSymbol && newBoard[7]==userSymbol || 
       newBoard[2]==userSymbol && newBoard[5]==userSymbol && newBoard[8]==userSymbol || 
       newBoard[0]==userSymbol && newBoard[4]==userSymbol && newBoard[8]==userSymbol || 
       newBoard[2]==userSymbol && newBoard[4]==userSymbol && newBoard[6]==userSymbol){
      return "User";
    }
    
    var full = true;  
    for (var i = 0; i < newBoard.length; i++) {
    if (newBoard[i] == "") {
      full = false;
      }
    }
    if (full) {
      return "Draw";
    }
  }
  
  function gameOver(newBoard){
    if(winner(newBoard)=="AI"){
      alert("MATRIX WINS");
    }
    else if(winner(newBoard)=="Draw"){
      alert("TIE");
    }
    board=["","","","","","","","",""];
    $(".col-xs-4").html("");
  }
});