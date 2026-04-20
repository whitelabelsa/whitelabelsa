
# Admin Panel Setup Guide

This document contains the initial credentials and setup instructions for the **White Label** admin dashboard.

## 🔐 Default Admin Credentials

Use these credentials to log in to the admin dashboard at `/admin-login`.

| Field | Value |
|-------|-------|
| **Email** | `admin@example.com` |
| **Password** | `Admin@123456` |

> ⚠️ **SECURITY WARNING:** These are default credentials generated for the initial setup. For the security of your platform, please create a new admin user or change the password immediately after your first login via the Supabase dashboard.

## 🚀 Accessing the Dashboard

1. Navigate to your website's admin URL (e.g., `https://your-domain.com/admin-login`).
2. Enter the email and password provided above.
3. Upon successful authentication, you will be redirected to the **Admin Dashboard**.

## 🛠 Features

The admin dashboard allows you to:
- **View Contact Messages:** Browse all inquiries submitted through the contact form.
- **Manage Blog Posts:** Create, edit, and delete blog articles.
- **View Statistics:** See an overview of total messages and posts.

## 🔄 Troubleshooting Login

If you cannot log in:
1. Ensure you are using the exact email and password (case-sensitive).
2. Check if the user exists in your Supabase project under the **Authentication** > **Users** tab.
3. If the user is missing, you can manually create a new user in the Supabase dashboard and use those credentials.
