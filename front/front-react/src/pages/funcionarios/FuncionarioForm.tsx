import { useEffect, useState } from "react";
import { IFuncionario } from "../../model/funcionario";
import { FuncionarioFormProps } from "../../model/funcionarioProps";

const funcionarioInicial: IFuncionario = {
    id: 0,
    nome: '',
    sobrenome: '',
    email: '',
    pis: ''
}

const FuncionarioForm: React.FC<FuncionarioFormProps> = ({
    funcionarioSelecionado: funcionarioSelecionado,
    atualizarFuncionario: atualizarFuncionario,
    addFuncionario: addFuncionario,
    cancelarFuncionario: cancelarFuncionario

}: FuncionarioFormProps) => {

    const [funcionario, setFuncionario] = useState<IFuncionario>(funcionarioAtual());

    const [errorEmail, setErrorEmail] = useState('');
    const [errorNome, setErrorNome] = useState('');
    const [errorSobrenome, setErrorSobrenome] = useState('');

    useEffect(() => {
        if (funcionarioSelecionado.id != 0) {
            setFuncionario(funcionarioSelecionado)
        }
    }, [funcionarioSelecionado]);

    const handleEmail = (e: any) => {
        const { name, value } = e.target;
        if (!value || value == '') {
            setErrorEmail('O campo e-mail é obrigatório.');
        } else {
            setErrorEmail('');
        }

        setFuncionario({ ...funcionario, [name]: value })
    }

    const handleNome = (e: any) => {
        const { name, value } = e.target;
        if (!value || value == '') {
            setErrorNome('O campo Nome é obrigatório.');
        } else {
            setErrorNome('');
        }

        setFuncionario({ ...funcionario, [name]: value })
    }

    const handleSobrenome = (e: any) => {
        const { name, value } = e.target;
        if (!value || value == '') {
            setErrorSobrenome('O campo Sobrenome é obrigatório.');
        } else {
            setErrorSobrenome('');
        }

        setFuncionario({ ...funcionario, [name]: value })
    }

    const handlePisChange = (e: any) => {
        let { name, value } = e.target;

        // Remove caracteres não numéricos e limita o valor a 11 dígitos
        value = value.replace(/\D/g, '').slice(0, 11);

        setFuncionario({ ...funcionario, [name]: value })
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!funcionario.email || funcionario.email == '') {
            setErrorEmail('O campo e-mail é obrigatório.');
            return;
        } else {
            setErrorEmail('');
        }

        if (!funcionario.nome || funcionario.nome == '') {
            setErrorNome('O campo Nome é obrigatório.');
            return;
        } else {
            setErrorNome('');
        }

        if (!funcionario.sobrenome || funcionario.sobrenome == '') {
            setErrorSobrenome('O campo Sobrenome é obrigatório.');
            return;
        } else {
            setErrorSobrenome('');
        }

        if (funcionarioSelecionado.id != 0) {
            atualizarFuncionario(funcionario);
        } else {
            addFuncionario(funcionario);
        }

        setFuncionario(funcionarioInicial);
    }

    function funcionarioAtual(): IFuncionario {
        if (funcionarioSelecionado.id != 0) {
            return funcionarioSelecionado;

        } else {
            return funcionarioInicial;
        }
    }

    const cancelar = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        cancelarFuncionario();
        setFuncionario(funcionarioInicial);
    }

    return (
        <>
            <form className='row g-3' onSubmit={handleSubmit}>
                <div className='col-md-6'>
                    <label className='form-label'>Nome</label>
                    <input
                        name='nome'
                        value={funcionario.nome}
                        onChange={handleNome}
                        id='nome'
                        type="text"
                        minLength={2}
                        maxLength={30}
                        className="form-control" />
                    {errorNome && <p style={{ color: 'red', fontSize: 'smaller' }}>{errorNome}</p>}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Sobrenome</label>
                    <input
                        name='sobrenome'
                        value={funcionario.sobrenome}
                        onChange={handleSobrenome}
                        id='sobrenome'
                        type="text"
                        minLength={2}
                        maxLength={50}
                        className="form-control" />
                    {errorSobrenome && <p style={{ color: 'red', fontSize: 'smaller' }}>{errorSobrenome}</p>}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                        name='email'
                        value={funcionario.email}
                        onChange={handleEmail}
                        id='email'
                        type="text"
                        className="form-control" />
                    {errorEmail && <p style={{ color: 'red', fontSize: 'smaller' }}>{errorEmail}</p>}
                </div>


                <div className="col-md-6">
                    <label className="form-label">PIS:</label>
                    <input
                        name='pis'
                        value={funcionario.pis}
                        onChange={handlePisChange}
                        id='pis'
                        type="text"
                        maxLength={11}
                        className="form-control" />
                </div>


                <div className='col-12 mt-3'>
                    {funcionario.id == 0 ? (
                        <button className='btn btn-outline-success' type="submit"><i className="fas fa-plus me-2"></i>Adicionar Funcionário</button>
                    ) : (
                        <>
                            <button className='btn btn-outline-success me-2' type="submit" ><i className="fas fa-plus me-2"></i>Salvar</button>
                            <button className='btn btn-outline-warning' onClick={cancelar}><i className="fas fa-plus me-2"></i>Cancelar</button>
                        </>
                    )}

                </div>
            </form>
        </>
    )
}

export default FuncionarioForm;