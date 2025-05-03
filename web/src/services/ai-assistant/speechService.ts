import { languageNames } from "./groqService";

// Google Cloud Speech-to-Text API endpoint
const GOOGLE_STT_API_URL = "https://speech.googleapis.com/v1/speech:recognize";
// Google Cloud Text-to-Speech API endpoint
const GOOGLE_TTS_API_URL = "https://texttospeech.googleapis.com/v1/text:synthesize";

// Get API key from environment variables
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";

const googleLanguageCodes: Record<string, string> = {
  "hi": "hi-IN", // Hindi
  "en": "en-US", // English
  "pa": "pa-IN", // Punjabi
  "bn": "bn-IN", // Bengali
  "te": "te-IN", // Telugu
  "ta": "ta-IN", // Tamil
  "mr": "mr-IN", // Marathi
  "gu": "gu-IN", // Gujarati
  "kn": "kn-IN", // Kannada
};

export const speechService = {
  // Speech-to-Text: Convert spoken audio to text
  speechToText: async (audioBlob: Blob, languageCode: string): Promise<string> => {
    try {
      // Convert the audio blob to base64
      const base64Audio = await blobToBase64(audioBlob);
      
      // Get the appropriate Google language code
      const googleLangCode = googleLanguageCodes[languageCode] || googleLanguageCodes["hi"];
      
      // Prepare the request payload
      const payload = {
        config: {
          encoding: "WEBM_OPUS", 
          sampleRateHertz: 48000, 
          languageCode: googleLangCode,
          model: "default",
          speechContexts: [
            {
              phrases: ["crop", "weather", "market", "price", "scheme", "subsidy", "disease", 
                        "फसल", "मौसम", "बाजार", "मूल्य", "योजना", "सब्सिडी", "रोग"]
            }
          ]
        },
        audio: {
          content: base64Audio.split(",")[1] // Remove the data URL prefix
        }
      };
      
      // Make the API request
      const response = await fetch(`${GOOGLE_STT_API_URL}?key=${GOOGLE_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Speech-to-Text API error details:", errorData);
        throw new Error(`Speech-to-Text API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract the transcribed text
      if (data.results && data.results.length > 0) {
        return data.results[0].alternatives[0].transcript;
      }
      
      return "";
    } catch (error) {
      console.error("Error in Speech-to-Text service:", error);
      throw error;
    }
  },
  
  // Text-to-Speech: Convert text to spoken audio
  textToSpeech: async (text: string, languageCode: string): Promise<string> => {
    try {
      // Get the appropriate Google language code
      const googleLangCode = googleLanguageCodes[languageCode] || googleLanguageCodes["hi"];
      
      // Prepare the request payload
      const payload = {
        input: {
          text: text
        },
        voice: {
          languageCode: googleLangCode,
          ssmlGender: "NEUTRAL"
        },
        audioConfig: {
          audioEncoding: "MP3"
        }
      };
      
      // Make the API request
      const response = await fetch(`${GOOGLE_TTS_API_URL}?key=${GOOGLE_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Text-to-Speech API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Convert the base64 audio content to a data URL
      return `data:audio/mp3;base64,${data.audioContent}`;
    } catch (error) {
      console.error("Error in Text-to-Speech service:", error);
      throw error;
    }
  }
};

// Helper function to convert a Blob to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Helper function to start recording audio
export const startRecording = (): Promise<MediaRecorder> => {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Specify the MIME type and options for better compatibility with Google Speech API
      const options = { mimeType: 'audio/webm;codecs=opus' };
      const mediaRecorder = new MediaRecorder(stream, options);
      
      mediaRecorder.start();
      resolve(mediaRecorder);
    } catch (error) {
      reject(error);
    }
  });
};

// Helper function to stop recording and get the audio blob
export const stopRecording = (mediaRecorder: MediaRecorder): Promise<Blob> => {
  return new Promise((resolve) => {
    const audioChunks: BlobPart[] = [];
    
    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });
    
    mediaRecorder.addEventListener("stop", () => {
      // Use the same MIME type that was used for recording
      // This ensures compatibility with the audio format
      const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || "audio/webm;codecs=opus" });
      resolve(audioBlob);
    });
    
    mediaRecorder.stop();
  });
};