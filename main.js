window.onload = function (){
    let inputTask = document.querySelector('#inputTask')
    let addNote = document.querySelector('#addNote')
    let allNote = document.querySelector('#allNote')

    inputTask.addEventListener('keypress',function(event){
        if(event.keyCode === 13){
            createNewTask(allNote, event.target.value);
            this.value = ''
        }
    })
}

function createNewTask(note, task){
    let col = create({'class':'col-sm-4'});
    let singleNote = create({'class':'singleTask d-flex'});
    let singleNoteP = create('p');
    singleNoteP.innerHTML = task;
    singleNote.appendChild(singleNoteP);

    let span = create('span',{'class':'ms-auto'});
    span.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';

    span.addEventListener('click',function(){
        note.removeChild(col)
    })
    singleNote.appendChild(span);

    let taskController = createTaskController(singleNote);
    taskController.style.visibility = 'hidden';
    singleNote.appendChild(taskController);

    singleNote.onmouseenter = function(){
        taskController.style.visibility = 'visible';
    }
    singleNote.onmouseleave = function(){
        taskController.style.visibility = 'hidden';
    }


    col.appendChild(singleNote);
    note.appendChild(col)
}

function createTaskController(note){
    let controlPanel = create({'class':'controlPanel d-flex align-item-center'});

    let colorPellet = createColorPalette(note);
    controlPanel.appendChild(colorPellet);

    let editBtn =  createEditBtn(note);
    controlPanel.appendChild(editBtn);

    return controlPanel;
}


function createEditBtn(note){
    let span = create('span',{'class':'ms-auto me-2 text-warning'});
    span.innerHTML = '<i class="fa-solid fa-file-pen "></i>';

    span.addEventListener('click',function(){
        let p = note.querySelector('p');
        let textArea = create('textarea',{'class':'inner-textarea'});
        textArea.style.width = note.offsetWidth + 'px';
        textArea.style.height = note.offsetHeight + 'px';
        textArea.innerHTML = p.innerHTML;
        textArea.addEventListener('keypress',function(event){
            if(event.keyCode === 13){
                if(this.value){
                    p.innerHTML = this.value;
                    note.removeChild(this)
                }
                else{
                    alert('Enter some value')
                }
            }
        })


        note.appendChild(textArea)
    })

    return span;
}

function createColorPalette(note){
    const colors = ['#5352ed','#a29bfe','#00cec9','#dfe6e9'];
    let colorDiv = create({'class':'d-flex align-items-center'});

    colors.forEach(color =>{
        let div = create({'class':'colorCircle mx-1'});
        div.style.background = color;
        div.addEventListener('click',function(){
            note.style.background = color;
        })
        colorDiv.appendChild(div)
    })

    return colorDiv
}










// create element template


window.create = function () {

    if (arguments.length === 0) {
        return document.createElement('div');
    }

    if (arguments.length === 1 && typeof arguments[0] != 'object') {
        return document.createElement(arguments[0]);
    }

    var tag = arguments[0];
    var attr = arguments[1] || arguments[0];

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
        tag = 'div';
    }

    var element = document.createElement(tag);

    for (var i in attr) {
        element.setAttribute(i, attr[i]);
    }

    return element;
}