<template>

    <div class="d-flex justify-space-around	w-100">
        <div class=" mx-5">
            <h2 class="mb-8">social links
            </h2>

            <div class="social">

                <p class="social-item">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
                        aria-label="GitHub">
                        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
                            alt="GitHub icon" />
                    </a>
                </p>

                <p class="social-item">
                    <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"
                        aria-label="LinkedIn">
                        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                            alt="LinkedIn icon" />
                    </a>
                </p>
                <p class="social-item">
                    <a href="https://instagram.com/mattina-dev" target="_blank" rel="noopener noreferrer"
                        aria-label="Instagram">
                        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
                            alt="Instagram icon" />
                    </a>
                </p>

                <p class="social-item">
                    <a href="https://t.me/mattina_dev" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg"
                            alt="Telegram icon" />
                    </a>
                </p>

                <p class="social-item">
                    <a href="https://wa.me/+989057056997" target="_blank" rel="noopener noreferrer"
                        aria-label="WhatsApp">
                        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
                            alt="WhatsApp icon" />
                    </a>
                </p>

                <p class="social-item">
                    <a href="mailto:matina.safaei@gmail.com" aria-label="Email">
                        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg"
                            alt="Email icon" />
                    </a>
                </p>

                <p class="social-item">
                    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
                        aria-label="Twitter">
                        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
                            alt="Twitter icon" />
                    </a>
                </p>
            </div>
        </div>
        <div class="feedback-section">
            <h2 class="mb-8">Give me your feedback!</h2>
            <div class="feedback-card">
                <form @submit="sendEmail">                    <div class="input-group mb-8">
                        <input type="text" id="subject" placeholder="Enter subject..." />
                    </div>

                    <div class="input-group mb-8">
                        <textarea id="message" placeholder="Write your feedback..."></textarea>
                    </div>

                    <button type="submit" class="btns send-btn">Send!</button>
                </form>
            </div>
        </div>


    </div>

</template>


<script setup>
function sendEmail(e) {
  e.preventDefault();
  // Simulate send action (could add actual logic here)
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  if (subjectInput && messageInput) {
    subjectInput.value = '';
    messageInput.value = '';
  }
}
</script>
<style scoped>
.social {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 0;
    padding: 0;
}

.social-item {
    margin: 0 8px;
    padding: 0;
    line-height: 0;
    transition: transform 0.3s ease, filter 0.3s ease, opacity 0.3s ease;
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
}

.social-item a {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-decoration: none;
    
    
}

.social-item img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    filter: grayscale(100%) brightness(0.8);
    transition: transform 0.2s ease, filter 0.2s ease;
}

.social-item img:hover {
    filter: none;
    transform: scale(1.5);
}

h2 {
    color: #7b440d;
    padding: 0 14px;
}

@media (min-width: 900px) {
    .social-item a {
        width: 30px;
        height: 30px;
    }
}
input , textarea{
    width: 100%;
    border-bottom: #7b440d solid 1px;
}

.feedback-card {
    padding: 24px;
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    opacity: 0;
    width: 500px;
    animation: fadeInUp 0.6s ease forwards;
}

.feedback-card:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 18px rgba(123, 68, 13, 0.3);
}

@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.send-btn {
    background: linear-gradient(90deg, #7b440d 0%, #b57f3d 100%);
    color: white;
    font-weight: bold;
    border-radius: 25px;
    padding: 10px 24px;
    border: none;
    cursor: pointer;
    transition: filter 0.3s ease, transform 0.3s ease;
}

.send-btn:hover {
    filter: brightness(1.1);
    transform: scale(1.05);
}

.input-group input,
textarea {
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-group input:focus,
textarea:focus {
    border-bottom-color: #b57f3d;
    outline: none;
}
</style>