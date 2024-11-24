import axios from "axios";
import sharp from "sharp";
import { encode } from "blurhash";

async function generateBlurhashFromUrl(
  imageUrl: string
): Promise<string | null> {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data);

    const image = sharp(imageBuffer);
    const { data, info } = await image
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    const blurhash = encode(
      new Uint8ClampedArray(data),
      info.width,
      info.height,
      4,
      3
    );

    return blurhash;
  } catch (error) {
    console.error("生成 Blurhash 时出错:", error);
    throw error;
  }
}

export { generateBlurhashFromUrl };
