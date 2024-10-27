const dropdown1=document.getElementById('currencyDropdown1');
const dropdown2=document.getElementById('currencyDropdown2');
let country1,country2;


dropdown1.addEventListener('change',function(){
    flag=document.getElementById('flag1');
    oldflag=flag.classList.item(1);
    lowercase=dropdown1.value.toLowerCase();
    newflag=`currency-flag-${lowercase}`;
    flag.classList.replace(oldflag,newflag);
    country1=dropdown1.value;
    let list=document.getElementById('json-datalist2').options;
   
    for (let i = 0; i < list.length; i++) {
        if (list[i].value==country1){
            list[i].remove();
            break;
        }
        else{
            list[i].style.display='block';
        }
    }
    return dropdown1.value;
});


dropdown2.addEventListener('change',function(){
    flag=document.getElementById('flag2');
    oldflag=flag.classList.item(1);
    lowercase=dropdown2.value.toLowerCase();
    newflag=`currency-flag-${lowercase}`;
    flag.classList.replace(oldflag,newflag);
    country2=dropdown2.value;
    let list=document.getElementById('json-datalist1').options;
    for (let i = 0; i < list.length; i++) {
        if (list[i].value==country2){
            list[i].style.display='none';
        }
        else{
            list[i].style.display='block';
        }
    }
    return dropdown2.value;
});

/* if(country1&country2{
    btns=document.getElementsByid('btns-wrapper').buttons;
    for (let i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains('active')){
            
    }

}) */

    