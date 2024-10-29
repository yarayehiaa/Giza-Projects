arr1 = [1,0,2,3,4]; 
arr2 = [3,5,6,7,8,13];


function twoArraySum(arr1, arr2) {
    res=[];
    shortarr = arr1.length > arr2.length ? arr2 : arr1;
    shortarr.push(...Array(Math.abs(arr1.length - arr2.length)).fill(0));
    for (let i = 0; i < shortarr.length; i++) {
        let sum = 0;
        sum += arr1[i];
        sum += arr2[i];
        res.push(sum);
    }
    return res;
}

console.log(twoArraySum(arr1, arr2));