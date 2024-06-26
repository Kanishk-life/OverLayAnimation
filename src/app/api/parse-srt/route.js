// app/api/parse-srt/route.js
import { NextResponse } from 'next/server';
import SRTParser from 'srt-parser-2';

export async function POST(req) {
  const parser = new SRTParser();
  const formData = await req.formData();
  const srtFile = formData.get('file');
  const srtData = await srtFile.text();
  const subtitles = parser.fromSrt(srtData);

  const wordsWithTimestamps = [];
  subtitles.forEach(({ startSeconds, endSeconds, text }) => {
    const words = text.split(' ');
    const duration = (endSeconds - startSeconds) / words.length;
    let currentTime = startSeconds;

    words.forEach((word) => {
      wordsWithTimestamps.push({
        startTime: currentTime,
        word,
        endTime: currentTime + duration,
      });
      currentTime += duration;
    });
  });

  return NextResponse.json({ subtitles: wordsWithTimestamps });
}
