const fs = require('fs');
const config = require('./config.json')
if(!config.cortes || !config.arquivos || !config.separados || !fs.existsSync(`./${config.arquivos}`) || !fs.existsSync(`./${config.separados}`)) return console.log('config.json mal configurado')
const arquivos = config.arquivos
const separados = config.separados
console.log('---------------------------')
console.log('|  SEPARADOR BY STONEDEV  |')
console.log('---------------------------')


fs.readdir(`./${arquivos}`, function(error, files) {
    console.log(`Foi encontrado ${files.length} arquivos`)
    var grupos = []
    var corte = config.cortes
    for (i = 0; i < files.length; i++) {
        for (var i = 0; i < files.length; i = i + corte) {
            grupos.push(files.slice(i, i + corte));
        }
    }
    for (c = 0; c < grupos.length; c++) {
        console.log(grupos)
        for (i = 0; i < grupos[1].length; i++) {
            console.log(grupos[1][i]);
            if (fs.existsSync(`./${separados}/${c}`)) {
                fs.rename(`./${arquivos}/${grupos[c][i]}`, `./${separados}/${c}/${grupos[c][i]}`, function(err) {
                    if (err) throw err
                    console.log('separado!')
                })
            } else {
                fs.mkdirSync(`./${separados}/${c}`);
                fs.rename(`./${arquivos}/${grupos[c][i]}`, `./${separados}/${c}/${grupos[c][i]}`, function(err) {
                    if (err) throw err
                    console.log('separado!')
                })
            }
        }
    }
});