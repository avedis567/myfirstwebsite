# EmailJS Setup Instructions

Your contact form is now integrated with EmailJS! Follow these steps to receive emails directly in your inbox.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Create Email Service
1. After logging in, click "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account and grant permissions
5. **Copy the Service ID** - you'll need this later

### Step 3: Create Email Template
1. Click "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
Sent from your website contact form
```

4. **Copy the Template ID** - you'll need this later

### Step 4: Get Your Public Key
1. Click "Account" → "API Keys"
2. **Copy the Public Key** - you'll need this later

## 🔧 Configure Your Website

Replace these placeholders in `script.js`:

```javascript
// Line 3: Replace with your Public Key
emailjs.init("YOUR_PUBLIC_KEY");

// Line 141: Replace with your Service ID and Template ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)

// Line 137: Replace with your email
to_email: 'your-email@example.com'
```

## 📧 Test Your Contact Form

1. Open your website in a browser
2. Go to the Contact section
3. Fill out the form and click "Send Message"
4. Check your email inbox!

## ✅ What You Get

- **Instant Email Delivery** - Messages go directly to your inbox
- **No Backend Required** - Everything works from the frontend
- **Professional Appearance** - Custom email templates
- **Free Plan Available** - 200 emails/month free

## 🛠️ Troubleshooting

### "Email not sending" error:
- Check that all IDs are correctly copied
- Ensure your email service is connected
- Verify the template variables match form field names

### "Invalid public key" error:
- Make sure you're using the Public Key (not Private Key)
- Check for extra spaces or characters

### No email received:
- Check your spam folder
- Verify the "to_email" is correct
- Ensure EmailJS service is active

## 📊 EmailJS Limits (Free Plan)

- **200 emails per month**
- **Maximum 3 email services**
- **Maximum 10 templates**

Upgrade to Pro for unlimited emails and advanced features.

## 🎉 You're All Set!

Once configured, your contact form will send real emails to your inbox whenever someone submits the form. The form includes proper validation, loading states, and error handling for a professional user experience.

Need help? Check the [EmailJS Documentation](https://www.emailjs.com/docs/) or contact their support team.
