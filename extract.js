

function extract(){
getData();


}

function getData(){
    let rawData='';
    let input=document.getElementById('inputfile');
    let output=document.getElementById('output');
    input.addEventListener('change', function(){
        let fr=new FileReader();
        fr.onload=function(){        
            output.textContent=fr.result;
            rawData=fr.result;
            console.log(rawData)
            formatRecords(rawData)
        }
        fr.readAsText(this.files[0]);
        
     
    
    })
}


function formatRecords(rData){
    //get individual record
    let recordsArr=rData.split("@book");
      //remove first
    recordsArr.shift(); 

 
    let formattedRecords=[];
    

    recordsArr.forEach(record=>{
     
        let elements=record.match(/\{(.*?)\}/gm);
        console.log(elements)

        let textOnly=[];

        elements.forEach(e=>{
            console.log(e);
            e=e.replace("{","");
            e=e.replace("}","");
            textOnly.push(e);
          

        })

        formattedRecords.push(textOnly)       
       
       
    })
    let data=[];
    formattedRecords.forEach(r=>{
        let record={};
        record.author=r[0];
        record.title=r[1];
        record.date=r[2];
        record.issue=r[4];

        data.push(record)
    })
    console.log(data)
    appendToDocument(data)
}

function appendToDocument(data){
    data.forEach(d=>{
        let recordParagraph=document.createElement('p');
        let recordText="";
        recordText+=d.author+". ";
        recordText+=d.title + ". ";
        recordText+=d.date + ", бр.";
        recordText+=d.issue;
        recordParagraph.textContent=recordText;
        output.appendChild(recordParagraph)
    })
}
