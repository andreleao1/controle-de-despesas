class Validations {
    isRequired(value) {
        if (!value) {
            return 'Este campo é obrigatório!'
        }

        return true
    }

    isGreaterThanZero(value) {
        if (value <= 0) {
            return 'Este campo deve ser maior que zero!'
        }

        return true
    }
}

export default new Validations()