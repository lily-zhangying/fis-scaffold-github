var request = require('request'),
	fs = require('fs'),
	path = require('path'),
	AdmZip = require('adm-zip');

module.exports = function(options) {
	var scf_opts = options;
		scf_opts.repos = 'https://api.github.com/repos/',
		dist = scf_opts.dir;

	function module_fn() {
		if (!options.withPlugin) {
            scf_opts.exclude = /package\.json|\/plugin\/.*|page\/layout.tpl|README.md/i;
        }
        
        download_fn('lily-zhangying/pc-scaffold-module', scf_opts, function (err, dirname) {
            if (!options.withPlugin) {
                fis.util.del(path.resolve(dist, dirname + '/plugin'));
            } 
            fis.scaffold.mv(path.resolve(dist, dirname), dist);
            fis.scaffold.prompt(dist);
        });
	}

	function widget_fn() {

		download_fn('lily-zhangying/pc-scaffold-widget', scf_opts, function (err, dirname) {
            fis.scaffold.mv(path.resolve(dist, dirname), dist);
            var files = fis.util.find(dist);
            fis.util.map(files, function (index, filepath) {

                if (filepath) {
                    
                    var name = require('path').basename(dist);
                    
                    //replace rel path
                    var content = fis.util.read(filepath, {
                        encoding: 'utf8'
                    });

                    fis.util.write(filepath, content.replace(/widget\.(js|css|tpl)/g, function (match, ext) {
                        match = name + '.' + ext;
                        return match;
                    }));

                    var m = filepath.match(/widget\.(js|css|tpl)$/);
                    
                    if (m) {
                        fis.scaffold.mv(filepath, path.resolve(dist, name + '.' + m[1]));
                    }
                }
            });

            fis.scaffold.prompt(dist);
        });
	}

	//download from github
	function download_fn(cmd, opt, cb) {
		var cmdArr = cmd.split('/');
		var owner = cmdArr.shift() || '';
		var repo = cmdArr.shift() || '';
		var ref = cmdArr.join('/') || 'master';
		var download_url = opt.repos + owner + '/' + repo + '/zipball/' + ref;

		var request_options = {
			url : download_url,
			headers : {
				'User-Agent' : 'fis-scaffold-demo'
			},
			encoding : null
		};

		request.get(request_options, function(err, result, body) {
			if(err) {
				fis.log.error(err);
                return;
            }else {
				var extractDir = opt.dir;
				var dispos = result.headers['content-disposition'];
				var dirname = dispos.split(';').pop().split('=').pop().replace(/\.zip$/g, '').toString();
				try {
					var zipFile = new AdmZip(body);
                	zipFile.extractAllTo(extractDir, true);
				}catch(e) {
					fis.log.error(e);
				}
				//返回dirname解压后的文件夹
				//格式为 owner-repo-hash
				//例如lily-zhangying-pc-scaffold-module-08aba70
				cb && cb(null, dirname);
			}
		});
	}

	return {
		module : module_fn,
		widget : widget_fn,
		download : download_fn
	}
}