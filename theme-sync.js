const themeToggle = document.getElementById('theme-toggle');

// Check localStorage for saved preference
const currentTheme = localStorage.getItem('myweb_theme') || 'light';
document.body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = document.body.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('myweb_theme', newTheme); // This syncs it!
});