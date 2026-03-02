type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
  [key: string]: unknown
}

function extractTextFromNode(node: LexicalNode): string {
  if (node.type === 'text' && typeof node.text === 'string') {
    return node.text
  }
  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join('')
  }
  return ''
}

export function lexicalToPlainText(content: unknown): string {
  if (!content || typeof content !== 'object') return ''
  const root = (content as { root?: LexicalNode }).root
  if (!root || !Array.isArray(root.children)) return ''
  return root.children.map(extractTextFromNode).join('\n').trim()
}
