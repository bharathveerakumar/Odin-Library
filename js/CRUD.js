import { Books } from "./Model.js";


export function createBook(forms){
    const book=new Books(forms['title'].value, 
    forms['author'].value, forms['totpag'].value,
    forms['pagcom'].value, forms['iscom'].checked)
    return book;
}

export function formCheck(form){
    if(!form['title'].value||!form['author'].value||!form['totpag'].value||!form['pagcom'].value){
        return false;
    }
    return true;
}

export function addNewBooks(newBook, book){
    if(!book.searchBooks(newBook.title)){
        book.addBooks(newBook)
        return true;
    }
    return false;
}

export function setLocal(books){
    localStorage.setItem('books', JSON.stringify(books));
}

export function newBookUsingTit(title, book){
    return book.searchBooks(title)
}
