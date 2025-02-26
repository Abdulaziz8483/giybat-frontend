window.onload = function () {

    getPostList();

};


function getPostList() {
    /*const jwt = localStorage.getItem('token');
    console.log(localStorage.getItem("token"))*/
    /*if (!jwt) {
        window.location.href = './login.html';

        return;
    }*/
    const lang = document.getElementById("current-lang").textContent;

    fetch("http://localhost:8080/api/post/get-all-posts-owner", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6IlVTRVIiLCJpZCI6IjMiLCJ1c2VybmFtZSI6ImRkaWl5eW9vcnIwMDFAZ21haWwuY29tIiwic3ViIjoiZGRpaXl5b29ycjAwMUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk3OTQzMjMsImV4cCI6MTczOTg4MDcyM30.hSm1njz_HNjPbk5taFxsQFHgWVUiEXvzXgG0sWtsfDN04TqZYRYFHTBLNv7R0Y1ZDez4CQR0wT91hC1FJ0DDyA"
        }
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return Promise.reject(response.text());
        }
    }).then(data => {
        console.log(data);
        showPostList(data);
    }).catch(error => {
        error.then(errMessage => {
            alert(errMessage)
        })
    });
}

function showPostList(postList) {
    const parent = document.getElementById("profile_post_container_id")
    postList.forEach(postItem => {
        //
        const div = document.createElement("div");
        div.classList.add("position-relative", "post_box");

        // button
        const editButton = document.createElement("a");
        editButton.classList.add("profile_tab_btn");
        editButton.href = "./post-create.html?id="+postItem.id;

        // image_div
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("post_img__box");
        // image
        const img = document.createElement("img");
        if (postItem.photo && postItem.photo.id) {
            img.src = postItem.photo.url;
        } else {
            img.src = './images/post-default-img.jpg';
        }
        img.classList.add('post_img');
        imageDiv.appendChild(img);

        // title
        const title = document.createElement("h3");
        title.classList.add("post_title");
        title.textContent = postItem.title

        // created_date
        const createdDate = document.createElement("p");
        createdDate.classList.add("post_text");
        createdDate.textContent = postItem.createdDate;

        // add elements to main div
        div.appendChild(editButton);
        div.appendChild(imageDiv)
        div.appendChild(title);
        div.appendChild(createdDate);
        //
        parent.appendChild(div);
    });

}












