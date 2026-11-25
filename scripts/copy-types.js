const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const network = process.env.DFX_NETWORK || "local";
const source = path.join(root, ".dfx", network, "canisters");
const destination = path.join(root, "src", "declarations");

if (!fs.existsSync(source)) {
  console.log(`No generated declarations found at ${source}; skipping.`);
  process.exit(0);
}

fs.rmSync(destination, { recursive: true, force: true });

for (const canister of fs.readdirSync(source, { withFileTypes: true })) {
  if (!canister.isDirectory()) continue;

  const sourceCanister = path.join(source, canister.name);
  const destinationCanister = path.join(destination, canister.name);
  fs.mkdirSync(destinationCanister, { recursive: true });

  for (const file of fs.readdirSync(sourceCanister)) {
    if (file.endsWith(".wasm") || file.endsWith(".most")) continue;
    const filePath = path.join(sourceCanister, file);
    if (fs.statSync(filePath).isFile()) {
      fs.copyFileSync(filePath, path.join(destinationCanister, file));
    }
  }
}

for (const canister of fs.readdirSync(destination, { withFileTypes: true })) {
  const indexFile = path.join(destination, canister.name, "index.js");
  if (!canister.isDirectory() || !fs.existsSync(indexFile)) continue;
  const fixed = fs
    .readFileSync(indexFile, "utf8")
    .replace(/\{ canister_name_ident_uppercase \}/g, canister.name.toUpperCase());
  fs.writeFileSync(indexFile, fixed);
}
