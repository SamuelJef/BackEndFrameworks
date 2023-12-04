const Form = require("../models/form");

module.exports = {
    async getForm(req, res) {
        try {
            const forms = await Form.find();
            return res.json(forms);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar os formulários" });
        }
    },

    async createForm(req, res) {
        try {
            const { username, email, senha } = req.body;

            const form = new Form({
                username,
                email,
                senha,
            });

            await form.save();
            res.json(form);
            console.log("Cadastro realizado com sucesso")
        } catch (error) {
            res.status(500).json({ error: "Erro ao tentar salvar o cadastro", details: error.message });
        }
    },

    async deleteForm(req, res) {
        const { id } = req.params;

        try {
            const deleted = await Form.findOneAndDelete({ _id: id });

            if (deleted) {
                return res.json(deleted);
            }

            return res.status(404).json({ error: "Registro não encontrado para remoção" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao excluir o formulário", details: error.message });
        }
    },

    async updateForm(req, res) {
        const { id } = req.params;
        const { username, email, senha } = req.body;

        try {
            const form = await Form.findOne({ _id: id });

            if (form) {
                form.username = username || form.username;
                form.email = email || form.email;
                form.senha = senha || form.senha;

                await form.save();
                return res.json(form);
            }

            return res.status(404).json({ error: "Registro não encontrado para atualização" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar o formulário", details: error.message });
        }
    },

    async login(req, res) {
        const { email, senha } = req.body;

        try {
            const user = await Form.findOne({ email });

            if (!user) {
                return res.status(400).json({ error: "Usuário não encontrado" });
            }

            if (senha !== user.senha) {
                return res.status(400).json({ error: "Senha incorreta" });
            }

            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: "Erro durante a autenticação", details: error.message });
        }
    },
};
