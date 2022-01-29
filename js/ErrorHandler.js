const errMsg=document.querySelector('.errmsg')

function errDisp(){
    errMsg.classList.add('active')
    setTimeout(()=>{
        errMsg.classList.remove('active')
    }, 3000)
}

export function error(staCode){
    errDisp();
    switch(staCode){
        case 100:{
            errMsg.innerHTML='<h2>fill the form fully!!!</h2>'
            break;
        }
        case 300:{
            errMsg.innerHTML='<h2>Title Already Exists!!!</h2>'
            break;
        }
    }
}