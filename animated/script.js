document.addEventListener("DOMContentLoaded", () => {

  const text = ["Backend Developer ", "Cloud Learner ", "Tech Enthusiast "];
  let i = 0, j = 0, current = "", deleting = false;

  function type() {
    current = text[i];

    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    if (deleting) {
      typingElement.textContent = current.substring(0, j--);
    } else {
      typingElement.textContent = current.substring(0, j++);
    }

    if (!deleting && j === current.length) {
      deleting = true;
      setTimeout(type, 1000);
      return;
    }

    if (deleting && j === 0) {
      deleting = false;
      i = (i + 1) % text.length;
    }

    setTimeout(type, deleting ? 50 : 100);
  }

  type();


  const cursor = document.querySelector(".cursor");

  if (cursor) {
    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;

      cursor.style.transform = `translate(${posX}px, ${posY}px)`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  }


  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
      };

      fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        form.reset();
      })
      .catch(err => {
        console.log(err);
        alert("Error sending message");
      });
    });
  }

});

function showMsg() {
  alert("Hi 👋 Thanks for visiting!");
}