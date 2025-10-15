let dadosExcel = [];

window.onload = function () {
  fetch('alunos.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });
      const primeiraPlanilha = workbook.SheetNames[0];
      const planilha = workbook.Sheets[primeiraPlanilha];
      dadosExcel = XLSX.utils.sheet_to_json(planilha, { header: 1 });
    })
    .catch(error => {
      console.error('Erro ao carregar o Excel:', error);
      document.getElementById('resultados').innerHTML = '<p>Erro ao carregar o arquivo Excel.</p>';
    });
};

function buscar() {
  const termo = document.getElementById('searchInput').value.toLowerCase();
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = '';

  if (dadosExcel.length === 0) {
    resultadosDiv.innerHTML = '<p>Arquivo Excel ainda não carregado.</p>';
    return;
  }

  const cabecalhos = dadosExcel[0];
  const resultados = dadosExcel.slice(1).filter(linha =>
    linha[0] && linha[0].toString().toLowerCase().includes(termo)
  );

  if (resultados.length === 0) {
    resultadosDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    return;
  }

  resultados.forEach(linha => {
    const item = document.createElement('div');
    item.innerHTML = '<hr>' + cabecalhos.map((col, i) =>
      `<strong>${col}:</strong> ${linha[i] || ''}`
    ).join('<br>');
    resultadosDiv.appendChild(item);
  });
}
