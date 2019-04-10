var dictionary = new Typo("en_US", false, false, { dictionaryPath: "Typo.js-master/typo/dictionaries" });

function getText() {
    let text = document.getElementById("input").value;

    let regNa = /([A-Za-z])(11)(\D)/g;
    let regNb = /11(?=[A-Za-z])/g;
    let regH = /l1/g;
    text.replace(regNa,"$1n$3").replace(regNb,"$1n$3").replace(regH,"h");

    let textArray = text.split(" ");
    return textArray;
}

function setText(text) {
    document.getElementById("output").value = text;
}

function addText(text) {
    document.getElementById("output").value += text;
}

function buttonFix() {
    setText("");
    let textArray = getText();

    textArray.forEach(function (element, index) {
        
        let firstElement = element;
        let word = firstElement.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,"");
        
        if (textArray[index+1] != undefined) {
            var nextElement = textArray[index + 1];
            var nextWord = nextElement.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,"");
        }

        if (textArray[index+2] != undefined) {
            var nNextElement = textArray[index + 2];
            var nNextWord = nNextElement.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,"");
        }

        if (dictionary.check(word) && word != "th") {
            addText(firstElement + " ")
        } else if (dictionary.check(word + nextWord)) {
            if (firstElement.slice(-1) == "-") {
                addText(firstElement.replace(/[-]/g,"") + nextElement + " ");
            } else {
                addText(firstElement + nextElement + " ");
            }
            textArray.splice(index,1);
        } else if (dictionary.check(word + nextWord + nNextWord)) {
            if (firstElement.slice(-1) == "-" || nextElement.slice(-1) == "-") {
                addText(firstElement.replace(/[-]/g,"") + nextElement.replace(/[-]/g,"") + nNextElement + " ");
            } else {
                addText(firstElement + nextElement + nNextElement + " ");
            }
            textArray.splice(index,2);
            
        } else {
            addText(firstElement+" ");
            console.log("Problem");
        }
    });
    
    console.log(dictionary.check("al2014This"));
}
