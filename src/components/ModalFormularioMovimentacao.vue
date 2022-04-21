<template>
  <div
    class="modal"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ tituloFormulario }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <Form @submit="salvarMovimentacao">
            <div class="mb-3">
              <label for="titulo" class="form-label">Título</label>
              <Field
                type="text"
                id="titulo"
                name="titulo"
                class="form-control"
                :rules="validations.isRequired"
                v-model="movimentacao.titulo"
              />
              <span class="mt-2 error-message">
                <ErrorMessage name="titulo" />
              </span>
            </div>
            <div class="mb-3">
              <label for="descricao" class="form-label">Descrição</label>
              <Field
                type="text"
                id="descricao"
                name="descricao"
                class="form-control"
                :rules="validations.isRequired"
                v-model="movimentacao.descricao"
              />
              <span class="mt-2 error-message">
                <ErrorMessage name="descricao" />
              </span>
            </div>
            <div class="mb-3">
              <label for="valor" class="form-label">Valor</label>
              <Field
                type="number"
                id="valor"
                name="valor"
                class="form-control"
                :rules="validations.isGreaterThanZero"
                v-model="movimentacao.valor"
              />
              <span class="mt-2 error-message">
                <ErrorMessage name="valor" />
              </span>
            </div>
            <div class="mb-3">
              <label for="titulo" class="form-label">Tipo</label>
              <Field
                name="tipo"
                as="select"
                class="form-select"
                :rules="validations.isRequired"
                v-model="movimentacao.tipo"
              >
                <option selected disabled>Escolha uma opção</option>
                <option
                  v-for="tipoMovimentacao in tiposMovimentacao"
                  :key="tipoMovimentacao"
                  :value="tipoMovimentacao"
                >
                  {{ tipoMovimentacao }}
                </option>
              </Field>
              <span class="mt-2 error-message">
                <ErrorMessage name="tipo" />
              </span>
            </div>
            <div class="mb-3">
              <label for="data" class="form-label">Data</label>
              <Field
                type="date"
                id="data"
                name="data"
                class="form-control"
                :rules="validations.isRequired"
                v-model="movimentacao.data"
              />
              <span class="mt-2 error-message">
                <ErrorMessage name="data" />
              </span>
            </div>
            <button
              type="button"
              class="mt-2 btn btn-primary"
              data-bs-dismiss="modal"
              @click="salvarMovimentacao"
            >
              Salvar
            </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import validations from "../validations";

export default {
  name: "modal-movimentacao",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    tituloFormulario: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      movimentacao: {
        titulo: null,
        descricao: null,
        valor: null,
        tipo: null,
        data: null
      },
      tiposMovimentacao: null,
      validations: null,
      dados: []
    };
  },
  methods: {
    salvarMovimentacao() {
      this.$emit("movimentacaoSalva", this.movimentacao);
      this.limparCampos();
    },
    limparCampos() {
      this.movimentacao.titulo = null;
      this.movimentacao.descricao = null;
      this.movimentacao.valor = null;
      this.movimentacao.tipo = null;
      this.movimentacao.data = null;
    },
  },
  beforeMount() {
    this.tiposMovimentacao = ["Receita", "Despesa"];
    this.validations = validations;
  },
};
</script>

<style></style>
