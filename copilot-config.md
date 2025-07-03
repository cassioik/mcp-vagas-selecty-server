# Configuração para GitHub Copilot

Para usar este servidor MCP com GitHub Copilot ou outras ferramentas MCP, configure da seguinte forma:

## Configuração MCP

Adicione ao seu arquivo de configuração MCP:

```json
{
  "mcpServers": {
    "selecty-vagas": {
      "command": "npx",
      "args": ["-y", "tsx", "/path/to/your/project/main.ts"],
      "env": {
        "SELECTY_API_KEY": "YOUR_SELECTY_API_KEY_HERE"
      }
    }
  }
}
```

## Variável de Ambiente

Certifique-se de configurar a variável de ambiente `SELECTY_API_KEY` com sua chave de API da Selecty.

### Exemplo no sistema:
```bash
export SELECTY_API_KEY="YOUR_SELECTY_API_KEY_HERE"
```

## Teste

Para testar o servidor:

```bash
npx -y @modelcontextprotocol/inspector npx -y tsx main.ts
```

## Ferramenta Disponível

### get-vagas
Busca vagas de emprego na plataforma Selecty.

**Parâmetros:**
- `portal` (opcional): Portal específico para filtrar vagas
- `page` (opcional): Número da página (padrão: 1)
- `per_page` (opcional): Número de vagas por página (padrão: 10)

**Exemplo de uso:**
```json
{
  "name": "get-vagas",
  "arguments": {
    "portal": "selecty",
    "page": 1,
    "per_page": 20
  }
}
```
