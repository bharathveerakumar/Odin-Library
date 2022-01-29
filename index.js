import { Books, BookStore, Collections } from "./js/Model.js";
import { formCheck, addNewBooks, createBook } from "./js/CRUD.js";
import { error } from "./js/ErrorHandler.js";


// Iniatilzing books to array in constructors...
const localBooks=JSON.parse(localStorage.getItem('books'))??[];
const book=new BookStore(localBooks);


const addForm=document.querySelector('.addForm'),
updateForm=document.querySelector('.updateForm'),
view=document.querySelector('.view'),
addBut=document.querySelector('nav button'),
inputs=document.querySelectorAll('input')


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
                
        view.appendChild(bookCard)
    })

    document.querySelectorAll('.bookCard input').forEach((e)=>{
        e.addEventListener('change', ()=>{
            book.updateCom(e.dataset.tit)
        })
    })
}


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
    }
    viewBookBuilder();
})


//checking and updating the books to the storage...
updateForm.querySelector('.butupd').addEventListener('click', ()=>{
    if(!formCheck(updateForm)) error(100);
    else{
        const newBook=createBook(updateForm);
    }
})


viewBookBuilder()

