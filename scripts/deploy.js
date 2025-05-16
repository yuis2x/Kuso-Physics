/**
 * This script can be used to prepare the static export for deployment
 * Run with: node scripts/deploy.js
 */

const fs = require("fs")
const path = require("path")

// Copy the service worker to the out directory
console.log("Copying service worker to out directory...")
try {
  fs.copyFileSync(path.join(__dirname, "../public/sw.js"), path.join(__dirname, "../out/sw.js"))
  console.log("Service worker copied successfully.")
} catch (error) {
  console.error("Error copying service worker:", error)
}

// Create a simple .nojekyll file to prevent GitHub Pages from ignoring files that start with an underscore
console.log("Creating .nojekyll file...")
try {
  fs.writeFileSync(path.join(__dirname, "../out/.nojekyll"), "")
  console.log(".nojekyll file created successfully.")
} catch (error) {
  console.error("Error creating .nojekyll file:", error)
}

console.log("Deployment preparation complete!")
console.log('You can now deploy the contents of the "out" directory to your static hosting provider.')
