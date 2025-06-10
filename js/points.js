const tabs = document.querySelectorAll('.fielding-tab');
const sections = document.querySelectorAll('.fielding-points-container');
const tabsWrapper = document.getElementById('fieldingTabs');

let isScrollingProgrammatically = false;

function onScroll() {
    const navbarHeight = 60;
    const wrapperTop = tabsWrapper.parentElement.offsetTop;
    const lastSection = sections[sections.length - 1];
    const endPoint = lastSection.offsetTop + lastSection.offsetHeight;

    if (window.scrollY + navbarHeight >= wrapperTop && window.scrollY + navbarHeight < endPoint) {
        tabsWrapper.classList.add('sticky');
    } else {
        tabsWrapper.classList.remove('sticky');
    }

    // If we're scrolling due to a click, skip activating tab
    if (isScrollingProgrammatically) return;

    let index = sections.length;
    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
    tabs.forEach((tab) => tab.classList.remove('active'));
    tabs[index].classList.add('active');
}

onScroll();
window.addEventListener('scroll', onScroll);

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetSection = document.getElementById(tab.dataset.target);

        // Set clicked tab active immediately
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Scroll the active tab into view horizontally
        tab.scrollIntoView({ behavior: 'smooth', inline: 'center' });

        // Temporarily ignore scroll-triggered updates
        isScrollingProgrammatically = true;
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Re-enable scroll detection after animation
        setTimeout(() => {
            isScrollingProgrammatically = false;
        }, 1000); // Adjust if needed
    });
});