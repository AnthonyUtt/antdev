export default async function(config) {
  config.addLayoutAlias("default", "layouts/base.liquid");

  return {
    dir: {
      input: "src",
      output: "public",
    },
    templateFormats: ["html", "liquid", "11ty.js"],
  };
};
