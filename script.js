let selectedEmoji = null;
const emojis = document.querySelectorAll('.emoji-rating span');
const toast = document.getElementById("toast");

emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    emojis.forEach(e => e.classList.remove('selected'));
    emoji.classList.add('selected');
    selectedEmoji = emoji.getAttribute('data-value');
  });
});

function sendFeedback() {
  const description = document.getElementById("description").value.trim();
  const type = document.querySelector('input[name="feedback_type"]:checked');

  if (!selectedEmoji || !description || !type) {
    alert("Please complete all fields!");
    return;
  }

  const feedback = {
    emoji: selectedEmoji,
    description: description,
    type: type.value,
    time: new Date().toLocaleString()
  };

  let allFeedback = JSON.parse(localStorage.getItem("feedbacks")) || [];
  allFeedback.push(feedback);
  localStorage.setItem("feedbacks", JSON.stringify(allFeedback));

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);

  emojis.forEach(e => e.classList.remove('selected'));
  document.getElementById("description").value = "";
  type.checked = false;
  selectedEmoji = null;
}
