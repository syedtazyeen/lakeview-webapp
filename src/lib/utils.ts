import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names into a single string, resolving Tailwind conflicts.
 * @param inputs - Array of class values.
 * @returns Merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Capitalizes the first letter of a string.
 * @param input - Input string.
 * @returns String with the first letter capitalized.
 */
export function capitalizeFirstLetter(input: string): string {
  return input.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Formats a snake_case or SCREAMING_SNAKE_CASE string to a readable format.
 * @param input - Enum-like string.
 * @returns Formatted string with spaces and capitalized words.
 */
export function formatEnumString(input: string): string {
  return input
    .toLowerCase()
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Checks if a string matches any string in an array, ignoring case and spaces.
 * @param value - String to match.
 * @param array - Array of strings to check against.
 * @returns True if a match is found, false otherwise.
 */
export function matchesAny(value: string, array: string[]): boolean {
  const sanitizedValue = value.trim().toLowerCase();
  return array.some((item) => item.trim().toLowerCase() === sanitizedValue);
}
