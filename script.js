
        
        const sections = document.querySelectorAll("section[id]");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlighter);

        function navHighlighter() {

            // Get current scroll position
            let scrollY = window.pageYOffset;

            // Now we loop through sections to get height, top and ID values for each
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                sectionId = current.getAttribute("id");

                /*
                - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
                - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
                */
                if (
                    scrollY > sectionTop &&
                    scrollY <= sectionTop + sectionHeight
                ) {
                    document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
                } else {
                    document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
                }
            });
        }




        // theme
        const body = document.querySelector("body"),
            modeToggle = document.querySelector(".dark-light");



        // js code to toggle dark and light mode
        modeToggle.addEventListener("click", () => {
            modeToggle.classList.toggle("active");
            body.classList.toggle("dark");

            // js code to keep user selected mode even page refresh or file reopen
            if (!body.classList.contains("dark")) {
                localStorage.setItem("mode", "light-mode");
            } else {
                localStorage.setItem("mode", "dark-mode");
            }
        });

        //






        // animation
        const sr = ScrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 2500,
            delay: 200,
            reset: true,
        })
        sr.reveal(`.profile__border, .profile__name`)
        sr.reveal(`
          .profile__social,
          .profile_profession, 
          .profile__info-group,
          .profile__buttons,
          .projects__card,
          .skills__area`, { delay: 300, origin: 'bottom' })
