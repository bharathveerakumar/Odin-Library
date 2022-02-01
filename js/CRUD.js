import { Books } from "./Model.js";

const collectionList=document.querySelector('.coll'),
collectionChild=document.querySelector('.collChild')

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

export function setLocal(item, books){
    localStorage.setItem(`${item}`, JSON.stringify(books));
}

function objExists(collection, obj){
    return collection.find((data)=>{
        return data.title==obj.title;
    })
}

export function collectionNameRend(collections, obj){
    collectionChild.innerHTML='';
    for(var key in collections.cName){
        collectionChild.innerHTML+=`
                                <div>
                                    <input type="checkbox" data-key="${key}"  
                                    ${!objExists(collections.cName[key], obj)?"":"checked"}>
                                    <label>${key}</label>
                                </div>`
    }
}
