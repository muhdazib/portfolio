// ==========================
// PORTFOLIO JAVASCRIPT
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // BROWSER SCROLL RESTORATION
    // ==========================

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }


    // ==========================
    // FLOATING SIDE NAVIGATION
    // ==========================

    const sideMenu = document.getElementById("sideMenu");

    const sideLinks =
        Array.from(
            document.querySelectorAll(".side-menu a")
        );

    const pageSections =
        sideLinks
            .map(link =>
                document.getElementById(
                    link.dataset.section
                )
            )
            .filter(Boolean);


    let currentSectionIndex = 0;
    let wheelLocked = false;
    let scrollTicking = false;


    function updateSideMenu(index) {

        if (!sideLinks.length) return;


        currentSectionIndex =
            Math.max(
                0,
                Math.min(
                    index,
                    sideLinks.length - 1
                )
            );


        sideLinks.forEach(
            (link, linkIndex) => {

                link.classList.remove(
                    "active",
                    "near",
                    "far",
                    "distant"
                );


                const distance =
                    Math.abs(
                        linkIndex -
                        currentSectionIndex
                    );


                if (distance === 0) {

                    link.classList.add(
                        "active"
                    );

                }

                else if (distance === 1) {

                    link.classList.add(
                        "near"
                    );

                }

                else if (distance === 2) {

                    link.classList.add(
                        "far"
                    );

                }

                else {

                    link.classList.add(
                        "distant"
                    );

                }

            }
        );

    }


    // Exact section scrolling
    function scrollToSection(
        section,
        behavior = "smooth"
    ) {

        if (!section) return;


        const exactTop =
            section.getBoundingClientRect().top +
            window.scrollY;


        window.scrollTo({
            top: Math.round(exactTop),
            left: 0,
            behavior: behavior
        });

    }


    // Detect which section is currently visible
    function detectCurrentSection() {

        if (!pageSections.length) return;


        const marker =
            window.scrollY +
            window.innerHeight * 0.35;


        let activeIndex = 0;


        pageSections.forEach(
            (section, index) => {

                if (
                    section.offsetTop <= marker
                ) {

                    activeIndex = index;

                }

            }
        );


        updateSideMenu(
            activeIndex
        );

    }


    // Click side navigation
    sideLinks.forEach(
        (link, index) => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const targetSection =
                        document.getElementById(
                            link.dataset.section
                        );


                    if (!targetSection) {
                        return;
                    }


                    scrollToSection(
                        targetSection
                    );


                    updateSideMenu(
                        index
                    );

                }
            );

        }
    );


    // Mouse wheel on side navigation
    if (sideMenu) {

        sideMenu.addEventListener(
            "wheel",

            event => {

                event.preventDefault();


                if (
                    wheelLocked ||
                    !sideLinks.length
                ) {
                    return;
                }


                wheelLocked = true;


                if (event.deltaY > 0) {

                    currentSectionIndex++;

                }

                else if (event.deltaY < 0) {

                    currentSectionIndex--;

                }


                currentSectionIndex =
                    Math.max(
                        0,
                        Math.min(
                            currentSectionIndex,
                            sideLinks.length - 1
                        )
                    );


                const targetLink =
                    sideLinks[
                        currentSectionIndex
                    ];


                const targetSection =
                    document.getElementById(
                        targetLink.dataset.section
                    );


                scrollToSection(
                    targetSection
                );


                updateSideMenu(
                    currentSectionIndex
                );


                setTimeout(
                    () => {

                        wheelLocked = false;

                    },
                    650
                );

            },

            {
                passive: false
            }

        );

    }


    // Detect current section while scrolling
    window.addEventListener(
        "scroll",
        () => {

            if (scrollTicking) {
                return;
            }


            scrollTicking = true;


            window.requestAnimationFrame(
                () => {

                    detectCurrentSection();

                    scrollTicking = false;

                }
            );

        }
    );


    // ==========================
    // CONTACT DROPDOWN
    // ==========================

    updateSideMenu(0);

    const contactToggle =
    document.getElementById("contactToggle");

    const contactDropdown =
        document.getElementById("contactDropdown");

    if (contactToggle && contactDropdown) {

        contactToggle.addEventListener("click", () => {

            const isOpen =
                contactDropdown.classList.toggle("show");

            contactToggle.classList.toggle(
                "open",
                isOpen
            );

            contactToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        document.addEventListener("click", event => {

            if (
                !contactToggle.contains(event.target) &&
                !contactDropdown.contains(event.target)
            ) {

                contactDropdown.classList.remove("show");

                contactToggle.classList.remove("open");

                contactToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }

    // ==========================
    // TYPING EFFECT
    // ==========================

    const typingText =
        document.getElementById(
            "typing-text"
        );


    if (typingText) {

        const roles = [
            "Software Developer",
            "Data Analyst",
            "Tech Enthusiast",
            "Data Enthusiast"
        ];


        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;


        function typeEffect() {

            const currentRole =
                roles[roleIndex];


            if (!deleting) {

                typingText.textContent =
                    currentRole.substring(
                        0,
                        characterIndex + 1
                    );


                characterIndex++;


                if (
                    characterIndex ===
                    currentRole.length
                ) {

                    deleting = true;


                    setTimeout(
                        typeEffect,
                        1500
                    );


                    return;
                }

            }

            else {

                typingText.textContent =
                    currentRole.substring(
                        0,
                        characterIndex - 1
                    );


                characterIndex--;


                if (
                    characterIndex === 0
                ) {

                    deleting = false;


                    roleIndex =
                        (
                            roleIndex + 1
                        ) %
                        roles.length;

                }

            }


            const speed =
                deleting
                    ? 60
                    : 100;


            setTimeout(
                typeEffect,
                speed
            );

        }


        typeEffect();

    }



    // ==========================
    // SKILLS CAROUSEL
    // ==========================

    const skillsSection =
        document.getElementById(
            "skills"
        );


    const skillPanels =
        Array.from(
            document.querySelectorAll(
                ".skill-panel"
            )
        );


    const skillSelectors =
        Array.from(
            document.querySelectorAll(
                ".skill-selector"
            )
        );


    const skillPrev =
        document.getElementById(
            "skillPrev"
        );


    const skillNext =
        document.getElementById(
            "skillNext"
        );


    const skillCurrent =
        document.getElementById(
            "skillCurrent"
        );


    let activeSkill = 0;



    function updateSkillCarousel(
        index
    ) {

        if (!skillPanels.length) {
            return;
        }


        const total =
            skillPanels.length;


        // Infinite looping
        activeSkill =
            (
                index + total
            ) %
            total;


        const prevIndex =
            (
                activeSkill -
                1 +
                total
            ) %
            total;


        const nextIndex =
            (
                activeSkill +
                1
            ) %
            total;



        skillPanels.forEach(
            (
                panel,
                panelIndex
            ) => {

                panel.classList.remove(
                    "active",
                    "prev",
                    "next",
                    "hidden"
                );


                if (
                    panelIndex ===
                    activeSkill
                ) {

                    panel.classList.add(
                        "active"
                    );

                }

                else if (
                    panelIndex ===
                    prevIndex
                ) {

                    panel.classList.add(
                        "prev"
                    );

                }

                else if (
                    panelIndex ===
                    nextIndex
                ) {

                    panel.classList.add(
                        "next"
                    );

                }

                else {

                    panel.classList.add(
                        "hidden"
                    );

                }

            }
        );


        skillSelectors.forEach(
            (
                button,
                buttonIndex
            ) => {

                button.classList.toggle(
                    "active",
                    buttonIndex ===
                        activeSkill
                );

            }
        );


        if (skillCurrent) {

            skillCurrent.textContent =
                String(
                    activeSkill + 1
                ).padStart(
                    2,
                    "0"
                );

        }

    }



    // Previous button
    if (skillPrev) {

        skillPrev.addEventListener(
            "click",
            () => {

                updateSkillCarousel(
                    activeSkill - 1
                );

            }
        );

    }



    // Next button
    if (skillNext) {

        skillNext.addEventListener(
            "click",
            () => {

                updateSkillCarousel(
                    activeSkill + 1
                );

            }
        );

    }



    // Bottom category buttons
    skillSelectors.forEach(
        (
            button,
            index
        ) => {

            button.addEventListener(
                "click",
                () => {

                    updateSkillCarousel(
                        index
                    );

                }
            );

        }
    );



    // ==========================
    // KEYBOARD CAROUSEL CONTROL
    // ==========================

    document.addEventListener(
        "keydown",
        event => {

            if (
                !skillsSection ||
                !skillPanels.length
            ) {
                return;
            }


            const rect =
                skillsSection
                    .getBoundingClientRect();


            const skillsVisible =
                rect.top <
                    window.innerHeight &&
                rect.bottom > 0;


            if (!skillsVisible) {
                return;
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                updateSkillCarousel(
                    activeSkill - 1
                );

            }


            else if (
                event.key ===
                "ArrowRight"
            ) {

                updateSkillCarousel(
                    activeSkill + 1
                );

            }

        }
    );



    // ==========================
    // MOBILE SWIPE SUPPORT
    // ==========================

    const skillsStage =
        document.querySelector(
            ".skills-stage"
        );


    let touchStartX = 0;


    if (skillsStage) {

        skillsStage.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .clientX;

            },

            {
                passive: true
            }
        );


        skillsStage.addEventListener(
            "touchend",
            event => {

                const touchEndX =
                    event.changedTouches[0]
                        .clientX;


                const distance =
                    touchEndX -
                    touchStartX;


                if (
                    Math.abs(
                        distance
                    ) < 45
                ) {

                    return;

                }


                // Swipe left
                if (distance < 0) {

                    updateSkillCarousel(
                        activeSkill + 1
                    );

                }

                // Swipe right
                else {

                    updateSkillCarousel(
                        activeSkill - 1
                    );

                }

            },

            {
                passive: true
            }
        );

    }


    // Initialise carousel
    updateSkillCarousel(0);



    // ==========================
// PROJECTS CAROUSEL
// ==========================

const projectsSection =
    document.getElementById(
        "projects"
    );


const projectSlides =
    Array.from(
        document.querySelectorAll(
            ".project-slide"
        )
    );


const projectSelectors =
    Array.from(
        document.querySelectorAll(
            ".project-selector"
        )
    );


const projectPrev =
    document.getElementById(
        "projectPrev"
    );


const projectNext =
    document.getElementById(
        "projectNext"
    );


const projectCurrent =
    document.getElementById(
        "projectCurrent"
    );


const projectTotal =
    document.getElementById(
        "projectTotal"
    );


const projectsStage =
    document.querySelector(
        ".projects-stage"
    );


let activeProject = 0;



function updateProjectCarousel(index) {

    if (!projectSlides.length) {
        return;
    }


    const total =
        projectSlides.length;


    activeProject =
        (
            index + total
        ) %
        total;


    const previousIndex =
        (
            activeProject -
            1 +
            total
        ) %
        total;


    const nextIndex =
        (
            activeProject +
            1
        ) %
        total;


    projectSlides.forEach(
        (
            slide,
            slideIndex
        ) => {

            slide.classList.remove(
                "active",
                "prev",
                "next",
                "hidden"
            );


            if (
                slideIndex ===
                activeProject
            ) {

                slide.classList.add(
                    "active"
                );

            }

            else if (
                slideIndex ===
                previousIndex
            ) {

                slide.classList.add(
                    "prev"
                );

            }

            else if (
                slideIndex ===
                nextIndex
            ) {

                slide.classList.add(
                    "next"
                );

            }

            else {

                slide.classList.add(
                    "hidden"
                );

            }

        }
    );


    // Bottom buttons
    projectSelectors.forEach(
        (
            button,
            buttonIndex
        ) => {

            button.classList.toggle(
                "active",
                buttonIndex ===
                    activeProject
            );

        }
    );


    // Current project number
    if (projectCurrent) {

        projectCurrent.textContent =
            String(
                activeProject + 1
            ).padStart(
                2,
                "0"
            );

    }


    // Total number
    if (projectTotal) {

        projectTotal.textContent =
            String(
                total
            ).padStart(
                2,
                "0"
            );

    }


    // Automatically fit stage to
    // the active project card height
    if (projectsStage) {

        requestAnimationFrame(
            () => {

                const activeSlide =
                    projectSlides[
                        activeProject
                    ];


                const activeHeight =
                    activeSlide.scrollHeight;


                projectsStage.style.height =
                    `${activeHeight + 15}px`;

            }
        );

    }

}



// Previous project
if (projectPrev) {

    projectPrev.addEventListener(
        "click",
        () => {

            updateProjectCarousel(
                activeProject - 1
            );

        }
    );

}



// Next project
if (projectNext) {

    projectNext.addEventListener(
        "click",
        () => {

            updateProjectCarousel(
                activeProject + 1
            );

        }
    );

}



// Bottom project selectors
projectSelectors.forEach(
    (
        button,
        index
    ) => {

        button.addEventListener(
            "click",
            () => {

                updateProjectCarousel(
                    index
                );

            }
        );

    }
);



// ==========================
// PROJECT KEYBOARD CONTROL
// ==========================

document.addEventListener(
    "keydown",
    event => {

        if (
            !projectsSection ||
            !projectSlides.length
        ) {
            return;
        }


        const rect =
            projectsSection
                .getBoundingClientRect();


        const projectsVisible =
            rect.top <
                window.innerHeight &&
            rect.bottom > 0;


        if (!projectsVisible) {
            return;
        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            updateProjectCarousel(
                activeProject - 1
            );

        }


        else if (
            event.key ===
            "ArrowRight"
        ) {

            updateProjectCarousel(
                activeProject + 1
            );

        }

    }
);



// ==========================
// PROJECT MOBILE SWIPE
// ==========================

let projectTouchStartX = 0;


if (projectsStage) {

    projectsStage.addEventListener(
        "touchstart",
        event => {

            projectTouchStartX =
                event.changedTouches[0]
                    .clientX;

        },

        {
            passive: true
        }
    );


    projectsStage.addEventListener(
        "touchend",
        event => {

            const touchEndX =
                event.changedTouches[0]
                    .clientX;


            const distance =
                touchEndX -
                projectTouchStartX;


            if (
                Math.abs(distance) < 45
            ) {
                return;
            }


            // Swipe left
            if (distance < 0) {

                updateProjectCarousel(
                    activeProject + 1
                );

            }

            // Swipe right
            else {

                updateProjectCarousel(
                    activeProject - 1
                );

            }

        },

        {
            passive: true
        }
    );

}



// Initialise
updateProjectCarousel(0);



    // ==========================
    // CURRENT YEAR
    // ==========================

    const yearElement =
        document.getElementById(
            "year"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }



    // ==========================
    // INITIAL PAGE POSITION
    // ==========================

    window.addEventListener(
        "load",
        () => {

            const hashId =
                window.location.hash
                    .replace(
                        "#",
                        ""
                    );


            const hashSection =
                hashId
                    ? document.getElementById(
                        hashId
                    )
                    : null;


            if (hashSection) {

                scrollToSection(
                    hashSection,
                    "auto"
                );

            }

            else {

                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "auto"
                });

            }


            detectCurrentSection();

        }
    );

});