const ENV = process.env.BABEL_ENV;
const cjs = ENV === "cjs";
const esm = ENV === "esm";

module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/env",
        {
          loose: true,
          modules: cjs ? "commonjs" : false,
          targets: {
            esmodules: esm ? true : undefined,
          },
        },
      ],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [],
  };
};
