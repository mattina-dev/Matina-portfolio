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
                    <i class="mdi mdi-email-outline" aria-hidden="true" />
                    <span>
                        <strong>Email me</strong>
                        <small>matina.safaei@gmail.com</small>
                    </span>
                </a>

                <a v-if="calendlyUrl" class="cta cta-outline" :href="calendlyUrl" target="_blank"
                    rel="noopener noreferrer">
                    <i class="mdi mdi-calendar-clock" aria-hidden="true" />
                    <span>
                        <strong>Book a call</strong>
                        <small>30 min, pick a slot that works for you</small>
                    </span>
                </a>

                <a class="cta cta-outline" href="/matina-safaei-resume.pdf" download>
                    <i class="mdi mdi-download-outline" aria-hidden="true" />
                    <span>
                        <strong>Download Resume</strong>
                        <small>PDF, one page</small>
                    </span>
                </a>
            </div>

            <p class="micro-note">
                <i class="mdi mdi-clock-outline" aria-hidden="true" /> Usually responds within 24–48 hours · Available for remote work
            </p>

            <!-- Professional profiles -->
            <div class="profile-links">
                <a href="https://www.linkedin.com/in/matina-safaei" target="_blank" rel="noopener noreferrer">
                    <i class="mdi mdi-linkedin" aria-hidden="true" /> LinkedIn
                </a>
                <a href="https://github.com/mattina-dev" target="_blank" rel="noopener noreferrer">
                    <i class="mdi mdi-github" aria-hidden="true" /> GitHub
                </a>
            </div>

            <!-- Secondary: chat apps, deliberately de-emphasised -->
            <details class="secondary-links">
                <summary>Prefer a messaging app?</summary>
                <div class="secondary-row">
                    <a href="https://t.me/mattina_dev" target="_blank" rel="noopener noreferrer">
                        <i class="mdi mdi-send" aria-hidden="true" /> Telegram
                    </a>
                    <a href="https://wa.me/989057056997" target="_blank" rel="noopener noreferrer">
                        <i class="mdi mdi-whatsapp" aria-hidden="true" /> WhatsApp
                    </a>
                    <!-- TODO: this handle is wrong — Instagram usernames cannot contain "-".
                         Replace with your real handle, or delete this link entirely. -->
                    <a href="https://instagram.com/mattina-dev" target="_blank" rel="noopener noreferrer">
                        <i class="mdi mdi-instagram" aria-hidden="true" /> Instagram
                    </a>
                </div>
            </details>
        </aside>

        <div class="feedback-section">
            <h2 class="mb-8">Project Inquiry / Feedback</h2>
            <div class="feedback-card">
                <form @submit.prevent="sendEmail">
                    <div class="input-group">
                        <label for="name">Your name</label>
                        <input v-model="name" type="text" id="name" autocomplete="name" required />
                    </div>

                    <div class="input-group">
                        <label for="email">Your email</label>
                        <input v-model="email" type="email" id="email" autocomplete="email" required />
                    </div>

                    <div class="input-group">
                        <label for="subject">Subject</label>
                        <input v-model="subject" type="text" id="subject" required />
                    </div>

                    <div class="input-group">
                        <label for="message">Message</label>
                        <textarea v-model="message" id="message" rows="5" maxlength="1200"
                            aria-describedby="char-counter" required></textarea>
                    </div>

                    <input v-model="website" type="text" class="honeypot" tabindex="-1" autocomplete="off"
                        aria-hidden="true" />
                    <p class="char-counter" id="char-counter">{{ message.length }}/1200 characters</p>

                    <p v-if="statusMessage" :class="['status', statusType]" role="status" aria-live="polite">{{ statusMessage }}</p>

                    <button type="submit" class="btn btn-primary send-btn" :disabled="isSending">
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
    gap: var(--space-7);
    width: 100%;
    max-width: var(--page-max);
    margin: 0 auto;
    padding: var(--space-7) var(--space-4);
    align-items: start;
}

.contact-info h2,
.feedback-section h2 {
    font-size: var(--text-h1);
    margin: var(--space-2) 0 var(--space-3);
}

.intro {
    color: var(--text-muted);
    line-height: var(--leading-normal);
    max-width: 50ch;
}

/* --- Primary contact CTAs --- */
.primary-links {
    margin-top: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    max-width: 380px;
}

.cta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 44px;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius);
    text-decoration: none;
    border: 1px solid transparent;
    transition: background-color var(--dur) var(--ease), border-color var(--dur) var(--ease),
        box-shadow var(--dur) var(--ease);
}

.cta i {
    font-size: 1.25rem;
    flex-shrink: 0;
}

.cta span {
    display: flex;
    flex-direction: column;
    line-height: var(--leading-snug);
    min-width: 0;
}

.cta strong {
    font-size: var(--text-body);
    font-weight: 600;
}

.cta small {
    font-size: var(--text-sm);
    opacity: 0.85;
    overflow: hidden;
    text-overflow: ellipsis;
}

.cta-solid {
    background: var(--accent);
    color: var(--on-accent);
    box-shadow: var(--shadow-sm);
}

.cta-solid:hover {
    background: var(--accent-hover);
    box-shadow: var(--shadow);
}

.cta-outline {
    color: var(--text);
    border-color: var(--border-control);
    background: var(--bg-elev);
}

.cta-outline:hover {
    background: var(--bg-subtle);
    border-color: var(--accent);
}

.micro-note {
    margin-top: var(--space-4);
    color: var(--text-subtle);
    font-size: var(--text-sm);
    display: flex;
    align-items: center;
    gap: var(--space-1);
}

/* --- Professional profiles --- */
.profile-links {
    margin-top: var(--space-4);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-5);
}

.profile-links a {
    color: var(--text);
    font-weight: 600;
    font-size: var(--text-sm);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 44px;
    transition: color var(--dur) var(--ease);
}

.profile-links a:hover {
    color: var(--accent);
    text-decoration: underline;
}

/* --- Secondary chat channels --- */
.secondary-links {
    margin-top: var(--space-3);
    border-top: 1px solid var(--border);
    padding-top: var(--space-4);
}

.secondary-links summary {
    cursor: pointer;
    font-size: var(--text-sm);
    color: var(--text-subtle);
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 44px;
}

.secondary-links summary::-webkit-details-marker {
    display: none;
}

.secondary-links summary::before {
    content: '+';
    font-family: var(--font-mono);
}

.secondary-links[open] summary::before {
    content: '\2212';
}

.secondary-row {
    margin-top: var(--space-1);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
}

.secondary-row a {
    color: var(--text-subtle);
    font-size: var(--text-sm);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 44px;
    transition: color var(--dur) var(--ease);
}

.secondary-row a:hover {
    color: var(--accent);
    text-decoration: underline;
}

/* --- Form --- */
.feedback-card {
    padding: var(--space-5);
    border-radius: var(--radius-lg);
    width: 100%;
    border: 1px solid var(--border);
    background: var(--bg-elev);
    box-shadow: var(--shadow-sm);
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin-bottom: var(--space-4);
}

.input-group label {
    font-size: var(--text-label);
    font-weight: 600;
    letter-spacing: var(--track-label);
    text-transform: uppercase;
    color: var(--text-subtle);
}

input,
textarea {
    width: 100%;
    font-family: inherit;
    font-size: var(--text-body);
    color: var(--text);
    background: var(--bg);
    /* Control boundary: --border-control clears 3:1 (WCAG 1.4.11). */
    border: 1px solid var(--border-control);
    border-radius: var(--radius-sm);
    padding: var(--space-3);
    min-height: 44px;
    transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}

textarea {
    resize: vertical;
    line-height: var(--leading-normal);
}

input:focus,
textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
}

.send-btn {
    width: 100%;
}

.send-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.status {
    margin-bottom: var(--space-3);
    font-size: var(--text-sm);
    font-weight: 500;
}

.status.success {
    color: var(--up);
}

.status.error {
    color: var(--down);
}

.honeypot {
    position: absolute;
    left: -9999px;
}

.char-counter {
    font-size: var(--text-label);
    color: var(--text-subtle);
    margin-bottom: var(--space-3);
}

@media (max-width: 960px) {
    .contact-wrap {
        grid-template-columns: 1fr;
        padding: 5.5rem var(--space-3) var(--space-6);
        gap: var(--space-6);
    }

    .primary-links {
        max-width: none;
    }

    .feedback-card {
        padding: var(--space-4);
    }
}
</style>
