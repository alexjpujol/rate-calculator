const labels =  [
    {
        name: "umg",
        audio: 13.65,
        sponsored: 20.55
        },

    {
        name: "warner",
        audio: 11.23,
        sponsored: 22.00
    },

    {
        name: "sony",
        audio: 12.21,
        sponsored: 22.56
    },

    {
        name: "merlin",
        audio: 13.23,
        sponsored: 25.66
    }
]

const premiums = {
    dma: 1.1,
    city: 1.2,
    genre: 1.2,
    playlist: 1.3
}



function getLabel() {
    let node = document.getElementById("label");
    let labelSelection = node.options[node.selectedIndex].text.toLowerCase();
    return labelSelection;
}

function getProduct() {
    let node = document.getElementById("product");
    let productSelection = node.options[node.selectedIndex].text.toLowerCase();
    var product; 
    switch (productSelection) {
        case "audio everywhere":
            product = "audio";
            break;
        case "sponsored sessions":
            product = "sponsored";
            break;
        case "mobile overlay":
            product = "mobile_overlay";
            break;
        case "desktop overlay":
            product = "desktop_overlay";
            break;
    }

    return product;
}

function findPremiums() {
    let checkboxes = document.getElementsByClassName("targeting");
    let checkedBoxes = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedBoxes.push(checkboxes[i].value)
        }
    }

    let premiumsUsed = [];
    checkedBoxes.forEach(function(value) {
        premiumsUsed.push(premiums[value]);
    })

    return premiumsUsed;
    
}

function findRate() {
    let label = getLabel();
    let product = getProduct();
    for (var i = 0; i < labels.length; i++) {
        let labelName = labels[i].name;
        if (labelName === label) {
            return labels[i][product]
        }
    }
}

function calculate() {
    let multipliers = findPremiums();
    let rate = findRate();

    let finalRate = multipliers.reduce(function(accumulator, currentValue){
        return accumulator * currentValue;
    }, rate)

    finalRate = finalRate.toFixed(2);

    
    document.getElementById("rate").innerText = "$ " + finalRate;
}