//*fetched items to work on--------------------------------------
let passwordDisplay=document.querySelector('.inputbar');
let copyClipboard=document.querySelector('.copy');
let copyContent=document.querySelector('.copy-inactive');
let lengthDisplay=document.querySelector('.length');
let sildeBar=document.querySelector('#slider');
let number=document.querySelector('#number');
let uppercase=document.querySelector('#uppercase');
let lowercase=document.querySelector('#lowercase');
let symbol=document.querySelector('#symbol');
let indicator=document.querySelector('.indicat');
let generateBtn=document.querySelector('.final');
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


//* functionalities and listners---------------------------------------------

let password="";
let passwordLength=10;
let count=0;
setIndicator("#ccc");

function setlength()
{
   sildeBar.value=passwordLength;
   lengthDisplay.innerHTML=passwordLength;  

   let min=sildeBar.min;
   let max=sildeBar.max;
   sildeBar.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"    
}

setlength();

function setIndicator(color)
{
 indicator.style.backgroundColor=color;
 indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function generateRandomNumber(min,max)
{
    return Math.floor(Math.random()*(max-min))+min;
}

function generateInteger()
{
    return generateRandomNumber(0,9);
}
function generateUpper()
{
    return String.fromCharCode(generateRandomNumber(65,91));
}
function generateLower()
{
    return String.fromCharCode(generateRandomNumber(97,123));
}
function generateSymbol()
{
    let index=generateRandomNumber(0,symbols.length)
    return symbols[index];
}


let checkboxAll=document.querySelectorAll('.checkb');



function calculateStrength()
{
let total=0;
checkboxAll.forEach((checkbox)=>{if(checkbox.checked) total++;})
console.log(total)
if(total==4 || (total>=3 && passwordLength>=8))
{
console.log("strong")
setIndicator("#0f0");
}
else if(total<=3 && passwordLength>=6 )
{
    console.log("medium");
    setIndicator("#ff0");
}
else
{
    console.log("weak");
    setIndicator("#f00");
}
}

function setBar()
{
    count=0;
    checkboxAll.forEach((checkbox)=>{if(checkbox.checked) count++;})
    
    if(passwordLength<count)
    {
        passwordLength=count;
        setlength();
    }
}

sildeBar.addEventListener('input',(e)=>{
 passwordLength=e.target.value;
 setlength();
});

checkboxAll.forEach((checkbx)=>{
    checkbx.addEventListener('change',setBar);
})


async function copyit()
{
    try{
        if(password!="")
       { await navigator.clipboard.writeText(passwordDisplay.value);
        console.log('copied');
        copyContent.classList.add("copy-active");
       }
    }
    catch(e)
    {
        console.log('failed');
    }

    setTimeout(function()
    {
        copyContent.classList.remove("copy-active");
    },2000)
}

copyClipboard.addEventListener('click',copyit
)
function shuffle(array)
{
 for(let i=array.length-1;i>0;i--)
 {
    let j=Math.floor(Math.random()*(i+1));
    let temp=array[j];
    array[j]=array[i];
    array[i]=temp;
 }
 
 let str="";
 array.forEach((it)=>{str+=it});
 return str;
}

generateBtn.addEventListener('click',function()
{password="";
    let fun=[];
   if(number.checked)fun.push(generateInteger);
   if(lowercase.checked)fun.push(generateLower);
   if(uppercase.checked)fun.push(generateUpper);
   if(symbol.checked)fun.push(generateSymbol);

   //compulsary additions
   for(let i=0;i<fun.length;i++)
   {
     password+= fun[i]();
   }
//    console.log(password);
   //rest additions
    for(let i=0;i<passwordLength-fun.length;i++)
    {
      let ind=Math.floor(Math.random()*(fun.length));
      password+=fun[ind]();  
    }
    
    password=shuffle(Array.from(password));
    console.log(password);
    passwordDisplay.value=password;
    calculateStrength();

    
})