(function () {
    const followBtn = document.getElementById('followBtn');
    const followLabel = document.getElementById('followLabel');
    const followIcon = document.getElementById('followIcon');

    let following = false;
    let loading = false;

    function setState() {
        followBtn.setAttribute('aria-pressed', String(following));
        if (loading) {
            followLabel.textContent = 'Loading...';
            followBtn.disabled = true;
            followBtn.classList.add('opacity-80', 'cursor-wait');
        } else {
            followBtn.disabled = false;
            followBtn.classList.remove('opacity-80', 'cursor-wait');
            if (following) {
                followLabel.textContent = 'Following';
                followIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />';
            } else {
                followLabel.textContent = 'Follow';
                followIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>';
            }
        }
    }

    async function toggleFollow() {
        if (loading) return;
        loading = true;
        setState();
        await new Promise(r => setTimeout(r, 700));
        following = !following;
        loading = false;
        setState();
    }

    followBtn.addEventListener('click', toggleFollow);
    followBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFollow();
        }
    });
    setState();
})();


const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const htmlEl = document.documentElement;

    htmlEl.classList.toggle('dark');


    if (htmlEl.classList.contains('dark')) {
        themeToggle.textContent = 'Switch to Dark Theme';
    } else {
        themeToggle.textContent = 'Switch to Light Theme';
    }
});


document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const btn = card.querySelector('button, a');
            if (btn) btn.focus();
        }
    });
});


if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.card').forEach(c => c.style.transition = 'none');
}