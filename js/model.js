import { setLocal, collectionNameRend } from "./CRUD.js";


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
        setLocal('books', this.books)
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
        setLocal('books', this.books)
    }

    updateCom(title){
        const i=this.books.findIndex((e)=>{
            return e.title===title
        })
        this.books[i].isCom=!this.books[i].isCom;
        setLocal('books', this.books)
    }

}


export class Collections{

    constructor(collection){
        this.cName=collection
    }

    init(name){
        this.cName[name]=[];
    }

    addCName(name, obj){
        if(!this.cName.hasOwnProperty(name)){
            this.init(name);
        }
        this.cName[name].push(obj);
        collectionNameRend(this, obj);
        setLocal('collections', this.cName);
    }

    deleteOrAdd(key, obj){
        let objExists=this.cName[key].find((e)=>{
            return e.title===obj.title;
        })

        if(!objExists){
            this.cName[key].push(obj)
        }
        else{
            let replace=this.cName[key].filter((e)=>{
                return e.title!==obj.title;
            })
            this.cName[key]=replace;
        }
        
        setLocal('collections', this.cName);
    }

}






