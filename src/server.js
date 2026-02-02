import express from 'express';
import pm2 from 'pm2';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, '..', '..');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/projects', (req, res) => {
  const directories = fs.readdirSync(rootPath, { withFileTypes: true })
    .filter(
      dirent =>
        dirent.isDirectory() &&
        dirent.name !== 'control-apps' &&
        dirent.name !== 'upch-simulation-CONFIG-APP'
    )
    .map(dirent => dirent.name);

  pm2.list((err, list) => {
    const projectStatus = directories.map(name => {
      const proc = list.find(p => p.name === name);
      return {
        name,
        status: proc ? proc.pm2_env.status : 'stopped',
        cpu: proc ? proc.monit.cpu : 0,
        memory: proc ? Math.round(proc.monit.memory / 1024 / 1024) : 0
      };
    });
    res.json(projectStatus);
  });
});

app.post('/api/start', (req, res) => {
  const { name } = req.body;
  const projectPath = path.join(rootPath, name);

  let scriptFile = 'dist/src/main.js';
  if (name === 'upch-simulation-CLIENT-GATEWAY') {
    scriptFile = 'dist/main.js';
  }

  pm2.connect((err) => {
    if (err) return res.status(500).json({ error: err });

    pm2.start({
      script: scriptFile,
      name: name,
      cwd: projectPath,
      autorestart: false
    }, (err) => {

      console.log(err)

      if (err) return res.status(500).json({ error: err });
      res.json({ message: `${name} iniciado correctamente` });
    });
  });
});

app.post('/api/stop', (req, res) => {
  const { name } = req.body;
  pm2.stop(name, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: `${name} detenido` });
  });
});

app.post('/api/git-push', async (req, res) => {
  const { message } = req.body;
  const commitMsg = message || "feat: valid changes";

  const scriptPath = path.join(__dirname, '../src/scripts/git-all.ps1');

  try {
    const { stdout, stderr } = await execPromise(
      `powershell.exe -ExecutionPolicy Bypass -File "${scriptPath}" -CommitMessage "${commitMsg}"`
    );

    console.log(stdout);
    if (stderr) console.error(stderr);

    res.json({ message: 'Proceso Git completado', output: stdout });
  } catch (error) {
    console.error('Error ejecutando script:', error);
    res.status(500).json({ error: 'Error al subir cambios' });
  }
});

app.get('/', (req, res) => res.render('index'));

app.listen(8000, () => console.log('🚀 Dashboard en http://localhost:8000'));