import * as fs from "fs";

import { Image } from "./type";

function saveToArchive(images: Array<Image>, dir: string) {
  saveAllArchive(images, dir);
  saveMonthArchive(images, dir);
}

function saveAllArchive(images: Array<Image>, dir: string) {
  const file = dir + "/all.json";
  const content = JSON.stringify(images, null, 2);
  fs.writeFileSync(file, content, "utf-8");
}

function saveMonthArchive(images: Array<Image>, dir: string) {
  const grouped = images.reduce((acc, item) => {
    const month = item.enddate.substring(0, 6);

    var array = acc.get(month);
    if (array == undefined) {
      array = new Array();
      acc.set(month, array);
    }
    array.push(item);

    return acc;
  }, new Map<string, Array<Image>>());

  grouped.forEach((value, key) => {
    const file = dir + "/" + key + "/wallpapers.json";
    fs.mkdirSync(dir + "/" + key, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(value), "utf-8");
  });
}

function saveToReadme(images: Array<Image>, readmePath: string) {
  const url = images[0].url;
  const mdTemplate = `# Daily Wallpapers
  
![](${url})

## Feature

- Daily automatic update of bing wallpapers
- Driving Wallpaper App Development

## API

\`\`\`
https://raw.githubusercontent.com/gavinliu/daily-wallpapers/refs/heads/master/archives/zh-cn/:yyyy:MM/wallpapers.json
\`\`\`

## License

MIT
  `;

  fs.writeFileSync(readmePath, mdTemplate, "utf-8");
}

export { saveToArchive, saveToReadme };
