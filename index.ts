import Bing from "./src/bing";

const api =
  "https://global.bing.com/HPImageArchive.aspx?format=js&idx=0&n=9&pid=hp&FORM=BEHPTB&uhd=1&uhdwidth=3840&uhdheight=2160&setmkt=zh-cn&setlang=en-us";

(async () => {
  const bing = new Bing(api);

  await bing.getWallpaler();
  await bing.save();
})();
