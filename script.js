let i =1;
let terminal,p,inp,files,firefox;
let files_open = false;
let files_amount=0;
let file_names = [];



function remove_terminal() {
    // BUG FIX: Před smazáním musíme ověřit, zda objekty vůbec existují (jinak JS vyhodí chybu)
    if (firefox) {
        firefox.remove();
        firefox = null; // Vynulujeme referenci
    }
    if (terminal) {
        terminal.remove();
        terminal = null;
    }
}

function create_terminal(){
    terminal = document.createElement('div');
    terminal.id = 'terminal';
    document.body.appendChild(terminal);


terminal.addEventListener('contextmenu',(event) => {
    event.preventDefault();
    remove_terminal();
    if(files_open == true){
    files.id = 'files-full';
    }
})

    p = document.createElement('span');
    p.id = 'pre-input';
    p.textContent = '>';
    terminal.appendChild(p)

    inp = document.createElement('input');
    inp.id = 'input1';
    inp.type = 'text';
    terminal.appendChild(inp);
    inp.focus();
}

function files_app(){
    terminal.id = 'terminal-half';
    files= document.createElement('div')
    files.id='files';
    document.body.appendChild(files);
    files_open=true;

    const x = document.createElement('button');
    x.style.marginLeft='95%';
    x.textContent='x';
    x.id = 'x';
    files.appendChild(x);

    x.addEventListener("click",function(){
        files.remove();
        terminal.id = 'terminal';
        files_open=false;
    })

    document.body.appendChild(document.createElement('br'));
    
    if(files_amount==0){
    const empty=document.createElement('p');
    empty.id='empty';
    empty.textContent='Folder is Empty';
    files.appendChild(empty);
    }
    else{
        const file_div = document.createElement('div');
        file_div.style.display = 'flex';
        files.appendChild(file_div)
        for(let j=0;j<files_amount;j++){

        const file_div2 = document.createElement('div');
        file_div.appendChild(file_div2)
            const file_button = document.createElement('button');
            file_button.id = 'file_button';
            file_div2.appendChild(file_button);
            const file_text = document.createElement('p');
            file_text.style.marginLeft = '20px';
            file_text.textContent = file_names[j];
            file_div2.appendChild(file_text);
        }
    }
}

function firefox_open(){
    terminal.id = 'terminal-half';
    firefox = document.createElement('div');
    firefox.id='firefox';
    document.body.appendChild(firefox);

    const x = document.createElement('button');
    x.style.marginLeft='95%';
    x.textContent='x';
    x.id = 'x';
    firefox.appendChild(x);

    x.addEventListener("click",function(){
        firefox.remove();
        terminal.id = 'terminal';
    })

    const fir_input = document.createElement('input');
    fir_input.id='firefox-input';
    fir_input.placeholder = 'Search with Google or Enter address';
    firefox.appendChild(fir_input);

    const image = document.createElement('img');
    image.src = 'firefox.jpg';
    image.style.width='200px';
    image.style.height='150px';
    firefox.appendChild(image);

    const fir_input2 = document.createElement('input');
    fir_input2.id='firefox-input2';
    fir_input2.placeholder='Search with Google or Enter address';
    firefox.appendChild(fir_input2);
}

function new_file(file_name){
    files_amount++;
    const result = file_name.replace(/^mkdir\s+|\/$/g, "");
    file_names.push(result);
    console.log(file_names);
}

function ls(){
    const ls_span = document.createElement('p');
    ls_span.id = 'previous';
    ls_span.textContent = file_names;
    terminal.appendChild(ls_span);
}

function new_line(){
    let p_memory = p.textContent;
    let inp_memory = inp.value;
    p.remove();
    inp.remove();

    const previous = document.createElement('p');
    previous.id = 'previous'
    previous.textContent = p_memory + "" + inp_memory;
    terminal.appendChild(previous);

    if(inp_memory == 'files'){
        files_app();
    }
    if(inp_memory == 'firefox'){
        firefox_open();
    }
    if(inp_memory.startsWith('mkdir') && inp_memory.endsWith('/')){
        new_file(inp_memory);
    }
    if(inp_memory=='ls'){
        ls();
    }

    p = document.createElement('span');
    p.id = 'pre-input';
    p.textContent = '>';
    terminal.appendChild(p);

    inp = document.createElement('input');
    inp.id = 'input1';
    inp.type = 'text';
    terminal.appendChild(inp);
    inp.focus();
}

document.addEventListener("keydown", (event) => {
    if(event.shiftKey && event.key === 'E'){
        event.preventDefault(); 
        if(i%2!=0){
            create_terminal();
        }
        
        i++;
    }

    if(event.key==='Enter'){
        if(i%2==0){
            new_line();
        }}
})