Step 1: Create a .env File in the Main Project Folder

Add the following variable to interact with the blockchain network (e.g., Alchemy or Infura):

NETWORK_URL=<your-blockchain-url>

Replace <your-blockchain-url> with the actual URL from your blockchain provider (e.g., Alchemy, Infura).

Step 2: Create a .env File Inside the app Folder

Add the following variables:

REACT_APP_NETWORK_URL=<your-blockchain-url>
REACT_APP_SERVER_URL="http://localhost:1225"

REACT_APP_NETWORK_URL: The URL to interact with the blockchain (e.g., Alchemy, Infura).

REACT_APP_SERVER_URL: The URL where your server is running, in this case, it's http://localhost:1225.

Step 3: Run the Application

Navigate to the app folder and run the following command to start the application:

npm start

This will launch your application at the specified server URL.

Additional Information

Make sure you have all the necessary dependencies installed before running the application. You can install them by navigating to the project directory and running:

npm install

If you encounter any issues, double-check your .env files to ensure all variables are correctly defined.
