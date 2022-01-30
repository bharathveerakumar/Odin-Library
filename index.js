import { Books, BookStore, Collections } from "./js/Model.js";
import { formCheck, addNewBooks, createBook, newBookUsingTit } from "./js/CRUD.js";
import { error } from "./js/ErrorHandler.js";


// Iniatilzing books to array in constructors...
const localBooks=JSON.parse(localStorage.getItem('books'))??[],
localColl=JSON.parse(localStorage.getItem('collection'))??{},
book=new BookStore(localBooks),
collection=new Collections(localColl)


const addForm=document.querySelector('.addForm'),
updateForm=document.querySelector('.updateForm'),
view=document.querySelector('.view'),
addBut=document.querySelector('nav button'),
inputs=document.querySelectorAll('input'),
collectionList=document.querySelector('.coll'),
collBut=document.querySelector('.coll button'),
collInp=document.querySelector('.coll input')


//building books
function viewBookBuilder(){
    const books=book.readBooks();
    view.innerHTML='';

    books.forEach((e)=>{
        const bookCard=document.createElement('div')
        bookCard.className='bookCard';
        bookCard.innerHTML+=`
            <h2>${e.title}</h2>
            <h3>Total Pages ${ e.totPag }</h3>
            <h3>Pages Completed${ e.noPag }</h3>
            <div><label for="iscom">Completed? </label>
            <input type="checkbox" id="iscom" ${e.isCom?"checked":""} data-tit="${e.title}"></div>`
        
        bookCard.innerHTML+=`
            <div class="bookcardHov">
                <img src="./assets/bin.png" data-tit="${e.title}">
                <img src="./assets/update.png" data-tit="${e.title}">
                <img src="./assets/add-folder.png" data-tit="${e.title}">
            </div>`
                
        view.appendChild(bookCard)
    })

    document.querySelectorAll('.bookCard input').forEach((e)=>{
        e.addEventListener('change', ()=>{
            book.updateCom(e.dataset.tit)
        })
    })
}

viewBookBuilder()


//editing the z-index value..
inputs.forEach((e)=>{
    e.addEventListener('change', ()=>{
        if(e.value.length) e.style.zIndex=2;
        else e.style.zIndex=0;
    })
})


//toggle add form
addBut.addEventListener('click', ()=>{
    addForm.classList.toggle('active')
})


//checking and adding the books to the storage...
addForm.querySelector('.butadd').addEventListener('click', ()=>{
    if(!formCheck(addForm)) error(100);
    else{
        const newBook=createBook(addForm);
        addNewBooks(newBook, book)?error(200):error(300);
        addForm.classList.toggle('active')
        viewBookBuilder();
    }
})


//checking and updating the books to the storage...
updateForm.querySelector('.butupd').addEventListener('click', ()=>{
    if(!formCheck(updateForm)) error(100);
    else{
        const newBook=createBook(updateForm);
    }
})

let obj;

//collection form
document.querySelectorAll('.bookcardHov img').forEach((e)=>{
    e.addEventListener('click', ()=>{
        collectionList.classList.toggle('activ')
        obj=newBookUsingTit(e.dataset.tit, book)
    })
})

collBut.addEventListener('click', ()=>{
    collection.addCName(collInp.value, obj);
    console.log(collection)
})



