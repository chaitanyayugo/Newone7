const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  ring.style.left = e.clientX - 14 + "px";
  ring.style.top = e.clientY - 14 + "px";
});

document.querySelectorAll(".magnetic").forEach(el => {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "translate(0px,0px)";
  });
});

document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 18;
    const rotateX = -(y / rect.height - 0.5) * 18;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const loader = document.getElementById("loader");

document.getElementById("enterBtn").addEventListener("click", () => {
  loader.style.opacity = "0";

  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});

window.addEventListener("scroll", () => {
  const value = window.scrollY;

  document.querySelector(".hero").style.transform =
    `translateY(${value * 0.08}px)`;
});

