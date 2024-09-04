import { Button, Modal } from 'react-bootstrap'
import TitlePage from '../../components/TitlePage'
import { useEffect, useState } from 'react'
import { IFuncionario } from '../../model/funcionario';
import api from '../../api/funcionario';
import FuncionarioForm from './FuncionarioForm';

const funcionarioInicial: IFuncionario = {
    id: 0,
    nome: '',
    sobrenome: '',
    email: '',
    pis: ''
}

const FuncionarioLista = () => {

    const [showFunciModal, setShowFunciModal] = useState(false);
    const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

    const [funcionarios, setFuncionarios] = useState<IFuncionario[]>([]);
    const [funcionario, setFuncionario] = useState<IFuncionario>(funcionarioInicial);

    const handleFunciModal = () => setShowFunciModal(!showFunciModal);

    // Confirmação para excluir um funcionário
    const handleConfirmModal = (id: number) => {
        if (id !== 0 && id !== undefined) {
            const funcionarioFiltrado = funcionarios.filter(funci => funci.id === id);
            setFuncionario(funcionarioFiltrado[0]);
        } else {
            setFuncionario(funcionarioInicial);
        }
        setSmShowConfirmModal(!smShowConfirmModal)
    };

    // Inicializa o modal com um novo Funcionário
    const novoFuncionario = () => {
        setFuncionario(funcionarioInicial)
        handleFunciModal()
    }

    // Adiciona um novo Funcionário
    const addFuncionario = async (funci: IFuncionario) => {
        const response = await api.post('novo', funci);
        setFuncionarios([...funcionarios, response.data.entity]);
        handleFunciModal();
    }

    // Deleta um funcionário
    const deletarFuncionario = async (id: number) => {
        handleConfirmModal(0);
        if (await api.delete(`remover/${id}`)) {
            const funcionariosFiltrados = funcionarios.filter(funci => funci.id != id);
            setFuncionarios([...funcionariosFiltrados]);
        }
    }

    // Botão para fechar o modal
    function cancelarFuncionario() {
        setFuncionario(funcionarioInicial)
        handleFunciModal();
    }

    // Atualiza o Funcionário em edição
    const atualizarFuncionario = async (funcionarioEdicao: IFuncionario) => {
        const response = await api.put(`atualizar/${funcionarioEdicao.id}`, funcionarioEdicao);
        const { id } = response.data.entity;
        setFuncionarios(funcionarios.map(item => item.id == id ? response.data.entity : item))

        setFuncionario(funcionarioInicial)
        handleFunciModal()
    }

    function getFuncionario(id: number) {
        const funcionarioFiltrado = funcionarios.filter(funci => funci.id === id);
        setFuncionario(funcionarioFiltrado[0]);
        handleFunciModal();
    }

    // Obtem os funcionários para listar na table
    const pegarTodosFuncionarios = async () => {
        const response = await api.get('listar');

        return response.data.entity;
    }

    useEffect(() => {
        const getFuncionarios = async () => {
            const todosFuncionarios = await pegarTodosFuncionarios();
            if (todosFuncionarios)
                setFuncionarios(todosFuncionarios);
        }

        getFuncionarios();
    }, [])

    return (
        <>
            <TitlePage tituloPagina='Funcionarios:'>
                <Button variant='outline-secondery' onClick={novoFuncionario}>
                    <i className="fas fa-plus me-2"></i>
                    Novo Funcionario
                </Button>
            </TitlePage>

            <table className="table table-striped table-hover">
                <thead className="table-dark mt-3">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Sobrenome</th>
                        <th scope="col">Email</th>
                        <th scope="col">PIS</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map((funcionario) => (
                        <tr key={funcionario.id}>
                            <td>{funcionario.id}</td>
                            <td>{funcionario.nome}</td>
                            <td>{funcionario.sobrenome}</td>
                            <td>{funcionario.email}</td>
                            <td>{funcionario.pis}</td>
                            <td>
                                <div>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => getFuncionario(funcionario.id)}>
                                        <i className='fas fa-user-edit me-2'></i> Editar
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger me-2"
                                        onClick={() => handleConfirmModal(funcionario.id)}>
                                        <i className='fas fa-user-times me-2'></i> Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showFunciModal} onHide={handleFunciModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Serviço {funcionario.id != 0 ? funcionario.id : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FuncionarioForm
                        addFuncionario={addFuncionario}
                        cancelarFuncionario={cancelarFuncionario}
                        funcionarioSelecionado={funcionario}
                        atualizarFuncionario={atualizarFuncionario}
                    />
                </Modal.Body>
            </Modal>

            <Modal size='sm'
                show={smShowConfirmModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Excluindo funcionário{' '}  {funcionario.id != 0 ? funcionario.id : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir o funcionário {funcionario.id}
                </Modal.Body>
                <Modal.Footer className='d-flex justfy-content-between'>
                    <button className="btn btn-outline-success me-2" onClick={() => deletarFuncionario(funcionario.id)}>
                        <i className='fas fa-check me-2'></i>
                        Sim
                    </button>

                    <button className="btn btn-danger me-2" onClick={() => handleConfirmModal(0)}>
                        <i className='fas fa-check me-2'></i>
                        Não
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default FuncionarioLista;
