const communityApps = [
    { 
        name: "MyWeb Notes", 
        desc: "Cloud-synced scratchpad. Limited to 5 slots.", 
        status: "Live",
        link: "notes.html" // Link to the file we just made
    },
    // ... your other apps
];

function loadApps() {
    const grid = document.getElementById('app-grid');
    apps.forEach(app => {
        const div = document.createElement('div');
        div.className = 'app-card';
        div.innerHTML = `
            <h3>${app.title}</h3>
            <p>By ${app.dev}</p>
            <p>${app.desc}</p>
            <button class="launch-btn">Get</button>
        `;
        grid.appendChild(div);
    });
}

window.onload = loadApps;