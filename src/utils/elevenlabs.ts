export const speakWithElevenLabs = async (text: string) => {
  const apiKey2 = process.env.ELEVENLABS_API_KEY;
  const apiKey = 'sk_8b541d5d8469966596ad59892830d79cd5cf6380535fa586';
  const voiceId = '21m00Tcm4TlvDq8ikWAM';

  // console.log("Có API Key không?: ", apiKey2)

  console.log("Có API Key không?: ", apiKey)

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': apiKey!,
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5
      }
    }),
  });

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
};
