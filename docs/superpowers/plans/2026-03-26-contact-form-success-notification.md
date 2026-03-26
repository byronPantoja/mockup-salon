# Contact Form — Branding Sync & Success Notification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the static `ContactSection` form into a controlled, stateful component with a Subject field, a primary-styled submit button, and a post-submission success notification that mirrors the Appointment Confirmation overlay.

**Architecture:** All changes are confined to `ContactSection` in `app/page.tsx`. The component gains five `useState` hooks (name, email, subject, message, submitted). On submit, `submitted` flips to `true` and the form is replaced by the success view inside the same card. No new files are created.

**Tech Stack:** Next.js (App Router), React 18, Tailwind CSS v4, Material Symbols (already loaded globally)

---

## File Map

| File | Change |
|------|--------|
| `app/page.tsx` | Modify `ContactSection` (lines 669–743): add state, Subject field, new button style, success view |

---

### Task 1: Add state and wire controlled inputs

**Files:**
- Modify: `app/page.tsx` — `ContactSection` function (lines 669–743)

- [ ] **Step 1: Replace the `ContactSection` function signature to add state**

Find this exact line in `app/page.tsx`:

```tsx
function ContactSection() {
  return (
```

Replace with:

```tsx
function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
```

- [ ] **Step 2: Wire the Full Name input**

Find:

```tsx
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant"
                placeholder="Your name"
                type="text"
              />
```

Replace with:

```tsx
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant"
                placeholder="Your name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
```

- [ ] **Step 3: Wire the Email Address input**

Find:

```tsx
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant"
                placeholder="email@example.com"
                type="email"
              />
```

Replace with:

```tsx
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant"
                placeholder="email@example.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
```

- [ ] **Step 4: Add Subject field between Email and Message**

Find:

```tsx
            <div>
              <label className="block font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                Message
              </label>
              <textarea
```

Replace with:

```tsx
            <div>
              <label className="block font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                Subject
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant"
                placeholder="How can we help?"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                Message
              </label>
              <textarea
```

- [ ] **Step 5: Wire the Message textarea and update its placeholder**

Find:

```tsx
              <textarea
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant resize-none"
                placeholder="How can we help?"
                rows={4}
              />
```

Replace with:

```tsx
              <textarea
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant resize-none"
                placeholder="Tell us more…"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
```

- [ ] **Step 6: Update the submit button to primary style and wire onSubmit**

Find:

```tsx
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
```

Replace with:

```tsx
          <form className="space-y-8" onSubmit={handleSubmit}>
```

Find:

```tsx
            <button
              className="font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase text-primary border border-primary/40 px-10 py-5 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-500"
              type="submit"
            >
              Send Inquiry
            </button>
```

Replace with:

```tsx
            <button
              className="btn-gradient text-on-primary px-10 py-5 rounded-full font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-500"
              type="submit"
            >
              Send Inquiry
            </button>
```

- [ ] **Step 7: Verify the dev server compiles with no errors**

```bash
npm run dev
```

Expected: Server starts, no TypeScript or compile errors in terminal. Navigate to `http://localhost:3000/#contact`. The form should show four fields (Name, Email, Subject, Message) with the gradient Submit button. Filling all fields and clicking Submit should... do nothing visible yet (success view not wired). That's expected — we add it in Task 2.

---

### Task 2: Add success notification view

**Files:**
- Modify: `app/page.tsx` — the card `<div>` inside `ContactSection` (the `bg-surface-container-low` div)

- [ ] **Step 1: Wrap the form in a conditional and add success view**

Find:

```tsx
        <div className="bg-surface-container-low p-8 md:p-12 rounded-sm ghost-border">
          <form className="space-y-8" onSubmit={handleSubmit}>
```

Replace with:

```tsx
        <div className="bg-surface-container-low p-8 md:p-12 rounded-sm ghost-border">
          {submitted ? (
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl mb-6">
                Message Sent!
              </h3>
              <div className="bg-surface-container rounded-xl p-6 md:p-8 mb-8 max-w-md mx-auto text-left space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">person</span>
                  <div>
                    <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">From</p>
                    <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">{name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">topic</span>
                  <div>
                    <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">Subject</p>
                    <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">{subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">mail</span>
                  <div>
                    <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">Reply To</p>
                    <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">{email}</p>
                  </div>
                </div>
              </div>
              <p className="font-[family-name:var(--font-body)] text-on-surface-variant text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. We&apos;ve received your inquiry regarding{" "}
                {subject}. A member of the Serenity Studio team will respond to{" "}
                {email} shortly.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase text-primary border border-primary/40 px-10 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-500"
              >
                Return to Top
              </button>
            </div>
          ) : (
          <form className="space-y-8" onSubmit={handleSubmit}>
```

- [ ] **Step 2: Close the conditional after the closing `</form>` tag**

Find:

```tsx
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
```

Replace with:

```tsx
          </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
```

- [ ] **Step 3: Verify the full flow in the browser**

```bash
npm run dev
```

Navigate to `http://localhost:3000/#contact`.

Checklist:
- [ ] Form shows 4 fields: Full Name, Email Address, Subject, Message
- [ ] Submit button has gradient background (matches "Book Session" button)
- [ ] Submitting an empty field shows browser-native validation (HTML5 `required`)
- [ ] Filling all fields and clicking "Send Inquiry" replaces the form with the success view
- [ ] Success view shows: filled check_circle icon, "Message Sent!" headline, detail card with From/Subject/Reply To rows populated with submitted values
- [ ] Body text reads: "Thank you, [Name]. We've received your inquiry regarding [Subject]. A member of the Serenity Studio team will respond to [Email] shortly."
- [ ] "Return to Top" button scrolls smoothly to the hero section
- [ ] Success view uses `animate-fade-in` (matches booking confirmation animation)

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: sync contact form branding and add success notification"
```

---

### Task 3: Deploy

- [ ] **Step 1: Deploy to Vercel production**

```bash
vercel deploy --prod
```

Expected output ends with:
```
Production: https://mockup-salon.vercel.app [copied to clipboard]
```

- [ ] **Step 2: Smoke test on production URL**

Open `https://mockup-salon.vercel.app/#contact`, repeat the browser checklist from Task 2 Step 3.
