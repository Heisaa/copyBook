var dictionary = new Typo("en_US", false, false, { dictionaryPath: "Typo.js-master/typo/dictionaries" });

function getText() {
    let textArray = document.getElementById("input").value.split(" ");
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
        let regN = /([A-Za-z])11|11(?=[A-Za-z])/g;

        let firstElement = element.replace(/l1/g, "h").replace(regN, "n");
        let word = firstElement.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,"");
        
        if (textArray[index+1] != undefined) {
            var nextElement = textArray[index + 1].replace(/l1/g, "h").replace(regN, "n");
            var nextWord = nextElement.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,"");
        }

        if (textArray[index+2] != undefined) {
            var nNextElement = textArray[index + 2].replace(/l1/g, "h").replace(regN, "n");
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
    
    console.log(dictionary.check("bio-monitor"));
}
