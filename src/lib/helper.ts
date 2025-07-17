import bcrypt from "bcrypt";

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
// $2b$10$RXboJKaxY/VKHMqDK1qcS.YXs1O8JeaxBrkPDjwLBn5wD2yYV5tAy
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
