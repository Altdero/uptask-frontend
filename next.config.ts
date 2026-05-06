import type { NextConfig } from "next";
import type { Configuration, RuleSetCondition, RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack: (config: Configuration) => {
    const rules = (config.module?.rules as RuleSetRule[]) ?? [];

    const fileLoaderRule = rules.find((rule) => {
      if (rule && typeof rule === "object" && rule.test instanceof RegExp) {
        return rule.test.test(".svg");
      }
      return false;
    });

    // 1. Undefined handling: If it doesn't exist, exit early.
    if (!fileLoaderRule || typeof fileLoaderRule !== "object") return config;

    // 2. Safely extract 'not' to avoid non-existent property errors
    // Define existing rules in 'not' or start with an empty array
    const existingNot =
      (fileLoaderRule.resourceQuery as { not?: RuleSetCondition[] })?.not ?? [];

    rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        // 3. Apply the new 'not' array safely
        resourceQuery: { not: [...existingNot, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
