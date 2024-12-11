# Quote-craft

**Quote-craft** is a simple frontend application built using React, which interacts with APIs to manage user authentication, image uploads, and quote creation. The application is responsive and optimized for mobile devices.

## Features
- **Login Page**: Users can log in using a unique username and OTP (default OTP: `1234`).
- **Quote List Page**: Displays a paginated list of quotes. Users can load more quotes by clicking the "Load More" button.
- **Create Quote Page**: Allows users to upload an image and create a quote by adding text and the image URL.

### Key Features:
- **Google Fonts**: The application uses several Google Fonts for styling.
- **Responsive**: Fully responsive design optimized for mobile devices.
- **Loader**: Displays a loading circle until data is fetched.
- **Image Upload**: Users can only upload images (jpg format).
- **Pagination**: Initially loads the first 20 quotes and loads 20 more on every "Load More" click.
- **Create Quote Button**: Redirects users to the create quote page where they can upload an image and write a quote.
- **Logout**: A logout button is implemented for user session management.

## API Endpoints Used
1. **Login API**: 
    - URL: `https://assignment.stage.crafto.app/login`
    - Method: `POST`
    - Required Fields: `username` (string), `otp` (string)
    - Example:
    ```bash
    curl --location 'https://assignment.stage.crafto.app/login' \
    --header 'Content-Type: application/json' \
    --data '{
        "username": "sandy",
        "otp": "1234"
    }'
    ```

2. **Media Upload API**: 
    - URL: `https://crafto.app/crafto/v1.0/media/assignment/upload`
    - Method: `POST`
    - Required Field: `file` (image)
    - Example:
    ```bash
    curl --location 'https://crafto.app/crafto/v1.0/media/assignment/upload' \
    --form 'file=@"/<PATH>/<NAME>.jpg"'
    ```

3. **Create Quote API**:
    - URL: `https://assignment.stage.crafto.app/postQuote`
    - Method: `POST`
    - Required Headers: `Authorization: <TOKEN>`
    - Required Fields: `text` (string), `mediaUrl` (string)
    - Example:
    ```bash
    curl --location 'https://assignment.stage.crafto.app/postQuote' \
    --header 'Authorization: <TOKEN>' \
    --header 'Content-Type: application/json' \
    --data '{
        "text": "This is a quote",
        "mediaUrl": "https://media.crafto.app/home/900x900/4653c87a-83f8-4326-afa0-1a06086550ef?dimension=900x900"
    }'
    ```

4. **Get Quotes API**: 
    - URL: `https://assignment.stage.crafto.app/getQuotes?limit=20&offset=0`
    - Method: `GET`
    - Required Headers: `Authorization: <TOKEN>`
    - Example:
    ```bash
    curl --location 'https://assignment.stage.crafto.app/getQuotes?limit=20&offset=0' \
    --header 'Authorization: <TOKEN>'
    ```

## Pages
1. **Login Page**: 
    - The login page consists of input fields for `username` and `OTP`.
    - Upon submitting, users are logged in and redirected to the quote list page.

2. **Quote List Page**: 
    - Displays a paginated list of quotes.
    - Each quote shows an image with overlay text, username, and created time.
    - A "Load More" button fetches the next set of 20 quotes.
    - A "Create Quote" button redirects to the Create Quote Page.

3. **Create Quote Page**: 
    - Users first upload an image (jpg format only).
    - Once the image is uploaded, they can write a quote and submit it.
    - After submission, users are redirected back to the quote list page.

## Installation & Setup

To run the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/Ravirbikant/quote-craft.git
    ```

2. Install the dependencies:
    ```bash
    cd quote-craft
    npm install
    ```

3. Start the application:
    ```bash
    npm start
    ```

The app will run on `http://localhost:3000`.

## Deployment

The project is hosted on Vercel, and you can access it at: [Quote-craft](https://quote-craft-zeta.vercel.app/create-quote)

## Conclusion

This project provides a simple, user-friendly interface to interact with quotes and images, with responsive design and optimized performance. Enjoy exploring and using the Quote-craft app!
