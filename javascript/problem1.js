function myFunc(string){
   

   let msg=  (string.length <= 3) ? 'String is too short' : string.slice(-3)+string+string.slice(-3);
   return msg

}
console.log(myFunc('swift'));