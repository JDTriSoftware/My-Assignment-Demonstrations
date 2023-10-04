/**Author: Justin Triantafilou, 000775460, April 1st, 2023**/
/**
 * JavaScript component of the Responder webpage. Contains 3 pairs of fetch and success functions. These functions have
 * wide responsibilities including generating and populating HTML tags, Reading and creating arrays, CSS from JavaScript, and more.
 */


/**
 * Basic getRequest function. url points to the responder calls getReqSucc for success. Expects text response.
 */
function getReq() {
    url="https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php"
    fetch(url, { credentials: 'include'})
    .then(response => response.text()) 
    .then(getReqSucc);
}
/**
 * Sucess function from getReq() fetch request. Creates an h1 in the HTML and adds the response and concatonates author string
 * @param text the text string response from the fetch request made by getReq() 
 */
function getReqSucc(text){
    const headerCont = document.getElementById("headerCont");
    titleHeader = document.createElement('h1')
    titleHeader.innerHTML = text + " Justin Triantafilou, 000775460";
    headerCont.appendChild(titleHeader)
}



/**
 * getRequest function with paramaters. Paramaters are obtained from radio select in HTML.
 * Reads select value and only allows one selection after click. Expects JSON response.
 */
function getReqParams(){

    //Easiest way to obtain the radio value
    const radioSelect = document.querySelector('input[type="radio"]:checked');
    //Value defined in HTML button tag 
    choice = radioSelect.value;
    //Disable input after click to avoid mismatching content
    document.getElementById('marioButton').disabled = true;
    document.getElementById('starWarsButton').disabled = true;
    //Logging
    console.log(choice)

    //url is now concatenated with parameter syntax and then concatenated again with the user choice value.
    url="https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php" + "?choice=" + choice;

    fetch(url, { credentials: 'include'})
    .then(response => response.json()) 
    .then(getReqParamsSucc);
}
/**
 * Success function from getReqParams() fetch request. Has multiple responsibilities including encoding
 * an array from the objects in the response, targeting containers to appendChild the createElement variables and CSS.
 * @param {*} response the JSON object response from the fetch request made by getReqParams()
 */
function getReqParamsSucc(response){
    console.log(response.length)
    // Define an array, loop through the length of the response objects and add it to an array of objects at [i]
    const responseArray = [];
    for (let i = 0; i < response.length; i++) {
        responseArray[i] = {name: response[i].name, series: response[i].series, url: response[i].url};
    }

    //Target the container in the HTML to use the appendChild method later. Some CSS.
    const dynamicCont = document.getElementById("contentCont");
    //CSS to ensure divs within the container flexwrap. Creates space a margin between the header and content
    dynamicCont.style.display = "flex";
    dynamicCont.style.flexWrap = "wrap";
    dynamicCont.style.marginTop= "150px";

    //Loop through the length of the array of objects to create a div and appropriate elements for each one.
    for (let i = 0; i < responseArray.length; i++) {
        //createElement div
        const contentDiv = document.createElement('div');

        //createElement h2
        const responseHTwo = document.createElement('h2')
        //Add the series name of object [i] to the h2
        responseHTwo.innerHTML = responseArray[i].series
        //createELement img
        const responseImg = document.createElement('img');
        //Add src attribute with a value of the URL of object [i]
        responseImg.setAttribute('src', responseArray[i].url);
        // Ensure the imgs will be uniform and fit in the div
        responseImg.style.width = "250px";
        responseImg.style.height = "250px";

        //createElement p
        const responseName = document.createElement('p')
        //Add the name of object [i] to the to the p
        responseName.innerHTML = responseArray[i].name;
        //Center the text with the img
        responseName.style.paddingLeft = "100px"

        //Call appendChild method for each element created in correct order on the div of [i]
        //TODO: Add copyright text
        contentDiv.appendChild(responseHTwo)
        contentDiv.appendChild(responseImg)
        contentDiv.appendChild(responseName);
        contentDiv.style.border = "2px solid aquamarine"
        //Adjust the length of the div(s) within the container depending on the number of objects
        //TODO: Center the content
        if (responseArray.length == 1 ) {
            contentDiv.style.width = "100%";
        }
        else if (responseArray.length == 2 ) {
            contentDiv.style.width = "50%"
        }
        else {
            contentDiv.style.width = "33%";
        }
        //Call appendChild method for the populated div of [i] on the container
        dynamicCont.appendChild(contentDiv)
    }
    //Logging
    console.log(responseArray);
    console.log(response)
    console.log(response[0].name)
    console.log(response[0].series)
}

/**
 * POSTRequest function with paramaters. Paramaters are obtained from radio select in HTML.
 * Reads select value and only allows one selection after click. Expects JSON response.
 */
function postReqParams() {
    const radioSelect = document.querySelector('input[type="radio"]:checked');
    const choice = radioSelect.value;
    document.getElementById('marioButton').disabled = true;
    document.getElementById('starWarsButton').disabled = true;

    url="https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php?";
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {"Content-Type": "application/x-www-form-urlencoded" },
        body: "choice=" + choice // Parameter syntax
    })
    .then(responsePOST => responsePOST.json()) //Differentiate response variables
    .then(postReqParamsSucc)

    //Logging
    console.log(choice)
}

/**
 * Sucess function from the postReqParams() fetch request. Has multiple responsibilites and uses
 * adapted concepts from the getReqParamsSucc() function. Creates a table with rows for heading and data cells
 * 
 * jsonHeaders = the headers corresponding to the response object variables
 * jsonTable = the table element
 * jsonTableHeaderRow = the tr element for the headers i.e the header row
 * jsonTableHeader = the th element with data for the header row
 * jsonTableCellRow = the tr element for the data cells i.e cell rows
 * jsonTableCell____Data = the td element for the data to populate the cells, ____ can be Series, Name or URL 
 * 
 * @param {*} responsePOST the POST object response from the postReqParams() fetch request
 */
function postReqParamsSucc(responsePOST) {
    //Logging
    console.log(responsePOST)
    console.log(responsePOST.length)

    const responsePOSTArray = []
    for (let i = 0; i < responsePOST.length; i++) {
        responsePOSTArray[i] = {name: responsePOST[i].name, series: responsePOST[i].series, url: responsePOST[i].url};
    }
    //Logging
    console.log(responsePOSTArray);

    //Target the container in the HTML to use appendChild on later
    const tableCont = document.getElementById('tableCont');
    //Stack tables rather than side by side
    tableCont.style.display = "block"

    //Table headers
    let jsonHeaders = ['Series', 'Name', 'URL']

    //createElement table
    const jsonTable = document.createElement('table')
    //createElement tr for the header   
    const jsonTableHeaderRow = document.createElement('tr')

    for (let i = 0; i < jsonHeaders.length; i++) {
        //Populate header row with the data from jsonHeaders[i]
        const jsonTableHeader = document.createElement('th')
        jsonTableHeader.innerHTML = jsonHeaders[i];
        //Call appendChild method on the table header row and add the table heading of [i]
        jsonTableHeaderRow.appendChild(jsonTableHeader)
    }
    //Call appendChild mehtod on the table and add the header row populated with table headings
    jsonTable.appendChild(jsonTableHeaderRow)


    for (let i = 0; i < responsePOST.length; i++) {
        //createElement tr
        const jsonTableCellRow = document.createElement('tr')

        //create element td
        const jsonTableCellSeriesData = document.createElement('td')
        //Add the series data of [i] to the td
        jsonTableCellSeriesData.innerHTML = responsePOST[i].series;
        //call appendChild on the cell row and add the populated cell 
        jsonTableCellRow.appendChild(jsonTableCellSeriesData)

        const jsonTableCellNameData = document.createElement('td')
        jsonTableCellNameData.innerHTML = responsePOST[i].name;
        jsonTableCellRow.appendChild(jsonTableCellNameData)

        const jsonTableCellURLData = document.createElement('td')
        jsonTableCellURLData.innerHTML = responsePOST[i].url;
        jsonTableCellRow.appendChild(jsonTableCellURLData)



        //Call appendChild method on the table and add the populated row of [i]
        jsonTable.appendChild(jsonTableCellRow)
    }

    //Oddly placed section in order to get the correct copyright method
    const radioSelect = document.querySelector('input[type="radio"]:checked');
    const choice = radioSelect.value;

    const responseCopyR = document.createElement('p')
    if (choice == "mario") {
        responseCopyR.innerHTML = "Game trademarks and copyrights are properties of their respective owners. Nintendo properties are trademarks of Nintendo. &#169 2019 Nintendo."
    }
    else {
        responseCopyR.innerHTML = "Star Wars &#169 & TM 2022 Lucasfilm Ltd. All rights reserved. Visual material &#169 2022 Electronic Arts Inc."
    }
    responseCopyR.style.fontStyle = "italic"
    responseCopyR.style.fontSize = "10px"


    //Call appendChild method on the table container and add the fully populated table
    tableCont.appendChild(jsonTable)
    //Call appendChild method on the table container and add the appropriate copyright under the table
    tableCont.appendChild(responseCopyR)
}



