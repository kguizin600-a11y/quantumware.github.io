// Download Button Click Handler
const downloadBtn = document.getElementById("downloadBtn")
const notification = document.getElementById("notification")

downloadBtn.addEventListener("click", () => {
  // Show notification
  notification.classList.add("show")

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show")
  }, 3000)
})

// Smooth scroll for navigation links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    const targetSection = document.getElementById(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add parallax effect to hero decoration
document.addEventListener("mousemove", (e) => {
  const circles = document.querySelectorAll(".quantum-circle")
  const x = e.clientX / window.innerWidth
  const y = e.clientY / window.innerHeight

  circles.forEach((circle, index) => {
    const speed = (index + 1) * 10
    circle.style.transform = `translate(${x * speed}px, ${y * speed}px)`
  })
})
