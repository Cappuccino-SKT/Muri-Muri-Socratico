// "Tudo pronto?": confere o que o tutor precisa para funcionar e oferece o
// botão que resolve cada pendência. Pensado para os computadores da
// universidade, onde muita coisa vem desligada: pasta em modo restrito,
// recursos de IA desativados, Copilot sem conta, permissão recusada e GCC.
// A permissão de uso da IA é uma proteção do VS Code e não pode ser pulada:
// o que dá para fazer é explicar e levar o aluno até o lugar certo.
import * as vscode from 'vscode';
import { execFile } from 'child_process';

export type IdDaPendencia = 'ia' | 'conta' | 'permissao' | 'pasta' | 'gcc';
export type Situacao = 'ok' | 'aviso' | 'erro' | 'conferindo';

export interface ItemDeProntidao {
    id: IdDaPendencia;
    situacao: Situacao;
    titulo: string;
    detalhe?: string;
    // Texto do botão que resolve; a ação fica em resolver().
    botao?: string;
}

// Mostrada pelo VS Code no pedido de permissão, para o aluno entender o pedido.
export const JUSTIFICATIVA = 'O tutor usa a IA do Copilot para responder às suas dúvidas sobre o exercício com perguntas e pistas. Ele envia sua pergunta, o enunciado e o código do arquivo .c aberto.';

const ID_DO_GUIA = 'primeirosPassos';

export class Prontidao implements vscode.Disposable {
    private itens: ItemDeProntidao[] = [];
    private gccOk?: boolean;
    private atraso?: NodeJS.Timeout;
    private readonly mudou = new vscode.EventEmitter<ItemDeProntidao[]>();
    readonly onDidChange = this.mudou.event;
    private readonly assinaturas: vscode.Disposable[] = [];

    constructor(private readonly contexto: vscode.ExtensionContext) {
        const reconferir = () => this.conferirComAtraso();
        this.assinaturas.push(
            this.mudou,
            vscode.lm.onDidChangeChatModels(reconferir),
            contexto.languageModelAccessInformation.onDidChange(reconferir),
            vscode.workspace.onDidGrantWorkspaceTrust(reconferir),
            vscode.extensions.onDidChange(reconferir),
            vscode.workspace.onDidChangeConfiguration(evento => {
                if (evento.affectsConfiguration('tutorSocratico.caminhoGcc')) {
                    this.gccOk = undefined;
                }
                if (evento.affectsConfiguration('chat') || evento.affectsConfiguration('tutorSocratico.caminhoGcc')) {
                    reconferir();
                }
            }),
        );
    }

    dispose() {
        clearTimeout(this.atraso);
        this.assinaturas.forEach(a => a.dispose());
    }

    get ultimos(): ItemDeProntidao[] {
        return this.itens;
    }

    conferirComAtraso() {
        clearTimeout(this.atraso);
        this.atraso = setTimeout(() => this.conferir(), 400);
    }

    /** Confere tudo de novo e avisa quem estiver ouvindo (o painel). */
    async conferir(): Promise<ItemDeProntidao[]> {
        const ia = this.itemIa();
        const modelos = ia.situacao === 'ok' ? await modelosDisponiveis() : [];
        const itens = [
            ia,
            this.itemConta(ia.situacao === 'ok', modelos),
            this.itemPermissao(modelos),
            this.itemPasta(),
            await this.itemGcc(),
        ];
        this.itens = itens;
        const ok = (id: IdDaPendencia) => itens.find(i => i.id === id)!.situacao === 'ok';
        // Usados para marcar os passos do guia como concluídos.
        await vscode.commands.executeCommand('setContext', 'tutorSocratico.copilotPronto', ok('conta'));
        await vscode.commands.executeCommand('setContext', 'tutorSocratico.iaLiberada', ok('permissao'));
        await vscode.commands.executeCommand('setContext', 'tutorSocratico.gccOk', ok('gcc'));
        this.mudou.fire(itens);
        return itens;
    }

    /** A primeira pendência que impede o chat do tutor de funcionar. */
    bloqueioDaIa(): ItemDeProntidao | undefined {
        return this.itens.find(i => i.situacao === 'erro' && (i.id === 'ia' || i.id === 'conta' || i.id === 'permissao'));
    }

    /** Executa o botão de uma pendência. */
    async resolver(id: IdDaPendencia) {
        switch (id) {
            case 'ia':
                await vscode.commands.executeCommand('workbench.action.openSettings', 'chat.disableAIFeatures');
                vscode.window.showInformationMessage('Desmarque a opção "Disable AI Features" (Desativar recursos de IA). Se ela estiver bloqueada, o computador foi configurado assim pela universidade: avise o professor.');
                return;
            case 'conta':
                await vscode.commands.executeCommand('workbench.action.chat.triggerSetup');
                return;
            case 'permissao':
                await this.liberarIa();
                return;
            case 'pasta':
                await vscode.commands.executeCommand('workbench.trust.manage');
                return;
            case 'gcc':
                await this.abrirGuia('gcc');
                return;
        }
    }

    /**
     * Leva o aluno a dar a permissão: se ela nunca foi pedida, faz um pedido
     * pequeno ao modelo (o VS Code mostra a janela de permissão, com a
     * justificativa); se foi recusada, abre a tela onde ela é liberada.
     */
    async liberarIa() {
        const modelos = await modelosDisponiveis();
        if (modelos.length === 0) {
            const escolha = await vscode.window.showWarningMessage(
                'Antes de liberar a IA, entre na sua conta do GitHub para ativar o Copilot (é gratuito).',
                'Entrar com o GitHub', 'Não tenho conta');
            if (escolha === 'Entrar com o GitHub') {
                await vscode.commands.executeCommand('workbench.action.chat.triggerSetup');
            } else if (escolha === 'Não tenho conta') {
                await this.abrirGuia('conta');
            }
            return;
        }
        const modelo = modeloMaisLeve(modelos);
        const permitido = this.contexto.languageModelAccessInformation.canSendRequest(modelo);
        if (permitido === true) {
            vscode.window.showInformationMessage('✅ O tutor já pode usar a IA.');
        } else if (permitido === false) {
            await this.abrirTelaDePermissoes();
        } else {
            vscode.window.showInformationMessage('Vai aparecer uma janela do VS Code perguntando se o Muri-Muri Socratico pode usar a IA. Clique em "Permitir" (Allow).');
            const cancelar = new vscode.CancellationTokenSource();
            try {
                const resposta = await modelo.sendRequest(
                    [vscode.LanguageModelChatMessage.User('Responda apenas: ok')],
                    { justification: JUSTIFICATIVA }, cancelar.token);
                // Só precisava da permissão: não gasta mais do que o necessário.
                for await (const _ of resposta.text) {
                    break;
                }
                vscode.window.showInformationMessage('✅ Pronto! O tutor já pode usar a IA.');
            } catch (erro) {
                if (erro instanceof vscode.LanguageModelError && erro.code === vscode.LanguageModelError.NoPermissions().code) {
                    const escolha = await vscode.window.showWarningMessage(
                        'A permissão não foi dada, então o tutor não consegue responder. Quer liberar agora?', 'Liberar a IA');
                    if (escolha) {
                        await this.abrirTelaDePermissoes();
                    }
                } else if (this.contexto.languageModelAccessInformation.canSendRequest(modelo) !== true) {
                    vscode.window.showWarningMessage(`Não consegui falar com a IA: ${erro instanceof Error ? erro.message : String(erro)}`);
                }
            } finally {
                cancelar.cancel();
                cancelar.dispose();
            }
        }
        await this.conferir();
    }

    /** Tela do VS Code onde o aluno marca as extensões que podem usar a IA. */
    async abrirTelaDePermissoes() {
        vscode.window.showInformationMessage('Na lista que vai abrir, marque "Muri-Muri Socratico" e confirme com OK. (O mesmo fica em: ícone de conta, embaixo à esquerda → Gerenciar acesso ao modelo de linguagem.)');
        try {
            await vscode.commands.executeCommand('workbench.action.chat.manageLanguageModelAuthentication');
        } catch {
            await this.abrirGuia('permissao');
        }
    }

    async abrirGuia(passo?: string) {
        const guia = `${this.contexto.extension.id}#${ID_DO_GUIA}`;
        await vscode.commands.executeCommand('workbench.action.openWalkthrough', passo ? { category: guia, step: `${guia}#${passo}` } : guia, false);
    }

    private itemIa(): ItemDeProntidao {
        const desligada = vscode.workspace.getConfiguration('chat').get<boolean>('disableAIFeatures', false);
        return desligada
            ? { id: 'ia', situacao: 'erro', titulo: 'Recursos de IA desligados no VS Code', detalhe: 'O chat e o Copilot estão desativados neste computador.', botao: 'Ligar os recursos de IA' }
            : { id: 'ia', situacao: 'ok', titulo: 'Recursos de IA ligados' };
    }

    private itemConta(iaLigada: boolean, modelos: vscode.LanguageModelChat[]): ItemDeProntidao {
        if (!iaLigada) {
            return { id: 'conta', situacao: 'aviso', titulo: 'Copilot', detalhe: 'Ligue os recursos de IA primeiro.' };
        }
        return modelos.length > 0
            ? { id: 'conta', situacao: 'ok', titulo: 'Copilot conectado', detalhe: `${modelos.length} modelo(s) de IA disponível(is).` }
            : { id: 'conta', situacao: 'erro', titulo: 'Copilot sem conta conectada', detalhe: 'Entre com a sua conta do GitHub para ativar o Copilot (o plano gratuito serve). Sem conta? Veja o guia.', botao: 'Entrar com o GitHub' };
    }

    private itemPermissao(modelos: vscode.LanguageModelChat[]): ItemDeProntidao {
        if (modelos.length === 0) {
            return { id: 'permissao', situacao: 'aviso', titulo: 'Permissão para o tutor usar a IA', detalhe: 'Conecte o Copilot primeiro.' };
        }
        const permitido = this.contexto.languageModelAccessInformation.canSendRequest(modeloMaisLeve(modelos));
        if (permitido === true) {
            return { id: 'permissao', situacao: 'ok', titulo: 'O tutor tem permissão para usar a IA' };
        }
        if (permitido === false) {
            return { id: 'permissao', situacao: 'erro', titulo: 'A permissão para usar a IA foi recusada', detalhe: 'Alguém clicou em "Não permitir" quando o VS Code perguntou. Sem ela, o tutor não responde.', botao: 'Liberar a IA' };
        }
        return { id: 'permissao', situacao: 'aviso', titulo: 'Permissão para usar a IA ainda não pedida', detalhe: 'Na primeira pergunta, o VS Code vai pedir permissão: clique em "Permitir". Ou libere agora.', botao: 'Liberar a IA agora' };
    }

    private itemPasta(): ItemDeProntidao {
        return vscode.workspace.isTrusted
            ? { id: 'pasta', situacao: 'ok', titulo: 'Pasta confiável' }
            : { id: 'pasta', situacao: 'erro', titulo: 'Pasta em modo restrito', detalhe: 'O tutor conversa, mas não compila nem testa o programa até você confiar na pasta dos seus exercícios.', botao: 'Confiar nesta pasta' };
    }

    private async itemGcc(): Promise<ItemDeProntidao> {
        if (this.gccOk === undefined) {
            const caminho = vscode.workspace.getConfiguration('tutorSocratico').get<string>('caminhoGcc', 'gcc');
            this.gccOk = await new Promise<boolean>(resolve =>
                execFile(caminho, ['--version'], { timeout: 8000, windowsHide: true }, erro => resolve(!erro)));
        }
        return this.gccOk
            ? { id: 'gcc', situacao: 'ok', titulo: 'GCC encontrado' }
            : { id: 'gcc', situacao: 'erro', titulo: 'GCC não encontrado', detalhe: 'Sem o GCC, o tutor não verifica erros de compilação nem roda os testes. O chat funciona.', botao: 'Como instalar o GCC' };
    }
}

async function modelosDisponiveis(): Promise<vscode.LanguageModelChat[]> {
    try {
        return await vscode.lm.selectChatModels();
    } catch {
        return [];
    }
}

/** Para o pedido de permissão: um modelo pequeno, que gasta menos da cota. */
function modeloMaisLeve(modelos: vscode.LanguageModelChat[]): vscode.LanguageModelChat {
    return modelos.find(m => /mini|flash|haiku/i.test(m.family)) ?? modelos[0];
}
