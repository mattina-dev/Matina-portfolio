<template>
    <section class="contact-wrap">
        <aside class="contact-info">
            <p class="eyebrow">Contact</p>
            <h2>Let’s Build Something Useful</h2>
            <p class="intro">
                If you have a project, role, or product challenge, send me a message with context and goals.
                I focus on product-minded frontend execution with clean delivery.
            </p>

            <div class="quick-links">
                <a href="mailto:matina.safaei@gmail.com"><i class="mdi mdi-email-outline" /> matina.safaei@gmail.com</a>
                <a href="https://github.com/mattina-dev" target="_blank" rel="noopener noreferrer"><i class="mdi mdi-github" /> GitHub</a>
                <a href="https://www.linkedin.com/in/matina-safaei" target="_blank" rel="noopener noreferrer"><i class="mdi mdi-linkedin" /> LinkedIn</a>
                <a href="https://instagram.com/mattina-dev" target="_blank" rel="noopener noreferrer"><i class="mdi mdi-instagram" /> Instagram</a>
                <a href="https://t.me/mattina_dev" target="_blank" rel="noopener noreferrer"><i class="mdi mdi-send" /> Telegram</a>
                <a href="https://wa.me/+989057056997" target="_blank" rel="noopener noreferrer"><i class="mdi mdi-whatsapp" /> WhatsApp</a>
            </div>

            <p class="micro-note">Usually responds within 24-48 hours.</p>
        </aside>

        <div class="feedback-section">
            <h2 class="mb-8">Project Inquiry / Feedback</h2>
            <div class="feedback-card">
                <form @submit.prevent="sendEmail">
                    <div class="input-group mb-8">
                        <input v-model="name" type="text" id="name" placeholder="Your name" required />
                    </div>

                    <div class="input-group mb-8">
                        <input v-model="email" type="email" id="email" placeholder="Your email" required />
                    </div>

                    <div class="input-group mb-8">
                        <input v-model="subject" type="text" id="subject" placeholder="Enter subject..." required />
                    </div>

                    <div class="input-group mb-8">
                        <textarea v-model="message" id="message" placeholder="Write your feedback..." maxlength="1200"
                            required></textarea>
                    </div>

                    <input v-model="website" type="text" class="honeypot" tabindex="-1" autocomplete="off"
                        aria-hidden="true" />
                    <p class="char-counter">{{ message.length }}/1200</p>

                    <p v-if="statusMessage" :class="['status', statusType]">{{ statusMessage }}</p>

                    <button type="submit" class="btns send-btn" :disabled="isSending">
                        {{ isSending ? 'Sending...' : 'Send!' }}
                    </button>
                </form>
            </div>
        </div>
    </section>

</template>


<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const website = ref('')
const isSending = ref(false)
const statusMessage = ref('')
const statusType = ref('')

async function sendEmail() {
    if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
        statusType.value = 'error'
        statusMessage.value = 'Please fill in all fields.'
        return
    }

    isSending.value = true
    statusMessage.value = ''

    try {
        await $fetch('/api/feedback', {
            method: 'POST',
            body: {
                name: name.value,
                email: email.value,
                subject: subject.value,
                message: message.value,
                website: website.value,
            },
        })

        name.value = ''
        email.value = ''
        subject.value = ''
        message.value = ''
        website.value = ''
        statusType.value = 'success'
        statusMessage.value = 'Message sent successfully. Thank you.'
    } catch (error) {
        statusType.value = 'error'
        statusMessage.value = error?.data?.statusMessage || 'Could not send your message. Please try again.'
    } finally {
        isSending.value = false
    }
}
</script>
<style scoped>
.contact-wrap {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 2rem;
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    padding: 1.2rem;
}

.contact-info {
    padding: 1.4rem 1.2rem;
}

.eyebrow {
    color: #9e6438;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.78rem;
    font-weight: 700;
    margin: 0;
}

.intro {
    color: #5f3b1d;
    line-height: 1.75;
    max-width: 50ch;
}

.quick-links {
    margin-top: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
}

.quick-links a {
    color: #6a3e1b;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
}

.quick-links a:hover {
    text-decoration: underline;
}

.micro-note {
    margin-top: 1rem;
    color: #8a623d;
    font-size: 0.9rem;
}

.feedback-card {
    padding: 24px;
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    opacity: 0;
    width: 100%;
    animation: fadeInUp 0.6s ease forwards;
    border: 1px solid #e6d2bf;
    background: linear-gradient(155deg, #fff8f2, #f4e4d5);
}

.feedback-card:hover {
    transform: translateY(-2px);
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

.send-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.status {
    margin-bottom: 0.8rem;
    font-size: 0.95rem;
}

.status.success {
    color: #2e7d32;
}

.status.error {
    color: #b71c1c;
}

.honeypot {
    position: absolute;
    left: -9999px;
}

.char-counter {
    font-size: 0.8rem;
    color: #8e6641;
    margin-bottom: 0.8rem;
}

input,
textarea {
    width: 100%;
    border-bottom: #7b440d solid 1px;
    color: #3d2816;
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

@media (max-width: 960px) {
    .contact-wrap {
        grid-template-columns: 1fr;
        padding: 0.8rem;
        gap: 1rem;
    }

    .contact-info {
        padding: 0.4rem 0.2rem;
    }

    .feedback-card {
        padding: 1rem;
    }

    .send-btn {
        width: 100%;
        border-radius: 12px;
    }
}
</style>
