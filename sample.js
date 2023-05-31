const express=require('express')

var x=10;


var A=[19,2,30,4,7,9];

var B =[11,10,12,13,14];

const sort =A.concat(B);

console.log(sort);
var k;
for(var i=0;i<sort.length;i++)
{
    for(var j=i+1;j<sort.length;j++)
    {
        if(sort[i]>sort[j])
        {
            k =sort[i];
            sort[i]=sort[j];
            sort[j]=k;
        }
    }
}

console.log(sort);

for(var i=0;i<sort.length;i++)
{
    if(sort[i]==x)
    {
        console.log('Item Found ');
        break;
    }
   
    
}
