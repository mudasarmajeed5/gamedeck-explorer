---

# Game Deck 🎮  
**A Game Searching and Favorite Management Platform**  

## Purpose  
Game Deck is a web-based application designed to simplify the discovery and management of games. With Game Deck, users can:  
- **Search for games** with ease.  
- **View detailed information** about each game.  
- **Save favorite games** in a personalized list.  

The platform ensures a seamless experience with the following features:  
- **User-friendly interface** for effortless navigation.  
- **GitHub and Google authentication** for secure and quick access.  
- **Efficient data storage** using MongoDB for fast retrieval and management of game data.  

Built with **React**, Game Deck is scalable, responsive, and provides smooth interactions to its users.  

---

## Key Features  
- **Game Search:** Instantly find games by name or genre.  
- **Game Details:** View comprehensive information, including reviews, ratings, and more.  
- **Favorites Management:** Create and maintain a personalized list of favorite games.  
- **Authentication:** Secure login using GitHub and Google accounts.  

---

## Tech Stack  
- **Frontend:** React  
- **Backend:** Node.js with Express  
- **Database:** MongoDB  
- **Authentication:** OAuth (GitHub & Google)  

---

## Installation and Setup  

### Prerequisites  
Ensure you have the following installed:  
- **Node.js** (v14 or later)  
- **MongoDB**  

### Steps  

1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/yourusername/gamedeck.git
   cd gamedeck
   ```

2. **Install Dependencies:**  
   Run the following command to install the required dependencies for both frontend and backend:  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**  
   - Create a `.env` file in the root directory by copying the `.env.sample` file:
     ```bash
     cp .env.sample .env
     ```
   - Open the `.env` file and add the following credentials:
     - **Rawg API Key**
       - `5773afd254c846a699ffc9ec3cb8cedd` 
     - **GitHub OAuth:**  
       - `GITHUB_CLIENT_ID=<your_github_client_id>`
       - `GITHUB_CLIENT_SECRET=<your_github_client_secret>`
     - **Google OAuth:**  
       - `GOOGLE_CLIENT_ID=<your_google_client_id>`
       - `GOOGLE_CLIENT_SECRET=<your_google_client_secret>`
     - **MongoDB URI:**  
       - `MONGODB_URI=<your_mongodb_connection_string>`
       - `Default MongoDB URI is: mongodb://127.0.0.1:27017/gamedeck`

4. **Run the Backend Server:**  
   After setting up the environment variables, start the server with:
   ```bash
   npm run dev
   Open up: http://localhost:3000 on your browser to view the website!
   ```

---

## Notes
- **Authentication:** Make sure you have set up GitHub and Google OAuth credentials in your respective platforms (GitHub Developer Settings, Google Cloud Console) and have added the correct keys in your `.env` file.
  
- **MongoDB:** Ensure that MongoDB is installed and running on your system. If using a cloud service like MongoDB Atlas, provide the correct connection string in the `MONGODB_URI` field of your `.env` file.

---
