"""
Gera os arquivos unificados para o Gemini Notebook (NotebookLM) e atualiza
as cópias do material usadas pelo protótipo do VS Code e pela extensão.

Uso (na pasta do projeto):
    python gerar_pacotes.py

Saída em Notebook-Gemini/:
    01_Guia_e_Indices.md          índice do material + índice das videoaulas
    02_Material_de_Ensino.md      as 21 aulas verificadas (conteúdo técnico)
    03_Transcricoes_Aulas_01-12.md
    04_Transcricoes_Aulas_13-21.md

Também copia os casos de teste aprovados de casos-oficiais-proposta.json
para Extensao-Tutor-Socratico/material/casos-oficiais.json.
"""
import json
import re
import shutil
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
MATERIAL = RAIZ / "Material-Ensino-Verificado"
TRANSCRICOES = RAIZ / "Transcrição-Verificadas"
INDICE_VIDEOS = TRANSCRICOES / "_INDICE_VIDEOAULAS.md"
SAIDA = RAIZ / "Notebook-Gemini"

# Cópias do material usadas pelos outros produtos do projeto.
COPIAS = [
    (RAIZ / "Tutor-VSCode" / "material"),
    (RAIZ / "Extensao-Tutor-Socratico" / "material"),
]


def ler(caminho: Path) -> str:
    return caminho.read_text(encoding="utf-8").strip()


def sem_frontmatter(texto: str) -> tuple[dict, str]:
    """Separa o cabeçalho YAML (--- ... ---) do corpo."""
    m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n?", texto, re.S)
    if not m:
        return {}, texto
    campos = {}
    for linha in m.group(1).splitlines():
        if ":" in linha:
            chave, valor = linha.split(":", 1)
            campos[chave.strip()] = valor.strip().strip('"')
    return campos, texto[m.end():].strip()


def rebaixar_titulos(texto: str, niveis: int = 1) -> str:
    """Desce os títulos Markdown um nível (# -> ##), fora de blocos de código."""
    saida, em_codigo = [], False
    for linha in texto.splitlines():
        if linha.lstrip().startswith("```"):
            em_codigo = not em_codigo
        if not em_codigo and re.match(r"^#{1,5} ", linha):
            linha = "#" * niveis + linha
        saida.append(linha)
    return "\n".join(saida)


def numero_da_aula(nome: str) -> int:
    m = re.search(r"Aula_(\d+)", nome)
    return int(m.group(1)) if m else 0


def bloco_de_aula(caminho: Path, rotulo: str) -> str:
    campos, corpo = sem_frontmatter(ler(caminho))
    metadados = []
    for chave, nome in [("topicos", "Tópicos"), ("pre_requisitos", "Pré-requisitos"),
                        ("transcricao_relacionada", "Transcrição relacionada"), ("status", "Status")]:
        if campos.get(chave):
            metadados.append(f"- **{nome}:** {campos[chave]}")
    cabecalho = f"<!-- {rotulo}: {caminho.name} -->"
    corpo = rebaixar_titulos(corpo)
    return "\n".join([cabecalho, corpo if not metadados else _inserir_apos_titulo(corpo, metadados)])


def _inserir_apos_titulo(corpo: str, metadados: list[str]) -> str:
    linhas = corpo.splitlines()
    if linhas and linhas[0].startswith("#"):
        return "\n".join([linhas[0], "", *metadados, *linhas[1:]])
    return "\n".join([*metadados, "", corpo])


def juntar(titulo: str, descricao: str, blocos: list[str]) -> str:
    return f"# {titulo}\n\n{descricao}\n\n" + "\n\n---\n\n".join(blocos) + "\n"


def gerar_notebook():
    SAIDA.mkdir(exist_ok=True)

    aulas = sorted((p for p in MATERIAL.glob("Aula_*.md")), key=lambda p: numero_da_aula(p.name))
    transcricoes = sorted((p for p in TRANSCRICOES.glob("Aula_*.md")), key=lambda p: (numero_da_aula(p.name), p.name))

    _, indice_material = sem_frontmatter(ler(MATERIAL / "_INDICE.md"))
    _, indice_videos = sem_frontmatter(ler(INDICE_VIDEOS))
    arquivos = {
        "01_Guia_e_Indices.md": juntar(
            "Guia e Índices – Fundamentos de Programação em C",
            "Este arquivo reúne o índice do material de ensino e o índice das videoaulas. "
            "Use-o para descobrir qual aula do material consultar e qual videoaula (com link) indicar ao aluno. "
            "Os arquivos 02 a 04 deste notebook contêm o material completo e as transcrições.",
            [rebaixar_titulos(indice_material), rebaixar_titulos(indice_videos)],
        ),
        "02_Material_de_Ensino.md": juntar(
            "Material de Ensino Verificado – Aulas 01 a 21",
            "Conteúdo técnico revisado de cada aula: conceitos-chave, erros comuns, perguntas socráticas, "
            "exercícios e notas de revisão (correções em relação aos slides originais). "
            "Esta é a fonte de referência para o conteúdo técnico.",
            [bloco_de_aula(p, "Material") for p in aulas],
        ),
        "03_Transcricoes_Aulas_01-12.md": juntar(
            "Transcrições Verificadas das Videoaulas – Aulas 01 a 12",
            "O que o professor fala em cada videoaula, organizado por seções na ordem do vídeo. "
            "Serve para saber em qual vídeo (e em que parte dele) cada assunto aparece. "
            "Em caso de divergência técnica, vale o Material de Ensino Verificado.",
            [bloco_de_aula(p, "Transcrição") for p in transcricoes if numero_da_aula(p.name) <= 12],
        ),
        "04_Transcricoes_Aulas_13-21.md": juntar(
            "Transcrições Verificadas das Videoaulas – Aulas 13 a 21",
            "O que o professor fala em cada videoaula, organizado por seções na ordem do vídeo. "
            "Serve para saber em qual vídeo (e em que parte dele) cada assunto aparece. "
            "Em caso de divergência técnica, vale o Material de Ensino Verificado.",
            [bloco_de_aula(p, "Transcrição") for p in transcricoes if numero_da_aula(p.name) >= 13],
        ),
    }

    for nome, conteudo in arquivos.items():
        (SAIDA / nome).write_text(conteudo, encoding="utf-8")
        palavras = len(conteudo.split())
        print(f"{nome:36s} {len(conteudo.encode('utf-8')) / 1024:7.1f} KB  {palavras:6d} palavras")
    print(f"Aulas no material: {len(aulas)} | transcrições: {len(transcricoes)}")


PROPOSTA_CASOS = RAIZ / "casos-oficiais-proposta.json"
CASOS_DA_EXTENSAO = RAIZ / "Extensao-Tutor-Socratico" / "material" / "casos-oficiais.json"


def atualizar_casos_oficiais():
    """Copia os casos aprovados (só entrada e saída esperada) para a extensão."""
    if not PROPOSTA_CASOS.exists() or not CASOS_DA_EXTENSAO.parent.exists():
        return
    proposta = json.loads(PROPOSTA_CASOS.read_text(encoding="utf-8"))
    casos = {
        exercicio: [{"entrada": c["entrada"], "saidaEsperada": c["saidaEsperada"]} for c in dados["casos"]]
        for exercicio, dados in proposta.items()
        if not exercicio.startswith("_")
    }
    CASOS_DA_EXTENSAO.write_text(json.dumps(casos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    total = sum(len(c) for c in casos.values())
    print(f"Casos oficiais: {total} casos em {len(casos)} exercícios -> {CASOS_DA_EXTENSAO.relative_to(RAIZ)}")


def atualizar_copias():
    for destino in COPIAS:
        if not destino.exists():
            continue
        pasta_aulas = destino / "aulas"
        pasta_aulas.mkdir(exist_ok=True)
        for arquivo in MATERIAL.glob("*.md"):
            shutil.copy2(arquivo, pasta_aulas / arquivo.name)
        shutil.copy2(INDICE_VIDEOS, destino / INDICE_VIDEOS.name)
        print(f"Cópia atualizada: {destino.relative_to(RAIZ)}")


if __name__ == "__main__":
    gerar_notebook()
    atualizar_copias()
    atualizar_casos_oficiais()
