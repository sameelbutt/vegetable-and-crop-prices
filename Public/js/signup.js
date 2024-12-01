let signup = async (email, password, confirmpassword) => {
    try {
        let res = await axios({
            method: "POST",
            url: "http://127.0.0.1:3000/api/v1/users/signup",
            data: {
                email: email,
                password: password,
                confirmpassword: confirmpassword
            }
        });
        console.log(res);
        if (res.data.status === 'success') {
            alert('Signup Successful');
            window.location.assign('/login');
        }
    } catch (err) {
        console.error('Signup error:', err.response ? err.response.data : err.message);
        alert(err.response ? err.response.data.message : 'An error occurred');
    }
};

let loginForm = document.querySelector('#loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let email = document.getElementById('emailInput').value;
        let password = document.getElementById('passwordInput').value;
        let confirmpassword = document.getElementById('ConfirmpasswordInput').value;
        signup(email, password, confirmpassword);
    });
}
