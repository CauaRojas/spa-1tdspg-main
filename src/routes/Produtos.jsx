import { Link } from 'react-router-dom'
// import { ListaProdutos } from "../components/ListaProdutos";
import {
    AiOutlineEdit as Editar,
    AiOutlineDelete as Excluir,
} from 'react-icons/ai'
import { FiEdit as Alterar } from 'react-icons/fi'
import classes from './Produtos.module.css'
import { useEffect, useState } from 'react'
import ModalExemplo from '../components/ModalExemplo/ModalExemplo'

export default function Produtos() {
    document.title = 'Produtos'

    const [novaListaProdutos, setNovaListaProdutos] = useState([{}])

    // useEffect(() => {
    //   setNovaListaProdutos(ListaProdutos);
    //   console.log("useEffect que renderiza apenas uma vez!");
    // }, []);

    const [open, setOpen] = useState(false)
    const [editProduto, setEditProduto] = useState({})

    useEffect(() => {
        if (!open) {
            //fetch = API do Javascript para realizar requisições/requests, ele utiliza como parâmetro uma URL ou URI.
            //fetch(http://minhaApi.com.br/exemplos)
            fetch('http://localhost:5000/produtos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setNovaListaProdutos(data)
                })
                .catch(error => console.log(error))
        }
        setEditProduto({})
    }, [open])

    const handleExcluir = id => {
        fetch(`http://localhost:5000/produtos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => console.log(response.status))
            .catch(error => console.log(error))

        window.location('/produtos')
    }

    return (
        <>
            <div>
                <h1>PRODUTOS</h1>

                {open ? (
                    <ModalExemplo
                        open={open}
                        setOpen={setOpen}
                        produto={editProduto}
                    />
                ) : (
                    ''
                )}

                <Link onClick={() => setOpen(true)}>Adicionar Produto</Link>

                <table className={classes.tabelaProd}>
                    <thead className={classes.tabelaCabecalho}>
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>DESCRIÇÃO</th>
                            <th>PREÇO</th>
                            <th>IMG</th>
                            <th>
                                <Editar /> / <Excluir /> / <Alterar />
                            </th>
                        </tr>
                    </thead>
                    <tbody className={classes.tabelaCorpo}>
                        {novaListaProdutos.map((produto, indice) => (
                            <tr key={indice}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.desc}</td>
                                <td>{produto.preco}</td>
                                <td>
                                    <img
                                        className={classes.tblImg}
                                        src={`${produto.img}`}
                                        alt={`${produto.desc}`}
                                    />
                                </td>
                                <td>
                                    {' '}
                                    <Link to={`/editar/produto/${produto.id}`}>
                                        <Editar />
                                    </Link>{' '}
                                    /{' '}
                                    <Link
                                        onClick={() =>
                                            handleExcluir(produto.id)
                                        }
                                    >
                                        <Excluir />
                                    </Link>{' '}
                                    /{' '}
                                    <Link
                                        onClick={() => {
                                            setEditProduto(produto)
                                            setOpen(true)
                                        }}
                                    >
                                        <Alterar />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className={classes.tabelaRodape}>
                        <tr>
                            <td colSpan={6}>
                                PRODUTOS INFORMÁTICOS - QTD ={' '}
                                {novaListaProdutos.length}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}
