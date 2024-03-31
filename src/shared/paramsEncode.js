import { GENERAL_PREFIX, MESSAGES_SEPARATOR, RECEIVE_PAGE_PREFIX } from "./constants";

export const encodeMessages = (messages) => {
  return messages.join(MESSAGES_SEPARATOR);
  // return btoa(encodeURIComponent(messages.join(MESSAGES_SEPARATOR)));
};

export const decodeMessages = (encodedMessages) => {
  if(typeof encodedMessages !== 'string') {
    return []
  }
  return encodedMessages.split(MESSAGES_SEPARATOR);
  // if (encodeMessages === null || encodeMessages === "") return [];
  // return atob(encodedMessages).split(MESSAGES_SEPARATOR);
};
export const isColor = (strColor) => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== "";
};

export const getResUrl = (bgColor, messages) => {
  const encodedMessages = encodeMessages(messages);
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("message", encodedMessages);
  searchParams.set("bg", bgColor);
  return `${window.location.host}/${GENERAL_PREFIX}/${RECEIVE_PAGE_PREFIX}?${searchParams}`;
};

