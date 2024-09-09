const email = document.getElementById("email")
const passwd = document.getElementById("password")
const msg = document.getElementById("msg")
const pmsg = document.getElementById("pmsg")
const btn = document.getElementById("submitbtn")

async function getdata(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const result = await response.json();
    console.log(result)

    if(result.some(element => element.email == email.value)){
        result.forEach(element =>{
            email.style.borderColor ="black"
            msg.innerText =" "

            if(element.email == email.value){
                
                if(element.username == passwd.value){
                    passwd.style.borderColor ="black"
                    window.location.assign("http://127.0.0.1:5501/index.html")
                    sessionStorage.setItem("email",element.email)
                    pmsg.innerText = "";
                    
                }else{
                    console.log("Not Allowed");
                    pmsg.innerText = "Wrong password Address";
                    passwd.style.borderColor ="red"
        
                }
        
            }
    
        })

    }else{
        msg.innerText ="Wrong Email Address"
        email.style.borderColor ="red"


    }
    
  
    

}
btn.addEventListener("click",()=>{
    getdata()

})
