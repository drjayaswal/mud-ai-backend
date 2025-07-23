import bcrypt from "bcrypt";
import { jwtVerify } from "jose";

/**
 * Generates a Random ID
 * @returns A random bigint
 */
export const generate_id = async (): Promise<bigint> => {
  return BigInt(Math.floor(Math.random() * 100000000));
};
/**
 * Hashes a plain password
 * @param password - Raw password string
 * @returns A hashed password
 */
export const hash_password = async (password: string): Promise<string> => {
  const SALT = 10;
  try {
    const hashed = await bcrypt.hash(password, SALT);
    return hashed;
  } catch (err) {
    console.error("[hash_password] Error:", err);
    throw err;
  }
};
/**
 * Compares raw password with hashed password
 * @param password - Plain password
 * @param hashed_password - Hashed version from DB
 */
export const compare_password = async (
  password: string,
  hashed_password: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(password, hashed_password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
/**
 * Decrypts and verifies a JWT token.
 *
 * This function uses the 'jose' library to verify and decode a JWT (JSON Web Token)
 * using the secret key specified in the environment variable JWT_SECRET.
 * If JWT_SECRET is not set, it falls back to "default_secret".
 *
 * @param input - The JWT token string to be decrypted and verified.
 * @returns The decoded payload of the JWT token.
 * @throws If the token is invalid or verification fails.
 *
 * Example usage:
 *   const payload = await decrypt(token);
 */
export async function decrypt(input: string): Promise<unknown> {
  const secretKey = "secret";
  const key = new TextEncoder().encode(secretKey);
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
