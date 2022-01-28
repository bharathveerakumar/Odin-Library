export class Books{

    constructor(title, author, totPag, noPag, isCom){
        this.title=title,
        this.author=author,
        this.totPag=totPag,
        this.noPag=noPag,
        this.isCom=isCom,
        this.books=[]
    }

    bookInit(Books){
        this.books=Books;
        console.log(this.books)
    }

    addBooks(book){
        this.books.push(book);
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    readBooks(){
        return this.books;
    }

    searchBooks(title){
        return this.books.find((e)=>{
            return e.title===title;
        })
    }

}





