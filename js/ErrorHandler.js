const errMsg=document.querySelector('.errmsg')

function errDisp(){
    errMsg.classList.add('trans')
    setTimeout(()=>{
        errMsg.classList.remove('trans')
    }, 3000)
}

export function errors(staCode, all){
    if(staCode===200) errDisp();
    switch(staCode){
        case 100:{
            errMsg.innerHTML='<h2>fill the form fully!!!</h2>'
            if(!all) break;
        }
        case 300:{
            errMsg.innerHTML='<h2>Title Already Exists!!!</h2>'
            if(!all) break;
        }
    }
}