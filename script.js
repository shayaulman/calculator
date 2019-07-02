let rows = 1;

const input = document.querySelector('input');
const data = document.querySelector('.data');

document.querySelectorAll('button:not(.sum):not(.AC)').forEach(element => {  // +1 for the great selector 🎉
    element.addEventListener('click', () => {
/*   WHY is this necessary?? */
        // if(valitateOper(ele.innerHTML)){
            input.value += element.innerHTML;
        // }else{
        //     console.log(ele.innerHTML)
        //     input.value += ele.innerHTML;
        // }
        input.focus();
    })
});

input.addEventListener('keydown', function (e) {
    switch (true) {
        case e.which === 13:
            sum();
            break;

        case e.which === 8:
            clearLast();

        case valitateNum(e.keyCode) && !valitateOper(e.keyCode):
            e.preventDefault();
            break;

        case valitateOper(e.key):
            e.preventDefault();
            input.value += `${e.key}`;
            break;
    }
});

input.onpaste = (e) => e.preventDefault(); // why do you want to prevent pasting & text selection?

input.addEventListener('select', function() { 
    this.selectionStart = this.selectionEnd;
}, false);


const valitateNum = (char) => isNaN(parseInt(char));
const valitateOper = (oper) => '/+-*'.includes(oper);

const sum = () => {
    const str = input.value;
    if ( [...str].some(c => '/-+*'.includes(c)) && !str.includes('=') ) {
        input.value += ` = ${eval(input.value)}`;
        targetNode.classList.remove('anim');
        addDataToTable();
    }
    input.focus();
}

function addDataToTable(){
    data.innerHTML += `
        <div class='row' data-id='${rows}'>
            <span class='sum-history'> ${input.value} </span>
            <span class='edit' onclick="editValues(${rows})"><i class="fas fa-edit"></i></span> <span class='delete' onclick="deleteValues(${rows})"><i class="fas fa-trash-alt"></i></span>
        </div>`
    rows++;
}

const clearInput = () => {
    input.value = '';
    input.focus();
}

const clearLast = () => {
    const str = input.value;

    if (str.includes('=')) {
        input.value = str.slice(0, str.indexOf('=')-1);
        targetNode.classList.remove('anim');
    } else {
        input.value = str.slice(0, -1);
    }
    input.focus();
}

const editValues = (id) => {
    input.value = document.querySelector(`div[data-id="${id}"]>.sum-history`).innerHTML;
    clearLast();
}

const deleteValues = (id) => {
    document.querySelector(`div[data-id="${id}"]`).remove();
}


let targetNode = data;
let config = { attributes: true, childList: true, subtree: true };

let callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type == 'childList') {
            targetNode.classList.add('anim');
        }
        else if (mutation.type == 'attributes') {
        }
    }
};

var observer = new MutationObserver(callback);
observer.observe(targetNode, config);
