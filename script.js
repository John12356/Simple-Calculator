let totalValue = 0;
let buffer = "0";
let prevOperator;

const screenValue = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screenValue.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            totalValue = 0;
            break;

        case '=':
            if(prevOperator === null){
                return;
            }
            flush(parseInt(buffer));
            prevOperator = null;
            buffer = totalValue;
            totalValue = 0;
            break;

        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }
            if(buffer.length > 1){
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '−':
        case '×':
        case '÷':
        case '+':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }
    const convertedBuffer = parseInt(buffer);
    if(totalValue === 0){
        totalValue = convertedBuffer;
    }
    else{
        flush(convertedBuffer);
    }
    prevOperator = symbol;
    buffer = '0';
}

function flush(convertedBuffer){
    if(prevOperator === '+'){
        totalValue += convertedBuffer;
    }
    else if(prevOperator === '-'){
        totalValue -= convertedBuffer;
    }
    else if(prevOperator === '×'){
        totalValue *= convertedBuffer;
    }
    else if(prevOperator === '÷'){
        totalValue /= convertedBuffer;
    }
}

function handleNumber(element){
    if(buffer === "0"){
        buffer = element;
    }
    else{
        buffer += element;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();