let rows = 1;

let input = document.querySelector('input');
let data = document.querySelector('.data');

document.querySelectorAll('button:not(.sum):not(.AC)').forEach(ele => {
    ele.addEventListener('click', ()=>{
        if(valitateOper(ele.innerHTML)){
            input.value += ` ${ele.innerHTML} `;
        }else{
            input.value += ele.innerHTML;
        }
        input.focus();
    })
});

input.addEventListener('keydown', function (e) {
       
    if(e.key === 13){
        sum();
        return;
    };

    if(e.key === 8){
        clearLast();
    };

    if(valitateNum(e.key) && !valitateOper(e.key)){
        e.preventDefault();
    };

    if(valitateOper(e.key)){
        e.preventDefault();
        input.value += ` ${e.key} `;
    }

});

input.onpaste = function(e) {
    e.preventDefault();
}

input.addEventListener('select', function() {
    this.selectionStart = this.selectionEnd;
}, false);


function valitateNum(char){
    if(isNaN(parseInt(char))){
        return true;
    }
}

function valitateOper(oper){
    if(oper == '/' || oper == '+' || oper == '-' || oper == '*'){
        return true;
    }
}

function sum(){
    let str = input.value;
    if(str.indexOf('/') >=0 || str.indexOf('-')>=0 || str.indexOf('+')>=0 || str.indexOf('*')>=0){
        if(str.indexOf('=') == -1){
            input.value += ` = ${eval(input.value)}`;
            
            targetNode.classList.remove('anim');
            addDataToTable();
        }
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
    ;
}


function clearInput(){
    input.value = '';
    input.focus();
}

function clearLast(){
    let str = input.value;

    if(str.indexOf('=')>=1){
        input.value = str.slice(0, str.indexOf('=')-1);
        targetNode.classList.remove('anim');
    }else{
        input.value = str.slice(0, -1);
    }
    input.focus();
}

function editValues(id){
    input.value = document.querySelector(`div[data-id="${id}"]>.sum-history`).innerHTML;
    clearLast();
}

function deleteValues(id){
    document.querySelector(`div[data-id="${id}"]`).remove();
}


let targetNode = data;

let config = { attributes: true, childList: true, subtree: true };

let callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type == 'childList') {
            targetNode.classList.add('anim');
        }
        else if (mutation.type == 'attributes') {
        }
    }
};

var observer = new MutationObserver(callback);
observer.observe(targetNode, config);

