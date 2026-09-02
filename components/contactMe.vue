<template>
    <section class="contact-wrap">
        <aside class="contact-info">
            <p class="eyebrow">Contact</p>
            <h2>Let’s Build Something Useful</h2>
            <p class="intro">
                If you have a project, role, or product challenge, send me a message with context and goals.
                I focus on product-minded frontend execution with clean delivery.
            </p>

            <!-- Primary: the two channels an international client is expected to use -->
            <div class="primary-links">
                <a class="cta cta-solid" href="mailto:matina.safaei@gmail.com">
                    <i class="mdi mdi-email-outline" />
                    <span>
                        <strong>Email me</strong>
                        <small>matina.safaei@gmail.com</small>
                    </span>
                </a>

                <a v-if="calendlyUrl" class="cta cta-outline" :href="calendlyUrl" target="_blank"
                    rel="noopener noreferrer">
                    <i class="mdi mdi-calendar-clock" />
                    <span>
                        <strong>Book a call</strong>
                        <small>30 min, pick a slot that works for you</small>
                    </span>
                </a>

                <a class="cta cta-outline" href="/matina-safaei-resume.pdf" download>
                    <i class="mdi mdi-download-outline" />
                    <span>
                        <strong>Download Resume</strong>
                        <small>PDF, one page</small>
                    </span>
                </a>
            </div>

            <p class="micro-note">
                <i class="mdi mdi-clock-outline" /> Usually responds within 24–48 hours · Available for remote work
            </p>

            <!-- Professional profiles -->
            <div class="profile-links">
                <a href="https://www.linkedin.com/in/matina-safaei" target="_blank" rel="noopener noreferrer">
                    <i class="mdi mdi-linkedin" /> LinkedIn
                </a>
                <a href="https://github.com/mattina-dev" target="_blank" rel="noopener noreferrer">
                    <i class="mdi mdi-github" /> GitHub
                </a>
            </div>

            <!-- Secondary: chat apps, deliberately de-emphasised -->
            <details class="secondary-links">
                <summary>Prefer a messaging app?</summary>
                <div class="secondary-row">
                    <a href="https://t.me/mattina_dev" target="_blank" rel="noopener noreferrer">
                        <i class="mdi mdi-send" /> Telegram
                    </a>
                    <a href="https://wa.me/989057056997" target="_blank" rel="noopener noreferrer">
                        <i class="mdi mdi-whatsapp" /> WhatsApp
                    </a>
                    <!-- TODO: this handle is wrong — Instagram usernames cannot contain "-".
                         Replace with your real handle, or delete this link entirely. -->
                    <a href="https://instagram.com/mattina-dev" target="_blank" rel="noopener noreferrer">
                        <i class="mdi mdi-instagram" /> Instagram
                    </a>
                </div>
            </details>
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
import { useRuntimeConfig } from '#app'

// Rendered only when NUXT_PUBLIC_CALENDLY_URL is set — no dead booking button.
const calendlyUrl = useRuntimeConfig().public.calendlyUrl

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

/* --- Primary contact CTAs --- */
.primary-links {
    margin-top: 1.3rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    max-width: 380px;
}

.cta {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    text-decoration: none;
    transition: transform 0.2s ease, filter 0.2s ease, background-color 0.2s ease;
}

.cta i {
    font-size: 1.3rem;
    flex-shrink: 0;
}

.cta span {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
    min-width: 0;
}

.cta strong {
    font-size: 0.98rem;
}

.cta small {
    font-size: 0.8rem;
    opacity: 0.85;
    overflow: hidden;
    text-overflow: ellipsis;
}

.cta-solid {
    background: linear-gradient(90deg, #7b440d 0%, #b57f3d 100%);
    color: #fff8f2;
    box-shadow: 0 6px 16px rgba(123, 68, 13, 0.2);
}

.cta-outline {
    color: #6a3e1b;
    border: 1.5px solid #e0c6a9;
    background: rgba(255, 252, 248, 0.6);
}

@media (hover: hover) and (pointer: fine) {
    .cta:hover {
        transform: translateY(-2px);
        filter: brightness(1.04);
    }

    .cta-outline:hover {
        background-color: #f7ebe0;
    }
}

.micro-note {
    margin-top: 1rem;
    color: #8a623d;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
}

/* --- Professional profiles --- */
.profile-links {
    margin-top: 0.9rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.1rem;
}

.profile-links a {
    color: #6a3e1b;
    font-weight: 600;
    font-size: 0.92rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}

.profile-links a:hover {
    text-decoration: underline;
}

/* --- Secondary chat channels, collapsed by default --- */
.secondary-links {
    margin-top: 1.1rem;
    border-top: 1px solid #ecdac7;
    padding-top: 0.8rem;
}

.secondary-links summary {
    cursor: pointer;
    font-size: 0.86rem;
    color: #9a7455;
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
}

.secondary-links summary::-webkit-details-marker {
    display: none;
}

.secondary-links summary::before {
    content: '＋';
    font-size: 0.9rem;
}

.secondary-links[open] summary::before {
    content: '－';
}

.secondary-row {
    margin-top: 0.6rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
}

.secondary-row a {
    color: #9a7455;
    font-size: 0.86rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
}

.secondary-row a:hover {
    text-decoration: underline;
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

    .primary-links {
        max-width: none;
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
