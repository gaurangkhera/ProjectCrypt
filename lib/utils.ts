import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"  
import bcrypt from 'bcryptjs'

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function hash(str: string) {
  try {
    const hashedValue = await bcrypt.hash(str, 10);
    return hashedValue;
  } catch (error) {
    // Handle any errors during the hashing process
    throw new Error('Hashing process failed');
  }
}
