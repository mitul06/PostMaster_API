console.log("Project 6");

// Utility funtions
// 1. Utility function to get DOM element from str 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// count add no of counts
let addedParamCount = 0;

// Hide parameters Box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if the user clicks on params box, to hide json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});

// if the user clicks on json box, to hide params box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
});

// if the user click + button so add more parameters 
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="Parameterkey${addedParamCount + 2}" class="col-form-label col-sm-2 pt-0"><strong>Parameter ${addedParamCount + 2} : </strong></label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="ParameterKey${addedParamCount + 2}" style="border: 1px solid #ffcc00; border-radius: 1.2rem;" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="ParameterValue${addedParamCount + 2}" style="border: 1px solid #ffcc00; border-radius: 1.2rem;" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button style="border: 1px solid #ffcc00; border-radius: 1.2rem;" class="btn btn-info deleteParam"> - </button>
                </div>`;

    // COnvert element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Add an event listener to remove this params to clicking - button  
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }

    addedParamCount++;
});

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // if user clicked submit button then show this message in response box 
    document.getElementById('responsePrism').innerHTML  = "Please wait... Fetching response... ";

    // fetch all the valuse user has entered 
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // if user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('ParameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('ParameterKey' + (i + 1)).value;
                let value = document.getElementById('ParameterValue' + (i + 1)).value;
                data[key] = value;
            }

        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById('requestJsonText').value;
    }

    // log for seen error and debuging 
    console.log("url: ", url);
    console.log("requestType : ", requestType);
    console.log("contentType : ", contentType);
    console.log("data : ", data);

    // if the requestType is get, invoke fetch api to create a post Request 
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        }).then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    } else {
        fetch(url, {
            method: 'POST',
            body : data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        }).then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });

    }

});