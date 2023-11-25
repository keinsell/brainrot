import ms from "ms"



/**
 * Represents the configuration settings for authorization.
 * @typedef {Object} AuthorizationConfiguration
 *
 * @property {string} jwtSecret - The secret used for JSON Web Token (JWT) generation and verification.
 * @property {number} accessTokenExpirationTime - The expiration time for access tokens in milliseconds.
 */
export const authorizationConfiguration = {
	/**
	 * Represents the secret used for JSON Web Token (JWT) generation and verification.
	 *
	 * @constant {string}
	 * @default "secret"
	 */
	jwtSecret:                 "secret",
	accessTokenExpirationTime: ms("2h"),
	refreshTokenExpirationTime: ms("32w"),
}