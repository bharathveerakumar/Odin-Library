import { Books, BookStore, Collections } from "./js/Model.js";
import { formCheck, addNewBooks, createBook, collectionNameRend } from "./js/CRUD.js";
import { error } from "./js/ErrorHandler.js";


// Iniatilzing books to array in constructors...
const localBooks=JSON.parse(localStorage.getItem('books'))??[],
localColl=JSON.parse(localStorage.getItem('collections'))??{},
book=new BookStore(localBooks),
collection=new Collections(localColl)


const addForm=document.querySelector('.addForm'),
updateForm=document.querySelector('.updateForm'),
view=document.querySelector('.view'),
addBut=document.querySelector('nav button'),
inputs=document.querySelectorAll('input'),
collectionList=document.querySelector('.coll'),
collBut=document.querySelector('.coll button'),
collInp=document.querySelector('.coll input'),
collCan=document.querySelector('.coll img'),
uptBut=document.querySelector('.butupd')


//for retriving objects from title which in img tag...
let obj;


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
                <img src="./assets/bin.png" data-tit="${e.title}" class="delete">
                <img src="./assets/update.png" data-tit="${e.title}" class="update">
                <img src="./assets/add-folder.png" data-tit="${e.title}" class="addColl">
            </div>`
                
        view.appendChild(bookCard)
    })

    document.querySelectorAll('.bookCard input').forEach((e)=>{
        e.addEventListener('change', ()=>{
            book.updateCom(e.dataset.tit)
        })
    })
    deleteBookAdder()
    addCollection()
    updateBook()
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


//toggle update form
function updateBook(){
    document.querySelectorAll('.update').forEach((e)=>{
        e.addEventListener('click', ()=>{
            updateForm.classList.toggle('active')
            obj=book.searchBooks(e.dataset.tit);
        })
    })
}


//for delete the book from the bookstore and collections...
function deleteBookAdder(){
    document.querySelectorAll('.delete').forEach((e)=>{
        e.addEventListener('click', ()=>{
            book.deleteBook(e.dataset.tit)
            collection.deleteEntirely(e.dataset.tit)
            viewBookBuilder();
        })
    })
}


//toggle the collection form...
function addCollection(){
    const addBookToColl=document.querySelectorAll('.addColl')

    addBookToColl.forEach((e)=>{
        e.addEventListener('click', ()=>{
            collectionList.classList.toggle('activ')
            obj=book.searchBooks(e.dataset.tit);
            collectionNameRend(collection, obj);
        
            document.querySelectorAll('.collChild input').forEach((e)=>{
                e.addEventListener('change', ()=>{
                    collection.deleteOrAdd(e.dataset.key, obj);
                })
            })
        })
    })
}


//to add the new field in collections...
collBut.addEventListener('click', ()=>{
    if(!collInp.value) return error(100);
    collection.addCName(collInp.value, obj);
})


//close the collection form...
collCan.addEventListener('click', ()=>{
    collectionList.classList.toggle('activ')
})


//close the update form
document.querySelector('.updateForm img').addEventListener('click', ()=>{
    updateForm.classList.toggle('active')
})


document.querySelector('.butupd').addEventListener('click', ()=>{

    if(!formCheck(updateForm)) return error(100);
    const newBook=createBook(updateForm);
    if(!book.searchBooks(newBook.title)){
        book.findAndReplace(obj.title, newBook),
        collection.updateEntirely(obj.title, newBook),
        updateForm.classList.remove('active')
    }
    else error(300)

})
