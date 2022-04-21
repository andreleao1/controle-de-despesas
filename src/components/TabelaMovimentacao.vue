<template>
  <div class="tabela-movimentacao container">
      <h3>Extrato de Movimentações</h3>
      <div class="exibicao-tabela" v-if="movimentacoes.length > 0">
        <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Título</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(movimentacao, indice) in movimentacoes" :key="indice">
                        <td>{{ movimentacao.data }}</td>
                        <td>{{ movimentacao.titulo }}</td>
                        <td>{{ movimentacao.tipo }}</td>
                        <td>{{ movimentacao.valor }}</td>
                        <td class="botoes-acoes">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalFormularioMovimentacao">Editar</button>
                            <button type="button" class="btn btn-danger" @click="excluirMovimentacao(indice)">Excluir</button>
                        </td>
                    </tr>
                </tbody>
        </table>
        <ModalMovimentacao id="modalFormularioMovimentacao" :tituloModal="tituloModal"/>
      </div>
      <span v-else>Não existe dado para ser exibido.</span>
  </div>
</template>

<script>
import ModalMovimentacao from './ModalFormularioMovimentacao.vue'
export default {
    components: {
        ModalMovimentacao
    },
    props:{
        movimentacoes: {
            type:Array,
            require:true
        }
    },
    data() {
        return {
            tituloModal: 'Editar Movimentação'
        }
    },
    methods: {
        excluirMovimentacao(indice){
            this.$emit('excluirMovimentacao', indice)
        }
    }
}
</script>

<style scoped>
    .tabela-movimentacao {
        width: 50%;
    }
    .valor-despesa {
        color: red;
    }
    table {
        background-color: #ffffff;
    }
    button {
        margin-left: 5px;
    }
</style>