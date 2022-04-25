const fs = require("fs");
const path = require("path");
const basePath = process.cwd();
const imageDir = `${basePath}/layers`;

fs.readdir(imageDir, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files.forEach(function (file, _) {
    const fromPath = `${imageDir}/${file}`
    const isDir = fs.lstatSync(fromPath).isDirectory()

    if (isDir) {
      fs.readdir(fromPath, function (err, files) {
        const numberOfTraits = files.length
        const proportion = ~~(100 / numberOfTraits)

        files.forEach(function (file, _) {
          if (file.includes('DS_Store')) {
            fs.unlink(`${fromPath}/${file}`, (err) => {
              if (err) {
                console.error(err)
              }
              return
            })
          }

          let [fileBaseName, extension] = file.split('.')
          fileBaseName = fileBaseName.split('#')[0]
          const newFileName = `${fileBaseName}#${proportion}.${extension}`
          const fromFilePath = `${fromPath}/${file}`
          const toFilePath = `${fromPath}/${newFileName}`

          fs.rename(fromFilePath, toFilePath, function (error) {
            if (error) {
              console.error("File moving error.", error);
            }
          });
          console.log(`${file} => ${newFileName}`)
        })
        console.log('-------------------------')
      })
    }
  })

})
// const getImages = (_dir) => {
//   try {
//     return fs
//       .readdirSync(_dir)
//       .filter((item) => {
//         let extension = path.extname(`${_dir}${item}`);
//         if (extension == ".png" || extension == ".jpg") {
//           return item;
//         }
//       })
//       .map((i) => {
//         return {
//           filename: i,
//           path: `${_dir}/${i}`,
//         };
//       });
//   } catch {
//     return null;
//   }
// };
