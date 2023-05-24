class Validator {
    static validateString(string, min, max) {
        // Verifica se a string está dentro dos limites mínimos e máximos
        if (string.length < min || string.length > max) {
            return false;
        }
        return true;
    }

    static validateEmail(email) {
        // Utilize uma expressão regular para validar o formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validateNumber(number, min, max) {
        // Verifica se o número está dentro dos limites mínimos e máximos
        if (number < min || number > max) {
            return false;
        }
        return true;
    }

    static validatePassword(password) {
        // Faça suas verificações personalizadas para validar a senha
        // por exemplo, verificar a presença de caracteres especiais, letras maiúsculas, etc.
        // Retorne true se a senha for válida e false caso contrário
    }
    // funçao que valida se o corpo da requisição está vazio
    static isEmpty(body) {
        if (Object.keys(body).length === 0) {
            return true;
        }
        return false;
    }
}

module.exports = Validator;