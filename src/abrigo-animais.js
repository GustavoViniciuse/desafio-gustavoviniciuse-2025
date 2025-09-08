class AbrigoAnimais {
  constructor() {
    this.ANIMAIS = new Map([
      ['Rex', { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] }],
      ['Mimi', { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] }],
      ['Fofo', { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] }],
      ['Zero', { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] }],
      ['Bola', { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] }],
      ['Bebe', { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] }],
      ['Loco', { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }],
    ]);

    this.BRINQUEDOS_VALIDOS = new Set();
    this.ANIMAIS.forEach(a => a.brinquedos.forEach(b => this.BRINQUEDOS_VALIDOS.add(b)));
  }

  contemSequencia(ordemPessoa, ordemAnimal) {
    let idx = 0;
    for (let item of ordemPessoa) {
      if (item === ordemAnimal[idx]) idx++;
      if (idx === ordemAnimal.length) break;
    }
    return idx;
  }

  encontraPessoas(toysPessoa1, toysPessoa2, animaisInput) {
    const lista = [];

    const pessoa1 = toysPessoa1.split(',').map(s => s.trim());
    const pessoa2 = toysPessoa2.split(',').map(s => s.trim());
    const animais = animaisInput.split(',').map(s => s.trim());

    for (let a of animais) {
      if (!this.ANIMAIS.has(a)) return { erro: 'Animal inválido', lista: null };
    }

    for (let t of [...pessoa1, ...pessoa2]) {
      if (!this.BRINQUEDOS_VALIDOS.has(t)) return { erro: 'Brinquedo inválido', lista: null };
    }

    let adotadosPessoa1 = 0;
    let adotadosPessoa2 = 0;

    const animaisParaAdotar = animais.map(nome => {
      const { tipo, brinquedos } = this.ANIMAIS.get(nome);
      const seq1 = this.contemSequencia(pessoa1, brinquedos);
      const seq2 = this.contemSequencia(pessoa2, brinquedos);
      return { nome, tipo, seq1, seq2, length: brinquedos.length };
    });

    animaisParaAdotar.sort((a, b) => {
      if (a.tipo === 'jabuti' && b.tipo !== 'jabuti') return 1;
      if (b.tipo === 'jabuti' && a.tipo !== 'jabuti') return -1;
      return a.nome.localeCompare(b.nome);
    });

    for (let animal of animaisParaAdotar) {
      const { nome, tipo, seq1, seq2, length } = animal;
      let adotado = 'abrigo';

      if (tipo === 'jabuti' && nome === 'Loco') {
        const jaAdotado = lista.some(l => !l.endsWith('abrigo'));
        if (jaAdotado) {
          if (adotadosPessoa1 < 3) {
            adotado = 'pessoa 1';
            adotadosPessoa1++;
          } else if (adotadosPessoa2 < 3) {
            adotado = 'pessoa 2';
            adotadosPessoa2++;
          }
        }
      } else {
        if (seq1 === length && seq2 === length) {
          adotado = 'abrigo';
        } else if (seq1 === length && adotadosPessoa1 < 3) {
          adotado = 'pessoa 1';
          adotadosPessoa1++;
        } else if (seq2 === length && adotadosPessoa2 < 3) {
          adotado = 'pessoa 2';
          adotadosPessoa2++;
        }
      }

      lista.push(`${nome} - ${adotado}`);
    }

    return { lista, erro: null };
  }
}

export { AbrigoAnimais };