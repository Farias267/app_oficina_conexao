import { useState, type FormEvent } from 'react'
import { supabase } from './lib/supabase'

type Page = 'inicio' | 'cadastro' | 'configuracoes'
const items: { id: Page; label: string; icon: string }[] = [
  { id: 'inicio', label: 'Início', icon: '⌂' },
  { id: 'cadastro', label: 'Cadastro', icon: '▤' },
  { id: 'configuracoes', label: 'Configurações', icon: '⚙' },
]

export default function App() {
  const [page, setPage] = useState<Page>('cadastro')
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')
  const [lastName, setLastName] = useState('')
  function navigate(next: Page) { setPage(next); setOpen(false); setMessage('') }
  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const cleaned = name.trim()
    if (!cleaned) { setMessage('Digite um nome para continuar.'); return }
    if (cleaned.length > 100) { setMessage('O nome deve ter no máximo 100 caracteres.'); return }
    setPending(true); setMessage('')
    try {
      if (supabase) {
        const { error } = await supabase.from('nomes_teste').insert({ nome: cleaned })
        if (error) throw error
        setMessage('Nome salvo no Supabase com sucesso!')
      } else {
        setMessage('Teste mockado: nome registrado apenas nesta sessão. Configure o Supabase para salvar no banco.')
      }
      setLastName(cleaned); setName('')
    } catch (err) {
      setMessage('Não foi possível salvar no banco: ' + (err instanceof Error ? err.message : 'erro desconhecido'))
    } finally { setPending(false) }
  }
  return <div className="app">
    <aside className={'sidebar ' + (open ? 'sidebar-open' : '')} aria-label="Menu lateral">
      <div className="brand"><span className="brand-symbol">◈</span><span><strong>Oficina Conexão</strong><small>Ambiente de teste</small></span></div>
      <div className="menu-caption">MENU PRINCIPAL</div>
      <nav className="side-nav">{items.map(item => <button key={item.id} type="button" className={'nav-link ' + (page === item.id ? 'selected' : '')} onClick={() => navigate(item.id)}><span className="nav-icon">{item.icon}</span>{item.label}{page === item.id && <span className="active-dot"/>}</button>)}</nav>
      <div className="sidebar-bottom"><span className={'connection-dot ' + (supabase ? 'online' : '')}/>{supabase ? 'Supabase configurado' : 'Modo demonstração'}</div>
    </aside>
    {open && <button className="overlay" aria-label="Fechar menu" onClick={() => setOpen(false)}/>}
    <div className="main-shell">
      <header className="header"><div className="header-left"><button className="hamburger" aria-label="Abrir menu" onClick={() => setOpen(!open)}>☰</button><span className="crumb">Workspace <span>/</span> <b>{items.find(i => i.id === page)?.label}</b></span></div><div className="header-right"><span className="environment">● &nbsp; TESTE</span><div className="avatar">OC</div></div></header>
      <main className="content"><div className="heading"><span className="eyebrow">PAINEL DE TESTES / V1</span><h1>{page === 'cadastro' ? 'Cadastro simples' : page === 'inicio' ? 'Visão geral' : 'Configurações'}</h1><p>{page === 'cadastro' ? 'Valide a interface e a integração com o banco de dados.' : 'Esta seção é uma demonstração de navegação. O formulário está na aba Cadastro.'}</p></div>
      {page === 'cadastro' ? <section className="panel"><div className="panel-header"><div className="form-icon">✎</div><div><h2>Novo registro</h2><p>Um único campo para testar o fluxo completo.</p></div><span className="panel-tag">FORMULÁRIO</span></div><form onSubmit={save}><label htmlFor="nome">Nome completo</label><input id="nome" name="nome" autoComplete="name" maxLength={100} value={name} onChange={e => setName(e.target.value)} placeholder="Digite seu nome aqui..." required/><p className="helper">Este nome será enviado ao Supabase quando a conexão estiver configurada.</p><button className="save-button" type="submit" disabled={pending}>{pending ? 'Salvando...' : 'Salvar nome'} <span>→</span></button></form>{message && <div role="status" className="feedback">{message}</div>}</section> : <section className="panel placeholder"><div className="form-icon">{page === 'inicio' ? '⌂' : '⚙'}</div><h2>{page === 'inicio' ? 'Bem-vindo ao ambiente de testes' : 'Ajustes de demonstração'}</h2><p>Navegue pelos menus lateral e inferior. Volte ao Cadastro para testar o formulário.</p><button className="secondary" onClick={() => navigate('cadastro')}>Ir para Cadastro →</button></section>}
      <div className="info-grid"><div className="info-tile"><span>STATUS DO FRONTEND</span><strong><i className="ok-dot"/> React ativo</strong><small>Interface pronta para testes</small></div><div className="info-tile"><span>BANCO DE DADOS</span><strong><i className={'ok-dot ' + (!supabase ? 'amber' : '')}/>{supabase ? 'Conectado' : 'Aguardando configuração'}</strong><small>{lastName ? 'Último nome: ' + lastName : 'Nenhum teste executado'}</small></div></div>
      </main><footer className="footer"><span>© 2026 Oficina Conexão · Ambiente de teste</span><span>React + Supabase + Vercel</span></footer>
      <nav className="mobile-bottom" aria-label="Navegação inferior">{items.map(item => <button key={item.id} onClick={() => navigate(item.id)} className={page === item.id ? 'selected' : ''}><span>{item.icon}</span>{item.label}</button>)}</nav>
    </div>
  </div>
}
