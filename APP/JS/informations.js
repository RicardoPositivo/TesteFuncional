
        
        const express = require('express');
        const os = require('os');
        const diskusage = require('diskusage');
        
        const app = express();
        
        // Rota para obter informações do sistema
        app.get('/system-info', (req, res) => {
            // Informações do processador
            const cpuInfo = os.cpus()[0].model;
        
            // Informações da memória
            const totalMemory = Math.round(os.totalmem() / (1024 * 1024)); // Convertendo para megabytes
            const freeMemory = Math.round(os.freemem() / (1024 * 1024)); // Convertendo para megabytes
        
            // Informações dos discos
            diskusage.check('/', (err, info) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Erro ao obter informações do disco');
                    return;
                }
                const diskInfo = {
                    total: Math.round(info.total / (1024 * 1024 * 1024)), // Convertendo para gigabytes
                    free: Math.round(info.free / (1024 * 1024 * 1024)) // Convertendo para gigabytes
                };
        
                res.json({
                    cpuInfo,
                    totalMemory,
                    freeMemory,
                    diskInfo
                });
            });
        });
        
        // Iniciar o servidor na porta 3000
        app.listen(3000, () => {
            console.log('Servidor iniciado na porta 3000');
        });
        
        