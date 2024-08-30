// utils/validateJWT.js
import jwtDecode from "jwt-decode";

/**
 * Validates the JWT token to check if it has expired and returns the decoded payload.
 * @param {string} token - The JWT token to be validated.
 * @returns {object|null} - Returns the decoded token object if valid, otherwise null.
 */
export default function validateJWT(token) {
  try {
    const decodedToken = jwtDecode(token);

    // Check if the token has expired
    const currentTime = Date.now() / 1000; // in seconds
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      console.error("JWT is expired");
      return null;
    }

    return decodedToken;
  } catch (error) {
    console.error("Invalid JWT token", error);
    return null;
  }
}
