
fetch('http://localhost:8888/super')
    .then(res=>res.json())
    .then(jsonArr=>{
        displayCustomers(jsonArr);

        // hook up events
        document.getElementById('newSupForm').addEventListener('submit', handleAddNewCust);
        document.getElementById('modSupForm').addEventListener('submit', handleModSup);

        //all of the delete buttons
        const arrBtns = document.querySelectorAll('.delBtn');
        for(const btn of arrBtns)
        {
            btn.addEventListener('click', handleDeleteCust);
        }
        //all mod buttons
        const arrBtns2 = document.querySelectorAll('.modBtn');
        for(const btn of arrBtns2)
        {
            btn.addEventListener('click', handleMod);
        }
    });
    
// define event handlers
function handleDeleteCust(event)
{
    const supID = event.currentTarget.value;
    fetch('http://localhost:8888/super/' + supID, 
    {
        method: 'DELETE',
    })
    .then(res => res.text())
    .then(res => console.log(res))
}
let supID="";
function handleMod(event)
{       
     supID = event.currentTarget.value;
    document.getElementById('modify').setAttribute("style","display:block");
    document.getElementById('modname').setAttribute("placeholder",`Update ${supID}'s name`);
    document.getElementById('modpowers').setAttribute("placeholder",`Update ${supID}'s powers`);
    document.getElementById('modplace').setAttribute("placeholder",`Update ${supID}'s place`);
    document.getElementById('modweak').setAttribute("placeholder",`Update ${supID}'s weakness`);
    document.getElementById('modhead').innerText=`Modifying ${supID}`;
 

}
function handleModSup(event)
{
    event.preventDefault();
const fd = new FormData(document.getElementById('modSupForm'));

fetch('http://localhost:8888/super/'+ supID, 
{
    method:'PUT',
    body: fd
}) .then(res => res.text())
.then(res => console.log(res))


}

function handleAddNewCust(event)
{
    event.preventDefault();
    const fd = new FormData(document.getElementById('newSupForm'));

    fetch('http://localhost:8888/super',
    {
        method:'POST',
        body: fd
    });
}


function displayCustomers(jsonArr)
{
    // handle to the root element in the HTML page
    const custView = document.getElementById('SupView');

    //create a single table for all of the data
    const domTable = document.createElement('table');

    //create headings for our table
    
    const domHeaderRow = document.createElement('tr');
    const domHeaderColFN = document.createElement('th');
    domHeaderColFN.innerText = 'Name';
    const domHeaderColLN = document.createElement('th');
    domHeaderColLN.innerText = 'Powers';
    const domHeaderColLN2 = document.createElement('th');
    domHeaderColLN2.innerText = 'Place';
    const domHeaderColLN3 = document.createElement('th');
    domHeaderColLN3.innerText = 'Weakness';

    domHeaderRow.appendChild(domHeaderColFN);
    domHeaderRow.appendChild(domHeaderColLN);
    domHeaderRow.appendChild(domHeaderColLN2);
    domHeaderRow.appendChild(domHeaderColLN3);
    domTable.appendChild(domHeaderRow);
    domTable.setAttribute("border","1");

    const alteredJSONArr = jsonArr.filter(x=>x);
    for(json of alteredJSONArr)
    {

        // make a new row for each member of the jsonArr
        let domTR = document.createElement('tr');

        // make a new column for element piece of data  in our JSON elements
        let domTDFN = document.createElement('td'); 
        domTDFN.innerText = json.name; 
        
        
        let domTDLN = document.createElement('td'); 
        domTDLN.innerText = json.powers; 
        let domTDLN2 = document.createElement('td'); 
        domTDLN2.innerText = json.place; 
        let domTDLN3 = document.createElement('td'); 
        domTDLN3.innerText = json.weakness; 

        let domTDDel = document.createElement('td');
        
        domTDDel.innerHTML = `<button class='delBtn' value=${json.name}><i class="far fa-trash-alt"></i></button>`;
        
        let domTDmod = document.createElement('td');
        domTDmod.innerHTML = `<button class='modBtn' value=${json.name}>Edit</button>`;

        //add the col(s) to the row
        domTR.appendChild(domTDFN);
        domTR.appendChild(domTDLN);
        domTR.appendChild(domTDLN2);
        domTR.appendChild(domTDLN3);
        domTR.appendChild(domTDDel);
        domTR.appendChild(domTDmod);
        // add the row to the table
        domTable.appendChild(domTR);
    }

    custView.appendChild(domTable);
        
}
