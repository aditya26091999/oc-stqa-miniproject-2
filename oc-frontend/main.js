let server_url = "http://localhost:5000";

var phoneno_regex = /^\d{10}$/;
var email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function login() {
    
    let formData = new FormData();
    email = document.getElementById('s_email').value;
    password = document.getElementById('s_password').value;
    
    if(email==""|| password==""){
        alert('Error : Empty fields');
        return;
    }

    if (email.match(email_regex)){

    }else{
        alert("Error : Enter a valid email address");
        document.getElementById('s_email_').value='';
        return;
    }

    formData.append('s_email', email);
    formData.append('s_password', password);
    

    fetch(server_url+'/login',{
        body:formData,
        method:"post",
    })
        .then(response => {
            if(response.status == 404){
                throw 1;
            }else{
                return response.json();
            }
        })
        .then(response => {

            window.sessionStorage.setItem("sid",response.sid);
            alert('Login Succesful!');
            window.location.href = "/dashboard.html";

        })
        .catch(err => {
            alert('Error : Check your credentials!');
            return;
        })
}


function register() {
    
    
    let formData = new FormData();
    name = document.getElementById('s_name_').value,
    email = document.getElementById('s_email_').value;
    phone = document.getElementById('s_phone_').value;
    password = document.getElementById('s_password_').value;
    cpassword = document.getElementById('c_password_').value;

    if(name=="" || email=="" || phone=="" || password=="" || cpassword==""){
        alert('Error : Empty fields');
        return;
    }

    if (email.match(email_regex)){

    }else{
        alert("Error : Enter a valid email address");
        document.getElementById('s_email_').value='';
        return;
    }
    if(phone.match(phoneno_regex)){

    }else{
        alert("Error : Enter a valid phone number");
        document.getElementById('s_phone_').value='';
        return;
    }

    if(password.length<6 || password.length>15){
        alert("Password length expected : 6 to 15");
        document.getElementById('s_password_').value='';
        document.getElementById('c_password_').value='';
        return; 
    }


    if (password!==cpassword){
        alert("Both passwords don't match");
        document.getElementById('s_password_').value='';
        document.getElementById('c_password_').value='';
        return;
    }


    

    formData.append('s_name', name);
    formData.append('s_email', email);
    formData.append('s_phone', phone);
    formData.append('s_password', password);
    

    fetch(server_url+'/register',{
        body:formData,
        method:"post",
    })
        .then(response => response.json())
        .then(response => {
            alert('Registration successful!')
            document.getElementById('s_name_').value='',
            document.getElementById('s_email_').value='';
            document.getElementById('s_phone_').value='';
            document.getElementById('s_password_').value='';
            document.getElementById('c_password_').value='';
            window.location.href = "/index.html";
        })
        .catch(err => {
            alert('Error : User already exists!');
            document.getElementById('s_name_').value='',
            document.getElementById('s_email_').value='';
            document.getElementById('s_phone_').value='';
            document.getElementById('s_password_').value='';
            document.getElementById('c_password_').value='';
        })


}

// function test(){
//     fetch(server_url)
//     .then(response=>response.json())
//     .then(response=>console.log(response))
//     .catch(err=>alert(err))
// }