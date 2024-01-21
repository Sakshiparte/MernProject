fetch("http://localhost:8989/users")
.then(res =>res.json())
.then(result =>{
console.log(result)

var output =''
for(let i=0;i<result.length;i++){
output+=`<tr>
<td>${result[i]['name']}</td>
<td>${result[i]['age']}</td>
<td>${result[i]['city']}</td>
<td>
<a class="btn btn-secondary" href="edit.html?id=${result[i]['_id']}">Edit</a>
<button class="btn btn-danger" onclick="deleteUser('${result[i]._id}')">Delete</button>
</td>
</tr>  `
}
document.getElementById("users").innerHTML=output
});

function deleteUser(id){
var confdelete=confirm(`Are you want to delete this record?`)
fetch(`http://localhost:8989/users?id=${id}`,{
method:"DELETE"
})
.then(res =>res.json())
.then(result =>{
window.location.reload()
})
}