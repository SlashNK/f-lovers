import { MESSAGES_SEPARATOR } from "./constants";

export const encodeMessages = (messages) => {
  return messages.join(MESSAGES_SEPARATOR);
  // return btoa(encodeURIComponent(messages.join(MESSAGES_SEPARATOR)));
};

export const decodeMessages = (encodedMessages) => {
  return encodedMessages.split(MESSAGES_SEPARATOR)
  // if (encodeMessages === null || encodeMessages === "") return [];
  // return atob(encodedMessages).split(MESSAGES_SEPARATOR);
};
export const isColor = (strColor) => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
}
