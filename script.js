// Mobile Navigation and Scroll Effects
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")
  const header = document.querySelector(".header")

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })

  // Mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
      })
    })
  }

  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.reveal')
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        revealObserver.unobserve(entry.target)
      }
    })
  }, revealOptions)

  revealElements.forEach(element => {
    revealObserver.observe(element)
  })

  // Stats Counter Animation
  const statItems = document.querySelectorAll(".stat-item")
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number")
        const targetCount = Number.parseInt(entry.target.dataset.count)
        animateCounter(statNumber, targetCount)
        statsObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  statItems.forEach((item) => {
    statsObserver.observe(item)
  })

  function animateCounter(element, target) {
    let current = 0
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current) + (target > 100 ? "+" : "")
    }, 30)
  }

  // Activity Filter with smooth transitions
  const filterBtns = document.querySelectorAll(".filter-btn")
  const activityCards = document.querySelectorAll(".activity-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const filter = this.dataset.filter

      activityCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block"
          requestAnimationFrame(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          })
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Event Tabs with smooth transitions
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabContents.forEach((c) => {
        c.style.opacity = "0"
        c.style.transform = "translateY(10px)"
        setTimeout(() => {
          c.classList.remove("active")
        }, 300)
      })

      this.classList.add("active")
      const targetTab = this.dataset.tab
      const targetContent = document.getElementById(targetTab)
      if (targetContent) {
        targetContent.classList.add("active")
        requestAnimationFrame(() => {
          targetContent.style.opacity = "1"
          targetContent.style.transform = "translateY(0)"
        })
      }
    })
  })

  // FAQ Accordion with smooth animations
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")
    
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      faqItems.forEach((faq) => {
        const faqAnswer = faq.querySelector(".faq-answer")
        faq.classList.remove("active")
        if (faqAnswer) {
          faqAnswer.style.maxHeight = "0"
        }
      })

      if (!isActive) {
        item.classList.add("active")
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + "px"
        }
      }
    })
  })

  // Contact Form with enhanced validation and feedback
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      // Enhanced validation
      const errors = []
      if (!data.firstName?.trim()) errors.push("First name is required")
      if (!data.lastName?.trim()) errors.push("Last name is required")
      if (!data.email?.trim()) errors.push("Email is required")
      if (!data.subject?.trim()) errors.push("Subject is required")
      if (!data.message?.trim()) errors.push("Message is required")

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (data.email && !emailRegex.test(data.email)) {
        errors.push("Please enter a valid email address")
      }

      if (errors.length > 0) {
        alert(errors.join("\n"))
        return
      }

      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate form submission with loading animation
      setTimeout(() => {
        alert("Thank you for your message! We will get back to you soon.")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Newsletter Form with enhanced UX
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]')
    const submitBtn = newsletterForm.querySelector('button[type="submit"]')

    emailInput.addEventListener('input', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(emailInput.value)) {
        emailInput.classList.add('valid')
        emailInput.classList.remove('invalid')
      } else {
        emailInput.classList.remove('valid')
        if (emailInput.value) {
          emailInput.classList.add('invalid')
        }
      }
    })

    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const email = emailInput.value
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(email)) {
        emailInput.classList.add('invalid')
        return
      }

      const originalText = submitBtn.textContent
      submitBtn.textContent = "Subscribing..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("Thank you for subscribing to our newsletter!")
        this.reset()
        emailInput.classList.remove('valid', 'invalid')
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 1500)
    })
  }

  // Calendar
  const calendarGrid = document.getElementById("calendarGrid")
  const currentMonthElement = document.getElementById("currentMonth")
  const prevMonthBtn = document.getElementById("prevMonth")
  const nextMonthBtn = document.getElementById("nextMonth")

  if (calendarGrid && currentMonthElement) {
    const currentDate = new Date()
    const eventDates = [20, 15, 10, 25, 15, 22] // Sample event dates

    function generateCalendar(year, month) {
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const daysInMonth = lastDay.getDate()
      const startingDayOfWeek = firstDay.getDay()

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]

      currentMonthElement.textContent = `${monthNames[month]} ${year}`

      let calendarHTML = ""

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        calendarHTML += '<div class="calendar-day"></div>'
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const hasEvent = eventDates.includes(day)
        const eventClass = hasEvent ? "event" : ""
        calendarHTML += `<div class="calendar-day ${eventClass}">${day}</div>`
      }

      calendarGrid.innerHTML = calendarHTML
    }

    if (prevMonthBtn) {
      prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1)
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
      })
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1)
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
      })
    }

    // Initialize calendar
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
  }

  // Intersection Observer for animations
  const animateElements = document.querySelectorAll(".feature-card, .activity-card, .team-member, .mv-card")

  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
          animationObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animateElements.forEach((element) => {
    animationObserver.observe(element)
  })

  // Form field focus effects
  const formInputs = document.querySelectorAll("input, textarea, select")
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused")
      }
    })
  })

  // Loading animation for buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (this.classList.contains("loading")) return

      // Add ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-group.focused label {
        color: #1a1a1a;
    }
    
    .form-group.focused input,
    .form-group.focused textarea,
    .form-group.focused select {
        border-color: #1a1a1a;
        box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
    }

    /* Animation Classes */
    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Enhanced Mobile Menu */
    .nav-menu {
        transition: all 0.3s ease;
    }

    .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }

    /* Smooth Scroll */
    html {
        scroll-behavior: smooth;
    }
`
document.head.appendChild(style)

// Projects Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            projectCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Project progress animation
    const progressBars = document.querySelectorAll('.progress');
    const animateProgress = () => {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    };

    // Intersection Observer for progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgress();
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Project image hover effect
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.querySelector('.project-overlay').style.opacity = '1';
        });
        image.addEventListener('mouseleave', () => {
            image.querySelector('.project-overlay').style.opacity = '0';
        });
    });

    // Impact numbers animation
    const impactNumbers = document.querySelectorAll('.impact-number');
    const animateNumbers = () => {
        impactNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateNumber = () => {
                current += step;
                if (current < target) {
                    number.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateNumber);
                } else {
                    number.textContent = target.toLocaleString();
                }
            };

            updateNumber();
        });
    };

    // Intersection Observer for impact numbers
    const impactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                impactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    impactNumbers.forEach(number => {
        impactObserver.observe(number);
    });
});
