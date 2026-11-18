import { useState } from 'react';
import styles from '../styles/Pages.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Frontend React Modules',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submittedEntry, setSubmittedEntry] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (formData.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.';
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmittedEntry({
      ...formData,
      submittedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    setFormData({
      name: '',
      email: '',
      topic: 'Frontend React Modules',
      message: '',
    });
    setErrors({});
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Contact StudioCraft</h1>
          <p className={styles.sectionSubtitle}>
            Questions about hardware specifications, internship code reviews, or
            REST API setup instructions? Send a message below.
          </p>
        </div>
      </div>

      <div className={styles.contactGrid}>
        <div>
          {submittedEntry ? (
            <div className={styles.successCard} role="status">
              <h2 className={styles.conceptTitle}>Message Recorded</h2>
              <p className={styles.conceptText}>
                Thank you, {submittedEntry.name}. Your inquiry regarding{' '}
                <strong>{submittedEntry.topic}</strong> was captured at{' '}
                {submittedEntry.submittedAt}.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => setSubmittedEntry(null)}
                  className={styles.secondaryBtn}
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.formCard} noValidate>
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-name" className={styles.label}>
                  Full Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Rivera"
                  className={styles.inputField}
                />
                {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="contact-email" className={styles.label}>
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  className={styles.inputField}
                />
                {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="contact-topic" className={styles.label}>
                  Subject Topic
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className={styles.selectField}
                >
                  <option value="Frontend React Modules">Frontend React Modules</option>
                  <option value="Hardware Catalog Inquiry">Hardware Catalog Inquiry</option>
                  <option value="To-Do & Notes REST APIs">To-Do &amp; Notes REST APIs</option>
                  <option value="JWT Authentication Setup">JWT Authentication Setup</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="contact-message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your question or feedback here..."
                  className={styles.textareaField}
                />
                {errors.message && (
                  <p className={styles.fieldError}>{errors.message}</p>
                )}
              </div>

              <div>
                <button type="submit" className={styles.primaryBtn}>
                  Submit Message
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className={styles.infoStack}>
          <div className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>Workspace Studio</h2>
            <p className={styles.infoDesc}>
              412 Mercer Street, Suite 300, Seattle, WA 98109
            </p>
          </div>
          <div className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>Office Hours</h2>
            <p className={styles.infoDesc}>
              Monday through Friday, 09:00 – 17:30 PT
            </p>
          </div>
          <div className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>Direct Support</h2>
            <p className={styles.infoDesc}>
              engineering@studiocraft.example
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
