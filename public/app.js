const msg = document.getElementById("msg");
const profileBox = document.getElementById("profileBox");

function show(x) {
    msg.textContent = typeof x === "string" ? x : JSON.stringify(x, null, 2);
}

document.getElementById("registerBtn").onclick = async () => {
    const name = document.getElementById("r_name").value;
    const email = document.getElementById("r_email").value;
    const password = document.getElementById("r_pass").value;

    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json().catch(() => ({}));
    show(data);
};

document.getElementById("loginBtn").onclick = async () => {
    const email = document.getElementById("l_email").value;
    const password = document.getElementById("l_pass").value;

    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
    });

    const data = await res.json().catch(() => ({}));
    show(data);
};

document.getElementById("profileBtn").onclick = async () => {
    const res = await fetch("/api/auth/profile", {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json().catch(() => ({}));
    profileBox.textContent = JSON.stringify(data, null, 2);
};

document.getElementById("logoutBtn").onclick = async () => {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
    });

    const data = await res.json().catch(() => ({}));
    show(data);
};
