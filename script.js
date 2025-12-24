// Rotating words animation
let currentWordIndex = 0
const words = document.querySelectorAll(".word")

function rotateWords() {
  if (words.length === 0) return

  words[currentWordIndex].classList.remove("active")
  currentWordIndex = (currentWordIndex + 1) % words.length
  words[currentWordIndex].classList.add("active")
}

if (words.length > 0) {
  setInterval(rotateWords, 2000)
}

// FAQ Toggle
function toggleFaq(element) {
  const faqItem = element.parentElement
  faqItem.classList.toggle("active")
}

// Maintenance Notification
function showMaintenanceNotification() {
  const notification = document.getElementById("notification")
  notification.classList.add("show")

  setTimeout(() => {
    notification.classList.remove("show")
  }, 3000)
}

// Contact Form Submission
function handleContactSubmit(event) {
  event.preventDefault()
  showMaintenanceNotification()
  event.target.reset()
}

// Globe Animation
const canvas = document.getElementById("globeCanvas")
if (canvas) {
  const ctx = canvas.getContext("2d")
  canvas.width = 500
  canvas.height = 500

  let rotation = 0
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = 150

  // Brazil position (approximate)
  const brazilLat = -15
  const brazilLon = -47

  function drawGlobe() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw globe
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath()
      const y = centerY + (lat / 90) * radius * 0.9
      const width = Math.cos((lat * Math.PI) / 180) * radius
      ctx.ellipse(centerX, y, width, radius * 0.2, 0, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      ctx.beginPath()
      const angle = ((lon + rotation) * Math.PI) / 180
      const x = centerX + Math.sin(angle) * radius
      ctx.ellipse(centerX, centerY, Math.abs(Math.cos(angle)) * radius * 0.3, radius, 0, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw Brazil marker
    const brazilAngle = ((brazilLon + rotation) * Math.PI) / 180
    const brazilX = centerX + Math.sin(brazilAngle) * radius * Math.cos((brazilLat * Math.PI) / 180)
    const brazilY = centerY + (brazilLat / 90) * radius

    // Only draw if on visible side
    if (Math.cos(brazilAngle) > 0) {
      ctx.beginPath()
      ctx.arc(brazilX, brazilY, 8, 0, Math.PI * 2)
      ctx.fillStyle = "#ffffff"
      ctx.fill()
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    rotation += 0.2
  }

  function animate() {
    drawGlobe()
    requestAnimationFrame(animate)
  }

  animate()

  // Hover tooltip
  let tooltip = null
  canvas.addEventListener("mouseenter", (e) => {
    if (!tooltip) {
      tooltip = document.createElement("div")
      tooltip.style.position = "fixed"
      tooltip.style.background = "#111"
      tooltip.style.border = "1px solid #fff"
      tooltip.style.padding = "10px 15px"
      tooltip.style.borderRadius = "8px"
      tooltip.style.pointerEvents = "none"
      tooltip.style.zIndex = "10000"
      tooltip.style.fontSize = "14px"
      tooltip.innerHTML = "🇧🇷 Feito no Brasil<br>Usado por brasileiros"
      document.body.appendChild(tooltip)
    }
  })

  canvas.addEventListener("mousemove", (e) => {
    if (tooltip) {
      tooltip.style.left = e.clientX + 20 + "px"
      tooltip.style.top = e.clientY + 20 + "px"
      tooltip.style.display = "block"
    }
  })

  canvas.addEventListener("mouseleave", () => {
    if (tooltip) {
      tooltip.style.display = "none"
    }
  })
}

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-links")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex"
    if (navLinks.style.display === "flex") {
      navLinks.style.flexDirection = "column"
      navLinks.style.position = "absolute"
      navLinks.style.top = "70px"
      navLinks.style.left = "0"
      navLinks.style.right = "0"
      navLinks.style.background = "#0a0a0a"
      navLinks.style.padding = "20px"
      navLinks.style.borderBottom = "1px solid #222"
    }
  })
}

// Smooth scroll for help links
document.querySelectorAll(".help-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" })
    }
  })
})
