import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side High-Fidelity Text-to-Speech API Route
 * Generates natural, human-like native English audio streams (US or UK accent).
 * 
 * Query parameters:
 *  - text: The script or question text to synthesize
 *  - accent: 'US' (en-us) or 'UK' (en-gb). Defaults to 'US'.
 */

async function fetchAudioSegment(text: string, langCode: string): Promise<Buffer> {
  const encodedText = encodeURIComponent(text.trim());
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${langCode}&q=${encodedText}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://translate.google.com/'
    }
  });

  if (!response.ok) {
    throw new Error(`TTS provider returned status ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Splits text into natural sentence/clause chunks under 130 characters.
 */
function splitIntoNaturalChunks(text: string): string[] {
  // Format TOEIC options into clear clauses with pauses
  const cleaned = text
    .replace(/\(A\)/gi, '... Option A: ')
    .replace(/\(B\)/gi, '... Option B: ')
    .replace(/\(C\)/gi, '... Option C: ')
    .replace(/\(D\)/gi, '... Option D: ')
    .replace(/Number\s+(\d+)\./gi, 'Number $1. ... ')
    .replace(/\s+/g, ' ')
    .trim();

  const sentences = cleaned.split(/(?<=[.?!;:])\s+/);
  const chunks: string[] = [];
  let current = '';

  for (const s of sentences) {
    if ((current + ' ' + s).length <= 130) {
      current = current ? current + ' ' + s : s;
    } else {
      if (current) chunks.push(current);
      if (s.length > 130) {
        // Split long sentence by commas or words
        const words = s.split(' ');
        let sub = '';
        for (const w of words) {
          if ((sub + ' ' + w).length <= 130) {
            sub = sub ? sub + ' ' + w : w;
          } else {
            if (sub) chunks.push(sub);
            sub = w;
          }
        }
        if (sub) chunks.push(sub);
        current = '';
      } else {
        current = s;
      }
    }
  }

  if (current) chunks.push(current);
  return chunks.filter(c => c.trim().length > 0);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');
    const accent = searchParams.get('accent') === 'UK' ? 'en-gb' : 'en-us';

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text query parameter is required' }, { status: 400 });
    }

    const chunks = splitIntoNaturalChunks(text);
    if (chunks.length === 0) {
      return NextResponse.json({ error: 'Empty text after processing' }, { status: 400 });
    }

    // Fetch audio chunks in parallel batches
    const audioBuffers: Buffer[] = [];
    for (const chunk of chunks) {
      try {
        const buf = await fetchAudioSegment(chunk, accent);
        audioBuffers.push(buf);
      } catch (err) {
        console.warn(`Failed to synthesize chunk "${chunk.substring(0, 30)}...":`, err);
      }
    }

    if (audioBuffers.length === 0) {
      return NextResponse.json({ error: 'Could not generate audio segments' }, { status: 502 });
    }

    const combinedAudio = Buffer.concat(audioBuffers);

    return new Response(new Uint8Array(combinedAudio), {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': combinedAudio.length.toString(),
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
      }
    });
  } catch (error: any) {
    console.error('Error in /api/tts:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
