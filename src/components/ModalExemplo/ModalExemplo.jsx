import { useState } from 'react'
import './ModalInserir.scss'
/**
 * Componente que renderiza um modal de exemplo
 * @param {{open: boolean, setOpen: (arg0: boolean) => void, produto?: {id, nome, preco, desc, img}}} props - Propriedades do componente
 */
export default function ModalExemplo(props) {
    document.title = 'CADASTRO'
    const isEdit = props.produto !== undefined
    let novoId

    fetch('http://localhost:5000/produtos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            novoId = data[data.length - 1].id + 1
        })
        .catch(error => console.log(error))

    const [produto, setProduto] = useState({
        id: props.produto?.id ?? novoId,
        nome: props.produto?.nome ?? '',
        preco: props.produto?.preco ?? '',
        desc: props.produto?.desc ?? '',
        img: props.produto?.img ?? '',
    })

    const handleChange = e => {
        e.preventDefault()

        // const{name,value} = e.target;

        // if(name == "nome"){
        //   setProduto({"nome": value, "preco": "","desc": ""});
        // }else if(name == "preco"){
        //   setProduto({"nome": "", "preco": value,"desc": ""});
        // }else if(name == "desc"){
        //   setProduto({"nome": "", "preco": "","desc": value});
        // }

        const { name, value } = e.target
        setProduto({ ...produto, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const method = isEdit ? 'PUT' : 'POST'
        const url = isEdit
            ? `http://localhost:5000/produtos/${produto.id}`
            : 'http://localhost:5000/produtos'
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        })
            .then(response => {
                console.log('Status da requisição HTTP : ' + response.status)
                return response.json()
            })
            .then(data => console.log(data))
            .catch(error => console.log(error))
        props.setOpen(false)
    }

    if (props.open) {
        return (
            <div className="container">
                <h1>Cadastrar Produto</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Novo Produto</legend>
                            <div>
                                <label htmlFor="idProduto">Nome Produto:</label>
                                <input
                                    type="text"
                                    name="nome"
                                    id="idProduto"
                                    value={produto.nome}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="idPreco">Preço Produto:</label>
                                <input
                                    type="text"
                                    name="preco"
                                    id="idPreco"
                                    value={produto.preco}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="idDesc">
                                    Descrição Produto:
                                </label>
                                <input
                                    type="text"
                                    name="desc"
                                    id="idDesc"
                                    value={produto.desc}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="idImg">
                                    Imagem do Produto:
                                </label>
                                <input
                                    type="text"
                                    name="img"
                                    id="idImg"
                                    readOnly={isEdit}
                                    value={produto.img}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button>CADASTRAR</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}
