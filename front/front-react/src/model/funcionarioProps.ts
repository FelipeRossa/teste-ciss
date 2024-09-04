import { IFuncionario } from "./funcionario";

export interface FuncionarioFormProps {
    funcionarioSelecionado: IFuncionario;
    atualizarFuncionario: (funcionario: IFuncionario) => void;
    addFuncionario: (funcionario: IFuncionario) => void;
    cancelarFuncionario: () => void;
}