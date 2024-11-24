import axios from "axios";
import { Image } from "./type";
import { parseImageUrl, parseThumbnailUrl } from "./image";
import { generateBlurhashFromUrl } from "./blurhash";
import { saveToArchive, saveToReadme } from "./file";

type WallpaperResponse = {
  images: Array<Image>;
};

class Bing {
  host: string = "https://www.bing.com";
  api: string;
  archivesMainDir: string;
  bingFile: string;
  bingImages: Array<Image>;

  constructor(api: string) {
    this.api = api;
    this.archivesMainDir = __dirname + "/../../archives/zh-cn";
    this.bingFile = this.archivesMainDir + "/all.json";
    this.bingImages = require(this.bingFile) as Array<Image>;
  }

  async getWallpaler() {
    const resp = await axios.get(this.api);
    const data = resp.data as WallpaperResponse;

    for (const item of data.images) {
      const result = this.bingImages.find(
        (image) => image.enddate === item.enddate
      );

      if (result != undefined) {
        continue;
      }

      const url = parseImageUrl(this.host, item.url);
      const thumbnailUrl = parseThumbnailUrl(this.host, item.url);
      const blurhash = await generateBlurhashFromUrl(thumbnailUrl);

      this.bingImages.unshift({
        startdate: item.startdate,
        enddate: item.enddate,
        title: item.title,
        copyright: item.copyright,
        copyrightlink: this.host + item.copyrightlink,
        url: url,
        blurhash: blurhash ? blurhash : "",
      });
    }

    this.bingImages.sort((a, b) => Number(b.enddate) - Number(a.enddate));
  }

  async save() {
    saveToArchive(this.bingImages, this.archivesMainDir);
    saveToReadme(this.bingImages, __dirname + "/../../README.md");
  }
}

export default Bing;
