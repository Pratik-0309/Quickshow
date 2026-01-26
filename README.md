# 🎥 QuickShow - Movie Ticket Booking

A simple and fast web application to book your favorite movie tickets online with real-time seat selection and secure payments. 🍿

---

### ✨ Features

* **User Booking**: Browse movies, select showtimes, and book tickets easily.
* **Seat Selection**: Interactive seat layout to pick your preferred spots.
* **Admin Dashboard**: Manage movies, add new shows, and view total revenue.
* **Secure Payments**: Integrated with Stripe for safe transactions.
* **Email Notifications**: Receive booking confirmations via email using Inngest and Nodemailer.

---

### 📁 Folder Structure

* **`client/`**: The frontend built with React, Tailwind CSS, and Lucide React.
* **`server/`**: The backend built with Node.js, Express, MongoDB, and Inngest for background tasks.

---

### 🚀 Quick Start

Get the project running on your local machine in 3 simple steps:

1. **Clone the project**
   ```bash
   git clone [https://github.com/Pratik-0309/Quickshow.git](https://github.com/Pratik-0309/Quickshow.git)
   cd Quickshow
      ```

2.  **Set up the Server (Backend):**
    ```bash
    cd backend
    npm install 
    # Create the secret key file (.env)
    touch .env 
    ```
    **Fill in your `backend/.env` file with these details:**
    ```env
    PORT=8080
    MONGODB_URI=your_mongodb_connection_string
    MONGO_NAME=quickshow
    CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...
    INNGEST_EVENT_KEY=your_inngest_event_key
    INNGEST_SIGNING_KEY=your_inngest_signing_key
    TMDB_API_KEY=your_tmdb_bearer_token
    STRIPE_PUBLISHABLE_KEY=pk_test_...
    STRIPE_SECRET_KEY=sk_test_...
    STRIPE_WEBHOOK_SECRET=whsec_...
    SENDER_EMAIL=your_verified_sender_email
    SMTP_USER=your_brevo_smtp_user
    SMTP_PASS=your_brevo_smtp_password
    ```
    Start the server:
    ```bash
    npm run dev
    ```

3.  **Set up the App (Frontend):**
    Open a *second* terminal window.
    ```bash
    cd ../frontend 
    npm install
    # Create the connection file (.env)
    touch .env
    ```
    **Fill in your `frontend/.env` file:**
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=pk_test_.....
    VITE_CURRENCY=$
    VITE_BASE_URL=http://localhost:8080
    VITE_TMBD_IMG_BASE_URL=https://image.tmdb.org/t/p/original
    ```
    Start the app:
    ```bash
    npm run dev
    ```

You can now open your web browser and go to `http://localhost:5173` to see the app running!

---
