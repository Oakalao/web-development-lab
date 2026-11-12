(function () {
    var root = document.documentElement;
    var themeBtn = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));
        themeBtn.textContent = theme === 'dark' ? 'Гэрэлтэй горим' : 'Харанхуй горим';
    }

    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));

    themeBtn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch (e) {}
    });

    document.querySelectorAll('.btn-flip').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var card = btn.closest('.card');
            var flipped = card.classList.toggle('is-flipped');
            btn.setAttribute('aria-pressed', String(flipped));
            btn.textContent = flipped ? 'Буцаах' : 'Эргүүлэх';
        });
    });

    function hideLoader() {
        document.body.classList.add('loaded');
    }
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
})();