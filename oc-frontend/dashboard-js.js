server_url = "http://localhost:5000"
$(document).ready(function(){
    var sid = window.sessionStorage.sid.toString();

    fetch(server_url+"/who-is?sid="+sid)
    .then(response=>response.json())
    .then(response=>{
         $("#who-is").text(response.s_name);
    })
    .catch(err=>{
        alert('Error')
    })
    
})

$('#logout-button').click(function(){
    alert("Do you wish to logout?");
    sessionStorage.clear();
})

$("#post-question-button").click(function(){

    formData = new FormData;

    q_title = $("#q_title").val()
    q_content = $("#q_content").val()
    
    if (q_title=="" || q_content==""){
        alert('Error : Empty fields not allowed');
        return;
    }

    formData.append('sid',sessionStorage.sid)
    formData.append('q_title',q_title)
    formData.append('q_content',q_content)

    fetch(server_url+"/new-question",
    {body:formData,method:'POST'}
    )
    .then(response=>response.json())
    .then(response=>{
        alert(response.success)
        $("#q_title").val('')
        $("#q_content").val('')
    })
    .catch(err=>{
        alert('Error : Some error contacting the server, Try again!')
    })
})