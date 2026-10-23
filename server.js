function arredondar(valor) {
    return Math.round(valor * 100) / 100;
}

const resultado = simular(aparelhos);

res.json({
    consumoTotalKwh: arredondar(resultado.consumoTotalKwh),
    custoEnergia: arredondar(resultado.custoEnergia),
    adicionalBandeira: arredondar(resultado.adicionalBandeira),
    custoTotal: arredondar(resultado.custoTotal),
    paineisNecessarios: resultado.paineisNecessarios,

    aparelhoMaisCaro: resultado.aparelhoMaisCaro,

    detalhesAparelhos: resultado.detalhesAparelhos.map(aparelho => ({
        ...aparelho,
        consumoKwh: arredondar(aparelho.consumoKwh),
        custoEnergia: arredondar(aparelho.custoEnergia),
        percentualConsumo: arredondar(aparelho.percentualConsumo)
    }))
});