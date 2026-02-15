import { generateColorRGB } from "@marko19907/string-to-color";

export function generateUserColor(id: number, registrationDate: string): string {
  return generateColorRGB(`${id}-${registrationDate}`);
}