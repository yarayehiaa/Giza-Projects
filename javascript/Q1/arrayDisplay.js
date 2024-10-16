numArray = [];
addbtn=document.getElementById("addBtn");
displaybtn=document.getElementById("displayBtn");
addbtn.addEventListener("click",function(){
    input=document.getElementById("input");
    numArray.push(input.value);
    console.log(numArray);
});

displaybtn.addEventListener("click",function(){
    numArray.forEach(function(num,idx){
       
    document.getElementById("display").innerHTML+='Element '+idx+' = '+num+'<br>';
    });
});