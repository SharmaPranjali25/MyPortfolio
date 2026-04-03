'use strict';

// ─── PROJECT DATA ─────────────────────────────────────────────────────────────
const projectData = {
  "Emergency Rescue Reporting": {
    category: "Full Stack",
    github: "https://github.com/SharmaPranjali25/Emergency_Rescue_Reporting",
    desc: `A full-stack web-based emergency management platform designed to enhance workplace safety and streamline emergency response procedures. The system supports employee management, attendance tracking, and real-time incident reporting with facial recognition integration for automated safety monitoring.

TECHNOLOGIES USED:
Java • Spring Boot • MySQL • JPA/Hibernate • RESTful APIs • Angular • HTML • CSS • Maven • Postman • Facial Recognition Integration

MY ROLE & CONTRIBUTION:
• Collaborated with the Full-Stack Java Development Team to architect and develop the entire backend system
• Implemented core backend functionalities following RESTful API design principles and clean code architecture
• Developed multiple API endpoints for CRUD operations on employee data, attendance records, and emergency incident management
• Integrated JPA/Hibernate for efficient database operations and implemented custom query methods for complex data retrieval
• Enforced role-based access control for sensitive emergency data and ensured secure data handling
• Validated all critical workflows through comprehensive API testing via Postman`
  },
  "Developer Hub": {
    category: "Full Stack",
    github: "https://github.com/SharmaPranjali25/Developer-Hub",
    desc: `A responsive, single-page GitHub dashboard application built with Angular 17, featuring secure OAuth 2.0 authentication and real-time repository insights across multiple repositories.

TECHNOLOGIES USED:
Angular 17 (Standalone Components) • TypeScript • SCSS • Auth0 (OAuth 2.0, JWT) • GitHub REST API v3 • RxJS • Angular Router • VS Code • Angular CLI

KEY FEATURES:
• Integrated Auth0 OAuth 2.0 SSO for secure user authentication with callback handling and session-based login/logout flow
• Built a multi-repository sidebar with dynamic switching — each selection triggers a fresh API fetch cycle, resetting filters, pagination, and issue state
• Consumed GitHub REST API to fetch live issues and pull requests with server-side pagination and a load more pattern
• Implemented real-time filtering across Open, Closed, and Pull Request states with a live search that narrows results client-side without additional API calls
• Computed dynamic stat cards showing open issue count, open PR count, weekly closed issues, and total repository issues
• Built a fully custom dark-themed UI from scratch using SCSS with a dark navy and vibrant yellow accent design system, consistent across all components`
  },
  "Hostel Management System": {
    category: "Web Development",
    github: "https://github.com/SharmaPranjali25/HMS_Project2",
    desc: `A comprehensive web application designed to streamline the management of hostel operations. Addresses common challenges faced by hostel administrators and students with a user-friendly interface.

FEATURES:
• User Authentication — Admin Login for hostel operations & Student Login for personal info
• Room Management — View available rooms, amenities, occupancy status & reservation system
• Fee Management — Online fee payment, payment history and tracking
• Leave Applications — Submit leave requests & track application status in real-time
• Late Entry Management — Request late entry permissions with automated approval notifications

TECHNOLOGY STACK:
Frontend: HTML • CSS • JavaScript
Backend: PHP
Database: MySQL`
  },
  "Test Automation Framework": {
    category: "Testing",
    github: "https://github.com/SharmaPranjali25/SeleniumTest",
    desc: `A robust, reusable test automation framework to automate end-to-end testing workflows for web applications. Built following industry best practices to ensure scalability, maintainability, and efficient test execution.

TECHNOLOGIES USED:
Selenium WebDriver • TestNG • Java • Maven • Page Object Model (POM)

MY ROLE & CONTRIBUTION:
• Designed and developed the entire framework from scratch as a self-driven learning initiative
• Implemented the Page Object Model (POM) design pattern to separate test logic from UI structure, improving code reusability
• Created modular page classes encapsulating web element locators and page-specific actions for scalable test development
• Configured TestNG XML suites for parallel test execution across multiple browsers
• Gained practical experience in test automation best practices applicable to real-world QA environments`
  }
};

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// ─── PROJECT FILTER ───────────────────────────────────────────────────────────
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.trim().toLowerCase();
    selectValue.innerText = this.innerText.trim();
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = (filterItems[i].dataset.category || "").trim().toLowerCase();
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.trim().toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────
const modalOverlay = document.getElementById("projectModalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("projectModalClose");

document.querySelectorAll(".project-card-link").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Read title from data attribute; look up rest from projectData object
    const title = this.dataset.title;
    const project = projectData[title];

    if (!project) return;

    modalTitle.textContent = title;
    modalCategory.textContent = project.category;
    modalBody.innerHTML = "";

    const descText = document.createElement("p");
    descText.style.whiteSpace = "pre-line";
    descText.textContent = project.desc;
    modalBody.appendChild(descText);

    if (project.github) {
      const btn = document.createElement("a");
      btn.href = project.github;
      btn.target = "_blank";
      btn.className = "modal-github-btn";
      btn.innerHTML = '<ion-icon name="logo-github"></ion-icon> View on GitHub';
      modalBody.appendChild(btn);
    }

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") { closeModal(); closeCertLightbox(); }
});

// ─── PAGE NAVIGATION ──────────────────────────────────────────────────────────
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clicked = this.innerText.trim().toLowerCase();

    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }

    this.classList.add("active");

    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page.toLowerCase() === clicked) {
        pages[j].classList.add("active");
        window.scrollTo(0, 0);
        break;
      }
    }
  });
}

// ─── CERTIFICATE LIGHTBOX ─────────────────────────────────────────────────────
const certLightbox = document.getElementById("certLightbox");
const certLightboxImg = document.getElementById("certLightboxImg");
const certLightboxClose = document.getElementById("certLightboxClose");
const certLightboxOverlay = document.getElementById("certLightboxOverlay");

document.querySelectorAll(".cert-img-clickable").forEach(function (img) {
  img.addEventListener("click", function () {
    certLightboxImg.src = this.dataset.full;
    certLightboxImg.alt = this.alt;
    certLightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeCertLightbox() {
  certLightbox.classList.remove("active");
  document.body.style.overflow = "";
  certLightboxImg.src = "";
}

certLightboxClose.addEventListener("click", closeCertLightbox);
certLightboxOverlay.addEventListener("click", closeCertLightbox);