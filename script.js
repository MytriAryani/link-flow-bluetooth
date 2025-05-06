const shareButton=document.querySelector("#share-button");
shareButton.addEventListener("click", async()=>{
 const name= document.querySelector("#name").value.trim();
 const phone= document.querySelector("#phone").value.trim();
 const status= document.querySelector("#status");
 const data={
    name,
    phone
 }

 const jsonString=JSON.stringify(data,null,2);

 const file = new Blob([jsonString],{type:"application/json"});

 const textFile= new File([file],"data.txt",{
    type:"text/plain" });


 
});