import { setLocal } from "./CRUD.js";


export class Books{

    constructor(title, author, totPag, noPag, isCom){
        this.title=title,
        this.author=author,
        this.totPag=totPag,
        this.noPag=noPag,
        this.isCom=isCom
    }

}

export class BookStore{

    constructor(books){
        this.books=books;
    }

    addBooks(book){
        this.books.push(book);
        setLocal(this.books)
    }

    readBooks(){
        return this.books;
    }

    searchBooks(title){
        return this.books.find((e)=>{
            return e.title===title;
        })
    }

    updateBooks(book){
        const i=this.books.findIndex((e)=>{
            return e.title===book.title;
        })
        this.books[i]=book;
        setLocal(this.books)
    }

    updateCom(title){
        const i=this.books.findIndex((e)=>{
            return e.title===title
        })
        this.books[i].isCom=!this.books[i].isCom;
        setLocal(this.books)
    }

}


export class Collections{

    constructor(collection){
        this.cName=collection
    }

    init(name){
        console.log(this.cName[name].length)
        this.cName[name]=[];
    }

    addCName(name, obj){
        if(!this.cName[name].length) this.init(name);
        this.cName[name].push(obj);
    }

}






