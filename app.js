const express = require('express');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const app = express();
const port = 3000;
const filePath = path.join(__dirname, 'engsft3.docx'); // Certifique-se de que o caminho para o arquivo está correto

app.get('/', (req, res) => {
    res.send('API para exibir documento .docx');
});

app.get('/documento', async (req, res) => {
    try {
        const data = fs.readFileSync(filePath);
        const result = await mammoth.convertToHtml({ buffer: data });
        res.send(result.value); // Envia o conteúdo HTML do documento
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

//http://localhost:3000/documento