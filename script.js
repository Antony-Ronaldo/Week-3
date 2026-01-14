document.addEventListener("DOMContentLoaded", () => {
    fetchUserData();

    const search = document.getElementById('search');
    if (search) {
        search.addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('#users .card');
            if (!q) {
                cards.forEach(c => c.style.display = '');
                const total = cards.length;
                const statusEl = document.getElementById('status');
                if (statusEl) statusEl.textContent = `${total} users`;
                return;
            }
            let count = 0;
            cards.forEach(c => {
                const text = c.textContent.toLowerCase();
                const show = text.includes(q);
                c.style.display = show ? '' : 'none';
                if (show) count++;
            });
            const statusEl = document.getElementById('status');
            if (statusEl) statusEl.textContent = `${count} users`;
        });
    }
});

async function fetchUserData() {
    const statusEl = document.getElementById('status');
    if (statusEl) statusEl.textContent = 'Loading users...';
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Network response was not ok');
        const users = await res.json();
        displayUsers(users);
        if (statusEl) statusEl.textContent = `${users.length} users loaded`;
    } catch (err) {
        console.error('API Error:', err);
        if (statusEl) statusEl.textContent = 'Failed to load users. Please try again later.';
        const usersEl = document.getElementById('users');
        if (usersEl) usersEl.innerHTML = '<p class="small">Unable to fetch user data.</p>';
    }
}

function displayUsers(users) {
    const userContainer = document.getElementById("users");
    userContainer.innerHTML = "";

    if (!users || users.length === 0) {
        userContainer.innerHTML = '<p class="small">No users found.</p>';
        return;
    }

    users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add("card");

        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
            <p><strong>City:</strong> ${user.address.city}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
            <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank" rel="noopener">${user.website}</a></p>
        `;

        userContainer.appendChild(userCard);
    });
}
