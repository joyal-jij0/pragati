export type MessageRole = 'user' | 'assistant';

export type MessageContentType = 'text' | 'image';

export interface MessageContent {
  type: MessageContentType;
  text: string;
  imageUrl?: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: MessageContent;
  timestamp: string;
}