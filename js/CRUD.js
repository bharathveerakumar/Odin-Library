import { Books } from "./Model.js";


export function createBook(forms){
    const book=new Books(forms['title'].value, 
    forms['author'].value, forms['totpag'].value,
    forms['pagcom'].value, false)
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
