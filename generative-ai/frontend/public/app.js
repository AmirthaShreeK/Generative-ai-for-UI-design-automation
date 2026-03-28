const output = document.getElementById("outputArea");
const preview = document.getElementById("previewArea");
const micBtn = document.getElementById("micBtn");
const promptInput = document.getElementById("promptInput");

// 🔘 Generate UI from text
document.getElementById("generateBtn").addEventListener("click", async () => {
  const rawPrompt = promptInput.value.trim();
  const style = document.getElementById("styleSelect").value;

  if (!rawPrompt) {
    output.textContent = "❌ Please enter a description first.";
    preview.innerHTML = "";
    return;
  }

  let prompt = rawPrompt;
  if (style === "tailwind") prompt += " Use Tailwind CSS for styling.";
  else if (style === "daisyui") prompt += " Use DaisyUI components for styling.";
  else if (style === "flowbite") prompt += " Use Flowbite layout and components.";
  else if (style === "vanilla") prompt += " Use plain HTML and custom CSS. Do not use frameworks.";

  output.textContent = "⏳ Generating UI for: " + rawPrompt + "...\n\nPlease wait...";
  preview.innerHTML = "";

  try {
    const response = await fetch("http://localhost:5000/generate-ui", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    let code = data.code || "";

    const match = code.match(/```(?:html)?\n?([\s\S]*?)```/i);

    if (match) code = match[1].trim();

    output.textContent = code;
    output.removeAttribute("data-highlighted");
    hljs.highlightElement(output);

    preview.innerHTML = code;

    preview.querySelectorAll("img").forEach(img => {
      img.onerror = () => {
        img.src = "https://dummyimage.com/300x200/cccccc/000000&text=Image+Not+Found";
      };
    });
  } catch (err) {
    console.error(err);
    output.textContent = "❌ Failed to connect to backend.";
  }
});

// 📋 Copy Code
document.getElementById("copyBtn").addEventListener("click", () => {
  const code = output.textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert("✅ Code copied to clipboard!");
  });
});

// 💾 Download HTML
document.getElementById("downloadBtn").addEventListener("click", () => {
  const code = output.textContent;
  const blob = new Blob([code], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "generated-ui.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

// 🎤 Voice Input
micBtn.addEventListener("click", () => {
  if (!("webkitSpeechRecognition" in window)) {
    alert("❌ Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    micBtn.innerText = "🎙️ Listening...";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    promptInput.value = transcript;
    micBtn.innerText = "🎤 Speak";
  };

  recognition.onerror = () => {
    micBtn.innerText = "🎤 Speak";
  };

  recognition.onend = () => {
    micBtn.innerText = "🎤 Speak";
  };

  recognition.start();
});

// 🖼️ Generate from image
document.getElementById("generateFromImageBtn").addEventListener("click", async () => {
  const imageUrl = document.getElementById("imageUrl").value.trim();
  const imageFile = document.getElementById("imageUpload").files[0];
  const style = document.getElementById("styleSelect").value;

  output.textContent = "⏳ Processing image...\nPlease wait...";
  preview.innerHTML = "";

  const formData = new FormData();

  if (imageFile) {
    formData.append("image", imageFile);
  } else if (imageUrl) {
    formData.append("imageUrl", imageUrl);
  } else {
    output.textContent = "❌ Please provide an image URL or upload an image.";
    return;
  }

  formData.append("style", style);

  try {
    const response = await fetch("http://localhost:5000/generate-ui-from-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    let code = data.code || "";

    const match = code.match(/```(?:html)?\n?([\s\S]*?)```/i);

    if (match) code = match[1].trim();

    output.textContent = code;
    output.removeAttribute("data-highlighted");
    hljs.highlightElement(output);

    preview.innerHTML = code;

    preview.querySelectorAll("img").forEach(img => {
      img.onerror = () => {
        img.src = "https://dummyimage.com/300x200/cccccc/000000&text=Image+Not+Found";
      };
    });
  } catch (err) {
    console.error(err);
    output.textContent = "❌ Failed to connect to backend.";
  }
});

// 🖥️ Live Device Preview Toggle (with frame styles)
document.querySelectorAll(".device-btn").forEach(button => {
  button.addEventListener("click", () => {
    const size = button.getAttribute("data-size");
    const frame = document.getElementById("deviceFrame");

    // Reset active state
    document.querySelectorAll(".device-btn").forEach(btn => btn.classList.remove("ring", "ring-offset-2"));
    button.classList.add("ring", "ring-offset-2");

    // Set frame class
    frame.classList.remove("device-frame-desktop", "device-frame-tablet", "device-frame-mobile");
    if (size === "desktop") frame.classList.add("device-frame-desktop");
    if (size === "tablet") frame.classList.add("device-frame-tablet");
    if (size === "mobile") frame.classList.add("device-frame-mobile");

    frame.scrollIntoView({ behavior: "smooth" });
  });
});

// 🖥️ Live Device Preview Toggle
document.querySelectorAll(".device-btn").forEach(button => {
  button.addEventListener("click", () => {
    const size = button.getAttribute("data-size");
    const deviceFrame = document.getElementById("deviceFrame");

    // Remove all frame size classes
    deviceFrame.classList.remove("device-frame-desktop", "device-frame-tablet", "device-frame-mobile");

    // Add the selected frame size
    deviceFrame.classList.add(`device-frame-${size}`);

    // Optional: scroll to preview
    deviceFrame.scrollIntoView({ behavior: "smooth" });

    // Highlight active button
    document.querySelectorAll(".device-btn").forEach(btn => btn.classList.remove("ring", "ring-offset-2", "ring-blue-400"));
    button.classList.add("ring", "ring-offset-2", "ring-blue-400");
  });
});
