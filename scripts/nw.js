'use strict';

const cmd = require('node-cmd');

const fs = require("fs");

let localUrlForBrowser = process.argv[2];

let nwPath = process.argv[3].replace(/\\\\/, "/");


let nwJson = nwPath.replace("nw.exe", "package.json");

let packageJson;

try {

	if (fs.existsSync(nwJson)) {

		let file = fs.readFileSync(nwJson);

		let packageString = file.toString();

		packageJson = JSON.parse(packageString);

	} else {

		packageJson = {};

	}

	packageJson.name = "react-nw";

	packageJson.main = localUrlForBrowser;

	packageJson['node-remote'] = "<all_urls>";

	packageJson.window = {};

	packageJson.window.toolbar = false;

	packageJson.window.icon = 'nw.png';

	packageJson.window.title = "我想婧婧";

	packageJson.window.resizable = true;

	packageJson.window.fullscreen = false;

	packageJson.window.frame = false;

	let newString = JSON.stringify(packageJson);

	fs.writeFileSync(nwJson, newString);

} catch (error) {
	console.log(error);

}

console.log(nwPath);

cmd.get(nwPath, (err, data, stderr) => {

	console.log(err, data, stderr);

	process.send({
		nwOpen: "ok"
	});

	process.exit()
});
