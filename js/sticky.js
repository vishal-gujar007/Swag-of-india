let contacts = new Map()
contacts.set('india', '+91888888888')
contacts.set('usa', '+188888888')
contacts.set('canada', '+1999999999')
contacts.set('uae', '+97188888888')



document.getElementById("select1").addEventListener('change', () => {
    let country = document.getElementById('select1').value;
    document.getElementById('contact').innerHTML = contacts.get(country);
    document.getElementById('flag').src = `images/${country}.png`;
})

document.getElementById("scrollUp").classList.add("hide");
getYPosition = () => {
    var top = window.pageYOffset || document.documentElement.scrollTop
    return top;
};


document.addEventListener('scroll', () => {
    var scroll = getYPosition();
    var arrow = document.getElementById('scrollUp');
    scrolled = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    if (scroll < 250) {
        document.getElementById("header-sticky").classList.remove("sticky-bar");
    } else {
        document.getElementById("header-sticky").classList.add("sticky-bar");
    }
    
    if (scroll > 1200) {
        arrow.classList.remove("hide");
        arrow.classList.add("show");
        arrow.addEventListener('click', scrolled);
    } else {
        document.getElementById('scrollUp').classList.remove("show");
        document.getElementById('scrollUp').classList.add("hide");
        document.getElementById("scrollUp").removeEventListener("click", scrolled);
    }
})
