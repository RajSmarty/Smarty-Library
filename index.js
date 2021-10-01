console.log('This is ES6 version of Project 2');
showNotes();

class Book {
    constructor(bookName, author, type) {
        this.bookName = bookName;
        this.author = author;
        this.type = type;
    }
}

class Display {

    // add(book) {
    //     console.log("Adding to UI");
    //     let tableBody = document.querySelector('.tableBody');
    //     let uiString = `<tr>
    //                         <td>${book.name}</td>
    //                         <td>${book.author}</td>
    //                         <td>${book.type}</td>
    //                         <button id= "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
    //                     </tr>`;
    //     tableBody.innerHTML += uiString;
    // }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        // let bookName = document.getElementById('bookName');
        // let author = document.getElementById('author');
        // let notes = localStorage.getItem('notes');
        // let text = localStorage.getItem('text');
        // let libraryForm = document.getElementById('libraryForm');


        if (book.bookName === null || book.author === null) {
            return false;
        }
        else {
            return true;
        }

    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 2000);

    }
}

//--------------------->>>>>>>>>>>      STARTS Added to LOCALSTORAGE by Click Event

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function (e) {

    let bookName = document.getElementById('bookName');
    let author = document.getElementById('author');
    let typeOf = document.querySelector('typeOf');

    let notes = localStorage.getItem('notes');


    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);

    }

    let Obj = {
        bookName: bookName.value,
        author: author.value,
        typo: typeOf
    }

    notesObj.push(Obj);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    bookName.value = '';
    author.value = '';
    // console.log(notesObj);  //For Debugging 
    showNotes();

});
//<<<<<<<<<<------------------------ENDS    Added to LOCALSTORAGE by Click Event



//--------------------->>>>>>>>>>>>>>       STARTS To Show-Function which is saved in LOCALSTORAGE

function showNotes() {

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = '';
    notesObj.forEach(function (element, index) {
        // console.log("Adding to UI");
        // let tableBody = document.querySelector('.tableBody');

        html += `<tr>
                    <td>${element.bookName}</td>
                    <td>${element.author}</td>
                    <td>${element.typo}</td>
                    <td><button id= "${index}" onclick="deleteNote(this.id)" class="btn btn-danger btn-sm">Delete</button></td>
                </tr>`;


    });


    let noteselement = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteselement.innerHTML = html;

    }
    else {
        noteselement.innerHTML = `Nothing to show! Add some Books to see.`;
    }
};


//<<<<<<<<<<--------------------------ENDS    To Show-Function which is saved in LOCALSTORAGE:



//------------------------->>>>>>>>>>>>       STARTS DELETE "NOTE" FUNCTION BELOW:

function deleteNote(index) {
    console.log('Deleting Notes', index);

    let notes = localStorage.getItem('notes');


    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
};
//<<<<<<<<<<--------------------------ENDS     DELETE "NOTE" FUNCTION BELOW:



// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    // console.log('YOu have submitted library form');
    let bookName = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(bookName, author, type);
    // console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        // display.add(book);
        showNotes();
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
        deleteNote();
    }

}
