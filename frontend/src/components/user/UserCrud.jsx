import React, { Component } from "react";
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'paw',
    title: 'Cadastro',
    subtitle: 'Cadastre um responsável, o nome do seu Pet na listagem a baixo:'
}

// Inicio do backend
const baseUrl = 'https://json-crud-npnoksq0q-alison-coutinhos-projects.vercel.app/users'
// const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {
        name: '',
        pet: '',
        tipo: '',
        sexo: '',
        raca: '',
        email: ''
    },

    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        // Incluir ou alterar o usuário. Incluir - POST / Alterar - PUT
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        if (user == initialState.user) {
            window.alert('Favor preencher todos os campos.')
        } else { 
            axios[method](url, user)
                .then(resp => {
                    // Atualizar a lista local.
                    const list = this.getUpdateList(resp.data)
                    this.setState({ user: initialState.user, list })
                })
        }
    }

    getUpdateList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    handleEnter(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            this.save()
        }
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdateList(user, false)
            this.setState({ list })
        })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label htmlFor="">Responsável</label>
                            <input type="text" className="form-control"
                                onKeyDown={e => this.handleEnter(e)}
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." 
                                required/>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label htmlFor="">Nome do animal</label>
                            <input type="text" className="form-control"
                                onKeyDown={e => this.handleEnter(e)}
                                name="pet"
                                value={this.state.user.pet}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label htmlFor="">Tipo</label>
                            <select className="form-control"
                                name="tipo"
                                value={this.state.user.tipo}
                                onChange={e => this.updateField(e)}>
                                <option selected hidden>Selecione</option>
                                <option>Gato</option>
                                <option>Cachorro</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label htmlFor="">Sexo</label>
                            <select className="form-control"
                                name="sexo"
                                value={this.state.user.sexo}
                                onChange={e => this.updateField(e)}>
                                <option selected hidden>Selecione</option>
                                <option>Macho</option>
                                <option>Fêmea</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label htmlFor="">Raça</label>
                            <input type="text" className="form-control"
                                onKeyDown={e => this.handleEnter(e)}
                                name="raca"
                                value={this.state.user.raca}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite uma raça..."></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label htmlFor="">Email de contato</label>
                            <input type="email" className="form-control"
                                onKeyDown={e => this.handleEnter(e)}
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite um e-mail..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Responsável</th>
                        <th>Nome do Pet</th>
                        <th>Espécie</th>
                        <th>Sexo</th>
                        <th>Raça</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.pet}</td>
                    <td>{user.tipo}</td>
                    <td>{user.sexo}</td>
                    <td>{user.raca}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning ml-2" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}