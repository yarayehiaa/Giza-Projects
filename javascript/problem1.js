function prePostFix(string){
   

   let outputMsg=  (string.length <= 3) ? 'String is too short' : string.slice(-3)+string+string.slice(-3);
   return outputMsg

}
console.log(prePostFix('swift'));
