
var count = 0;
var students = []; 
var global_id;
function addStudent(){
 
    const namedata = document.getElementById('name').value;
    const emaildata = document.getElementById('email').value;
    const agedata = document.getElementById('age').value;
    const gpadata = document.getElementById('gpa').value;
    const degreedata = document.getElementById('degree').value;

    if(document.querySelector("#submit").innerText == "Edit Student"){
        console.log("this will edit and not add");
        console.log(global_id);
        let index;

        for (let i = 0; i < students.length; i++) {
            if (students[i]['ID'] == global_id) {
                index=i;
                break;
            }
        }

        let studentobj = students[index];

        studentobj['name'] = namedata;
        studentobj['email'] = emaildata;
        studentobj['gpa'] = gpadata;
        studentobj['age'] = agedata;
        studentobj['degree'] = degreedata;

        students[index] = studentobj;

        showTable();
        document.querySelector("#submit").innerHTML = "Add Student";

            document.getElementById('name').value="";
            document.getElementById('email').value="";
            document.getElementById('age').value="";
            document.getElementById('gpa').value="";
            document.getElementById('degree').value="";
        
     return;

    }

    //user have to fill all the values
    if(namedata=='' || emaildata=='' || agedata=='' || gpadata =='' || degreedata==""){
        alert("All fields are required!")
        return;
    }

    //increase the id 
    count++;

    students.push({
        ID:count,
        name:namedata,
        email:emaildata,
        age:agedata,
        gpa:gpadata,
        degree:degreedata
    });


    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('age').value="";
    document.getElementById('gpa').value="";
    document.getElementById('degree').value="";
    console.log(students);
    showTable();
}


function showTable(){
    const table = document.getElementById('tbody');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    table.value="";
    students.forEach((student)=>{

        const row = document.createElement("tr");
        var keys=Object.keys(student);

        var id = document.createElement('td');
        const name = document.createElement('td');
        const email = document.createElement('td');
        const age = document.createElement('td');
        const gpa = document.createElement('td');
        const degree = document.createElement('td');

        keys.forEach((key)=>{
            if(key=='ID'){
                id.innerHTML = student[key];
            }
            else if(key=='name'){
                name.innerHTML = student[key];
            }
            else if(key=='email'){
                email.innerHTML = student[key];
            }
            else if(key=='age'){
                age.innerHTML = student[key];
            }
            else if(key=='grade'){  
                gpa.innerHTML = student[key];
            }
            else
            degree.innerHTML = `<div class='degree'><div>${student[key]}</div> <div class="icons"><a onClick="edit(${student['ID']})" class='fa'>&#xf044;</a> <a onClick="del(${student['ID']})" class='fa'>&#xf1f8;</a> </div></div> `;
            // degree.innerHTML = student[key] + "  <li class='fa'>&#xf044;</li>";
         
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(age);
            row.appendChild(gpa);
            row.appendChild(degree);       
        })

        table.appendChild(row);
    })
}

function search(){
  var input, filter, table, tr, td, i, txtValue,txtValue1,txtValue2;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("tbody");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    td1 = tr[i].getElementsByTagName("td")[2];
    td2 = tr[i].getElementsByTagName("td")[5];
    if (td || td1 || td2) {
      txtValue = td.textContent || td.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


function edit(id) {
    let student;
    console.log(id);
    for (let i = 0; i < students.length; i++) {
        if (students[i]['ID'] == id) {
            student = students[i];
            break;
        }
    }

    document.querySelector("#name").value = student['name'];
    document.querySelector("#email").value = student['email'];
    document.querySelector("#gpa").value = student['gpa'];
    document.querySelector("#age").value = student['age'];
    document.querySelector("#degree").value = student['degree'];

    document.getElementById("submit").innerText = "Edit Student";

    global_id=id;
}

function del(id){
    students.forEach((student,index) => {
        if(student['ID']==id){
            students.splice(index,1);
            showTable();
        }
    })
}
