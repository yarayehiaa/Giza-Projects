function myFunc(string){
    if(string.length <= 3) {
        return 'String is too short';
    }
    return string.slice(-3)+string+string.slice(-3);

}
console.log(myFunc('swift'));