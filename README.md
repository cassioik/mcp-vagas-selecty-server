# MCP Selecty Vagas Server

Servidor MCP (Model Context Protocol) para buscar vagas de emprego da plataforma Selecty.

## Descrição

Este servidor permite buscar vagas de emprego através da API oficial da Selecty usando o protocolo MCP.

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## Configuração

Configure a variável de ambiente com sua chave da API Selecty:

```bash
export SELECTY_API_KEY="sua_chave_api_aqui"
```

## Uso

### Teste com MCP Inspector:
```bash
npx -y @modelcontextprotocol/inspector npx -y tsx main.ts
```

## Ferramenta Disponível

### get-vagas
Busca vagas de emprego na Selecty.

**Parâmetros:**
- `portal` (opcional): Portal específico
- `page` (opcional): Número da página (padrão: 1)
- `per_page` (opcional): Vagas por página (padrão: 10)

## API

Utiliza a API oficial da Selecty:
- **Endpoint**: `https://api.selecty.app/v2/jobfeed/index`
- **Autenticação**: X-Api-Key via variável de ambiente
- **Documentação**: https://api.selecty.app/v2/info#feed-de-vagas
