const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');

const toggleDropDown = () => {

    dropDownMenu.classList.toggle('open');

    const isOpen = dropDownMenu.classList.contains('open');

    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
}

toggleBtn.onclick = toggleDropDown;

const initSlider = () => {
    const imageList = document.querySelector('.slider_wrapper .image_list');
    const slideButtons = document.querySelectorAll('.slider_wrapper .arrows');
    const sliderScrollbar = document.querySelector('.container .slider_scrollbar');
    const scrollBarThumb = document.querySelector('.scrollbar_thumb');

    const handelResize = () => {
        maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
        updateScrollThumbPosition();
    };

    window.addEventListener('resize', handelResize);

    scrollBarThumb.addEventListener('mousedown', (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollBarThumb.offsetLeft;
        const maxThumbPostion = sliderScrollbar.getBoundingClientRect().width - scrollBarThumb.offsetWidth;

        const handelMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            const boundedPosition = Math.max(0, Math.min(maxThumbPostion, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPostion) * maxScrollLeft;

            scrollBarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        const handelMouseUp = () => {
            document.removeEventListener('mousemove', handelMouseMove);
            document.removeEventListener('mouseup', handelMouseUp);
        }
        document.addEventListener('mousemove', handelMouseMove);
        document.addEventListener('mouseup', handelMouseUp);
    });

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "arrow_previous" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({left: scrollAmount, behavior: "smooth"});
        })
    })

    const handelSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? 'none' : 'block';
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? 'none' : 'block';
    }

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollBarThumb.offsetWidth);
        scrollBarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener('scroll', () => {
        handelSlideButtons();
        updateScrollThumbPosition();
    })
}

window.addEventListener('load', initSlider);


document.addEventListener("DOMContentLoaded", function () {
    function addBlogPost(title, content, date, group, imagePath) {
        console.log("Adding new post");
        const blogPost = document.createElement("div");
        blogPost.classList.add("blog_post");
        
        // Create and set the image element
        const image = document.createElement("img");
        image.src = imagePath; // Use the provided image path
        image.alt = title;
        blogPost.appendChild(image);

        // Create and set the title element
        const titleElement = document.createElement("h3");
        titleElement.textContent = title;
        blogPost.appendChild(titleElement);

        // Create and set the content element
        const contentElement = document.createElement("p");
        contentElement.textContent = content;
        blogPost.appendChild(contentElement);

        // Create and set the date element
        const dateElement = document.createElement("p");
        dateElement.textContent = `Date: ${date}`;
        blogPost.appendChild(dateElement);

        // Create and set the group element
        const groupElement = document.createElement("p");
        groupElement.textContent = `Group: ${group}`;
        blogPost.appendChild(groupElement);

        const blogContainer = document.getElementById("blogContainer");
        blogContainer.appendChild(blogPost);
    }

    // Example usage
    addBlogPost("New Car Model", "Check out the latest car model with amazing features!", "2022-02-15", "Car News", "./img/1.jpg");
    addBlogPost("Tips for Maintenance", "Learn how to maintain your car for optimal performance.", "2022-02-18", "Maintenance Tips", "./img/2.jpg");
    addBlogPost("New Car Model", "Check out the latest car model with amazing features!", "2022-02-15", "Car News", "./img/1.jpg");
    addBlogPost("Tips for Maintenance", "Learn how to maintain your car for optimal performance.", "2022-02-18", "Maintenance Tips", "./img/2.jpg");
    addBlogPost("New Car Model", "Check out the latest car model with amazing features!", "2022-02-15", "Car News", "./img/1.jpg");
    addBlogPost("Tips for Maintenance", "Learn how to maintain your car for optimal performance.", "2022-02-18", "Maintenance Tips", "./img/2.jpg");
    addBlogPost("New Car Model", "Check out the latest car model with amazing features!", "2022-02-15", "Car News", "./img/1.jpg");
    addBlogPost("Tips for Maintenance", "Learn how to maintain your car for optimal performance.", "2022-02-18", "Maintenance Tips", "./img/2.jpg");
});

document.getElementById('scrollDownButtonMain').addEventListener('click', function() {
    const sliderElement = document.querySelector('.slider');
    
    const offset = 80; 

    const targetScrollPosition = sliderElement.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
    });
});