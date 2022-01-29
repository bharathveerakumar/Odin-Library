import { Books, BookStore } from "./js/Model.js";
import { formCheck, addNewBooks, createBook } from "./js/CRUD.js";
import { errors } from "./js/ErrorHandler.js";


const forms=document.querySelector('form')


// Iniatilzing books to array in constructors...
const localBooks=JSON.parse(localStorage.getItem('books'))??[];
const book=new BookStore()


//checking and adding the books to the storage...
forms.querySelector('form .but').addEventListener('click', ()=>{
    if(!formCheck(forms)) errors(100, false);
    else{
        const newBook=createBook(forms);
        addNewBooks(newBook, book)?errors(200, false):errors(300, false);
    }
})


