# Coffee Recipe App

## Environment Setup

To set up the environment for the Coffee Recipe App, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/akinov/coffee-recipe-app.git
   cd coffee-recipe-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Add a web app to your Firebase project.
   - Copy the Firebase configuration and add it to a `.env.local` file in the root of your project:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment Instructions

To deploy the Coffee Recipe App, follow these steps:

1. **Build the project:**
   ```sh
   npm run build
   ```

2. **Start the production server:**
   ```sh
   npm start
   ```

   The app should now be running on [http://localhost:3000](http://localhost:3000).

3. **Deploy to Vercel:**
   - If you haven't already, install the Vercel CLI:
     ```sh
     npm install -g vercel
     ```

   - Run the following command to deploy:
     ```sh
     vercel
     ```

   Follow the prompts to complete the deployment process.
