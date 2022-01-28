import { Books } from "./js/model.js";

const book=new Books()

// Iniatilzing books to array in constructors...
const localBooks=JSON.parse(localStorage.getItem('books'))??[];
book.bookInit(localBooks)


const forms=document.querySelector('form')

forms.querySelector('form .but').addEventListener('click', ()=>{
    if(!forms['title']||!forms['author']||!forms['totpag']||!forms['pagcom']||!forms['iscom']){
        console.log('fill fully!!!')
    }
    else{
        const newBook=new Books(forms['title'].value, 
        forms['author'].value, forms['totpag'].value,
        forms['pagcom'].value, false);
        book.addBooks(newBook);
    }
})

