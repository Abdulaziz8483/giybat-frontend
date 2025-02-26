window.onload = function () {
    const userDetailJon = localStorage.getItem("userDetail");
    if (!userDetailJon) {
        return;
    }

    const userDetailObj = JSON.parse(userDetailJon);

    document.getElementById("profile_settings_name").value = userDetailObj.name;
    document.getElementById("profile_settings_username").value = userDetailObj.username;
    if(userDetailObj.photo){
        document.getElementById("profile_settings_photo").src = userDetailObj.photo.url;
    }
};

function profileDetailUpdate() {
    const jwt = localStorage.getItem('jwtToken');
    const newName = document.getElementById("profile_settings_name").value

    if (!jwt){
        window.location.href = './login.html';
        return;
    }

    fetch('http://localhost:8080/api/profile/update-name',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '  +jwt
        },
        body: JSON.stringify({name: newName})
    })
        .then(response => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            let userDetail = localStorage.getItem('userDetail');
            userDetail = JSON.parse(userDetail);
            userDetail.name = newName;
            localStorage.setItem("userDetail",JSON.stringify(userDetail));
            console.log(localStorage.getItem('userDetail'))
            return response.json();
        })
        .then(data => {
            console.log('Success', data)
            alert('Name updated successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update name.');
        });

}

function profilePasswordUpdate() {
    const currentPswd = document.getElementById("profile_settings_current_pswd").value
    const newPswd = document.getElementById("profile_settings_new_pswd").value

}

function profileUserNameChange() {
    const username = document.getElementById("profile_settings_username").value

}

function profileUserNameChangeConfirm() {
    const confirmCode = document.getElementById("profileUserNameChaneConfirmInputId").value
}

//------------ Change username confirm modal start ------------
const modal = document.getElementById('simpleModalId');

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

//------------ Change username confirm modal end ------------

// ------------ Image preview ------------
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const img = document.getElementById('profile_settings_photo');
        img.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
        document.getElementById('profile_settings_upload_img_btn_id').style.display = 'inline-block';
    }
}

// ------------ Image upload ------------
function uploadImage() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const jwt = localStorage.getItem('jwtToken');
        if (!jwt) {
            window.location.href = './login.html';
            return;
        }
        const lang = document.getElementById("current-lang").textContent;

        fetch('http://localhost:8080/api/attach/upload', {
            method: 'POST',
            headers: {
                'Accept-Language': lang,
                'Authorization': 'Bearer ' + jwt
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                if(data.id){
                    updateProfileImage(data.id); // profile update image

                    const userDetailJon = localStorage.getItem("userDetail");
                    const userDetail = JSON.parse(userDetailJon);
                    userDetail.photo = {};
                    userDetail.photo.id = data.id;
                    userDetail.photo.url = data.url;
                    localStorage.setItem("userDetail", JSON.stringify(userDetail));

                    // document.getElementById("header_user_image_id").src =data.url;
                }
                return fetch('http://localhost:8080/api/profile/update-photo',{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwt
                    },

                    body: JSON.stringify({photoId: data.id})
                })
            })

            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function updateProfileImage(photoId) {

}