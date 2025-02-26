
document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".entrance_btn");

    if (loginButton) {
        loginButton.addEventListener("click", async function () {
            const usernameInput = document.getElementById("username");
            const passwordInput = document.getElementById("password");
            const usernameErrorSpan = document.getElementById("usernameErrorSpan");

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            //Formani tekshirish
            if (!username || !password) {
                usernameErrorSpan.style.display = "block";
                return;
            } else {
                usernameErrorSpan.style.display = "none";
            }

            const requestBody = {
                username: username,
                password: password
            };

            try {
                const response = await fetch("http://localhost:8080/api/v1/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestBody)
                });

                /*const  textData = await response.text();
                console.log("kegan javob:", textData)*/
                const data = await response.json();



                if (response.ok) {
                    alert("Login muvaffaqiyatli!");
                    //Tokenni saqlash
                    localStorage.setItem("userDetail",JSON.stringify(data));
                    localStorage.setItem("jwtToken", data.token);

                    console.log(localStorage.getItem("jwtToken"));
                    //Profil sahifasiga yo'naltirish
                    window.location.href = "profile-post-list.html";
                } else {
                    alert("Xatolik: " + (data.message || "Login muvaffaqiyatsiz"));
                }
            } catch (error) {
                console.error("Xatolik:", error);
                alert("Xatolik yuz berdi: " + error.message);
            }
        });
    }
});
