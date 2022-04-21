<template>
  <div class="app">
    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="exibirModal=true">Adicionar Movimentação</button>
    <div class="formulario-movimentacao" v-show="exibirModal">
      <ModalFormularioMovimentacao id="exampleModal" :tituloFormulario="titulo" @movimentacaoSalva="adicionarMovimentacao"/>
    </div>
    <div class="tabela-motivementa">
      <TabelaMovimentacao class="mt-5" :movimentacoes="movimentacoes" @excluirMovimentacao="excluirMovimentacao"/>
    </div>
    <div id="rodape">
      <div class="container">
        <div class="total-receita mt-2">
          <p>{{ ProcessarTotalReceita }}</p>
        </div>
        <div class="total-despesa">
          <p>{{ processarTotalDespesas }}</p>
        </div>
        <div class="saldo">
          <p>{{ processarSaldo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalFormularioMovimentacao from './components/ModalFormularioMovimentacao.vue'
import TabelaMovimentacao from './components/TabelaMovimentacao.vue'

export default {
  name: 'App',
  components: {
    ModalFormularioMovimentacao,
    TabelaMovimentacao
  },
  data() {
    return {
      titulo: 'Adicionar Movimentação',
      exibirModal:false,
      totalReceitas:0,
      totalDespesas:0,
      saldo:0,
      movimentacao: {
          titulo: null,
          descricao: null,
          valor: null,
          tipo: null,
          data: null,
      },
      movimentacoes: []
    }
  },
  computed:{
    ProcessarTotalReceita() {
      return 'Total Receitas R$ ' + this.totalReceitas
    },
    processarTotalDespesas() {
      return 'Total Despesas R$ ' + this.totalDespesas
    },
    processarSaldo() {
      return 'Saldo R$ ' + this.saldo
    }
  },
  methods: {
    adicionarMovimentacao(event) {
      this.exibirModal = false
      this.tratarMovimentacao(event)
      this.movimentacoes.push(this.movimentacao)
      this.limparDadosMovimentacao()
      this.atualizarDados()
    },
    tratarMovimentacao(movimentacaoRecebida) {
      this.movimentacao.titulo = movimentacaoRecebida.titulo
      this.movimentacao.descricao = movimentacaoRecebida.descricao
      this.movimentacao.valor = movimentacaoRecebida.valor
      this.movimentacao.tipo = movimentacaoRecebida.tipo
      this.movimentacao.data = movimentacaoRecebida.data
    },
    limparDadosMovimentacao() {
      this.movimentacao.titulo = null
      this.movimentacao.descricao = null
      this.movimentacao.valor = null
      this.movimentacao.tipo = null
      this.movimentacao.data = null
    },
    excluirMovimentacao(indice) {
      this.movimentacoes.splice(indice)
    },
    atualizarDados() {
      this.calcularTotalReceitas()
      this.calcularTotalDespesas()
      this.calcularSaldo()
      this.exibirFormulario=false
    },
    calcularTotalReceitas() {
      this.movimentacoes.forEach(movimentacao => {
        if(movimentacao.tipo === 'Receita') {
          this.totalReceitas += Number(movimentacao.valor)
        }
      })
    },
    calcularTotalDespesas() {
      this.movimentacoes.forEach(movimentacao => {
        if (movimentacao.tipo === 'Despesa') {
          this.totalDespesas += Number(movimentacao.valor)
        }
      })
    },
    calcularSaldo() {
      this.saldo = this.totalReceitas - this.totalDespesas
    }
  }
}
</script>

<style>
body {
  background-color: #5C9BA4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.error-message {
  color:red;
}
#rodape {
	position: absolute;
	bottom: 0;
  height: 120px;
  width: 100%;
  background-color: #33526E;
  color:#ffffff;
	}
</style>
