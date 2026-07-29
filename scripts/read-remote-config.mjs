import { readFile } from "node:fs/promises";

import { parse } from "yaml";

const [configPath] = process.argv.slice(2);
if (!configPath) {
  throw new Error("config path is required");
}

const document = parse(await readFile(configPath, "utf-8"));
const create = document?.remote?.create;

if (!create || typeof create !== "object" || Array.isArray(create)) {
  throw new Error("config.yaml must define remote.create");
}

const { build, resources } = create;
if (!resources || typeof resources !== "object" || Array.isArray(resources)) {
  throw new Error("config.yaml must define remote.create.resources");
}
if (!build || typeof build !== "object" || Array.isArray(build)) {
  throw new Error("config.yaml must define remote.create.build");
}

function requireInteger(value, path, minimum) {
  if (!Number.isInteger(value) || value < minimum) {
    throw new Error(
      `${path} must be an integer greater than or equal to ${minimum}`
    );
  }
  return value;
}

function optionalString(value, path) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  if (typeof value !== "string") {
    throw new TypeError(`${path} must be a string or null`);
  }
  return value;
}

const target = optionalString(create.target, "remote.create.target");
if (target !== null && target !== "eu" && target !== "us") {
  throw new Error("remote.create.target must be eu, us, or null");
}
if (typeof create.clone !== "boolean") {
  throw new TypeError("remote.create.clone must be a boolean");
}

const normalized = {
  snapshot: optionalString(create.snapshot, "remote.create.snapshot"),
  build: {
    dockerfile: optionalString(
      build.dockerfile,
      "remote.create.build.dockerfile"
    ),
    context: optionalString(build.context, "remote.create.build.context"),
  },
  target,
  clone: create.clone,
  autoStopMinutes: requireInteger(
    create.autoStopMinutes,
    "remote.create.autoStopMinutes",
    0
  ),
  resources: {
    cpu: requireInteger(resources.cpu, "remote.create.resources.cpu", 1),
    memoryMb: requireInteger(
      resources.memoryMb,
      "remote.create.resources.memoryMb",
      1
    ),
    diskGb: requireInteger(
      resources.diskGb,
      "remote.create.resources.diskGb",
      1
    ),
  },
};

process.stdout.write(JSON.stringify(normalized));
