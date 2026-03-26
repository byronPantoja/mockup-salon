# Contact Form — Branding Sync & Success Notification

**Date:** 2026-03-26
**Status:** Approved

---

## Objective

Sync the existing contact form with Serenity Studio branding and replace static form submission (no-op) with a dynamic, personalized success notification styled identically to the Appointment Confirmation overlay in the booking section.

---

## Scope

All changes are confined to `ContactSection` in `app/page.tsx`. No new files are created.

---

## Architecture

`ContactSection` is converted from a pure render function to a stateful component. It owns all local state: four controlled inputs and a `submitted` boolean. No state is lifted to the parent `Page` component.

```
ContactSection
  ├── state: name, email, subject, message (controlled inputs)
  ├── state: submitted (boolean)
  ├── render: form view   (submitted === false)
  └── render: success view (submitted === true)
```

---

## Form View

### Fields

Four controlled inputs, each following the existing underline pattern (`border-b border-outline-variant/30 focus:border-primary`):

| Order | Label | Input type | Placeholder |
|-------|-------|------------|-------------|
| 1 | Full Name | `text` | `Your name` |
| 2 | Email Address | `email` | `email@example.com` |
| 3 | Subject | `text` | `How can we help?` |
| 4 | Message | `textarea` (4 rows) | `Tell us more…` |

All labels use `font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant`.

### Submit Button

Updated from ghost/outline to primary action style to match "Confirm Appointment":

```
btn-gradient text-on-primary px-10 py-5 rounded-full
font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase
hover:opacity-90 transition-all duration-500
```

Label: **Send Inquiry** (unchanged).

### Validation

Basic HTML5 `required` attributes on all four fields. No custom validation layer — the form already targets an internal audience and browser defaults are sufficient.

---

## Success Notification View

Rendered inside the same `bg-surface-container-low p-8 md:p-12 rounded-sm ghost-border` card, replacing the form. Animates in with `animate-fade-in`.

### Structure (mirrors Appointment Confirmation exactly)

1. **Icon** — `check_circle` Material Symbol, `FILL 1`, `text-primary text-4xl`, centered in `w-20 h-20 bg-primary/10 rounded-full`
2. **Headline** — `"Message Sent!"` — `font-headline text-3xl md:text-4xl`
3. **Detail card** — `bg-surface-container rounded-xl p-6 md:p-8 max-w-md mx-auto text-left space-y-4`
   Three rows, each with a Material Symbol icon + label/value pair:
   - `person` icon → label "From" → value: `{name}`
   - `topic` icon → label "Subject" → value: `{subject}`
   - `mail` icon → label "Reply To" → value: `{email}`
4. **Body text** — `"Thank you, {name}. We've received your inquiry regarding {subject}. A member of the Serenity Studio team will respond to {email} shortly."`
   Style: `font-body text-on-surface-variant text-sm mb-10 max-w-sm mx-auto leading-relaxed`
5. **Footer button** — `"Return to Top"` — secondary ghost style:
   ```
   border border-primary/40 px-10 py-4 rounded-full
   font-label font-bold text-sm tracking-[0.2em] uppercase text-primary
   hover:bg-primary hover:text-on-primary transition-all duration-500
   ```
   On click: `window.scrollTo({ top: 0, behavior: 'smooth' })`

---

## What Does Not Change

- The left-column contact info (phone, email address, intro copy) is untouched.
- Page layout, grid, spacing, and all other sections are untouched.
- No new files, no new dependencies.
