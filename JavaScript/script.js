let add_button = document.getElementById("add-button");
add_button.setAttribute('onclick', 'addNewRecord()');



function addNewRecord() {
    let book_table_body = document.getElementById('book-table-body');
    let new_row = document.createElement('tr');
    let new_author = document.createElement('td');
    let new_title = document.createElement('td');
    let new_edit = document.createElement('td');


    new_author.appendChild(document.createElement('input'));
    new_title.appendChild(document.createElement('input'));

    new_author.setAttribute('id','new_author');
    new_title.setAttribute('id','new_title');

    let button_save = document.createElement('button');
    let button_remove = document.createElement('button');
    button_save.textContent='Save';
    button_remove.textContent ='Remove';

    button_save.setAttribute('onclick','SaveRow(this)');
    button_remove.setAttribute('onclick','RemoveRow(this)');


    new_edit.appendChild(button_save);
    new_edit.appendChild(button_remove);
    new_row.appendChild(new_author);
    new_row.appendChild(new_title);
    new_row.appendChild(new_edit);
    book_table_body.appendChild(new_row);

    let row_idex = new_row.rowIndex;
    if(row_idex % 2 != 0){
        new_row.style.backgroundColor = "lightgray";
    }

}

function RemoveRow(button) {
    document.getElementById("book-table").deleteRow(button.parentNode.parentNode.rowIndex);
}

function SaveRow(button){
    let row_number = button.parentNode.parentNode.rowIndex;
    let cells = document.getElementById("book-table").rows[row_number].cells;
    for(let i = 0; i<cells.length - 1; i++){
        cells[i].textContent = cells[i].firstChild.value;
    }

    cells[cells.length-1].childNodes[0].textContent = 'Edit';
    cells[cells.length-1].childNodes[0].setAttribute('onclick','EditRow(this)');
}

function EditRow(button){
    let row_number = button.parentNode.parentNode.rowIndex;
    let cells = document.getElementById("book-table").rows[row_number].cells;
    for(let i = 0; i< cells.length - 1; i++){
        const value_before = cells[i].textContent;
        if(cells[i].firstChild){
            cells[i].replaceChild(document.createElement('input'), cells[i].firstChild);  //Edit if there are some value in save inputs
        }
        else{
            cells[i].appendChild(document.createElement('input')); //Edit if inputs are empty
        }
        cells[i].firstChild.value = value_before;
    }
    cells[cells.length-1].childNodes[0].textContent = 'Save';
    cells[cells.length-1].childNodes[0].setAttribute('onclick','SaveRow(this)');

}

