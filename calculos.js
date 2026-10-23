const cfg = require('./config');


//Funções do enunciado  (criar)
function consumoMensalKwh(aparelho) {
    const consumoMensal = (aparelho.potencia * aparelho.horasPorDia * aparelho.dias) / 1000;
    return consumoMensal;
}

function custoEnergia(kwh) {
  const custoEnergia = kwh * cfg.TARIFA_KWH;
  return custoEnergia;
}

function adicionalBandeira(kwh) {
  const adicionalBandeira = (kwh / 100) * cfg.VALORES_BANDEIRA[cfg.BANDEIRA];
  return adicionalBandeira;
    // Calcular o adicional da bandeira
}

function geracaoMensalPainel(kwh) {
  const geracaoMensalPainel = (cfg.POTENCIA_PAINEL_W / 1000) * cfg.HSP * 30 * cfg.EFICIENCIA;

   if (kwh <= 0) {
        return 0;
    }

    if (geracaoMensalPainel <= 0) {
        throw new Error("A geração do painel deve ser maior que zero.");
    }

    const quantidadePaineis = Math.ceil(kwh / geracaoMensalPainel);

    return quantidadePaineis;

    // Calcular a quantidade de painéis
}




function simular(aparelhos) {
    let consumoTotal = 0;
    const detalhesAparelhos = [];

    let aparelhoMaisCaro = null;
    let maiorCusto = 0;

    // 1. Calcula o consumo de cada aparelho
    for (const aparelho of aparelhos) {
        const consumoIndividual = consumoMensalKwh(aparelho);

        // Soma o consumo ao total
        consumoTotal += consumoIndividual;

        // Calcula o custo individual da energia
        const custoIndividual = custoEnergia(consumoIndividual);

        // Calcula a porcentagem do consumo total
        const percentualConsumo = consumoTotal > 0
            ? (consumoIndividual / consumoTotal) * 100
            : 0;

        // Guarda os dados do aparelho
        detalhesAparelhos.push({
            nome: aparelho.nome,
            consumoKwh: consumoIndividual,
            custoEnergia: custoIndividual,
            percentualConsumo: percentualConsumo
        });

        // Identifica o aparelho com maior custo
        if (custoIndividual > maiorCusto) {
            maiorCusto = custoIndividual;
            aparelhoMaisCaro = aparelho.nome;
        }
    }

    // 2. Calcula os valores gerais da simulação
    const custoTotalEnergia = custoEnergia(consumoTotal);
    const adicional = adicionalBandeira(consumoTotal);
    const custoTotalComBandeira = custoTotalEnergia + adicional;
    const quantidadePaineis = paineisNecessarios(consumoTotal);

    // 3. Retorna o resultado da simulação
    return {
        consumoTotalKwh: consumoTotal,
        custoEnergia: custoTotalEnergia,
        adicionalBandeira: adicional,
        custoTotal: custoTotalComBandeira,
        paineisNecessarios: quantidadePaineis,
        aparelhoMaisCaro: aparelhoMaisCaro,
        detalhesAparelhos: detalhesAparelhos
    };
}

module.exports = {
    consumoMensalKwh,
    custoEnergia,
    adicionalBandeira,
    geracaoMensalPainel,
    simular
};